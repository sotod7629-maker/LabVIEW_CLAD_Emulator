/**
 * Loading of the question bank and its translation overlay.
 *
 * Both are fetched as static assets. The bank is validated before use; the
 * overlay is optional and its absence is not an error.
 */

import { parseTranslations, type TranslationLookup } from './translations';
import type { QuestionBankMetadata, RawQuestion } from './schema';
import { validateQuestionData, type ValidationIssue } from './validateQuestionData';

export const BANK_URL = 'data/cuestionario_CLAD_300.json';
export const TRANSLATIONS_URL = 'data/questions.en.json';

export interface LoadedBank {
  metadata: QuestionBankMetadata | null;
  categories: string[];
  questions: RawQuestion[];
  issues: ValidationIssue[];
  translations: TranslationLookup;
  /** True when the overlay file could not be fetched or parsed. */
  translationsUnavailable: boolean;
}

export class QuestionBankError extends Error {
  constructor(
    message: string,
    readonly issues: ValidationIssue[] = [],
  ) {
    super(message);
    this.name = 'QuestionBankError';
  }
}

async function fetchJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Request for ${url} failed with status ${response.status}`);
  }
  return response.json();
}

export async function loadQuestions(
  options: { baseUrl?: string; signal?: AbortSignal } = {},
): Promise<LoadedBank> {
  const base = options.baseUrl ?? import.meta.env.BASE_URL ?? '/';
  const resolve = (path: string) => `${base.replace(/\/$/, '')}/${path}`;

  let rawBank: unknown;
  try {
    rawBank = await fetchJson(resolve(BANK_URL), options.signal);
  } catch (cause) {
    throw new QuestionBankError(
      cause instanceof Error ? cause.message : 'Unable to read the question bank',
    );
  }

  const validation = validateQuestionData(rawBank);
  if (!validation.valid) {
    throw new QuestionBankError('The question bank failed validation', validation.issues);
  }

  // The overlay is a progressive enhancement: never fatal.
  let translations: TranslationLookup = new Map();
  let translationsUnavailable = false;
  try {
    translations = parseTranslations(await fetchJson(resolve(TRANSLATIONS_URL), options.signal));
  } catch {
    translationsUnavailable = true;
  }

  const bank = rawBank as { metadata?: QuestionBankMetadata; categories?: unknown };
  const declaredCategories = Array.isArray(bank.categories)
    ? bank.categories.filter((c): c is string => typeof c === 'string')
    : [];
  const usedCategories = [...new Set(validation.questions.map((q) => q.category))].filter(Boolean);

  return {
    metadata: bank.metadata ?? null,
    // Prefer the declared list but only keep categories that questions use.
    categories: declaredCategories.length
      ? declaredCategories.filter((c) => usedCategories.includes(c))
      : usedCategories,
    questions: validation.questions,
    issues: validation.issues,
    translations,
    translationsUnavailable,
  };
}
