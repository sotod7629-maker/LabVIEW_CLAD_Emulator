/**
 * Evidence retrieval against the locally indexed reference documents.
 *
 * Query construction follows the priority order the retrieval should respect:
 *   1. terms from the correct answer   (highest weight — that is the claim)
 *   2. terms from the question prompt
 *   3. terms from the option the user selected (only to explain their mistake)
 *   4. the question's category, as a weak topical hint
 *
 * The returned passages are verbatim sentence extracts. Nothing is rewritten.
 */
import { DocumentIndex } from '../documents/documentIndex';
import { splitSentences, tokenize } from '../documents/tokenizer';
import type { SearchHit } from '../documents/types';
import type {
  DocumentEvidence,
  EvidencePassage,
  ExplanationProvider,
  ExplanationRequest,
} from './types';

const WEIGHT_CORRECT_ANSWER = 3;
const WEIGHT_QUESTION = 2;
const WEIGHT_SELECTED_ANSWER = 2.5;
const WEIGHT_CATEGORY = 0.75;

/**
 * Minimum BM25 score for a hit to count as evidence. Below this the app reports
 * that no supporting documentation was found rather than showing a weak match
 * as if it were a source.
 */
export const MIN_EVIDENCE_SCORE = 3.5;

const MAX_PASSAGES_PER_ASPECT = 2;
const MAX_SENTENCES_PER_PASSAGE = 3;

function addWeightedTerms(target: Map<string, number>, text: string, weight: number): void {
  for (const term of tokenize(text)) {
    target.set(term, (target.get(term) ?? 0) + weight);
  }
}

function buildQuery(parts: Array<{ text: string | null | undefined; weight: number }>): Map<string, number> {
  const query = new Map<string, number>();
  for (const part of parts) {
    if (part.text) addWeightedTerms(query, part.text, part.weight);
  }
  return query;
}

/** Marks a gap where sentences between two extracts were left out. */
export const ELLIPSIS = ' […] ';

/**
 * Reduce a retrieved chunk to the few sentences that actually carry the matched
 * terms. This is extraction, not summarization: the sentences are returned
 * exactly as they appear and in document order.
 *
 * When the selected sentences are not adjacent in the source, an ellipsis marks
 * the gap — otherwise the quotation would read as one continuous passage that
 * the document does not actually contain.
 */
function extractRelevantSentences(chunkText: string, matchedTerms: readonly string[]): string {
  const sentences = splitSentences(chunkText);
  if (sentences.length <= MAX_SENTENCES_PER_PASSAGE) return chunkText.trim();

  const termSet = new Set(matchedTerms);
  const scored = sentences.map((sentence, index) => ({
    index,
    sentence,
    hits: tokenize(sentence).filter((token) => termSet.has(token)).length,
  }));

  const best = scored
    .filter((entry) => entry.hits > 0)
    .sort((a, b) => b.hits - a.hits || a.index - b.index)
    .slice(0, MAX_SENTENCES_PER_PASSAGE)
    .sort((a, b) => a.index - b.index);

  const selected = best.length > 0 ? best : scored.slice(0, MAX_SENTENCES_PER_PASSAGE);

  return selected
    .map((entry, position) => {
      const previous = selected[position - 1];
      const isContiguous = !previous || entry.index === previous.index + 1;
      return (position === 0 || isContiguous ? (position === 0 ? '' : ' ') : ELLIPSIS) + entry.sentence;
    })
    .join('')
    .trim();
}

export interface LocalDocumentProviderOptions {
  minScore?: number;
  /** Restrict retrieval to a subset of documents (e.g. language-preferred ones). */
  documentIds?: string[];
}

export class LocalDocumentProvider implements ExplanationProvider {
  readonly id = 'local-bm25';
  private readonly index: DocumentIndex;
  private readonly minScore: number;
  private readonly documentIds?: string[];

  constructor(index: DocumentIndex, options: LocalDocumentProviderOptions = {}) {
    this.index = index;
    this.minScore = options.minScore ?? MIN_EVIDENCE_SCORE;
    this.documentIds = options.documentIds;
  }

  isAvailable(): boolean {
    return !this.index.isEmpty;
  }

  async findEvidence(request: ExplanationRequest): Promise<DocumentEvidence | null> {
    if (!this.isAvailable()) return null;

    const searchOptions = {
      limit: MAX_PASSAGES_PER_ASPECT,
      minScore: this.minScore,
      ...(this.documentIds ? { documentIds: this.documentIds } : {}),
    };

    const correctQuery = buildQuery([
      { text: request.correctOptionText, weight: WEIGHT_CORRECT_ANSWER },
      { text: request.questionText, weight: WEIGHT_QUESTION },
      { text: request.category, weight: WEIGHT_CATEGORY },
    ]);
    const correctHits = this.index.search(correctQuery, searchOptions);
    const supportingCorrect = correctHits.map(toPassage);

    // Only look for evidence about the chosen option when it was the wrong one
    // and is distinguishable from the correct one.
    let regardingSelected: EvidencePassage[] = [];
    if (!request.isCorrect && request.selectedOptionText) {
      const selectedQuery = buildQuery([
        { text: request.selectedOptionText, weight: WEIGHT_SELECTED_ANSWER },
        { text: request.questionText, weight: WEIGHT_QUESTION },
        { text: request.category, weight: WEIGHT_CATEGORY },
      ]);
      // Deduplicate on the source chunk, not the extracted text: two extracts
      // from the same passage differ by a sentence or two, and showing them
      // under both headings reads as two independent pieces of evidence when
      // there is only one.
      const usedChunks = new Set(correctHits.map((hit) => hit.chunk.id));
      regardingSelected = this.index
        .search(selectedQuery, searchOptions)
        .filter((hit) => !usedChunks.has(hit.chunk.id))
        .map(toPassage);
    }

    if (supportingCorrect.length === 0 && regardingSelected.length === 0) return null;
    return { supportingCorrect, regardingSelected };
  }
}

function toPassage(hit: SearchHit): EvidencePassage {
  return {
    text: extractRelevantSentences(hit.chunk.text, hit.matchedTerms),
    citation: {
      documentId: hit.chunk.documentId,
      documentName: hit.chunk.documentName,
      pageNumber: hit.chunk.pageNumber,
      section: hit.chunk.section,
    },
    score: Math.round(hit.score * 100) / 100,
    matchedTerms: hit.matchedTerms,
  };
}
