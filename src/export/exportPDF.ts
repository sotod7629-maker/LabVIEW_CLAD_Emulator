/**
 * Printable PDF report.
 *
 * Built with jsPDF: generating a real PDF file client-side needs a PDF writer,
 * and the alternative (`window.print()`) produces a browser dialog rather than
 * a downloadable artifact and cannot control pagination of a 100-question
 * report. jsPDF is imported dynamically so it is only fetched on export.
 *
 * The layout is a plain typographic report — rules and weight for hierarchy,
 * no decorative color — so it prints legibly in black and white.
 */
import type { UiLanguage } from '../data/types';
import type { Explanation } from '../explanations/types';
import type { QuestionResult, QuizResults } from '../quiz/types';
import { formatDate, formatDuration, translate } from '../i18n';
import { filterResultsByScope, type ExportScope } from './scope';

const PAGE_MARGIN = 48;
const LINE_HEIGHT = 14;
const SECTION_GAP = 18;

interface Cursor {
  y: number;
  page: number;
}

type Doc = import('jspdf').jsPDF;

/** Text colors as grayscale — the report is designed to be printed. */
const INK = 20;
const MUTED = 110;
const RULE = 190;

/**
 * jsPDF's built-in Helvetica uses the PDF standard encoding, which covers
 * Latin-1 (so Spanish accents, "ñ", "¿" and "¡" render correctly) but not
 * typographic punctuation. Unmapped characters would otherwise vanish
 * silently, so we transliterate the common ones and mark anything genuinely
 * unrepresentable rather than dropping it without trace.
 */
const CHARACTER_SUBSTITUTIONS: Record<string, string> = {
  '\u2014': '-',
  '\u2013': '-',
  '\u2018': "'",
  '\u2019': "'",
  '\u201c': '"',
  '\u201d': '"',
  '\u2026': '...',
  '\u00a0': ' ',
  '\u2022': '-',
  '\u2192': '->',
  '\u2264': '<=',
  '\u2265': '>=',
};

export function toPdfSafeText(value: string): string {
  let out = '';
  for (const character of value) {
    const substitution = CHARACTER_SUBSTITUTIONS[character];
    if (substitution !== undefined) out += substitution;
    else if (character.codePointAt(0)! <= 0xff) out += character;
    else out += '?';
  }
  return out;
}

class ReportWriter {
  private readonly doc: Doc;
  private readonly cursor: Cursor = { y: PAGE_MARGIN, page: 1 };
  private readonly pageWidth: number;
  private readonly pageHeight: number;
  readonly contentWidth: number;

  constructor(doc: Doc) {
    this.doc = doc;
    this.pageWidth = doc.internal.pageSize.getWidth();
    this.pageHeight = doc.internal.pageSize.getHeight();
    this.contentWidth = this.pageWidth - PAGE_MARGIN * 2;
  }

  /** Break to a new page when `needed` points would overflow the bottom margin. */
  private ensureSpace(needed: number): void {
    if (this.cursor.y + needed <= this.pageHeight - PAGE_MARGIN) return;
    this.doc.addPage();
    this.cursor.page += 1;
    this.cursor.y = PAGE_MARGIN;
  }

  gap(amount = SECTION_GAP): void {
    this.cursor.y += amount;
  }

  text(
    content: string,
    options: { size?: number; style?: 'normal' | 'bold' | 'italic'; color?: number; indent?: number } = {},
  ): void {
    const size = options.size ?? 10;
    const indent = options.indent ?? 0;
    this.doc.setFont('helvetica', options.style ?? 'normal');
    this.doc.setFontSize(size);
    this.doc.setTextColor(options.color ?? INK);

    const lines = this.doc.splitTextToSize(toPdfSafeText(content), this.contentWidth - indent) as string[];
    const lineHeight = Math.max(LINE_HEIGHT, size * 1.35);
    for (const line of lines) {
      this.ensureSpace(lineHeight);
      this.doc.text(line, PAGE_MARGIN + indent, this.cursor.y);
      this.cursor.y += lineHeight;
    }
  }

  rule(): void {
    this.ensureSpace(10);
    this.doc.setDrawColor(RULE);
    this.doc.setLineWidth(0.5);
    this.doc.line(PAGE_MARGIN, this.cursor.y, this.pageWidth - PAGE_MARGIN, this.cursor.y);
    this.cursor.y += 10;
  }

  sectionHeading(title: string): void {
    this.ensureSpace(46);
    this.gap(10);
    this.text(title.toUpperCase(), { size: 11, style: 'bold' });
    this.rule();
  }

  /** Keep a question and its first lines together rather than orphaning a heading. */
  keepTogether(estimatedHeight: number): void {
    this.ensureSpace(Math.min(estimatedHeight, 220));
  }

  /** Page numbers are stamped at the end, once the total is known. */
  stampFooters(label: (page: number, total: number) => string): void {
    const total = this.doc.getNumberOfPages();
    for (let page = 1; page <= total; page += 1) {
      this.doc.setPage(page);
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(8);
      this.doc.setTextColor(MUTED);
      this.doc.text(toPdfSafeText(label(page, total)), this.pageWidth / 2, this.pageHeight - 24, {
        align: 'center',
      });
    }
  }
}

function writeExplanation(writer: ReportWriter, explanation: Explanation | undefined, language: UiLanguage): void {
  if (!explanation) {
    writer.text(translate(language, 'explanations.none'), { size: 9, color: MUTED, style: 'italic', indent: 12 });
    return;
  }

  const evidence = explanation.documentEvidence;
  if (evidence && (evidence.supportingCorrect.length > 0 || evidence.regardingSelected.length > 0)) {
    const groups: Array<{ heading: string; passages: typeof evidence.supportingCorrect }> = [
      { heading: translate(language, 'explanations.whyCorrect'), passages: evidence.supportingCorrect },
      { heading: translate(language, 'explanations.whyIncorrect'), passages: evidence.regardingSelected },
    ];

    for (const group of groups) {
      if (group.passages.length === 0) continue;
      writer.text(group.heading, { size: 9, style: 'bold', indent: 12 });
      for (const passage of group.passages) {
        writer.text(`“${passage.text}”`, { size: 9, indent: 20 });
        const section = passage.citation.section
          ? ` · ${translate(language, 'explanations.section', { section: passage.citation.section })}`
          : '';
        writer.text(
          `${translate(language, 'explanations.source')}: ${passage.citation.documentName} · ${translate(language, 'explanations.page', { page: passage.citation.pageNumber })}${section}`,
          { size: 8, color: MUTED, indent: 20 },
        );
      }
    }
  }

  if (explanation.bankRationale) {
    writer.text(translate(language, 'explanations.bankAnnotation'), { size: 9, style: 'bold', indent: 12 });
    writer.text(explanation.bankRationale.text, { size: 9, indent: 20 });
    if (explanation.bankRationale.sourceLabel) {
      writer.text(
        `${translate(language, 'explanations.declaredSource')}: ${explanation.bankRationale.sourceLabel}`,
        { size: 8, color: MUTED, indent: 20 },
      );
    }
  }

  for (const notice of explanation.notices) {
    writer.text(translate(language, notice), { size: 8, style: 'italic', color: MUTED, indent: 12 });
  }
}

function writeResult(
  writer: ReportWriter,
  result: QuestionResult,
  explanations: ReadonlyMap<string, Explanation>,
  language: UiLanguage,
): void {
  writer.keepTogether(140);
  writer.gap(8);

  const meta = [translate(language, 'quiz.questionId', { id: result.questionId }), result.category, result.difficulty]
    .filter(Boolean)
    .join(' · ');

  writer.text(
    `${translate(language, 'results.questionLabel', { number: result.displayIndex + 1 })}  ·  ${meta}`,
    { size: 8, color: MUTED, style: 'bold' },
  );
  writer.text(result.questionText, { size: 10 });
  writer.gap(4);
  writer.text(
    `${translate(language, 'results.yourAnswer')}: ${result.selectedOptionText ?? translate(language, 'results.noAnswer')}`,
    { size: 9, indent: 12 },
  );
  writer.text(`${translate(language, 'results.correctAnswer')}: ${result.correctOptionText}`, {
    size: 9,
    indent: 12,
  });
  writer.gap(4);
  writeExplanation(writer, explanations.get(result.questionId), language);
}

export interface PdfExportInput {
  results: QuizResults;
  explanations: ReadonlyMap<string, Explanation>;
  scope?: ExportScope;
}

/** Build the report and return it as a Blob ready to download. */
export async function buildPdfExport({ results, explanations, scope = 'all' }: PdfExportInput): Promise<Blob> {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'pt', format: 'a4', compress: true });
  const language = results.language;
  const writer = new ReportWriter(doc);

  doc.setProperties({ title: results.quizTitle, subject: translate(language, 'results.heading') });

  writer.text(translate(language, 'results.heading').toUpperCase(), { size: 18, style: 'bold' });
  writer.gap(6);
  writer.text(results.quizTitle, { size: 11, color: MUTED });
  writer.rule();

  const summary = results.summary;
  writer.text(`${translate(language, 'results.date')}: ${formatDate(language, results.completedAt)}`, { size: 9 });
  writer.text(`${translate(language, 'results.language')}: ${translate(language, `language.${language}`)}`, {
    size: 9,
  });
  writer.text(
    `${translate(language, 'results.duration')}: ${formatDuration(language, results.durationSeconds)}`,
    { size: 9 },
  );
  writer.gap(10);
  writer.text(`${summary.percentage}%`, { size: 30, style: 'bold' });
  writer.text(translate(language, 'results.scoreDetail', { correct: summary.correct, total: summary.total }), {
    size: 11,
    color: MUTED,
  });

  writer.sectionHeading(translate(language, 'results.breakdown'));
  writer.text(`${translate(language, 'results.total')}: ${summary.total}`, { size: 10 });
  writer.text(`${translate(language, 'results.correct')}: ${summary.correct}`, { size: 10 });
  writer.text(`${translate(language, 'results.incorrect')}: ${summary.incorrect}`, { size: 10 });
  writer.text(`${translate(language, 'results.unanswered')}: ${summary.unanswered}`, { size: 10 });

  const scoped = filterResultsByScope(results.results, scope);
  const correct = scoped.filter((result) => result.outcome === 'correct');
  const incorrect = scoped.filter((result) => result.outcome === 'incorrect');
  const unanswered = scoped.filter((result) => result.outcome === 'unanswered');

  const groups: Array<{ heading: string; entries: QuestionResult[] }> = [
    { heading: translate(language, 'results.filter.correct'), entries: correct },
    { heading: translate(language, 'results.filter.incorrect'), entries: incorrect },
    { heading: translate(language, 'results.filter.unanswered'), entries: unanswered },
  ];

  for (const group of groups) {
    if (group.entries.length === 0) continue;
    writer.sectionHeading(`${group.heading} (${group.entries.length})`);
    for (const result of group.entries) writeResult(writer, result, explanations, language);
  }

  writer.stampFooters((page, total) => `${results.quizTitle} · ${page} ${translate(language, 'common.of')} ${total}`);

  return doc.output('blob');
}
