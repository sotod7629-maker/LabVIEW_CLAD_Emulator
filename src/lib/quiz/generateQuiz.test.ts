import { describe, expect, it } from 'vitest';
import {
  countUnanswered,
  generateQuiz,
  goToQuestion,
  QuizGenerationError,
  selectAnswer,
} from './generateQuiz';
import type { QuizConfig } from './types';
import { makeBank, makeQuestion } from '../test-support/factories';

const baseConfig: Omit<QuizConfig, 'seed'> = {
  language: 'es',
  questionCount: 5,
  mode: 'exam',
  categories: [],
  shuffleQuestions: true,
  shuffleOptions: true,
};

describe('generateQuiz', () => {
  it('produces the requested number of questions', () => {
    const bank = makeBank(50);
    const { session, shortfall } = generateQuiz({
      questions: bank.questions,
      config: { ...baseConfig, questionCount: 25 },
    });
    expect(session.questions).toHaveLength(25);
    expect(shortfall).toBeNull();
  });

  it.each([1, 100])('supports a quiz of %i questions', (count) => {
    const { session } = generateQuiz({
      questions: makeBank(120).questions,
      config: { ...baseConfig, questionCount: count },
    });
    expect(session.questions).toHaveLength(count);
  });

  it('never repeats a question to reach the requested count', () => {
    const { session, shortfall } = generateQuiz({
      questions: makeBank(8).questions,
      config: { ...baseConfig, questionCount: 40 },
    });
    expect(session.questions).toHaveLength(8);
    expect(shortfall).toEqual({ requested: 40, available: 8 });
    const ids = session.questions.map((q) => q.questionId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each([0, -1, 101, 1.5, Number.NaN])('rejects an out-of-range count: %s', (count) => {
    expect(() =>
      generateQuiz({
        questions: makeBank(10).questions,
        config: { ...baseConfig, questionCount: count },
      }),
    ).toThrow(QuizGenerationError);
  });

  it('rejects generation when no question matches the selected categories', () => {
    expect(() =>
      generateQuiz({
        questions: makeBank(10).questions,
        config: { ...baseConfig, categories: ['Inexistente'] },
      }),
    ).toThrow(QuizGenerationError);
  });

  it('filters by category', () => {
    const { session } = generateQuiz({
      questions: makeBank(20).questions,
      config: { ...baseConfig, questionCount: 5, categories: ['Arrays'] },
    });
    expect(session.questions.every((q) => q.category === 'Arrays')).toBe(true);
  });

  it('preserves the original bank id rather than the array index', () => {
    const questions = [
      makeQuestion({ id: 482, question: 'A' }),
      makeQuestion({ id: 17, question: 'B' }),
    ];
    const { session } = generateQuiz({
      questions,
      config: { ...baseConfig, questionCount: 2, shuffleQuestions: false },
    });
    expect(session.questions.map((q) => q.questionId)).toEqual([482, 17]);
    expect(session.questions.map((q) => q.position)).toEqual([1, 2]);
  });

  it('is reproducible for a given seed', () => {
    const questions = makeBank(60).questions;
    const first = generateQuiz({
      questions,
      config: { ...baseConfig, questionCount: 10, seed: 12345 },
    }).session;
    const second = generateQuiz({
      questions,
      config: { ...baseConfig, questionCount: 10, seed: 12345 },
    }).session;
    expect(second.questions.map((q) => q.questionId)).toEqual(
      first.questions.map((q) => q.questionId),
    );
    expect(second.questions[0]!.options.map((o) => o.id)).toEqual(
      first.questions[0]!.options.map((o) => o.id),
    );
  });
});

describe('option shuffling integrity', () => {
  /**
   * The bank ships every question with correct_answer === 'a'. If shuffling
   * ever desynchronised the correct answer from its option, the entire quiz
   * would silently grade against whatever landed in first position. This is
   * the single most important invariant in the application.
   */
  it('keeps the correct option paired with its original text under shuffling', () => {
    const bank = makeBank(100);
    for (let seed = 0; seed < 40; seed += 1) {
      const { session } = generateQuiz({
        questions: bank.questions,
        config: { ...baseConfig, questionCount: 100, seed },
      });

      for (const question of session.questions) {
        const source = bank.questions.find((q) => q.id === question.questionId)!;
        // The correct option id is exactly the bank's correct_answer …
        expect(question.correctOptionId).toBe(source.correct_answer);
        // … and the text under that id is the bank's correct text.
        const shown = question.options.find((o) => o.id === question.correctOptionId);
        expect(shown?.text).toBe(source.options[source.correct_answer]);
      }
    }
  });

  it('preserves the full option set, changing only the order', () => {
    const bank = makeBank(30);
    const { session } = generateQuiz({
      questions: bank.questions,
      config: { ...baseConfig, questionCount: 30, seed: 99 },
    });
    for (const question of session.questions) {
      const source = bank.questions.find((q) => q.id === question.questionId)!;
      expect(question.options.map((o) => o.id).sort()).toEqual(['a', 'b', 'c', 'd']);
      for (const option of question.options) {
        expect(option.text).toBe(source.options[option.id]);
      }
    }
  });

  it('actually reorders options across a sample of questions', () => {
    const { session } = generateQuiz({
      questions: makeBank(100).questions,
      config: { ...baseConfig, questionCount: 100, seed: 7 },
    });
    const reordered = session.questions.filter(
      (q) => q.options.map((o) => o.id).join('') !== 'abcd',
    );
    // With 100 questions the probability of no reordering is negligible.
    expect(reordered.length).toBeGreaterThan(50);
  });

  it('leaves order untouched when shuffling is disabled', () => {
    const { session } = generateQuiz({
      questions: makeBank(10).questions,
      config: { ...baseConfig, questionCount: 10, shuffleOptions: false, seed: 3 },
    });
    for (const question of session.questions) {
      expect(question.options.map((o) => o.id)).toEqual(['a', 'b', 'c', 'd']);
    }
  });
});

describe('answering and navigation', () => {
  const build = () =>
    generateQuiz({
      questions: makeBank(5).questions,
      config: { ...baseConfig, questionCount: 5, seed: 1 },
    }).session;

  it('records and clears an answer without touching other questions', () => {
    const session = build();
    const target = session.questions[2]!;
    const answered = selectAnswer(session, target.questionId, 'c');
    expect(answered.answers[target.questionId]).toBe('c');
    expect(countUnanswered(answered)).toBe(4);

    const cleared = selectAnswer(answered, target.questionId, null);
    expect(cleared.answers[target.questionId]).toBeNull();
    expect(countUnanswered(cleared)).toBe(5);
  });

  it('retains answers while navigating', () => {
    let session = build();
    session = selectAnswer(session, session.questions[0]!.questionId, 'b');
    session = goToQuestion(session, 3);
    session = goToQuestion(session, 0);
    expect(session.answers[session.questions[0]!.questionId]).toBe('b');
  });

  it('ignores an unknown question id', () => {
    const session = build();
    expect(selectAnswer(session, 99999, 'a')).toBe(session);
  });

  it('clamps navigation to the available range', () => {
    const session = build();
    expect(goToQuestion(session, -5).currentIndex).toBe(0);
    expect(goToQuestion(session, 999).currentIndex).toBe(4);
  });
});
