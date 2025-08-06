// filebrain/api/uploadHandler.js

import multer from 'multer';
import path from 'path';
import { parsePDF } from '../parser/pdfParser.js';
// You can also import parseDOCX and parseXLSX later

// Set up file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Main upload handler
export const uploadFileHandler = [
  upload.single('file'),
  async (req, res) => {
    try {
      const file = req.file;
      if (!file) return res.status(400).json({ error: 'No file uploaded.' });

      const ext = path.extname(file.originalname).toLowerCase();

      let result = {};
      if (ext === '.pdf') {
        result = await parsePDF(file.path);
      }
      // Add .docx and .xlsx support here soon...

      if (result.error) {
        return res.status(500).json({ error: result.error });
      }

      res.status(200).json({
        message: 'File parsed successfully.',
        content: result.text || '',
        info: result.info || {},
        numPages: result.numPages || 0,
      });
    } catch (err) {
      console.error('File Upload Error:', err.message);
      res.status(500).json({ error: 'Failed to process the uploaded file.' });
    }
  },
];
