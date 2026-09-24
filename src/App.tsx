import { useRef, useState } from 'react';
import { ErrorState } from './components/ErrorState';
import { LoadingState } from './components/LoadingState';
import { PromptInput } from './components/PromptInput';
import { StudySet } from './components/StudySet';
import { generateStudySet } from './lib/api';
import { getErrorMessage } from './lib/errors';
import type { StudyResult } from './types/result';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function App() {
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<StudyResult | null>(null);
  const [error, setError] = useState('');
  const [lastInput, setLastInput] = useState('');

  // A new request gets a new id. Older responses are ignored.
  const requestId = useRef(0);
  const abortController = useRef<AbortController | null>(null);

  async function generate(input: string) {
    const id = ++requestId.current;

    abortController.current?.abort();
    const controller = new AbortController();
    abortController.current = controller;

    setLastInput(input);
    setError('');
    setStatus('loading');

    try {
      const studySet = await generateStudySet(input, controller.signal);

      if (id !== requestId.current) return;

      setResult(studySet);
      setStatus('success');
    } catch (cause) {
      if (id !== requestId.current) return;
      if (cause instanceof DOMException && cause.name === 'AbortError') return;

      setError(getErrorMessage(cause));
      setStatus('error');
    }
  }

  function startOver() {
    requestId.current += 1;
    abortController.current?.abort();
    abortController.current = null;
    setResult(null);
    setError('');
    setStatus('idle');
  }

  return (
    <div className="app">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <div className="brand" aria-label="Flam Study">
          <span className="brand-mark" aria-hidden="true">F</span>
          <span>Flam Study</span>
        </div>
        <span className="assignment-badge">Frontend Internship</span>
      </header>

      {status === 'success' && result ? (
        <StudySet result={result} onReset={startOver} />
      ) : (
        <main className="hero">
          <section className="hero-copy">
            <p className="eyebrow">AI-powered active recall</p>
            <h1>Turn your notes into a study session.</h1>
            <p className="hero-subtitle">
              Paste a topic or your own notes. Flam turns them into interactive
              flashcards and a quiz, then helps you revisit what you missed.
            </p>
          </section>

          {status === 'loading' && <LoadingState />}
          {status === 'error' && (
            <ErrorState message={error} onRetry={() => generate(lastInput)} />
          )}
          {status === 'idle' && (
            <PromptInput disabled={false} onSubmit={generate} />
          )}
        </main>
      )}

      <footer className="footer">
        <span>Structured AI output · validated before render</span>
        <span>Built with React + Gemini</span>
      </footer>
    </div>
  );
}