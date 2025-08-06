import { useState } from 'react';

export default function FileBrainPage() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setOutput('');

    const res = await fetch('/api/ai/file-brain', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setOutput(data.result || 'No response');
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl font-bold text-neon-blue mb-6">📁 File Brain</h1>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-6">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 text-white"
        />
        <button
          onClick={handleUpload}
          className="bg-neon-blue text-black px-4 py-2 rounded hover:bg-white transition"
        >
          Analyze File →
        </button>
      </div>

      <div className="bg-gray-800 p-4 rounded text-white whitespace-pre-wrap max-h-[50vh] overflow-y-auto">
        {loading ? 'Analyzing file...' : output}
      </div>
    </main>
  );
}
