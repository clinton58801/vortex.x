// utils/pdfExporter.js

import PDFDocument from 'pdfkit';
import fs from 'fs';

export const generatePDF = async (content, filename = 'vortex-output.pdf') => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const outputPath = `./exports/${filename}`;

      if (!fs.existsSync('./exports')) {
        fs.mkdirSync('./exports');
      }

      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);

      // Header
      doc.fontSize(20).fillColor('#1fb6ff').text('VORTEX.X', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).fillColor('white');

      // Body
      const paragraphs = content.split('\n');
      paragraphs.forEach((para) => {
        doc.text(para.trim(), {
          lineGap: 4,
        });
        doc.moveDown(0.5);
      });

      doc.end();

      stream.on('finish', () => {
        resolve(outputPath);
      });
    } catch (err) {
      console.error('PDF export failed:', err.message);
      reject(err);
    }
  });
};
