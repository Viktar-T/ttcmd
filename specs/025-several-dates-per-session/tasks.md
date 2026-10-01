# tasks.md — 025-several-dates-per-session

Ordered, commit-sized, each objectively checkable. One commit per task,
`025/TNN:`. The order is `plan.md`'s (§5), and the checks are its §4.

`content/schedule.json` carries Viktar's own uncommitted edit throughout this
slice. No task commits a change to it and no check writes to it: every
temporary schedule lives in a scratch copy of the tree (plan §4.1).

**C0**, which every task ends with, run in the main tree with its output shown:
`npm run build` (exit 0, `Design invariants OK.`, `○ /postep` in the route
table), `npm run lint` (exit 0, no finding) and `npx tsc --noEmit` (exit 0, no
output). The tree is never broken between commits, because two dev servers are
watching it.

**Before T01, no commit:** record the schedule file's hash, run C0 once on
unchanged code as the baseline for criterion 1, and build the scratch tree.

---

- [x] **T01 — Style rules for a cell with several dates.**
  `app/postep/page.module.css`: the two rules for the block that holds several
  dates, and the "one value, one line" comment corrected. Nothing uses them
  until T02.
  **Check:** C0; the diff adds only those rules and that comment, defines no
  custom property and writes no colour literal; then, on the schedule as it
  stands, the code from before the slice against T01 — every page identical once
  the build id and the CSS-modules stylesheet's name are normalised, the other
  stylesheet identical in name and bytes, and the CSS-modules stylesheet
  differing only by the new rules.

- [x] **T02 — A cell is a list of dates.**
  `lib/schedule.ts`: a group's entry holds a list in the model, and the loader
  wraps today's single date in a list of one. `app/postep/schedule-table.tsx`:
  the cell takes the list; one date is today's markup untouched, several are new
  and not yet reachable. The three comments this makes untrue.
  **Check:** C0; T01 against T02 on the same schedule — every page
  byte-identical with only the build id normalised, both stylesheets identical
  in name and bytes.

- [x] **T03 — A group entry may hold several dates.**
  `lib/schedule-schema.ts`, `lib/schedule.ts`: the entry is a date or a list of
  dates; each date goes through the check a single date gets; the three new
  refusals; the sort; the reworded sentence for an unknown group; the five
  comments this makes untrue.
  **Check:** C0; T02 against T03 on the same schedule (build id only); then, on
  scratch builds: criteria 3, 4 and 5 from the rendered page; 6, the five
  refusals; 7, a single date refused with today's message at both revisions; and
  8, 9 and 10(c) on a production server.

- [ ] **T04 — Close the slice.**
  `verification.md`, the journal entry, then the diff reviewed against `spec.md`
  in a fresh subagent context.
  **Check:** `verification.md` has an entry for each criterion, with its command
  and output; the review reports no gap; the scratch tree and the scratch server
  are gone. Criterion 12 is Viktar's eye, and the perceptual remainder of
  criterion 9 is named beside it.

---

**Outside the slice:** moving session 5's three dates onto session 4 is a
content-lane commit made after T04 (spec, decision 8), not a task here.
