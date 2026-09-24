# 07 — AI Design

## AI Role
The LLM generates study content. It does not control the UI directly.

## Prompt Strategy
The backend sends:
1. System/instruction context.
2. User study input.
3. Exact output contract.
4. Constraints for factual, concise, and usable content.

## Prompt Contract
The model should return JSON only and match the canonical StudyResult structure.

Example instruction:

```text
Return ONLY valid JSON matching the StudyResult schema.
Do not include markdown fences.
Do not include explanations outside the JSON.
Generate concise but useful flashcards and multiple-choice quiz questions.
Ensure correctAnswer is a zero-based option index.
```

## Provider Boundary
The LLM provider should be replaceable without changing React components.

Provider adapter responsibility:
- Send request.
- Receive raw result.
- Extract text/structured content.
- Return a provider-agnostic value.

## Structured Output Reliability
The application should not assume the model always obeys the prompt.

Reliability sequence:

```
Prompt constraint
      ↓
Provider response
      ↓
Parse
      ↓
Validate
      ↓
Normalize
      ↓
Render
```

## Content Constraints
Generated content should:
- Remain relevant to the supplied topic/notes.
- Avoid empty questions/answers.
- Provide plausible distractors.
- Keep explanations concise.
- Avoid producing unusable arrays.

## Failure Mapping
| Failure | Handling |
|---|---|
| Provider error | Return generation error |
| Timeout | Return timeout/error state |
| Empty output | Treat as invalid generation |
| Invalid JSON | Parse error |
| Wrong shape | Validation error |
| Valid but unusable content | Invariant validation error |

## Model Choice
Any suitable provider may be used. The application architecture intentionally avoids coupling the UI to a single model.
