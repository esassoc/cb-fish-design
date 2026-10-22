# PRD: CBFish Capital Program Interface (Prototype)

Oct 22, 2026 · @Gloria Scott

## Context and how to use this PRD

Build a clickable, front-end-only prototype of a new **Capital Program** module for CBFish: one place where BPA Fish & Wildlife tracks every capital project (Hatchery, Land, Passage), its approval gates, and a multi-year spending plan against the approved budget. The prototype exists to put something concrete in front of Ben Dick and his team so they can react to it; it is not production code.

**For Claude Code:** treat the P0 requirements as the build scope, the Seed data section as your mock dataset, and the Open questions as assumptions to hard-code and label in the UI (a small "Assumption" tag), not as blockers. Everything is in thousands of dollars ($000s) unless a column says otherwise. Fiscal years run October 1 – September 30 (FY27 = Oct 2026 – Sep 2027).

**What this is based on.** The Oct 5, 2026 capital meeting (Ben Dick, Victoria DuVal, Rodrigo George, Michelle O'Malley, Gloria Scott), Ben's email thread (Sep 30 – Oct 5), his 15-year Capital Budget workbook, Gloria's FY26 Q3 execution report and workbook, the FY27 Asset Plan forecasting tables, the FY24 Q3 review packet, the FY24 land acquisition tracker, and the FY17–FY26 passage actuals export.

## What the Oct 5 meeting changed

The meeting shifted the center of the module from "a better forecast spreadsheet" to "a shared record of where each capital project is on its path to a green light, and what it will really spend". Ben's own summary: one place everyone works from, so the program survives any one person dropping off.

| Takeaway | Said by | Change in this PRD |
| --- | --- | --- |
| A project needs several separate green lights before money can be spent — leadership approval, OMB, capitalization policy, a funding source, the Asset Plan, and money placed in the FY in CBFish — and no one has written the steps down | Michelle ("maybe it's a five-legged stool"), Rodrigo, Ben | R7 becomes an approval pathway checklist; step list is an open question for Michelle and Rodrigo |
| The agency now budgets capital to the Asset Plan, project by project, not to the IPR; the Asset Plan feeds the SOY budget | Rodrigo, Victoria | Asset Plan Expected is the default envelope; IPR headroom is shown as information only |
| Every Asset Plan is a reset: unspent money is not banked, the remaining need is re-forecast | Victoria | R8 changes from "carry forward unspent" to "re-forecast remaining need, with a variance reason" |
| Finance allows spending up to the Optimal level; Expected is 80% of Optimal | Victoria, Rodrigo | Headroom panel shows an Optimal ceiling |
| FY27 IPR ($66M) was lopsided by \~$20M for the Coeur d'Alene hatchery that didn't start; the Asset Plan came in at $48M | Rodrigo | Explained in seed data; disputed use of that gap is an open question |
| Passage is the least tracked category and runs on a placeholder that Nason Creek, Chesnimnus, Hall Ranch and the estuary all draw on | Victoria, Rodrigo | Passage tile shows placeholder drawdown |
| New requests miss the window if they arrive late: OMB first, then the Asset Plan, which Victoria can still change only until it's turned in | Rodrigo, Victoria | Requests carry pathway gates and the Asset Plan cycle they target |
| Hatcheries usually come in 20–40% over plan and start late; land closes about half of what it plans | Ben | P1 escalation what-if and execution-rate history |
| CBFish has no capital/expense flag on projects; CBFish working budgets show about $37M of FY27 capital, which doesn't match the plan | Gloria, Michelle | Account type field; P1 CBFish reconciliation |
| Rodrigo already built CBFish portfolios for capital projects; show Hatchery, Land and Passage on one screen with a simple summary on top | Rodrigo | Portfolio grid groups by portfolio membership |
| The view must work at DMF meetings and quarterly budget reviews | Ben | P1 presentation view |

**Next steps agreed:** Ben sends his spreadsheet and the OMB budget; Victoria sends a trimmed Asset Plan forecast and a quarterly report (both received). Gloria asked to walk through the yearly timeline (IPR → SAMP → Asset Plan → SOY → quarterly reports) and Ben's "what if" scenarios at the next session, planned for the week of Oct 19.

## Problem statement

BPA F&W cannot answer "do we have the capital budget to say yes to this request?" quickly or with confidence. The program spends roughly $46–49M a year in capital across about 30 projects, but the plan lives in a personal spreadsheet last updated in January 2026, while the real forecast is scattered across five other documents owned by different people.

**Where the data lives today**

| Source | Owner | Cadence | What it holds |
| --- | --- | --- | --- |
| Capital Budget workbook | Ben Dick | Ad hoc (70+ snapshot tabs since 2012) | Project list, prior-year actuals, current and next-year budget, comments |
| Hatchery Capital Execution Report | Gloria Scott | Quarterly | Per-project budget history, quarterly spend plan, milestones, narrative |
| Asset Plan (Table 5.1, 5.2) | Victoria DuVal | Annual (set at start of year) | Optimal/Expected forecast by project for FY+1, FY+2 |
| Land Acquisition Tracking | Land team | Monthly | Parcel status (Green/Yellow/Red), closing quarter, appraised value |
| Finance quarterly forecast | Finance (Heather) | Quarterly | EOY forecast by capital category with rationale |
| OMB budget | Agency | Annual | Project list and narrative (several hundred pages) |

**What this costs today**

- A DMF asked for two $5M items while Rodrigo was out, and Ben had no way to tell whether the program could afford them.
- FY27–28 requests are untracked: Hall Ranch ($14M, in OMB but not the Asset Plan; it was a $2M project three years ago), the DMF items, and about $2.2M for Grande Ronde that leadership told Tracy to pursue.
- The FY27 Asset Plan capital ($48.4M) is already fully allocated to Asset Plan projects, so every new request is a headroom question no one can answer from one screen.
- The path to a green light is unwritten: leadership approval, OMB, capitalization policy, funding source, Asset Plan and CBFish budget are tracked by different people (Ben, Rodrigo's SharePoint list, Dorie, Victoria, Michelle), so a project can be green on three and red on the fourth without anyone seeing it.
- Slippage is invisible until year-end: FY26 started at $53.2M and the Q3 expected EOY is $46.4M, a $6.8M gap that was not redirected to projects that could have used it.
- The spreadsheet's most valuable feature — seeing what was planned versus what actually happened — depends on manually copying a tab each time; it hasn't been updated in nine months and the current tab carries broken #REF! totals.
- CBFish itself can't list the capital projects: there is no capital/expense flag, and its FY27 capital working budgets sum to about $37M against a $48.4M plan.

## Goals and non-goals

The prototype succeeds if Ben can walk through it and say "yes, this replaces my spreadsheet" for the FY27–28 planning conversation.

**Goals** (each is a demo scenario the prototype must support)

1. **One-screen answer by FY, project and category.** Show the FY27 and FY28 capital forecast for every project, subtotaled by Hatchery, Land and Passage, in under a minute from login.
2. **Headroom against the approved budget.** For any FY, show the approved envelope (IPR/rate case, Asset Plan Expected and Optimal), committed forecast, placeholders, open requests, and the remaining headroom. Demo: FY27 shows $0 headroom against the $48.4M Asset Plan Expected, $12.1M up to the $60.5M Optimal ceiling, and $18.6M against the $67.0M IPR (information only), with $30.9M in open requests.
3. **Planned vs. actual, preserved.** Freeze a forecast snapshot each quarter and compare any two snapshots project by project, so the history Ben valued in his spreadsheet is automatic.
4. **One green-light pathway.** Each project shows its approval pathway — leadership, OMB, capitalization, funding source, Asset Plan, CBFish budget, plus the Council 3-step for hatcheries — as a row of green/yellow/red lights, and the prototype flags any spend planned before the pathway is green.
5. **A forecast that re-sets honestly.** Quarterly spend plans span multiple FYs. When a project slips, its remaining need (modified budget − actuals) is re-spread across future years with a recorded reason, matching how each new Asset Plan re-forecasts rather than banks unspent money.

**Non-goals for the prototype**

- **Live integration with BPA financials or CBFish contracts.** Actuals come from a CSV shaped like the Finance export; integration is a design question for later.
- **Expense / O&M budgeting.** Capital only; O&M appears only as a read-only reference figure if at all.
- **Writing the Asset Plan or OMB narrative.** The module produces the numbers and exports tables; the documents stay where they are.
- **Approval workflows** (DMF, Finance Committee, budget change requests). The prototype records the decision and its document reference; it does not route approvals.
- **Full land acquisition management.** Parcels are linked and summarized; the Land team's detailed tracker is not rebuilt.
- **Real authentication and permissions.** A role switcher in the header is enough.

## Users and personas

The primary user is the capital program manager; everyone else either feeds the plan or consumes a report from it. The prototype's role switcher should offer the first four roles.

| Persona | Who today | Main job in the module | Edits |
| --- | --- | --- | --- |
| Capital Program Manager | Ben Dick (BPA EWB-4) | Owns the portfolio view, says yes/no to requests, runs quarterly reviews | Everything |
| Asset Plan Lead | Victoria DuVal (contractor), with Rodrigo George | Sets the Asset Plan baseline at start of year; tracks new needs for the next Asset Plan/SAMP | Baseline snapshot, budget envelopes, requests |
| Project PM / COR | Mary Todd Haight, Tracy Hauser, Andy Traylor, Brian McIlraith, Carlos Matthews, Alan Whiting, Jennifer Lord, Victoria Bohlen | Updates their projects' quarterly spend plan, milestones, gate status and notes | Own projects only |
| Execution Report Analyst | Gloria Scott (ESA) | Compiles the quarterly execution report and Finance forecast from the module | Snapshots, notes, exports |
| Land Team | Realty / land PMs | Keeps parcel status current so Land forecasts reflect what will close | Parcels (P1) |
| Finance | Heather and Finance staff | Receives the quarterly EOY forecast by capital category | Read-only export |

Others who own a step on the approval pathway, from the Oct 5 meeting:

| Person | Role in capital | In the module |
| --- | --- | --- |
| Michelle O'Malley (BPA) | Puts approved money into the fiscal year in CBFish; pushing to keep projects single-account (not mixed) | Updates the "CBFish budget" light; read-only otherwise |
| Rodrigo George (BPA) | Keeps a SharePoint list of OMB status; built CBFish capital portfolios; sits in DMF | Updates the OMB light; maintains portfolio membership |
| Dorie (BPA) | Owns capitalization policy (what counts as capital) | Updates the "Capitalization" light |
| Jason Sweet (BPA leadership) | Approves projects and transfers (e.g. land money moved to a hatchery) | Recorded as the approver on the "Leadership" light; not a user |
| Matt Schwartz (Land lead) | Keeps his own land spreadsheet | Land team role (P1) |
| Legal | Increasingly involved in what goes into OMB | Not a user |

## Domain model and glossary

The core idea: a **Project** carries a versioned, quarterly **Spending Plan** that is measured against a fiscal-year **Budget Envelope**, gated by **Approvals**, and explained by an **Adjustment** log.

**Entities**

| Entity | Key fields | Notes |
| --- | --- | --- |
| Project | CBFish project # (e.g. 1988-115-35), title, category, subcategory, sponsor, planning PM/COR, construction COR, fund source (Accord, long-term funding agreement, general), account type (Capital / Expense / Mixed / None), CBFish portfolio, record type, lifecycle stage, description, CBFish URL | One row in the portfolio grid; category comes from portfolio membership |
| Sub-project / phase | parent project, name (e.g. Trinity Phase 2, GRMW Hall Ranch, Chesnimnus Creek) | Optional; spend plans can attach here |
| Budget | original budget, modified budget, contingency, effective date, decision reference (DMF, BCR, Finance Committee) | Modified budget is a history, not one number |
| Pathway gate | project, gate (see enumerations), status (Not started / In progress / Green / Red / Not applicable), date, owner, document reference, note | One row per gate per project; "greenlit" = every applicable gate Green |
| OMB record | project, submitted date, included (yes / no / removed), threshold met (yes / no), appropriations approved date | OMB is submitted in summer; Congress may approve 6–18 months later |
| Asset Plan line | project, Asset Plan cycle (e.g. FY27 AP), FY, Expected amount, Optimal amount, planned milestones, planned acres (land) | Set once per cycle; each cycle is a fresh re-forecast |
| Spending plan line | project, FY, quarter, amount, line type (construction contract / support capital / land purchase / other), status (planned / actual) | Closed quarters show actuals |
| Forecast snapshot | label (e.g. "FY26 Q3"), type (Asset Plan baseline / Quarterly / Finance submission / Ad hoc), as-of date, created by, frozen copy of all lines, budgets and gates | The spreadsheet's "tab per month", made automatic |
| Budget envelope | FY, category, source (IPR/rate case, Asset Plan Expected = SOY, Asset Plan Optimal, Finance working), amount | Several sources per FY; Asset Plan Expected is the default |
| Capital request | title, requester, sponsor of the ask (e.g. leadership), amount by FY, category, source, target Asset Plan cycle, status, linked project, pathway gates | New needs not yet in the plan |
| Adjustment | project, type, amount, from FY/qtr, to FY/qtr, variance reason, document reference, approved by, date | Answers "what document is that adjustment in?" |
| Actual | Finance L5 category, L6 project ID, FY, month, amount | Imported from CSV |
| Milestone | project, phase (Planning/MOA, Design procurement, Design, EC, 3-Step review, Construction procurement, Construction), label, planned FY/qtr, actual FY/qtr | Drives the schedule strip |
| Land parcel (P1) | common name, land project, sponsor, acres, appraised/closed value, stewardship cost, capital/expense, status (Green/Yellow/Red/Next year/Closed/Not pursued), closing quarter | Mirrors the Land team tracker |
| Quarterly note | project, FY, quarter, text, author | The execution report's "Q2 FY24: …" narrative |

**Enumerations**

- **Category** (BPA Finance L5): Hatchery (0005510), Land (0005509), Passage/Other (0005511). LSRCP appears in budget tables at $0 and can be omitted.
- **Subcategory** (Hatchery): Expand, Sustain.
- **Record type**: Request → Placeholder → Active → Complete; or Cancelled / Deferred. A **Placeholder** has a budget but no contract (e.g. the Passage placeholder); **Active** has a contract or MOA.
- **Lifecycle stage**: Planning/MOA, Design, Environmental compliance, Construction procurement, Construction, Closeout, Complete.
- **Pathway gates** (working list, order as Rodrigo described it; to be confirmed with Michelle and Rodrigo): 1 Leadership/policy approval, 2 OMB inclusion (only above a dollar threshold), 3 Capitalization policy (is it capital at all?), 4 Funding source (long-term funding agreement or budget allocation), 5 SAMP / Asset Plan inclusion, 6 Money placed in the FY in CBFish (SOY or DMF), plus 7 NPCC 3-step review for hatcheries only.
- **OMB status** (display): Not submitted, Submitted, Appropriations language approved, Removed, Not required (below threshold).
- **NPCC 3-step review**: Not required, Step 1 (master plan), Step 2 (preliminary design), Step 3 (final design), Complete.
- **Adjustment type**: Bid over estimate, Change order, Schedule slip, Year-end re-forecast, Transfer between projects, Scope change, Other.
- **Variance reason**: Schedule slip, Bid over estimate, Partner not ready, Weather/site access, Agreement (MOA) delay, Scope change, Other.
- **Request status**: New, Under review, Added to plan, Deferred to next Asset Plan, Declined.

**Glossary**

| Term | Meaning in this module |
| --- | --- |
| FY | BPA fiscal year, Oct 1 – Sep 30; Q1 = Oct–Dec |
| Rate period | BPA rate period; money can move between years within it with Finance. Length is unsettled in the sources (see open questions) |
| IPR | Integrated Program Review, set about 18 months before the FY starts; FY27 capital IPR is about $67M |
| SAMP | Strategic Asset Management Plan, every two years; the next one starts in October 2026 |
| Asset Plan (AP) / SOY | Annual project-level plan; it feeds the start-of-year (SOY) capital budget. Each Asset Plan is a reset, not a carryover ledger |
| Optimal vs. Expected | Two Asset Plan forecast levels. Expected is 80% of Optimal in every source table; Finance allows spending up to Optimal |
| OMB approval | Project appears in appropriations language; submitted in summer, approved 6–18 months later; needed above a dollar threshold before a capital contract starts |
| Capitalization policy | Rules for whether work is capital or expense (e.g. a $2.2M revegetation project with no construction is expense) |
| Long-term funding agreement | Agreement committing future funds (e.g. Coeur d'Alene hatchery); money in an agreement is not a green light by itself |
| Portfolio | A CBFish grouping of projects by membership; Rodrigo built capital portfolios for Hatchery and Land |
| NPCC 3-step | Northwest Power and Conservation Council review for hatchery projects |
| EC | Environmental compliance (NEPA: EA, FONSI, EIS, ROD) |
| MOA | Memorandum of agreement with the sponsor for design and construction |
| DMF | BPA executive decision-making forum, meets monthly; where new spending requests come up |
| WE 5 | CBFish work element used for land purchases; sponsors often enter the full amount whether or not it will spend |
| Accords | Long-term partner agreements; ended FY25, which ended automatic carryover of unspent funds |

## User stories

Stories are ordered by priority within each persona; most come straight from the questions in Ben's Oct 1 email.

**Capital Program Manager (Ben)**

1. As the capital program manager, I want a total forecast by fiscal year by project for FY27 and FY28, so that I can answer budget questions without rebuilding a spreadsheet.
2. As the capital program manager, I want to see headroom against the approved budget by category, so that I know whether I can say yes to a new request like Hall Ranch ($14M).
3. As the capital program manager, I want to log capital requests that are not yet in the plan, so that requests from email, OMB and partners are on the radar in one list.
4. As the capital program manager, I want to see which projects have OMB appropriations language, so that no capital contract starts without it.
5. As the capital program manager, I want to compare this quarter's forecast to last quarter's and to the Asset Plan baseline, so that I can see how projects changed from what was planned.
6. As the capital program manager, I want to know when a hatchery slips and frees up current-year money, so that I can ask the Land team or another project to spend more this year.
7. As the capital program manager, I want each budget change (bid overrun, change order) recorded with its document and decision, so that the forecast and its justification stay together.
8. As the capital program manager, I want to distinguish a placeholder budget from a project under contract, so that I don't treat unfunded ideas as commitments.

**Asset Plan Lead (Victoria, Rodrigo)**

9. As the Asset Plan lead, I want to set the Asset Plan baseline once at the start of the year, so that every later forecast is compared against what was approved.
10. As the Asset Plan lead, I want to export Table 5.1 (forecast by project and FY) from the module, so that the next Asset Plan starts from current numbers.

**Project PM / COR**

11. As a project COR, I want to update my project's quarterly spend plan and milestone dates in one place, so that I report once instead of to several people.
12. As a project COR, I want to add a quarterly status note, so that the reason for a forecast change is captured when it happens.

**Execution Report Analyst (Gloria)**

13. As the analyst, I want to freeze a quarterly snapshot and export the execution report tables, so that the report is produced from the system rather than retyped.
14. As the analyst, I want to produce the Finance quarterly forecast by capital category with rationale, so that Finance gets consistent numbers.

**Added from the Oct 5 meeting**

16. As the capital program manager, I want a one-page program view I can put on screen at a DMF or quarterly budget review, so that "can we afford this?" is answered in the room.
17. As the capital program manager, I want each project's green-light status across every approval step, so that I can say whether something like Hall Ranch is actually approved.
18. As the budget lead who puts money into CBFish (Michelle), I want to see which pathway steps a project has cleared before I place funds in a fiscal year, so that agreement money isn't mistaken for a green light.
19. As the Asset Plan lead, I want new requests routed to me with the Asset Plan deadline shown, so that real needs get into the plan before it is turned in.
20. As the capital program manager, I want to see when a slip frees money in the current year, and which projects (often land) are ready to absorb it, so that the year's capital budget still gets used.
21. As the OMB tracker (Rodrigo), I want to record when a project was submitted to OMB and when appropriations were approved, so that the 6–18 month lag is visible and no contract starts too early.
22. As anyone on the team, I want CBFish to tell me whether a project is capital, expense or mixed, so that I can list the capital projects without searching titles for "(CAP)".

**Land Team (P1)**

15. As a land PM, I want parcel status and expected closing quarter to roll up into the land project's forecast, so that land spend reflects real deals.

**Edge cases the prototype should show**

- A request with FY27 spend but OMB status "Not in OMB" (2003-011-00 Columbia River Estuary) carries the OMB flag, and keeps it after "Add to plan".
- A project whose spend plan total exceeds its modified budget (common: hatcheries come in 20–40% over plan). A project that is green on Asset Plan and funding but red on OMB.
- A fiscal year with negative headroom.
- An empty state: a new request with no FY amounts yet.
- A closed quarter with negative actuals (reversals appear in the real data).

## Functional requirements

Ten P0 requirements make the prototype; P1 items are fast follows if time allows; P2 items are not built but must not be designed out.

### P0 — must have

**R1. Portfolio grid** (the "Capital Budget spreadsheet with more columns")

One table of all projects, grouped by category (Hatchery Expand, Hatchery Sustain, Land, Passage), with subtotals per group and a grand total.

- [ ] Default columns: Project #, Title, Sponsor, PM/COR, Record type, Lifecycle stage, OMB status, NPCC step, Design status, Prior FY actuals, Current FY forecast, Current FY YTD actuals, FY+1, FY+2, FY+3, Modified budget, Remaining (modified budget − all-time actuals), Last note.
- [ ] When the user changes the "Current FY" selector, then all FY columns shift (e.g. FY27 view shows FY26 actuals, FY27–FY30 forecast).
- [ ] Columns can be shown/hidden and sorted; rows can be filtered by category, record type, stage, OMB status, PM and "has open flag".
- [ ] Gate statuses show as colored pills; a red flag icon appears when R7 fires.
- [ ] Placeholders and requests are visually distinct (dashed row border or muted text) and can be excluded from totals with one toggle.
- [ ] Export the current view to CSV.

* [ ] Also available as columns: Account type (Capital / Expense / Mixed / None), In current Asset Plan (yes/no), and a compact pathway strip of 6–7 colored dots (R7).
* [ ] Hatchery, Land and Passage groups appear on one screen, driven by CBFish portfolio membership, with the headroom summary on top and project detail one click away (Rodrigo's "simplified table on top, details if you want them").

**R2. Budget envelope and headroom panel**

- [ ] For a selected FY, a panel shows by category and in total: approved envelope, Active forecast, Placeholder forecast, Open requests, Headroom = envelope − (Active + Placeholder).
- [ ] The user picks the envelope source: Asset Plan Expected (SOY, default), Asset Plan Optimal, or IPR/rate case. IPR is labeled "information only" because the agency budgets to the Asset Plan.
- [ ] Given FY27 and Asset Plan SOY, then Hatchery $16,183, Land $21,495, Passage $10,737, Total $48,415, and headroom $0 before requests.
- [ ] Negative headroom shows in red with the shortfall amount; a "what if" toggle adds selected requests to the forecast so the user can see the effect of saying yes.

* [ ] Each tile also shows the Optimal ceiling (Expected ÷ 0.8) and the headroom up to it, labeled "Finance can approve up to Optimal"; given FY27 that is $60,519 total and $12,104 headroom.
* [ ] The Passage tile is drawn as a placeholder being drawn down: envelope, named passage projects, and placeholder remaining, so competing asks (Nason Creek, Chesnimnus, Hall Ranch, estuary) are visible against it.
* [ ] A "freed this year" line lists current-FY forecast reductions since the last snapshot, next to Active projects and Green land parcels that could absorb them (P1 detail in Redirect suggestions).

**R3. Project detail page**

- [ ] Header: project #, title, sponsor, PMs, category, record type, stage, link out to the CBFish project page.
- [ ] Budget card: original budget, current modified budget, contingency, and a budget history list (date, amount, reason, decision reference).
- [ ] Pathway card (R7), plus a status card for EC, MOA and design status — each with date and note, editable.
- [ ] Spending plan grid (R4), milestone schedule strip (quarters FY24–FY30 across, phases down, like the execution report), quarterly notes (newest first), adjustments for this project, linked parcels/contracts.

**R4. Multi-year quarterly spending plan**

- [ ] Grid of FY × quarter (Q1–Q4 plus FY total) for at least FY24–FY30, one row per line type (Construction contract, Support capital, Land purchase, Other).
- [ ] Closed quarters show actuals and are read-only; open quarters are editable forecast. Closed quarters are determined by a "Data as of" date in settings (default 2026-09-30).
- [ ] When the plan total (all-time actuals + remaining forecast) exceeds the modified budget, then a warning shows the overage amount.
- [ ] Editing an open quarter updates the portfolio grid and headroom panel immediately.
- [ ] A "spread evenly" helper divides an amount across a selected range of quarters (the team already does this, e.g. "total divided by 8 quarters").

**R5. Forecast snapshots and comparison**

- [ ] "Save snapshot" freezes all spend plans, budgets and gates with a label, type and as-of date.
- [ ] One snapshot per FY can be marked the Asset Plan baseline; only the Asset Plan Lead or Capital Program Manager role can set it.
- [ ] Compare view: choose snapshot A and B (or A vs. Current); show per project and FY the A value, B value, delta, and the notes/adjustments logged between the two dates; sort by largest absolute delta.
- [ ] Seed at least three snapshots: FY26 Asset Plan baseline, FY26 Q2, FY26 Q3.

**R6. Capital requests**

- [ ] A Requests list with title, requester, category, amount by FY, source (OMB, Asset Plan, email/partner, internal), status, and linked project.
- [ ] "Add to plan" converts a request into a Placeholder or Active project (or attaches to an existing one) and keeps the link back.
- [ ] Open requests feed the R2 panel as a separate figure, never into headroom unless "what if" is on.

* [ ] Each request carries the same pathway gates as a project (R7) and a target Asset Plan cycle (e.g. FY28 AP).
* [ ] Settings hold the current Asset Plan turn-in date; while it is in the future, the Requests page shows "Send new needs to the Asset Plan lead by \<date>" and each New request has a "Send to Asset Plan lead" action that sets status Under review.
* [ ] "Add to plan" on a request that is not in the current Asset Plan shows a warning: "Not in the FY Asset Plan — spending this year needs leadership and Finance agreement."

**R7. Approval pathway and OMB gate**

- [ ] Given a project whose OMB status is not "Appropriations language approved", when it has any construction-contract spend planned in an open quarter, then the row and detail page show a red "OMB not approved" flag.
- [ ] The same flag shows on any request with FY amounts and OMB status other than "Appropriations language approved", and carries over when the request is added to the plan. A filter on the portfolio grid lists all flagged projects.

* [ ] Project detail shows a pathway card with one row per gate (Leadership, OMB, Capitalization, Funding source, Asset Plan, CBFish budget, and NPCC 3-step for hatcheries): status light, date, owner, document link, note. Gates are editable by the role that owns them.
* [ ] When every applicable gate is Green, the project header shows "Greenlit"; otherwise it shows "Not greenlit — n of m steps" and the planned spend in open quarters is outlined in amber.
* [ ] The OMB row stores submitted date, threshold met, and appropriations approved date; when submitted but not approved, it shows the months waited.
* [ ] The gate list comes from a settings table so it can change once Michelle and Rodrigo write the real steps down.

**R8. Year-end re-forecast**

- [ ] A "Close FY" action (Capital Program Manager only) lists every project where FY forecast − FY actuals ≠ 0, with the variance in dollars and percent.
- [ ] For each, the user re-spreads the project's remaining need (modified budget − all-time actuals) across future quarters, not the FY's unspent amount (Ben's example: a $20M hatchery that has spent $3M has $17M left, not $14M), and picks a variance reason; one Adjustment of type "Year-end re-forecast" is written per project.
- [ ] Unspent money is not banked into next year's envelope; next year's envelope comes from the new Asset Plan. The close screen totals the FY variance by category with its reasons, as input to the Asset Plan's planned-vs-completed tables (5.2).

**R9. Adjustment log**

- [ ] Every change to a modified budget or a move of money between FYs creates an Adjustment with type, amount, from/to, reason, document reference (free text + URL) and user.
- [ ] A global Adjustments page lists them with filters by type, project and date.

**R10. Actuals import**

- [ ] Upload a CSV with columns `category_l5, project_l6, fiscal_year, month, amount`; matching rows replace actuals for that project-month; unmatched project IDs are listed for review.
- [ ] Ship a sample CSV generated from the seed data.

### P1 — nice to have

- **Land parcels.** A land project's detail page lists its parcels with status pill and closing quarter; Green/Yellow parcels with a closing quarter roll up into a "parcel-based forecast" shown beside the manual forecast.
- **Redirect suggestions.** When a project's current-FY forecast drops, the headroom panel lists projects with ready-to-spend items (Green land parcels this FY, Active projects with flagged capacity).
- **Finance forecast export** in the Finance template shape: L5 category rows with SOY, Rate case, Q1, Q2, Expected EOY and a notes column.
- **Asset Plan Table 5.1 export:** per project and FY, SAMP Expected vs. Proposed and delta.
- **Execution report export:** project list, schedule strip and per-project tables for a chosen snapshot.
- **Notable changes feed** auto-written from the snapshot diff (e.g. "Sturgeon FY28 $6.2M moved to FY29").

* **Presentation view** for DMF and quarterly budget reviews: the headroom tiles, the \~12–15 projects spending in the selected FY, pathway dots and the open requests, on one screen at large type, with print to PDF.
* **CBFish reconciliation.** Per project, show what CBFish knows beside the forecast: capital working budget, contracted amount, and WE 5 land amounts, with multi-year contracts spread across FYs by contract dates; flag differences above 10%. This explains why CBFish shows about $37M of FY27 capital against a $48.4M plan.
* **Escalation what-if** for hatcheries not yet bid: apply +20% to +40% to remaining construction forecast and show the effect on headroom (Ben: hatcheries usually come in 20–40% higher).
* **Execution-rate history** by category from snapshots: planned vs. actual spend, and for land, planned vs. acquired acres (Ben's estimate: land closes about half of plan). Feeds the Asset Plan 5.2 planned-vs-completed tables.
* **Planning calendar** showing the IPR, SAMP, Asset Plan turn-in, SOY, OMB submission, quarterly report and DMF dates for the current and next FY, so requests can see which window they can still make.

### P2 — future, keep the door open

- Live actuals from the BPA financial system and contract/work-element budgets (WE 5) from CBFish.
- Routed approvals for DMF decisions, budget change requests and Finance Committee sign-off.
- Notifications to the Land team or PMs when current-year headroom appears.
- Optimal vs. Expected scenario modeling and O&M tail estimates for completing hatcheries.
- Real CBFish roles and permissions.

* An account-type flag (Capital / Expense / Mixed) on projects across all of CBFish, not just this module — Gloria called this the lowest-hanging fruit and could ship independently.
* Risk matrix for Sustain assets (criticality and health) to forecast recurring maintenance, which the next SAMP (starting October 2026) requires.
* AI-assisted drafting of Asset Plan tables from module data (Ben raised using BPA's new AI tools).

## Screens

Six screens under a "Capital Program" section of CBFish; the Portfolio is the home page. A header bar holds the Current FY selector, the envelope source selector, the snapshot selector ("Current" by default) and the role switcher.

| # | Screen | Purpose | Key elements | Requirements |
| --- | --- | --- | --- | --- |
| 1 | Portfolio | Answer "what are we spending, by FY, by project" | Headroom panel pinned at top (3 category tiles + total, each with Optimal ceiling), grouped grid, filters, column picker, CSV export | R1, R2, R7 |
| 2 | Project detail | Everything about one project | Header with Greenlit status, budget card + history, pathway card, quarterly spend plan grid, schedule strip, notes, adjustments, parcels | R3, R4, R9 |
| 3 | Requests | Intake and triage of new capital needs | List with status pills, add/edit drawer, "Add to plan" action, total open by FY | R6 |
| 4 | Snapshots & compare | Planned vs. actual over time | Snapshot list (label, type, date, baseline star), A-vs-B picker, delta table sorted by size | R5 |
| 5 | Adjustments | Audit trail of money moves | Filterable log; "Close FY" wizard lives here | R8, R9 |
| 6 | Data & settings | Admin | Actuals CSV import, "Data as of" date, budget envelopes by FY and source | R10, R2 |

**Navigation rules**

- Clicking a project row opens Project detail; the browser back button returns to the grid with filters intact.
- Clicking a headroom tile filters the grid to that category.
- When a past snapshot is selected in the header, every screen is read-only and shows a banner "Viewing snapshot FY26 Q3 (as of …)".
- Dollar values display in $000s with thousands separators; negative values in parentheses, matching the source reports.

## Seed data

Use real projects and figures from the source documents so Ben recognizes his program on first click. All amounts are $000s. FY27 and FY28 project values tie exactly to the FY27 Asset Plan totals; FY26 values are the Q3 expected end-of-year forecast sent to Finance (June 2026).

**Budget envelopes**

| FY | Source | Hatchery | Land | Passage | Total |
| --- | --- | --- | --- | --- | --- |
| FY26 | Rate case (BP-26) | 14,970 | 10,960 | 12,000 | 37,930 |
| FY26 | SOY working budget | 22,803 | 18,415 | 12,000 | 53,218 |
| FY27 | Rate case / SAMP (May 2024) | 42,588 | 12,400 | 12,000 | 66,988 |
| FY27 | Asset Plan SOY (approved) | 16,183 | 21,495 | 10,737 | 48,415 |
| FY28 | SAMP / IPR expected | 29,634 | 22,400 | — | — |
| FY28 | Asset Plan proposed | 29,095 | 27,750 | 7,001 | 63,846 |

Add Asset Plan Optimal envelopes as Expected ÷ 0.8: FY27 Hatchery 20,229, Land 26,869, Passage 13,421, Total 60,519; FY28 Total 79,808. The FY27 IPR (66,988) included about $20M for the Coeur d'Alene hatchery, which the tribe was not ready to start; Rodrigo's view is that this gap is not money to fill, Ben's is that it may be. Seed the Coeur d'Alene project's pathway with Funding source Green (long-term agreement signed) and Asset Plan Red to show exactly this case.

**Projects — Hatchery**

| Project # | Title | Sub | Sponsor | PM/COR | Record | Stage | OMB | NPCC | Orig. budget | Mod. budget | FY26 | FY27 | FY28 | FY29+ |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1988-115-35 | Klickitat Hatchery Spring Chinook | Expand | Yakama Nation | Mary Todd Haight | Active | Construction (to Q1 FY27) | Approved | Step 3 | 13,200 | 36,000 | 16,225 | 3,587 | 0 | 0 |
| 2007-401-00 | Kelt Reconditioning Facility | Expand | CRITFC | Tracy Hauser | Complete | Closeout | Approved | Step 3 | 3,100 | 8,944 | 715 | 0 | 0 | 0 |
| 2008-527-00 | John Day Mitigation @ Prosser | Expand | CRITFC | Andy Traylor | Active | Construction (to Q2 FY27) | Approved | Step 3 | 4,500 | 9,627 | 6,603 | 3,026 | 0 | 0 |
| 1996-040-01 | Trinity (Natapoc) Acclimation Site | Expand | Yakama Nation | Mary Todd Haight | Active | Construction Ph 2 (to Q1 FY28) | Approved | — | 5,100 | 8,100 | 345 | 5,226 | 2,210 | 0 |
| 2007-155-00 | White Sturgeon Hatchery @ Marion Drain | Expand | CRITFC / YN | Brian McIlraith | Active | Design (groundbreak Q2 FY29) | Approved | Step 2 | 6,793 | 6,793 (14,937 pending) | 0 | 0 | 0 | 6,218 |
| 2008-901-00 | Waterwheel Hatchery | Expand | Shoshone-Bannock | Mary Todd Haight | Active | Planning/MOA (groundbreak Q1 FY28) | Approved | Step 2 | 12,300 | 26,346 (pending) | 0 | 0 | 16,562 | 9,784 |
| 2024-001-00 | Coeur d'Alene Anadromous & Resident Hatchery | Expand | Coeur d'Alene Tribe | Mary Todd Haight | Placeholder | Planning (dropped from BP-26) | Approved | Step 1 | 40,000 | — | 0 | 0 | 0 | TBD |
| 2028-001-00 | Ford Hatchery | Expand | Spokane Tribe | Carlos Matthews | Placeholder | Planning (groundbreak Q4 FY28) | Approved | Step 1 | 3,000 | — | 0 | 0 | 0 | TBD |
| 2024-002-01 | Spokane Operations Center | Expand | Spokane Tribe | — | Placeholder | Planning (to FY29) | — | — | — | — | 0 | 0 | 0 | TBD |
| 1991-046-01 | Lake Roosevelt Net Pens | Expand | Spokane Tribe | Carlos Matthews | Active | Construction | — | — | — | — | 555 | 0 | 0 | 0 |
| 1989-035-01 | Umatilla Water Supply | Sustain | — | — | Active | Planning/design (complete Q4 FY28) | Approved | — | 5,367 | 5,367 | 0 | 3,044 | 2,323 | 4,600 |
| 2003-023-00 | Chief Joseph Hatchery water temperature | Sustain | Colville Tribes | — | Placeholder | Design | — | — | — | — | 0 | 0 | 5,000 | 0 |
| 1991-047-00 | Sherman Creek Intake | Sustain | — | — | Placeholder | Design | — | — | — | — | 0 | 0 | 3,000 | 0 |
| — | Colville Tribe Well Field Rehab | Sustain | Colville Tribes | — | Placeholder | Construction | — | — | — | — | 0 | 1,300 | 0 | 0 |
|  | **Hatchery total** |  |  |  |  |  |  |  |  |  | **24,443** | **16,183** | **29,095** |  |

**Projects — Land** (record type Active, stage "Acquisition", OMB Approved)

| Project # | Title | Sponsor | PM | FY26 | FY27 | FY28 | FY27 acres |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2011-003-00 | Willamette Wildlife Mitigation (WWF) | ODFW | Matthew Schwartz | 4,478 | 3,276 | 15,000 | 186 |
| 2002-003-00 | CSKT Resident Fish Habitat | Confederated Salish-Kootenai Tribes | — | 527 | 1,250 | 1,250 | 75 |
| — | Coeur d'Alene Tribe acquisitions | Coeur d'Alene Tribe | — | 190 | 560 | 2,000 | 269 |
| — | Spokane Tribe acquisitions | Spokane Tribe | — | 2,500 | 2,000 | 2,000 | 70 |
| — | Kootenai Fish & Wildlife Mitigation | — | — | 2,600 | 8,497 | 1,000 | 1,300 |
| — | Kalispel Fish & Wildlife Mitigation | Kalispel Tribe | — | 2,200 | 1,800 | 2,000 | 275 |
| — | Umatilla land acquisitions | CTUIR | — | 2,600 | 3,900 | 2,500 | 195 |
| 1995-057-03 | Southern Idaho Wildlife Mitigation | Shoshone-Paiute Tribes | — | 0 | 0 | 0 | 0 |
| — | Northern Idaho Wildlife Mitigation | — | — | 0 | 212 | 0 | 0 |
| — | Colville acquisitions | Colville Tribes | — | 0 | 0 | 2,000 | 0 |
|  | **Land total** |  |  | **15,095** | **21,495** | **27,750** | **2,370** |

FY26 land by project is derived: the Q2 per-project spend, less $1,822 for the three WWF closings pushed to FY27.

**Projects — Passage** (record type Active, OMB Approved)

| Project # | Title | Sponsor | PM | FY26 | FY27 | FY28 | FY29+ |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2010-004-01 | CREST Estuary Habitat Restoration Bridges | CREST | Alan Whiting | 775 | 3,000 | 3,500 | 0 |
| 1987-100-01 | UmaBirch – Umatilla Anadromous Fish Habitat | CTUIR | Jennifer Lord | 752 | 4,001 | 700 | 0 |
| 1992-026-01 | Grande Ronde Model Watershed – Chesnimnus Creek | GRMW | Tracy Hauser | 2,142 | 2,325 | 1,301 | 0 |
| 2010-001-00 | Upper Columbia Programmatic Habitat | UCSRB | Victoria Bohlen | 2,232 | 1,411 | 0 | 0 |
| 2009-003-01 | Upper Columbia Habitat – Yakima Nason Creek | Yakama Nation | Victoria Bohlen | 0 | 0 | 1,500 | 3,500 |
|  | **Passage total** |  |  | **5,901** | **10,737** | **7,001** |  |

**Capital requests** (not in the Asset Plan)

| Request | Category | Source | OMB | FY27 | FY28 | FY29 | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Hall Ranch (GRMW 1992-026-01; was $2M three years ago; sponsor now says ready in FY27) | Passage | In OMB, not in Asset Plan | In OMB budget | 14,000 | 0 | 0 | Under review |
| DMF requests (two $5M items; confirm which are not already in the Asset Plan) | TBD | Email, Ben | — | 10,000 | 0 | 0 | New |
| Nason Creek acceleration (2009-003-01) | Passage | PM forecast | Approved | 3,000 | 0 | 0 | New |
| Willamette BiOp – Albany Oxbow (2009-012-01) | Passage | PM forecast | — | 1,400 | 0 | 0 | New |
| Columbia River Estuary Habitat Restoration (2003-011-00) | Passage | PM forecast | Not in OMB | 2,500 | 2,000 | 0 | New |
| Willamette BiOp – Elijah Bristow State Park (2009-012-01) | Passage | PM forecast | — | 0 | 2,600 | 2,000 | New |
| Lower Columbia Estuary Scoping & Implementation (2010-070-00) | Passage | PM forecast | — | 0 | 2,200 | 0 | New |
| Columbia Land Trust Estuarine Restoration (2010-073-00) | Passage | PM forecast | Not in OMB | 0 | 2,500 | 0 | New |
| Grande Ronde capital need (Tracy Hauser; leadership said proceed; may be expense under capitalization policy) | TBD | Email, Ben | — | 0 | 2,250 | 0 | New |
| **Open requests total** |  |  |  | **30,900** | **11,550** | **2,000** |  |

**Snapshots** — seed three so the compare view has something to show.

| Snapshot | Type | As of | Hatchery FY26 | Land FY26 | Passage FY26 | Notable differences from Current |
| --- | --- | --- | --- | --- | --- | --- |
| FY26 Asset Plan baseline | Asset Plan baseline | 2025-10-01 | 22,016 | 18,415 | 12,000 | Waterwheel FY28 33,124 (now 16,562); Trinity FY27 10,452 (now 5,226); Umatilla Water Supply FY27 8,668 (now 3,044); Chief Joseph FY28 10,000 (now 5,000) |
| FY26 Q2 | Quarterly | 2026-03-31 | 24,038 | 16,917 | 6,844 | Sturgeon FY28 6,218 (now FY29); WWF FY26 6,300 |
| FY26 Q3 | Finance submission | 2026-06-30 | 24,443 | 15,095 | 6,844 | Prosser FY26 +1,000 added 6/24/26 per Andy Traylor |

**Sample actuals CSV** — FY26 monthly capital actuals for Klickitat from the Finance export (through August 2026); note the June reversal and that the 11-month total (18,301) already exceeds the Q3 forecast.

```csv
category_l5,project_l6,fiscal_year,month,amount
0005510,198811535,2026,Oct,1592974
0005510,198811535,2026,Nov,1035514
0005510,198811535,2026,Dec,1210013
0005510,198811535,2026,Jan,1256526
0005510,198811535,2026,Feb,1071160
0005510,198811535,2026,Mar,2519915
0005510,198811535,2026,Apr,367159
0005510,198811535,2026,May,3120740
0005510,198811535,2026,Jun,-168989
0005510,198811535,2026,Jul,3089966
0005510,198811535,2026,Aug,3205984
```

The actuals CSV is in whole dollars, as Finance exports it; the app converts to $000s on import.

## Prototype technical guidance

Build a front-end-only single-page app with mock data in the browser; no backend, no auth. Optimize for a convincing 30-minute walkthrough with Ben, not for production architecture.

**Stack and structure**

- React + TypeScript + Vite; a table library with grouping, column visibility and sticky headers (TanStack Table or AG Grid Community).
- State in a single store (Zustand or React context) seeded from JSON files in `/src/seed/`; persist edits to `localStorage` with a "Reset demo data" button in Data & settings.
- Put all money math in one pure module (`/src/lib/finance.ts`) with unit tests (Vitest).
- Write the domain types from the Domain model section as TypeScript interfaces first, then generate seed JSON from the Seed data tables.
- Include a `README.md` with run instructions and a 10-step demo script that walks through Goals 1–5.

**Look and feel** — follow the CBFish design system ([cb-fish-design](https://esassoc.github.io/cb-fish-design/design-system/)):

- Colors: primary navy `#1e5386`, secondary `#2770b2`, header band `#13273e`, sunken surface `#f3f7fc`, borders `#dcdcdc`, body text `#3d3d3d`, muted text `#7c7c7c`.
- Type: IBM Plex Sans for UI, IBM Plex Sans Condensed (600–700) for page titles and big numbers.
- Flat fills, hairline borders, 8px radius on cards, pill badges for statuses; no gradients or shadows.
- Status colors: Green/Yellow/Red pills for land parcels and gates; red for OMB flag and negative headroom.

**Calculation rules**

- FY of a date: month ≥ October → calendar year + 1. Quarter: Oct–Dec Q1, Jan–Mar Q2, Apr–Jun Q3, Jul–Sep Q4.
- A quarter is closed when its last day ≤ the "Data as of" date; closed quarters use the sum of actuals, open quarters use forecast.
- FY forecast for a project = closed-quarter actuals + open-quarter forecast.
- Headroom (FY, category) = envelope − Σ forecast of Active and Placeholder projects; requests are excluded unless "what if" includes them. The Optimal envelope = Expected ÷ 0.8 unless an Optimal amount is entered.
- Remaining budget = modified budget − all-time actuals. Overage = all-time actuals + open-quarter forecast − modified budget; warn when positive.
- Rate-period boundaries are a setting (default BP-26 = FY26–FY27; Victoria described the current period as FY26–FY28) and are shown as information only; nothing is blocked at a boundary.
- Display $000s, rounded to whole thousands, negatives in parentheses.

**Tests that must pass**

- [ ] FY27 Asset Plan category totals equal 16,183 / 21,495 / 10,737 / 48,415.
- [ ] FY27 headroom vs. Asset Plan Expected = 0; vs. Optimal = 12,104; vs. IPR = 18,573; with all FY27 requests in "what if" vs. Asset Plan = (30,900).
- [ ] FY28 Asset Plan proposed total = 63,846.
- [ ] Importing the sample CSV sets Klickitat FY26 actuals to 18,301 and records the June value as negative.
- [ ] Saving a snapshot, then editing a forecast, leaves the snapshot values unchanged.

* [ ] A project with any applicable gate not Green shows "Not greenlit"; setting the last gate to Green shows "Greenlit" without a reload.
* [ ] Re-forecasting a $20,000 project with $3,000 of actuals offers $17,000 to spread, regardless of what the closed FY had planned.

## Open questions and assumptions

None of these block the prototype; each has a working assumption Claude Code should implement and tag in the UI. Questions 1–4 are the ones the team itself could not answer on Oct 5; they are good agenda items for the next session.

| # | Question | Working assumption | Who answers | Blocks build? |
| --- | --- | --- | --- | --- |
| 1 | What are the actual steps (and owners) a capital project must clear before it can spend — the "five-legged stool"? | The 6 gates + NPCC listed under Enumerations, held in a settings table | Michelle, Rodrigo, Dorie | No |
| 2 | Can a project spend in a FY if it is not in that FY's Asset Plan? (Ben: "I don't know if that's the rule or not") | Allowed with a warning and a leadership + Finance note | Rodrigo, Jason Sweet | No |
| 3 | Is the gap between IPR ($67M) and the Asset Plan ($48M) money the program can use, or not? Ben and Rodrigo disagreed | Shown as information only | Rodrigo, Finance | No |
| 4 | What is the OMB dollar threshold, and what is currently in or out of OMB? | Threshold is a setting; OMB status seeded from documents | Rodrigo (SharePoint list), Legal | No |
| 5 | How long is the current rate period: FY26–FY27 or FY26–FY28? | Setting, default FY26–FY27 | Finance | No |
| 6 | Should the yearly timeline (IPR, SAMP, Asset Plan turn-in, SOY, OMB submission, DMF) be shown in the module, and what are this year's dates? | P1 planning calendar; dates entered in settings | Victoria, Rodrigo | No |
| 7 | Is Hall Ranch ready for FY27 (Tracy says yes as of early October; Rodrigo says too late) and is it approved by leadership? | Request, FY27, Under review, leadership gate In progress | Tracy Hauser, Jason Sweet | No |
| 8 | Which of the two $5M DMF items are already in the Asset Plan (CTUIR land at $3.9M FY27 is)? | One $10M FY27 request, category TBD | Ben, Rodrigo | No |
| 9 | Is the \~$2.2M Grande Ronde work capital or expense, and FY27 or FY28? | FY28 request flagged "capitalization pending" | Dorie, Tracy Hauser | No |
| 10 | Which project numbers are authoritative where sources disagree (Coeur d'Alene 2024-001-00 vs. 2026-001-00; GRMW 1992-026-01 vs. 1996-026-01/02; Trinity 1996-040-00 vs. -01)? | Execution report numbers | Gloria, PMs | No |
| 11 | Which CBFish portfolios hold the capital projects, and is there a Passage one yet? | Hatchery and Land portfolios exist; Passage built from the passage forecast list | Rodrigo | No |
| 12 | Who keeps passage forecasts current, given there is no passage team? | Capital Program Manager | Ben, Victoria | No |
| 13 | Can PMs edit their own spend plans directly? | Yes, own projects only | Ben | No |
| 14 | Should the module pull CBFish working budgets, contracts and WE 5 amounts, and Pisces status? | P1 reconciliation view on mock data; live pull P2 | ESA dev team | No |
| 15 | FY26 Passage: per-project forecast sums to 5,901 but Finance Q3 shows 6,844. What is the 943 difference? | Show the gap as "Unallocated" in FY26 | Gloria, Victoria | No |
| 16 | Should LSRCP appear as a fourth category? | Omit; it is $0 in all tables | Victoria | No |

Answered on Oct 5 and folded in above: FY27 IPR level (about $66–67M), how Optimal relates to Expected, how Asset Plans treat unspent money, and Michelle's and Rodrigo's roles. Still to receive: Rodrigo's SharePoint OMB tracker and the OMB budget document.

## Sources

| Source | Date | Used for |
| --- | --- | --- |
| Email thread, Ben Dick / Victoria DuVal / Rodrigo George, "The Capital Interface" | Sep 30 – Oct 5, 2026 | Problem, vision ("spreadsheet with more columns"), user stories 1–8, requests, FY27 SOY approval table |
| Capital\_Budget.xlsx (Ben's workbook, 70+ snapshot tabs, FY11–FY27) | Last tab Jan 2026 | Grid columns, snapshot concept, project history, data-quality issues |
| FY26\_Q3\_Hatchery\_Capital\_Execution\_Update\_Draft.docx | FY26 Q3 | Project detail fields, budget history, gates, quarterly notes, hatchery project list |
| Hat\_Land\_FP\_Capital\_Execution\_Report\_gloria.xlsx | FY26 Q3 | Quarterly schedule strip, Finance Q3 forecast, passage forecast, notable changes, monthly actuals |
| Hatchery\_and\_Land\_Forecasting\_\_Gloria.docx (FY27 Asset Plan tables) | FY27 | FY27–FY28 seed values, land acreage, SAMP vs. proposed |
| Copy\_of\_FY24--9\_January\_LandAcquisitionTracking.xlsx | Jan 2024 | Land parcel fields and Green/Yellow/Red status definitions |
| Q3\_FY24\_Review\_Packet.docx | Jun 2024 | Quarterly review context, rate-period carryover practice |
| FY17-FY26\_Historic\_Capital\_Fish\_Passage\_5511\_Actuals\_07\_13\_26.xlsx | Jul 13, 2026 | Finance category codes (L5/L6), contract work-element budgets |
| Oct 5, 2026 capital meeting transcript (Ben Dick, Victoria DuVal, Rodrigo George, Michelle O'Malley, Gloria Scott) | Oct 5, 2026 | **Approval pathway, Asset Plan as budget basis and reset, Optimal vs. Expected, requests process, personas, P1 additions** |
