# tasks.md — 004-lesson-typography

- **Spec:** `specs/004-lesson-typography/spec.md`, approved 2026-08-29
- **Plan:** `specs/004-lesson-typography/plan.md`, approved 2026-08-29

Ordered. One task, one commit. A box is checked when the check has **run** and
its output has been shown — never when the code is merely written.

The default check is `npm run build`. Anything judged by eye is judged on a
rendered page and recorded in `verification.md`, not asserted here.

---

- [ ] **T01 — Record the slice**

  `plan.md` and this file into the repository. `spec.md` is already written.

  **Check:** the three files exist under `specs/004-lesson-typography/` and are
  committed.

- [ ] **T02 — Two widths, and the prose column exists**

  `--measure`, `--content-width` and the rhythm scale into `app/tokens.css`.
  `main` takes `--content-width` in `app/globals.css`. New `app/prose.css` with
  the named-line grid, the `svg`/`table` breakout, `min-width: 0` on every
  child, the prose font size and line height — **and nothing else yet**.
  Imported once in `app/layout.tsx`. The `prose` class applied on the lesson
  route and the module route.

  **Check:** `npm run build` succeeds, and the rendered HTML of
  `/moduly/01-jak-powstaje-oprogramowanie/od-podpowiedzi-do-agenta` shows the
  `<svg>` as a **direct child** of the prose column, not wrapped in a `<p>`.
  If it is wrapped, the breakout selector changes per plan §"Order of work" 2
  and the check is re-run before the box is checked.

- [ ] **T03 — The measure holds 60–75 Polish characters**

  Adjust `--measure` until it does. Counted on rendered lessons with
  `Range.getClientRects()`, at least three paragraphs across two lessons.

  **Check:** the per-line character counts, printed, all between 60 and 75.
  *(Acceptance criterion 4.)*

- [ ] **T04 — The rhythm**

  The six gap rules in `app/prose.css`, in the plan's order: block gap, tight
  gaps, set-apart gaps, set-apart-after, subsection heading, section heading.
  Every flow child reset to `margin: 0` and given a top margin only.

  **Check:** `npm run build` succeeds; and on a rendered lesson the computed
  `margin-top` of every block in the six sequences of criterion 6 is printed —
  paragraph → list, list → heading, paragraph → quotation, quotation →
  heading, paragraph → diagram, diagram → paragraph — showing exactly one
  non-zero gap between each pair, and no gap larger than the heading gap.
  *(Acceptance criteria 5 and 6.)*

- [ ] **T05 — Headings, and inline code that keeps its context**

  All six heading levels sized, weighted and wrapped per the plan's table.
  `:not(pre) > code` colour becomes `inherit` in `app/globals.css`.
  `--weight-strong` per theme in `app/tokens.css`, applied to `strong`.

  **Check:** `npm run build` succeeds; on the rendered lesson whose `##` is
  named after a command, the computed `font-size` and `color` of the inline
  `<code>` inside that heading equal the heading's own, printed side by side.
  *(Acceptance criterion 8; 7 and 16 are judged in T12.)*

- [ ] **T06 — Quotations**

  `--rule-quote` rebound to `--text-muted` in `app/tokens.css`. Blockquote
  treatment in `app/prose.css`: rule and space, no fill, no icon, no label,
  upright, body size, `color: var(--text)`. Inner paragraph gap tight.

  **Check:** `npm run build` succeeds; on the vibe-coding lesson the computed
  `color` of a `blockquote p` equals the computed `color` of a body `p`, and
  its `background-color` is transparent, both printed. The gap between the two
  paragraphs of the closing quotation is smaller than the gap between that
  quotation and the prose around it, printed.
  *(Acceptance criteria 10 and 11; 9 is judged in T12.)*

- [ ] **T07 — Lists, tables, rules and code containment**

  Lists: hanging indent kept, marker colour, tight item gap. Table: scrolls in
  its own bounds, header underline that carries meaning, decorative row
  separators, empty first header cell intact. `hr`. `pre` gets `overflow-x`
  and its place in the rhythm and nothing more.

  **Check:** `npm run build` succeeds; on the lesson containing the table, at a
  375 px viewport, `table.scrollWidth > table.clientWidth` is permitted while
  `document.documentElement.scrollWidth <= clientWidth` holds, both printed;
  and on a numbered exercise item wrapping to three or more lines, the left
  edge of the second line equals the left edge of the first line's text and not
  that of its marker, printed.
  *(Acceptance criteria 12 and 13.)*

- [ ] **T08 — Links**

  Underline, thickness, offset clear of the ogonek, `skip-ink`, `--link`
  colour. In `app/prose.css` only.

  **Check:** `npm run build` succeeds; the computed
  `text-decoration-line` of a prose link is `underline` and
  `text-underline-offset` is non-zero, printed.
  *(Acceptance criteria 14 and 15 are judged in T12; this is the mechanical
  half.)*

- [ ] **T09 — The letter is derived from `order`, never from position**

  `lib/numbering.ts` exporting `lessonLetter(order)`. `order` bounded to a
  positive integer ≤ 26 in `lib/content-schema.ts`.

  **Check:** `npm run build` succeeds; and `lessonLetter` returns `a`, `c` and
  `z` for 1, 3 and 26, printed. Then temporarily set a lesson's `order` to `0`,
  show the build failing with the schema's message, revert, show it passing.
  *(Half of acceptance criterion 17.)*

- [ ] **T10 — The lesson header**

  `lesson-header.tsx` and its module CSS in the lesson route folder: circled
  letter at `--accent-line`, title in large monospace, standfirst from
  `summary`. The `<h1>` and summary `<p>` currently in `page.tsx` move into it.

  **Check:** `npm run build` succeeds; the rendered header of
  `/moduly/00-start/git-i-github` shows **c**, printed from the HTML. At 375 px
  and at the measure, with the two longest written titles,
  `document.documentElement.scrollWidth <= clientWidth` holds and the circle's
  vertical centre lies within the first line box of the title, printed.
  *(Acceptance criteria 17, 18, 19 — 19's "visibly distinct" is confirmed in
  T12.)*

- [ ] **T11 — The reference page carries a specimen of every construct**

  A new prose section on `/styleguide` with everything spec §9 lists: each
  heading level, both list kinds with wrapped items, a single-paragraph and a
  multi-paragraph quotation with an em-dash attribution, a table with an empty
  first header cell, a Polish link containing `ą` and `ę`, inline code in prose
  and in a heading, and a bold-dense Polish paragraph.

  **Check:** `npm run build` succeeds; the rendered page contains each of those
  elements, listed by a query that counts them. No colour literal is added —
  the build's own Check B is the proof.
  *(Acceptance criterion 21.)*

- [ ] **T12 — The verification pass**

  `specs/004-lesson-typography/verification.md`, in 003's shape: contrast
  computed and recorded; the measure counted; the six adjacency sequences
  measured; every by-eye criterion judged on a rendered page at desktop and at
  375 px, in both themes, with the judgement written down; all six lessons read
  end to end.

  **Check:** the file exists and every acceptance criterion from 1 to 21 has an
  entry with its evidence. `npm run build` succeeds and `git diff --stat`
  reports no change under `content/`.
  *(Acceptance criteria 1, 2, 3, 7, 9, 14, 15, 16, 19, 20.)*

- [ ] **T13 — Close the slice**

  Review the complete diff against `spec.md` in a **fresh context**, per
  AGENTS.md §3 and Article IX. Report gaps that affect correctness or an
  acceptance criterion; fix those; write the rest down rather than chasing
  them.

  **Check:** the review's findings and what was done about each, recorded in
  `verification.md`. `npm run build` succeeds afterwards.
  *(Acceptance criterion 22.)*
