// utils/gptSummarizer.js

import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_KEY = process.env.OPENAI_API_KEY;

export const summarizeText = async (inputText) => {
  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful summarizer AI. Provide a concise and accurate summary of the input text. Keep it under 5 paragraphs.',
          },
          {
            role: 'user',
            content: inputText,
          },
        ],
        temperature: 0.5,
        max_tokens: 800,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const summary = response.data.choices[0].message.content.trim();
    return summary;
  } catch (err) {
    console.error('Error summarizing text:', err.message);
    return '⚠️ Failed to summarize content. Try again later.';
  }
};
