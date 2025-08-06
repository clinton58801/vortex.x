import Head from 'next/head';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function SavedChats() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const { data, error } = await supabase
        .from('saved_chats')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) setChats(data);
    };

    fetchChats();
  }, []);

  return (
    <div className="min-h-screen bg-dark text-white font-sans">
      <Head>
        <title>VORTEX.X | Saved Chats</title>
      </Head>
      <main className="max-w-3xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Saved Conversations</h1>
        {chats.length === 0 ? (
          <p className="text-center text-gray-400">No saved chats yet.</p>
        ) : (
          <ul className="space-y-6">
            {chats.map((chat) => (
              <li key={chat.id} className="p-4 bg-gray-800 rounded border border-gray-700">
                <p className="text-sm text-gray-500 mb-2">{new Date(chat.created_at).toLocaleString()}</p>
                <p>{chat.content}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
