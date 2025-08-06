import { useState } from 'react';

export default function DeepSeekPage() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('');

    const res = await fetch('/api/ai/deepseek', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setResponse(data.result || 'No response returned.');
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-neon-blue mb-6">🔎 DeepSeek Intelligence</h1>

      <textarea
        rows="10"
        className="w-full p-4 mb-4 bg-gray-900 text-white rounded resize-none"
        placeholder="Paste large block of text, web dump, or content here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-neon-blue text-black font-bold px-6 py-3 rounded hover:bg-white transition"
      >
        Analyze →
      </button>

      <div className="mt-6 bg-gray-800 p-4 rounded max-h-[50vh] overflow-y-auto whitespace-pre-wrap">
        {loading ? 'Processing...' : response}
      </div>
    </main>
  );
}
