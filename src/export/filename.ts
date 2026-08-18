/** Descriptive, filesystem-safe export file names. */

/** Strip characters that are invalid or awkward in file names on any platform. */
export function sanitizeFileName(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^[._-]+|[._-]+$/g, '')
    .slice(0, 80);
}

export function buildExportFileName(quizTitle: string, extension: string, date: Date = new Date()): string {
  const isoDate = date.toISOString().slice(0, 10);
  const base = sanitizeFileName(quizTitle) || 'quiz_results';
  return `${base}_${isoDate}.${extension}`;
}
