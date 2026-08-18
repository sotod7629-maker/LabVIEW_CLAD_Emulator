/** Reference-document model shared by the extractor, the index and the UI. */

export interface DocumentPage {
  pageNumber: number;
  text: string;
}

export interface ReferenceDocument {
  id: string;
  /** File name as provided by the user — shown verbatim in citations. */
  name: string;
  pageCount: number;
  pages: DocumentPage[];
  /** Characters of extractable text found. Zero means a scanned/image-only PDF. */
  extractedCharacters: number;
  sizeBytes: number;
  addedAt: string;
}

/** An indexed passage. Metadata is captured at chunk time so citations are exact. */
export interface DocumentChunk {
  id: string;
  documentId: string;
  documentName: string;
  pageNumber: number;
  /** Nearest preceding heading-like line, when one was detected. */
  section?: string;
  text: string;
  tokens: string[];
}

export interface SearchHit {
  chunk: DocumentChunk;
  score: number;
  /** Query terms that actually occurred in the chunk — used for the "why" trail. */
  matchedTerms: string[];
}

export type DocumentLoadErrorCode =
  | 'not-a-pdf'
  | 'too-large'
  | 'corrupt'
  | 'encrypted'
  | 'no-extractable-text'
  | 'unknown';

export class DocumentLoadError extends Error {
  readonly code: DocumentLoadErrorCode;
  readonly fileName: string;
  constructor(code: DocumentLoadErrorCode, fileName: string, message?: string) {
    super(message ?? code);
    this.name = 'DocumentLoadError';
    this.code = code;
    this.fileName = fileName;
  }
}
