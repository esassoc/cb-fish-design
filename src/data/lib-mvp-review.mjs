// COR review of a vendor Line Item Budget, v1 scope — the review model behind
// /lib-mvp.
//
// A FORK of src/data/lib-review.mjs (behind /lib-entry), trimmed to
// docs/lib-mvp-scope.md. It reads src/data/lib-mvp.mjs and keeps its own
// sessionStorage keys, so the two prototypes never share a review.
//
// INVENTED, NOT DERIVED. Reviewer names, dates and comment text are fictional,
// composed for this prototype alongside the budget in src/data/lib-mvp.mjs.
//
// ── THE TWO SIDES OF ONE DOCUMENT ───────────────────────────────────────────
//   VENDOR  enters the budget, watches the reconciliation rail, submits it.
//   BPA COR reads the submitted budget, MARKS the lines that need work, and
//           either RETURNS it for revision or APPROVES it.
// A review is not a separate document — it is a layer of marks ON the budget,
// anchored to cost-line ids. "Fix the Boise lodging rate" is useless as an email
// and obvious as a mark on the row.
//
// ── WHAT A MARK CARRIES ─────────────────────────────────────────────────────
// A flag is { lineId, budget, severity, reason, note, author, date }.
//   budget    'main' for the contract LIB, or a subcontract sheet id. ONE cycle
//             covers the parent and every child LIB, so marks from all of them
//             live in this one review; `budget` is what "Go to line" navigates by.
//   severity  'required' blocks approval (and the vendor's resubmit) until it is
//             addressed; 'question' asks the vendor to explain.
//   reason    a code from the short fixed REASONS list.
//   note      what the vendor must actually DO. Free text.
// One mark per line: marking a line again replaces its mark.
//
// ── STATUS ──────────────────────────────────────────────────────────────────
//   'draft'      the vendor is entering it; never submitted. No marks.
//   'in-review'  submitted — with the COR. Read-only for the vendor; the COR
//                marks. Marks are visible as they are made (private-until-return
//                is v2).
//   'returned'   the COR sent it back. The vendor edits, ticks each mark
//                addressed, and resubmits — which returns it to 'in-review'.
//   'approved'   locked. Later changes go through the contract change process.
// There is no return memo and no cycle count in v1.
//
// The prototype SEEDS a returned review so both roles have something on screen
// the moment the page loads: two required changes and two questions, one of
// them on the child LIB.
//
// ── PERSISTENCE ─────────────────────────────────────────────────────────────
// The role switch reloads the page, so the review lives in sessionStorage:
// real enough to demo the round trip, gone when the tab closes. Every accessor
// is guarded for SSR, where there is no window.

import { contract, EVENTS } from './lib-mvp.mjs';

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
    hint: 'Blocks approval until the vendor addresses this line.',
  },
  [SEVERITIES.QUESTION]: {
    label: 'Question',
    short: 'Question',
    variant: 'warning',
    hint: 'Asks the vendor to explain this line. It may not need to change.',
  },
};

/** The short fixed reason list. A COR picks one; the note says what to do. */
export const REASONS = [
  { key: 'rate', label: 'Rate needs support' },
  { key: 'quantity', label: 'Quantity or unit needs justification' },
  { key: 'documentation', label: 'Supporting documentation required' },
  { key: 'wrong-category', label: 'Cost category is wrong' },
  { key: 'unallowable', label: 'Cost appears unallowable' },
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
  /**
   * "Now" for this prototype. Marks made during a demo are stamped with it, so
   * the seeded review and a fresh mark sit on one coherent timeline.
   */
  today: '08/05/2026',
};

/**
 * The seeded review. Every mark sits on a line whose question is visible in the
 * grid, so the mark and the evidence are on screen together.
 */
export const seedReview = () => ({
  status: 'returned',
  flags: [
    {
      lineId: 'trv-4',
      budget: 'main',
      severity: SEVERITIES.REQUIRED,
      reason: 'rate',
      note:
        'Boise lodging is entered at $189 a night. The FY2026 published rate for Boise is $178 — ' +
        'bring the rate down, or attach the conference block rate quote that supports it.',
      author: contract.bpaCor,
      date: '08/03/2026',
    },
    {
      lineId: 'sub-1',
      budget: 'main',
      severity: SEVERITIES.REQUIRED,
      reason: 'documentation',
      note:
        'Attach the laboratory’s quote to the subcontract. A $28,000 subcontract can’t be ' +
        'approved without it.',
      author: contract.bpaCor,
      date: '08/03/2026',
    },
    {
      lineId: 'sup-5',
      budget: 'main',
      severity: SEVERITIES.QUESTION,
      reason: 'wrong-category',
      note:
        'This $5,400 lump is filed as supplies. Confirm no single item in it is one your policy ' +
        'capitalizes — if one is, move it to Capital equipment as its own line.',
      author: contract.bpaCor,
      date: '08/03/2026',
    },
    {
      lineId: 'ss1-sup-1',
      budget: 'sub-sheet-1',
      severity: SEVERITIES.QUESTION,
      reason: 'quantity',
      note: 'How many samples does each genotyping kit run? Twelve kits looks high for 1,200 samples.',
      author: contract.bpaCor,
      date: '08/03/2026',
    },
  ],
  /** Line ids the VENDOR has ticked as addressed since the return. */
  addressed: [],
});

/**
 * A budget nobody has submitted yet — what the demo's "Clear all entries" control
 * leaves behind (see src/data/lib-mvp-demo.mjs).
 */
export const blankReview = () => ({
  status: 'draft',
  flags: [],
  addressed: [],
});

// ── Derived state ───────────────────────────────────────────────────────────

export const flagFor = (review, lineId) => (review.flags ?? []).find((f) => f.lineId === lineId) ?? null;

/** The marks on one budget — the contract LIB ('main') or one child sheet. */
export const flagsForBudget = (review, budgetId) =>
  (review.flags ?? []).filter((f) => (f.budget ?? 'main') === budgetId);

export const isAddressed = (review, lineId) => (review.addressed ?? []).includes(lineId);

export const requiredFlags = (review) =>
  (review.flags ?? []).filter((f) => f.severity === SEVERITIES.REQUIRED);

export const questionFlags = (review) =>
  (review.flags ?? []).filter((f) => f.severity === SEVERITIES.QUESTION);

/**
 * Required marks not yet ticked addressed, across the parent and every child.
 * This is what blocks Approve, and what lib-mvp's submit gate 8 reads — pass it
 * as `submitChecksFor(lines, cfg, { openRequired: openRequiredFlags(review) })`.
 */
export const openRequiredFlags = (review) => requiredFlags(review).filter((f) => !isAddressed(review, f.lineId));

/** The counts every surface quotes. */
export const reviewCounts = (review) => {
  const flags = review.flags ?? [];
  const outstanding = flags.filter((f) => !isAddressed(review, f.lineId));
  return {
    total: flags.length,
    required: requiredFlags(review).length,
    questions: questionFlags(review).length,
    addressed: flags.length - outstanding.length,
    outstanding: outstanding.length,
    openRequired: openRequiredFlags(review).length,
  };
};

// ── Who may do what, by status ──────────────────────────────────────────────

/** The vendor edits in draft or returned; with the COR or approved, it is read-only. */
export const vendorCanEdit = (review) => review.status === 'draft' || review.status === 'returned';

/** The COR marks only while the budget is with them. */
export const corCanMark = (review) => review.status === 'in-review';

/** Locked once approved. */
export const isLocked = (review) => review.status === 'approved';

/** Approve is blocked while any Required mark is open. */
export const canApprove = (review) => review.status === 'in-review' && openRequiredFlags(review).length === 0;

// ── Transitions — pure: each returns a new review; persist with saveReview ───

/** Vendor submits (or resubmits). Marks and addressed ticks carry over. */
export const submitReview = (review) => ({ ...review, status: 'in-review' });

/** COR returns the budget for revision. */
export const returnReview = (review) => ({ ...review, status: 'returned' });

/** COR approves — refused (returns the review unchanged) while Required marks are open. */
export const approveReview = (review) => (canApprove(review) ? { ...review, status: 'approved' } : review);

/** COR marks a line (replacing any mark already on it). */
export const setFlag = (review, flag) => ({
  ...review,
  flags: [
    ...(review.flags ?? []).filter((f) => f.lineId !== flag.lineId),
    { budget: 'main', author: reviewMeta.reviewer, date: reviewMeta.today, ...flag },
  ],
  /* A fresh or rewritten mark is open again. */
  addressed: (review.addressed ?? []).filter((id) => id !== flag.lineId),
});

/** COR clears the mark on a line. */
export const removeFlag = (review, lineId) => ({
  ...review,
  flags: (review.flags ?? []).filter((f) => f.lineId !== lineId),
  addressed: (review.addressed ?? []).filter((id) => id !== lineId),
});

/** Vendor ticks (or un-ticks) a mark addressed. */
export const setAddressed = (review, lineId, on = true) => {
  const rest = (review.addressed ?? []).filter((id) => id !== lineId);
  return { ...review, addressed: on ? [...rest, lineId] : rest };
};

/** One line of status, written for whichever role is reading it. */
export const statusText = (review, role) => {
  const c = reviewCounts(review);
  const marks = `${c.total} mark${c.total === 1 ? '' : 's'}`;
  if (review.status === 'approved') {
    return role === 'cor'
      ? `You approved this budget. ${marks} stay on the record.`
      : 'BPA approved this budget. It’s locked — changes now go through a contract change.';
  }
  if (review.status === 'returned') {
    return role === 'cor'
      ? `Returned to ${reviewMeta.vendorContact} on ${reviewMeta.returnedOn} with ${marks}.`
      : `${reviewMeta.reviewer} returned this budget on ${reviewMeta.returnedOn}. ${c.outstanding} of ${c.total} item${c.total === 1 ? '' : 's'} still to address.`;
  }
  if (review.status === 'in-review') {
    return role === 'cor'
      ? `In review. ${marks} so far${c.openRequired ? ` — ${c.openRequired} required change${c.openRequired === 1 ? '' : 's'} open, so Approve is blocked` : ''}.`
      : `Submitted ${reviewMeta.submittedOn}. ${reviewMeta.reviewer} is reviewing it.`;
  }
  return role === 'cor' ? 'The vendor hasn’t submitted this budget yet.' : 'Draft — not submitted yet.';
};

export const statusBadge = (review) => {
  if (review.status === 'approved') return { value: 'Approved', variant: 'success' };
  if (review.status === 'returned') return { value: 'Returned for revision', variant: 'warning' };
  if (review.status === 'in-review') return { value: 'In review', variant: 'info' };
  return { value: 'Draft', variant: 'secondary' };
};

// ── Roles ───────────────────────────────────────────────────────────────────

export const ROLES = [
  { key: 'vendor', label: 'Vendor', who: contract.sponsor },
  { key: 'cor', label: 'BPA COR', who: contract.bpaCor },
];

export const roleMeta = (role) => ROLES.find((r) => r.key === role) ?? ROLES[0];

// ── Persistence (sessionStorage; SSR-safe) ──────────────────────────────────
// Prefixed `cbf-libmvp-`, never `cbf-lib-`, so /lib-mvp and /lib-entry keep
// separate reviews and role lenses in the same tab.

export const REVIEW_KEY = 'cbf-libmvp-review';
export const ROLE_KEY = 'cbf-libmvp-role';

const STATUSES = ['draft', 'in-review', 'returned', 'approved'];
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
      status: STATUSES.includes(parsed.status) ? parsed.status : 'returned',
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
 * The one broadcast every review surface listens to (`cbf-libmvp:review`). The
 * cost grid, the review console and the reconciliation rail all repaint from
 * this — nobody reads another component's DOM.
 */
export function fireReview(review) {
  if (typeof document === 'undefined') return;
  document.dispatchEvent(
    new CustomEvent(EVENTS.review, {
      detail: { review, counts: reviewCounts(review) },
    }),
  );
}
