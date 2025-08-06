export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    // Simulated AI response (you can replace this with OpenAI or other API)
    const lastUserMessage = messages[messages.length - 1]?.content || 'Hello';

    // Fake smart response for now (placeholder)
    const response = `You said: "${lastUserMessage}". VORTEX.X is learning from this.`;

    return res.status(200).json({ reply: response });
  } catch (err) {
    console.error('AI error:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
