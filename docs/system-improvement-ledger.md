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

- **`esa-select` and `esa-textarea` never render in this spoke's dev server**
  (esassoc/ecology#5 for `esa-select`; `esa-textarea` shows the identical
  symptom and is very likely the same bug). Confirmed live at
  `/design-system/components/esa-select` and `/design-system/components/esa-textarea`
  — the Preview/Sizes/States boxes render completely empty, no console error.
  Isolated the cause to the *import path*, not the component itself: a raw
  `import('/node_modules/@esa/ecology/src/components/esa-select.ts')` (direct
  file path) renders the element correctly with a live shadow root; the normal
  bare-specifier `import '@esa/ecology/esa-select'` a real page uses does not —
  the custom element is simply never defined, silently. Other Lit legos
  imported the same bare-specifier way in this spoke (`esa-text-field`,
  `esa-date-picker`, `esa-dialog`, `esa-chip-group`, `esa-snackbar-container`)
  all work fine, so this isn't a spoke-wide Vite resolution problem — something
  specific to how these two components' modules are structured/registered
  breaks under the bare-specifier resolution path. Worked around both times by
  falling back to native `<select>`/`<textarea>`, styled to match the
  surrounding field chrome (map-sow commit `b5a60d6`;
  `cbf-crs-create-commitment-dialog.astro` here). Proposed hub fix: reproduce
  the bare-specifier import path (not a direct file import) in a spoke dev
  server and find what's different about `esa-select`/`esa-textarea`'s module
  vs. the working components — likely worth checking for a duplicate/shadowed
  `customElements.define` registration or a top-level import that throws
  silently inside a try/catch.
