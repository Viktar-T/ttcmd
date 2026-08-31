# spec.md — 011-lesson-columns

- **Slice:** 011
- **Status:** written in an autonomous run (AGENTS.md §2, "Two modes") —
  unapproved by construction; Viktar reviews the `## Decisions taken` section
  and the final report afterwards
- **Date:** 2026-08-31
- **Amended:** 2026-08-31, before implementation, on the strength of the
  fresh-context test AGENTS.md §2 requires. The plan's subagent could produce a
  plan from this file, but only by guessing three numbers this spec fixed by
  reference instead of stating: the width of the article's column, the gap
  between the columns, and whether the page margin exists below the fold. Those
  three are now stated — §4, decision 12, §2 — and criterion 6's wording is
  disambiguated. Nothing else changed, and nothing was changed to match code:
  no code exists yet.
- **Supersedes:** slice 007's *placement* of the contents panel — §2 of that
  spec ("the panel hangs in the margin to the left of the article's column")
  and its decision 8. Constitution Article IX: slices are append-only, so 007
  is not rewritten; this file is the record of the change. **Everything else
  007 decided stands** and is re-verified rather than re-argued.
- **Depends on:** 004 (the measure and the wide lane, neither of which moves),
  006 (the page frame's full-width lane and its centred content track),
  007 (the panel itself, and every behaviour of it), ADR-0012 (structural
  rules), constitution Articles VIII (server-rendered by default) and IX
- **Unblocks:** 012 (search), which needs somewhere on a lesson page to live

---

## Why

**The contents panel is not beside the article. It is parked in the article's
left slack, and it is too narrow to read.**

Measured on `1c` at a 1585-pixel viewport: the panel is **208 pixels** wide and
the article is **centred** — 624 pixels of text starting 481 pixels in, with 480
pixels of unused width on the right and the panel tucked into the 480 pixels on
the left. Slice 007 chose that on purpose, and said why in as many words: the
site has one left edge, and a panel that pushed the article rightward would
break that edge on exactly one kind of page. The panel was therefore given the
one place that could not move the article — the gutter — and the gutter's
minimum is 1rem, so the panel had to fit in whatever the gutter happened to be.

The cost of that choice is now visible on every lesson:

- **Entries wrap every two or three words.** The panel's widest entry, in `1c`,
  sets as *„Badanie, które / wyszło odwrotnie, / niż wszyscy / zakładali"* —
  four lines for one section title. A jump list a reader has to decode is not a
  jump list.
- **The page has no second column.** A 208-pixel strip against a centred
  article reads as a decoration in the margin, not as navigation.
- **The panel begins below the lesson header**, because it starts where the
  article starts and the article starts under the header. The reader's first
  sight of a lesson is therefore a title with nothing beside it, and the
  navigation appears only after scrolling into the prose.

The reference does the plain thing: a wide navigation column on the left, the
article immediately to its right, the pair aligned left, and the leftover width
falling on the right where nobody needs it. This slice adopts that arrangement.

**The columns are the only thing that looks different afterwards.** No new
colour, no new typeface, no change to type sizes, no rule restyled, no spacing
changed inside either column, no component redesigned. The panel keeps
everything 007 gave it — its own scrollbar, the active section following the
reader, the skip control, the back-to-top control, the disclosure on small
screens — and only its **width** and its **place in the page's grid** change.

## What

### 1. The lesson page is two columns

Where the viewport is wide enough, a lesson page's body is a grid of **two real
columns**:

- **Left: the contents.** A column of the page's own grid, not an item placed
  in a gutter. Its width is its own, decided below, and nothing about the
  article constrains it.
- **Right: the lesson.** The lesson header, the article, and the previous/next
  pair — everything that is the lesson itself — in one column, immediately to
  the right of the contents.

The two columns **begin level with each other**: the contents column's top edge
is the top edge of the lesson header, not the top edge of the prose beneath it.
That is the point of putting the lesson header inside the right column rather
than spanning both — a reader arriving at a lesson sees the title and the
navigation at the same moment.

The contents column stays on screen as the article scrolls, keeps the height cap
and the independent scrollbar 007 gave it, and keeps the vertical rule on its
inner edge at the same distance from the article as today. None of that is
re-decided here.

### 2. The pair is aligned left

The two columns are anchored to the **left** of the viewport, one page margin
in, and **all leftover width falls on the right**. Nothing is centred: not the
pair, not the article inside it.

**The page margin exists only where the second column does.** Below the fold
there is no pair to anchor, and the page keeps the gutters slice 006 gave it,
unchanged and unmeasured-against — see §5.

That is what makes the arrangement legible as two columns rather than as one
column with an ornament, and it is what buys the contents column a width that
does not depend on how much slack the viewport happens to have.

The consequence is stated rather than discovered: **on a lesson page, at these
widths, the article no longer shares the site's one left edge.** The site header
and the accent band keep the centred lane every page has had since slice 006 —
they are the site's chrome and they are identical on every page — and the
lesson's body is left-aligned beneath them. Slice 006's rule holds everywhere it
held before; the lesson's two-column body is the one exception, and it is the
exception this slice exists to create.

### 3. The contents column is wide enough to read

The requirement is observable, and it is taken from the corpus rather than from
taste: **every entry the panel renders today sets on at most two lines, and an
entry that wraps breaks on a phrase, not after two words.**

The written corpus is 7 lessons and 56 top-level sections. The longest lesson
row is 42 characters (`0c Git i GitHub — minimum, które wystarczy`); the longest
section entry is 56 (`- Badanie, które wyszło odwrotnie, niż wszyscy
zakładali`). The panel is set in the structural face at the size 007 gave it,
and that size does not change here — so the requirement reduces to a count of
characters on a line, which is checkable in a browser and stays checkable as
lessons are added.

**At least 36 characters of the panel's own face fit on one line of a section
entry.** At that width 48 of the 56 section entries set on a single line, and
none of the remaining 8 exceeds two.

### 4. The article gains nothing

The width freed by not centring goes to the contents column and to the
right-hand slack. **It does not go to the article.**

- **The measure does not move.** Prose has a comfortable line length; a wider
  column is not a better one, and slice 004 measured this one. It stays at
  **39rem — 624 px rendered**.
- **The wide lane does not move.** Tables, diagrams and figures keep the wider
  column 004 gave them inside the article, at the same width, in the same
  relation to the measure and to the rule beside them. That is the content
  width less the frame's two gutters: **46rem — 736 px rendered**, with the
  measure centred inside it, 56 px of lane showing on each side.

So the article is the same article, at the same two widths and the same
internal offset, moved to the right of the contents column. Its **left edge on
the page necessarily changes** — that is what §2 does — and criterion 6 is
about the two widths and the offset, never about an absolute position.

### 5. Below the fold, nothing changes

Two columns is a wide-viewport arrangement. **Below the width at which the
second column appears, the lesson page is exactly what it is today**: one
column, the article on one screen width, the contents folded into the collapsed
disclosure 007 built between the lesson header and the first paragraph, and no
horizontal scrollbar at any width.

The fold is **1280 pixels** — the same boundary 007 chose, so the widths that
slice's checks name (1024, 768, 375) behave exactly as they did.

### 6. Everything 007 shipped still works

Not re-litigated, not re-derived, and not permitted to regress:

- the active section following the reader, with its three edge behaviours
  (nothing above the first heading, the last section at the document's bottom,
  a followed link highlighting its target);
- the panel's own scrollbar and its self-scrolling to keep the active entry
  visible, with the page never moving because of it;
- the skip control as the panel's first focusable;
- the back-to-top control;
- the disclosure, and the no-JavaScript behaviour of everything;
- the structural rule between the two columns, and every contrast floor the
  build computes.

### 7. What this slice does not touch

Stated because silence would be a decision anyway:

- **The module page, the module grid and the home page are not lesson pages**
  and **nothing happens to them.** The module page's lesson list already is the
  panel — 007 said so — and none of the three has an article to stand a column
  beside.
- **The site header and the accent band** keep their geometry, on every page
  including lesson pages.
- **No content file is edited.**

### 8. Where it is checked

The written content is the test, as in every slice since 003:

- **`1c`** — the lesson Viktar measured, and the one carrying the 56-character
  entry that wraps four ways today.
- **The longest lesson** (`1d`, 404 lines, 9 sections) — the scroll case.
- **Module 0's single lesson** — the degenerate panel, one row, still correct.
- **The reference page**, whose panel specimen must show the width the site
  actually uses, or it is a reference that lies.

## Out of scope

Refused deliberately, not forgotten:

- **Search.** That is slice 012, and this slice leaves it a column to live in.
- **Content changes.** No file under `content/` is touched.
- **A footer, header links, new components.**
- **Any change to the module page, the module grid or the home page.**
- **Re-opening the measure**, the wide lane, the type scale, the rhythm, the
  palette or any rule value.
- **The shrinking logo and the persistent logo mark**, still unscheduled since
  006 pointed at them and 007 declined them.
- **Aligning the site header or the accent band to the lesson's new left edge.**
  It is the visible consequence of §2, it is recorded there, and changing shared
  chrome for one kind of page is a decision of its own — not a side effect of
  this one.

## Acceptance criteria

Observable conditions. Each is checked and the check's output is the evidence.
Measurements are taken from a rendered page in a real browser.

1. `npm run build` succeeds. The colour-literal guard passes and the build's
   contrast check prints the same ratios as before this slice — no token moved.
2. On a lesson page at 1280 px and at 1585 px, the contents and the lesson are
   **two columns**: the contents column's right edge is at or left of the lesson
   column's left edge, and their vertical extents overlap.
3. **The columns begin level.** The contents column's top edge equals the top
   edge of the lesson header, within 1 px, at both widths.
4. **The pair is aligned left and the slack is on the right.** The gap between
   the viewport's left edge and the contents column is the same small page
   margin at 1280 px and at 1585 px; the gap between the lesson column's right
   edge and the viewport's right edge is larger than that margin at both widths,
   and grows with the viewport while the left margin does not.
5. **The contents column reads.** Its content box fits at least 36 characters of
   its own face on one line; in `1c` the entry `- Badanie, które wyszło
   odwrotnie, niż wszyscy zakładali` occupies **two** rendered lines, not four,
   and no entry in `1c` or in the longest lesson occupies more than two.
6. **The article is unchanged — in width, not in position.** At 1280 px and at
   1585 px the prose text column is 624 px and the wide lane 736 px, the two
   numbers they measured on the same pages before this slice, and the wide
   lane's offset from the prose column is the 56 px it was. The article's left
   edge on the page is expected to move — §2 and §4 say so — and is not part of
   this criterion. Shown by the same measurement run before and after.
7. Slice 007's structural criteria still hold on the longest lesson at 1280 px,
   read from the rendered markup: every lesson of the module in `order` with
   identity string and title; the current lesson expanded with one entry per
   top-level section in document order; the current lesson's row not a link and
   every other row and every section entry a link; the panel a navigation
   landmark named "Spis treści", distinct from the breadcrumb landmark.
8. Slice 007's behavioural criteria still hold, demonstrated in a browser: no
   section highlighted at the top of a lesson; the section that has passed the
   reading line highlighted, and only it, carrying the assistive
   current-location mark; the last section highlighted at the document's bottom;
   following a section entry jumps to it, lands the heading below the top edge,
   and moves the highlight.
9. On a viewport short enough that the panel's content overflows it, the panel
   has its own scrollbar and scrolls independently: scrolling it to its end
   leaves the page's scroll position unchanged.
10. The panel's first focusable element is the skip control, hidden until
    focused; activating it moves focus into the article. The back-to-top control
    is absent at the top of a lesson and present after a viewport of scroll.
11. At 1024 px, 768 px and 375 px the contents column is absent, the collapsed
    disclosure renders between the lesson header and the first paragraph, and
    the document has no horizontal scrollbar.
12. With JavaScript disabled at 1280 px, every lesson link and section link
    navigates, the disclosure opens and closes, no highlight appears, no
    back-to-top appears, and the console shows no errors.
13. **The other pages did not move.** The home page, the module grid and a
    module page measure identically before and after this slice at 1280 px and
    1585 px — same left edges, same widths. So do the site header and the accent
    band, on a lesson page and on a module page.
14. The reference page's panel specimen renders at the width the lesson page
    uses, and the reference page renders without error at 1280 px and 375 px.
15. The slice's own diff touches no file under `content/`, adds no dependency,
    and adds no network request to any page.
16. **Human eye, and therefore left unchecked by the run that builds it:** the
    lesson page reads as two columns — the contents on the left, the article
    beside it, the pair aligned left — at a width a laptop actually has.
17. The fresh-context review reports no gap against these criteria and nothing
    outside this slice's scope touched.

## Decisions taken

Per AGENTS.md §4. One line each, naming what was rejected.

1. **The contents becomes a column of the lesson page's own grid.** Rejected:
   keeping 007's gutter placement and merely widening the panel — the gutter's
   width is whatever centring leaves over, which is the whole complaint.
2. **The lesson header joins the article's column, so the contents column starts
   level with it.** Rejected: leaving the header spanning both columns, which is
   exactly what puts the panel below the title today.
3. **The previous/next pair joins that column too.** Rejected: leaving it in the
   old centred track, which would strand it under the contents column with a
   different left edge from the article it follows.
4. **The pair is anchored 2rem from the viewport's left edge — the frame's own
   1rem gutter, doubled.** Rejected: the bare 1rem gutter, which puts a reading
   column as tight to the glass as a full-bleed band; and a large left margin,
   which is centring under another name.
5. **All leftover width falls on the right.** Rejected: centring the pair as a
   unit — it leaves slack on both sides, pushes the article further right at
   every viewport, and is a variant of the arrangement the roadmap's measurement
   is a complaint about; and anchoring the pair at the site's existing centred
   left edge, which simply does not fit at 1280 px.
6. **The contents column is 22rem (352 px).** Rejected: 13rem, today's, whose
   19 characters a line are the defect; 18rem, which still wraps a third of the
   corpus onto two lines and the longest entries onto three; and 26rem and
   above, which starts to compete with the article for attention and eats the
   right-hand slack at the fold for entries no lesson has.
7. **The article gains nothing: the measure stays 39rem and the wide lane stays
   at the content width.** Rejected: spending the freed width on a longer line —
   a wider measure is not a better one and 004 measured this one; and widening
   the wide lane, which would move tables and diagrams nobody asked to move.
8. **Two columns at 1280 px and wider — 007's boundary, kept.** Rejected:
   lowering it to about 1150 px, where the pair fits but with almost no
   right-hand margin left; and raising it, which withholds the arrangement from
   the laptops the slice exists for. Keeping it also means every width 007's
   checks name behaves identically.
9. **The site header and the accent band keep their centred lane, on every
   page.** Rejected: moving the band's breadcrumb onto the lesson's new left
   edge, which would split the wordmark and the breadcrumb — a pair aligned on
   every page since 006 — onto two edges, and would change a component shared
   with the module page for the sake of one kind of page.
10. **Nothing happens to the module page, the module grid or the home page.**
    Rejected: giving the module page a column of its own, when its lesson list
    already is the panel and it has no article to stand beside.
11. **The vertical rule stays on the contents column's inner edge, at the same
    distance from the article as today.** Rejected: moving it into the gap as an
    element of its own, which is a new thing to style for no visible gain.
12. **The gap between the columns keeps the value 007 used — 1.5rem, measured
    from the rule on the contents column's inner edge to the article
    container's edge, not to its text.** Rejected: widening it with the room
    now available, which would change spacing this slice says it does not
    change; and measuring it to the text, which would silently add the 56 px
    of wide lane to the gap and push the pair 56 px wider for nothing.
13. **The reference page's panel specimen follows the new width.** Rejected:
    leaving the specimen at the old width, which turns the page whose job is to
    show what the site looks like into a page that lies about it.
14. **Everything else 007 decided is re-verified, not re-argued** — the reading
    line, the anchor landing offset, the height cap, the scroll threshold, the
    row states, the disclosure. Rejected: re-deriving any of them for the new
    geometry; none of them depends on where the columns are.

## Notes for the reviewer

- **The riskiest criterion is 6.** Everything else here is placement. The
  article's own geometry is the thing 004 measured and 007 promised not to move,
  and this slice moves the article's *container*. It is measured before and
  after on the same pages, not eyeballed.
- **Criterion 16 is yours.** Whether a 352-pixel navigation column beside a
  736-pixel article, both pushed left with the slack on the right, reads as two
  columns or as an unbalanced page is a judgement about the look of the site,
  and the run that builds it cannot make it.
- **§2's last paragraph is the decision most likely to be vetoed.** The site's
  chrome stays centred while the lesson's body goes left, so on a wide screen
  the breadcrumb above a lesson no longer sits over the lesson's title. The
  alternative — moving the band, and then the header, and then every page — is a
  slice, not a side effect, and decision 9 says why it was not taken here.
