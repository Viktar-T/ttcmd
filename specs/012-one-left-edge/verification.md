# verification.md — 012-one-left-edge

Evidence for the acceptance criteria in `spec.md`, accumulated task by task.
Numbers are **measured**, not asserted.

Measurements are taken in the in-app driven browser against the dev server
(`npm run dev` on `localhost:3000`), the same instrument for the baseline and
for every later comparison. Boxes are read with `getBoundingClientRect()` and
written `left / width` in CSS px. `cw` is `document.documentElement.clientWidth`
— 15 px less than the viewport wherever the page is tall enough for a vertical
scrollbar, which is why centred boxes read `264.5` at 1280 px rather than `272`.
A media query does not see that scrollbar; slice 011's `verification.md` records
the direct check.

---

## T03 — The plan's assumptions, and the baseline (criteria 2–6, "before")

### The plan's two load-bearing assumptions, checked before any code

- **The three lengths sum to 408 px.** `--lesson-margin: 2rem` +
  `--contents-width: 22rem` + `--contents-gap: 1.5rem` = 25.5rem = **408 px**.
  The plan derived 32 + 352 + 24 = 408 from the acceptance criteria alone,
  without reading the stylesheet. It was right.
- **The lesson page bypasses the frame.** Its only children of the frame are
  the accent band and the two-column wrapper, and both carry
  `data-full-bleed`, which the frame maps to its full-width track. The content
  track's position cannot reach a lesson page, so criterion 4 is satisfied by
  not touching anything — the fork the plan could not resolve from the spec
  does not exist.
- **The fold is `80rem`**, as the plan inferred from criteria 6 and 7.
- **The reference page prints no geometry numbers**, so the plan's gap 4 is
  moot: there is no documented geometry there to falsify.

### The baseline

Taken at commit `3aa716a` — spec only, no code of this slice exists.
`ovf` is `scrollWidth − clientWidth`: **0 everywhere**, so no document has a
horizontal scrollbar before the change either.

### The pages that must move

| page | vw | cw | ovf | site header inner | band inner | `main`'s children |
| --- | ---: | ---: | ---: | --- | --- | --- |
| `/moduly/01-…` | 1280 | 1265 | 0 | 304.5 / 656 | 304.5 / 656 | band 0 / 1265 · `div.prose` **264.5 / 736** · `nav.lessonList` **320.5 / 624** · `nav.pager` 320.5 / 624 |
| `/moduly/01-…` | 1585 | 1570 | 0 | 457 / 656 | 457 / 656 | band 0 / 1570 · `div.prose` **417 / 736** · `nav.lessonList` **473 / 624** · `nav.pager` 473 / 624 |
| `/moduly` | 1280 | 1280 | 0 | 312 / 656 | — | `header.lane` **328 / 624** · `ul.moduleGrid` **328 / 624** |
| `/moduly` | 1585 | 1585 | 0 | 464.5 / 656 | — | `header.lane` **480.5 / 624** · `ul.moduleGrid` **480.5 / 624** |
| `/` | 1280 | 1280 | 0 | 312 / 656 | — | `section.hero` **328 / 624** · `ul.moduleGrid` **328 / 624** |
| `/` | 1585 | 1585 | 0 | 464.5 / 656 | — | `section.hero` **480.5 / 624** · `ul.moduleGrid` **480.5 / 624** |
| `/styleguide` | 1585 | 1570 | 0 | 457 / 656 | — | first child **417 / 736**; panel specimen 417 / 352 |

**The defect, in one line.** The module page's lesson list starts at
**320.5 px** at 1280 and **473 px** at 1585. The prose of the lesson it links
to starts at **464 px** at both. Clicking a lesson therefore moves the text
144 px right at 1280 and 9 px left at 1585, and the number moves with the
window on one page and not on the other.

### The lesson page, which must not move (criterion 4)

From slice 011's `verification.md` T05, re-measured there at both widths:
contents column **32 / 352** top 153.8 · lesson column **408 / 736** top 153.8 ·
lesson header **464 / 624** top 153.8 · `.prose` wide lane **408 / 736** ·
first `> p` **464 / 624** · pager **464 / 624**. Identical at 1280 and 1585.

### Below the fold, which must not move (criterion 6)

Module page:

| vw | cw | ovf | site header inner | band inner | `div.prose` | `nav.lessonList` | `nav.pager` |
| ---: | ---: | ---: | --- | --- | --- | --- | --- |
| 1024 | 1009 | 0 | 176.5 / 656 | 176.5 / 656 | 136.5 / 736 | 192.5 / 624 | 192.5 / 624 |
| 768 | 753 | 0 | 48.5 / 656 | 48.5 / 656 | 16 / 721 | 64.5 / 624 | 64.5 / 624 |
| 375 | 375 | 0 | 0 / 375 | 0 / 375 | 16 / 343 | 16 / 343 | 16 / 343 |

Home page at 375: site header inner 0 / 375 · `section.hero` 16 / 343 ·
`ul.moduleGrid` 16 / 343 · ovf 0.

### The build, to be matched exactly afterwards

`npm run build` green; `Design invariants OK.` and the fourteen contrast lines
as recorded in slice 011's `verification.md` T04. `npm run lint` clean since
commit `086dc09`.

---

## T04 — The frame's content column is anchored (criteria 1–9)

### The build

`npm run build` green, `Design invariants OK.`, the fourteen contrast lines
unchanged. `npm run lint` exits 0 with no output.

### Criterion 9 — each length declared once

```
app/tokens.css:123:  --contents-width: 22rem;
app/tokens.css:124:  --contents-gap: 1.5rem;
app/tokens.css:125:  --lesson-margin: 2rem;
app/tokens.css:127:  --content-inset: calc(
```

One declaration each, all in the token file beside the measure and the content
width. `--content-inset` is the sum, written once, and the frame names it
rather than repeating `2 + 22 + 1.5`. `app/contents.css` keeps the reasoning as
a comment and declares nothing.

### Criterion 2 — the pages that had to move

`left / width`, and **the same at both widths**, which is the point:

| page | box | before 1280 | before 1585 | after, both |
| --- | --- | ---: | ---: | ---: |
| `/moduly/01-…` | content column (`div.prose`) | 264.5 / 736 | 417 / 736 | **408 / 736** |
| `/moduly/01-…` | `nav.lessonList` | 320.5 / 624 | 473 / 624 | **464 / 624** |
| `/moduly/01-…` | `nav.pager` | 320.5 / 624 | 473 / 624 | **464 / 624** |
| `/moduly` | `header.lane` | 328 / 624 | 480.5 / 624 | **464 / 624** |
| `/moduly` | `ul.moduleGrid` | 328 / 624 | 480.5 / 624 | **464 / 624** |
| `/` | `section.hero` | 328 / 624 | 480.5 / 624 | **464 / 624** |
| `/` | `ul.moduleGrid` | 328 / 624 | 480.5 / 624 | **464 / 624** |

### Criterion 3 — the jump is gone

The module page's lesson list starts at **464**. The prose of the lesson it
links to (`1b`, `od-podpowiedzi-do-agenta`) starts at **464**. Same number at
1280, at 1585, at 1281 and at 2560. Before this slice the pair was 320.5 against
464 at 1280 and 473 against 464 at 1585.

### Criterion 4 — the lesson page did not move

`1b` at 1585, `left / width / top`: contents column **32 / 352 / 153.8** ·
lesson column **408 / 736 / 153.8** · lesson header **464 / 624 / 153.8** ·
`.prose` wide lane **408 / 736** · first `> p` **464 / 624** · pager
**464 / 624**. Every one of them is slice 011's number, and the contents column
is still level with the lesson header. At 1281 and at 2560 the panel is
**32 / 352** and the measure **464 / 624** — unchanged by the viewport, as
before.

This is structural, not lucky: a lesson page's only two children of the frame
are both full-bleed, so they take the `full` track and never see where
`content` starts.

### Criterion 5 — the chrome did not move

| page | vw | site header inner | band inner | before |
| --- | ---: | --- | --- | --- |
| `/moduly/01-…` | 1280 | 304.5 / 656 | 304.5 / 656 | identical |
| `/moduly/01-…` | 1585 | 457 / 656 | 457 / 656 | identical |
| lesson `1b` | 1585 | 457 / 656 | 457 / 656 | identical |
| `/moduly` | 1280 / 1585 | 312 / 656 · 464.5 / 656 | — | identical |
| `/` | 1280 / 1585 | 312 / 656 · 464.5 / 656 | — | identical |

They stay centred, which is Viktar's answer and spec decision 2. The
consequence, recorded plainly: at 2560 px the home page's hero begins at **464**
while the wordmark above it begins at **952**, and the gap grows with the
window. `app/nav.css` now says so where the lane is defined.

### Criterion 6 — below the fold, nothing changed

Module page, every number equal to T03's baseline:

| vw | cw | ovf | site header | band | `div.prose` | `nav.lessonList` | `nav.pager` |
| ---: | ---: | ---: | --- | --- | --- | --- | --- |
| 1024 | 1009 | 0 | 176.5 / 656 | 176.5 / 656 | 136.5 / 736 | 192.5 / 624 | 192.5 / 624 |
| 768 | 753 | 0 | 48.5 / 656 | 48.5 / 656 | 16 / 721 | 64.5 / 624 | 64.5 / 624 |
| 375 | 375 | 0 | 0 / 375 | 0 / 375 | 16 / 343 | 16 / 343 | 16 / 343 |

Home page at 375: site header 0 / 375 · hero 16 / 343 · grid 16 / 343 · ovf 0 —
the baseline.

### Criterion 7 — no horizontal scrollbar

`scrollWidth − clientWidth` on every page type at every probe:

| width | `/` | `/moduly/01-…` | lesson `1b` |
| ---: | ---: | ---: | ---: |
| 320 | 0 | 0 | 0 |
| 1279 | 0 | — | — |
| 1281 | 0 | 0 | 0 |
| 1585 | 0 | 0 | 0 |
| 2560 | 0 | 0 | 0 |

1281 is the narrowest width above the fold and the one that would fail first:
the layout needs 408 + 736 + 16 = 1160 px against a `clientWidth` of 1266.

### Criterion 8 — the reference page

Renders at 1280; site header inner 304.5 / 656 unchanged; its first child moved
with the frame from 264.5 / 736 to **408 / 736**, and the contents specimen from
264.5 / 352 to **408 / 352**. It prints no geometry numbers, so nothing there
had to be re-worded.
