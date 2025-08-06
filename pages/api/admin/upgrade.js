// pages/api/admin/upgrade.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // use service role key for write access
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, newTier } = req.body;

  if (!userId || !newTier) {
    return res.status(400).json({ error: 'Missing user ID or new tier.' });
  }

  try {
    const { error } = await supabase
      .from('users')
      .update({ tier: newTier })
      .eq('id', userId);

    if (error) throw error;

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Tier update error:', err.message);
    res.status(500).json({ error: 'Failed to update user tier.' });
  }
}
