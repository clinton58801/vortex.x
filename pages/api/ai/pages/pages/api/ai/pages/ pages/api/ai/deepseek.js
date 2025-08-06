export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { input } = req.body;

  if (!input || typeof input !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    // Simulated smart breakdown — upgrade with OpenAI or your own logic
    const summary = input.length > 500
      ? input.slice(0, 300) + '... (content trimmed for summary)'
      : input;

    const result = `✅ DeepSeek analyzed your input.\n\n---\n\n🧠 Summary:\n${summary}`;

    return res.status(200).json({ result });
  } catch (err) {
    console.error('DeepSeek error:', err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
