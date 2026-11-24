// SOY prototype client store — the one place every SOY screen reads from and
// writes to. Seeded from src/data/soy/seed.ts; every edit persists to
// localStorage so a demo survives a reload, "Reset demo data" puts the seed
// back, and "Jump to step" loads a walkthrough preset (actions.buildPreset).
//
// Screens never mutate state directly: they call update(fn) with an action from
// actions.ts and re-render on the `cbf-soy:change` document event. Same shape
// as the capital program store (src/lib/capital/store.ts).
import { SEED_VERSION, ADMIN, DEMO_LEADER, DEMO_PM } from '../../data/soy/seed';
import { generatedCycle, summarize } from '../../data/soy/history';
import { buildPreset } from './actions';
import { project } from './model';
import type { Role, SoyCycle, SoyItem, SoyState } from './types';

const STATE_KEY = 'cbf-soy:state';
const UI_KEY = 'cbf-soy:ui';
export const CHANGE_EVENT = 'cbf-soy:change';
export const OPEN_ITEM_EVENT = 'cbf-soy:open-item';

export interface UiState {
  role: Role;
  /** "Show what's changing" — highlights every changed element with its note. */
  changes: boolean;
  /** The walkthrough step last jumped to (for the strip's label). */
  step: number | null;
  /** The fiscal year being viewed. Null = the current cycle. */
  fy: number | null;
}

export const ROLES: { key: Role; label: string; who: string; can: string }[] = [
  { key: 'admin', label: 'Budget administrator', who: ADMIN, can: 'EWB budget team' },
  { key: 'pm', label: 'Project manager', who: DEMO_PM, can: 'BPA project manager, 5 projects' },
  { key: 'leader', label: 'Decision maker', who: DEMO_LEADER, can: 'BPA F&W leadership' },
];

let state: SoyState;
let ui: UiState;

const defaultUi = (): UiState => ({ role: 'admin', changes: false, step: null, fy: null });

function load(): void {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    const parsed = raw ? (JSON.parse(raw) as SoyState) : null;
    state = parsed && parsed.version === SEED_VERSION ? parsed : buildPreset(1);
  } catch {
    state = buildPreset(1);
  }
  try {
    const raw = localStorage.getItem(UI_KEY);
    ui = { ...defaultUi(), ...(raw ? JSON.parse(raw) : {}) };
  } catch {
    ui = defaultUi();
  }
  // ?role=pm, ?changes=1 and ?step=N let a demo link open straight into a lens or a point in the story.
  try {
    const q = new URL(location.href).searchParams;
    const r = q.get('role');
    if (r === 'admin' || r === 'pm' || r === 'leader') ui.role = r;
    if (q.get('changes') === '1') ui.changes = true;
    // ?fy=2026 opens a past year; it sticks (like the picker) until changed.
    if (q.has('fy')) ui.fy = Number(q.get('fy')) || null;
    const step = Number(q.get('step'));
    if (step >= 1 && step <= 7 && (Number.isInteger(step) || step === 4.5)) {
      state = buildPreset(step);
      ui.step = step;
      if (!q.has('fy')) ui.fy = null;
      // Drop the param so a reload doesn't throw away the presenter's clicks.
      q.delete('step');
      const url = new URL(location.href);
      url.search = q.toString();
      history.replaceState(null, '', url);
      persist();
    }
  } catch { /* ignore */ }
}

function persist(): void {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    localStorage.setItem(UI_KEY, JSON.stringify(ui));
  } catch { /* private mode — the demo still runs, it just won't survive a reload */ }
}

function notify(): void {
  document.documentElement.dataset.cbfSoyRole = ui.role;
  document.documentElement.toggleAttribute('data-cbf-soy-changes', ui.changes);
  document.documentElement.toggleAttribute('data-cbf-soy-locked', isLocked());
  document.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

load();

window.addEventListener('storage', (e) => {
  if (e.key !== STATE_KEY && e.key !== UI_KEY && e.key !== null) return;
  load();
  notify();
});

// ---------------------------------------------------------------------------
// Reads
// ---------------------------------------------------------------------------

/** The current cycle's fiscal year (FY2028). */
export const currentFy = (): number => state.cycle.fy;
/** The fiscal year on screen. */
export const viewFy = (): number => (ui.fy && ui.fy !== state.cycle.fy && pastCycleOf(ui.fy) ? ui.fy : state.cycle.fy);
export const isPastYear = (): boolean => viewFy() !== state.cycle.fy;

/** A past year: the edited copy if someone changed it, otherwise the seed's. */
function pastCycleOf(fy: number): SoyCycle | null {
  return state.history?.[fy] ?? generatedCycle(fy);
}

let viewMemo: { base: SoyState; fy: number; cycle: SoyCycle; view: SoyState } | null = null;
/**
 * The state every screen renders: the current state, with `cycle` swapped for
 * the past year being viewed (the fiscal-year picker). Screens never need to
 * know which year they're on — they read getState().cycle.
 */
export const getState = (): SoyState => {
  const fy = viewFy();
  if (fy === state.cycle.fy) return state;
  const cycle = pastCycleOf(fy)!;
  if (viewMemo && viewMemo.base === state && viewMemo.fy === fy && viewMemo.cycle === cycle) return viewMemo.view;
  const view = { ...state, cycle };
  viewMemo = { base: state, fy, cycle, view };
  return view;
};
/** The real current state, whatever year is on screen (All cycles needs both). */
export const getCurrentState = (): SoyState => state;
export const getUi = (): UiState => ui;
export const currentRole = () => ROLES.find((r) => r.key === ui.role)!;
export const userName = (): string => currentRole().who;
export const isAdmin = (): boolean => ui.role === 'admin';
export const isLeader = (): boolean => ui.role === 'leader';
export const isLocked = (): boolean => getState().cycle.status === 'Closed';
export const isDraft = (): boolean => getState().cycle.status === 'Draft';

/** Can the signed-in role enter a PM proposal / amount on this item right now? */
export function canPropose(item: SoyItem): boolean {
  if (isLocked() || isDraft()) return false;
  if (isAdmin()) return true;
  return getState().cycle.stage === 'pm' && project(item).pm === DEMO_PM && item.transfers.length === 0;
}

/** Can the signed-in role comment on this item? */
export function canComment(item: SoyItem): boolean {
  if (isLocked() || isDraft()) return false;
  return isAdmin() || isLeader() || project(item).pm === DEMO_PM;
}

// ---------------------------------------------------------------------------
// Writes
// ---------------------------------------------------------------------------

export function update<T>(fn: (s: SoyState) => T): T {
  if (!isPastYear()) {
    const out = fn(state);
    persist();
    notify();
    return out;
  }
  // A past year: run the action on a copy of that year, then keep it in history
  // and refresh its All cycles row. The current cycle is untouched.
  const fy = viewFy();
  const current = state.cycle;
  const view: SoyState = { ...state, cycle: structuredClone(pastCycleOf(fy)!) };
  const out = fn(view);
  const edited = view.cycle;
  state = {
    ...view,
    cycle: current,
    history: { ...(view.history ?? {}), [fy]: edited },
    pastCycles: view.pastCycles.map((p) => (p.fy === fy ? summarize(edited) : p)),
  };
  persist();
  notify();
  return out;
}

/** Switch the fiscal year on screen (null = the current cycle). */
export function setFy(fy: number | null): void {
  setUi({ fy: fy === state.cycle.fy ? null : fy });
}

export function setUi(patch: Partial<UiState>): void {
  ui = { ...ui, ...patch };
  persist();
  notify();
}

export function resetDemo(): void {
  state = buildPreset(1);
  ui = { ...defaultUi(), role: ui.role, changes: ui.changes, fy: null };
  persist();
  notify();
}

export function loadStep(step: number): void {
  state = buildPreset(step);
  ui = { ...ui, step, fy: null };
  persist();
  notify();
}

/** Open the shared item side panel (mounted by the frame on every screen). */
export function openItem(id: string): void {
  document.dispatchEvent(new CustomEvent(OPEN_ITEM_EVENT, { detail: { id } }));
}

let announced = false;
/** Re-render on every change; a late subscriber renders straight away. */
export function subscribe(fn: () => void): void {
  document.addEventListener(CHANGE_EVENT, fn);
  if (announced) fn();
}
queueMicrotask(() => setTimeout(() => { announced = true; notify(); }, 0));
