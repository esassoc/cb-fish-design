// Shared AG Grid chrome for the CRS Commitments area's two data grids
// (cbf-crs-commitments-grid, cbf-crs-documents-grid) — the token-mapped theme
// and the small formatting helpers every themed grid in this area needs.
// Extracted so the two grids can't drift apart on look-and-feel or date
// parsing as they're edited independently (flagged by /design-qa's
// decomposition review — this file is the fix).
import { themeQuartz } from 'ag-grid-community';

// AG Grid Theming API mapped onto the spoke's semantic tokens — every themed
// grid in this area reads like the rest of the surfaces instead of shipping
// its own palette.
export const cbfGridTheme = themeQuartz.withParams({
  fontFamily: 'inherit',
  fontSize: '14px',
  foregroundColor: 'var(--color-text-primary)',
  backgroundColor: 'var(--color-surface)',
  headerBackgroundColor: 'var(--color-surface-sunken, transparent)',
  headerTextColor: 'var(--color-text-secondary)',
  headerFontWeight: 600,
  borderColor: 'var(--color-border)',
  rowHoverColor: 'var(--color-surface-subtle, var(--color-primary-subtle))',
  accentColor: 'var(--color-primary)',
  wrapperBorderRadius: 0,
  borderRadius: 'var(--radius-100, 4px)',
});

/** Renders a Date back to a readable "Oct 1, 2020" form (more scannable than a raw slashed string). */
export const gridDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

/** Parses a source M/D/YYYY string to a Date so date columns sort chronologically; blank/invalid -> null. */
export function asGridDate(s?: string): Date | null {
  if (!s) return null;
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Escapes text dropped into a cellRenderer's HTML string. */
export function escGridHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
