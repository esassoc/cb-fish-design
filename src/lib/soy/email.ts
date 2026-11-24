// The emails the future-state SOY sends (BE: today stage changes send nothing
// and reminders are written by hand). One source for the previews on the
// overview (stage-open, reminder), activity (automatic reminder) and final
// decisions (notify PMs). Returns HTML for the shared .cbf-soy-email preview.
import { DEMO_PM } from '../../data/soy/seed';
import { addDays, fmtDate, fmtMoney, outstandingByPm, project, stageDue } from './model';
import type { SoyState, StageKey } from './types';
import { stageLabel } from './types';
import { esc } from './ui';

export interface Email { to: string; subject: string; paragraphs: string[]; cta?: string }

export function stageOpenEmail(s: SoyState, to: StageKey): Email {
  const c = s.cycle;
  const pms = new Set(c.items.map((i) => project(i).pm));
  const due = fmtDate(stageDue(c.dates, to));
  if (to === 'pm') {
    return {
      to: `${pms.size} project managers with projects in the FY${c.fy} SOY`,
      subject: `FY${c.fy} SOY: PM proposed is open — respond by ${due}`,
      paragraphs: [
        `Hi ${DEMO_PM.split(' ')[0]},`,
        `EWB has proposed FY${c.fy} budgets for your projects. Please review each one and either agree or propose a different amount with a rationale by ${due}.`,
        `You have 5 projects to review. Each shows EWB’s proposed amount and rationale.`,
        `Reminders go out ${c.reminders.daysBefore} days before the due date to anyone with missing input.`,
      ],
      cta: 'Review my projects',
    };
  }
  if (to === 'final') {
    return {
      to: `${pms.size} project managers with projects in the FY${c.fy} SOY`,
      subject: `FY${c.fy} SOY: PM proposed has closed`,
      paragraphs: [
        'Hi,',
        `Thank you for your input. PM proposed closed on ${fmtDate(addDays(c.dates.final, -1))}. Decision makers will set final budgets by ${due}, and you’ll get a summary of your final amounts and rationale.`,
      ],
    };
  }
  return {
    to: `${pms.size} project managers`,
    subject: `FY${c.fy} SOY: ${stageLabel(to)} is open`,
    paragraphs: ['Hi,', `${stageLabel(to)} is now open for the FY${c.fy} SOY.`],
  };
}

export function reminderEmail(s: SoyState, pms?: string[]): Email {
  const c = s.cycle;
  const out = outstandingByPm(c).filter((o) => !pms || pms.includes(o.pm));
  const first = out[0];
  const due = c.stage ? fmtDate(stageDue(c.dates, c.stage)) : '';
  return {
    to: out.length ? out.map((o) => `${o.pm} (${o.items.length})`).join(', ') : 'No one — every PM has responded',
    subject: `Reminder: FY${c.fy} SOY input due ${due}`,
    paragraphs: [
      `Hi ${first ? first.pm.split(' ')[0] : ''},`,
      `${first ? first.items.length : 0} of your projects still need your input in ${stageLabel(c.stage)}: ${first ? first.items.map((i) => i.projectNumber).join(', ') : ''}.`,
      `Please agree with EWB’s proposed amount or propose a different one with a rationale by ${due}.`,
    ],
    cta: 'Review my projects',
  };
}

export function finalsEmail(s: SoyState, ids: string[]): Email {
  const c = s.cycle;
  const items = c.items.filter((i) => ids.includes(i.id) && project(i).pm === DEMO_PM);
  const pms = new Set(c.items.filter((i) => ids.includes(i.id)).map((i) => project(i).pm));
  return {
    to: `${pms.size} project managers (each gets only their own projects)`,
    subject: `FY${c.fy} SOY: final budgets for your projects`,
    paragraphs: [
      `Hi ${DEMO_PM.split(' ')[0]},`,
      `Final FY${c.fy} budgets are set for your projects:`,
      ...items.map((i) => `${i.projectNumber} — ${fmtMoney(i.amounts.final?.amount)}. ${i.amounts.final?.rationale ?? ''}`),
      'These amounts will be transferred to working budgets in June.',
    ],
  };
}

export function emailHtml(e: Email): string {
  return `<div class="cbf-soy-email">
    <dl class="cbf-soy-email__head">
      <dt>From</dt><dd>CBFish &lt;no-reply@cbfish.org&gt;</dd>
      <dt>To</dt><dd>${esc(e.to)}</dd>
      <dt>Subject</dt><dd><strong>${esc(e.subject)}</strong></dd>
    </dl>
    <div class="cbf-soy-email__body">${e.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}${e.cta ? `<p class="cbf-soy-email__cta">${esc(e.cta)} →</p>` : ''}</div>
  </div>`;
}
