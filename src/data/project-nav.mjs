// project-nav — the project header nav prototype (brief: cbfish-nav-header), built on
// the contract header's round 5 "Areas" pattern: every menu at equal weight in one row
// under the title. A project has no page lifecycle (its pages don't move through
// phases the way a contract's do), so there is no track or status line here.
//
// The pages, each under the tab agreed on 2026-11-10 (brief section 4), with today's
// labels: no merges, renames or removals. Title Case, as the contract header (Andy,
// round 3). Back To Portfolio(s) leaves the menu for the back link above the header,
// as it did on contracts (Andy, round 2), so the nav carries 44 of the 45 links.
//
// Visibility follows every-link-and-tab.md, reduced to the contract nav's three roles
// (NAV_ROLES): admin sees everything; the BPA COR loses the system-admin and budgeter
// pages; a contractor contact also loses BPA-only and editor-only pages. `hideFor`
// lists the roles that do NOT see the page.
import { NAV_ROLES } from './contract-nav.mjs';

const BACK_OFFICE = ['cor', 'contractor'];
const CONTRACTOR = ['contractor'];

/** Mock record: the project CR-387553 belongs to. */
export const project = {
  number: '2027-004-00',
  title: 'Upper Grande Ronde habitat restoration',
  status: 'Ongoing',
  sponsor: 'Grande Ronde Model Watershed',
};

export const PROJECT_TABS = [
  {
    key: 'overview',
    label: 'Overview',
    pages: [
      { slug: 'summary', label: 'Project Summary' },
      { slug: 'edit', label: 'Edit Project' },
      { slug: 'define-area', label: 'Define Area' },
      { slug: 'categorize', label: 'Categorize' },
      { slug: 'tag', label: 'Tag' },
      { slug: 'governance-assessment', label: 'Governance Assessment', hideFor: CONTRACTOR },
      { slug: 'relationships', label: 'Manage Relationships' },
      { slug: 'portfolios', label: 'Associated Portfolios' },
      { slug: 'contacts', label: 'Project Contacts' },
      { slug: 'digest-notifications', label: 'Project Digest Notifications', hideFor: BACK_OFFICE },
      { slug: 'new', label: 'Create New Project', hideFor: CONTRACTOR },
    ],
  },
  {
    key: 'proposals',
    label: 'Proposals and Reviews',
    pages: [
      { slug: 'proposals', label: 'Proposals' },
      { slug: 'isrp-assessments', label: 'ISRP Assessments' },
      { slug: 'council-recommendations', label: 'Council Recommendations' },
      { slug: 'in-lieu-assessments', label: 'In-Lieu Assessments' },
      { slug: 'capital-assessments', label: 'Capital Assessments' },
      { slug: 'biop-workgroup-assessments', label: 'BiOp Workgroup Assessments' },
      { slug: 'bog-change-requests', label: 'BOG Change Requests' },
    ],
  },
  {
    key: 'budget',
    label: 'Budget',
    pages: [
      { slug: 'budgets', label: 'Project Budgets' },
      { slug: 'baseline-budgets', label: 'Set Baseline Budgets', hideFor: BACK_OFFICE },
      { slug: 'accounts', label: 'Define Accounts', hideFor: CONTRACTOR },
      { slug: 'budget-transfers', label: 'Budget Transfers' },
      { slug: 'budget-timeline', label: 'Budget Timeline' },
      { slug: 'contract-spending-plan', label: 'Contract Spending Plan' },
      { slug: 'spending-plan', label: 'Edit Project Spending Plan', hideFor: CONTRACTOR },
      { slug: 'cost-share', label: 'Manage Cost Share' },
    ],
  },
  {
    key: 'contracts',
    label: 'Contracts and Work',
    pages: [
      { slug: 'contracts', label: 'Contracts' },
      { slug: 'internal-work', label: 'BPA Internal Work' },
      { slug: 'work-statement-elements', label: 'Work Statement Elements (SOW)' },
      { slug: 'location', label: 'Location' },
      { slug: 'map', label: 'Map' },
    ],
  },
  {
    key: 'spending',
    label: 'Spending',
    pages: [
      { slug: 'expenditures-by-fy', label: 'Project Exp. by FY' },
      { slug: 'expenditures-by-month', label: 'Project Exp. by Month' },
      { slug: 'expenditures-raw', label: 'Project Exp. Raw', hideFor: BACK_OFFICE },
      { slug: 'payment-authorizations-raw', label: 'Project Contract Payment Authorizations Raw', hideFor: BACK_OFFICE },
    ],
  },
  {
    key: 'results',
    label: 'Results',
    pages: [
      { slug: 'implementation-metrics', label: 'Implementation Metrics' },
      { slug: 'environmental-metrics', label: 'Environmental Metrics' },
      { slug: 'biop-annual-report', label: 'BiOp Annual Report' },
      { slug: 'commitments', label: 'Commitments' },
      { slug: 'associate-to-biop', label: 'Associate to BiOp', hideFor: CONTRACTOR },
      { slug: 'hep-surveys', label: 'Wildlife Crediting HEP Surveys', hideFor: CONTRACTOR },
      { slug: 'reports', label: 'Reports' },
    ],
  },
  {
    key: 'files',
    label: 'Files',
    pages: [
      { slug: 'documents', label: 'Project Documents' },
      { slug: 'notes', label: 'Notes' },
    ],
  },
];

export const ALL_PROJECT_PAGES = PROJECT_TABS.flatMap((t) => t.pages.map((p) => ({ ...p, tab: t.key })));

/** Roles that see no page in a tab: the tab itself hides for them. */
export function projectTabHiddenFor(tab) {
  return NAV_ROLES.map((r) => r.key).filter((role) => tab.pages.every((p) => (p.hideFor ?? []).includes(role)));
}
