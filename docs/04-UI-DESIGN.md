# 04 — UI Design

## Design Goal
Create a focused study workspace rather than a chatbot.

## Screen 1 — Input
### Elements
- Product title
- Short value proposition
- Large textarea
- Character/input guidance
- Generate button
- Small example prompt

### States
- Default
- Focus
- Validation error
- Submitting

## Screen 2 — Loading
### Elements
- Loading indicator
- Short status message
- Disable duplicate submission

## Screen 3 — Study Set
### Header
- Generated topic/title
- Short summary
- Reset/new study set action

### Flashcard section
- Progress indicator
- Question card
- Reveal/flip interaction
- Previous/next controls

### Quiz section
- Question
- Multiple-choice options
- Submit/next behavior
- Correct/incorrect feedback
- Progress

## Screen 4 — Results
### Elements
- Score
- Correct count
- Incorrect count
- Re-test incorrect questions

## Screen 5 — Error
### Elements
- Clear explanation
- Retry button
- Optional technical detail suitable for development builds

## Responsive Behavior
- Single-column layout on narrow screens.
- Large touch targets.
- Cards resize without clipping.
- Controls remain accessible without horizontal scrolling.

## Accessibility
- Semantic buttons and form controls.
- Visible focus states.
- Keyboard operation for all interactions.
- Meaningful labels and feedback.
- Do not rely on color alone to communicate quiz correctness.
