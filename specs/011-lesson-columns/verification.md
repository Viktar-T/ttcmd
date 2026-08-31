# verification.md — 011-lesson-columns

Evidence for the acceptance criteria in `spec.md`, accumulated task by task.
Numbers are **measured**, not asserted.

Measurements are taken in the in-app driven browser against the dev server
(`npm run dev` on `localhost:3000`), the same instrument for the baseline and
for every later comparison, so the pairs are commensurable. Boxes are read with
`getBoundingClientRect()` and written `left / width` in CSS px.

Two properties of the instrument, recorded once because they explain numbers
that would otherwise look wrong:

- **The document `clientWidth` is 15 px less than the viewport width** wherever
  the page is tall enough for a vertical scrollbar — 1265 at 1280, 1570 at
  1585. Centred boxes are centred in `clientWidth`, which is why the frame's
  content track reads `264.5` at 1280 and not `272`.
- **A media query does not see that scrollbar.** `matchMedia('(min-width:
  80rem)').matches` is `true` at an inner width of 1280 with `clientWidth`
  1265, so the fold fires on the viewport while the layout is laid out in
  1265 px. Verified directly:
  `{"inner":1280,"client":1265,"mq80":true,"mq1281":false}`.

---

## T04 — The baseline (criteria 5, 6, 11 and 13, "before")

Taken on the **unmodified site**, at commit `3fbf398` — spec, plan and tasks
only, no code of this slice exists. `node scripts/check-design-invariants.mjs`
passes on this tree.

### The build's contrast report, to be matched exactly afterwards

```
  Design invariants OK.
  Contrast floors (Check E):
    dark (:root)               --text          on --bg               12.21:1  (needs 4.5)
    dark (:root)               --text-muted    on --bg                5.86:1  (needs 4.5)
    dark (:root)               --link          on --bg                8.67:1  (needs 4.5)
    dark (:root)               --accent-line   on --bg                8.67:1  (needs 4.5)
    dark (:root)               --accent-ink    on --accent-surface   10.27:1  (needs 4.5)
    dark (:root)               --rule-strong   on --bg                3.69:1  (needs 3)
    dark (:root)               --rule-quote    on --bg                5.86:1  (needs 3)
    :root[data-theme="light"]  --text          on --bg               14.71:1  (needs 4.5)
    :root[data-theme="light"]  --text-muted    on --bg                6.34:1  (needs 4.5)
    :root[data-theme="light"]  --link          on --bg                5.86:1  (needs 4.5)
    :root[data-theme="light"]  --accent-line   on --bg                5.86:1  (needs 4.5)
    :root[data-theme="light"]  --accent-ink    on --accent-surface   10.27:1  (needs 4.5)
    :root[data-theme="light"]  --rule-strong   on --bg                3.64:1  (needs 3)
    :root[data-theme="light"]  --rule-quote    on --bg                6.34:1  (needs 3)
```

### Lesson `1c` — `/moduly/01-jak-powstaje-oprogramowanie/co-model-naprawde-potrafi`

| vw | clientW | scrollW | site header | band inner | lesson header | panel | `.prose` (wide lane) | first `> p` (measure) | `> svg` (wide) | pager | panel | disclosure |
| ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1280 | 1265 | 1265 | 304.5 / 656 | 304.5 / 656 | 320.5 / 624 | 32.5 / **208** | 264.5 / 736 | 320.5 / 624 | 264.5 / 736 | 320.5 / 624 | block | none |
| 1585 | 1570 | 1570 | 457 / 656 | 457 / 656 | 473 / 624 | 185 / **208** | 417 / 736 | 473 / 624 | 417 / 736 | 473 / 624 | block | none |
| 1024 | 1009 | 1009 | 176.5 / 656 | 176.5 / 656 | 192.5 / 624 | — | 136.5 / 736 | 192.5 / 624 | — | — | none | block, 192.5 / 624 |
| 768 | 753 | 753 | 48.5 / 656 | 48.5 / 656 | 64.5 / 624 | — | 16 / 721 | 64.5 / 624 | — | — | none | block, 64.5 / 624 |
| 375 | 375 | 375 | 0 / 375 | 0 / 375 | 16 / 343 | — | 16 / 343 | 16 / 343 | — | — | none | block, 16 / 343 |

`scrollWidth == clientWidth` at every width: no horizontal scrollbar anywhere.

The three numbers criterion 6 compares: **prose 624**, **wide lane 736**,
**offset 56** (`264.5 → 320.5` at 1280, `417 → 473` at 1585).

The panel's top at 1280 is **396.5**, the lesson header's is **153.8** — the
panel begins 242.7 px below the header, which is the placement §1 of the spec
replaces.

### Lesson `1d` — `na-zywo-agent-buduje-aplikacje`, vw 1585

site header 457 / 656 · band 457 / 656 · lesson header 473 / 624 ·
panel 185 / 208 · `.prose` 417 / 736 · first `p` 473 / 624 ·
`> svg` 417 / 736 · `> table` 417 / 736 · pager 473 / 624

### Module 0's single lesson — `/moduly/00-start/git-i-github`, vw 1280

panel 32.5 / 208; **one** row, a `SPAN` and not a link, reading
`0c Git i GitHub — minimum, które wystarczy`; 8 section entries.

### The pages that must not move (criterion 13)

| page | vw | site header inner | `main`'s children |
| --- | ---: | --- | --- |
| `/` | 1280 | 312 / 656 | `section.hero` 328 / 624 · `ul.moduleGrid` 328 / 624 |
| `/` | 1585 | 464.5 / 656 | `section.hero` 480.5 / 624 · `ul.moduleGrid` 480.5 / 624 |
| `/moduly` | 1280 | 312 / 656 | `header.lane` 328 / 624 · `ul.moduleGrid` 328 / 624 |
| `/moduly` | 1585 | 464.5 / 656 | `header.lane` 480.5 / 624 · `ul.moduleGrid` 480.5 / 624 |
| `/moduly/01-…` | 1280 | 304.5 / 656 | band 0 / 1265, inner 304.5 / 656 · `div.prose` 264.5 / 736 · `nav.lessonList` 320.5 / 624 · `nav.pager` 320.5 / 624 |
| `/moduly/01-…` | 1585 | 457 / 656 | band 0 / 1570, inner 457 / 656 · `div.prose` 417 / 736 · `nav.lessonList` 473 / 624 · `nav.pager` 473 / 624 |

The module page carries a `.prose` of its own. Every rule this slice adds must
therefore be scoped to the lesson's own container, or this row moves.

### The reference page — `/styleguide`, vw 1280

renders; `scrollWidth == clientWidth == 1265`; the panel specimen is
768.6 / **208**.

### The defect, counted (criterion 5's "before")

`1c` at vw 1280. Panel 208 px wide, content box 192.6 px, line-height 17.5 px,
monospace advance **8.4 px** (JetBrains Mono at `--text-sm`) — so **19
characters** fit on a line of a section entry. Rendered line boxes per entry,
from each entry's height divided by its line height:

| lines | entry |
| ---: | --- |
| **4** | `- Badanie, które wyszło odwrotnie, niż wszyscy zakładali` |
| 3 | `- Pierwsza zależność: jaki projekt` |
| 3 | `- Trzecia zależność: co jest celem` |
| 3 | `- Ile pracy naprawdę da się oddać` |
| 3 | `- Dlaczego ta lekcja jest zbudowana z liczb` |
| 2 | `- Co zostało po korekcie` |
| 2 | `- Druga zależność: kto pracuje` |
| 2 | `- Trzy zależności i jedna zasada` |
| 1 | `- Ćwiczenia` |
| 1 | `- Źródła` |
| 2 | each of the six lesson rows, `1b` … `1g` |

Worst section entry **4 lines**; worst lesson row **2 lines**.

### The scroll-following highlight, before (criterion 8's control)

`1c` at 1280, reading `aria-current="location"` off `a[data-section]`:

| position | active |
| --- | --- |
| top of the document | *(none)* |
| `scrollY = 3200` | `pierwsza-zaleznosc-jaki-projekt` |
| bottom of the document | `zrodla` — the last section |

Two elements carry the mark at once because the disclosure renders the same
list and is only `display: none` at this width; that is 007's design and is
unchanged by this slice.

**One property of the instrument matters here.** The driven browser reports
`document.hidden === true` and **dispatches no `scroll` events**, so the
site's own scroll listener never fires from a programmatic `scrollTo` alone.
Every scroll check in this file therefore sets the real scroll position and
then dispatches a `scroll` event by hand. The handler reads live geometry —
heading rects, `scrollY`, `scrollHeight` — so what is synthesised is the
trigger, never the measurement.

---

## T05 — The two columns (criteria 1, 2, 3, 4, 5, 6, 11)

### The build

`npm run build` succeeds. `Design invariants OK.` and the fourteen contrast
lines are **character-for-character the T04 report** — no token moved, no
colour literal entered. `✓ Compiled successfully in 6.9s`, `Finished
TypeScript`, `✓ Generating static pages using 8 workers (15/15)`.

### One failure worth recording, because it fails silently

The first version of the fold's track list wrote `[panel-end]` and
`[content-start]` as **two adjacent line-name blocks**. That is a parse error;
the whole `grid-template-columns` was dropped, and grid fell back to
auto-placed implicit tracks — computed `grid-template-columns: 0px 1209px`,
panel and article stacked at the same 1209 px width, and **nothing in the
console**. The fix is one line-names block, `[panel-end content-start]`, and
the comment in `app/contents.css` now says why.

### The grid, at 1280 px

```
grid-template-columns:
  [full-start panel-start] 352px [panel-end content-start] 736px
  [content-end] 97px [full-end]      (column-gap 24px, padding-inline-start 32px)
```

### `1c` at 1280 px and 1585 px — `left / width / top`

| box | 1280 (client 1265) | 1585 (client 1570) |
| --- | --- | --- |
| contents column | 32 / **352** / 153.8 | 32 / **352** / 153.8 |
| lesson column | 408 / 736 / 153.8 | 408 / 736 / 153.8 |
| lesson header | 464 / **624** / **153.8** | 464 / **624** / **153.8** |
| `.prose` (wide lane) | 408 / **736** / 396.5 | 408 / **736** / 396.5 |
| first `> p` (measure) | 464 / **624** / 396.5 | 464 / **624** / 396.5 |
| `> svg` (wide) | 408 / **736** | 408 / **736** |
| pager | 464 / 624 | 464 / 624 |
| `scrollWidth` vs `clientWidth` | 1265 = 1265 | 1570 = 1570 |

- **Criterion 2** — contents right edge 32 + 352 = **384**, lesson column left
  edge **408**: 384 ≤ 408, and both boxes have top 153.8 and overlapping
  extents. Two columns.
- **Criterion 3** — contents top **153.8**, lesson header top **153.8**.
  Level, to the pixel. (Before: 396.5 against 153.8.)
- **Criterion 4** — left margin **32 px at both widths**. Right slack
  1265 − 1144 = **121** at 1280 and 1570 − 1144 = **426** at 1585: larger than
  the left margin at both, and it grows with the viewport while the margin
  does not.
- **Criterion 6** — measure **624**, wide lane **736**, offset 464 − 408 =
  **56**, at both widths. Identical to T04's 624 / 736 / 56. The article's left
  edge moved, as §2 and §4 say it must; its widths did not.

`1d` at 1585: contents 32 / 352 / 153.8 · lesson column 408 / 736 / 153.8 ·
header 464 / 624 / 153.8 · `.prose` 408 / 736 · first `p` 464 / 624 ·
`> svg` 408 / 736 · `> table` 408 / 736 · pager 464 / 624 ·
`scrollWidth == clientWidth`.

### Criterion 5 — the entries stopped wrapping

`1c` at 1280. Section entry content box **311.8 px**, monospace advance
8.4 px → **37 characters** on a line (the criterion's floor is 36).

| lines | entry | was |
| ---: | --- | ---: |
| **2** | `- Badanie, które wyszło odwrotnie, niż wszyscy zakładali` | 4 |
| 2 | `- Dlaczego ta lekcja jest zbudowana z liczb` | 3 |
| 1 | the other eight section entries | 1–3 |
| 1 | **every** lesson row, `1b` … `1h` | 2 |

Worst section entry **2** lines, worst lesson row **1**. On `1d` at 1585 the
same counts are **2** and **1**. Nothing in either lesson exceeds two lines.

The long entry breaks after the comma — `- Badanie, które wyszło odwrotnie,` /
`niż wszyscy zakładali` — which is the "breaks on a phrase, not after two
words" half of §3.

*(The module grew from six lessons to seven while this slice was running —
`teraz-ty-pierwszy-agent.mdx` arrived in the working tree from the content
lane, which is why the rows now read `1b`…`1h` where T04 recorded `1b`…`1g`.
No file under `content/` was touched by this slice.)*

### Criterion 11 — below the fold, nothing changed

Every number equals T04's baseline exactly:

| vw | client | scrollW | site header | band inner | lesson header | `.prose` | first `p` | disclosure | panel |
| ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- |
| 1024 | 1009 | 1009 | 176.5 / 656 | 176.5 / 656 | 192.5 / 624 | 136.5 / 736 | 192.5 / 624 | block, 192.5 / 624 | none |
| 768 | 753 | 753 | 48.5 / 656 | 48.5 / 656 | 64.5 / 624 | 16 / 721 | 64.5 / 624 | block, 64.5 / 624 | none |
| 375 | 375 | 375 | 0 / 375 | 0 / 375 | 16 / 343 | 16 / 343 | 16 / 343 | block, 16 / 343 | none |

`scrollWidth == clientWidth` at all three: no horizontal scrollbar.

The lesson column's children, in document order at 1024 px:
`header` → `nav.contentsDisclosure` → `div.prose` → `nav.pager`. The
disclosure is between the lesson header and the first paragraph, which is what
criterion 11 asks and what fixed the panel's DOM position for slice 007.

---

## T06 — Everything 007 shipped, re-verified in the new container (criteria 7–10, 12)

Nothing was re-decided and nothing needed fixing: the move broke none of it, so
this task changes no code and the commit is the evidence.

### Criterion 7 — the markup, on `1d` at 1280 px

Landmarks on the page, read off every `<nav>`:
`Ścieżka nawigacji` (breadcrumb) · **`Spis treści`** (the panel, a `NAV`) ·
`Spis treści` (the disclosure, `display: none` at this width) · `Lekcje`
(pager). The panel's landmark is distinct from the breadcrumb's.

Rows, in `order`, each carrying its identity string:

| element | row |
| --- | --- |
| `A` | `1b Od podpowiedzi do agenta` |
| `A` | `1c Co model naprawdę potrafi` |
| **`SPAN`**, `aria-current="page"` | **`1d Na żywo: agent buduje aplikację`** |
| `A` | `1e Teraz ty: twój pierwszy agent` |
| `A` | `1f Nowy warsztat programisty` |
| `A` | `1g Vibe coding kontra inżynieria` |
| `A` | `1h Jak nie wypaść z obiegu` |

The current lesson's row is the only non-link. Its nine section entries are all
links, and their `data-section` sequence equals the document order of
`.prose h2[id]` exactly — compared as a string, `true`.

### Criterion 8 — the reader is still followed

`1d` at 1280 px, reading `aria-current="location"` off the panel's entries:

| position | active |
| --- | --- |
| top of the document | *(none)* |
| `scrollY = 4000` | `prompt`, and **only** it — one marked entry in the panel |
| bottom of the document | `zrodla`, the last section |

Following the panel's `Na co patrzeć` entry: the heading lands **32.3 px**
below the viewport's top edge — the 2rem `scroll-margin-top`, not flush — and
the highlight moves to `na-co-patrzec`.

### Criterion 9 — the panel still scrolls itself, and only itself

At **1280 × 500**, deliberately short: the wider column makes the panel's
content shorter, so a normal laptop height no longer overflows it and the check
would otherwise pass vacuously.

| | |
| --- | --- |
| panel `scrollHeight` / `clientHeight` | **459 / 436** — it overflows |
| `overflow-y`, `max-height` | `auto`, `436px` (`100vh − 4rem`) |
| panel top at `scrollY 1500` | **32** — stuck at its 2rem offset, on screen deep in the lesson |
| page `scrollY` after scrolling the panel to its end | **1500**, unchanged |
| page `scrollY` after the spy advanced the active entry to `na-co-patrzec` | **9000**, unchanged |

### Criterion 10 — the skip control and back-to-top

The panel's first focusable, by query, is `a.contentsSkip` → `#tresc`. Focused
by keyboard it is revealed rather than clipped — `position: static`,
`clip-path: none`, **155.6 × 22.3** at (32, 153.4) — and it matches
`:focus-visible`, so the site's `rgb(201, 194, 245)` ring is on it. Panel links
carry the same ring: the first one measures 337 × 22.3 at (32, 182.1) with
`:focus-visible` true. Activating the skip control sets `#tresc` and leaves
`document.activeElement` as **`DIV#tresc.prose`** — focus inside the article,
whose `tabIndex` is −1.

Back-to-top: **absent** at the top of the lesson; after a viewport of scroll it
is present, labelled `Wróć na początek`, fixed at (1201, 836). Activating it
returns `scrollY` to **0** and moves `document.activeElement` to **`MAIN`**.

### Criterion 12 — without JavaScript

Taken from the server-rendered HTML the dev server returns to `curl` — which is
exactly the DOM a browser with scripting disabled builds. 131 767 bytes.

| in the no-JS DOM | count |
| --- | ---: |
| `class="lessonColumns"` / `class="lessonColumn"` | 1 / 1 |
| `class="contentsPanel"` (a `NAV` named `Spis treści`) | 1 |
| `<details>` / `<summary>` | 1 / 1 |
| `class="contentsSkip" href="#tresc"` and its target `id="tresc"` | 1 / 1 |
| `class="contentsLesson" href=…` | 12 (panel + disclosure) |
| `class="contentsSection" href="#…"` | 9 distinct anchors |
| `aria-current="location"` | **0** — no highlight |
| `class="backToTop"` | **0** — no dead control |

The disclosure is a native `<details>`, so it opens without scripting. Driven
at 768 px it reads `closedByDefault: true`, opens on the summary's activation,
closes on the next, and holds 9 section links.

**Console.** A fresh load at 1280 px logs only React's dev-mode
`Invalid DOM property` warnings for hyphenated SVG attributes —
`stroke-width`, `marker-end`, `font-size`, `font-weight`, `stroke-dasharray` —
written by hand in the MDX of the lessons' inline diagrams. They are present in
the T04 baseline, they come from `content/`, and they are not this slice's to
fix. No error from anything this slice touched.

### Module 0's degenerate panel, at 1280 px

panel 32 / 352, top **153.8** — level with the lesson header's 153.8. Exactly
**one** row, a `SPAN` and not a link, reading
`0c Git i GitHub — minimum, które wystarczy`, expanded to its 8 sections. That
row is the corpus's longest at 42 characters and sets on two lines; every
section entry sets on at most two. `scrollWidth == clientWidth == 1265`.

---

## T07 — The reference page's specimen (criterion 14)

The specimen's width is not a second literal: `app/contents.css` declares
`--contents-width` once and both the lesson page's track and the specimen's
`width: min(var(--contents-width), 100%)` read it, so the reference cannot
drift from the site. The one-line change shipped inside T05's commit, because
it is the same declaration family in the same file; this task is its check.

| viewport | specimen panel | document |
| ---: | --- | --- |
| 1280 | 264.5 / **352** — the lesson page's contents column, to the pixel | `scrollWidth == clientWidth == 1265` |
| 375 | 16 / **343** — `min()` clamps to the container, no overflow | `scrollWidth == clientWidth == 375` |

The page renders at both widths. Its disclosure specimen still renders and its
back-to-top specimen is still `position: static` (in flow, not fixed over the
reference page). The only console errors are the same content-side
`Invalid DOM property` warnings recorded in T06.

---

## T08 — The regression sweep (criteria 1, 13, 15)

### Criterion 13 — the other pages did not move

Every number below is **identical to T04's baseline**.

| page | vw | site header inner | `main`'s children |
| --- | ---: | --- | --- |
| `/` | 1280 | 312 / 656 | `section.hero` 328 / 624 · `ul.moduleGrid` 328 / 624 |
| `/` | 1585 | 464.5 / 656 | `section.hero` 480.5 / 624 · `ul.moduleGrid` 480.5 / 624 |
| `/moduly` | 1280 | 312 / 656 | `header.lane` 328 / 624 · `ul.moduleGrid` 328 / 624 |
| `/moduly` | 1585 | 464.5 / 656 | `header.lane` 480.5 / 624 · `ul.moduleGrid` 480.5 / 624 |
| `/moduly/01-…` | 1280 | 304.5 / 656 | band 0 / 1265, inner 304.5 / 656 · `div.prose` **264.5 / 736** · `nav.lessonList` 320.5 / 624 · `nav.pager` 320.5 / 624 |
| `/moduly/01-…` | 1585 | 457 / 656 | band 0 / 1570, inner 457 / 656 · `div.prose` **417 / 736** · `nav.lessonList` 473 / 624 · `nav.pager` 473 / 624 |

The module page's own `.prose` is untouched at both widths, which is the check
that the slice's rules are scoped to the lesson's container and not to `.prose`
at large.

**The site header and the accent band on a lesson page** measure 304.5 / 656 at
1280 and 457 / 656 at 1585 — the baseline, unchanged. They keep the site's
centred lane while the lesson's body is anchored left; that is decision 9, and
its visible consequence is §2's last paragraph.

### Criterion 1 — the build

`npm run build` succeeds. `Design invariants OK.` and all fourteen contrast
lines are character-for-character the T04 report.

`npm run lint` reports **2 errors, both pre-existing**:
`app/styleguide/page.tsx:608–609`, `react/no-unescaped-entities` on the Polish
closing quote in a specimen blockquote. That file is byte-identical to the
pre-slice tree (`git diff --quiet a26f3db^ HEAD -- app/styleguide/page.tsx`
returns clean), so the errors predate slice 011 and are not this slice's to
fix. `npm run build` — the repo's declared check — does not run eslint and
passes.

### Criterion 15 — the shape of the diff

```
 app/contents.css                         | 106 ++++--
 app/moduly/[module]/[lesson]/page.tsx    |  51 +--
 specs/011-lesson-columns/plan.md         | 576 +++++
 specs/011-lesson-columns/spec.md         | 357 +++++
 specs/011-lesson-columns/tasks.md        | 122 +++++
 specs/011-lesson-columns/verification.md | 354 +++++
```

Two application files, four slice documents.

| assertion | result |
| --- | ---: |
| files touched under `content/`, `package.json`, `package-lock.json` | **0** |
| added lines matching `url(`, `@import`, `<link`, `<script`, `.woff`, `.png`, `.svg`, `http(s)://` | **0** |
| added `"use client"` | **0** — nothing crossed into a client island |

On a lesson page at 1280 px the network log holds **25 resources, 0
third-party, 0 images, 4 font files** — the two faces the site already loads.
No page requests anything it did not request before.
