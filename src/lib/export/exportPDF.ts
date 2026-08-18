/**
 * PDF export (§22, §55).
 *
 * DEPENDENCY NOTE
 * ---------------
 * Uses jsPDF. It produces a real, deterministic .pdf with selectable text and
 * needs no server. Alternatives considered: html2pdf/html2canvas rasterises the
 * page (text stops being selectable or searchable, and file size balloons), and
 * pdfmake is substantially larger for no benefit here. jsPDF is loaded lazily
 * so it never enters the initial bundle.
 *
 * The layout is deliberately restrained — black text, hairline rules, one
 * accent weight — because this is an assessment record, not a marketing page.
 * Outcomes are conveyed by a text label as well as position, never by colour
 * alone (§13).
 */

import type { jsPDF } from 'jspdf';
import { buildFilename } from './filename';
import { scopeResults, type ExportPayload, type ExportScope } from './types';
import type { QuestionResult } from '../quiz/types';

const PAGE_MARGIN = 18;
const LINE_HEIGHT = 4.8;
const FONT_SIZE_BODY = 9.5;
const FONT_SIZE_LABEL = 8;
const FONT_SIZE_HEADING = 13;

interface Cursor {
  y: number;
  page: number;
}

class PdfWriter {
  private readonly pageWidth: number;
  private readonly pageHeight: number;
  private readonly contentWidth: number;
  readonly cursor: Cursor = { y: PAGE_MARGIN, page: 1 };

  constructor(private readonly doc: jsPDF) {
    this.pageWidth = doc.internal.pageSize.getWidth();
    this.pageHeight = doc.internal.pageSize.getHeight();
    this.contentWidth = this.pageWidth - PAGE_MARGIN * 2;
  }

  private ensureSpace(height: number): void {
    if (this.cursor.y + height <= this.pageHeight - PAGE_MARGIN - 8) return;
    this.doc.addPage();
    this.cursor.page += 1;
    this.cursor.y = PAGE_MARGIN;
  }

  space(amount = LINE_HEIGHT): void {
    this.cursor.y += amount;
  }

  rule(): void {
    this.ensureSpace(4);
    this.doc.setDrawColor(190);
    this.doc.setLineWidth(0.2);
    this.doc.line(PAGE_MARGIN, this.cursor.y, this.pageWidth - PAGE_MARGIN, this.cursor.y);
    this.cursor.y += 3.5;
  }

  text(
    content: string,
    options: {
      size?: number;
      style?: 'normal' | 'bold' | 'italic';
      color?: [number, number, number];
      indent?: number;
      gap?: number;
    } = {},
  ): void {
    const size = options.size ?? FONT_SIZE_BODY;
    const indent = options.indent ?? 0;
    this.doc.setFont('helvetica', options.style ?? 'normal');
    this.doc.setFontSize(size);
    this.doc.setTextColor(...(options.color ?? [20, 20, 20]));

    const lines = this.doc.splitTextToSize(content, this.contentWidth - indent) as string[];
    const lineHeight = size * 0.42 + 1.6;
    for (const line of lines) {
      this.ensureSpace(lineHeight);
      this.doc.text(line, PAGE_MARGIN + indent, this.cursor.y);
      this.cursor.y += lineHeight;
    }
    if (options.gap) this.cursor.y += options.gap;
  }

  label(content: string): void {
    this.text(content.toUpperCase(), {
      size: FONT_SIZE_LABEL,
      style: 'bold',
      color: [110, 110, 110],
    });
  }

  heading(content: string): void {
    this.ensureSpace(12);
    this.space(2);
    this.text(content, { size: FONT_SIZE_HEADING, style: 'bold' });
    this.rule();
  }

  /** Page numbers, written last so the total is known. */
  paginate(footerLabel: string): void {
    const total = this.doc.getNumberOfPages();
    for (let page = 1; page <= total; page += 1) {
      this.doc.setPage(page);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(7.5);
      this.doc.setTextColor(130);
      this.doc.text(footerLabel, PAGE_MARGIN, this.pageHeight - 10);
      this.doc.text(
        `${page} / ${total}`,
        this.pageWidth - PAGE_MARGIN,
        this.pageHeight - 10,
        { align: 'right' },
      );
    }
  }
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function writeQuestion(writer: PdfWriter, payload: ExportPayload, result: QuestionResult): void {
  const { t } = payload;

  writer.space(2);
  writer.text(`${t('common.question')} ${result.position} · ID ${result.questionId}`, {
    size: FONT_SIZE_LABEL,
    style: 'bold',
    color: [110, 110, 110],
  });
  writer.text(result.question, { style: 'bold' });
  writer.space(1);

  writer.label(t('results.yourAnswer'));
  writer.text(result.selectedAnswerText ?? t('results.noAnswer'), { indent: 3 });

  writer.label(t('results.correctAnswer'));
  writer.text(result.correctAnswerText, { indent: 3 });

  if (result.bankExplanation) {
    writer.space(1);
    writer.label(t('explanation.bankNote'));
    writer.text(result.bankExplanation, { indent: 3, color: [60, 60, 60] });
  }

  const explanation = payload.explanations.get(result.questionId);
  writer.space(1);

  if (explanation?.status === 'documented' && explanation.passages.length > 0) {
    writer.label(t('explanation.evidence'));
    for (const passage of explanation.passages) {
      writer.text(`“${passage.excerpt}”`, {
        indent: 3,
        style: 'italic',
        color: [55, 55, 55],
      });
      const citation = [
        passage.citation.documentTitle,
        passage.citation.page ? `${t('common.page')} ${passage.citation.page}` : null,
        passage.citation.lessonTitle
          ? `${t('common.lesson')} ${passage.citation.lesson}: ${passage.citation.lessonTitle}`
          : null,
        passage.citation.section ? `${t('common.section')}: ${passage.citation.section}` : null,
      ]
        .filter(Boolean)
        .join(' · ');
      writer.text(`${t('explanation.source')}: ${citation}`, {
        indent: 3,
        size: FONT_SIZE_LABEL,
        color: [110, 110, 110],
      });
      writer.space(1);
    }
  } else {
    writer.label(t('explanation.evidence'));
    writer.text(t('explanation.insufficient'), {
      indent: 3,
      style: 'italic',
      color: [110, 110, 110],
    });
  }

  writer.space(1.5);
  writer.rule();
}

export async function exportPDF(payload: ExportPayload, scope: ExportScope): Promise<void> {
  // Lazy import keeps jsPDF out of the initial bundle.
  const { jsPDF: JsPDF } = await import('jspdf');
  const doc = new JsPDF({ unit: 'mm', format: 'a4', compress: true });
  const writer = new PdfWriter(doc);
  const { t } = payload;
  const { summary, config } = payload.results;
  const scoped = scopeResults(payload, scope);

  // --- Cover block ---------------------------------------------------------
  writer.text(t('results.heading').toUpperCase(), { size: 18, style: 'bold' });
  writer.space(1);
  writer.text(payload.quizName, { size: 11, color: [80, 80, 80] });
  writer.rule();

  const meta: [string, string][] = [
    [t('results.date'), new Date(payload.results.finishedAt).toLocaleString()],
    [t('common.language'), config.language === 'es' ? 'Español' : 'English'],
    [t('setup.mode'), config.mode === 'exam' ? t('setup.modeExam') : t('setup.modePractice')],
    [t('results.total'), String(summary.total)],
    [t('results.duration'), formatDuration(payload.results.durationSeconds)],
  ];
  for (const [key, value] of meta) {
    writer.text(`${key}: ${value}`, { size: FONT_SIZE_BODY, color: [70, 70, 70] });
  }

  writer.space(3);
  writer.text(`${summary.percentage}%`, { size: 30, style: 'bold' });
  writer.text(t('results.correctOf', { correct: summary.correct, total: summary.total }), {
    size: 11,
    color: [70, 70, 70],
  });

  writer.heading(t('results.summaryChart'));
  writer.text(`${t('results.correct')}: ${summary.correct}`);
  writer.text(`${t('results.incorrect')}: ${summary.incorrect}`);
  writer.text(`${t('results.unanswered')}: ${summary.unanswered}`);

  writer.space(2);
  writer.text(t('explanation.noNarrative'), {
    size: FONT_SIZE_LABEL,
    style: 'italic',
    color: [120, 120, 120],
  });

  // --- Question detail -----------------------------------------------------
  const correct = scoped.results.filter((r) => r.isCorrect);
  const incorrect = scoped.results.filter((r) => r.isAnswered && !r.isCorrect);
  const unanswered = scoped.results.filter((r) => !r.isAnswered);

  const sections: [string, QuestionResult[]][] = [
    [t('results.incorrect'), incorrect],
    [t('results.unanswered'), unanswered],
    [t('results.correct'), correct],
  ];

  for (const [title, items] of sections) {
    if (items.length === 0) continue;
    writer.heading(`${title} (${items.length})`);
    for (const result of items) writeQuestion(writer, payload, result);
  }

  writer.paginate(payload.quizName);

  doc.save(
    buildFilename({
      quizName: payload.quizName,
      extension: 'pdf',
      suffix: scope === 'incorrect' ? 'incorrect' : undefined,
    }),
  );
}
