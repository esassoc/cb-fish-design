// Client-side render helpers shared by the capital program screens. Pills and
// dots are CLONED from real esa-pill / esa-badge markup that cbf-cap-templates
// server-renders once per variant (scope hash intact), then relabelled — the
// same "clone the lego, never hand-roll it" pattern the CRS grid uses.
import type { GateStatus, OmbStatus, RecordType, RequestStatus } from './types';
import { fmtK } from './finance';

export type Variant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type DotVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

export const esc = (s: unknown): string =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const templates = new Map<string, string>();
function template(key: string): string {
  if (!templates.size) {
    document.querySelectorAll<HTMLElement>('[data-cap-templates] [data-tpl]').forEach((el) => {
      templates.set(el.dataset.tpl!, el.innerHTML.trim());
    });
  }
  return templates.get(key) ?? '';
}

/** An esa-pill with any label. `title` adds a hover explanation. */
export function pill(label: string, variant: Variant = 'default', opts: { size?: 'xs' | 'sm'; title?: string } = {}): string {
  const html = template(`pill-${variant}-${opts.size ?? 'sm'}`);
  const host = document.createElement('div');
  host.innerHTML = html;
  const el = host.firstElementChild as HTMLElement | null;
  if (!el) return esc(label);
  const lab = el.querySelector('.esa-pill__label');
  if (lab) lab.textContent = label;
  if (opts.title) el.title = opts.title;
  return el.outerHTML;
}

/** An esa-badge dot, labelled for screen readers. */
export function dot(variant: DotVariant, label: string): string {
  const host = document.createElement('div');
  host.innerHTML = template(`dot-${variant}`);
  const el = host.firstElementChild as HTMLElement | null;
  if (!el) return '';
  const vh = el.querySelector('.visually-hidden');
  if (vh) vh.textContent = label;
  el.title = label;
  return el.outerHTML;
}

/** The small "Assumption" tag the PRD asks for on every hard-coded open-question answer. */
export const assumption = (text: string, size: 'xs' | 'sm' = 'xs'): string => pill('Assumption', 'info', { size, title: text });

export const GATE_VARIANT: Record<GateStatus, Variant> = {
  Green: 'success',
  'In progress': 'warning',
  Red: 'danger',
  'Not started': 'default',
  'Not applicable': 'default',
};
const GATE_DOT: Record<GateStatus, DotVariant> = {
  Green: 'success',
  'In progress': 'warning',
  Red: 'danger',
  'Not started': 'secondary',
  'Not applicable': 'secondary',
};
export const gateDot = (status: GateStatus, label: string) =>
  status === 'Not applicable' ? `<span class="cbf-cap-dot-na" title="${esc(label)}: not applicable"></span>` : dot(GATE_DOT[status], `${label}: ${status}`);
export const gatePill = (status: GateStatus, size: 'xs' | 'sm' = 'sm') => pill(status === 'Not applicable' ? 'N/A' : status, GATE_VARIANT[status], { size });

export const RECORD_VARIANT: Record<RecordType, Variant> = {
  Active: 'primary', Complete: 'success', Placeholder: 'default', Request: 'info', Cancelled: 'default', Deferred: 'default',
};

export const OMB_SHORT: Record<OmbStatus, string> = {
  'Appropriations language approved': 'Approved',
  Submitted: 'Submitted',
  'Not submitted': 'Not in OMB',
  Removed: 'Removed',
  'Not required (below threshold)': 'Not required',
};
export const OMB_VARIANT: Record<OmbStatus, Variant> = {
  'Appropriations language approved': 'success',
  Submitted: 'warning',
  'Not submitted': 'danger',
  Removed: 'danger',
  'Not required (below threshold)': 'default',
};
export const ombPill = (s: OmbStatus, size: 'xs' | 'sm' = 'sm') => pill(OMB_SHORT[s], OMB_VARIANT[s], { size, title: s });

export const REQUEST_VARIANT: Record<RequestStatus, Variant> = {
  New: 'info', 'Under review': 'warning', 'Added to plan': 'success', 'Deferred to next Asset Plan': 'default', Declined: 'default',
};

export const flagPill = (size: 'xs' | 'sm' = 'sm') =>
  pill('OMB not approved', 'danger', { size, title: 'Construction spend is planned in an open quarter without OMB appropriations language.' });

/** A money cell's text plus a class for negatives. */
export const moneyHtml = (v: number | null | undefined, opts: { zero?: string } = {}): string => {
  const text = fmtK(v, { zero: opts.zero ?? '–' });
  return v != null && Math.round(v) < 0 ? `<span class="cbf-cap-neg">${text}</span>` : text;
};

export function snackbar(kind: 'success' | 'info' | 'warning' | 'danger', msg: string): void {
  const el = document.querySelector<HTMLElement & Record<string, (m: string, c?: unknown) => void>>('[data-snackbar]');
  el?.[kind]?.(msg, { duration: 5000 });
}

/** Today's ISO date, pinned to the demo's "today". */
export { TODAY } from './store';

/** Fill an esa-select's options and value in one go. */
export function setSelect(el: Element | null, options: { label: string; value: string }[], value?: string): void {
  if (!el) return;
  const s = el as HTMLElement & { options: unknown; value: string };
  s.options = options;
  if (value !== undefined) s.value = value;
}
