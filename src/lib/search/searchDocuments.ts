/**
 * BM25 retrieval over the participant guides (§16, §19).
 *
 * Ranking signals, in the order §16 prescribes:
 *   1. Terms from the question prompt.
 *   2. Terms from the correct answer (weighted higher — it names the concept
 *      the passage must actually support).
 *   3. Spanish→English bridged vocabulary, so a Spanish question can reach
 *      English prose at all.
 *   4. A provenance boost derived from the bank's own `source` label: a
 *      question tagged "Core 1 - Lección 7" gets its Lesson 7 passages lifted.
 *
 * Everything returned is a verbatim excerpt of an indexed page. This module
 * never composes prose.
 */

import { bridgeToEnglish } from './termBridge';
import { tokenizeQuery } from './tokenize';
import type { DocChunk, DocIndex } from './docIndex';

const K1 = 1.5;
const B = 0.75;

/** Multiplier applied to a chunk in the lesson the bank attributes. */
const LESSON_BOOST = 1.6;
/** Multiplier applied to other chunks of the attributed document. */
const DOCUMENT_BOOST = 1.15;
/** Extra weight for terms coming from the correct answer text. */
const ANSWER_TERM_WEIGHT = 1.75;

/**
 * IDF above which a query term is considered TOPIC-BEARING ("salient").
 *
 * With ~1100 indexed chunks this corresponds to a term occurring in fewer than
 * roughly 5% of them. It separates words that identify what a question is about
 * ("formula", "enum", "typedef", "concatenate") from structural vocabulary that
 * appears all over the guides ("node", "value", "input", "output", "terminal").
 *
 * The distinction matters for honesty, not just ranking: a passage can share
 * plenty of structural vocabulary with a question while being about something
 * entirely different, and presenting it as supporting evidence would mislead.
 */
const SALIENT_IDF = 3;

/**
 * IDF above which a term is treated as RARE enough to be topic-defining.
 *
 * With ~1100 chunks this is a term occurring in well under 1% of them.
 */
const RARE_IDF = 5;

export interface SourceHint {
  /** e.g. 'core1' */
  document: string | null;
  /** e.g. 7 */
  lesson: number | null;
}

export interface SearchQuery {
  question: string;
  correctAnswer: string;
  /** Parsed from the bank's `source` field. */
  hint?: SourceHint;
  limit?: number;
}

export interface SearchHit {
  chunk: DocChunk;
  /** Raw BM25 score. Grows with query length, so not comparable across questions. */
  score: number;
  /**
   * IDF-weighted fraction of the query's vocabulary present in this chunk, in
   * [0, 1]. Unlike the raw score this IS comparable across questions.
   */
  coverage: number;
  /**
   * Same measure restricted to topic-bearing terms. This is the figure the
   * evidence gate actually trusts: it answers "does this passage discuss the
   * thing the question is about?" rather than "does it share common words?".
   * NaN-free: 0 when the query has no salient terms at all.
   */
  salientCoverage: number;
  /** Number of topic-bearing terms in the query, for diagnostics. */
  salientTermCount: number;
  /**
   * Share of the question's *named* technical terms (rare AND capitalised in
   * the source text) that this passage contains. 1 when the question names no
   * such term, since there is then nothing specific to require.
   */
  keyTermCoverage: number;
  /** The named technical terms the gate required, for diagnostics. */
  keyTerms: string[];
  /** Query terms that actually occurred in this chunk — drives highlighting. */
  matchedTerms: string[];
}

/**
 * Extract the technical proper nouns of a question.
 *
 * The bank capitalises LabVIEW terminology ("Formula Node", "Case Structure",
 * "Shift Register", "Trim Whitespace") while ordinary Spanish prose stays
 * lowercase. That orthographic convention is a cheap, reliable signal for
 * "this word names the subject of the question", and it is what lets the
 * evidence gate distinguish a genuinely topic-defining rare term from an
 * incidental one.
 *
 * Without it, a question about the Front Panel was rejected because the phrase
 * "usuario final" contributed the rare-but-irrelevant token "final", while a
 * question about the (undocumented) Formula Node slipped through on generic
 * vocabulary. Requiring capitalisation fixes both.
 *
 * Leading words are skipped: Spanish interrogatives ("¿Cuál", "¿Qué") are
 * capitalised by grammar, not by terminology.
 */
export function extractProperNounTokens(...texts: string[]): Set<string> {
  const tokens = new Set<string>();
  for (const text of texts) {
    // Split on sentence boundaries so each sentence's first word can be skipped.
    for (const sentence of text.split(/(?<=[.!?¿;:])\s+|\n+/)) {
      const words = sentence.trim().split(/\s+/);
      words.forEach((word, index) => {
        const bare = word.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '');
        if (bare.length < 3) return;
        if (index === 0) return;
        if (!/^\p{Lu}/u.test(bare)) return;
        const normalized = bare
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        if (normalized) tokens.add(normalized);
      });
    }
  }
  return tokens;
}

/**
 * Parse a bank `source` label into a retrieval hint.
 *
 * Handles the forms present in the bank, e.g.
 *   "Core 1 - Lección 7"
 *   "Core 2 - Lección 5 / Exam Blueprint CLAD"
 *   "Exam Blueprint CLAD"            -> no hint
 *   "Core 1 - Apéndice A / ..."      -> document only
 */
export function parseSourceHint(source: string): SourceHint {
  const normalized = source.normalize('NFD').replace(/[̀-ͯ]/g, '');
  const coreMatch = /Core\s*([12])/i.exec(normalized);
  const lessonMatch = /Lecci[oó]n\s*(\d+)/i.exec(normalized);
  return {
    document: coreMatch ? `core${coreMatch[1]}` : null,
    lesson: lessonMatch ? Number(lessonMatch[1]) : null,
  };
}

interface WeightedTerm {
  term: string;
  weight: number;
  /** Inverse document frequency, computed once and reused for coverage. */
  idf: number;
}

function idfOf(docFreq: number, totalDocs: number): number {
  // BM25 IDF, +1 variant: stays positive even for very common terms.
  return Math.log(1 + (totalDocs - docFreq + 0.5) / (docFreq + 0.5));
}

/**
 * Build the weighted query vocabulary.
 *
 * Terms absent from the index are dropped: they can never be matched, so
 * counting them would depress coverage for every chunk equally and make the
 * threshold meaningless.
 */
function buildTerms(query: SearchQuery, docIndex: DocIndex): WeightedTerm[] {
  const weights = new Map<string, number>();

  const add = (text: string, weight: number) => {
    for (const term of tokenizeQuery(bridgeToEnglish(text))) {
      weights.set(term, Math.max(weights.get(term) ?? 0, weight));
    }
  };

  add(query.question, 1);
  add(query.correctAnswer, ANSWER_TERM_WEIGHT);

  const totalDocs = docIndex.index.lengths.length;
  const terms: WeightedTerm[] = [];
  for (const [term, weight] of weights) {
    const posting = docIndex.index.postings[term];
    if (!posting) continue;
    terms.push({ term, weight, idf: idfOf(posting.length / 2, totalDocs) });
  }
  return terms;
}

export function searchDocuments(docIndex: DocIndex, query: SearchQuery): SearchHit[] {
  const { postings, lengths, avgLength } = docIndex.index;
  const totalDocs = lengths.length;
  if (totalDocs === 0) return [];

  const terms = buildTerms(query, docIndex);
  if (terms.length === 0) return [];

  // Denominator for coverage: the whole query vocabulary, weighted by IDF so
  // that matching "shift register" counts for far more than matching "value".
  const totalIdf = terms.reduce((acc, t) => acc + t.idf, 0) || 1;

  const salientTerms = terms.filter((t) => t.idf >= SALIENT_IDF);
  const salientIdfTotal = salientTerms.reduce((acc, t) => acc + t.idf, 0);
  const salientSet = new Set(salientTerms.map((t) => t.term));

  // Terms that both name a concept (capitalised in the bank) and are rare in
  // the guides. If the question names one, a passage that never mentions it is
  // not evidence for that question, however much other vocabulary it shares.
  const properNouns = extractProperNounTokens(query.question, query.correctAnswer);
  const keyTerms = terms.filter((t) => t.idf >= RARE_IDF && properNouns.has(t.term));
  const keyIdfTotal = keyTerms.reduce((acc, t) => acc + t.idf, 0);
  const keySet = new Set(keyTerms.map((t) => t.term));

  const scores = new Map<number, number>();
  const matchedIdf = new Map<number, number>();
  const matchedSalientIdf = new Map<number, number>();
  const matchedKeyIdf = new Map<number, number>();
  const matched = new Map<number, Set<string>>();

  for (const { term, weight, idf } of terms) {
    const posting = postings[term];
    if (!posting) continue;

    for (let i = 0; i < posting.length; i += 2) {
      const chunkIndex = posting[i]!;
      const termFreq = posting[i + 1]!;
      const length = lengths[chunkIndex] ?? avgLength;
      const denominator = termFreq + K1 * (1 - B + (B * length) / (avgLength || 1));
      const contribution = idf * ((termFreq * (K1 + 1)) / (denominator || 1)) * weight;

      scores.set(chunkIndex, (scores.get(chunkIndex) ?? 0) + contribution);
      matchedIdf.set(chunkIndex, (matchedIdf.get(chunkIndex) ?? 0) + idf);
      if (salientSet.has(term)) {
        matchedSalientIdf.set(chunkIndex, (matchedSalientIdf.get(chunkIndex) ?? 0) + idf);
      }
      if (keySet.has(term)) {
        matchedKeyIdf.set(chunkIndex, (matchedKeyIdf.get(chunkIndex) ?? 0) + idf);
      }

      let set = matched.get(chunkIndex);
      if (!set) {
        set = new Set();
        matched.set(chunkIndex, set);
      }
      set.add(term);
    }
  }

  if (scores.size === 0) return [];

  const hint = query.hint;
  const hits: SearchHit[] = [];

  for (const [chunkIndex, rawScore] of scores) {
    const chunk = docIndex.getChunk(chunkIndex);
    if (!chunk) continue;

    let score = rawScore;
    if (hint?.document && chunk.document === hint.document) {
      score *= hint.lesson != null && chunk.lesson === hint.lesson ? LESSON_BOOST : DOCUMENT_BOOST;
    }

    hits.push({
      chunk,
      score,
      coverage: Math.min(1, (matchedIdf.get(chunkIndex) ?? 0) / totalIdf),
      salientCoverage:
        salientIdfTotal > 0
          ? Math.min(1, (matchedSalientIdf.get(chunkIndex) ?? 0) / salientIdfTotal)
          : 0,
      salientTermCount: salientTerms.length,
      keyTermCoverage:
        keyIdfTotal > 0 ? Math.min(1, (matchedKeyIdf.get(chunkIndex) ?? 0) / keyIdfTotal) : 1,
      keyTerms: keyTerms.map((t) => t.term),
      matchedTerms: [...(matched.get(chunkIndex) ?? [])],
    });
  }

  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, query.limit ?? 5);
}
