// components/FileBrain.jsx

import React, { useState } from 'react';
import axios from 'axios';

const FileBrain = () => {
  const [uploadedText, setUploadedText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/pdf-upload', formData);
      setUploadedText(res.data.text || '');
    } catch (err) {
      console.error('Upload failed:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);

    try {
      const res = await axios.post('/api/search', {
        query: searchQuery,
      });

      setSearchResult(res.data.result || 'No match found.');
    } catch (err) {
      console.error('Search failed:', err.message);
      setSearchResult('Search error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#0f172a] text-white rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-neon-blue">📄 FileBrain: Smart PDF Reader</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handlePDFUpload}
        className="mb-4 bg-[#1e293b] p-2 rounded text-sm"
      />

      {loading && <p className="text-blue-400">Processing...</p>}

      {uploadedText && (
        <>
          <h3 className="mt-6 mb-2 font-semibold">Extracted Text:</h3>
          <textarea
            className="w-full h-40 p-2 text-sm bg-[#1e293b] rounded resize-none mb-4"
            value={uploadedText}
            readOnly
          />

          <h3 className="font-semibold">Search This File:</h3>
          <input
            type="text"
            placeholder="Ask something about the file..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.ta
