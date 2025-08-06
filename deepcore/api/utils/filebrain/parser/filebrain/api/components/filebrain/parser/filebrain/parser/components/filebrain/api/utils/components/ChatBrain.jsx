// components/ChatBrain.jsx

import React, { useState } from 'react';
import axios from 'axios';

const ChatBrain = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are Vortex.X, a powerful and helpful AI assistant.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('/api/chatbrain', {
        messages: newMessages,
      });

      const reply = res.data.reply;
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: 'assistant', content: '⚠️ Something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#0f172a] text-white rounded-xl max-w-3xl mx-auto shadow-lg">
      <h2 className="text-xl font-bold text-neon-blue mb-4">🧠 Chat with Vortex.X</h2>

      <div className="max-h-[400px] overflow-y-auto bg-[#101624] p-3 rounded mb-4 border border-blue-700">
        {messages.slice(1).map((msg, i) => (
          <div
            key={i}
            className={`mb-3 p-2 rounded ${msg.role === 'user' ? 'bg-[#1e293b]' : 'bg-[#172554]'}`}
          >
            <strong>{msg.role === 'user' ? 'You' : 'Vortex.X'}:</strong>
            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 bg-[#1e293b] p-2 rounded text-white"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBrain;
