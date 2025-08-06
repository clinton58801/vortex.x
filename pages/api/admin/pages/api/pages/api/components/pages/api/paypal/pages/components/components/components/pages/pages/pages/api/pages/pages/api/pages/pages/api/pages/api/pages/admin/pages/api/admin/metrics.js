// pages/api/admin/metrics.js

import { supabase } from '@/lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end('Method Not Allowed');

  try {
    const { data: users, error } = await supabase.from('users').select('plan');

    if (error) throw error;

    const totalUsers = users.length;
    const proUsers = users.filter((u) => u.plan === 'pro').length;
    const premiumUsers = users.filter((u) => u.plan === 'premium').length;

    const monthlyRevenue = (proUsers * 9.99) + (premiumUsers * 19.99); // adjust if needed

    res.status(200).json({
      totalUsers,
      proUsers,
      premiumUsers,
      monthlyRevenue,
    });
  } catch (err) {
    console.error('[AdminStatsError]', err);
    res.status(500).json({ error: 'Failed to load metrics' });
  }
}
