# CLAD Assessment — LabVIEW Core 1 & Core 2

A bilingual (Español / English) web application that generates practice quizzes from a JSON
question bank, grades them, and explains the answers using reference PDFs supplied by the user.

Built as a client-side React + TypeScript application. No backend, no data leaves the browser.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Type-check and produce a static bundle in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run the test suite (116 tests) |
| `npm run typecheck` | Type-check without emitting |

The build output in `dist/` is a static site — any static host will serve it. Asset paths are
relative, so it also works from a subdirectory.

---

## What it does

1. **Loads a question bank.** The bundled bank (`public/data/cuestionario_CLAD_300.json`,
   300 questions) is fetched at runtime, so it can be swapped without rebuilding. A different
   JSON file can also be loaded from the setup screen.
2. **Validates it.** Missing ids, duplicate ids, absent options, and correct answers that match
   no option are all detected. Questions with structural errors are excluded rather than
   silently repaired; the setup screen reports what was found.
3. **Generates a quiz** of 1–100 questions, optionally filtered by topic and difficulty, with
   both question order and answer order randomized.
4. **Grades it deterministically.** Unanswered questions are tracked separately from incorrect
   ones throughout.
5. **Explains the answers from your PDFs.** Reference documents are indexed in the browser and
   searched for passages that bear on each question. See below.
6. **Exports** the results as PDF, CSV or JSON — all results, incorrect answers only, or
   everything that needs review.

---

## The question bank

The bundled file is Spanish-only and uses this schema:

```json
{
  "metadata":   { "title": "…", "total_questions": 300, "generated_from": ["…"], "version": "1.0" },
  "categories": ["Entorno de LabVIEW", "Dataflow", "…"],
  "questions": [
    {
      "id": 1,
      "category": "Entorno de LabVIEW",
      "difficulty": "básico",
      "question": "¿Cuál de las siguientes ventanas…?",
      "options": { "a": "Panel Frontal", "b": "Diagrama de bloques", "c": "…", "d": "…" },
      "correct_answer": "a",
      "explanation": "El Panel Frontal es la interfaz de usuario del VI…",
      "source": "Core 1 - Lección 1"
    }
  ]
}
```

**Note on this data: all 300 correct answers are `"a"`.** Answer-order randomization is therefore
not cosmetic — with it off, the quiz is trivially gameable. It is on by default, and the setup
screen warns if you turn it off. A test asserts that shuffling moves the correct answer away from
the first position while never changing *which* option is correct.

The parser also accepts several common variations (options as an array, numeric correct-answer
indices, per-language `{ es, en }` text) so a differently shaped bank can be loaded without a code
change. It never invents data: anything it cannot resolve becomes a validation error.

### Language

The bundled bank has no English translations. The interface is fully bilingual, but question text
is **not** machine-translated — it is shown in Spanish with a visible notice. If a bank supplies
`{ "es": "…", "en": "…" }` for prompts and options, those translations are used automatically.

---

## Explanations, and what is actually true about them

This is the part where it is easiest to mislead a user, so the rules are strict.

Every explanation carries an explicit **provenance**, and the three kinds are rendered
differently:

| Provenance | What it is | How it is shown |
| --- | --- | --- |
| `document-extract` | Passages retrieved from a PDF **you** loaded, quoted verbatim | Accent-bordered block, with file name, page number, section heading and a relevance score |
| `question-bank` | The `explanation` field shipped inside the JSON | Neutral block labelled "question bank annotation", with its `source` string labelled a *declared reference* |
| `none` | Nothing was found | An explicit message: *"No supporting information was found in the provided documents."* |

Concretely:

- **Nothing is generated or paraphrased.** Document evidence is a verbatim quotation. Where
  non-adjacent sentences are joined, a `[…]` marker shows the elision.
- **Citations are read from the file, never reconstructed.** Page numbers and section headings are
  captured while chunking. If no heading precedes a passage, the section is simply omitted.
- **The bank's own `source` string is never presented as a PDF locator.** `"Core 1 - Lección 6"` is
  a claim made by the data file; it is labelled as such and is never given a page number.
- **A weak match is visible as a weak match.** The retrieval score is displayed next to each
  citation, and hits below a threshold are discarded entirely rather than shown as evidence.
- **With no PDFs loaded**, the app says so, and shows the bank annotation clearly marked as
  unverified.

### How retrieval works

PDFs are parsed with pdf.js in a web worker. Page text is split into overlapping passages tagged
with document, page and nearest heading, then indexed with **Okapi BM25**.

For each question the query is built in priority order — terms from the correct answer weighted
highest, then the question prompt, then the selected answer (only when it was wrong), then the
category as a weak topical hint. The top passages are reduced to the sentences that actually carry
the matched terms. Results are cached by `questionId + language + corpus fingerprint`.

BM25 rather than embeddings, deliberately: embeddings need either a model download or a server,
whereas BM25 is exact, instant in the browser, and *explainable* — the app can show which terms
matched.

### There is no backend, and the app does not pretend otherwise

Semantic retrieval and LLM-written explanations would need a server. That server does not exist
here, so nothing simulates it. What does exist is the seam: `ExplanationProvider` is an interface,
`RemoteRagProvider` implements it against a documented HTTP contract, and it reports itself
unavailable unless `VITE_RAG_ENDPOINT` is set. Point that variable at a real service and the app
uses it, preferring it over local retrieval and falling back if it fails.

`docs/ARCHITECTURE.md` specifies the endpoint contract and what a compliant server must and must
not return.

---

## Accessibility

- Answer options are real `<input type="radio">` elements, so keyboard behaviour and screen-reader
  semantics come from the platform rather than from ARIA bolted onto `<div>`s.
- Every outcome is carried by a symbol and a text label as well as color.
- Focus is visible everywhere, moves to the question on navigation, and is trapped in dialogs and
  restored on close.
- Touch targets are at least 44 px; there is no horizontal page scroll at any breakpoint.
- `prefers-reduced-motion` is respected; `prefers-color-scheme` drives a full dark theme.

## Privacy

PDFs and question banks are read with the File API and processed in the page. Nothing is uploaded.
The only persisted state is the in-progress quiz (so a reload offers to resume) and the language
preference, both in `localStorage`.

## Project layout

```
src/
  data/          Schema parsing and validation      (questionParser, validation, types)
  quiz/          Generation, randomization, scoring (generateQuiz, scoring, rng, persistence)
  documents/     PDF text extraction and BM25 index (pdfTextExtractor, documentIndex, tokenizer)
  explanations/  Providers, orchestration, caching  (localDocumentProvider, remoteRagProvider, …)
  export/        PDF / CSV / JSON writers
  i18n/          es.json, en.json and the provider
  components/    Presentation only
  hooks/         Bank loading, document management
```

Each layer depends only on the ones below it. The UI contains no evaluation, parsing, retrieval or
export logic.
