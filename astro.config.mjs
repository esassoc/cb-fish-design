import { defineConfig } from 'astro/config';

// Minimal, mirroring ecology-hub. The spoke ships static HTML/CSS; any
// interactivity comes from the hub's Lit web components (self-registering).
//
// Handoff inspection ships as a RUNTIME inspector (src/components/handoff/),
// mounted globally by BaseLayout — it works on the deployed site, not just in
// `astro dev`, so the hub's dev-toolbar integration is no longer wired here.
// The `handoff` CLI is still used to generate the per-route bundles it reads
// (npm run handoff:all).
//
// Published to GitHub Pages as a project site at
// https://esassoc.github.io/cb-fish-design/, so production builds need that
// subpath as `base`. Dev stays at root for clean local URLs — `withBase()`
// (src/lib/base.ts) reads whichever base is active, so paths resolve in both.
const base = process.env.NODE_ENV === 'production' ? '/cb-fish-design/' : '/';

export default defineConfig({
  site: 'https://esassoc.github.io',
  base,
  vite: {
    resolve: {
      dedupe: ['lit'],
    },
    optimizeDeps: {
      include: ['lit'],
    },
  },
});
