// Prototypes with no curated spec in src/data/handoff/ yet. They fall back to the
// hub's whole-page capture: derived sections, guessed labels, no authored intent,
// decisions, gotchas or acceptance.
//
// A ratchet, not a permit: `handoff check` fails on any prototype missing a spec
// that is not listed here, and on a listed slug that has one. Entries come off
// when a spec is written and never go back on.
export default [
  'lib-entry',
  'project-budgets',
  'rme-work-elements',
  'legacy-sow',
  'map-sow',
  'home',
  'my-work',
  'lib-pi-editing',
];
