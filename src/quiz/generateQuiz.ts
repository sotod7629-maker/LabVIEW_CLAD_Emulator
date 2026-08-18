/**
 * Quiz generation: filtering, sampling and randomization.
 *
 * Invariant enforced here and covered by tests: shuffling the display order of
 * the options never changes which option is correct. Correctness is carried by
 * `Question.correctOptionId` (a stable id), and shuffling only reorders the
 * option objects — no index is ever rewritten.
 */
import type { Question } from '../data/types';
import { createRng, randomSeed, sampleWithoutReplacement, shuffle } from './rng';
import type { QuizConfig, QuizItem, QuizSession } from './types';

export const MIN_QUESTIONS = 1;
export const MAX_QUESTIONS = 100;

export type QuizGenerationErrorCode = 'count-out-of-range' | 'no-questions-available';

export class QuizGenerationError extends Error {
  readonly code: QuizGenerationErrorCode;
  readonly details: Record<string, number>;
  constructor(code: QuizGenerationErrorCode, details: Record<string, number> = {}) {
    super(code);
    this.name = 'QuizGenerationError';
    this.code = code;
    this.details = details;
  }
}

/** Apply category and difficulty filters. Empty filter arrays mean "all". */
export function filterQuestions(
  questions: readonly Question[],
  filters: { categories?: string[]; difficulties?: string[] },
): Question[] {
  const categories = filters.categories ?? [];
  const difficulties = filters.difficulties ?? [];
  return questions.filter((question) => {
    if (categories.length > 0 && (!question.category || !categories.includes(question.category))) return false;
    if (difficulties.length > 0 && (!question.difficulty || !difficulties.includes(question.difficulty))) return false;
    return true;
  });
}

/** Randomize question order. Kept as a named export so it is directly testable. */
export function shuffleQuestions(questions: readonly Question[], seed: number): Question[] {
  return shuffle(questions, createRng(seed));
}

/**
 * Randomize the display order of a question's options.
 * Returns reordered `AnswerOption` objects — ids, and therefore the correct
 * answer, are untouched.
 */
export function shuffleAnswers(question: Question, seed: number): Question['options'] {
  return shuffle(question.options, createRng(seed));
}

export interface GenerateQuizInput {
  questions: readonly Question[];
  config: QuizConfig;
  seed?: number;
  sessionId?: string;
}

/**
 * Build a quiz session.
 *
 * Questions are never duplicated to reach the requested count: if fewer are
 * available the caller is told how many there are (`no-questions-available`
 * only when there are none at all; otherwise the paper is simply shorter and
 * `availableCount` is reported by `countAvailableQuestions`).
 */
export function generateQuiz({ questions, config, seed, sessionId }: GenerateQuizInput): QuizSession {
  if (
    !Number.isInteger(config.questionCount) ||
    config.questionCount < MIN_QUESTIONS ||
    config.questionCount > MAX_QUESTIONS
  ) {
    throw new QuizGenerationError('count-out-of-range', { min: MIN_QUESTIONS, max: MAX_QUESTIONS });
  }

  const pool = filterQuestions(questions, config);
  if (pool.length === 0) {
    throw new QuizGenerationError('no-questions-available', { available: 0 });
  }

  const resolvedSeed = seed ?? randomSeed();
  const rng = createRng(resolvedSeed);
  const requested = Math.min(config.questionCount, pool.length);

  const selected = config.shuffleQuestions
    ? sampleWithoutReplacement(pool, requested, rng)
    : pool.slice(0, requested);

  const items: QuizItem[] = selected.map((question, displayIndex) => ({
    questionId: question.id,
    displayIndex,
    question,
    // A per-item RNG derived from the session seed: the option order of item 7
    // is stable regardless of how many items precede it.
    displayOptions: config.shuffleOptions
      ? shuffle(question.options, createRng(resolvedSeed + displayIndex * 7919 + 1))
      : [...question.options],
  }));

  return {
    id: sessionId ?? `quiz-${resolvedSeed.toString(36)}-${Date.now().toString(36)}`,
    seed: resolvedSeed,
    config: { ...config, questionCount: requested },
    items,
    answers: {},
    flagged: [],
    currentIndex: 0,
    startedAt: new Date().toISOString(),
  };
}

/** How many questions match the current filters — drives the "only N available" notice. */
export function countAvailableQuestions(
  questions: readonly Question[],
  filters: { categories?: string[]; difficulties?: string[] },
): number {
  return filterQuestions(questions, filters).length;
}

/** Record an answer. Returns a new session; selecting an invalid option is a no-op. */
export function selectAnswer(session: QuizSession, questionId: string, optionId: string): QuizSession {
  const item = session.items.find((entry) => entry.questionId === questionId);
  if (!item || !item.displayOptions.some((option) => option.id === optionId)) return session;
  return { ...session, answers: { ...session.answers, [questionId]: optionId } };
}

/** Clear an answer (an explicit user action — navigation never clears one). */
export function clearAnswer(session: QuizSession, questionId: string): QuizSession {
  if (!(questionId in session.answers)) return session;
  const answers = { ...session.answers };
  delete answers[questionId];
  return { ...session, answers };
}

export function toggleFlag(session: QuizSession, questionId: string): QuizSession {
  const flagged = session.flagged.includes(questionId)
    ? session.flagged.filter((id) => id !== questionId)
    : [...session.flagged, questionId];
  return { ...session, flagged };
}

/** Move within the paper, clamped to its bounds. */
export function goToIndex(session: QuizSession, index: number): QuizSession {
  const clamped = Math.max(0, Math.min(index, session.items.length - 1));
  return clamped === session.currentIndex ? session : { ...session, currentIndex: clamped };
}

/**
 * Rebuild a session as a fresh attempt at the *same* paper: identical
 * questions in the identical order, with the same option order, but with every
 * answer cleared. Used by "retake this quiz", which would otherwise be
 * indistinguishable from generating a new one.
 */
export function resetSession(session: QuizSession, startedAt: Date = new Date()): QuizSession {
  return {
    ...session,
    id: `${session.id}-retake-${startedAt.getTime().toString(36)}`,
    answers: {},
    flagged: [],
    currentIndex: 0,
    startedAt: startedAt.toISOString(),
    endedAt: undefined,
  };
}

export function unansweredQuestionIds(session: QuizSession): string[] {
  return session.items.filter((item) => !session.answers[item.questionId]).map((item) => item.questionId);
}
