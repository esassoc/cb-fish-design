// Shared CBFish top-level navigation data — the single source of truth for both
// the public nav chrome (cbf-public-nav) and the homepage footer sitemap
// (cbf-app-footer), so the two never drift. Labels mirror cbfish.org; hrefs are
// stubs in the prototype (omitted = not yet wired).
export interface NavLink {
  label: string;
  href?: string;
}

export const help: NavLink[] = [
  { label: 'Help center' }, { label: 'Data dictionary' }, { label: 'EF&W Program documents' },
  { label: 'Request support' }, { label: 'Send feedback' },
];

export const mitigation: NavLink[] = [
  { label: 'Projects' }, { label: 'Contracts' }, { label: 'Portfolios' }, { label: 'Work elements' },
  { label: 'Estuary program' }, { label: 'Tributary habitat' }, { label: 'Land acquisitions' },
];

export const reporting: NavLink[] = [
  { label: 'Report Center' }, { label: 'Maps' }, { label: 'Publications' },
];

export const funding: NavLink[] = [
  { label: 'Funds' }, { label: 'Fund budgets summary' }, { label: 'Long-term funding agreements' },
  { label: 'Start-of-year (SOY) budgets' }, { label: 'Working budgets' }, { label: 'Budget change requests' },
  { label: 'Expenditures' }, { label: 'Accruals' },
];

// Items that live inline in the bars on desktop but collapse into the drawer below
// --cbf-nav-collapse (no child menus in this mock, so they list as flat labels).
export const system: NavLink[] = [
  { label: 'Data management' }, { label: 'System status' }, { label: 'System configuration' },
];

export const quick: NavLink[] = [
  { label: 'Recent', href: '#' }, { label: 'Dashboard', href: '#' },
];
