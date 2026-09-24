import { useState } from 'react';
import type { Flashcard } from '../types/result';

type FlashcardDeckProps = {
  cards: Flashcard[];
};

export function FlashcardDeck({ cards }: FlashcardDeckProps) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const card = cards[index];
  const isFirst = index === 0;
  const isLast = index === cards.length - 1;

  function move(nextIndex: number) {
    setIndex(nextIndex);
    setRevealed(false);
  }

  return (
    <section className="study-section" aria-labelledby="flashcards-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 · Active recall</p>
          <h2 id="flashcards-title">Flashcards</h2>
        </div>
        <span className="progress-pill">
          {index + 1} / {cards.length}
        </span>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-label="Flashcard progress"
        aria-valuemin={1}
        aria-valuemax={cards.length}
        aria-valuenow={index + 1}
      >
        <span style={{ width: `${((index + 1) / cards.length) * 100}%` }} />
      </div>

      <button
        type="button"
        className={`flashcard ${revealed ? 'is-revealed' : ''}`}
        onClick={() => setRevealed((current) => !current)}
        aria-label={revealed ? 'Hide answer' : 'Reveal answer'}
        aria-pressed={revealed}
      >
        <span className="flashcard-label">
          {revealed ? 'Answer' : 'Question'}
        </span>
        <span className="flashcard-text">
          {revealed ? card.answer : card.question}
        </span>
        <span className="flashcard-hint">
          {revealed ? 'Tap or press Enter to hide' : 'Tap or press Enter to reveal'}
        </span>
      </button>

      <div className="control-row">
        <button
          type="button"
          className="secondary-button"
          onClick={() => move(Math.max(0, index - 1))}
          disabled={isFirst}
        >
          ← Previous
        </button>
        <button
          type="button"
          className="secondary-button"
          onClick={() => move(Math.min(cards.length - 1, index + 1))}
          disabled={isLast}
        >
          Next →
        </button>
      </div>
    </section>
  );
}