import type { UiLanguage } from '../data/types';
import { useI18n } from '../i18n';

const LANGUAGES: UiLanguage[] = ['es', 'en'];

/** Segmented language control. Rendered as a radio group so arrow keys work. */
export function LanguageSelector({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t } = useI18n();

  return (
    <div
      className={`segmented ${compact ? 'segmented--compact' : ''}`.trim()}
      role="radiogroup"
      aria-label={t('language.label')}
    >
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          role="radio"
          aria-checked={language === code}
          className={`segmented__option ${language === code ? 'is-selected' : ''}`.trim()}
          onClick={() => setLanguage(code)}
          title={t('language.switchTo', { name: t(`language.${code}`) })}
        >
          {t(`language.${code}`)}
        </button>
      ))}
    </div>
  );
}
