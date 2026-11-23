// Types for the SOY (start-of-year budgets) future-state prototype.
//
// Truthful to today's data model (Gemini): an ITEM is project + fund + account
// type inside one fiscal year's SOY, and amounts are recorded PER STAGE (EWB
// proposed, PM proposed, Final budget), each with who entered it, when, and a
// comment. Anything the future state needs that Gemini does not store today
// (eligibility reasons, transfer status, change-after-transfer reasons, close
// state, reminder settings) is still modelled here, and the changes registry
// (changes.ts) tags it BE.

export type Role = 'admin' | 'pm';

/** The stages an amount can be entered in. `complete` has no amount. */
export type AmountStage = 'ewb' | 'pm' | 'final';
export type StageKey = AmountStage | 'complete';

export const STAGES: { key: StageKey; label: string; short: string }[] = [
  { key: 'ewb', label: 'EWB proposed', short: 'EWB' },
  { key: 'pm', label: 'PM proposed', short: 'PM' },
  { key: 'final', label: 'Final budget', short: 'Final' },
  { key: 'complete', label: 'Complete', short: 'Complete' },
];
export const stageLabel = (k: StageKey | null | undefined): string => STAGES.find((s) => s.key === k)?.label ?? 'Draft';

export type CycleStatus = 'Draft' | 'Open' | 'Closed';

export type CycleType = 'One-year' | 'Two-year';

/** Classification values from Gemini's WorkEmphasis lookup, sentence-cased. */
export const EMPHASES = [
  'Restoration/protection',
  'RM and E',
  'Supplementation',
  'Harvest augmentation',
  'Predator removal',
  'Data management',
  'Regional coordination',
  'Local coordination',
  'Law enforcement',
  'Selective harvest',
] as const;
export type Emphasis = (typeof EMPHASES)[number];

/** SOY covers non-Accord expense only; these are the fund names used in mock data. */
export const FUNDS = ['Program', 'BiOp, non-Accord', 'General program'] as const;
export type Fund = (typeof FUNDS)[number];

export interface Project {
  number: string; // 0000-000-00
  title: string;
  emphasis: Emphasis;
  pm: string;
  cycleType: CycleType;
  /** Two-year projects: is the cycle's FY the year they are NOT funded? */
  offYear?: boolean;
}

export interface StageEntry {
  amount: number;
  by: string;
  date: string; // ISO date
  /** The comment / rationale entered with the amount. */
  rationale: string;
}

export interface Transfer {
  id: string;
  decisionId: string;
  amount: number;
  date: string;
}

export interface ChangeAfterTransfer {
  from: number;
  to: number;
  reason: string;
  by: string;
  date: string;
}

export interface SoyItem {
  /** project number | fund | account type — the Gemini identity. */
  id: string;
  projectNumber: string;
  fund: Fund;
  accountType: 'Expense';
  /** Prior fiscal year (FY2027) working budget and baseline. */
  priorWorking: number | null;
  priorBaseline: number | null;
  /** This cycle's baseline, after any COLA. Null when the project has none. */
  baseline: number | null;
  /** COLA rate applied in setup, as a fraction (0.025). */
  cola?: number;
  /** Added in setup as a new project (not carried forward). */
  isNew?: boolean;
  amounts: Partial<Record<AmountStage, StageEntry>>;
  transfers: Transfer[];
  changedAfterTransfer?: ChangeAfterTransfer;
  followUp: boolean;
  notify: boolean;
}

/** A prior-year item offered for carry-forward, with its eligibility. */
export interface CarryCandidate {
  id: string;
  projectNumber: string;
  fund: Fund;
  priorBaseline: number | null;
  priorWorking: number | null;
  /** Null when eligible; otherwise why it starts unchecked. */
  excludeReason: string | null;
}

export interface BudgetDecision {
  id: string;
  name: string;
  description: string;
  rationale: string;
  bpaComments: string;
  date: string;
  round: number;
}

export type ActivityKind = 'amount' | 'comment' | 'stage' | 'reminder' | 'transfer' | 'setup' | 'close' | 'notify' | 'change-after-transfer';

export interface Activity {
  id: string;
  date: string; // ISO date
  who: string;
  kind: ActivityKind;
  stage?: StageKey;
  itemId?: string;
  amount?: number;
  text: string;
}

export interface StageDates {
  /** The date each stage opens. A stage is due the day before the next opens. */
  ewb: string;
  pm: string;
  final: string;
  complete: string;
}

export interface ReminderSettings {
  on: boolean;
  daysBefore: number;
}

export type NotifyPref = 'none' | 'immediately' | 'digest';

export interface SoyCycle {
  fy: number;
  status: CycleStatus;
  /** Null while Draft. */
  stage: StageKey | null;
  dates: StageDates;
  items: SoyItem[];
  decisions: BudgetDecision[];
  activity: Activity[];
  reminders: ReminderSettings;
  /** What setup did, for the results report and the review step. */
  setupReport?: SetupReport;
  closedOn?: string;
  reopenLog: { date: string; who: string; reason: string }[];
}

export interface SetupReport {
  carried: number;
  excluded: { id: string; reason: string }[];
  added: string[];
  colaRate: number;
  colaApplied: number;
  colaSkippedOffYear: string[];
  colaSkippedNoBaseline: string[];
  twoYearFlagged: string[];
  totalBaseline: number;
}

/** A past cycle summarised for the All cycles list. */
export interface PastCycle {
  fy: number;
  status: CycleStatus;
  stage: StageKey;
  items: number;
  baseline: number;
  final: number;
  transferred: number;
  varianceItems: number;
  /** What blocks closing it (open past years only). */
  blockers?: string[];
}

export interface SoyState {
  version: number;
  /** The demo's "today", which moves as the walkthrough moves. */
  today: string;
  cycle: SoyCycle;
  pastCycles: PastCycle[];
  /** Per-person notification preference (user settings). */
  notifyPrefs: Record<string, NotifyPref>;
  /** The PM-response simulation has run for this PM stage. */
  pmResponsesSimulated: boolean;
}
