// pages/api/file-upload.js

import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({ dest: '/tmp' });

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  await runMiddleware(req, res, upload.single('file'));

  const filePath = req.file.path;
  const fileExt = path.extname(req.file.originalname).toLowerCase();

  try {
    let text = '';

    if (fileExt === '.pdf') {
      const buffer = fs.readFileSync(filePath);
      const data = await pdfParse(buffer);
      text = data.text;
    } else if (fileExt === '.docx') {
      const buffer = fs.readFileSync(filePath);
      const data = await mammoth.extractRawText({ buffer });
      text = data.value;
    } else if (fileExt === '.txt' || fileExt === '.md') {
      text = fs.readFileSync(filePath, 'utf8');
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    fs.unlinkSync(filePath); // Clean up temp file
    return res.status(200).json({ text });
  } catch (err) {
    console.error('[FileUploadError]', err);
    return res.status(500).json({ error: 'Failed to process file' });
  }
}
