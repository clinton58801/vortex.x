
import { useState } from 'react';

export default function DeepSeekPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    if (!query.trim()) return;

    // Fake summary until backend is wired
    setResult({
      summary: `🔎 Analyzing: "${query}"\n\nDeepSeek AI summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.`,
    });

    setQuery('');
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-neon-blue mb-6">🔍 DeepSeek AI</h1>

      <div className="max-w-3xl mx-auto space-y-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg"
          placeholder="Enter a topic, link, or research query..."
        />

        <button
          onClick={handleSearch}
          className="bg-neon-blue text-black px-4 py-2 rounded-lg font-bold hover:bg-white transition"
        >
          Analyze
        </button>

        {result && (
          <div className="bg-gray-900 p-4 rounded-lg mt-4 whitespace-pre-wrap">
            {result.summary}
          </div>
        )}
      </div>
    </main>
  );
}
