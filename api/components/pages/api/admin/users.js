// pages/api/admin/users.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // must be service role, not anon
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, tier');

    if (error) throw error;

    res.status(200).json({ users: data });
  } catch (err) {
    console.error('Admin fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
}
