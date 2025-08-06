// pages/api/file-ask.js

import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { question, text } = req.body;

  if (!question || !text) {
    return res.status(400).json({ error: 'Missing input data' });
  }

  try {
    const prompt = `
You are a helpful AI that answers questions based only on the content provided in the following document.

DOCUMENT:
${text}

QUESTION:
${question}

Answer concisely and accurately, citing only information from the text above. Do not make up facts.
`;

    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    });

    const answer = completion.data.choices[0].message.content.trim();
    res.status(200).json({ answer });
  } catch (err) {
    console.error('[FileAskError]', err);
    res.status(500).json({ error: 'AI failed to answer question.' });
  }
}
