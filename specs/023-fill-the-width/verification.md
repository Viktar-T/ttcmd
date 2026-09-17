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
