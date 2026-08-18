import { useI18n } from '../i18n';
import { LanguageSelector } from './LanguageSelector';

const PHASES = ['setup', 'quiz', 'results'] as const;
export type Phase = (typeof PHASES)[number];

/** Header with a non-interactive step indicator so the user always knows where they are. */
export function AppHeader({ phase }: { phase: Phase }) {
  const { t } = useI18n();
  const activeIndex = PHASES.indexOf(phase);

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__brand">
          <span className="app-header__mark" aria-hidden="true">
            ◧
          </span>
          <span className="app-header__titles">
            <span className="app-header__title">{t('app.title')}</span>
            <span className="app-header__subtitle">{t('app.subtitle')}</span>
          </span>
        </div>

        <ol className="steps" aria-label={t('nav.setup')}>
          {PHASES.map((step, index) => (
            <li
              key={step}
              className={`steps__item ${index === activeIndex ? 'is-current' : ''} ${index < activeIndex ? 'is-done' : ''}`.trim()}
              aria-current={index === activeIndex ? 'step' : undefined}
            >
              <span className="steps__index" aria-hidden="true">
                {index + 1}
              </span>
              <span className="steps__label">{t(`nav.${step}`)}</span>
            </li>
          ))}
        </ol>

        <LanguageSelector compact />
      </div>
    </header>
  );
}
