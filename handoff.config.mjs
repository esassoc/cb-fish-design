// Settings for the hub's handoff pipeline (`npx handoff all`, `npx handoff check`).
export default {
  name: 'CBFish',
  site: 'https://esassoc.github.io',
  base: '/cb-fish-design/', // production base; must match astro.config.mjs
  registry: 'src/data/prototypes.ts',
  specs: 'src/data/handoff',
  out: 'public/handoff',
  components: 'src/components',
  baseline: 'scripts/handoff-guidance-baseline.mjs',
  port: 4398,
  spokePrefix: 'cbf',
};
