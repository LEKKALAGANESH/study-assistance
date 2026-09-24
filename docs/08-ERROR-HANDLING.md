# 08 — Error Handling

## Reliability Principle
Every external AI request is untrusted and may fail. The application should fail explicitly, safely, and recoverably.

## Error Taxonomy

### E-01 Input Error
Cause: empty/invalid user input.

Response:
- Stay on input screen.
- Show validation message.

### E-02 Network Error
Cause: browser cannot reach backend.

Response:
- Error state.
- Retry action.

### E-03 Provider Error
Cause: LLM provider returns an error.

Response:
- Error state.
- Retry action.
- Do not expose sensitive provider details.

### E-04 Timeout
Cause: response takes too long.

Response:
- Stop waiting.
- Show timeout message.
- Offer retry.

### E-05 Malformed JSON
Cause: provider returns non-JSON or broken JSON.

Response:
- Catch parse exception.
- Do not render raw result as the main study UI.
- Show retryable error.

### E-06 Wrong Shape
Cause: JSON is valid but does not match the contract.

Response:
- Schema validation fails.
- Show a structured error state.

### E-07 Empty Result
Cause: arrays are empty or content is unusable.

Response:
- Treat as failed generation.
- Offer retry.

### E-08 Stale Response
Cause: earlier request resolves after a newer request.

Response:
- Ignore the old result.
- Preserve the latest request state.

## Request Guard

Concept:

```ts
const requestId = useRef(0);

async function generate(input: string) {
  const id = ++requestId.current;
  const result = await callApi(input);

  if (id !== requestId.current) return;

  setResult(result);
}
```

## User-Facing Error Copy
Errors should explain what happened and what the user can do next.

Good:
> "We couldn't generate this study set. Please try again."

Avoid exposing:
- API keys
- Internal stack traces
- Provider secrets
- Raw untrusted model output

## Recovery
Every recoverable generation failure should have a retry path.
