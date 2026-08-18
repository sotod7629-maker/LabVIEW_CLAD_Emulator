/**
 * Reference-document manager.
 *
 * The panel is explicit about what the documents are for and what happens
 * without them: with no PDFs loaded, the app says so rather than quietly
 * degrading to bank-only explanations.
 */
import { useCallback, useRef, useState } from 'react';
import type { DocumentLoadFailure, DocumentProgress } from '../hooks/useReferenceDocuments';
import type { ReferenceDocument } from '../documents/types';
import { useI18n, type TranslationKey } from '../i18n';
import { Callout, ProgressBar } from './primitives';

export function DocumentPanel({
  documents,
  chunkCount,
  totalPages,
  progress,
  failures,
  maxBytes,
  onAddFiles,
  onRemove,
}: {
  documents: readonly ReferenceDocument[];
  chunkCount: number;
  totalPages: number;
  progress: DocumentProgress | null;
  failures: readonly DocumentLoadFailure[];
  maxBytes: number;
  onAddFiles: (files: File[]) => void;
  onRemove: (documentId: string) => void;
}) {
  const { t } = useI18n();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      onAddFiles([...fileList]);
    },
    [onAddFiles],
  );

  const openPicker = () => inputRef.current?.click();

  return (
    <div className="document-panel">
      {/* The enclosing disclosure already carries the heading; repeating it here
          would just be noise. */}
      <p className="document-panel__intro">{t('documents.intro')}</p>

      <div
        className={`dropzone ${isDragging ? 'is-dragging' : ''}`.trim()}
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openPicker();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
      >
        <span className="dropzone__icon" aria-hidden="true">
          ＋
        </span>
        <span className="dropzone__text">{t('documents.dropHint')}</span>
        <input
          ref={inputRef}
          className="visually-hidden"
          type="file"
          accept="application/pdf,.pdf"
          multiple
          onChange={(event) => {
            handleFiles(event.target.files);
            // Allow re-selecting the same file after a removal.
            event.target.value = '';
          }}
          aria-label={t('documents.add')}
        />
      </div>

      {progress ? (
        <div className="document-progress" aria-live="polite">
          <p className="document-progress__label">
            {t('documents.processing', {
              name: progress.fileName,
              page: progress.page,
              total: progress.totalPages,
            })}
          </p>
          <ProgressBar value={progress.page} max={progress.totalPages} label={t('documents.heading')} />
        </div>
      ) : null}

      {failures.map((failure) => (
        <Callout key={`${failure.fileName}-${failure.code}`} tone="danger" icon="!">
          {t(`documents.error.${failure.code}` as TranslationKey, {
            name: failure.fileName,
            limit: Math.round(maxBytes / (1024 * 1024)),
          })}
        </Callout>
      ))}

      {documents.length === 0 ? (
        <Callout tone="warning" icon="i">
          {/* Every document the user offered failed, which is a different
              situation from simply not having added any yet. */}
          {failures.length > 0 ? t('error.documentsUnavailable') : t('documents.none')}
        </Callout>
      ) : (
        <>
          <p className="document-panel__summary">
            {t('documents.loaded', { count: documents.length, pages: totalPages, chunks: chunkCount })}
          </p>
          <ul className="document-list">
            {documents.map((document) => (
              <li key={document.id} className="document-list__item">
                <span className="document-list__icon" aria-hidden="true">
                  PDF
                </span>
                <span className="document-list__meta">
                  <span className="document-list__name">{document.name}</span>
                  <span className="document-list__detail">
                    {t('documents.pageCount', { count: document.pageCount })}
                  </span>
                </span>
                <button
                  type="button"
                  className="button button--ghost button--icon"
                  onClick={() => onRemove(document.id)}
                  aria-label={t('documents.remove', { name: document.name })}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
