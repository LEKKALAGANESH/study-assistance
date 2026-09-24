import { z } from 'zod';
import type { StudyResult } from '../types/result';

const nonEmptyString = z.string().trim().min(1);

export const studyResultSchema = z.object({
  title: nonEmptyString,
  summary: nonEmptyString,
  flashcards: z.array(z.object({
    id: nonEmptyString,
    question: nonEmptyString,
    answer: nonEmptyString,
  })).min(1),
  quiz: z.array(z.object({
    id: nonEmptyString,
    question: nonEmptyString,
    options: z.array(nonEmptyString).min(2),
    correctAnswer: z.number().int().nonnegative(),
    explanation: nonEmptyString,
  })).min(1),
});

export function validateStudyResult(value: unknown): StudyResult {
  const parsed = studyResultSchema.parse(value);
  const flashcardIds = new Set(parsed.flashcards.map((card) => card.id));
  const quizIds = new Set(parsed.quiz.map((question) => question.id));

  if (flashcardIds.size !== parsed.flashcards.length) throw new Error('Study result contains duplicate flashcard IDs.');
  if (quizIds.size !== parsed.quiz.length) throw new Error('Study result contains duplicate quiz IDs.');

  for (const question of parsed.quiz) {
    if (question.correctAnswer >= question.options.length) throw new Error(`Quiz question ${question.id} has an invalid correctAnswer index.`);
  }
  return parsed;
}

export function parseAndValidateStudyResult(raw: string): StudyResult {
  if (!raw.trim()) throw new Error('The AI returned an empty response.');
  let value: unknown;
  try { value = JSON.parse(raw); } catch { throw new Error('The AI returned malformed JSON.'); }
  return validateStudyResult(value);
}