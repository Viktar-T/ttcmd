# spec.md — 007-contents-panel

- **Slice:** 007
- **Status:** written in an autonomous run (AGENTS.md §2, "Two modes") —
  unapproved by construction; Viktar reviews the `## Decisions taken` section
  and the final report afterwards
- **Date:** 2026-08-29
- **Depends on:** 004 (the reading column, the measure, the rhythm — all of
  which must not move), 006 (the page frame with its full-width lane, the
  single left edge the whole site aligns to, the identity string, the
  structural rule value at 3.69:1 dark / 3.64:1 light, and the build's
  contrast-floor checks), ADR-0003 (letters derive from `order`),
  ADR-0012 (decorative rules against structural ones),
  constitution Articles III (ASCII identifiers), VI (module → lesson) and
  VIII (server-rendered by default), `docs/design-reference.md` §Lesson
- **Unblocks:** nothing structurally; this is the last piece of in-lesson
  navigation the written content is waiting for

---

## Why

**A reader inside a lesson has no idea where they are, and no way to move.**

The written lessons decide what this slice is. The longest lesson in module 1
runs to 389 lines and nine top-level sections; another carries fourteen; every
lesson has at least six. Reading one is ten to twenty screens of scrolling, and
the only navigation on the page is at the two ends — the breadcrumb above the
title and the previous/next pair after the last source link. In the middle,
where the reader actually is, there is nothing: no way to see the shape of the
lesson, no way to jump to its exercises, no way back to a section half-read
yesterday, and no way to the top short of scrolling ten screens in reverse.

The sections also have no addresses. A teacher who wants to say "open 1a, the
exercises" can say `1a` — slice 006 made that string real — but the sentence
ends there: no URL reaches a section, so the last stretch of every instruction
is "and scroll until you see it". For a course whose lessons are read in a
classroom, on instruction, that is the difference between one click and thirty
people scrolling at thirty speeds.

The design reference describes the answer, and calls it the most carefully
built thing on the reference site's lesson page: one panel that answers the
three questions a student has — *where am I in this lesson, what else is in
this lesson, and what else is in this module.* The roadmap's own done-condition
for this slice says the same thing shorter: a reader of the longest lesson
always knows where they are and can jump to any section.

This is also the slice that introduces scroll behaviour to a site that has
none. Everything shipped so far renders once and stands still. What follows
therefore says precisely which behaviours arrive, and — because the site must
keep working on school machines with locked-down browsers — what remains of
them when JavaScript is absent.

## What

### 1. Sections become addressable

Every top-level section heading in a lesson body carries a **stable fragment
identifier derived from its own text**: lowercase, ASCII letters, digits and
hyphens only, with Polish diacritics transliterated by a fixed mapping
(ą→a, ć→c, ę→e, ł→l, ń→n, ó→o, ś→s, ź→z, ż→z), everything else collapsing to
hyphens, and a numeric suffix on a repeat within the same lesson. Article III
already decides this — identifiers and slugs are ASCII, no diacritics — so
*"Co naprawdę przesuwało epoki"* is addressed as `co-naprawde-przesuwalo-epoki`.

A heading whose derived identifier would be empty, or would carry any character
outside that set, **fails the build, naming the lesson and the heading**. A
silent fallback here is an anchor nobody can predict, on a public site where
anchors get written into lesson plans.

Arriving at an anchor lands the heading a small breathing distance below the
top edge of the viewport, not flush against it.

Top-level means the `##` sections — the unit the lessons are actually organised
in, the unit the roadmap names, and the unit a panel of fourteen entries can
still list. Deeper headings get no identifiers in this slice: an anchor with no
UI pointing at it is unowned behaviour.

### 2. The panel

On a lesson page, where the viewport is wide enough, a **contents panel stands
to the left of the article**:

- **Every lesson of the module**, in `order`, each row carrying its identity
  string and its title — `1a Czterdzieści lat zmian` — because the identity
  string is how a lesson is referred to from outside itself (slice 006's
  decision, kept).
- **The current lesson is expanded in place**: its own row, then its section
  list indented beneath it, one entry per top-level section, each visually
  prefixed with a hyphen — the reference site's signature, kept because it is
  free. The exercises appear here like any section, because they are one.
- Every other lesson's row is a link to that lesson. Every section entry is a
  link to its fragment. **The current lesson's own row is not a link** — the
  same convention the breadcrumb already follows for the current page.
- The panel is a **navigation landmark named "Spis treści"**, distinct from the
  breadcrumb landmark, set in the monospace face like all structure on this
  site.

**The article does not move.** The site has one left edge — the header, the
band's breadcrumb and the lesson title all share it — and a panel that pushed
the article rightward to centre the pair would break that edge on exactly one
kind of page. Instead the panel hangs in the margin to the left of the
article's column, and appears only at viewports wide enough to hold it there
beside an untouched article: **at 1280 px and wider it is present**. The
article's own geometry — left edge, prose measure, the wide lane its diagrams
and tables use — is identical to the pixel with and without the panel.

A panel that would contain no link at all — a module of one lesson whose only
lesson had no sections — is omitted rather than rendered as a single dead row.
No written module is in that state today; the rule exists so the first one to
be is not a broken page.

### 3. The active section follows the reader

As the reader scrolls, the section they are in is highlighted with the
**inverted box** of the design reference: filled with the body-text colour,
its own text in the page colour. Being built from that existing pair, the
treatment inverts correctly on both themes and its contrast is the body-text
ratio by construction — no new colour enters the site.

What "the section they are in" means is decided, not left to a library's
default:

- The active section is the one whose heading **most recently passed the
  reading line** near the top of the viewport.
- **Above the first section heading, nothing is highlighted.** The reader is in
  the lesson's introduction, and highlighting a section they are not in is a
  small lie repeated on every lesson.
- **At the bottom of the document, the last section is active**, even when that
  section is too short ever to reach the reading line — otherwise the one
  entry a reader jumps to most, the sources, could never light up.
- Following a section link highlights the section it leads to.

The active entry is conveyed to assistive technology as the current location,
not by colour alone. The address bar is **not** rewritten while scrolling —
a reader who scrolls a lesson end to end should not come away with two hundred
history entries.

### 4. The panel scrolls itself

The panel **stays on screen while the article scrolls** and manages its own
height:

- Its height is capped to the viewport; when its content is taller — fourteen
  sections plus eight lesson rows exceed a short laptop screen — the panel
  gains **its own scrollbar** and scrolls independently of the page.
- When the active section changes to an entry outside the panel's visible
  region, the panel scrolls **itself**, by the minimum needed to reveal the
  entry. The page never moves because of anything the panel does.

### 5. Small screens: the same panel, folded

Below the width that affords two columns, the panel's entire content appears as
a **collapsed disclosure titled "Spis treści"** between the lesson header and
the first paragraph.

- Collapsed by default: open, it would push a two-hundred-line lesson a full
  screen down before its first sentence.
- Opening and closing it requires no JavaScript.
- Its content and behaviour are the panel's: same rows, same links, same
  active-section highlight while open.
- At 1024 px, 768 px and 375 px this is what renders; the side panel does not.

A phone reader of the longest lesson is the person who most needs to jump to a
section, so hiding the panel on small screens — what the reference site does —
is rejected, not copied.

### 6. Back to top

Lessons are ten to twenty screens long, so lesson pages get a **back-to-top
control floating at the bottom right**:

- Absent while the reader is near the top; it appears once they have scrolled
  roughly a viewport's height, and disappears again near the top.
- Activating it returns the viewport to the top of the page **and moves
  keyboard focus there** — a keyboard user who invokes it and presses Tab must
  not find themselves back at the bottom.
- It is quiet: the page's own ground, a border in the structural rule value, an
  arrow glyph, and an accessible Polish name. The accent is the colour this
  site points with, and a control present on every screen of every lesson must
  not glow permanently.
- It appears on lesson pages only, at every viewport width.

### 7. Keyboard, and readers without JavaScript

The panel, the disclosure and every link in them are **server-rendered**. With
JavaScript absent, every lesson link and section link still navigates, the
disclosure still opens, and what is missing is only the moving parts: no
highlight, no panel self-scrolling, no back-to-top. No errors, no empty
furniture.

The panel sits between the breadcrumb and the article in focus order, and it
can hold twenty-plus links. So **the panel's first focusable element is a skip
control, visible only while focused — "Pomiń spis treści" — that moves focus
past the panel to the article**. Every link in the panel and the disclosure is
keyboard-reachable in document order and shows the site's focus indicator,
which slice 006 already made visible at ≥ 3:1 on this surface.

### 8. The rule between panel and article

The design reference asks for a visible vertical rule separating the panel from
the prose. A reader relies on it to tell the two columns apart, which makes it
**structural, not decorative** — exactly the case the constraint carried into
this slice describes. It therefore takes the **structural rule value slice 006
established** — 3.69:1 on dark, 3.64:1 on light, already computed by the build
from the token file on every run. No new colour token is needed, nothing about
the decorative rule changes, and every existing contrast floor keeps holding.

### 9. Where it is checked

**The written content is the test**, as in every slice since 003:

- The **longest lesson** (nine sections, including the exercises and the
  sources) is the scroll-spy case the roadmap names.
- The **fourteen-section lesson** is the overflow case: its panel content
  outgrows a short viewport, which is what the panel's own scrollbar is for.
- **Module 0** — one lesson, at `order: 3` — is the degenerate panel: a list of
  one lesson, correctly labelled `0c`, expanded to its nine sections.

The **reference page** carries static specimens of the panel's row states —
rest, hover, focus, the inverted active entry, the current-lesson row — and of
the disclosure and the back-to-top control, so a later slice can see what it
broke without scrolling a real lesson.

## Out of scope

Refused deliberately, not forgotten:

- **Search.** Roadmap: after ~15 lessons.
- **Every MDX component**, still. No lesson asks for one.
- **Content changes.** No file under `content/` is touched — the anchors are
  derived from the headings as written.
- **The shrinking logo and the persistent logo mark.** Slice 006 pointed them
  here as "scroll behaviour", but this slice's scope statement names the panel
  and back-to-top only. They stay unscheduled, recorded so the pointer is not
  silently lost.
- **Anchors on deeper headings** (`###` and below) — no UI points at them.
- **Smooth scrolling.** An animated jump across two hundred lines is slower
  and queasier than an instant one, and adds a reduced-motion obligation for
  negative gain.
- **Rewriting the address bar while scrolling**, and any reading-progress
  indicator.
- **A panel on module or landing pages.** The module page's lesson list is that
  panel; the roadmap's word is *in-lesson*.
- **Anything already built in slices 003 to 006** — the reading treatment, the
  code blocks, the band, the breadcrumb, the pagers, the header, the grid. The
  parity criteria below are what make this checkable rather than asserted.

## Acceptance criteria

Observable conditions. Each is checked and the check's output is the evidence.

1. `npm run build` succeeds, with the colour-literal guard and every existing
   contrast-floor check passing unchanged.
2. Every top-level section heading in every lesson renders with an identifier
   that is **lowercase ASCII letters, digits and hyphens only**, derived from
   its text with Polish diacritics transliterated, unique within its page.
   Shown by listing every heading and its identifier for the longest lesson
   and the fourteen-section lesson, read from the built pages.
3. A heading whose identifier would be empty or would carry a character outside
   that set **fails the build naming the lesson and the heading**. Shown with a
   temporary heading, then reverted; `git status` confirms the content tree is
   untouched afterwards.
4. On a lesson page at 1280 px and wider, the panel renders beside the article:
   every lesson of the module in `order` with identity string and title, the
   current lesson expanded in place with one entry per top-level section, in
   document order. Read from the rendered markup of the longest lesson.
5. The current lesson's row is **not a link**; every other lesson row and every
   section entry is. Read from the rendered markup.
6. The panel is a navigation landmark with the accessible name "Spis treści",
   and it is distinct from the breadcrumb landmark. Read from the rendered
   markup.
7. **The article does not move.** At 1280 px, the prose column's left edge and
   width with the panel present equal the same measurements on the same page
   before this slice — and slice 004's recorded measure and the six adjacency
   gaps, and slice 006's band, breadcrumb, pager and header, are re-verified
   unchanged.
8. Scrolled to the top of the longest lesson, **no section is highlighted**.
   Scrolled so that a mid-lesson section heading has passed the reading line,
   that section — and only that section — is highlighted and carries the
   assistive-technology current-location mark. Scrolled to the very bottom,
   the **last** section is highlighted. Demonstrated in a real browser and
   recorded.
9. Following a section entry in the panel jumps to that section: the heading
   lands visibly below the top edge, and the highlight moves to it.
10. On a viewport short enough that the panel's content overflows it — the
    fourteen-section lesson on a ~600 px-tall window — the panel gains its own
    scrollbar and scrolls independently; scrolling the panel to its end does
    not move the page, and the page's scroll position is unchanged by the
    panel's self-scrolling as the active section advances.
11. Deep in a lesson at 1280 px, the panel is still on screen.
12. At 1024 px, 768 px and 375 px the side panel is absent and the collapsed
    disclosure titled "Spis treści" renders between the lesson header and the
    first paragraph; it opens and closes; open, it lists the same entries and
    highlights the active section the same way. The document has no horizontal
    scrollbar at any of the three widths.
13. With JavaScript disabled, on a lesson page: every lesson link and section
    link navigates, the disclosure opens and closes, no highlight appears, no
    back-to-top control appears, and the console shows no errors.
14. The back-to-top control is absent at the top of a lesson, present after
    scrolling past roughly a viewport, and activating it returns the viewport
    to the top and moves keyboard focus to the top of the page. Present and
    functional at 375 px and at desktop; absent on module and landing pages.
15. The panel's first focusable element is the skip control, hidden until
    focused, and activating it moves focus past the panel to the article.
    Every panel and disclosure link is keyboard-reachable and shows a focus
    indicator on this surface at ≥ 3:1 — the site's existing focus treatment,
    re-verified where it now appears.
16. The vertical rule between panel and article renders in the structural rule
    value, whose ≥ 3:1 standing in both themes the build's own check output
    demonstrates. The decorative rule value is untouched, and no colour is
    introduced anywhere outside the token file — the build guard is the proof.
17. Module 0's page for its single lesson shows the panel with exactly one
    lesson row, labelled `0c`, not a link, expanded to that lesson's nine
    sections.
18. The reference page carries the specimens of §9: the row states, the
    inverted active entry, the current-lesson row, the disclosure, and the
    back-to-top control.
19. No dependency is added, and no page requests any new resource — no image,
    no font beyond the two loaded, nothing third-party. Read off the network
    log.
20. `git diff` reports no change under `content/`.
21. The fresh-context review reports no gap against these criteria and nothing
    outside this slice's scope touched.

## Decisions taken

Per AGENTS.md §4. One line each, naming what was rejected.

1. **Anchors on top-level (`##`) sections only.** Rejected: every heading
   level, which doubles a fourteen-entry panel with subsections and mints
   anchors no UI points at.
2. **Identifiers derived from heading text, transliterated to ASCII.**
   Rejected: positional identifiers (`sekcja-3`), which survive nothing and
   mean nothing; and Unicode slugs, which Article III forbids outright.
3. **An unrepresentable heading fails the build.** Rejected: silently
   stripping the offending characters, which mints an anchor nobody can
   predict from the heading they are looking at.
4. **The current lesson alone is expanded; other lessons are plain links.**
   Rejected: a click-to-expand accordion over every lesson, which spends
   client-side machinery to preview what one click simply opens.
5. **The current lesson's row is text, not a link.** Rejected: a self-link,
   which the breadcrumb's current step already declines for the same reason.
6. **Lesson rows carry the identity string, not the bare letter.** Rejected:
   the reference's bare letter, which slice 006 already rejected for every
   reference to a lesson from outside itself.
7. **Section entries keep the reference's hyphen prefix, decoratively.**
   Rejected: dropping it (free character), and numbering sections (a second
   numbering scheme beside the one ADR-0003 protects).
8. **The panel hangs in the margin; the article keeps the site's one left
   edge.** Rejected: centring panel-plus-article as a unit, which shifts the
   article off the edge shared with the band and header on exactly one kind of
   page and reads as a mistake.
9. **The side panel appears at 1280 px and wider.** Rejected: squeezing both
   columns into 1024 px, which either narrows the article (moves what 004
   measured) or overlaps the margin the wide diagrams already use.
10. **Below that width the panel folds into a collapsed disclosure above the
    article.** Rejected: hiding it entirely on small screens, as the reference
    does — the phone reader of a 200-line lesson needs the jump list most —
    and a floating drawer, which is overlay machinery for a reading site.
11. **The disclosure is collapsed by default.** Rejected: open by default,
    which pushes every lesson a screenful down before its first sentence.
12. **Active section = the heading that most recently passed the reading
    line; nothing active above the first heading; the last section active at
    document bottom.** Rejected: first-visible-heading (flickers on short
    sections), and always-highlighting-something (lies in the introduction).
13. **The highlight is the inverted body-text/page pair.** Rejected: an accent
    fill, which floods the panel with the colour this site reserves for
    pointing and adds a contrast obligation the inversion gets for free.
14. **The active entry carries an assistive-technology current-location mark.**
    Rejected: colour as the only signal.
15. **The address bar is never rewritten by scrolling.** Rejected: syncing the
    fragment to the active section, which turns one read-through into two
    hundred history entries.
16. **Anchor jumps are instant.** Rejected: smooth scrolling — slower over ten
    screens, queasy, and a reduced-motion obligation for negative gain.
17. **The panel keeps its own highlight visible by scrolling itself, minimally,
    never the page.** Rejected: letting the highlight scroll out of the
    panel's view, which un-answers "where am I" for exactly the longest
    lessons.
18. **The panel and disclosure are server-rendered; scripting only moves the
    highlight and the back-to-top.** Rejected: a client-rendered panel, which
    Article VIII's default forbids without need and which would vanish
    entirely without JavaScript.
19. **Keyboard burden answered inside the panel: a focus-visible skip control
    as its first focusable.** Rejected: a site-wide skip link (touches the
    header slice 006 built and needs every future page to place a target), and
    placing the panel after the article in the document (focus order diverges
    from visual order).
20. **Back-to-top on lesson pages only, appearing after roughly a viewport of
    scroll, returning focus as well as scroll.** Rejected: site-wide (module
    pages are two screens), always visible (permanent furniture over prose),
    and scroll-only (strands keyboard focus at the bottom).
21. **Back-to-top is quiet — page ground, structural-rule border, arrow.**
    Rejected: an accent-filled control glowing on every screen of every
    lesson.
22. **The panel–article rule takes the existing structural rule value.**
    Rejected: a new token (slice 006 already added the value this constraint
    asks for, with the build checking it), and the decorative rule at 1.47:1
    (the thing the carried constraint exists to forbid).
23. **A panel with no links is omitted.** Rejected: rendering a single dead
    row for a one-lesson module with no sections.
24. **The disclosure and panel render the same content at every width, one of
    the two visible at a time.** Rejected: different content per size — one
    source of truth for what the module contains.
25. **The shrinking/persistent logo stays out, and is recorded as such.**
    Rejected: pulling it in on the strength of slice 006's pointer, against
    this slice's own scope statement.

## Notes for the reviewer

- **The riskiest criterion is 7.** Everything else in this slice is additive;
  the rail the panel hangs in is the one change near geometry that 004 and 006
  measured. It is re-measured, not eyeballed.
- **Criterion 8's three states are the behaviour.** A scroll-spy that is wrong
  at the edges — the introduction, the short last section — is wrong exactly
  where a student notices. The edge behaviour is specified in §3 so the check
  is against words, not taste.
- **Criterion 13 is the classroom criterion.** School machines with scripting
  broken or locked down must still get a working table of contents; the
  disclosure element is native for exactly this reason.
- The panel's width, the exact fold breakpoint, the reading-line offset, the
  scroll threshold for back-to-top, and every spacing value inside the panel
  are the plan's to choose and taste decisions to record (AGENTS.md §4) — each
  reversible in one commit, none escalated.
