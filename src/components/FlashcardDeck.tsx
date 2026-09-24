import { useState } from 'react';
import type { Flashcard } from '../types/result';

export function FlashcardDeck({ cards }: { cards: Flashcard[] }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const card = cards[index];
  function move(nextIndex: number) { setIndex(nextIndex); setRevealed(false); }

  return <section className="study-section" aria-labelledby="flashcards-title">
    <div className="section-heading"><div><p className="eyebrow">01 · Active recall</p><h2 id="flashcards-title">Flashcards</h2></div><span className="progress-pill">{index + 1} / {cards.length}</span></div>
    <button className={`flashcard ${revealed ? 'is-revealed' : ''}`} onClick={() => setRevealed((value) => !value)} aria-label={revealed ? 'Hide answer' : 'Reveal answer'}>
      <span className="flashcard-label">{revealed ? 'Answer' : 'Question'}</span><span className="flashcard-text">{revealed ? card.answer : card.question}</span><span className="flashcard-hint">{revealed ? 'Click to hide answer' : 'Click to reveal answer'}</span>
    </button>
    <div className="control-row"><button className="secondary-button" onClick={() => move(Math.max(0, index - 1))} disabled={index === 0}>Previous</button><button className="secondary-button" onClick={() => move(Math.min(cards.length - 1, index + 1))} disabled={index === cards.length - 1}>Next</button></div>
  </section>;
}