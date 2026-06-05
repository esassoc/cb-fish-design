// Single source of truth for the design-system sidebar + breadcrumbs.
// Scoped to the components CB Fish actually uses / themes — a curated subset of
// the Ecology set, not the full hub catalog. Hrefs are root-relative and
// base-less; DocsLayout wraps them with withBase() at render.

export interface NavItem {
  label: string;
  href: string;
  status?: 'stable' | 'reference';
}
export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const foundations: NavGroup = {
  label: 'Foundations',
  items: [
    { label: 'Color', href: '/design-system/foundations/color' },
    { label: 'Typography', href: '/design-system/foundations/typography' },
    { label: 'Spacing', href: '/design-system/foundations/spacing' },
    { label: 'Radius', href: '/design-system/foundations/radius' },
  ],
};

const c = (label: string, name: string): NavItem => ({
  label,
  href: `/design-system/components/${name}`,
});

export const componentGroups: NavGroup[] = [
  { label: 'Core', items: [c('Button', 'esa-button')] },
  {
    label: 'Forms',
    items: [
      c('Text Field', 'esa-text-field'),
      c('Textarea', 'esa-textarea'),
      c('Select', 'esa-select'),
      c('Checkbox', 'esa-checkbox'),
      c('Radio Group', 'esa-radio-group'),
      c('Switch Toggle', 'esa-switch-toggle'),
    ],
  },
  {
    label: 'Display',
    items: [
      c('Badge', 'esa-badge'),
      c('Alert Box', 'esa-alert-box'),
      c('Pill', 'esa-pill'),
    ],
  },
  {
    label: 'Navigation',
    items: [
      c('App Bar', 'esa-app-bar'),
      c('Breadcrumbs', 'esa-breadcrumbs'),
    ],
  },
];

export const allGroups: NavGroup[] = [foundations, ...componentGroups];
