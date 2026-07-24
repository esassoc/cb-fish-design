// Shared tab list for the BiOp Reporting area's sub-nav strip (cbf-report-tabs),
// consumed by every page under this area so the tab set and hrefs can't drift
// between them. Promoted from crs-commitments/ to shared/ when
// /biop-reporting (the real area landing page) became a second consumer of
// this config — same promotion cbf-report-intro/cbf-related-items and
// grid-chrome went through.
//
// Mirrors the live CBFish "BiOp reporting" summary strip's exact shape: a
// "Summary" tab (now a real page, /biop-reporting), a "2020 CRS Commitments"
// dropdown holding the 3 pages this spoke has actually built, and two more
// dropdowns — "CRS habitat" and "FCRPS BiOp" — matching the live site's menu
// items verbatim. Per the user's explicit call: those two areas and the
// "Related items" disclosure are placeholders only (href="#") — deliberately
// not built out, unlike 2020 CRS Commitments.
//
// The "2020 CRS Commitments" / "CRS habitat" / "FCRPS BiOp" tabs are STATIC
// folder labels, not selected values — like the live site, they never carry
// `active` themselves (a folder icon doesn't change appearance based on which
// file inside is open). Only the individual item you're actually on is marked
// active, inside the flyout. Item labels under "2020 CRS Commitments" drop the
// "2020 CRS" prefix — the parent tab already carries that context, so every
// child repeating it read like a broken-record menu; the CRS habitat / FCRPS
// BiOp item labels keep their live-site wording verbatim since they aren't built.
import { withBase } from '../../lib/base';

export type BiopReportTabKey = 'summary' | 'grid' | 'dashboard' | 'documents';

export function biopReportingTabs(active: BiopReportTabKey) {
  return [
    { label: 'Summary', href: withBase('/biop-reporting'), active: active === 'summary' },
    {
      label: '2020 CRS Commitments',
      items: [
        {
          label: 'Commitments',
          href: withBase('/crs-commitments'),
          active: active === 'grid',
        },
        {
          label: 'Dashboard',
          href: withBase('/crs-commitments/dashboard'),
          active: active === 'dashboard',
        },
        {
          label: 'Document Library',
          href: withBase('/crs-commitments/documents'),
          active: active === 'documents',
        },
      ],
    },
    {
      label: 'CRS habitat',
      items: [
        { label: 'CRS habitat reports', href: '#' },
        { label: 'CRS habitat report measures', href: '#' },
        { label: 'CRS habitat report map', href: '#' },
        { label: 'CRS habitat measure targets', href: '#' },
        { label: 'CRS habitat metrics report', href: '#' },
        { label: 'CRS habitat metrics report - interactive', href: '#' },
      ],
    },
    {
      label: 'FCRPS BiOp',
      items: [
        { label: 'FCRPS BiOp', href: '#' },
        { label: 'FCRPS BiOp dashboard', href: '#' },
        { label: 'FCRPS 2008 BiOp actions', href: '#' },
        { label: 'Project associations to FCRPS 2008 BiOp', href: '#' },
        { label: 'FCRPS BiOp RPAs and Associated BPA Projects', href: '#' },
      ],
    },
  ];
}

// Trailing "Related items" disclosure — same one item the live strip shows.
export const biopRelatedItems = [{ title: 'Reclamation uploader', href: '#' }];
