import { describe, expect, it } from 'vitest';
import {
  clearAnswer,
  countAvailableQuestions,
  filterQuestions,
  generateQuiz,
  goToIndex,
  MAX_QUESTIONS,
  QuizGenerationError,
  selectAnswer,
  shuffleAnswers,
  shuffleQuestions,
  resetSession,
  toggleFlag,
  unansweredQuestionIds,
} from './generateQuiz';
import { parseQuestionBankFromText } from '../data/questionParser';
import { makeQuestions, readBundledBankText } from '../test/fixtures';
import type { QuizConfig } from './types';

const CONFIG: QuizConfig = {
  uiLanguage: 'es',
  contentLanguage: 'es',
  questionCount: 10,
  categories: [],
  difficulties: [],
  mode: 'quiz',
  shuffleQuestions: true,
  shuffleOptions: true,
};

describe('generateQuiz — sizing', () => {
  const questions = makeQuestions(300);

  it('produces exactly the requested number of questions', () => {
    for (const count of [1, 2, 25, 99, 100]) {
      const session = generateQuiz({ questions, config: { ...CONFIG, questionCount: count } });
      expect(session.items).toHaveLength(count);
    }
  });

  it('rejects a count outside 1..100', () => {
    for (const count of [0, -1, 101, 1.5, Number.NaN]) {
      expect(() => generateQuiz({ questions, config: { ...CONFIG, questionCount: count } })).toThrowError(
        QuizGenerationError,
      );
    }
  });

  it('never repeats a question', () => {
    const session = generateQuiz({ questions, config: { ...CONFIG, questionCount: MAX_QUESTIONS } });
    expect(new Set(session.items.map((item) => item.questionId)).size).toBe(MAX_QUESTIONS);
  });

  it('caps at the available pool instead of duplicating questions', () => {
    const session = generateQuiz({
      questions: makeQuestions(12),
      config: { ...CONFIG, questionCount: 50 },
    });
    expect(session.items).toHaveLength(12);
    expect(new Set(session.items.map((item) => item.questionId)).size).toBe(12);
    expect(session.config.questionCount).toBe(12);
  });

  it('throws when the filters leave no questions', () => {
    expect(() =>
      generateQuiz({ questions, config: { ...CONFIG, categories: ['Nonexistent'] } }),
    ).toThrowError(QuizGenerationError);
  });

  it('reports how many questions the filters leave', () => {
    expect(countAvailableQuestions(questions, { categories: ['Arrays'] })).toBe(150);
    expect(countAvailableQuestions(questions, { categories: ['Arrays'], difficulties: ['básico'] })).toBe(50);
    expect(countAvailableQuestions(questions, {})).toBe(300);
  });

  it('filters by category and difficulty together', () => {
    const filtered = filterQuestions(questions, { categories: ['Clusters'], difficulties: ['avanzado'] });
    expect(filtered.every((q) => q.category === 'Clusters' && q.difficulty === 'avanzado')).toBe(true);
  });
});

describe('generateQuiz — randomization preserves correctness', () => {
  const bank = parseQuestionBankFromText(readBundledBankText());

  it('keeps every option and the correct id intact after shuffling', () => {
    // 40 different seeds over the real bank: option order changes, the correct
    // option id and the option set never do.
    for (let seed = 1; seed <= 40; seed += 1) {
      const session = generateQuiz({
        questions: bank.questions,
        config: { ...CONFIG, questionCount: 25 },
        seed,
      });

      for (const item of session.items) {
        const original = bank.questions.find((question) => question.id === item.questionId)!;

        expect([...item.displayOptions].map((option) => option.id).sort()).toEqual(
          [...original.options].map((option) => option.id).sort(),
        );

        // The correct option is still present, still carries its original text,
        // and is still identified by the same id.
        const displayedCorrect = item.displayOptions.find(
          (option) => option.id === item.question.correctOptionId,
        );
        const originalCorrect = original.options.find((option) => option.id === original.correctOptionId);
        expect(item.question.correctOptionId).toBe(original.correctOptionId);
        expect(displayedCorrect?.text.es).toBe(originalCorrect?.text.es);
      }
    }
  });

  it('actually moves the correct answer away from the first position', () => {
    // Every correct answer in the bundled bank is option "a"; without shuffling
    // the quiz would be trivially gameable, so this must not stay at 100%.
    const session = generateQuiz({
      questions: bank.questions,
      config: { ...CONFIG, questionCount: 100 },
      seed: 12345,
    });
    const firstPositionIsCorrect = session.items.filter(
      (item) => item.displayOptions[0]!.id === item.question.correctOptionId,
    ).length;
    expect(firstPositionIsCorrect).toBeLessThan(60);
    expect(firstPositionIsCorrect).toBeGreaterThan(5);
  });

  it('is reproducible from its seed and varies across seeds', () => {
    const a = generateQuiz({ questions: bank.questions, config: CONFIG, seed: 99 });
    const b = generateQuiz({ questions: bank.questions, config: CONFIG, seed: 99 });
    const c = generateQuiz({ questions: bank.questions, config: CONFIG, seed: 100 });

    expect(a.items.map((item) => item.questionId)).toEqual(b.items.map((item) => item.questionId));
    expect(a.items[0]!.displayOptions.map((option) => option.id)).toEqual(
      b.items[0]!.displayOptions.map((option) => option.id),
    );
    expect(a.items.map((item) => item.questionId)).not.toEqual(c.items.map((item) => item.questionId));
  });

  it('leaves order untouched when randomization is disabled', () => {
    const session = generateQuiz({
      questions: bank.questions,
      config: { ...CONFIG, questionCount: 5, shuffleQuestions: false, shuffleOptions: false },
      seed: 1,
    });
    expect(session.items.map((item) => item.questionId)).toEqual(['1', '2', '3', '4', '5']);
    expect(session.items[0]!.displayOptions.map((option) => option.id)).toEqual(['a', 'b', 'c', 'd']);
  });

  it('shuffleAnswers returns the same option set', () => {
    const question = bank.questions[0]!;
    const shuffled = shuffleAnswers(question, 7);
    expect(shuffled.map((option) => option.id).sort()).toEqual(question.options.map((option) => option.id).sort());
  });

  it('shuffleQuestions preserves the question set', () => {
    const shuffled = shuffleQuestions(bank.questions.slice(0, 20), 3);
    expect(shuffled.map((question) => question.id).sort()).toEqual(
      bank.questions.slice(0, 20).map((question) => question.id).sort(),
    );
  });
});

describe('answer handling', () => {
  const questions = makeQuestions(5);
  const session = generateQuiz({ questions, config: { ...CONFIG, questionCount: 5 }, seed: 4 });
  const firstId = session.items[0]!.questionId;

  it('records and preserves a selection across navigation', () => {
    let current = selectAnswer(session, firstId, 'c');
    current = goToIndex(current, 3);
    current = goToIndex(current, 0);
    expect(current.answers[firstId]).toBe('c');
  });

  it('ignores an option that does not belong to the question', () => {
    expect(selectAnswer(session, firstId, 'zz')).toBe(session);
    expect(selectAnswer(session, 'not-a-question', 'a')).toBe(session);
  });

  it('clears an answer only when asked', () => {
    const answered = selectAnswer(session, firstId, 'b');
    expect(clearAnswer(answered, firstId).answers[firstId]).toBeUndefined();
    expect(clearAnswer(session, firstId)).toBe(session);
  });

  it('clamps navigation to the paper bounds', () => {
    expect(goToIndex(session, -5).currentIndex).toBe(0);
    expect(goToIndex(session, 99).currentIndex).toBe(4);
  });

  it('toggles a review flag', () => {
    const flagged = toggleFlag(session, firstId);
    expect(flagged.flagged).toEqual([firstId]);
    expect(toggleFlag(flagged, firstId).flagged).toEqual([]);
  });

  it('lists unanswered questions', () => {
    expect(unansweredQuestionIds(session)).toHaveLength(5);
    expect(unansweredQuestionIds(selectAnswer(session, firstId, 'a'))).toHaveLength(4);
  });
});

describe('resetSession', () => {
  const questions = makeQuestions(20);
  const session = generateQuiz({ questions, config: { ...CONFIG, questionCount: 8 }, seed: 31 });

  it('re-serves the identical paper with answers cleared', () => {
    let answered = selectAnswer(session, session.items[0]!.questionId, 'a');
    answered = toggleFlag(answered, session.items[1]!.questionId);
    answered = goToIndex(answered, 5);

    const retaken = resetSession(answered);

    // Same questions, same order, same option order.
    expect(retaken.items.map((item) => item.questionId)).toEqual(session.items.map((item) => item.questionId));
    expect(retaken.items.map((item) => item.displayOptions.map((option) => option.id))).toEqual(
      session.items.map((item) => item.displayOptions.map((option) => option.id)),
    );
    expect(retaken.seed).toBe(session.seed);

    // Fresh attempt.
    expect(retaken.answers).toEqual({});
    expect(retaken.flagged).toEqual([]);
    expect(retaken.currentIndex).toBe(0);
    expect(retaken.endedAt).toBeUndefined();
    expect(retaken.id).not.toBe(session.id);
  });
});
