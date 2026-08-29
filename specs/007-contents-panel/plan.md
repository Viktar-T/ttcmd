# plan.md — 007-contents-panel

- **Slice:** 007
- **Plans:** `specs/007-contents-panel/spec.md`
- **Status:** written in an autonomous run — unapproved by construction;
  Viktar reviews this file, the spec's `## Decisions taken`, and the final
  report afterwards
- **Date:** 2026-08-29

This file answers HOW. The why is in the spec and is not repeated here.

## Gaps in the spec

One, and it is a corner rather than a hole:

1. **§3's bottom-of-document rule can contradict "following a section link
   highlights the section it leads to."** Jumping to a section near the end of
   a lesson can land the viewport at the very bottom (the target plus
   everything after it is shorter than a screen); the bottom rule then says
   *last section active* while the link-following rule says *the target*. The
   plan resolves it conservatively: following a link pins the target section
   as active, and the pin releases on the reader's next real scroll, at which
   point §3's geometric rules — including the bottom rule — govern again.
   Criterion 8's bottom state is demonstrated by scrolling, criterion 9 by
   clicking, and each is satisfied verbatim under this resolution.

Everything else the plan needed, the spec either states or explicitly
delegates ("Notes for the reviewer" names the delegated values). Delegations
are decided in **Values the spec left to the plan** below; they are decisions,
not gaps.

## Facts this plan stands on

Each verified against the working tree, not assumed.

| Fact | Where verified |
| --- | --- |
| Next 16.3.3 (App Router, `app/` at root), React 19.2.8, TypeScript strict, next-mdx-remote 6.0.0, remark-gfm, shiki + @shikijs/rehype, zod | `package.json`, `tsconfig.json`, `app/` |
| `npm run build` = `node scripts/check-design-invariants.mjs && next build` | `package.json` scripts |
| Colour-literal guard: Check B in `scripts/check-design-invariants.mjs`, scanning `.css`/`.ts`/`.tsx` under `app/`, `lib/`, `components/`; `app/tokens.css` is the sole exemption | `scripts/check-design-invariants.mjs` lines 115–172 |
| Contrast floors: Check E recomputes `--rule-strong` on `--bg` (among others) for both themes on every build and prints the ratios in the build output | `scripts/check-design-invariants.mjs` lines 340–348, 447–469 |
| The structural rule value: `--rule-strong: #83807a`, defined once for both themes — 3.69:1 dark, 3.64:1 light | `app/tokens.css` lines 45–61 |
| The identity string: `lessonId()` in `lib/numbering.ts`, surfaced as `CourseLesson.id` by `getCourse()` | `lib/numbering.ts`, `lib/content.ts` |
| The single left edge: the lane — `max-width: calc(var(--measure) + 2rem)` centred (`.siteHeaderInner`, `.bandInner`, `.lane` in `app/nav.css`); the lesson header holds itself to `--measure` the same way | `app/nav.css` lines 47–68 and 98–111, `app/moduly/[module]/[lesson]/lesson-header.module.css` |
| The page frame: `main` is a three-track grid with named lines `full`/`content`; children default to `grid-column: content; min-width: 0`; `[data-full-bleed]` spans `full`; `row-gap: var(--gap-apart)` | `app/globals.css` lines 86–123 |
| The prose column: `.prose` is its own grid, `--measure` (39rem) text track inside the content box; `.prose > svg, .prose > table` take the wide `full` track | `app/prose.css` lines 28–54, `app/tokens.css` (`--measure: 39rem`, `--content-width: 48rem`) |
| The MDX pipeline: every lesson, module index and styleguide specimen compiles through one `compile()` in `lib/content.ts`, whose error path prefixes the failing file's path; `rehypePlugins` is the extension point the highlighter already uses | `lib/content.ts` lines 34–71 |
| `hast` types are importable without adding a dependency | `lib/code-highlight.ts` line 4 (`import type { Element } from "hast"`) already builds |
| `nav` elements are already monospace site-wide | `app/globals.css` lines 59–62 |
| The focus indicator: `:where(a, button):focus-visible` outline in `--accent-line`, with the band override | `app/nav.css` lines 27–34 |
| The breadcrumb landmark is `<nav aria-label="Ścieżka nawigacji">`; its current step is a non-link `<span aria-current="page">` | `components/breadcrumb.tsx` |
| Lesson page composition: Band→Breadcrumb, LessonHeader, `<div className="prose">{body}</div>`, Pager — all direct grid children of `main` | `app/moduly/[module]/[lesson]/page.tsx` |
| Content facts: longest lesson `content/moduly/01-jak-powstaje-oprogramowanie/czterdziesci-lat-zmian.mdx` (9 `##` sections); fourteen-section lesson `co-model-naprawde-potrafi.mdx` (14); module 0's single lesson `00-start/git-i-github.mdx`, `order: 3`, 9 sections; no module `index.mdx` has any `##`; no `##` heading contains inline code today | `grep -c '^## '` over `content/moduly/*/*.mdx`; frontmatter of `git-i-github.mdx` |
| Client components are prerendered to HTML on the server; hydration only attaches handlers — so a `"use client"` island degrades to its server-rendered HTML when scripting is absent | `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` ("Client Components and the RSC Payload are used to prerender HTML") |
| `<Link>` renders an `<a>`; same-page fragments need no router involvement | `node_modules/next/dist/docs/01-app/03-api-reference/02-components/link.md` |
| No `position: sticky`, no `position: fixed`, no `scroll-behavior`, no `scroll-margin`/`scroll-padding` exists anywhere in `app/`, `lib/`, `components/` — this slice introduces the first of each | grep over the tree |
| The reference page is `app/styleguide/page.tsx`; slice verification records live at `specs/NNN-slug/verification.md` (004 and 006 both have one) | `ls specs/004-lesson-typography specs/006-navigation` |

## The shape of the change

### 1. One derivation pass, two consumers

Section identifiers are minted by a hand-written rehype plugin,
`lib/section-anchors.ts`, added to the `rehypePlugins` the pipeline already
has. For every `h2` in the compiled body it: extracts the plain text
(concatenating text descendants, so future inline markup cannot leak into the
id), lowercases it, applies the spec's fixed transliteration map
(ą→a ć→c ę→e ł→l ń→n ó→o ś→s ź→z ż→z), collapses every remaining character
outside `[a-z0-9]` to a hyphen, collapses hyphen runs and trims the ends. An
empty result **throws, quoting the heading**; `compile()` in `lib/content.ts`
already prefixes the throwing file's path, so the build failure names the
lesson and the heading with no new machinery (criterion 3). A final
belt-and-braces regex (`/^[a-z0-9]+(-[a-z0-9]+)*$/`) also throws, so a future
edit to the function cannot silently widen the character set. Repeats within
one page take `-2`, `-3`, … from a used-set the plugin keeps per compile.

The same pass **collects** `{ id, title }` into an array handed in through the
plugin's options. `compile()` creates the array per call and returns it beside
`frontmatter` and `content`; `LessonSummary` gains `sections`, which
`listLessons` and `getLesson` fill for free (both already compile every
lesson), and `CourseLesson` inherits it. The id written into the article's DOM
and the id the panel links to are therefore **the same string produced once**
— the alternative, a second regex scan of the raw MDX for the panel, is two
derivations that agree only until a heading contains markup.

The plugin runs in the one shared pipeline, module indexes and styleguide
specimens included — the pipeline's own comment warns against a second
configuration, and no module index has an `##` today, so nothing else's
rendered output changes.

### 2. The panel hangs in the frame's own gutter; the article is reproduced, not adjusted

The lesson page wraps the article in one new element:

```
<div class="lessonLayout" data-full-bleed>
  <nav class="contentsPanel" aria-label="Spis treści">…</nav>
  <div class="prose" id="tresc" tabIndex={-1}>{body}</div>
</div>
```

`data-full-bleed` puts the wrapper in the frame's `full` track (the mechanism
the Band already uses), and the wrapper's own grid **replicates the frame's
three tracks verbatim** — the same `minmax(1rem, 1fr)` gutters, the same
`min(var(--content-width) - 2rem, 100% - 2rem)` content track, resolved
against the same width, since the `full` track spans the whole of `main`. The
`.prose` div sits in the replicated content track with `min-width: 0` (the
roles `main > *` used to give it). The article's left edge and width are
identical **by construction** — the tracks are the same expressions over the
same container — and criterion 7 is then re-measured, not trusted.

The panel is a grid item in the **left gutter track** (`grid-column: 1`,
`grid-row: 1`, `justify-self: end`), so it occupies space the frame already
owns and cannot move the content track: the gutter's minimum is the fixed
`1rem`, so an item inside it never inflates it. At the 80rem fold the gutter
is (80rem − 46rem)/2 = 17rem; a 13rem panel with a 1.5rem end margin fits
with 2.5rem to spare at the viewport edge, and its right edge stops 1.5rem
short of the content track — which is the wide lane the diagrams and tables
use, so nothing the article can render ever reaches the panel.

The panel stays on screen with `position: sticky; top: 2rem;
align-self: start` (start, because a stretched grid item has nowhere to stick)
inside a row whose height is the article's. `max-height: calc(100vh - 4rem)`
and `overflow-y: auto` give it its own scrollbar when its content is taller
(criterion 10). The rule between panel and article is the panel's own
`border-inline-end: 1px solid var(--rule-strong)` — it travels with the sticky
panel, which reads better than a page-height line beside a viewport-height
panel, and it takes the existing token, so Check E's build output is its
contrast evidence (criterion 16).

### 3. One list, rendered once, shown twice

`components/contents.tsx` holds a private `ContentsList` server component —
every lesson of the module in `order`, each row `id + title` from
`CourseLesson`; the current lesson's row a non-link `<span
aria-current="page">` (the breadcrumb's own convention), expanded with its
section entries beneath it; every other row a `<Link>`; every section entry a
plain `<a href="#…">` (same-page fragments need no router). The hyphen prefix
is a literal `<span aria-hidden="true">- </span>` — visually the reference's
signature, invisible to assistive technology.

Two thin exported wrappers render it: `ContentsPanel` (the `<nav>` above, with
the skip control as its first focusable) and `ContentsDisclosure`
(`<nav aria-label="Spis treści">` around a native
`<details><summary>Spis treści</summary>…</details>`, placed between
`LessonHeader` and the article, held to the measure with the existing `.lane`
class so the site's one left edge survives at 1024px). Both are in the
document at every width; `app/contents.css` shows exactly one:
`.contentsPanel` is `display: none` below `80rem`, `.contentsDisclosure` is
`display: none` at `min-width: 80rem` and above. `display: none` removes the
hidden one from layout, focus order and the accessibility tree, so the two
same-named landmarks never both announce, and the media boundary is one
number in one file. Both wrappers return `null` when
`(lessons − 1) + sections === 0` — the spec's dead-panel rule.

The native `details` is what makes criterion 13's classroom case free:
opening and closing is the browser's, not ours.

### 4. Scripting only moves state

Exactly two files carry `"use client"`, and neither renders the panel:

- **`components/scroll-spy.tsx`** renders `null`. On mount it wires
  rAF-throttled `scroll` and `resize` listeners plus `hashchange`, computes
  the active section id, and applies it by setting/removing
  `aria-current="location"` on the matching section links in **both** lists
  (found by a `data-section` attribute). Styling keys off
  `[aria-current="location"]`, so the visual state and the assistive one are
  the same attribute and cannot diverge. It also self-scrolls the panel: when
  the active entry leaves the panel's visible region, it adjusts the panel
  scroller's `scrollTop` by the minimum needed — hand-written, never
  `scrollIntoView`, which is allowed to scroll every ancestor including the
  page, and the page must never move because of the panel.
- **`components/back-to-top.tsx`** renders `null` until `scrollY` first
  exceeds the threshold, then the fixed button; activating it does
  `window.scrollTo(0, 0)` (instant — no smooth behaviour anywhere) and moves
  focus to the article top by focusing `main` (`tabIndex = -1` set by the
  handler, `preventScroll` so the scroll stays the explicit one).

With JavaScript absent the client islands' server-rendered HTML is `null`
markup: no highlight, no back-to-top, no errors, no empty furniture — the
degradation is by construction, not by feature detection. The panel, the
disclosure, the skip control and every link are ordinary server-rendered
elements and keep working.

### 5. The scroll-spy, implemented as specified at the edges

A scroll handler, not IntersectionObserver: the spec defines the active
section by a reading line and two edge rules, and a handler computes those
definitions directly — active = the **last** `h2[id]` whose
`getBoundingClientRect().top` ≤ the reading line (6rem); none passed → no
active entry (the introduction); viewport at the document's bottom (within
2px) → the last section, unconditionally. An observer approximates the same
thing with `rootMargin` and still needs a scroll listener for the bottom rule;
fourteen rect reads per animation frame is negligible and immune to layout
shifts that would stale a cached-offsets scheme.

Following a section link is handled by `hashchange`: the target becomes
active immediately (criterion 9 and the §3 sentence), the post-jump `scrollY`
is recorded, and the pin releases as soon as `scrollY` moves — the Gaps
resolution above. Initial load with a fragment computes once on mount, so a
teacher's `#cwiczenia` link highlights correctly. Anchor landing clearance is
CSS, not script: `scroll-margin-top: 2rem` on the article's `h2[id]` — below
the 6rem reading line by 4rem, so a just-followed heading has always "passed"
the line and the geometric rule agrees with the pin. The address bar changes
only on clicks (the browser's own anchor behaviour); nothing writes to it
while scrolling.

### 6. How the criteria become demonstrable

- **Markup criteria (2, 4, 5, 6, 15, 17):** `npm run build && npm run start`,
  then `curl` the pages and read the HTML — ids on `h2`, rows and links,
  landmarks, the skip control, module 0's single row.
- **Geometry (7):** the *first* commit of the slice records the baseline —
  the prose column's `getBoundingClientRect()` left/width at 1280px on the
  longest lesson, plus the 004 measure/adjacency-gap numbers and 006's
  furniture, into `specs/007-contents-panel/verification.md`; after the panel
  lands, the same reads must be equal, and are compared against
  `specs/004-lesson-typography/verification.md` and
  `specs/006-navigation/verification.md`.
- **Behaviour (8–14):** driven browser at 1280px, 1024px, 768px, 375px and a
  ~600px-tall window; each state read from the DOM (`aria-current`,
  `scrollY`, panel `scrollTop`, `document.activeElement`) and transcribed
  into `verification.md`, with screenshots where a state is visual.
- **Guards (1, 16, 19, 20):** the build's own Check B and Check E output; the
  browser's network log; `git diff --stat content/`.
- **No-JS (13):** the same browser with scripting disabled.

## File map

Added:

| File | What and why |
| --- | --- |
| `lib/section-anchors.ts` | `slugifyHeading()` (transliteration, collapse, validation), the per-compile deduper, the rehype plugin that assigns ids to `h2`s and collects `{id, title}`, the `SectionEntry` type, and the exported reserved skip-target id constant |
| `components/contents.tsx` | `ContentsPanel` and `ContentsDisclosure` (both server components) around the shared `ContentsList`; the skip control; the omission rule |
| `components/scroll-spy.tsx` | `"use client"`, renders null: active-section computation, `aria-current` application to both lists, panel self-scroll, hashchange pin |
| `components/back-to-top.tsx` | `"use client"`: threshold visibility, instant scroll-to-top, focus return to `main` |
| `app/contents.css` | Everything this slice paints: `.lessonLayout` (the replicated frame tracks), the panel (sticky, own scrollbar, the `--rule-strong` border), row states (rest/hover/focus/active/current, with `data-specimen-state` twins for the reference page), the skip control's focus-reveal, the disclosure, `scroll-margin-top` on `.prose h2[id]`, `.backToTop`, and the one `80rem` media boundary. Global with plain class names, for the reason `nav.css` records |
| `specs/007-contents-panel/verification.md` | The baseline geometry, then the evidence per criterion, accumulated as the steps close |

Edited:

| File | What and why |
| --- | --- |
| `lib/content.ts` | `compile()` builds its options per call to hand the plugin a collector and returns `sections`; `LessonSummary` gains `sections`; `listLessons`/`getLesson` pass it through |
| `app/layout.tsx` | one line: `import "./contents.css"` |
| `app/moduly/[module]/[lesson]/page.tsx` | renders `ContentsDisclosure` after `LessonHeader`, wraps the article in `.lessonLayout` with `ContentsPanel`, adds `ScrollSpy` and `BackToTop` |
| `app/styleguide/page.tsx` | the §9 specimens: row states via `data-specimen-state`, a static inverted active entry, the current-lesson row, the disclosure, the back-to-top control neutralised to `position: static` via a `data-specimen` variant; `SPECIMEN_LESSONS` literals gain `sections` (the type now requires it) |

Nothing under `content/` is touched. `tasks.md` follows this plan in a later
session.

## Libraries

**None added** — the spec forbids it, and nothing here needs one:

- What `rehype-slug` + `github-slugger` would do is `lib/section-anchors.ts`,
  ~60 lines, and the off-the-shelf pair is *wrong* for this spec anyway: it
  preserves Unicode where Article III demands ASCII transliteration, and it
  silently strips where the spec demands a build failure.
- What a scroll-spy library would do is the handler in
  `components/scroll-spy.tsx`; the spec's edge semantics are decided, not a
  library default, which is the point.
- The disclosure is the platform's `<details>`; the sticky panel and its
  scrollbar are CSS.
- `hast` types come from the dependency tree that is already there.

## Values the spec left to the plan

Each reversible in one commit; recorded here so the review reads choices, not
accidents.

1. **Fold breakpoint: `80rem`** (`min-width`, inclusive — 1280px at the
   default root size), written in rem like the pager's existing `34rem` query.
2. **Panel width: 13rem**, `justify-self: end` in the gutter with a **1.5rem
   end margin** to the content track; long titles wrap, nothing truncates.
3. **Sticky offset: `top: 2rem`; `max-height: calc(100vh - 4rem)`** — 2rem of
   air above and below.
4. **Anchor landing: `scroll-margin-top: 2rem`** on `.prose h2[id]`.
5. **Reading line: 6rem** from the viewport top — near the top as §3 asks,
   and above the 2rem landing offset so a followed link's target has always
   passed it. Bottom-of-document tolerance: 2px.
6. **Back-to-top threshold: visible iff `scrollY > innerHeight`** (one
   threshold satisfies both halves of criterion 14); **2.75rem square**
   (44px — a touch target), `1.25rem` from the bottom-right, `--bg` ground,
   `1px --rule-strong` border, `↑` glyph, monospace,
   `aria-label="Wróć na początek"`; accent only on hover/focus (border to
   `--accent-line`, the pager's own hover), never at rest.
7. **Panel typography: `--text-sm`**, monospace by inheritance from the `nav`
   element rule; lesson rows 0.35rem apart, section entries indented 0.75rem
   under their lesson; entries are block links with `0.15rem 0.4rem` padding
   so the active fill reads as the reference's box.
8. **Row states:** hover and `:focus-visible` take the accent fill with
   `--accent-ink` text (the `.lessonRow` precedent — transient pointing);
   the **active** entry is the spec's inverted pair (`background:
   var(--text); color: var(--bg)`), keyed off `[aria-current="location"]`;
   the current-lesson row is bold body text, no link, no hover,
   `aria-current="page"`.
9. **The panel's visible name** is a small muted "Spis treści" label above the
   list; the landmark name is the `aria-label` (no id involved, see 11).
10. **Skip control:** an `<a href="#tresc">Pomiń spis treści</a>` as the
    panel's first child, visually hidden until `:focus-visible` (the standard
    clip pattern, hand-written in `contents.css`); the article div carries
    `id="tresc"` and `tabIndex={-1}` so activation moves real focus. No JS.
    The disclosure gets no skip control: collapsed by default, it is one Tab
    stop.
11. **Reserved ids:** the slug deduper's used-set is seeded with `tresc`, so a
    lesson heading deriving that id takes `-2` — the numeric-suffix mechanism
    the spec already accepts — instead of capturing the skip target.
12. **Duplicate-suffix shape:** second occurrence `-2`, then `-3`, and a
    suffixed id that itself collides keeps incrementing until free.
13. **The plugin runs in the single shared pipeline** (module indexes and
    styleguide prose included). No module index has an `##` today, so no
    other page's rendered output changes; if one gains sections later they
    get addresses with no UI, which the first slice to point UI at them
    inherits.
14. **The disclosure's box:** `1px --rule-strong` border (its border is what
    identifies it — the ADR-0012 distinction), native marker kept, summary
    padded to a ≥44px touch target.
15. **The rule travels with the panel** (a border on the sticky element), not
    a page-height line — see §2 of the shape.
16. **Active state is applied to both lists unconditionally** — the hidden
    one is `display: none`, invisible to layout and to assistive technology,
    and one code path beats two.
17. **Behaviour evidence is recorded as DOM reads** (attributes, positions,
    `activeElement`) transcribed into `verification.md`, with screenshots for
    the visual states; no binary-heavy recording formats in a public repo.

## Order of work

Commit-sized, in order; each closes on its check, with the evidence appended
to `specs/007-contents-panel/verification.md` as it accumulates. Commits are
`007/TNN:` per AGENTS.md §5.

1. **Record the baseline.** Build and serve the unmodified site; at 1280px
   read the prose column's left edge and width on the longest lesson, the 004
   measure and six adjacency gaps, and the presence of 006's band,
   breadcrumb, pager and header; write the numbers and the commands into
   `verification.md`. *Check:* the file holds the numbers criterion 7 will be
   compared against, and `git status` shows no other change.
2. **Section anchors.** `lib/section-anchors.ts`; `lib/content.ts` wires the
   plugin and the collector and exposes `sections`. *Check:* `npm run build`
   passes; `curl` of the longest and the fourteen-section lesson lists every
   `h2` id, lowercase-ASCII and unique (criterion 2 evidence); a temporary
   `## ???` heading fails the build naming the file and the heading, is
   reverted, and `git status` confirms `content/` untouched (criterion 3
   evidence).
3. **The panel, server-rendered, beside an unmoved article.**
   `components/contents.tsx` (panel and list), `app/contents.css` (layout
   wrapper, panel geometry, rule, states, skip control), the layout import,
   the lesson page composition. *Check:* build passes; rendered markup of the
   longest lesson shows the rows, the non-link current row, the landmark and
   the skip control (criteria 4, 5, 6, 15's markup half); the 1280px
   geometry reads equal the baseline (criterion 7); module 0's lesson shows
   one `0c` row expanded to nine sections (criterion 17).
4. **The disclosure and the fold.** `ContentsDisclosure`, the `.lane`
   placement between header and first paragraph, the `80rem` media boundary.
   *Check:* at 1024/768/375px the panel is absent, the disclosure renders and
   opens and closes with JavaScript disabled, and the document has no
   horizontal scrollbar (criterion 12's static half, criterion 13 in part).
5. **The scroll-spy.** `components/scroll-spy.tsx`, the active styling.
   *Check:* on the longest lesson — top: nothing active; mid-lesson: exactly
   one entry with `aria-current="location"`; bottom: the last (criterion 8,
   recorded); a followed link lands the heading below the top edge and moves
   the highlight (criterion 9); the fourteen-section lesson in a ~600px-tall
   window self-scrolls the panel without moving the page (criterion 10);
   deep in the lesson the panel is on screen (criterion 11); the open
   disclosure highlights identically at 375px (criterion 12's dynamic half).
6. **Back to top.** `components/back-to-top.tsx`, its styles. *Check:*
   criterion 14 demonstrated at 375px and desktop — absent at top, present
   past a viewport, focus at the top after activation; absent on module and
   landing pages; absent entirely with JavaScript disabled.
7. **The reference page.** The §9 specimens on `app/styleguide/page.tsx`.
   *Check:* the styleguide's rendered markup carries the row states, the
   inverted active entry, the current-lesson row, the disclosure and the
   back-to-top specimen (criterion 18); build passes.
8. **The verification pass.** The full sweep: build output for the guards and
   the contrast report (criteria 1, 16); the JavaScript-disabled walk of a
   lesson page (criterion 13, whole); the network log showing no new resource
   (criterion 19); `git diff` clean under `content/` (criterion 20); all of
   it recorded.
9. **The fresh-context review** of the closing diff against the spec, per
   AGENTS.md §3 and the autonomous-mode requirement — no gap against the
   criteria, nothing outside the slice touched (criterion 21) — then the
   slice closes.
