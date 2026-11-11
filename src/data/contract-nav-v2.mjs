// Contract header nav, round 4 variation ("SOW hub"), built beside round 3 rather than
// over it (Andy, 2026-11-11: "implementing (not over, but in addition to) a variation
// on the current prototype"). Plan and the picks it builds:
// docs/private/briefs/cbfish-nav-header/plan-round4.md.
//
// What differs from round 3 (contract-nav.mjs), from Gloria's feedback (2026-11-10):
//   - SOW is a third always-there menu beside Overview and Files ("people need to go
//     there not only for setup but also through review & approve and report &
//     invoice"). It holds SOW and Work Element Budgets.
//   - Initialize SOW leaves the menus: a conditional button on the SOW page.
//   - Setup keeps Pre-Award only.
//   - Review and Approve gains Transmittal Memo.
//   - In the change-request stage, Report and Invoice stays in progress beside Review
//     and Approve (pick 1: reporting and invoicing continue during a revision).
//   - Each SOW revision's work statement elements (WSEs) get their own pages, with
//     sub-tabs and a switcher.
import { CONTRACT_TABS, STAGES, findPage } from './contract-nav.mjs';

const tab = (key) => CONTRACT_TABS.find((t) => t.key === key);
const page = (slug) => {
  const { tab: _t, ...p } = findPage(slug);
  return p;
};

/** Pages reachable in round 4 but in no menu (Initialize SOW: a button on the SOW page). */
export const UNLISTED_PAGES_V2 = [{ ...page('initialize-sow'), tab: 'sow', hideStages: ['review', 'issued', 'change', 'closed'] }];

export const CONTRACT_TABS_V2 = [
  tab('overview'),
  // Work Element Budgets and Workflow need a SOW revision, as in prod: none in Setup.
  { key: 'sow', label: 'SOW', pages: [page('sow'), { ...page('work-element-budgets'), hideStages: ['setup'] }] },
  { key: 'setup', label: 'Setup', pages: [page('pre-award')] },
  {
    key: 'review',
    label: 'Review and Approve',
    pages: [
      page('review-sow'),
      { ...page('workflow'), hideStages: ['setup'] },
      // Pick 3: the memo is its own page, once a revision is in review.
      { slug: 'transmittal-memo', label: 'Transmittal Memo', prod: 'Workflow (transmittal memos)', hideStages: ['setup'] },
    ],
  },
  tab('report'),
  tab('closeout'),
  tab('files'),
];

export const ALL_PAGES_V2 = [
  ...CONTRACT_TABS_V2.flatMap((t) => t.pages.map((p) => ({ ...p, tab: t.key }))),
  ...UNLISTED_PAGES_V2,
];

export function findPageV2(slug) {
  return ALL_PAGES_V2.find((p) => p.slug === slug);
}

// Pick 1: in the change-request stage the contract keeps reporting and invoicing on its
// current SOW while the revision is reviewed, so both phases are in progress.
export const STAGES_V2 = STAGES.map((s) =>
  s.key === 'change'
    ? { ...s, phases: { ...s.phases, report: ['current', 11, 'Oct 1, 2026 – Sep 30, 2027'] } }
    : s,
);

// The SOW page: the contract's actions (each a SOW revision), newest first. Which rows
// show depends on the stage lens: in Setup there is no SOW yet (pick 2, Initialize
// SOW); in review the requisition is pending; a change request adds Rev 2. Mock values; columns follow qa.cbfish.org's contract actions grid.
export const CONTRACT_ACTIONS = [
  {
    rev: 2,
    type: 'Contract Change Request (CCR)',
    status: 'In review',
    request: 'CCR-61204',
    weCount: 9,
    changeType: 'Scope and budget',
    sowStatus: 'Unlocked',
    start: '10/01/2026',
    end: '09/30/2027',
    value: '$1,184,300',
    onlyStages: ['change'],
  },
  {
    rev: 1,
    type: 'Contract Requisition (CR)',
    status: 'Pending',
    request: 'CR-387553',
    weCount: 8,
    changeType: '',
    sowStatus: 'Unlocked',
    start: '10/01/2026',
    end: '09/30/2027',
    value: '$1,089,618',
    onlyStages: ['review'],
  },
  {
    rev: 1,
    type: 'Contract Requisition (CR)',
    status: 'Issued',
    request: 'CR-387553',
    weCount: 8,
    changeType: '',
    sowStatus: 'Locked',
    start: '10/01/2026',
    end: '09/30/2027',
    value: '$1,089,618',
    onlyStages: ['issued', 'change', 'closed'],
  },
];


// The WSE sub-tabs, in prod's order (qa.cbfish.org, 2026-11-11 capture).
export const WSE_TABS = [
  { key: 'summary', label: 'Summary' },
  { key: 'milestones', label: 'Milestones' },
  { key: 'metrics', label: 'Metrics' },
  { key: 'location', label: 'Location' },
  { key: 'focal-species', label: 'Focal Species' },
  { key: 'environmental-compliance', label: 'Environmental Compliance' },
  { key: 'rme-metadata', label: 'RM&E Metadata' },
];

// Mock work elements (WEs) for CR-387553's Rev 1: letter (sort order), the work element
// template (number and name, from the CBFish work element list), and a title. `needs`
// lists the tabs still missing required input (pick 6: prod's asterisk), which only
// shows while the revision is unlocked.
const REV1_WES = [
  { letter: 'A', template: 165, name: 'Produce Environmental Compliance Documentation', title: 'Environmental compliance for instream work, Upper Grande Ronde', needs: ['milestones'] },
  { letter: 'B', template: 119, name: 'Manage and Administer Projects', title: 'Project management and contract administration', needs: [] },
  { letter: 'C', template: 132, name: 'Produce Progress (Annual) Report', title: 'Annual progress report to BPA', needs: [] },
  { letter: 'D', template: 185, name: 'Produce CBFish Status Report', title: 'Periodic status reports for BPA', needs: [] },
  { letter: 'E', template: 29, name: 'Increase Aquatic and/or Floodplain Complexity', title: 'Large wood placement, river miles 12 to 15', needs: ['metrics', 'location', 'environmental-compliance'] },
  { letter: 'F', template: 30, name: 'Realign, Connect, and/or Create Channel', title: 'Side channel reconnection at Five Points Creek', needs: ['location', 'focal-species'] },
  { letter: 'G', template: 47, name: 'Plant Vegetation', title: 'Riparian planting along restored reaches', needs: ['metrics'] },
  { letter: 'H', template: 157, name: 'Collect/Generate/Validate Field and Lab Data', title: 'Pre- and post-project habitat monitoring', needs: ['rme-metadata'] },
];

// Rev 2 (the change request) adds a WE and reopens two for edits.
const REV2_WES = [
  ...REV1_WES.map((w) =>
    w.letter === 'E' ? { ...w, needs: ['location'] } : w.letter === 'F' ? { ...w, needs: ['metrics'] } : { ...w, needs: [] },
  ),
  { letter: 'I', template: 29, name: 'Increase Aquatic and/or Floodplain Complexity', title: 'Added large wood, river miles 15 to 16', needs: ['metrics', 'location', 'focal-species'] },
];

/**
 * The SOW revisions and their WEs (pick 5: a WE page belongs to one revision).
 * `stages` are the stage-lens values in which the revision exists; `unlocked` those in
 * which it is open for edits, the only time its needs-input flags show; `current` those
 * in which it is the revision the SOW page opens on.
 */
export const REVISIONS = [
  {
    rev: 1,
    type: 'Contract Requisition',
    request: 'CR-387553',
    stages: ['review', 'issued', 'change', 'closed'],
    unlocked: ['review'],
    current: ['review', 'issued', 'closed'],
    wes: REV1_WES,
  },
  {
    rev: 2,
    type: 'Contract Change Request',
    request: 'CCR-61204',
    stages: ['change'],
    unlocked: ['change'],
    current: ['change'],
    wes: REV2_WES,
  },
];

/** "SOW Rev 2, Contract Change Request (CCR-61204)" */
export const revisionLine = (r) => `SOW Rev ${r.rev}, ${r.type} (${r.request})`;

/**
 * The prototype's Header switch: both variations, each landing on the same page when
 * it exists there, else on Contract Summary. Paths are base-less; wrap with withBase().
 */
// Round 4 pages round 3 lacks, and where round 3 keeps the same thing.
const V1_FALLBACK = { 'transmittal-memo': 'workflow' };

export function headerViews(slug) {
  const inV1 = !!findPage(slug);
  const inV2 = !!findPageV2(slug);
  return [
    { key: 'lifecycle', label: 'Lifecycle', path: `/contract-nav/${inV1 ? slug : V1_FALLBACK[slug] ?? 'summary'}` },
    { key: 'sow-hub', label: 'SOW hub', path: `/contract-nav/v2/${inV2 ? slug : 'summary'}` },
  ];
}
