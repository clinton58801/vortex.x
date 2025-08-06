// components/AdminPanel.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users');
      setUsers(res.data.users || []);
    } catch (err) {
      console.error('Failed to fetch users:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const upgradeUser = async (userId, newTier) => {
    try {
      await axios.post('/api/admin/upgrade', { userId, newTier });
      fetchUsers(); // refresh after change
    } catch (err) {
      console.error('Upgrade failed:', err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-[#0f172a] text-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold text-neon-blue mb-4">🔐 Admin Panel</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <>
          <table className="w-full text-sm text-left border-collapse border border-blue-700">
            <thead className="bg-[#1e293b] text-blue-400">
              <tr>
                <th className="p-2 border border-blue-700">Email</th>
                <th className="p-2 border border-blue-700">Tier</th>
                <th className="p-2 border border-blue-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-blue-700">
                  <td className="p-2">{user.email}</td>
                  <td className="p-2 capitalize">{user.tier || 'free'}</td>
                  <td className="p-2">
                    <select
                      value={user.tier}
                      onChange={(e) => upgradeUser(user.id, e.target.value)}
                      className="bg-[#1e293b] text-white p-1 rounded"
                    >
                      <option value="free">Free</option>
                      <option value="pro">Pro</option>
                      <option value="premium">Premium</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
