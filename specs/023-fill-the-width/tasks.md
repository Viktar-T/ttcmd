# tasks.md — 023-fill-the-width

Ordered, commit-sized, each objectively checkable. One commit per task,
`023/TNN:`. A box is ticked when its check has run and the output is recorded
in `verification.md`. The order is `plan.md` §4's.

**The instrument, fixed once for every task below.** The driven browser against
`npm run dev`. Boxes are `getBoundingClientRect()`, written `left / width` in
CSS px, with `cw = document.documentElement.clientWidth` recorded beside the
window width — a media query is evaluated against `cw`, so with a classic
scrollbar the 88rem fold arrives at a window of about 1423 px. Same convention
for the baseline and for the result (spec, criteria preamble; plan §5.4).

**Widths:** 320, 375, 768, 1024, 1279, 1280, 1281, 1407, 1409, 1585, 2560.
**Pages:** `1c`, `1d`, module 0's single lesson, `/`, `/moduly`, a module page,
`/postep`, `/styleguide`.

---

- [x] **T01 — The baseline. No code.**
  Every box criteria 3, 4, 5, 6, 7 and 8 name, on every page and width above,
  plus `scrollWidth − clientWidth` at each, plus the current `npm run build`
  output including the contrast report, plus `npm run lint`. Which element is
  measured per page is fixed here and written down, so the after-measurement
  cannot pick a friendlier one (plan §6.4).
  **Check:** `verification.md` carries the table. Nothing closes — criterion 4
  and criterion 7 have no meaning without it, and it cannot be taken after the
  first commit.

- [x] **T02 — The measure moves, and the lane follows it.** *(T03 folded in — see below.)*
  `app/tokens.css`: `--measure-wide: 47.5rem` and `--band: 81rem` added,
  `--content-width` becomes `calc(var(--measure) + 9rem)`, `--content-inset`
  deleted, the slice-004 and slice-012 comments rewritten. `app/globals.css`:
  one `@media (min-width: 88rem)` rebinding `--measure` — the only place 88rem
  is written, and it is not in `tokens.css` because Check D of
  `scripts/check-design-invariants.mjs` fails the build on a nested brace there.
  **Check:** `npm run build`, `npm run lint`. At 1585: prose 464 / 760, wide
  lane 408 / 872, lesson header and pager 464 / 760, contents 32 / 352, the gap
  to the viewport's right edge 290 (criteria 2, 3); header and accent-band inner
  boxes 389 / 792 (criterion 8's first half). At 1280 and 1407: every lesson box
  identical to T01 — 32 / 352, 408 / 736, 464 / 624 (criterion 4). No
  horizontal overflow at any of the eleven widths.

- [x] **T03 — The frame becomes the band.** **Done inside T02's commit, not
      beside it.** The two are one edit once `--content-inset` goes: slice 012's
      anchoring block is the only thing that reads that name, so deleting the
      name and deleting the block cannot be separated, and a commit holding one
      without the other would not build a page anyone could measure. Recorded
      rather than split artificially (AGENTS.md §8: new work is proposed, not
      inserted — this is the same work in one commit).

  `app/globals.css`: `main`'s content track becomes
  `min(var(--band), 100% - 2rem)`, and slice 012's `@media (min-width: 80rem)`
  anchoring block is deleted with its comment.
  **Check:** `npm run build`, `npm run lint`. At 1585 on `/`, `/moduly`,
  `/postep` and `/styleguide` the frame's content track is 137 / 1296 with its
  two margins equal; at 1280 it is the viewport less the two gutters
  (criterion 5). The lesson page is unchanged from T02 — this is the commit that
  could reach it and must not (criterion 4).

- [x] **T04 — Inside the band: prose keeps the measure, the grid takes the
      whole width.**
  `app/nav.css`: `main > .lane { margin-inline: 0 auto }` so a lane on a band
  page starts at the band's left edge; `.heroLede` loses `max-width: 34rem` —
  the one hard-coded prose length in the tree — and gains
  `justify-self: stretch`; `.moduleGrid` gets `repeat(3, 1fr)` at 80rem and
  above; the two stale comments corrected.
  `components/module-grid.tsx` drops `lane`. `app/postep/page.tsx`: the two
  sections drop `lane`, the header keeps it. Comment-only corrections in
  `app/postep/page.module.css` and `app/postep/schedule-table.tsx`, whose text
  states widths this slice falsifies.
  **Check:** `npm run build`, `npm run lint`. At 1585: the hero paragraph
  137 / 760 (criterion 6); the module grid 137 / 1296, three cards per row, each
  ≥ 380 px (criterion 7); the progress sections 137 / 1296 and a measure-capped
  block there 760 (criterion 8). At 768 and 375 the grid renders the same number
  of cards per row as at T01.

- [x] **T05 — The module page joins the band, and keeps its panel.**
  `app/contents.css`: a `.pageColumnsBand` modifier — band width, centred, no
  page margin, content track `minmax(0, 1fr)` — applied at 80rem and above.
  `.pageColumns` itself, which is the lesson page's, is untouched.
  `app/moduly/[module]/page.tsx`: one class on the wrapper, and the slice-012
  paragraph in its comment replaced.
  **Check:** `npm run build`, `npm run lint`. At 1585 the wrapper is 137 / 1296,
  the panel 137 / 352, the content column 513 / 920; at 1280, 16 / 1233. The
  panel, the disclosure and the scroll-spy behave as they did at T01
  (criterion 9 on this page). The lesson page is still unchanged (criterion 4).

- [x] **T06 — The reference page shows the geometry the site has.**
  `app/styleguide/page.module.css`: its own text capped at the measure, its
  prose specimens at the article column, `.page` keeping the band.
  **Check:** `/styleguide` renders without error at 1585, 1280 and 375;
  `.page` is 137 / 1296; a prose specimen is 872 wide with its text at 760; the
  contents, grid and pager specimens show the site's own widths (criterion 13).

- [ ] **T07 — The sweep. No code unless something fails.**
  **Check:** criterion 9 on `1d` at 1585 — no section highlighted at the top,
  the passed section highlighted and only it with `aria-current="location"`, the
  last section at the document's bottom, a followed entry landing its heading
  below the top edge and moving the highlight, the panel scrolling with the
  page's scroll position unchanged, the skip control first and hidden until
  focused, back-to-top absent at the top and present after a viewport of scroll,
  every entry on `1c` and `1d` on at most two lines. Criterion 10 at 1024, 768
  and 375 on a lesson page and on the band pages. Criterion 11:
  `scrollWidth − clientWidth === 0` at all eleven widths on five page types.
  Criterion 1: `npm run build` succeeds, the contrast report is identical to
  T01's, `npm run lint` is clean. Criterion 14: `git diff --stat` names nothing
  under `content/`, `package.json` and `package-lock.json` are unchanged, and no
  `"use client"` was added.

- [ ] **T08 — Close the slice.**
  `verification.md` completed, then the complete diff reviewed against
  `spec.md`'s acceptance criteria in a fresh subagent context (AGENTS.md §3).
  **Check:** the review reports no gap affecting correctness or a criterion
  (criterion 15). Criterion 12 is Viktar's eye and stays unchecked: what to look
  at is `1c` and `1d` at 1585 for the line length, and `/` → a module page → a
  lesson at 1585 for the two edges.
