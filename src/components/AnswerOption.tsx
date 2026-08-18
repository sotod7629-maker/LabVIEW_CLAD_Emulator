/**
 * One selectable answer.
 *
 * Rendered as a real radio input with a styled label: keyboard behaviour
 * (arrow keys, space) and screen-reader semantics come from the platform
 * rather than from ARIA bolted onto a div. The whole card is the label, so the
 * touch target is the full row.
 */
import type { ReactNode } from 'react';
import { useI18n } from '../i18n';

export function AnswerOption({
  name,
  optionId,
  letter,
  text,
  selected,
  onSelect,
  state = 'neutral',
  annotation,
}: {
  name: string;
  optionId: string;
  letter: string;
  text: string;
  selected: boolean;
  onSelect?: (optionId: string) => void;
  /** Review states colour the row; the annotation carries the same meaning as text. */
  state?: 'neutral' | 'correct' | 'incorrect';
  annotation?: ReactNode;
}) {
  const { t } = useI18n();
  const readOnly = !onSelect;

  return (
    <label className={`answer answer--${state} ${selected ? 'is-selected' : ''} ${readOnly ? 'is-readonly' : ''}`.trim()}>
      <input
        className="answer__input"
        type="radio"
        name={name}
        value={optionId}
        checked={selected}
        disabled={readOnly}
        onChange={() => onSelect?.(optionId)}
      />
      <span className="answer__marker" aria-hidden="true">
        {letter}
      </span>
      <span className="answer__text">{text}</span>
      {selected && readOnly ? <span className="answer__badge">{t('quiz.selected')}</span> : null}
      {annotation ? <span className="answer__annotation">{annotation}</span> : null}
    </label>
  );
}

/** Display letter for a position: a, b, c… independent of the option's stable id. */
export function positionLetter(index: number): string {
  return String.fromCharCode(65 + (index % 26));
}
