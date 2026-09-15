# tasks.md — 022-session-titles

Ordered, commit-sized, each objectively checkable. One commit per task,
`022/TNN:`. The order is `plan.md`'s.

`content/schedule.json` carries Viktar's own uncommitted edits throughout this
slice. No task commits a change to it; every temporary edit is restored from
saved bytes after a hash check, never with `git checkout`.

---

- [x] **T01 — A session may carry a title, and the build knows its rules.**
  `lib/schedule-schema.ts`: the optional `title`, refusing a title with no
  visible character. `lib/schedule.ts`: `ScheduleSession.title`, the refusal of
  a title that begins with its own number, the empty-title sentence, and the two
  comments that stop being true.
  **Check:** `npm run build`, `npm run lint`. Nothing renders the title yet.

- [ ] **T02 — The title opens the session's topics.**
  `app/postep/schedule-table.tsx`: the numbered title as a heading before the
  topic list, with an untitled session's cell left exactly as it was.
  `app/postep/page.module.css`: its treatment, existing tokens only.
  **Check:** criterion 2 — a title-free schedule renders `/postep` identically
  to before, with the build id and the shared stylesheet's name normalised and
  the stylesheet differing only by the new rules; criterion 8 by the same
  comparison on every other page.

- [ ] **T03 — The title renders, and the refusals refuse.**
  No source change. Temporary titles on the schedule, restored from saved bytes.
  **Check:** criteria 3, 4 and 5 from the rendered page; criterion 6, two build
  failures naming the session; criterion 7, no overflow at 320, 375 and 1280 px
  with the longest title set; criterion 9 from the diff.

- [ ] **T04 — Close the slice.**
  `verification.md`, then the diff reviewed against `spec.md` in a fresh
  subagent context.
  **Check:** the review reports no gap. Criterion 10 is Viktar's eye.
