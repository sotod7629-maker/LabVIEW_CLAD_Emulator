/**
 * Explanation presentation (§16, §17, §44, §45).
 *
 * Two clearly separated kinds of information, never blended:
 *
 *   1. The question bank's own author note — labelled as such, so nobody
 *      mistakes it for documentation.
 *   2. Documentary evidence — quoted verbatim from an indexed manual page,
 *      visually distinct, with a citation the reader can verify.
 *
 * When retrieval found nothing that clears the evidence gate, this says so
 * plainly. It never falls back to presenting the bank note as documentation.
 */

import type { Explanation, EvidencePassage } from '../lib/explain/types';
import type { Translator } from '../lib/i18n';
import type { Language } from '../lib/quiz/types';
import { Notice } from './primitives';

function Citation({ passage, t }: { passage: EvidencePassage; t: Translator }) {
  const { citation } = passage;
  return (
    <div className="passage__source">
      <div className="passage__source-label">{t('explanation.source')}</div>
      <div className="passage__citation">
        <span>
          <strong>{citation.documentTitle}</strong>
        </span>
        {citation.page && (
          <span>
            {t('common.page')} <strong>{citation.page}</strong>
          </span>
        )}
        {citation.lesson != null && citation.lessonTitle && (
          <span>
            {t('common.lesson')} {citation.lesson}: {citation.lessonTitle}
          </span>
        )}
        {citation.section && (
          <span>
            {t('common.section')}: {citation.section}
          </span>
        )}
      </div>
    </div>
  );
}

export function ExplanationPanel({
  explanation,
  bankExplanation,
  bankSource,
  language,
  t,
}: {
  explanation: Explanation | undefined;
  bankExplanation: string;
  bankSource: string;
  language: Language;
  t: Translator;
}) {
  const passages = explanation?.status === 'documented' ? explanation.passages : [];
  // The manuals are English-only; say so when the interface is Spanish.
  const crossLanguage =
    passages.length > 0 && passages.some((p) => p.citation.language !== language);

  return (
    <div className="explanation">
      {bankExplanation && (
        <>
          <div className="explanation__section-label">{t('explanation.bankNote')}</div>
          <p className="explanation__help">{t('explanation.bankNoteHelp')}</p>
          <div className="explanation__bank-note">
            {bankExplanation}
            {bankSource && (
              <div
                style={{
                  marginTop: 'var(--sp-2)',
                  fontSize: 'var(--fs-xs)',
                  color: 'var(--c-text-subtle)',
                }}
              >
                {bankSource}
              </div>
            )}
          </div>
        </>
      )}

      <div className="explanation__section-label">{t('explanation.evidence')}</div>
      <p className="explanation__help">{t('explanation.evidenceHelp')}</p>

      {explanation === undefined && (
        <p className="explanation__help">{t('explanation.loading')}</p>
      )}

      {passages.length > 0 && (
        <>
          {passages.map((passage, index) => (
            <blockquote className="passage" key={`${passage.citation.page}-${index}`}>
              <p className="passage__quote">{passage.excerpt}</p>
              <Citation passage={passage} t={t} />
            </blockquote>
          ))}
          {crossLanguage && (
            <p className="explanation__help">{t('explanation.sourceLanguageNote')}</p>
          )}
          <p className="explanation__help">{t('explanation.noNarrative')}</p>
        </>
      )}

      {explanation?.status === 'insufficient' && (
        <Notice tone="warning">
          {t('explanation.insufficient')}
          <div style={{ marginTop: 'var(--sp-1)', fontSize: 'var(--fs-xs)' }}>
            {t('explanation.insufficientHelp')}
          </div>
        </Notice>
      )}

      {explanation?.status === 'unavailable' && (
        <Notice tone="warning">{t('explanation.unavailable')}</Notice>
      )}

      {explanation?.status === 'error' && (
        <Notice tone="error">{t('explanation.error')}</Notice>
      )}
    </div>
  );
}
