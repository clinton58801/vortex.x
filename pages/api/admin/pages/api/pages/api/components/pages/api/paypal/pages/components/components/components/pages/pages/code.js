// pages/code.js

import { useState } from 'react';
import axios from 'axios';

const languages = ['javascript', 'python'];

export default function CodePage() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');

  const runCode = async () => {
    try {
      const res = await axios.post('/api/run-code', {
        language,
        code,
      });
      setOutput(res.data.output);
    } catch (err) {
      setOutput(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <h1 className="text-3xl font-bold text-neon-blue mb-6">💻 Vortex CodeForge</h1>

      <div className="mb-4 flex gap-4">
        <select
          className="bg-[#1e293b] text-white px-3 py-2 rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
        <button
          onClick={runCode}
          className="bg-neon-blue hover:bg-blue-600 text-black px-4 py-2 rounded"
        >
          Run Code
        </button>
      </div>

      <textarea
        className="w-full h-64 bg-[#1e293b] text-white p-4 rounded-lg font-mono"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="// Write your code here"
      />

      <div className="mt-6 bg-black p-4 rounded-lg text-green-400 font-mono whitespace-pre-wrap">
        {output || 'Output will appear here...'}
      </div>
    </div>
  );
}
