import { type FormEvent, useState } from 'react';

type PromptInputProps = {
  disabled: boolean;
  onSubmit: (input: string) => void;
};

const MAX_INPUT_LENGTH = 6000;
const EXAMPLE_INPUT =
  'Explain JavaScript closures for a beginner preparing for an interview.';

export function PromptInput({ disabled, onSubmit }: PromptInputProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const input = value.trim();

    if (!input) {
      setError('Enter a topic or paste some study notes first.');
      return;
    }

    if (input.length > MAX_INPUT_LENGTH) {
      setError(`Please keep your input under ${MAX_INPUT_LENGTH.toLocaleString()} characters.`);
      return;
    }

    setError('');
    onSubmit(input);
  }

  function useExample() {
    setValue(EXAMPLE_INPUT);
    setError('');
  }

  return (
    <form className="prompt-card" onSubmit={submit} aria-busy={disabled}>
      <div className="prompt-heading">
        <label htmlFor="study-input">What do you want to study?</label>
        <span className="prompt-type">Topic or notes</span>
      </div>

      <textarea
        id="study-input"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          if (error) setError('');
        }}
        placeholder="Paste notes or describe a topic…"
        rows={8}
        maxLength={MAX_INPUT_LENGTH}
        disabled={disabled}
        aria-describedby="input-help input-count input-error"
        aria-invalid={Boolean(error)}
      />

      <div className="input-meta">
        <span id="input-help">
          The AI will create flashcards and a multiple-choice quiz.
        </span>
        <span id="input-count" aria-live="polite">
          {value.length.toLocaleString()}/{MAX_INPUT_LENGTH.toLocaleString()}
        </span>
      </div>

      {error && (
        <p id="input-error" className="field-error" role="alert">
          {error}
        </p>
      )}

      <div className="prompt-actions">
        <button type="submit" className="primary-button" disabled={disabled}>
          {disabled ? 'Generating…' : 'Generate Study Set'}
        </button>
        <button
          type="button"
          className="example-button"
          onClick={useExample}
          disabled={disabled}
        >
          Use example
        </button>
      </div>
    </form>
  );
}