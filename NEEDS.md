# CB Fish — Needs Analysis

Gap analysis between the **CBFish Modernization** Figma (source of truth) and the
**@esa/ecology** hub design system. This is the inventory that drives what the
`cb-fish-design` spoke inherits, overrides, and builds new.

> Figma: CBFish Modernization — Home, node `271:1677`
> Hub: `@esa/ecology` (Astro + token-driven component library; interactive parts are framework-agnostic Lit web components)

---

## 1. Token delta

CB Fish shares ecology's **structural** tokens and diverges on the **brand** layer.

| Token group | CB Fish (Figma) | Ecology | Action |
|---|---|---|---|
| Spacing scale | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 | identical numeric scale | **Inherit as-is** |
| Radius | 4px | `--radius` / `spacing-100` = 4 | **Inherit** |
| Gray ramp | mostly shared; pins `#dcdcdc` (200), `#7c7c7c` (500) | full gray ramp | **Inherit + 2 overrides** |
| **Primary color** | navy blue — `#13273e` / `#1e5386` / `#c6dcf1` / `#f3f7fc` | teal `#005862` | **Override** → new blue ramp + re-point `--color-primary` |
| **Body font** | IBM Plex Sans | DM Sans | **Override** `--font-sans` |
| **Display font** | IBM Plex Sans **Condensed** (logotype, big numbers, section titles) | — none — | **New** `--font-display` token |

Brand layer lives in `src/styles/theme-cb-fish.css` as a `[data-theme="cb-fish"]`
block, loaded *after* the hub's `tokens.css` + `component-tokens.css`. It overrides
the **semantic** layer only (primitives never move — re-point the consuming
semantic token instead). The `--font-display` slot and the `--color-primary-subtle`
/ `--color-primary-border` pair now exist in the hub (promoted up from this spoke).

---

## 2. Component delta

### Reuse from ecology (re-skinned automatically by the token overrides)

| CB Fish need | Ecology component | Notes |
|---|---|---|
| Page banners (info / warning / success) | `esa-alert-box` | Maps 1:1 to its variants |
| Search w/ scope selector | `esa-combobox` / `esa-select` | Scope dropdown + free-text input |
| Buttons & text links | `esa-button` | Inherits blue primary |
| Section control pill (Prev · Enlarge · Next) | `esa-button-group` | Compose 3 ghost buttons + dividers |

### Build new (CB Fish spoke components)

| Component | Purpose | Notes |
|---|---|---|
| `cbf-public-nav` | Two-tier public nav: dark **admin bar** (Data management / System status / System configuration / Help) + blue **header** (logo · primary nav · scoped search · user). | Distinct from ecology's app-shell `esa-header-nav`. |
| `cbf-hero` | Full-bleed image with logotype overlay. Hosts optional banners. | No ecology equivalent. |
| `cbf-stat-tile` / `cbf-stat-grid` | Big number + uppercase label, 2×2 tinted grid (37 Funds, 317 Projects, 766 Contracts, 68,793 Work sites). | `esa-card` is close but not this layout. |
| `cbf-section-header` | Centered display title + control pill row. | Composes `esa-button-group`. |
| `cbf-site-footer` | Marketing footer: 5 link columns + CB logo + BPA logo + version/meta line. | No ecology equivalent. |
| Chart ("Projects at a Glance") | Data viz | Out of scope for the spoke — external charting lib / placeholder in app. |

---

## 3. First-pass scope

**Home page only** (Figma node `271:1677`), specimen-first:

1. ✅ Repo + inheritance model (`file:` links to `@esa/ecology` + `@esa/tokens`)
2. ✅ Brand token layer (blue ramp + IBM Plex + display font), `theme-cb-fish.css`
3. ✅ Self-contained HTML specimen of the Home page → locked vs Figma
4. ⏳ Mechanical translation to **Astro** `cbf-*.astro` components — composing hub
   `esa-*` primitives (per the reuse table above) and consuming the live token chain

Sections proven by the Home specimen: public nav · hero · stat grid · about ·
"Projects at a Glance" section · site footer.

---

## 4. Open hub requests

These are gaps where the spoke reaches a primitive or hand-rolls a primitive
because no hub semantic / lego covers the case. Logged here as hub asks. Revisited
in the **2026-06-15 component-first refactor** (search prototype + landing decomposed
to the manifest discipline); the workaround column now reflects the centralized homes.

| # | Request | Why it recurs | Current workaround in spoke |
|---|---|---|---|
| 1 | **Semantic document/file-link color role** (hub `--color-document-link`) | CB Fish needs a green for document paths that is NOT the status-success green; prod renders publication paths in green as a recognizable affordance | Now a spoke semantic `--cbf-document-link` (`theme-cb-fish.css`), consumed by `cbf-pubs-results`. Promote to a hub `--color-document-link`. |
| 2 | **`--color-attention*` semantic trio** (base / subtle / border) for non-error elevated/highlight states | Impersonation / "elevated session" UI wants an amber distinct from `--color-warning` (form-validation amber); every admin-tooling spoke will want this | `theme-cb-fish.css` defines local `--cbf-amber-attention: #f6c244`, consumed in `cbf-public-nav.astro` |
| 3 | **Borderless omnibox lego** (`esa-omnibox-field` / `esa-search-input`) | The icon + borderless `<input>` + brand focus-ring pattern recurs | Now centralized in **`cbf-search-field`** (the reusable home, bcn-lego-checked), used by `search.astro` + `publications.astro`; the palette + tray-trigger keep their own variants. Promote to hub. |
| 4 | **Scoped multi-entity search palette** (`esa-entity-search-palette`) | `esa-command-palette` is a flat action launcher; `esa-entity-search` is a single-list navigate omnibox — neither does scoped multi-entity results (projects/contracts/people/publications) + a results-page twin | `cbf-omni-search` + the shared `omni-render.ts` core (bcn-lego-checked) |
| 5 | **Anchored entity-preview popover** (person contact card) | A row-anchored popover with detail rows + vCard download + an action foot; `esa-popover` is a bare positioner, not this content shape | Hand-rolled `openPersonCard` in `omni-render.ts` |
| 6 | **Whole-tile link-card lego** (`esa-link-tile` / `esa-card variant="link" href`) | A clickable card-as-link with hover-lift + `::after` full-tile overlay recurs across the spoke | `cbf-layer` and `cbf-prototype` each hand-roll the `::after` overlay (both bcn-lego-checked) |
| 7 | **Composition layer auto-load** | `@esa/tokens/layouts.css` + `type-roles.css` ship as separate exports NOT bundled into `tokens.css` and are not auto-loaded; a spoke must know to import them or pages can't use `.grid`/`.sidebar`/`.type-*` | Spoke imports both in `BaseLayout.astro`. Hub ergonomics ask: bundle into `tokens.css` or document the required imports. |
| 8 | **`esa-combobox` auto-highlight first option on type** | In `mode="autocomplete"`, `_active` resets to `-1` on every keystroke so pressing `Enter` immediately after typing does nothing — the user must press `ArrowDown` first to highlight a result before `Enter` selects it. This breaks the natural type → confirm keyboard flow and is a significant keyboard-accessibility gap. | No spoke workaround — behavior lives inside the component. Hub fix: when the dropdown opens or the search term changes, auto-highlight the first non-disabled filtered option so `Enter` confirms immediately without requiring an arrow-key step first. |
