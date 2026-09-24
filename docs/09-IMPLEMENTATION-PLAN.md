# 09 — Implementation Plan

## Goal
Implement the smallest reliable core first, then polish only if time remains.

## Phase 1 — Project Foundation
- [ ] Initialize React/Vite project.
- [ ] Configure TypeScript.
- [ ] Add linting/formatting as appropriate.
- [ ] Create docs-aware folder structure.
- [ ] Add environment example.

## Phase 2 — Domain Contract
- [ ] Define StudyResult types.
- [ ] Define validation schema.
- [ ] Add representative valid/invalid fixtures.

## Phase 3 — Backend AI Boundary
- [ ] Create backend/serverless generate endpoint.
- [ ] Read provider key from environment.
- [ ] Build strict prompt.
- [ ] Call chosen LLM provider.
- [ ] Parse provider response.
- [ ] Validate output.
- [ ] Return stable response shape.

## Phase 4 — Frontend Data Flow
- [ ] Add api.ts.
- [ ] Add generation state.
- [ ] Add request concurrency guard.
- [ ] Add loading/error/empty states.

## Phase 5 — Study UI
- [ ] Build PromptInput.
- [ ] Build StudySet shell.
- [ ] Build FlashcardDeck.
- [ ] Build Quiz.
- [ ] Build Results.
- [ ] Build wrong-answer re-test.

## Phase 6 — Reliability Testing
- [ ] Empty input.
- [ ] Malformed JSON.
- [ ] Wrong schema.
- [ ] Empty content.
- [ ] Network failure.
- [ ] Slow response.
- [ ] Stale response.
- [ ] Retry.

## Phase 7 — Responsive / Accessibility
- [ ] Mobile viewport.
- [ ] Keyboard navigation.
- [ ] Focus states.
- [ ] Semantic controls.
- [ ] No horizontal overflow.

## Phase 8 — Submission
- [ ] README.
- [ ] AI-usage note.
- [ ] Known limitations.
- [ ] Time spent.
- [ ] Small meaningful commits.
- [ ] Screen recording.
- [ ] Deployment if time allows.

## Timebox
Target approximately 8 hours.

Suggested allocation:
- Planning/contracts: 45 min
- Foundation/backend: 90 min
- Core UI: 2.5 h
- Reliability/error handling: 1.5 h
- Testing/polish: 1 h
- README/demo/deployment: 45 min

The plan is intentionally flexible; reliability takes priority over optional polish.
