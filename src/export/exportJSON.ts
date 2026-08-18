/**
 * Structured JSON export.
 *
 * The payload is the internal result model, flattened: it round-trips every
 * field the results screen shows, including explanation provenance and
 * citations, so an export can be audited without the app.
 */
import type { QuizResults } from '../quiz/types';
import type { Explanation } from '../explanations/types';
import { filterResultsByScope, type ExportScope } from './scope';

export interface JsonExportPayload {
  generatedAt: string;
  quiz: {
    title: string;
    sessionId: string;
    language: string;
    startedAt: string;
    completedAt: string;
    durationSeconds: number;
    scope: ExportScope;
  };
  score: number;
  total: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  questions: Array<Record<string, unknown>>;
}

export function buildJsonExport(
  results: QuizResults,
  explanations: ReadonlyMap<string, Explanation>,
  scope: ExportScope = 'all',
): JsonExportPayload {
  const scoped = filterResultsByScope(results.results, scope);

  return {
    generatedAt: new Date().toISOString(),
    quiz: {
      title: results.quizTitle,
      sessionId: results.sessionId,
      language: results.language,
      startedAt: results.startedAt,
      completedAt: results.completedAt,
      durationSeconds: results.durationSeconds,
      scope,
    },
    score: results.summary.percentage,
    total: results.summary.total,
    correct: results.summary.correct,
    incorrect: results.summary.incorrect,
    unanswered: results.summary.unanswered,
    questions: scoped.map((result) => {
      const explanation = explanations.get(result.questionId);
      return {
        questionId: result.questionId,
        position: result.displayIndex + 1,
        category: result.category ?? null,
        difficulty: result.difficulty ?? null,
        question: result.questionText,
        options: result.options,
        selectedOptionId: result.selectedOptionId,
        selectedAnswer: result.selectedOptionText,
        correctOptionId: result.correctOptionId,
        correctAnswer: result.correctOptionText,
        outcome: result.outcome,
        isCorrect: result.isCorrect,
        isAnswered: result.isAnswered,
        language: result.language,
        contentIsFallback: result.contentIsFallback,
        explanation: explanation
          ? {
              provenance: explanation.provenance,
              providerId: explanation.providerId,
              notices: explanation.notices,
              bankRationale: explanation.bankRationale ?? null,
              documentEvidence: explanation.documentEvidence ?? null,
            }
          : null,
      };
    }),
  };
}

export function serializeJsonExport(payload: JsonExportPayload): string {
  return JSON.stringify(payload, null, 2);
}
