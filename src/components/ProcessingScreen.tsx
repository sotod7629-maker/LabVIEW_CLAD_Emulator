/**
 * Shown while answers are graded and explanations are retrieved.
 * Reports real progress (n of m explanations) rather than an indefinite
 * spinner, so a 100-question run never looks frozen.
 */
import { useI18n } from '../i18n';
import { ProgressBar } from './primitives';

export function ProcessingScreen({
  stage,
  done,
  total,
}: {
  stage: 'evaluating' | 'explanations';
  done: number;
  total: number;
}) {
  const { t } = useI18n();

  return (
    <div className="processing" role="status" aria-live="polite">
      <p className="processing__title">
        {stage === 'evaluating' ? t('processing.evaluating') : t('processing.explanations')}
      </p>
      {stage === 'explanations' && total > 0 ? (
        <>
          <ProgressBar value={done} max={total} label={t('processing.explanations')} />
          <p className="processing__detail">{t('processing.explanationsProgress', { done, total })}</p>
        </>
      ) : (
        <ProgressBar value={1} max={3} label={t('processing.evaluating')} />
      )}
    </div>
  );
}
