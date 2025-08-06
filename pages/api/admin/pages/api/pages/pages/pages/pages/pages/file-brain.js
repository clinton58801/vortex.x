import { useState } from 'react';

export default function FileBrain() {
  const [fileName, setFileName] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setAnswer('✅ File uploaded. Ready for questions.');
  };

  const handleAsk = () => {
    if (!question.trim()) return;

    // Simulated answer for now
    setAnswer(`🤖 Scanning "${fileName}"...\n\nAnswer: Lorem ipsum dolor sit amet. This is a placeholder answer.`);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-neon-blue mb-6">📂 FileBrain Uploader</h1>

      <div className="max-w-2xl mx-auto space-y-6">
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleUpload}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg"
        />

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something about your file..."
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg"
        />

        <button
          onClick={handleAsk}
          className="bg-neon-blue text-black px-4 py-2 rounded-lg font-bold hover:bg-white transition"
        >
          Ask FileBrain →
        </button>

        {answer && (
          <div className="bg-gray-900 p-4 rounded-lg whitespace-pre-wrap">
            {answer}
          </div>
        )}
      </div>
    </main>
  );
}
