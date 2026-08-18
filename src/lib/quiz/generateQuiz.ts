/**
 * Quiz generation: selection, ordering and option shuffling (§5, §6, §7).
 */

import { OPTION_KEYS, type OptionKey, type RawQuestion } from '../data/schema';
import type { TranslationLookup } from '../data/translations';
import { createRandom, createSeed, sample, shuffle } from './random';
import type { Language, QuizConfig, QuizOption, QuizQuestion, QuizSession } from './types';

export const MIN_QUESTIONS = 1;
export const MAX_QUESTIONS = 100;

export type GenerationErrorCode = 'count-out-of-range' | 'no-questions-available';

export class QuizGenerationError extends Error {
  constructor(
    readonly code: GenerationErrorCode,
    readonly available: number,
    readonly requested: number,
  ) {
    super(`Quiz generation failed: ${code}`);
    this.name = 'QuizGenerationError';
  }
}

export interface GenerateQuizInput {
  questions: readonly RawQuestion[];
  config: Omit<QuizConfig, 'seed'> & { seed?: number };
  translations?: TranslationLookup;
}

export interface GenerateQuizOutput {
  session: QuizSession;
  /** Set when fewer questions existed than requested (§5). */
  shortfall: { requested: number; available: number } | null;
}

function filterByCategory(
  questions: readonly RawQuestion[],
  categories: readonly string[],
): readonly RawQuestion[] {
  if (categories.length === 0) return questions;
  const wanted = new Set(categories);
  return questions.filter((q) => wanted.has(q.category));
}

/**
 * Build the display options for one question.
 *
 * Only the ORDER of the array changes when shuffling. Each option keeps its
 * original bank key as `id`, so the correct answer is identified by key and is
 * never affected by position.
 */
function buildOptions(
  question: RawQuestion,
  language: Language,
  translations: TranslationLookup | undefined,
  shuffleOptions: boolean,
  random: () => number,
): { options: QuizOption[]; translationFallback: boolean } {
  const translated = language === 'en' ? translations?.get(question.id) : undefined;
  let fallback = language === 'en' && !translated;

  const present = OPTION_KEYS.filter((key) => question.options[key] !== undefined);
  const ordered = shuffleOptions ? shuffle(present, random) : present;

  const options = ordered.map<QuizOption>((key) => {
    const original = question.options[key]!;
    const text = translated?.options?.[key];
    if (language === 'en' && !text) fallback = true;
    return { id: key, text: text ?? original };
  });

  return { options, translationFallback: fallback };
}

export function generateQuiz(input: GenerateQuizInput): GenerateQuizOutput {
  const { questions, config, translations } = input;
  const requested = config.questionCount;

  if (!Number.isInteger(requested) || requested < MIN_QUESTIONS || requested > MAX_QUESTIONS) {
    throw new QuizGenerationError('count-out-of-range', questions.length, requested);
  }

  const pool = filterByCategory(questions, config.categories);
  if (pool.length === 0) {
    throw new QuizGenerationError('no-questions-available', 0, requested);
  }

  const seed = config.seed ?? createSeed();
  const random = createRandom(seed);

  // Never pad by repeating questions (§5): take what exists and report the gap.
  const take = Math.min(requested, pool.length);
  const selected = config.shuffleQuestions ? sample(pool, take, random) : pool.slice(0, take);

  const quizQuestions = selected.map<QuizQuestion>((question, index) => {
    const translated = config.language === 'en' ? translations?.get(question.id) : undefined;
    const { options, translationFallback } = buildOptions(
      question,
      config.language,
      translations,
      config.shuffleOptions,
      random,
    );
    const promptTranslated = config.language === 'en' ? translated?.question : undefined;

    return {
      questionId: question.id,
      position: index + 1,
      prompt: promptTranslated ?? question.question,
      options,
      // Copied straight from the bank. This is the whole safety story.
      correctOptionId: question.correct_answer,
      category: question.category,
      difficulty: question.difficulty,
      bankExplanation:
        (config.language === 'en' ? translated?.explanation : undefined) ?? question.explanation,
      bankSource: question.source,
      translationFallback: translationFallback || (config.language === 'en' && !promptTranslated),
    };
  });

  const session: QuizSession = {
    id: `quiz-${Date.now().toString(36)}-${seed.toString(36)}`,
    config: { ...config, seed },
    questions: quizQuestions,
    answers: Object.fromEntries(quizQuestions.map((q) => [q.questionId, null])),
    currentIndex: 0,
    startedAt: new Date().toISOString(),
    finishedAt: null,
    status: 'QUIZ_ACTIVE',
  };

  return {
    session,
    shortfall: take < requested ? { requested, available: pool.length } : null,
  };
}

/** Immutably record an answer. `null` clears a previous selection. */
export function selectAnswer(
  session: QuizSession,
  questionId: number,
  optionId: OptionKey | null,
): QuizSession {
  if (!(questionId in session.answers)) return session;
  return { ...session, answers: { ...session.answers, [questionId]: optionId } };
}

export function goToQuestion(session: QuizSession, index: number): QuizSession {
  const clamped = Math.max(0, Math.min(index, session.questions.length - 1));
  return clamped === session.currentIndex ? session : { ...session, currentIndex: clamped };
}

export function countUnanswered(session: QuizSession): number {
  return session.questions.reduce(
    (acc, q) => acc + (session.answers[q.questionId] == null ? 1 : 0),
    0,
  );
}
