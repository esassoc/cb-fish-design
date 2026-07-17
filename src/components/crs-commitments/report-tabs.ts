// Shared tab list for the 2020 CRS Commitments area's sub-nav strip (cbf-report-tabs),
// consumed by all 4 pages so the tab set and hrefs can't drift between them.
//
// Mirrors the live CBFish "BiOp reporting" summary strip's shape: a flat
// "Summary" tab (no BiOp-reporting-area landing page exists in this spoke yet,
// so it's a placeholder href="#" — deliberately out of scope for now) and a
// "2020 CRS Commitments" DROPDOWN tab holding the 3 pages this spoke has
// actually built. CRS habitat / FCRPS BiOp / Related items (the live strip's
// other tabs) aren't built either and are omitted rather than stubbed.
//
// The "2020 CRS Commitments" tab is a STATIC folder label, not a selected
// value — like the live site, it never carries `active` itself (a folder icon
// doesn't change appearance based on which file inside is open). Only the
// individual item you're actually on is marked active, inside the flyout.
// Item labels drop the "2020 CRS" prefix — the parent tab already carries
// that context, so every child repeating it read like a broken-record menu.
import { withBase } from '../../lib/base';

export type CrsReportTabKey = 'grid' | 'dashboard' | 'documents';

export function crsReportTabs(active: CrsReportTabKey) {
  return [
    { label: 'Summary', href: '#' },
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
  ];
}
