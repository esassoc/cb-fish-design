// Single source of truth for the 2020 CRS Commitments area: the commitments
// grid, the per-commitment summary page, and (later) the document library and
// dashboard views all derive from this one dataset.
//
// Deterministic, fictional, domain-credible mock data — titles, descriptions,
// and people are invented, NOT derived from any client document or live system.

/**
 * @typedef {'Not Started' | 'In Progress' | 'Delayed' | 'Future' | 'Complete' | 'Closed'} CommitmentStatus
 * @typedef {{
 *   number: string; title: string; source: string; sectionNumber: string; pageNumber: string;
 *   category: string; subcategory: string; commitmentType: 'Functional' | 'Procedural' | 'Reporting';
 *   frequency: string; description: string; interpretation: string; implementation: string;
 *   notes?: string; otherAssociatedCommitments?: string; startDate: string; endDate: string;
 *   deliverable: string; deliverableFrequency: string; documentDueDate: string;
 *   leadAgency: string; partnerAgency: string; partnerPOC: string; policyLead: string;
 *   biopSME: string; cor: string; nmfsPOC: string; associatedProjects: string;
 *   statusByYear: Record<number, CommitmentStatus>; status: CommitmentStatus;
 * }} CrsCommitment
 */

/** The tracked commitment horizon — matches the live CRS BiOp reporting window. */
export const YEARS = Array.from({ length: 15 }, (_, i) => 2021 + i);

/** The year the dashboard treats as "current" — years after this default to Future until reached. */
export const CURRENT_YEAR = 2026;

const STATUS_CODES = {
  N: 'Not Started',
  I: 'In Progress',
  D: 'Delayed',
  F: 'Future',
  C: 'Complete',
  X: 'Closed',
};

/** esa-pill variant per status — color conveys state, never a border or icon. */
export const STATUS_TONE = {
  'Not Started': 'default',
  'In Progress': 'info',
  Delayed: 'warning',
  Future: 'default',
  Complete: 'success',
  Closed: 'default',
};

// esa-badge dot variant per status — a separate palette from STATUS_TONE (pills
// vs. compact dots), but co-located so the two can't silently drift as statuses
// change. This spoke's theme paints primary/secondary/info in the navy-blue
// family, so the dot palette keeps only three visually distinct "active" hues
// (In Progress=blue, Delayed=amber, Complete=green) and folds the three quiet
// states (Not Started / Future / Closed) into one neutral dot — the same
// 4-tone grouping STATUS_TONE uses above (those three collapse to `default`
// there too). The exact quiet sub-state stays legible via each dot's
// title/aria-label and the detail-page pill text. Used by the dashboard's stat
// row, year-strip dots, and legend.
export const STATUS_DOT = {
  'In Progress': 'info',
  Delayed: 'warning',
  Complete: 'success',
  'Not Started': 'secondary',
  Future: 'secondary',
  Closed: 'secondary',
};

function timeline(pattern) {
  const codes = pattern.split(' ');
  return Object.fromEntries(YEARS.map((year, i) => [year, STATUS_CODES[codes[i]]]));
}

function commitment(fields) {
  const statusByYear = timeline(fields.timeline);
  const { timeline: _pattern, ...rest } = fields;
  return { ...rest, statusByYear, status: statusByYear[CURRENT_YEAR] };
}

/** @type {CrsCommitment[]} */
export const commitments = [
  commitment({
    number: 'CRS-Com-4',
    title: 'Continue adult fish counts at mainstem dams',
    source: '2020 CRS Biological Assessment - Proposed Action',
    sectionNumber: '2.7.1.1',
    pageNumber: '2-118',
    category: 'Hydro',
    subcategory: 'RM&E',
    commitmentType: 'Functional',
    frequency: 'Recurring',
    description:
      'Count adult salmon and steelhead passing mainstem dam fish ladders during each migration season.',
    interpretation:
      'Maintain continuous ladder counts at every mainstem project through the spring and fall migration windows.',
    implementation:
      'BPA funds the counting stations and camera systems; the Corps maintains ladder infrastructure.',
    notes: 'Camera upgrades at two projects are scheduled for 2027.',
    startDate: '10/1/2020',
    endDate: '9/28/2035',
    deliverable: 'Annual Count Summary',
    deliverableFrequency: 'Recurring - Annually',
    documentDueDate: '3/1',
    leadAgency: 'BPA',
    partnerAgency: 'USACE',
    partnerPOC: 'Renee Ashford',
    policyLead: 'Marcus Feld',
    biopSME: 'Priya Nair',
    cor: 'N/A',
    nmfsPOC: 'Alan Cho',
    associatedProjects: '1987-041-00, 1994-018-00',
    timeline: 'N I I I I I F F F F F F F F F',
  }),
  commitment({
    number: 'CRS-Com-9',
    title: 'Upgrade PIT-tag detection arrays at Bonneville Dam',
    source: '2020 CRS Biological Assessment - Proposed Action',
    sectionNumber: '2.7.1.2',
    pageNumber: '2-120',
    category: 'Hydro',
    subcategory: 'RM&E',
    commitmentType: 'Functional',
    frequency: 'Discrete',
    description: 'Add PIT-tag detection capability to two additional fish ladders at Bonneville Dam.',
    interpretation: 'Install and commission detection arrays capable of reading existing tag formats.',
    implementation: 'BPA funds equipment procurement; the Corps installs and maintains the arrays.',
    notes: 'Commissioning completed ahead of schedule in 2024.',
    startDate: '10/1/2021',
    endDate: '9/30/2024',
    deliverable: 'Installation Report',
    deliverableFrequency: 'Once',
    documentDueDate: '12/31/2024',
    leadAgency: 'BPA',
    partnerAgency: 'USACE',
    partnerPOC: 'Renee Ashford',
    policyLead: 'Marcus Feld',
    biopSME: 'Dana Iverson',
    cor: 'Todd Whitfield',
    nmfsPOC: 'Alan Cho',
    associatedProjects: '1994-018-00',
    timeline: 'N I I C C C C C C C C C C C C',
  }),
  commitment({
    number: 'CRS-Com-12',
    title: 'Annual water temperature monitoring below Grand Coulee',
    source: '2020 CRS Biological Assessment - Proposed Action',
    sectionNumber: '2.7.1.4',
    pageNumber: '2-123',
    category: 'Hydro',
    subcategory: 'RM&E',
    commitmentType: 'Functional',
    frequency: 'Recurring',
    description: 'Record river temperature at index stations below Grand Coulee Dam through the summer months.',
    interpretation: 'Deploy loggers at three index stations from May through September each year.',
    implementation:
      'BPA funds logger deployment and data QA/QC; results are published to the regional temperature database.',
    notes: '',
    startDate: '10/1/2020',
    endDate: '9/28/2035',
    deliverable: 'Temperature Monitoring Report',
    deliverableFrequency: 'Recurring - Annually',
    documentDueDate: '11/15',
    leadAgency: 'BPA',
    partnerAgency: 'N/A',
    partnerPOC: 'N/A',
    policyLead: 'Marcus Feld',
    biopSME: 'Priya Nair',
    cor: 'N/A',
    nmfsPOC: 'Alan Cho',
    associatedProjects: '1990-014-00',
    timeline: 'I I I I I I F F F F F F F F F',
  }),
  commitment({
    number: 'CRS-Com-18',
    title: 'Evaluate juvenile bypass screening efficiency',
    source: '2020 CRS BiOp',
    sectionNumber: '2.17.4(1)(H)',
    pageNumber: '1401',
    category: 'Hydro',
    subcategory: 'RM&E',
    commitmentType: 'Functional',
    frequency: 'Recurring',
    description: 'Assess screening efficiency at juvenile bypass facilities using acoustic tag studies.',
    interpretation: 'Conduct a paired-release acoustic tag study at index projects on a three-year rotation.',
    implementation: 'BPA funds tagging and analysis; NOAA Fisheries provides study design review.',
    notes: 'Delayed one season while a revised study design was reviewed.',
    startDate: '10/1/2020',
    endDate: '9/28/2035',
    deliverable: 'Screening Efficiency Report',
    deliverableFrequency: 'Recurring - Every 3 Years',
    documentDueDate: '2/1',
    leadAgency: 'BPA',
    partnerAgency: 'USACE',
    partnerPOC: 'Renee Ashford',
    policyLead: 'Marcus Feld',
    biopSME: 'Dana Iverson',
    cor: 'N/A',
    nmfsPOC: 'Alan Cho',
    associatedProjects: '1987-041-00, 2003-011-00',
    timeline: 'N N I D I I F F F F F F F F F',
  }),
  commitment({
    number: 'CRS-Com-22',
    title: 'Fund the Smolt Monitoring Program',
    source: '2020 CRS Biological Assessment - Proposed Action',
    sectionNumber: '2.7.1.1',
    pageNumber: '2-119',
    category: 'Hydro',
    subcategory: 'RM&E',
    commitmentType: 'Functional',
    frequency: 'Recurring',
    description: 'Continue funding the basin-wide Smolt Monitoring Program at index juvenile bypass facilities.',
    interpretation: 'Support monitoring of abundance, timing, and condition of outmigrating juvenile salmonids.',
    implementation: 'BPA funds field crews and data management through the regional monitoring cooperative.',
    notes: '',
    startDate: '10/1/2020',
    endDate: '9/28/2035',
    deliverable: 'Program Implementation',
    deliverableFrequency: 'Recurring - Annually',
    documentDueDate: 'N/A',
    leadAgency: 'BPA',
    partnerAgency: 'USACE',
    partnerPOC: 'Renee Ashford',
    policyLead: 'Marcus Feld',
    biopSME: 'Priya Nair',
    cor: 'N/A',
    nmfsPOC: 'Alan Cho',
    associatedProjects: '1987-041-00',
    timeline: 'I I I I I I F F F F F F F F F',
  }),
  commitment({
    number: 'CRS-Com-31',
    title: 'Implement tributary habitat enhancement actions',
    source: '2020 CRS Biological Assessment - Proposed Action',
    sectionNumber: '2.6.1.4',
    pageNumber: '2-96',
    category: 'Habitat',
    subcategory: 'Tributary',
    commitmentType: 'Functional',
    frequency: 'Recurring',
    description: 'Fund priority tributary habitat restoration projects in Snake River and upper Columbia populations.',
    interpretation: 'Direct habitat investment toward populations prioritized by the Tributary Habitat Steering Committee.',
    implementation: 'Project sponsors design and construct actions with BPA and Corps funding support.',
    notes: 'Two 2026 projects postponed to 2027 pending permitting.',
    startDate: '10/1/2020',
    endDate: '9/28/2035',
    deliverable: 'Program Implementation',
    deliverableFrequency: 'Recurring - Annually',
    documentDueDate: 'N/A',
    leadAgency: 'BPA, BOR',
    partnerAgency: 'BOR',
    partnerPOC: 'N/A',
    policyLead: 'Sean Ostrander',
    biopSME: 'Priya Nair',
    cor: 'N/A',
    nmfsPOC: 'Alan Cho',
    associatedProjects: '1996-040-00, 2007-224-00',
    timeline: 'I I I I D I F F F F F F F F F',
  }),
  commitment({
    number: 'CRS-Com-33',
    title: 'Report annually on tributary habitat implementation',
    source: '2020 CRS BiOp',
    sectionNumber: '2.17.4(2)(F)',
    pageNumber: '1404',
    category: 'Habitat',
    subcategory: 'Tributary',
    commitmentType: 'Reporting',
    frequency: 'Recurring',
    description: 'Prepare an annual summary of tributary habitat projects completed and underway.',
    interpretation: 'Compile project status, metrics achieved, and population-level context for the reporting year.',
    implementation: 'BPA compiles the report from project sponsor updates and the CBFish portfolio.',
    notes: '',
    startDate: '10/1/2020',
    endDate: '9/28/2035',
    deliverable: 'Annual Implementation Progress Report',
    deliverableFrequency: 'Recurring - Annually',
    documentDueDate: '2/15',
    leadAgency: 'BPA',
    partnerAgency: 'N/A',
    partnerPOC: 'N/A',
    policyLead: 'Sean Ostrander',
    biopSME: 'N/A',
    cor: 'N/A',
    nmfsPOC: 'Alan Cho',
    associatedProjects: 'N/A',
    timeline: 'I I I I I I F F F F F F F F F',
  }),
  commitment({
    number: 'CRS-Com-38',
    title: 'Develop 5-year tributary habitat implementation plan',
    source: '2020 CRS Biological Assessment - Proposed Action',
    sectionNumber: '2.6.1.4',
    pageNumber: '2-98',
    category: 'Habitat',
    subcategory: 'Tributary',
    commitmentType: 'Functional',
    frequency: 'Discrete',
    description: 'Produce a five-year prospective plan for tributary habitat investment.',
    interpretation:
      'Identify priority populations, target metrics, and anticipated project pipeline for the next five years.',
    implementation: 'BPA drafts the plan with input from the Tributary Habitat Steering Committee.',
    notes: 'Plan adopted ahead of schedule.',
    startDate: '10/1/2021',
    endDate: '9/30/2022',
    deliverable: '5-Year Implementation Plan',
    deliverableFrequency: 'Once',
    documentDueDate: '9/30/2022',
    leadAgency: 'BPA',
    partnerAgency: 'N/A',
    partnerPOC: 'N/A',
    policyLead: 'Sean Ostrander',
    biopSME: 'N/A',
    cor: 'N/A',
    nmfsPOC: 'Alan Cho',
    associatedProjects: 'N/A',
    timeline: 'N C C C C C C C C C C C C C C',
  }),
  commitment({
    number: 'CRS-Com-41',
    title: 'Implement the Columbia Estuary Ecosystem Restoration Program',
    source: '2020 CRS Biological Assessment - Proposed Action',
    sectionNumber: '2.6.1.5',
    pageNumber: '2-100',
    category: 'Habitat',
    subcategory: 'Estuary',
    commitmentType: 'Functional',
    frequency: 'Recurring',
    description: 'Fund construction and monitoring of estuary habitat restoration actions under CEERP.',
    interpretation: 'Advance the CEERP project pipeline toward acreage and function targets.',
    implementation: 'BPA and the Corps jointly fund construction; project sponsors report annually.',
    notes: '',
    startDate: '10/1/2020',
    endDate: '9/28/2035',
    deliverable: 'Program Implementation',
    deliverableFrequency: 'Recurring - Annually',
    documentDueDate: 'N/A',
    leadAgency: 'BPA, USACE',
    partnerAgency: 'USACE',
    partnerPOC: 'Renee Ashford',
    policyLead: 'Sean Ostrander',
    biopSME: 'Dana Iverson',
    cor: 'N/A',
    nmfsPOC: 'Alan Cho',
    associatedProjects: '2007-224-00',
    timeline: 'I I I I I I F F F F F F F F F',
  }),
  commitment({
    number: 'CRS-Com-44',
    title: 'Submit estuary habitat synthesis memorandum',
    source: '2020 CRS BiOp',
    sectionNumber: '2.17.4(2)(G)',
    pageNumber: '1405',
    category: 'Habitat',
    subcategory: 'Estuary',
    commitmentType: 'Reporting',
    frequency: 'Discrete',
    description: 'Summarize accumulated estuary restoration monitoring results in a synthesis memorandum.',
    interpretation: 'Synthesize project-level effectiveness monitoring into basin-scale conclusions.',
    implementation: 'BPA funds the synthesis; a contracted research team drafts the memorandum.',
    notes: 'Third synthesis memo currently in progress.',
    startDate: '10/1/2024',
    endDate: '9/30/2027',
    deliverable: 'Synthesis Memorandum',
    deliverableFrequency: 'Once',
    documentDueDate: '9/30/2027',
    leadAgency: 'BPA',
    partnerAgency: 'N/A',
    partnerPOC: 'N/A',
    policyLead: 'Sean Ostrander',
    biopSME: 'Dana Iverson',
    cor: 'N/A',
    nmfsPOC: 'Alan Cho',
    associatedProjects: 'N/A',
    timeline: 'N N N I I I C C C C C C C C C',
  }),
  commitment({
    number: 'CRS-Com-52',
    title: 'Fund O&M of the Klickitat Hatchery safety-net program',
    source: '2020 CRS Biological Assessment - Proposed Action',
    sectionNumber: '2.6.2.1',
    pageNumber: '2-104',
    category: 'Hatchery',
    subcategory: 'Hatchery',
    commitmentType: 'Functional',
    frequency: 'Recurring',
    description: 'Continue funding operations and maintenance for the Klickitat safety-net hatchery program.',
    interpretation: 'Support production consistent with the levels identified in the proposed action.',
    implementation: 'BPA funds O&M through an annual contract with the operating co-manager.',
    notes: '',
    startDate: '10/1/2020',
    endDate: '9/28/2035',
    deliverable: 'Program Implementation',
    deliverableFrequency: 'Recurring - Annually',
    documentDueDate: 'N/A',
    leadAgency: 'BPA',
    partnerAgency: 'N/A',
    partnerPOC: 'N/A',
    policyLead: 'Marcus Feld',
    biopSME: 'N/A',
    cor: 'Todd Whitfield',
    nmfsPOC: 'Alan Cho',
    associatedProjects: '1988-115-00',
    timeline: 'I I I I I I F F F F F F F F F',
  }),
  commitment({
    number: 'CRS-Com-58',
    title: 'Discuss basin-wide hatchery monitoring needs',
    source: '2020 CRS Biological Assessment - Proposed Action',
    sectionNumber: '2.6.2.3',
    pageNumber: '2-107',
    category: 'Hatchery',
    subcategory: 'Hatchery',
    commitmentType: 'Procedural',
    frequency: 'Ongoing',
    description: 'Coordinate with co-managers on shared hatchery monitoring priorities and gaps.',
    interpretation: 'Convene periodic discussions to identify monitoring needs common across hatchery programs.',
    implementation: 'BPA facilitates coordination meetings with regional co-managers.',
    notes: '',
    startDate: '10/1/2020',
    endDate: '9/28/2035',
    deliverable: 'N/A',
    deliverableFrequency: 'N/A',
    documentDueDate: 'N/A',
    leadAgency: 'BPA',
    partnerAgency: 'N/A',
    partnerPOC: 'N/A',
    policyLead: 'Marcus Feld',
    biopSME: 'N/A',
    cor: 'N/A',
    nmfsPOC: 'N/A',
    associatedProjects: 'N/A',
    timeline: 'I I I I I I F F F F F F F F F',
  }),
  commitment({
    number: 'CRS-Com-63',
    title: 'Fund the Northern Pikeminnow Management Program',
    source: '2020 CRS Biological Assessment - Proposed Action',
    sectionNumber: '2.6.3.1',
    pageNumber: '2-110',
    category: 'Predation',
    subcategory: 'Predation',
    commitmentType: 'Functional',
    frequency: 'Recurring',
    description: 'Continue funding the sport-reward and commercial fishery components of the pikeminnow removal program.',
    interpretation: 'Sustain removal effort at levels sufficient to hold predation impact below the program target.',
    implementation: 'BPA funds program administration; contracted crews conduct removal fisheries.',
    notes: '',
    startDate: '10/1/2020',
    endDate: '9/28/2035',
    deliverable: 'Program Implementation',
    deliverableFrequency: 'Recurring - Annually',
    documentDueDate: 'N/A',
    leadAgency: 'BPA',
    partnerAgency: 'N/A',
    partnerPOC: 'N/A',
    policyLead: 'Sean Ostrander',
    biopSME: 'Dana Iverson',
    cor: 'N/A',
    nmfsPOC: 'Alan Cho',
    associatedProjects: '1990-077-00',
    timeline: 'I I I I I I F F F F F F F F F',
  }),
  commitment({
    number: 'CRS-Com-67',
    title: 'Evaluate avian predation monitoring results',
    source: '2020 CRS BiOp',
    sectionNumber: '2.17.4(1)(K)',
    pageNumber: '1406',
    category: 'Predation',
    subcategory: 'Predation',
    commitmentType: 'Reporting',
    frequency: 'Recurring',
    description: 'Summarize annual avian predation monitoring data and management actions taken.',
    interpretation: 'Report on colony deterrence outcomes and tagged-fish loss estimates.',
    implementation: 'BPA funds the monitoring contractor; results are compiled into an annual report.',
    notes: '2025 report submitted three weeks late.',
    startDate: '10/1/2020',
    endDate: '9/28/2035',
    deliverable: 'Annual Implementation Progress Report',
    deliverableFrequency: 'Recurring - Annually',
    documentDueDate: '3/31',
    leadAgency: 'BPA',
    partnerAgency: 'N/A',
    partnerPOC: 'N/A',
    policyLead: 'Sean Ostrander',
    biopSME: 'Dana Iverson',
    cor: 'N/A',
    nmfsPOC: 'Alan Cho',
    associatedProjects: 'N/A',
    timeline: 'N I I I D I F F F F F F F F F',
  }),
  commitment({
    number: 'CRS-Com-71',
    title: "Fund the Kootenai River sturgeon conservation aquaculture program",
    source: '2020 CRS Biological Assessment - Proposed Action',
    sectionNumber: '2.6.4.1',
    pageNumber: '2-113',
    category: 'Above Anadromy',
    subcategory: 'Above Anadromy',
    commitmentType: 'Functional',
    frequency: 'Recurring',
    description: "Provide funding for the Kootenai Tribe's sturgeon conservation aquaculture program.",
    interpretation: 'Fund production consistent with the terms of the existing conservation agreement.',
    implementation: 'BPA funds the program per an interagency memorandum of agreement.',
    notes: '',
    startDate: '10/1/2020',
    endDate: '9/28/2035',
    deliverable: 'Program Implementation',
    deliverableFrequency: 'Recurring - Annually',
    documentDueDate: 'N/A',
    leadAgency: 'BPA',
    partnerAgency: 'N/A',
    partnerPOC: 'N/A',
    policyLead: 'Marcus Feld',
    biopSME: 'N/A',
    cor: 'N/A',
    nmfsPOC: 'N/A',
    associatedProjects: '1988-064-00',
    timeline: 'I I I I I I F F F F F F F F F',
  }),
  commitment({
    number: 'CRS-Com-8',
    title: 'Study bull trout entrainment at Chief Joseph Dam',
    source: '2020 CRS Biological Assessment - Proposed Action',
    sectionNumber: '2.6.5.2',
    pageNumber: '2-115',
    category: 'Hydro',
    subcategory: 'RM&E',
    commitmentType: 'Functional',
    frequency: 'Discrete',
    description: 'Investigate bull trout entrainment rates at Chief Joseph Dam spillway.',
    interpretation: 'Estimate entrainment using PIT-tag detections and targeted netting surveys.',
    implementation:
      'BPA funded a two-year study; results were incorporated into the 2023 biological assessment update.',
    notes: 'Study complete; no further action planned.',
    startDate: '10/1/2020',
    endDate: '9/30/2022',
    deliverable: 'Study Report',
    deliverableFrequency: 'Once',
    documentDueDate: '9/30/2022',
    leadAgency: 'BPA',
    partnerAgency: 'USACE',
    partnerPOC: 'Renee Ashford',
    policyLead: 'Marcus Feld',
    biopSME: 'Priya Nair',
    cor: 'N/A',
    nmfsPOC: 'Alan Cho',
    associatedProjects: '1994-018-00',
    timeline: 'N C C X X X X X X X X X X X X',
  }),
];

export function findCommitment(number) {
  return commitments.find((c) => c.number === number);
}

/**
 * @typedef {{
 *   commitmentNumber: string; dueDate?: string; category: 'CRS Commitment Deliverable' | 'CRS Commitment Supporting Document';
 *   type: string; title: string; description: string; filename?: string; uploadDate?: string; uploadUser?: string;
 * }} CrsDocument
 */

// Documents reference their parent commitment by number rather than duplicating
// its title/source/category — the document library grid joins against
// `commitments` via `findCommitment` so the two can never drift apart. Roughly
// a third of commitments have at least one document; the rest are still open.
// A document with a `dueDate` but no `uploadDate`/`uploadUser`/`filename` is a
// tracked due date nothing has been submitted against yet (mirrors the live
// CBFish model, where a due date and an uploaded document are related but
// distinct records) — used by the dashboard's per-year document indicator.
/** @type {CrsDocument[]} */
export const documents = [
  {
    commitmentNumber: 'CRS-Com-4', dueDate: '3/1/2025', category: 'CRS Commitment Deliverable',
    type: 'Annual Report', title: 'Adult Count Summary — 2024 Migration Season',
    description: 'Ladder count totals and methodology notes for the 2024 spring and fall runs.',
    filename: 'adult-count-summary-2024.pdf', uploadDate: '2/26/2025', uploadUser: 'Renee Ashford',
  },
  {
    commitmentNumber: 'CRS-Com-4', dueDate: '3/1/2026', category: 'CRS Commitment Deliverable',
    type: 'Annual Report', title: 'Adult Count Summary — 2025 Migration Season',
    description: 'Ladder count totals and methodology notes for the 2025 spring and fall runs.',
    filename: 'adult-count-summary-2025.pdf', uploadDate: '2/24/2026', uploadUser: 'Renee Ashford',
  },
  {
    commitmentNumber: 'CRS-Com-9', dueDate: '12/31/2024', category: 'CRS Commitment Deliverable',
    type: 'Final Report', title: 'Bonneville PIT Array Installation Report',
    description: 'As-built documentation for the two new ladder detection arrays.',
    filename: 'bon-pit-array-install-report.pdf', uploadDate: '12/18/2024', uploadUser: 'Todd Whitfield',
  },
  {
    commitmentNumber: 'CRS-Com-12', dueDate: '11/15/2025', category: 'CRS Commitment Deliverable',
    type: 'Annual Report', title: 'Grand Coulee Temperature Monitoring — 2025',
    description: 'Summer index-station temperature records and exceedance summary.',
    filename: 'grand-coulee-temp-2025.pdf', uploadDate: '11/10/2025', uploadUser: 'Priya Nair',
  },
  {
    commitmentNumber: 'CRS-Com-18', category: 'CRS Commitment Supporting Document',
    type: 'Study Plan', title: 'Revised Acoustic Tag Study Design',
    description: 'Updated paired-release study design reviewed after the 2024 delay.',
    filename: 'bypass-screening-study-plan-rev2.pdf', uploadDate: '1/15/2025', uploadUser: 'Dana Iverson',
  },
  {
    commitmentNumber: 'CRS-Com-31', dueDate: '2/15/2026', category: 'CRS Commitment Deliverable',
    type: 'Annual Report', title: 'Tributary Habitat Implementation — 2025',
    description: 'Project-by-project status for the Snake River and upper Columbia habitat pipeline.',
    filename: 'tributary-habitat-2025.pdf', uploadDate: '2/10/2026', uploadUser: 'Sean Ostrander',
  },
  {
    // Next year's cycle of the same recurring report — due, nothing uploaded
    // yet. No filename/uploadDate/uploadUser: this due date has no document
    // attached to it yet.
    commitmentNumber: 'CRS-Com-31', dueDate: '2/15/2027', category: 'CRS Commitment Deliverable',
    type: 'Annual Report', title: 'Tributary Habitat Implementation — 2026',
    description: 'Project-by-project status for the Snake River and upper Columbia habitat pipeline.',
  },
  {
    commitmentNumber: 'CRS-Com-33', dueDate: '2/15/2025', category: 'CRS Commitment Deliverable',
    type: 'Annual Report', title: 'Tributary Habitat Implementation Progress Report — 2024',
    description: 'Annual summary of completed and underway tributary projects.',
    filename: 'tributary-implementation-progress-2024.pdf', uploadDate: '2/12/2025', uploadUser: 'Sean Ostrander',
  },
  {
    commitmentNumber: 'CRS-Com-38', dueDate: '9/30/2022', category: 'CRS Commitment Deliverable',
    type: 'Final Report', title: '5-Year Tributary Habitat Implementation Plan',
    description: 'Priority populations, target metrics, and the anticipated project pipeline through 2027.',
    filename: 'tributary-5yr-plan-2022.pdf', uploadDate: '9/22/2022', uploadUser: 'Sean Ostrander',
  },
  {
    commitmentNumber: 'CRS-Com-41', dueDate: '2/1/2026', category: 'CRS Commitment Deliverable',
    type: 'Annual Report', title: 'CEERP Implementation Plan — 2026',
    description: 'Construction and monitoring plan for the coming water year.',
    filename: 'ceerp-implementation-plan-2026.pdf', uploadDate: '1/28/2026', uploadUser: 'Dana Iverson',
  },
  {
    commitmentNumber: 'CRS-Com-44', category: 'CRS Commitment Supporting Document',
    type: 'Data Summary', title: 'Estuary Synthesis Memo #3 — Draft Data Tables',
    description: 'Preliminary effectiveness monitoring tables for the third synthesis memorandum.',
    filename: 'estuary-synthesis-3-draft-tables.xlsx', uploadDate: '6/2/2026', uploadUser: 'Dana Iverson',
  },
  {
    commitmentNumber: 'CRS-Com-52', category: 'CRS Commitment Supporting Document',
    type: 'Correspondence', title: 'Klickitat Hatchery O&M Contract Renewal Letter',
    description: "Co-manager correspondence confirming FY26 O&M scope and funding level.",
    filename: 'klickitat-om-renewal-letter.pdf', uploadDate: '10/3/2025', uploadUser: 'Todd Whitfield',
  },
  {
    // Overdue: due date has passed with nothing uploaded against it.
    commitmentNumber: 'CRS-Com-52', dueDate: '9/30/2025', category: 'CRS Commitment Deliverable',
    type: 'Annual Report', title: 'Klickitat Hatchery O&M Summary — FY2025',
    description: 'Fiscal-year O&M summary and production totals for the Klickitat safety-net program.',
  },
  {
    commitmentNumber: 'CRS-Com-63', category: 'CRS Commitment Supporting Document',
    type: 'Data Summary', title: 'Pikeminnow Removal Totals — 2025 Season',
    description: 'Sport-reward and commercial fishery removal counts by reach.',
    filename: 'pikeminnow-removal-totals-2025.xlsx', uploadDate: '11/20/2025', uploadUser: 'Dana Iverson',
  },
  {
    commitmentNumber: 'CRS-Com-67', dueDate: '3/31/2026', category: 'CRS Commitment Deliverable',
    type: 'Annual Report', title: 'Avian Predation Monitoring Report — 2025',
    description: 'Colony deterrence outcomes and tagged-fish loss estimates for 2025.',
    filename: 'avian-predation-report-2025.pdf', uploadDate: '4/21/2026', uploadUser: 'Dana Iverson',
  },
  {
    commitmentNumber: 'CRS-Com-8', dueDate: '9/30/2022', category: 'CRS Commitment Deliverable',
    type: 'Final Report', title: 'Chief Joseph Bull Trout Entrainment Study',
    description: 'Final entrainment estimates from PIT detections and netting surveys.',
    filename: 'chief-joseph-entrainment-study.pdf', uploadDate: '9/25/2022', uploadUser: 'Priya Nair',
  },
];

export function documentsFor(commitmentNumber) {
  return documents.filter((d) => d.commitmentNumber === commitmentNumber);
}

/**
 * Per-year document tracking for one commitment, derived from `documents`:
 * every entry with a `dueDate` marks that year 'received' (an uploadDate is on
 * file) or 'pending' (the due date has no document attached yet). Years with
 * no tracked due date are absent from the returned map. Powers the dashboard's
 * small per-year document indicator, which sits alongside the status dot.
 * @returns {Record<number, 'received' | 'pending'>}
 */
export function documentYearMarkers(commitmentNumber) {
  const markers = {};
  for (const doc of documentsFor(commitmentNumber)) {
    if (!doc.dueDate) continue;
    const year = new Date(doc.dueDate).getFullYear();
    if (Number.isNaN(year)) continue;
    markers[year] = doc.uploadDate ? 'received' : 'pending';
  }
  return markers;
}
