// api/chatbrain.js

import axios from 'axios';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const chatbrainHandler = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid message format.' });
    }

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o',
        messages,
        temperature: 0.7,
        max_tokens: 800,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.choices[0].message.content.trim();
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('ChatBrain Error:', err.message);
    return res.status(500).json({ error: 'ChatBrain failed to respond.' });
  }
};
