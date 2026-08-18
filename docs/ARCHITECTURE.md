# Architecture

## Layering

Responsibilities are kept separate so each can change independently:

```
                    UI / Presentation  (src/components, src/App.tsx)
                              |
        +---------------------+---------------------+
        |                                           |
   Quiz Engine                              Explanation Engine
   (src/lib/quiz)                           (src/lib/explain)
        |                                           |
   Question Data                            Retrieval / Search
   (src/lib/data)                           (src/lib/search)
        |                                           |
   cuestionario_CLAD_300.json               doc-index.json
   questions.en.json                        (built from the guides)
```

Cross-cutting: `src/lib/i18n` (all user-visible text), `src/lib/export`
(PDF/CSV/JSON), `src/lib/storage` (session persistence).

`src/lib` contains no React. It is plain TypeScript, which is why the engine is
directly testable without rendering anything.

## The question bank

Schema was determined by inspecting the file, not assumed:

```jsonc
{
  "metadata":   { "title", "total_questions", "generated_from", "version" },
  "categories": [ 15 strings ],
  "questions":  [ { "id", "category", "difficulty", "question",
                    "options": { "a", "b", "c", "d" },
                    "correct_answer": "a" | "b" | "c" | "d",
                    "explanation", "source" } ]
}
```

300 questions, ids 1–300, no duplicates, every `correct_answer` valid.

**`correct_answer` is `"a"` for all 300 questions.** The bank was generated with
the correct option written first. Option shuffling is therefore not cosmetic —
without it the quiz is trivially gameable — which makes shuffle correctness the
single highest-risk property in the application. See below.

## Why shuffling cannot desynchronise the answer

An option's identity is its **original bank letter**, never its position:

```ts
interface QuizOption { id: OptionKey; text: string }   // id is 'a' | 'b' | 'c' | 'd'
interface QuizQuestion {
  options: QuizOption[];        // shuffling reorders THIS array only
  correctOptionId: OptionKey;   // copied verbatim from the bank, never recomputed
}
```

Grading compares `selectedOptionId === correctOptionId`. Neither value is ever
derived from an array index, so the classic "shuffled the options but forgot to
move the answer index" bug is structurally impossible rather than merely
avoided. `generateQuiz.test.ts` replays 40 seeds over a 100-question bank and
asserts the invariant holds every time.

## Language handling

The bank is Spanish-only. English translations live in a **separate overlay**
(`public/data/questions.en.json`) keyed by question id and original option
letter:

```jsonc
{ "1": { "question": "...", "options": { "a": "...", "b": "..." }, "explanation": "..." } }
```

The overlay carries no answer key, and `scripts/merge-translations.mjs` copies
only `question`, `options` and `explanation` — so a translation cannot change
which option is correct even if a source file tried to. Grading always runs
against the original Spanish bank. A missing translation degrades to Spanish and
is flagged in the UI rather than hidden.

The translations were produced by machine translation during development; the
UI says so plainly on the setup screen.

## Document index

`scripts/build-doc-index.mjs` converts the participant guides into a
page-anchored search index at build time.

The source PDFs printed a footer on every page, and the conversion preserved it
in two alternating forms:

```
verso:  "4-4 | ni.com"
recto:  "© National Instruments Corporation | 4-5"
```

plus a running header naming the lesson. These are genuine page boundaries from
the original document, so **every page number the application cites is real and
independently verifiable**. A chunk with no recoverable footer is emitted with
`page: null` and reported as unavailable rather than guessed.

Result: 1087 chunks across 552 identified pages, with 0 lesson/page mismatches.

## The evidence gate

This is the mechanism that makes "never invent an explanation" enforceable
rather than aspirational.

The bank is Spanish, the guides are English, so a Spanish→English term bridge
expands the query into the vocabulary the guides actually use. Retrieval is
BM25, boosted toward the lesson the bank's own `source` field attributes.

A passage is shown as evidence only if **both** hold:

1. **Key-term coverage = 1.** If the question names a technical concept — a rare
   term the bank capitalises, like "Formula Node" — the passage must mention it.
   A term that is absent from the corpus entirely counts against this, because
   absence from the guides is the strongest possible evidence they don't cover
   the topic. Spanish-origin tokens are excluded: `frontal` is missing from an
   English manual for language reasons, not coverage reasons.
2. **Plain coverage ≥ 0.40.** The passage must contain a substantial
   IDF-weighted share of the question's overall vocabulary.

Raw BM25 score is deliberately *not* the gate: it grows with query length and so
is not comparable between questions. It is kept only as a low floor.

**Calibration.** Ground truth for false positives: 14 questions whose subject was
verified by grep to occur zero times in either guide (Formula Node, Trim
Whitespace, VI Template, Tick Count, Flat Sequence, Notifier, Quotient). Ground
truth for false negatives: 10 questions the guides unambiguously define.

| plain coverage | documented | shown for absent topics | present recovered |
|---|---|---|---|
| 0.30 | 272/300 | 3/14 | 10/10 |
| 0.35 | 267/300 | 2/14 | 10/10 |
| **0.40** | **244/300** | **0/14** | **9/10** |
| 0.45 | 241/300 | 0/14 | 9/10 |

0.40 is the loosest setting that never presents a passage as documenting a topic
the guides do not contain. The ~81% documented rate reflects the guides' real
coverage of the CLAD blueprint; the remaining ~19% report insufficient evidence
instead of guessing. `retrieval.probe.test.ts` reproduces this and fails if a
leak reappears.

## What the application does NOT do

It does not compose narrative explanations. Turning retrieved passages into
"here is why your answer is wrong" prose requires a language model, and none is
available to a frontend-only application. Rather than fabricate that narrative,
the UI shows the manual's own text verbatim with a citation the reader can
check. See `docs/BACKEND.md` for the integration point.

The bank's own `explanation` field IS shown, but labelled "Question bank note"
and visually separated from documentary evidence, so the two are never confused.

## State machine

```
IDLE → LOADING → READY → QUIZ_ACTIVE → GENERATING_EXPLANATIONS → RESULTS
                   ↑                                                |
                   +------------------------------------------------+
                            ERROR (from any state)
```
