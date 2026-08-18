import { describe, expect, it } from 'vitest';
import { buildCsvExport, escapeCsvField } from './exportCSV';
import { buildJsonExport, serializeJsonExport } from './exportJSON';
import { buildPdfExport } from './exportPDF';
import { buildExportFileName, sanitizeFileName } from './filename';
import { filterResultsByScope } from './scope';
import type { Explanation } from '../explanations/types';
import type { QuizResults } from '../quiz/types';

const RESULTS: QuizResults = {
  sessionId: 'session-1',
  quizTitle: 'Cuestionario de Práctica CLAD — Core 1 y 2',
  language: 'es',
  startedAt: '2026-08-17T10:00:00.000Z',
  completedAt: '2026-08-17T10:12:30.000Z',
  durationSeconds: 750,
  summary: { total: 3, correct: 1, incorrect: 1, unanswered: 1, percentage: 33.3 },
  results: [
    {
      questionId: '1',
      displayIndex: 0,
      category: 'Entorno de LabVIEW',
      difficulty: 'básico',
      questionText: '¿Qué ventana contiene los controles e indicadores?',
      options: [
        { id: 'a', text: 'Panel Frontal' },
        { id: 'b', text: 'Diagrama de bloques' },
      ],
      selectedOptionId: 'a',
      selectedOptionText: 'Panel Frontal',
      correctOptionId: 'a',
      correctOptionText: 'Panel Frontal',
      outcome: 'correct',
      isCorrect: true,
      isAnswered: true,
      language: 'es',
      contentIsFallback: false,
    },
    {
      questionId: '2',
      displayIndex: 1,
      category: 'Estructuras',
      difficulty: 'intermedio',
      questionText: 'Pregunta con "comillas", coma y\nsalto de línea',
      options: [
        { id: 'a', text: 'Bucle While' },
        { id: 'b', text: 'Bucle For' },
      ],
      selectedOptionId: 'b',
      selectedOptionText: 'Bucle For',
      correctOptionId: 'a',
      correctOptionText: 'Bucle While',
      outcome: 'incorrect',
      isCorrect: false,
      isAnswered: true,
      language: 'es',
      contentIsFallback: false,
    },
    {
      questionId: '3',
      displayIndex: 2,
      category: 'Arrays',
      difficulty: 'avanzado',
      questionText: 'Pregunta sin responder',
      options: [
        { id: 'a', text: 'Uno' },
        { id: 'b', text: 'Dos' },
      ],
      selectedOptionId: null,
      selectedOptionText: null,
      correctOptionId: 'b',
      correctOptionText: 'Dos',
      outcome: 'unanswered',
      isCorrect: false,
      isAnswered: false,
      language: 'es',
      contentIsFallback: false,
    },
  ],
};

const EXPLANATIONS = new Map<string, Explanation>([
  [
    '1',
    {
      questionId: '1',
      language: 'es',
      provenance: 'document-extract',
      providerId: 'local-bm25',
      notices: [],
      documentEvidence: {
        supportingCorrect: [
          {
            text: 'El Panel Frontal es la interfaz de usuario de un VI.',
            citation: {
              documentId: 'doc-1',
              documentName: 'LabVIEW_Core_1.pdf',
              pageNumber: 42,
              section: 'Lección 1',
            },
            score: 8.5,
            matchedTerms: ['panel', 'frontal'],
          },
        ],
        regardingSelected: [],
      },
    },
  ],
  [
    '2',
    {
      questionId: '2',
      language: 'es',
      provenance: 'question-bank',
      providerId: 'none',
      notices: ['explanations.notice.noSufficientEvidence', 'explanations.notice.bankOnly'],
      bankRationale: { text: 'El bucle While siempre ejecuta al menos una vez.', sourceLabel: 'Core 1 - Lección 6' },
    },
  ],
]);

describe('file names', () => {
  it('strips accents and unsafe characters', () => {
    expect(sanitizeFileName('Cuestionario CLAD — Core 1/2')).toBe('Cuestionario_CLAD_Core_1_2');
    expect(sanitizeFileName('///')).toBe('');
  });

  it('appends the date and extension', () => {
    expect(buildExportFileName('Electrical Safety Quiz', 'pdf', new Date('2026-08-17T12:00:00Z'))).toBe(
      'Electrical_Safety_Quiz_2026-08-17.pdf',
    );
  });

  it('falls back to a generic name when nothing survives sanitization', () => {
    expect(buildExportFileName('///', 'csv', new Date('2026-08-17T12:00:00Z'))).toBe('quiz_results_2026-08-17.csv');
  });
});

describe('scope filter', () => {
  it('selects all, incorrect only, or everything needing review', () => {
    expect(filterResultsByScope(RESULTS.results, 'all')).toHaveLength(3);
    expect(filterResultsByScope(RESULTS.results, 'incorrect').map((r) => r.questionId)).toEqual(['2']);
    expect(filterResultsByScope(RESULTS.results, 'review').map((r) => r.questionId)).toEqual(['2', '3']);
  });
});

describe('CSV export', () => {
  const csv = buildCsvExport(RESULTS, EXPLANATIONS);

  it('starts with a BOM and the expected header', () => {
    expect(csv.startsWith('﻿')).toBe(true);
    expect(csv.split('\r\n')[0]).toBe(
      '﻿Question ID,Position,Category,Difficulty,Question,Selected Answer,Correct Answer,Result,Explanation Type,Explanation,Source,Page,Section',
    );
  });

  it('quotes fields containing commas, quotes or newlines', () => {
    expect(escapeCsvField('a,b')).toBe('"a,b"');
    expect(escapeCsvField('say "hi"')).toBe('"say ""hi"""');
    expect(escapeCsvField('line\nbreak')).toBe('"line\nbreak"');
    expect(escapeCsvField(null)).toBe('');
    expect(csv).toContain('"Pregunta con ""comillas"", coma y\nsalto de línea"');
  });

  it('carries the real page number for a document-backed explanation', () => {
    const row = csv.split('\r\n').find((line) => line.startsWith('1,'))!;
    expect(row).toContain('LabVIEW_Core_1.pdf');
    expect(row).toContain('Lección 1');
    expect(row.endsWith('42,Lección 1')).toBe(true);
  });

  it('leaves the page column empty for a bank annotation', () => {
    const row = csv.split('\r\n').find((line) => line.startsWith('2,'))!;
    expect(row).toContain('Core 1 - Lección 6');
    // Declared reference in Source, nothing in Page or Section.
    expect(row.endsWith('Core 1 - Lección 6,,')).toBe(true);
  });

  it('marks an unanswered question rather than treating it as wrong', () => {
    const row = csv.split('\r\n').find((line) => line.startsWith('3,'))!;
    expect(row).toContain('Sin responder');
  });

  it('honours the scope', () => {
    const lines = buildCsvExport(RESULTS, EXPLANATIONS, 'incorrect').trim().split('\r\n');
    expect(lines).toHaveLength(2);
    expect(lines[1]!.startsWith('2,')).toBe(true);
  });
});

describe('JSON export', () => {
  const payload = buildJsonExport(RESULTS, EXPLANATIONS);

  it('mirrors the summary figures', () => {
    expect(payload).toMatchObject({ score: 33.3, total: 3, correct: 1, incorrect: 1, unanswered: 1 });
    expect(payload.questions).toHaveLength(3);
  });

  it('records the original question id and position separately', () => {
    expect(payload.questions[0]).toMatchObject({ questionId: '1', position: 1 });
  });

  it('preserves explanation provenance and citations', () => {
    const first = payload.questions[0] as Record<string, any>;
    expect(first.explanation.provenance).toBe('document-extract');
    expect(first.explanation.documentEvidence.supportingCorrect[0].citation.pageNumber).toBe(42);

    const second = payload.questions[1] as Record<string, any>;
    expect(second.explanation.provenance).toBe('question-bank');
    expect(second.explanation.documentEvidence).toBeNull();
    expect(second.explanation.notices).toContain('explanations.notice.noSufficientEvidence');
  });

  it('reports a missing explanation as null instead of fabricating one', () => {
    expect((payload.questions[2] as Record<string, unknown>).explanation).toBeNull();
  });

  it('serializes to valid JSON', () => {
    expect(() => JSON.parse(serializeJsonExport(payload))).not.toThrow();
  });

  it('honours the scope', () => {
    expect(buildJsonExport(RESULTS, EXPLANATIONS, 'review').questions).toHaveLength(2);
  });
});

describe('PDF export', () => {
  /** Inflate the page content streams so the rendered text can be asserted on. */
  async function extractPdfText(blob: Blob): Promise<string> {
    const { inflateSync } = await import('node:zlib');
    const buffer = Buffer.from(await blob.arrayBuffer());
    const chunks: string[] = [];

    let cursor = 0;
    for (;;) {
      const streamStart = buffer.indexOf('stream', cursor, 'latin1');
      if (streamStart === -1) break;
      const streamEnd = buffer.indexOf('endstream', streamStart, 'latin1');
      if (streamEnd === -1) break;

      let start = streamStart + 'stream'.length;
      if (buffer[start] === 0x0d) start += 1;
      if (buffer[start] === 0x0a) start += 1;

      try {
        chunks.push(inflateSync(buffer.subarray(start, streamEnd)).toString('latin1'));
      } catch {
        // Not a deflate stream (font maps, metadata) — skip it.
      }
      cursor = streamEnd + 'endstream'.length;
    }

    // Content streams write text as `(literal) Tj`; join the literals.
    return chunks
      .join('\n')
      .replace(/\\\(/g, '(')
      .replace(/\\\)/g, ')');
  }

  it('produces a valid PDF file', async () => {
    const blob = await buildPdfExport({ results: RESULTS, explanations: EXPLANATIONS });
    expect(blob.type).toContain('pdf');
    expect(blob.size).toBeGreaterThan(1000);
    const header = new TextDecoder('latin1').decode(await blob.slice(0, 8).arrayBuffer());
    expect(header.startsWith('%PDF-')).toBe(true);
  });

  it('renders the score, both answers and the document citation', async () => {
    const text = await extractPdfText(await buildPdfExport({ results: RESULTS, explanations: EXPLANATIONS }));

    expect(text).toContain('33.3%');
    expect(text).toContain('1 de 3 correctas');
    // Section headings for each outcome group.
    expect(text).toContain('CORRECTAS');
    expect(text).toContain('INCORRECTAS');
    expect(text).toContain('SIN RESPONDER');
    // The user's answer and the correct one, both present.
    expect(text).toContain('Bucle For');
    expect(text).toContain('Bucle While');
    // A real citation, with the real page number.
    expect(text).toContain('LabVIEW_Core_1.pdf');
    expect(text).toContain('42');
    // The bank annotation is labelled as a declared reference, not a page.
    expect(text).toContain('Core 1 - Lecci\u00f3n 6');
    // Typographic characters are transliterated, not silently dropped.
    expect(text).toContain('Cuestionario de Pr\u00e1ctica CLAD - Core 1 y 2');
  });

  it('exports only the incorrect answers when scoped', async () => {
    const text = await extractPdfText(
      await buildPdfExport({ results: RESULTS, explanations: EXPLANATIONS, scope: 'incorrect' }),
    );
    expect(text).toContain('INCORRECTAS');
    expect(text).not.toContain('SIN RESPONDER (');
    expect(text).not.toContain('Panel Frontal');
  });
});
