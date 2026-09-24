import { FormEvent, useState } from 'react';

type PromptInputProps = { disabled: boolean; onSubmit: (input: string) => void };
const example = 'Explain JavaScript closures for a beginner preparing for an interview.';

export function PromptInput({ disabled, onSubmit }: PromptInputProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  function submit(event: FormEvent) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) { setError('Enter a topic or paste some study notes first.'); return; }
    if (trimmed.length > 6000) { setError('Please keep your input under 6,000 characters.'); return; }
    setError('');
    onSubmit(trimmed);
  }

  return (
    <form className="prompt-card" onSubmit={submit} aria-busy={disabled}>
      <label htmlFor="study-input">What do you want to study?</label>
      <textarea id="study-input" value={value}
        onChange={(event) => { setValue(event.target.value); if (error) setError(''); }}
        placeholder="Paste notes or describe a topic…" rows={8} maxLength={6000} disabled={disabled}
        aria-describedby="input-help input-count input-error" aria-invalid={Boolean(error)} />
      <div className="input-meta"><span id="input-help">The AI will create flashcards and a multiple-choice quiz.</span><span id="input-count">{value.length}/6000</span></div>
      {error && <p id="input-error" className="field-error" role="alert">{error}</p>}
      <div className="prompt-actions">
        <button type="submit" className="primary-button" disabled={disabled}>{disabled ? 'Generating…' : 'Generate Study Set'}</button>
        <button type="button" className="example-button" onClick={() => setValue(example)} disabled={disabled}>Use example</button>
      </div>
    </form>
  );
}