# tasks.md — 024-module-marks

Ordered, commit-sized, each objectively checkable. One task, one commit,
`024/TNN:` (AGENTS.md §5). A box is checked when the check has **run** and its
output is in the commit, never when the code is merely written.

---

- [x] **T01 — The baseline, measured before any code.**
      With the tree at `6a59832`, record from a running server: the rendered
      height of a module card on `/`, the accessible name of one card, the
      computed `font-size` of the course name at 375px and at 1440px, the
      rendered width of the hero lede at 1440px, and the number of network
      requests the front door makes. Written to
      `specs/024-module-marks/baseline.md`.
      **Check:** the file exists and every number in it was read off a browser,
      with the width it was read at. No code changes in this commit.

- [x] **T02 — ADR-0015 and the correction to the design reference.**
      Claim the ADR number only after listing `docs/adr/` (AGENTS.md §7).
      Record the reversal of "no illustrations": what was decided, why it is
      reversed, what the reversal covers (the front door and the course
      contents page, nothing else), and what was rejected. Correct the three
      statements in `docs/design-reference.md` in place, each marked as
      reversed and dated, never deleted (Article II).
      **Check:** `grep -n -i illustration docs/design-reference.md` shows no
      surviving statement that ttcmd has none; `docs/adr/0015-*.md` exists and
      names its rejected alternatives. Closes criterion 12.

- [x] **T03 — The nine drawings.**
      `components/marks.tsx`: eight module marks on one square viewBox keyed by
      folder slug, one wider course mark, every one of them `fill="none"`,
      `stroke="currentColor"`, `aria-hidden="true"`, no `<title>`, no colour
      literal. The lookup returns `undefined` for an unknown slug, typed so the
      compiler can see the missing case. Imported by nothing yet.
      **Check:** `npm run build` passes — its Check B scans `components/` for
      colour literals — and `npm run lint` reports no new problem. Output in
      the commit.

- [x] **T04 — The card: the mark takes the number's place.**
      `components/module-grid.tsx` — the kicker becomes the module's number in
      words and digits, the mark goes where the number was, inside the existing
      link. `app/nav.css` — `.moduleCardNumber` deleted, `.moduleCardMark`
      added in the same box expression, hover **and** `:focus-visible`
      recolouring the strokes to the accent alongside the frame.
      **Check:** `npm run build`, then the rendered HTML of `/`, `/moduly` and
      `/styleguide` read from a running server: eight distinct marks on the
      front door, no `moduleCardNumber` anywhere, every mark inside the card's
      single `<a>`, no colour literal between `<svg` and `</svg>`, both
      styleguide specimens falling back with no mark. Card height compared
      against T01. Closes criteria 1, 2, 3, 6, 7, 9, 10, and the markup half
      of 4.

- [ ] **T05 — The hero: the course mark beside the course name.**
      `app/page.tsx` — the hero's text moves into its own box and the course
      mark becomes its second child. `app/nav.css` — the hero becomes two
      columns in the band above a named fold, one column below it, with the
      text keeping the measure and the left edge it has today.
      **Check:** in a browser at 1440px, 1280px, 1024px and 375px: the mark is
      beside the name above the fold and absent below it; at 375px
      `scrollWidth <= clientWidth`; the course name's computed `font-size` and
      the lede's rendered width match T01 at both widths. Closes the
      measurable half of criterion 5.

- [ ] **T06 — Close the slice.**
      `npm run build` and `npm run lint` in full. Then the review of the diff
      against `spec.md` in a **fresh subagent context** (AGENTS.md §3,
      Article IX): every criterion met, nothing outside the slice touched.
      Apply what it finds that affects correctness or a criterion. Then the
      final report naming what only a human eye can close — that the hover
      reads as a change and not a flicker (4), that the course mark sits well
      beside the name at Viktar's own width (5), that nothing shifts on a real
      load (8), and whether nine hand-drawn marks are any good, which no
      command in this repository can answer.
      **Check:** build and lint output in the commit, the review's findings
      named, and every box above this one checked or carrying a handoff line.
