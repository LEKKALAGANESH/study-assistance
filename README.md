# Flam Study Assistant

A small React + TypeScript AI study tool for the Flam frontend internship assignment.

The app accepts free-form notes or a topic, sends them through a server-side Gemini API boundary, validates the returned JSON, and renders the result as interactive flashcards and a quiz. It is deliberately a study tool rather than a chatbot.

## What is implemented

- Free-form topic/notes input with client validation.
- Gemini structured JSON output using a server-side API key.
- Runtime validation before AI data reaches the study UI.
- Flashcard reveal, navigation, and progress.
- Multiple-choice quiz with immediate feedback and score.
- Re-test flow containing only incorrect questions.
- Explicit loading, empty, error, retry, and timeout handling.
- Request cancellation + sequence guard so stale responses cannot overwrite newer state.
- Responsive mobile layout and keyboard-accessible semantic controls.
- Unit tests for the core data contract and failure cases.

## Setup

Requirements: Node.js 20+ and a Gemini API key.

```bash
npm install
cp .env.example .env
# add your GEMINI_API_KEY to .env
npm start
```

Open http://localhost:8787.

For development with hot reload:

```bash
npm run dev
```

The Vite dev server is at http://localhost:5173 and proxies /api to the backend on port 8787.

## Testing

```bash
npm test
npm run build
```

## Architecture

```text
Browser
  PromptInput
      -> api.ts
      -> /api/generate
Server
  generate.ts
      -> strict prompt + Gemini structured output
      -> JSON parse + schema/invariant validation
      -> stable { data } response
Browser
  StudySet
      -> Flashcards
      -> Quiz
      -> Results / Re-test
```

The browser never receives the Gemini API key and never calls the provider directly.

## AI usage note

AI assistance was used during implementation for planning, code drafting, and review. The final architecture, validation rules, failure handling, and UI behavior were checked against the assignment documents and should be understood before the interview. The assignment explicitly permits AI tools but expects the candidate to understand and explain the submitted code.

## Known limitations

- No authentication or persistent sessions; both are outside the MVP scope.
- The app currently uses Gemini as the concrete provider, while the UI depends only on the stable application contract.
- The quality of generated study material still depends on the model and source material.
- Automated browser/E2E coverage is not included; the test suite focuses on contract validation and the core failure boundary.
- Deployment and screen recording remain submission steps outside the codebase.

## Time spent

Targeted implementation is intentionally scoped to the assignment's approximately 8-hour budget. Record the actual hands-on time in the final submission after completing the demo/QA pass.

## Assignment alignment

The project follows the supplied docs: contract-first design, server-side LLM access, validation before rendering, explicit failure states, stale-response protection, responsive UI, and a clean core over optional stretch features.