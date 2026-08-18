/**
 * Normalized question-bank model.
 *
 * Everything downstream (quiz engine, scoring, explanations, exports) speaks
 * this shape only. `questionParser.ts` is the single place that knows about the
 * on-disk JSON schema, so a different source schema can be supported by adding
 * an adapter there without touching any other module.
 */

/** Languages the *user interface* can be rendered in. */
export type UiLanguage = 'es' | 'en';

/**
 * Languages question *content* may exist in. Content language is tracked
 * separately from UI language: the bundled bank is Spanish-only, and we must
 * never silently present Spanish content as if it were an English translation.
 */
export type ContentLanguage = UiLanguage;

/** A localized string: at minimum the source language, optionally translations. */
export type LocalizedText = Partial<Record<ContentLanguage, string>>;

export interface AnswerOption {
  /**
   * Stable identifier taken from the source schema (e.g. `"a"`, `"b"`).
   * Never the array index: display order is shuffled, ids are not.
   */
  id: string;
  text: LocalizedText;
}

export interface Question {
  /** Original identifier from the source file. Survives shuffling and export. */
  id: string;
  prompt: LocalizedText;
  options: AnswerOption[];
  /** Id of the correct option — an `AnswerOption.id`, never a positional index. */
  correctOptionId: string;
  category?: string;
  difficulty?: string;
  /**
   * Rationale shipped inside the question bank. This is *not* documentary
   * evidence; it is surfaced with explicit "question bank" provenance so it can
   * never be mistaken for something retrieved from a reference document.
   */
  bankExplanation?: LocalizedText;
  /**
   * Free-text reference declared by the bank (e.g. "Core 1 - Lección 6").
   * A citation *claim*, not a verified document locator.
   */
  bankSourceLabel?: string;
}

export interface QuestionBankMetadata {
  title?: string;
  version?: string;
  generatedFrom?: string[];
  /** Languages in which question content is actually present in the file. */
  availableContentLanguages: ContentLanguage[];
  /** Language used when the requested one has no content. */
  primaryContentLanguage: ContentLanguage;
}

export interface QuestionBank {
  metadata: QuestionBankMetadata;
  questions: Question[];
  categories: string[];
  difficulties: string[];
}

/** Resolution of a `LocalizedText` for a requested language. */
export interface ResolvedText {
  text: string;
  /** Language the returned text is actually written in. */
  language: ContentLanguage;
  /** True when `language` differs from the requested one (no translation exists). */
  isFallback: boolean;
}

const EMPTY: ResolvedText = { text: '', language: 'es', isFallback: false };

/**
 * Resolve localized content without inventing translations. When the requested
 * language is missing we return the available one and flag it, so the UI can
 * tell the user the content is not translated instead of pretending it is.
 */
export function resolveText(
  value: LocalizedText | undefined,
  requested: ContentLanguage,
  primary: ContentLanguage,
): ResolvedText {
  if (!value) return EMPTY;
  const exact = value[requested];
  if (typeof exact === 'string' && exact.length > 0) {
    return { text: exact, language: requested, isFallback: false };
  }
  const fallbackLanguage = value[primary] ? primary : (Object.keys(value)[0] as ContentLanguage | undefined);
  if (!fallbackLanguage) return EMPTY;
  const text = value[fallbackLanguage];
  if (typeof text !== 'string' || text.length === 0) return EMPTY;
  return { text, language: fallbackLanguage, isFallback: fallbackLanguage !== requested };
}
