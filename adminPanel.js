import { useState } from 'react';

const mockUsers = [
  { name: 'DemoUser', plan: 'Pro', active: true },
  { name: 'BetaTester', plan: 'Premium', active: true },
  { name: 'TrialUser', plan: 'Free', active: false },
];

export default function AdminPanel() {
  const [users, setUsers] = useState(mockUsers);

  const toggleUser = (index) => {
    const updated = [...users];
    updated[index].active = !updated[index].active;
    setUsers(updated);
  };

  return (
    <div>
      <h2>Admin Panel – NeuroForge</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Toggle</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.name}</td>
              <td>{u.plan}</td>
              <td>{u.active ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => toggleUser(i)}>
                  {u.active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
