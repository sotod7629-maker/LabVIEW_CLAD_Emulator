/**
 * Manages the set of reference PDFs and the search index built from them.
 *
 * Everything happens in the browser: the files are never uploaded. Extraction
 * is sequential so a large batch reports honest per-file progress instead of
 * saturating memory with several PDFs at once.
 */
import { useCallback, useMemo, useRef, useState } from 'react';
import { DocumentIndex } from '../documents/documentIndex';
import { extractPdfDocument, MAX_PDF_BYTES } from '../documents/pdfTextExtractor';
import { DocumentLoadError, type DocumentLoadErrorCode, type ReferenceDocument } from '../documents/types';

export interface DocumentLoadFailure {
  fileName: string;
  code: DocumentLoadErrorCode;
}

export interface DocumentProgress {
  fileName: string;
  page: number;
  totalPages: number;
}

export function useReferenceDocuments() {
  const [documents, setDocuments] = useState<ReferenceDocument[]>([]);
  const [progress, setProgress] = useState<DocumentProgress | null>(null);
  const [failures, setFailures] = useState<DocumentLoadFailure[]>([]);
  const busy = useRef(false);

  const addFiles = useCallback(async (files: readonly File[]) => {
    if (busy.current) return;
    busy.current = true;
    setFailures([]);

    try {
      for (const file of files) {
        try {
          const document = await extractPdfDocument(file, {
            onProgress: (page, totalPages) => setProgress({ fileName: file.name, page, totalPages }),
          });
          setDocuments((previous) =>
            // Re-adding the same file replaces it rather than duplicating the index.
            previous.some((entry) => entry.id === document.id)
              ? previous.map((entry) => (entry.id === document.id ? document : entry))
              : [...previous, document],
          );
        } catch (error) {
          const code = error instanceof DocumentLoadError ? error.code : 'unknown';
          setFailures((previous) => [...previous, { fileName: file.name, code }]);
        }
      }
    } finally {
      setProgress(null);
      busy.current = false;
    }
  }, []);

  const removeDocument = useCallback((documentId: string) => {
    setDocuments((previous) => previous.filter((document) => document.id !== documentId));
  }, []);

  const clearFailures = useCallback(() => setFailures([]), []);

  // Rebuilding on change is cheap (a few hundred pages index in well under a
  // second) and keeps the index provably consistent with the document set.
  const index = useMemo(() => DocumentIndex.build(documents), [documents]);

  /** Changes whenever the corpus changes; used as part of the explanation cache key. */
  const corpusFingerprint = useMemo(
    () => documents.map((document) => document.id).sort().join('|') || 'no-documents',
    [documents],
  );

  const totalPages = useMemo(
    () => documents.reduce((sum, document) => sum + document.pageCount, 0),
    [documents],
  );

  return {
    documents,
    index,
    corpusFingerprint,
    totalPages,
    progress,
    failures,
    addFiles,
    removeDocument,
    clearFailures,
    maxBytes: MAX_PDF_BYTES,
  };
}
