/**
 * In-memory retrieval over the reference documents.
 *
 * Chunking: page text is split into overlapping passages of a few sentences,
 * each tagged with its document, page number and nearest heading. Metadata is
 * captured at chunk time, so every citation the app shows is a real locator
 * read from the file — never reconstructed or guessed.
 *
 * Scoring: Okapi BM25. Chosen over embeddings because embeddings require a
 * model download or a backend; BM25 is exact, explainable (we can list which
 * query terms matched) and runs instantly in the browser. See
 * `docs/ARCHITECTURE.md` for the upgrade path to semantic retrieval.
 */
import { termFrequencies, tokenize } from './tokenizer';
import type { DocumentChunk, ReferenceDocument, SearchHit } from './types';

const BM25_K1 = 1.2;
const BM25_B = 0.75;

const TARGET_CHUNK_CHARS = 700;
const CHUNK_OVERLAP_SENTENCES = 1;

/**
 * Heading heuristic: a short line that is not a sentence. Used only to label a
 * chunk's section; when nothing convincing is found the section is left out
 * rather than filled with a guess.
 */
function looksLikeHeading(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed.length === 0 || trimmed.length > 80) return false;
  if (/[.;:,]$/.test(trimmed) && !/^\d+(\.\d+)*\s/.test(trimmed)) return false;
  const words = trimmed.split(/\s+/);
  if (words.length > 12) return false;
  const isNumbered = /^(\d+(\.\d+)*|[IVXLC]+\.|Lecci[oó]n|Lesson|Cap[ií]tulo|Chapter|Ap[eé]ndice|Appendix)\b/i.test(
    trimmed,
  );
  const isTitleCase = words.filter((word) => /^[A-ZÁÉÍÓÚÑ]/.test(word)).length >= Math.ceil(words.length * 0.6);
  const isUpperCase = trimmed === trimmed.toUpperCase() && /[A-ZÁÉÍÓÚÑ]/.test(trimmed);
  return isNumbered || isUpperCase || (isTitleCase && words.length <= 8);
}

function chunkPage(document: ReferenceDocument, pageNumber: number, text: string): DocumentChunk[] {
  const lines = text.split('\n');
  const chunks: DocumentChunk[] = [];

  let currentSection: string | undefined;
  let buffer: string[] = [];
  let bufferLength = 0;
  let bufferSection: string | undefined;

  const flush = () => {
    if (buffer.length === 0) return;
    const body = buffer.join(' ').trim();
    if (body.length >= 40) {
      chunks.push({
        id: `${document.id}#p${pageNumber}#c${chunks.length}`,
        documentId: document.id,
        documentName: document.name,
        pageNumber,
        section: bufferSection,
        text: body,
        tokens: tokenize(body),
      });
    }
    // Carry the tail forward so a passage split mid-idea is still retrievable.
    const carry = buffer.slice(-CHUNK_OVERLAP_SENTENCES);
    buffer = body.length >= 40 ? carry : [];
    bufferLength = buffer.reduce((sum, line) => sum + line.length, 0);
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;

    if (looksLikeHeading(trimmed)) {
      flush();
      currentSection = trimmed;
      bufferSection = currentSection;
      continue;
    }

    if (buffer.length === 0) bufferSection = currentSection;
    buffer.push(trimmed);
    bufferLength += trimmed.length;
    if (bufferLength >= TARGET_CHUNK_CHARS) flush();
  }

  // Final flush must not re-emit the overlap tail on its own.
  if (buffer.join(' ').trim().length >= 40) {
    const body = buffer.join(' ').trim();
    chunks.push({
      id: `${document.id}#p${pageNumber}#c${chunks.length}`,
      documentId: document.id,
      documentName: document.name,
      pageNumber,
      section: bufferSection,
      text: body,
      tokens: tokenize(body),
    });
  }

  return chunks;
}

export function chunkDocument(document: ReferenceDocument): DocumentChunk[] {
  return document.pages.flatMap((page) => chunkPage(document, page.pageNumber, page.text));
}

export interface SearchOptions {
  limit?: number;
  /** Hits scoring below this are discarded — the basis for "no documentation found". */
  minScore?: number;
  /** Restrict to specific documents (e.g. language-preferred ones). */
  documentIds?: string[];
}

/**
 * BM25 index over a set of documents. Rebuilt when documents change; a corpus
 * of a few hundred pages indexes in well under a second.
 */
export class DocumentIndex {
  private readonly chunks: DocumentChunk[] = [];
  private readonly postings = new Map<string, Array<{ chunkIndex: number; frequency: number }>>();
  private readonly chunkLengths: number[] = [];
  private averageChunkLength = 0;
  readonly documents: ReferenceDocument[] = [];

  static build(documents: readonly ReferenceDocument[]): DocumentIndex {
    const index = new DocumentIndex();
    for (const document of documents) index.addDocument(document);
    return index;
  }

  get chunkCount(): number {
    return this.chunks.length;
  }

  get isEmpty(): boolean {
    return this.chunks.length === 0;
  }

  addDocument(document: ReferenceDocument): void {
    this.documents.push(document);
    for (const chunk of chunkDocument(document)) {
      const chunkIndex = this.chunks.length;
      this.chunks.push(chunk);
      this.chunkLengths.push(chunk.tokens.length);
      for (const [term, frequency] of termFrequencies(chunk.tokens)) {
        const posting = this.postings.get(term);
        if (posting) posting.push({ chunkIndex, frequency });
        else this.postings.set(term, [{ chunkIndex, frequency }]);
      }
    }
    this.recomputeAverageLength();
  }

  private recomputeAverageLength(): void {
    const total = this.chunkLengths.reduce((sum, length) => sum + length, 0);
    this.averageChunkLength = this.chunkLengths.length === 0 ? 0 : total / this.chunkLengths.length;
  }

  private inverseDocumentFrequency(term: string): number {
    const documentFrequency = this.postings.get(term)?.length ?? 0;
    if (documentFrequency === 0) return 0;
    return Math.log(1 + (this.chunks.length - documentFrequency + 0.5) / (documentFrequency + 0.5));
  }

  /**
   * Rank chunks against a weighted query.
   * `weightedTerms` lets the caller emphasize, say, terms from the correct
   * answer over generic terms from the prompt.
   */
  search(weightedTerms: ReadonlyMap<string, number>, options: SearchOptions = {}): SearchHit[] {
    if (this.chunks.length === 0 || weightedTerms.size === 0) return [];

    const limit = options.limit ?? 5;
    const minScore = options.minScore ?? 0;
    const allowedDocuments = options.documentIds ? new Set(options.documentIds) : null;

    const scores = new Map<number, number>();
    const matched = new Map<number, Set<string>>();

    for (const [term, weight] of weightedTerms) {
      const posting = this.postings.get(term);
      if (!posting) continue;
      const idf = this.inverseDocumentFrequency(term);
      if (idf <= 0) continue;

      for (const { chunkIndex, frequency } of posting) {
        if (allowedDocuments && !allowedDocuments.has(this.chunks[chunkIndex]!.documentId)) continue;
        const length = this.chunkLengths[chunkIndex] ?? 0;
        const normalization = BM25_K1 * (1 - BM25_B + (BM25_B * length) / (this.averageChunkLength || 1));
        const contribution = weight * idf * ((frequency * (BM25_K1 + 1)) / (frequency + normalization));
        scores.set(chunkIndex, (scores.get(chunkIndex) ?? 0) + contribution);
        const terms = matched.get(chunkIndex) ?? new Set<string>();
        terms.add(term);
        matched.set(chunkIndex, terms);
      }
    }

    return [...scores.entries()]
      .map(([chunkIndex, score]) => ({
        chunk: this.chunks[chunkIndex]!,
        score,
        matchedTerms: [...(matched.get(chunkIndex) ?? [])],
      }))
      .filter((hit) => hit.score >= minScore)
      .sort((a, b) => b.score - a.score || a.chunk.pageNumber - b.chunk.pageNumber)
      .slice(0, limit);
  }
}
