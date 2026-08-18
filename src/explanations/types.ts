/**
 * Explanation model.
 *
 * Provenance is a first-class field, not a presentational detail. Every piece
 * of text the app shows as an explanation carries the record of where it came
 * from, and the UI renders the three kinds differently:
 *
 *   'document-extract' — verbatim passages retrieved from a reference document
 *                        the user loaded, with a real file/page/section locator.
 *   'question-bank'    — the rationale that ships inside the JSON. Shown as a
 *                        bank annotation with its declared (unverified) source
 *                        label. Never presented as documentary evidence.
 *   'none'             — nothing was found. The UI says so explicitly.
 *
 * Nothing in this layer paraphrases, summarizes or generates prose. Document
 * evidence is quoted verbatim; if a passage does not exist, no text is invented
 * to fill the space.
 */
import type { UiLanguage } from '../data/types';

export type ExplanationProvenance = 'document-extract' | 'question-bank' | 'none';

/** A locator read from the document itself — never reconstructed. */
export interface DocumentCitation {
  documentId: string;
  documentName: string;
  pageNumber: number;
  section?: string;
}

/** A verbatim passage plus the citation it was taken from. */
export interface EvidencePassage {
  /** Quoted exactly as it appears in the document. */
  text: string;
  citation: DocumentCitation;
  /** Retrieval score, exposed so the UI can show confidence honestly. */
  score: number;
  matchedTerms: string[];
}

export interface DocumentEvidence {
  /** Passages supporting why the correct option is correct. */
  supportingCorrect: EvidencePassage[];
  /** Passages bearing on the option the user chose, when they chose a wrong one. */
  regardingSelected: EvidencePassage[];
}

/** i18n keys for the notices this layer can raise. */
export type ExplanationNoticeKey =
  | 'explanations.notice.noDocumentsLoaded'
  | 'explanations.notice.noSufficientEvidence'
  | 'explanations.notice.bankOnly'
  | 'explanations.notice.languageMismatch';

export interface Explanation {
  questionId: string;
  language: UiLanguage;
  provenance: ExplanationProvenance;
  documentEvidence?: DocumentEvidence;
  /** Rationale declared by the question bank, kept strictly separate. */
  bankRationale?: { text: string; sourceLabel?: string };
  notices: ExplanationNoticeKey[];
  /** Id of the provider that produced the evidence, for traceability. */
  providerId: string;
}

export interface ExplanationRequest {
  questionId: string;
  language: UiLanguage;
  questionText: string;
  correctOptionText: string;
  selectedOptionText: string | null;
  isCorrect: boolean;
  category?: string;
  bankExplanation?: string;
  bankSourceLabel?: string;
}

/**
 * Pluggable source of documentary evidence.
 *
 * The local BM25 retriever implements this; a backend RAG service would
 * implement the same interface (see `remoteRagProvider.ts`), so swapping in
 * server-side retrieval requires no change to the UI or the quiz engine.
 */
export interface ExplanationProvider {
  readonly id: string;
  /** False when the provider has nothing to work with (no documents, no backend). */
  isAvailable(): boolean;
  findEvidence(request: ExplanationRequest): Promise<DocumentEvidence | null>;
}
