/**
 * Deterministic evaluation.
 *
 * Unanswered questions are counted separately from incorrect ones: they earn no
 * points, but the distinction is preserved everywhere (summary, review, export)
 * because "didn't answer" and "answered wrong" mean different things to someone
 * studying.
 */
import { resolveText, type ContentLanguage } from '../data/types';
import type { QuestionResult, QuizResults, QuizSession, ScoreSummary } from './types';

/** Round to one decimal without floating-point drift (21/25 → 84, not 83.99999). */
function roundPercentage(value: number): number {
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
    percentage: total === 0 ? 0 : roundPercentage((correct / total) * 100),
  };
}

/**
 * Build the per-question result records from a finished session.
 * Pure: same session in, same results out — no clock, no randomness.
 */
export function generateResults(session: QuizSession, primaryContentLanguage: ContentLanguage): QuestionResult[] {
  const requested = session.config.contentLanguage;

  return session.items.map((item) => {
    const { question } = item;
    const promptText = resolveText(question.prompt, requested, primaryContentLanguage);
    const selectedOptionId = session.answers[question.id] ?? null;

    const options = item.displayOptions.map((option) => ({
      id: option.id,
      text: resolveText(option.text, requested, primaryContentLanguage).text,
    }));

    const correctOption = question.options.find((option) => option.id === question.correctOptionId);
    const selectedOption = selectedOptionId
      ? question.options.find((option) => option.id === selectedOptionId)
      : undefined;

    const isAnswered = selectedOptionId !== null;
    const isCorrect = isAnswered && selectedOptionId === question.correctOptionId;
    const bankExplanation = resolveText(question.bankExplanation, requested, primaryContentLanguage);

    return {
      questionId: question.id,
      displayIndex: item.displayIndex,
      category: question.category,
      difficulty: question.difficulty,
      questionText: promptText.text,
      options,
      selectedOptionId,
      selectedOptionText: selectedOption
        ? resolveText(selectedOption.text, requested, primaryContentLanguage).text
        : null,
      correctOptionId: question.correctOptionId,
      correctOptionText: correctOption ? resolveText(correctOption.text, requested, primaryContentLanguage).text : '',
      outcome: !isAnswered ? 'unanswered' : isCorrect ? 'correct' : 'incorrect',
      isCorrect,
      isAnswered,
      language: session.config.uiLanguage,
      contentIsFallback: promptText.isFallback,
      bankExplanation: bankExplanation.text || undefined,
      bankSourceLabel: question.bankSourceLabel,
    };
  });
}

/** Assemble the full results document (summary + per-question records). */
export function buildQuizResults(
  session: QuizSession,
  primaryContentLanguage: ContentLanguage,
  completedAt: Date = new Date(),
): QuizResults {
  const results = generateResults(session, primaryContentLanguage);
  const startedAt = new Date(session.startedAt);
  const durationSeconds = Math.max(0, Math.round((completedAt.getTime() - startedAt.getTime()) / 1000));

  return {
    sessionId: session.id,
    quizTitle: session.bankTitle ?? 'Quiz',
    language: session.config.uiLanguage,
    startedAt: session.startedAt,
    completedAt: completedAt.toISOString(),
    durationSeconds,
    summary: calculateScore(results),
    results,
  };
}
