// Single source of truth for the "Manage RM&E Priorities" prototype — a
// modernized port of the legacy CBFish ManageRme.mvc/ManageRme page: the
// RM&E Priority taxonomy itself (kept AS-IS — generic program classification,
// same bar as the RM&E Work Elements dataset's RME_TYPE_OPTIONS/RME_FOCAL_AREA
// value sets, checked directly against prod), plus which project each
// priority applies to (deterministic, fictional, domain-credible — same
// invented projects as rme-work-elements.mjs and rme-contract-reports.mjs so
// all three RM&E reports cross-reference the same fictional world).

/** @typedef {{ id: number; title: string }} RmePriority */

/** @type {RmePriority[]} */
export const RME_PRIORITIES = [
  { id: 1, title: 'Tributary' },
  { id: 2, title: 'Tributary (AEM, ISEMP, ChaMP) (Program drivers)' },
  { id: 3, title: 'Projects with Budget over $750K' },
  { id: 4, title: 'BiOp RM&E' },
  { id: 5, title: 'Accord RM&E' },
  { id: 6, title: 'General Program and Wildlife' },
];

/** id -> "N: Title" label, matching prod's combined RME Priority ID/Title List columns. */
export function priorityLabel(id) {
  const p = RME_PRIORITIES.find((x) => x.id === id);
  return p ? `${p.id}: ${p.title}` : '';
}

/**
 * @typedef {{
 *   projectId: number; projectNumber: string; projectSme: string;
 *   rmePriorityId: number; comments: string;
 * }} ProjectRmePriority
 */

/** @type {ProjectRmePriority[]} */
export const projectRmePriorities = [
  { projectId: 1401, projectNumber: 'PRJ-2021-014', projectSme: 'Priya Nair', rmePriorityId: 4, comments: '' },
  { projectId: 1402, projectNumber: 'PRJ-2019-028', projectSme: 'Jamie Ortiz', rmePriorityId: 3, comments: '' },
  { projectId: 1403, projectNumber: 'PRJ-2022-031', projectSme: 'Lee Marsh', rmePriorityId: 1, comments: '' },
  { projectId: 1404, projectNumber: 'PRJ-2007-083', projectSme: 'Todd Whitfield', rmePriorityId: 5, comments: '' },
  { projectId: 1405, projectNumber: 'PRJ-1988-053', projectSme: 'Dana Iverson', rmePriorityId: 6, comments: '' },
  { projectId: 1406, projectNumber: 'PRJ-1995-063', projectSme: 'Alan Cho', rmePriorityId: 4, comments: '' },
  { projectId: 1407, projectNumber: 'PRJ-1998-039', projectSme: 'Renee Ashford', rmePriorityId: 3, comments: '' },
  { projectId: 1408, projectNumber: 'PRJ-2015-047', projectSme: 'Marcus Feld', rmePriorityId: 2, comments: 'Program driver review pending' },
  { projectId: 1409, projectNumber: 'PRJ-2011-062', projectSme: 'Sam Okafor', rmePriorityId: 6, comments: '' },
  { projectId: 1410, projectNumber: 'PRJ-2009-018', projectSme: 'Sean Ostrander', rmePriorityId: 5, comments: '' },
  { projectId: 1411, projectNumber: 'PRJ-2017-055', projectSme: 'Dana Whitfield', rmePriorityId: 1, comments: '' },
  { projectId: 1412, projectNumber: 'PRJ-2003-071', projectSme: 'N/A', rmePriorityId: 6, comments: 'SME assignment pending' },
].map((r) => ({ ...r, rmePriorityTitle: priorityLabel(r.rmePriorityId) }));
