import { useMemo, useState } from 'react';
import type { QuizQuestion } from '../types/result';

type Props = { questions: QuizQuestion[]; onComplete: (wrong: QuizQuestion[]) => void };

export function Quiz({ questions, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const question = questions[index];
  const wrongSet = useMemo(() => new Set(wrongIds), [wrongIds]);

  function submit() {
    if (selected === null) return;
    setAnswered(true);
    if (selected !== question.correctAnswer && !wrongSet.has(question.id)) setWrongIds((ids) => [...ids, question.id]);
  }

  function next() {
    if (index === questions.length - 1) {
      const wrong = questions.filter((item) => wrongSet.has(item.id) || (item.id === question.id && selected !== item.correctAnswer));
      onComplete(wrong);
      return;
    }
    setIndex((value) => value + 1); setSelected(null); setAnswered(false);
  }

  return <section className="study-section" aria-labelledby="quiz-title">
    <div className="section-heading"><div><p className="eyebrow">02 · Check understanding</p><h2 id="quiz-title">Quiz</h2></div><span className="progress-pill">{index + 1} / {questions.length}</span></div>
    <h3 className="quiz-question">{question.question}</h3>
    <div className="options" role="radiogroup" aria-label="Quiz options">
      {question.options.map((option, optionIndex) => {
        const isCorrect = answered && optionIndex === question.correctAnswer;
        const isWrong = answered && selected === optionIndex && optionIndex !== question.correctAnswer;
        return <button key={`${question.id}-${optionIndex}`} className={`option ${selected === optionIndex ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`} onClick={() => !answered && setSelected(optionIndex)} role="radio" aria-checked={selected === optionIndex} disabled={answered}><span className="option-marker">{String.fromCharCode(65 + optionIndex)}</span>{option}</button>;
      })}
    </div>
    {answered && <div className={`feedback ${selected === question.correctAnswer ? 'feedback-correct' : 'feedback-wrong'}`}><strong>{selected === question.correctAnswer ? 'Correct!' : 'Not quite.'}</strong><span>{question.explanation}</span></div>}
    <div className="control-row">{!answered ? <button className="primary-button" onClick={submit} disabled={selected === null}>Check answer</button> : <button className="primary-button" onClick={next}>{index === questions.length - 1 ? 'See results' : 'Next question'}</button>}</div>
  </section>;
}