import { defineConfig } from 'astro/config';
import handoff from '@esa/handoff/integration';

// Minimal, mirroring ecology-hub. The spoke ships static HTML/CSS; any
// interactivity comes from the hub's Lit web components (self-registering).
// `handoff` adds the Dev Handoff inspector to Astro's dev toolbar (dev only).
export default defineConfig({
  integrations: [handoff({ manifest: '/handoff/home/manifest.json' })],
});
