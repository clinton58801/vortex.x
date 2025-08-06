// filebrain/parser/docxParser.js

import fs from 'fs';
import { Document, Packer } from 'docx';
import mammoth from 'mammoth';

export const parseDOCX = async (filePath) => {
  try {
    const result = await mammoth.extractRawText({ path: filePath });

    return {
      text: result.value,
      error: null,
    };
  } catch (err) {
    console.error('DOCX Parsing Failed:', err.message);
    return {
      text: '',
      error: '⚠️ Unable to parse DOCX file.',
    };
  }
};
