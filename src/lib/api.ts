import type { StudyResult } from '../types/result';
import { ApiError } from './errors';
import { validateStudyResult } from './validateResult';

export async function generateStudySet(input: string, signal?: AbortSignal): Promise<StudyResult> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input }),
    signal,
  });

  let payload: unknown = null;
  try { payload = await response.json(); } catch { /* handled below */ }

  if (!response.ok) {
    const message = typeof payload === 'object' && payload !== null && 'error' in payload && typeof payload.error === 'object' && payload.error !== null && 'message' in payload.error && typeof payload.error.message === 'string'
      ? payload.error.message
      : 'The study service could not generate a study set.';
    throw new ApiError(message, response.status);
  }

  if (typeof payload !== 'object' || payload === null || !('data' in payload)) {
    throw new ApiError('The study service returned an invalid response.', 502, 'INVALID_API_RESPONSE');
  }

  try { return validateStudyResult(payload.data); }
  catch { throw new ApiError('The study service returned unusable study data.', 502, 'INVALID_API_RESPONSE'); }
}