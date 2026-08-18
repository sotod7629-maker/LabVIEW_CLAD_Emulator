/**
 * Orchestrates explanation building and caches the result.
 *
 * Order of operations for one question:
 *   1. ask the configured providers for documentary evidence (first one that
 *      returns something wins);
 *   2. attach the question bank's own rationale, always labelled as such;
 *   3. if neither yielded anything, emit an explicit "nothing found" notice.
 *
 * Cache key is `questionId + language + providerFingerprint`, so adding or
 * removing a document invalidates only what it should.
 */
import type { UiLanguage } from '../data/types';
import type {
  Explanation,
  ExplanationNoticeKey,
  ExplanationProvider,
  ExplanationRequest,
} from './types';

export interface ExplanationServiceOptions {
  providers: ExplanationProvider[];
  /** Changes whenever the document set changes; part of the cache key. */
  corpusFingerprint: string;
}

export class ExplanationService {
  private readonly providers: ExplanationProvider[];
  private readonly corpusFingerprint: string;
  private readonly cache = new Map<string, Explanation>();

  constructor(options: ExplanationServiceOptions) {
    this.providers = options.providers;
    this.corpusFingerprint = options.corpusFingerprint;
  }

  get hasDocumentProvider(): boolean {
    return this.providers.some((provider) => provider.isAvailable());
  }

  private cacheKey(questionId: string, language: UiLanguage): string {
    return `${questionId}::${language}::${this.corpusFingerprint}`;
  }

  async explain(request: ExplanationRequest): Promise<Explanation> {
    const key = this.cacheKey(request.questionId, request.language);
    const cached = this.cache.get(key);
    if (cached) return cached;

    const notices: ExplanationNoticeKey[] = [];
    const available = this.providers.filter((provider) => provider.isAvailable());

    let evidence = null;
    let providerId = 'none';
    for (const provider of available) {
      evidence = await provider.findEvidence(request);
      if (evidence) {
        providerId = provider.id;
        break;
      }
    }

    if (available.length === 0) {
      notices.push('explanations.notice.noDocumentsLoaded');
    } else if (!evidence) {
      notices.push('explanations.notice.noSufficientEvidence');
    }

    const bankRationale = request.bankExplanation
      ? { text: request.bankExplanation, sourceLabel: request.bankSourceLabel }
      : undefined;

    if (!evidence && bankRationale) notices.push('explanations.notice.bankOnly');

    const explanation: Explanation = {
      questionId: request.questionId,
      language: request.language,
      provenance: evidence ? 'document-extract' : bankRationale ? 'question-bank' : 'none',
      documentEvidence: evidence ?? undefined,
      bankRationale,
      notices,
      providerId,
    };

    this.cache.set(key, explanation);
    return explanation;
  }

  /**
   * Explain a batch, reporting progress so the UI can show real progress rather
   * than an indefinite spinner. Yields to the event loop between questions to
   * keep a 100-question run responsive.
   */
  async explainAll(
    requests: readonly ExplanationRequest[],
    onProgress?: (completed: number, total: number) => void,
  ): Promise<Map<string, Explanation>> {
    const explanations = new Map<string, Explanation>();
    for (let index = 0; index < requests.length; index += 1) {
      const request = requests[index]!;
      explanations.set(request.questionId, await this.explain(request));
      onProgress?.(index + 1, requests.length);
      if (index % 5 === 4) await new Promise((resolve) => setTimeout(resolve, 0));
    }
    return explanations;
  }

  clearCache(): void {
    this.cache.clear();
  }
}
