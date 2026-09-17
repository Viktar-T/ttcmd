# verification.md — 023-fill-the-width

Evidence for `tasks.md`. Boxes are `left / width` in CSS px from
`getBoundingClientRect()`. **A width named here is the window width**, with the
layout width (`document.documentElement.clientWidth`) beside it — the two differ
by a 15 px classic scrollbar, so `88rem` fires at a window of ~1423 px and
`80rem` at ~1295 px (spec, criteria preamble).

**Instrument.** The Claude desktop app's browser, driven against `npm run dev`
on `localhost:3000`, measuring a same-origin iframe sized to the window width
under test — so every width in one run, with no window resizing between them.
Verified faithful at T01: the iframe's numbers for `1c` at 1585 reproduce the
numbers read directly from the top-level window on 2026-09-17 (contents 32/352,
article column 408/736, prose 464/624).

**Which element is measured, fixed at T01 so the after-measurement cannot pick a
friendlier one:** `nav.contentsPanel` (the panel) · `.pageColumn` (the article
column) · `.prose` (the wide lane) · `.prose > p` (the prose column) ·
`nav.pager` · `.pageColumns` (the lesson/module wrapper) · `ul.moduleGrid` and
its first `li` · `section`/`header` on `/postep` · the first `main p` over 30
characters (the hero lede) · `table` · `[class*="page-module"]` on
`/styleguide` · `main > *` for the frame's own children.

---

## T01 — Baseline, 2026-09-17, before any code

### Commands

```
$ node scripts/check-design-invariants.mjs      # the first half of `npm run build`
  Design invariants OK.
  Contrast floors (Check E):
    dark (:root)               --text          on --bg               12.21:1  (needs 4.5)
    dark (:root)               --text-muted    on --bg                5.86:1  (needs 4.5)
    dark (:root)               --link          on --bg                8.67:1  (needs 4.5)
    dark (:root)               --accent-line   on --bg                8.67:1  (needs 4.5)
    dark (:root)               --accent-ink    on --accent-surface   10.27:1  (needs 4.5)
    dark (:root)               --rule-strong   on --bg                3.69:1  (needs 3)
    dark (:root)               --rule-quote    on --bg                5.86:1  (needs 3)
    dark (:root)               --present-ink   on --present-fill     10.05:1  (needs 4.5)
    dark (:root)               --present-line  on --bg                3.84:1  (needs 3)
    dark (:root)               --present-dim   on --bg                5.86:1  (needs 4.5)
    :root[data-theme="light"]  --text          on --bg               14.71:1  (needs 4.5)
    :root[data-theme="light"]  --text-muted    on --bg                6.34:1  (needs 4.5)
    :root[data-theme="light"]  --link          on --bg                5.86:1  (needs 4.5)
    :root[data-theme="light"]  --accent-line   on --bg                5.86:1  (needs 4.5)
    :root[data-theme="light"]  --accent-ink    on --accent-surface   10.27:1  (needs 4.5)
    :root[data-theme="light"]  --rule-strong   on --bg                3.64:1  (needs 3)
    :root[data-theme="light"]  --rule-quote    on --bg                6.34:1  (needs 3)
    :root[data-theme="light"]  --present-ink   on --present-fill     10.05:1  (needs 4.5)
    :root[data-theme="light"]  --present-line  on --bg                3.50:1  (needs 3)
    :root[data-theme="light"]  --present-dim   on --bg                6.34:1  (needs 4.5)
  exit 0

$ npx eslint            # `npm run lint`
  exit 0, no output

$ npx tsc --noEmit
  exit 0, no output
```

**`next build` could not be run from this session, and that is an environment
limit, not a result.** `npm run build` is
`node scripts/check-design-invariants.mjs && next build`, and `next build`
fetches Inter and JetBrains Mono from `fonts.googleapis.com` at build time. Both
shells available here — the desktop workspace and the cloud container — are
behind an egress proxy that refuses that host (`CONNECT tunnel failed, response
403`), so the font step fails before any page is compiled. The first half of the
command is run in full at every task below, `eslint` and `tsc --noEmit` stand in
for what `next build` would catch in code, and **criterion 1's `next build` is
left for one run on Viktar's machine** (AGENTS.md §3: a check that cannot be run
is reported, not assumed).

### Boxes — lesson `1c`

| window / cw | panel | article column | prose | pager | header lane | overflow |
| --- | --- | --- | --- | --- | --- | --- |
| 1585 / 1570 | 32 / 352 | 408 / 736 | 464 / 624 | 464 / 624 | 457 / 656 | 0 |
| 1407 / 1392 | 32 / 352 | 408 / 736 | 464 / 624 | 464 / 624 | 368 / 656 | 0 |
| 1280 / 1265 | 32 / 352 | 408 / 736 | 464 / 624 | 464 / 624 | 305 / 656 | 0 |
| 1024 / 1009 | absent | 137 / 736 | 193 / 624 | — | 177 / 656 | 0 |
| 375 / 360 | absent | 16 / 328 | 16 / 328 | — | 0 / 360 | 0 |

The wrapper `.pageColumns` is full-bleed at every width (0 / cw), as slice 012
recorded.

### Boxes — the band pages, before the band

| page | window / cw | the frame's children | grid | card | cards per row | overflow |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 1585 / 1570 | `section.hero` 464 / 624, `ul.moduleGrid` 464 / 624 | 464 / 624 | 464 / 197 | 3 | 0 |
| `/` | 1280 / 1265 | 464 / 624, 464 / 624 | 464 / 624 | 464 / 197 | 3 | 0 |
| `/` | 768 / 753 | 65 / 624, 65 / 624 | 65 / 624 | 65 / 197 | 3 | 0 |
| `/` | 375 / 360 | 16 / 328, 16 / 328 | 16 / 328 | 16 / 328 | 1 | 0 |
| `/moduly` | 1585 / 1570 | `header.lane` 464 / 624, `ul.moduleGrid` 464 / 624 | 464 / 624 | 464 / 197 | 3 | 0 |
| module page | 1585 / 1570 | `div.band` 0 / 1570, `div.pageColumns` 0 / 1570 | — | — | — | 0 |
| `/postep` | 1585 / 1570 | `header.lane` 464 / 624, `section.lane` 464 / 624 ×2 | — | — | — | 0 |
| `/styleguide` | 1585 / 1570 | `div.page` 408 / 736 | 464 / 624 | 464 / 304 | 2 | 0 |

The module page's own boxes at 1585 / 1570: panel 32 / 352, page column
408 / 736, its prose 464 / 624 — the lesson page's geometry exactly, which is
what slice 014 gave it. `/postep`'s table is 464 / 624. The home page's hero
lede is 464 / **522**: it shrink-wraps inside `.heroLede { max-width: 34rem }`,
the one hard-coded prose length in the tree (plan §5.1).

---

## T02 — The measure moves, the lane follows, the frame becomes the band

`app/tokens.css` · `app/globals.css`. T03 is in this commit; `tasks.md` says why.

### Commands

```
$ node scripts/check-design-invariants.mjs
  Design invariants OK.
  Contrast floors (Check E): ... identical to T01, all twenty rows ...
  exit 0

$ npx eslint        exit 0, no output
$ npx tsc --noEmit  exit 0, no output
```

### Boxes — lesson `1c`, criteria 2, 3 and 4

| window / cw | panel | article column | prose | pager | header lane | overflow |
| --- | --- | --- | --- | --- | --- | --- |
| 1585 / 1570 | 32 / 352 | **408 / 872** | **464 / 760** | **464 / 760** | **389 / 792** | 0 |
| 1409 / 1394 | 32 / 352 | 408 / 872 | 464 / 760 | 464 / 760 | 301 / 792 | 0 |
| 1407 / 1392 | 32 / 352 | 408 / 736 | 464 / 624 | 464 / 624 | 368 / 656 | 0 |
| 1280 / 1265 | 32 / 352 | 408 / 736 | 464 / 624 | 464 / 624 | 305 / 656 | 0 |

- **Criterion 2** — prose 760, wide lane 872, and 872 − 760 = 112, the 56 px a
  side slice 004 fixed, now arithmetic rather than a second literal.
- **Criterion 3** — the article column's right edge is 408 + 872 = 1280, so the
  gap to the viewport's right edge is 1570 − 1280 = **290 px**, against 426 at
  T01. The contents column is where it was.
- **Criterion 4** — the two rows at 1407 and 1280 are T01's rows, value for
  value. The wide fold is the only thing between them and the two rows above.
- **Criterion 8, first half** — the site header and accent-band lane is 389 /
  **792**, the measure plus the frame's two gutters, and it moved 68 px left as
  spec §5 said it would.

### The band, as far as this commit takes it

`main`'s content track is the band at 1585: on `/` it is 1296 centred with 144
either side, and the page's own blocks are still `.lane`-centred **inside** it —
`section.hero` and `ul.moduleGrid` at 413 / 760, four cards per row. That is the
expected intermediate state, and T04 is the commit that makes a lane start at
the band's left edge and takes the grid out of the lane. `/postep`'s three lanes
are likewise at 405 / 760.

### Instrument note, found here rather than assumed

In the measuring iframe a media query is evaluated against the **full iframe
width**, not the width less the scrollbar: the wide fold fires at window 1409 /
cw 1394. A top-level window excludes the scrollbar from that evaluation, so the
same fold arrives at a window of about 1423 there. Boxes are unaffected — they
are read from the same layout the query produced — and the boundary itself is
cross-checked in a real top-level window at T07.

---

## T04 — Inside the band: prose keeps the measure, the grid takes the width

`app/nav.css` · `components/module-grid.tsx` · `app/postep/page.tsx` ·
`app/postep/page.module.css`.

### Commands

```
$ node scripts/check-design-invariants.mjs   exit 0, contrast report identical to T01
$ npx eslint                                 exit 0, no output
$ npx tsc --noEmit                           exit 0, no output
```

### Boxes

| page | window / cw | hero / header lane | module grid | card | per row | overflow |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 1585 / 1570 | **137 / 760** | **137 / 1296** | **137 / 421** | **3** | 0 |
| `/` | 1280 / 1265 | 16 / 624 | 16 / 1233 | 16 / 400 | 3 | 0 |
| `/` | 768 / 753 | 16 / 624 | 16 / 721 | 16 / 230 | 3 | 0 |
| `/` | 375 / 360 | 16 / 328 | 16 / 328 | 16 / 328 | 1 | 0 |
| `/moduly` | 1585 / 1585 | 145 / 760 | 145 / 1296 | 145 / 421 | 3 | 0 |

`/postep` at 1585 / 1570: `header.lane` 137 / 760, both sections **137 / 1296**,
the table 137 / 1296.

- **Criterion 6** — the hero paragraph is 137 / **760**: the measure, starting
  at the band's left edge, not centred inside the band and no longer held at
  544 px by `.heroLede`'s deleted `max-width: 34rem`.
- **Criterion 7** — the grid is the whole band, three cards per row, each
  **421 px** against a floor of 380 and against T01's 197. At 768 and 375 the
  card *count* per row is T01's — 3 and 1 — and the cards are wider because the
  band is wider, which is what the amended criterion says to expect.
- **Criterion 8** — on `/postep` the header lane is 760 and the sections are
  1296. Neither is 624, and 792 is a width this page does not have, as the
  amendment records.

### One thing the numbers did not catch, found by looking

At band width the weeks calendar's `auto-fit, minmax(14rem, 1fr)` fits **five**
columns of 240 px, and a week's row needs about 400: "Tydzień" set on one line,
its number on the next, and its dates ran into the next column's label. Capped
to three columns above the same 80rem fold `.moduleGrid` uses, with the reason
in the stylesheet. Below the fold the calendar is untouched. Screenshots before
and after at 1585 are what decided it; the boxes were identical either way.

---

## T05 — The module page joins the band, and keeps its panel

`app/contents.css` · `app/moduly/[module]/page.tsx`.

```
$ node scripts/check-design-invariants.mjs   exit 0, contrast report identical to T01
$ npx eslint                                 exit 0
$ npx tsc --noEmit                           exit 0
```

| page | window / cw | wrapper | panel | content column | its prose text | overflow |
| --- | --- | --- | --- | --- | --- | --- |
| module | 1585 / 1570 | **137 / 1296** | **137 / 352** | **513 / 920** | 593 / 760 | 0 |
| module | 1280 / 1265 | 16 / 1233 | 16 / 352 | 392 / 857 | 509 / 624 | 0 |
| module | 1024 / 1009 | 0 / 1009 | absent | 137 / 736 | 193 / 624 | 0 |
| module | 375 / 360 | 0 / 360 | absent | 16 / 328 | 16 / 328 | 0 |
| `1c` | 1585 / 1570 | 0 / 1570 | 32 / 352 | 408 / 872 | 464 / 760 | 0 |
| `1c` | 1280 / 1265 | 0 / 1265 | 32 / 352 | 408 / 736 | 464 / 624 | 0 |

**Criterion 4 again, and this is the commit that could have broken it.** The
lesson rows are T02's rows and T01's below the fold. The band modifier is a
class the lesson page does not carry.

### The jump, measured rather than estimated

Spec §4 costs the module→lesson step as the distance between the two **content
columns**: 513 against 464, about 49 px at 1585. What a reader's eye follows is
the **prose**, and the module page centres its measure in a 920 px column while
a lesson centres it in an 872 px one, so the text moves **593 → 464 = 129 px at
1585** and **509 → 464 = 45 px at 1280**. Both numbers are recorded; the spec's
sentence is true of the thing it names and understates the thing that is seen.
Left as built: the alternative is to size the module page's content column to
the lesson's article width and leave 48 px of band unused on its right, which
trades a visible gap for 24 px of the step. Viktar's eye, with criterion 12.
