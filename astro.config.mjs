import { defineConfig } from 'astro/config';
import handoff from '@esa/handoff/integration';

// Minimal, mirroring ecology-hub. The spoke ships static HTML/CSS; any
// interactivity comes from the hub's Lit web components (self-registering).
// `handoff` adds the Dev Handoff inspector to Astro's dev toolbar (dev only).
//
// Published to GitHub Pages as a project site at
// https://esassoc.github.io/cb-fish-design/, so production builds need that
// subpath as `base`. Dev stays at root for clean local URLs — `withBase()`
// (src/lib/base.ts) reads whichever base is active, so paths resolve in both.
const base = process.env.NODE_ENV === 'production' ? '/cb-fish-design/' : '/';

export default defineConfig({
  site: 'https://esassoc.github.io',
  base,
  integrations: [handoff({ manifest: '/handoff/home/manifest.json' })],
});
