// pages/admin/dashboard.js

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/admin/metrics');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold text-neon-blue mb-6">🛠️ Vortex.X Admin Dashboard</h1>

      {!stats ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatBox label="Total Users" value={stats.totalUsers} />
          <StatBox label="Pro Users" value={stats.proUsers} />
          <StatBox label="Premium Users" value={stats.premiumUsers} />
          <StatBox label="Monthly Revenue" value={`$${stats.monthlyRevenue}`} />
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="bg-[#1e293b] p-6 rounded-xl shadow text-center">
      <h2 className="text-xl text-gray-400 mb-2">{label}</h2>
      <p className="text-3xl font-bold text-neon-blue">{value}</p>
    </div>
  );
}
