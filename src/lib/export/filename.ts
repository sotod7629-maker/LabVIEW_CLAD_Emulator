/**
 * Export filename construction (§23).
 */

/** Strip characters that are invalid or awkward in filenames across platforms. */
export function sanitizeFilename(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^[._-]+|[._-]+$/g, '')
    .slice(0, 80);
}

export function buildFilename(options: {
  quizName: string;
  extension: 'pdf' | 'csv' | 'json';
  date?: Date;
  suffix?: string;
}): string {
  const date = (options.date ?? new Date()).toISOString().slice(0, 10);
  const base = sanitizeFilename(options.quizName) || 'quiz_results';
  const suffix = options.suffix ? `_${sanitizeFilename(options.suffix)}` : '';
  return `${base}${suffix}_${date}.${options.extension}`;
}

/** Trigger a browser download for a generated blob. */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Revoke on the next tick so the download has started.
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
