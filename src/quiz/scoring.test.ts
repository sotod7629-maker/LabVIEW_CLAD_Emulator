import { describe, expect, it } from 'vitest';
import { buildQuizResults, calculateScore, generateResults } from './scoring';
import { generateQuiz, selectAnswer } from './generateQuiz';
import { makeQuestions } from '../test/fixtures';
import type { QuizConfig, QuizSession } from './types';

const CONFIG: QuizConfig = {
  uiLanguage: 'es',
  contentLanguage: 'es',
  questionCount: 25,
  categories: [],
  difficulties: [],
  mode: 'quiz',
  shuffleQuestions: true,
  shuffleOptions: true,
};

function answerAll(session: QuizSession, pick: (index: number) => 'correct' | 'wrong' | 'skip'): QuizSession {
  let current = session;
  session.items.forEach((item, index) => {
    const choice = pick(index);
    if (choice === 'skip') return;
    const correctId = item.question.correctOptionId;
    const optionId =
      choice === 'correct'
        ? correctId
        : item.displayOptions.find((option) => option.id !== correctId)!.id;
    current = selectAnswer(current, item.questionId, optionId);
  });
  return current;
}

describe('scoring', () => {
  const questions = makeQuestions(100);

  it('scores 21/25 as 84%', () => {
    const session = generateQuiz({ questions, config: CONFIG, seed: 11 });
    const answered = answerAll(session, (index) => (index < 21 ? 'correct' : index < 24 ? 'wrong' : 'skip'));
    const summary = calculateScore(generateResults(answered, 'es'));

    expect(summary).toEqual({ total: 25, correct: 21, incorrect: 3, unanswered: 1, percentage: 84 });
  });

  it('grades correctly against the shuffled display order', () => {
    // Selecting the correct *id* must score as correct regardless of where the
    // option was rendered.
    const session = generateQuiz({ questions, config: { ...CONFIG, questionCount: 100 }, seed: 777 });
    const answered = answerAll(session, () => 'correct');
    const summary = calculateScore(generateResults(answered, 'es'));
    expect(summary.correct).toBe(100);
    expect(summary.percentage).toBe(100);
  });

  it('scores an all-wrong paper at 0% without counting anything as unanswered', () => {
    const session = generateQuiz({ questions, config: CONFIG, seed: 5 });
    const summary = calculateScore(generateResults(answerAll(session, () => 'wrong'), 'es'));
    expect(summary).toEqual({ total: 25, correct: 0, incorrect: 25, unanswered: 0, percentage: 0 });
  });

  it('keeps unanswered distinct from incorrect', () => {
    const session = generateQuiz({ questions, config: CONFIG, seed: 6 });
    const summary = calculateScore(generateResults(session, 'es'));
    expect(summary).toEqual({ total: 25, correct: 0, incorrect: 0, unanswered: 25, percentage: 0 });
  });

  it('handles a one-question quiz', () => {
    const session = generateQuiz({ questions, config: { ...CONFIG, questionCount: 1 }, seed: 2 });
    expect(calculateScore(generateResults(answerAll(session, () => 'correct'), 'es')).percentage).toBe(100);
    expect(calculateScore(generateResults(session, 'es')).percentage).toBe(0);
  });

  it('rounds a repeating percentage to one decimal', () => {
    const session = generateQuiz({ questions, config: { ...CONFIG, questionCount: 3 }, seed: 8 });
    const answered = answerAll(session, (index) => (index === 0 ? 'correct' : 'wrong'));
    expect(calculateScore(generateResults(answered, 'es')).percentage).toBe(33.3);
  });

  it('records the selected and correct option text for every question', () => {
    const session = generateQuiz({ questions, config: { ...CONFIG, questionCount: 4 }, seed: 3 });
    const answered = answerAll(session, (index) => (index % 2 === 0 ? 'correct' : 'skip'));
    const results = generateResults(answered, 'es');

    for (const result of results) {
      const item = answered.items.find((entry) => entry.questionId === result.questionId)!;
      const correctOption = item.question.options.find(
        (option) => option.id === item.question.correctOptionId,
      )!;
      expect(result.correctOptionId).toBe(item.question.correctOptionId);
      expect(result.correctOptionText).toBe(correctOption.text.es);
      expect(result.options).toHaveLength(4);
      if (result.isAnswered) {
        expect(result.selectedOptionText).not.toBeNull();
        expect(result.outcome).toBe(result.isCorrect ? 'correct' : 'incorrect');
      } else {
        expect(result.selectedOptionId).toBeNull();
        expect(result.outcome).toBe('unanswered');
      }
    }
  });

  it('is deterministic — the same session always grades the same', () => {
    const session = generateQuiz({ questions, config: CONFIG, seed: 42 });
    const answered = answerAll(session, (index) => (index % 3 === 0 ? 'correct' : 'wrong'));
    expect(calculateScore(generateResults(answered, 'es'))).toEqual(
      calculateScore(generateResults(answered, 'es')),
    );
  });

  it('builds a complete results document', () => {
    const session = generateQuiz({ questions, config: { ...CONFIG, questionCount: 5 }, seed: 1 });
    session.bankTitle = 'Banco de prueba';
    const answered = answerAll(session, (index) => (index < 3 ? 'correct' : 'wrong'));
    const completedAt = new Date(new Date(session.startedAt).getTime() + 95_000);
    const results = buildQuizResults(answered, 'es', completedAt);

    expect(results.quizTitle).toBe('Banco de prueba');
    expect(results.summary.correct).toBe(3);
    expect(results.durationSeconds).toBe(95);
    expect(results.results).toHaveLength(5);
    expect(results.completedAt).toBe(completedAt.toISOString());
  });

  it('scores an empty result set as zero rather than NaN', () => {
    expect(calculateScore([])).toEqual({ total: 0, correct: 0, incorrect: 0, unanswered: 0, percentage: 0 });
  });
});
