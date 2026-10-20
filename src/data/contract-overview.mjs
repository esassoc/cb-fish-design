// The detail behind the contract Overview's summaries: contacts, work statement
// elements, deliverables, environmental compliance and recent activity, shaped like
// the live CBFish Contract Summary (Contract 84042 REL 144 screenshots, 2026-10-20).
// The Overview doesn't show these rows — it shows what they add up to (see
// overviewFacts below); the rows belong to their own tabs.
//
// INVENTED, NOT DERIVED. Every name, email, phone number, ID, budget and date below
// is fictional, shaped like the live page for this prototype. The LIB contract's
// work elements are the ones its line item budget already allocates to
// (src/data/lib-entry.mjs), so the two pages agree.

import { contract as libContract, workElements as libWEs } from './lib-entry.mjs';

const BPA = 'Bonneville Power Administration';

// ── Rock Creek Fisheries Council — CR-411206 (the LIB's contract) ─────────────

const RCFC = libContract.sponsor;

const libWseRows = [
  { we: 'A', wsev: 281140, title: 'Project implementation management and contract administration', description: 'This work element includes the duties associated with managing the contract: budgets, invoices, subcontracts and coordination with BPA.', budget: 41_200, accrual: 'Coordination', start: '05/01/2026', end: '04/30/2027' },
  { we: 'B', wsev: 281141, title: 'Adult returns and smolt outmigration monitoring at the Rock Creek weir', description: 'Operate the weir and rotary screw trap; count, measure and tissue-sample adults and smolts.', budget: 96_400, accrual: 'Research, Monitoring & Evaluation', start: '05/01/2026', end: '04/30/2027' },
  { we: 'C', wsev: 281142, title: 'Environmental compliance documentation for the second acclimation pond', description: 'Work with the BPA environmental compliance lead to clear the pond expansion before construction.', budget: 12_800, accrual: 'Reporting', start: '05/01/2026', end: '12/31/2026' },
  { we: 'D', wsev: 281143, title: 'Periodic status reports for BPA', description: 'The contractor shall report on the status of milestones and deliverables in Pisces.', budget: 1_000, accrual: 'Reporting', start: '05/01/2026', end: '04/30/2027' },
  { we: 'E', wsev: 281144, title: 'Operate and maintain the Rock Creek acclimation site', description: 'Broodstock holding, spawning, incubation and rearing through spring release.', budget: 148_100, accrual: 'Hatchery', start: '05/01/2026', end: '04/30/2027' },
  { we: 'F', wsev: 281145, title: 'Community outreach on spring Chinook supplementation', description: 'Two public site tours and a school release day.', budget: 13_000, accrual: 'Planning & Design', start: '05/01/2026', end: '04/30/2027' },
];

const lib = {
  // Handoffs between the two sides, newest first, all OLDER than every demo
  // state's "last update" (which the Overview puts on top). The LIB review dates
  // match src/data/lib-review.mjs.
  activity: [
    { date: '2026-09-30', by: 'vendor', text: 'submitted invoice 3 (August)' },
    { date: '2026-09-12', by: 'cor', text: 'approved invoice 2 (July)' },
    { date: '2026-08-03', by: 'cor', text: 'returned the line item budget with 3 required changes' },
    { date: '2026-07-28', by: 'vendor', text: 'submitted the line item budget (cycle 2)' },
  ],
  contacts: [
    { name: 'Devon Iwasaki', org: RCFC, write: true, role: 'Contract manager', email: 'd.iwasaki@rockcreekfisheries.example', phone: '(541) 555-0142' },
    { name: 'Leah Marchetti', org: RCFC, write: true, role: 'Technical contact', email: 'l.marchetti@rockcreekfisheries.example', phone: '(541) 555-0177' },
    { name: 'Owen Szabo', org: RCFC, write: false, role: 'Administrative contact', email: 'o.szabo@rockcreekfisheries.example', phone: '(541) 555-0108' },
    { name: 'Graciela Fuentes', org: RCFC, write: false, role: 'Supervisor', email: 'g.fuentes@rockcreekfisheries.example', phone: '(541) 555-0191' },
    { name: libContract.bpaCor, org: BPA, write: true, role: 'COR', email: 'mozuna@bpa.example', phone: '(503) 555-0136' },
    { name: 'Renata Kowalski', org: BPA, write: true, role: 'Contracting officer', email: 'rkowalski@bpa.example', phone: '(503) 555-0163' },
    { name: 'Priya Natarajan', org: BPA, write: true, role: 'Env. compliance lead', email: 'pnatarajan@bpa.example', phone: '(503) 555-0119' },
    { name: 'Alana Whitcomb', org: BPA, write: false, role: 'Supervisor', email: 'awhitcomb@bpa.example', phone: '(503) 555-0184' },
  ],
  wses: libWEs.map((we) => {
    const row = libWseRows.find((r) => r.we === we.id);
    return { sort: we.id, wsevId: row.wsev, weId: Number(we.code), weName: we.title, ...row };
  }),
  deliverables: [
    { title: 'Effective implementation management and timely contract administration', wse: 'A: 119. Project implementation management and contract administration', start: '', end: '04/30/2027', concluded: '' },
    { title: 'Adult return and smolt outmigration estimates', wse: 'B: 157. Adult returns and smolt outmigration monitoring at the Rock Creek weir', start: '', end: '04/30/2027', concluded: '' },
    { title: 'Compliance documentation and assistance for environmental and cultural resources clearances', wse: 'C: 165. Environmental compliance documentation for the second acclimation pond', start: '', end: '12/31/2026', concluded: '' },
    { title: 'Spring Chinook smolts released into Rock Creek', wse: 'E: 60. Operate and maintain the Rock Creek acclimation site', start: '', end: '04/30/2027', concluded: '' },
    { title: 'Effective and productive cooperative relationships: public outreach and education', wse: 'F: 99. Community outreach on spring Chinook supplementation', start: '', end: '04/30/2027', concluded: '' },
  ],
  envCompliance: [
    { sort: 'A', weId: 119, title: 'Project implementation management and contract administration', nepa: false, noaa: false, usfws: false, nhpa: false, provisions: false, discovery: false, completed: '' },
    { sort: 'B', weId: 157, needsClearance: true, title: 'Adult returns and smolt outmigration monitoring at the Rock Creek weir', nepa: true, noaa: true, usfws: true, nhpa: true, provisions: true, discovery: false, completed: '04/22/2026' },
    { sort: 'C', weId: 165, title: 'Environmental compliance documentation for the second acclimation pond', nepa: false, noaa: false, usfws: false, nhpa: false, provisions: false, discovery: false, completed: '' },
    { sort: 'D', weId: 185, title: 'Periodic status reports for BPA', nepa: false, noaa: false, usfws: false, nhpa: false, provisions: false, discovery: false, completed: '' },
    { sort: 'E', weId: 60, needsClearance: true, title: 'Operate and maintain the Rock Creek acclimation site', nepa: true, noaa: true, usfws: true, nhpa: true, provisions: true, discovery: false, completed: '04/22/2026' },
    { sort: 'F', weId: 99, needsClearance: true, title: 'Community outreach on spring Chinook supplementation', nepa: true, noaa: false, usfws: false, nhpa: true, provisions: false, discovery: false, completed: '04/22/2026' },
  ],
};

// ── Kootenai Tribe — 84055 REL 11 (the /lib-pi-editing contract) ─────────────

const KTOI = 'Kootenai Tribe of Idaho';

const pi = {
  activity: [
    { date: '2025-05-15', by: 'vendor', text: 'submitted the SOW to the COR' },
    { date: '2025-03-12', by: 'cor', text: 'confirmed environmental clearance for floodplain and road work' },
  ],
  contacts: [
    { name: 'Brandon Diller', org: KTOI, write: true, role: 'Contract manager', email: 'bdiller@kootenai.example', phone: '(208) 555-0121' },
    { name: 'Jonathan Flannery', org: BPA, write: true, role: 'QC', email: 'jflannery@bpa.example', phone: '(503) 555-0155' },
    { name: 'Elizabeth Santana', org: BPA, write: true, role: 'COR', email: 'esantana@bpa.example', phone: '(503) 555-0147' },
    { name: 'Daniel Affonso', org: BPA, write: true, role: 'Contracting officer', email: 'daffonso@bpa.example', phone: '(503) 555-0172' },
    { name: 'David Kaplowe', org: BPA, write: true, role: 'F&W approver', email: 'dkaplowe@bpa.example', phone: '(503) 555-0110' },
    { name: 'Edward Gresh', org: BPA, write: true, role: 'Env. compliance lead', email: 'egresh@bpa.example', phone: '(503) 555-0193' },
    { name: 'Marisol Tafoya', org: KTOI, write: false, role: 'Technical contact', email: 'mtafoya@kootenai.example', phone: '(208) 555-0168' },
  ],
  wses: [
    { sort: 'A', wsevId: 254410, weId: 119, weName: 'Manage and Administer Projects', title: 'Project implementation management and contract administration', description: 'Manage the contract, subcontracts and the Memorandum of Agreement partners.', budget: 412_000, accrual: 'Coordination', start: '05/01/2024', end: '04/30/2026' },
    { sort: 'B', wsevId: 254411, weId: 185, weName: 'Produce CBFish Status Report', title: 'Periodic status reports for BPA', description: 'The contractor shall report on the status of milestones and deliverables.', budget: 1_000, accrual: 'Reporting', start: '05/01/2024', end: '04/30/2026' },
    { sort: 'C', wsevId: 254412, weId: 165, weName: 'Produce Environmental Compliance Documentation', title: 'Environmental compliance for Riverside Road and floodplain reconnection', description: 'Work with the BPA environmental compliance lead and Federal Highways on clearances.', budget: 186_500, accrual: 'Reporting', start: '05/01/2024', end: '04/30/2026' },
    { sort: 'D', wsevId: 254413, weId: 29, weName: 'Increase Aquatic and/or Floodplain Complexity', title: 'Reconnect floodplain habitat on the Kootenai National Wildlife Refuge', description: 'Lower levees and regrade side channels across the refuge reach.', budget: 9_840_000, accrual: 'Habitat Improvement', start: '05/01/2024', end: '04/30/2026' },
    { sort: 'E', wsevId: 254414, weId: 184, weName: 'Install Fish Passage Structure', title: 'Riverside Road raise and culvert replacement', description: 'Raise the road grade and replace culverts so the reconnected floodplain can flood.', budget: 6_480_000, accrual: 'Habitat Improvement', start: '05/01/2024', end: '04/30/2026' },
    { sort: 'F', wsevId: 254415, weId: 47, weName: 'Plant Vegetation', title: 'Riparian planting on reconnected floodplain', description: 'Native cottonwood and willow planting on regraded banks.', budget: 541_719, accrual: 'Habitat Improvement', start: '05/01/2024', end: '04/30/2026' },
  ],
  deliverables: [
    { title: 'Effective implementation management and timely contract administration', wse: 'A: 119. Project implementation management and contract administration', start: '', end: '04/30/2026', concluded: '' },
    { title: 'Compliance documentation for environmental and cultural resources clearances', wse: 'C: 165. Environmental compliance for Riverside Road and floodplain reconnection', start: '', end: '04/30/2026', concluded: '03/12/2025' },
    { title: 'Floodplain reconnected', wse: 'D: 29. Reconnect floodplain habitat on the Kootenai National Wildlife Refuge', start: '', end: '04/30/2026', concluded: '' },
    { title: 'Road raised and culverts replaced', wse: 'E: 184. Riverside Road raise and culvert replacement', start: '', end: '04/30/2026', concluded: '' },
    { title: 'Riparian vegetation established', wse: 'F: 47. Riparian planting on reconnected floodplain', start: '', end: '04/30/2026', concluded: '' },
  ],
  envCompliance: [
    { sort: 'A', weId: 119, title: 'Project implementation management and contract administration', nepa: false, noaa: false, usfws: false, nhpa: false, provisions: false, discovery: false, completed: '' },
    { sort: 'B', weId: 185, title: 'Periodic status reports for BPA', nepa: false, noaa: false, usfws: false, nhpa: false, provisions: false, discovery: false, completed: '' },
    { sort: 'C', weId: 165, title: 'Environmental compliance for Riverside Road and floodplain reconnection', nepa: false, noaa: false, usfws: false, nhpa: false, provisions: false, discovery: false, completed: '' },
    { sort: 'D', weId: 29, needsClearance: true, title: 'Reconnect floodplain habitat on the Kootenai National Wildlife Refuge', nepa: true, noaa: true, usfws: true, nhpa: true, provisions: true, discovery: false, completed: '03/12/2025' },
    { sort: 'E', weId: 184, needsClearance: true, title: 'Riverside Road raise and culvert replacement', nepa: true, noaa: true, usfws: true, nhpa: true, provisions: true, discovery: true, completed: '03/12/2025' },
    { sort: 'F', weId: 47, needsClearance: true, title: 'Riparian planting on reconnected floodplain', nepa: true, noaa: false, usfws: false, nhpa: true, provisions: false, discovery: false, completed: '' },
  ],
};


export const OVERVIEW = { lib, pi };

// ── What the Overview says about each section's detail ───────────────────────
// Derived, never typed: every number below comes from the rows above, so the
// Overview can't disagree with the tab it links to.

const isoOf = (us) => {
  if (!us) return '';
  const [m, d, y] = us.split('/').map(Number);
  return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
};
const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86_400_000);
const usd0 = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const usdShort = (n) => (n >= 1e6 ? `$${(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `$${Math.round(n / 1e3)}K` : usd0(n));

/** The contacts the Overview names, in the order people look for them. */
const KEY_ROLES = ['COR', 'Contracting officer', 'Env. compliance lead', 'Contract manager', 'Technical contact'];

/**
 * @param key      'lib' | 'pi'
 * @param today    ISO date
 * @param money    { value, spent } in dollars
 * @param period   { start, end } as M/D/YYYY
 */
export function overviewFacts(key, today, money, period) {
  const o = OVERVIEW[key];

  const open = o.deliverables.filter((d) => !d.concluded);
  const late = open.filter((d) => isoOf(d.end) < today);
  const soon = open.filter((d) => isoOf(d.end) >= today && daysBetween(today, isoOf(d.end)) <= 90);

  const needs = o.envCompliance.filter((r) => r.needsClearance);
  const notCleared = needs.filter((r) => !r.completed);

  const start = isoOf(period.start);
  const end = isoOf(period.end);
  const elapsed = Math.min(1, Math.max(0, daysBetween(start, today) / daysBetween(start, end)));
  const spentShare = money.spent / money.value;

  const total = o.wses.reduce((sum, w) => sum + w.budget, 0);
  const byCategory = Object.values(
    o.wses.reduce((acc, w) => {
      acc[w.accrual] ??= { category: w.accrual, count: 0, budget: 0 };
      acc[w.accrual].count += 1;
      acc[w.accrual].budget += w.budget;
      return acc;
    }, {}),
  )
    .sort((a, b) => b.budget - a.budget)
    .map((c) => ({ ...c, share: c.budget / total, budgetLabel: usd0(c.budget) }));

  return {
    deliverables: { total: o.deliverables.length, concluded: o.deliverables.length - open.length, late, soon },
    compliance: { needs: needs.length, notCleared },
    budget: {
      spent: usdShort(money.spent),
      value: usd0(money.value),
      spentPct: Math.round(spentShare * 100),
      elapsedPct: Math.round(elapsed * 100),
    },
    scope: { count: o.wses.length, total: usd0(total), byCategory },
    keyContacts: KEY_ROLES.map((r) => o.contacts.find((c) => c.role === r)).filter(Boolean),
    contactCount: o.contacts.length,
    activity: o.activity,
  };
}
