import { describe, expect, it } from 'vitest';
import { measureCoverage, parseTranslations } from './translations';
import { generateQuiz } from '../quiz/generateQuiz';
import { makeBank } from '../test-support/factories';

describe('parseTranslations', () => {
  it('reads a well-formed overlay', () => {
    const lookup = parseTranslations({
      language: 'en',
      provenance: 'test',
      translations: {
        '1': { question: 'Q1?', options: { a: 'A', b: 'B', c: 'C', d: 'D' }, explanation: 'E' },
      },
    });
    expect(lookup.get(1)?.question).toBe('Q1?');
    expect(lookup.get(1)?.options?.a).toBe('A');
  });

  it.each([null, undefined, 'nope', 42, { translations: 'bad' }])(
    'returns an empty lookup for malformed input: %s',
    (input) => {
      expect(parseTranslations(input).size).toBe(0);
    },
  );

  it('drops entries with a non-numeric key or empty content', () => {
    const lookup = parseTranslations({
      translations: { abc: { question: 'x' }, '2': {}, '3': { question: '   ' } },
    });
    expect(lookup.size).toBe(0);
  });

  it('keeps a partial entry rather than discarding it wholesale', () => {
    const lookup = parseTranslations({
      translations: { '5': { options: { a: 'Only A' } } },
    });
    expect(lookup.get(5)?.options).toEqual({ a: 'Only A' });
    expect(lookup.get(5)?.question).toBeUndefined();
  });

  it('ignores an overlay attempting to override the correct answer', () => {
    const lookup = parseTranslations({
      translations: { '1': { question: 'Q', correct_answer: 'd', correctAnswer: 2 } as never },
    });
    // The overlay type carries no answer field, so nothing can leak through.
    expect(JSON.stringify(lookup.get(1))).not.toContain('correct');
  });
});

describe('measureCoverage', () => {
  it('classifies complete, partial and missing translations', () => {
    const questions = makeBank(3).questions;
    const lookup = parseTranslations({
      translations: {
        '1': {
          question: 'Q1',
          options: { a: 'a', b: 'b', c: 'c', d: 'd' },
        },
        '2': { question: 'Q2', options: { a: 'a' } },
      },
    });
    expect(measureCoverage(questions, lookup)).toEqual({
      complete: 1,
      partial: 1,
      missing: 1,
    });
  });
});

describe('translation overlay applied to a quiz', () => {
  const bank = makeBank(4);

  it('never lets a translation change which option is correct', () => {
    const lookup = parseTranslations({
      translations: Object.fromEntries(
        bank.questions.map((q) => [
          String(q.id),
          {
            question: `EN ${q.id}`,
            // Deliberately scrambled English text per letter.
            options: { a: 'EN-a', b: 'EN-b', c: 'EN-c', d: 'EN-d' },
          },
        ]),
      ),
    });

    const { session } = generateQuiz({
      questions: bank.questions,
      config: {
        language: 'en',
        questionCount: 4,
        mode: 'exam',
        categories: [],
        shuffleQuestions: true,
        shuffleOptions: true,
        seed: 5,
      },
      translations: lookup,
    });

    for (const question of session.questions) {
      const source = bank.questions.find((q) => q.id === question.questionId)!;
      // Correctness still comes from the untouched bank.
      expect(question.correctOptionId).toBe(source.correct_answer);
      const shown = question.options.find((o) => o.id === question.correctOptionId);
      expect(shown?.text).toBe(`EN-${source.correct_answer}`);
      expect(question.translationFallback).toBe(false);
    }
  });

  it('falls back to Spanish and flags it when a translation is missing', () => {
    const { session } = generateQuiz({
      questions: bank.questions,
      config: {
        language: 'en',
        questionCount: 4,
        mode: 'exam',
        categories: [],
        shuffleQuestions: false,
        shuffleOptions: false,
        seed: 1,
      },
      translations: new Map(),
    });
    for (const question of session.questions) {
      expect(question.translationFallback).toBe(true);
      const source = bank.questions.find((q) => q.id === question.questionId)!;
      expect(question.prompt).toBe(source.question);
    }
  });
});
