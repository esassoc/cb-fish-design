// Mock data for the search palette prototype (CBF-8117). Real impl would query
// the API with permission scoping; here it's static, CBFish-flavored content so a
// demo reads as credible. People are the ESA dev/QA team (impersonation targets).
import type { IconName } from './icons';

export type EntityType = 'project' | 'contract' | 'person' | 'publication';
export type ScopeId = 'all' | EntityType;

export interface Scope {
  id: ScopeId;
  label: string;
  icon: IconName;
}
/** Contact detail for the person popover card (mirrors prod's "Find Person"). */
export interface PersonContact {
  org: string;
  email: string;
  businessPhone?: string;
  mobilePhone?: string;
  address?: string[];
}
export interface Entity {
  type: EntityType;
  title: string;
  sub: string;
  /** People only — feeds the popover contact card. */
  contact?: PersonContact;
}

export const SCOPES: Scope[] = [
  { id: 'all', label: 'All', icon: 'search' },
  { id: 'project', label: 'Projects', icon: 'folder' },
  { id: 'contract', label: 'Contracts', icon: 'file-text' },
  { id: 'person', label: 'People', icon: 'users' },
  { id: 'publication', label: 'Publications', icon: 'book' },
];

export const SCOPE_BY_ID: Record<ScopeId, Scope> = Object.fromEntries(
  SCOPES.map((s) => [s.id, s]),
) as Record<ScopeId, Scope>;

/** Group render order for results. */
export const GROUP_ORDER: EntityType[] = ['project', 'contract', 'person', 'publication'];

/** Per-group cap when browsing a scope with no query. */
export const BROWSE_CAP = 6;

export const DATA: Entity[] = [
  { type: 'project', title: '2001-006-00 Salmon/Steelhead Days', sub: 'Project · FY2001 · Active' },
  { type: 'project', title: '2002-051-00 Salmon Subbasin Planning', sub: 'Project · FY2002 · Active' },
  { type: 'project', title: '2002-032-00 Passage of ESA-Listed Juvenile Salmon', sub: 'Project · FY2002' },
  { type: 'project', title: '2002-033-00 John Day Salmonid Monitoring Program', sub: 'Project · FY2002 · Active' },
  { type: 'project', title: '2001-025-00 Salmonid Production in Restored Rattlesnake Creek', sub: 'Project · FY2001' },
  { type: 'project', title: '1996-019-00 Hood River Production Program', sub: 'Project · FY1996 · Active' },

  { type: 'contract', title: '[10046] 2001-006-01 Salmon/Steelhead Days', sub: 'Contract · Project 2001-006-00' },
  { type: 'contract', title: '[10205] 2001-006-02 Trout/Salmon Watch', sub: 'Contract · Project 2001-006-00' },
  { type: 'contract', title: '[10217] 2001-025-00 Salmonid Production, Rattlesnake Creek', sub: 'Contract · Project 2001-025-00' },
  { type: 'contract', title: '[10253 REL 32] Shoshone-Bannock Tribe — Salmon Subbasin', sub: 'Contract · Project 2002-051-00' },
  { type: 'contract', title: '[10253 REL 33] Nez Perce Tribe — Salmon Subbasin', sub: 'Contract · Project 2002-051-00' },
  { type: 'contract', title: '[10255 REL 18] Idaho Dept of Fish & Game — Salmon Subbasin', sub: 'Contract · Project 2002-051-00' },
  { type: 'contract', title: '[10952] 2002-033-00 John Day Salmonid Monitoring', sub: 'Contract · Project 2002-033-00' },

  { type: 'person', title: 'Andrew Lovseth', sub: 'Bonneville Power Administration · Project lead',
    contact: { org: 'Bonneville Power Administration', email: 'alovseth@bpa.gov', businessPhone: '(503) 230-4471', address: ['905 NE 11th Ave', 'Portland, OR 97232'] } },
  { type: 'person', title: 'Angela Zhao', sub: 'NW Power & Conservation Council · Program analyst',
    contact: { org: 'NW Power & Conservation Council', email: 'azhao@nwcouncil.org', businessPhone: '(503) 222-5161', address: ['851 SW Sixth Ave Suite 1100', 'Portland, OR 97204'] } },
  { type: 'person', title: 'David Roberts', sub: 'Nez Perce Tribe · Fisheries biologist',
    contact: { org: 'Nez Perce Tribe — Dept of Fisheries Resources Mgmt', email: 'davidr@nezperce.org', businessPhone: '(208) 843-7320', mobilePhone: '(208) 553-1142', address: ['P.O. Box 365', 'Lapwai, ID 83540'] } },
  { type: 'person', title: 'Maria Gonzales', sub: 'Idaho Dept of Fish & Game · Salmon program',
    contact: { org: 'Idaho Dept of Fish & Game', email: 'maria.gonzales@idfg.idaho.gov', businessPhone: '(208) 334-3791', address: ['600 S Walnut St', 'Boise, ID 83712'] } },
  { type: 'person', title: 'Gloria Scott', sub: 'Environmental Technologist IV · DT-Technology Services, Portland',
    contact: { org: 'ESA — DT-Technology Services', email: 'gscott@esassoc.com', businessPhone: '(503) 274-2010', address: ['309 SW Sixth Ave Suite 575', 'Portland, OR 97204'] } },
  { type: 'person', title: 'Dan Squires', sub: 'Environmental Technologist II · Portland',
    contact: { org: 'ESA', email: 'dsquires@esassoc.com', businessPhone: '(503) 274-2014', address: ['309 SW Sixth Ave Suite 575', 'Portland, OR 97204'] } },
  { type: 'person', title: 'John Vivio', sub: 'Software Developer/Architect IV · Portland',
    contact: { org: 'ESA', email: 'jvivio@esassoc.com', businessPhone: '(503) 274-2023', mobilePhone: '(971) 340-8852', address: ['309 SW Sixth Ave Suite 575', 'Portland, OR 97204'] } },
  { type: 'person', title: 'Adrian Mickel', sub: 'Software Developer II · Portland',
    contact: { org: 'ESA', email: 'amickel@esassoc.com', businessPhone: '(503) 274-2031', address: ['309 SW Sixth Ave Suite 575', 'Portland, OR 97204'] } },
  { type: 'person', title: 'Hunter Kennedy', sub: 'Software Developer II · Sacramento',
    contact: { org: 'ESA', email: 'hkennedy@esassoc.com', businessPhone: '(916) 564-4500', address: ['2600 Capitol Ave Suite 200', 'Sacramento, CA 95816'] } },
  { type: 'person', title: 'Rex Ounekeo', sub: 'Software Developer III · Portland',
    contact: { org: 'ESA', email: 'rounekeo@esassoc.com', businessPhone: '(503) 274-2044', address: ['309 SW Sixth Ave Suite 575', 'Portland, OR 97204'] } },
  { type: 'person', title: 'Tom Kamin', sub: 'Software Developer III · Portland',
    contact: { org: 'ESA', email: 'tkamin@esassoc.com', businessPhone: '(503) 274-2056', mobilePhone: '(503) 481-7720', address: ['309 SW Sixth Ave Suite 575', 'Portland, OR 97204'] } },
  { type: 'person', title: 'Michael Ferrante', sub: 'Software Developer/Architect IV · Portland',
    contact: { org: 'Bonneville Power Administration', email: 'michael@sitkatech.com', businessPhone: '(503) 808-1207', address: ['309 SW Sixth Ave Suite 575', 'Portland, OR 97204'] } },

  { type: 'publication', title: '2023 Annual Progress Report — Salmon Recovery', sub: 'Publication · Report Center' },
  { type: 'publication', title: 'Subbasin Plan: Salmon River', sub: 'Publication · Planning document' },
  { type: 'publication', title: 'Smolt Monitoring Protocol (rev. 4)', sub: 'Publication · Methods' },
];
