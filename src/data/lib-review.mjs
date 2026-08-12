// COR review of a vendor Line Item Budget — the review model behind /lib-entry.
//
// INVENTED, NOT DERIVED. Reviewer names, dates, comment text and the reason
// taxonomy below are fictional, composed for this prototype alongside the budget
// itself in src/data/lib-entry.mjs.
//
// ── THE TWO SIDES OF ONE DOCUMENT ───────────────────────────────────────────
// The LIB entry screen is the SAME screen for two people:
//
//   VENDOR  types the budget, watches the reconciliation rail, submits it.
//   BPA COR reads the submitted budget, MARKS the lines that are wrong, says
//           what has to change, and either RETURNS it for revision or APPROVES.
//
// So a review is not a separate document — it is a layer of marks ON the budget,
// anchored to cost-line ids. That anchoring is the whole design claim: "fix the
// Boise lodging rate" is useless as an email and obvious as a mark on the row.
//
// ── WHAT A MARK CARRIES ─────────────────────────────────────────────────────
// A flag is { lineId, severity, reason, note, author, date }.
//   severity  'required' blocks approval; 'question' asks the vendor to explain
//             without necessarily changing a number. Both are returned together;
//             only 'required' counts against the vendor's resubmit gate.
//   reason    a code from REASONS — the taxonomy the COR picks from, so a
//             returned budget can be counted and reported on, not just read.
//   note      what the vendor must actually DO. Free text, and the one part the
//             COR always writes.
//
// ── STATUS ──────────────────────────────────────────────────────────────────
//   'in-review'  the COR is marking. Marks are PRIVATE — the vendor sees none of
//                them until the review is issued. That privacy is deliberate: a
//                half-finished review read as a work list is worse than no review.
//   'returned'   the COR issued the review. The vendor now sees every mark, works
//                through them, and marks each one addressed before resubmitting.
//   'approved'   the COR accepted the budget. Marks stay visible as the record.
//
// The prototype SEEDS a returned review so both roles have something real on
// screen the moment the page loads: three required changes and one question,
// each on a line where the failure is genuinely visible in the grid.
//
// ── PERSISTENCE ─────────────────────────────────────────────────────────────
// The role switch reloads the page (the two roles render different markup), so
// the review has to survive a reload or the COR's marks would vanish on the way
// to the vendor's screen — which is exactly the handoff being prototyped. It
// lives in sessionStorage: real enough to demo the round trip, gone when the tab
// closes. Every accessor is guarded for SSR, where there is no window.

import { contract } from './lib-entry.mjs';

/** Severities, in the order a reviewer thinks about them. */
export const SEVERITIES = {
  REQUIRED: 'required',
  QUESTION: 'question',
};

export const severityMeta = {
  [SEVERITIES.REQUIRED]: {
    label: 'Change required',
    short: 'Required',
    /** esa-badge variant. */
    variant: 'danger',
    hint: 'The vendor must change this line before the budget can be approved.',
  },
  [SEVERITIES.QUESTION]: {
    label: 'Question',
    short: 'Question',
    variant: 'warning',
    hint: 'The vendor must explain this line. It may not need to change.',
  },
};

/**
 * The reason taxonomy. A COR picks one; the note says what to do about it. Codes
 * exist so returned budgets can be counted by reason across contracts, which is
 * the reporting a free-text-only review can never support.
 */
export const REASONS = [
  { key: 'rate-over-ceiling', label: 'Rate exceeds an authority ceiling' },
  { key: 'missing-allocation', label: 'Work-element allocation incomplete' },
  { key: 'documentation', label: 'Supporting documentation required' },
  { key: 'wrong-category', label: 'Line is in the wrong cost category' },
  { key: 'quantity', label: 'Quantity or unit needs justification' },
  { key: 'unallowable', label: 'Cost appears unallowable on this contract' },
  { key: 'indirect', label: 'Indirect treatment is wrong' },
  { key: 'other', label: 'Other — see the note' },
];

export const reasonLabel = (key) => REASONS.find((r) => r.key === key)?.label ?? 'Other — see the note';

/** Who is reviewing, and the dates that bracket the round trip. */
export const reviewMeta = {
  reviewer: contract.bpaCor,
  reviewerRole: 'BPA Contracting Officer’s Representative',
  vendorContact: contract.contractManager,
  submittedOn: '07/28/2026',
  returnedOn: '08/03/2026',
  /** Second time through — the first cycle was returned for the same GSA line. */
  cycle: 2,
  /**
   * "Now" for this prototype. Marks made during a demo are stamped with it rather
   * than with the machine clock, so the seeded review and a freshly-added mark sit
   * on one coherent timeline instead of drifting apart by however long this file
   * has been on disk.
   */
  today: '08/05/2026',
};

/**
 * The seeded review. Every flag sits on a line whose problem is visible in the
 * grid, so the mark and the evidence are on screen together.
 */
export const seedReview = () => ({
  status: 'returned',
  memo:
    'Three changes are required before this budget can be approved, and one line needs an ' +
    'explanation. The GSA lodging rate and the unallocated administrative position are the ' +
    'same two findings as the first cycle — please address both before resubmitting.',
  flags: [
    {
      /* The Boise lodging line — trv-4 since Travel was regrouped by trip. */
      lineId: 'trv-4',
      severity: SEVERITIES.REQUIRED,
      reason: 'rate-over-ceiling',
      /* Rewritten for the typed-rate model: there is no ceiling to be "over" any
         more, so the COR's question is the one the new row actually raises —
         this line claims no published rate, and the number is above the one that
         is published for Boise. That is allowed, and it has to be justified. */
      note:
        'Boise lodging is entered at $172 and claims no standard rate. FY2026 publishes $166 ' +
        'for Boise — either claim it, or attach the approved lodging exception for the difference.',
      author: contract.bpaCor,
      date: '08/03/2026',
    },
    {
      lineId: 'sal-4',
      severity: SEVERITIES.REQUIRED,
      reason: 'missing-allocation',
      note:
        'The Administrative Specialist carries no work-element allocation. Split the 3 months ' +
        'across the elements the position actually supports — 119 Manage and Administer at a ' +
        'minimum — so the cost lands somewhere in the SOW.',
      author: contract.bpaCor,
      date: '08/03/2026',
    },
    {
      lineId: 'sub-1',
      severity: SEVERITIES.REQUIRED,
      reason: 'documentation',
      note:
        'Attach the cost/price analysis and the selection memo for the genetics laboratory. A ' +
        '$28,000 subcontract cannot be approved on the lump alone.',
      author: contract.bpaCor,
      date: '08/03/2026',
    },
    {
      lineId: 'sup-f2',
      severity: SEVERITIES.QUESTION,
      reason: 'quantity',
      note:
        '2,400 PIT tags is well above the juvenile tagging target in the SOW. Confirm the number ' +
        'against work element 157, or point me at the change that raised it.',
      author: contract.bpaCor,
      date: '08/03/2026',
    },
  ],
  /** Line ids the VENDOR has marked as dealt with since the return. */
  addressed: [],
});

/**
 * A budget nobody has reviewed yet — what the demo's "Clear all entries" control
 * leaves behind (see src/data/lib-demo.mjs). Status 'in-review' rather than a
 * fourth status: with no flags on it, isIssued() is false, so no mark renders on
 * any row and the rail's review gate does not apply — which is exactly the state
 * of a budget that has not been through a cycle.
 */
export const blankReview = () => ({
  status: 'in-review',
  memo: '',
  flags: [],
  addressed: [],
});

// ── Derived state ───────────────────────────────────────────────────────────

export const flagFor = (review, lineId) => (review.flags ?? []).find((f) => f.lineId === lineId) ?? null;

export const isAddressed = (review, lineId) => (review.addressed ?? []).includes(lineId);

/** True when the vendor is allowed to see the marks at all. */
export const isIssued = (review) => review.status === 'returned' || review.status === 'approved';

export const requiredFlags = (review) =>
  (review.flags ?? []).filter((f) => f.severity === SEVERITIES.REQUIRED);

export const questionFlags = (review) =>
  (review.flags ?? []).filter((f) => f.severity === SEVERITIES.QUESTION);

/**
 * The counts every surface quotes. `outstanding` is what stands between the
 * vendor and resubmitting: any flag, of either severity, not yet marked
 * addressed — a question the vendor ignores is a returned budget next cycle too.
 */
export const reviewCounts = (review) => {
  const flags = review.flags ?? [];
  const outstanding = flags.filter((f) => !isAddressed(review, f.lineId));
  return {
    total: flags.length,
    required: requiredFlags(review).length,
    questions: questionFlags(review).length,
    addressed: flags.length - outstanding.length,
    outstanding: outstanding.length,
  };
};

/** One line of status, written for whichever role is reading it. */
export const statusText = (review, role) => {
  const c = reviewCounts(review);
  if (review.status === 'approved') {
    return role === 'cor'
      ? `You approved this budget. ${c.total} mark${c.total === 1 ? '' : 's'} stay on the record.`
      : 'BPA approved this budget. The marks below stay on the record.';
  }
  if (review.status === 'returned') {
    return role === 'cor'
      ? `Returned to ${reviewMeta.vendorContact} on ${reviewMeta.returnedOn} with ${c.total} mark${c.total === 1 ? '' : 's'}.`
      : `${reviewMeta.reviewer} returned this budget on ${reviewMeta.returnedOn}. ${c.outstanding} of ${c.total} item${c.total === 1 ? '' : 's'} still to address.`;
  }
  return role === 'cor'
    ? `In review. ${c.total} mark${c.total === 1 ? '' : 's'} so far — nothing is visible to the vendor until you return or approve it.`
    : `Submitted ${reviewMeta.submittedOn}. ${reviewMeta.reviewer} is reviewing it.`;
};

export const statusBadge = (review) => {
  if (review.status === 'approved') return { value: 'Approved', variant: 'success' };
  if (review.status === 'returned') return { value: 'Returned for revision', variant: 'warning' };
  return { value: 'In review', variant: 'info' };
};

// ── Roles ───────────────────────────────────────────────────────────────────

export const ROLES = [
  { key: 'vendor', label: 'Vendor', who: contract.sponsor },
  { key: 'cor', label: 'BPA COR', who: contract.bpaCor },
];

export const roleMeta = (role) => ROLES.find((r) => r.key === role) ?? ROLES[0];

// ── Persistence (sessionStorage; SSR-safe) ──────────────────────────────────

export const REVIEW_KEY = 'cbf-lib-review';
export const ROLE_KEY = 'cbf-lib-role';

const canStore = () => typeof window !== 'undefined' && !!window.sessionStorage;

/** The review as it stands. Falls back to the seed on SSR or a cold tab. */
export function loadReview() {
  if (!canStore()) return seedReview();
  try {
    const raw = window.sessionStorage.getItem(REVIEW_KEY);
    if (!raw) return seedReview();
    const parsed = JSON.parse(raw);
    return {
      ...seedReview(),
      ...parsed,
      flags: Array.isArray(parsed.flags) ? parsed.flags : [],
      addressed: Array.isArray(parsed.addressed) ? parsed.addressed : [],
    };
  } catch {
    return seedReview();
  }
}

export function saveReview(review) {
  if (!canStore()) return review;
  try {
    window.sessionStorage.setItem(REVIEW_KEY, JSON.stringify(review));
  } catch {
    /* a full or blocked store must never break the screen */
  }
  return review;
}

export function resetReview() {
  if (canStore()) {
    try {
      window.sessionStorage.removeItem(REVIEW_KEY);
    } catch {
      /* ignore */
    }
  }
  return seedReview();
}

/**
 * The one broadcast every review surface listens to. The cost grid, the review
 * console and the reconciliation rail all repaint from this — nobody reads
 * another component's DOM.
 */
export function fireReview(review) {
  if (typeof document === 'undefined') return;
  document.dispatchEvent(
    new CustomEvent('cbf-lib:review', {
      detail: { review, counts: reviewCounts(review) },
    }),
  );
}
