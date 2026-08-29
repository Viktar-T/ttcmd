# verification.md — 006-navigation

Evidence for the acceptance criteria in `spec.md`. Ratios are **computed**, not
estimated. Checked 2026-08-29 against the dev server on `localhost:3000` and
against the production build, Next 16.3.3, Chromium, at 1280×900 and 375×812, in
both themes.

Where a number could be compared with an earlier slice's, it was: 004's and
005's `verification.md` are the reference for criteria 12 and 13, not memory.

---

## 1 — The build, and no loose colour

```
  Design invariants OK.
✓ Compiled successfully in 313ms
✓ Generating static pages using 8 workers (13/13) in 2.2s
```

Check B walks `app/`, `lib/` and `components/`. The one colour literal this slice
adds is `--rule-strong` in `app/tokens.css`, the file that is the guard's single
exemption. No exemption comment was needed anywhere, which is still the state to
prefer.

**Pass.**

## 2 — The contrast floors, computed by the build

Check E resolves each token through its `var()` aliases to a literal and
computes the WCAG 2.x ratio for **every theme the token file defines**. Printed
on every build:

| theme | pair | ratio | floor |
| --- | --- | ---: | ---: |
| dark | `--text` on `--bg` | **12.21** | 4.5 |
| dark | `--text-muted` on `--bg` | **5.86** | 4.5 |
| dark | `--link` on `--bg` | **8.67** | 4.5 |
| dark | `--accent-line` on `--bg` | **8.67** | 4.5 |
| dark | `--accent-ink` on `--accent-surface` | **10.27** | 4.5 |
| dark | `--rule-strong` on `--bg` | **3.69** | 3 |
| dark | `--rule-quote` on `--bg` | **5.86** | 3 |
| light | `--text` on `--bg` | **14.71** | 4.5 |
| light | `--text-muted` on `--bg` | **6.34** | 4.5 |
| light | `--link` on `--bg` | **5.86** | 4.5 |
| light | `--accent-line` on `--bg` | **5.86** | 4.5 |
| light | `--accent-ink` on `--accent-surface` | **10.27** | 4.5 |
| light | `--rule-strong` on `--bg` | **3.64** | 3 |
| light | `--rule-quote` on `--bg` | **6.34** | 3 |

These reproduce slice 003's table and ADR-0007's own figures exactly, and
ADR-0012's two new numbers. Three verification documents had these worked out by
hand; from this slice on, the build recomputes them.

One implementation note, because it was a real bug caught before it shipped:
both `:root` and `:root[data-theme="light"]` appear **several times** in
`app/tokens.css` — the file groups its declarations by subject rather than by
selector — so a theme is the union of its blocks. The first version read only
the first block of each and printed the dark values under the light selector.

**Pass.**

## 3 — Breaking a floor fails the build

Two, each shown and reverted.

`--rule-strong` moved toward the dark background:

```
  [Check E] dark (:root): --rule-strong (#5a5751) on --bg (#2a2926) is 2.02:1,
  under the 3:1 floor — a rule that identifies a component (ADR-0012).
  The value is what changes, not the floor.
```

`--text-muted` darkened on the dark theme only:

```
  [Check E] dark (:root): --text-muted (#8e8a83) on --bg (#2a2926) is 4.23:1,
  under the 4.5:1 floor — muted text. The value is what changes, not the floor.
```

The second failed on the dark theme alone, because the light theme overrides
that token — which is the reason the check runs per theme rather than once.

**Pass.**

## 4 — A module folder without a number fails the build

`content/moduly/00-start` was temporarily renamed to `content/moduly/start`:

```
Error: content/moduly/start: a module folder must begin with its number and a
hyphen, as "01-slug". The module's number comes from that prefix and from
nowhere else (constitution Article VI, ADR-0003).
> Build error occurred
Error: Failed to collect page data for /moduly/[module]
```

Reverted; the build passes. The folder is named in the message, which is the
point — a build that stops without saying which folder is a build somebody has
to bisect.

**Pass.**

## 5 — `0c`, everywhere, derived from `order` and not from position

Module 0 holds exactly one lesson and it sits at `order: 3`. Every list of it is
a list of one, and anything numbering by array index renders `a` and looks
entirely correct.

Printed from the course during a build:

```
MODULE  slug=00-start number=0 label="Moduł 0" href=/moduly/00-start lessons=1
  LESSON order=3 letter=c id=0c href=/moduly/00-start/git-i-github
MODULE  slug=01-jak-powstaje-oprogramowanie number=1 label="Moduł 1" lessons=5
  LESSON order=1 letter=a id=1a …   LESSON order=2 letter=b id=1b …
  LESSON order=3 letter=c id=1c …   LESSON order=4 letter=d id=1d …
  LESSON order=5 letter=e id=1e …
```

Read from the rendered HTML:

- module page `/moduly/00-start` — one chevron row, reading `0c Git i GitHub —
  minimum, które wystarczy`;
- lesson page breadcrumb — `Moduły › Moduł 0 › 0c`;
- `1a`'s previous control — `0c`, and it names Moduł 0.

**Pass.**

## 6 — Every lesson reachable from the landing page by links alone

Walked over the rendered HTML, following only `href`s:

```
/                                        → /moduly/00-start
                                         → /moduly/01-jak-powstaje-oprogramowanie
/moduly/00-start                         → /moduly/00-start/git-i-github
/moduly/01-jak-powstaje-oprogramowanie   → …/od-podpowiedzi-do-agenta
                                         → …/co-model-naprawde-potrafi
                                         → …/vibe-coding-kontra-inzynieria
                                         → …/na-zywo-agent-buduje-aplikacje
                                         → …/jak-nie-wypasc-z-obiegu
reachedAll: true   missing: []
```

Two clicks from the landing page to any lesson, or one via the *Zacznij kurs*
button. No URL typed, no back button.

**Pass.**

## 7 — Previous and next, and the module boundary

Read from the rendered HTML of all six lessons:

| page | previous | next |
| --- | --- | --- |
| `0c` | — (0 elements) | `Następna lekcja · Moduł 1 →` `1a` |
| `1a` | `← Poprzednia lekcja · Moduł 0` `0c` | `Następna lekcja →` `1b` |
| `1b` | `← Poprzednia lekcja` `1a` | `Następna lekcja →` `1c` |
| `1c` | `← Poprzednia lekcja` `1b` | `Następna lekcja →` `1d` |
| `1d` | `← Poprzednia lekcja` `1c` | `Następna lekcja →` `1e` |
| `1e` | `← Poprzednia lekcja` `1d` | — (0 elements) |

The module is named on exactly the two steps that cross a boundary and on none
of the four that do not. Walked as well as read: clicking the next control on
`0c` lands on `/moduly/01-jak-powstaje-oprogramowanie/od-podpowiedzi-do-agenta`.

Module pages likewise: Moduł 0 offers a next and no previous, Moduł 1 the
reverse.

**Pass.**

## 8 — A control that would be empty is absent

`document.querySelectorAll('.pagerPrevious')` returns **0** on `0c`, and
`.pagerNext` returns **0** on `1e`. Nothing disabled, nothing to tab to.

**Pass.**

## 9 — The breadcrumb's markup

The rendered trail on `/moduly/00-start/git-i-github`:

```html
<nav aria-label="Ścieżka nawigacji" class="breadcrumb">
  <ol class="breadcrumbList" role="list">
    <li class="breadcrumbItem"><a class="chev" href="/moduly">Moduły</a></li>
    <li class="breadcrumbItem"><a class="chev chevNotched" href="/moduly/00-start">Moduł 0</a></li>
    <li class="breadcrumbItem"><span class="chev chevNotched chevCurrent" aria-current="page">0c</span></li>
  </ol>
</nav>
```

A navigation landmark with a name, an ordered list, links for the earlier steps,
and a **non-link** current step carrying `aria-current="page"`. `role="list"` is
not redundant: Safari drops list semantics from a list whose `list-style` is
`none`.

**Pass.**

## 10 — Focus, on every surface

Measured by pressing **Tab**, not by programmatic focus — `:focus-visible` does
not match a scripted `focus()` after a mouse interaction, so a scripted check
would have measured a rule that was not applying.

| control | surface | `outline-color` | ratio against that surface |
| --- | --- | --- | ---: |
| the wordmark | page | `rgb(201,194,245)` `--accent-line` | **8.67** dark / 5.86 light |
| the theme control | page | `rgb(201,194,245)` | **8.67** / 5.86 |
| a breadcrumb step | **band** | `rgb(28,27,24)` `--accent-ink` | **10.27**, both themes |
| the *Zacznij kurs* button | page | `rgb(201,194,245)` | **8.67** / 5.86 |
| a module card | page | `rgb(201,194,245)` | **8.67** / 5.86 |

The band's override is the whole point of this criterion. On the dark theme —
the default — `--accent-line` and `--accent-surface` are **the same value**
(ADR-0007: one pale value serves both roles there), so the site's usual focus
ring drawn on the accent band is not faint, it is absent. It is a computed
comparison rather than a look for exactly that reason.

A focused chevron row fills with `--accent-surface` while its ring stays
`--accent-line` with a 2px offset: on the dark theme the two are the same
colour, and the 2px of page background between them is what separates them.

**Pass.**

## 11 — The band is full width, and no page scrolls sideways

Eleven pages × two themes, at each viewport, in an iframe sized to the viewport:

| viewport | runs | horizontal-scroll failures | band width | content box |
| --- | ---: | ---: | --- | --- |
| 375×812 | 22 | **0** | 375 (= viewport) | 343 |
| 1280×900 | 22 | **0** | 1280 / 1265 (= client width) | 736 |

The 1265 figure is the pages long enough to have a vertical scrollbar. The
reference page also reports a 343/736 band — that is the **specimen** band inside
its section, not a full-bleed one, and is correct.

**Pass.**

## 12 — Slice 004 is unmoved

**The measure.** `.prose > p` computes to exactly **624px** — 39rem, the value
004 arrived at by counting. Line counts per paragraph on the three lessons 004
measured, with the same `Range.getClientRects()` method:

| lesson | full lines — 004 | full lines — now |
| --- | ---: | ---: |
| `git-i-github` | 19 | **19** |
| `od-podpowiedzi-do-agenta` | 21 | **21** |
| `vibe-coding-kontra-inzynieria` | 17 | **17** |

Identical. (The per-line means differ by a constant 1.0 from 004's, which is a
difference in what the two scripts count as a character, not in where the lines
break — the line counts are the geometry.)

**The rhythm.** Every adjacency measured as `next.top − previous.bottom` against
the following element's computed `margin-top`, on four lessons.
`margin-bottom` is `0px` on **every** flow child, as 004 left it:

| sequence | 004 | now |
| --- | ---: | ---: |
| paragraph → list | 25.6 / 26 | **25.6 / 26** |
| list → heading | 68 / 68 | **68 / 68** |
| paragraph → quotation | 40 / 40 | **40 / 40** |
| quotation → heading | 68 / 68 | **68 / 68** |
| paragraph → diagram | 40 / 40 | **40 / 40** |
| diagram → paragraph | 40 / 40 | **40 / 40** |

Also unchanged: `h2 → p` 26, `p → h3` 48, `h2 → h3` 48.

**Pass.**

## 13 — Slice 005 is unmoved

On `/moduly/00-start/git-i-github`:

```
codeBlocks: 9      copyButtons: 9
surface: rgb(30, 29, 27)      = --bg-code #1e1d1b
pre overflow-x: auto
p → figure[code]: marginTop=40px gap=40px
figure[code] → p: marginTop=40px gap=40px
figure[code] → h2: marginTop=68px gap=68px
h3 → figure[code]: marginTop=40px gap=40px
```

The block's place in the rhythm is 004's `--gap-apart` above and below, and a
heading after one still gets the heading's own larger gap. `app/prose.css`,
`components/code-block.*`, `components/copy-button.tsx`, `lib/code-highlight.ts`
and `lib/code-meta.ts` are **not touched by any commit in this slice**.

**Pass.**

## 14 — The theme, in its new housing

The control is in the header and its computed `position` is `static` — slice
003's `position: fixed` is gone, which is the debt that file recorded.

| check | result |
| --- | --- |
| nothing stored, first load | `data-theme="dark"`, background `rgb(42,41,38)` — the OS is still not consulted |
| click the control | `light`, `ttcmd-theme` = `light`, background `rgb(247,246,242)` |
| reload | light survives; `--accent-line` `#5b4fbf`, `--rule-strong` `#83807a` |
| navigate to another lesson | light survives |
| click again | `dark`, stored `dark`, background `rgb(42,41,38)` |

**Pre-paint.** In the production HTML the browser is served, the theme script is
a synchronous inline `<script>` in `<head>` at byte **1713**, before `<body>` at
byte **1883**, with only `async` scripts ahead of it — and `<html>` still ships
`data-theme="dark"`. A synchronous inline script in `<head>` blocks parsing and
a browser cannot paint before it has parsed `<body>`, so it runs before the
first paint by construction. Unchanged from slice 003; the component moved, its
logic did not.

**Pass.**

## 15 — The module grid, with no illustrations

Rendered content of the two cards:

| card | kicker | number | title | one line of fact |
| --- | --- | --- | --- | --- |
| `/moduly/00-start` | Moduł | **0** | Start | **1 lekcja** |
| `/moduly/01-…` | Moduł | **1** | Jak dziś powstaje oprogramowanie | **5 lekcji** |

The number is 63px in `--accent-line`, deliberately outside slice 004's reading
scale: it is not read, it is the one graphic element on a site that has no
illustrations. The doubled frame is a second border offset 0.3rem behind the
card — a `::after` at `z-index: -1` and, unlike the chevron, **not** isolated, so
it falls below the card's own background and shows as an L on the right and the
bottom.

Column counts and containment:

| width | columns | card | horizontal scroll |
| ---: | ---: | ---: | --- |
| 375 | 1 | 328px | none |
| 700 | 2 of a possible 3 | 304px | none |
| 1280 | 2 of a possible 3 | 304px | none |

`auto-fit` collapses the third track while only two modules exist, so the grid
is already right for the third one.

**Judged on the rendered page, both themes, at both widths:** the cards read as
cards; the numeral carries the space the reference gives to a drawing without
looking like a placeholder; the offset frame reads as a deliberate second
outline rather than as a rendering artefact. Plainer than the reference, which
is what `docs/design-reference.md` says to accept.

**Pass.**

## 16 — The button's destination is derived

Rendered `href`: `/moduly/00-start/git-i-github`. Read off the content: the
first module by number is `00-start`, and its first lesson by `order` is
`git-i-github`. Nothing is written down, so inserting a module before it moves
the button rather than breaking it.

**Pass.**

## 17 — Both module introductions render, and no content changed

`/moduly/00-start` renders *"Zanim napiszemy pierwszą linijkę kodu aplikacji…"*
and `/moduly/01-…` renders *"Zanim zaczniemy budować aplikacje…"* — the text of
the two `index.mdx` bodies, which the content layer had been compiling and
discarding since slice 001.

```
$ git log --oneline <slice>..HEAD -- content/   →  0 commits
$ git diff <slice>..HEAD --stat -- content/     →  0 files
```

Three lesson files are modified in the working tree; they were modified **before
this slice began** and are Viktar's own uncommitted content work. No commit in
this slice touches `content/`.

**Pass.**

## 18 — The chevrons, in both themes

Computed text-on-fill for each state:

| state | text | fill | ratio |
| --- | --- | --- | ---: |
| breadcrumb, earlier step (outlined, on the band) | `--accent-ink` | `--accent-surface` | **10.27** |
| breadcrumb, current step (filled, on the band) | `--accent-surface` | `--accent-ink` | **10.27** |
| chevron row at rest | `--text` | `--bg` | **12.21** dark / 14.71 light |
| chevron row hovered or focused | `--accent-ink` | `--accent-surface` | **10.27** |

Outlines: `--accent-ink` on the band at **10.27**, `--rule-strong` on the page at
**3.69 / 3.64** — all above 1.4.11's 3:1, which is the reason ADR-0012 exists.

**Judged on the rendered page, both themes, desktop and 375px:** the shape reads
as a chevron at every size; the notch on the second and third steps makes the
trail read as one connected run rather than as three separate tags; the 1px
outline is continuous around both diagonals, which is the thing this technique
exists to get right. The stroke along a diagonal is `1px × sin θ` ≈ 0.87px
against 1px on the flat edges, and at this point depth that difference is not
visible.

**Pass.**

## 19 — A long title wraps inside its row

At 375px, module 1's five rows are all **343px** wide and the page does not
scroll sideways:

| row | title | lines | row height |
| --- | --- | ---: | ---: |
| `1a` | Od podpowiedzi do agenta | 1 | 48px |
| `1b` | Co model naprawdę potrafi | 1 | 48px |
| `1c` | Vibe coding kontra inżynieria | **2** | 62px |
| `1d` | Na żywo: agent buduje aplikację | **2** | 62px |
| `1e` | Jak nie wypaść z obiegu | 1 | 48px |

The clip path is a percentage polygon on the box's height, so the point follows
a two-line row without being told to. `white-space` is reset to `normal` on the
row: a breadcrumb step must never wrap and a lesson title at 375px must.

**Pass.**

## 20 — The reference page carries the furniture

Counted on the rendered `/styleguide`, inside the Navigation section:

```
breadcrumbs: 1   steps: 3   filled steps: 1
bands: 1         chevron rows: 2   cards: 2
pager links: 2   buttons: 1
card counts: ["2 lekcje", "1 lekcja"]
```

Those two counts matter beyond being present: with the landing page's `1 lekcja`
and `5 lekcji`, **all three Polish plural forms are now rendered somewhere on
the site**, which the real content alone does not exercise.

Built from literal props — `7a`, `7b`, `8a`, module 7 and module 8 — so the
specimens keep showing what they were written to show when the content changes,
and nothing on that page can be mistaken for a real lesson.

Check B still passes: no colour value is printed on that page.

**Pass.**

## 21 — Nothing is fetched from anywhere else

Network log over `/`, `/moduly`, a module page and a lesson page: **every**
request is to `localhost:3000`. Zero images of any kind. Zero third-party
origins. Four `woff2` files, which are the two families slice 003 loads in their
`latin` and `latin-ext` subsets — no font is added.

(The `POST /__nextjs_original-stack-frames` entries are the dev overlay and do
not exist in the production build.)

**Pass.**

---

## The four defects this pass caught before they shipped

Recorded because three of the four were invisible on the theme and the viewport
everything gets built on.

1. **The current breadcrumb step rendered outlined, with its text in the band's
   own colour and therefore invisible.** `[data-band] .chev` is (0,2,0) and a
   bare `.chevCurrent` is (0,1,0), so the band's `--ground` won on the only
   surface a breadcrumb appears on. Fixed by writing `.chev.chevCurrent` and
   placing it after the band block.
2. **The content children were 32px too narrow and 16px off.** The first version
   of the page frame put the 1rem gutters back on the children as padding, which
   made the lesson header 32px narrower than the prose below it — the exact
   misalignment slice 004 closed in T12a, rebuilt by accident. The gutters live
   in the grid now.
3. **The previous/next pair was 186px wide on a phone** beside 343px lesson
   rows. `margin-inline: auto` on a **grid item** suppresses the default
   `justify-self: stretch`, so the pair sized itself to its content. `.lane`
   fills first and clamps second.
4. **The module grid sat 56px left of the headline above it.** `.moduleGrid`
   reset `margin: 0` to kill the list's block margins and took `.lane`'s `auto`
   inline margins with it. `margin-block: 0` now.

Every one of the four was found by **measuring left edges and widths**, not by
looking at the page — three of them looked entirely plausible in a screenshot.

## Two things observed and deliberately not fixed here

Both pre-date this slice and both belong to another lane.

- **`npm run lint` reports two errors**, in `app/styleguide/page.tsx`, on
  unescaped `"` inside slice 005's specimen prose. Present before this slice —
  verified by stashing this slice's changes and re-running — and `npm run build`
  does not run eslint, so it is not a gate anyone crossed. A `chore:` commit,
  not a navigation change.
- **Five console errors on lesson pages**, all of the form *"Invalid DOM
  property `stroke-width`. Did you mean `strokeWidth`?"* — the hand-written SVG
  diagrams inside the lesson `.mdx` files use kebab-case attributes, which MDX
  compiles as JSX. Content lane, and this slice's out-of-scope list forbids
  touching `content/`.
