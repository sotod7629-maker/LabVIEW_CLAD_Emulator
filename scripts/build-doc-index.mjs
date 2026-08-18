/**
 * Build-time document indexer.
 *
 * Converts the LabVIEW participant guides (Markdown conversions of the original
 * PDFs) into a page-anchored, searchable index consumed by the explanation
 * engine at runtime.
 *
 * Why build-time: the guides total ~670 KB of prose. Parsing and tokenising them
 * in the browser on every load would be wasteful and slow. The emitted index is
 * a compact, immutable artifact.
 *
 * PAGE ANCHORING
 * --------------
 * The source PDFs print a footer on every page, which survived the Markdown
 * conversion in two alternating forms:
 *
 *   verso (left):  "4-4 | ni.com"
 *   recto (right): "© National Instruments Corporation | 4-5"
 *
 * and a running header naming the lesson:
 *
 *   "Lesson 4 Exploring an Existing Application"
 *
 * Those footers are genuine page boundaries from the original document, so the
 * page labels this script emits are REAL and independently verifiable by the
 * reader. Nothing here invents a page number: a chunk without a recovered
 * footer is emitted with `page: null` and the UI reports it as unavailable.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** @typedef {{id:string,file:string,title:string,shortTitle:string,language:string}} DocSpec */

/** @type {DocSpec[]} */
const DOCUMENTS = [
  {
    id: 'core1',
    file: 'source-documents/LVcore1_participantguide_English.md',
    title: 'LabVIEW Core 1 — Participant Guide',
    shortTitle: 'LabVIEW Core 1',
    language: 'en',
  },
  {
    id: 'core2',
    file: 'source-documents/LVcore2_participantguide_English.md',
    title: 'LabVIEW Core 2 — Participant Guide',
    shortTitle: 'LabVIEW Core 2',
    language: 'en',
  },
];

// --- Page-footer recognition -------------------------------------------------

// "4-4 | ni.com", "iv | ni.com", "A-3 | ni.com"
const VERSO_FOOTER = /^([A-Za-z0-9]+-\d+|[ivxlcdm]+)\s*\|\s*ni\.com\s*$/i;
// "© National Instruments Corporation | 4-5"
const RECTO_FOOTER = /\|\s*([A-Za-z0-9]+-\d+|[ivxlcdm]+)\s*$/;
const RECTO_PREFIX = /^©?\s*(National Instruments|Copyright)/i;
// Running header: "Lesson 4 Exploring an Existing Application"
const LESSON_HEADER = /^Lesson\s+(\d+)\s+(.+?)\s*$/;
// Boilerplate that appears on nearly every page and carries no information.
const NOISE = [
  /^Copyright\s+\d{4}\s+National Instruments\s*$/i,
  /^LabVIEW Core [12]\s*$/i,
  /^ni\.com\s*$/i,
  /^\s*$/,
];

/** Page labels like "4-5" -> lesson 4. Appendices ("A-3") and front matter return null. */
function lessonFromPageLabel(label) {
  if (!label) return null;
  const m = /^(\d+)-\d+$/.exec(label);
  return m ? Number(m[1]) : null;
}

function isNoise(line) {
  return NOISE.some((re) => re.test(line));
}

/**
 * A heading-ish line: Markdown headings, or short Title Case lines that the PDF
 * conversion flattened into plain text (very common in these guides).
 */
function looksLikeHeading(line) {
  if (/^#{1,6}\s+/.test(line)) return true;
  if (line.length > 70 || line.length < 3) return false;
  if (/[.:;,]$/.test(line)) return false;
  if (/^[\d•¬\-*]/.test(line)) return false;
  const words = line.split(/\s+/);
  if (words.length > 9) return false;
  const capitalised = words.filter((w) => /^[A-Z]/.test(w)).length;
  return capitalised / words.length >= 0.6;
}

function cleanHeading(line) {
  return line.replace(/^#{1,6}\s+/, '').replace(/^\*+|\*+$/g, '').trim();
}

/**
 * Collect the lesson-number -> lesson-title map from every running header in
 * the document. Titles are printed identically on each page of a lesson, so the
 * most frequent spelling per lesson number is authoritative. Deriving titles
 * this way (rather than from whichever header happened to precede a footer)
 * keeps a page's lesson title consistent with its page label.
 */
function collectLessonTitles(lines) {
  /** @type {Map<number, Map<string, number>>} */
  const counts = new Map();
  for (const raw of lines) {
    const m = LESSON_HEADER.exec(raw.trim());
    if (!m) continue;
    const num = Number(m[1]);
    const title = m[2].trim();
    if (!title) continue;
    if (!counts.has(num)) counts.set(num, new Map());
    const bucket = counts.get(num);
    bucket.set(title, (bucket.get(title) ?? 0) + 1);
  }
  /** @type {Map<number, string>} */
  const titles = new Map();
  for (const [num, bucket] of counts) {
    const best = [...bucket.entries()].sort((a, b) => b[1] - a[1])[0];
    if (best) titles.set(num, best[0]);
  }
  return titles;
}

/**
 * Split one document into page records using the printed footers as boundaries.
 * Text accumulated before a footer belongs to the page that footer terminates.
 */
function splitIntoPages(raw, doc) {
  const lines = raw.split(/\r?\n/);
  const lessonTitles = collectLessonTitles(lines);
  const pages = [];
  let buffer = [];
  // Running header seen while accumulating the current page. Used only as a
  // fallback for front matter, where page labels are roman numerals and carry
  // no lesson number.
  let headerLesson = null;

  const flush = (pageLabel) => {
    const text = buffer
      .filter((l) => !isNoise(l))
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    buffer = [];
    if (!text) {
      headerLesson = null;
      return;
    }
    // The page label is the authoritative source of the lesson number: "7-32"
    // is page 32 of lesson 7 by construction of the document.
    const lesson = lessonFromPageLabel(pageLabel) ?? headerLesson;
    pages.push({
      document: doc.id,
      page: pageLabel ?? null,
      lesson: lesson ?? null,
      lessonTitle: lesson != null ? (lessonTitles.get(lesson) ?? null) : null,
      text,
    });
    headerLesson = null;
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = (lines[i] ?? '').trim();

    const verso = VERSO_FOOTER.exec(line);
    if (verso) {
      flush(verso[1]);
      continue;
    }
    if (RECTO_PREFIX.test(line)) {
      const recto = RECTO_FOOTER.exec(line);
      if (recto) {
        flush(recto[1]);
        continue;
      }
    }
    const lessonHeader = LESSON_HEADER.exec(line);
    if (lessonHeader) {
      headerLesson = Number(lessonHeader[1]);
      continue;
    }
    buffer.push(line);
  }
  flush(null);
  return pages;
}

/**
 * Break a page into passage-sized chunks so retrieval can quote a focused
 * excerpt instead of a whole page. Chunks never span a page boundary, so every
 * chunk keeps an exact page citation.
 */
function chunkPage(page, targetChars = 700, minChars = 140) {
  const lines = page.text.split('\n');
  const chunks = [];
  let current = [];
  let section = null;
  let currentSection = null;

  const flush = () => {
    const text = current.join('\n').trim();
    current = [];
    if (!text) return;
    if (text.length < minChars && chunks.length) {
      // Too small to stand alone; fold into the previous chunk of this page.
      chunks[chunks.length - 1].text += '\n' + text;
      return;
    }
    chunks.push({ ...page, section: currentSection, text });
  };

  for (const line of lines) {
    if (looksLikeHeading(line)) {
      const heading = cleanHeading(line);
      if (current.join('\n').trim().length >= targetChars * 0.5) {
        flush();
        currentSection = heading;
      } else if (!currentSection) {
        currentSection = heading;
      }
      section = heading;
    }
    current.push(line);
    if (current.join('\n').length >= targetChars) {
      flush();
      currentSection = section;
    }
  }
  flush();
  return chunks.filter((c) => c.text.trim().length >= minChars);
}

// --- Tokenisation & BM25 -----------------------------------------------------

/**
 * Shared with the runtime searcher (src/lib/search/tokenize.ts). Kept in sync
 * deliberately: the index and the query must tokenise identically.
 */
const STOPWORDS = new Set(
  ('a an the of to in on for with and or is are be as at by from that this these those it its you your ' +
    'can will use used using when if then than each into over under more most other such no not only own ' +
    'same so also new i ii iii iv v vi you have has had do does did but they them their there here what ' +
    'which who whom how why all any both few nor too very s t just should now')
    .split(/\s+/),
);

function tokenize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 2 && t.length <= 32 && !STOPWORDS.has(t));
}

function buildIndex(chunks) {
  /** @type {Record<string, number[]>} postings: term -> [chunkIdx, tf, chunkIdx, tf, ...] */
  const postings = Object.create(null);
  const lengths = new Array(chunks.length).fill(0);

  chunks.forEach((chunk, idx) => {
    const tokens = tokenize(`${chunk.section ?? ''} ${chunk.text}`);
    lengths[idx] = tokens.length;
    const tf = new Map();
    for (const token of tokens) tf.set(token, (tf.get(token) ?? 0) + 1);
    for (const [term, freq] of tf) {
      (postings[term] ??= []).push(idx, freq);
    }
  });

  return {
    postings,
    lengths,
    avgLength: lengths.reduce((a, b) => a + b, 0) / (lengths.length || 1),
  };
}

// --- Main --------------------------------------------------------------------

function main() {
  const allChunks = [];
  const docMeta = [];

  for (const doc of DOCUMENTS) {
    const raw = readFileSync(join(ROOT, doc.file), 'utf8');
    const lessonTitles = collectLessonTitles(raw.split(/\r?\n/));
    const pages = splitIntoPages(raw, doc);
    let chunkCount = 0;
    for (const page of pages) {
      for (const chunk of chunkPage(page)) {
        allChunks.push(chunk);
        chunkCount += 1;
      }
    }
    const withPage = pages.filter((p) => p.page).length;
    docMeta.push({
      id: doc.id,
      title: doc.title,
      shortTitle: doc.shortTitle,
      language: doc.language,
      sourceFile: doc.file.split('/').pop(),
      pages: withPage,
      chunks: chunkCount,
      lessons: Object.fromEntries([...lessonTitles].sort((a, b) => a[0] - b[0])),
    });
    console.log(
      `${doc.shortTitle}: ${pages.length} page blocks (${withPage} with a recovered page label), ${chunkCount} chunks`,
    );
  }

  const index = buildIndex(allChunks);

  // Store chunks in a column-oriented shape: markedly smaller than an array of
  // objects once gzipped, and trivial to rehydrate.
  const payload = {
    version: 2,
    builtAt: new Date().toISOString().slice(0, 10),
    documents: docMeta,
    chunks: {
      document: allChunks.map((c) => c.document),
      page: allChunks.map((c) => c.page),
      lesson: allChunks.map((c) => c.lesson),
      lessonTitle: allChunks.map((c) => c.lessonTitle),
      section: allChunks.map((c) => c.section),
      text: allChunks.map((c) => c.text),
    },
    index,
  };

  const outPath = join(ROOT, 'public/data/doc-index.json');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(payload));
  const bytes = readFileSync(outPath).length;
  console.log(
    `\nWrote ${outPath}\n  chunks: ${allChunks.length}\n  terms:  ${Object.keys(index.postings).length}\n  size:   ${(bytes / 1024 / 1024).toFixed(2)} MB`,
  );
}

main();
