# ADR-0009 — Markdown tables need remark-gfm, so remark-gfm is added

- **Date:** 2026-08-29
- **Status:** accepted
- **Decision by:** agent, under AGENTS.md §4 (reversible in one commit) and §8
  (a dependency needs an ADR line saying what it replaces and why). Viktar
  vetoes by reverting one commit.
- **Found by:** slice 004-lesson-typography, while measuring the vertical rhythm.

## Context

`od-podpowiedzi-do-agenta.mdx` contains a table:

```markdown
| | Jednostka pracy | Twoja rola |
| --- | --- | --- |
| Warstwy 1–3 | linijka, fragment | piszesz |
| Warstwy 4–5 | zadanie | zlecasz i sprawdzasz |
```

It has never rendered as a table. MDX implements CommonMark, and **tables are
not CommonMark** — they are a GitHub Flavored Markdown extension. `compileMDX`
in `lib/content.ts` is called with `parseFrontmatter: true` and no remark
plugins, so those four lines render as one paragraph of pipe characters. On a
public site, in a lesson, since the day it was written.

Measured rather than assumed: on the rendered page,
`document.querySelectorAll('.prose table').length` is `0`, and one `<p>` has the
text content `| | Jednostka pracy | Twoja rola | | --- | --- | --- | …`.

Slice 004's spec §6 and its acceptance criterion 13 require that table to render
as a grid, with its empty first header cell intact, scrolling within its own
bounds at a phone width. None of that is reachable while the element does not
exist.

## Options considered

| Option | Why not |
| --- | --- |
| Rewrite the table as HTML or JSX inside the `.mdx` file | A content change. Slice 004's spec forbids it in as many words — "No lesson text changes. The lessons are the test subject" — and its criterion 3 requires the diff to contain no change under `content/`. It also means every future table is authored as markup rather than as Markdown, which is a worse content model, not a workaround. |
| Style a table that no lesson produces, and leave the lesson broken | Passes nothing. Criterion 13 is about *the* table, and the defect on the public site would survive the slice that found it. |
| A hand-written remark plugin for tables | Reimplementing `remark-gfm`, badly. ADR-0002 already rejected hand-rolling for this pipeline, for the same reason. |
| **`remark-gfm`** | **Accepted.** The canonical remark plugin for the GFM extensions, from the same `remarkjs` organisation as the compiler `next-mdx-remote` already depends on. One line of configuration, no API of its own. |

## Decision

Add `remark-gfm` and pass it to `compileMDX` in `lib/content.ts`, for lessons
and for module index files alike.

**It replaces nothing.** It restores a Markdown construct the content model
already assumed it had: the constitution's Article VIII says content is MDX
under `content/`, and the lessons were written expecting Markdown tables to be
Markdown tables.

## Consequences

- One new build-time dependency. It runs at build only — `compileMDX` is called
  from Server Components inside `generateStaticParams`-driven routes — so
  nothing is shipped to the browser.
- **The blast radius on today's content is exactly one element.** GFM adds
  tables, strikethrough, footnotes, task lists and literal autolinks. Counted
  across all eight files under `content/`: zero `~~`, zero `[^…]`, zero
  `- [ ]`, and zero bare URLs — every link is already an explicit `[text](url)`.
  So the only rendered difference is the table that was always meant to be one.
- Future lessons may use the rest of GFM. That is a gain, not a risk, but it is
  worth knowing it arrived here rather than being designed.
- ADR-0002 stands unchanged. This does not revisit the choice of
  `next-mdx-remote`; it configures it.
- Slice 004's `plan.md` said no dependency would be added and that
  `lib/content.ts` would not be touched. Both statements were written before
  anyone looked at whether the table rendered. The plan is not edited to match —
  Article II and AGENTS.md §8 — and the deviation is recorded here, in
  `specs/004-lesson-typography/tasks.md` as task T06a, and in
  `docs/sdd-journal.md`.
