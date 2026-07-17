// Shared tab list for the 2020 CRS Commitments area's sub-nav strip (cbf-report-tabs),
// consumed by all 4 pages so the tab set and hrefs can't drift between them.
//
// Mirrors the live CBFish "BiOp reporting" summary strip's shape: a flat
// "Summary" tab (no BiOp-reporting-area landing page exists in this spoke yet,
// so it's a placeholder href="#" — deliberately out of scope for now) and a
// "2020 CRS Commitments" DROPDOWN tab holding the 3 pages this spoke has
// actually built. CRS habitat / FCRPS BiOp / Related items (the live strip's
// other tabs) aren't built either and are omitted rather than stubbed.
import { withBase } from '../../lib/base';

export type CrsReportTabKey = 'grid' | 'dashboard' | 'documents';

export function crsReportTabs(active: CrsReportTabKey) {
  return [
    { label: 'Summary', href: '#' },
    {
      label: '2020 CRS Commitments',
      active: true,
      items: [
        {
          label: '2020 CRS Commitments',
          href: withBase('/crs-commitments'),
          active: active === 'grid',
        },
        {
          label: '2020 CRS Commitments Dashboard',
          href: withBase('/crs-commitments/dashboard'),
          active: active === 'dashboard',
        },
        {
          label: '2020 CRS Document Library',
          href: withBase('/crs-commitments/documents'),
          active: active === 'documents',
        },
      ],
    },
  ];
}
