# 06 — Architecture

## Architecture Style
Small layered React application with a backend/serverless AI boundary.

## High-Level Architecture

```
+--------------------------- Browser ---------------------------+
|                                                               |
|  PromptInput                                                  |
|       |                                                       |
|       v                                                       |
|  api.ts ---------> HTTP request                              |
|                                                               |
|  React State <--- Validated StudyResult                      |
|       |                                                       |
|       +----> FlashcardDeck                                   |
|       +----> Quiz                                            |
|       +----> Results                                         |
|       +----> Loading/Error/Empty                             |
+-----------------------------|---------------------------------+
                              |
                              v
+--------------------------- Server ----------------------------+
|                                                               |
|  /generate endpoint                                           |
|       |                                                       |
|       +--> prompt builder                                    |
|       +--> LLM provider                                      |
|       +--> parse/validate/normalize                          |
|       +--> safe JSON response                                |
|                                                               |
+-----------------------------|---------------------------------+
                              |
                              v
                       External LLM API
```

## Frontend Layers

### Components
Presentation and interaction:
- PromptInput
- StudySet
- FlashcardDeck
- Flashcard
- Quiz
- QuizQuestion
- QuizResults
- ErrorState
- LoadingState

### State
Keep state close to the feature that owns it. A small application does not require a global state library.

Suggested state domains:
- generation status
- current study result
- flashcard index
- quiz answers
- wrong-answer collection

### Lib
- api client
- schema validation
- utility functions

### Types
Shared TypeScript contracts.

## Backend Responsibilities
- Keep provider credentials private.
- Construct the model prompt.
- Call the LLM.
- Parse the model response.
- Validate the expected schema.
- Return a stable application response.
- Map provider errors to safe client errors.

## Boundary Principle
The browser should depend on the application's stable result contract, not directly on the shape or SDK of a specific LLM provider.

## Request Concurrency
Use a request sequence/token guard and/or cancellation strategy so an older response cannot replace a newer one.

## Security
- Store provider credentials in environment variables.
- Do not expose secrets through Vite public variables.
- Do not log secrets.
- Do not trust client-provided structured output.

## Architecture Trade-offs
### Why no database?
Authentication and persistence are not required for the assignment. Adding a database increases scope without helping the core evaluation areas.

### Why no global state library?
The state is local and feature-oriented. React hooks are sufficient and keep the implementation explainable.

### Why validate at the boundary?
The model is an untrusted producer of structured data. Validation protects all downstream UI components.
