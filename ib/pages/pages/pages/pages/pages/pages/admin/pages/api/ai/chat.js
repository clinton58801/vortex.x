import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'No message provided' });
  }

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });

    const aiMessage = response.data.choices[0].message.content;
    res.status(200).json({ reply: aiMessage });
  } catch (err) {
    console.error('AI Error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
}
