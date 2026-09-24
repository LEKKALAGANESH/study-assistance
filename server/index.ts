import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateStudyResult, GenerationError } from './generate';

const app = express();
const port = Number(process.env.PORT || 8787);
const maxInputLength = 6000;

app.use(express.json({ limit: '32kb' }));

app.post('/api/generate', async (req, res) => {
  const input = typeof req.body?.input === 'string' ? req.body.input.trim() : '';
  if (!input) return res.status(400).json({ error: { code: 'INVALID_INPUT', message: 'Enter a topic or some study notes.' } });
  if (input.length > maxInputLength) return res.status(400).json({ error: { code: 'INPUT_TOO_LONG', message: 'Please keep your input under 6,000 characters.' } });

  try {
    const data = await generateStudyResult(input);
    return res.json({ data });
  } catch (error) {
    if (error instanceof GenerationError) {
      const status = error.code === 'CONFIGURATION_ERROR' ? 500 : error.code === 'TIMEOUT' ? 504 : 502;
      return res.status(status).json({ error: { code: error.code, message: error.message } });
    }
    console.error('Unhandled generation error', error);
    return res.status(500).json({ error: { code: 'UNKNOWN_ERROR', message: 'Something went wrong. Please retry.' } });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));
app.get('*splat', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));

app.listen(port, () => console.log(`Flam Study Assistant server running on http://localhost:${port}`));