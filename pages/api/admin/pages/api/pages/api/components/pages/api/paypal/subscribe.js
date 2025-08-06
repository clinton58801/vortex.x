// pages/api/paypal/subscribe.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { plan, userId } = req.body;
  const planId = getPlanId(plan); // your PayPal plan ID for this tier

  if (!planId || !userId) {
    return res.status(400).json({ error: 'Missing data.' });
  }

  const auth = await getAccessToken();

  const subscription = await fetch(`${process.env.PAYPAL_API}/v1/billing/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
    body: JSON.stringify({
      plan_id: planId,
      application_context: {
        brand_name: "Vortex.X",
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-success?userId=${userId}&tier=${plan}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment-cancel`,
      },
    }),
  });

  const data = await subscription.json();

  if (data && data.links) {
    const approveLink = data.links.find((link) => link.rel === 'approve');
    return res.status(200).json({ url: approveLink.href });
  }

  return res.status(500).json({ error: 'Failed to create PayPal subscription.' });
}

async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch(`${process.env.PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const json = await res.json();
  return json.access_token;
}

function getPlanId(tier) {
  if (tier === 'pro') return 'YOUR_PRO_PLAN_ID';
  if (tier === 'premium') return 'YOUR_PREMIUM_PLAN_ID';
  return null;
}
