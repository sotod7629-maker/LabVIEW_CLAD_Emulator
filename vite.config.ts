import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // jsPDF lazily imports these for doc.html(), which this app never calls.
      html2canvas: fileURLToPath(new URL('./src/lib/export/stubs/empty.ts', import.meta.url)),
      dompurify: fileURLToPath(new URL('./src/lib/export/stubs/empty.ts', import.meta.url)),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // jsPDF is only needed on the results screen; keep it out of the
          // initial bundle so the setup screen stays fast to load.
          pdf: ['jspdf'],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
});
