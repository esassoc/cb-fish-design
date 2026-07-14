// Single source of truth for the design-system sidebar + breadcrumbs.
// Scoped to the components CBFish actually uses / themes — a curated subset of
// the Ecology set, not the full hub catalog. Hrefs are root-relative and
// base-less; DocsShell wraps them with withBase() at render.
//
// Types come from @esa/docs so the data stays structurally compatible with the
// shared shell; only the DATA is per-spoke.
import type { NavItem, NavGroup } from '@esa/docs/nav';
export type { NavItem, NavGroup };

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
      c('Text field', 'esa-text-field'),
      c('Textarea', 'esa-textarea'),
      c('Select', 'esa-select'),
      c('Checkbox', 'esa-checkbox'),
      c('Radio group', 'esa-radio-group'),
      c('Switch toggle', 'esa-switch-toggle'),
    ],
  },
  {
    label: 'Display',
    items: [
      c('Badge', 'esa-badge'),
      c('Alert box', 'esa-alert-box'),
      c('Pill', 'esa-pill'),
    ],
  },
  {
    label: 'Navigation',
    items: [
      c('App bar', 'esa-app-bar'),
      c('Breadcrumbs', 'esa-breadcrumbs'),
    ],
  },
];

export const allGroups: NavGroup[] = [foundations, ...componentGroups];
