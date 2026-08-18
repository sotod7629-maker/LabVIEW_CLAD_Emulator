/**
 * Structured JSON export (§22).
 *
 * The emitted document is the canonical machine-readable record: it carries the
 * score, every question outcome, and the documentary evidence with its
 * citations, so a third party can verify the grading and the sources.
 */

import { buildFilename, downloadBlob } from './filename';
import { scopeResults, type ExportPayload, type ExportScope } from './types';

export interface ExportedQuestion {
  questionId: number;
  position: number;
  category: string;
  difficulty: string;
  question: string;
  options: { id: string; text: string }[];
  selectedOptionId: string | null;
  selectedAnswer: string | null;
  correctOptionId: string;
  correctAnswer: string;
  isAnswered: boolean;
  isCorrect: boolean;
  bankExplanation: string;
  bankSource: string;
  documentation: {
    status: string;
    passages: {
      excerpt: string;
      document: string;
      sourceFile: string;
      page: string | null;
      lesson: number | null;
      lessonTitle: string | null;
      section: string | null;
      language: string;
      relevance: number;
    }[];
  };
}

export interface ExportedResults {
  quiz: string;
  exportedAt: string;
  language: string;
  mode: string;
  scope: ExportScope;
  score: number;
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  startedAt: string;
  finishedAt: string;
  durationSeconds: number;
  questions: ExportedQuestion[];
}

export function buildJSONExport(payload: ExportPayload, scope: ExportScope): ExportedResults {
  const results = scopeResults(payload, scope);
  const { summary } = payload.results;

  return {
    quiz: payload.quizName,
    exportedAt: new Date().toISOString(),
    language: payload.results.config.language,
    mode: payload.results.config.mode,
    scope,
    score: summary.percentage,
    total: summary.total,
    correct: summary.correct,
    incorrect: summary.incorrect,
    unanswered: summary.unanswered,
    startedAt: payload.results.startedAt,
    finishedAt: payload.results.finishedAt,
    durationSeconds: payload.results.durationSeconds,
    questions: results.results.map((result) => {
      const explanation = payload.explanations.get(result.questionId);
      return {
        questionId: result.questionId,
        position: result.position,
        category: result.category,
        difficulty: result.difficulty,
        question: result.question,
        options: result.options.map((o) => ({ id: o.id, text: o.text })),
        selectedOptionId: result.selectedOptionId,
        selectedAnswer: result.selectedAnswerText,
        correctOptionId: result.correctOptionId,
        correctAnswer: result.correctAnswerText,
        isAnswered: result.isAnswered,
        isCorrect: result.isCorrect,
        bankExplanation: result.bankExplanation,
        bankSource: result.bankSource,
        documentation: {
          status: explanation?.status ?? 'unavailable',
          passages: (explanation?.passages ?? []).map((p) => ({
            excerpt: p.excerpt,
            document: p.citation.documentTitle,
            sourceFile: p.citation.sourceFile,
            page: p.citation.page,
            lesson: p.citation.lesson,
            lessonTitle: p.citation.lessonTitle,
            section: p.citation.section,
            language: p.citation.language,
            relevance: p.relevance,
          })),
        },
      };
    }),
  };
}

export function exportJSON(payload: ExportPayload, scope: ExportScope): void {
  const data = buildJSONExport(payload, scope);
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json;charset=utf-8',
  });
  downloadBlob(
    blob,
    buildFilename({
      quizName: payload.quizName,
      extension: 'json',
      suffix: scope === 'incorrect' ? 'incorrect' : undefined,
    }),
  );
}
