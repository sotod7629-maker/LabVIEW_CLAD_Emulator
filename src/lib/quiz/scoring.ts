/**
 * Evaluation and result construction (§13, §39, §40).
 *
 * Scoring is deterministic and depends only on the session: the same session
 * always yields the same score. Unanswered questions are counted separately
 * from incorrect ones and that distinction is preserved all the way through
 * the results screen and every export format.
 */

import type { QuestionResult, QuizResults, QuizSession, ScoreSummary } from './types';

/** Round to one decimal without binary float artefacts (0.1 + 0.2 style). */
function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

export function calculateScore(results: readonly QuestionResult[]): ScoreSummary {
  const total = results.length;
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  for (const result of results) {
    if (!result.isAnswered) unanswered += 1;
    else if (result.isCorrect) correct += 1;
    else incorrect += 1;
  }

  return {
    total,
    correct,
    incorrect,
    unanswered,
    percentage: total === 0 ? 0 : roundToOneDecimal((correct / total) * 100),
  };
}

export function generateResults(session: QuizSession): QuizResults {
  const finishedAt = session.finishedAt ?? new Date().toISOString();

  const results = session.questions.map<QuestionResult>((question) => {
    const selectedOptionId = session.answers[question.questionId] ?? null;
    const isAnswered = selectedOptionId !== null;
    const selected = question.options.find((o) => o.id === selectedOptionId) ?? null;
    const correct = question.options.find((o) => o.id === question.correctOptionId);

    return {
      questionId: question.questionId,
      position: question.position,
      question: question.prompt,
      options: question.options,
      selectedOptionId,
      selectedAnswerText: selected?.text ?? null,
      correctOptionId: question.correctOptionId,
      // The bank guarantees correct_answer indexes a real option; validation
      // enforced it on load. Fall back defensively rather than throwing here.
      correctAnswerText: correct?.text ?? '',
      isAnswered,
      // Comparison is by permanent option id, never by displayed position.
      isCorrect: isAnswered && selectedOptionId === question.correctOptionId,
      category: question.category,
      difficulty: question.difficulty,
      bankExplanation: question.bankExplanation,
      bankSource: question.bankSource,
      language: session.config.language,
    };
  });

  const started = Date.parse(session.startedAt);
  const ended = Date.parse(finishedAt);

  return {
    sessionId: session.id,
    config: session.config,
    summary: calculateScore(results),
    results,
    startedAt: session.startedAt,
    finishedAt,
    durationSeconds:
      Number.isFinite(started) && Number.isFinite(ended)
        ? Math.max(0, Math.round((ended - started) / 1000))
        : 0,
  };
}
