# plan.md — 012-one-left-edge

- **Slice:** 012
- **Date:** 2026-08-31
- **Provenance:** written from the spec alone, by a subagent whose only inputs
  were `constitution.md`, `AGENTS.md` and `specs/012-one-left-edge/spec.md`
  (AGENTS.md §2, "Two modes", requirement 1). It has never seen this
  repository's files. Every file name below is therefore an inference from the
  conventions in those three documents, and is marked accordingly.
- **Libraries:** none added. This is a CSS-only change plus the two slice
  artifacts. No dependency (AGENTS.md §8), no new component, no `"use client"`
  (Article VIII), no network request.

---

## 1. The shape of the change

### 1.1 The four lengths, and where 408 comes from

The spec never writes the three lengths as numbers, but criterion 4 fixes the
boxes they add up to, so they are recoverable. Writing `m` for the page margin,
`c` for the contents column, `g` for the gap between the columns and `L` for the
offset the frame needs:

| | derived from | value |
| --- | --- | --- |
| `m` page margin | criterion 4: the contents column's box is **32** / 352, so it starts one page margin in | **32 px** |
| `c` contents column | criterion 4: the contents column's box is 32 / **352** | **352 px** |
| `g` column gap | `L − (m + c)` = 408 − (32 + 352) = 408 − 384 | **24 px** |
| `L` frame offset | `m + c + g` = 32 + 352 + 24 | **408 px** |

`L = 408` is exactly the x of the lesson's article column (criterion 4) and the
x the spec demands for every other page's content column (criterion 2). That is
the whole change: **the frame's leading track becomes `L`.**

### 1.2 The content width is already 736 — corroboration

The spec says the content column keeps "the content width the frame has always
given it", and criterion 2 says that width is 736. The "Why" section's own
numbers confirm the frame's existing content width really is 736 today, so
nothing about the content track needs to change:

- content width `w` = 736, measure = 624 ⇒ the measure's inset inside the
  content column is `(736 − 624) / 2` = **56 px** either side.
- Centred today at 1280: `(1280 − 736) / 2` = 272; measure starts at
  `272 + 56` = **328** — the top of the spec's "320–328 px".
- Centred today at 1585: `(1585 − 736) / 2` = 424.5; measure starts at
  `424.5 + 56` = **480** — the top of the spec's "473–480 px".
- The bottom of each range is the same sum with a ~15 px classic scrollbar:
  `(1265 − 736) / 2 + 56` = 320, `(1570 − 736) / 2 + 56` = 473.

Two consequences the implementer must carry:

1. **736 and 624 and the 56 px inset are not touched.** Only the leading track
   moves.
2. **The spec's own two jump figures use opposite scrollbar conventions** —
   "144 px at 1280" is `464 − 320` (with scrollbar), "16 px at 1585" is
   `480 − 464` (without). Fix **one** convention for the whole slice, record
   `document.documentElement.clientWidth` beside every measurement, and use the
   same convention for baseline and after. Otherwise criteria 3, 5 and 6 compare
   numbers that were never comparable.

### 1.3 After the change

At every width above the fold, `L` is a fixed length, so the content column's
left edge is 408 at 1280, at 1585 and at 2560. The measure lands at
`408 + 56` = **464**, width 624 — criterion 2 satisfied by construction, and
identical to the lesson page's prose, which is criterion 3.

The empty strip on the left is `L` = 408 px wide (of which 352 is the width of
the contents column a lesson fills). The right-hand gutter is what is left:
`1280 − 408 − 736` = **136 px** at 1280 px, 441 at 1585, 1416 at 2560. It is no
longer symmetric with the left, and it is 136 px at the narrowest width above
the fold — that shrinkage is the source of two risks in §4.

Fit check at the narrowest width above the fold: `408 + 736 + 32` (right page
margin) = **1176 ≤ 1280**, 104 px of slack, and still 89 px of slack with a
15 px classic scrollbar. Nothing has to shrink.

### 1.4 The track list

Whatever today's frame grid is, the change is **one substitution inside the
fold's media query**. The track count and the line names must not change —
full-bleed children are positioned by those names (§4.2).

Above the fold:

```
grid-template-columns:
  [full-start]    var(--frame-lead)                   /* L  = m + c + g = 408px, FIXED */
  [content-start] minmax(0, var(--content-width))     /* w  = 736px, unchanged        */
  [content-end]   minmax(var(--page-margin), 1fr)     /* absorbs the rest             */
  [full-end];
```

- The leading track is a plain fixed length, not `minmax()` and not a fraction
  — spec decision 3.
- `--frame-lead` is **derived**, never written as `408px`:
  `calc(var(--page-margin) + var(--contents-col) + var(--contents-gap))`
  (spec decision 4, criterion 9).
- The trailing track keeps whatever flexible sizing it has today. Do not
  redesign it; only the leading track's sizing function changes.
- The middle track keeps whatever sizing function it has today; the
  `minmax(0, …)` above is a description of the intent, not an instruction to
  rewrite a working `min(100% - 2*…, …)`.

Below the fold: **unchanged, byte for byte.** The base rule stays symmetric —
both outer tracks flexible, content centred — exactly as today. The new track
list exists only inside the existing fold media query (§4.4).

If the frame's grid has more than three tracks (for example a nested wide-lane /
measure pair, which criterion 4's "wide lane 408 / 736, measure 464 / 624"
allows for), the rule is the same: **only the outermost leading track changes**,
and every inner track keeps its sizing function.

### 1.5 The fold

The spec pins the fold only by reference ("the same fold slice 011 and 007
use"). Criterion 7 probes 1279 and 1281, and criterion 6 probes 1024 as "below",
which puts the fold at **1280 px** — but the implementer must read the real
value out of the existing stylesheet and not trust that inference. Media
queries cannot read custom properties, so the literal will appear in this
slice's rule as a third copy; copy slice 011's condition verbatim, character for
character, and follow whatever comment convention already marks it. Criterion 9
governs the three *lengths*, not the fold, so this repetition does not violate
it — but it is noted in §5.

---

## 2. File map

The constitution and AGENTS.md give the conventions — App Router with `app/` at
the repo root, TypeScript, MDX under `content/`, Server Components by default,
and "the file that already holds the measure and the content width" (spec §3).
They do not give file names. **Every row marked `?` is a guess; the note says
what to confirm before editing.** A guess labelled a guess is fine; acting on
one without confirming it is not.

| File | Change | Confirm |
| --- | --- | --- |
| `specs/012-one-left-edge/tasks.md` | **new** — the ordered task list of §3 | not a guess (Article IX) |
| `specs/012-one-left-edge/baseline.md` `?` | **new** — the before-numbers of T01, so criteria 4/5/6 have something to compare against | Proposed, implementer's call. Article IX names spec/plan/tasks as the slice files but does not forbid a fourth. If it is unwanted, put the table in T01's commit body and the final report instead — but it must live somewhere durable, not only in a session transcript. |
| the token file holding the measure and the content width `?` | gains `m`, `c`, `g` and the derived `--frame-lead` | Guess: `app/globals.css`'s `:root` block, or a dedicated `app/tokens.css` / `styles/tokens.css`. Find it by searching for the custom properties whose values are the measure (624) and the content width (736). The spec ("the file that already holds the measure and the content width") guarantees this file exists — only its name is unknown. |
| the page frame's stylesheet `?` | inside the fold's media query, the leading track becomes `var(--frame-lead)` | Guess: the same global stylesheet, or a CSS module beside the frame component. Find it by searching for the grid that declares the `full-start` / `content-start` line names (or whatever slice 006 named them). |
| the frame's component `?` | **expected untouched** | Guess: `app/layout.tsx`, or a `components/…` wrapper it renders. Touch it only if the frame's grid cannot be re-sized without a second class — and if so, see risk §4.5, because that is also where the chrome may live. It stays a Server Component either way. |
| the lesson contents panel's stylesheet (slice 011) `?` | its three length declarations are **deleted** and it reads them from the token file | Guess: a CSS module beside the lesson-contents component. If 011 wrote them as custom properties, keep the names and move the declarations; if it wrote them as literals, name them to the token file's convention. **Delete, do not shadow** — criterion 9 forbids the second copy. |
| the lesson page's own grid stylesheet `?` | **expected untouched — read only** | Read it to confirm the lesson's two columns are laid out by the page's own grid on a full-bleed container and not by the frame's content track. If they are *not*, this plan's shape is wrong; stop and see §5, gap 5. |
| whatever implements full-bleed / edge-to-edge elements `?` | possibly converted from a viewport-centring hack to the frame's line names (T03) | Search for `100vw`, `50vw`, `calc(50% - 50vw)`. If full bleed is done with grid line names, T03 is empty. See §4.2 — this is the single most likely thing to break. |
| the reference page `?` | **expected untouched — rendered and measured** | Criterion 8. But see §5, gap 4: if the page prints the frame's geometry as prose, one of those numbers is now false. |
| anything under `content/` | **none** | Criterion 10 — the diff must not touch it. |

No `.tsx` change is expected at all. If one turns out to be necessary, it is a
signal to re-read §4.5 before writing it.

---

## 3. Order of work

One task, one commit, `012/TNN:` prefix (AGENTS.md §5). Every commit leaves the
tree green — which is why the two no-op refactors come before the geometry
change, not with it.

### T01 — Baseline. **Before any code change.**

Criteria 4, 5 and 6 compare *before* with *after*, so the "before" must be
captured while the tree is still untouched. **This task changes no code.**

Measure in a real browser against `npm run dev`, at layout-viewport widths
320, 375, 768, 1024, 1279, 1280, 1281, 1585, 2560, on a lesson page, a module
page, the module grid, the home page and the reference page:

- every box named in criterion 4 (contents column, lesson column, header, wide
  lane, measure, pager, and the contents panel's top edge against the header's);
- the chrome boxes of criterion 5 (site header inner box, accent band inner box);
- the content column and the block inside it on the three non-lesson pages
  (criterion 2's "before"), and the module-page-vs-lesson left edges
  (criterion 3's "before" — the jump this slice removes);
- for each page and width, `document.documentElement.clientWidth` and whether
  `scrollWidth > clientWidth` (criterion 7's "before").

Use `getBoundingClientRect()` from devtools. **Do not add a headless browser or
any other dependency to take a measurement** (AGENTS.md §8).

Also capture the current `npm run build` output including the contrast report,
and `npm run lint`, so criterion 1's "unchanged" has a referent.

**Closes:** nothing. **Enables:** 2, 3, 4, 5, 6, 7.

### T02 — Move the three lengths to the token file.

`m`, `c`, `g` are declared once, in the file that holds the measure and the
content width. The contents panel's stylesheet loses its copies and reads them
from there. `--frame-lead` is added as a `calc()` of the three — declared, not
yet used.

**Check:** `npm run build` and `npm run lint` clean; re-measure the lesson page
at 1280 and 1585 — every box identical to T01. A pure no-op refactor, committed
separately so that if a box moves later, the commit that moved it is obvious.
**Closes:** criterion 9 (and half of 4).

### T03 — Make full bleed frame-relative. *(May be empty.)*

Audit every element that spans the frame edge-to-edge. If they use the frame's
grid line names, this task is empty — say so in the report and skip it. If any
uses `width: 100vw` with a `calc(50% − 50vw)` margin, convert it to the line
names **now**, while the content column is still centred and the conversion is
provably a no-op.

**Check:** re-measure every full-bleed element at 1280 and 1585 on all four page
types — left edge 0, width equal to `clientWidth`, `scrollWidth == clientWidth`.
Identical to T01. **Protects:** criteria 6 and 7 (see §4.2).

### T04 — The frame's leading track above the fold.

The substitution of §1.4, inside the existing fold media query. This is the
commit the slice exists for.

**Check:** at 1280 and 1585, on the module page, the module grid and the home
page: content column **408 / 736**, block inside it **464 / 624** (criterion 2);
module-page lesson-list left edge == the linked lesson's prose left edge
(criterion 3); every criterion-4 box unchanged from T01; every criterion-5
chrome box unchanged from T01; the reference page renders and its content column
is at 408 (criterion 8). **Closes:** 2, 3, 4, 5, 8.

### T05 — The sweep.

No code unless something below fails. Re-measure below the fold at 1024, 768 and
375 on all five page types against T01 (criterion 6), and check
`scrollWidth == clientWidth` at 320, 1279, 1281, 1585 and 2560 on a lesson page,
a module page, the module grid and the home page (criterion 7). Run
`npm run build` — succeeds, contrast report byte-identical to T01 — and
`npm run lint` (criterion 1). Confirm `git diff --stat` names no file under
`content/`, no dependency change, no network request (criterion 10).

**Closes:** 1, 6, 7, 10. If a check fails, fix it in its own commit rather than
folding the fix into T05.

### T06 — Fresh-context review.

Review the whole diff against `spec.md` in a fresh subagent context (AGENTS.md
§3, Article IX). **Closes:** criterion 12.

### Not closed by this run

**Criterion 11 stays unchecked** — whether a page with an empty 408 px strip
where a lesson has its contents panel reads as deliberate rather than broken is
a judgement about the look of the site, and AGENTS.md §3 forbids closing it. The
final report must name it and say what to look at: the module page, the module
grid and the home page at 1280 px and at 2560 px, where the strip is widest
relative to the content.

---

## 4. Risks

### 4.1 Criterion 4 — the page that deliberately bypasses the frame

The spec's own "riskiest criterion". The lesson page has its own grid; this
slice changes the frame that grid bypasses.

There is a structural safety net worth knowing about: after T04 the frame's
content track sits at **exactly 408 / 736** — the same box as the lesson's
article column. So even a lesson-page element that *is* in the frame's content
track lands where it already was. The one thing that still breaks is an element
that depends on the content track being *centred* — which is §4.2.

Mitigation: the T01 baseline covers every criterion-4 box, and T04's check
re-measures all of them. Do not reason about it; measure it. And if the audit in
T02/T03 shows the lesson's two columns are produced by the frame's grid rather
than by the page's own, stop — this plan's shape is wrong (§5, gap 5).

### 4.2 Full-bleed elements once the leading track is fixed

**The likeliest way this slice breaks the site.** Two implementations:

- **Grid line names** (`grid-column: full-start / full-end`): unaffected. The
  leading track's sizing function changes; the `full-start` line is still at 0
  and `full-end` still at the viewport's right edge. This is why §1.4 forbids
  changing the track count or the line names.
- **The viewport-centring hack** (`width: 100vw; margin-inline: calc(50% - 50vw)`):
  **breaks.** It assumes its parent is horizontally centred. At 1280 px after
  the change, the parent's half-width is 368 and `50vw` is 640, so the element
  starts at `408 + 368 − 640` = **136 px** and runs to `136 + 1280` = 1416 —
  136 px of overflow off the right edge, a horizontal scrollbar, and a
  criterion-7 failure. `100vw` also includes the classic scrollbar, adding
  another ~15 px.

Hence T03 before T04, and hence T03's check is that the conversion changes
nothing while the column is still centred.

### 4.3 A horizontal scrollbar at the narrowest width above the fold

Four candidate sources, in order of likelihood:

1. The `50vw` hack of §4.2.
2. **The trailing gutter halves.** At 1280 the space right of the content column
   goes from `(1280 − 736) / 2` = 272 px to **136 px**. Anything that used to
   overflow the 736 px column harmlessly into a 272 px gutter now has half as
   much room before it reaches the viewport edge — a wide table, a long code
   line, a fixed-width card, an unbreakable URL. Nothing in the content column
   is *wider* than before, but its escape room is.
3. Any surviving `100vw` anywhere: on a desktop browser with a classic
   scrollbar, `100vw` exceeds the layout width and overflows on its own.
4. Not a bug but a measurement trap: at an OS window of exactly 1280 px with a
   15 px classic scrollbar, the media query sees 1265 and **does not fire**, so
   the page is still in its below-the-fold layout. Criterion 2 says "at 1280 px";
   measure at a layout viewport of 1280 (`document.documentElement.clientWidth`),
   and record it beside each number so the reviewer can tell which was measured.

### 4.4 Leaking below the fold

The new track list goes **inside** the existing fold media query and nowhere
else. The token additions of T02 are inert below the fold because nothing reads
`--frame-lead` there — but only if T02 genuinely *moved* the three lengths
rather than adding a second declaration. A `:root` token with the same name as
one still declared in the contents module is a shadowing bug that can change the
contents panel below the fold, and it also violates criterion 9. Delete, do not
shadow. T05's 1024 / 768 / 375 sweep against the T01 baseline is the check.

### 4.5 The chrome may share the frame's grid

Criterion 5 requires the site header's and the accent band's inner boxes to be
unchanged on all four page types, and spec decision 2 (Viktar's answer) keeps
them centred. If the chrome is rendered outside the page frame with its own
centred lane, nothing to do. **If the chrome uses the same grid class as the
page frame, T04 moves it and fails criterion 5.** The fix is to scope the new
track list to the page-content frame only, which may mean splitting one shared
class into a chrome lane and a page frame — a structural change that must be
proven a no-op for the chrome by measurement, and which belongs in its own
commit between T03 and T04. Check for this while doing T03's audit, not after
T04's measurements come back wrong. Moving the chrome is explicitly out of
scope.

### 4.6 Which box is "the content column" on each page

Criterion 2 asks for 408 / 736 and 464 / 624 on three page types, but the home
page's hero may be a wide-lane element with no 624 block inside it, and the
module grid's cards may fill the full 736. Decide, at T01, which DOM element is
"the content column" and which is "the block inside it" on each page, write it
into the baseline, and measure the same elements after. Do not let the
after-measurement pick a more convenient element.

---

## 5. Gaps in the spec

Blunt, as asked. The spec is unusually complete — the geometry is fully
recoverable from it, which is why §1 could be written without seeing a line of
the repo. These are what remain.

1. **The fold's value is never stated.** The spec says "the same fold slice 011
   and 007 use" and leaves the number to those slices. Criterion 7's probes at
   1279 and 1281 and criterion 6's at 1024 make 1280 px overwhelmingly likely,
   but this plan is inferring it. The implementer must read the real value out
   of the existing stylesheet. Related: the fold literal cannot be a custom
   property, because CSS media queries cannot read one — so it will be written a
   third time in this slice's rule. Criterion 9 covers the three lengths, not the
   fold, so this is compliant; but if "declared once" was meant to cover the fold
   too, that is a different change and this plan does not make it.

2. **The three lengths are given only as boxes, not as values.** 32 and 352 come
   out of criterion 4's contents-column box, and the gap of 24 is a subtraction
   this plan performed. If that box is measured with padding or a border
   included, or if the page margin at the fold is not 32, every number in §1.1 is
   wrong. **Take the three values from the contents stylesheet, not from this
   plan**, and check that they sum to 408 before writing anything. If they do not
   sum to 408, stop and report it rather than making them.

3. **The spec's two jump measurements use opposite scrollbar conventions**
   (§1.2). "144 px at 1280" is the with-scrollbar number and "16 px at 1585" is
   the without-scrollbar number, and criterion 3 does not say which convention to
   use. This plan fixes one convention at T01 and applies it throughout. If
   Viktar meant the other, the recorded before/after numbers still hold — only
   their labels shift.

4. **The reference page may print numbers that this slice makes false.**
   Criterion 8 says the reference page "renders and its content moves with the
   frame", and the spec forbids content changes. But the reference page's job is
   to show the site's geometry; if it states the frame's offset or the content
   column's position as prose or as an annotation, one of those statements is
   now wrong. The spec does not say whether updating that text is in scope. This
   plan assumes **yes** — a geometry reference that documents a geometry the
   site no longer has is worse than a blank, and the file is not under
   `content/` so criterion 10 does not bar it — but it is a silence, not a
   ruling, and the final report must name whatever was changed there.

5. **The spec asserts the lesson page's grid "deliberately bypasses" the frame
   without saying how.** The whole shape of this plan — one substitution in one
   media query, and criterion 4 satisfied by not touching anything — depends on
   that being true. If the lesson's two columns turn out to be produced *by* the
   frame's grid, then the frame cannot be changed for every page at once, the
   change has to be scoped away from lesson routes, and the task list of §3 needs
   rewriting. That is a fork the plan cannot resolve from the spec. Check it in
   T02's reading, and if it goes the other way, report it before writing T04.

6. **Minor, non-blocking:** the spec names "the contrast report" (criterion 1)
   without saying what emits it; the implementer must find it in the build
   output at T01 in order to have anything to call unchanged. And the names of
   the new tokens are not specified — this plan reuses slice 011's names if they
   are already custom properties, and otherwise follows the token file's
   existing convention. Neither is a decision worth escalating.
