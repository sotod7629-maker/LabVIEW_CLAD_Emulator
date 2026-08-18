/**
 * PDF → per-page plain text, using pdf.js in a worker.
 *
 * Why the dependency: there is no browser API for extracting text from a PDF,
 * and pdf.js is the reference implementation (it is what Firefox ships).
 * The alternative — a server-side extractor — would require a backend this
 * project does not have; see `docs/ARCHITECTURE.md`.
 *
 * The module is imported dynamically so the ~1 MB engine is only fetched when
 * the user actually adds a document.
 */
import { DocumentLoadError, type DocumentPage, type ReferenceDocument } from './types';

/** Guards against loading a file large enough to exhaust browser memory. */
export const MAX_PDF_BYTES = 60 * 1024 * 1024;

const PDF_MAGIC = '%PDF-';

let pdfjsModulePromise: Promise<typeof import('pdfjs-dist')> | null = null;

async function loadPdfjs(): Promise<typeof import('pdfjs-dist')> {
  if (!pdfjsModulePromise) {
    pdfjsModulePromise = (async () => {
      const pdfjs = await import('pdfjs-dist');
      const workerUrl = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
      pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
      return pdfjs;
    })();
  }
  return pdfjsModulePromise;
}

/** pdf.js text items carry positions; we use them to rebuild line breaks. */
interface TextItemLike {
  str?: string;
  transform?: number[];
  hasEOL?: boolean;
}

/**
 * Reassemble a page's text items into lines. pdf.js emits fragments in reading
 * order but without newlines; grouping by vertical position keeps headings on
 * their own line, which is what makes section detection possible.
 */
function itemsToText(items: readonly TextItemLike[]): string {
  const lines: Array<{ y: number; parts: string[] }> = [];
  const TOLERANCE = 2;

  for (const item of items) {
    const text = item.str ?? '';
    if (!text) continue;
    const y = item.transform?.[5] ?? 0;
    const line = lines.find((candidate) => Math.abs(candidate.y - y) <= TOLERANCE);
    if (line) line.parts.push(text);
    else lines.push({ y, parts: [text] });
  }

  return lines
    .sort((a, b) => b.y - a.y)
    .map((line) => line.parts.join('').replace(/\s+/g, ' ').trim())
    .filter((line) => line.length > 0)
    .join('\n');
}

export interface ExtractOptions {
  /** Progress callback, for the document-loading UI. */
  onProgress?: (page: number, total: number) => void;
  signal?: AbortSignal;
}

/**
 * Extract text from a PDF file.
 *
 * Throws `DocumentLoadError` with a typed code for every failure mode the UI
 * needs to distinguish (not a PDF, oversized, corrupt, encrypted, or a scanned
 * document with no text layer).
 */
export async function extractPdfDocument(file: File, options: ExtractOptions = {}): Promise<ReferenceDocument> {
  if (file.size > MAX_PDF_BYTES) {
    throw new DocumentLoadError('too-large', file.name);
  }

  const buffer = await file.arrayBuffer();
  const header = new TextDecoder('latin1').decode(buffer.slice(0, 1024));
  // Trust the bytes, not the extension or the reported MIME type.
  if (!header.includes(PDF_MAGIC)) {
    throw new DocumentLoadError('not-a-pdf', file.name);
  }

  const pdfjs = await loadPdfjs();
  let pdf: Awaited<ReturnType<typeof pdfjs.getDocument>['promise']>;
  try {
    pdf = await pdfjs.getDocument({ data: new Uint8Array(buffer), isEvalSupported: false }).promise;
  } catch (error) {
    const name = (error as { name?: string })?.name;
    if (name === 'PasswordException') throw new DocumentLoadError('encrypted', file.name);
    throw new DocumentLoadError('corrupt', file.name, error instanceof Error ? error.message : undefined);
  }

  const pages: DocumentPage[] = [];
  let extractedCharacters = 0;

  try {
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
      if (options.signal?.aborted) break;
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();
      const text = itemsToText(content.items as TextItemLike[]);
      // Release page resources immediately; a 500-page manual would otherwise
      // keep every page's operator list in memory.
      page.cleanup();
      pages.push({ pageNumber, text });
      extractedCharacters += text.length;
      options.onProgress?.(pageNumber, pdf.numPages);
    }
  } finally {
    await pdf.destroy();
  }

  if (extractedCharacters === 0) {
    // Almost always a scanned document. We say so instead of indexing nothing.
    throw new DocumentLoadError('no-extractable-text', file.name);
  }

  return {
    id: `doc-${file.name}-${file.size}-${file.lastModified}`,
    name: file.name,
    pageCount: pages.length,
    pages,
    extractedCharacters,
    sizeBytes: file.size,
    addedAt: new Date().toISOString(),
  };
}
