# Start-of-year (SOY) budgets

Source prototype: https://esassoc.github.io/cb-fish-design/soy/

The recommended future state of SOY: a cycle overview with next actions by role, a setup wizard, a projects workspace with a side panel, final decisions, transfers with reconciliation, close-out, and activity.

## Data

- Fixture: `src/data/soy/seed.ts`
- Client store: `src/lib/soy/store.ts`
- Screens: /soy (overview), /soy/cycles, /soy/setup, /soy/items (+ item side panel on every screen), /soy/finals, /soy/transfers, /soy/close-out, /soy/activity.
- State changes are plain functions in src/lib/soy/actions.ts; the store wraps each in persist + notify (event cbf-soy:change). Bulk actions return a report of written and skipped projects.
- Demo presets (?step=1…7, plus 4.5 for the PM landing; linked from the separate walkthrough guide, not from the prototype) compose the same actions; src/lib/soy/soy.test.ts pins their numbers (npm test).
- Every behavior change is tagged UI / BE / DEC in src/lib/soy/changes.ts and annotated in place by the “Show what’s changing” layer (cbf-soy-changes).
- All people and comment text are invented; project numbers and titles are illustrative.

| Field | Meaning |
|---|---|
| `item` | project number + fund + account type (Expense) within one fiscal year’s SOY — the Gemini identity |
| `amounts` | whole dollars, recorded per stage (ewb, pm, final), each with who, when and a rationale |
| `transfers` | per project, tied to a Budget Decision (one per round); variance = final − transferred |
| `today` | the demo date moves with the walkthrough (Jan 15 → Jun 15, 2027) |

`stage`: `EWB proposed` · `PM proposed` · `Final budget` · `Complete`

`cycleStatus`: `Draft` · `Open` · `Closed`

`transferStatus`: `No final amount` · `Not transferred` · `Transferred` · `Changed after transfer` · `Partially transferred`

`role`: `Budget administrator (EWB)` · `Project manager`

| Section | What it is | Spec | Screenshots |
|---|---|---|---|
| Draft notice | On Jan 15 the next cycle drafts itself with the standard dates; the overview says so and points the budget administrator to setup. | [draft-notice.md](https://esassoc.github.io/cb-fish-design/handoff/soy/claude/draft-notice.md) 7.0 KB | [desktop](https://esassoc.github.io/cb-fish-design/handoff/soy/claude/draft-notice.desktop.png) · [phone](https://esassoc.github.io/cb-fish-design/handoff/soy/claude/draft-notice.phone.png) |
| Stage tracker | The four stages with open and due dates, the active stage and days left. | [stage-tracker.md](https://esassoc.github.io/cb-fish-design/handoff/soy/claude/stage-tracker.md) 8.3 KB | [desktop](https://esassoc.github.io/cb-fish-design/handoff/soy/claude/stage-tracker.desktop.png) · [phone](https://esassoc.github.io/cb-fish-design/handoff/soy/claude/stage-tracker.phone.png) |
| Progress tiles | Projects in cycle, EWB proposed, PM input received vs needed, final amount set, transferred and variance (final − transferred), always current. | [progress-tiles.md](https://esassoc.github.io/cb-fish-design/handoff/soy/claude/progress-tiles.md) 9.2 KB | [desktop](https://esassoc.github.io/cb-fish-design/handoff/soy/claude/progress-tiles.desktop.png) · [phone](https://esassoc.github.io/cb-fish-design/handoff/soy/claude/progress-tiles.phone.png) |
| Next actions | What the budget administrator should do next for the current stage, each with the button that does it: run setup, set EWB proposed, open the next stage, send a… | [next-actions.md](https://esassoc.github.io/cb-fish-design/handoff/soy/claude/next-actions.md) 4.3 KB | [desktop](https://esassoc.github.io/cb-fish-design/handoff/soy/claude/next-actions.desktop.png) · [phone](https://esassoc.github.io/cb-fish-design/handoff/soy/claude/next-actions.phone.png) |
