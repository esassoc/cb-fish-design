# Capital program prototype

A clickable, front-end-only prototype of a **Capital program** module for CBFish: one place where BPA Fish & Wildlife tracks every capital project (Hatchery, Land, Passage), its approval gates, and a multi-year spending plan against the approved budget. Built from [the PRD](capital-program-prd.md) (Oct 22, 2026) for a walkthrough with Ben Dick and his team. It is not production code.

Route: `/capital-program` (also under **Funding → Capital program** in the nav, and on the home index).

## Run it

This repo is an Astro spoke of the ESA Ecology hub, so the sibling `../ecology` checkout must be present with its tokens built (see the repo README).

```bash
npm install
npm run dev        # http://localhost:4321/capital-program
npm test           # money-math and seed tests (Vitest)
```

Everything runs in the browser. Edits persist to `localStorage`; **Reset demo data** (prototype strip, or Data & settings) puts the seed back.

## How it's built

The PRD suggested React + Vite; this repo is Astro + `esa-*` web components + AG Grid, so the prototype follows the repo instead. The PRD's structure maps across directly:

| PRD | Here |
| --- | --- |
| Domain types first | `src/lib/capital/types.ts` |
| Seed JSON from the Seed data tables | `src/data/capital-program/seed.ts` — compact rows expanded into quarterly plans and monthly actuals; the three seeded snapshots are built from the same rows plus each snapshot's "notable differences" |
| All money math in one pure module | `src/lib/capital/finance.ts` (+ `finance.test.ts`) |
| State changes | `src/lib/capital/actions.ts` — pure functions over the state (snapshot, add to plan, close FY, import…) |
| Single store, persisted, with reset | `src/lib/capital/store.ts` — also holds the header lens (FY, envelope source, snapshot, role, what-if picks) and the role permission matrix |
| Six screens | `src/pages/capital-program*.astro`, sections in `src/components/capital-program/` |

Screens: **Portfolio** (`/capital-program`), **Project detail** (`/capital-program/project?id=…`), **Requests**, **Snapshots & compare**, **Adjustments** (with the Close FY wizard), **Data & settings**.

### Tests that must pass (PRD)

All in `src/lib/capital/finance.test.ts`, run with `npm test`:

- FY27 Asset Plan category totals = 16,183 / 21,495 / 10,737 / 48,415
- FY27 headroom vs Asset Plan Expected = 0; vs Optimal = 12,104; vs IPR = 18,573; with all FY27 requests in what-if = (30,900)
- FY28 Asset Plan proposed total = 63,846
- Importing the sample CSV sets Klickitat FY26 actuals to 18,301, June negative
- Saving a snapshot then editing a forecast leaves the snapshot unchanged
- "Not greenlit" until the last gate goes green, then "Greenlit"
- Re-forecasting a $20,000 project with $3,000 of actuals offers $17,000

## Demo script (about 30 minutes)

Start as **Program manager** (prototype strip, top right), Current FY **FY27**, Envelope **Asset Plan Expected (SOY)**. If anything looks off, press **Reset demo data**.

1. **One screen, by FY, project and category (Goal 1).** Portfolio: Hatchery Expand, Hatchery Sustain, Land and Passage on one grid with subtotals and a grand total of 48,415 for FY27. Switch Current FY to FY28 — the columns shift and the total reads 63,846.
2. **Headroom (Goal 2).** Back on FY27 the tiles show **0** headroom against the 48,415 Asset Plan, **12,104** of room up to the 60,519 Optimal ceiling ("Finance can approve up to Optimal"), and 30,900 of open requests beside it. Switch Envelope to **IPR / rate case**: 18,573 of headroom, tagged *Information only*.
3. **Say yes to Hall Ranch?** Open **What if we say yes?** and tick Hall Ranch: Passage goes to (14,000) — short — in red. Tick every request: the total reads (30,900). The Passage tile shows the placeholder being drawn down and the competing asks (Hall Ranch, Nason Creek, estuary).
4. **The flags.** Grid: turn on **Flagged only** — Chief Joseph and Sherman Creek carry construction spend without OMB appropriations language. Click a headroom tile to filter the grid to that category; **Export CSV** saves the current view.
5. **One green-light pathway (Goal 4).** Open **Coeur d'Alene**: funding is green (long-term agreement signed) but the Asset Plan light is red — the ~$20M IPR gap. Open **Waterwheel**: "Not greenlit — 4 of 7 steps", FY28 spend outlined in amber, and over its 12,300 modified budget because the 26,346 increase is still pending. Edit Leadership and CBFish budget to Green and NPCC to Step 3 — the header flips to **Greenlit** and the amber goes away.
6. **The spending plan.** On Waterwheel, type into an open quarter — the overage, the Portfolio and the headroom all move. Use **Spread evenly** (e.g. 16,000 over 8 quarters) and **Move money** (writes an adjustment with its document). Switch to **Project PM** (Mary Todd Haight): she can edit Waterwheel but not Prosser.
7. **Requests (R6).** The banner says to send new needs to the Asset Plan lead by the turn-in date. The estuary request carries the OMB flag; **Add to plan** warns it is not in the FY27 Asset Plan, and the flag follows it onto the new placeholder in the Portfolio.
8. **Actuals.** Data & settings → **Import the sample CSV**: Klickitat FY26 actuals become 18,301 (June shows the (169) reversal), and Klickitat now shows over budget on its detail page.
9. **Planned vs. actual, preserved (Goal 3).** Snapshots & compare: press **Baseline vs current** — Waterwheel FY28 33,124 → 16,562, Trinity FY27 10,452 → 5,226, sorted by the biggest change, with the notes and adjustments logged in between. **Save snapshot** as "FY27 Q1", then pick a past snapshot in the header: every screen goes read-only with a banner.
10. **A forecast that re-sets honestly (Goal 5).** Adjustments → **Close FY** for FY26: Klickitat and Trinity show variances. Each project's *remaining need* (modified budget − all-time actuals) is re-spread across future quarters with a reason — not the FY's unspent amount, and nothing is banked into FY27. One "Year-end re-forecast" adjustment is written per project; the variance totals by category feed the Asset Plan 5.2 tables.

## Assumptions shown in the UI

Each open question from the PRD is hard-coded with a working assumption and an **Assumption** tag (hover for the detail): the gate list (1), spending outside the Asset Plan (2), the IPR–Asset Plan gap as information only (3), the OMB threshold as a setting (4), the rate period (5), this year's calendar dates (6), Hall Ranch (7), the DMF items (8), Grande Ronde capitalization (9), land parcels and CBFish reconciliation not built (P1), and the FY26 Passage 943 carried as an unallocated placeholder (15).

## Not built yet (P1)

Land parcels and the parcel-based forecast, redirect suggestions beyond the "freed this year" line, Finance / Table 5.1 / execution report exports, the presentation view, CBFish reconciliation, the escalation what-if, execution-rate history and the planning calendar.
