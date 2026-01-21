/**
 * Cloudflare Function: initialize a Paystack transaction
 * Expects POST { amount: number (NGN), email: string, metadata?: object }
 * Returns Paystack initialize response (authorization_url, reference, access_code)
 */
export async function onRequest(context) {
  const { request, env } = context;

  const CORS = getCORSHeaders();
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS });
  }
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: CORS });
  }

  let body;
  try {
    body = await request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers: CORS });
  }

  const { amount, email, metadata } = body || {};
  if (!amount || !email) {
    return new Response(JSON.stringify({ error: 'Missing amount or email' }), { status: 400, headers: CORS });
  }

  const secretKey = env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return new Response(JSON.stringify({ error: 'Server misconfiguration: missing PAYSTACK_SECRET_KEY' }), { status: 500, headers: CORS });
  }

  const initializeUrl = 'https://api.paystack.co/transaction/initialize';

  try {
    const resp = await fetch(initializeUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: Math.round(amount * 100), email, metadata })
    });

    const data = await resp.json();
    return new Response(JSON.stringify(data), { status: resp.status, headers: CORS });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Failed to initialize transaction' }), { status: 502, headers: CORS });
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
