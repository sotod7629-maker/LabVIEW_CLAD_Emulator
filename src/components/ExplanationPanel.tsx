/**
 * Renders an explanation with its provenance made visually explicit.
 *
 * Document extracts and question-bank annotations are drawn as two distinct
 * blocks with different labels and different source lines, because they carry
 * different epistemic weight: one is a quotation with a verifiable locator, the
 * other is an unverified note shipped with the data.
 */
import type { EvidencePassage, Explanation } from '../explanations/types';
import { useI18n } from '../i18n';
import { Callout } from './primitives';

function PassageList({ heading, passages }: { heading: string; passages: readonly EvidencePassage[] }) {
  const { t } = useI18n();
  if (passages.length === 0) return null;

  return (
    <div className="evidence-group">
      <h5 className="evidence-group__heading">{heading}</h5>
      {passages.map((passage, index) => (
        <figure className="evidence" key={`${passage.citation.documentId}-${passage.citation.pageNumber}-${index}`}>
          <blockquote className="evidence__quote">{passage.text}</blockquote>
          <figcaption className="evidence__source">
            <span className="evidence__source-label">{t('explanations.source')}</span>
            <span className="evidence__source-value">
              <span className="evidence__document">{passage.citation.documentName}</span>
              <span className="evidence__page">
                {t('explanations.page', { page: passage.citation.pageNumber })}
              </span>
              {passage.citation.section ? (
                <span className="evidence__section">
                  {t('explanations.section', { section: passage.citation.section })}
                </span>
              ) : null}
              {/* Retrieval confidence, shown so a weak match is not mistaken
                  for a strong one. */}
              <span className="evidence__relevance">
                {t('explanations.relevance', { score: passage.score })}
              </span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export function ExplanationPanel({ explanation }: { explanation: Explanation | undefined }) {
  const { t } = useI18n();

  if (!explanation) {
    return <p className="explanation__empty">{t('explanations.none')}</p>;
  }

  const evidence = explanation.documentEvidence;
  const hasEvidence =
    !!evidence && (evidence.supportingCorrect.length > 0 || evidence.regardingSelected.length > 0);

  return (
    <div className="explanation">
      {hasEvidence ? (
        <section className="explanation__block explanation__block--document">
          <header className="explanation__block-header">
            <h4 className="explanation__block-title">{t('explanations.documentExtract')}</h4>
            <p className="explanation__block-hint">{t('explanations.documentExtractHint')}</p>
          </header>
          <PassageList heading={t('explanations.whyCorrect')} passages={evidence.supportingCorrect} />
          <PassageList heading={t('explanations.whyIncorrect')} passages={evidence.regardingSelected} />
        </section>
      ) : null}

      {explanation.bankRationale ? (
        <section className="explanation__block explanation__block--bank">
          <header className="explanation__block-header">
            <h4 className="explanation__block-title">{t('explanations.bankAnnotation')}</h4>
            <p className="explanation__block-hint">{t('explanations.bankAnnotationHint')}</p>
          </header>
          <p className="explanation__bank-text">{explanation.bankRationale.text}</p>
          {explanation.bankRationale.sourceLabel ? (
            <p className="explanation__bank-source">
              <span className="evidence__source-label">{t('explanations.declaredSource')}</span>
              <span>{explanation.bankRationale.sourceLabel}</span>
            </p>
          ) : null}
        </section>
      ) : null}

      {explanation.notices.map((notice) => (
        <Callout key={notice} tone={notice === 'explanations.notice.bankOnly' ? 'neutral' : 'warning'} icon="i">
          {t(notice)}
        </Callout>
      ))}
    </div>
  );
}
