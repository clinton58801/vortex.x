// api/code-run.js

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const codeRunHandler = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Missing code or language.' });
    }

    const tempId = uuidv4();
    let filename, execCommand;

    const tempDir = './temp';
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    if (language === 'python') {
      filename = path.join(tempDir, `${tempId}.py`);
      fs.writeFileSync(filename, code);
      execCommand = `python3 ${filename}`;
    } else if (language === 'javascript') {
      filename = path.join(tempDir, `${tempId}.js`);
      fs.writeFileSync(filename, code);
      execCommand = `node ${filename}`;
    } else {
      return res.status(400).json({ error: 'Unsupported language.' });
    }

    exec(execCommand, { timeout: 5000 }, (error, stdout, stderr) => {
      fs.unlinkSync(filename); // Clean up temp file

      if (error) {
        return res.status(200).json({
          output: stderr || error.message,
        });
      }

      return res.status(200).json({
        output: stdout || '✅ No output returned.',
      });
    });
  } catch (err) {
    console.error('Code execution error:', err.message);
    res.status(500).json({ error: 'Failed to execute code.' });
  }
};
