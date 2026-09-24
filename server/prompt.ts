import type { StudyResult } from '../src/types/result';

export const studyResultJsonSchema = {
  type: 'OBJECT',
  properties: {
    title: { type: 'STRING' },
    summary: { type: 'STRING' },
    flashcards: {
      type: 'ARRAY',
      items: { type: 'OBJECT', properties: { id: { type: 'STRING' }, question: { type: 'STRING' }, answer: { type: 'STRING' } }, required: ['id', 'question', 'answer'] },
    },
    quiz: {
      type: 'ARRAY',
      items: { type: 'OBJECT', properties: { id: { type: 'STRING' }, question: { type: 'STRING' }, options: { type: 'ARRAY', items: { type: 'STRING' } }, correctAnswer: { type: 'INTEGER' }, explanation: { type: 'STRING' } }, required: ['id', 'question', 'options', 'correctAnswer', 'explanation'] },
    },
  },
  required: ['title', 'summary', 'flashcards', 'quiz'],
} as const;

export function buildStudyPrompt(input: string): string {
  return `You are the content engine for a study assistant. Convert the user's study material into a compact active-recall set.

Return ONLY valid JSON matching the supplied schema. Do not use markdown fences or prose outside JSON.

Content requirements:
- Keep the title specific to the supplied material.
- Write a concise summary.
- Generate 5-8 flashcards and 5-8 multiple-choice quiz questions.
- Questions must test the supplied material, not unrelated facts.
- Each quiz question must have 4 plausible options.
- correctAnswer must be a zero-based integer index into options.
- Explanations should be one or two concise sentences.
- Use unique IDs such as card-1 and q-1.
- Never return empty arrays or empty strings.

User study material:
${input}`;
}

export function assertStudyResult(value: unknown): asserts value is StudyResult {
  if (!value || typeof value !== 'object') throw new Error('AI result is not an object.');
}