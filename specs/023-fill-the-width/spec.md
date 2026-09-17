# spec.md — 023-fill-the-width

- **Slice:** 023. Numbered past the roadmap's reserved 017–019 (search, the
  glossary, being found) exactly as 020 was, and for the same reason: slice
  numbers are append-only, not contiguous (Article IX). The roadmap's queue is
  Viktar's file and this slice does not touch it.
- **Status:** **accepted for an autonomous run** (AGENTS.md §2, "Two modes").
  Drafted in Cowork against the running dev server, from two screenshots Viktar
  took and three questions he answered; he read the summary of this file and
  asked for it to be implemented in one run, 2026-09-17. That is approval of the
  slice, not of every line: it is unapproved line by line by construction, and
  he reviews it afterwards from `## Decisions taken` and the final report.
- **Date:** 2026-09-17
- **Depends on:** 004 (the measure and the wide lane — both re-opened here),
  006 (the page frame), 011 (the lesson page's two columns), 012 (the anchored
  frame)
- **Supersedes:** slice 004's **value** for the measure, and **slice 012 in
  full** — its single anchored left edge and its criteria 2, 3 and 5. Neither
  file is rewritten (AGENTS.md §8); this one is the record of the change.
- **Measurements below** were taken in a real browser at a 1585 px viewport on
  2026-09-17 — `1c` on the dev server, and the reference at the same width.

---

## Why

Two screenshots, both at the window Viktar actually works in, and one sentence
each.

**A lesson spends a quarter of the window on nothing.** On `1c` at 1585 px: the
contents column is 352 px, the article column 736 px, the prose inside it
624 px — and **426 px to the right of the article is empty**, at every width,
growing with the window. That is not a bug. Slice 011 put all the slack on one
side on purpose, and slice 012 anchored every other page to the same edge so
the prose would stop jumping. Both were right about the problem they had. The
result is still a narrow strip of text pressed against the left of a wide
screen, with a void beside it.

The reference does not look like that, and the difference is measurable at the
same viewport: its prose column is **762 px** — 138 px wider than ttcmd's — its
navigation beside it about 378 px, and the pair is **centred**, 185 px of
margin on each side. It spends the same window on more text and splits what is
left over instead of piling it in one place.

**The front door spends five sixths of the window on nothing.** On `/` at
1585 px the hero and the module grid are **624 px wide starting at 464 px**:
three module cards of **197 px** each, in a page 1570 px across. The reference's
front page runs a **1300 px** band, centred, and its cards are more than twice
that wide. Three 197-pixel cards are not a grid of modules; they are a list
with pretensions.

Both pages are the same mistake at two scales: geometry chosen to protect a
reading measure, applied to things that are not prose. This slice widens the
prose to what the reference proves is readable, and stops making a grid of
cards live inside a column sized for sentences.

## What

### 1. The prose column is wider — one number, every page

The measure goes from **39rem (624 px) to 47.5rem (760 px)**, which is what the
reference gives the same job at the same viewport and the same 18 px body size.
Today's column sets about 65 characters of the prose face on a line; the new one
sets about 79, which is the reference's own line and above the classic ideal —
that is the trade this slice makes, deliberately, and criterion 12 is where
Viktar's eye rejects it if it reads badly in Polish.

**The wide lane keeps the relation slice 004 gave it**, not a new number: 56 px
of lane showing on each side of the measure, so it becomes **54.5rem (872 px)**.
Tables, figures and diagrams stay in the same relation to the prose and to the
rule beside them.

Both are still **fixed lengths**. Nothing here is a fraction of the viewport,
and a line of prose is the same length at 1585 px and at 2560 px.

### 2. The lesson page keeps its left anchor and spends the slack on the text

Everything slice 011 arranged stays arranged: the contents column at one page
margin, the article immediately to its right, the pair anchored left, the
leftover width falling on the right. **Only the article column is wider** —
408 px from the left, 872 px across, its prose 760 px — and the empty band on
the right shrinks from 426 px to 290 px at 1585 px.

The wider article does **not** fit at the width where the second column first
appears: page margin, contents, gap and article would need exactly 1280 px of a
1280 px viewport, which is a horizontal scrollbar. So the wider measure arrives
at **its own width, 88rem (1408 px)**, and **between 80rem and 88rem a lesson
page is what it is today, to the pixel** — 352 / 736 / 624, contents panel and
all. A 1366-pixel laptop keeps the contents panel it has rather than losing it
to a wider line, which is the trade the other way round and the wrong one.

### 3. Every page that is not a lesson is a wide band, centred

At every width, the content of the home page, the module listing, a module
page, the progress page and the reference page sits in a band of **at most
81rem (1296 px), centred in the viewport**, and of the viewport less the
frame's two gutters when that is narrower. The 408 px empty strip slice 012 left
on the left of those pages is gone; so is their dependence on a lesson's
geometry.

Inside the band, two rules, and the second is the whole point of having a band:

- **Text still reads at the measure.** A paragraph, a heading, a standfirst, a
  lesson-list row's label — anything made of sentences — is at most one measure
  wide and starts at the **band's left edge**. A 1296-pixel line of Polish prose
  is not a line, it is an endurance test.
- **Anything that is not prose may use the whole band**: the module grid, the
  module page's lesson list, the progress table.

**The module grid gets wider cards, not more of them.** Three per row above the
two-column fold, growing with the band — about 416 px each at 1585 px against
today's 197 px — and falling to two and then one below it, as it does now.

### 4. The cost, stated rather than discovered: two left edges again

A lesson's prose starts at a fixed 464 px. A module page's lesson list will
start at the band's left edge — 137 px at 1585 px, 16 px at 1280 px — which
moves with the window. **Opening a lesson from a module page will move the text
again**, by about 327 px at 1585 px.

That jump is precisely what slice 012 existed to remove, and removing it is what
bought the empty strip this slice deletes. Viktar was shown the trade in those
words and chose the band. 012 is superseded, not forgotten: if the jump turns
out to be worse in use than the strip, the record of why it was traded away is
this paragraph.

### 5. What does not change

- **The contents panel** — its 22rem width, the active section following the
  reader, its own scrollbar, the skip control, the back-to-top control, the
  disclosure below the fold, the no-JavaScript behaviour, the rule on its inner
  edge and the gap to the article.
- **The two-column fold at 80rem**, and every width 007 and 011 name.
- **The type scale, the vertical rhythm, the palette, every rule value**, and
  the internals of every component.
- **The site header's and the accent band's rule**: a lane of the measure plus
  the frame's gutters, centred, on every page. The rule is untouched — but
  because the measure grows, the lane becomes 792 px and its left edge moves
  about 68 px left at 1585 px. That is a consequence of §1, it is recorded here,
  and it is not a new decision about the chrome.
- **Presentation mode** keeps the geometry slice 013 gave it.
- **No content file, no dependency, no new colour, type size, spacing value or
  component.**

### 6. Where it is checked

The written content is the test, as in every slice since 003:

- **`1c`** — the lesson both earlier slices measured.
- **The longest lesson (`1d`)** — the scroll case, and the panel's worst wrap.
- **Module 0's single lesson** — the degenerate panel.
- **`/`, the module listing, a module page, the progress page** — the four band
  pages a student sees.
- **The reference page**, whose specimens must show the geometry the site
  actually uses, or it is a reference that lies.

## Out of scope

Refused deliberately, not forgotten:

- **Centring the lesson page's pair.** Viktar was offered it — it is what the
  reference does — and chose the wider text with the anchor kept.
- **A fluid article column** that takes whatever the viewport has. It makes the
  line length a function of the window, which is the one thing 004 settled and
  this slice does not re-open.
- **Moving the site header or the accent band onto any page's new edge.**
  Declined at 011 and at 012; still declined.
- **A ceiling at which the lesson page starts centring.** At 2560 px the pair
  still sits left with 1265 px of slack. Named in the reviewer's notes, not
  fixed here.
- **Search, the glossary, being found** — the roadmap's 017–019.
- **Content changes, a footer, header links, new components, illustrations.**
- **Re-opening the fold at 80rem, the rhythm, the palette, or any rule value.**

## Acceptance criteria

Observable conditions, measured in a rendered page in a real browser. Widths
are CSS pixels of the viewport; boxes are `left / width` of the element's
border box.

1. `npm run build` succeeds, the colour-literal guard passes, and the contrast
   report prints the same ratios as before this slice — no token moved.
   `npm run lint` is clean.
2. **The prose column is 760 px and the wide lane 872 px** on a lesson page at
   1585 px, with the lane's 56 px showing on each side of the prose unchanged.
3. **The lesson page above the wide fold.** At 1585 px on `1c`: contents
   32 / 352, article column 408 / 872, prose 464 / 760, the lesson header and
   the previous/next pair 464 / 760, the contents column's top edge level with
   the lesson header's within 1 px. The gap from the viewport's right edge to
   the article column is 290 px and grows with the window while the left margin
   does not.
4. **The lesson page between the two folds is untouched.** At 1280 px and at
   1407 px every box measures what it measured before this slice: contents
   32 / 352, article column 408 / 736, prose 464 / 624.
5. **The band.** At 1585 px the home page, the module listing, a module page,
   the progress page and the reference page each place their content in a box
   137 / 1296; at 1280 px that box is the viewport less the frame's two
   gutters, and its left and right margins are equal at both widths.
6. **Prose inside the band reads at the measure.** At 1585 px the home page's
   hero paragraph is 760 px wide and starts at the band's left edge (137 px),
   not centred inside the band.
7. **The module grid.** At 1585 px it spans the full band, renders **three**
   cards per row, and a card is at least 380 px wide. At 768 px and 375 px it
   renders what it renders today.
8. **No length that means "the prose column" is left at its old value.** At
   1585 px the progress page's table lane is the new measure plus the frame's
   two gutters — 792 px — and no page renders a block at 624 px that rendered
   at the measure before this slice.
9. **Nothing 007 and 011 shipped regressed**, demonstrated at 1585 px on the
   longest lesson: no section highlighted at the top; the passed section
   highlighted and only it, carrying the assistive current-location mark; the
   last section highlighted at the document's bottom; a followed section entry
   landing its heading below the top edge and moving the highlight; the panel
   scrolling independently with the page's scroll position unchanged; the skip
   control first and hidden until focused; back-to-top absent at the top and
   present after a viewport of scroll. Every entry in `1c` and in the longest
   lesson still sets on at most two lines.
10. **Below the two-column fold.** At 1024 px, 768 px and 375 px a lesson page
    is one column with the collapsed disclosure between the header and the first
    paragraph; band pages fill the viewport less the gutters; no document has a
    horizontal scrollbar.
11. **No document has a horizontal scrollbar** at 320, 1279, 1281, 1407, 1409,
    1585 and 2560 px, on a lesson page, the module listing, a module page, the
    home page and the progress page.
12. **Human eye, and therefore left unchecked by the run that builds it:**
    whether 79 characters of Polish on a line reads better or worse than 65, and
    whether a centred 1296-pixel band on the front door beside a left-anchored
    lesson reads as one site.
13. The reference page renders without error at 1585 px, 1280 px and 375 px, and
    its specimens show the widths the site now uses.
14. The slice's diff touches no file under `content/`, adds no dependency and no
    network request to any page.
15. The fresh-context review reports no gap against these criteria and nothing
    outside this slice's scope touched.

## Decisions taken

Per AGENTS.md §4. One line each, naming what was rejected. The first three are
Viktar's answers, not mine.

1. **The measure grows to the reference's own 47.5rem and the pair stays
   anchored left.** *Viktar's answer.* Rejected: centring the pair at today's
   widths, which closes the void without widening a single line; and a fluid
   article column, which makes line length a property of the window.
2. **Non-lesson pages become a wide centred band, and the single left edge goes
   with it.** *Viktar's answer, given with the cost named.* Rejected: keeping
   the 408 px inset and growing only rightwards, which keeps one edge but leaves
   the front door with an empty left strip and no claim to "the whole page".
3. **Every page in the frame is in scope, including the progress page and the
   reference page.** *Viktar's answer.* Rejected: doing only the two pages in
   the screenshots, which would leave three pages at a geometry no document
   explains.
4. **47.5rem, measured off the reference rather than chosen.** Rejected: 45rem,
   which spends half the available slack for a barely visible gain; and 52rem
   and beyond, which passes 85 characters a line with nothing to point at as
   precedent.
5. **The wide lane is derived from the measure at the offset 004 fixed, not
   re-chosen.** Rejected: giving tables and figures more than the 56 px a side
   they have, which would move content nobody asked to move.
6. **A second fold at 88rem for the wider measure, with the 80rem two-column
   fold untouched.** Rejected: raising the two-column fold to 88rem, which takes
   the contents panel away from every 1366-pixel laptop; and letting the article
   column flex between the two folds, which reintroduces a line length that
   depends on the window and makes criterion 3 unmeasurable.
7. **81rem for the band, centred.** Rejected: the viewport less the gutters at
   any width, which gives a 2560-pixel screen a 2528-pixel band and a card grid
   that reads as a spreadsheet; and anchoring the band left, which is the
   arrangement §4's jump is the price of and would keep neither edge nor
   symmetry.
8. **Inside the band, prose is capped at the measure and starts at the band's
   left edge.** Rejected: letting prose fill the band, which is unreadable; and
   centring the prose inside the band, which puts a third left edge on a page
   that already has one.
9. **The module grid grows its cards and keeps three per row.** Rejected:
   auto-fitting more columns into the wider band, which would put seven modules
   across at 1585 px and turn the front door into a directory.
10. **The site header and the accent band keep their rule and move as a
    consequence.** Rejected: pinning their lane to the old 39rem so the chrome
    does not move, which would write the superseded measure into the site's most
    shared component and leave two numbers meaning the same thing.
11. **The progress table keeps the five columns slice 020 left it and simply
    gains room.** Rejected: spending the new width on columns 020 removed —
    that slice was about what the table says, not how wide it is.

## Notes for the reviewer

- **The riskiest criterion is 4.** The whole geometry moves, and a lesson page
  between 1280 px and 1407 px must come out bit-identical to today. It is
  measured before and after on the same pages, not eyeballed.
- **Criterion 12 is yours, and it has two halves.** The line length is the one
  this slice can least defend from measurement: 79 characters is the reference's
  number, read in English, and Polish sets wider. If it reads badly, the fix is
  one number and a new slice, not a rescue inside this one.
- **§4 is the paragraph most likely to be regretted.** It gives back the jump
  that slice 012 was written to remove. It is what you chose after being shown
  it in those words, and it is written down so the regret has evidence.
- **At 2560 px this slice does not finish the job.** The band centres, the
  lesson does not, and a lesson page on a large monitor keeps 1265 px of slack
  on its right. That is out of scope by decision, and it is the obvious next
  thing to look at once these two pages are right.
