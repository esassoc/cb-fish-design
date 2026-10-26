// Client-side wiring for the BPA COR field on the Create and Edit CRS
// Commitment dialogs (CBF-8593). The field offers only the CORs (and Backup
// CORs) on the commitment's associated projects — not everyone in CBFish — so
// its options are rebuilt every time the Associated projects field changes.
//
// A COR already on the record who isn't on any associated project (legacy
// data: prod has commitments with a COR and no project at all) stays selected
// and listed, labelled as such, rather than being silently dropped. With no
// projects and no such value there is nothing to choose, so the field is
// disabled until a project is added.
import { projectCors } from '../../data/crs-commitments.mjs';

type Option = { label: string; value: string };
type SelectEl = HTMLElement & { value: string | string[]; options: Option[]; disabled: boolean };

const asArray = (v: string | string[] | undefined): string[] =>
  Array.isArray(v) ? v : v ? [v] : [];

/** The COR options for a set of projects, plus any `keep` value not among them. */
export function corOptionsFor(projects: string[], keep: string[] = []): Option[] {
  // name → "COR, PRJ-…" roles, merged when one person is on several projects.
  const roles = new Map<string, string[]>();
  for (const project of projects) {
    for (const { name, role } of projectCors[project as keyof typeof projectCors] ?? []) {
      roles.set(name, [...(roles.get(name) ?? []), `${role}, ${project}`]);
    }
  }
  const options = [...roles.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, r]) => ({ label: `${name} (${r.join('; ')})`, value: name }));
  for (const name of keep) {
    if (!roles.has(name)) options.push({ label: `${name} (not on these projects)`, value: name });
  }
  return options;
}

/**
 * Wire one form's COR field to its Associated projects field. Call the
 * returned `refresh()` after setting both fields' values programmatically
 * (opening the Edit dialog, resetting the Create form) — esa-select only
 * fires `change` on user input.
 */
export function wireCorPicker(form: HTMLElement): { refresh: () => void } {
  const projectsEl = form.querySelector<SelectEl>('[data-field="associatedProjects"]');
  const corEl = form.querySelector<SelectEl>('[data-field="cor"]');

  function refresh(): void {
    if (!projectsEl || !corEl) return;
    const selected = asArray(corEl.value);
    corEl.options = corOptionsFor(asArray(projectsEl.value), selected);
    corEl.value = selected;
    corEl.disabled = corEl.options.length === 0;
  }

  projectsEl?.addEventListener('change', refresh);
  refresh();
  return { refresh };
}
