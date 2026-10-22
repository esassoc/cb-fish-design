// Capital program client store — the single place the six screens read from and
// write to. Seeded from src/data/capital-program/seed.ts; every edit persists to
// localStorage so a demo survives a reload, and "Reset demo data" puts the seed
// back. The header controls (current FY, envelope source, snapshot, role, "what
// if" picks) live here too, so every screen agrees on what it is looking at.
//
// Screens never mutate state directly: they call update(fn) with a pure action
// from actions.ts, and re-render on the `cbf-cap:change` document event.
import { seedState, SEED_VERSION } from '../../data/capital-program/seed';
import { fyOfDate } from './finance';
import type { CapitalState, EnvelopeSource, FrozenData, Project, Role, Snapshot } from './types';

const STATE_KEY = 'cbf-capital:state';
const UI_KEY = 'cbf-capital:ui';
export const CHANGE_EVENT = 'cbf-cap:change';

export interface UiState {
  fy: number;
  envelopeSource: EnvelopeSource;
  /** Null = Current. */
  snapshotId: string | null;
  role: Role;
  /** Which PM the "Project PM / COR" role signs in as. */
  pmName: string;
  /** Request ids switched on in the headroom "what if". */
  whatIf: string[];
}

export const ROLES: { key: Role; label: string; who: string; can: string }[] = [
  { key: 'cpm', label: 'Program manager', who: 'Ben Dick', can: 'Capital program manager — edits everything' },
  { key: 'apl', label: 'Asset Plan lead', who: 'Victoria DuVal', can: 'Asset Plan lead — baseline, envelopes, requests, Asset Plan and OMB lights' },
  { key: 'pm', label: 'Project PM', who: 'Mary Todd Haight', can: 'Project PM / COR — own projects only' },
  { key: 'analyst', label: 'Analyst', who: 'Gloria Scott', can: 'Execution report analyst — snapshots, notes, exports' },
];

/** Today, for the demo: the PRD is dated Oct 22, 2026. */
export const TODAY = '2026-10-22';

let state: CapitalState;
let ui: UiState;

function defaultUi(): UiState {
  return { fy: fyOfDate(TODAY), envelopeSource: 'apExpected', snapshotId: null, role: 'cpm', pmName: 'Mary Todd Haight', whatIf: [] };
}

function load(): void {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CapitalState) : null;
    state = parsed && parsed.version === SEED_VERSION ? parsed : seedState();
  } catch {
    state = seedState();
  }
  try {
    const raw = localStorage.getItem(UI_KEY);
    ui = { ...defaultUi(), ...(raw ? JSON.parse(raw) : {}) };
  } catch {
    ui = defaultUi();
  }
  if (ui.snapshotId && !state.snapshots.some((s) => s.id === ui.snapshotId)) ui.snapshotId = null;
  // ?role= and ?snapshot= let a demo link open straight into a lens.
  try {
    const q = new URL(location.href).searchParams;
    const r = q.get('role');
    if (r && ROLES.some((x) => x.key === r)) ui.role = r as Role;
  } catch { /* ignore */ }
}

function persist(): void {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    localStorage.setItem(UI_KEY, JSON.stringify(ui));
  } catch { /* private mode — the demo still runs, it just won't survive a reload */ }
}

function notify(): void {
  document.documentElement.dataset.cbfCapRole = ui.role;
  document.documentElement.toggleAttribute('data-cbf-cap-readonly', isReadOnly());
  document.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

load();

// Another tab saved: take its state, so two open tabs don't overwrite each
// other with stale copies on their next edit.
window.addEventListener('storage', (e) => {
  if (e.key !== STATE_KEY && e.key !== UI_KEY && e.key !== null) return;
  load();
  notify();
});

// ---------------------------------------------------------------------------
// Reads
// ---------------------------------------------------------------------------

export const getState = (): CapitalState => state;
export const getUi = (): UiState => ui;

export function selectedSnapshot(): Snapshot | null {
  return ui.snapshotId ? state.snapshots.find((s) => s.id === ui.snapshotId) ?? null : null;
}

/** What the screens show: Current, or a past snapshot's frozen plans, budgets and gates. */
export function view(): FrozenData & { asOf: string } {
  const snap = selectedSnapshot();
  if (snap) return { ...snap.data, asOf: snap.asOf };
  return { projects: state.projects, plans: state.plans, actuals: state.actuals, asOf: state.settings.dataAsOf };
}

export const isReadOnly = (): boolean => ui.snapshotId != null;

export const currentRole = () => ROLES.find((r) => r.key === ui.role)!;

/** Who is "signed in", for author fields on notes and adjustments. */
export function userName(): string {
  return ui.role === 'pm' ? ui.pmName : currentRole().who;
}

export type Permission =
  | 'editPlan'
  | 'editProject'
  | 'editBudget'
  | 'addNote'
  | 'editRequests'
  | 'addToPlan'
  | 'saveSnapshot'
  | 'setBaseline'
  | 'editEnvelopes'
  | 'closeFy'
  | 'importActuals'
  | 'editSettings';

const MATRIX: Record<Role, Permission[]> = {
  cpm: ['editPlan', 'editProject', 'editBudget', 'addNote', 'editRequests', 'addToPlan', 'saveSnapshot', 'setBaseline', 'editEnvelopes', 'closeFy', 'importActuals', 'editSettings'],
  apl: ['editRequests', 'saveSnapshot', 'setBaseline', 'editEnvelopes', 'addNote'],
  pm: ['editPlan', 'editProject', 'addNote', 'editRequests'],
  analyst: ['saveSnapshot', 'addNote', 'importActuals'],
};

/** Role check, plus "own projects only" for PMs. Nothing is editable in a snapshot. */
export function can(perm: Permission, project?: Project): boolean {
  if (isReadOnly()) return false;
  if (!MATRIX[ui.role].includes(perm)) return false;
  if (ui.role === 'pm' && project && (perm === 'editPlan' || perm === 'editProject')) {
    return project.pm === ui.pmName || project.constructionCor === ui.pmName;
  }
  return true;
}

/** Gate lights are editable by the role that owns them (settings table). */
export function canEditGate(roles: Role[]): boolean {
  return !isReadOnly() && roles.includes(ui.role);
}

// ---------------------------------------------------------------------------
// Writes
// ---------------------------------------------------------------------------

/** Apply a change to the live state, persist, and tell every screen. */
export function update<T>(fn: (s: CapitalState) => T): T {
  const out = fn(state);
  persist();
  notify();
  return out;
}

export function setUi(patch: Partial<UiState>): void {
  ui = { ...ui, ...patch };
  persist();
  notify();
}

export function toggleWhatIf(id: string, on: boolean): void {
  const set = new Set(ui.whatIf);
  if (on) set.add(id);
  else set.delete(id);
  setUi({ whatIf: [...set] });
}

export function resetDemo(): void {
  state = seedState();
  ui = { ...defaultUi(), role: ui.role };
  persist();
  notify();
}

let announced = false;

/**
 * Re-render on every change. Component scripts can load in separate chunks, so
 * one that subscribes after the first announcement renders straight away.
 */
export function subscribe(fn: () => void): void {
  document.addEventListener(CHANGE_EVENT, fn);
  if (announced) fn();
}

// Announce the initial state once the scripts already loaded have subscribed.
queueMicrotask(() => setTimeout(() => { announced = true; notify(); }, 0));
