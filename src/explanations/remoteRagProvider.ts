/**
 * Placeholder for a server-side RAG provider.
 *
 * There is no backend in this project today. This class exists so the wiring is
 * real rather than hypothetical: it implements the same `ExplanationProvider`
 * interface as the local retriever, and `isAvailable()` returns false unless an
 * endpoint is configured — so the app never behaves as if a service it does not
 * have were answering.
 *
 * Expected contract of the endpoint, documented in `docs/ARCHITECTURE.md`:
 *
 *   POST {endpoint}
 *   → { questionId, language, questionText, correctOptionText, selectedOptionText, isCorrect }
 *   ← { supportingCorrect: EvidencePassage[], regardingSelected: EvidencePassage[] }
 *
 * A server implementation must return passages that are grounded in retrieved
 * chunks with real document/page metadata; if it cannot, it must return empty
 * arrays rather than model-authored prose.
 */
import type { DocumentEvidence, ExplanationProvider, ExplanationRequest } from './types';

export interface RemoteRagConfig {
  endpoint?: string;
  timeoutMs?: number;
}

export class RemoteRagProvider implements ExplanationProvider {
  readonly id = 'remote-rag';
  private readonly config: RemoteRagConfig;

  constructor(config: RemoteRagConfig = {}) {
    this.config = config;
  }

  isAvailable(): boolean {
    return typeof this.config.endpoint === 'string' && this.config.endpoint.length > 0;
  }

  async findEvidence(request: ExplanationRequest): Promise<DocumentEvidence | null> {
    if (!this.isAvailable()) return null;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs ?? 15000);
    try {
      const response = await fetch(this.config.endpoint!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
        signal: controller.signal,
      });
      if (!response.ok) return null;
      const payload = (await response.json()) as Partial<DocumentEvidence>;
      return {
        supportingCorrect: payload.supportingCorrect ?? [],
        regardingSelected: payload.regardingSelected ?? [],
      };
    } catch {
      // A failed lookup yields no evidence — it must never yield invented text.
      return null;
    } finally {
      clearTimeout(timeout);
    }
  }
}
