// Handoff spec for /biop-reporting (registry slug crs-commitments): the BiOp
// reporting summary page. Consumed only by the hub handoff CLI at build time.
//
// The page sits behind cbf-password-gate. `storage` seeds the flag the gate
// itself writes after a correct password, so capture lands on the content
// without the password ever entering this file or the bundle. Every selector
// is scoped to the gate's content, never the gate, whose markup carries the
// password.

const IN = '[data-cbf-gate-content]';

export default {
  storage: { session: { 'cbf-gate-unlocked': '1' } },
  sections: [
    {
      label: 'Sub-nav tabs',
      selector: `${IN} nav.cbf-report-tabs`,
      intent:
        'The BiOp reporting tab strip: Summary, then the 2020 CRS Commitments, CRS habitat and FCRPS BiOp menus, and a Related items disclosure. Shared by every page in the area.',
      decisions: [
        'The tab list comes from biopReportingTabs() in one shared file, so the area pages cannot drift apart.',
        'Menu tabs are folder labels and never show as active; only the page you are on is marked active, inside its menu.',
        'CRS habitat, FCRPS BiOp and Related items are placeholders (href="#"), matching the live site menu wording.',
      ],
      js: ['src/components/shared/biop-reporting-tabs.ts'],
    },
    {
      label: 'Intro',
      selector: `${IN} .cbf-report-intro`,
      intent:
        'Photo and prose explaining what BiOp reporting is: BPA consults with USFWS and NMFS under ESA Section 7, and tracks programmatic biological opinions such as HIP4.',
      decisions: ['The copy is taken verbatim from the live CBFish BiOp reporting summary page, not written for the prototype.'],
    },
    {
      label: 'Related items',
      selector: `${IN} section.cbf-related-items`,
      intent: 'Cards linking to related work; here the one card for uploading Biological Opinion Reclamation data as XLSX.',
    },
  ],
};
