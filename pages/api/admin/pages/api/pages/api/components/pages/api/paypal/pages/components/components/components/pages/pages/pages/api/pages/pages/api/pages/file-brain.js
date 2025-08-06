// pages/file-brain.js

import { useState } from 'react';
import axios from 'axios';

export default function FileBrain() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setAnswer('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const uploadRes = await axios.post('/api/file-upload', formData);
      const text = uploadRes.data.text;

      const answerRes = await axios.post('/api/file-ask', {
        question,
        text,
      });

      setAnswer(answerRes.data.answer);
    } catch (err) {
      setAnswer('Error processing file.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold text-neon-blue mb-4">📁 FileBrain</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <input
        type="text"
        placeholder="Ask something from the file..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full bg-[#1e293b] text-white px-4 py-2 rounded mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={!file || !question || loading}
        className="bg-neon-blue text-black px-4 py-2 rounded font-semibold"
      >
        {loading ? 'Thinking...' : 'Ask File'}
      </button>

      <div className="mt-6 bg-[#1e293b] p-4 rounded-lg shadow text-green-400 whitespace-pre-wrap">
        {answer}
      </div>
    </div>
  );
}
