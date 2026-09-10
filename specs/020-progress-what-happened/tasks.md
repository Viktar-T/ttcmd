# tasks.md — 020-progress-what-happened

Ordered, commit-sized, each objectively checkable. One commit per task,
`020/TNN:`. A box is ticked when its check has run and the output is recorded
in `verification.md`, never when the code is merely written.

The order is `plan.md` §8. T03 is deliberately one commit and not two: the type
of `ScheduleSession.groups` and its only consumer cannot be split without a red
build in between.

---

- [x] **T01 — The two planned columns leave the table.**
  `app/postep/schedule-table.tsx`: the `Tydz.` and `Data` header cells and their
  two body cells removed, the topics row's `colSpan` re-derived from `GROUPS`
  rather than restated, the file's doc comment corrected to the new arithmetic.
  **Check:** `npm run build`, `npm run lint`. Criterion 2 and criterion 3 read
  from the rendered markup, scoped to the `<table>` element — a bare grep for
  `Tydzień` would match the calendar above, which legitimately prints it
  seventeen times.

- [x] **T02 — `dd.mm` joins the site's date vocabulary.**
  `lib/dates.ts` gains `formatDateDayMonth`, and its header comment gains the
  sentence saying why there is a fourth form and who may not reach it.
  Additive: the three existing formatters and `parseContentDate` are untouched.
  **Check:** `npm run build`, `npm run lint`. Nothing calls it yet.

- [x] **T03 — A group cell carries the week its own date fell in.**
  `lib/schedule.ts`: `ScheduleGroupClass`, `groups` retyped, `weekOf`, and the
  ninth refusal. `app/postep/schedule-table.tsx`: `Cell` rewritten to
  `03.09-T1` with the full ISO date still on the element.
  **Check:** criteria 6 and 6a from the rendered markup — session 1 reads
  `03.09-T1`, `04.09-T1`, `08.09-T2`, `08.09-T2` and session 2 reads
  `10.09-T2`, `11.09-T2` and two blanks, each with its full `datetime`.

- [ ] **T04 — The stylesheet's comments catch up.**
  `app/postep/page.module.css`: comments only. The two-column stacked grid is
  now exactly the four groups two-by-two, and the comment says so.
  **Check:** `git diff` shows no selector, property or value changed. That the
  diff is comment-only is itself the evidence for criterion 10.

- [ ] **T05 — Measure.**
  **Check:** criterion 9, `scrollWidth − clientWidth` at 320, 375, 768, 1024,
  1280 and 1585 px on `/postep`, all zero; and criterion 10, each session at
  375 px still one block with every group's value beside its own code.

- [ ] **T06 — The refusals still refuse.**
  **Check:** criterion 6b, one seeded date moved to a Saturday, and criterion 7,
  a session pointing at a week the calendar does not have. Two build failures,
  two messages, each naming its row. Reverted between, `git status` clean under
  `content/`. Evidence only — no source change.

- [ ] **T07 — Nothing else moved.**
  **Check:** criteria 4, 5, 8 and 11. The calendar renders every week once,
  ascending; the topics still render in their own row with derived letters and
  titles; `content/schedule.json` is untouched by this slice; and the
  prerendered markup of every page other than `/postep` is byte-identical once
  the per-build id is normalised — the instrument slice 016 established.

- [ ] **T08 — Close the slice.**
  `verification.md`, then the diff reviewed against `spec.md` in a fresh
  subagent context (AGENTS.md §3, criterion 13).
  **Check:** the review reports no gap. Criterion 12 is Viktar's eye and stays
  unchecked, named in the final report.
