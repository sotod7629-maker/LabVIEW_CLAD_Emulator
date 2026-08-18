import { describe, expect, it } from 'vitest';
import { generateQuiz, selectAnswer } from './generateQuiz';
import { calculateScore, generateResults } from './scoring';
import type { QuizConfig, QuizSession } from './types';
import { makeBank } from '../test-support/factories';

const config: Omit<QuizConfig, 'seed'> = {
  language: 'es',
  questionCount: 10,
  mode: 'exam',
  categories: [],
  shuffleQuestions: true,
  shuffleOptions: true,
};

function build(count = 10): QuizSession {
  return generateQuiz({
    questions: makeBank(count).questions,
    config: { ...config, questionCount: count, seed: 42 },
  }).session;
}

/** Answer every question correctly, using the permanent option id. */
function answerAll(session: QuizSession, mode: 'correct' | 'wrong'): QuizSession {
  return session.questions.reduce((acc, question) => {
    const chosen =
      mode === 'correct'
        ? question.correctOptionId
        : question.options.find((o) => o.id !== question.correctOptionId)!.id;
    return selectAnswer(acc, question.questionId, chosen);
  }, session);
}

describe('calculateScore', () => {
  it('separates unanswered from incorrect', () => {
    const summary = calculateScore([
      { isAnswered: true, isCorrect: true },
      { isAnswered: true, isCorrect: false },
      { isAnswered: false, isCorrect: false },
      { isAnswered: false, isCorrect: false },
    ] as never);
    expect(summary).toEqual({
      total: 4,
      correct: 1,
      incorrect: 1,
      unanswered: 2,
      percentage: 25,
    });
  });

  it('computes the documented example: 21 of 25 is 84%', () => {
    const results = [
      ...Array.from({ length: 21 }, () => ({ isAnswered: true, isCorrect: true })),
      ...Array.from({ length: 4 }, () => ({ isAnswered: true, isCorrect: false })),
    ];
    expect(calculateScore(results as never).percentage).toBe(84);
  });

  it('rounds to one decimal consistently', () => {
    // 1/3 -> 33.333… -> 33.3
    const results = [
      { isAnswered: true, isCorrect: true },
      { isAnswered: true, isCorrect: false },
      { isAnswered: true, isCorrect: false },
    ];
    expect(calculateScore(results as never).percentage).toBe(33.3);
  });

  it('returns zero for an empty result set rather than NaN', () => {
    expect(calculateScore([])).toEqual({
      total: 0,
      correct: 0,
      incorrect: 0,
      unanswered: 0,
      percentage: 0,
    });
  });
});

describe('generateResults', () => {
  it('scores a fully correct attempt at 100%', () => {
    const results = generateResults(answerAll(build(), 'correct'));
    expect(results.summary).toMatchObject({
      total: 10,
      correct: 10,
      incorrect: 0,
      unanswered: 0,
      percentage: 100,
    });
    expect(results.results.every((r) => r.isCorrect)).toBe(true);
  });

  it('scores a fully incorrect attempt at 0% with nothing unanswered', () => {
    const results = generateResults(answerAll(build(), 'wrong'));
    expect(results.summary).toMatchObject({
      correct: 0,
      incorrect: 10,
      unanswered: 0,
      percentage: 0,
    });
  });

  it('reports every question as unanswered when nothing was selected', () => {
    const results = generateResults(build());
    expect(results.summary).toMatchObject({ correct: 0, incorrect: 0, unanswered: 10 });
    expect(results.results.every((r) => r.selectedAnswerText === null)).toBe(true);
  });

  it('grades by permanent option id, not by displayed position', () => {
    const session = build(20);
    const answered = answerAll(session, 'correct');
    const results = generateResults(answered);
    for (const result of results.results) {
      expect(result.selectedOptionId).toBe(result.correctOptionId);
      expect(result.selectedAnswerText).toBe(result.correctAnswerText);
      expect(result.isCorrect).toBe(true);
    }
  });

  it('carries the correct answer text even when the question was skipped', () => {
    const results = generateResults(build(3));
    for (const result of results.results) {
      expect(result.correctAnswerText).not.toBe('');
      expect(result.isAnswered).toBe(false);
      expect(result.isCorrect).toBe(false);
    }
  });

  it('is deterministic for the same session', () => {
    const session = answerAll(build(), 'correct');
    const finished = { ...session, finishedAt: '2026-01-01T00:00:10.000Z' };
    expect(generateResults(finished).summary).toEqual(generateResults(finished).summary);
  });

  it('computes a non-negative duration', () => {
    const session = build();
    const results = generateResults({
      ...session,
      startedAt: '2026-01-01T00:00:00.000Z',
      finishedAt: '2026-01-01T00:02:30.000Z',
    });
    expect(results.durationSeconds).toBe(150);
  });
});
