import formidable from 'formidable';
import fs from 'fs';
import { Configuration, OpenAIApi } from 'openai';

export const config = {
  api: {
    bodyParser: false,
  },
};

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = './uploads';
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }

    const file = files.file;
    const content = fs.readFileSync(file.filepath, 'utf8');

    try {
      const prompt = `Summarize and extract important info from the following content:\n\n${content}`;
      const response = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      });

      const summary = response.data.choices[0].message.content;
      res.status(200).json({ summary });
    } catch (e) {
      console.error('AI error:', e.message);
      res.status(500).json({ error: 'Failed to process file' });
    }
  });
}
