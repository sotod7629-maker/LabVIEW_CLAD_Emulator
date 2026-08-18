/**
 * CSV export (RFC 4180 quoting, UTF-8 with BOM).
 *
 * The BOM is deliberate: without it Excel on Windows mis-reads the accented
 * Spanish text as Latin-1.
 */
import type { UiLanguage } from '../data/types';
import type { Explanation } from '../explanations/types';
import type { QuestionResult, QuizResults } from '../quiz/types';
import { translate } from '../i18n';
import { filterResultsByScope, type ExportScope } from './scope';

const COLUMNS = [
  'Question ID',
  'Position',
  'Category',
  'Difficulty',
  'Question',
  'Selected Answer',
  'Correct Answer',
  'Result',
  'Explanation Type',
  'Explanation',
  'Source',
  'Page',
  'Section',
] as const;

/** Escape one field: quote when it contains a delimiter, quote or newline. */
export function escapeCsvField(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  const text = String(value);
  if (/[",\r\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function outcomeLabel(result: QuestionResult, language: UiLanguage): string {
  switch (result.outcome) {
    case 'correct':
      return translate(language, 'results.correct');
    case 'incorrect':
      return translate(language, 'results.incorrect');
    default:
      return translate(language, 'results.unanswered');
  }
}

/**
 * Flatten an explanation into the three source columns.
 * A bank annotation is labelled as such — the `Source` column carries the
 * declared reference, never a page number the app does not have.
 */
function explanationFields(
  explanation: Explanation | undefined,
  language: UiLanguage,
): { type: string; text: string; source: string; page: string; section: string } {
  if (!explanation) {
    return { type: '', text: translate(language, 'explanations.none'), source: '', page: '', section: '' };
  }

  if (explanation.provenance === 'document-extract' && explanation.documentEvidence) {
    const passages = [
      ...explanation.documentEvidence.supportingCorrect,
      ...explanation.documentEvidence.regardingSelected,
    ];
    return {
      type: translate(language, 'explanations.documentExtract'),
      text: passages.map((passage) => passage.text).join(' — '),
      source: [...new Set(passages.map((passage) => passage.citation.documentName))].join('; '),
      page: [...new Set(passages.map((passage) => String(passage.citation.pageNumber)))].join('; '),
      section: [...new Set(passages.map((passage) => passage.citation.section).filter(Boolean))].join('; '),
    };
  }

  if (explanation.provenance === 'question-bank' && explanation.bankRationale) {
    return {
      type: translate(language, 'explanations.bankAnnotation'),
      text: explanation.bankRationale.text,
      source: explanation.bankRationale.sourceLabel ?? '',
      page: '',
      section: '',
    };
  }

  return {
    type: '',
    text: translate(language, 'explanations.notice.noSufficientEvidence'),
    source: '',
    page: '',
    section: '',
  };
}

export function buildCsvExport(
  results: QuizResults,
  explanations: ReadonlyMap<string, Explanation>,
  scope: ExportScope = 'all',
): string {
  const language = results.language;
  const scoped = filterResultsByScope(results.results, scope);

  const rows: string[] = [COLUMNS.map(escapeCsvField).join(',')];

  for (const result of scoped) {
    const explanation = explanationFields(explanations.get(result.questionId), language);
    rows.push(
      [
        result.questionId,
        result.displayIndex + 1,
        result.category ?? '',
        result.difficulty ?? '',
        result.questionText,
        result.selectedOptionText ?? translate(language, 'results.noAnswer'),
        result.correctOptionText,
        outcomeLabel(result, language),
        explanation.type,
        explanation.text,
        explanation.source,
        explanation.page,
        explanation.section,
      ]
        .map(escapeCsvField)
        .join(','),
    );
  }

  return `﻿${rows.join('\r\n')}\r\n`;
}
