# tasks.md — 010-sources-and-figures

- **Slice:** 010
- **Spec:** `specs/010-sources-and-figures/spec.md`
- **Plan:** `specs/010-sources-and-figures/plan.md`
- **Date:** 2026-08-30

Ordered and commit-sized. One task, one commit, `010/TNN:`. A box is checked
when the task is done **and verified**, with the check's command and output
recorded — never when it is merely written (AGENTS.md §3).

Task numbers follow this repo's convention, in which the three artefacts are
T01–T03; the plan's own §9 numbering is offset by three.

---

## One deliberate departure from the plan

Recorded here rather than by editing `plan.md`, which was written in a fresh
context from the spec alone and is evidence of that (AGENTS.md §2, §8).

**Plan §2.4 renders an external anchor twice** — the link plugin writes
`target` / `rel` / `data-external` onto the hast node for anchors written as
Markdown, and `ProseLink` writes the same object as JSX props for anchors the
elements build — and draws the visible mark with CSS generated content using
the alternative-text form, `content: "↗" / "(link zewnętrzny)"`.

**This slice maps `a` to `ProseLink` in the components map instead**, the way
`pre` is already mapped to the code block, so **every** anchor on a compiled
page — prose and element-built alike — is rendered by one component. Two
reasons, both in the plan's own terms:

1. It removes the second markup path the plan's §11 names as the likeliest
   mistake, rather than keeping two paths in step. `classifyLink` stays the one
   classifier; there is now also one renderer.
2. The alternative-text form of `content` is not supported everywhere. Where it
   is not, the **whole declaration is invalid** and the mark disappears — a
   silent failure of exactly the shape Check A and Check C exist to prevent.
   The mark is therefore markup: a glyph the component writes, and a
   visually-hidden phrase beside it.

Everything else in the plan is followed as written, including the classifier,
the collect-during / resolve-after ordering, the frontmatter line offset, and
the refusal table.

---

- [x] **T01 — record the spec.**
      `specs/010-sources-and-figures/spec.md`. Check: the file exists, ends in
      acceptance criteria and carries `## Decisions taken`.

- [x] **T02 — record the plan, written from the spec alone.**
      `specs/010-sources-and-figures/plan.md`, produced in a fresh context whose
      only inputs were `constitution.md`, `AGENTS.md`, this slice's `spec.md`
      and the documents and code that spec names (AGENTS.md §2). It reported
      four gaps; the spec was amended in the same commit to close all four.
      Check: the file exists and carries a file map and an order of work.

- [x] **T03 — record the tasks.** This file.

- [ ] **T04 — dates: one written form in, two visible forms out.**
      `lib/dates.ts` — `parseContentDate` at three precisions with its
      refusals, the two Polish month tables (genitive for a full date,
      nominative for a month standing alone), `formatDateProse`,
      `formatDateList`, `formatDateIso`. Nothing imports it yet.
      Check: `npm run build` passes — the file is type-checked.

- [ ] **T05 — links, as functions.**
      `lib/links.ts` minus the plugin: `classifyLink` and the site's own
      routes, the external anchor's attributes, `parseTimestamp`, `deepLink`
      and its host table, `resolveInternalLinks`. Still nothing imports it.
      Check: `npm run build` passes.

- [ ] **T06 — the link plugin.**
      `rehypeLinks` joins `lib/links.ts`: it classifies every anchor, refuses
      what is neither internal nor `http(s)`, and collects the internal ones
      with their line. Not yet wired.
      Check: `npm run build` passes.

- [ ] **T07 — the element plugin, and every refusal it makes.**
      `lib/blocks.ts`: the six element names, the attribute contract of plan
      §4.2, the fixed Polish of §4.4, and every refusal of §4.3 — an unknown
      attribute, a missing required one, an inline placement, an entry outside
      its list, a list holding something that is not an entry, a note written
      as a block, a kind that is not one of the four, a date that is not a
      date, a timestamp on a host the build cannot address. Not yet wired.
      Check: `npm run build` passes (the file is type-checked; nothing imports
      it yet).

- [ ] **T08 — wire the pipeline.**
      `lib/content.ts`: the two new collectors through `buildMdxOptions`, the
      six element names and `a` bound in `mdxComponents`, `frontmatterLineOffset`
      and the collected problems raised as `path:line:` in `compile`, the links
      carried out of `readModule` and `listLessons` **before the publish
      filter**, resolved once at the end of `getCourse`, and `compileProse`
      resolving its own against the same course.
      Check: `npm run build` passes; the emitted route list is identical to the
      baseline; a built lesson page carries the external treatment on external
      anchors and nothing on internal ones; and the **line offset is proved end
      to end** — one refusable element staged at a known line, the reported
      line read against the editor's, reverted before the commit.
      (Criteria 1, 12, 13, 16.)

- [ ] **T09 — the components and the treatment.**
      `components/prose-link.tsx`, `quote.tsx`, `figure.tsx`, `sources.tsx`,
      `further-reading.tsx` and their three stylesheets; the four edits to
      `app/prose.css`. Nothing writes an element yet, so the corpus is
      unchanged apart from T08's link treatment.
      Check: `npm run build` passes with Check B scanning the new stylesheets
      and Check E's report unchanged.

- [ ] **T10 — the permanent specimens.**
      `app/styleguide/page.tsx` gains one section: every element and every
      variant of plan §7, compiled through `compileProse`.
      Check: the built page carries all eight specimens; both themes; 375 px
      with no horizontal scrollbar; each caption outside its drawing.
      (Criteria 2, 3, 4, 6, 9, 11, 17, 18, 19.)

- [ ] **T11 — the refusals and the corpus, staged and reverted.**
      Stage each refusal of plan §10 in a real lesson, read the message, revert
      it; prove an unwrapped diagram renders identically; prove the content
      tree is byte-for-byte what it was. Evidence into
      `specs/010-sources-and-figures/verification.md`.
      This task changes no source file; its commit carries the verification
      document only. (Criteria 5, 7, 8, 10, 12, 13, 14, 15, 16, 21.)

- [ ] **T12 — close the slice.**
      Fresh-context review of the diff against `spec.md` (criterion 22),
      `tasks.md` matching reality, and the final report naming the criteria
      left open for a human eye.

---

## Not closable by an agent

Named here so no box is checked for either. Both are the spec's *Needs a human
eye*:

- Whether a `Cytat` reads as a **quotation** rather than as a callout, and
  whether it is distinguishable at a glance from the blockquotes the lessons
  keep. Criteria 3, 18 and 19 pin what is measurable.
- Whether the external-link mark is **legible without being noisy** in a
  sources list of thirty entries, which is the density
  `od-podpowiedzi-do-agenta.mdx` actually has — visually, and for a reader
  hearing the hidden phrase once per link.
