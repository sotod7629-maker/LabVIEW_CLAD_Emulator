import type { AnswerOption, ContentLanguage, Question, UiLanguage } from '../data/types';
import type { Explanation } from '../explanations/types';

/** Application-level state machine. */
export type AppStatus =
  | 'IDLE'
  | 'LOADING'
  | 'READY'
  | 'QUIZ_ACTIVE'
  | 'SUBMITTING'
  | 'GENERATING_EXPLANATIONS'
  | 'RESULTS'
  | 'ERROR';

/**
 * Assessment modes. Only `quiz` is enabled today; `practice` (immediate
 * feedback) is already threaded through the engine so enabling it is a UI
 * change, not an engine change.
 */
export type QuizMode = 'quiz' | 'practice';

/** One question as it appears on a generated paper. */
export interface QuizItem {
  /** Original bank id. Never the position — position is `displayIndex`. */
  questionId: string;
  /** 0-based position on this paper. */
  displayIndex: number;
  question: Question;
  /** Options in their shuffled display order. Ids are unchanged. */
  displayOptions: AnswerOption[];
}

export interface QuizConfig {
  uiLanguage: UiLanguage;
  contentLanguage: ContentLanguage;
  questionCount: number;
  categories: string[];
  difficulties: string[];
  mode: QuizMode;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
}

export interface QuizSession {
  id: string;
  seed: number;
  config: QuizConfig;
  items: QuizItem[];
  /** questionId → selected option id. Absent key means unanswered. */
  answers: Record<string, string>;
  /** questionIds the user flagged for review. */
  flagged: string[];
  currentIndex: number;
  startedAt: string;
  endedAt?: string;
  bankTitle?: string;
}

export type QuestionOutcome = 'correct' | 'incorrect' | 'unanswered';

/** Per-question result, retained for the results screen and every export. */
export interface QuestionResult {
  questionId: string;
  displayIndex: number;
  category?: string;
  difficulty?: string;
  questionText: string;
  options: Array<{ id: string; text: string }>;
  selectedOptionId: string | null;
  selectedOptionText: string | null;
  correctOptionId: string;
  correctOptionText: string;
  outcome: QuestionOutcome;
  isCorrect: boolean;
  isAnswered: boolean;
  language: UiLanguage;
  /** True when the text above is not in `language` (no translation exists). */
  contentIsFallback: boolean;
  bankExplanation?: string;
  bankSourceLabel?: string;
  explanation?: Explanation;
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
  quizTitle: string;
  language: UiLanguage;
  startedAt: string;
  completedAt: string;
  /** Elapsed wall time in seconds; the engine records it even though no timer is enforced. */
  durationSeconds: number;
  summary: ScoreSummary;
  results: QuestionResult[];
}
