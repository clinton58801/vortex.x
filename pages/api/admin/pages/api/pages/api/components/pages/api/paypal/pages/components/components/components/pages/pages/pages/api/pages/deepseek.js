// pages/deepseek.js

import { useState } from 'react';
import axios from 'axios';

export default function DeepSeek() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [sources, setSources] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setResponse('Searching...');
    setSources([]);

    try {
      const res = await axios.post('/api/deepseek', { query });
      setResponse(res.data.summary);
      setSources(res.data.sources || []);
    } catch (err) {
      setResponse('Failed to fetch results.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold text-neon-blue mb-4">🌐 DeepSeek AI</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 bg-[#1e293b] border border-gray-600 rounded px-4 py-2 text-white"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Ask a real-world question..."
        />
        <button
          className="bg-neon-blue text-black font-semibold px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="bg-[#1e293b] p-4 rounded-lg shadow">
        <p className="whitespace-pre-wrap">{response}</p>

        {sources.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-400">Sources:</p>
            <ul className="list-disc ml-6">
              {sources.map((src, i) => (
                <li key={i}>
                  <a
                    href={src}
                    className="text-blue-400 underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {src}
                  </a>
                </li>
              ))}
            </u
