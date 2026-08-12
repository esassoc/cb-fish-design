// The LIB screen's DEMO state — the two prototype controls that sit in the role
// switch strip at the top of /lib-entry.
//
// WHY THIS EXISTS
// The screen is demoed live, repeatedly, in front of people. Two things have to
// be true between runs:
//
//   RESET   put the seeded budget back exactly as it ships — every edit typed
//           during the last run gone, the COR's marks gone, the role lens still
//           where the presenter left it.
//   CLEAR   show the screen as a vendor genuinely starting from nothing: no cost
//           lines, no trips, no indirect rate, no review on it.
//
// HOW IT WORKS
// The seeded budget is SERVER-RENDERED (src/data/lib-entry.mjs) and every edit
// lives in the mount scripts' working copies, so both controls are reached the
// same way: write a flag, reload the page, and let each surface start from the
// state the flag names. Reset therefore needs no flag at all — it is a reload
// with the stored review dropped. Clear sets BLANK_KEY, and each LIB surface
// asks isBlank() on mount and empties itself.
//
// sessionStorage, not localStorage, and for the same reason the review uses it:
// real enough to survive the reloads the role switch causes, gone when the tab
// closes, so nobody inherits a half-cleared budget on a fresh visit.
//
// ── WHERE THE STATE IS READ FROM ────────────────────────────────────────────
// The store is written by ONE place — the demo controls — and read by ONE place:
// the inline pre-paint script in cbf-lib-demo-controls, which turns it into
// `<html data-cbf-lib-blank>`. Every LIB surface asks isBlank(), which reads that
// ATTRIBUTE and never the store.
//
// That indirection is the point. cbf-lib-review-panel and cbf-lib-indirect-config
// are also on /lib-entry-sheet, which has its own grid and does NOT carry the
// demo controls. Reading the store directly would blank those two there while the
// sheet's grid still held the seeded budget — a screen half-cleared by a control
// that is not on it. Keying off the attribute means a page can only be blank if it
// mounted the controls that can un-blank it.

/** sessionStorage key: '1' while the LIB screen is showing a CLEARED budget. */
export const BLANK_KEY = 'cbf-lib-blank';

/**
 * True when THIS page is rendering the cleared budget — i.e. the demo controls'
 * pre-paint script found the flag and marked the document. False on SSR, and
 * false on any page that does not mount the controls.
 */
export function isBlank() {
  if (typeof document === 'undefined') return false;
  return 'cbfLibBlank' in document.documentElement.dataset;
}

/**
 * The indirect block as a vendor with nothing entered yet would find it: no rate,
 * no reference document, no effective period, and — the audit-critical one —
 * nothing in scope. Same shape as `indirectConfig` in src/data/lib-entry.mjs, so
 * priceLines() takes it without a special case.
 */
export const blankConfig = () => ({
  rate: 0,
  referenceDoc: '',
  effectiveStart: '',
  effectiveEnd: '',
  mode: 'single',
  appliesTo: [],
});
