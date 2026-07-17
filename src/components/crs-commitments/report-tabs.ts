// Shared tab list for the 2020 CRS Commitments area's sub-nav strip (cbf-report-tabs),
// consumed by all 4 pages so the tab set and hrefs can't drift between them.
import { withBase } from '../../lib/base';

export type CrsReportTabKey = 'grid' | 'dashboard' | 'documents';

export function crsReportTabs(active: CrsReportTabKey) {
  return [
    {
      label: '2020 CRS Commitments',
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
  ];
}
