import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Head from 'next/head';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (!error) setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white font-sans">
      <Head>
        <title>VORTEX.X | Admin Dashboard</title>
      </Head>
      <main className="max-w-4xl mx-auto py-20 px-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
        {users.length === 0 ? (
          <p className="text-center text-gray-400">No users found.</p>
        ) : (
          <table className="w-full border border-gray-700 text-left">
            <thead>
              <tr className="bg-gray-900 text-vortex">
                <th className="p-3 border-b border-gray-700">Email</th>
                <th className="p-3 border-b border-gray-700">Role</th>
                <th className="p-3 border-b border-gray-700">Created At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-800">
                  <td className="p-3 border-b border-gray-700">{user.email}</td>
                  <td className="p-3 border-b border-gray-700">{user.role || 'User'}</td>
                  <td className="p-3 border-b border-gray-700">
                    {new Date(user.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
