# Start-of-year (SOY) budgets — future state

Source prototype: https://esassoc.github.io/cb-fish-design/soy/walkthrough/

The recommended future state of SOY for client sign-off: a cycle overview with next actions by role, a setup wizard, an items workspace with a side panel, final decisions, transfers with reconciliation, close-out, and activity — played through one FY2028 cycle, with a “Show what’s changing” layer on every screen.

## Data

- Fixture: `src/data/soy/seed.ts`
- Client store: `src/lib/soy/store.ts`
- Screens: /soy (overview), /soy/cycles, /soy/setup, /soy/items (+ item side panel on every screen), /soy/finals, /soy/transfers, /soy/close-out, /soy/activity.
- State changes are plain functions in src/lib/soy/actions.ts; the store wraps each in persist + notify (event cbf-soy:change). Bulk actions return a report of written and skipped items.
- Walkthrough presets (?step=1…7, plus 4.5 for the PM landing) compose the same actions; src/lib/soy/soy.test.ts pins their numbers (npm test).
- Every behavior change is tagged UI / BE / DEC in src/lib/soy/changes.ts and annotated in place by the “Show what’s changing” layer (cbf-soy-changes).
- All people and comment text are invented; project numbers and titles are illustrative.

| Field | Meaning |
|---|---|
| `item` | project number + fund + account type (Expense) within one fiscal year’s SOY — the Gemini identity |
| `amounts` | whole dollars, recorded per stage (ewb, pm, final), each with who, when and a rationale |
| `transfers` | per item, tied to a Budget Decision (one per round); variance = final − transferred |
| `today` | the demo date moves with the walkthrough (Jan 15 → Jun 15, 2027) |

`stage`: `EWB proposed` · `PM proposed` · `Final budget` · `Complete`

`cycleStatus`: `Draft` · `Open` · `Closed`

`transferStatus`: `No final amount` · `Not transferred` · `Transferred` · `Changed after transfer` · `Partially transferred`

`role`: `Budget administrator (EWB)` · `Project manager`

| Section | What it is | Spec | Screenshots |
|---|---|---|---|
| How to use it | Orients a client reviewer: what the prototype is, that it changes nothing in CBFish, and the four prototype devices — step links, the role lens, the “Show what… | [how-to-use-it.md](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/how-to-use-it.md) 8.4 KB | [desktop](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/how-to-use-it.desktop.png) · [phone](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/how-to-use-it.phone.png) |
| Step cards | The FY2028 cycle as seven steps, each linking to the screen and loading the demo state for that moment (?step=N&role=…), so a reviewer can start anywhere. | [step-cards.md](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/step-cards.md) 24 KB | [desktop](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/step-cards.desktop.png) · [phone](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/step-cards.phone.png) |
| Decisions table | The eight decisions BPA needs to make, with the option the prototype shows and the alternative, each linked to where it can be seen. | [decisions-table.md](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/decisions-table.md) 8.5 KB | [desktop](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/decisions-table.desktop.png) · [phone](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/decisions-table.phone.png) |
| Problem map | Each of today’s ten problems (P1–P10) with the screens and changes that answer it, plus counts of UI, BE and DEC changes so engineering can see the weight. | [problem-map.md](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/problem-map.md) 5.4 KB | [desktop](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/problem-map.desktop.png) · [phone](https://esassoc.github.io/cb-fish-design/handoff/soy-walkthrough/claude/problem-map.phone.png) |
