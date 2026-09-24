import type { QuizQuestion } from '../types/result';
export function QuizResults({ questions, wrong, onRetest }: { questions: QuizQuestion[]; wrong: QuizQuestion[]; onRetest: () => void }) {
  const correct = questions.length - wrong.length;
  const percentage = Math.round((correct / questions.length) * 100);
  return <section className="results-card" aria-live="polite"><p className="eyebrow">03 · Review</p><h2>Quiz complete</h2><div className="score"><strong>{percentage}%</strong><span>{correct} of {questions.length} correct</span></div>{wrong.length > 0 ? <><p>You have {wrong.length} question{wrong.length === 1 ? '' : 's'} to revisit.</p><button className="primary-button" onClick={onRetest}>Re-test incorrect answers</button></> : <p>Every answer was correct. Nice work — your study set is complete.</p>}</section>;
}