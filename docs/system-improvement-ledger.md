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

- **No neutral/gray `esa-badge` variant, and `--color-info` == `--color-secondary`
  in this theme.** `cbf-crs-commitments-dashboard`'s status timeline colors three
  "active" states (In Progress/Delayed/Complete) plus a "quiet" bucket (Not
  Started/Future/Closed) via badge variants info/warning/success/secondary. In
  `theme-cb-fish.css`, `--color-info: var(--color-secondary)` — both resolve to
  the identical `#2770b2` (confirmed via `getComputedStyle` in the browser, not
  just reading the source). Two genuinely different statuses render as the
  exact same color, which silently erased the one visual signal a status
  timeline exists to show. Worked around locally by reading `--color-text-muted`
  instead of a badge variant for the quiet bucket (this component doesn't use
  `esa-badge` for its segments, so the public-token-override trick the "quiet
  tag pair" elsewhere in the same file uses wasn't available — `esa-badge`'s
  non-primary variants don't read the `--badge-bg` override at all). Proposed
  fix: add a genuine neutral/gray `esa-badge` variant to the hub (not an alias
  for `secondary`), and reconsider re-pointing `--color-info` to something
  other than `--color-secondary` in `theme-cb-fish.css` if two visually
  identical "brand blue" tones was never the intent.

  Same file, same root cause, a second instance: `--color-success` resolves to
  `#bdee63`, a pale yellow-green (confirmed via `getComputedStyle`) that's hard
  to see at a small fill/icon size — a user testing the prototype flagged this
  directly ("hard for me to see well"). Worked around by reading
  `--color-green-11` (the hub's own darker "accessible foreground" step of the
  same green ramp — a real existing token, not invented) for both the
  "Complete" timeline segment and the document-received marker. Proposed hub
  fix: reconsider whether `--color-success` should default to a step this pale,
  or whether `theme-cb-fish.css` should re-point it the way it already re-points
  `--color-primary`/`--color-secondary`.
