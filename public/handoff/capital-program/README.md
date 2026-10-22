# Capital program

Source prototype: https://esassoc.github.io/cb-fish-design/capital-program/

One shared record of every BPA F&W capital project — Hatchery, Land and Passage — with headroom against the Asset Plan, each project’s green-light pathway, a multi-year quarterly spending plan, requests, snapshots, and the year-end re-forecast.

## Data

- Fixture: `src/data/capital-program/seed.ts`
- Client store: `src/lib/capital/store.ts`
- All money math lives in src/lib/capital/finance.ts and is unit-tested (npm test) against the PRD's "tests that must pass".
- State changes are pure functions in src/lib/capital/actions.ts; the store wraps each in persist + notify (event cbf-cap:change).

| Field | Meaning |
|---|---|
| `amounts` | $000s everywhere except the actuals CSV, which is whole dollars and is divided by 1,000 on import |
| `plans` | per project, per line type: 28 quarter slots, slot 0 = FY24 Q1 … slot 27 = FY30 Q4 |
| `actuals` | per project, per FY: 12 months, Oct first |
| `dataAsOf` | a quarter whose last day is on or before this date is closed and shows actuals |

`recordType`: `Request` · `Placeholder` · `Active` · `Complete` · `Cancelled` · `Deferred`

`envelopeSource`: `apExpected (default)` · `apOptimal (Expected ÷ 0.8 unless entered)` · `ipr (information only)`

`gateStatus`: `Not started` · `In progress` · `Green` · `Red` · `Not applicable`

| Section | What it is | Spec | Screenshots |
|---|---|---|---|
| Header bar | The lens every capital program screen reads: Current FY, envelope source (Asset Plan Expected, Asset Plan Optimal, or IPR as information only) and snapshot (Cu… | [header-bar.md](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/header-bar.md) 17 KB | [desktop](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/header-bar.desktop.png) · [phone](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/header-bar.phone.png) |
| Headroom panel | Answers "can we say yes?" for the selected FY: one tile per category plus total, each showing envelope, Active forecast, Placeholder forecast, open requests an… | [headroom-panel.md](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/headroom-panel.md) 23 KB | [desktop](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/headroom-panel.desktop.png) · [phone](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/headroom-panel.phone.png) |
| Portfolio grid | The capital budget spreadsheet with more columns: every project grouped Hatchery Expand, Hatchery Sustain, Land, Passage with a subtotal per group and a pinned… | [portfolio-grid.md](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/portfolio-grid.md) 9.2 KB, 5 parts | [desktop](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/portfolio-grid.desktop.png) · [phone](https://esassoc.github.io/cb-fish-design/handoff/capital-program/claude/portfolio-grid.phone.png) |
