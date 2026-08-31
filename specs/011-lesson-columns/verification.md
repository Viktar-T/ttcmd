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
