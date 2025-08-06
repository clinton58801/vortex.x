import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setLoading(true);
    setInput('');

    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-neon-blue mb-6">💬 VORTEX.X Assistant</h1>

      <div className="bg-gray-900 rounded-lg p-4 mb-6 max-h-[60vh] overflow-y-auto shadow-md">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <p className={`inline-block px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-neon-blue text-black' : 'bg-gray-700 text-white'}`}>
              {msg.content}
            </p>
          </div>
        ))}
        {loading && <p className="text-gray-400 italic">Thinking...</p>}
      </div>

      <div className="flex">
        <input
          type="text"
          className="flex-grow p-3 rounded-l bg-gray-800 text-white"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-neon-blue text-black font-bold px-6 py-3 rounded-r hover:bg-white transition">
