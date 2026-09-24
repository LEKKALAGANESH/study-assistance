# 01 — Product Requirements Document (PRD)

## Product
AI Study Assistant

## Context
This project is a frontend internship assignment. The application accepts free-form study notes or a topic, sends the input to an LLM, receives structured data, and turns the result into an interactive study experience.

The assignment is intentionally not a chatbot. The core product value is converting unpredictable AI output into reliable, interactive UI.

## Problem
Students often have notes or a topic but need a quick way to turn that material into active-recall practice.

## Goal
Build a small, reliable study assistant that:
- Accepts a topic or pasted notes.
- Generates flashcards and a quiz using an LLM.
- Lets the user interact with the generated material.
- Lets the user retry questions they answered incorrectly.
- Handles malformed, invalid, empty, slow, and failed AI responses without crashing.

## Target User
A learner who wants a fast way to turn study material into practice questions.

## Core User Journey
1. User enters a topic or notes.
2. User submits the request.
3. Application shows a loading state.
4. Backend calls the LLM.
5. Response is parsed and validated.
6. Valid study data is rendered.
7. User studies flashcards and takes the quiz.
8. Incorrect quiz answers are collected for re-test.
9. User can retry generation after an error.

## MVP Scope
### In scope
- Free-form input.
- Backend/serverless proxy for LLM requests.
- Structured JSON response.
- Runtime validation before rendering.
- Flashcard interaction.
- Quiz interaction.
- Wrong-answer re-test.
- Loading, empty, error, and retry states.
- Stale-response protection.
- Responsive/mobile UI.
- README and demo documentation.

### Out of scope
- Authentication.
- Persistent user accounts.
- Collaborative study.
- Chat interface.
- Full analytics platform.
- Production-grade multi-tenant infrastructure.

## Success Criteria
- The app never renders unvalidated AI data.
- The user can complete the full study flow from input to re-test.
- API keys are not exposed in the browser.
- A malformed or failed model response results in a useful error state rather than a crash.
- A slower older request cannot overwrite a newer request.
- The application is understandable and explainable during the interview.

## Constraints
- Target implementation time: about 8 hours.
- React with hooks and functional components.
- Any LLM provider is allowed.
- No authentication is required.
- Core functionality takes priority over stretch features.

## Evaluation Alignment
The assignment weights:
- React & frontend architecture — 25%
- AI integration & data handling — 25%
- Handling bad AI output — 20%
- UI/UX & product sense — 15%
- Communication & understanding — 15%

## Product Principles
1. Contract before UI.
2. Validate before render.
3. Fail visibly and recoverably.
4. Keep AI concerns behind a clear boundary.
5. Prefer a small reliable core over many fragile features.
