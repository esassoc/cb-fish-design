/**
 * Conversions between this repo's mock-data date convention ("M/D/YYYY", e.g.
 * "3/1/2025" — parsed in LOCAL time by `new Date()`) and the ISO
 * "YYYY-MM-DD" that esa-date-picker's underlying native date input requires.
 *
 * Extracted from cbf-crs-commitment-documents.astro (the first place this was
 * needed) once a second consumer (cbf-crs-commitment-basics.astro's edit
 * dialog, for startDate/endDate) needed the identical conversion — see that
 * component's original comments for the full timezone rationale:
 * `new Date()` parses a date-only ISO string as UTC midnight, but
 * `Intl.DateTimeFormat` (grid-chrome.ts's dateFmt) and this repo's other date
 * math read/format in LOCAL time — round-tripping an ISO string through a
 * Date object shifts the day by one in any timezone behind UTC. These two
 * functions do the conversion via calendar-component math instead, so no
 * caller needs to re-derive that reasoning.
 */

/** "M/D/YYYY" (or anything `new Date()` parses in local time) → ISO "YYYY-MM-DD". */
export function toISODate(s?: string): string | undefined {
  if (!s) return undefined;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return undefined;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** ISO "YYYY-MM-DD" (the date picker's own output) → "M/D/YYYY", pure string math. */
export function isoToUSDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return undefined;
  return `${m}/${d}/${y}`;
}
