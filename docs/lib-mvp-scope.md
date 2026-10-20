# LIB MVP — v1 scope

**Decided 2026-10-20.** The line item budget (LIB) entry screen, cut down to what
can be built for the production deadline (Beacon-like Angular app + backend,
~6–8 weeks, 1–2 devs). The prototype for this scope is **`/lib-mvp`**; the full
exploration stays intact at `/lib-entry` (grid), `/lib-entry-sheet`, and
`/lib-entry-wizard` as the long-term vision.

## What v1 must do

1. **Standardized categories** — one fixed category taxonomy is the single way
   to label a budget expense.
2. **A complete review loop** — the vendor submits, the BPA COR marks lines and
   returns or approves, the vendor fixes and resubmits.
3. **Correct totals** — the budget reconciles to the Contract Value, with
   indirect and subcontracts rolled in.

## In v1

### Entry
- **Grid only.** Inline entry; the side-sheet and wizard models are not built.
- **Nine standard categories** with their fixed sub-blocks (e.g. Supplies
  office / field / capital). Personnel is **not** split into admin / technical.
  Sections collapse / expand.
- **Line model — three shapes:**
  - quantity × rate (personnel, travel, vehicles, supplies, meetings, other)
  - percent of a base (fringe only)
  - lump sum (must be described)
- **"What is this line" pickers** — plain dropdowns over fixed lists: vehicle
  type, vehicle cost kind, travel kind, meeting kind, other kind, position time
  unit.
- **Positions** — a title, a staff count, a time unit, **one** rate.
- **Vehicle rate prefill** — picking a vehicle type fills the GSA monthly /
  per-mile rate as an **editable default**, from a static, admin-maintained
  table (not an integration).
- **Linked quantities** — a line's quantity may follow **one** position line
  (e.g. a phone line's months). Detach / re-follow from the row menu. One hop
  only, no chains.
- **Fringe** — generated from salary lines; adjustable budget default (35.1%),
  per-line override.
- **Supplies** — vendor files each line expensed or capital by hand.
- **Indirect** — **one** CO-approved rate and its base (MTDC / TDC / S&W /
  S&W + fringe). Under MTDC, the $25K-per-subaward cap applies.

### Subcontracts
- A subcontract is a line on the contract LIB with a **child LIB** behind it.
- The child is the **same form**, minus the indirect block. One level deep — no
  subcontracts of subcontracts.
- Subcontract detail kept: **name, type, optional attached document.**
- The child's total rolls up into the parent's subcontract line.

### Reconciliation
- **Rail** — running total vs Contract Value, direct / indirect split.
- **Submit gates (9):**
  1. Positions named
  2. Months within the contract period
  3. Travel lines have a destination
  4. Vehicle lines have a type
  5. Lump-sum lines described
  6. Indirect rate selected
  7. Total within Contract Value
  8. Every Required mark addressed
  9. All child LIBs pass the same gates
- **Advisories (3, non-blocking):** indirect rate pending CO approval; fringe
  overridden; expensed supply line over $5K.

### COR review
- Marks on a line: **Required** or **Question**, a note, a short fixed reason
  list.
- **Return** or **Approve**; Approve blocked while Required marks are open.
- Vendor ticks marks **addressed** and resubmits. **Go to line** from a mark.
- **One cycle** covers the parent and all child LIBs.

### Roles, state, saving
- Vendor edits in **draft / returned**. While with the COR the budget is
  read-only except for COR marks. **Locked once approved** — later changes go
  through the contract change process.
- **Autosave** per line on blur, with a saved indicator; totals computed
  server-side (the rail never disagrees with the stored budget).
- **Emails (2):** COR on submit / resubmit; vendor on return / approve.

### Also in
- First-run empty state; contract context header.

## Deferred to v2 (leave room in the data model)

| Feature | Why deferred / note |
|---|---|
| Work-element allocation per line | Keep a nullable work-element link on lines |
| Vendor accounting codes + by-code summary | Gated nothing; invoice matching is v2 |
| Excel / CSV import | Change management may want it later |
| Copy lines from another contract | Cross-contract query |
| GSA per-diem / mileage lookup, above-GSA vehicle flag | Needs a yearly-refreshed external rate set |
| Multiple indirect rates with month-by-month coverage | Date-range logic; v1 takes one rate |
| Private-until-return marks, return memo, cycle count | Review polish |
| Contract-state header ("whose turn it is") | Workflow chrome |

## Cut

- Side-sheet and wizard entry models
- Trips as containers (grouping, occurrences, M&IE 75% first/last day, drag-to-group, meeting↔trip link)
- Rate steps on a position ("Add another rate")
- Drag-to-reorder
- Capitalization-threshold auto-filing and the adjustable threshold
- Subcontract bid table, cost share, preparer / basis
- Nested subcontracts
- Chained linked quantities

## Out of scope

- **`/lib-pi-editing`** (CBF-8204) — replacing an attached LIB / PI *document
  file* and resetting its approvals. A separate feature, not budget entry.
