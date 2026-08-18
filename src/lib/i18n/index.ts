/**
 * Translation lookup with named interpolation (§9).
 *
 * Every user-visible string in the application resolves through `t`. Nothing is
 * hardcoded in a component, which is what keeps the interface from mixing
 * languages.
 */

import type { Language } from '../quiz/types';
import { en } from './en';
import { es } from './es';
import type { Dictionary, TranslationKey } from './types';

export type { Dictionary, TranslationKey };

const DICTIONARIES: Record<Language, Dictionary> = { es, en };

export type Translator = (
  key: TranslationKey,
  vars?: Record<string, string | number>,
) => string;

export function getDictionary(language: Language): Dictionary {
  return DICTIONARIES[language];
}

/** Replace `{name}` placeholders. Unknown placeholders are left intact. */
export function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in vars ? String(vars[name]) : match,
  );
}

export function createTranslator(language: Language): Translator {
  const dictionary = getDictionary(language);
  return (key, vars) => interpolate(dictionary[key], vars);
}

export const LANGUAGES: readonly Language[] = ['es', 'en'];
