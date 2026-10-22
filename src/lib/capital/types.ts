// Capital program domain types — written straight from the PRD's "Domain model"
// section (docs/capital-program-prd.md) before any seed or screen, so the seed,
// the money math (finance.ts) and every screen share one vocabulary.
//
// Every amount is in THOUSANDS of dollars ($000s), the unit Ben's workbook, the
// execution report and the Asset Plan tables all use. The one exception is the
// actuals CSV, which Finance exports in whole dollars — the importer converts.

export type Category = 'Hatchery' | 'Land' | 'Passage';
/** Requests can arrive before anyone knows which bucket they belong in. */
export type RequestCategory = Category | 'TBD';
export type Subcategory = 'Expand' | 'Sustain';

/** Grid groups, in display order. Hatchery splits by subcategory. */
export type GroupKey = 'Hatchery Expand' | 'Hatchery Sustain' | 'Land' | 'Passage';
export const GROUPS: GroupKey[] = ['Hatchery Expand', 'Hatchery Sustain', 'Land', 'Passage'];
export const CATEGORIES: Category[] = ['Hatchery', 'Land', 'Passage'];
/** BPA Finance L5 codes, per category. */
export const CATEGORY_L5: Record<Category, string> = {
  Hatchery: '0005510',
  Land: '0005509',
  Passage: '0005511',
};

export type RecordType = 'Request' | 'Placeholder' | 'Active' | 'Complete' | 'Cancelled' | 'Deferred';
export const RECORD_TYPES: RecordType[] = ['Request', 'Placeholder', 'Active', 'Complete', 'Cancelled', 'Deferred'];

export type LifecycleStage =
  | 'Planning/MOA'
  | 'Design'
  | 'Environmental compliance'
  | 'Construction procurement'
  | 'Construction'
  | 'Acquisition'
  | 'Closeout'
  | 'Complete';
export const STAGES: LifecycleStage[] = [
  'Planning/MOA', 'Design', 'Environmental compliance', 'Construction procurement',
  'Construction', 'Acquisition', 'Closeout', 'Complete',
];

export type AccountType = 'Capital' | 'Expense' | 'Mixed' | 'None';
export type FundSource = 'Accord' | 'Long-term funding agreement' | 'General';

export type OmbStatus =
  | 'Not submitted'
  | 'Submitted'
  | 'Appropriations language approved'
  | 'Removed'
  | 'Not required (below threshold)';
export const OMB_STATUSES: OmbStatus[] = [
  'Not submitted', 'Submitted', 'Appropriations language approved', 'Removed', 'Not required (below threshold)',
];

export type NpccStep = 'Not required' | 'Step 1 (master plan)' | 'Step 2 (preliminary design)' | 'Step 3 (final design)' | 'Complete';
export const NPCC_STEPS: NpccStep[] = [
  'Not required', 'Step 1 (master plan)', 'Step 2 (preliminary design)', 'Step 3 (final design)', 'Complete',
];

export type GateStatus = 'Not started' | 'In progress' | 'Green' | 'Red' | 'Not applicable';
export const GATE_STATUSES: GateStatus[] = ['Not started', 'In progress', 'Green', 'Red', 'Not applicable'];

export type GateKey = 'leadership' | 'omb' | 'capitalization' | 'funding' | 'assetPlan' | 'cbfishBudget' | 'npcc';

export type LineType = 'Construction contract' | 'Support capital' | 'Land purchase' | 'Other';
export const LINE_TYPES: LineType[] = ['Construction contract', 'Support capital', 'Land purchase', 'Other'];

export type AdjustmentType =
  | 'Bid over estimate'
  | 'Change order'
  | 'Schedule slip'
  | 'Year-end re-forecast'
  | 'Transfer between projects'
  | 'Scope change'
  | 'Other';
export const ADJUSTMENT_TYPES: AdjustmentType[] = [
  'Bid over estimate', 'Change order', 'Schedule slip', 'Year-end re-forecast',
  'Transfer between projects', 'Scope change', 'Other',
];

export type VarianceReason =
  | 'Schedule slip'
  | 'Bid over estimate'
  | 'Partner not ready'
  | 'Weather/site access'
  | 'Agreement (MOA) delay'
  | 'Scope change'
  | 'Other';
export const VARIANCE_REASONS: VarianceReason[] = [
  'Schedule slip', 'Bid over estimate', 'Partner not ready', 'Weather/site access',
  'Agreement (MOA) delay', 'Scope change', 'Other',
];

export type RequestStatus = 'New' | 'Under review' | 'Added to plan' | 'Deferred to next Asset Plan' | 'Declined';
export const REQUEST_STATUSES: RequestStatus[] = [
  'New', 'Under review', 'Added to plan', 'Deferred to next Asset Plan', 'Declined',
];
export type RequestSource = 'OMB' | 'Asset Plan' | 'Email/partner' | 'Internal' | 'PM forecast';
export const REQUEST_SOURCES: RequestSource[] = ['OMB', 'Asset Plan', 'Email/partner', 'Internal', 'PM forecast'];

export type MilestonePhase =
  | 'Planning/MOA'
  | 'Design procurement'
  | 'Design'
  | 'EC'
  | '3-Step review'
  | 'Construction procurement'
  | 'Construction';
export const MILESTONE_PHASES: MilestonePhase[] = [
  'Planning/MOA', 'Design procurement', 'Design', 'EC', '3-Step review', 'Construction procurement', 'Construction',
];

export type EnvelopeSource = 'ipr' | 'apExpected' | 'apOptimal';
export const ENVELOPE_SOURCE_LABEL: Record<EnvelopeSource, string> = {
  apExpected: 'Asset Plan Expected (SOY)',
  apOptimal: 'Asset Plan Optimal',
  ipr: 'IPR / rate case',
};

export type SnapshotType = 'Asset Plan baseline' | 'Quarterly' | 'Finance submission' | 'Ad hoc';
export const SNAPSHOT_TYPES: SnapshotType[] = ['Asset Plan baseline', 'Quarterly', 'Finance submission', 'Ad hoc'];

export type Role = 'cpm' | 'apl' | 'pm' | 'analyst';

// ---------------------------------------------------------------------------
// Time: the plan is a fixed window of quarters, FY24–FY30, indexed 0..27.
// ---------------------------------------------------------------------------

export const FY_START = 2024;
export const FY_END = 2030;
export const FY_LIST = Array.from({ length: FY_END - FY_START + 1 }, (_, i) => FY_START + i);
export const SLOT_COUNT = FY_LIST.length * 4;
/** Fiscal months in order: Q1 = Oct–Dec. */
export const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] as const;
export type Month = (typeof MONTHS)[number];

// ---------------------------------------------------------------------------
// Entities
// ---------------------------------------------------------------------------

export interface GateRecord {
  status: GateStatus;
  date?: string;
  /** The person who signed off — e.g. Jason Sweet on Leadership. */
  approver?: string;
  docRef?: string;
  docUrl?: string;
  note?: string;
}

export interface GateDefinition {
  key: GateKey;
  label: string;
  /** Who keeps this light current, from the Oct 5 meeting. */
  owner: string;
  /** Roles in the prototype's switcher that may edit this light. */
  editableBy: Role[];
  hatcheryOnly?: boolean;
}

export interface OmbRecord {
  status: OmbStatus;
  submittedDate?: string;
  thresholdMet?: boolean;
  approvedDate?: string;
}

export interface BudgetChange {
  date: string;
  amount: number;
  reason: string;
  /** DMF, BCR, Finance Committee… */
  decisionRef?: string;
}

export interface StatusItem {
  status: string;
  date?: string;
  note?: string;
}

export interface Milestone {
  id: string;
  phase: MilestonePhase;
  label?: string;
  /** Quarter slots (see FY_START) — inclusive. */
  plannedStart: number;
  plannedEnd: number;
  actualStart?: number;
  actualEnd?: number;
}

export interface Project {
  id: string;
  /** CBFish project #, e.g. 1988-115-35. Null where the sources give none. */
  number: string | null;
  title: string;
  category: Category;
  subcategory?: Subcategory;
  sponsor: string;
  pm: string;
  constructionCor?: string;
  fundSource: FundSource;
  accountType: AccountType;
  portfolio: string;
  recordType: RecordType;
  stage: LifecycleStage;
  /** The free-text qualifier the execution report puts after the stage, e.g. "to Q1 FY27". */
  stageNote?: string;
  description?: string;
  omb: OmbRecord;
  npcc: NpccStep;
  /** Gate lights other than OMB and NPCC, which derive from their own records. */
  gates: Partial<Record<GateKey, GateRecord>>;
  originalBudget: number | null;
  /** Newest last. The current modified budget is the last entry's amount. */
  budgetHistory: BudgetChange[];
  /** Shown when the next modified budget is pending a decision, e.g. Waterwheel. */
  pendingBudget?: number | null;
  contingency?: number | null;
  ec: StatusItem;
  moa: StatusItem;
  design: StatusItem;
  milestones: Milestone[];
  /** Set when the project came from a capital request. */
  fromRequestId?: string;
  /** FY27 planned acres — land only. */
  plannedAcres?: number;
}

/** Forecast by line type, one value per quarter slot. */
export type SpendPlan = Partial<Record<LineType, number[]>>;
/** Actuals by FY, one value per fiscal month (Oct..Sep). */
export type ActualsByFy = Record<number, number[]>;

export interface CapitalRequest {
  id: string;
  title: string;
  requester: string;
  /** Who is behind the ask — e.g. leadership. */
  askSponsor?: string;
  category: RequestCategory;
  source: RequestSource;
  sourceNote?: string;
  omb: OmbRecord;
  /** By FY, $000s. */
  amounts: Record<number, number>;
  status: RequestStatus;
  targetCycle: string;
  linkedProjectId?: string;
  /** CBFish project # the ask relates to, if any. */
  relatedNumber?: string;
  gates: Partial<Record<GateKey, GateRecord>>;
  note?: string;
  /** An open-question tag shown beside the request. */
  assumption?: string;
  createdAt: string;
}

export interface Adjustment {
  id: string;
  projectId: string;
  type: AdjustmentType;
  amount: number;
  fromSlot?: number;
  toSlot?: number;
  reason: string;
  varianceReason?: VarianceReason;
  docRef?: string;
  docUrl?: string;
  approvedBy?: string;
  user: string;
  date: string;
}

export interface QuarterlyNote {
  id: string;
  projectId: string;
  fy: number;
  q: number;
  text: string;
  author: string;
  date: string;
}

export interface Envelope {
  fy: number;
  source: EnvelopeSource;
  sourceLabel: string;
  /** Null where the source table shows a dash. */
  amounts: Record<Category, number | null>;
}

export interface Settings {
  /** Quarters ending on or before this date are closed — they show actuals. */
  dataAsOf: string;
  /** While in the future, Requests nudges people to send new needs to the Asset Plan lead. */
  apTurnInDate: string;
  apTurnInCycle: string;
  /** OMB dollar threshold, $000s (open question 4). */
  ombThreshold: number;
  ratePeriod: { label: string; startFy: number; endFy: number };
  /** The FY whose Asset Plan the "In current Asset Plan" column reads. */
  currentApFy: number;
  gates: GateDefinition[];
}

/** The part of the state a snapshot freezes: spend plans, budgets and gates. */
export interface FrozenData {
  projects: Project[];
  plans: Record<string, SpendPlan>;
  actuals: Record<string, ActualsByFy>;
}

export interface Snapshot {
  id: string;
  label: string;
  type: SnapshotType;
  asOf: string;
  createdBy: string;
  createdAt: string;
  /** One per FY may be the Asset Plan baseline. */
  baselineFy?: number;
  data: FrozenData;
}

export interface CapitalState extends FrozenData {
  version: number;
  requests: CapitalRequest[];
  adjustments: Adjustment[];
  notes: QuarterlyNote[];
  envelopes: Envelope[];
  snapshots: Snapshot[];
  settings: Settings;
}
