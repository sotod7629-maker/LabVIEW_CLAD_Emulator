/**
 * Explanation contracts (§16, §17, §18, §45, §49).
 *
 * THE CENTRAL RULE
 * ----------------
 * An explanation either carries evidence quoted verbatim from an indexed page
 * of a real document, or it declares that no sufficient evidence was found.
 * There is no third state, and no code path composes prose that is then
 * presented as document-backed. `status` makes that explicit at the type level.
 */

import type { Language } from '../quiz/types';

export type ExplanationStatus =
  /** Verbatim evidence was retrieved and cited. */
  | 'documented'
  /** Retrieval ran but nothing cleared the relevance threshold (§17). */
  | 'insufficient'
  /** The document index could not be loaded at all (§36). */
  | 'unavailable'
  /** The provider itself failed. */
  | 'error';

/** A verifiable pointer into a source document (§18). */
export interface DocumentCitation {
  documentId: string;
  /** Human-readable document title, e.g. "LabVIEW Core 1". */
  documentTitle: string;
  /** Original file the index was built from. */
  sourceFile: string;
  /** Printed page label, e.g. "7-32". Null when not recoverable. */
  page: string | null;
  lesson: number | null;
  lessonTitle: string | null;
  section: string | null;
  /** Language of the source document — may differ from the UI language (§46). */
  language: string;
}

/** One piece of evidence: text quoted exactly as it appears in the document. */
export interface EvidencePassage {
  /** Verbatim excerpt. Never paraphrased, never generated. */
  excerpt: string;
  citation: DocumentCitation;
  /** Retrieval score, exposed so the UI can convey confidence honestly. */
  relevance: number;
  matchedTerms: string[];
}

export interface Explanation {
  questionId: number;
  language: Language;
  status: ExplanationStatus;
  /**
   * Evidence passages, strongest first. Always empty unless
   * `status === 'documented'`.
   */
  passages: EvidencePassage[];
  /**
   * Machine-readable reason when status is not 'documented'. The UI translates
   * this; no English prose leaks into a Spanish interface.
   */
  reasonCode?: 'no-match' | 'below-threshold' | 'index-unavailable' | 'provider-error';
  /** Which provider produced this, for transparency in exports. */
  provider: string;
}

/**
 * Pluggable explanation source (§49).
 *
 * The shipped implementation is `retrievalProvider` (deterministic, offline,
 * quotes only). `backendProvider` is a real client for an optional RAG service
 * that does not exist yet — it is wired but inert, and reports 'unavailable'
 * rather than pretending to work.
 */
export interface ExplanationProvider {
  readonly id: string;
  /** False when the provider cannot currently serve requests. */
  isAvailable(): Promise<boolean>;
  explain(request: ExplanationRequest): Promise<Explanation>;
}

export interface ExplanationRequest {
  questionId: number;
  question: string;
  correctAnswerText: string;
  selectedAnswerText: string | null;
  /** The bank's own provenance label, used as a retrieval hint. */
  bankSource: string;
  language: Language;
  signal?: AbortSignal;
}
