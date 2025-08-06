import Head from 'next/head';
import { useState } from 'react';

export default function FileBrain() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!file || !question.trim()) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('question', question);

    const res = await fetch('/api/ai/file-brain', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (data?.response) setResponse(data.response);
  };

  return (
    <div className="min-h-screen bg-dark text-white font-sans">
      <Head>
        <title>VORTEX.X | FileBrain</title>
      </Head>
      <main className="max-w-2xl mx-auto py-16 px-6">
        <h1 className="text-3xl font-bold mb-8 text-center">FileBrain</h1>
        <form onSubmit={handleAsk} className="space-y-6">
          <div>
            <label className="block mb-2">Upload File</label>
            <input type="file" onChange={handleFileChange} className="bg-gray-800 p-2 rounded w-full" />
          </div>
          <div>
            <label className="block mb-2">Ask a Question</label>
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full p-2 bg-gray-800 rounded border border-gray-700" />
          </div>
          <button type="submit" className="bg-vortex text-black px-6 py-2 rounded shadow">Submit</button>
        </form>
        {response && (
          <div className="mt-8 p-4 bg-gray-800 border border-vortex rounded">
            <strong>Answer:</strong>
            <p>{response}</p>
          </div>
        )}
      </main>
    </div>
  );
}
