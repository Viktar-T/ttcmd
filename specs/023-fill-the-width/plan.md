# plan.md — 023-fill-the-width

- **Slice:** 023
- **Date:** 2026-09-17
- **Written from:** `constitution.md`, `AGENTS.md` and this slice's `spec.md`
  only — the fresh-context test of AGENTS.md §2, requirement 1. This session has
  never seen the spec being drafted. The repository was read afterwards, so the
  file map names real files and the arithmetic below is the stylesheet actually
  in the tree; nothing about intent comes from it.
- **Libraries:** **none added, none removed.** No dependency, therefore no ADR
  (AGENTS.md §8). No new component, no `"use client"`, no network request, no
  new token colour, type size or spacing value. The measuring instrument is the
  driven browser against `npm run dev`, as in 011, 012 and 020 — a headless
  browser is a dependency and is not introduced for a measurement.

The spec was plannable from its own text. **Three things in it do not survive
contact with the tree** and are named in §6: the module page's contents panel
(§6.1), criterion 8's 792 px (§6.2), and the band's effect on the module grid
below the fold (§6.3). None blocks a step; all three need Viktar's eye.

---

## 1. The geometry, and the one number that moves

Every length in this slice is already a custom property, and the relation the
spec asks for is arithmetic on one of them:

| | today | this slice | where |
| --- | --- | --- | --- |
| `--measure` | `39rem` (624) | `39rem` below 88rem, **`47.5rem` (760) at 88rem and above** | `app/tokens.css`, rebound in `app/globals.css` |
| the wide lane | 46rem (736) = `--content-width − 2rem` | 54.5rem (872), **derived** | `--content-width` becomes `calc(var(--measure) + 9rem)` |
| `--band` | — | **`81rem`** (1296), new | `app/tokens.css` |
| `--content-inset` | 25.5rem (408) | **deleted** — its only reader is the frame rule slice 023 removes | `app/tokens.css`, `app/globals.css` |
| `--contents-width` / `--contents-gap` / `--lesson-margin` | 22 / 1.5 / 2rem | unchanged | `app/tokens.css` |

**`--content-width` stops being a second number.** 48 − 39 = 9rem today, and
47.5 + 9 = 56.5rem gives a lane of 54.5rem = 872 px — the spec's §1 value, with
the 56 px each side that slice 004 fixed (decision 5) now structural instead of
coincidental. After this change **the only geometry number that moves is
`--measure`**, which is what criterion 8 asks for in one sentence.

Everything measure-derived follows with no edit of its own: `.lane`
(`app/nav.css`), `.siteHeaderInner` and `.bandInner` (`--measure + 2rem` → 792,
spec §5), the lesson header (`lesson-header.module.css`), the figure caption
(`figure.module.css`), `.prose`'s text track and `.pageColumns`' content track.

**Why the rebinding is not in `tokens.css`.** `scripts/check-design-invariants.mjs`
reads that file with a flat brace scan and **fails the build (Check D) if it
nests one level deep** — its own comment says the scan has to grow before the
file does. Growing it is a chore-lane change to a guard this slice must leave
alone (criterion 1). So both values are declared flat in `tokens.css`
(`--measure`, `--measure-wide`) and the `@media (min-width: 88rem)` that swaps
them lives in `app/globals.css`, beside the frame, which is where the *when* of
page geometry belongs. That media query is the **only** place `88rem` is
written.

**The band replaces the anchor.** `main`'s content track becomes
`min(var(--band), 100% - 2rem)` between two flexible gutters — the frame slice
006 built, with a wider cap — and slice 012's `@media (min-width: 80rem)` block
that pinned the leading track to `--content-inset` is **deleted**. That is
criterion 5 by construction: at a 1570 px layout width the track is 1296 with
137 either side; at 1265 it is 1233 with 16 either side.

A lesson page does not notice, for the reason 012's verification recorded: its
only children of the frame are the accent band and `.pageColumns`, both
`data-full-bleed`, so the content track cannot reach it. Criterion 4 is
satisfied by not touching it — and by `--measure` not moving below 88rem.

---

## 2. File map

| path | change |
| --- | --- |
| `app/tokens.css` | `--measure-wide: 47.5rem` and `--band: 81rem` added; `--content-width` becomes `calc(var(--measure) + 9rem)`; `--content-inset` **deleted**; the slice-004 and slice-012 comments above them rewritten to say what the four names now mean. **Single home for every length in this slice.** |
| `app/globals.css` | `main`'s content track becomes `min(var(--band), 100% - 2rem)`; slice 012's 80rem anchoring block **deleted**; one new `@media (min-width: 88rem)` rebinding `--measure` on `:root`. The 012 comment block is replaced by this slice's. |
| `app/nav.css` | new rule `main > .lane { margin-inline: 0 auto }` — in the band a lane starts at the band's left edge (§3, criterion 6); `.heroLede` loses `max-width: 34rem` and gains `justify-self: stretch`; `.moduleGrid` gains `@media (min-width: 80rem) { grid-template-columns: repeat(3, 1fr) }`; the "ONE left edge" comment and `.moduleGrid`'s margin comment corrected. |
| `components/module-grid.tsx` | drops `lane` from `className` — the grid is the one block that takes the whole band (criterion 7). One word. |
| `app/postep/page.tsx` | the two `<section>`s drop `lane`; the `<header>` keeps it (a title is text). Criterion 5's box on this page. |
| `app/postep/page.module.css` | comment only: the 41rem derivation no longer reads "`--measure` (39rem) … the lane's full 624px". The breakpoint value does not move. |
| `app/postep/schedule-table.tsx` | comment only: "a 624px lane — 225px of slack" is false once the table has the band; restate it and record that decision 11 still refuses a topics column. |
| `app/contents.css` | new `.pageColumnsBand` modifier: above the fold the module page's wrapper is `width: min(var(--band), 100% - 2rem); margin-inline: auto`, no page margin, content track `minmax(0, 1fr)`. `.pageColumns` itself — the lesson page's — is **untouched**. |
| `app/moduly/[module]/page.tsx` | one class on the wrapper: `"pageColumns pageColumnsBand"`, and the slice-012 paragraph in its comment replaced. |
| `app/styleguide/page.module.css` | `.lede` and the section headings and explanatory paragraphs capped at `var(--measure)`; each `.prose` specimen capped at `calc(var(--content-width) - 2rem)` so it shows the real article column; `.page` itself keeps the band (criterion 5 names this page). |
| `specs/023-fill-the-width/tasks.md` | **new** — §4 turned into commit-sized tasks. |
| `specs/023-fill-the-width/verification.md` | **new** — house convention since 012: the measured before/after for every criterion. |

**Not touched, and each for a reason:** `app/prose.css` (its tracks read
`--measure` already) · `app/moduly/[module]/[lesson]/page.tsx` and
`lesson-header.module.css` and `components/pager.tsx` (criterion 3 falls out of
the token) · `components/figure.module.css`, `components/code-block.module.css`
(measure-derived or width-independent) · `app/presentation.css` (holds no
geometry — spec §5) · `components/lesson-list.tsx` (keeps `.lane`; see §6.1) ·
`scripts/`, `package.json` (criterion 1, criterion 14) · everything under
`content/` (criterion 14).

**No length that means "the prose column" is left behind.** The repository-wide
search for one is in §5.1; `.heroLede`'s `34rem` is the only hard-coded one, and
this slice deletes it.

---

## 3. The four mechanisms, written out

**3.1 The measure (`tokens.css` + `globals.css`).**

```css
/* tokens.css */
--measure: 39rem;        /* below the wide fold */
--measure-wide: 47.5rem; /* at 88rem and above — spec 023 §1 */
--content-width: calc(var(--measure) + 9rem); /* the lane, 56px each side */
--band: 81rem;

/* globals.css — the only place 88rem is written */
@media (min-width: 88rem) {
  :root { --measure: var(--measure-wide); }
}
```

**3.2 The frame (`globals.css`).** One substitution, one deletion:

```css
main {
  grid-template-columns:
    [full-start] minmax(1rem, 1fr)
    [content-start] min(var(--band), 100% - 2rem) [content-end]
    minmax(1rem, 1fr) [full-end];
}
```

Track count and line names are unchanged, so every `data-full-bleed` child keeps
working — 012's §4.2 risk, still live.

**3.3 Inside the band (`nav.css`).** `.lane` keeps its definition: inside
`.pageColumn` it centres a measure-wide block in the article column, which is
what puts the pager at 464 (criterion 3). A lane that is a child of the *frame*
is on a band page and starts at the band's left edge instead:

```css
main > .lane { margin-inline: 0 auto; }
```

The hero's lede must be the lane's width and not its own text's — `.hero` is
`justify-items: start`, so a paragraph shrink-wraps unless told otherwise:

```css
.heroLede { justify-self: stretch; /* max-width: 34rem deleted */ }
```

The module grid keeps three per row where there is a band to fill, and keeps
today's auto-fit below the fold (decision 9):

```css
@media (min-width: 80rem) {
  .moduleGrid { grid-template-columns: repeat(3, 1fr); }
}
```

**3.4 The module page (`contents.css`).** Only the outer box changes; the panel,
the gap and the page column keep slice 011's arrangement:

```css
@media (min-width: 80rem) {
  .pageColumnsBand {
    width: min(var(--band), 100% - 2rem);
    margin-inline: auto;
    padding-inline-start: 0;              /* no page margin: the band is centred */
    grid-template-columns:
      [panel-start] var(--contents-width)
      [panel-end content-start] minmax(0, 1fr) [content-end];
  }
}
```

---

## 4. Order of work

One task, one commit, `023/TNN:` (AGENTS.md §5). Every commit leaves the tree
green: `npm run build` and `npm run lint` run at the end of each.

**The instrument, fixed once.** The driven browser against `npm run dev`; boxes
read with `getBoundingClientRect()` and written `left / width` in CSS px; `cw =
document.documentElement.clientWidth` recorded beside every number, because a
classic scrollbar makes `cw` 15 px less than the window and the spec's own
figures are taken that way (1585 → 1570 → a 1296 band at 137). **A media query
does not see that scrollbar**, so the 88rem fold arrives at a window of about
1423 px; the same convention is used for baseline and for after, and both
numbers are recorded (§5.4).

**Widths:** 320, 375, 768, 1024, 1279, 1280, 1281, 1407, 1409, 1585, 2560.
**Pages:** `1c`, the longest lesson `1d`, module 0's single lesson, `/`,
`/moduly`, a module page, `/postep`, `/styleguide`.

| # | step | the check |
| --- | --- | --- |
| **T01** | **Baseline. No code.** Every box of criteria 3, 4, 5, 6, 7 and 8 on every page and width above, plus `scrollWidth − clientWidth`, plus the current `npm run build` output including the contrast report and `npm run lint`. Written into `verification.md`. | Nothing closes. Criterion 4 and criterion 7's "what it renders today" have no meaning without this, and it cannot be taken after the first commit. |
| **T02** | §3.1 — the measure and the band token. | At **1585**: prose 464 / 760, wide lane 408 / 872, lesson header and pager 464 / 760, contents 32 / 352, right gap 290 (**criteria 2, 3**); header and band inner boxes 389 / 792 (spec §5). At **1280 and 1407**: every lesson box identical to T01 — 32 / 352, 408 / 736, 464 / 624 (**criterion 4**). No overflow at any width (**11**, first pass). |
| **T03** | §3.2 — the frame becomes the band; 012's block and `--content-inset` deleted. | At 1585, on `/`, `/moduly`, `/postep`, `/styleguide`: the frame's content track is 137 / 1296 and its two margins are equal; at 1280 it is the viewport less the gutters (**criterion 5**). The lesson page is unchanged from T02 (**criterion 4** again — this is the commit that could reach it and must not). |
| **T04** | §3.3 — `main > .lane`, `.heroLede`, the grid's three columns, `components/module-grid.tsx`, `app/postep/page.tsx`. | At 1585: the hero paragraph 137 / 760 (**criterion 6**); the module grid 137 / 1296 with **three** cards per row, each ≥ 380 px — expected 421.3 (**criterion 7**); the progress sections 137 / 1296 and the progress table's lane 760 (**criterion 8**, and §6.2). At 768 and 375 the grid renders the same *number* of cards per row as T01 (**7**, and §6.3). |
| **T05** | §3.4 — the module page joins the band. | At 1585 `.pageColumns` is 137 / 1296, panel 137 / 352, page column 513 / 920; at 1280, 16 / 1233. The panel, the disclosure and the scroll-spy behave as at T01 (**criterion 9** on this page). |
| **T06** | The reference page's caps. | `/styleguide` renders without error at 1585, 1280 and 375; `.page` is 137 / 1296; its prose specimens are 872 wide with their text at 760; the contents, grid and pager specimens show the site's own widths (**criterion 13**). |
| **T07** | **The sweep. No code unless something fails.** | **Criterion 9** on `1d` at 1585: no section highlighted at the top, the passed section highlighted and only it with `aria-current="location"`, the last section at the bottom, a followed entry landing below the top edge, the panel scrolling with the page's scroll position unchanged, the skip control first and hidden until focused, back-to-top absent at the top and present after a viewport of scroll, every entry on `1c` and `1d` on at most two lines. **Criterion 10** at 1024, 768, 375 on a lesson page and the band pages. **Criterion 11**: `scrollWidth − clientWidth === 0` at all eleven widths on five page types. **Criterion 1**: `npm run build` succeeds, the contrast report is byte-identical to T01, `npm run lint` clean. **Criterion 14**: `git diff --stat` names nothing under `content/`, `package.json` and `package-lock.json` unchanged, no `use client` added. |
| **T08** | `verification.md` completed, then the closing review in a fresh subagent context (AGENTS.md §3). | **Criterion 15.** |

**Every criterion has a step.** 1 → T07 · 2 → T02 · 3 → T02 · 4 → T01+T02+T03 ·
5 → T03 (+T05, T06) · 6 → T04 · 7 → T04 · 8 → T04, partly (§6.2) · 9 → T05+T07 ·
10 → T07 · 11 → T02+T07 · 12 → **nobody, by the spec's own terms** · 13 → T06 ·
14 → T07 · 15 → T08.

**Criterion 12 stays unchecked.** The run that builds this cannot judge whether
79 characters of Polish reads better than 65, or whether a centred band beside a
left-anchored lesson reads as one site. The final report names it and says what
to look at: `1c` and `1d` at 1585 for the line, and `/` → a module page → a
lesson at 1585 for the two edges.

---

## 5. Risks

**5.1 Hard-coded lengths that mean "the prose column".** The search
(`max-width`, `min-width`, `width:`, `rem` across `app/`, `components/`) returns
exactly one: **`.heroLede { max-width: 34rem }`** in `app/nav.css`, 544 px,
which would leave criterion 6's hero paragraph at 544 instead of 760. It is
deleted at T04. Everything else is `var(--measure)` or `var(--content-width)`
and follows the token. Two *comments* state numbers this slice falsifies —
`app/postep/page.module.css`'s 41rem derivation and
`app/postep/schedule-table.tsx`'s "624px lane" — and are corrected in the same
commits; a comment that documents a geometry the site no longer has is worse
than none.

**5.2 The 80rem fold, untouched but crowded.** Between the folds the article
column stays 736 and the panel 352, so `32 + 352 + 24 + 736 = 1144` fits 1265
with 121 px to spare — unchanged. At 88rem the wider column needs
`32 + 352 + 24 + 872 = 1280`, which fits a 1393 px layout width with 113 px to
spare. The spec's own warning is that 1280 of a 1280 viewport is a scrollbar;
the second fold is exactly what keeps that from happening, so **the 88rem media
query must not be widened, and `--measure-wide` must not be raised without
recomputing this line.**

**5.3 The band is wider than the old content column below 80rem too.** Anything
that used to overflow a 736 px column into a 272 px gutter now has a 1233 px
column and a 16 px gutter at 1280. Candidates: a long unbreakable run in the
module grid, the progress table's five mono columns at 41rem, the styleguide's
swatch grid. `min-width: 0` is already on `main > *`, `.pageColumn > *` and
`.prose > *`; criterion 11's eleven widths are the check, and 320 px is the one
that matters.

**5.4 The scrollbar makes the folds land later than their names.** A media query
is evaluated against the layout viewport, so with a 15 px classic scrollbar
`min-width: 88rem` fires at a window of ~1423 px and `min-width: 80rem` at
~1295 px. Criterion 4's "at 1280 px" and criterion 11's 1279/1281 and 1407/1409
probes therefore depend on which width is meant. **Measure by `cw`, record the
window width beside it, and use one convention for baseline and after** — 012's
§1.2 made the same call and it is the one the numbers in this slice's spec were
taken with.

**5.5 `--content-width` is now a `calc()` of `--measure`.** If a later slice
sets `--measure` on anything but `:root` — inside a component, say — the lane
silently follows it there too. It is a feature here and a trap later; the token
comment must say so.

**5.6 Check D and `tokens.css`.** Adding any nested rule to that file fails the
build with a message about the flat scan (§1). If someone moves the 88rem query
into `tokens.css` "where the lengths are", `npm run build` stops. The comment in
both files must point at the other.

**5.7 The module grid's three fixed columns.** Above 80rem the grid stops
auto-fitting, so a fourth and fifth module go on a second row rather than
squeezing the first (decision 9) — that is intended. But `repeat(3, 1fr)` with
*one* module renders one card 421 px wide and two empty tracks, where auto-fit
today renders one card 1296 wide. No page has one module; module 0 exists. Worth
a look at T04 rather than a rewrite.

**5.8 What T03 could reach that it should not.** `main`'s content track is read
by every page that is not full-bleed — including `/styleguide`, whose `.page`
becomes 1296 px wide before T06 caps its prose. Between T03 and T06 that page
renders a 1296 px line of English. It is two commits, not a shipped state, and
T06's check is the close.

---

## 6. Where the spec left this plan guessing

**6.1 The module page's contents panel — the one real gap.** Slice 014 gave the
module page the same panel and the same `.pageColumns` wrapper a lesson has;
this spec never mentions slice 014, never lists it under *Depends on*, and says
two things that cannot both be true of that page:

- §3 and criterion 5 put its content in a band of 1296 centred — which the panel
  fits inside, and which this plan implements (§3.4).
- §4 says its **lesson list starts at the band's left edge, 137 px at 1585 and
  16 px at 1280**, making the jump to a lesson "about 327 px". That is only true
  if the panel is *gone* from the module page — with the panel, the list starts
  at 513 and the jump is 49 px.

This plan **keeps the panel**: removing a shipped feature needs a spec that says
so, §5 lists the panel under what does not change, and criterion 9 still checks
its behaviour. The consequence is that **§4's numbers are wrong for the module
page** — the cost the spec dramatises is smaller than it says, and the module
page keeps two left edges of its own. If Viktar meant the panel to go, that is a
different slice and this one should not do it silently.

The same choice keeps `.lane` on `components/lesson-list.tsx`: §3 says non-prose
*may* use the whole band, not that it must, and a 920 px chevron row with three
words in it is a worse row than a 760 px one.

**6.2 Criterion 8's 792 px is unreachable as written.** 792 = the measure plus
the frame's two gutters, which is exactly the lane §5 gives the **site header
and the accent band** — full-bleed elements that have to reproduce the gutters
the grid does not give them. The progress page's sections are *inside* the band,
where there are no gutters to add, so a measure-wide lane there is **760 px**,
and the same block taking the whole band is **1296 px**. There is no rule in
§1–§5 that produces 792 on that page and this plan does not invent one: T04
records 760 for the lane and 1296 for the section, and the criterion's actual
substance — "no page renders a block at 624 px that rendered at the measure" —
is checked in full. Viktar decides afterwards which of the two he meant.

**6.3 "What it renders today" at 768 px (criterion 7).** The band applies at
every width (§3), so at 768 the module grid grows from the old 624 px lane to a
736 px band: the same **three** cards per row, each 240 px instead of 197. This
plan reads criterion 7 as the card *count*, because the alternative — keeping
the old lane below the fold — contradicts §3's first sentence. Recorded rather
than assumed.

**6.4 Which element is "their content" (criterion 5).** The spec names a box,
not an element. This plan measures: `/` and `/moduly` → `ul.moduleGrid`;
`/postep` → `section` (which is why it loses its lane at T04); `/styleguide` →
`div.page`; a module page → `div.pageColumns`. Decided at T01 and written into
`verification.md`, so the after-measurement cannot pick a friendlier element.

**6.5 The 2560 px case is out of scope by decision, and the plan keeps it that
way.** The band centres, the lesson does not, and 1265 px of slack stays on the
right of a lesson page. Criterion 11 checks only that it does not scroll
sideways.
