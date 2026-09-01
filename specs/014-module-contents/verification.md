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
