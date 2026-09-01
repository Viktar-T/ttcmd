# verification.md — 014-module-contents

Evidence for the acceptance criteria in `spec.md`, accumulated task by task.
Numbers are **measured**, not asserted.

Measurements are taken in the in-app driven browser against the dev server
(`next dev` on `localhost:3000`), the same instrument for the baseline and for
every later comparison — the instrument slices 011 and 012 used, so their
recorded numbers are directly comparable. Boxes are read with
`getBoundingClientRect()` and written `left / width` in CSS px, with `t<top>`
where the vertical position matters. `cw` is
`document.documentElement.clientWidth` — about 15 px less than the viewport
wherever the page is tall enough for a vertical scrollbar, which is why a
centred box reads `304.5` at 1280 px on a long page and `312` on a short one.
`ovf` is `scrollWidth − clientWidth`.

---

## T03 — The baseline, and the plan's five gaps answered from the tree

Taken at commit `4180ffb` — the three artifacts, no code of this slice.

### The plan's five gaps, answered as facts

The plan was written blind to the repository (AGENTS.md §2). Each gap it left
is settled here from the tree, before any code is written.

1. **What does the skip control say on a module page?** Nothing new. Its label
   is **„Pomiń spis treści"** — it names the contents, not a lesson, so it is
   already true on a module page. No student-facing string is added by this
   slice, and the plan's "label travels with the target as one parameter" is
   unnecessary.
   Its **target** is likewise one reserved identifier, `tresc`, reserved
   against a heading that would derive the same string. Both kinds of page have
   exactly one block of their own text, so one constant serves both;
   parameterising it would mint a second identifier to reserve for no gain.
2. **Criterion 10 versus §6.** The plan is right that the criterion cannot mean
   vertical position: §6 deliberately inserts a collapsed row above the title.
   **The invariants are `left` and `width`**, and vertically every box below the
   disclosure shifts down by **one identical delta**. One correction to the
   plan's arithmetic: the column is a grid with a row gap, not a stack of
   margins, so the delta is the collapsed disclosure's height **plus one
   `--gap-apart`**, not its height alone. A box that shifts by anything else is
   the defect the criterion is hunting.
3. **Are the introduction's sections really collected today?** **Yes.** The MDX
   options carrying the section-anchor collector are built per compile and the
   same builder serves the lesson compile and the module-index compile — a `##`
   in a module index already gets the same id, the same uniqueness rule and the
   same build failure on an underivable heading. The loader that reads a module
   index returns its frontmatter, its body and its links, and drops the
   collected sections on the floor. T08 is therefore "stop dropping", exactly
   as spec §3 describes, and no second derivation is needed (decision 13).
4. **The breadcrumb's left edge.** No discrepancy to report: the accent band is
   full-bleed on every page and its inner box measures **304.5 / 656 at
   1280 px** and **457 / 656 at 1585 px** on a lesson page *and* on a module
   page — identical already. Slice 012 decision 2 is why.
5. **`aria-current`'s value.** `page`, which is what 007 put on the current
   lesson's row. „Wstęp" on the module page takes the same value, where it is
   also literally correct: the module page *is* the page.

### Three departures from the plan, and why

- **The plan's first geometry move is already done.** It asks for the frame's
  inset and the two-column grid to become one expression. Slice 012 did exactly
  that: the inset is derived in the token file from the same three lengths the
  grid's tracks use — `2rem + 22rem + 1.5rem = 25.5rem = 408 px`. Nothing to
  unify.
  There is also **no "inset-exemption switch"** to reuse: a lesson page escapes
  the frame's content track because every child it puts in the frame is
  full-bleed, so the track's position never reaches it. The module page joins by
  the same route — its two-column wrapper is full-bleed — not by a flag.
- **The housings keep the two props they already take**, and the entry model
  lives inside the contents rather than at the call sites. The plan's builder
  takes exactly the module and the current thing, which is exactly what the
  housings are already handed; a builder at the call site would add plumbing
  without adding information, and would turn the reference page's fixtures into
  a second hand-written shape to keep in step.
- **The scroll-spy needs no narrowing.** It observes `h2[id]` inside the page's
  prose and the section links the list renders; ids are minted only by the
  anchor plugin, so there is no "heading belonging to the page's furniture" to
  exclude. Nothing about it changes.

### The build, to be matched exactly afterwards

`node scripts/check-design-invariants.mjs`:

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
```

`npm run build` exits 0, 16 static pages generated.

### The module pages, which must not move horizontally (criteria 2, 10)

`/moduly/01-jak-powstaje-oprogramowanie` — Moduł 1, seven lessons:

| vw | cw | ovf | siteHeaderInner | band | `div.prose` | `nav.lessonList` | `nav.pager` |
| ---: | ---: | ---: | --- | --- | --- | --- | --- |
| 1280 | 1265 | 0 | 304.5 / 656 | 0 / 1265 | **408 / 736** t153.8 | **464 / 624** t1362 | 464 / 624 t1776.4 |
| 1585 | 1570 | 0 | 457 / 656 | 0 / 1570 | **408 / 736** t153.8 | **464 / 624** t1362 | 464 / 624 t1776.4 |
| 1024 | 1009 | 0 | 176.5 / 656 | 0 / 1009 | 136.5 / 736 t153.8 | 192.5 / 624 t1362 | 192.5 / 624 t1776.4 |
| 768 | 753 | 0 | 48.5 / 656 | 0 / 753 | 16 / 721 t153.8 | 64.5 / 624 t1362 | 64.5 / 624 t1776.4 |
| 375 | 375 | 0 | 0 / 375 | 0 / 375 | 16 / 343 t153.8 | 16 / 343 t2098.2 | 16 / 343 t2555.6 |

`/moduly/00-start` — Moduł 0, two lessons. Short enough to have no vertical
scrollbar, so `cw == vw`:

| vw | cw | ovf | siteHeaderInner | band | `div.prose` | `nav.lessonList` | `nav.pager` |
| ---: | ---: | ---: | --- | --- | --- | --- | --- |
| 1280 | 1280 | 0 | 312 / 656 | 0 / 1280 | **408 / 736** t153.8 | **464 / 624** t433.9 | 464 / 624 t576.3 |
| 1585 | 1585 | 0 | 464.5 / 656 | 0 / 1585 | **408 / 736** t153.8 | **464 / 624** t433.9 | 464 / 624 t576.3 |
| 1024 | 1024 | 0 | 184 / 656 | 0 / 1024 | 144 / 736 t153.8 | 200 / 624 t433.9 | 200 / 624 t576.3 |
| 768 | 768 | 0 | 56 / 656 | 0 / 768 | 16 / 736 t153.8 | 72 / 624 t433.9 | 72 / 624 t576.3 |
| 375 | 375 | 0 | 0 / 375 | 0 / 375 | 16 / 343 t153.8 | 16 / 343 t549.1 | 16 / 343 t705.9 |

`.contentsPanel` and `.contentsDisclosure`: **absent from both pages at every
width.** `.backToTop`: absent. This is the hole the slice fills.

### The lesson pages, which must not move at all (criterion 12)

`/moduly/01-…/od-podpowiedzi-do-agenta` (`1b`):

| vw | cw | ovf | header | band | `.contentsPanel` | `.lessonColumn` | lesson header | `.contentsDisclosure` | `div.prose` | `nav.pager` |
| ---: | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 1280 | 1265 | 0 | 304.5 / 656 | 0 / 1265 | **32 / 352** t153.8 | **408 / 736** t153.8 | **464 / 624** t153.8 | none | **408 / 736** t431.7 | 464 / 624 t7282.4 |
| 1585 | 1570 | 0 | 457 / 656 | 0 / 1570 | **32 / 352** t153.8 | **408 / 736** t153.8 | **464 / 624** t153.8 | none | **408 / 736** t431.7 | 464 / 624 t7282.4 |
| 375 | 375 | 0 | 0 / 375 | 0 / 375 | none | 16 / 343 t153.8 | 16 / 343 t153.8 | 16 / 343 t527.1 | 16 / 343 t613.8 | 16 / 343 t11585.3 |

First `p` inside `.prose`: 464 / 624 t431.7 at both wide widths, 16 / 343
t613.8 at 375. Identical to what slice 012's `verification.md` recorded, so
the instrument agrees with itself across slices.

`/moduly/00-start/git-i-github` (`0c`), 1280 and 1585 px: panel 32 / 352
t153.8 · lesson column 408 / 736 t153.8 · lesson header 464 / 624 t153.8 ·
`div.prose` 408 / 736 t406.3 · pager 464 / 624 t6364.7 · ovf 0 at both.

### The panel's list today, on `1b` (criterion 6, to be re-read after)

```
text "1b Od podpowiedzi do agenta"  aria-current=page
link "- Pięć warstw"
link "- Kiedy to się działo"
link "- Co się naprawdę zmieniło"
link "- Mapa, nie ranking"
link "- Ćwiczenia"
link "- Źródła"
link "1c Co model naprawdę potrafi"
link "1d Na żywo: agent buduje aplikację"
link "1e Teraz ty: twój pierwszy agent"
link "1f Nowy warsztat programisty"
link "1g Vibe coding kontra inżynieria"
link "1h Jak nie wypaść z obiegu"
```

Landmark `aria-label="Spis treści"`; first child
`<a class="contentsSkip" href="#tresc">Pomiń spis treści</a>`.

On `0c` the same shape: `link 0a …` · `text 0c … [page]` · eight section
entries. **Neither list names the module's introduction** — the other hole.

### The pages this slice does not touch

| page | vw | cw | ovf | siteHeaderInner | content block |
| --- | ---: | ---: | ---: | --- | --- |
| `/moduly` | 1280 | 1280 | 0 | 312 / 656 | `header.lane` 464 / 624 · `ul.moduleGrid` 464 / 624 |
| `/` | 1280 | 1280 | 0 | 312 / 656 | `section.hero` 464 / 624 · `ul.moduleGrid` 464 / 624 |
| `/styleguide` | 1280 | 1265 | 0 | — | 1 panel specimen, 1 disclosure specimen |
| `/styleguide` | 375 | 375 | 0 | — | 1 panel specimen, 1 disclosure specimen |

### No horizontal scrollbar anywhere, before (criterion 11's baseline)

`ovf = 0` at **320, 1279, 1281, 1585 and 2560 px** on
`/moduly/01-jak-powstaje-oprogramowanie`, and at 320 and 2560 px on
`/moduly/00-start/git-i-github`. Nothing overflows before the change either.

---

## T04 — The rename moved nothing (every criterion's precondition)

`git diff` for the task, comments filtered out, is five CSS selectors and two
class attributes and nothing else:

```
-.lessonColumns {                       +.pageColumns {
-.lessonColumns > .lessonColumn {       +.pageColumns > .pageColumn {
-.lessonColumn > * {                    +.pageColumn > * {
-  .lessonColumns {                     +  .pageColumns {
-.lessonColumn > .prose:focus {         +.pageColumn > .prose:focus {
-      <div className="lessonColumns" … +      <div className="pageColumns" …
-        <div className="lessonColumn"> +        <div className="pageColumn">
```

`npm run lint` clean, `npm run build` exit 0.

Re-measured with the T03 instrument, every box identical to the baseline:

- Lesson `1b` at 1280 and 1585: panel 32 / 352 t153.8 · column 408 / 736
  t153.8 · lesson header 464 / 624 t153.8 · `.prose` 408 / 736 t431.7 · pager
  464 / 624 t7282.4 · first `p` 464 / 624 t431.7 · ovf 0. At 375: 16 / 343
  throughout, disclosure 16 / 343 t527.1, ovf 0.
- Moduł 1's page at 1280: header 304.5 / 656 · band 304.5 / 656 · prose
  408 / 736 t153.8 · list 464 / 624 t1362 · pager 464 / 624 t1776.4 · ovf 0.
- Moduł 0's page at 1280: header 312 / 656 · band 312 / 656 · prose 408 / 736
  t153.8 · list 464 / 624 t433.9 · pager 464 / 624 t576.3 · ovf 0.
- `/moduly` 464 / 624 · `/` hero and grid 464 / 624 · `/styleguide` ovf 0.

## T05 — One entry model, byte-identical output (criterion 6's precondition)

The panel's and the disclosure's server-rendered markup on `1b` and `0c`,
fetched from the dev server before and after the refactor and diffed:

```
$ node grab.mjs …/od-podpowiedzi-do-agenta …/git-i-github > list-after.txt
$ diff list-before.txt list-after.txt
$ echo $?
0
```

220 lines, no difference. `npm run lint` clean, `npm run build` exit 0.

## T06 — „Wstęp" in the list (criteria 4 and 6, and 5's lesson half)

Read from the server-rendered markup. The first row of both housings on `1b`:

```html
<li><a class="contentsLesson" href="/moduly/01-jak-powstaje-oprogramowanie">Wstęp</a></li>
```

No `contentsId` span, no number, no glyph in its place — criterion 4. The
lessons follow it in `order`, each with its identity string; the current
lesson's row is still a non-link `span` carrying `aria-current="page"` with its
sections beneath it, and every other row and every section entry is a link —
criterion 6.

| page | first row | rows | disclosure identical to panel |
| --- | --- | ---: | --- |
| `1b` | link „Wstęp" → `/moduly/01-…` | 14 | yes |
| `0c` | link „Wstęp" → `/moduly/00-start` | 11 | yes |
| `0a` | link „Wstęp" → `/moduly/00-start` | 4 | yes |

## T07 — The module page's two columns (criteria 2, 3, 4, 5, 8, 9, 10, 11, 13)

### Criterion 2 — the left edge did not move

Every `left / width` equals the T03 baseline, on both modules, at every width.
`t` is given too: above the fold it is unchanged as well.

Moduł 1:

| vw | siteHeaderInner | band | `div.prose` | `nav.lessonList` | `nav.pager` | ovf |
| ---: | --- | --- | --- | --- | --- | ---: |
| 1280 | 304.5 / 656 | 304.5 / 656 | **408 / 736** t153.8 | **464 / 624** t1362 | 464 / 624 t1776.4 | 0 |
| 1585 | 457 / 656 | 457 / 656 | **408 / 736** t153.8 | **464 / 624** t1362 | 464 / 624 t1776.4 | 0 |
| 1024 | 176.5 / 656 | 176.5 / 656 | 136.5 / 736 t240.5 | 192.5 / 624 t1448.7 | 192.5 / 624 t1863.1 | 0 |
| 768 | 48.5 / 656 | 48.5 / 656 | 16 / 721 t240.5 | 64.5 / 624 t1448.7 | 64.5 / 624 t1863.1 | 0 |
| 375 | 0 / 375 | 0 / 375 | 16 / 343 t240.5 | 16 / 343 t2184.8 | 16 / 343 t2642.3 | 0 |

Moduł 0:

| vw | siteHeaderInner | band | `div.prose` | `nav.lessonList` | `nav.pager` | ovf |
| ---: | --- | --- | --- | --- | --- | ---: |
| 1280 | 312 / 656 | 312 / 656 | **408 / 736** t153.8 | **464 / 624** t433.9 | 464 / 624 t576.3 | 0 |
| 1585 | 464.5 / 656 | 464.5 / 656 | **408 / 736** t153.8 | **464 / 624** t433.9 | 464 / 624 t576.3 | 0 |
| 1024 | 184 / 656 | 184 / 656 | 144 / 736 t240.5 | 200 / 624 t520.6 | 200 / 624 t663 | 0 |
| 768 | 56 / 656 | 56 / 656 | 16 / 736 t240.5 | 72 / 624 t520.6 | 72 / 624 t663 | 0 |
| 375 | 0 / 375 | 0 / 375 | 16 / 343 t240.5 | 16 / 343 t635.8 | 16 / 343 t792.6 | 0 |

### Criterion 3 — it is two columns

At 1280 and 1585, on both modules: `nav.contentsPanel` **32 / 352 t153.8** —
the same box it has on a lesson page — and `div.pageColumn` **408 / 736
t153.8**. The panel's right edge is 384, at or left of 408. Their vertical
extents overlap: both start at t153.8, which also makes the panel's top edge
level with the module's text block to **0.0 px**, not 1.

### Criterion 10 — below the fold, and the one delta

Every `left / width` is the T03 baseline (tables above). Vertically, every box
below the disclosure moves down by **one identical delta**, and nothing moves
by any other:

| page | vw | prose | lesson list | pager | delta |
| --- | ---: | ---: | ---: | ---: | ---: |
| Moduł 1 | 1024 | 153.8 → 240.5 | 1362 → 1448.7 | 1776.4 → 1863.1 | **+86.7** |
| Moduł 1 | 768 | 153.8 → 240.5 | 1362 → 1448.7 | 1776.4 → 1863.1 | **+86.7** |
| Moduł 1 | 375 | 153.8 → 240.5 | 2098.2 → 2184.8 | 2555.6 → 2642.3 | **+86.6/7** |
| Moduł 0 | 1024 | 153.8 → 240.5 | 433.9 → 520.6 | 576.3 → 663 | **+86.7** |
| Moduł 0 | 768 | 153.8 → 240.5 | 433.9 → 520.6 | 576.3 → 663 | **+86.7** |
| Moduł 0 | 375 | 153.8 → 240.5 | 549.1 → 635.8 | 705.9 → 792.6 | **+86.7** |

86.7 px is the collapsed disclosure's 46.7 px plus one `--gap-apart` (40 px) —
exactly what T03's answer to the plan's gap 2 predicted. The disclosure renders
between the breadcrumb and the module's title (`t153.8`, the prose below it at
`t240.5`), so opening the page pushes the introduction 87 px down, not a
screenful.

### Criteria 4 and 5 — the module page's own list

```
Moduł 1:  text [current] Wstęp   ← <span class="contentsLesson contentsCurrent"
                                     aria-current="page">Wstęp</span>
          link 1b Od podpowiedzi do agenta  → /moduly/01-…/od-podpowiedzi-do-agenta
          link 1c … 1h                        (seven lessons, in order)
                                              eight entries; disclosure identical
Moduł 0:  text [current] Wstęp
          link 0a Jak działa ten kurs  → /moduly/00-start/jak-dziala-ten-kurs
          link 0c Git i GitHub …       → /moduly/00-start/git-i-github
```

Landmarks on the module page: `Ścieżka nawigacji` (the breadcrumb) ·
`Spis treści` (the panel) · `Spis treści` (the disclosure — one of the two is
`display: none` at any width) · `Lekcje w tym module` · `Moduły`. The contents
landmark is distinct from the breadcrumb's.

### Criterion 9 — the skip control on a module page

```
focus(.contentsSkip)  → clipPath: none · position: static · 155.6 × 22.3 px
                        · display: inline-block
                        (at rest: 1×1 px, clip-path inset(50%) — hidden until focused)
activate              → hash #tresc · document.activeElement = div#tresc.prose
                        tabindex="-1" · outline-style: none
```

The next tab stop after that block, read from the document's own order, is
`a.chev.lessonRow → /moduly/01-…/od-podpowiedzi-do-agenta` — the module's own
content, not the pager. (Moduł 1's introduction carries no links of its own, so
the first stop after it is the first lesson row. The Browser pane does not
forward `Tab` to the page, so the order is read from the document rather than
walked by hand.)

### Criterion 11 — no horizontal scrollbar

`ovf = 0` at **320, 1279, 1281, 1585 and 2560 px** on the module page, the
lesson page, `/moduly` and `/`. Exactly one housing is displayed at each width,
switching at the fold:

```
vw=1279  panel=none   disc=block
vw=1281  panel=block  disc=none
```

### Criterion 13 — back-to-top is still absent on a module page

Absent from the server markup (`class="backToTop"` does not appear) and absent
in the browser at 1280, 1585, 1024, 768 and 375 px, on both modules.

### Criterion 8 — the dead-housing rule in its new case

Run against a temporary module created for the check and then deleted —
`content/moduly/99-tymczasowy/`, an introduction with no heading and no lesson.
Nothing tracked was edited, so no other session's work was at risk:

```
/moduly/99-tymczasowy      contentsPanel present:      false
                           contentsDisclosure present: false
                           pageColumns present:        true
                           prose: <div class="prose" id="tresc" tabindex="-1">
```

Neither housing, and no single dead row. Then one section-less lesson added to
the same module — the case spec §8 names as the rule's consequence:

```
/moduly/99-tymczasowy/jedyna-lekcja   link Wstęp → /moduly/99-tymczasowy
                                      text [current] 99a
/moduly/99-tymczasowy                 text [current] Wstęp
                                      link 99a Jedyna lekcja
```

Before this slice that lesson page would have had no panel at all — one lesson,
no sections, no link anywhere in the list. „Wstęp" is the link that gives it
one.

The directory was removed and `git status --porcelain content/` diffed against
the snapshot taken before the experiment: **no difference**.

## T08 — „Wstęp" expands (criterion 7)

**With no introduction carrying a heading** — the corpus as written — the row
stands alone on both modules' pages: `text [current] Wstęp` with no
`contentsSections` list beneath it (the tables in T07 above).

**With a heading temporarily added** to `content/moduly/00-start/index.mdx`
(`## Co dalej — sekcja tymczasowa`), the file copied aside first and restored
from that copy afterwards:

```
/moduly/00-start   text [current] Wstęp
                   link - Co dalej — sekcja tymczasowa → #co-dalej-sekcja-tymczasowa
                   link 0a Jak działa ten kurs
                   link 0c Git i GitHub — minimum, które wystarczy

page markup:       <h2 id="co-dalej-sekcja-tymczasowa">Co dalej — sekcja tymczasowa</h2>
```

The entry links to the identifier the page gives the heading — one derivation,
two consumers, as for a lesson. Following it, on a viewport short enough for
the document to scroll that far:

```
before: scrollY=0   heading top=462   scroll-margin-top=32px
after:  hash=#co-dalej-sekcja-tymczasowa   scrollY=430   heading top=32
        entries marked aria-current="location": 2 (panel + disclosure, one displayed)
```

The heading lands 32 px below the top edge and the highlight moves to it —
007's behaviour, on the module page.

Restored: the file's `sha256` is `1578f575…1ce7c065` before and after, and
`git status --porcelain content/` is identical to the snapshot.

## T09 — The reference page (criterion 16)

Renders at 1280 px (`ovf 0`) and 375 px (`ovf 0`), with two panel specimens:

```
specimen 1 (a lesson page):  link Wstęp · link 7a Krótki tytuł · text 7b Tytuł na tyle długi…
specimen 2 (a module page):  text Wstęp · link 7a Krótki tytuł · link 7b Tytuł na tyle długi…
```

Both states of the new row, as the site renders them.

**Pre-existing, not this slice's:** the reference page logs React warnings about
SVG attributes written in kebab-case (`stroke-width`, `font-size`,
`font-weight`, `stroke-dasharray`) from a diagram specimen. They are in the file
at commit `4180ffb`, before any code of this slice, and appear on no other page.

## T10 — The sweeps

### Criterion 1

```
$ node scripts/check-design-invariants.mjs   → exit 0
$ diff baseline-invariants.txt after-invariants.txt
$ echo $?
0                        ← the contrast report is identical, token for token
$ npm run lint           → clean
$ npm run build          → exit 0, 16 static pages
```

### Criterion 12 — the lesson page did not otherwise move

Boxes at 1280 and 1585 on `1b`, after everything: panel **32 / 352 t153.8** ·
column **408 / 736 t153.8** · lesson header **464 / 624 t153.8** · `.prose`
**408 / 736 t431.7** · first `p` **464 / 624 t431.7** · pager **464 / 624
t7282.4** · site header 304.5 / 656 (457 at 1585) · ovf 0. Identical to T03.

007's behaviours, in the browser:

| state | highlighted | back-to-top |
| --- | --- | --- |
| top of the lesson, scrollY 0 | *(none)* | absent |
| scrolled to scrollY 4504 | „- Co się naprawdę zmieniło", and only it | present |
| the document's bottom | „- Źródła" — the last section | present |

The panel's own scroller, on a 420 px-tall viewport where its content
overflows:

```
before: pageScrollY=0  panelScrollTop=0  clientHeight=356  scrollHeight=397
        overflow-y: auto
set panel.scrollTop = 9999
after:  pageScrollY=0  panelScrollTop=42   ← the panel reached its end; the page did not move
```

### Criterion 14 — a browser with scripting disabled

Read from the server-rendered markup, which is exactly what such a browser
receives and renders:

| | Moduł 1 | Moduł 0 |
| --- | --- | --- |
| `<details class="contentsDetails">` + `<summary>Spis treści</summary>` | yes | yes |
| `open` attribute | absent — collapsed | absent — collapsed |
| links in the two housings | 14 | 4 |
| `aria-current="location"` anywhere | absent | absent |
| `class="backToTop"` anywhere | absent | absent |

Every entry is a real `<a href>`, so „Wstęp" and every lesson link navigates
with no scripting at all; the disclosure is a native `<details>`, so it opens
and closes with none either — demonstrated live at 375 px by clicking the
summary: `open: false → true` (8 rows, „Wstęp" first) `→ false`, with `ovf = 0`
throughout and the prose returning to `t239`.

Console on a freshly loaded module page: **no errors** — one React DevTools
notice and the dev server's HMR line, both dev-server artefacts.

### Criterion 15 — both modules

Every module-page criterion above is recorded for **Moduł 0** — a 49-word
introduction, two lessons, three entries — and for **Moduł 1** — 330 words,
seven lessons, eight entries.

### Criterion 17 — what the slice touches

```
$ git diff --stat 56253fa HEAD -- . ':!specs'
 app/contents.css                      |  33 +++---
 app/moduly/[module]/[lesson]/page.tsx |   4 +-
 app/moduly/[module]/page.tsx          |  93 +++++++++++-----
 app/styleguide/page.tsx               |  43 ++++++--
 components/contents.tsx               | 195 ++++++++++++++++++++++++----------
 lib/content.ts                        |  26 ++++-
 6 files changed, 281 insertions(+), 113 deletions(-)

$ git diff --name-only 56253fa HEAD -- content/ | wc -l
0
$ git diff --stat 56253fa HEAD -- package.json package-lock.json | wc -l
0
```

Network: in the production build every page loads the same **two** stylesheets
and **eight** JS chunks — seven shared plus one route chunk each — so the module
page requests no file it did not request before, and the one client-side thing
it gained, the scroll-spy, is already inside the shared chunk the lesson page
ships. Every request is same-origin `/_next/static`: the document, the four
`woff2` faces the site loads on every page, the two stylesheets and the chunks.
Nothing third-party, no image, no new font. *(Structural, not a before-and-after
diff of the request list: the module page's asset set is identical in count and
shape to the untouched `/moduly` and `/` pages'.)*

### Criterion 18 — not closable by this run

Whether the module page and a lesson page now read as the same site is Viktar's
eye. **Open `/moduly/01-jak-powstaje-oprogramowanie` at 1280 px or wider, then
click `1b` and compare.**

## T11 — The closing review, and what it changed

A second subagent, with no sight of this session, read `constitution.md`,
`AGENTS.md`, this slice's `spec.md` and the whole diff `56253fa..HEAD`, ran the
build, the lint and `tsc --noEmit`, and re-measured the pages itself.

**Its verdict:** the diff meets the acceptance criteria, and nothing outside
the slice's scope is touched. It re-derived criteria 1–6, 10–17 independently.
It raised one code-level finding and three about how this file records its
checks.

### Fixed — the one code-level finding

**A lesson slugged `intro` would have collided with the introduction's React
key.** `buildEntries` gave the introduction `key: "intro"` and every lesson
`key: lesson.slug`, and a lesson slug is any `.mdx` in the module's folder
except the index — so `intro.mdx` is a file somebody may write, and two rows
would have shared a key. No criterion and no page that exists is affected,
which is exactly why it would not have been found later.

Fixed by prefixing the lesson keys (`lesson:${slug}`), so the collision is
**unconstructible** rather than merely absent — the same move the skip target's
identifier already makes in the anchor plugin. React keys never reach the
markup, and the rendered list is unchanged; `npm run lint`, `npx tsc --noEmit`
and `npm run build` are green and the contrast report is still identical to the
T03 baseline.

### Corrected — criterion 8, now run as it is written

The review was right that T07 substituted a lesson-*less* module for the
criterion's "every lesson of a module temporarily unpublished", and that the
criterion's other half — *the page is otherwise unchanged* — cannot be shown on
a page with no before-state.

Re-run properly, still without touching a tracked file: the temporary module
was rebuilt with **two published lessons**, measured, then both lessons were
given `publish: false` and it was measured again. Same page, before and after:

```
                     published            every lesson unpublished
panel:               true          →      false
disclosure:          true          →      false
rows:                Wstęp, 99a, 99b (×2) →  []
lessonList:          true          →      false
pageColumns:         true          →      true
pager:               true          →      true
band:                true          →      true
prose:               <div class="prose" id="tresc" tabindex="-1"><h1>Modul
                     tymczasowy</h1><p>Wstep bez naglowkow…</p></div>
                                   →      byte-identical
```

Neither housing, no dead row, and nothing else on the page changed except the
lesson list — which empties because the module has no published lesson, a
behaviour the module page already had before this slice. Geometry of that page
at 1280 px with both housings gone: `div.prose` **408 / 736 t153.8**, pager
**464 / 624**, `.bandInner` 312 / 656, `ovf 0` — the column is exactly where
every other page's is.

The directory was deleted and `git status --porcelain content/` diffed against
the pre-experiment snapshot: no difference. `content/moduly/00-start/index.mdx`
still hashes `1578f575…1ce7c065`.

### Corrected — the band, measured as two different boxes

The review found that T03's tables print `band` as the **full-bleed `.band`**
(`0 / 1265`) while T07's print `band` as the **inner `.bandInner`**
(`304.5 / 656`), so as laid out the two tables do not compare the same element
— which is the one thing criterion 2 asks of the accent band.

The claim holds; the record was sloppy. The inner box's baseline is in T03's
answer to the plan's gap 4 — `.bandInner` **304.5 / 656** at 1280 px and
**457 / 656** at 1585 px, on a module page and on a lesson page alike — and it
is unmoved after. At every other width the invariant slice 006 established
closes it: `.bandInner` and `.siteHeaderInner` share the lane, so

```
.bandInner (after)  ==  .siteHeaderInner (after)  ==  .siteHeaderInner (T03 baseline)
Moduł 1:  1024 → 176.5 / 656   768 → 48.5 / 656   375 → 0 / 375
Moduł 0:  1024 → 184 / 656     768 → 56 / 656     375 → 0 / 375
```

all three equal at every width. Neither the band component nor the stylesheet
that positions it is in this slice's diff.

### Noted — the skip control's reveal depends on the browser's focus modality

The review could not reproduce T07's `clipPath: none · position: static`
reading on a freshly loaded page, and it is right about why: `.contentsSkip`
reveals itself on `:focus-visible`, which matches only when the browser
considers the interaction modality to be keyboard. This session's reading was
taken after real `Tab` presses had set that modality; a bare programmatic
`.focus()` on a fresh load does not. Both observations are of the same correct
rule — 007's, untouched by this diff and identical on a lesson page. What is
demonstrated on the module page either way: the control is the panel's first
focusable, it is 1×1 and `clip-path: inset(50%)` at rest, and activating it
moves real focus to `div#tresc.prose` with no ring.

### Recorded, not fixed

Neither affects correctness or an acceptance criterion (AGENTS.md §3):

- **The reference page writes `„Wstęp"` with a straight ASCII closing quote**
  (`app/styleguide/page.tsx`, four occurrences), where the same file uses the
  typographic `”` elsewhere. It came from escaping the character to satisfy the
  lint rule on unescaped entities.
- **Two comments now overshoot their subject.** `app/contents.css` still
  explains the skip target as one whose focus ring "would ring the entire
  article", though on a module page the target is the title-and-introduction
  block; and a comment in `components/contents.tsx` cites "criterion 13's
  no-JavaScript classroom case", which is 007's numbering, not this slice's.
