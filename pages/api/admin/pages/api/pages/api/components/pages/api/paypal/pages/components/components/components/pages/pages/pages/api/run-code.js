// pages/api/run-code.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { language, code } = req.body;

  if (!language || !code) {
    return res.status(400).json({ error: 'Missing code or language' });
  }

  try {
    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language,
        source: code,
      }),
    });

    const data = await response.json();

    if (data?.output) {
      res.status(200).json({ output: data.output });
    } else {
      res.status(500).json({ error: 'No output returned' });
    }
  } catch (error) {
    console.error('[RunCodeError]', error);
    res.status(500).json({ error: 'Execution failed' });
  }
}
