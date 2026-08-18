# Architecture

## Layering

Dependencies point downward only. Nothing in `components/` imports a parser, a retriever or an
exporter's internals; nothing in `data/` or `quiz/` knows React exists.

```
                       components/  +  hooks/          ← presentation, no domain logic
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
    quiz/                explanations/           export/
  generation             orchestration          PDF · CSV · JSON
  scoring                + cache
        │                     │
        ▼                     ▼
     data/               documents/
  parse · validate    extract · chunk · index
        │                     │
        ▼                     ▼
   questions JSON        reference PDFs
```

`App.tsx` owns the state machine and wires the layers together. It contains no evaluation,
parsing, retrieval or export logic of its own.

## State machine

```
IDLE → LOADING → READY ──────────────► QUIZ_ACTIVE
                   ▲                        │
                   │                   (finish requested)
                   │                        ▼
                   │                   SUBMITTING
                   │                        ▼
                   └──── RESULTS ◄── GENERATING_EXPLANATIONS

  any state → ERROR (recoverable: the failing step can be retried)
```

`SUBMITTING` and `GENERATING_EXPLANATIONS` are separate because they fail differently and are
reported differently: grading is instant and deterministic, retrieval is incremental and reports
`n of m` progress.

## Data flow for one question

```
JSON question
     │ questionParser        → normalized Question { id, prompt, options[], correctOptionId }
     ▼
validateQuestionData        → excluded if structurally broken
     │
     ▼
generateQuiz                → QuizItem { questionId, displayIndex, displayOptions[] }
     │                              ▲
     │                              └── options reordered; ids untouched
     ▼
selectAnswer                → answers[questionId] = optionId
     │
     ▼
generateResults             → QuestionResult { outcome, selected*, correct*, … }
     │
     ▼
ExplanationService          → Explanation { provenance, documentEvidence?, bankRationale?, notices[] }
     │
     ▼
exportPDF / exportCSV / exportJSON
```

## The correctness invariant

Correctness is carried by an **id**, never by a position.

`Question.correctOptionId` holds an `AnswerOption.id` taken from the source schema (`"a"`, `"b"`,
…). Shuffling reorders the option objects in `QuizItem.displayOptions`; it never rewrites an index,
because there is no index to rewrite. Grading compares `answers[questionId] === correctOptionId`.

Positional forms in the source data (`correctAnswer: 2`) are resolved to an id exactly once, in the
parser, and never used positionally again.

This is what `generateQuiz.test.ts` verifies across 40 seeds over the real 300-question bank: the
option set is preserved, the correct id is preserved, the correct option's *text* is preserved, and
the correct answer genuinely moves out of first position (which matters, because every correct
answer in the bundled bank is `"a"`).

Randomization is seeded (`mulberry32`), so a session can be reproduced exactly from its seed.

## Retrieval

```
PDF ──pdf.js worker──► per-page text
                            │
                            ▼
                       chunkDocument           700-char passages, 1-sentence overlap,
                            │                  tagged { document, page, section }
                            ▼
                       DocumentIndex           inverted index + BM25 (k1=1.2, b=0.75)
                            │
       weighted query ──────┤                  correct answer ×3 · prompt ×2
                            │                  selected answer ×2.5 · category ×0.75
                            ▼
                    ranked SearchHit[]         below MIN_EVIDENCE_SCORE → discarded
                            │
                            ▼
                 extractRelevantSentences      verbatim; `[…]` marks elisions
                            │
                            ▼
                    EvidencePassage            text + citation + score + matched terms
```

Chunk metadata is captured at chunk time, so a citation is a locator read out of the file rather
than something reconstructed later.

### Why BM25 and not embeddings

Embeddings need either a model download (tens of MB, slow first load) or a server. BM25 is exact,
indexes a few hundred pages in well under a second, and can name the terms that matched — which is
what lets the UI show *why* a passage was retrieved. For a technical corpus full of proper nouns
("Shift Register", "Formula Node"), lexical matching is also simply a good fit.

The upgrade path is the provider interface below, not a rewrite.

## Explanation providers

```ts
interface ExplanationProvider {
  readonly id: string;
  isAvailable(): boolean;
  findEvidence(request: ExplanationRequest): Promise<DocumentEvidence | null>;
}
```

`ExplanationService` tries providers in order and takes the first that returns evidence.
Configured order is `[RemoteRagProvider, LocalDocumentProvider]`, so a backend wins when present.

- `LocalDocumentProvider` — BM25 over the in-browser index. Available when documents are loaded.
- `RemoteRagProvider` — HTTP client for a backend. **Available only when `VITE_RAG_ENDPOINT` is
  set**, which it is not in this deployment. It reports itself unavailable rather than simulating a
  service that does not exist.

Results are cached by `questionId + language + corpusFingerprint`. The fingerprint changes when
documents are added or removed, so the cache invalidates exactly when it should.

## Backend contract (not implemented here)

There is no server in this repository. If one is added, this is the contract the existing client
already speaks:

```http
POST {VITE_RAG_ENDPOINT}
Content-Type: application/json

{
  "questionId":         "53",
  "language":           "es",
  "questionText":       "…",
  "correctOptionText":  "…",
  "selectedOptionText": "…" | null,
  "isCorrect":          false,
  "category":           "Estructuras"
}
```

```jsonc
// 200 OK
{
  "supportingCorrect": [
    {
      "text": "verbatim or faithfully grounded passage",
      "citation": {
        "documentId":   "…",
        "documentName": "LabVIEW_Core_1.pdf",
        "pageNumber":   42,
        "section":      "Lección 6: Bucles"      // optional
      },
      "score": 14.36,
      "matchedTerms": ["bucle", "iteracion"]
    }
  ],
  "regardingSelected": []
}
```

A compliant server **must**:

1. Ground every returned passage in a retrieved chunk with real document and page metadata.
2. Return empty arrays when retrieval finds nothing — never model-authored prose written to fill
   the gap.
3. Never emit a citation for a document or page it did not actually retrieve.

If an LLM writes the passage text rather than quoting it, the response must remain traceable to the
retrieved chunks; the client renders everything under `supportingCorrect` / `regardingSelected` as
document-backed evidence, so anything unfounded placed there would be presented to the user as
fact. Any non-2xx response, timeout or malformed body yields no evidence and the client falls
through to local retrieval.

A reference implementation would be: extract → chunk → embed → vector store → retrieve top-k →
prompt an LLM constrained to the retrieved chunks → return passages with their chunk metadata
intact.

## Extension points

These exist in the code today and are unused, so adding the feature is a UI change rather than an
engine change:

| Feature | Where it hooks in |
| --- | --- |
| Practice mode (immediate feedback) | `QuizConfig.mode` is already `'quiz' \| 'practice'`; `AnswerOption` already accepts a `correct`/`incorrect` review state |
| Timed quiz | `QuizSession.startedAt` / `endedAt` are recorded; `QuizResults.durationSeconds` is already computed and exported |
| Question history / statistics | `QuizResults` is a serializable document; `quiz/persistence.ts` isolates all storage |
| Retry incorrect answers | `filterResultsByScope(results, 'incorrect')` already yields the set |
| Difficulty and category selection | Implemented; `filterQuestions` takes arbitrary filters |
| Translated content | `LocalizedText` and `resolveText` handle it; add `{ es, en }` to the bank and it works, with no fallback badge |

## Testing

116 tests, `npm test`. The load-bearing ones:

- **`quiz/generateQuiz.test.ts`** — shuffling preserves the correct answer across 40 seeds on the
  real bank; counts of 1, 2, 25, 99, 100; no duplication; capping when the pool is smaller than
  requested; seeded reproducibility.
- **`quiz/scoring.test.ts`** — 21/25 = 84%; all-correct, all-wrong, none-answered; unanswered kept
  distinct from incorrect; grading against shuffled display order.
- **`data/questionParser.test.ts`** — the real 300-question file, asserting prompts and options are
  byte-identical to the source; plus schema variants and malformed input.
- **`explanations/explanations.test.ts`** — quoted text is verbatim from the cited page; no
  evidence for an off-topic question; distinct notices for "no documents" vs "nothing found";
  caching; deduplication by source chunk.
- **`export/export.test.ts`** — CSV quoting, the PDF's actual rendered text (inflated from its
  content streams), and that a bank annotation never gets a page number.
- **`test/pipeline.test.ts`** — the whole flow end to end, asserting every citation points at a page
  that exists and quotes text that page really contains.
