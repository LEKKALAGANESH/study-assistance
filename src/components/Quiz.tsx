import { useState } from 'react';
import type { QuizQuestion } from '../types/result';

type QuizProps = {
  questions: QuizQuestion[];
  onComplete: (wrong: QuizQuestion[]) => void;
};

export function Quiz({ questions, onComplete }: QuizProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [wrongIds, setWrongIds] = useState<string[]>([]);

  const question = questions[index];
  const isLastQuestion = index === questions.length - 1;
  const isCorrect = selected === question.correctAnswer;

  function checkAnswer() {
    if (selected === null) return;

    setAnswered(true);

    if (!isCorrect && !wrongIds.includes(question.id)) {
      setWrongIds((ids) => [...ids, question.id]);
    }
  }

  function finishQuiz() {
    const wrongQuestionIds = new Set(wrongIds);

    if (!isCorrect) {
      wrongQuestionIds.add(question.id);
    }

    onComplete(questions.filter((item) => wrongQuestionIds.has(item.id)));
  }

  function goToNextQuestion() {
    if (isLastQuestion) {
      finishQuiz();
      return;
    }

    setIndex((current) => current + 1);
    setSelected(null);
    setAnswered(false);
  }

  return (
    <section className="study-section" aria-labelledby="quiz-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 · Check understanding</p>
          <h2 id="quiz-title">Quiz</h2>
        </div>
        <span className="progress-pill">
          {index + 1} / {questions.length}
        </span>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={1}
        aria-valuemax={questions.length}
        aria-valuenow={index + 1}
      >
        <span style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
      </div>

      <h3 className="quiz-question">{question.question}</h3>

      <div className="options" role="radiogroup" aria-label="Quiz options">
        {question.options.map((option, optionIndex) => {
          const optionIsCorrect =
            answered && optionIndex === question.correctAnswer;
          const optionIsWrong =
            answered &&
            selected === optionIndex &&
            optionIndex !== question.correctAnswer;

          return (
            <button
              type="button"
              key={`${question.id}-${optionIndex}`}
              className={`option ${selected === optionIndex ? 'selected' : ''} ${optionIsCorrect ? 'correct' : ''} ${optionIsWrong ? 'wrong' : ''}`}
              onClick={() => !answered && setSelected(optionIndex)}
              role="radio"
              aria-checked={selected === optionIndex}
              disabled={answered}
            >
              <span className="option-marker">
                {String.fromCharCode(65 + optionIndex)}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className={`feedback ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}`}
          role="status"
          aria-live="polite"
        >
          <strong>{isCorrect ? 'Correct!' : 'Not quite.'}</strong>
          <span>{question.explanation}</span>
        </div>
      )}

      <div className="control-row quiz-actions">
        {!answered ? (
          <button
            type="button"
            className="primary-button"
            onClick={checkAnswer}
            disabled={selected === null}
          >
            Check answer
          </button>
        ) : (
          <button type="button" className="primary-button" onClick={goToNextQuestion}>
            {isLastQuestion ? 'See results' : 'Next question'}
          </button>
        )}
      </div>
    </section>
  );
}