import { useState } from 'react';
import type { QuizQuestion, StudyResult } from '../types/result';
import { FlashcardDeck } from './FlashcardDeck';
import { Quiz } from './Quiz';
import { QuizResults } from './QuizResults';
import { Retest } from './Retest';

type QuizStage = 'quiz' | 'results' | 'retest' | 'done';

type StudySetProps = {
  result: StudyResult;
  onReset: () => void;
};

export function StudySet({ result, onReset }: StudySetProps) {
  const [quizStage, setQuizStage] = useState<QuizStage>('quiz');
  const [wrongQuestions, setWrongQuestions] = useState<QuizQuestion[]>([]);

  function completeQuiz(wrong: QuizQuestion[]) {
    setWrongQuestions(wrong);
    setQuizStage(wrong.length > 0 ? 'results' : 'done');
  }

  return (
    <main className="study-shell">
      <header className="study-header">
        <div className="study-header-copy">
          <p className="eyebrow">Generated study set</p>
          <h1>{result.title}</h1>
          <p>{result.summary}</p>
        </div>
        <button type="button" className="secondary-button reset-button" onClick={onReset}>
          New study set
        </button>
      </header>

      <FlashcardDeck cards={result.flashcards} />

      {quizStage === 'quiz' && (
        <Quiz questions={result.quiz} onComplete={completeQuiz} />
      )}

      {quizStage === 'results' && (
        <QuizResults
          questions={result.quiz}
          wrong={wrongQuestions}
          onRetest={() => setQuizStage('retest')}
        />
      )}

      {quizStage === 'retest' && (
        <Retest
          questions={wrongQuestions}
          onDone={() => setQuizStage('done')}
        />
      )}

      {quizStage === 'done' && (
        <section className="done-card" aria-live="polite">
          <span className="done-icon" aria-hidden="true">✓</span>
          <p className="eyebrow">Session finished</p>
          <h2>Study session complete</h2>
          <p>Start a new study set whenever you are ready for another topic.</p>
          <button type="button" className="primary-button" onClick={onReset}>
            Study another topic
          </button>
        </section>
      )}
    </main>
  );
}