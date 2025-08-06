// filebrain/api/fileQnA.js

import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_KEY = process.env.OPENAI_API_KEY;

export const handleFileQnA = async (req, res) => {
  try {
    const { fileText, question } = req.body;

    if (!fileText || !question) {
      return res.status(400).json({ error: 'Missing file content or question.' });
    }

    const prompt = `
You are an intelligent assistant. Use the following file content to answer the user's question.

---
FILE CONTENT:
${fileText}
---

QUESTION:
${question}
`;

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a helpful AI trained to answer questions about uploaded files.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 600,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const answer = response.data.choices[0].message.content.trim();

    res.status(200).json({ answer });
  } catch (err) {
    console.error('File QnA Error:', err.message);
    res.status(500).json({ error: 'Failed to process file question.' });
  }
};
