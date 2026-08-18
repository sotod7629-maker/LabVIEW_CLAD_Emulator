/**
 * Export controls (§22, §43).
 */

import { useState } from 'react';
import { exportCSV } from '../lib/export/exportCSV';
import { exportJSON } from '../lib/export/exportJSON';
import { exportPDF } from '../lib/export/exportPDF';
import type { ExportPayload, ExportScope } from '../lib/export/types';
import type { Explanation } from '../lib/explain/types';
import type { QuizResults } from '../lib/quiz/types';
import type { Translator } from '../lib/i18n';
import { Notice } from './primitives';

type Format = 'pdf' | 'csv' | 'json';

export function ExportPanel({
  results,
  explanations,
  quizName,
  t,
}: {
  results: QuizResults;
  explanations: Map<number, Explanation>;
  quizName: string;
  t: Translator;
}) {
  const [scope, setScope] = useState<ExportScope>('all');
  const [busy, setBusy] = useState<Format | null>(null);
  const [error, setError] = useState<string | null>(null);

  const incorrectCount = results.results.filter((r) => !r.isCorrect).length;
  const nothingToExport = scope === 'incorrect' && incorrectCount === 0;

  const run = async (format: Format) => {
    if (nothingToExport) return;
    setBusy(format);
    setError(null);
    const payload: ExportPayload = { results, explanations, quizName, t };
    try {
      if (format === 'pdf') await exportPDF(payload, scope);
      else if (format === 'csv') exportCSV(payload, scope);
      else exportJSON(payload, scope);
    } catch {
      setError(t('export.failed'));
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className="card card--padded export" aria-labelledby="export-heading">
      <h2 className="field__label" id="export-heading" style={{ fontSize: 'var(--fs-md)' }}>
        {t('export.heading')}
      </h2>

      <div className="export__scope" style={{ marginTop: 'var(--sp-3)' }}>
        <div className="segmented" role="radiogroup" aria-label={t('export.heading')}>
          <button
            type="button"
            className="segmented__option"
            role="radio"
            aria-checked={scope === 'all'}
            onClick={() => setScope('all')}
          >
            {t('export.all')}
          </button>
          <button
            type="button"
            className="segmented__option"
            role="radio"
            aria-checked={scope === 'incorrect'}
            onClick={() => setScope('incorrect')}
          >
            {t('export.incorrectOnly')} ({incorrectCount})
          </button>
        </div>
      </div>

      <div className="export__grid">
        {(['pdf', 'csv', 'json'] as const).map((format) => (
          <button
            key={format}
            type="button"
            className="btn btn--secondary"
            disabled={busy !== null || nothingToExport}
            onClick={() => void run(format)}
          >
            {busy === format ? t('export.preparing') : t(`export.${format}`)}
          </button>
        ))}
      </div>

      {nothingToExport && (
        <div style={{ marginTop: 'var(--sp-3)' }}>
          <Notice tone="info">{t('export.nothingToExport')}</Notice>
        </div>
      )}
      {error && (
        <div style={{ marginTop: 'var(--sp-3)' }}>
          <Notice tone="error">{error}</Notice>
        </div>
      )}
    </section>
  );
}
