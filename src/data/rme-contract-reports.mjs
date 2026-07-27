// Single source of truth for the "RM&E Contract Reports" prototype — a
// modernized port of the legacy CBFish RM&E Contract Reports pages
// (Contract.mvc/RmeContractReports and Contract.mvc/UnfilteredRmeContractReports,
// checked directly against prod). Prod ships these as two near-identical
// pages differing only by a default Calendar Year filter; this spoke merges
// them into one grid with a clearable year filter instead (the "Unfiltered"
// page becomes clearing the filter) — see the grid component's header note.
//
// Deterministic, fictional, domain-credible mock data, same bar as the RM&E
// Work Elements dataset: no real project/contract numbers, no real tribal/
// agency contractor names, no real people. Reuses the SAME 7 fictional
// projects/contracts as rme-work-elements.mjs (same project numbers,
// titles, contractors, contract numbers, SMEs, and RM&E Priority) so the two
// reports plausibly cross-reference the same underlying program data, the
// way the real reports would. RM&E Priority labels come from rme-priorities.mjs,
// the one shared taxonomy source.
//
// Kept AS-IS (generic program taxonomy, not sensitive): Work Element IDs
// (157/162, BPA's own public process-category catalog) and the RM&E
// Priority category labels.
import { priorityLabel } from './rme-priorities.mjs';

/**
 * @typedef {{
 *   hasReport: boolean; projectNumber: string; projectTitle: string;
 *   contractNumber: string; contractContractor: string; workElements: string;
 *   we132Id: number; calendarYear: number;
 *   plannedMetricStart: string; plannedMetricEnd: string;
 *   wseStart: string; wseEnd: string;
 *   weOriginalDueDate?: string; weCompletionDate?: string;
 *   reportUploadDate?: string; reportPeriodStart?: string; reportPeriodEnd?: string;
 *   coveredContracts?: string; reportType?: string; documentFileName?: string;
 *   projectSme: string; rmePriorityId: number;
 * }} RmeContractReport
 */

/** @type {RmeContractReport[]} */
export const rmeContractReports = [
  {
    hasReport: true,
    projectNumber: 'PRJ-2021-014', projectTitle: 'Wenaha Basin Steelhead Monitoring Program',
    contractNumber: '83210 REL 12', contractContractor: 'Wenaha River Tribes',
    workElements: '157, 162', we132Id: 190412, calendarYear: 2025,
    plannedMetricStart: '1/1/2025', plannedMetricEnd: '12/31/2025',
    wseStart: '10/1/2025', wseEnd: '9/30/2026',
    reportUploadDate: '2/12/2026', reportPeriodStart: '1/1/2025', reportPeriodEnd: '12/31/2025',
    coveredContracts: '83210 REL 9, 83210 REL 10', reportType: 'Contractor Technical, Final',
    documentFileName: 'Wenaha-Basin-Steelhead-Monitoring-2025-Final.pdf',
    projectSme: 'Priya Nair', rmePriorityId: 4,
  },
  {
    hasReport: false,
    projectNumber: 'PRJ-2021-014', projectTitle: 'Wenaha Basin Steelhead Monitoring Program',
    contractNumber: '83210 REL 12', contractContractor: 'Wenaha River Tribes',
    workElements: '157, 162', we132Id: 195118, calendarYear: 2026,
    plannedMetricStart: '1/1/2026', plannedMetricEnd: '12/31/2026',
    wseStart: '10/1/2025', wseEnd: '9/30/2026',
    projectSme: 'Priya Nair', rmePriorityId: 4,
  },
  {
    hasReport: true,
    projectNumber: 'PRJ-2019-028', projectTitle: 'Fernbridge Dam PIT Detection Array Program',
    contractNumber: '97456 REL 4', contractContractor: 'Basin Fisheries Research Partnership',
    workElements: '157, 162', we132Id: 189760, calendarYear: 2025,
    plannedMetricStart: '1/1/2025', plannedMetricEnd: '12/31/2025',
    wseStart: '4/1/2026', wseEnd: '3/31/2027',
    reportUploadDate: '3/4/2026', reportPeriodStart: '1/1/2025', reportPeriodEnd: '12/31/2025',
    coveredContracts: '97456 REL 3', reportType: 'Published Technical, Final',
    documentFileName: 'Fernbridge-Dam-PIT-Detection-2025-Final.pdf',
    projectSme: 'Jamie Ortiz', rmePriorityId: 3,
  },
  {
    hasReport: false,
    projectNumber: 'PRJ-2019-028', projectTitle: 'Fernbridge Dam PIT Detection Array Program',
    contractNumber: '97456 REL 4', contractContractor: 'Basin Fisheries Research Partnership',
    workElements: '157, 162', we132Id: 196203, calendarYear: 2026,
    plannedMetricStart: '1/1/2026', plannedMetricEnd: '12/31/2026',
    wseStart: '4/1/2026', wseEnd: '3/31/2027',
    weOriginalDueDate: '3/31/2027',
    projectSme: 'Jamie Ortiz', rmePriorityId: 3,
  },
  {
    hasReport: false,
    projectNumber: 'PRJ-2022-031', projectTitle: 'Alder Creek Juvenile Trap Program',
    contractNumber: '84620', contractContractor: 'Alder Creek Tribes',
    workElements: '157, 162', we132Id: 191887, calendarYear: 2026,
    plannedMetricStart: '1/1/2026', plannedMetricEnd: '12/31/2026',
    wseStart: '2/1/2026', wseEnd: '1/31/2027',
    projectSme: 'Lee Marsh', rmePriorityId: 1,
  },
  {
    hasReport: false,
    projectNumber: 'PRJ-2022-031', projectTitle: 'Alder Creek Juvenile Trap Program',
    contractNumber: '84620', contractContractor: 'Alder Creek Tribes',
    workElements: '157, 162', we132Id: 194629, calendarYear: 2026,
    plannedMetricStart: '1/1/2026', plannedMetricEnd: '12/31/2026',
    wseStart: '2/1/2026', wseEnd: '1/31/2027',
    weOriginalDueDate: '1/31/2027',
    projectSme: 'Lee Marsh', rmePriorityId: 1,
  },
  {
    hasReport: true,
    projectNumber: 'PRJ-2007-083', projectTitle: 'Cedar Fork Adult Trap and Broodstock Program',
    contractNumber: '96310 REL 2', contractContractor: 'Cedar Fork Confederated Tribes',
    workElements: '157, 162', we132Id: 192541, calendarYear: 2026,
    plannedMetricStart: '1/1/2026', plannedMetricEnd: '12/31/2026',
    wseStart: '1/1/2026', wseEnd: '12/31/2026',
    reportUploadDate: '6/18/2026', reportPeriodStart: '1/1/2026', reportPeriodEnd: '6/30/2026',
    coveredContracts: '96310 REL 1', reportType: 'Contractor Technical, Draft',
    documentFileName: 'Cedar-Fork-Adult-Trap-2026-Draft.pdf',
    projectSme: 'Todd Whitfield', rmePriorityId: 5,
  },
  {
    hasReport: false,
    projectNumber: 'PRJ-2007-083', projectTitle: 'Cedar Fork Adult Trap and Broodstock Program',
    contractNumber: '96310 REL 2', contractContractor: 'Cedar Fork Confederated Tribes',
    workElements: '157, 162', we132Id: 193308, calendarYear: 2026,
    plannedMetricStart: '1/1/2026', plannedMetricEnd: '12/31/2026',
    wseStart: '1/1/2026', wseEnd: '12/31/2026',
    projectSme: 'Todd Whitfield', rmePriorityId: 5,
  },
  {
    hasReport: true,
    projectNumber: 'PRJ-1988-053', projectTitle: 'Marrow Basin Redd and Harvest Monitoring',
    contractNumber: '91004 REL 1', contractContractor: 'Confederated Tribes of Marrow Basin',
    workElements: '157, 162', we132Id: 188907, calendarYear: 2025,
    plannedMetricStart: '1/1/2025', plannedMetricEnd: '12/31/2025',
    wseStart: '10/1/2025', wseEnd: '9/30/2026',
    reportUploadDate: '1/22/2026', reportPeriodStart: '1/1/2025', reportPeriodEnd: '12/31/2025',
    coveredContracts: '91004 REL 1', reportType: 'Contractor Technical, Final',
    documentFileName: 'Marrow-Basin-Redd-Harvest-2025-Final.pdf',
    projectSme: 'Dana Iverson', rmePriorityId: 6,
  },
  {
    hasReport: false,
    projectNumber: 'PRJ-1988-053', projectTitle: 'Marrow Basin Redd and Harvest Monitoring',
    contractNumber: '91004 REL 1', contractContractor: 'Confederated Tribes of Marrow Basin',
    workElements: '157, 162', we132Id: 194771, calendarYear: 2025,
    plannedMetricStart: '1/1/2025', plannedMetricEnd: '12/31/2025',
    wseStart: '10/1/2025', wseEnd: '9/30/2026',
    weCompletionDate: '4/15/2026',
    projectSme: 'Dana Iverson', rmePriorityId: 6,
  },
  {
    hasReport: false,
    projectNumber: 'PRJ-1995-063', projectTitle: 'Wolverine Basin PIT Tag Interrogation Program',
    contractNumber: '88765 REL 3', contractContractor: 'Cascade Basin Department of Fish and Wildlife',
    workElements: '157, 162', we132Id: 195542, calendarYear: 2026,
    plannedMetricStart: '1/1/2026', plannedMetricEnd: '12/31/2026',
    wseStart: '5/1/2026', wseEnd: '4/30/2027',
    projectSme: 'Alan Cho', rmePriorityId: 4,
  },
  {
    hasReport: true,
    projectNumber: 'PRJ-1995-063', projectTitle: 'Wolverine Basin PIT Tag Interrogation Program',
    contractNumber: '88765 REL 3', contractContractor: 'Cascade Basin Department of Fish and Wildlife',
    workElements: '157, 162', we132Id: 189234, calendarYear: 2026,
    plannedMetricStart: '1/1/2026', plannedMetricEnd: '12/31/2026',
    wseStart: '5/1/2026', wseEnd: '4/30/2027',
    reportUploadDate: '5/29/2026', reportPeriodStart: '1/1/2026', reportPeriodEnd: '4/30/2026',
    coveredContracts: '88765 REL 2', reportType: 'Published Technical, Final',
    documentFileName: 'Wolverine-Basin-PIT-Interrogation-2026-Final.pdf',
    projectSme: 'Alan Cho', rmePriorityId: 4,
  },
  {
    hasReport: true,
    projectNumber: 'PRJ-1998-039', projectTitle: 'Marrow Creek Watershed Habitat Monitoring',
    contractNumber: '95421', contractContractor: 'U.S. Geological Survey',
    workElements: '157, 162', we132Id: 188115, calendarYear: 2025,
    plannedMetricStart: '1/1/2025', plannedMetricEnd: '12/31/2025',
    wseStart: '11/1/2025', wseEnd: '10/31/2026',
    reportUploadDate: '2/2/2026', reportPeriodStart: '1/1/2025', reportPeriodEnd: '12/31/2025',
    coveredContracts: '95421', reportType: 'Contractor Technical, Final',
    documentFileName: 'Marrow-Creek-Watershed-Habitat-2025-Final.pdf',
    projectSme: 'Renee Ashford', rmePriorityId: 3,
  },
  {
    hasReport: false,
    projectNumber: 'PRJ-1998-039', projectTitle: 'Marrow Creek Watershed Habitat Monitoring',
    contractNumber: '95421', contractContractor: 'U.S. Geological Survey',
    workElements: '157, 162', we132Id: 196017, calendarYear: 2026,
    plannedMetricStart: '1/1/2026', plannedMetricEnd: '12/31/2026',
    wseStart: '11/1/2025', wseEnd: '10/31/2026',
    weOriginalDueDate: '10/31/2026',
    projectSme: 'Renee Ashford', rmePriorityId: 3,
  },
].map((r) => ({ ...r, rmePriorityTitle: priorityLabel(r.rmePriorityId) }));

/** Distinct calendar years present in the data, newest first — drives the filter's option list. */
export const CALENDAR_YEARS = Array.from(new Set(rmeContractReports.map((r) => r.calendarYear))).sort((a, b) => b - a);
