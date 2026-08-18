/**
 * Types describing the question bank exactly as it exists on disk.
 *
 * The shape here was derived by inspecting `public/data/cuestionario_CLAD_300.json`,
 * not assumed. The bank is treated as read-only, authoritative data: nothing in
 * the application mutates a question, an option, or a correct answer.
 */

/** Option keys used by the bank. The letter IS the option's permanent identity. */
export const OPTION_KEYS = ['a', 'b', 'c', 'd'] as const;
export type OptionKey = (typeof OPTION_KEYS)[number];

export type Difficulty = 'básico' | 'intermedio' | 'avanzado';

export interface RawQuestion {
  /** Stable identifier from the bank. Never an array index. */
  id: number;
  category: string;
  difficulty: Difficulty | string;
  question: string;
  options: Record<OptionKey, string>;
  /** Key into `options`. Authoritative and never recomputed. */
  correct_answer: OptionKey;
  /** Author-written rationale shipped with the bank. NOT a document citation. */
  explanation: string;
  /** Coarse provenance label, e.g. "Core 1 - Lección 7 / Exam Blueprint CLAD". */
  source: string;
}

export interface QuestionBankMetadata {
  title: string;
  total_questions: number;
  generated_from: string[];
  version: string;
}

export interface RawQuestionBank {
  metadata: QuestionBankMetadata;
  categories: string[];
  questions: RawQuestion[];
}

export function isOptionKey(value: unknown): value is OptionKey {
  return typeof value === 'string' && (OPTION_KEYS as readonly string[]).includes(value);
}
