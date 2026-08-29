# tasks.md — 005-code-blocks

- **Spec:** `specs/005-code-blocks/spec.md`, approved 2026-08-29
- **Plan:** `specs/005-code-blocks/plan.md`, approved 2026-08-29

Ordered. One task, one commit. A box is checked when the check has **run** and
its output has been shown — never when the code is merely written.

The default check is `npm run build`. Anything judged by eye is judged on a
rendered page and recorded in `verification.md`, not asserted here.

---

- [x] **T01 — Record the slice**

  `plan.md` and this file into the repository. `spec.md` is already written.

  **Check:** the three files exist under `specs/005-code-blocks/` and are
  committed.

- [x] **T02 — Highlighting arrives, and nothing about it reaches the browser**

  List `docs/adr/`, claim the next free number, and write the ADR for the
  engine and the two dependencies. Install `shiki` and `@shikijs/rehype`.
  `lib/code-highlight.ts` with the CSS-variables theme and the rehype options
  from the plan — `langs: []`, `lazy: true`, `defaultLanguage: "text"`, no
  fallback language and no error handler. Wired into the shared `mdxOptions` in
  `lib/content.ts`, so lessons and module index files get it alike. No palette
  yet, no component yet: the blocks render with `var(--code-…)` colours that
  resolve to nothing, which is what the next task fixes.

  **Check:** `npm run build` succeeds — and if it needs
  `serverExternalPackages` or a different regex engine, that is discovered here
  and recorded in the ADR. The rendered HTML of
  `/moduly/00-start/git-i-github` contains 9 `<pre class="shiki …">`, each
  carrying `var(--code-` spans and **no `#` colour literal**, all printed. Then
  grep the built client chunks for the highlighter's package name and for a
  grammar marker: zero hits, printed.
  *(Acceptance criterion 22; the mechanical half of 4.)*

- [x] **T03 — The palette, and the two checks that keep it honest**

  The second ADR: the values, why seven, why theme-independent. The code
  palette block in `app/tokens.css` — defined once on bare `:root`, never under
  `[data-theme]`, with the diff and ANSI variables aliased rather than left
  undefined. Checks C and D in `scripts/check-design-invariants.mjs`.

  **Check:** `npm run build` succeeds, and its own output shows Checks A–D
  passing. Then break each new check once and show it failing: remove one
  variable's definition (Check C), and move one into the light-theme block
  (Check D). Revert both, show the build passing. The WCAG contrast of every
  palette colour against the code surface, computed and printed, all ≥ 4.5:1.
  *(Acceptance criteria 3 and 6; 2 by the build's own guard.)*

- [x] **T04 — The block: surface, geometry, and 004's rhythm intact**

  `components/code-block.tsx` and `components/code-block.module.css`. The
  `components` map on both `compileMDX` calls in `lib/content.ts`. The
  wrapper's surface and rounding; `pre` scrolls; horizontal padding on the line
  and not on the scroller; `width: fit-content; min-width: 100%` on the code
  box. `app/prose.css`: the two `--gap-apart` rules take `[data-code-block]` in
  place of `pre`. **No copy control and no filename header yet.**

  **Check:** `npm run build` succeeds. On the Git lesson: the computed
  `margin-top` of each block around each of the 9 code blocks, printed, showing
  exactly one non-zero gap per boundary and no gap larger than the heading gap,
  and equal to what 004's `verification.md` recorded. At a 375 px viewport, the
  longest block satisfies `pre.scrollWidth > pre.clientWidth` while
  `document.documentElement.scrollWidth <= clientWidth` holds, both printed.
  *(Acceptance criteria 18 and 20; the surface half of 4.)*

- [x] **T05 — The copy control**

  `components/copy-button.tsx`, `"use client"`, rendered by the block. Three
  states in Polish, stable `aria-label`, visually hidden `role="status"`,
  `min-width` for the longest label, `user-select: none`, timer cleared on
  unmount, `writeText` in a `try`/`catch`. Its resting, hover and focus
  treatments in the module CSS.

  **Check:** `npm run build` succeeds. For all 9 blocks in the Git lesson,
  `code.textContent` is compared **character for character** against the fence
  body read from `git-i-github.mdx`; the comparison result is printed for each,
  and includes that neither ends in a newline. The control is reached by
  keyboard, activated, and the confirmation observed; the focus indicator is
  seen on a screenshot. On a block long enough to scroll, the text under the
  control at rest is scrolled clear and that is shown.
  *(Acceptance criteria 11, 12, 13, 19.)*

  *Done except for the screenshot: the Browser pane never composited a frame in
  this session, so none could be taken. The focus indicator was read from
  computed styles instead — outline `rgb(201,194,245) solid 2px`, and the label
  `#a29a8c` at rest against `#e8e4db` on focus — and the scrolled-clear
  measurement was taken with a Range: 176px of the first line beyond the
  control at rest, 0px once scrolled. Both are in `verification.md`, and
  criterion 11's "reads as quiet rather than as broken" is on its outstanding
  list.*

- [x] **T06 — The fence info line, and the filename header**

  `lib/code-meta.ts`: the grammar of the plan, strict, with errors naming what
  was written and what is accepted. Wired as `parseMetaString`, and the file
  path attached to any compile error in `lib/content.ts`. The filename carried
  onto the element by the transformer and rendered as the header, sharing the
  code surface and separated by a rule.

  **Check:** `npm run build` succeeds. Then, one at a time and each reverted
  afterwards, with the failing output shown: a fence with an unrecognised
  language; a fence with an info line that does not parse; and a fence with a
  duplicated `title=`. Each message names the lesson file. Then the reference
  page — or a temporary fence — shows a filename header rendered, and a block
  without one showing no header and no empty bar.
  *(Acceptance criteria 9, 14, 17; 10's mechanical half.)*

- [x] **T07 — Marked lines**

  The line ranges parsed by T06 applied by the transformer, and their treatment
  in the module CSS: a change in lightness across the full width plus a marker
  at the line's start.

  **Check:** `npm run build` succeeds. On a multi-line specimen with a range,
  exactly the requested lines carry the marking, printed by a query. With the
  block scrolled to `scrollLeft = scrollWidth`, the marked line's rendered
  width equals the code box's width, printed. A line reference past the end of
  a block fails the build with a message naming the file — shown and reverted.
  *(Acceptance criteria 15 and 16.)*

- [x] **T08 — The reference page carries a specimen of every construct**

  The compile helper exported from `lib/content.ts`; a new section on
  `/styleguide` built from a tilde-fenced Markdown string compiled through the
  same pipeline. One specimen each of: `bash`, C# with keywords, a type, a
  comment and a Polish string, a fence with no language, a filename header,
  marked lines, a line long enough to scroll at the measure, a comment carrying
  every Polish diacritic, and a one-line block.

  **Check:** `npm run build` succeeds and Check B still passes — no colour
  value is printed on that page. The rendered page contains each specimen,
  listed by a query that counts them, and the C# block's keyword, type, string
  and comment spans are printed with the variable each resolves to.
  *(Acceptance criteria 8, 10, 21, 23.)*

- [x] **T09 — The verification pass**

  `specs/005-code-blocks/verification.md`, in 003's and 004's shape: the
  contrast table; the theme-independence comparison printed for both themes;
  every by-eye criterion judged on a rendered page at desktop and at 375 px, in
  both themes, with the judgement written down; the Git lesson read end to end
  on both themes; the clipboard comparison re-run after everything else landed.

  **Check:** the file exists and every acceptance criterion from 1 to 23 has an
  entry with its evidence. `npm run build` succeeds and `git diff --stat`
  reports no change under `content/`.
  *(Acceptance criteria 1, 4, 5, 7.)*

- [x] **T10 — Close the slice**

  Review the complete diff against `spec.md` in a **fresh context**, per
  AGENTS.md §3 and Article IX. Report gaps that affect correctness or an
  acceptance criterion; fix those; write the rest down rather than chasing
  them.

  **Check:** the review's findings and what was done about each, recorded in
  `verification.md`. `npm run build` succeeds afterwards.
  *(Acceptance criterion 24.)*
