// filebrain/parser/xlsxParser.js

import * as XLSX from 'xlsx';
import fs from 'fs';

export const parseXLSX = async (filePath) => {
  try {
    const data = fs.readFileSync(filePath);
    const workbook = XLSX.read(data, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const textOutput = jsonData
      .map(row => row.join('\t'))
      .join('\n');

    return {
      text: textOutput,
      rows: jsonData.length,
      error: null,
    };
  } catch (err) {
    console.error('XLSX Parsing Failed:', err.message);
    return {
      text: '',
      rows: 0,
      error: '⚠️ Unable to parse XLSX file.',
    };
  }
};
