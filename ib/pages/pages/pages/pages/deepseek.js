import Head from 'next/head';
import { useState } from 'react';

export default function DeepSeek() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const res = await fetch('/api/ai/deepseek', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    if (data?.result) setResult(data.result);
  };

  return (
    <div className="min-h-screen bg-dark text-white font-sans">
      <Head>
        <title>VORTEX.X | DeepSeek</title>
      </Head>
      <main className="max-w-2xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-6 text-center">DeepSeek</h1>
        <p className="text-center mb-6 text-lg">Run advanced logic, deductions, and solve problems with precision.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-gray-800 p-4 rounded border border-gray-700"
            placeholder="Enter complex logic, queries, or deductions..."
          />
          <button type="submit" className="bg-vortex text-black px-6 py-2 rounded shadow">Run</button>
        </form>
        {result && (
          <div className="mt-8 p-4 bg-gray-800 border border-vortex rounded">
            <strong>Result:</strong>
            <p>{result}</p>
          </div>
        )}
      </main>
    </div>
  );
}
