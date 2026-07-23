// Single source of truth for the RM&E Work Elements Report prototype — a
// modernized port of the legacy CBFish RM&E Work Elements Reports page
// (Contract.mvc/RmeWseSowReports), one row per Work Statement Element (WSE)
// carrying an RM&E work element.
//
// Deterministic, fictional, domain-credible mock data. Deliberately
// anonymized past the usual bar, matching the CRS Commitments dataset's
// precedent (see that file's header): no real project/contract numbers, no
// real tribal/agency contractor names, no real river/dam names, no real
// people, and no real external system names (MonitoringResources.org in
// prod becomes a fictional "Basin Monitoring Data Repository" here) — a
// work-element-level RM&E report like this plausibly displays real
// regulatory partner information in production.
//
// Kept AS-IS (generic program taxonomy, not sensitive): Work Element IDs and
// names (157/162/119/185/158/165 are BPA's own public catalog of process
// categories, not client-specific content), the RM&E Type / RM&E Focal Area
// value sets (checked directly against prod's real edit UI at
// WorkStatementElement.mvc/ManageMetrics), generic agency abbreviations
// (BPA/USACE/USGS), and RM&E Priority category labels (generic program
// classification, same bar as CRS Commitments' Category field).

/**
 * @typedef {{
 *   projectNumber: string; projectTitle: string; contractContractor: string;
 *   contractStartDate: string; contractNumber: string; fyStarted: number;
 *   weId: number; wseId: number; wseStart: string; wseEnd: string;
 *   title: string; description: string; wseEffectiveBudget: number;
 *   primaryRmeType: string; secondaryRmeType: string;
 *   primaryRmeFocalArea: string; secondaryRmeFocalArea: string;
 *   primaryFocalSpecies: string; secondaryFocalSpecies: string;
 *   protocolName: string; protocolStateName: string; studyPlanName: string;
 *   sampleDesignName: string; dataRepositories: string; cotr: string;
 *   projectSMEs: string; contractSponsors: string; annualReport: string;
 *   rmePriorityIdList: string; rmePriorityTitleList: string;
 * }} RmeWorkElement
 */

// The two real RM&E Metrics dropdowns' full option lists — checked directly
// against prod's live edit UI (WorkStatementElement.mvc/ManageMetrics), not
// guessed. Editing a grid cell picks from these same lists. 'None' is added
// (not part of prod's real list) as this prototype's stand-in for "not set" —
// AG Grid's select cell editor can't represent a true blank option cleanly.
export const RME_TYPE_OPTIONS = [
  'Status and Trend Monitoring',
  'Action Effectiveness Monitoring',
  'Uncertainty Research',
  'Project Feasibility/Development Monitoring',
  'Project Implementation/Compliance Monitoring',
  'None',
];

export const RME_FOCAL_AREA_OPTIONS = [
  'Population Status',
  'Hydrosystem',
  'Tributary Habitat',
  'Estuary/Ocean',
  'Harvest',
  'Hatchery',
  'Predation',
  'Multiple Strategies',
  'None',
];

/** @type {RmeWorkElement[]} */
export const rmeWorkElements = [
  {
    projectNumber: 'PRJ-2021-014', projectTitle: 'Wenaha Basin Steelhead Monitoring Program',
    contractContractor: 'Wenaha River Tribes', contractStartDate: '10/1/2025', contractNumber: '83210 REL 12',
    fyStarted: 2026, weId: 157, wseId: 210101, wseStart: '10/1/2025', wseEnd: '9/30/2026',
    title: 'F: Collect/Generate/Validate Field and Lab Data - Juvenile steelhead snorkel survey data for the Wenaha River',
    description: 'Collect juvenile steelhead snorkel survey data at index sites throughout the Wenaha River basin.',
    wseEffectiveBudget: 14200,
    primaryRmeType: 'Status and Trend Monitoring', secondaryRmeType: 'Uncertainty Research',
    primaryRmeFocalArea: 'Population Status', secondaryRmeFocalArea: 'Tributary Habitat',
    primaryFocalSpecies: 'Steelhead', secondaryFocalSpecies: '',
    protocolName: 'Wenaha Basin Snorkel Survey Protocol v2', protocolStateName: 'Published',
    studyPlanName: 'Wenaha Basin RM&E Study Plan FY26', sampleDesignName: 'Wenaha Basin Snorkel Sample Design',
    dataRepositories: 'Basin Monitoring Data Repository', cotr: 'Marcus Feld',
    projectSMEs: 'Priya Nair', contractSponsors: 'Dana Iverson', annualReport: 'FY25 Annual Report',
    rmePriorityIdList: '4', rmePriorityTitleList: '4: BiOp RM&E',
  },
  {
    projectNumber: 'PRJ-2021-014', projectTitle: 'Wenaha Basin Steelhead Monitoring Program',
    contractContractor: 'Wenaha River Tribes', contractStartDate: '10/1/2025', contractNumber: '83210 REL 12',
    fyStarted: 2026, weId: 162, wseId: 210102, wseStart: '10/1/2025', wseEnd: '9/30/2026',
    title: 'G: Analyze/Interpret Data - Analyze and interpret juvenile steelhead snorkel survey data for the Wenaha River',
    description: 'Synthesize and interpret snorkel survey data to estimate juvenile steelhead density and distribution.',
    wseEffectiveBudget: 7900,
    primaryRmeType: 'Action Effectiveness Monitoring', secondaryRmeType: 'Status and Trend Monitoring',
    primaryRmeFocalArea: 'Tributary Habitat', secondaryRmeFocalArea: 'Population Status',
    primaryFocalSpecies: 'Steelhead', secondaryFocalSpecies: '',
    protocolName: 'Wenaha Basin Snorkel Survey Protocol v2', protocolStateName: 'Published',
    studyPlanName: 'Wenaha Basin RM&E Study Plan FY26', sampleDesignName: 'Wenaha Basin Snorkel Sample Design',
    dataRepositories: 'Basin Monitoring Data Repository', cotr: 'Marcus Feld',
    projectSMEs: 'Priya Nair', contractSponsors: 'Dana Iverson', annualReport: 'FY25 Annual Report',
    rmePriorityIdList: '4', rmePriorityTitleList: '4: BiOp RM&E',
  },
  {
    projectNumber: 'PRJ-2019-028', projectTitle: 'Fernbridge Dam PIT Detection Array Program',
    contractContractor: 'Basin Fisheries Research Partnership', contractStartDate: '4/1/2026', contractNumber: '97456 REL 4',
    fyStarted: 2026, weId: 157, wseId: 210103, wseStart: '4/1/2026', wseEnd: '3/31/2027',
    title: 'D: Collect/Generate/Validate Field and Lab Data - PIT tag detection array data at Fernbridge Dam',
    description: 'Operate and maintain PIT tag detection arrays at Fernbridge Dam and record interrogation data.',
    wseEffectiveBudget: 22340,
    primaryRmeType: 'Status and Trend Monitoring', secondaryRmeType: 'Uncertainty Research',
    primaryRmeFocalArea: 'Hydrosystem', secondaryRmeFocalArea: 'Population Status',
    primaryFocalSpecies: 'Steelhead', secondaryFocalSpecies: 'Spring Chinook',
    protocolName: 'Fernbridge PIT Detection QA/QC Protocol', protocolStateName: 'Published',
    studyPlanName: 'Fernbridge Dam RM&E Study Plan FY26', sampleDesignName: 'Fernbridge PIT Array Sample Design',
    dataRepositories: 'Basin Monitoring Data Repository', cotr: 'Sam Okafor',
    projectSMEs: 'Jamie Ortiz', contractSponsors: 'Renee Ashford', annualReport: 'FY25 Annual Report',
    rmePriorityIdList: '3', rmePriorityTitleList: '3: Projects with Budget over $750K',
  },
  {
    projectNumber: 'PRJ-2019-028', projectTitle: 'Fernbridge Dam PIT Detection Array Program',
    contractContractor: 'Basin Fisheries Research Partnership', contractStartDate: '4/1/2026', contractNumber: '97456 REL 4',
    fyStarted: 2026, weId: 162, wseId: 210104, wseStart: '4/1/2026', wseEnd: '3/31/2027',
    title: 'E: Analyze/Interpret Data - PIT tag detection and interrogation data at Fernbridge Dam',
    description: 'Analyze and interpret PIT tag interrogation records to estimate passage timing and survival.',
    wseEffectiveBudget: 11050,
    primaryRmeType: 'Action Effectiveness Monitoring', secondaryRmeType: 'None',
    primaryRmeFocalArea: 'Hydrosystem', secondaryRmeFocalArea: 'None',
    primaryFocalSpecies: 'Steelhead', secondaryFocalSpecies: '',
    protocolName: 'Fernbridge PIT Detection QA/QC Protocol', protocolStateName: 'Published',
    studyPlanName: 'Fernbridge Dam RM&E Study Plan FY26', sampleDesignName: 'Fernbridge PIT Array Sample Design',
    dataRepositories: 'Basin Monitoring Data Repository', cotr: 'Sam Okafor',
    projectSMEs: 'Jamie Ortiz', contractSponsors: 'Renee Ashford', annualReport: 'FY25 Annual Report',
    rmePriorityIdList: '3', rmePriorityTitleList: '3: Projects with Budget over $750K',
  },
  {
    projectNumber: 'PRJ-2022-031', projectTitle: 'Alder Creek Juvenile Trap Program',
    contractContractor: 'Alder Creek Tribes', contractStartDate: '2/1/2026', contractNumber: '84620',
    fyStarted: 2026, weId: 157, wseId: 210105, wseStart: '2/1/2026', wseEnd: '1/31/2027',
    title: 'C: Collect/Generate/Validate Field and Lab Data - Install and operate juvenile screw trap on Alder Creek',
    description: 'Install, operate, and service a rotary screw trap to capture and enumerate juvenile outmigrants.',
    wseEffectiveBudget: 9870,
    primaryRmeType: 'Status and Trend Monitoring', secondaryRmeType: 'None',
    primaryRmeFocalArea: 'Tributary Habitat', secondaryRmeFocalArea: 'None',
    primaryFocalSpecies: 'Coho', secondaryFocalSpecies: '',
    protocolName: 'Alder Creek Screw Trap Protocol', protocolStateName: 'Published',
    studyPlanName: 'Alder Creek RM&E Study Plan FY26', sampleDesignName: 'Alder Creek Screw Trap Sample Design',
    dataRepositories: 'Basin Monitoring Data Repository', cotr: 'Dana Whitfield',
    projectSMEs: 'Lee Marsh', contractSponsors: 'Sean Ostrander', annualReport: 'FY25 Annual Report',
    rmePriorityIdList: '1', rmePriorityTitleList: '1: Tributary',
  },
  {
    projectNumber: 'PRJ-2022-031', projectTitle: 'Alder Creek Juvenile Trap Program',
    contractContractor: 'Alder Creek Tribes', contractStartDate: '2/1/2026', contractNumber: '84620',
    fyStarted: 2026, weId: 162, wseId: 210106, wseStart: '2/1/2026', wseEnd: '1/31/2027',
    title: 'D: Analyze/Interpret Data - Analyze rotary screw trap catch data for Alder Creek',
    description: 'Analyze rotary screw trap catch data to estimate juvenile outmigrant abundance and timing.',
    wseEffectiveBudget: 6430,
    primaryRmeType: 'Action Effectiveness Monitoring', secondaryRmeType: 'None',
    primaryRmeFocalArea: 'Tributary Habitat', secondaryRmeFocalArea: 'None',
    primaryFocalSpecies: 'Coho', secondaryFocalSpecies: '',
    protocolName: 'Alder Creek Screw Trap Protocol', protocolStateName: 'Published',
    studyPlanName: 'Alder Creek RM&E Study Plan FY26', sampleDesignName: 'Alder Creek Screw Trap Sample Design',
    dataRepositories: 'Basin Monitoring Data Repository', cotr: 'Dana Whitfield',
    projectSMEs: 'Lee Marsh', contractSponsors: 'Sean Ostrander', annualReport: 'FY25 Annual Report',
    rmePriorityIdList: '1', rmePriorityTitleList: '1: Tributary',
  },
  {
    projectNumber: 'PRJ-2007-083', projectTitle: 'Cedar Fork Adult Trap and Broodstock Program',
    contractContractor: 'Cedar Fork Confederated Tribes', contractStartDate: '1/1/2026', contractNumber: '96310 REL 2',
    fyStarted: 2026, weId: 157, wseId: 210107, wseStart: '1/1/2026', wseEnd: '12/31/2026',
    title: 'J: Collect/Generate/Validate Field and Lab Data - Obtain and validate adult trap data from Cedar Fork weir',
    description: 'Operate the Cedar Fork adult trap and validate broodstock collection and disposition records.',
    wseEffectiveBudget: 18600,
    primaryRmeType: 'Status and Trend Monitoring', secondaryRmeType: 'Project Implementation/Compliance Monitoring',
    primaryRmeFocalArea: 'Population Status', secondaryRmeFocalArea: 'Hydrosystem',
    primaryFocalSpecies: 'Bull Trout', secondaryFocalSpecies: '',
    protocolName: 'Cedar Fork Adult Trap Protocol', protocolStateName: 'Published',
    studyPlanName: 'Cedar Fork RM&E Study Plan FY26', sampleDesignName: 'Cedar Fork Adult Trap Sample Design',
    dataRepositories: 'Basin Monitoring Data Repository', cotr: 'Christine Petersen',
    projectSMEs: 'Todd Whitfield', contractSponsors: 'Alan Cho', annualReport: 'FY25 Annual Report',
    rmePriorityIdList: '5', rmePriorityTitleList: '5: Accord RM&E',
  },
  {
    projectNumber: 'PRJ-2007-083', projectTitle: 'Cedar Fork Adult Trap and Broodstock Program',
    contractContractor: 'Cedar Fork Confederated Tribes', contractStartDate: '1/1/2026', contractNumber: '96310 REL 2',
    fyStarted: 2026, weId: 162, wseId: 210108, wseStart: '1/1/2026', wseEnd: '12/31/2026',
    title: 'K: Analyze/Interpret Data - Analyze adult trap catch history for Cedar Fork weir',
    description: 'Analyze adult trap catch history to estimate escapement and broodstock collection rates.',
    wseEffectiveBudget: 8220,
    primaryRmeType: 'Action Effectiveness Monitoring', secondaryRmeType: 'None',
    primaryRmeFocalArea: 'Population Status', secondaryRmeFocalArea: 'None',
    primaryFocalSpecies: 'Bull Trout', secondaryFocalSpecies: '',
    protocolName: 'Cedar Fork Adult Trap Protocol', protocolStateName: 'Published',
    studyPlanName: 'Cedar Fork RM&E Study Plan FY26', sampleDesignName: 'Cedar Fork Adult Trap Sample Design',
    dataRepositories: 'Basin Monitoring Data Repository', cotr: 'Christine Petersen',
    projectSMEs: 'Todd Whitfield', contractSponsors: 'Alan Cho', annualReport: 'FY25 Annual Report',
    rmePriorityIdList: '5', rmePriorityTitleList: '5: Accord RM&E',
  },
  {
    projectNumber: 'PRJ-1988-053', projectTitle: 'Marrow Basin Redd and Harvest Monitoring',
    contractContractor: 'Confederated Tribes of Marrow Basin', contractStartDate: '10/1/2025', contractNumber: '91004 REL 1',
    fyStarted: 2026, weId: 157, wseId: 210109, wseStart: '10/1/2025', wseEnd: '9/30/2026',
    title: 'J: Collect/Generate/Validate Field and Lab Data - Spring Chinook redd and harvest monitoring in the Marrow Basin',
    description: 'Conduct spring Chinook redd surveys and harvest monitoring throughout the Marrow Basin.',
    wseEffectiveBudget: 27500,
    primaryRmeType: 'Status and Trend Monitoring', secondaryRmeType: 'None',
    primaryRmeFocalArea: 'Harvest', secondaryRmeFocalArea: 'Population Status',
    primaryFocalSpecies: 'Spring Chinook', secondaryFocalSpecies: '',
    protocolName: 'Marrow Basin Redd Survey Protocol', protocolStateName: 'Published',
    studyPlanName: 'Marrow Basin RM&E Study Plan FY26', sampleDesignName: 'Marrow Basin Redd Survey Sample Design',
    dataRepositories: 'Basin Monitoring Data Repository', cotr: 'Marcus Feld',
    projectSMEs: 'Dana Iverson', contractSponsors: 'Priya Nair', annualReport: 'FY25 Annual Report',
    rmePriorityIdList: '6', rmePriorityTitleList: '6: General Program and Wildlife',
  },
  {
    projectNumber: 'PRJ-1988-053', projectTitle: 'Marrow Basin Redd and Harvest Monitoring',
    contractContractor: 'Confederated Tribes of Marrow Basin', contractStartDate: '10/1/2025', contractNumber: '91004 REL 1',
    fyStarted: 2026, weId: 162, wseId: 210110, wseStart: '10/1/2025', wseEnd: '9/30/2026',
    title: 'K: Analyze/Interpret Data - Estimate tribal and sport harvest of spring Chinook in the Marrow Basin',
    description: 'Estimate tribal and sport harvest rates of spring Chinook from creel and redd survey data.',
    wseEffectiveBudget: 14900,
    primaryRmeType: 'Uncertainty Research', secondaryRmeType: 'None',
    primaryRmeFocalArea: 'Harvest', secondaryRmeFocalArea: 'None',
    primaryFocalSpecies: 'Spring Chinook', secondaryFocalSpecies: '',
    protocolName: 'Marrow Basin Redd Survey Protocol', protocolStateName: 'Published',
    studyPlanName: 'Marrow Basin RM&E Study Plan FY26', sampleDesignName: 'Marrow Basin Redd Survey Sample Design',
    dataRepositories: 'Basin Monitoring Data Repository', cotr: 'Marcus Feld',
    projectSMEs: 'Dana Iverson', contractSponsors: 'Priya Nair', annualReport: 'FY25 Annual Report',
    rmePriorityIdList: '6', rmePriorityTitleList: '6: General Program and Wildlife',
  },
  {
    projectNumber: 'PRJ-1995-063', projectTitle: 'Wolverine Basin PIT Tag Interrogation Program',
    contractContractor: 'Cascade Basin Department of Fish and Wildlife', contractStartDate: '5/1/2026', contractNumber: '88765 REL 3',
    fyStarted: 2026, weId: 157, wseId: 210111, wseStart: '5/1/2026', wseEnd: '4/30/2027',
    title: 'C: Collect/Generate/Validate Field and Lab Data - Operate PIT interrogation array in the lower Wolverine River',
    description: 'Operate and maintain a PIT tag interrogation array on the lower Wolverine River.',
    wseEffectiveBudget: 31200,
    primaryRmeType: 'Status and Trend Monitoring', secondaryRmeType: 'None',
    primaryRmeFocalArea: 'Hydrosystem', secondaryRmeFocalArea: 'None',
    primaryFocalSpecies: 'Steelhead', secondaryFocalSpecies: 'Sockeye',
    protocolName: 'Wolverine River PIT Interrogation Protocol', protocolStateName: 'Published',
    studyPlanName: 'Wolverine Basin RM&E Study Plan FY26', sampleDesignName: 'Wolverine River PIT Array Sample Design',
    dataRepositories: 'Basin Monitoring Data Repository', cotr: 'Sean Ostrander',
    projectSMEs: 'Alan Cho', contractSponsors: 'Christine Petersen', annualReport: 'FY25 Annual Report',
    rmePriorityIdList: '4', rmePriorityTitleList: '4: BiOp RM&E',
  },
  {
    projectNumber: 'PRJ-1995-063', projectTitle: 'Wolverine Basin PIT Tag Interrogation Program',
    contractContractor: 'Cascade Basin Department of Fish and Wildlife', contractStartDate: '5/1/2026', contractNumber: '88765 REL 3',
    fyStarted: 2026, weId: 162, wseId: 210112, wseStart: '5/1/2026', wseEnd: '4/30/2027',
    title: 'D: Analyze/Interpret Data - Analyze PIT interrogation array data for the lower Wolverine River',
    description: 'Analyze PIT tag interrogation records to estimate passage timing and survival on the lower Wolverine River.',
    wseEffectiveBudget: 16750,
    primaryRmeType: 'Action Effectiveness Monitoring', secondaryRmeType: 'None',
    primaryRmeFocalArea: 'Hydrosystem', secondaryRmeFocalArea: 'None',
    primaryFocalSpecies: 'Steelhead', secondaryFocalSpecies: '',
    protocolName: 'Wolverine River PIT Interrogation Protocol', protocolStateName: 'Published',
    studyPlanName: 'Wolverine Basin RM&E Study Plan FY26', sampleDesignName: 'Wolverine River PIT Array Sample Design',
    dataRepositories: 'Basin Monitoring Data Repository', cotr: 'Sean Ostrander',
    projectSMEs: 'Alan Cho', contractSponsors: 'Christine Petersen', annualReport: 'FY25 Annual Report',
    rmePriorityIdList: '4', rmePriorityTitleList: '4: BiOp RM&E',
  },
  {
    projectNumber: 'PRJ-1998-039', projectTitle: 'Marrow Creek Watershed Habitat Monitoring',
    contractContractor: 'U.S. Geological Survey', contractStartDate: '11/1/2025', contractNumber: '95421',
    fyStarted: 2026, weId: 157, wseId: 210113, wseStart: '11/1/2025', wseEnd: '10/31/2026',
    title: 'N: Collect/Generate/Validate Field and Lab Data - Maintain upper Marrow Creek PIT tag interrogation site',
    description: 'Maintain and service the upper Marrow Creek PIT tag interrogation site and log detection data.',
    wseEffectiveBudget: 19900,
    primaryRmeType: 'Project Implementation/Compliance Monitoring', secondaryRmeType: 'None',
    primaryRmeFocalArea: 'Hydrosystem', secondaryRmeFocalArea: 'None',
    primaryFocalSpecies: 'Steelhead', secondaryFocalSpecies: '',
    protocolName: 'Marrow Creek PIT Site Maintenance Protocol', protocolStateName: 'Published',
    studyPlanName: 'Marrow Creek RM&E Study Plan FY26', sampleDesignName: 'Marrow Creek PIT Site Sample Design',
    dataRepositories: 'Basin Monitoring Data Repository', cotr: 'Jamie Ortiz',
    projectSMEs: 'Renee Ashford', contractSponsors: 'Dana Whitfield', annualReport: 'FY25 Annual Report',
    rmePriorityIdList: '3', rmePriorityTitleList: '3: Projects with Budget over $750K',
  },
  {
    projectNumber: 'PRJ-1998-039', projectTitle: 'Marrow Creek Watershed Habitat Monitoring',
    contractContractor: 'U.S. Geological Survey', contractStartDate: '11/1/2025', contractNumber: '95421',
    fyStarted: 2026, weId: 162, wseId: 210114, wseStart: '11/1/2025', wseEnd: '10/31/2026',
    title: 'O: Analyze/Interpret Data - Analyze upper Marrow Creek PIT tag interrogation data',
    description: 'Analyze upper Marrow Creek PIT tag interrogation data to estimate tributary use and survival.',
    wseEffectiveBudget: 10400,
    primaryRmeType: 'Action Effectiveness Monitoring', secondaryRmeType: 'None',
    primaryRmeFocalArea: 'Hydrosystem', secondaryRmeFocalArea: 'None',
    primaryFocalSpecies: 'Steelhead', secondaryFocalSpecies: '',
    protocolName: 'Marrow Creek PIT Site Maintenance Protocol', protocolStateName: 'Published',
    studyPlanName: 'Marrow Creek RM&E Study Plan FY26', sampleDesignName: 'Marrow Creek PIT Site Sample Design',
    dataRepositories: 'Basin Monitoring Data Repository', cotr: 'Jamie Ortiz',
    projectSMEs: 'Renee Ashford', contractSponsors: 'Dana Whitfield', annualReport: 'FY25 Annual Report',
    rmePriorityIdList: '3', rmePriorityTitleList: '3: Projects with Budget over $750K',
  },
];
