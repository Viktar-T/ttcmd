# tasks.md — 016-group-progress

Ordered, commit-sized, each objectively checkable. One commit per task,
`016/TNN:`. The check named on a task is what closes it; a box is ticked when
the check has run and its output is recorded in `verification.md`, never when
the code is merely written.

The order is `plan.md` §10. Steps 3 and 4 are separate from 5 so a failure in
the shape of the data is distinguishable from a failure in the shape of the
page. Steps 6 and 7 are separate from 5 so the only task that touches an
existing page touches nothing else.

---

- [x] **T01 — The content layer derives identity for every lesson, published or not.**
  `lib/numbering.ts` gains `lessonHref(moduleSlug, lessonSlug)`. `lib/content.ts`:
  `listLessons` returns its unpublished lessons as summaries rather than hrefs,
  `readCourse` derives `letter`, `id` and `href` for every lesson file, and
  `getLessonIndex()` exposes them. The exercise walk is not touched.
  **Check:** `npm run build` and `npm run lint` clean, and the home page, the
  module grid, a module page and a lesson page measure identically to the
  pre-slice baseline at 1280 px and 375 px. This task must move nothing, and it
  is the only one that could move something it did not intend to.

- [x] **T02 — Seed the schedule.**
  `content/schedule.json`: the two weeks and two sessions of `spec.md` §11.
  No planned date, no group date, no invented value of any kind.
  **Check:** the file parses, and every value in it is quoted back against
  `spec.md` §11 in `verification.md`. Criterion 17.

- [ ] **T03 — The schedule's shape.**
  `lib/schedule-schema.ts`: `GROUPS` — the four codes of ADR-0014 in column
  order — and the Zod shape of the file, including `z.strictObject` for
  `groups` and the three-way topic union.
  **Check:** `npm run build`, `npm run lint`. Nothing renders it yet.

- [ ] **T04 — The schedule's model.**
  `lib/schedule.ts`: read, parse every date through `lib/dates.ts`, the five
  structural cross-checks, pointer resolution against the course, sorting, and
  the model the page renders. Wrapped in `cache()`, not a module constant.
  **Check:** `npm run build`, `npm run lint`.

- [ ] **T05 — The page, wide layout.**
  `app/postep/page.tsx`, `app/postep/schedule-table.tsx`,
  `app/postep/page.module.css`.
  **Check:** `npm run build` succeeds **and lists `/postep` as a static route** —
  that line is the evidence that validation runs at build time at all.
  Criteria 2, 3, 4, 5, 6 and 8 read from the rendered markup.

- [ ] **T06 — The stacked layout.**
  The same stylesheet, mobile-first, one breakpoint at 41rem, labels in the DOM.
  **Check:** criteria 12 and 13. `scrollWidth − clientWidth` is zero at 320,
  375, 768, 1024, 1280 and 1585 px on `/postep`, the home page, a module page
  and a lesson page; and at 375 px every value in a row is readable beside the
  group code it belongs to.

- [ ] **T07 — The way in.**
  `app/page.tsx` gains one link to `/postep`. Nothing else on that page moves.
  **Check:** criterion 14. The home page's boxes measure what they measured at
  T01's baseline, and the link navigates.

- [ ] **T08 — The build refuses eight malformed schedules.**
  One at a time, reverting between, per criterion 10.
  **Check:** eight build failures, eight messages, each naming its row. The
  messages go into `verification.md` verbatim. Evidence only — no source change.

- [ ] **T09 — The four temporary experiments.**
  A lesson's title changed (criterion 6), a seeded lesson set `publish: false`
  (criterion 7), a group date moved two weeks past its week (criterion 9), and a
  week plus a session plus a group date added (criterion 11).
  **Check:** each reverts, each ends with `git status` clean under `content/`,
  and criterion 11 additionally shows `git diff --stat` naming only the schedule
  file. Evidence only — no source change survives this task.

- [ ] **T10 — Close the slice.**
  `verification.md` written, then the diff reviewed against `spec.md` in a fresh
  subagent context (AGENTS.md §3, criterion 19).
  **Check:** the review reports no gap affecting correctness or the criteria.
  Criterion 18 is Viktar's eye and stays unchecked; it is named in the final
  report along with anything the review leaves open.
