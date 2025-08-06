import { useEffect, useState } from 'react';

export default function SavedChatsPage() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    // Fake data – swap with Supabase fetch later
    const saved = JSON.parse(localStorage.getItem('vortex_saved_chats')) || [];
    setChats(saved);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-neon-blue mb-6">💾 Saved Chats</h1>

      {chats.length === 0 ? (
        <p className="text-gray-400">No saved chats yet.</p>
      ) : (
        <div className="grid gap-4">
          {chats.map((chat, index) => (
            <div key={index} className="bg-gray-900 p-4 rounded shadow">
              <h2 className="text-lg font-bold mb-2">Chat #{index + 1}</h2>
              <ul className="space-y-1 max-h-[250px] overflow-y-auto">
                {chat.map((msg, i) => (
                  <li key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                    <span className={`inline-block px-3 py-2 rounded ${msg.role === 'user' ? 'bg-neon-blue text-black' : 'bg-gray-700 text-white'}`}>
                      {msg.content}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
