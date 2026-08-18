/**
 * Centralized internationalization.
 *
 * All user-facing strings live in `es.json` / `en.json`; nothing is hard-coded
 * in components. `es.json` is the reference catalogue — the `TranslationKey`
 * type is derived from it, so a key used in a component but missing from a
 * locale is a compile error rather than a blank label at runtime.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { UiLanguage } from '../data/types';
import es from './es.json';
import en from './en.json';

export type TranslationKey = keyof typeof es;
export type TranslationValues = Record<string, string | number>;

const CATALOGUES: Record<UiLanguage, Record<string, string>> = { es, en };

const STORAGE_KEY = 'clad.language';

/** Replace `{name}` placeholders. Missing values leave the placeholder visible
 *  rather than printing "undefined", which makes gaps obvious in review. */
function interpolate(template: string, values?: TranslationValues): string {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

export function translate(language: UiLanguage, key: TranslationKey, values?: TranslationValues): string {
  const catalogue = CATALOGUES[language];
  // Fall back to Spanish (the reference catalogue), then to the key itself.
  const template = catalogue[key] ?? CATALOGUES.es[key] ?? key;
  return interpolate(template, values);
}

export interface I18nContextValue {
  language: UiLanguage;
  setLanguage: (language: UiLanguage) => void;
  t: (key: TranslationKey, values?: TranslationValues) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function detectInitialLanguage(): UiLanguage {
  if (typeof window === 'undefined') return 'es';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'es' || stored === 'en') return stored;
  } catch {
    // Storage can be unavailable (private mode, disabled cookies) — not fatal.
  }
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<UiLanguage>(detectInitialLanguage);

  const setLanguage = useCallback((next: UiLanguage) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Preference simply will not persist; the session still works.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key, values) => translate(language, key, values),
    }),
    [language, setLanguage],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within an I18nProvider');
  return context;
}

/** Locale tags for `Intl` formatting. */
export const LOCALES: Record<UiLanguage, string> = { es: 'es-ES', en: 'en-US' };

export function formatDate(language: UiLanguage, iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(LOCALES[language], { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

export function formatDuration(language: UiLanguage, seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  if (minutes === 0) return translate(language, 'common.seconds', { count: remainder });
  return `${translate(language, 'common.minutes', { count: minutes })} ${translate(language, 'common.seconds', { count: remainder })}`;
}
