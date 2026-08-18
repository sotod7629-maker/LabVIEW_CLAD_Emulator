/**
 * Export controls.
 *
 * Scope and format are chosen independently, so "incorrect answers only" works
 * for every format rather than being a separate button.
 */
import { useState } from 'react';
import type { Explanation } from '../explanations/types';
import type { QuizResults } from '../quiz/types';
import { buildCsvExport } from '../export/exportCSV';
import { buildJsonExport, serializeJsonExport } from '../export/exportJSON';
import { buildPdfExport } from '../export/exportPDF';
import { buildExportFileName } from '../export/filename';
import { downloadBlob, downloadText } from '../export/download';
import { filterResultsByScope, type ExportScope } from '../export/scope';
import { useI18n } from '../i18n';
import { Callout, SectionHeading } from './primitives';

const SCOPES: ExportScope[] = ['all', 'incorrect', 'review'];

export function ExportPanel({
  results,
  explanations,
}: {
  results: QuizResults;
  explanations: ReadonlyMap<string, Explanation>;
}) {
  const { t } = useI18n();
  const [scope, setScope] = useState<ExportScope>('all');
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const scopedCount = filterResultsByScope(results.results, scope).length;
  const disabled = scopedCount === 0;

  const run = async (format: 'pdf' | 'csv' | 'json') => {
    setBusy(format);
    setError(false);
    try {
      const fileName = buildExportFileName(results.quizTitle, format, new Date(results.completedAt));
      if (format === 'pdf') {
        downloadBlob(await buildPdfExport({ results, explanations, scope }), fileName);
      } else if (format === 'csv') {
        downloadText(buildCsvExport(results, explanations, scope), fileName, 'text/csv');
      } else {
        downloadText(
          serializeJsonExport(buildJsonExport(results, explanations, scope)),
          fileName,
          'application/json',
        );
      }
    } catch {
      setError(true);
    } finally {
      setBusy(null);
    }
  };

  return (
    <section className="export-panel">
      <SectionHeading level={3} title={t('export.heading')} />

      <div className="field">
        <span className="field__label" id="export-scope-label">
          {t('export.scope')}
        </span>
        <div className="segmented" role="radiogroup" aria-labelledby="export-scope-label">
          {SCOPES.map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={scope === option}
              className={`segmented__option ${scope === option ? 'is-selected' : ''}`.trim()}
              onClick={() => setScope(option)}
            >
              {t(`export.scope.${option}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="button-row">
        {(['pdf', 'csv', 'json'] as const).map((format) => (
          <button
            key={format}
            type="button"
            className="button button--secondary"
            disabled={disabled || busy !== null}
            onClick={() => void run(format)}
          >
            {busy === format ? t('export.preparing') : t('export.download', { format: t(`export.${format}`) })}
          </button>
        ))}
      </div>

      {disabled ? <Callout tone="neutral">{t('export.empty')}</Callout> : null}
      {error ? (
        <Callout tone="danger" icon="!">
          {t('export.error')}
        </Callout>
      ) : null}
    </section>
  );
}
