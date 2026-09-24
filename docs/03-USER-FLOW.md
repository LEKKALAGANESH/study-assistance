# 03 — User Flow

## Primary Flow

```
Landing / Input
      |
      v
Enter topic or notes
      |
      v
Click "Generate Study Set"
      |
      v
Validate client input
      |
      +---- invalid ----> Input error
      |
      v
Loading state
      |
      v
Backend request
      |
      +---- failed -----> Error + Retry
      |
      v
Parse response
      |
      +---- invalid ----> Error + Retry
      |
      v
Validate schema
      |
      +---- invalid ----> Error + Retry
      |
      v
Study set
   /         v         v
Flashcards  Quiz
              |
              v
         Quiz summary
              |
              v
         Wrong answers
              |
              v
           Re-test
```

## Error Flows

### Empty input
Input remains on screen and shows a validation message.

### Slow request
Loading state remains visible. The UI must not silently appear frozen.

### Request failure
Show a recoverable error and a retry action.

### Malformed JSON
Treat parsing failure as an error. Do not render raw model output as the main UI.

### Wrong shape
Treat structurally invalid JSON as an error.

### Stale response
Only the latest active request may update the displayed result.

## Reset Flow
User can start a new generation from the same screen, replacing the current study set only after a valid response is accepted.
