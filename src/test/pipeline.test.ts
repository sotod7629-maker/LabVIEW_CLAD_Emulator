/**
 * End-to-end pipeline test:
 *   JSON → quiz → answers → evaluation → PDF-based explanations → results → export
 *
 * Runs against the real bundled question bank and a synthetic reference
 * document, so it exercises the same code paths the browser does (minus the
 * pdf.js text extraction, which is stubbed with an already-extracted document).
 */
import { describe, expect, it } from 'vitest';
import { parseQuestionBankFromText } from '../data/questionParser';
import { validateQuestionData } from '../data/validation';
import { generateQuiz, selectAnswer } from '../quiz/generateQuiz';
import { buildQuizResults } from '../quiz/scoring';
import { DocumentIndex } from '../documents/documentIndex';
import type { ReferenceDocument } from '../documents/types';
import { ExplanationService } from '../explanations/explanationService';
import { LocalDocumentProvider } from '../explanations/localDocumentProvider';
import { RemoteRagProvider } from '../explanations/remoteRagProvider';
import type { ExplanationRequest } from '../explanations/types';
import { buildCsvExport } from '../export/exportCSV';
import { buildJsonExport } from '../export/exportJSON';
import { buildPdfExport } from '../export/exportPDF';
import { readBundledBankText } from './fixtures';
import type { QuizConfig } from '../quiz/types';

const REFERENCE: ReferenceDocument = {
  id: 'doc-core1',
  name: 'LabVIEW_Core_1.pdf',
  pageCount: 3,
  pages: [
    {
      pageNumber: 12,
      text: `Lección 1: El entorno de LabVIEW
El Panel Frontal es la interfaz de usuario de un VI y contiene los controles e indicadores con los que
interactúa el usuario final. Los controles actúan como entradas y los indicadores como salidas.
El Diagrama de Bloques contiene el código gráfico, formado por terminales, nodos y cables.`,
    },
    {
      pageNumber: 37,
      text: `Lección 6: Bucles y estructuras de repetición
El bucle While evalúa su terminal condicional al final de cada iteración, de modo que su contenido se
ejecuta siempre al menos una vez. El bucle For ejecuta el número de iteraciones fijado por la terminal
de conteo N y puede no ejecutarse si N vale cero. Los registros de desplazamiento transfieren el valor
de una iteración a la siguiente.`,
    },
    {
      pageNumber: 58,
      text: `Lección 8: Depuración de VIs
La herramienta de resaltado de ejecución muestra el flujo de datos animando los cables del diagrama.
Los puntos de interrupción detienen la ejecución y las sondas muestran el valor que circula por un cable.`,
    },
  ],
  extractedCharacters: 900,
  sizeBytes: 4096,
  addedAt: new Date().toISOString(),
};

const CONFIG: QuizConfig = {
  uiLanguage: 'es',
  contentLanguage: 'es',
  questionCount: 30,
  categories: [],
  difficulties: [],
  mode: 'quiz',
  shuffleQuestions: true,
  shuffleOptions: true,
};

describe('full pipeline', () => {
  it('runs from the bundled JSON all the way to three exported formats', async () => {
    // 1 — Load and validate the bank.
    const bank = parseQuestionBankFromText(readBundledBankText());
    const report = validateQuestionData(bank);
    expect(report.valid).toBe(true);
    expect(report.usableQuestions).toHaveLength(300);

    // 2 — Generate a quiz.
    let session = generateQuiz({
      questions: report.usableQuestions,
      config: CONFIG,
      seed: 20260817,
    });
    session.bankTitle = bank.metadata.title!;
    expect(session.items).toHaveLength(30);

    // 3 — Answer: 20 correct, 7 wrong, 3 skipped.
    session.items.forEach((item, index) => {
      if (index >= 27) return;
      const correctId = item.question.correctOptionId;
      const optionId =
        index < 20 ? correctId : item.displayOptions.find((option) => option.id !== correctId)!.id;
      session = selectAnswer(session, item.questionId, optionId);
    });

    // 4 — Evaluate.
    const results = buildQuizResults(session, bank.metadata.primaryContentLanguage);
    expect(results.summary).toEqual({
      total: 30,
      correct: 20,
      incorrect: 7,
      unanswered: 3,
      percentage: 66.7,
    });

    // 5 — Explanations grounded in the reference document.
    const index = DocumentIndex.build([REFERENCE]);
    expect(index.chunkCount).toBeGreaterThan(0);

    const service = new ExplanationService({
      // The remote provider is unavailable (no endpoint), so retrieval falls
      // through to the local index — exactly as it does in the deployed app.
      providers: [new RemoteRagProvider(), new LocalDocumentProvider(index)],
      corpusFingerprint: REFERENCE.id,
    });

    const requests: ExplanationRequest[] = results.results.map((result) => ({
      questionId: result.questionId,
      language: result.language,
      questionText: result.questionText,
      correctOptionText: result.correctOptionText,
      selectedOptionText: result.selectedOptionText,
      isCorrect: result.isCorrect,
      category: result.category,
      bankExplanation: result.bankExplanation,
      bankSourceLabel: result.bankSourceLabel,
    }));

    const progress: number[] = [];
    const explanations = await service.explainAll(requests, (done) => progress.push(done));
    expect(explanations.size).toBe(30);
    expect(progress.at(-1)).toBe(30);

    // Every explanation is either document-backed, bank-only, or explicitly
    // "nothing found" — never a fabricated claim of documentary support.
    for (const explanation of explanations.values()) {
      if (explanation.provenance === 'document-extract') {
        const passages = [
          ...explanation.documentEvidence!.supportingCorrect,
          ...explanation.documentEvidence!.regardingSelected,
        ];
        expect(passages.length).toBeGreaterThan(0);
        for (const passage of passages) {
          // Citation points at a page that really exists in the document…
          const page = REFERENCE.pages.find((entry) => entry.pageNumber === passage.citation.pageNumber);
          expect(page, `page ${passage.citation.pageNumber} must exist`).toBeDefined();
          // …and the quoted text is verbatim from that page.
          // Each quoted fragment must appear verbatim; `[…]` marks an elision.
          const flatten = (text: string) => text.replace(/\s+/g, ' ').trim();
          for (const fragment of passage.text.split('[\u2026]')) {
            expect(flatten(page!.text)).toContain(flatten(fragment));
          }
        }
      } else {
        expect(explanation.documentEvidence).toBeUndefined();
        expect(explanation.notices.length).toBeGreaterThan(0);
      }
    }

    // The corpus only covers a few lessons, so most questions must honestly
    // report that no supporting passage was found.
    const documentBacked = [...explanations.values()].filter(
      (explanation) => explanation.provenance === 'document-extract',
    );
    expect(documentBacked.length).toBeGreaterThan(0);
    expect(documentBacked.length).toBeLessThan(30);

    // 6 — Exports.
    const json = buildJsonExport(results, explanations);
    expect(json.total).toBe(30);
    expect(json.correct).toBe(20);
    expect(json.unanswered).toBe(3);
    expect(json.questions).toHaveLength(30);
    expect(new Set(json.questions.map((question) => question.questionId)).size).toBe(30);

    const csv = buildCsvExport(results, explanations);
    // Header plus one row per question (embedded newlines stay inside quotes).
    expect(csv.split('\r\n').filter((line) => /^\d+,/.test(line))).toHaveLength(30);

    const incorrectOnly = buildCsvExport(results, explanations, 'incorrect');
    expect(incorrectOnly.split('\r\n').filter((line) => /^\d+,/.test(line))).toHaveLength(7);

    const pdf = await buildPdfExport({ results, explanations });
    expect(pdf.size).toBeGreaterThan(5000);
  });

  it('handles a 100-question run without losing any answer', async () => {
    const bank = parseQuestionBankFromText(readBundledBankText());
    let session = generateQuiz({
      questions: bank.questions,
      config: { ...CONFIG, questionCount: 100 },
      seed: 7,
    });

    for (const item of session.items) {
      session = selectAnswer(session, item.questionId, item.question.correctOptionId);
    }

    const results = buildQuizResults(session, 'es');
    expect(results.summary.correct).toBe(100);
    expect(results.summary.percentage).toBe(100);
    expect(Object.keys(session.answers)).toHaveLength(100);
  });

  it('degrades honestly with no reference documents at all', async () => {
    const bank = parseQuestionBankFromText(readBundledBankText());
    const session = generateQuiz({
      questions: bank.questions,
      config: { ...CONFIG, questionCount: 5 },
      seed: 3,
    });
    const results = buildQuizResults(session, 'es');

    const service = new ExplanationService({
      providers: [new RemoteRagProvider(), new LocalDocumentProvider(DocumentIndex.build([]))],
      corpusFingerprint: 'no-documents',
    });

    const explanations = await service.explainAll(
      results.results.map((result) => ({
        questionId: result.questionId,
        language: result.language,
        questionText: result.questionText,
        correctOptionText: result.correctOptionText,
        selectedOptionText: result.selectedOptionText,
        isCorrect: result.isCorrect,
        bankExplanation: result.bankExplanation,
        bankSourceLabel: result.bankSourceLabel,
      })),
    );

    for (const explanation of explanations.values()) {
      expect(explanation.provenance).toBe('question-bank');
      expect(explanation.notices).toContain('explanations.notice.noDocumentsLoaded');
      expect(explanation.documentEvidence).toBeUndefined();
    }
  });
});
