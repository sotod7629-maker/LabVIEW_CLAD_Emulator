# CLAD Simulator

A practice assessment platform for the **Certified LabVIEW Associate Developer**
exam, built on a 300-question Spanish bank covering LabVIEW Core 1 and Core 2.

Its distinguishing feature is that explanations are **retrieved from the official
participant guides and cited to a real page number** — or reported as
unavailable. The application never writes an explanation and presents it as if a
manual backed it up.

---

## Quick start

```bash
npm install
npm run build:index   # build the document index from source-documents/
npm run dev           # http://localhost:5173
```

Other commands:

```bash
npm run build       # build:index + typecheck + production bundle
npm run preview     # serve the production build
npm test            # 121 tests
```

## What it does

- Generate a quiz of **1–100 questions**, optionally filtered by topic
- **Spanish / English**, covering the interface, questions, results and exports
- Question and option order randomised, with answers preserved during navigation
- Confirmation before submitting with unanswered questions
- Results with score, per-question review, filters, and collapse/expand
- **Export to PDF, CSV and JSON** — all results or incorrect answers only
- Resume an interrupted attempt after an accidental reload

## Data sources, and the rule that separates them

| Source | Role |
|---|---|
| `public/data/cuestionario_CLAD_300.json` | **Authoritative** for questions and answers. Never modified. |
| `public/data/questions.en.json` | English overlay. Cannot affect grading — see below. |
| `source-documents/*.md` | **Documentary** source for explanations. Indexed at build time. |

Three properties are enforced, not merely intended:

**The bank is never altered.** It ships byte-identical to the file provided. No
question, option or correct answer is rewritten anywhere in the codebase.

**Translations cannot change which answer is correct.** The English overlay is a
separate file keyed by question id and *original option letter*, carrying no
answer key. The merge script copies only `question`, `options` and
`explanation`. Grading always runs against the Spanish bank. A test asserts a
100-question quiz scores identically in both languages.

**Citations are real.** Page numbers are recovered from the guides' own printed
page footers, not generated. Where no page can be recovered, the UI says so.

## How explanations work

```
question + correct answer
        ↓  Spanish→English term bridge
   BM25 over 1087 page-anchored chunks
        ↓  lesson boost from the bank's own source field
      evidence gate
        ↓
  verbatim passage + citation      ·OR·      "insufficient documentation"
```

The gate requires a passage to actually mention the concept the question names,
plus substantial vocabulary overlap. Calibrated against 14 questions whose
subject appears **zero times** in either guide and 10 the guides clearly cover:

- **244 / 300** questions get documented evidence
- **0 / 14** absent topics are ever paired with a passage
- **9 / 10** well-covered topics are recovered

The remaining 56 report *"No sufficient information was found in the provided
documents"* — which is the correct answer when the guides genuinely do not cover
a topic. `npm test` reproduces these numbers and fails if a leak reappears.

### A limitation stated plainly

The application does **not** compose narrative prose explaining *why* an answer
is right. That requires a language model, which a frontend-only application
cannot provide. It shows the manual's own words with a citation you can verify
instead. `docs/BACKEND.md` specifies the minimal service that would add it; the
client for it is already written and wired, and activates on one environment
variable.

The bank's own `explanation` field is shown too, but clearly labelled
**"Question bank note"** and visually separated from documentary evidence.

## Project layout

```
public/data/         question bank, English overlay, built document index
source-documents/    LabVIEW Core 1 / Core 2 participant guides (Markdown)
scripts/             build-doc-index.mjs, merge-translations.mjs
translations-src/    per-batch English translation sources
src/
  lib/               framework-free domain logic
    data/            schema, validation, translation overlay, loading
    quiz/            generation, seeded shuffling, scoring
    search/          tokenizer, term bridge, BM25
    explain/         providers, evidence gate, caching
    export/          PDF, CSV, JSON
    i18n/            es / en dictionaries
    storage/         session persistence
  components/        React UI
  styles/            design tokens and stylesheets
docs/                ARCHITECTURE.md, BACKEND.md
```

## Design notes

**Stack.** Vite + React 18 + TypeScript. Styling is hand-written CSS with design
tokens — no CSS framework, since the surface is small enough that tokens are
clearer than a dependency and keep full control of the dark theme and contrast.

**Dependencies.** One runtime dependency beyond React: **jsPDF**, for a real
downloadable PDF with selectable text. `html2pdf` was rejected because it
rasterises (text stops being searchable) and `pdfmake` is larger for no benefit.
jsPDF loads lazily, and its unused `.html()` path is aliased away, keeping ~370 KB
out of the bundle.

**Accessibility.** Answer options are a proper radiogroup: arrow keys move
between them, Home/End jump to the ends, and the group is one tab stop. Outcome
is never signalled by colour alone — every coloured state carries an icon and a
text label. Focus is visible throughout, dialogs trap focus and restore it, and
`prefers-reduced-motion` is honoured.

**Responsive.** Single-column layout with 44 px minimum touch targets; verified
to have no horizontal scroll at 390 px.

**Security.** All content renders as text through React, never `innerHTML`. CSV
export prefixes leading `=`, `+`, `-` and `@` to defuse spreadsheet formula
injection. Storage access is defensive against private-mode and quota failures.

## Testing

121 tests covering the cases the brief calls out:

- valid/invalid banks, duplicate ids, invalid correct answers, malformed options
- 1, 100, and fewer-than-requested question counts
- all correct, all incorrect, all unanswered, mixed
- **shuffle integrity across 40 seeds × 100 questions**
- score arithmetic, unanswered kept distinct from incorrect
- export contents and filename sanitisation
- retrieval calibration against verified-present and verified-absent topics

## Attribution

The LabVIEW Core 1 and Core 2 participant guides are © National Instruments and
are included here as the documentary source for a study aid. This project is not
affiliated with or endorsed by NI.
