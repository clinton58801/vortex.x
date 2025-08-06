import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

export default async function handler(req, res) {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an advanced AI logic engine. Answer with structured reasoning, deductions, and facts.',
        },
        {
          role: 'user',
          content: query,
        },
      ],
    });

    const result = response.data.choices[0].message.content;
    res.status(200).json({ result });
  } catch (e) {
    console.error('DeepSeek error:', e.message);
    res.status(500).json({ error: 'Failed to process query' });
  }
}
