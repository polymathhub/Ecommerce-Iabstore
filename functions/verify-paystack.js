/**
 * Cloudflare Function to verify Paystack transaction by reference
 * Expects POST { reference: string }
 */
export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: getCORSHeaders()
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: getCORSHeaders() });
  }

  try {
    const raw = await request.text();
    const body = raw ? JSON.parse(raw) : {};
    const { reference } = body;

    if (!reference) {
      return new Response(JSON.stringify({ error: 'Missing reference' }), { status: 400, headers: getCORSHeaders() });
    }

    const secretKey = env.PAYSTACK_SECRET_KEY;
    if (!secretKey) {
      return new Response(JSON.stringify({ error: 'Server misconfiguration: missing PAYSTACK_SECRET_KEY' }), { status: 500, headers: getCORSHeaders() });
    }

    const verifyUrl = `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`;

    const resp = await fetch(verifyUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await resp.json();

    return new Response(JSON.stringify(data), { status: resp.status, headers: getCORSHeaders() });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || 'Internal error' }), { status: 500, headers: getCORSHeaders() });
  }
}

function getCORSHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
}
