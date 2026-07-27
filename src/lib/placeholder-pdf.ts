/**
 * Generates a minimal valid one-page PDF client-side and triggers its
 * download — for prototype "view/download document" affordances that have
 * no real file behind them (no server, no real uploaded documents; see
 * cbf-password-gate.astro's note on this spoke's static-site constraint).
 * Extracted from cbf-vendor-dashboard-invoices.astro when
 * cbf-rme-contract-reports-grid.astro became a second consumer.
 */
const pdfEscape = (s: string): string => s.replace(/([()\\])/g, '\\$1');

export function makePlaceholderPdf(filename: string, subtitle: string): Blob {
  const body =
    `BT /F1 18 Tf 60 740 Td (${pdfEscape(filename)}) Tj ` +
    `/F1 11 Tf 0 -26 Td (${pdfEscape(subtitle)}) Tj ` +
    `0 -18 Td (Columbia Basin Fish & Wildlife Program — prototype placeholder) Tj ET`;
  const objs = [
    '<</Type/Catalog/Pages 2 0 R>>',
    '<</Type/Pages/Kids[3 0 R]/Count 1>>',
    '<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Resources<</Font<</F1 5 0 R>>>>/Contents 4 0 R>>',
    `<</Length ${body.length}>>\nstream\n${body}\nendstream`,
    '<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>',
  ];
  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [];
  objs.forEach((o, i) => { offsets.push(pdf.length); pdf += `${i + 1} 0 obj\n${o}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((off) => { pdf += `${String(off).padStart(10, '0')} 00000 n \n`; });
  pdf += `trailer\n<</Size ${objs.length + 1}/Root 1 0 R>>\nstartxref\n${xref}\n%%EOF`;
  return new Blob([pdf], { type: 'application/pdf' });
}

export function downloadPlaceholderPdf(filename: string, subtitle: string): void {
  const url = URL.createObjectURL(makePlaceholderPdf(filename, subtitle));
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
