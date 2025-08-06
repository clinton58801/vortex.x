// components/CodeForge.jsx

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const CodeForge = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput('');

    try {
      const res = await axios.post('/api/code-run', {
        code,
        language,
      });

      setOutput(res.data.output || 'No output.');
    } catch (err) {
      console.error(err);
      setOutput('⚠️ Code execution failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#0f172a] text-white rounded-xl max-w-5xl mx-auto shadow-lg">
      <h2 className="text-xl font-bold text-neon-blue mb-4">💻 CodeForge – AI-Powered Code Sandbox</h2>

      <div className="mb-3">
        <label className="mr-2">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-[#1e293b] text-white p-1 rounded"
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="html">HTML/CSS</option>
        </select>
      </div>

      <Editor
        height="300px"
        language={language === 'html' ? 'html' : language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value)}
      />

      <button
        onClick={runCode}
        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Running...' : 'Run Code'}
      </button>

      <div className="mt-4 bg-[#101624] p-3 rounded text-sm border border-blue-700 max-h-[300px] overflow-y-auto">
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default CodeForge;
