/**
 * Client for an OPTIONAL backend RAG service (§48, §49).
 *
 * STATUS: NOT DEPLOYED.
 *
 * This application is frontend-only. No such service exists today, and this
 * provider is disabled unless `VITE_EXPLANATION_API` is configured. It is
 * included so the capability boundary is explicit rather than hidden: the
 * narrative half of an explanation ("why is this correct?") needs a language
 * model, which the browser cannot supply, and this is exactly where that
 * integration attaches.
 *
 * The expected contract is documented in `docs/BACKEND.md`. The provider never
 * fabricates: if the endpoint is absent, unreachable, or answers without
 * citations, it reports 'unavailable' / 'error' and the UI falls back to the
 * local retrieval provider's verbatim evidence.
 */

import type {
  DocumentCitation,
  EvidencePassage,
  Explanation,
  ExplanationProvider,
  ExplanationRequest,
} from './types';

interface BackendResponse {
  status?: string;
  passages?: {
    excerpt?: string;
    relevance?: number;
    matchedTerms?: string[];
    citation?: Partial<DocumentCitation>;
  }[];
}

function normalizePassage(raw: NonNullable<BackendResponse['passages']>[number]): EvidencePassage | null {
  const citation = raw.citation;
  // A passage without a resolvable document is not verifiable, so it is
  // discarded rather than displayed (§18: never show invented references).
  if (!raw.excerpt || !citation?.documentId) return null;
  return {
    excerpt: raw.excerpt,
    relevance: typeof raw.relevance === 'number' ? raw.relevance : 0,
    matchedTerms: Array.isArray(raw.matchedTerms) ? raw.matchedTerms : [],
    citation: {
      documentId: citation.documentId,
      documentTitle: citation.documentTitle ?? citation.documentId,
      sourceFile: citation.sourceFile ?? '',
      page: citation.page ?? null,
      lesson: citation.lesson ?? null,
      lessonTitle: citation.lessonTitle ?? null,
      section: citation.section ?? null,
      language: citation.language ?? 'en',
    },
  };
}

export function createBackendProvider(endpoint: string | undefined): ExplanationProvider {
  const id = 'backend-rag';
  const configured = typeof endpoint === 'string' && endpoint.trim() !== '';

  return {
    id,

    async isAvailable() {
      if (!configured) return false;
      try {
        const response = await fetch(`${endpoint}/health`, { method: 'GET' });
        return response.ok;
      } catch {
        return false;
      }
    },

    async explain(request: ExplanationRequest): Promise<Explanation> {
      const base = { questionId: request.questionId, language: request.language, provider: id };

      if (!configured) {
        return { ...base, status: 'unavailable', passages: [], reasonCode: 'index-unavailable' };
      }

      try {
        const response = await fetch(`${endpoint}/explain`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionId: request.questionId,
            question: request.question,
            correctAnswer: request.correctAnswerText,
            selectedAnswer: request.selectedAnswerText,
            sourceHint: request.bankSource,
            language: request.language,
          }),
          signal: request.signal,
        });
        if (!response.ok) {
          return { ...base, status: 'error', passages: [], reasonCode: 'provider-error' };
        }

        const data = (await response.json()) as BackendResponse;
        const passages = (data.passages ?? [])
          .map(normalizePassage)
          .filter((p): p is EvidencePassage => p !== null);

        if (passages.length === 0) {
          return { ...base, status: 'insufficient', passages: [], reasonCode: 'no-match' };
        }
        return { ...base, status: 'documented', passages };
      } catch {
        return { ...base, status: 'error', passages: [], reasonCode: 'provider-error' };
      }
    },
  };
}
