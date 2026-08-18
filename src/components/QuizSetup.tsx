/**
 * Setup screen (§8).
 *
 * Deliberately minimal: language, question count and a start button are
 * visible; everything else lives behind a disclosure so the first screen stays
 * calm (§57).
 */

import { useId, useMemo, useState } from 'react';
import { MAX_QUESTIONS, MIN_QUESTIONS } from '../lib/quiz/generateQuiz';
import type { Language, QuizMode } from '../lib/quiz/types';
import type { Translator } from '../lib/i18n';
import type { TranslationCoverage } from '../lib/data/translations';
import { Notice } from './primitives';

export interface SetupValues {
  questionCount: number;
  categories: string[];
  mode: QuizMode;
  shuffleQuestions: boolean;
  shuffleOptions: boolean;
}

const COUNT_PRESETS = [10, 25, 40, 50, 100];

export function QuizSetup({
  t,
  language,
  onLanguageChange,
  categories,
  availableCount,
  translationCoverage,
  docsUnavailable,
  validationSkipped,
  resumable,
  onResume,
  onDiscardResume,
  onStart,
}: {
  t: Translator;
  language: Language;
  onLanguageChange: (language: Language) => void;
  categories: string[];
  availableCount: number;
  translationCoverage: TranslationCoverage;
  docsUnavailable: boolean;
  validationSkipped: number;
  resumable: { answered: number; total: number } | null;
  onResume: () => void;
  onDiscardResume: () => void;
  onStart: (values: SetupValues) => void;
}) {
  const countId = useId();
  const sliderId = useId();
  const [count, setCount] = useState(25);
  const [countText, setCountText] = useState('25');
  const [selected, setSelected] = useState<string[]>([]);
  const [mode, setMode] = useState<QuizMode>('exam');
  const [shuffleQuestions, setShuffleQuestions] = useState(true);
  const [shuffleOptions, setShuffleOptions] = useState(true);

  const poolSize = useMemo(() => availableCount, [availableCount]);
  const countError =
    !Number.isInteger(count) || count < MIN_QUESTIONS || count > MAX_QUESTIONS;

  const commitCount = (raw: string) => {
    setCountText(raw);
    const parsed = Number.parseInt(raw, 10);
    if (Number.isFinite(parsed)) setCount(parsed);
    else setCount(Number.NaN);
  };

  const setCountBoth = (value: number) => {
    setCount(value);
    setCountText(String(value));
  };

  const toggleCategory = (category: string) => {
    setSelected((current) =>
      current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category],
    );
  };

  return (
    <section className="setup" aria-labelledby="setup-heading">
      <header className="setup__header">
        <h1 className="setup__heading" id="setup-heading">
          {t('setup.heading')}
        </h1>
        <p className="setup__description">{t('setup.description')}</p>
      </header>

      {resumable && (
        <div style={{ marginBottom: 'var(--sp-4)' }}>
          <Notice tone="info" title={t('setup.resume')}>
            <p style={{ marginBottom: 'var(--sp-3)' }}>
              {t('setup.resumeDescription', {
                answered: resumable.answered,
                total: resumable.total,
              })}
            </p>
            <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn--primary" onClick={onResume}>
                {t('setup.resume')}
              </button>
              <button type="button" className="btn btn--ghost" onClick={onDiscardResume}>
                {t('setup.resumeDiscard')}
              </button>
            </div>
          </Notice>
        </div>
      )}

      <form
        className="card card--padded stack setup__form"
        onSubmit={(event) => {
          event.preventDefault();
          if (countError) return;
          onStart({
            questionCount: count,
            categories: selected,
            mode,
            shuffleQuestions,
            shuffleOptions,
          });
        }}
      >
        {/* Language ---------------------------------------------------- */}
        <div className="field">
          <span className="field__label" id="language-label">
            {t('common.language')}
          </span>
          <div className="segmented" role="radiogroup" aria-labelledby="language-label">
            <button
              type="button"
              className="segmented__option"
              role="radio"
              aria-checked={language === 'es'}
              onClick={() => onLanguageChange('es')}
            >
              {t('common.spanish')}
            </button>
            <button
              type="button"
              className="segmented__option"
              role="radio"
              aria-checked={language === 'en'}
              onClick={() => onLanguageChange('en')}
            >
              {t('common.english')}
            </button>
          </div>
        </div>

        {/* Question count ---------------------------------------------- */}
        <div className="field">
          <label className="field__label" htmlFor={countId}>
            {t('setup.questionCount')}
          </label>
          <div className="count-field">
            <input
              id={countId}
              className="input count-field__input"
              type="number"
              inputMode="numeric"
              min={MIN_QUESTIONS}
              max={MAX_QUESTIONS}
              value={countText}
              onChange={(event) => commitCount(event.target.value)}
              aria-describedby={`${countId}-help`}
              aria-invalid={countError}
            />
            <input
              id={sliderId}
              className="count-field__slider"
              type="range"
              min={MIN_QUESTIONS}
              max={MAX_QUESTIONS}
              value={Number.isFinite(count) ? count : MIN_QUESTIONS}
              onChange={(event) => setCountBoth(Number(event.target.value))}
              aria-label={t('setup.questionCount')}
            />
          </div>
          <div className="count-presets">
            {COUNT_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                className="chip"
                aria-pressed={count === preset}
                onClick={() => setCountBoth(preset)}
              >
                {preset}
              </button>
            ))}
          </div>
          <p className="field__help" id={`${countId}-help`}>
            {t('setup.questionCountHelp')} · {t('setup.available', { count: poolSize })}
          </p>
          {countError && (
            <p className="field__error" role="alert">
              {t('error.countRange')}
            </p>
          )}
        </div>

        <hr className="setup__divider" />

        {/* Advanced ---------------------------------------------------- */}
        <details className="details">
          <summary className="details__summary">{t('setup.advanced')}</summary>
          <div className="details__body stack" style={{ gap: 'var(--sp-4)' }}>
            <div className="field">
              <span className="field__label" id="mode-label">
                {t('setup.mode')}
              </span>
              <div className="segmented" role="radiogroup" aria-labelledby="mode-label">
                <button
                  type="button"
                  className="segmented__option"
                  role="radio"
                  aria-checked={mode === 'exam'}
                  onClick={() => setMode('exam')}
                >
                  {t('setup.modeExam')}
                </button>
                <button
                  type="button"
                  className="segmented__option"
                  role="radio"
                  aria-checked={mode === 'practice'}
                  onClick={() => setMode('practice')}
                >
                  {t('setup.modePractice')}
                </button>
              </div>
              <p className="field__help">
                {mode === 'exam' ? t('setup.modeExamHelp') : t('setup.modePracticeHelp')}
              </p>
            </div>

            <div className="field">
              <span className="field__label">{t('setup.categories')}</span>
              <div className="count-presets">
                <button
                  type="button"
                  className="chip"
                  aria-pressed={selected.length === 0}
                  onClick={() => setSelected([])}
                >
                  {t('setup.categoriesAll')}
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className="chip"
                    aria-pressed={selected.includes(category)}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="switch-row">
                <input
                  type="checkbox"
                  checked={shuffleQuestions}
                  onChange={(event) => setShuffleQuestions(event.target.checked)}
                />
                <span className="switch-row__text">
                  <span className="switch-row__label">{t('setup.shuffleQuestions')}</span>
                </span>
              </label>
              <label className="switch-row">
                <input
                  type="checkbox"
                  checked={shuffleOptions}
                  onChange={(event) => setShuffleOptions(event.target.checked)}
                />
                <span className="switch-row__text">
                  <span className="switch-row__label">{t('setup.shuffleOptions')}</span>
                  <span className="field__help">{t('setup.shuffleOptionsHelp')}</span>
                </span>
              </label>
            </div>
          </div>
        </details>

        <div className="setup__footer">
          {language === 'en' && translationCoverage.missing > 0 && (
            <Notice tone="info" title={t('setup.translationNotice')}>
              {translationCoverage.complete === 0
                ? t('setup.translationNone')
                : t('setup.translationPartial', {
                    complete: translationCoverage.complete,
                    total:
                      translationCoverage.complete +
                      translationCoverage.partial +
                      translationCoverage.missing,
                  })}
            </Notice>
          )}
          {language === 'en' && translationCoverage.missing === 0 && (
            <Notice tone="info" title={t('setup.translationNotice')}>
              {t('setup.translationMachine')}
            </Notice>
          )}
          {docsUnavailable && <Notice tone="warning">{t('error.docsUnavailable')}</Notice>}
          {validationSkipped > 0 && (
            <Notice tone="warning">
              {t('error.validationSummary', { count: validationSkipped })}
            </Notice>
          )}

          <button
            type="submit"
            className="btn btn--primary btn--lg btn--block"
            disabled={countError}
          >
            {t('setup.start')}
          </button>
        </div>
      </form>
    </section>
  );
}
