/**
 * Conversions for this repo's "comma-joined list, or literal N/A" field
 * convention (leadAgency, partnerAgency, partnerPOC, policyLead, biopSME,
 * cor, nmfsPOC, associatedProjects — e.g. `leadAgency: 'BPA, BOR'`,
 * `associatedProjects: 'PRJ-2016-041, PRJ-2019-018'`). Real prod data
 * confirms these fields DO carry more than one value (e.g. a commitment's
 * BPA Policy Lead or BiOp SME can list two names) — checked live at
 * qa.cbfish.org — so the edit/create dialogs use esa-select's multi-select
 * (chip-mode) for these, and this is the storage-string ↔ selected-array
 * conversion between that control and the record.
 */

/** "BPA, BOR" → ["BPA", "BOR"]; "N/A" or empty → []. */
export function splitMultiValue(s?: string): string[] {
  if (!s || s.trim() === '' || s.trim() === 'N/A') return [];
  return s.split(',').map((v) => v.trim()).filter(Boolean);
}

/** ["BPA", "BOR"] → "BPA, BOR"; [] → "N/A" (matches the dataset's own convention for "none"). */
export function joinMultiValue(values: string[]): string {
  const clean = values.map((v) => v.trim()).filter(Boolean);
  return clean.length ? clean.join(', ') : 'N/A';
}
