/**
 * Explanation orchestration: provider selection, caching and batching (§20, §47).
 *
 * Caching is keyed by `questionId + language` exactly as §20 prescribes, so
 * re-opening a result never re-runs retrieval. Batch generation reports
 * progress so the results screen can show real progress rather than freezing.
 */

import type { Language } from '../quiz/types';
import type { Explanation, ExplanationProvider, ExplanationRequest } from './types';

export type ExplanationCacheKey = `${number}:${Language}`;

export function cacheKey(questionId: number, language: Language): ExplanationCacheKey {
  return `${questionId}:${language}`;
}

export interface BatchProgress {
  completed: number;
  total: number;
}

export interface ExplanationService {
  explain(request: ExplanationRequest): Promise<Explanation>;
  explainAll(
    requests: readonly ExplanationRequest[],
    onProgress?: (progress: BatchProgress) => void,
    signal?: AbortSignal,
  ): Promise<Map<number, Explanation>>;
  getCached(questionId: number, language: Language): Explanation | undefined;
  clear(): void;
}

export interface ExplanationServiceOptions {
  /**
   * Providers in priority order. The first available one wins; if it returns
   * no documented evidence, the next is tried. This is what lets an optional
   * backend take over transparently once deployed.
   */
  providers: readonly ExplanationProvider[];
  /** Concurrency cap for batch generation. */
  concurrency?: number;
}

export function createExplanationService(
  options: ExplanationServiceOptions,
): ExplanationService {
  const cache = new Map<ExplanationCacheKey, Explanation>();
  const inFlight = new Map<ExplanationCacheKey, Promise<Explanation>>();
  const concurrency = Math.max(1, options.concurrency ?? 4);

  let availability: Promise<ExplanationProvider[]> | null = null;
  const resolveProviders = () => {
    availability ??= (async () => {
      const checks = await Promise.all(
        options.providers.map(async (p) => ((await p.isAvailable()) ? p : null)),
      );
      return checks.filter((p): p is ExplanationProvider => p !== null);
    })();
    return availability;
  };

  async function runProviders(request: ExplanationRequest): Promise<Explanation> {
    const providers = await resolveProviders();
    if (providers.length === 0) {
      return {
        questionId: request.questionId,
        language: request.language,
        status: 'unavailable',
        passages: [],
        reasonCode: 'index-unavailable',
        provider: 'none',
      };
    }

    let last: Explanation | null = null;
    for (const provider of providers) {
      const result = await provider.explain(request);
      if (result.status === 'documented') return result;
      last = result;
    }
    return last!;
  }

  async function explain(request: ExplanationRequest): Promise<Explanation> {
    const key = cacheKey(request.questionId, request.language);
    const cached = cache.get(key);
    if (cached) return cached;

    const pending = inFlight.get(key);
    if (pending) return pending;

    const promise = runProviders(request)
      .then((result) => {
        // Transient failures are not cached: a later retry should be able to
        // succeed once the index or the network recovers.
        if (result.status !== 'error' && result.status !== 'unavailable') {
          cache.set(key, result);
        }
        return result;
      })
      .finally(() => inFlight.delete(key));

    inFlight.set(key, promise);
    return promise;
  }

  async function explainAll(
    requests: readonly ExplanationRequest[],
    onProgress?: (progress: BatchProgress) => void,
    signal?: AbortSignal,
  ): Promise<Map<number, Explanation>> {
    const results = new Map<number, Explanation>();
    const total = requests.length;
    let completed = 0;
    let cursor = 0;

    onProgress?.({ completed: 0, total });

    const worker = async () => {
      while (cursor < requests.length) {
        if (signal?.aborted) return;
        const request = requests[cursor++]!;
        const explanation = await explain({ ...request, signal });
        results.set(request.questionId, explanation);
        completed += 1;
        onProgress?.({ completed, total });
      }
    };

    await Promise.all(
      Array.from({ length: Math.min(concurrency, requests.length) }, () => worker()),
    );
    return results;
  }

  return {
    explain,
    explainAll,
    getCached: (questionId, language) => cache.get(cacheKey(questionId, language)),
    clear: () => {
      cache.clear();
      availability = null;
    },
  };
}
