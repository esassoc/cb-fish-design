# @cbfish/design

The **CB Fish** design spoke — the brand and prototype layer for the Columbia
Basin Fish & Wildlife Program portal, built on the **[ESA Ecology](../ecology)**
hub design system. An **Astro + plain-web-tech** repo (not Angular) that consumes
the hub's tokens and components and re-skins them to the CB Fish brand.

## Hub & spoke

```
@esa/ecology  (hub)              @cbfish/design  (spoke)
─────────────────────            ──────────────────────────
primitives  ───────────────────▶ inherit (never overridden)
semantic    ───────────────────▶ inherit, then OVERRIDE brand
component   ───────────────────▶ inherit
esa-* components ──────────────▶ reuse (auto re-skinned by token overrides)
                                 + CB Fish-specific components (cbf-*.astro)
```

CB Fish keeps Ecology's structural foundation (spacing, radius, layout, the full
component set) and overrides only the **brand layer**: a navy-blue palette and the
IBM Plex type family. Because Ecology components read *semantic* tokens, the
override re-skins them with no component changes. See [`NEEDS.md`](./NEEDS.md).

## Inheritance model

Both hub packages are consumed as local packages via `file:` link
([`package.json`](./package.json)):

```jsonc
"dependencies": {
  "@esa/ecology": "file:../ecology/packages/ecology",
  "@esa/tokens":  "file:../ecology/packages/tokens"
}
```

The hub's tokens must be built (`npm run build:tokens` in `../ecology`) so
`@esa/tokens/tokens.css` resolves. Independent repo, independent versioning — a
true spoke. (Production target: real versioned installs from GitHub Packages.)

## Token cascade (CSS custom properties — no SCSS)

Theming is a `[data-theme]` override of the **semantic** layer, loaded after the
hub tokens. Wired in [`src/layouts/BaseLayout.astro`](./src/layouts/BaseLayout.astro):

```ts
import '@esa/tokens/tokens.css';           // 1. hub primitives + default teal semantics
import '@esa/tokens/component-tokens.css';  // 2. tier-3 component tokens
import '../styles/theme-cb-fish.css';       // 3. CB Fish brand override
// <html data-theme="cb-fish"> activates the override
```

[`src/styles/theme-cb-fish.css`](./src/styles/theme-cb-fish.css) is the **only
required brand artifact** — it re-points `--color-primary` to navy, swaps
`--font-sans`/`--font-display` to IBM Plex, remaps `--font-weight-*` to IBM Plex's
weights, and adds `--cbf-*` chrome tokens. It follows the hub's two spoke rules:
**primitives never move** (re-point the consuming semantic token instead), and the
**type contract** (override `--font-sans` ⇒ also set matching `--font-weight-*`).

## Specimens → Astro

Visual work is **specimen-first**: design in self-contained HTML/CSS, lock it
against the Figma, then translate to **Astro components** as a mechanical step —
building `cbf-*.astro` components and reusing hub `esa-*` components/tokens.

```bash
npm run dev           # serve the Astro app (consumes the live hub chain)
# specimens are static HTML in /specimens — open specimens/home.html directly
```

| Specimen | Figma node | Status |
|---|---|---|
| [`specimens/home.html`](./specimens/home.html) | `271:1677` | locked vs Figma |

## Status

First pass — Home page. Repo scaffold, brand tokens, and Home specimen are in
place; the specimen is being translated into `cbf-*.astro` components that compose
the hub's `esa-*` primitives and consume the live token chain.
