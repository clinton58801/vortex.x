// filebrain/parser/pdfParser.js

import fs from 'fs';
import pdf from 'pdf-parse';

export const parsePDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdf(dataBuffer);

    return {
      text: pdfData.text,
      info: pdfData.info,
      numPages: pdfData.numpages,
    };
  } catch (err) {
    console.error('PDF Parsing Failed:', err.message);
    return {
      text: '',
      info: {},
      numPages: 0,
      error: '⚠️ Unable to parse PDF.',
    };
  }
};
