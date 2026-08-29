# tasks.md — 006-navigation

- **Spec:** `specs/006-navigation/spec.md`, approved 2026-08-29
- **Plan:** `specs/006-navigation/plan.md`, approved 2026-08-29

Ordered. One task, one commit. A box is checked when the check has **run** and
its output has been shown — never when the code is merely written.

The default check is `npm run build`. Anything judged by eye is judged on a
rendered page and recorded in `verification.md`, not asserted here.

---

- [x] **T01 — Record the slice**

  `plan.md` and this file into the repository. `spec.md` is already written.

  **Check:** the three files exist under `specs/006-navigation/` and are
  committed.

- [x] **T02 — Identity, and one model of the course**

  `lib/numbering.ts`: `moduleNumber`, `moduleLabel`, `lessonId` — the module
  number from the folder prefix, throwing when there is none. `lib/plural.ts`:
  the three Polish forms. `lib/content.ts`: `getCourse` wrapped in React's
  `cache()`, modules sorted by number rather than by folder name, the flat
  neighbour lookup that crosses module boundaries, and `getModule` returning the
  compiled body it currently discards. **Nothing renders any of it yet.**

  **Check:** `npm run build` succeeds and its wall time is printed beside the
  13.3s baseline. The derived course is printed: every module with its number
  and label, every lesson with its `order`, letter and identity string —
  showing module 0's single lesson as **`0c`** and not `0a`. The neighbours of
  `01/od-podpowiedzi-do-agenta` printed, with the previous one being `0c` in
  module 0. Then rename a module folder to drop its numeric prefix, show the
  build failing with the folder named, and revert.
  *(Acceptance criteria 4 and 5's mechanical half.)*

- [x] **T03 — A rule that can be seen, and the floors the build now keeps**

  List `docs/adr/`, claim the next free number, and write the ADR: the value,
  the arithmetic, and the amendment to ADR-0007. `--rule-strong` in
  `app/tokens.css`, once, on bare `:root`. Check E in
  `scripts/check-design-invariants.mjs` — the seven pairs of the plan, resolved
  through `var()` aliases, computed for both themes.

  **Check:** `npm run build` succeeds and its output shows Checks A–E passing,
  with every computed ratio printed. Then break one floor — edit `--rule-strong`
  toward the background — and show the build failing with the pair, the theme,
  the ratio and the floor named; revert; show it passing.
  *(Acceptance criteria 2 and 3.)*

- [ ] **T04 — The frame: a full-width lane, a header, and 004 unmoved**

  `main` becomes the named-line grid of the plan. `app/nav.css`, imported in
  `app/layout.tsx`. `components/site-header.tsx` with the wordmark and the theme
  control; `app/theme-toggle.module.css` loses `position: fixed` and
  `app/theme-toggle.tsx` loses its provisional note.
  `components/band.tsx` — the full-bleed accent stripe and its inner box —
  rendered **empty** on the module and lesson routes.
  `lesson-header.module.css` loses its bottom margin to the frame's row gap.

  **Check:** `npm run build` succeeds. On a rendered lesson: the computed width
  of a content child's padding box is **736px** at desktop and **343px** at
  375px, printed; the band's rendered width equals the viewport's at both, and
  `document.documentElement.scrollWidth <= clientWidth` holds on every page in
  both themes. Slice 004's measure re-counted with `Range.getClientRects()` and
  its six adjacency sequences re-measured, both printed beside the numbers in
  `specs/004-lesson-typography/verification.md`. Slice 005's nine code blocks
  counted on the Git lesson with their surface colour and their gaps, printed
  beside `specs/005-code-blocks/verification.md`.
  *(Acceptance criteria 11, 12, 13.)*

- [ ] **T05 — Chevron breadcrumbs, and a focus ring that survives the band**

  `components/breadcrumb.tsx` and the chevron rules in `app/nav.css`: the two
  clipped pseudo-elements, the notched variant, the filled current step, and the
  `--stroke` / `--ground` override inside the band. The focus rule, and its
  override on the band. Wired into the module and lesson routes.

  **Check:** `npm run build` succeeds. The rendered markup of a lesson page's
  trail is printed, showing the navigation landmark with a name, an ordered
  list, links for the earlier steps and a non-link current step carrying
  `aria-current="page"`, reading `Moduły › Moduł 0 › 0c`. The computed
  `outline-color` of a focused link **on the band** and **on the page** is
  printed with its WCAG ratio against that surface, both ≥ 3:1. The text/fill
  ratio of an outlined step and of the filled step, printed, both ≥ 4.5:1.
  *(Acceptance criteria 9, 10, and 18's measured half.)*

- [ ] **T06 — The module page: introduction, chevron rows, module pager**

  `components/lesson-list.tsx` and its rules. `components/pager.tsx`, used here
  for modules. The module route renders the band, the introduction body, the
  rows and the pager.

  **Check:** `npm run build` succeeds. Module 0's list contains exactly one row
  and it reads **`0c`**, printed from the HTML; module 1's five rows read `1a`
  to `1e` in `order`. Both introductions appear on their pages, compared with
  the `index.mdx` bodies. At 375px, the longest lesson title wraps inside its
  row while `document.documentElement.scrollWidth <= clientWidth` holds, printed.
  `git diff --stat` reports no change under `content/`.
  *(Acceptance criteria 5, 17, 19.)*

- [ ] **T07 — Previous and next, across the module boundary**

  The pager on the lesson route, with the neighbour's module named when the step
  crosses into it.

  **Check:** `npm run build` succeeds. The rendered previous/next `href`s
  printed for every one of the six lessons: `1a`'s previous is `0c` and names
  module 0; `0c`'s previous is absent and the query returns zero elements; the
  last lesson of module 1 has no next and the same query returns zero. Each
  lesson reached from its neighbour in the browser, and the resulting URLs
  printed.
  *(Acceptance criteria 7 and 8.)*

- [ ] **T08 — The module grid, the landing page, and `/moduly`**

  `components/module-grid.tsx` and its rules, including the doubled frame. The
  landing page: headline, the existing description verbatim, the bordered button
  into the first lesson of the first module, then the grid. `/moduly`: a heading
  and the same grid.

  **Check:** `npm run build` succeeds. The two cards' rendered content printed —
  number, title, and the lesson count in the right Polish form for 1 and for 5.
  The button's `href` compared against the first lesson of the first module read
  off disk. At 375px, 700px and 1280px the grid's column count is printed and
  `document.documentElement.scrollWidth <= clientWidth` holds with the doubled
  frame drawn. The network log for `/`, `/moduly`, a module and a lesson,
  filtered to images and third-party origins: zero.
  *(Acceptance criteria 6, 15, 16, 21.)*

- [ ] **T09 — The reference page carries the navigation furniture**

  A section on `/styleguide` with a breadcrumb in both segment states, a chevron
  row, a module card and a previous/next pair, built from literal props so the
  specimens do not change when the content does.

  **Check:** `npm run build` succeeds and Check B still passes — no colour value
  is printed on that page. The rendered page contains each specimen, listed by a
  query that counts them.
  *(Acceptance criterion 20.)*

- [ ] **T10 — The verification pass**

  `specs/006-navigation/verification.md`, in 003's, 004's and 005's shape: the
  contrast table; the frame's geometry; the parity measurements against 004 and
  005; slice 003's theme behaviour re-checked in its new housing; every by-eye
  criterion judged on a rendered page at desktop and at 375px, in both themes,
  with the judgement written down; the walk from the landing page to every
  lesson, recorded.

  **Check:** the file exists and every acceptance criterion from 1 to 21 has an
  entry with its evidence. `npm run build` succeeds and `git diff --stat`
  reports no change under `content/`.
  *(Acceptance criteria 1, 6, 14, 15, 18, 21.)*

- [ ] **T11 — Close the slice**

  Review the complete diff against `spec.md` in a **fresh context**, per
  AGENTS.md §3 and Article IX. Report gaps that affect correctness or an
  acceptance criterion; fix those; write the rest down rather than chasing them.

  **Check:** the review's findings and what was done about each, recorded in
  `verification.md`. `npm run build` succeeds afterwards.
  *(Acceptance criterion 22.)*
