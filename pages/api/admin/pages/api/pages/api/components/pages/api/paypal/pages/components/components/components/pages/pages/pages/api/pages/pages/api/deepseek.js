// pages/api/deepseek.js

import { NextApiRequest, NextApiResponse } from 'next';

const mockSources = [
  'https://en.wikipedia.org/wiki/Artificial_intelligence',
  'https://www.ibm.com/topics/artificial-intelligence',
  'https://www.brookings.edu/articles/what-is-artificial-intelligence/',
];

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }

  // In production, use a real search engine API here
  try {
    // Simulate scraping and summarizing results
    const summary = `Based on available web data, here’s a concise answer to your question:

Artificial intelligence (AI) refers to machines or systems that mimic human cognitive functions such as learning, reasoning, and problem-solving. AI includes fields like machine learning, deep learning, natural language processing, and robotics.

This summary is based on data from Wikipedia, IBM, and Brookings.`;

    return res.status(200).json({
      summary,
      sources: mockSources,
    });
  } catch (err) {
    console.error('[DeepSeekError]', err);
    return res.status(500).json({ error: 'Search failed' });
  }
}
