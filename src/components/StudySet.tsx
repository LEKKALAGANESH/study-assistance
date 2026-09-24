import { useState } from 'react';
import type { QuizQuestion, StudyResult } from '../types/result';
import { FlashcardDeck } from './FlashcardDeck';
import { Quiz } from './Quiz';
import { QuizResults } from './QuizResults';
import { Retest } from './Retest';

type QuizStage = 'quiz' | 'results' | 'retest' | 'done';

export function StudySet({ result, onReset }: { result: StudyResult; onReset: () => void }) {
  const [quizStage, setQuizStage] = useState<QuizStage>('quiz');
  const [wrong, setWrong] = useState<QuizQuestion[]>([]);

  function completeQuiz(nextWrong: QuizQuestion[]) { setWrong(nextWrong); setQuizStage(nextWrong.length ? 'results' : 'done'); }

  return <main className="study-shell">
    <header className="study-header"><div><p className="eyebrow">Generated study set</p><h1>{result.title}</h1><p>{result.summary}</p></div><button className="secondary-button" onClick={onReset}>New study set</button></header>
    <FlashcardDeck cards={result.flashcards} />
    {quizStage === 'quiz' && <Quiz questions={result.quiz} onComplete={completeQuiz} />}
    {quizStage === 'results' && <QuizResults questions={result.quiz} wrong={wrong} onRetest={() => setQuizStage('retest')} />}
    {quizStage === 'retest' && <Retest questions={wrong} onDone={() => setQuizStage('done')} />}
    {quizStage === 'done' && <section className="done-card"><span className="done-icon" aria-hidden="true">✓</span><h2>Study session complete</h2><p>Start a new study set whenever you are ready for another topic.</p><button className="primary-button" onClick={onReset}>Study another topic</button></section>}
  </main>;
}