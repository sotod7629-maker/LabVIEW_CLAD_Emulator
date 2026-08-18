/**
 * CSV export (§22).
 *
 * Written for spreadsheet consumption: a UTF-8 BOM so Excel detects the
 * encoding and renders accented Spanish correctly, and CRLF line endings per
 * RFC 4180.
 */

import { buildFilename, downloadBlob } from './filename';
import { scopeResults, type ExportPayload, type ExportScope } from './types';

const HEADERS = [
  'Question ID',
  'Position',
  'Category',
  'Difficulty',
  'Question',
  'Selected Answer',
  'Correct Answer',
  'Result',
  'Bank Explanation',
  'Bank Source',
  'Documentation Status',
  'Documented Excerpt',
  'Source Document',
  'Page',
  'Lesson',
  'Section',
] as const;

/**
 * Quote a CSV field.
 *
 * A leading =, +, - or @ is prefixed with a single quote: spreadsheet software
 * would otherwise interpret the cell as a formula, which is both a rendering
 * bug and a well-known injection vector for shared exports (§34).
 */
export function escapeCsvField(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '""';
  let text = String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export function buildCSVExport(payload: ExportPayload, scope: ExportScope): string {
  const results = scopeResults(payload, scope);
  const rows: string[] = [HEADERS.map(escapeCsvField).join(',')];

  for (const result of results.results) {
    const explanation = payload.explanations.get(result.questionId);
    const passage = explanation?.passages[0];
    const outcome = !result.isAnswered
      ? payload.t('results.unanswered')
      : result.isCorrect
        ? payload.t('results.correct')
        : payload.t('results.incorrect');

    rows.push(
      [
        result.questionId,
        result.position,
        result.category,
        result.difficulty,
        result.question,
        result.selectedAnswerText ?? payload.t('results.noAnswer'),
        result.correctAnswerText,
        outcome,
        result.bankExplanation,
        result.bankSource,
        explanation?.status ?? 'unavailable',
        passage?.excerpt ?? '',
        passage?.citation.documentTitle ?? '',
        passage?.citation.page ?? '',
        passage?.citation.lessonTitle ?? '',
        passage?.citation.section ?? '',
      ]
        .map(escapeCsvField)
        .join(','),
    );
  }

  return rows.join('\r\n');
}

export function exportCSV(payload: ExportPayload, scope: ExportScope): void {
  const csv = buildCSVExport(payload, scope);
  // BOM so Excel reads it as UTF-8 rather than the local codepage.
  const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8' });
  downloadBlob(
    blob,
    buildFilename({
      quizName: payload.quizName,
      extension: 'csv',
      suffix: scope === 'incorrect' ? 'incorrect' : undefined,
    }),
  );
}
