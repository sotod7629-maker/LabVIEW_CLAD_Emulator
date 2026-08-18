/** Trigger a browser download for a generated export. */
export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Revoke on the next frame; revoking synchronously can cancel the download
  // in some browsers.
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function downloadText(text: string, fileName: string, mimeType: string): void {
  downloadBlob(new Blob([text], { type: `${mimeType};charset=utf-8` }), fileName);
}
