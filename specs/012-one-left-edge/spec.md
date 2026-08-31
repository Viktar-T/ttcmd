# spec.md — 012-one-left-edge

- **Slice:** 012
- **Status:** written in an autonomous run (AGENTS.md §2, "Two modes") —
  unapproved by construction. Viktar answered two questions before it was
  written (below); everything else is decided here and reviewed afterwards from
  the `## Decisions taken` section and the final report.
- **Date:** 2026-08-31
- **Numbering note:** `docs/roadmap.md` reserves **012** for search. This slice
  took the next free directory number because slices are numbered and
  append-only (Article IX) and the work was asked for now. The roadmap's queue
  therefore needs renumbering — that is Viktar's file and this slice does not
  touch it.
- **Depends on:** 011 (the lesson page's two columns and the geometry they
  fixed), 006 (the page frame and the one left edge it established), 004 (the
  measure and the wide lane)
- **Amends in effect:** slice 011's **decision 10**, "Nothing happens to the
  module page, the module grid or the home page." Viktar overruled it after
  seeing the result. 011 is not rewritten; this file is the record.

---

## Why

**Slice 011 gave the site two left edges, and the wrong pages kept the old
one.**

A lesson page is now two columns anchored to the left: the contents at 32 px,
the article's column at 408 px, its prose at 464 px. Every other page — the
module page, the module grid, the home page — still centres its content in the
viewport, so at 1585 px their text starts at 473–480 px and at 1280 px at
320–328 px. The number moves with the window on those pages and does not on a
lesson.

The visible consequence is a jump. A student reads the module page's lesson
list, clicks a lesson, and the prose lands somewhere else — 144 px to the right
at 1280 px, 16 px to the left at 1585 px. Slice 006 built the whole site around
one left edge for exactly this reason, and 011 broke that for the pages it did
not touch rather than for the page it did.

This slice puts the edge back. **The content column of every page that is not a
lesson moves to where a lesson's article column is**, so the site has one left
edge again — at a fixed position rather than one that drifts with the viewport.

## What

### 1. One edge, and it does not move with the window

At the width where a lesson page becomes two columns, **every page's content
column starts at the same place a lesson's article column starts**: one page
margin, plus the contents column, plus the gap between them. Its width is the
content width the frame has always given it, and the measure sits centred
inside it exactly as it does today.

The consequence, and the point: the module page's lesson list, the module
grid's cards, the home page's hero and a lesson's prose all begin at the same
x, and that x is the same at 1280 px and at 2560 px. Opening a lesson from a
module page moves no text.

**Non-lesson pages therefore carry an empty strip on the left**, as wide as the
contents column a lesson fills. That is the cost, it was chosen over the
alternative — content flush at the page margin, which fills the page better and
makes the prose jump on every lesson click — and it is what keeps one edge.

### 2. What does not change

- **The site header and the accent band.** They keep the centred lane slice 006
  gave them, on every page, exactly as a lesson page shows them today. Making
  the other pages resemble the lesson page is the whole of this slice, and on a
  lesson page the chrome is centred.
- **The lesson page.** Every number slice 011 measured stays: contents column,
  article column, measure, wide lane, the panel's behaviour, all of it.
- **The measure and the wide lane**, on every page.
- **Below the fold.** One column, centred, unchanged at every width — the same
  boundary 011 and 007 use.
- **No content file, no dependency, no new colour, type size, spacing value or
  component.**

### 3. Where the geometry is written

The three lengths this depends on — the page margin, the contents column's
width, the gap between the columns — were introduced by slice 011 in the
contents stylesheet, because only the contents panel needed them. **They are
now the page frame's business as well**, and the frame must not reach into a
component's stylesheet for them. They move to the file that already holds the
measure and the content width, and the offset the frame uses is derived from
them there rather than written out a second time.

That is what makes "the same place a lesson's article column starts" a fact
about the code rather than two numbers that happen to agree today.

### 4. The pages this reaches

Every page rendered inside the frame: the home page, the module grid, the
module page, **and the reference page**, which is not student-facing but sits
in the same frame and moves with it. Stated rather than discovered.

## Out of scope

- **Search.** Still the roadmap's next content-driven slice, under whatever
  number it ends up with.
- **Moving the site header or the accent band**, which Viktar was asked about
  and declined.
- **Content changes, a footer, header links, new components.**
- **The empty strip on non-lesson pages.** Filling it — with anything — is a
  design decision nobody has made, and this slice does not invent one.
- **Re-opening the fold, the measure, the wide lane, the palette or any rule.**

## Acceptance criteria

Observable conditions, measured in a rendered page in a real browser.

1. `npm run build` succeeds and the contrast report is unchanged. `npm run
   lint` is clean.
2. At 1280 px and at 1585 px, on the module page, the module grid and the home
   page, the content column measures **408 / 736** and the block inside it
   **464 / 624** — the same two boxes a lesson page's article column and prose
   measure at both widths.
3. **The jump is gone.** The module page's lesson-list left edge equals the
   left edge of the prose on the lesson it links to, at both widths.
4. **The lesson page did not move.** Every box slice 011 recorded — contents
   column 32 / 352, lesson column 408 / 736, header 464 / 624, wide lane
   408 / 736, measure 464 / 624, pager 464 / 624, contents top level with the
   header — measures the same at both widths.
5. **The chrome did not move.** The site header's inner box and the accent
   band's inner box measure what they measured before this slice, on a lesson
   page, a module page, the module grid and the home page, at both widths.
6. Below the fold — 1024 px, 768 px, 375 px — every page measures exactly what
   it measured before this slice, and no document has a horizontal scrollbar.
7. No document has a horizontal scrollbar at 320, 1279, 1281, 1585 or 2560 px,
   on a lesson page, a module page, the module grid and the home page.
8. The reference page renders and its content moves with the frame.
9. The three lengths are declared **once**, in the file that holds the measure
   and the content width, and both the frame and the contents panel read them
   from there. No length is written twice.
10. The slice's diff touches no file under `content/`, adds no dependency and
    no network request.
11. **Human eye, left unchecked by the run that builds it:** whether a page
    with an empty strip where a lesson has its contents panel looks deliberate
    rather than broken.
12. The fresh-context review reports no gap against these criteria and nothing
    outside this slice's scope touched.

## Decisions taken

Per AGENTS.md §4. One line each, naming what was rejected.

1. **Non-lesson content aligns with a lesson's article column.** *Viktar's
   answer, not mine.* Rejected: content flush at the page margin, which fills
   those pages better but moves the prose 376 px on every lesson click.
2. **The site header and the accent band stay centred.** *Viktar's answer* —
   the other pages should resemble the lesson page, and on a lesson page the
   chrome is centred. Rejected: moving both to the page margin, which would fix
   the breadcrumb-over-title misalignment but change the look of every page.
3. **The offset is a fixed length, not a fraction of the viewport.** Rejected:
   keeping the leading track flexible and merely biasing it, which reproduces
   the drifting edge this slice exists to remove.
4. **The three lengths move to the token file and the frame's offset is derived
   from them.** Rejected: leaving them in the contents stylesheet and having
   the frame reach in — the offset is now a property of the page, not of the
   panel; and rejected writing the sum out as its own literal, which is the
   second copy that drifts.
5. **The change lives at the same fold slice 011 and 007 use.** Rejected: a
   fold of its own for the frame, which would give the site two breakpoints
   that mean nearly the same thing.
6. **The reference page moves with the frame.** Rejected: exempting it, which
   would make the page whose job is to show the site's geometry the one page
   that does not have it.
7. **The empty strip is left empty.** Rejected: filling it on non-lesson pages
   with a nav, a repeat of the module list, or anything else — no such thing
   has been specified, and inventing one here is a different slice.

## Notes for the reviewer

- **The riskiest criterion is 4.** This slice changes the frame that a lesson
  page's own grid deliberately bypasses. It should therefore be invisible on a
  lesson page — and that is measured, not assumed.
- **Criterion 11 is yours.** One left edge is bought with an empty column on
  three page types. Whether that reads as deliberate is a judgement about the
  look of the site.
