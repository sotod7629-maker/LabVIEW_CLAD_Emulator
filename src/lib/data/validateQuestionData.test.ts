import { describe, expect, it } from 'vitest';
import { validateQuestionData } from './validateQuestionData';
import { makeBank, makeQuestion } from '../test-support/factories';

const codes = (issues: { code: string }[]) => issues.map((i) => i.code);

describe('validateQuestionData', () => {
  it('accepts the real question bank shape', () => {
    const result = validateQuestionData(makeBank(10));
    expect(result.valid).toBe(true);
    expect(result.questions).toHaveLength(10);
    expect(result.issues).toHaveLength(0);
  });

  it.each([null, undefined, 42, 'text', []])('rejects a non-bank value: %s', (input) => {
    expect(validateQuestionData(input).valid).toBe(false);
  });

  it('rejects a bank with no questions array', () => {
    const result = validateQuestionData({ metadata: {}, categories: [] });
    expect(result.valid).toBe(false);
    expect(codes(result.issues)).toContain('missing-questions');
  });

  it('rejects an empty questions array', () => {
    const result = validateQuestionData({ questions: [] });
    expect(result.valid).toBe(false);
    expect(codes(result.issues)).toContain('empty-questions');
  });

  it('quarantines a duplicate id but keeps the first occurrence', () => {
    const result = validateQuestionData({
      questions: [makeQuestion({ id: 7 }), makeQuestion({ id: 7 }), makeQuestion({ id: 8 })],
    });
    expect(result.valid).toBe(true);
    expect(result.questions.map((q) => q.id)).toEqual([7, 8]);
    expect(codes(result.issues)).toContain('duplicate-id');
  });

  it('rejects a question whose correct answer is not one of its options', () => {
    const result = validateQuestionData({
      questions: [
        makeQuestion({ id: 1, correct_answer: 'd', options: { a: 'A', b: 'B' } as never }),
        makeQuestion({ id: 2 }),
      ],
    });
    expect(result.questions.map((q) => q.id)).toEqual([2]);
    expect(codes(result.issues)).toContain('correct-answer-not-an-option');
  });

  it.each([
    ['missing id', { id: undefined }, 'missing-id'],
    ['blank question text', { question: '   ' }, 'missing-question-text'],
    ['missing options', { options: undefined }, 'missing-options'],
    ['invalid correct answer key', { correct_answer: 'z' }, 'missing-correct-answer'],
  ])('rejects a question with %s', (_label, override, expected) => {
    const result = validateQuestionData({
      questions: [makeQuestion({ id: 1, ...override } as never), makeQuestion({ id: 2 })],
    });
    expect(codes(result.issues)).toContain(expected);
    expect(result.questions.map((q) => q.id)).toEqual([2]);
  });

  it('rejects a question left with fewer than two usable options', () => {
    const result = validateQuestionData({
      questions: [
        makeQuestion({ id: 1, options: { a: 'Only one' } as never }),
        makeQuestion({ id: 2 }),
      ],
    });
    expect(codes(result.issues)).toContain('too-few-options');
    expect(result.questions.map((q) => q.id)).toEqual([2]);
  });

  it('drops a blank option and reports it', () => {
    const result = validateQuestionData({
      questions: [makeQuestion({ id: 1, options: { a: 'A', b: '', c: 'C', d: 'D' } as never })],
    });
    expect(codes(result.issues)).toContain('empty-option');
    expect(Object.keys(result.questions[0]!.options)).toEqual(['a', 'c', 'd']);
  });

  it('treats a missing category as a warning, not a rejection', () => {
    const result = validateQuestionData({ questions: [makeQuestion({ category: '' })] });
    expect(result.valid).toBe(true);
    expect(result.issues[0]).toMatchObject({ severity: 'warning', code: 'missing-category' });
  });

  it('fails when no question survives validation', () => {
    const result = validateQuestionData({ questions: [{ nonsense: true }, null] });
    expect(result.valid).toBe(false);
    expect(codes(result.issues)).toContain('no-valid-questions');
  });

  it('preserves accents, emoji and very long text unchanged', () => {
    const prompt = `¿Qué ocurre con la señal 🌡 cuando ${'x'.repeat(500)}?`;
    const result = validateQuestionData({
      questions: [makeQuestion({ question: prompt, options: { a: 'ñ', b: 'é', c: '中', d: '🎉' } as never })],
    });
    expect(result.valid).toBe(true);
    expect(result.questions[0]!.question).toBe(prompt);
    expect(result.questions[0]!.options.d).toBe('🎉');
  });
});
