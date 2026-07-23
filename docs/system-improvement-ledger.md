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

- **RESOLVED — `esa-select` never rendered in this spoke's dev server**
  (esassoc/ecology#5). Root cause turned out to be class-field shadowing:
  `esa-select.ts` declared its internal state (`_search`/`_selected`/`_open`/
  `_active`) as real TS class fields instead of ambient `declare` fields, which
  shadowed the reactive accessor Lit installs on the prototype — Lit's dev-mode
  build throws on the very first `performUpdate()`, before `render()` ever
  runs, so the element silently never defines. Fixed on the hub in commit
  `a915170` ("Fix class-field shadowing that breaks rendering in 4 Lit
  components" — `esa-select`, `esa-input-tag`, `esa-file-upload`,
  `esa-sidebar-nav` all had the same anti-pattern). Pulled into this spoke,
  tokens rebuilt, verified live at `/design-system/components/esa-select` and
  in the map-sow wizard's Substrate step — renders and selects correctly now.
  The native `<select>` workaround in map-sow (commit `b5a60d6`) was reverted
  back to `esa-select` in `feature/restore-map-sow-esa-select`, and the two
  CRS Commitments components that added their own native `<select>`/
  `<textarea>` fallback after this bug but before the fix landed
  (`cbf-crs-create-commitment-dialog.astro`, `cbf-crs-commitments-dashboard.astro`'s
  status-edit dialog) have also been reverted back to `esa-select`/
  `esa-textarea` — no known remaining native-control workarounds for this bug
  in this spoke.

  **Correction to an earlier entry in this file**: `esa-textarea` was
  previously logged here as "very likely the same bug" based on its
  design-system preview also rendering empty. That diagnosis was wrong —
  `esa-textarea.ts`'s reactive fields were already correctly `declare`d (no
  shadowing), and re-testing after a clean dev-server restart showed it
  rendering fine. The empty preview was a stale Vite `optimizeDeps` cache in
  that session, not a component bug. Lesson: an empty design-system preview
  with no console error is consistent with BOTH a real component bug and a
  transient dev-server cache/pre-bundling issue — a full server restart
  (`rm -rf node_modules/.vite`, restart, let it settle before testing) is
  worth ruling out before concluding it's a hub-side bug.
