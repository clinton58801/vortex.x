import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    const botMessage = {
      role: 'ai',
      text: `VORTEX.X: Thinking like ChatGPT... Responding to "${input}"`,
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-neon-blue mb-6">💬 Vortex.X Chat</h1>

      <div className="bg-gray-900 rounded-lg p-4 max-w-4xl mx-auto mb-4 h-[60vh] overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`text-sm ${msg.role === 'user' ? 'text-white' : 'text-neon-blue'}`}>
            <span className="font-bold">{msg.role === 'user' ? 'You' : 'VORTEX.X'}:</span> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex max-w-4xl mx-auto">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-l-lg outline-none"
          placeholder="Ask anything..."
        />
        <button
          onClick={handleSend}
          className="bg-neon-blue text-black font-bold px-4 py-2 rounded-r-lg hover:bg-white transition"
        >
          Send
        </button>
      </div>
    </main>
  );
}
