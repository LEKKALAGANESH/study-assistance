import { parseAndValidateStudyResult } from '../src/lib/validateResult';
import { buildStudyPrompt, studyResultJsonSchema } from './prompt';

const DEFAULT_MODEL = 'gemini-2.5-flash-lite';
const DEFAULT_TIMEOUT_MS = 25_000;

export class GenerationError extends Error {
  code: string;
  constructor(message: string, code = 'GENERATION_FAILED') {
    super(message);
    this.name = 'GenerationError';
    this.code = code;
  }
}

export async function generateStudyResult(input: string): Promise<ReturnType<typeof parseAndValidateStudyResult>> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new GenerationError('Gemini API key is not configured on the server.', 'CONFIGURATION_ERROR');

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const timeoutMs = Number(process.env.AI_TIMEOUT_MS || DEFAULT_TIMEOUT_MS);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildStudyPrompt(input) }] }],
        generationConfig: { responseMimeType: 'application/json', responseSchema: studyResultJsonSchema, temperature: 0.2 },
      }),
    });

    if (!response.ok) {
      let detail = '';
      try {
        const body = await response.json() as { error?: { message?: string } };
        detail = typeof body?.error?.message === 'string' ? body.error.message : '';
      } catch { /* no-op */ }
      console.error('Gemini provider error', { status: response.status, detail });
      throw new GenerationError('The AI provider could not generate the study set.', 'PROVIDER_ERROR');
    }

    const payload = await response.json() as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };
    const raw = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('') || '';
    if (!raw.trim()) throw new GenerationError('The AI returned an empty study set.', 'EMPTY_OUTPUT');

    try { return parseAndValidateStudyResult(raw); }
    catch (error) {
      console.error('Invalid AI output', error instanceof Error ? error.message : error);
      throw new GenerationError('The AI returned data we could not safely use. Please retry.', 'INVALID_OUTPUT');
    }
  } catch (error) {
    if (error instanceof GenerationError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') throw new GenerationError('The AI request timed out. Please retry.', 'TIMEOUT');
    console.error('Generation request failed', error);
    throw new GenerationError('The AI request failed. Please check your connection and retry.', 'NETWORK_ERROR');
  } finally { clearTimeout(timeout); }
}