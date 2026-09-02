---
name: write-lesson
description: Writes a NEW Polish lesson or module introduction under content/moduly for the ttcmd course, brief first — the reader position, carrying question, anchor example and section arc in English for Viktar to approve — then the Polish draft, citations at the point of use, exercises and checks. Use when asked to write, draft, add, create or start a new lesson, module, part or module introduction ("napisz lekcję 2a", "draft module 2", "new lesson on tokens"). Not for changing an existing lesson — that is revise-lesson.
---

# Write a lesson

A lesson is written the way this repo builds a feature: **brief → Viktar
approves → draft → check → Viktar reads.** The brief is the lesson's spec.
Nothing in Polish is written before it is approved.

## 1. Which lesson

Say which lesson you are writing: module folder, `order`, slug and Polish
title, from `docs/content-research/course-structure-v1.md`. If the module
folder does not exist, the module introduction (`index.mdx`) is written first,
with its own brief (`NN-index.md`): the module's one argument and one sentence
per lesson.

If the request is to change a lesson that already exists, stop and use
`revise-lesson` instead.

## 2. Load — in this order, nothing more

1. `constitution.md` Articles III, IV, V, IX; `AGENTS.md` §4 and §9.
2. `docs/content-reader.md` — who is reading. In full.
3. `docs/content-style.md` — how it is written. In full, including the
   appendix. Do not copy its rules into your notes; apply them.
4. The lesson's row in `course-structure-v1.md`, and the module's paragraph
   above the table.
5. The research file(s) the row names under `docs/content-research/`. Facts,
   numbers, dates and links come from there or from a source you find and
   cite; never from memory.
6. The module's `index.mdx`; the previous lesson in full (its ending is what
   your opening builds on); the next lesson's opening if it exists.
7. `brief-template.md` beside this file.

Do not read the whole course. If the lesson needs a story or term whose home
is another lesson (guide appendix), read that lesson's relevant section only.

## 3. The research gate

A lesson's facts come from one of three places, and the brief must say
which:

1. **A research file** under `docs/content-research/` that the module's row
   names — the normal case for an evidence-heavy lesson. If it exists, read
   it (Load, item 5) and cite it in the brief's sources table.
2. **Sources found at drafting time** — right for a procedure or workshop
   lesson whose claims are a handful of volatile vendor facts: a version, a
   menu path, a free-tier condition, a template name. Each is found on the
   web, dated and linked when the draft is written, and every one the brief
   can already name goes into its sources table as „to find”.
3. **Neither** — the ground is unresearched. Then the brief is where this
   run ends, whatever the mode: fill „Claims that need a source” with the
   open questions, and propose a research brief in the `docs/_prompts/`
   pattern (a standalone research prompt producing a dated, sourced file
   under `docs/content-research/`) for Viktar to run first. Do not draft a
   lesson whose factual ground does not exist. Memory is not a source
   (ADR-0008), and a fluent paragraph written from memory is exactly the
   mistake this repo calls its most expensive.

A module introduction rarely needs more than the course-structure row and
the existing research. A lesson built on evidence never has less than a
research file.

## 4. The brief — then stop

Write `docs/content-briefs/NNx-slug.md` from the template (`02a-prompt-token-kontekst.md`;
`02-index.md` for a module introduction). English. Every field filled; a
field you cannot fill is a finding, not a blank:

- **Reader position** — from the reader file plus the lessons already read,
  by letter: what this reader has done, can run, has never seen. This line
  decides the opening.
- **Carrying question** — one sentence a student could repeat after the
  opening.
- **Anchor** — the one concrete thing the lesson carries from first section
  to last (guide, "The anchor"). A lesson whose anchor you cannot name is not
  ready; say so.
- **Shape** — narrative, hands-on, or procedure with a narrative frame.
- **Arc** — one line per section: its heading, the move it makes, and how it
  uses the anchor. Then the ending: what the reader can now see or do.
- **Owns / recalls / avoids** — stories and terms, against the appendix. A new
  story or term the course will reuse gets a proposed appendix row here.
- **Exercises** — the four kinds (recall, action on the anchor, build step,
  research), one line each.
- **Claims that need a source** — every number, date, price or measured
  result you intend to use, with the link you have or "to find". Concept
  explanations need none (ADR-0008).
- **Reader assumptions to verify** — what the brief assumes about the class
  that the questionnaire or Viktar must confirm.
- **Open questions for Viktar** — at most three, only what clears the bar in
  `AGENTS.md` §4. Everything else you decide and list under *Decisions*.

Present the brief in the conversation and **stop**. Do not draft. Viktar
edits or approves it. If the session is explicitly autonomous, say so in the
brief's header, proceed, and report that the brief was unapproved.

## 5. Draft — after approval

Write the lesson file. Frontmatter: `title`, `order`, `summary` (written
last), `publish: false` until Viktar removes it. Then, in this order:

1. **Opening** by the guide's recipe: something the reader has done → what
   it cannot explain → what the lesson will show. The anchor appears here.
2. **Sections** in the brief's order. Each section makes its move and ends by
   landing the point or creating the need for the next. Every abstraction is
   attached to the anchor in the section where it appears. Apply the reader
   test to every paragraph as you write it.
3. **Quotations and claims with their source where they are made** — the
   blockquote with an attribution line until slice 010 lands, `<Cytat>` after;
   a link in the paragraph or table cell for every checkable number.
4. **Ending** that answers the opening under its own heading.
5. **Exercises** as `<Zadanie>` elements, blank line inside before and after
   the body, optional `title`, no numbers — the module numbers them at build.
6. **`## Źródła`** (`Stan na **yyyy-mm-dd**.`, evidence only, every entry
   dated and linked) and **`## Czytaj dalej`** (further reading, one line why
   each).
7. **Summary** in the frontmatter, from the finished lesson.

Rules that are easy to forget: Polish student-facing text, English MDX
comments; „…” marks, spaced em dash, decimal comma; terms explained in their
home lesson only, plain words before it; neutral `ty` forms; no invented
students, scenes, dialogue or quotations; names used at least twice or not at
all; code fences with `title="…"` where the student creates a file.

If the lesson cannot be written without an application change — a component
that does not exist, a schema field — stop and say so. That is a slice
(Article IX), not a workaround.

## 6. Check

1. `npm run check:content content/moduly/NN-…/slug.mdx`. Judge every smell;
   say which you kept and why.
2. Read the lesson continuously, not by headings; walk the guide's
   publication checklist.
3. `npm run build`. Show both commands and their output.
4. Update the brief: date written, and every deviation from the arc as
   approved, one line each.

## 7. Report, and commit only when asked

Report: file written, the brief's deviations, the smells kept, the claims
whose sources you could not find (dropped, not guessed), and what needs
Viktar's eye — a reader assumption, a fact, a translation of a quotation.

Commit only when Viktar asks. Lesson: `content:` prefix. Brief and any
appendix row: `chore:` prefix, separate commit. A content commit may not
touch `app/` or `lib/`.
