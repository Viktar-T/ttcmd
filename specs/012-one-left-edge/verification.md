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

### The overflow question, asked properly

Criterion 7 probes viewport widths, but the frame's above-fold track list is now
made of **fixed** lengths — 25.5rem + 46rem + at least 1rem — where before this
slice the content track carried a `min(…, 100% − 2rem)` clamp that could never
exceed its container. So the question is whether the fold can ever fire on a
viewport the layout does not fit.

Forced by hand, it can: setting `document.documentElement.style.fontSize` to
18px at a 1280px viewport gives `scrollWidth − clientWidth` = **40**, and 20 /
24 / 32px give 185 / 475 / 1055. That is not, however, a state a browser
produces. A media query's `rem` is the **initial** root font size, so raising
the root's *computed* size by script or by a stylesheet moves the layout's rem
without moving the fold's. Nothing in this repo sets a font size on `html` or
`:root` — checked — so the two stay in step.

When they are in step the arithmetic is decisive, and it holds at every root
size because every term is a rem:

```
above-fold layout needs  25.5 + 46 + 1  =  72.5rem
the fold fires at                          80rem
headroom                                  7.5rem  (120px at a 16px root)
```

Slice 011's lesson grid has the same exposure and **less** headroom: its real
minimum is 2 + 22 + 1.5 + 46 + 1.5 (its second column-gap) + 1 (its trailing
track) = **74rem**, against this slice's 72.5rem. The closing review corrected
that arithmetic — the first version here wrote 71.5rem by dropping the trailing
track and the second gap — and the correction strengthens the conclusion rather
than weakening it: 011 is the tighter of the two, so 012 can never be the first
thing to overflow.
Recorded rather than fixed: a defensive `min()` on the content track would
change nothing at any width a browser can produce, and would obscure a track
list whose whole point is that it is a fixed offset.

---

## T05, T06 — The closing review, and what it found (criterion 12)

A subagent with no history of this session reviewed `git diff 3aa716a^ 27b0e51`
against the twelve criteria, re-ran the build, the invariants script and eslint
itself, and re-measured the site at nine widths from 320 to 2560.

**It found criterion 6 broken, by a line this slice never meant to carry.**

### The finding, and T05's fix

`012/T04` staged `app/nav.css` whole. The file carried an in-progress change
from **another session** — `.heroTitle` moving from `calc(var(--text-3xl) *
1.6)` to `clamp(var(--text-2xl), 8vw, calc(var(--text-3xl) * 1.35))` plus a
`line-height: 1.1`, written for a home-page `<h1>` that is still uncommitted in
`app/page.tsx`. The reviewer measured the two rules side by side on the
committed tree: the title is **57.6 px** tall before and **48.6 px** after at
1585, and 30 px at 375 against 28 px at 320. So the home page did **not**
measure what it measured before this slice, which is exactly what criterion 6
forbids.

Two failures, not one, and the second explains the first:

1. `git add <file>` on a file another session is editing commits their work.
   The same trap was avoided deliberately for the four content files in the
   earlier `content:` commit, by rebuilding the index from `HEAD`, and then
   walked into here.
2. Because the hunk was never named, it never reached this file. **Nothing in
   the T04 evidence measures the `<h1>`**, so no check could have caught it.
   The reviewer caught it by reading the diff, not by reading the evidence.

`012/T05` rebuilds the `app/nav.css` index entry from the pre-slice blob with
only this slice's comment edit applied, and leaves the working tree alone so
the other session keeps its work. Afterwards the slice's whole contribution to
`app/nav.css` is **11 added lines, all of them one comment** — no declaration
at all — so the home page's `<h1>` is untouched by this slice by construction,
and criterion 6 holds without needing a measurement.

### Criteria, as the review judged them

1–5, 7–10 **MET**, independently re-measured. 6 **NOT MET at `27b0e51`**, met
after `cd255da`. 11 reserved for a human eye. 12 is the review.

One evidence gap it recorded rather than a defect: on `/moduly` and `/` no DOM
element is 736 px wide, so the criterion-2 table above shows only the 464 / 624
half for those two pages. The 408 / 736 half is the frame's computed track,
which the reviewer read directly as
`[full-start] 408px [content-start] 736px [content-end] …`.

### Fixed on the review's finding

Two pieces of prose that had gone false:

- `app/globals.css` said a lesson page has "only two children of the frame".
  Back-to-top becomes a third once the reader scrolls; it is `position: fixed`,
  so it is out of flow and never a grid item, and the comment now says that
  rather than stating an absolute that is not true.
- `app/styleguide/page.tsx` still described the contents panel as "sticky in
  the frame's left gutter at 80rem and up" — false since slice 011 took it out
  of the gutter. T03 had dismissed the plan's gap 4 on the ground that the
  reference page prints no geometry *numbers*; it prints this prose, and the
  reference page is the one page that may not be wrong about the site's shape.

### Recorded, not fixed

- The fold literal `80rem` now appears in four places. Criterion 9 covers the
  three lengths, not the fold, and a media query cannot read a custom property,
  so removing the repetition is a different change.
- **T03 has no commit of its own.** Its box was already checked when `tasks.md`
  was committed as `012/T02`, so the log does not show the order the work was
  really done in. T03 changed no code; the result is right and the sequence is
  not what the log implies.
- `app/page.tsx` is modified in the working tree by another session, changing
  the home page's `<h1>` from `ttcmd` to *Aplikacje desktopowe i mobilne* with
  a comment asserting the course title is confirmed. Two things follow for
  whoever owns it: it touches `app/`, so Article IX puts it in the App lane and
  it needs a slice rather than a `content:` commit; and constitution Article I
  still carries that title as `TO CONFIRM`, which Article V says is not a
  repository's to settle. Named here, untouched.
