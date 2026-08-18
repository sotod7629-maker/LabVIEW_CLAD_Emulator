/** Multi-select chip group used for topics and difficulty levels. */
import { useId } from 'react';
import { useI18n } from '../i18n';

export function FilterGroup({
  label,
  allLabel,
  options,
  selected,
  onChange,
}: {
  label: string;
  allLabel: string;
  options: readonly string[];
  selected: readonly string[];
  onChange: (selected: string[]) => void;
}) {
  const { t } = useI18n();
  const groupId = useId();

  if (options.length === 0) return null;

  const toggle = (option: string) => {
    onChange(selected.includes(option) ? selected.filter((entry) => entry !== option) : [...selected, option]);
  };

  return (
    <fieldset className="filter-group">
      <legend className="field__label" id={groupId}>
        {label}
        {selected.length > 0 ? (
          <span className="field__label-note">{t('setup.selectedCount', { count: selected.length })}</span>
        ) : null}
      </legend>
      <div className="filter-group__options">
        <button
          type="button"
          className={`chip ${selected.length === 0 ? 'is-selected' : ''}`.trim()}
          aria-pressed={selected.length === 0}
          onClick={() => onChange([])}
        >
          {allLabel}
        </button>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`chip ${selected.includes(option) ? 'is-selected' : ''}`.trim()}
            aria-pressed={selected.includes(option)}
            onClick={() => toggle(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
