// Handoff spec for the /vendor-portal prototype — curated sections for the
// accountant landing page. Consumed only by scripts/gen-handoff.mjs at build time.

/** @type {{ sections: import('./search.mjs').HandoffSection[] }} */
export default {
  sections: [
    {
      label: 'Portal header',
      selector: '.cbf-vendor-portal-header',
      intent:
        'Welcome banner and activity snapshot on the accountant landing page. Greets the vendor by first name using esa-page-header, then shows a read-only metrics row (invoices submitted, pending review, total billed) via esa-stat legos. The primary CTA drives to /vendor-invoice.',
      decisions: [
        'esa-page-header owns the greeting + primary CTA — do not hand-roll a custom heading + button pair.',
        'Stats use esa-stat inside the cluster layout primitive (data-gap="xl") — not a custom flex row.',
        'Primary CTA button links to /vendor-invoice; no secondary action in the header.',
      ],
      gotchas: [
        'esa-stat does not accept a unit prop — currency and suffix formatting must be baked into the value string.',
        'The greeting uses the vendor\'s first name split from the full contact string — "Maria" not "Maria Garcia".',
      ],
    },
    {
      label: 'Action cards',
      selector: '.cbf-vendor-portal-actions',
      intent:
        'Four navigational quick-action cards in a 2×2 grid. "Submit an invoice" is elevated as the primary CTA; the remaining three (Submission history, Payment status, Account & profile) are standard informational cards.',
      decisions: [
        'All four cards are esa-card legos — no custom card component.',
        'Grid uses the .grid layout primitive with data-gap="md", not a bespoke CSS grid.',
        '"Submit an invoice" card carries a filled esa-button to reinforce the primary path; the others link via the card href.',
      ],
      gotchas: [
        'esa-card elevation variants differ between lego versions — verify the "elevated" prop name against the installed ecology version.',
        'Card actions are esa-button inside the card body, not anchor wrappers around the whole card.',
      ],
    },
  ],
};
