import { Quiz } from './Quiz';
import type { QuizQuestion } from '../types/result';
export function Retest({ questions, onDone }: { questions: QuizQuestion[]; onDone: () => void }) {
  return <section><div className="retest-heading"><p className="eyebrow">04 · Focused review</p><h2>Re-test incorrect answers</h2><p>Only the questions you missed are shown again.</p></div><Quiz questions={questions} onComplete={onDone} /></section>;
}