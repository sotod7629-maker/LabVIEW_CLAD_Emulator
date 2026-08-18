/**
 * Offline, deterministic explanation provider.
 *
 * WHAT IT DOES
 * ------------
 * Retrieves the passages of the participant guides most relevant to a question
 * and its correct answer, and returns them QUOTED VERBATIM with a real page
 * citation. Sentence selection trims a passage to the part that actually
 * matches — that is excerpting, not rewriting: every character shown is present
 * in the source document, in its original order.
 *
 * WHAT IT DELIBERATELY DOES NOT DO
 * --------------------------------
 * It does not summarise, paraphrase or generate explanatory prose. Producing
 * "why this answer is correct" narrative from retrieved text requires a
 * language model, and no such service is available to this application. Rather
 * than fabricate that narrative, the UI presents the evidence and lets the
 * reader verify it against the cited page (§17, §49).
 */

import { loadDocIndex, type DocChunk, type DocIndex } from '../search/docIndex';
import { parseSourceHint, searchDocuments, type SearchHit } from '../search/searchDocuments';
import type {
  DocumentCitation,
  EvidencePassage,
  Explanation,
  ExplanationProvider,
  ExplanationRequest,
} from './types';

/**
 * Evidence gate — the mechanism that makes §17 ("never invent an explanation")
 * enforceable rather than aspirational.
 *
 * Two independent conditions must both hold before a passage is shown as
 * supporting evidence:
 *
 *  1. KEY-TERM COVERAGE. If the question names a technical concept — a rare
 *     term that the bank capitalises, e.g. "Formula Node", "Trim Whitespace" —
 *     the passage must actually mention it. Sharing generic vocabulary
 *     ("node", "value", "input") is not evidence.
 *
 *  2. PLAIN COVERAGE. The passage must contain a substantial IDF-weighted
 *     share of the question's overall vocabulary, so that topically adjacent
 *     but off-target passages are rejected.
 *
 * A raw BM25 score is deliberately NOT the primary gate: it grows with query
 * length and so is not comparable between questions. It is kept only as a low
 * floor against freak single-term matches.
 *
 * CALIBRATION (reproduced by src/lib/explain/retrieval.probe.test.ts)
 * ------------------------------------------------------------------
 * Swept over the full 300-question bank. Ground truth for false positives: 14
 * questions whose subject was verified by grep to occur ZERO times in either
 * participant guide (Formula Node, Trim Whitespace, VI Template, Tick Count,
 * Flat Sequence, Notifier, Quotient). Ground truth for false negatives: ten
 * questions the guides unambiguously define.
 *
 *   plainCov   documented   passages shown for absent topics   recovered
 *     0.30      272/300                 3/14                    10/10
 *     0.35      267/300                 2/14                    10/10
 *     0.40      243/300                 0/14                     9/10   <-- chosen
 *     0.45      241/300                 0/14                     9/10
 *
 * 0.40 is the loosest setting that never presents a passage as documenting a
 * topic the guides do not contain. The ~81% documented rate reflects the
 * guides' real coverage of the CLAD blueprint; the rest correctly report
 * insufficient evidence instead of guessing (§17).
 */
const KEY_TERM_COVERAGE_THRESHOLD = 1;
const COVERAGE_THRESHOLD = 0.4;
const MIN_SCORE = 8;

const MAX_PASSAGES = 3;
const MAX_EXCERPT_CHARS = 620;

function splitSentences(text: string): string[] {
  return text
    .split('\n')
    .flatMap((line) => line.split(/(?<=[.:!?])\s+(?=[A-Z(])/))
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Trim a chunk to the contiguous run of sentences densest in matched terms.
 *
 * Contiguity matters: stitching together non-adjacent sentences would change
 * the meaning of the source. This keeps the excerpt faithful.
 */
function excerptFrom(chunk: DocChunk, matchedTerms: readonly string[]): string {
  const sentences = splitSentences(chunk.text);
  if (sentences.length === 0) return chunk.text.slice(0, MAX_EXCERPT_CHARS);

  const terms = new Set(matchedTerms);
  const scores = sentences.map((sentence) => {
    const normalized = sentence
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');
    let hits = 0;
    for (const term of terms) if (normalized.includes(term)) hits += 1;
    return hits;
  });

  let bestStart = 0;
  let bestScore = -1;
  let bestLength = 0;

  for (let start = 0; start < sentences.length; start += 1) {
    let chars = 0;
    let score = 0;
    for (let end = start; end < sentences.length; end += 1) {
      const next = sentences[end]!;
      if (chars + next.length > MAX_EXCERPT_CHARS && end > start) break;
      chars += next.length + 1;
      score += scores[end] ?? 0;
      // Prefer denser windows; tie-break toward the shorter one.
      const density = score / Math.sqrt(end - start + 1);
      if (density > bestScore) {
        bestScore = density;
        bestStart = start;
        bestLength = end - start + 1;
      }
    }
  }

  if (bestLength === 0) return sentences.slice(0, 3).join(' ').slice(0, MAX_EXCERPT_CHARS);
  return sentences.slice(bestStart, bestStart + bestLength).join(' ').trim();
}

function toCitation(chunk: DocChunk, docIndex: DocIndex): DocumentCitation {
  const meta = docIndex.getDocument(chunk.document);
  return {
    documentId: chunk.document,
    documentTitle: meta?.shortTitle ?? chunk.document,
    sourceFile: meta?.sourceFile ?? '',
    page: chunk.page,
    lesson: chunk.lesson,
    lessonTitle: chunk.lessonTitle,
    section: chunk.section,
    language: meta?.language ?? 'en',
  };
}

function toPassage(hit: SearchHit, docIndex: DocIndex): EvidencePassage {
  return {
    excerpt: excerptFrom(hit.chunk, hit.matchedTerms),
    citation: toCitation(hit.chunk, docIndex),
    // Plain coverage is the comparable, meaningful figure; expose it so the UI
    // can convey confidence without overstating it.
    relevance: Math.round(hit.coverage * 100) / 100,
    matchedTerms: hit.matchedTerms,
  };
}

export interface RetrievalProviderOptions {
  /** Injectable for tests; defaults to the lazily fetched build artifact. */
  loadIndex?: () => Promise<DocIndex>;
  /** Override the plain-coverage gate (0-1). */
  coverageThreshold?: number;
  /** Override the named-technical-term gate (0-1). */
  keyTermThreshold?: number;
  /** Override the absolute score floor. */
  minScore?: number;
}

export function createRetrievalProvider(
  options: RetrievalProviderOptions = {},
): ExplanationProvider {
  const load = options.loadIndex ?? (() => loadDocIndex());
  const coverageThreshold = options.coverageThreshold ?? COVERAGE_THRESHOLD;
  const keyTermThreshold = options.keyTermThreshold ?? KEY_TERM_COVERAGE_THRESHOLD;
  const minScore = options.minScore ?? MIN_SCORE;
  const id = 'local-retrieval';

  return {
    id,

    async isAvailable() {
      try {
        await load();
        return true;
      } catch {
        return false;
      }
    },

    async explain(request: ExplanationRequest): Promise<Explanation> {
      const base = { questionId: request.questionId, language: request.language, provider: id };

      let docIndex: DocIndex;
      try {
        docIndex = await load();
      } catch {
        return { ...base, status: 'unavailable', passages: [], reasonCode: 'index-unavailable' };
      }

      try {
        const hits = searchDocuments(docIndex, {
          question: request.question,
          correctAnswer: request.correctAnswerText,
          hint: parseSourceHint(request.bankSource),
          limit: MAX_PASSAGES * 3,
        });

        if (hits.length === 0) {
          return { ...base, status: 'insufficient', passages: [], reasonCode: 'no-match' };
        }

        const supported = hits.filter(
          (hit) =>
            hit.keyTermCoverage >= keyTermThreshold &&
            hit.coverage >= coverageThreshold &&
            hit.score >= minScore,
        );
        if (supported.length === 0) {
          return { ...base, status: 'insufficient', passages: [], reasonCode: 'below-threshold' };
        }

        // Keep at most one passage per page so three hits are three distinct
        // places in the guides, not the same paragraph three times.
        const seen = new Set<string>();
        const passages: EvidencePassage[] = [];
        for (const hit of supported) {
          const key = `${hit.chunk.document}:${hit.chunk.page ?? hit.chunk.index}`;
          if (seen.has(key)) continue;
          seen.add(key);
          passages.push(toPassage(hit, docIndex));
          if (passages.length >= MAX_PASSAGES) break;
        }

        return { ...base, status: 'documented', passages };
      } catch {
        return { ...base, status: 'error', passages: [], reasonCode: 'provider-error' };
      }
    },
  };
}
