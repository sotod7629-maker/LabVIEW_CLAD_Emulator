# Optional backend: narrative explanations via RAG

**Status: not deployed. This application is frontend-only today.**

This document exists because §49 of the brief asks for capability limits to be
stated rather than hidden.

## What works without a backend

Everything except one thing:

- Loading and validating the question bank
- Quiz generation, shuffling, navigation, grading
- Bilingual UI and question content
- **Document retrieval with real, verifiable page citations**
- PDF / CSV / JSON export, session persistence

The retrieval engine is genuine, not a mock: a BM25 index over the participant
guides, built at build time, queried in the browser. Citations point at real
printed page numbers.

## What requires a backend

One capability: **generating explanatory prose** — a short, pedagogical answer
to "why is the correct answer correct, and why is yours wrong?" that
*synthesises* the retrieved passages instead of quoting them.

That needs a language model. A browser cannot supply one, and no API key should
ever be shipped in frontend code. So the application does the honest thing: it
shows the retrieved passages verbatim with their citations, and states in the UI
that it does not write explanations itself.

## Minimal backend to add it

```
POST /explain
GET  /health
```

Request:

```jsonc
{
  "questionId": 71,
  "question": "¿Qué ocurre con los subdiagramas de una Case Structure…?",
  "correctAnswer": "No se ejecutan en absoluto…",
  "selectedAnswer": "Se ejecutan en paralelo…",
  "sourceHint": "Core 1 - Lección 9",
  "language": "es"
}
```

Response — note that `citation` is required per passage; the client discards any
passage without a resolvable document, so the service cannot return an
uncitable claim:

```jsonc
{
  "status": "documented",
  "passages": [{
    "excerpt": "…",
    "relevance": 0.82,
    "citation": {
      "documentId": "core1",
      "documentTitle": "LabVIEW Core 1",
      "sourceFile": "LVcore1_participantguide_English.md",
      "page": "9-5",
      "lesson": 9,
      "lessonTitle": "Executing Code Based on a Condition",
      "section": "B. Creating and Configuring Case Structures",
      "language": "en"
    }
  }]
}
```

Pipeline:

```
PDF/Markdown → text extraction → page-anchored chunking → embeddings
             → vector store → retriever → top-k chunks → LLM → explanation
```

The chunking and metadata work is already done — `scripts/build-doc-index.mjs`
produces exactly the `{document, page, section, text}` records such a pipeline
needs, so a backend can index the same artifact.

The generation prompt must require the model to:

1. use only the retrieved passages;
2. state that documentation is insufficient rather than fill a gap;
3. stay to 2–5 sentences;
4. relate the correct answer to the passage content;
5. cite document and page.

## Wiring it up

Set one environment variable:

```bash
VITE_EXPLANATION_API=https://your-service.example.com
```

`src/lib/explain/backendProvider.ts` is already written and already first in the
provider chain in `App.tsx`. It reports itself unavailable while the variable is
unset, so the local retrieval provider serves every request today. Once the
variable points at a healthy service, the backend takes over automatically and
falls back to local retrieval on any failure. No other code changes.
