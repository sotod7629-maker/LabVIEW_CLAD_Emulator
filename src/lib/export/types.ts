/**
 * Shared export contract.
 *
 * An export bundles the graded results with whatever documentary evidence was
 * retrieved, so an exported file is self-contained and independently checkable.
 */

import type { Explanation } from '../explain/types';
import type { QuizResults } from '../quiz/types';
import type { Translator } from '../i18n';

export interface ExportPayload {
  results: QuizResults;
  explanations: Map<number, Explanation>;
  quizName: string;
  t: Translator;
}

export type ExportScope = 'all' | 'incorrect';

/** Apply the requested scope, preserving every other field. */
export function scopeResults(payload: ExportPayload, scope: ExportScope): QuizResults {
  if (scope === 'all') return payload.results;
  return {
    ...payload.results,
    // The summary intentionally still describes the WHOLE attempt: a filtered
    // export must not misrepresent the score it was taken from.
    results: payload.results.results.filter((r) => !r.isCorrect),
  };
}
