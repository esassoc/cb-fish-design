# System improvement ledger

Spoke-side friction that traces back to a hub (ecology) gap — a missing token,
a lego that should exist, or a foundation limitation the spoke had to work
around. One line per entry: what was missing, where it bit, and the proposed
hub fix. Surface these for promotion via `/request-lego` or a hub PR.

- **Missing token: `--color-surface-subtle`.** Referenced (always with a
  fallback, e.g. `var(--color-surface-subtle, var(--color-primary-subtle))`)
  in AG Grid `rowHoverColor` theming across 4+ components now
  (`cbf-crs-commitments-grid`, `cbf-crs-documents-grid`, and pre-existing
  `cbf-invoice-review-queue`, `cbf-vendor-dashboard-invoices`,
  `cbf-portfolio-explorer`) but never actually defined in `@esa/tokens`. The
  fallback keeps it from breaking, but the recurrence across independently-
  built components suggests every author expects this token to exist. Proposed
  fix: either define `--color-surface-subtle` as a real semantic token in the
  hub (a step between `--color-surface` and `--color-surface-sunken`), or
  document that `--color-primary-subtle`/`--color-surface-sunken` are the
  canonical row-hover tokens so new components stop reaching for a name that
  doesn't exist.
