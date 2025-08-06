// components/FileUploadPanel.jsx

import React, { useState } from 'react';
import axios from 'axios';

const FileUploadPanel = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError('');
    setFileContent('');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { content } = res.data;
      setFileContent(content);
    } catch (err) {
      console.error(err);
      setError('⚠️ Upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#101624] p-4 rounded-lg text-white w-full max-w-xl mx-auto shadow-lg">
      <h2 className="text-xl font-bold mb-3 text-neon-blue">Upload File to Analyze</h2>
      
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4 text-sm"
      />

      <button
        onClick={handleUpload}
        disabled={!selectedFile || loading}
        className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Uploading...' : 'Upload & Analyze'}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {fileContent && (
        <div className="mt-6 bg-[#0f172a] p-3 rounded max-h-[300px] overflow-y-scroll border border-neon-blue">
          <pre className="text-sm whitespace-pre-wrap">{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default FileUploadPanel;
