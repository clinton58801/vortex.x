// pages/api/pdf-upload.js

import fs from 'fs';
import path from 'path';
import multer from 'multer';
import pdfParse from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({ dest: '/tmp' });

const handler = async (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err.message);
      return res.status(500).json({ error: 'File upload failed.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    try {
      const fileBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(fileBuffer);

      const text = pdfData.text || '';
      fs.unlinkSync(req.file.path); // clean up

      return res.status(200).json({ text });
    } catch (error) {
      console.error('PDF parse error:', error.message);
      res.status(500).json({ error: 'Failed to parse PDF.' });
    }
  });
};

export default handler;
