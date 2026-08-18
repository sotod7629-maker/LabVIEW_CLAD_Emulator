/**
 * Empty stub for jsPDF's optional peer dependencies.
 *
 * jsPDF dynamically imports html2canvas and dompurify to support `doc.html()`,
 * a DOM-rasterising API this application never calls — the PDF is composed from
 * text primitives so it stays selectable and searchable. Aliasing those imports
 * here keeps ~370 KB of unused code out of the build entirely.
 */
export default {};
