/**
 * Cloudflare Function: Paystack webhook handler
 * Verifies the x-paystack-signature header and processes events like charge.success
 */
export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(null, { status: 204 });
  }

  const secret = env.PAYSTACK_SECRET_KEY;
  if (!secret) {
    return new Response('Missing secret', { status: 500 });
  }

  const signature = request.headers.get('x-paystack-signature') || '';
  const bodyText = await request.text();

  try {
    const isValid = await verifySignature(secret, bodyText, signature);
    if (!isValid) {
      return new Response(JSON.stringify({ verified: false }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const event = JSON.parse(bodyText);

    // Basic handling: on charge.success, update order status (attempt Firestore update if configured)
    if (event && event.event === 'charge.success') {
      const reference = event.data?.reference;

      // If Firebase REST credentials are available in env, attempt to find and update the order
      const projectId = env.FIREBASE_PROJECT_ID;
      const accessToken = env.FIREBASE_ACCESS_TOKEN; // Bearer token with Firestore access

          if (projectId) {
            try {
              // Obtain access token: prefer service account JSON (FIREBASE_SERVICE_ACCOUNT), fallback to FIREBASE_ACCESS_TOKEN
              let token = accessToken;
              if (!token && env.FIREBASE_SERVICE_ACCOUNT) {
                try {
                  const sa = typeof env.FIREBASE_SERVICE_ACCOUNT === 'string' ? JSON.parse(env.FIREBASE_SERVICE_ACCOUNT) : env.FIREBASE_SERVICE_ACCOUNT;
                  token = await getAccessTokenFromServiceAccount(sa);
                } catch (err) {
                  console.error('Failed to parse or use FIREBASE_SERVICE_ACCOUNT:', err);
                }
              }

              if (!token) {
                console.log('No access token available; skipping DB update for reference', reference);
                return;
              }

              const runQueryUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;
              const queryBody = {
                structuredQuery: {
                  from: [{ collectionId: 'orders' }],
                  where: {
                    fieldFilter: {
                      field: { fieldPath: 'payment.gatewayReference' },
                      op: 'EQUAL',
                      value: { stringValue: reference }
                    }
                  },
                  limit: 1
                }
              };

              const resp = await fetch(runQueryUrl, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(queryBody)
              });

              const results = await resp.json();
              if (Array.isArray(results) && results.length > 0 && results[0].document) {
                const docName = results[0].document.name; // full resource name

                // Build patch body to update fields (Firestore REST expects document fields format)
                const patchUrl = `https://firestore.googleapis.com/v1/${docName}`;
                const patchBody = {
                  fields: {
                    status: { stringValue: 'Approved' },
                    payment: { mapValue: { fields: { paymentStatus: { stringValue: 'Paid' } } } }
                  }
                };

                const patchResp = await fetch(patchUrl + '?updateMask.fieldPaths=status&updateMask.fieldPaths=payment.paymentStatus', {
                  method: 'PATCH',
                  headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(patchBody)
                });

                if (!patchResp.ok) {
                  const errText = await patchResp.text();
                  console.error('Failed to patch order document:', patchResp.status, errText);
                } else {
                  console.log('Order updated as paid for reference', reference);
                }
              } else {
                console.warn('No matching order found for Paystack reference', reference);
              }
            } catch (err) {
              console.error('Error updating Firestore for Paystack webhook:', err);
            }
          } else {
            console.log('Paystack webhook received, but FIREBASE_PROJECT_ID not set; skipping DB update. Reference:', reference);
          }
    }

    return new Response(JSON.stringify({ verified: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

function verifySignature(secret, payload, signature) {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const payloadData = encoder.encode(payload);

    // Using Web Crypto API HMAC SHA-512
    const cryptoKeyPromise = crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-512' }, false, ['sign']);
    return cryptoKeyPromise.then(key => crypto.subtle.sign('HMAC', key, payloadData)).then(sig => {
      const sigHex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
      return sigHex === signature;
    }).catch(() => false);
  } catch (err) {
    return false;
  }
}
