# spec.md — 014-module-contents

- **Slice:** 014
- **Status:** written in an autonomous run (AGENTS.md §2, "Two modes") —
  unapproved by construction. Two things in it are Viktar's, marked as his in
  `## Decisions taken`: that the module's introduction appears in the list on
  both kinds of page, and the Polish word „Wstęp". Everything else is decided
  here and reviewed afterwards from that section and the final report.
- **Date:** 2026-09-01
- **Depends on:** 007 (the contents itself — the list, its two housings, the
  dead-panel rule, the skip control, the scroll-spy, the anchors), 011 (the
  two-column arrangement and the geometry it fixed), 012 (the one left edge,
  and the inset that already reserves the contents column's width on every page
  that is not a lesson), ADR-0003 (identity and numbering), constitution
  Articles III (ASCII identifiers), VI (module → lesson), VIII (server-rendered
  by default) and IX
- **Unblocks:** nothing structurally. It closes the hole 012 opened.

---

## Why

**The module page holds a column open and puts nothing in it, and the contents
never names the one text that says what a module is for.**

Since slice 012 every page that is not a lesson begins its content 408 px in,
because that is where a lesson's article begins and the site has one left edge.
On a lesson page the 408 px to the left of that edge is the contents. On the
module page it is empty. The page reads as a lesson page with the contents torn
out.

What the module page offers instead is three one-way doors: the breadcrumb up,
a chevron row down into one lesson, the pager sideways to the next module. None
of them shows the module as a whole. Its lessons carry six to ten top-level
sections each, and not one of those is visible until the reader is already
inside the lesson that holds it — so the page that exists to answer *what is in
this module* is the one page in the module that cannot say.

The contents has the matching hole, pointing the other way. It lists every
other lesson of the module and never the module's own introduction. Moduł 1's
introduction is 330 words in six paragraphs — the only text that says what the
module is for, in what order its lessons come and why that order — and from
inside a lesson it is reachable only by climbing a breadcrumb that gives no
hint a text is waiting up there. Named and put first in the list, it stops
being the page the reader came in through and becomes a place in the module.

Both holes close with one move, and that is the point of the slice: **one list,
in the two housings it already has, on both kinds of page.** A second list
built for the module page would answer the same question in a second voice and
drift from the first the day either is edited.

## What

### 1. The module page carries the contents

The module page shows **the same contents a lesson page shows**, in the same
two housings: the panel where the viewport is wide enough for two columns, and
the collapsed disclosure below that width. Same entries, same rows, same
states, same landmark name, same behaviour — including the panel's own
scrollbar, the current entry, the skip control and the scroll-spy.

Nothing about the panel is redesigned for this page. If it looks different
here, that is a defect.

### 2. The list opens with the module's introduction

The list gains **one new entry, first, named „Wstęp"**: the module's
introduction, which is the text the module page already renders.

- **On the module page it is the current entry** — not a link, marked as the
  current location for assistive technology, and expanded in place — exactly as
  the current lesson is on a lesson page.
- **From every lesson of the module it is a link** back to the module page.
- Everything after it is what the list already was: the module's lessons in
  `order`, each carrying its identity string and its title, the entry the
  reader is on expanded to its top-level sections.

**„Wstęp" is not a lesson and wears no lesson's letter.** A letter is identity
(ADR-0003) and `1a` is a string a real lesson may claim later; minting one for
a text that is not a lesson would put two different things under one address.
The entry carries **its Polish name and nothing else** — no letter, no number,
no symbol standing where a letter would.

### 3. „Wstęp" expands the way a lesson does

The module's introduction is written in the same Markdown a lesson is, and a
top-level section in it is already given the same addressable identifier a
lesson's section gets — derived, checked, and failing the build the same way
(007 §1). What has never happened is anything **reading** those sections: they
are collected when the introduction is compiled and thrown away.

So: **when „Wstęp" is the current entry and the introduction has top-level
sections, it expands to them**, one entry per section, linking to the same
anchors, exactly as a lesson does. **No introduction has one today**, and while
that is true the entry is a single row with nothing beneath it — which is what
a lesson row with no sections already is.

This is a rule, not a feature: it is what stops the day an introduction grows a
heading from being the day the list quietly disagrees with the page.

**No introduction is edited to give the entry something to expand.** The
content lane is not this slice's (Article IX).

### 4. The module page's left edge does not move

The module page's content begins where it begins today, to the pixel, at every
viewport width: the fixed inset slice 012 derived, which is exactly the page
margin plus the contents column plus the gap between them. A page that gains a
real contents column **and** keeps that inset would land its text 408 px right
of every other page on the site — the precise failure slice 012 exists to
prevent.

The two columns therefore relate to each other on the module page exactly as
they do on a lesson page: contents at the page margin, the module's own text in
the column beginning at the inset, the leftover width falling on the right.
Every other box on the page — the site header, the accent band, the breadcrumb,
the module's title and introduction, the lesson rows, the pager — keeps the
position and the width it has today, at every width checked.

Below the fold nothing changes at all: one column, the disclosure collapsed
between the breadcrumb and the module's text, and no horizontal scrollbar
anywhere.

### 5. What the skip control skips, and where focus lands

The panel's first focusable is the skip control, because the panel stands
between the breadcrumb and the page's text and can hold twenty-plus links
(007 §7). On a lesson page it moves focus to the article.

On the module page there is no article. It moves focus to **the block that
begins the module's own text — its title and its introduction** — which is the
first thing after the contents in reading order and the text the reader came
for. Focus lands there and is not visibly ringed, the same treatment the
article gets: it is a programmatic target, not a tab stop.

Skipping to the lesson list instead is rejected in the decisions below: it
would jump the reader over the very text this slice exists to make reachable.

### 6. Opening the module page must not push its introduction down

007's rule, on a new page: the disclosure is **collapsed by default**, so below
the fold the module page gains one row of furniture between the breadcrumb and
the module's title — not a screenful. It sits above that title, so that opening
it pushes the text down rather than appearing under text the reader has already
scrolled past.

### 7. The chevron lesson rows stay

The module page's chevron rows now say, below the introduction, what the panel
says beside it. **They stay**, and the reason is the disclosure: below the fold
the contents is collapsed by default, so the chevron rows are the module page's
only always-visible way into a lesson, and that is the width where most of the
duplication would be. Above the fold the duplication is the same one a lesson
page already carries between its panel and its pager — a list you navigate
with, and the page's own content, which happen to name the same lessons.

They are also the module page's content rather than its furniture: the panel is
how you leave this page, the rows are what this page is about.

### 8. A module with an introduction and no published lesson

007's dead-panel rule — *a housing that would contain no link at all is omitted
rather than rendered as a single dead row* — meets a case it was not written
for. Generalised, not re-decided: **a housing renders when its list holds at
least one link.**

On the module page of a module whose lessons are all unpublished, and whose
introduction has no sections, the list would be the current entry alone: no
link, so no panel and no disclosure, and the page is what it is today. Give
that introduction a section and the housings appear, because now there is
somewhere to go.

A consequence worth stating: on a **lesson** page the list now always holds at
least one link, because „Wstęp" is one. The single-lesson module whose panel
007 was willing to omit gets a panel.

### 9. Nothing here changes how the site looks

Beyond a panel arriving on a page that has been holding its column open since
slice 012:

- No new colour, type size, spacing value or rule value. No token moves.
- The lesson page changes in exactly one visible way: its list has one more row
  at the top.
- The reference page shows what the site really renders, including the new
  entry and its current state — a reference that lies about the list is worse
  than no reference.
- No backend, no dependency, no new network request, and no client-side
  behaviour that did not already exist. The list and both housings are
  server-rendered, and with scripting absent every link in them still navigates
  and the disclosure still opens.

## Out of scope

Refused deliberately, not forgotten:

- **Search.** Slice 015.
- **The module grid and the home page.** They keep the empty strip slice 012
  left them; filling it is not this slice's decision to make either.
- **Any change to the lesson page other than the one new entry in its list.**
- **Content.** No introduction and no lesson is edited — in particular, none is
  given headings so that „Wstęp" has something to expand.
- **A footer, header links, new components.**
- **The back-to-top control on the module page.** 007 put it on lesson pages
  only and said why — module pages are two screens — and its absence there is
  one of that slice's own criteria. Adding the contents does not lengthen the
  page.
- **Re-opening the fold, the measure, the wide lane, the inset, the palette or
  any rule value.**
- **The shrinking logo and the persistent logo mark**, unscheduled since 006
  pointed at them.

## Acceptance criteria

Observable conditions. Each is checked and the check's output is the evidence.
Measurements are taken from a rendered page in a real browser, with the same
instrument before and after.

1. `npm run build` succeeds, the colour-literal guard passes, and the contrast
   report prints the same ratios as before this slice. `npm run lint` is clean.
2. **The module page's left edge did not move.** At 1280 px and at 1585 px, on
   both modules' pages, the module's text block, the lesson rows and the pager
   measure the same `left / width` they measured before this slice, and the
   site header and the accent band do too.
3. **The module page is two columns.** At 1280 px and at 1585 px the contents
   column's right edge is at or left of the module column's left edge, their
   vertical extents overlap, the contents column begins at the page margin and
   is the same width it is on a lesson page, and its top edge is level with the
   top of the module's text block within 1 px.
4. **The list opens with „Wstęp", everywhere.** Read from the rendered markup
   of both modules' pages and of a lesson in each module: the first entry of
   both housings is „Wstęp"; it carries no letter, no number and no symbol in
   the place a lesson row carries its identity string; every lesson of the
   module follows it in `order` with identity string and title.
5. **It is the current entry on the module page and a link from a lesson.** On
   the module page „Wstęp" is not a link and is marked as the current location
   for assistive technology; on every lesson page of the same module it is a
   link to that module page. Read from the rendered markup.
6. **The current lesson is still the current lesson.** On a lesson page the
   list is what 007 and 011 specified plus the new first entry: the current
   lesson's row not a link, expanded to one entry per top-level section in
   document order, every other lesson row and every section entry a link, the
   whole a navigation landmark named "Spis treści" distinct from the breadcrumb
   landmark.
7. **„Wstęp" expands when there is something to expand, and is a plain row when
   there is not.** With no introduction carrying a top-level heading, the entry
   renders as a single row with no list beneath it on both modules' pages. With
   a heading temporarily added to one introduction, the entry expands to it,
   the entry links to the identifier the heading carries in the page, and
   following it lands the heading below the top edge; the temporary heading is
   then reverted and `git status` confirms the content tree is untouched.
8. **The dead-panel rule holds in its new case.** With every lesson of a module
   temporarily unpublished and its introduction carrying no heading, that
   module's page renders neither housing — no single dead row — and the page is
   otherwise unchanged; reverted afterwards, with `git status` clean under
   `content/`.
9. **The skip control works on the module page.** The panel's first focusable
   is the skip control, hidden until focused; activating it moves focus to the
   block holding the module's title and introduction, and that block shows no
   focus ring. Tabbing on from there reaches the module's own text, not the
   pager.
10. **Below the fold.** At 1024 px, 768 px and 375 px, on both modules' pages:
    the contents column is absent, the collapsed disclosure titled "Spis treści"
    renders between the breadcrumb and the module's title, it opens and closes,
    and open it lists the same entries. Every other box measures what it
    measured before this slice, and no document has a horizontal scrollbar.
11. **No document has a horizontal scrollbar** at 320, 1279, 1281, 1585 and
    2560 px, on a module page, a lesson page, the module grid and the home page.
12. **The lesson page did not otherwise move.** Every box slice 012 recorded on
    a lesson page — contents column, lesson column, header, wide lane, measure,
    pager, contents top level with the header — measures the same at 1280 px and
    1585 px, and 007's behaviours still hold there: nothing highlighted at the
    top, the section that has passed the reading line highlighted and only it,
    the last section highlighted at the document's bottom, the panel's own
    scrollbar scrolling without moving the page, and the back-to-top control
    absent at the top and present after a viewport of scroll.
13. **Back-to-top is still absent on the module page**, at every width checked.
14. **With scripting disabled**, at 1280 px and at 375 px on a module page:
    „Wstęp" and every lesson link navigates, the disclosure opens and closes, no
    highlight appears, no back-to-top appears, and the console shows no errors.
15. **Both modules are checked, not one.** Every criterion above that names a
    module page is checked on Moduł 0 — a 49-word introduction and two lessons —
    and on Moduł 1 — 330 words and seven, eight entries in the list.
16. The reference page renders without error at 1280 px and 375 px, and its
    contents specimens show the list as the site now renders it, including
    „Wstęp" as a link and „Wstęp" as the current entry.
17. The slice's diff touches no file under `content/`, adds no dependency, and
    adds no network request to any page.
18. **Human eye, and therefore left unchecked by the run that builds it:**
    whether the module page and a lesson page now read as the same site — the
    contents on the left, the page's own text beside it, the pair aligned left.
19. The fresh-context review reports no gap against these criteria and nothing
    outside this slice's scope touched.

## Decisions taken

Per AGENTS.md §4. One line each, naming what was rejected.

1. **The module's introduction appears in the list, first, named „Wstęp", on
   both kinds of page.** *Viktar's call, not mine* — recorded here because it is
   the shape of the slice, not because it was open.
2. **One list serves both pages.** *Viktar's call.* Rejected: a second list
   built for the module page, which answers the same question in a second voice
   and drifts from the first the day either is edited.
3. **„Wstęp" carries no letter, no number and no symbol.** Rejected: minting an
   identity string for it, which collides with what a real lesson may claim
   (ADR-0003); and a placeholder glyph in the identity column, which is new
   visual furniture for a row that needs none — the word is the label.
4. **„Wstęp" expands to the introduction's top-level sections when it has any,
   and is a plain row while none does.** Rejected: never expanding it, which
   makes one entry in the list behave unlike every other and would silently
   disagree with the page the first time an introduction grows a heading; and
   giving an introduction a heading here so the expansion could be seen, which
   is the content lane (Article IX).
5. **The module page's two columns are the arrangement a lesson page already
   has, and its content column stays exactly where the frame's inset puts it.**
   Rejected: a column arrangement of its own, which is a second geometry to keep
   in step; and letting the page keep the frame's inset *and* gain a panel,
   which lands its text 408 px right of every other page — the failure 012
   exists to prevent.
6. **The wrapper that makes those two columns is renamed for what it now is — a
   page's two columns, not a lesson's.** Rejected: rendering a module page
   inside something called a lesson's column, which is a name that lies to the
   next reader; the rename changes no pixel on either page and is checked as
   such.
7. **The skip control moves focus to the module's title and introduction.**
   Rejected: the lesson list, which would jump the reader over the very text
   this slice makes reachable; and the pager, which is the page's exit.
8. **The disclosure sits above the module's title, collapsed.** Rejected:
   putting it below the introduction, where it would sit directly on top of the
   chevron rows that say the same thing; and splitting the title away from the
   introduction to slot the disclosure between them, which changes the module
   page's vertical rhythm — a thing this slice says it does not change.
9. **The chevron lesson rows stay.** Rejected: removing them now that the panel
   lists the same lessons — below the fold the disclosure is collapsed, so
   removing them would leave a phone reader of a module page with no visible way
   into a lesson at all.
10. **The scroll-spy runs on the module page too.** Rejected: leaving it to
    lesson pages, which makes one list behave differently depending on which
    page it is on — a difference nobody would notice until an introduction grew
    a heading. It is the behaviour that already exists, it renders nothing, and
    with no headings on the page it does nothing.
11. **Back-to-top stays off the module page.** Rejected: adding it for symmetry
    with the lesson page — 007 decided against it with a reason that has not
    changed, and its absence there is one of that slice's own criteria.
12. **The dead-panel rule is generalised, not re-decided: a housing renders when
    its list holds at least one link.** Rejected: a special case for the module
    page, and rendering a single dead „Wstęp" row on a module with nothing else
    in it.
13. **The introduction's sections are read from the same collection the lessons'
    are.** Rejected: a second scan of the introduction for the panel, which is
    two derivations of one fact that agree only until a heading contains markup
    — the reason 007 gave for doing it once.
14. **The reference page shows the new entry in both its states.** Rejected:
    leaving the specimens as they are, which turns the page whose job is to show
    what the site renders into a page that lies about it.
15. **Everything else 007 and 011 decided is re-verified, not re-argued** — the
    row states, the hyphen prefix, the inverted active entry, the height cap,
    the sticky offset, the reading line, the anchor landing offset, the fold.
    Rejected: re-deriving any of them for a page that renders the same list.

## Notes for the reviewer

- **The riskiest criterion is 2.** Everything else in this slice is additive.
  The module page's content column is moved out of the frame's content track and
  into a grid of its own that must reproduce it exactly, at five widths, above
  and below the fold. It is measured before and after with the same instrument,
  not eyeballed.
- **Criterion 7's second half is the only place a content file is touched**,
  temporarily and reverted, for the same reason 007's criterion 3 did it: the
  rule cannot be demonstrated on a corpus that does not exercise it.
- **Criterion 18 is yours.** Whether the two kinds of page now read as one site
  is a judgement about the look of the site, and the run that builds it cannot
  make it.
