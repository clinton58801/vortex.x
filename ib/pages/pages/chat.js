import Head from 'next/head';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const data = await res.json();
    if (data?.response) {
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white font-sans">
      <Head>
        <title>VORTEX.X | Chat</title>
      </Head>
      <main className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-6 text-center">VORTEX.X Chat</h1>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto border border-vortex p-4 rounded">
          {messages.map((msg, idx) => (
            <div key={idx} className={`p-2 rounded ${msg.role === 'user' ? 'bg-gray-800' : 'bg-vortex text-black'}`}>
              <strong>{msg.role === 'user' ? 'You' : 'VORTEX.X'}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex mt-6 space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded"
            placeholder="Ask me anything..."
          />
          <button type="submit" className="px-6 py-2 bg-vortex text-black rounded shadow-md">Send</button>
        </form>
      </main>
    </div>
  );
}
