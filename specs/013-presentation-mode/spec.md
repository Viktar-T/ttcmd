# spec.md — 013-presentation-mode

- **Slice:** 013
- **Status:** written in an autonomous run (AGENTS.md §2, "Two modes") —
  **unapproved by construction.** Nothing here has been read by Viktar. Two
  things were settled by him before it was written and are taken as given, not
  re-decided: the highlight is **dark red**, and the control sits in the header
  **next to the theme control**. Everything else is decided here and reviewed
  afterwards from the `## Decisions taken` section and the final report.
- **Date:** 2026-09-01
- **Numbering note:** `docs/roadmap.md` reserves **013** for presentation mode
  and `specs/` ends at 012, so the roadmap's number and the next free directory
  agree. Nothing is renumbered.
- **Depends on:** 003 (the theme, the pre-paint pattern and the token file),
  004 (the reading treatment this mode dims), 006 (the header the control sits
  in), 005 (the code surface this mode deliberately does not touch)

---

## Why

**The site serves a reader at home. It does not yet serve the same material
spoken aloud.**

Every week the course is taught in front of a class, from a projector, and the
thing on the projector should be the course site itself — the same page the
student opens that evening, not a deck that says something slightly different
and rots the moment a lesson is edited. A lesson page today cannot do that job:
on a projector, twenty paragraphs of even, well-set Polish give a class no place
to look and give the teacher no place to be.

So the site gains a **second mode**, beside the reading mode it has today:

- **Reading** — the default, and the site exactly as it is now.
- **Presentation** — what the projector shows while the lesson is taught. The
  fragments the author marked for reading aloud are lit; the prose around them
  steps back. The page becomes a teleprompter: walk it top to bottom, read what
  is lit, and the class watches the course site do the presenting.

The marking itself costs nothing and is already possible: the ordinary HTML
element for a highlighted fragment passes the content pipeline untouched. What
is missing is meaning. Today that element arrives at the reader wearing the
browser's default yellow, which is wrong in reading mode and useless in a
classroom. **This slice is what makes a marked fragment invisible to the reader
and unmissable to the class.**

## What

### 1. Two modes, and reading is the default

The site is in one of two modes at any time. **Reading is what a visitor gets if
nothing has ever been chosen**, and — this is the part that matters — it is what
renders even if the mode is never applied at all: the reading appearance is the
plain, unconditional state of the page, and presentation is the condition laid
over it. That is the same construction the theme uses, and for the same reason:
a default expressed as a fact rather than as a promise about JavaScript.

### 2. A marked fragment in reading mode is not a marked fragment

In reading mode a page containing marked fragments must render **identically to
the same page with the marks removed**. No fill, no colour, no weight, no
underline, no change of any kind. The browser's own styling for the element must
not reach the reader.

This is not a nicety. Lessons will be marked up one at a time over a term, and a
student reading at home must not be able to tell which lessons Viktar has
prepared to teach and which he has not.

### 3. A marked fragment in presentation mode is lit, and everything around it recedes

In presentation mode, on a page that has marked fragments:

- Every marked fragment carries a **dark red highlight** — Viktar's call — with
  text on it light enough to read from the back row, and a boundary that
  survives on **both** themes.
- **The prose around them is visibly dimmed** — quieter, and still legible.
  Dimmed is not greyed-out-to-taste: the dimmed prose is held to the same
  contrast floor as body text, in both themes, and the floor is what stops it
  going further.
- Nothing else about the page changes: not the layout, not the type, not the
  spacing, not the header, not the breadcrumb band, not the contents panel, not
  the previous/next pair.

The lit fragment must look **the same in both themes**. A teacher does not know
which theme the classroom machine is in and should not have to care.

### 4. On a page with no marked fragments, presentation mode changes nothing

A page whose prose contains no marked fragment renders in presentation mode
exactly as in reading mode. Dimming a whole page and lighting nothing would read
as a fault rather than as a mode, and on the day this slice ships **no lesson is
marked yet** — marking is a separate lane and comes later.

What tells the teacher the mode is on is therefore **the control itself**: it is
visibly, unambiguously *on*, in the mode's own colour, on every page. That is
the answer to "how does the teacher know", and it does not depend on the page
having any content to light.

### 5. The control

- In the header, **beside the theme control** — Viktar's call.
- **Polish accessible name**, and the name says which way the control will go,
  so it is correct in both modes rather than being a label that is true half the
  time.
- Its **on state is visible without hovering it** and without comparing it to
  anything, because on a page with no marks it is the only evidence the mode is
  on.
- It is **public** — students will find it and press it. The name it announces
  and the word it uses have to be understandable to a fourth-year student who
  has never been told the mode exists, and pressing it a second time must put
  the site back exactly as it was.

### 6. The mode survives navigation, and does not flash

The chosen mode persists across navigation and reload the same way the theme
does, and it is applied **before the first paint**. A page that renders dimmed
for one frame and then undims — or worse, renders lit and then goes dark — is
worse than having no mode at all, in the same way and for the same reason the
theme's flash was.

### 7. Every colour is a token, and the floors are checked by the build

The highlight, its text, its boundary and the dimmed prose are **tokens in the
one file allowed to hold a colour literal**. Their contrast floors are **computed
by the build in both themes**, beside the floors this repo already checks — not
written into a verification document that was true on the day it was written.

Three floors, and one deliberate absence:

- The text on the highlight clears the body-text floor.
- The highlight's boundary clears the **non-text** floor against the page, in
  **both** themes — that is what makes a dark red readable as a highlight on a
  near-black page, where a dark fill on a dark ground cannot be.
- The dimmed prose clears the body-text floor.
- **The dark red fill itself is held to no floor against the page**, and that is
  a decision, not an oversight: a fill dark enough to be dark red is by
  arithmetic close to a near-black page, and forcing 3:1 there would mean
  shipping a colour that is not the one Viktar chose. The boundary is what
  carries the shape; the fill carries the identity.

### 8. Where a mark is allowed

Decided here so that the content lane has a rule rather than a discovery:

- **Allowed, and each must render sensibly in both modes:** ordinary prose, a
  heading, a link, a quotation, a list item, a table cell.
- **Not allowed inside a code block.** In a fenced block the element is not
  markup at all — it is characters, and the class would read them.
- **Not allowed inside a diagram.** A diagram is not HTML, and the element
  silently renders nothing there: the marked words disappear. Emphasis inside a
  diagram is the diagram's own job, with the accent it already uses.

Neither prohibition is enforced by a check, and that is deliberate: this
repository's checks exist for failures that are *silent*, and the first is loud
in the author's own face.

### 9. Verifiable without marking a lesson

Marking lessons is out of scope, so **the slice must ship a permanent surface
carrying one specimen of every case in §8**, compiled through the real content
pipeline, so that this mode is checkable now and re-checkable after any later
slice touches the palette. A screenshot in a verification document is not that.

## Out of scope

- **Marking up the lessons.** Content lane, one lesson at a time, after this
  slice closes.
- **Auto-scrolling, stepping between highlights, a remote control, printing.**
- **Any change to what the content pipeline accepts.** No new element, no schema
  change, no import for an author to remember.
- **Dimming anything that is not the prose** — the header, the band, the contents
  panel, the previous/next pair and the lesson's own heading stay as they are,
  because they are how a teacher gets to the next lesson mid-class.
- **A second, dimmed palette for code blocks.**
- **Retro-fitting the theme control**, whose accessible name this slice
  deliberately does not copy (decision 8).
- Search, the contents panel, and anything a previous slice settled.

## Acceptance criteria

Observable conditions, checked in a rendered page in a real browser unless the
criterion names the build.

1. `npm run build` succeeds and `npm run lint` is clean.
2. The build's contrast report contains the new pairs — highlight text on the
   highlight, the boundary against the page, and the dimmed prose against the
   page — **computed for both themes**, all above their floors, and every pair
   the report already carried is unchanged.
3. **Reading mode is untouched.** On the specimen surface of §9 in reading mode,
   every marked fragment has the same colour, background, weight and decoration
   as the text around it, in both themes. Nothing on the page distinguishes a
   marked fragment from an unmarked one.
4. **The default is reading, with scripting disabled.** With JavaScript off and
   storage empty, the specimen surface renders as in criterion 3.
5. **Presentation mode lights the marks and dims the prose.** On the specimen
   surface in presentation mode, in both themes: every marked fragment carries
   the dark red fill with its own text colour and a visible boundary, and the
   unmarked prose around it is measurably dimmer than in reading mode.
6. **Every case of §8 renders sensibly.** A mark in a heading, in a link, in a
   quotation, in a list item and in a table cell each render in both modes and
   both themes with no clipped, overlapping or invisible text, and a mark that
   wraps across a line break is a complete highlight on each line rather than an
   open-ended one.
7. **A marked link is still a link** in presentation mode: it keeps its
   underline, and its text is the highlight's text colour rather than the link
   colour.
8. **A page with no marks is unchanged by the mode.** The home page, the module
   grid and a module page render identically in both modes, in both themes.
9. **The control.** It sits in the header beside the theme control; its
   accessible name is Polish and names the direction it will move the site; its
   on state is visible on a page that has no marks; pressing it twice returns the
   page to its exact initial rendering.
10. **The mode survives navigation and reload** — chosen on one page, still in
    force after navigating to another and after a full reload.
11. **No flash.** On a reload with presentation mode stored, the page does not
    paint in reading mode first. *(Criterion 13 covers the eye that has to
    confirm this.)*
12. **The two modes are independent of the two themes.** All four combinations
    render, and switching theme does not change the mode or vice versa.
13. **Human eye, and a projector — left unchecked by the run that builds this.**
    Whether the lit fragments carry from the back of a classroom, and whether the
    dim is enough of a step down at that distance. Named in the final report with
    what to open and what to look at.
14. The diff touches nothing under `content/`, adds no dependency, no network
    request, and no client boundary other than the control itself.
15. The fresh-context review reports no gap against these criteria and nothing
    outside this slice's scope touched.

## Decisions taken

Per AGENTS.md §4. One line each, naming what was rejected.

1. **Mode is a second, independent state of the page, orthogonal to the theme.**
   Rejected: a third theme value, which would make presentation mode exist in
   only one theme and force a teacher to give up dark or light to teach.
2. **Reading is the unconditional rendering and presentation is the condition
   laid over it.** Rejected: styling both modes explicitly, which makes the
   default depend on an attribute arriving.
3. **The mode persists in the same storage as the theme, under its own key.**
   Rejected: persisting only for the browser session, which would forget the mode
   between two lessons on the same morning and is not "the same way the theme
   does".
4. **The highlight is one fill, one text colour and one boundary, identical in
   both themes.** Rejected: a per-theme fill, which would make the lit fragment
   look like two different things and give a teacher a reason to care which theme
   the classroom machine is in.
5. **The boundary, not the fill, is what carries the highlight's shape against
   the page.** Rejected: lightening the fill until it clears 3:1 on the dark
   theme, which stops being dark red — the one thing this slice was told not to
   re-decide.
6. **The dimmed prose is bound to the token that already means "quieter" and is
   already above the body floor in both themes.** Rejected: a new, deeper grey,
   which introduces a hue for a step the floor forbids taking much further
   anyway.
7. **The dim is applied by rebinding the text tokens inside the prose**, so
   everything that already reads a text token — a quotation, a small heading, a
   list marker, a link, a diagram drawn in the current colour — dims with it.
   Rejected: naming each of those in a rule of its own, which is a list that is
   wrong the first time a slice adds a block to the prose.
8. **The control's accessible name is carried by two Polish phrases, one per
   mode, with the inactive one removed from the page.** Rejected: the theme
   control's single direction-free label, which cannot say which state the site
   is in; and rejected a pressed-state attribute, which cannot be set before
   hydration without the mismatch the theme control exists to avoid.
9. **The control shows one icon and fills itself in the mode's own colour when
   on.** Rejected: the theme control's two-icon swap, which shows what is offered
   rather than what is in force — right for a theme a visitor can see, wrong for
   a mode whose whole evidence may be the control itself.
10. **Presentation mode does nothing on a page whose prose has no marks.**
    Rejected: dimming it anyway and letting the empty page be the signal, which
    on today's site — where no lesson is marked — makes every page look broken;
    and rejected printing a Polish notice into the page from a stylesheet.
11. **Code blocks do not dim.** Rejected: a second, dimmed code palette (a whole
    palette to keep in step, for a surface that is already the thing the class is
    looking at), and rejected fading the block as a whole, which drops its text
    under the contrast floor.
12. **The chrome does not dim** — header, band, contents panel, lesson heading,
    previous/next. Rejected: dimming everything but the marks, which makes
    getting to the next lesson harder in front of a class.
13. **A mark is not allowed in a code block or in a diagram, and neither is
    enforced by a check.** Rejected: a build check for both — this repository's
    checks are for silent failures, and the code-block case is loud.
14. **The specimens live on the permanent reference surface** the site already
    keeps for exactly this purpose. Rejected: marking a real lesson to have
    something to look at, which is content-lane work this slice is told not to
    do, and rejected a throwaway page deleted at the end, which makes the
    evidence unreproducible.
15. **The marked element keeps its meaning in both modes.** Rejected: stripping
    its semantics in reading mode so it is never announced — that needs markup
    the pipeline is not allowed to grow, and the element genuinely is a
    highlight.
16. **A decision record is written for the palette and the mode attribute.** The
    site's colour decision so far is one accent chosen precisely because it
    carries no semantic load; a red entering the palette is the kind of thing
    this repo records rather than discovers later in a token file.

## Notes for the reviewer

- **The riskiest criterion is 3.** Reading mode has to be the same for a marked
  lesson and an unmarked one, and the failure is silent: a browser default that
  survives is a yellow fragment on a public page, in front of a class.
- **Criterion 13 is yours, and it needs the projector**, not a screen. The dim is
  held at the body-text floor by the build; whether that is a big enough step at
  ten metres is a judgement no check here can make. If it is not, the token moves
  and the build re-checks the floor.
