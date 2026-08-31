# plan.md — 011-lesson-columns

- **Slice:** 011
- **Date:** 2026-08-31
- **Written from the spec alone**, by a subagent whose only inputs were
  `constitution.md`, `AGENTS.md` and `specs/011-lesson-columns/spec.md`
  (AGENTS.md §2, autonomous mode, requirement 1). No file under `app/`,
  `components/`, `lib/`, `content/`, `docs/` or `specs/007-*` was opened, and no
  search was run over the tree. Every repo file named below is therefore an
  inference from the constitution's conventions, and the ones I am guessing are
  marked `?`.
- **Answers HOW.** The why is in `spec.md` and is not re-argued here.
- **New dependencies:** none. CSS Grid and `position: sticky` are native; a
  dependency would need an ADR (AGENTS.md §8) and criterion 15 forbids one.
- **New components, tokens, colours, type sizes or spacing values:** none. The
  only values this slice introduces are the two the spec fixes — a 22rem
  contents column and a 2rem page margin — and each is expressed in exactly one
  place.

---

## 1. The shape of the change

### 1.1 The boxes

Above the fold the lesson page's body is one grid with two columns and three
rows. Source order is unchanged from today; **placement**, not source order,
makes the left column:

```
lesson body  (grid at >= 1280px; today's block flow below it)
├─ row 1, col 2     lesson header
├─ rows 1-3, col 1  contents panel   (sticky, align-self: start)
├─ row 2, col 2     article
└─ row 3, col 2     previous/next pair
```

DOM order stays `header → contents → article → prev/next`. That order is forced
by criterion 11: below the fold the collapsed disclosure must render *between
the lesson header and the first paragraph*, and below the fold there is no grid,
so the DOM order is what renders. Above the fold, explicit line-based placement
lifts the panel into column 1 and spans it across all three rows, which is what
makes criterion 3 (level tops) true without moving the panel in the DOM. This
reconciliation — one DOM, two arrangements, no duplicated markup — is the single
most consequential implementation decision in the slice; see §4.1 for the
alternatives that do not work.

The right column is **not** wrapped in a container of its own. Three separate
grid items each placed in column 2 gives the same visual result as a wrapper,
avoids inventing a component, and keeps the panel's DOM position between the
header and the article. If a wrapper already exists around the article and the
prev/next pair, use it and reduce the grid to two rows — the arithmetic below is
unaffected.

### 1.2 The numbers

Constants, all from the spec, at a 16px root (the spec's own `22rem (352 px)`
fixes the root):

| Symbol | What | Value | Source |
| --- | --- | --- | --- |
| `M` | page margin, left of the pair | 2rem = 32px | decision 4 |
| `C` | contents column | 22rem = 352px | decision 6, §3 |
| `G` | gap between the columns | **007's value — not named in the spec**; working value 2rem = 32px | decision 12; see §5 gap 1 |
| `A` | article column = the wide lane = the content width | **46rem = 736px** | "a 736-pixel article", Notes for the reviewer; §4, decision 7 |
| `P` | prose measure | 39rem = 624px | §4, decision 7 |
| `F` | fold | 1280px | §5, decision 8 |

`P` sits centred inside `A`: 736 − 624 = 112 = 2 × 56px (3.5rem each side). This
is corroborated by the spec's own pre-slice measurement — at 1585px the text
starts at 481px, and (1585 − 624) / 2 = 480.5. Criterion 6 requires that
relation to survive, whatever it turns out to be; do not re-derive it, preserve
it.

Derived geometry, **identical at every viewport at or above the fold** (this is
the point of anchoring left):

| Edge | x |
| --- | --- |
| contents column, left | 32 |
| contents column, right (the vertical rule) | 384 |
| article column, left (= wide lane, left) | 384 + `G` = **416** |
| prose measure, left | 416 + 56 = **472** |
| prose measure, right | 472 + 624 = **1096** |
| article column, right (= wide lane, right) | 416 + 736 = **1152** |
| **pair total, viewport-left to article-right** | **1152** |

| Viewport | left margin | right slack | check |
| --- | --- | --- | --- |
| 1280 | 32 | 1280 − 1152 = **128** | 128 > 32, criterion 4 holds |
| 1585 | 32 | 1585 − 1152 = **433** | grows with the viewport, left margin does not — criterion 4 holds |

The pair needs 1152px. The fold at 1280px leaves 128px of headroom, which is the
arithmetic behind decision 8's "about 1150 px" — and, read backwards, the reason
`G ≈ 2rem` is the right working value: 32 + 352 + 32 + 736 = 1152.

**How the article moves** (state this in the report; a reviewer reading
criterion 6 as "the article does not move" will be surprised):

| | prose left, before | prose left, after | prose width |
| --- | --- | --- | --- |
| at 1280 | (1280 − 624)/2 = 328 | 472 | 624, both |
| at 1585 | 480.5 | 472 | 624, both |

Criterion 6 is about **widths and the intra-article offset**, not absolute x.
The article's left edge necessarily changes — that is §2 of the spec. What must
be byte-identical is: prose width 624, wide lane width 736, and the 56px offset
between them.

### 1.3 What changes at the fold, and what does not

- **At or above 1280px:** the lesson body leaves the frame's centred content
  track, sits in the frame's full-width lane (006 already provides one — §1's
  dependency list says so), takes a 2rem left padding, and becomes the grid
  above. Nothing else on the page moves: the site header and the accent band
  keep the centred lane (decision 9, criterion 13).
- **Below 1280px:** nothing. Not "the same", *nothing* — every declaration this
  slice adds lives inside the `min-width` query, and the mobile-first rules are
  not touched. The 2rem margin does not exist below the fold; the sub-fold
  gutter stays whatever 006 gave it. This is how criterion 11 is made cheap to
  verify: the measured geometry at 1024, 768 and 375 must equal the T01 baseline
  exactly, not approximately.

### 1.4 CSS sketch

Selector names are illustrative — the real ones depend on the styling mechanism
(§2). What is not illustrative is the set of declarations:

```css
/* everything this slice adds is inside this query, and it is 007's own
   breakpoint declaration copied, not retyped */
@media (min-width: 1280px) {
  .lesson-body {
    display: grid;
    grid-template-columns: 22rem 46rem;   /* C · A — A from the existing content-width source */
    grid-template-rows: auto auto auto;   /* header · article · prev/next */
    column-gap: <007's gap>;              /* G, read from 007, not chosen here */
    justify-content: start;               /* all leftover width falls right */
    padding-inline-start: 2rem;           /* M */
  }
  .lesson-header   { grid-area: 1 / 2;         min-width: 0; }
  .lesson-contents { grid-area: 1 / 1 / 4 / 2; min-width: 0;
                     align-self: start;        /* without this, sticky is inert */
                     position: sticky; top: <007's offset>; }
  .lesson-article  { grid-area: 2 / 2;         min-width: 0; }
  .lesson-prevnext { grid-area: 3 / 2;         min-width: 0; }
}
```

Four details that are load-bearing:

1. **Explicit rows.** `grid-template-rows: auto auto auto` plus numbered
   `grid-area`s. Auto-placement with this source order puts the panel in the
   wrong cell, and `grid-row: 1 / -1` against an implicit grid resolves against
   the *explicit* grid's last line — which is line 1 when no rows are declared.
   Declare the rows.
2. **`align-self: start`.** A grid item spanning rows 1–3 is stretched to the
   whole area by default; a box that is already as tall as its area has nothing
   to stick to and `position: sticky` silently does nothing. With
   `align-self: start` the panel is content-height, its sticky containing block
   is the spanned area, and it releases at the bottom of the prev/next row —
   which is exactly "stays on screen as the article scrolls".
3. **`min-width: 0`** on every item. A grid item's automatic minimum size is its
   content's min-content size; one long unbreakable token in the article (a URL,
   a code line) can otherwise push the item past its fixed track and into the
   document's scrollable overflow.
4. **`justify-content: start`**, not `margin-right: auto` and not centring. Two
   fixed tracks in a full-width container distribute leftover space per
   `justify-content`; `start` is §2 of the spec in one word.

### 1.5 Where the 352px is written

Exactly once. Criterion 14 requires the reference page's specimen to render at
the width the lesson page uses, and two literals drift. Preference order:

1. If 007 declared the panel's width as a custom property (e.g. a
   `--contents-width: 13rem`), **change its value to 22rem** and use it in
   `grid-template-columns`. One edit, criterion 14 free.
2. Otherwise declare the property once at the scope both the lesson layout and
   the reference specimen can see, replacing 007's literal.

Do not leave a `13rem` anywhere above the fold. Confirm in T02 whether that
literal is also used below the fold (it should not be — below the fold the panel
is a full-width disclosure); if it is, only the above-fold use changes.

Similarly, `A` must come from the **existing** content-width source, not from a
fresh `46rem`. The spec's promise is that the article keeps the width it has;
the implementation should make that structurally true rather than numerically
coincidental.

---

## 2. File map

The constitution gives me App Router with `app/` at the repo root, TypeScript,
MDX under `content/`, Server Components by default. It does not tell me the
route segment names, the component directory, or **the styling mechanism** — CSS
Modules, a global stylesheet, or utility classes in JSX. That last unknown is
the biggest one in this table: it decides whether §1.4 is a `.module.css` block
or a set of class strings. Everything marked `?` is a guess to confirm before
touching it.

| # | Role | Expected path | What changes |
| --- | --- | --- | --- |
| 1 | Lesson route page — renders header, contents, article, prev/next | `app/moduly/[modul]/[lekcja]/page.tsx` `?` — segment names and nesting depth are guesses; the route may be a catch-all | Ensure the four blocks are siblings in one body container in the order header → contents → article → prev/next, each addressable for grid placement. Preserve every `id` used as a link target. Add no client boundary. |
| 2 | Lesson layout, if one exists | `app/moduly/[modul]/[lekcja]/layout.tsx` `?` — may not exist at all | If the centred content track is applied here, this is where the lesson body opts into the frame's full-width lane above the fold. |
| 3 | Root layout / page frame (006's full-width lane + centred track, site header, accent band) | `app/layout.tsx` — the path is near-certain; that the lane definitions live here is a guess `?` | **Read only, ideally.** Criterion 13 forbids moving the header or the band. If the lane classes are defined here, consume them; do not redefine them. |
| 4 | Contents panel component (007) | `components/…` `?` — directory and filename both guesses | Width source 13rem → 22rem (or the width declaration is deleted and the track governs). Sticky offset, height cap, `overflow-y`, the rule on the inner edge: unchanged. |
| 5 | The panel's client island — highlight, self-scroll, back-to-top, disclosure | a `"use client"` file beside #4 `?` | **Aim for untouched.** Only edited if T04 proves the move broke a measurement (see §4.5). |
| 6 | Stylesheet(s) owning the lesson page's layout | unknown mechanism `?` — `app/…/*.module.css`, a global stylesheet, or classes inline in #1 | Home of the `@media (min-width: 1280px)` block in §1.4. Nothing added outside that query. |
| 7 | Reference page (the specimen page) | `app/…/` `?` — the spec calls it "the reference page"; I cannot name the route | The panel specimen follows the lesson column's width (decision 13, criterion 14). Must still render at 375px. |
| 8 | Slice notes — baseline, constants, verification log | `specs/011-lesson-columns/measurements.md` (new file, certain) | Created in T01, appended in T02, T04, T06. It is the evidence criteria 6 and 13 compare against. |
| 9 | The slice's task list | `specs/011-lesson-columns/tasks.md` (new file, certain) | Derived from §3 below. |

**Not touched, and the diff must prove it:** anything under `content/`
(criterion 15), `package.json` and the lockfile (criterion 15), the module page,
the module grid, the home page (§7, criterion 13), the site header and the
accent band (decision 9), `constitution.md` (Article X).

---

## 3. Order of work

Each step is one commit, `011/TNN:`. `npm run build` must be green at the end of
every step that changes code — criterion 1 is not a final check, it is a gate on
each commit.

### T01 — Baseline, before any code change

**Criteria 6 and 13 compare before with after. The "before" cannot be recovered
once the code changes.** This step touches no code.

Capture, from the running dev server in a real browser, at **375, 768, 1024,
1280 and 1585**:

- **`1c`** (the measured lesson) and **`1d`** (the longest): `getBoundingClientRect()`
  for the prose text column, a wide-lane element (a table or a figure), the
  article container, the lesson header, the contents panel, and the prev/next
  pair. Record left, right, width **and top** — the vertical offsets matter, see
  §4.4.
- The derived numbers criterion 6 names: prose width, wide-lane width, and
  wide-lane-left minus prose-left.
- **Module 0's single lesson**: the degenerate panel.
- **The home page, the module grid, a module page**: main landmark left/width;
  site header left/width; accent band left/width. Also the site header and band
  **on a lesson page** — criterion 13 names both.
- **The reference page**: that it renders, and the panel specimen's width.
- `document.documentElement.scrollWidth` vs `clientWidth` at every width (the
  horizontal-scrollbar check, criterion 11).
- **Criterion 5's "before"**: the number of rendered line boxes for the entry
  `- Badanie, które wyszło odwrotnie, niż wszyscy zakładali` in `1c` (expect 4),
  via the count of client rects on the inline box.

**No new dependency means no Playwright and no Puppeteer** (criterion 15). Use
the session's own browser tooling against the dev server, and save the numbers
as text in `specs/011-lesson-columns/measurements.md`.

*Check:* the file contains a number for every page × width the criteria name;
`git status` shows changes only under `specs/011-lesson-columns/`.
*Serves:* the "before" half of criteria 6 and 13, and the premise of criterion 5.

### T02 — Confirm the constants the arithmetic depends on

Read out of the existing source, and write into the same notes file, the actual
value of: today's panel width; **the gap 007 used, and whether it is measured to
the article's container edge or to its text** (§5 gap 1); the exact breakpoint
declaration (px or rem) and its media-query form; the content-width value (is it
46rem?); the measure (39rem) and how it relates to the wide lane; the panel's
sticky top offset, height cap and overflow rules; where the vertical rule is
declared; whether the panel's width literal is also used below the fold.

Then recompute §1.2 with the real numbers and record the corrected table.

Also measure now, before any layout work: **at a 352px track with today's
padding, how many characters of the panel's face fit on one line.** If it is
below 36, criterion 5 and the spec's "no spacing changed inside either column"
are in tension, and that must surface here rather than after the layout is built
(§5 gap 7).

*Check:* every symbol in §1.2 has a confirmed value; the recomputed table is
written down; the character count is recorded.
*Serves:* the correctness of everything after it. No code change.

### T03 — The lesson body becomes two columns

The whole geometry in one commit: DOM order settled, the grid declared inside
the fold query, the track at 22rem, the body in the frame's full-width lane
above the fold, `justify-content: start`, the panel sticky and `align-self:
start`. Nothing outside the media query.

*Checks:*

- `npm run build` green (criterion 1).
- At 1280 and 1585: contents right edge at or left of the article's left edge and
  the extents overlapping (criterion 2); contents top equal to header top within
  1px (criterion 3); left gap 32px at both, right gap greater than 32px at both
  and larger at 1585 (criterion 4); the contents content box fitting at least 36
  characters, `1c`'s longest entry on **two** lines, nothing in `1c` or `1d` over
  two (criterion 5).
- At 1024, 768, 375: contents column absent, disclosure between the lesson
  header and the first paragraph, `scrollWidth == clientWidth` (criterion 11),
  and every measured number equal to the T01 baseline.
- Prose width, wide-lane width and their offset equal to the baseline at 1280 and
  1585 (criterion 6, first pass — repeated in T06 as the formal comparison).

### T04 — Re-verify everything 007 shipped, in the new container

Nothing here is re-decided (decision 14). This step re-runs 007's own checks
against the moved panel and fixes only what the move broke.

*Checks:*

- Rendered markup on `1d` at 1280: every lesson row in `order`, identity string
  and title; the current lesson expanded, one entry per top-level section in
  document order; the current row not a link and every other row and section
  entry a link; the navigation landmark named "Spis treści", distinct from the
  breadcrumb landmark (criterion 7).
- In a browser: nothing highlighted at the top; the passed section highlighted
  and only it, with the current-location mark; the last section highlighted at
  the bottom; a followed entry jumps, lands the heading below the top edge, and
  moves the highlight (criterion 8).
- On a viewport **chosen short enough to overflow the panel** — the wider column
  makes the panel shorter, so pick e.g. 1280 × 500 deliberately (§4.6): the
  panel scrolls independently and the page's scroll position is unchanged
  (criterion 9).
- Skip control first focusable, hidden until focused, moves focus into the
  article; back-to-top absent at the top and present after a viewport of scroll
  (criterion 10).
- JavaScript disabled at 1280: links navigate, the disclosure opens and closes,
  no highlight, no back-to-top, no console errors (criterion 12).

If nothing needed fixing, the commit is the verification log appended to
`measurements.md` — one task, one commit, and the evidence is the artifact.

### T05 — The reference page's specimen follows the width

*Checks:* the specimen's rendered panel width equals the lesson page's contents
column width, measured on both pages; the reference page renders without error
at 1280 and at 375 (criterion 14).

### T06 — The regression sweep

Re-measure exactly what T01 measured, on the same pages at the same widths, and
diff.

*Checks:*

- Home page, module grid, module page: identical left edges and widths at 1280
  and 1585; site header and accent band identical on a lesson page and on a
  module page (criterion 13).
- Article: prose width, wide-lane width, and the wide-lane-to-prose offset
  identical before and after at 1280 and 1585 (criterion 6). Absolute x is
  expected to differ — §1.2.
- `npm run build`: green, and the contrast check printing the same ratios as the
  T01 run (criterion 1).
- `git diff --stat` against the slice's base: no file under `content/`, no
  `package.json` or lockfile change (criterion 15); and no new network request
  on any page — no font, script or stylesheet URL added.

### T07 — Close the slice

Fresh-context review of the diff against `spec.md` (AGENTS.md §3, criterion 17).
`tasks.md` matches reality. The final report states plainly that **criterion 16
is left unchecked** — whether the page *reads* as two columns is a human
judgement — and names what to look at: a lesson page at about 1440px, the
contents on the left, the article beside it, the slack on the right.

### Criterion → step

| Criterion | Closed by |
| --- | --- |
| 1 build, contrast unchanged | gate on every step; formal diff in T06 |
| 2, 3, 4, 5 the two columns | T03 |
| 6 the article unchanged | T01 (before) + T06 (after) |
| 7, 8, 9, 10, 12 007's structure and behaviour | T04 |
| 11 below the fold | T03 |
| 13 the other pages did not move | T01 (before) + T06 (after) |
| 14 the reference page | T05 |
| 15 the diff's shape | T06 |
| 16 human eye | **not closable by this run** — named in T07's report |
| 17 fresh-context review | T07 |

---

## 4. Risks

### 4.1 The DOM-order trap (the one that decides the shape)

Criterion 11 puts the disclosure between the header and the first paragraph;
§1 puts the contents in the first column. Two tempting shapes both fail:

- **Wrap the lesson (header + article + prev/next) and put the panel first in
  the DOM.** Below the fold the disclosure then renders above the title. Fails
  criterion 11.
- **Wrap the lesson, put the panel last, use `order: -1`.** `order` applies only
  to flex and grid items; below the fold the container is neither, so the
  property is inert and the disclosure renders after the prev/next pair. Fails
  criterion 11.

Only explicit grid placement over an unchanged DOM order satisfies both. Do not
"fix" the resulting visual/DOM mismatch with `tabindex` or with duplicated
markup — two panels would double 007's ids and its landmark.

### 4.2 A horizontal scrollbar

The pair is 1152px inside a viewport of at least 1280px, so the grid itself
cannot overflow — but three things around it can:

- **A full-bleed trick inside the lesson body.** `width: 100vw` or
  `margin-inline: calc(50% - 50vw)` used to resolve against a centred box with
  about 424px of slack on each side; it now resolves against a left-anchored box
  with 128px of slack on the right at the fold. Grep the lesson body's styles for
  `vw` before T03 and check `scrollWidth` after. Note also that `100vw` includes
  the classic scrollbar while a `min-width` media query does not — a reliable
  scrollbar generator.
- **An unbreakable child of a fixed track.** Fixed tracks do not shrink and the
  item's automatic minimum size does not either; `min-width: 0` on the items
  (§1.4) is the guard. A genuinely over-wide table or code block is the
  article's own overflow handling and belongs to 004 — do not solve it here.
- **The vertical scrollbar's width** at the exact fold. 1184px of used width in a
  1280px viewport leaves 96px of headroom, so this cannot bite; the number is
  recorded so a future change knows what it is spending.

### 4.3 Never reach for `overflow-x: hidden`

If a scrollbar does appear, `overflow-x: hidden` on any ancestor of the panel is
the wrong fix and a silent one: it creates a scroll container, which kills
`position: sticky` outright — the panel stops following the reader and criterion
9 regresses, with no error anywhere. `overflow: clip` does not create a scroll
container and is the safe clip if one is ever genuinely needed. `transform`,
`filter` and `contain` on an ancestor are the same class of silent killer. Keep
the chain from the grid container up to the root free of them.

### 4.4 Margin collapsing, when a block container becomes a grid container

Margins do not collapse through a grid container. Turning the lesson body into a
grid can therefore change the vertical spacing between the header, the article
and the prev/next pair by exactly one collapsed margin — the classic silent
16–32px shift — and this slice says it changes no spacing. That is why T01
records **top** offsets, not only horizontal ones, and why T03's check compares
them. It also threatens criterion 3: a top margin on the panel would push the
column below the header's top edge.

### 4.5 The scroll-following highlight, the self-scroll, and the two controls

Everything 007 built keeps working by DOM continuity, but five things can regress
quietly:

- **Cached or computed geometry.** If the highlight logic derives a reading line
  or an observer `rootMargin` from a measured rect of the panel or the article,
  the move changes those numbers. Re-run 007's behavioural checks (T04) rather
  than reasoning about the code.
- **`offsetParent` changes.** A sticky element is a positioned element, so the
  panel becomes an `offsetParent` for its descendants if it was not already; any
  `offsetTop` arithmetic in the self-scroll shifts with it.
- **The self-scroll must not move the page** (criterion 9). If it uses
  `scrollIntoView`, it must stay `block: 'nearest'` — or operate on the panel's
  own `scrollTop`; a plain `scrollIntoView()` scrolls every scrollable ancestor,
  including the document.
- **Link targets.** The skip control and every section entry are `href="#id"`.
  If the restructure adds or renames a wrapper and an `id` moves or is dropped,
  the control fails with no error and criterion 10 fails. Preserve ids verbatim.
- **The back-to-top control.** If it is fixed to the viewport it is unaffected;
  if it is positioned relative to the centred content lane it will now be
  misplaced relative to a left-aligned article. Criterion 10 only tests
  presence — look at it anyway, and note that its placement is not this slice's
  to redesign.

Focus order is worth a sentence: the DOM order is unchanged, so the tab order is
unchanged, but above the fold the panel now paints level with the header while
still following it in the DOM. That mismatch is the same kind that exists today
(the panel paints left of the article and follows it in the DOM) and is not made
worse; do not "correct" it with `tabindex`.

### 4.6 The panel is now shorter, which changes what criterion 9 tests

Widening the column from 208px to 352px takes most entries from two lines to one,
so the panel's content is materially shorter and may no longer reach its height
cap at ordinary viewport heights. Criterion 9's premise — "a viewport short
enough that the panel's content overflows" — must be met deliberately by choosing
a short viewport for that check, or the check passes vacuously.

### 4.7 Server Components, and not widening the client boundary

Article VIII: Server Components by default. The grid is CSS and adds no
interactivity. The restructure must not move the lesson header or the article
inside 007's client island — a wrapper introduced for layout must be a Server
Component, and `"use client"` must not appear in any file that did not already
have it. Check the diff for it in T06.

### 4.8 Below the fold, "unchanged" must mean measured, not assumed

The only defence is discipline: every declaration inside the media query, and
T03's check comparing the sub-fold numbers to T01's baseline for equality. A
declaration that "looks harmless" outside the query is how criterion 11 dies.

### 4.9 The reference page at 375px

The specimen must show 22rem (criterion 14) and the reference page must still
render at 375px. A 352px specimen in a narrow page can overflow. If the specimen
is displayed inside a demo frame, the frame — not the panel's width — is what
adapts.

---

## 5. Gaps in the spec

Blunt, as asked. The spec is unusually complete: it fixes the column width, the
margin, the fold, the measure, the alignment, and it names 17 observable
criteria. What it does not fix is the arithmetic's inputs, and a plan written
without the repo cannot supply them.

1. **The gap between the columns is never a number.** Decision 12 fixes it by
   reference — "the value 007 used". Every derived edge in §1.2 depends on it. I
   have used 2rem = 32px, reverse-derived from decision 8's "about 1150 px"
   (32 + 352 + G + 736 ≈ 1150, so G ≈ 30). If the real value differs, every x
   after the contents column's right edge shifts by (G − 32) and the pair total
   with it. **Worse: the spec does not say whether 007's "distance from the
   article" is measured to the article's container edge or to its text.** I have
   assumed the container edge. If it is the text edge, the article column starts
   56px further right and the pair totals 1208px — which still clears criterion 4
   at 1280 (72px of right slack), so the slice survives either reading, but the
   implementer must know which one they are reproducing.
2. **The article column's width is stated only in a parenthetical.** §4 says the
   wide lane keeps "the content width" and decision 7 says the same; the number
   736 appears only in "Notes for the reviewer". §4 should have named it the way
   §3 names 22rem. If the content width is not 46rem, §1.2's table is wrong from
   the article's left edge onward.
3. **The relation between the measure and the wide lane is a comparison, not a
   value.** Criterion 6 requires the offset to be "unchanged", which is checkable
   but not computable. I inferred centring (56px each side) from 736 − 624 and
   from the pre-slice 481px. If the measure is not centred in the lane today,
   keep whatever it is and ignore my 472.
4. **The page margin's scope below the fold is not stated in one sentence.**
   Decision 4 anchors the pair 2rem from the viewport's left edge; §5 says
   nothing changes below the fold. Taken together, the 2rem exists only at 1280
   and above, and the sub-fold gutter stays 006's. That is how I planned it, but
   the spec never says it outright, and a careless implementation will apply 2rem
   everywhere and quietly fail criterion 11's equality with the baseline.
5. **Where the contents column sits in the DOM is not specified — and criterion
   11 constrains it.** This is correct for a spec (a spec that named the DOM
   would have leaked into the plan), but it means the hardest decision in the
   slice is made here, in §1.1 and §4.1, on the strength of criterion 11 alone.
   If the reviewer disagrees with grid placement over an unchanged DOM order,
   this is the paragraph to argue with.
6. **Criterion 6's wording invites a false failure.** "measure exactly what they
   measured on the same pages before this slice" reads as "the article does not
   move", and the article's left edge moves 144px right at 1280 and about 8.5px
   left at 1585 — necessarily, by §2. Read it as widths plus the intra-article
   offset. Worth a one-line correction in a later slice's record rather than a
   silent reinterpretation at review time.
7. **Criterion 5 may be in tension with "no spacing changed inside either
   column".** The 36-character floor is measured on the **content box**, which is
   352px minus the panel's existing padding and border. If today's padding leaves
   fewer than 36 characters at 352px, the two requirements collide, and neither
   the plan nor the implementer may resolve it by changing the padding. T02
   measures it early so the collision surfaces before the layout is built.
8. **The sticky offset is inherited without being restated.** The panel now
   begins level with the lesson header rather than with the article — higher up
   the page — and the spec does not say whether 007's sticky `top` still wants to
   be that value. Decision 14 ("none of them depends on where the columns are")
   is the answer I have taken: keep it. Flagged because it is the one inherited
   value whose meaning genuinely did change.
9. **How the browser measurements are taken is not the spec's business, but the
   plan is boxed in by criterion 15.** No new dependency means no Playwright and
   no headless-browser dev dependency; the baseline and every rendered check must
   run through tooling the executing session already has, against the dev server.
   If that tooling is unavailable, criteria 2–6 and 8–14 cannot be closed, and
   the run must stop and say so (AGENTS.md §3) rather than check boxes on
   inspection.

**Not gaps, recorded so they are not mistaken for ones:** the fold staying at
1280 while the pair fits from about 1152 is deliberate (decision 8); the chrome
staying centred while the body goes left is deliberate and flagged by the spec
itself (§2, Notes for the reviewer); the module page, the module grid and the
home page being untouched is deliberate (§7, decision 10).
