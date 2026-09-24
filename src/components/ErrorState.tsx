type ErrorStateProps = { message: string; onRetry: () => void };
export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return <section className="state-card error-card" role="alert"><div className="state-icon" aria-hidden="true">!</div><h2>We couldn't generate this study set</h2><p>{message}</p><button className="primary-button" onClick={onRetry}>Try again</button></section>;
}