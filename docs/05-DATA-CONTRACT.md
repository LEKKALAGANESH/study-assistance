# 05 — Data Contract

## Purpose
The data contract is the boundary between unpredictable AI output and predictable application state.

## Canonical Study Result

```json
{
  "title": "JavaScript Closures",
  "summary": "A concise explanation of the topic.",
  "flashcards": [
    {
      "id": "card-1",
      "question": "What is a closure?",
      "answer": "A function together with its surrounding lexical environment."
    }
  ],
  "quiz": [
    {
      "id": "q-1",
      "question": "What does a closure preserve?",
      "options": [
        "Lexical environment",
        "CSS rules",
        "HTTP state",
        "DOM layout"
      ],
      "correctAnswer": 0,
      "explanation": "A closure retains access to variables from its lexical scope."
    }
  ]
}
```

## Type-Level Contract

```ts
type Flashcard = {
  id: string;
  question: string;
  answer: string;
};

type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type StudyResult = {
  title: string;
  summary: string;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
};
```

## Invariants
- Root result is an object.
- `title` and `summary` are non-empty strings.
- `flashcards` is a non-empty array.
- Every flashcard has non-empty `id`, `question`, and `answer`.
- `quiz` is a non-empty array.
- Every quiz question has at least two options.
- `correctAnswer` is an integer within the option range.
- All IDs are unique within their collection.

## Validation Policy
Invalid data must not reach the main study components.

Recommended flow:

```
raw response
   -> JSON parse
   -> schema validation
   -> invariant checks
   -> normalized StudyResult
   -> React state
```

## Evolution Rule
If the contract changes, update:
1. Types/schema.
2. Validation.
3. AI prompt.
4. Test fixtures.
5. UI assumptions.
