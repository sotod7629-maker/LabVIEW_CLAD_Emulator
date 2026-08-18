/**
 * English translation overlay for the Spanish question bank.
 *
 * WHY AN OVERLAY, NOT AN EDITED BANK
 * ----------------------------------
 * The source bank (`cuestionario_CLAD_300.json`) is Spanish-only and is treated
 * as immutable authoritative data (§61). Translations therefore live in a
 * separate file keyed by question id and by ORIGINAL option letter:
 *
 *     { "1": { "question": "...", "options": { "a": "...", ... } } }
 *
 * Because the overlay is keyed by letter and never carries a `correct_answer`,
 * a translation cannot possibly change which option is correct. Evaluation
 * always runs against the original bank's `correct_answer`. A missing or
 * partial translation degrades to the Spanish original and is flagged to the
 * user rather than silently hidden.
 */

import { OPTION_KEYS, type OptionKey } from './schema';

export interface QuestionTranslation {
  question?: string;
  options?: Partial<Record<OptionKey, string>>;
  explanation?: string;
}

export interface TranslationFile {
  language: string;
  /** How the translation was produced — surfaced in the UI for transparency. */
  provenance: string;
  translations: Record<string, QuestionTranslation>;
}

export type TranslationLookup = Map<number, QuestionTranslation>;

export interface TranslationCoverage {
  /** Question ids with a fully usable translation (prompt + every option). */
  complete: number;
  /** Question ids present but missing at least one field. */
  partial: number;
  /** Question ids with no entry at all. */
  missing: number;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

/**
 * Parse a translation file defensively. Malformed entries are dropped rather
 * than throwing: a broken translation must never prevent the quiz from running,
 * it just falls back to Spanish.
 */
export function parseTranslations(raw: unknown): TranslationLookup {
  const lookup: TranslationLookup = new Map();
  if (typeof raw !== 'object' || raw === null) return lookup;

  const file = raw as Partial<TranslationFile>;
  const entries = file.translations;
  if (typeof entries !== 'object' || entries === null) return lookup;

  for (const [key, value] of Object.entries(entries)) {
    const id = Number(key);
    if (!Number.isInteger(id)) continue;
    if (typeof value !== 'object' || value === null) continue;

    const entry: QuestionTranslation = {};
    const candidate = value as QuestionTranslation;

    if (isNonEmptyString(candidate.question)) entry.question = candidate.question;
    if (isNonEmptyString(candidate.explanation)) entry.explanation = candidate.explanation;

    if (typeof candidate.options === 'object' && candidate.options !== null) {
      const options: Partial<Record<OptionKey, string>> = {};
      for (const optionKey of OPTION_KEYS) {
        const text = candidate.options[optionKey];
        if (isNonEmptyString(text)) options[optionKey] = text;
      }
      if (Object.keys(options).length > 0) entry.options = options;
    }

    if (entry.question || entry.options || entry.explanation) lookup.set(id, entry);
  }

  return lookup;
}

/** Report how much of the bank the overlay actually covers (§9 honesty). */
export function measureCoverage(
  questions: readonly { id: number; options: Record<string, string> }[],
  lookup: TranslationLookup,
): TranslationCoverage {
  let complete = 0;
  let partial = 0;
  let missing = 0;

  for (const question of questions) {
    const entry = lookup.get(question.id);
    if (!entry) {
      missing += 1;
      continue;
    }
    const requiredKeys = Object.keys(question.options) as OptionKey[];
    const hasAllOptions = requiredKeys.every((key) => isNonEmptyString(entry.options?.[key]));
    if (isNonEmptyString(entry.question) && hasAllOptions) complete += 1;
    else partial += 1;
  }

  return { complete, partial, missing };
}
