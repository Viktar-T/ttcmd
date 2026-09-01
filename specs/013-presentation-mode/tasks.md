# tasks.md — 013-presentation-mode

Ordered, commit-sized, objectively checkable. One task, one commit,
`013/TNN:` (AGENTS.md §5). A box is checked when the check has been **run** and
its output is in the commit or the final report — never when the code is merely
written (AGENTS.md §3).

**Numbering note.** `plan.md` numbers its own steps T01–T09 starting at
`tasks.md`. This file starts at the spec, because the spec and the plan are each
a commit in this slice's history. The offset is +2 throughout: plan T02 is T04
here. Nothing is skipped.

---

- [x] **T01 — Write `spec.md`.**
      **Check:** the file exists, ends in acceptance criteria and a
      `## Decisions taken` section, and names no file, library or component
      (AGENTS.md §2). Committed as `18ad4fe`.

- [x] **T02 — Write `plan.md` from a fresh context.**
      **Check:** written by a subagent whose brief was `constitution.md`,
      `AGENTS.md` and this slice's `spec.md` and nothing else (AGENTS.md §2,
      "Two modes", requirement 1), and it reports back whether the spec was
      sufficient. It was. Committed as `246e85f`.

- [x] **T03 — Write this file.**
      **Check:** every task below names a command or an observation that decides
      it, and every acceptance criterion in `spec.md` is closed by exactly one
      task or is listed under "Left unchecked".

- [x] **T04 — The reading-mode reset, and somewhere to see it.**
      `app/globals.css` gains an unconditional element-level `mark` reset;
      `app/styleguide/page.tsx` and `app/styleguide/page.module.css` gain the
      specimen block of plan §1.8 — one specimen of every case in spec §8,
      compiled through the real pipeline.
      **Check:** `npm run build` and `npm run lint` clean. On `/styleguide`, in
      both themes, read `getComputedStyle` on a `mark` and on the paragraph
      around it: same `color`, same `background-color`, same `font-weight`, same
      `text-decoration`. **Closes:** criteria 3 and 4.

- [x] **T05 — The tokens, and the floors the build computes.**
      Four tokens in `app/tokens.css`; three rows appended to `CONTRAST_FLOORS`
      in `scripts/check-design-invariants.mjs`; three swatch rows on the
      reference page now that the tokens exist.
      **Check:** `npm run build` prints six new contrast lines — three pairs ×
      two themes — every one above its floor, and every line the report carried
      before this slice is unchanged in position and value.
      **Closes:** criterion 2.

- [x] **T06 — The mode's stylesheet.**
      `app/presentation.css` and its import in `app/layout.tsx`. No control yet;
      the mode is reached by setting `document.documentElement.dataset.mode`
      by hand, which is how the CSS is checked independently of the button.
      **Check**, on `/styleguide`, in both themes, in both modes: every mark
      carries the fill, the ink and a visible boundary; a plain `<p>` — not the
      container, not a quotation — moves from `--text` to `--present-dim`; the
      heading, link, quotation, list-item and table-cell specimens each render
      with nothing clipped, overlapped or invisible; the wrapping specimen is a
      complete highlight on each line; both link nestings keep their underline
      and take the ink; a code block's token span, copy control and filename are
      byte-identical in both modes; `/`, `/moduly` and a module page render
      identically in both modes. **Closes:** criteria 5, 6, 7, 8.

- [x] **T07 — ADR-0013.**
      The palette and the mode attribute, with the rejected alternative for each.
      **Check:** `docs/adr/` listed first and the number confirmed free
      (AGENTS.md §7); the file carries the literals that are actually in
      `app/tokens.css`; every decision in it names what it rejected.

- [x] **T08 — The control.**
      `app/presentation-toggle.tsx`, `app/presentation-toggle.module.css`,
      `components/site-header.tsx`, `app/nav.css`.
      **Check:** it sits beside the theme control on the home page, a module
      page and a lesson page; its accessible name is read out of the rendered
      accessibility tree in **both** states, not out of the source; its on state
      is visible on `/moduly`, which has no marks; pressing it twice leaves
      `<html>`'s attribute list exactly as served; no horizontal scrollbar at
      320 px and 375 px. **Closes:** criterion 9.

- [x] **T09 — Persistence, before the paint.**
      The one inline script in `app/layout.tsx`, extended rather than duplicated.
      **Check:** choose presentation, navigate, reload — still in force; all four
      theme × mode combinations render and neither control moves the other; the
      served HTML carries the script inside `<head>` and no `data-mode`
      attribute. **Closes:** criteria 10 and 12.

- [x] **T10 — The sweep.**
      No code unless something fails. `npm run build`, `npm run lint`,
      `npm run check:content`. `git diff --stat` against this slice's base: no
      path under `content/`, no `package.json`, exactly one file containing
      `"use client"`, no `fetch` and no colour literal outside `app/tokens.css`.
      **Closes:** criteria 1 and 14.

- [x] **T11 — The closing review, in a fresh context.**
      The whole diff against `spec.md`'s acceptance criteria, by a subagent that
      has not seen this session (AGENTS.md §3, Article IX). Fix what affects
      correctness or a criterion; record the rest without fixing it.
      **Closes:** criterion 15.

- [x] **T12 — Append the run's agent notes to `docs/sdd-journal.md`.**
      **Added after T11 rather than planned**, and said so rather than slipped
      in: the run repeated a mistake slice 012's journal had already named, and
      constitution Article II makes an unrecorded shortcut the only real failure
      available here. Factual entries only — the reflection sections of that file
      are Viktar's (AGENTS.md §7).
      **Check:** the entry sits under "Agent notes", states what happened rather
      than what it meant, and every claim in it is one this slice's commits or
      checks can be read against.

---

## Left unchecked, deliberately

**Criteria 11 and 13 — the projector and the human eye.** Criterion 13 is a
judgement about a room; criterion 11 routes its confirmation into 13. AGENTS.md
§3 forbids checking either box from here, so both stay open and the final report
names what to open, what to look at, and which token moves if the answer is no.

- [ ] **Criterion 11 — no flash of reading mode on a reload in presentation
      mode.**
- [ ] **Criterion 13 — whether the lit fragments carry from the back of the
      room, and whether the dim is a big enough step down at that distance.**
