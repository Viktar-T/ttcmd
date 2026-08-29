# spec.md — 004-lesson-typography

- **Slice:** 004
- **Status:** proposed, awaiting Viktar's approval
- **Date:** 2026-08-28
- **Depends on:** 003 (faces, tokens, themes), ADR-0003 (numbering is identity), ADR-0005 (typefaces), ADR-0007 (accent), `docs/design-reference.md`
- **Unblocks:** 005 (code blocks), and the navigation and contents-panel slices

---

## Why

There are six lessons written and they are unreadable in the way that matters:
nothing is wrong, and nothing is *shaped*. Slice 003 gave the site two faces,
two themes and a token set, and stopped exactly where it said it would — at the
door of the lesson page. A lesson today is a single stack of browser-default
blocks in the right fonts and the right colours, at whatever width the page
happens to be, with no rhythm between them and no header.

This is the slice the content has been waiting for, and the content is what
makes it urgent rather than cosmetic. These are not short pages. The shortest
written lesson runs to a hundred lines of source; the longest to two hundred.
They are read for twenty minutes at a stretch, on a school laptop in a lit room
and on a phone at home. At that length, spacing is not decoration — it is the
only thing telling a reader where a section ended.

Three things in the written lessons make this concrete, and each of them is a
defect on the live site right now.

**The quotations.** The lessons argue from cited sources, and the argument is
carried by other people's words: Karpathy on vibe coding, Willison correcting
him, Beck on the 90%, Osmani on the last 30%, Torvalds on the hype cycle. A
quotation is currently indistinguishable from the paragraph above it except by
a small indent. A student skimming for "what did Willison actually say" has
nothing to skim for. This is the most-used construct in the content after the
paragraph, and it is the one with no treatment at all.

**The measure.** The reading column is at a width nobody chose — it is the
value the skeleton was scaffolded with, inherited through two slices. Polish
prose sets longer than English at the same point size, and these paragraphs are
dense. A line length that is merely plausible is not good enough for the amount
of reading this course asks for.

**The header.** ADR-0003 makes a lesson's letter identity, derived from `order`
and never stored by hand. Nothing on the page shows it. A lesson page cannot
currently answer "which lesson is this" — and the circled letter is, per the
design reference, one of the two signature elements that carry most of the
site's character for almost no cost.

There is also a sequencing argument. The contents panel, the breadcrumbs and
prev/next all attach to a lesson page that does not yet have a settled reading
column. Building navigation around an unsettled measure means opening it again.

## What

### 1. The reading column

Prose is set at a **measure chosen for reading**, not inherited: roughly sixty
to seventy-five characters of Polish body text per line at desktop widths.

The measure is a property of **the prose column**, not of the page. The design
reference puts a contents panel to the left of the prose on a lesson page; that
panel is not this slice's, but the column must already be the kind of thing that
can have something beside it without the measure changing.

Below the measure, on a phone, the column is the viewport minus its margins, and
nothing in a lesson widens the page horizontally.

**Wide blocks are exempt.** The lessons already contain diagrams that are wider
than a comfortable measure and carry small labels inside them. Squeezing those
into the prose column takes their labels below legibility, so a block of that
kind may use the full content width while the prose does not. Their internal
typography is not this slice's business; their behaviour in the flow is.

### 2. Rhythm

Spacing is a system, not a set of margins chosen per element.

The rule that matters is that **a heading belongs to what follows it**: the
space above a heading is visibly larger than the space below it, so a section
break reads as a break and a heading reads as attached to its own text. Every
other gap in a lesson is smaller than that one.

Every block a lesson can produce takes part: paragraphs, headings, lists,
quotations, tables, diagrams, and the code blocks slice 005 will style. No two
adjacent blocks touch, and no sequence produces a doubled or collapsed gap —
including the sequences the written lessons actually contain, which are the ones
worth checking: a list directly after a paragraph, a heading directly after a
list, a quotation directly after a paragraph, and a quotation ending a section.

### 3. Headings

Monospace, per the design reference's central rule, which slice 003 already
established as a default on plain elements. This slice gives them size, weight,
colour and spacing.

The written lessons use two levels beneath the title, and one of them contains
inline code in the heading text itself — a section named after the command it
teaches. Two consequences:

- **The heading levels are distinguishable when both are on screen**, and not by
  size alone at a difference a reader has to measure.
- **Inline code inside a heading is heading-sized.** It takes its size and
  colour from where it sits, not from a fixed inline-code treatment; a section
  title must not visibly shrink because it is named after a command.

The treatment covers the levels below the ones the content currently uses, so
that a lesson adding a level gets typography rather than browser defaults.

### 4. Quotations

Blockquotes in these lessons are **quotations and cited claims — never
callouts**, and the treatment must make that legible. They carry the voices the
lessons argue with, and they are used at length: single sentences, five-line
passages, and multi-paragraph quotations.

- Set apart by **a rule and by space**. No fill, no icon, no coloured
  background, no label. Nothing that reads as a warning, a note, or a box.
- Set in **the reading face, upright, at body size**. Long Polish passages in
  italic are harder to read than the prose around them, and these passages are
  long.
- **Quoted text meets the same contrast floor as body prose.** A quotation is
  read, not glanced at; it is not permitted to be the muted variant of anything.
- Multi-paragraph quotations hold together as one quotation — the gap between
  paragraphs inside a quotation is smaller than the gap between the quotation
  and the prose around it.

Several quotations end with an attribution line beginning with an em dash. That
line stays an ordinary paragraph of the quotation; the em dash and the linked
date do the work. Nothing in plain Markdown distinguishes it from a final
paragraph of quoted text, and the lessons contain both.

The callout treatment the design reference lists as a component — note, warning,
gotcha — is a different thing, uses a different colour set that ADR-0007 leaves
indicative, and is not this slice.

### 5. Lists

Both kinds, used heavily and in two distinct ways: as short bulleted runs with a
bold lead-in, and as numbered exercise lists whose items run to three or four
wrapped lines.

- **A wrapped item hangs**: continuation lines align to the item's text, not to
  its marker, so a four-line exercise reads as one item.
- Markers are set in the reading face alongside the prose they belong to.
- The gap between items is smaller than the gap between the list and the
  surrounding prose, so a list reads as one object.

### 6. Tables

One table exists in the written lessons, and it has an empty first header cell —
a shape that breaks any treatment assuming a header row is a filled band.

A table is legible as a grid: the header distinguishable from the body, cells
with room to breathe, rules from the token bound for the purpose. At a phone
width it **scrolls within its own bounds** rather than widening the page — the
same rule the design reference sets for code blocks.

### 7. Inline links and inline code

**Links in prose are identifiable without colour.** Colour alone excludes
readers who cannot see it and readers on a bad projector, both of which describe
this classroom. They carry the accent's line role, which slice 003 already
resolved per theme.

The Polish-specific trap here is the underline. **`ą` and `ę` carry an ogonek
below the baseline**, and a tight underline runs straight through it — on a page
where those two letters appear in nearly every sentence, and inside link text
often enough to matter. The underline must clear the descender.

**Inline code keeps the monospace face and no box**, per the design reference,
and per what slice 003 already set. What this slice settles is that its size and
colour are relative to its context (§3), and that a run of identifiers in a
paragraph still reads as a paragraph.

The source lists at the foot of every lesson are lists of links, one per item.
They get the ordinary link treatment. Plain Markdown offers nothing that marks a
source list as different from any other list, and inventing a marker means
inventing a component.

### 8. The lesson header

The circled letter, per the design reference: **the lesson's letter inside a
thin accent circle, followed by the title in large monospace.**

- **The letter is derived from `order`** — Article VI and ADR-0003, which make
  this identity rather than presentation. It is derived, never stored, and never
  taken from the lesson's position in a list. The one lesson written in module 0
  has `order: 3` and is therefore **c**, on a page where a and b do not yet
  exist. A header that shows **a** is wrong, and this is the check that catches
  it.
- **Titles wrap.** Both of the longest written titles wrap at the measure and at
  phone width. The circle stays aligned to the first line — it does not centre
  itself against a two-line title, and it does not push the title off the page
  on a phone.
- The title is the page's one first-level heading.

Every lesson carries a `summary` in its frontmatter, written as a one-line
abstract. It is rendered beneath the header as a **standfirst** — visibly not
the first paragraph of the lesson, since in every written lesson the real first
paragraph says something else.

The accent band the design reference puts above a lesson header carries the
breadcrumb, and the breadcrumb is not this slice's. The band arrives with it.

### 9. Where it is checked

**The written lessons are the test**, as in slice 003: the treatment attaches to
plain elements, so every lesson under `content/moduly/` picks it up untouched.
That is the point of the slice and the condition it is done against.

The **reference page** gains a specimen of every construct this slice styles —
each heading level, a bulleted and a numbered list with wrapped items, a
single-paragraph and a multi-paragraph quotation with an attribution line, a
table with an empty header cell, a link inside a Polish sentence containing `ą`
and `ę`, and inline code in prose and in a heading. Six lessons do not cover
this: there is exactly one table on the entire site, and no lesson contains
every construct. The page is permanent, for the same reason 003 made it
permanent.

Module overview pages are prose in the same plain elements and will inherit the
treatment. That is intended. Their own composition is not this slice's.

## Out of scope

Refused deliberately, not forgotten:

- **Code blocks** — background, syntax highlighting, the copy control, filename
  headers, line highlighting, horizontal scroll inside the block. Slice 005.
  This slice gives a code block its place in the vertical rhythm and nothing else.
- **Navigation, the header bar, breadcrumbs, the accent band, the contents
  panel, prev/next, back-to-top.** The measure is chosen so the panel can arrive
  beside it; the panel itself is a later slice.
- **Every MDX component** — `Zadanie`, `Uwaga`, `Cele`, `Prompt`, image and
  caption. No written lesson uses one. The exercises in the lessons are ordinary
  numbered lists and are styled as ordinary numbered lists.
- **Exercise numbering.** The lessons deliberately leave numbers unassigned
  (ADR-0003, continuous across a module). This slice does not assign them.
- **Content.** No lesson text changes. The lessons are the test subject.
- **The internals of the diagrams** already in the lessons — their labels, sizes
  and colours. Only their behaviour in the flow is settled here.
- **The semantic callout colours**, still indicative in ADR-0007.
- **New colour.** Every colour used is a token that already exists.
- **The chevron geometry and the doubled frames.** Later slices.

## Acceptance criteria

Observable conditions. Each is checked and the check's output is the evidence.

1. `npm run build` succeeds.
2. The colour-literal guard from slice 003 still passes: searching the styling
   sources for colour literals returns only the token definitions and any
   already-recorded exemption. This slice introduces no new hue.
3. Every lesson under `content/moduly/` renders with the treatment applied and
   with no element left at a browser default, in both themes, without any lesson
   file being edited. The diff contains no change under `content/`.
4. A line of Polish body prose in the reading column holds between 60 and 75
   characters at a desktop width. Counted on a rendered lesson, not computed
   from a font metric.
5. On a rendered lesson, the space above a heading is visibly larger than the
   space below it, and no other block gap on the page exceeds it.
6. Each of these sequences, taken from the written lessons, renders with no
   doubled and no collapsed gap: paragraph → list, list → heading, paragraph →
   quotation, quotation → heading, paragraph → diagram, diagram → paragraph.
7. The two heading levels used by the lessons are distinguishable when both are
   on screen at once.
8. In the heading that is named after a command, the inline code is the same
   size as the rest of the heading and not visibly muted against it.
9. A quotation is distinguishable from the prose around it at a glance, carries
   no fill, no icon and no label, and reads as a quotation rather than as a
   warning. Checked on the Karpathy, Willison, Beck, Osmani and Torvalds
   quotations, and on the two-paragraph rule at the end of the vibe-coding
   lesson.
10. Quoted text meets the same contrast ratio floor as body prose — ≥ 4.5:1 — in
    both themes, computed and recorded.
11. In a multi-paragraph quotation, the gap between its paragraphs is smaller
    than the gap between the quotation and the prose around it.
12. A numbered exercise item that wraps to three or more lines has its
    continuation lines aligned to the item's text, not to its number.
13. The table renders as a grid with its empty first header cell intact, and at
    a 375px viewport it scrolls within its own bounds while the page itself does
    not scroll horizontally.
14. Links in prose are identifiable as links with colour removed from the page.
15. A link whose text contains `ą` or `ę` renders with the underline clear of
    the ogonek, at body size, in both themes. A sentence containing both is on
    the reference page for this purpose.
16. Bold text in body prose is distinguishable from regular text in both themes,
    and on the dark theme does not bloom into a smear. Judged on a rendered
    paragraph of real Polish prose — the lessons are dense with bold — not from
    the weight value.
17. The lesson header shows the letter derived from `order`: the single written
    lesson of module 0 shows **c**, not **a**.
18. With a title long enough to wrap — both of the longest written titles
    qualify — the circle stays aligned to the first line at the measure and at a
    375px viewport, and nothing overflows horizontally.
19. The lesson's `summary` renders as a standfirst, visibly distinct from the
    first body paragraph.
20. Every lesson is legible end to end at a 375px viewport in both themes: no
    horizontal page scroll, no overlap, no text at a size that has to be zoomed.
21. The reference page carries a specimen of every construct listed in §9, and
    the specimens change with the theme.
22. The fresh-context review reports no gap against these criteria, and nothing
    outside this slice's scope was touched — in particular no lesson content, no
    navigation, no MDX component, and no code-block styling beyond its place in
    the rhythm.

## Decisions taken

Per AGENTS.md §4. One line each, naming what was rejected.

1. **The measure is specified as a character count, not a width.** Rejected:
   keeping the inherited fixed width, which is a number nobody chose and which
   was never checked against Polish prose.
2. **Wide blocks — the diagrams already in the lessons — may exceed the prose
   measure and use the full content width.** Rejected: constraining them to the
   measure, which scales their internal labels below legibility.
3. **Quotations are set upright, at body size, in the reading face, marked by a
   rule and space alone.** Rejected: italics (long Polish passages read worse),
   and any fill, tint or icon (that is the callout treatment, and these are not
   callouts).
4. **Quoted text is held to the body contrast floor, not the muted one.**
   Rejected: setting quotations in muted text, which is the conventional
   treatment and which makes a five-line quotation harder to read than the prose
   quoting it.
5. **The attribution line stays an ordinary paragraph inside the quotation.**
   Rejected: styling the last paragraph of a quotation as attribution — it
   misfires on the quotations whose last paragraph is quoted text, and the
   lessons contain both shapes.
6. **Inline code takes its size and colour from its context.** Rejected: one
   fixed inline-code size and colour, which shrinks and mutes a section heading
   named after the command it teaches.
7. **Links in source lists get the ordinary prose link treatment.** Rejected: a
   quieter treatment for lists of links — plain Markdown gives nothing to
   distinguish a source list by, and inventing a marker means inventing a
   component this slice has ruled out.
8. **Links are underlined, with the underline cleared of the ogonek on `ą` and
   `ę`.** Rejected: colour-only links (fail without colour perception, and on a
   washed-out projector), and a default underline (it strikes through the two
   most common Polish diacritics).
9. **List markers are set in the reading face.** Rejected: monospace markers as
   "structure" — at body size, mono digits beside sans text read as a defect
   rather than as a system.
10. **Tables scroll within their own bounds at narrow widths.** Rejected:
    reflowing into stacked cards, which needs per-cell header labels that the
    Markdown does not carry.
11. **The lesson `summary` is rendered as a standfirst.** Rejected: dropping it
    from the page (it is written for every lesson and reads as an abstract), and
    leaving it as an ordinary paragraph (it then reads as the lesson's opening
    sentence, which it is not).
12. **Heading treatment is defined below the levels the content currently
    uses.** Rejected: styling only the two levels in use, which leaves the next
    lesson needing a third at browser defaults with no build failure to say so.
13. **The Cyrillic book title in two source lists is left to the system
    fallback.** Rejected: loading a Cyrillic subset of either face, for every
    visitor on every page, in order to set two phrases; it renders as readable
    text rather than tofu, and Article III's requirement is about Polish.
14. **The reference page is extended with a specimen of every construct.**
    Rejected: relying on the six lessons alone as evidence — only one table
    exists on the whole site, and no single lesson contains every construct.

## Notes for the reviewer

- **The one thing this slice must not get wrong is the letter.** Criterion 17
  looks trivial and is the criterion most likely to fail: module 0's only lesson
  is `order: 3`, so anything that numbers lessons by their position in a list
  produces **a** and contradicts ADR-0003. It is written as a criterion rather
  than left to review for that reason.
- **The measure will be looked at again by the contents-panel slice.** It is
  specified here as a property of the prose column so that the panel does not
  reopen it, but a two-column layout is where that claim is actually tested.
- The written lessons contain a few mismatched Polish quotation marks — `„`
  opened and `"` closed. That is a content fix, in the content lane (Article
  IX), and this slice deliberately does not make it.
- Criteria 9, 14, 15, 16 and 20 are judgements made by looking at a rendered
  page, not ratios. Slice 003 set the precedent with its own criterion 11: the
  arithmetic passing is not the same as the page reading well, and where that is
  the case the judgement is recorded rather than skipped.
