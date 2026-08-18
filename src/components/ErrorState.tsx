import type { ReactNode } from 'react';
import { useI18n } from '../i18n';
import { Callout } from './primitives';

/** Friendly, actionable failure screen. Never surfaces raw errors or stack traces. */
export function ErrorState({ message, onRetry, children }: { message: string; onRetry?: () => void; children?: ReactNode }) {
  const { t } = useI18n();
  return (
    <div className="error-state">
      <h1 className="error-state__title">{t('error.heading')}</h1>
      <Callout tone="danger" icon="!">
        {message}
      </Callout>
      {children}
      {onRetry ? (
        <button type="button" className="button button--primary" onClick={onRetry}>
          {t('error.retry')}
        </button>
      ) : null}
    </div>
  );
}
