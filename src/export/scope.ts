/** Selects which results an export covers. */
import type { QuestionResult } from '../quiz/types';

export type ExportScope = 'all' | 'incorrect' | 'review';

export function filterResultsByScope(results: readonly QuestionResult[], scope: ExportScope): QuestionResult[] {
  switch (scope) {
    case 'incorrect':
      return results.filter((result) => result.outcome === 'incorrect');
    case 'review':
      return results.filter((result) => result.outcome !== 'correct');
    case 'all':
    default:
      return [...results];
  }
}
