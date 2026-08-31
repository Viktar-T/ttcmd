# tasks.md — 011-lesson-columns

Ordered, commit-sized, objectively checkable. One task, one commit,
`011/TNN:` in the message (AGENTS.md §5). A box is checked when the task's
check has **run and its evidence is recorded** — in the commit, and where the
task says so in `specs/011-lesson-columns/verification.md`.

Criterion numbers refer to `spec.md`; the mechanism is `plan.md`'s.

- [x] **T00 — Record the spec.** `spec.md` with acceptance criteria and
      decisions taken. *Check:* file in the tree, committed on its own.
- [x] **T01 — Record the plan.** `plan.md` written by a subagent from
      `constitution.md`, `AGENTS.md` and this slice's `spec.md` alone; its
      "Gaps in the spec" section is the test's result. *Check:* file in the
      tree, committed exactly as the subagent wrote it.
- [x] **T02 — Close the gaps the plan's fresh-context test found.** The spec
      fixed three numbers by reference — the article column's width, the gap
      between the columns, whether the page margin exists below the fold — and
      the subagent had to guess all three. Stated now, plus criterion 6's
      wording. *Check:* committed before any code exists, so it cannot be a
      spec retrofitted to a build (AGENTS.md §8).
- [x] **T03 — Record the tasks.** This file. *Check:* committed on its own.

---

- [x] **T04 — Record the baseline the slice is measured against.** On the
      unmodified site, in the in-app browser against `npm run dev`: `1c` and
      `1d` at 1280 / 1585 / 1024 / 768 / 375, the module-0 lesson, the home
      page, the module grid, the module page, the reference page's specimen,
      and the rendered line count of every panel entry in `1c`. Also the
      build's contrast report. *Check:* `verification.md` holds a number for
      every page × width the criteria name, and the four-line entry the slice
      exists to fix is counted rather than asserted; `git status` shows no
      change outside `specs/011-lesson-columns/`.

- [x] **T05 — The lesson body becomes two columns.** The panel and a lesson
      column inside one full-bleed grid; the grid centred and one-column below
      the fold, left-anchored and two-column at 80rem; the panel a real track
      at `--contents-width`, sticky, `align-self: start`; the lesson header,
      the disclosure, the article and the pager in the lesson column with the
      frame's own row gap. Every declaration this slice adds is either inside
      the fold's media query or produces the frame's existing geometry below
      it. *Check:* `npm run build` passes with the contrast report unchanged
      (criterion 1); at 1280 and 1585 the two columns are side by side, level
      at the top, anchored 32 px from the left with more slack on the right
      (criteria 2, 3, 4); the contents content box fits ≥ 36 characters, `1c`'s
      longest entry sets on two lines and nothing in `1c` or `1d` on more than
      two (criterion 5); the prose column is 624 px, the wide lane 736 px and
      the offset 56 px at both widths (criterion 6); at 1024, 768 and 375 every
      measured number equals T04's baseline exactly and `scrollWidth ==
      clientWidth` (criterion 11).

- [x] **T06 — Re-verify everything 007 shipped, in the new container.**
      Nothing re-decided (decision 14); this task re-runs 007's own checks
      against the moved panel and fixes only what the move broke. *Check:*
      rendered markup of `1d` at 1280 shows the lesson rows in `order` with
      identity strings, the current row not a link, one entry per section in
      document order, the "Spis treści" landmark distinct from the breadcrumb
      (criterion 7); in the browser, nothing active at the top, the passed
      section active and only it with the current-location mark, the last
      section active at the bottom, a followed entry jumping and taking the
      highlight with it (criterion 8); on a deliberately short viewport the
      panel scrolls itself and the page does not move (criterion 9); the skip
      control is the first focusable and lands focus in the article, and
      back-to-top is absent at the top and present after a viewport (criterion
      10); with scripting disabled the links navigate, the disclosure works,
      no highlight, no back-to-top, no console errors (criterion 12);
      module 0's single-row panel still renders correctly.

- [x] **T07 — The reference page's specimen follows the width.** *Check:* the
      specimen's rendered panel width equals the lesson page's contents column
      width, measured on both pages; the reference page renders without error
      at 1280 and at 375 (criterion 14).

- [x] **T08 — The regression sweep.** Re-measure exactly what T04 measured, on
      the same pages at the same widths, and diff. *Check:* the home page, the
      module grid and the module page are identical at 1280 and 1585, as are
      the site header and the accent band on a lesson page and on a module page
      (criterion 13); `npm run build` green with the same contrast ratios
      (criterion 1); `git diff` for the slice touches no file under `content/`,
      no `package.json`, no lockfile, and adds no network request to any page
      (criterion 15).

- [x] **T09 — Close the slice.** Fresh-context subagent review of the whole
      diff against `spec.md` (AGENTS.md §3, criterion 17); fix what affects
      correctness or a criterion, record the rest without fixing it; this file
      matches reality. **Criterion 16 stays unchecked** — whether the page
      *reads* as two columns is Viktar's eye, not this run's, and the report
      names the page and the width to open.

---

## Slips, recorded rather than tidied away

- **T04's box was `[x]` when `tasks.md` was committed at T03**, before T04's
  evidence existed in the tree. The baseline had been measured by then, but a
  box is checked when the check has run *and its evidence is recorded*, and the
  evidence was recorded one commit later.
- **T05, T06 and T07 did not touch `tasks.md`.** Every remaining box was
  checked in T08's commit rather than as each task closed.
- **T07's one-line change shipped inside T05's commit** — the specimen's width
  is the same declaration family in the same file, and it was edited in the
  same pass.
- **T08's evidence was appended inside T07's commit** (`67487e8`). The two
  sections were written in one pass and staged together; the mistake was
  noticed after the commit and is left standing, because rewriting it would
  delete the only record that it happened (constitution, Article II). T08's own
  commit is therefore this file's boxes and nothing else.

---

## Where the implementation departs from `plan.md`, and why

`plan.md` was written without the repository, so three of its choices are
adjusted against what is actually there. Recorded here rather than by editing
the plan, which is the artefact of the fresh-context test and stays as written.

1. **A wrapper around the lesson column, not three separately placed items.**
   The plan proposed placing the lesson header, the article and the pager
   individually into column 2 of one grid, which needs `grid-template-rows`
   declared and an explicit row number per item — brittle against a fourth
   child, and it must reproduce the frame's row gap by hand. A single
   `.lessonColumn` wrapper carrying the frame's own `row-gap` gives the same
   geometry with no row arithmetic, and the panel spans the full height of the
   column because there is only ever one row. The plan itself allows this:
   *"If a wrapper already exists around the article and the prev/next pair, use
   it and reduce the grid to two rows."*
2. **The panel is first in the DOM, before the lesson header.** The plan kept
   today's order to protect criterion 11, on the reasoning that the disclosure
   must render between the header and the first paragraph. With the wrapper,
   the disclosure is *inside* the lesson column and keeps that position by
   construction, which frees the panel to lead. Above the fold that makes the
   reading order match the visual order — the leftmost column first — which is
   what 007's decision 19 was protecting when it refused to put the panel after
   the article. Below the fold the panel is `display: none` and absent from the
   accessibility tree, so the reading order there is unchanged from today.
3. **The gap is 1.5rem, not the plan's reverse-derived 2rem.** 007 set it as
   the panel's `margin-inline-end`, measured to the article container's edge.
   It becomes the grid's `column-gap` at the same value, so the rule sits the
   same 24 px from the article's container as it does today. The pair therefore
   totals 71.5rem (1144 px), not the plan's 1152 px.
