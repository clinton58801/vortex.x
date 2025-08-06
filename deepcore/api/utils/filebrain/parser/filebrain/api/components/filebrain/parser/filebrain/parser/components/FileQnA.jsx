// components/FileQnA.jsx

import React, { useState } from 'react';
import axios from 'axios';

const FileQnA = ({ fileText }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question || !fileText) return;

    setLoading(true);
    setAnswer('');

    try {
      const res = await axios.post('/api/file-qna', {
        fileText,
        question,
      });

      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer('⚠️ Failed to get answer. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 bg-[#0f172a] p-4 rounded-lg shadow border border-neon-blue text-white">
      <h3 className="text-lg font-bold mb-2 text-neon-blue">Ask This File a Question</h3>

      <textarea
        className="w-full p-2 rounded bg-[#1a2332] text-white mb-3"
        rows={3}
        placeholder="e.g. What is this resume's strongest skill?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button
        onClick={askQuestion}
        disabled={!question || loading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Thinking...' : 'Ask'}
      </button>

      {answer && (
        <div className="mt-4 bg-[#111827] p-3 rounded text-sm whitespace-pre-wrap border border-blue-700">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FileQnA;
