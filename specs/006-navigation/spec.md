# spec.md — 006-navigation

- **Slice:** 006
- **Status:** proposed, awaiting Viktar's approval
- **Date:** 2026-08-29
- **Depends on:** 003 (the tokens, the two themes, and the recorded debt that the
  theme control moves into a header when one exists), 004 (the reading column,
  the vertical rhythm, and the circled-letter lesson header), 005 (nothing, but
  it must not be disturbed), ADR-0003 (module numbers, lesson letters),
  ADR-0007 (the accent, and the two roles it plays), `docs/design-reference.md`
  §Structure, §Page composition and §Signature elements, constitution Article VI
- **Unblocks:** slice 007's contents panel, which needs a lesson to know its
  neighbours and a module to know its lessons; and every future lesson, which
  becomes reachable

---

## Why

**Today a student cannot get around this site, and the numbering the whole
course is spoken in is invisible.**

Both facts are literal. The landing page is a heading, two sentences and one
link. `/moduly` is an unstyled bulleted list of two titles. A module page is a
title and an unstyled bulleted list of its lessons. A lesson page ends — there
is nothing after the last paragraph, so the only way out of a lesson is the
browser's back button, and the only way from lesson 1a to lesson 1b is back,
then click.

That matters more here than on an ordinary site, because of how this material
is used. The instruction in a classroom is **"otwórzcie 1c"** — thirty people
have to land on the same page from a spoken string. ADR-0003 made that string
identity rather than presentation and forbade storing it by hand. Then it was
derived correctly, and never rendered: the letter appears in exactly one place
on the whole site, in the circle beside a lesson title, and the module number
appears nowhere at all. A student reading lesson `c` of module 0 has no way to
learn that it is called `0c`, which is the only name it has in class.

Three further things follow from the material that now exists.

**A module is a sequence, and the site does not say so.** Module 1's five
lessons are written to be read in order — `od-podpowiedzi-do-agenta` sets up
`co-model-naprawde-potrafi`, which sets up `vibe-coding-kontra-inzynieria`. A
lesson that does not name what comes next hides the sequence, and the reader has
to go back to a list to find out.

**Two module descriptions are written and nothing renders them.** Both
`index.mdx` files carry a real two-paragraph introduction to their module. It is
on nobody's screen. That is content already paid for and currently discarded.

**The eight-hour week is the deadline.** From 2026-09-01 this is used in class
every week. A site nobody can navigate is a site the teacher navigates out loud,
by dictating URLs.

There is also a debt that this slice is the one to pay. Slice 003 pinned the
theme control to the top-right corner of the viewport and wrote, in the file
itself, that the navigation slice moves it into a header. That is now not merely
tidiness: this slice puts an accent band across the top of module and lesson
pages, and a muted control with a near-invisible border sitting on top of that
band would be a control nobody can see. The band forces the move.

## What

### 1. The lettered scheme is visible, and it is one string

A lesson's public name is its **module number and its letter, together** —
`0c`, `1a`, `1e`. That string is derived, never stored: the number from the
module's folder prefix, the letter from the lesson's `order` (ADR-0003).

It appears wherever a lesson is referred to from outside itself: in the lesson
list on a module page, in the previous/next controls, and as the final step of
the breadcrumb on a lesson page. It is set in the monospace face, because on
this site monospace is what structure is set in.

**A module whose folder carries no number has no identity, and fails the
build**, naming the folder. Article VI derives the number from the prefix; a
folder that does not supply one cannot be rendered, and a module silently
appearing as *Moduł NaN* on a public page is the failure worth spending a build
error on.

**The circled letter beside a lesson title does not change.** It carries the
letter alone, as slice 004 built it, because the breadcrumb immediately above it
already says which module this is — and because a circle sized for one glyph is
the shape, not a container that happens to hold one today.

### 2. The band, and what it is for

Module and lesson pages open with a **full-width accent band carrying the
breadcrumb**.

It is a **stripe, not a panel**: tall enough for the breadcrumb and its
breathing room, and no taller. The design reference is explicit about why —
the reference site's band is ~450px because it is holding a commissioned
illustration, and copying that height without the drawing gives every lesson a
large empty coloured rectangle above it, pushing the lesson below the fold.

It reaches the edges of the viewport. A band inset to the reading width is a
card, and reads as one.

### 3. Chevron breadcrumbs

The signature element the design reference says carries most of the character:
**connected arrow-shaped segments, earlier steps outlined, the current step
filled**.

- On a module page: the module listing, then this module.
- On a lesson page: the module listing, then this module, then this lesson's
  identity string.

Short segments, deliberately. The breadcrumb has to fit on a phone at 375px
without wrapping into a stack, and the page's own heading is directly beneath it
carrying the full title — so a breadcrumb that repeats the title spends the
width twice.

The current step is not a link, and is announced as the current page to a screen
reader. Every step that is a link is reachable by keyboard **and shows a focus
indicator that is visible against the band** — which is not the same colour it
is visible against elsewhere on this site, and is the one detail here most
likely to be got wrong silently.

### 4. Previous and next

At the foot of every lesson: the previous lesson and the next lesson, each
named — its identity string and its title, not "Poprzednia" alone.

**The sequence does not stop at a module boundary.** The lesson before the first
lesson of module 1 is the last lesson of module 0, and it is offered as such,
with the module it belongs to named so that the crossing is visible rather than
surprising. At the two ends of the course there is nothing before or after, and
the control that would be empty is absent rather than disabled.

Module pages get the same treatment between modules.

This is what "move through a module without using the back button" means, and it
is the slice's own done-condition from the roadmap.

### 5. The lesson list on a module page

The module's lessons, in `order`, each row carrying its identity string and its
title, each row a link, in the **chevron row form** the design reference
describes — a pointed right edge, so the row reads as a step in a sequence
rather than as a bullet.

The rows are **not staggered in width**. That is the expensive half of the
chevron geometry and the half that buys the least: staggering makes a row's
clickable area depend on its position in the list, it has no meaning to read
off, and at a phone width the shortest row would be uncomfortably small. The
open question in `docs/design-reference.md` is answered here, in that direction,
and can be reopened by a later slice cheaply — the shape is one value.

The module's own written introduction is rendered above the list. It exists, in
`content/`, and nothing has ever shown it.

### 6. The module grid, without illustrations

The landing page carries the module grid, three across where there is room, one
across on a phone.

There are no illustrations and there will be none. **Typography and the accent
carry the card**: the module's number, large, in the accent colour, in the space
where the reference puts a drawing; the module's title beneath it; and one
quiet line of fact below that. The result is plainer than the reference. That is
the honest substitute the design reference asks for, and it is preferred to
filling the space badly.

The same grid is what `/moduly` shows, because it is the same question asked
twice and two different answers to it would be a defect.

The landing page also gets what the reference gives it: a headline, a short
description, and a bordered rectangular button into the course. **It says
nothing new about the school or the course.** The description already on the
page is the description that stays; Article V is not relaxed by a redesign.

### 7. A rule that carries meaning needs a value that can be seen

This is the constraint carried into this slice, and it is not a detail.

Slice 003 measured the existing rule token at **1.47:1 on the dark theme and
1.36:1 on the light one**, and recorded that this is legitimate only while a
rule is a decorative separator — WCAG 1.4.11 exempts those and requires 3:1 of
anything needed to identify a component or its state.

This slice makes rules structural. A card's frame is what says "this is one
card". A chevron row's outline is the row's boundary and its hit area. A
button's border is the only thing that makes it a button. Every one of those is
a component's identification, at 1.47:1, on a projector, in a lit classroom.

So: **a structural rule value that clears 3:1 against the page in both themes**,
recorded as an amendment to the accent-and-palette decision rather than
introduced quietly, and **checked by the build** rather than by remembering.
The existing decorative rule keeps its value and its uses; nothing in slice 003
or 004 is restyled.

The build gains a check that the contrast floors this repository has committed
to are actually true of the token file, in both themes, every time. Three slices
have now computed these ratios by hand into a verification document; a value can
be edited afterwards and no check would notice.

### 8. Where it is checked

**The written content is the test**, as in 003, 004 and 005: six lessons across
two modules, one of which has a single lesson sitting at `order: 3` — so the
module page must render `0c` where a list numbered by position would say `0a`,
and the lesson before `1a` must be `0c` and not "nothing". That module is the
whole cross-boundary case, and it exists by accident, which is the best kind.

The nav furniture is also put on the **reference page**, as 004 and 005 put
theirs there: a breadcrumb in both its states, a chevron row, a card, and the
previous/next pair. It is where the shapes get looked at without a lesson page's
content around them, and where a later slice finds out what it broke.

## Out of scope

Refused deliberately, not forgotten:

- **The in-lesson contents panel, the scroll-spy highlight, and back-to-top.**
  Slice 007, all of it. This slice touches nothing inside the article.
- **Search.** The roadmap puts it after ~15 lessons and there are six.
- **Every MDX component** — `Zadanie`, `Uwaga`, `Cele`, `Prompt`, image and
  caption. Unchanged from 004 and 005: no written lesson uses one.
- **Content.** No file under `content/` is edited. The module introductions are
  *rendered*, not written or changed.
- **The shrinking logo and the persistent logo mark** of the design reference's
  signature list. Both are scroll behaviour, and scroll behaviour is 007's, where
  the panel and back-to-top need the same machinery. A header that does not move
  is a header that cannot be wrong.
- **Per-page titles and descriptions, the sitemap, and anything a crawler
  reads.** Slice 010 owns those, deliberately last.
- **A "Zgłoś problem" link, a footer, a syllabus page, a week or schedule view.**
  The first is unscheduled; the last is gated on a timetable the school has not
  supplied (Article V).
- **Anything that models groups**, or shows a lesson's `week`. Article VI: both
  groups get identical content, and the timetable is not encoded anywhere.
- **A `publish` flag.** Slice 008. Every lesson that exists is listed.
- **Per-module accent colours.** ADR-0007 decided one accent site-wide and
  deferred this without refusing it; a grid of cards is exactly where it would be
  tempting to reopen it, and reopening it is an ADR, not a slice detail.
- **A module "last updated" line.** The design reference admires the reference
  site's *"Part updated on 17th January 2025"* with its list of changes. It needs
  a frontmatter field nothing carries, and a discipline nobody has agreed to
  maintain; Article VI already names git history as the record of what changed.
- **Changing slice 004's reading treatment or slice 005's code blocks.** The
  measure, the rhythm, the headings, the quotations, the tables, the links and
  the code surface are where they were left. That the page frame around them
  changes shape is precisely why this is a criterion and not an assumption.

## Acceptance criteria

Observable conditions. Each is checked and the check's output is the evidence.

1. `npm run build` succeeds, and no colour literal exists outside the token
   file — the build's own guard is the proof.
2. **The structural rule value clears 3:1 against the page background in both
   themes**, and the body, muted, link and accent-surface floors from slice 003
   still hold. Computed by the build from the token file, and its output shown.
3. Breaking any one of those floors **fails the build**, with a message naming
   the pair and the ratio. Shown by editing a token temporarily and reverting.
4. **A module folder without a numeric prefix fails the build**, naming the
   folder. Shown temporarily and reverted.
5. Every lesson's identity string is derived from the module's folder prefix and
   the lesson's `order`, never from its position in a list. Demonstrated on
   module 0, whose only lesson is at `order: 3` and must render as **`0c`** in
   the module list, in the breadcrumb and in the previous/next control.
6. From the landing page, **every lesson in the site is reachable by following
   links only** — landing → module → lesson — with no URL typed and no back
   button. Walked, and the path recorded.
7. From any lesson, the next lesson is reachable in one click, and so is the
   previous one; from the **first lesson of module 1** the previous control
   leads to **`0c`, in module 0**, and names the module it crosses into.
8. At the two ends of the course the control that would be empty is **absent**:
   the first lesson of module 0 offers no previous, the last lesson of the last
   module offers no next. Both checked on the rendered pages.
9. The breadcrumb renders as an ordered navigation landmark with an accessible
   name; the current step is **not a link** and is marked as the current page.
   Read from the rendered markup.
10. Every link in the band, in the lesson list, in the grid and in the
    previous/next controls is reachable by keyboard and shows a **focus
    indicator whose contrast against the surface it sits on is ≥ 3:1** —
    including on the accent band, where the site's usual focus colour is the
    band's own colour and would be invisible. Computed and printed for each
    surface.
11. The band spans the full width of the viewport, at 375px and at desktop, in
    both themes, while `document.documentElement.scrollWidth <= clientWidth`
    holds on every page of the site.
12. **Slice 004's reading treatment is unmoved**: the prose measure in Polish
    characters per line, and the computed gaps of the six adjacency sequences
    004 recorded, are re-measured and equal to its recorded numbers.
13. **Slice 005's code blocks are unmoved**: the nine blocks in the Git lesson
    still render on the code surface with their copy control, and the block's
    place in the rhythm is unchanged.
14. The theme control is **in the header, not pinned over the band**, and the
    theme still survives a reload and a navigation, in both directions, with no
    flash — slice 003's behaviour, re-checked because its housing changed.
15. The module grid renders with no illustration, no image request of any kind,
    and each card carrying the module number, the module title and one line of
    fact. Both modules, at three widths.
16. The landing page's button leads to the **first lesson of the first module**,
    and the link is derived rather than written down. Checked against the
    content on disk.
17. Both module introductions render on their module pages — the text from
    `content/`, unedited. `git diff` reports **no change under `content/`**.
18. Every chevron shape renders as a chevron in both themes, at 375px and at
    desktop, with its outline visible at the required contrast, and text inside
    it at ≥ 4.5:1 against its own fill.
19. A lesson title long enough to wrap does so inside its chevron row without
    the row losing its shape or the page gaining a horizontal scrollbar —
    checked with the longest written title, at 375px.
20. The reference page carries a specimen of each piece of navigation
    furniture: a breadcrumb with both segment states, a chevron row, a module
    card and a previous/next pair.
21. No page requests an image, a font beyond the two already loaded, or any
    third-party resource. Read off the network log, not asserted.
22. The fresh-context review reports no gap against these criteria, and nothing
    outside this slice's scope was touched — in particular no lesson content, no
    MDX component, no contents panel, no change to the code blocks, and no new
    dependency.

## Decisions taken

Per AGENTS.md §4. One line each, naming what was rejected.

1. **A lesson's public name is the module number and the letter together —
   `1b`.** Rejected: the letter alone outside the lesson page, which is what the
   reference site shows and which is ambiguous the moment a student writes it
   down away from the page it was read on.
2. **The circled letter in the lesson header is left exactly as slice 004 built
   it.** Rejected: putting `1b` in the circle, which changes a shape sized for
   one glyph and duplicates the module number the breadcrumb states two lines
   above.
3. **A module folder without a numeric prefix fails the build.** Rejected:
   falling back to the folder's position in the directory, which is the same
   class of mistake ADR-0003 forbids for lesson letters, and which would put
   *Moduł 1* on a folder called `appendix`.
4. **Modules are ordered by the number their prefix carries, not by the folder
   name as text.** Rejected: the alphabetical sort in place today, which is
   correct only while every prefix is two digits and puts module 10 before
   module 2 the day it is not.
5. **The band is a stripe carrying the breadcrumb and nothing else.** Rejected:
   the reference's tall panel, which without an illustration is a coloured void
   that pushes every lesson below the fold — the design reference says so in as
   many words.
6. **The module introduction sits below the band, in the reading column.**
   Rejected: putting it inside the band, which is what the reference does and
   which turns the stripe back into the panel decision 5 refuses.
7. **The breadcrumb's steps are short — the listing, `Moduł N`, and the
   lesson's identity string.** Rejected: repeating the module title and the
   lesson title in the trail, which wraps to three lines on a phone and repeats
   the heading sitting directly beneath it.
8. **The breadcrumb's first step is the module listing, not the site's home.**
   Rejected: a home step, which duplicates the wordmark that is already a link
   home two centimetres above it.
9. **A site header exists, holding the wordmark and the theme control.**
   Rejected: leaving the control pinned over the viewport corner — where the
   band now is, wearing colours chosen against the page background, which is the
   debt slice 003 wrote into the file itself.
10. **The header does not move, shrink or stick.** Rejected: the reference's
    shrinking logo and pinned logo mark, which are scroll behaviour and belong
    with the contents panel and back-to-top that need the same machinery.
11. **The chevron is built for real — a clipped shape with a visible outline —
    for both the breadcrumb and the lesson rows.** Rejected: a chevron
    *character* between plain text steps, which is the ordinary breadcrumb every
    site has and throws away the one signature element the design reference says
    carries most of the character.
12. **The lesson rows are full width, not staggered.** Rejected: the reference's
    staggered widths — the expensive half of the geometry, with nothing to read
    off it, and a hit area that would vary with a row's position.
13. **A chevron row is outlined at rest and fills with the accent on hover and
    on focus.** Rejected: filling every row with the accent at rest, which
    floods a module page with the one colour reserved for pointing at things and
    leaves nothing for an active state to say.
14. **Previous/next are rectangular, not chevrons pointing outward.** Rejected:
    mirrored chevrons, which read as a pagination widget rather than as two
    named links, and which need the geometry mirrored for one appearance.
15. **The sequence crosses module boundaries, and names the module it crosses
    into.** Rejected: stopping at the module edge, which leaves the last lesson
    of a module a dead end and makes the course feel like disconnected folders.
16. **A control that would be empty is absent, not disabled.** Rejected: a
    greyed-out control, which is a thing to read, tab to and wonder about, at
    exactly the two places in the site where there is nothing to say.
17. **The module card is a large accent numeral, the module title, and the
    lesson count.** Rejected: a generated illustration or an abstract graphic —
    the design reference forbids filler outright — and an empty tile where the
    drawing would be.
18. **The lesson count is written in correct Polish, with the three plural
    forms.** Rejected: `Lekcje: 5`, which sidesteps the grammar and reads as a
    database field on a page that is otherwise written in sentences.
19. **The doubled frame is drawn on the cards only.** Rejected: putting it on
    the button too, as the design reference does, where an offset second frame
    on a control two lines tall reads as a rendering artefact.
20. **`/moduly` shows the same grid as the landing page.** Rejected: leaving it
    the unstyled list it is today, which is the page the breadcrumb's first step
    leads to and would be the one broken page left on the site.
21. **The landing page's button leads to the first lesson of the first module,
    derived from the content.** Rejected: a hand-written link, which is a URL in
    a component that goes stale the day a module is inserted before it.
22. **The landing page's existing description is kept verbatim.** Rejected:
    writing a new headline about the course or the school — Article V, and the
    `TO CONFIRM` markers are not mine to resolve.
23. **A new structural rule value at ≥ 3:1 in both themes, recorded as an ADR
    amending ADR-0007.** Rejected: reusing the decorative rule at 1.47:1 (the
    thing the roadmap's constraint exists to forbid), and raising the decorative
    rule itself, which would restyle every hairline slices 003, 004 and 005
    already placed and measured.
24. **One value serves both themes for that rule.** Rejected: a light and a dark
    value, which is two things to keep in step for a mid-grey that already clears
    the floor against a near-black page and a near-white one alike.
25. **The build computes the contrast floors from the token file, every time.**
    Rejected: leaving them in three verification documents, where they are true
    of the day they were written and of nothing afterwards.
26. **The focus indicator changes colour on the accent band.** Rejected: one
    focus colour everywhere, which on this palette is the band's own colour and
    therefore no indicator at all — the exact failure that passes every review
    carried out with a mouse.
27. **The page frame gains a full-width lane, and the reading column keeps its
    width to the pixel.** Rejected: breaking the band out with viewport-width
    margins, which slice 004 already identified as how a page acquires a
    horizontal scrollbar at 375px.
28. **No dependency is added.** Rejected: a breadcrumb or icon library, for
    shapes that are one clipped polygon and two arrow glyphs.

## Notes for the reviewer

- **The band is what forces most of this slice.** It is the reason the theme
  control moves, the reason the page frame gains a full-width lane, and the
  reason the focus indicator needs a second colour. If the band were dropped,
  two thirds of the risk here would go with it — and so would the element the
  design reference builds the module and lesson pages around.
- **Criterion 5 is the one that catches the classic mistake.** Module 0 holds a
  single lesson at `order: 3`. Every list on this site is a list of one item
  there, and a list numbered by position renders `0a` and looks perfect.
  ADR-0003 predicted exactly this and `lib/numbering.ts` says so in its own
  comment; the check exists because the prediction is easy to forget while
  writing a list.
- **Criteria 12 and 13 exist because this slice reshapes the page frame that
  004 and 005 measured inside.** They are the parity checks, and they are
  measured against the recorded numbers in those slices' verification documents
  rather than judged.
- **Criterion 10 is where an accessible-looking site is actually inaccessible.**
  On the dark theme the accent line and the accent surface are the same value,
  so a focus ring in the site's accent, drawn on the band, is invisible. It is
  computed per surface rather than looked at.
- Criteria 15, 18 and 19 are judgements made on a rendered page, at desktop and
  at 375px, in both themes. As in 003, 004 and 005, the judgement is recorded
  rather than skipped.
- The chevron geometry, the card's composition and the exact structural rule
  value are taste decisions recorded rather than escalated (AGENTS.md §4). Each
  is reversible in one commit and lives in one place; if Viktar disagrees, the
  veto is an edit to one value or one shape, and nothing else moves.
