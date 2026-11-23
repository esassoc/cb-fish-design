// Client-side render helpers shared by the SOY screens. Pills, dots and row
// buttons are CLONED from real esa-pill / esa-badge / esa-button markup that
// cbf-soy-templates server-renders once per variant, then relabelled — the same
// "clone the lego, never hand-roll it" pattern as src/lib/capital/ui.ts.
import type { StageKey } from './types';
import type { TransferStatus } from './model';
import { fmtMoney } from './model';

export type Variant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type DotVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';

export const esc = (s: unknown): string =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const templates = new Map<string, string>();
function template(key: string): string {
  if (!templates.size) {
    document.querySelectorAll<HTMLElement>('[data-soy-templates] [data-tpl]').forEach((el) => {
      templates.set(el.dataset.tpl!, el.innerHTML.trim());
    });
  }
  return templates.get(key) ?? '';
}

/** An esa-pill with any label. */
export function pill(label: string, variant: Variant = 'default', opts: { size?: 'xs' | 'sm'; title?: string } = {}): string {
  const host = document.createElement('div');
  host.innerHTML = template(`pill-${variant}-${opts.size ?? 'sm'}`);
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

/**
 * An esa-button cloned from the templates, relabelled, with data attributes.
 * kinds: 'primary' | 'secondary' | 'ghost' | 'soft' (all xs).
 */
export function button(kind: 'primary' | 'secondary' | 'ghost' | 'soft', label: string, data: Record<string, string>): string {
  const host = document.createElement('div');
  host.innerHTML = template(`btn-${kind}`);
  const el = host.firstElementChild as HTMLElement | null;
  if (!el) return '';
  const lab = el.querySelector('.esa-button__label');
  if (lab) lab.textContent = label;
  const native = el.querySelector('.esa-button__native') ?? el;
  for (const [k, v] of Object.entries(data)) native.setAttribute(`data-${k}`, v);
  return el.outerHTML;
}

export const STATUS_VARIANT: Record<TransferStatus, Variant> = {
  'No final amount': 'default',
  'Not transferred': 'warning',
  Transferred: 'success',
  'Changed after transfer': 'danger',
  'Partially transferred': 'warning',
};
export const statusPill = (s: TransferStatus, size: 'xs' | 'sm' = 'xs') => pill(s, STATUS_VARIANT[s], { size });

export const STAGE_VARIANT: Record<StageKey, Variant> = { ewb: 'info', pm: 'primary', final: 'warning', complete: 'success' };

/** A money cell; negatives in the danger colour. */
export const moneyHtml = (v: number | null | undefined, empty = '<span class="cbf-soy-muted">—</span>'): string => {
  if (v == null) return empty;
  const text = fmtMoney(v);
  return Math.round(v) < 0 ? `<span class="cbf-soy-neg">${text}</span>` : text;
};
/** A signed difference: "+$85,000" / "−$12,000" / "—". */
export const deltaHtml = (v: number | null | undefined): string => {
  if (v == null || Math.round(v) === 0) return '<span class="cbf-soy-muted">—</span>';
  return v > 0 ? `+${fmtMoney(v)}` : `<span class="cbf-soy-neg">${fmtMoney(v)}</span>`;
};

export function snackbar(kind: 'success' | 'info' | 'warning' | 'danger', msg: string): void {
  const el = document.querySelector<HTMLElement & Record<string, (m: string, c?: unknown) => void>>('[data-snackbar]');
  el?.[kind]?.(msg, { duration: 5000 });
}

/** Fill an esa-select / esa-chip-group / esa-radio-group's options and value in one go. */
export function setOptions(el: Element | null, options: { label: string; value: string }[], value?: string): void {
  if (!el) return;
  const s = el as HTMLElement & { options: unknown; value: string };
  s.options = options;
  if (value !== undefined) s.value = value;
}

export type Dialog = HTMLElement & { show: () => void; close: () => void; heading: string; open: boolean };
export type Field = HTMLElement & { value: string; disabled: boolean; checked?: boolean; errorText?: string; helpText?: string; label?: string };

/** Parse a money field ("1,250,000" / "$1.2m" not supported — digits and commas only). */
export const parseMoney = (s: string): number | null => {
  const t = String(s ?? '').replace(/[$,\s]/g, '');
  if (!t) return null;
  const n = Number(t);
  return Number.isFinite(n) ? Math.round(n) : null;
};
