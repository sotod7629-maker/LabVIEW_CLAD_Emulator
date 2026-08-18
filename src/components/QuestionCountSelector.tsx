/**
 * Question-count control: presets, a slider and a number field, all bound to
 * the same value. Validation is enforced on every path — typing 250 clamps to
 * the maximum rather than generating an oversized quiz.
 */
import { useId } from 'react';
import { MAX_QUESTIONS, MIN_QUESTIONS } from '../quiz/generateQuiz';
import { useI18n } from '../i18n';

const PRESETS = [10, 25, 50, 100];

export function QuestionCountSelector({
  value,
  available,
  onChange,
}: {
  value: number;
  available: number;
  onChange: (value: number) => void;
}) {
  const { t } = useI18n();
  const inputId = useId();
  const hintId = `${inputId}-hint`;

  const upperBound = Math.min(MAX_QUESTIONS, Math.max(MIN_QUESTIONS, available));
  const clamp = (next: number) => Math.min(MAX_QUESTIONS, Math.max(MIN_QUESTIONS, next));

  return (
    <div className="field">
      <label className="field__label" htmlFor={inputId}>
        {t('setup.questionCount')}
      </label>

      <div className="count-control">
        <input
          className="count-control__slider"
          type="range"
          min={MIN_QUESTIONS}
          max={upperBound}
          value={Math.min(value, upperBound)}
          onChange={(event) => onChange(clamp(Number(event.target.value)))}
          aria-describedby={hintId}
          aria-label={t('setup.questionCount')}
        />
        <input
          className="count-control__number"
          id={inputId}
          type="number"
          inputMode="numeric"
          min={MIN_QUESTIONS}
          max={MAX_QUESTIONS}
          value={value}
          onChange={(event) => {
            const parsed = Number(event.target.value);
            if (Number.isNaN(parsed)) return;
            onChange(clamp(Math.round(parsed)));
          }}
          aria-describedby={hintId}
        />
      </div>

      <div className="count-presets" role="group" aria-label={t('setup.presets')}>
        {PRESETS.filter((preset) => preset <= Math.max(upperBound, MIN_QUESTIONS)).map((preset) => (
          <button
            key={preset}
            type="button"
            className={`chip ${value === preset ? 'is-selected' : ''}`.trim()}
            aria-pressed={value === preset}
            onClick={() => onChange(preset)}
          >
            {preset}
          </button>
        ))}
      </div>

      <p className="field__hint" id={hintId}>
        {t('setup.questionCountHint', { min: MIN_QUESTIONS, max: MAX_QUESTIONS, available })}
      </p>
    </div>
  );
}
