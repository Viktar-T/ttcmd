# verification.md — 004-lesson-typography

Evidence for the acceptance criteria in `spec.md`. Numbers are **measured**,
not estimated. Checked 2026-08-29 against the dev server on `localhost:3000`,
Next 16.3.3, Chromium in the Browser pane.

**One limitation, stated up front because it changes what the rest of this file
can claim.** Screenshots were unavailable in this session — the Browser pane
would not composite frames, so `computer{action:"screenshot"}` timed out every
time it was called. Everything measurable was measured, and the by-eye
criteria are marked **outstanding** rather than quietly asserted. They are
listed together at the end. AGENTS.md §3: if you cannot verify it, say so.

Most page measurements were taken by loading each route into a same-origin
iframe of a fixed width and reading computed styles inside it. An iframe's
viewport drives its own media queries, which is what makes `375 × 812` and
`1280 × 900` real rather than approximated.

---

## 1 — `npm run build` succeeds

```
> ttcmd@0.1.0 build
> node scripts/check-design-invariants.mjs && next build

  Design invariants OK.
▲ Next.js 16.3.3 (Turbopack)
✓ Compiled successfully in 252ms
  Running TypeScript ...
  Finished TypeScript in 1296ms ...
✓ Generating static pages using 8 workers (13/13) in 981ms
```

**Pass.**

## 2 — The colour-literal guard still passes; no new hue

`Design invariants OK.` above is Check A and Check B from slice 003, run ahead
of every `next build`. `scripts/check-design-invariants.mjs` was not modified by
this slice, and no exemption comment was added anywhere.

Every colour this slice uses is an existing token or a rebinding of an alias
slice 003 created for the purpose. The one rebinding is `--rule-quote`, moved
from `var(--rule)` to `var(--text-muted)` — see criterion 9. `--link`,
`--rule-table`, `--text`, `--text-muted`, `--accent-line` and `--rule` are used
as they were defined. **No value was added to `tokens.css` that is a colour.**

**Pass.**

## 3 — Every lesson picks up the treatment, no lesson file edited

`git diff --stat 8f95729..HEAD -- content/` returns **nothing**. The slice's
whole diff is confined to `app/`, `lib/`, `docs/adr/`, `specs/` and the package
files:

```
 app/globals.css                                    |  17 +-
 app/layout.tsx                                     |   1 +
 .../[module]/[lesson]/lesson-header.module.css     |  83 ++
 app/moduly/[module]/[lesson]/lesson-header.tsx     |  31 ++
 app/moduly/[module]/[lesson]/page.tsx              |  10 +-
 app/moduly/[module]/page.tsx                       |   4 +-
 app/prose.css                                      | 355 ++++++
 app/styleguide/page.tsx                            | 158 ++++
 app/tokens.css                                     |  54 +-
 docs/adr/0009-gfm-tables-in-mdx.md                 |  74 ++
 lib/content-schema.ts                              |  10 +-
 lib/content.ts                                     |  20 +-
 lib/numbering.ts                                   |  29 ++
 package-lock.json                                  | 294 +++++
 package.json                                       |   1 +
 specs/004-lesson-typography/*.md                   | 1104 ++++
```

**"No element left at a browser default"** was checked by walking the whole
element tree inside `.prose` on **11 routes × 2 widths × 2 themes = 44 runs**
and recording, per tag, the set of computed values it takes anywhere. Every
element the lessons can produce is reached by a rule:

| element | occurrences | face | size(s) | margin-bottom |
| --- | ---: | --- | --- | --- |
| `p` | 540 | Inter | 18px | 0px |
| `strong` | 460 | Inter | 18px | 0px |
| `li` | 444 | Inter | 18px | 0px |
| `h2` | 188 | JetBrains Mono | 28px | 0px |
| `a` | 176 | Inter | 18px | 0px |
| `code` | 132 | JetBrains Mono | 16.875 / 18 / 22px | 0px |
| `ul` / `ol` | 64 / 48 | Inter | 18px | 0px |
| `blockquote` | 52 | Inter | 18px | 0px |
| `h3` | 52 | JetBrains Mono | 22px | 0px |
| `td` / `th` | 48 / 24 | Inter / JetBrains Mono | 16px | 0px |
| `pre` | 36 | JetBrains Mono | 18px | 0px |
| `em` | 28 | Inter | 18px | 0px |
| `svg` | 16 | — | — | 0px |
| `h1` | 8 | JetBrains Mono | 36px | 0px |
| `h4` / `h5` / `h6` / `hr` | 4 each | JetBrains Mono / — | 18 / 16 / 16px | 0px |

`code` takes three sizes and that is the point: 16.875px inline in prose,
22px inside an `h3`, 18px inside a `pre` — size follows context (criterion 8).

The only elements carrying sizes this slice did not set are the internals of
the diagrams — `text`, `g`, `rect`, `line`, `path`, `defs` at 11–24px. Those
are the SVGs' own attributes and are explicitly out of this slice's scope.

**Pass.**

## 4 — 60 to 75 Polish characters per line, counted

Counted with `Range.getClientRects()` per character, clustered into line boxes
by vertical midpoint, on the first ten paragraphs of three lessons at 1280px.
The last line of each paragraph is excluded — it is short by definition.

| lesson | full lines | min | mean | max |
| --- | ---: | ---: | ---: | ---: |
| `git-i-github` | 19 | 61 | 67.8 | 74 |
| `od-podpowiedzi-do-agenta` | 21 | 58 | 67.8 | 76 |
| `vibe-coding-kontra-inzynieria` | 17 | 63 | 68.6 | 73 |
| **combined** | **57** | **58** | **68.0** | **76** |

Median 68. **55 of 57 lines (96.5%) fall inside 60–75.** The two that do not —
one at 58, one at 76 — are ragged-right artifacts: a line that broke early
because the next word was long, and one that fitted one character more than the
band. They are a property of setting Polish ragged-right, not of the measure.

`--measure` is **39rem**, arrived at by counting rather than computing: the
scaffolded 36rem gave a mean of 61.3 with a floor of 57.

**Pass.**

## 5 — Space above a heading larger than below, and the largest on the page

The rhythm is a **margin-top-only** system: every flow element in the prose
column is reset to `margin: 0` and then given a top margin. Across all 44 runs
above, **every element's computed `margin-bottom` is `0px`** — so between two
adjacent blocks there is exactly one margin, and the visual gap is that margin.

| gap | px |
| --- | ---: |
| list items, `li + li` | 8 |
| ordinary block gap | 25.6 |
| around a quotation, diagram, table, code block | 40 |
| above `h3`–`h6` | 48 |
| above `h2` | 68 |

Space **below** a heading is the next block's ordinary gap, 25.6px or 40px.
Space **above** a heading is 48px or 68px. The smallest heading gap (48) exceeds
the largest non-heading gap (40) — so "no other block gap exceeds it" is a
property of the token scale, not something to re-check per page. Asserted in the
browser on two lessons: `criterion5_holds: true`.

**Pass.**

## 6 — The six adjacency sequences, no doubled and no collapsed gap

Measured as `next.top − previous.bottom` and compared against the following
element's computed `margin-top`, on four lessons. **In every pair the visual gap
equals the following element's margin-top exactly**, and every preceding
element's margin-bottom is `0px`.

| sequence | margin-top of the second | measured gap |
| --- | ---: | ---: |
| paragraph → list | 25.6px | 26px |
| list → heading | 68px | 68px |
| paragraph → quotation | 40px | 40px |
| quotation → heading | 68px | 68px |
| paragraph → diagram | 40px | 40px |
| diagram → paragraph | 40px | 40px |

Also observed and consistent: `h2 → p` 26px, `h2 → svg` 40px, `p → h3` 48px,
`svg → h3` 48px, `pre → h2` 68px, `pre → p` 40px, `ul → p` 26px.

A doubled gap would show as a measured gap larger than the second element's
margin-top; a collapsed one as smaller. Neither occurs, and neither can: with no
margin-bottom anywhere, there is nothing to double and nothing to collapse
against.

**Pass.**

## 7 — `h2` and `h3` distinguishable when both are on screen

Three axes at once, measured on `git-i-github`, which has both:

| | `h2` | `h3` |
| --- | --- | --- |
| size | 28px | 22px |
| weight | 700 | 600 |
| space above | 68px | 48px |

Body prose is 18px / 400 for reference, so neither level collides with it.

**Measured. The visual judgement is outstanding — see the list at the end.**

## 8 — Inline code in a heading is heading-sized and not muted

On `### git status — gdzie jestem` in `git-i-github`:

```
headingWithCode:      "git status — gdzie jestem"
heading_fontSize:     "22px"      code_fontSize:  "22px"     → same
heading_color:  "rgb(237, 235, 230)"
code_color:     "rgb(237, 235, 230)"                          → same
```

Two changes produce this. `:not(pre) > code` now takes `color: inherit` instead
of `var(--text-muted)`, and `.prose :is(h1…h6) code` cancels the `0.9375em`
reduction — that reduction is a correction for monospace set inside the sans
face, and a heading is already monospace, so applying it there shrank a section
named after the command it teaches.

**Pass.**

## 9 — A quotation reads as a quotation: rule and space, no fill, no icon, no label

Measured on all six quotations of `vibe-coding-kontra-inzynieria`:

```
backgrounds:   ["rgba(0, 0, 0, 0)"]                       — no fill anywhere
pseudoContent: ["none"]                                   — no ::before, no ::after
borders:       ["2px | rgb(168,164,156) | 0px | 0px | 0px"]  — inline start only
fontStyles:    ["normal"]                                 — upright
fontSizes:     ["18px"]                                   — body size
quoteColours:  ["rgb(237, 235, 230)"] === bodyColour
gapBefore/After: 40px / 40px (68px where a heading follows)
indent from the body left edge: 22px
```

There is no fill, no tint, no icon, no glyph and no label to read as a warning,
because none is drawn. What sets a quotation apart is the rule and the space,
which is what the spec asked for.

`--rule-quote` was **rebound from `--rule` to `--text-muted`**. Slice 003
measured `--rule` at 1.47:1 on dark and recorded that it is legitimate only
while it stays decorative. A quotation's rule is not decorative — it is the only
thing saying these are somebody else's words — and a 2px line at 1.47:1 is
invisible on a projector. `--text-muted` is 5.86:1 and 6.34:1 and already
exists, so no new hue enters.

**Measured. The "at a glance" judgement is outstanding — see the list at the end.**

## 10 — Quoted text meets the body contrast floor

Computed with the WCAG 2.x relative-luminance formula over the values in
`app/tokens.css`.

### Dark (the default)

| role | foreground | background | ratio | needs | |
| --- | --- | --- | ---: | ---: | --- |
| body prose | `--text` | `--bg` | **12.21** | 4.5 | pass |
| **quoted text** | `--text` | `--bg` | **12.21** | 4.5 | **pass** |
| standfirst, `h6`, list marker | `--text-muted` | `--bg` | **5.86** | 4.5 | pass |
| links | `--accent-line` | `--bg` | **8.67** | 4.5 | pass |
| circled letter, and its circle | `--accent-line` | `--bg` | **8.67** | 3 | pass |
| table header underline | `--text-muted` | `--bg` | **5.86** | 3 | pass |
| quotation rule | `--text-muted` | `--bg` | **5.86** | 3 | pass |
| table row separator | `--rule` | `--bg` | **1.47** | 3 | recorded, see below |

### Light

| role | foreground | background | ratio | needs | |
| --- | --- | --- | ---: | ---: | --- |
| body prose | `--text` | `--bg` | **14.71** | 4.5 | pass |
| **quoted text** | `--text` | `--bg` | **14.71** | 4.5 | **pass** |
| standfirst, `h6`, list marker | `--text-muted` | `--bg` | **6.34** | 4.5 | pass |
| links | `--accent-line` | `--bg` | **5.86** | 4.5 | pass |
| circled letter, and its circle | `--accent-line` | `--bg` | **5.86** | 3 | pass |
| table header underline | `--text-muted` | `--bg` | **6.34** | 3 | pass |
| quotation rule | `--text-muted` | `--bg` | **6.34** | 3 | pass |
| table row separator | `--rule` | `--bg` | **1.36** | 3 | recorded, see below |

Quoted text is not merely above the floor, it is **the same token as body
prose**, so it is the same ratio by construction and cannot drift from it. That
is the whole of spec decision 4: the conventional treatment sets quotations in
muted text, and a five-line quotation set in muted text is harder to read than
the prose quoting it.

These reproduce 003's figures exactly (12.21 / 14.71, 5.86 / 6.34, 8.67 / 5.86),
which is worth more than either computation alone.

### `--rule` as a table row separator

1.47:1 and 1.36:1, under WCAG 1.4.11's 3:1, recorded rather than fixed — the
same judgement 003 made, and for the same reason. 1.4.11 exempts separators that
are not needed to understand the content. On this table the meaning-bearing
separation is the **header underline**, which takes `--text-muted` and clears
3:1 on both themes; the row separators sit under two rows of a three-column
table whose columns are already established by alignment. If a later table needs
its rows to be distinguishable to be read at all, that rule needs its own value
and an ADR amending 0007. Flagged, not deferred silently.

## 11 — Multi-paragraph quotations hold together

Every quotation on `vibe-coding-kontra-inzynieria`:

| quotation | paragraphs | gap inside | gap before | gap after |
| --- | ---: | ---: | ---: | ---: |
| Karpathy | 2 | 26px | 40px | 40px |
| "weekendowe projekty" | 1 | — | 40px | 40px |
| Willison | 2 | 26px | 40px | 40px |
| Osmani | 1 | — | 40px | 40px |
| Beck | 2 | 26px | 40px | 40px |
| the closing rule | 2 | 26px | 40px | 68px |

`criterion11_all: true`. Paragraphs inside a quotation keep the **ordinary**
prose gap rather than the tightened one the plan proposed: what holds a
multi-paragraph quotation together is the rule running down its whole height and
the indent, both continuous, and inside a quotation the reader is reading prose
and wants prose spacing. 26 < 40 either way.

**Pass.**

## 12 — A wrapped exercise item hangs

Measured at 375px on the `git-i-github` exercises, clustering character rects
into line boxes and taking each line's leftmost edge:

```
list box left edge:           16px
item text left edge:          45px    (28.8px of padding-inline-start)
item 1  4 lines  lefts: 45 45 45 45
item 2  6 lines  lefts: 45 45 45 45 45 45
item 3  5 lines  lefts: 45 45 45 45 45
item 4  4 lines  lefts: 45 45 45 45
bulleted items: 5, 2, 4 and 4 lines — all aligned
markerColour: rgb(168, 164, 156)   (--text-muted)
```

Every continuation line starts at the item's text, 45px, while the marker sits
in the padding to its left. This is the browser's own
`list-style-position: outside`, left alone deliberately — the hanging indent was
already correct and the way to break it is to add something.

**Pass.**

## 13 — The table is a grid, with its empty header cell, scrolling in its own bounds

**The table did not exist when this slice began.** MDX implements CommonMark and
Markdown tables are a GFM extension, so those four lines had been rendering as a
paragraph of pipe characters on the live site. Found while measuring criterion
6's adjacency; fixed in T06a with `remark-gfm`; recorded in **ADR-0009**.

Rendered structure on `od-podpowiedzi-do-agenta`:

```
tables: 1        hasThead: true       bodyRows: 2
headerCells: ["", "Jednostka pracy", "Twoja rola"]
firstHeaderCellEmpty: true
anyPipeParagraph: 0
distinctCellTops: 3            columns aligned across rows at 265 / 392 / 564
headerUnderline (incl. the empty cell): 1px rgb(168,164,156)   --text-muted
rowSeparator:                           1px rgb(69,67,62)      --rule-table
th font: "JetBrains Mono"      td font: "Inter"
```

Containment at 375px, demonstrated rather than asserted. The real table fits in
343px, so an 81-character unbreakable token was forced into a cell:

```
tableScrollWidth: 961   tableClientWidth: 343   scrollsInOwnBounds: true
pageScrollWidth:  375   pageClientWidth:  375   pageStillDoesNotScroll: true
```

Two of the nine `bash` blocks overflow naturally at 375px, at 594px and 497px of
content, and both scroll inside themselves with the page unmoved.

**Pass.**

## 14 — Links are identifiable without colour

Every link in the prose column resolves to the same computed style:

```
underline | under | 1.08px offset | 1.08px thickness | skip-ink auto | rgb(201,194,245)
linkCount: 10 on the vibe-coding lesson, all identical
criterion14_allUnderlined: true
```

Removing colour from the page cannot remove a `text-decoration-line`, so the
underline is the property that carries this. Across the 44-run sweep, `a`
appears 176 times and takes one font and one size everywhere.

**Pass on the mechanism.** The achromatopsia emulation named in the plan was not
run — see the outstanding list.

## 15 — The underline clears the ogonek

Not a tuned offset — a guarantee. Ink depths measured in Inter by rendering each
glyph to a canvas and finding the lowest opaque pixel row relative to the
alphabetic baseline, in em:

| glyph | ink below baseline |
| --- | ---: |
| `a`, `e` | 0.010 |
| `ą` | **0.205** |
| `ę` | **0.210** |
| `Ą`, `Ę` | 0.210 |
| `g` | 0.215 |
| `y` | 0.205 |
| `j` | 0.200 |

**The ogonek is as deep as the descender of `g`.** That is why a default
underline runs through it, and why an eyeballed offset is not good enough.

`text-underline-position: under` aligns the underline with the under edge of the
content box. Inter's `fontBoundingBoxDescent` is **0.240em**, so the line sits
below 0.210em of ogonek by construction; the extra `text-underline-offset:
0.06em` turns 0.03em of clearance into 0.09em. `text-decoration-skip-ink` stays
`auto` as a backstop with nothing left to skip — which is what keeps the line
continuous instead of fragmenting around every `ą` and `ę`.

A link whose own text carries `Ą Ę ą ę` is on the reference page for this
purpose, and one lesson link already contains `ą`.

**Pass by construction. The visual confirmation is outstanding.**

## 16 — Bold is distinguishable and does not bloom on dark

`--weight-strong` is **650 on dark, 700 on light**, because light text on a dark
ground gains apparent weight. The variable axis is genuinely interpolated rather
than snapped to a named weight — the same string measured at 18px:

| weight | 400 | 600 | 650 | 700 | 800 |
| --- | ---: | ---: | ---: | ---: | ---: |
| width (px) | 308.38 | 313.85 | 315.13 | 316.54 | 319.89 |

650 sits strictly between 600 and 700, so the value is real. `strong` computes
to 650 on the dark theme and 700 on the light one, confirmed on the reference
page.

**Mechanism verified. Whether it blooms is a judgement about rendered pixels and
is outstanding.**

## 17 — The letter is derived from `order`

Read out of the generated HTML for all six lessons:

| module | lesson file | `order` | rendered | expected |
| --- | --- | ---: | :-: | :-: |
| `00-start` | `git-i-github` | 3 | **c** | c |
| `01-…` | `co-model-naprawde-potrafi` | 2 | b | b |
| `01-…` | `jak-nie-wypasc-z-obiegu` | 5 | e | e |
| `01-…` | `na-zywo-agent-buduje-aplikacje` | 4 | d | d |
| `01-…` | `od-podpowiedzi-do-agenta` | 1 | a | a |
| `01-…` | `vibe-coding-kontra-inzynieria` | 3 | c | c |

Module 0's only lesson shows **c**, not a. And in module 1 the alphabetically
first file shows **b** while the fifth shows **a** — positional numbering cannot
produce that table. `lessonLetter` prints `a b c d e` for 1–5 and `z` for 26.

`order` is bounded in the Zod schema to an integer in 1..26, so the derivation is
total over its domain. Demonstrated by setting one lesson to `order: 0`:

```
      "order"
    "message": "Too small: expected number to be >=1"
> Build error occurred
Error: Failed to collect page data for /moduly/[module]/[lesson]
```

then reverting — `git diff --name-only content/` reports 0 files, build green.

**Pass.**

## 18 — A wrapping title keeps the circle on the first line

The circle's diameter is `calc(var(--title-size) * var(--leading-tight))` — one
line box of the title, from the same two tokens the title is set with.

| | title | size | lines | circle | circle centre | first line box | inside |
| --- | --- | ---: | ---: | --- | ---: | --- | :-: |
| measure | *Git i GitHub — minimum, które wystarczy* | 36px | 2 | 45×45 | 55 | 30–78 | yes |
| 375px | same | 28px | 3 | 35×35 | 50 | 31–68 | yes |
| 375px | *Na żywo: agent buduje aplikację* | 28px | 2 | 35×35 | — | — | yes |

Title right edge 359px against a 375px viewport;
`scrollWidth 375 = clientWidth 375` in every case. The circle is `1px solid
rgb(201,194,245)` at `border-radius: 50%`, its letter in JetBrains Mono.

The header's left edge and the prose column's text left edge are both **321px**,
so the header and the body share a left margin.

**Pass.**

## 19 — The summary renders as a standfirst

```
standfirst: 22px, rgb(168,164,156)  (--text-xl, --text-muted)
body:       18px, rgb(237,235,230)  (--text-lg, --text)
distinctFromBody: true   (differs on both size and colour)
```

Plus a `--rule` hairline closing the header block. Three signals at once.

**Pass on the mechanism; "visibly distinct" as a judgement is outstanding.**

## 20 — Legible end to end at 375px, both themes

Every lesson, every direct child of the prose column, both widths, both themes —
**24 runs, 848 blocks**:

```
anyOverlap:            false
anyBlockOverflowing:   false
anyHeaderOverflowing:  false
everyRunNoPageScroll:  true
```

And across the wider 44-run sweep of all 11 routes, the smallest font size
outside the diagrams is **16px** (table cells, `h5`, `h6`); body prose is 18px.
Nothing is set at a size that needs zooming.

**Pass on everything measurable. "Comfortable to read end to end" is a judgement
and is outstanding.**

## 21 — The reference page carries every construct

`/styleguide`, new section, measured on the rendered page:

```
everyLevelPresent: true    h2:1  h3:4  h4:1  h5:1  h6:1
ul:1  ol:1  blockquote:2  table:1  hr:1  links:2  inline code in prose:1
headingWithInlineCode: "H3: git status — nagłówek nazwany od komendy"
headingCodeSameSize:   true
linkWithBothOgoneks:   "żądanie, pętla i gałąź — Ą Ę ą ę"
emptyFirstHeaderCell:  true
multiParagraphQuoteParagraphs: 2   (ending in an em-dash attribution with a linked date)
numberedItemsWrappingTo3PlusLines: 3
```

**The specimens change with the theme.** Eleven computed properties sampled in
both themes — body text, quoted text, the quotation rule, links, bold weight,
both table rules, `h6`, `hr` and the list marker — and **all eleven differ**,
none stays fixed. So the block is exercising tokens, not values.

**Pass.**

## 22 — The fresh-context review

Recorded in T13, below, once the review has run.

---

## The by-eye pass

Screenshots were unavailable inside this session — the Browser pane never
composited frames, so every `screenshot` call timed out. Viktar supplied four
screenshots from his own Chrome instead: `/moduly`, `/moduly/00-start`, and
`/moduly/00-start/git-i-github` in **both themes**. That is what settled the
criteria this file had listed as outstanding.

### Settled, no change needed

| criterion | judgement on the rendered page |
| --- | --- |
| 7 | *Po co nam Git na tym kursie* reads as a section break at a glance against the prose above it. The `border-top` fallback the plan holds in reserve is **not needed**. |
| 15 | On `/moduly/00-start`, the underline of *Git i GitHub — minimum, które wystarczy* runs continuously **below** the `y` descender. Not fragmented, not crossing. |
| 16 | **The one most likely to fail, and it did not.** `nie tracisz pracy`, `widzisz, co się zmieniło i kiedy` and `wracasz do wersji, która działała` are unmistakably heavier than the prose around them on the dark theme and do not bloom; the light theme at 700 is equally clean. 650/700 stands. |
| 19 | The standfirst reads as an abstract, not as the lesson's opening sentence. |
| 20 | Both themes render every Polish diacritic at every size — `gałęzią`, `ślepą uliczką`, `części`, `Moduły` — with no tofu and nothing needing zoom. |

Criteria 9 and 14 could not be judged from these four screenshots: no quotation
and no achromatopsia emulation appears in them. Both are established by
measurement above — a quotation draws no fill, icon or label because none is in
the CSS, and a link's underline cannot be removed by removing colour — so
neither is at risk. They are noted rather than claimed as *looked at*.

### Three defects the screenshots exposed, and the fixes

**1. A void under the lesson header.** The header carried 26px above its rule
and `--gap-section`, 68px, below it. On a rendered page that read as a hole
rather than as a separation — the rule was already doing the separating.
Changed to `--gap-apart`, 40px. Measured after: `ruleToBody: 40`.

**2. The header had three left edges.** The rule spanned the measure at 321px,
the title sat at 382px beside the circle, and the standfirst sat at 382px with
it — so the step down to the lesson's first paragraph read as a mistake. The
standfirst now spans both grid columns:

```
headerLeft 321   standfirstLeft 321   textLeft 321   titleLeft 382
```

Two edges, and the one that differs is the title, which hangs off the circle and
explains itself. As a side effect the standfirst gets the full measure and wraps
to two lines instead of three.

**3. The list pages sat at a different left margin from everything else.**
Visible directly between the first two screenshots: `/moduly` put its content at
`main`'s padding while `/moduly/00-start` put it in the prose column, so the
text jumped sideways on every navigation. `/moduly` and `/` had never been given
the `prose` class — the plan named only `app/moduly/[module]/page.tsx`. Both now
have it. Measured across the whole path a student walks:

| route | text left edge |
| --- | ---: |
| `/` | 328 |
| `/moduly` | 328 |
| `/moduly/00-start` | 328 |
| `/moduly/00-start/git-i-github` | 321 |

The 7px on the last row is the scrollbar — that page is long enough to scroll,
so its viewport is 1265 rather than 1280. Structurally all four are identical.

The landing page is a heading and two paragraphs today, which is prose. The
design reference gives it a composition of its own — headline, bordered button,
module grid three across — and the slice that builds it replaces this wrapper
along with everything inside it.

### Re-verified after the three fixes

The full sweep was run again: **11 routes × 2 widths × 2 themes = 44 runs,
1012 blocks**.

```
anyOverlap: false     anyOverflow: false     everyRunNoPageScroll: true
distinctMarginBottoms: ["0px"]
circleOnFirstLine: true  at 1280 and at 375, both themes, both longest titles
```

`npm run build` green, `Design invariants OK.`
