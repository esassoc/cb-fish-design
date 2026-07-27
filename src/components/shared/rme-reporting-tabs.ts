// Shared tab list for the RM&E Reporting area's sub-nav strip (cbf-report-tabs),
// consumed by every page under this area so the tab set and hrefs can't drift
// between them. Extracted once the area grew to 4 pages (Summary, Work
// Elements Report, Contract Reports, Manage Priorities) — until now each of
// the first 2 pages carried its own literal 2-item tabs array (mirroring how
// /project-budgets + /project-budgets/baselines still do, at their smaller
// size); a /design-qa decomposition review flagged a 3rd page joining the
// area as the trip-wire to extract, same reasoning biop-reporting-tabs.ts
// was promoted on.
//
// All 4 tabs are flat links (no dropdowns — unlike biop-reporting-tabs.ts,
// nothing here has sub-pages of its own), so this stays a simple array
// instead of the {label, items[]} dropdown shape that config needs.
import { withBase } from '../../lib/base';

export type RmeReportTabKey = 'summary' | 'work-elements' | 'contract-reports' | 'priorities';

export function rmeReportingTabs(active: RmeReportTabKey) {
  return [
    { label: 'Summary', href: withBase('/rme-reporting'), active: active === 'summary' },
    {
      label: 'RM&E Work Elements Report',
      href: withBase('/rme-work-elements'),
      active: active === 'work-elements',
    },
    {
      label: 'RM&E Contract Reports',
      href: withBase('/rme-contract-reports'),
      active: active === 'contract-reports',
    },
    {
      label: 'Manage RM&E Priorities',
      href: withBase('/rme-priorities'),
      active: active === 'priorities',
    },
  ];
}
