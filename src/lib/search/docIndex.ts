/**
 * Runtime access to the pre-built document index.
 *
 * The index is produced by `scripts/build-doc-index.mjs` at build time and
 * fetched lazily — it is only needed once the user finishes a quiz, so it must
 * not be part of the initial page load (§25).
 */

export interface DocumentMeta {
  id: string;
  title: string;
  shortTitle: string;
  language: string;
  sourceFile: string;
  pages: number;
  chunks: number;
  lessons: Record<string, string>;
}

/** One retrievable passage, anchored to a real page of a real document. */
export interface DocChunk {
  index: number;
  document: string;
  /** Printed page label such as "7-32". `null` when none was recoverable. */
  page: string | null;
  lesson: number | null;
  lessonTitle: string | null;
  section: string | null;
  text: string;
}

export interface Bm25Index {
  postings: Record<string, number[]>;
  lengths: number[];
  avgLength: number;
}

export interface DocIndex {
  version: number;
  builtAt: string;
  documents: DocumentMeta[];
  chunkCount: number;
  index: Bm25Index;
  getChunk(index: number): DocChunk | null;
  getDocument(id: string): DocumentMeta | null;
}

interface RawDocIndex {
  version: number;
  builtAt: string;
  documents: DocumentMeta[];
  chunks: {
    document: string[];
    page: (string | null)[];
    lesson: (number | null)[];
    lessonTitle: (string | null)[];
    section: (string | null)[];
    text: string[];
  };
  index: Bm25Index;
}

export const DOC_INDEX_URL = 'data/doc-index.json';

export class DocIndexError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DocIndexError';
  }
}

function hydrate(raw: RawDocIndex): DocIndex {
  const { chunks } = raw;
  const documents = new Map(raw.documents.map((d) => [d.id, d]));

  return {
    version: raw.version,
    builtAt: raw.builtAt,
    documents: raw.documents,
    chunkCount: chunks.text.length,
    index: raw.index,
    getChunk(index: number): DocChunk | null {
      const text = chunks.text[index];
      if (text === undefined) return null;
      return {
        index,
        document: chunks.document[index] ?? '',
        page: chunks.page[index] ?? null,
        lesson: chunks.lesson[index] ?? null,
        lessonTitle: chunks.lessonTitle[index] ?? null,
        section: chunks.section[index] ?? null,
        text,
      };
    },
    getDocument(id: string): DocumentMeta | null {
      return documents.get(id) ?? null;
    },
  };
}

let cached: Promise<DocIndex> | null = null;

/** Fetch and memoise the index. Concurrent callers share one request. */
export function loadDocIndex(options: { baseUrl?: string } = {}): Promise<DocIndex> {
  if (cached) return cached;

  const base = options.baseUrl ?? import.meta.env.BASE_URL ?? '/';
  const url = `${base.replace(/\/$/, '')}/${DOC_INDEX_URL}`;

  cached = (async () => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new DocIndexError(`Reference documents unavailable (HTTP ${response.status})`);
    }
    const raw = (await response.json()) as RawDocIndex;
    if (!raw?.chunks?.text || !raw?.index?.postings) {
      throw new DocIndexError('The reference document index is malformed');
    }
    return hydrate(raw);
  })().catch((error: unknown) => {
    // Allow a later retry rather than caching the failure forever.
    cached = null;
    throw error;
  });

  return cached;
}

/** Test seam: build an index object from an in-memory payload. */
export function createDocIndex(raw: RawDocIndex): DocIndex {
  return hydrate(raw);
}

export function __resetDocIndexCache(): void {
  cached = null;
}
