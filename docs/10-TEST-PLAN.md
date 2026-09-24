# 10 — Test Plan

## Test Strategy
Test the application at three levels:
1. Unit-level validation and utilities.
2. Integration-level AI request handling.
3. End-to-end user flows.

## Functional Test Matrix

| ID | Scenario | Expected |
|---|---|---|
| T01 | Valid topic | Study set renders |
| T02 | Valid notes | Study set renders |
| T03 | Empty input | Validation message |
| T04 | Valid JSON | Parses and renders |
| T05 | Malformed JSON | Error + retry |
| T06 | Missing required field | Validation error + retry |
| T07 | Empty flashcards | Error/invalid-result state |
| T08 | Invalid quiz index | Validation error |
| T09 | Network failure | Error + retry |
| T10 | Slow response | Loading state remains visible |
| T11 | Old response resolves late | Old response ignored |
| T12 | Retry after failure | New request can succeed |
| T13 | Flashcard reveal | Answer becomes visible |
| T14 | Quiz answer | Correct/incorrect state recorded |
| T15 | Re-test | Only wrong questions are re-tested |
| T16 | Mobile viewport | No clipping/horizontal overflow |
| T17 | Keyboard navigation | Interactive controls usable |

## Contract Tests
Test the validator with:
- valid result
- missing title
- missing summary
- missing flashcards
- missing question
- empty arrays
- invalid correctAnswer
- duplicate IDs
- wrong primitive types
- unexpected extra data

## Concurrency Test
1. Start request A.
2. Start request B.
3. Make B resolve first.
4. Make A resolve later.
5. Verify only B remains in state.

## Manual QA Checklist
- [ ] Refresh page.
- [ ] Generate from a short topic.
- [ ] Generate from pasted notes.
- [ ] Navigate all flashcards.
- [ ] Complete quiz.
- [ ] Confirm score.
- [ ] Re-test incorrect questions.
- [ ] Trigger an error.
- [ ] Retry.
- [ ] Test narrow mobile viewport.
- [ ] Keyboard-only pass through core controls.

## Exit Criteria
The core flow is ready when all critical functional and failure-path tests pass.
