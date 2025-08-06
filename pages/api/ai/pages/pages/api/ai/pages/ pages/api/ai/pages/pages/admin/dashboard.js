import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [usageStats, setUsageStats] = useState({ totalChats: 0, totalFiles: 0 });

  useEffect(() => {
    // Simulated stats — plug into Supabase or another backend later
    const storedUsers = JSON.parse(localStorage.getItem('vortex_users')) || [
      { id: 1, email: 'demo@vortex.com', plan: 'Pro' },
      { id: 2, email: 'test@vortex.com', plan: 'Free' },
    ];

    setUsers(storedUsers);
    setUsageStats({ totalChats: 173, totalFiles: 42 });
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-neon-blue mb-6">🛠️ Admin Dashboard</h1>

      <div className="bg-gray-900 p-4 rounded shadow mb-6">
        <h2 className="text-2xl font-semibold mb-2">📊 Usage Overview</h2>
        <p>Total Chats: {usageStats.totalChats}</p>
        <p>Total File Uploads: {usageStats.totalFiles}</p>
      </div>

      <div className="bg-gray-900 p-4 rounded shadow">
        <h2 className="text-2xl font-semibold mb-2">👥 Registered Users</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="bg-gray-800 p-3 rounded">
              <span className="font-bold">{user.email}</span> — Plan: {user.plan}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
