// The /lib-mvp screen's DEMO state — the two prototype controls (Reset, Clear)
// that sit in the role switch strip. A FORK of src/data/lib-demo.mjs with its own
// storage key and document attribute, so clearing one prototype never blanks the
// other in the same tab.
//
// WHY THIS EXISTS
// The screen is demoed live, repeatedly. Between runs:
//
//   RESET   put the seeded budget back exactly as it ships — every edit typed
//           during the last run gone, the COR's marks gone, the role lens still
//           where the presenter left it.
//   CLEAR   show the screen as a vendor genuinely starting from nothing: no cost
//           lines, no indirect rate, a draft review with no marks (the
//           first-run empty state).
//
// HOW IT WORKS
// The seeded budget is SERVER-RENDERED (src/data/lib-mvp.mjs) and every edit
// lives in the mount scripts' working copies, so both controls write a flag and
// reload. Reset is a reload with the stored review (REVIEW_KEY in
// lib-mvp-review.mjs) dropped. Clear also sets BLANK_KEY.
//
// ── WHERE THE STATE IS READ FROM ────────────────────────────────────────────
// The store is written by ONE place — the demo controls — and read by ONE place:
// their inline pre-paint script, which turns it into `<html data-cbf-libmvp-blank>`.
// Every surface asks isBlank(), which reads that ATTRIBUTE and never the store,
// so a page can only be blank if it mounted the controls that can un-blank it.

/** sessionStorage key: '1' while /lib-mvp is showing a CLEARED budget. */
export const BLANK_KEY = 'cbf-libmvp-blank';

/** The `<html>` attribute the pre-paint script sets (dataset key `cbfLibmvpBlank`). */
export const BLANK_ATTR = 'data-cbf-libmvp-blank';

/**
 * True when THIS page is rendering the cleared budget. False on SSR, and false
 * on any page that does not mount the controls.
 */
export function isBlank() {
  if (typeof document === 'undefined') return false;
  return 'cbfLibmvpBlank' in document.documentElement.dataset;
}

/**
 * The indirect block with nothing picked. Same shape as `indirectConfig` in
 * src/data/lib-mvp.mjs, so priceLines() takes it without a special case — and
 * the indirect gate fails on it, as it should.
 */
export const blankConfig = () => ({
  rateId: null,
  rate: 0,
  base: '',
  label: '',
  referenceDoc: '',
  status: '',
  effectiveStart: '',
  effectiveEnd: '',
  subawardCap: false,
  appliesTo: [],
});
