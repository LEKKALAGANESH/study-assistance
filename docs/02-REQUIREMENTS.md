# 02 — Requirements

## Functional Requirements

### FR-01 Input
The user can enter free-form notes or a study topic.

### FR-02 Generate
The application sends the input to a backend endpoint that invokes an LLM.

### FR-03 Structured Output
The LLM response must conform to the defined study-result schema.

### FR-04 Parsing
The backend/client pipeline parses the returned JSON.

### FR-05 Validation
Parsed data must be validated against the expected structure before UI rendering.

### FR-06 Flashcards
Users can view a generated flashcard question and reveal its answer.

### FR-07 Quiz
Users can answer generated multiple-choice questions.

### FR-08 Quiz Feedback
The UI records whether each quiz answer is correct or incorrect and provides appropriate feedback.

### FR-09 Wrong-Answer Re-test
Incorrectly answered questions can be re-tested after the main quiz.

### FR-10 Loading
The application shows a clear loading state while generation is in progress.

### FR-11 Empty
The application handles an empty or unusable generated result as an error/empty state.

### FR-12 Error
Failed requests, malformed JSON, invalid shape, and other generation errors produce a visible error state with retry.

### FR-13 Stale Responses
An older request cannot overwrite the result of a newer request.

### FR-14 Security
The LLM API key is never shipped to the browser.

### FR-15 Responsive UI
The application remains usable on mobile-width screens.

## Non-Functional Requirements

### NFR-01 Reliability
No unhandled AI response should crash the UI.

### NFR-02 Maintainability
AI integration, validation, UI components, and data types should be separated.

### NFR-03 Explainability
Important architecture decisions should be straightforward to explain in an interview.

### NFR-04 Performance
The UI should provide immediate feedback and avoid indefinite waiting.

### NFR-05 Accessibility
Interactive controls should be keyboard reachable and have understandable labels.

### NFR-06 Simplicity
The solution should remain within the assignment time budget.

## Acceptance Criteria

A feature is accepted when:
- The happy path works end-to-end.
- Expected invalid outputs are handled explicitly.
- UI state remains internally consistent.
- No secret API key is exposed client-side.
- The behavior is understandable from the README and code structure.
