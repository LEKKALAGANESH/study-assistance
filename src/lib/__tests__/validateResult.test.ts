import { describe, expect, it } from 'vitest';
import { parseAndValidateStudyResult, validateStudyResult } from '../validateResult';

const valid = { title:'Closures', summary:'Scope captured by functions.', flashcards:[{id:'card-1',question:'What is a closure?',answer:'A function plus its lexical environment.'}], quiz:[{id:'q-1',question:'What does it preserve?',options:['Lexical environment','CSS','HTTP','DOM'],correctAnswer:0,explanation:'Closures retain lexical scope.'}] };

describe('study result validation', () => {
  it('accepts a valid result', () => expect(validateStudyResult(valid)).toEqual(valid));
  it('rejects malformed JSON', () => expect(() => parseAndValidateStudyResult('{bad')).toThrow('malformed JSON'));
  it('rejects empty responses', () => expect(() => parseAndValidateStudyResult('   ')).toThrow('empty response'));
  it('rejects missing required fields', () => { const copy={...valid}; delete (copy as any).summary; expect(() => validateStudyResult(copy)).toThrow(); });
  it('rejects empty collections', () => expect(() => validateStudyResult({...valid, flashcards:[]})).toThrow());
  it('rejects an invalid correctAnswer index', () => expect(() => validateStudyResult({...valid, quiz:[{...valid.quiz[0],correctAnswer:4}]})).toThrow('invalid correctAnswer'));
  it('rejects duplicate ids', () => expect(() => validateStudyResult({...valid, flashcards:[valid.flashcards[0],{...valid.flashcards[0],question:'Second'}]})).toThrow('duplicate flashcard IDs'));
});