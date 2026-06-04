// Mock data for the search palette prototype (CBF-8117). Real impl would query
// the API with permission scoping; here it's static, CBFish-flavored content so a
// demo reads as credible. People are the ESA dev/QA team (impersonation targets).
import type { IconName } from './icons';

export type EntityType = 'project' | 'contract' | 'person' | 'publication' | 'fund';
export type ScopeId = 'all' | EntityType;

export interface Scope {
  id: ScopeId;
  label: string;
  icon: IconName;
}
export interface Entity {
  type: EntityType;
  title: string;
  sub: string;
}

export const SCOPES: Scope[] = [
  { id: 'all', label: 'All', icon: 'search' },
  { id: 'project', label: 'Projects', icon: 'folder' },
  { id: 'contract', label: 'Contracts', icon: 'file-text' },
  { id: 'person', label: 'People', icon: 'users' },
  { id: 'publication', label: 'Publications', icon: 'book' },
  { id: 'fund', label: 'Funds', icon: 'wallet' },
];

export const SCOPE_BY_ID: Record<ScopeId, Scope> = Object.fromEntries(
  SCOPES.map((s) => [s.id, s]),
) as Record<ScopeId, Scope>;

/** Group render order for results. */
export const GROUP_ORDER: EntityType[] = ['project', 'contract', 'person', 'publication', 'fund'];

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

  { type: 'person', title: 'Andrew Lovseth', sub: 'Bonneville Power Administration · Project lead' },
  { type: 'person', title: 'Angela Zhao', sub: 'NW Power & Conservation Council · Program analyst' },
  { type: 'person', title: 'David Roberts', sub: 'Nez Perce Tribe · Fisheries biologist' },
  { type: 'person', title: 'Maria Gonzales', sub: 'Idaho Dept of Fish & Game · Salmon program' },
  { type: 'person', title: 'Gloria Scott', sub: 'Environmental Technologist IV · DT-Technology Services, Portland' },
  { type: 'person', title: 'Dan Squires', sub: 'Environmental Technologist II · Portland' },
  { type: 'person', title: 'John Vivio', sub: 'Software Developer/Architect IV · Portland' },
  { type: 'person', title: 'Adrian Mickel', sub: 'Software Developer II · Portland' },
  { type: 'person', title: 'Hunter Kennedy', sub: 'Software Developer II · Sacramento' },
  { type: 'person', title: 'Rex Ounekeo', sub: 'Software Developer III · Portland' },
  { type: 'person', title: 'Tom Kamin', sub: 'Software Developer III · Portland' },
  { type: 'person', title: 'Michael Ferrante', sub: 'Software Developer/Architect IV · Portland' },

  { type: 'publication', title: '2023 Annual Progress Report — Salmon Recovery', sub: 'Publication · Report Center' },
  { type: 'publication', title: 'Subbasin Plan: Salmon River', sub: 'Publication · Planning document' },
  { type: 'publication', title: 'Smolt Monitoring Protocol (rev. 4)', sub: 'Publication · Methods' },

  { type: 'fund', title: 'Salmon Mitigation Fund (FY26)', sub: 'Fund · $24.7M committed' },
  { type: 'fund', title: 'Anadromous Fish Screening Fund', sub: 'Fund · $8.1M committed' },
];

/** Recently-viewed entities shown in the default (no-query) empty state. */
export const RECENT: Entity[] = [
  { type: 'project', title: '2002-051-00 Salmon Subbasin Planning', sub: 'Project · viewed 2h ago' },
  { type: 'contract', title: '[10046] 2001-006-01 Salmon/Steelhead Days', sub: 'Contract · viewed yesterday' },
  { type: 'person', title: 'David Roberts', sub: 'Nez Perce Tribe · viewed yesterday' },
  { type: 'publication', title: '2023 Annual Progress Report — Salmon Recovery', sub: 'Publication · viewed 3d ago' },
];
