import { describe, expect, it } from 'vitest';
import { buildCSVExport, escapeCsvField } from './exportCSV';
import { buildJSONExport } from './exportJSON';
import { buildFilename, sanitizeFilename } from './filename';
import { scopeResults, type ExportPayload } from './types';
import { generateQuiz, selectAnswer } from '../quiz/generateQuiz';
import { generateResults } from '../quiz/scoring';
import { createTranslator } from '../i18n';
import type { Explanation } from '../explain/types';
import { makeBank } from '../test-support/factories';

function buildPayload(): ExportPayload {
  const bank = makeBank(6);
  let session = generateQuiz({
    questions: bank.questions,
    config: {
      language: 'es',
      questionCount: 6,
      mode: 'exam',
      categories: [],
      shuffleQuestions: false,
      shuffleOptions: true,
      seed: 11,
    },
  }).session;

  // 2 correct, 2 wrong, 2 unanswered.
  session.questions.slice(0, 2).forEach((q) => {
    session = selectAnswer(session, q.questionId, q.correctOptionId);
  });
  session.questions.slice(2, 4).forEach((q) => {
    const wrong = q.options.find((o) => o.id !== q.correctOptionId)!;
    session = selectAnswer(session, q.questionId, wrong.id);
  });

  const results = generateResults(session);
  const explanations = new Map<number, Explanation>();
  explanations.set(session.questions[0]!.questionId, {
    questionId: session.questions[0]!.questionId,
    language: 'es',
    status: 'documented',
    provider: 'local-retrieval',
    passages: [
      {
        excerpt: 'Shift registers transfer values from one loop iteration to the next.',
        relevance: 0.81,
        matchedTerms: ['shift', 'register'],
        citation: {
          documentId: 'core1',
          documentTitle: 'LabVIEW Core 1',
          sourceFile: 'LVcore1_participantguide_English.md',
          page: '7-32',
          lesson: 7,
          lessonTitle: 'Executing Code Repeatedly Using Loops',
          section: 'Introduction to Shift Registers',
          language: 'en',
        },
      },
    ],
  });
  explanations.set(session.questions[2]!.questionId, {
    questionId: session.questions[2]!.questionId,
    language: 'es',
    status: 'insufficient',
    reasonCode: 'below-threshold',
    provider: 'local-retrieval',
    passages: [],
  });

  return { results, explanations, quizName: 'Test Quiz', t: createTranslator('es') };
}

describe('sanitizeFilename', () => {
  it.each([
    ['Cuestionario de Práctica CLAD', 'Cuestionario_de_Practica_CLAD'],
    ['a/b\\c:d*e?f"g<h>i|j', 'a_b_c_d_e_f_g_h_i_j'],
    ['   ...trimmed...   ', 'trimmed'],
    ['', ''],
  ])('sanitizes %s', (input, expected) => {
    expect(sanitizeFilename(input)).toBe(expected);
  });

  it('caps the length', () => {
    expect(sanitizeFilename('x'.repeat(200))).toHaveLength(80);
  });
});

describe('buildFilename', () => {
  it('includes the date and extension', () => {
    expect(
      buildFilename({
        quizName: 'Electrical Safety Quiz',
        extension: 'pdf',
        date: new Date('2026-08-17T10:00:00Z'),
      }),
    ).toBe('Electrical_Safety_Quiz_2026-08-17.pdf');
  });

  it('marks an incorrect-only export', () => {
    expect(
      buildFilename({
        quizName: 'Quiz',
        extension: 'csv',
        suffix: 'incorrect',
        date: new Date('2026-08-17T00:00:00Z'),
      }),
    ).toBe('Quiz_incorrect_2026-08-17.csv');
  });

  it('falls back when the name sanitizes to nothing', () => {
    expect(
      buildFilename({ quizName: '///', extension: 'json', date: new Date('2026-01-02T00:00:00Z') }),
    ).toBe('quiz_results_2026-01-02.json');
  });
});

describe('scopeResults', () => {
  it('keeps the summary of the whole attempt when filtering to incorrect', () => {
    const payload = buildPayload();
    const scoped = scopeResults(payload, 'incorrect');
    expect(scoped.results.every((r) => !r.isCorrect)).toBe(true);
    // Summary still describes the full attempt, not the filtered subset.
    expect(scoped.summary.total).toBe(6);
    expect(scoped.summary.correct).toBe(2);
  });
});

describe('JSON export', () => {
  it('carries the score, every question and its citations', () => {
    const payload = buildPayload();
    const data = buildJSONExport(payload, 'all');

    expect(data).toMatchObject({
      quiz: 'Test Quiz',
      total: 6,
      correct: 2,
      incorrect: 2,
      unanswered: 2,
      scope: 'all',
      language: 'es',
    });
    expect(data.questions).toHaveLength(6);

    const documented = data.questions.find((q) => q.documentation.status === 'documented')!;
    expect(documented.documentation.passages[0]).toMatchObject({
      document: 'LabVIEW Core 1',
      page: '7-32',
      lesson: 7,
      section: 'Introduction to Shift Registers',
    });

    const insufficient = data.questions.find((q) => q.documentation.status === 'insufficient')!;
    expect(insufficient.documentation.passages).toEqual([]);
  });

  it('records the selected and correct option ids consistently', () => {
    const data = buildJSONExport(buildPayload(), 'all');
    for (const question of data.questions) {
      if (question.isCorrect) {
        expect(question.selectedOptionId).toBe(question.correctOptionId);
      } else if (question.isAnswered) {
        expect(question.selectedOptionId).not.toBe(question.correctOptionId);
      } else {
        expect(question.selectedOptionId).toBeNull();
      }
    }
  });

  it('exports only incorrect answers when scoped', () => {
    const data = buildJSONExport(buildPayload(), 'incorrect');
    expect(data.questions.every((q) => !q.isCorrect)).toBe(true);
    expect(data.questions).toHaveLength(4);
    // The headline score still reports the whole attempt.
    expect(data.correct).toBe(2);
  });
});

describe('CSV export', () => {
  it('emits a header plus one row per question', () => {
    const csv = buildCSVExport(buildPayload(), 'all');
    const lines = csv.split('\r\n');
    expect(lines).toHaveLength(7);
    expect(lines[0]).toContain('"Question ID"');
    expect(lines[0]).toContain('"Page"');
  });

  it('quotes and escapes embedded quotes', () => {
    expect(escapeCsvField('He said "hi"')).toBe('"He said ""hi"""');
    expect(escapeCsvField(null)).toBe('""');
    expect(escapeCsvField(12)).toBe('"12"');
  });

  it('neutralises spreadsheet formula injection', () => {
    // A leading =, +, - or @ would otherwise be evaluated by Excel/Sheets.
    expect(escapeCsvField('=SUM(A1:A9)')).toBe(`"'=SUM(A1:A9)"`);
    expect(escapeCsvField('+1')).toBe(`"'+1"`);
    expect(escapeCsvField('-2')).toBe(`"'-2"`);
    expect(escapeCsvField('@cmd')).toBe(`"'@cmd"`);
  });

  it('includes the citation page for documented questions', () => {
    const csv = buildCSVExport(buildPayload(), 'all');
    expect(csv).toContain('"7-32"');
    expect(csv).toContain('"LabVIEW Core 1"');
  });
});
