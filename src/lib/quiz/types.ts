/**
 * Quiz domain model (requirement §59).
 *
 * The central invariant of this module: an option's identity is its ORIGINAL
 * bank key ('a' | 'b' | 'c' | 'd'), never its position on screen. Shuffling
 * reorders `displayOrder` only; `correctOptionId` is copied verbatim from the
 * bank and is never recomputed from an index. This makes the classic
 * "shuffled the options but forgot to move the answer index" bug structurally
 * impossible rather than merely avoided.
 */

import type { OptionKey } from '../data/schema';

export type Language = 'es' | 'en';

export type QuizMode = 'exam' | 'practice';

export type QuizStatus =
  | 'IDLE'
  | 'LOADING'
  | 'READY'
  | 'QUIZ_ACTIVE'
  | 'SUBMITTING'
  | 'GENERATING_EXPLANATIONS'
  | 'RESULTS'
  | 'ERROR';

/** One answer option as presented to the user. */
export interface QuizOption {
  /** Permanent identity: the option's key in the source bank. */
  id: OptionKey;
  /** Text in the active language. */
  text: string;
}

/** A question instantiated into a quiz session. */
export interface QuizQuestion {
  /** Original bank id. Survives shuffling, export and persistence. */
  questionId: number;
  /** 1-based position within this session. Presentation only. */
  position: number;
  prompt: string;
  /** Options in the order they are shown. */
  options: QuizOption[];
  /** Copied verbatim from the bank. Never derived from an array index. */
  correctOptionId: OptionKey;
  category: string;
  difficulty: string;
  /** Author rationale from the bank. Distinct from document evidence. */
  bankExplanation: string;
  /** Coarse provenance label from the bank, e.g. "Core 1 - Lección 7". */
  bankSource: string;
  /** True when the displayed text fell back to Spanish in English mode. */
  translationFallback: boolean;
}

export interface QuizConfig {
  language: Language;
  questionCount: number;
  mode: QuizMode;
  /** Empty means "all categories". */
  categories: string[];
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
  /** Seed for reproducible generation; enables faithful session resume. */
  seed: number;
}

/** A user's answer to one question. `null` means deliberately unanswered. */
export type AnswerMap = Record<number, OptionKey | null>;

export interface QuizSession {
  id: string;
  config: QuizConfig;
  questions: QuizQuestion[];
  answers: AnswerMap;
  currentIndex: number;
  startedAt: string;
  finishedAt: string | null;
  status: Extract<QuizStatus, 'QUIZ_ACTIVE' | 'RESULTS'>;
}

/** Per-question outcome (requirement §21 / §59). */
export interface QuestionResult {
  questionId: number;
  position: number;
  question: string;
  options: QuizOption[];
  selectedOptionId: OptionKey | null;
  selectedAnswerText: string | null;
  correctOptionId: OptionKey;
  correctAnswerText: string;
  isAnswered: boolean;
  isCorrect: boolean;
  category: string;
  difficulty: string;
  bankExplanation: string;
  bankSource: string;
  language: Language;
}

export interface ScoreSummary {
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  /** correct / total × 100, rounded to one decimal. */
  percentage: number;
}

export interface QuizResults {
  sessionId: string;
  config: QuizConfig;
  summary: ScoreSummary;
  results: QuestionResult[];
  startedAt: string;
  finishedAt: string;
  /** Elapsed wall-clock seconds. */
  durationSeconds: number;
}
