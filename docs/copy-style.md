# CBFish copy & capitalization standard

**Scope: this spoke only.** These are CBFish's copy rules, not hub/Ecology rules —
they live here (not in the shared `spoke-kit` skills) so they never touch other
spokes. Every `/design-qa` run and any design/UX or copy review **in this repo**
must include a sentence-case pass against this standard (see `CLAUDE.md` →
"Copy & capitalization").

CBFish follows the **Microsoft Writing Style Guide**: **sentence case** for every
piece of UI chrome.

## The rule

1. **Sentence-case all UI text** — page `<title>`, page/section headings,
   breadcrumbs, sub-nav tabs, buttons/CTAs, form-field labels, **table/column
   headers**, dialog headings, toasts/snackbars, empty states, placeholders.
   Capitalize only the **first word** plus proper nouns and acronyms.
   - `Project Number` → `Project number`
   - `Contract Start Date` → `Contract start date`
   - `Manage RM&E Priorities` → `Manage RM&E priorities`

2. **Keep Title Case for genuine proper nouns only:**
   - Full program/product names — `Columbia Basin Fish & Wildlife Program`,
     `EF&W Program`.
   - Named areas/features that are proper nouns — `Report Center`,
     `CBFish Modernization`.
   - Acronyms / initialisms stay fully uppercase — `RM&E`, `SOW`, `WSE`, `WE`,
     `FY`, `COTR`, `SME`, `BiOp`, `BOG`, `ID`, `CSV`, `SOY`.
   - The brand is **`CBFish`** — one word, capital C+B+F. Never `CB Fish`.
     (Code identifiers stay as-is: `cb-fish-design`, `theme-cb-fish.css`,
     `--cbf-*`/`cbf-*`.)

3. **Field, category, and classification names are common nouns → sentence
   case**, even when the legacy/prod screen shows Title Case. A modernized port
   *re-cases* prod's labels:
   - `RM&E Type` → `RM&E type`, `Focal Area` → `focal area`,
     `RM&E Priority` → `RM&E priority`, `Document Link` → `Document link`.

4. **After a colon, keep the following word capitalized when it names a
   tab/section** — `Project budgets: Summary`, `RM&E reporting: Summary`.

5. **This governs chrome, not record content.** Mock **data values** (a project
   title, a taxonomy entry's name) are left as authored; only labels, headings,
   and chrome are re-cased.

6. **When a casing call is genuinely ambiguous** (proper noun or common noun?),
   flag it for review rather than guessing.
