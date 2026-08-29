# plan.md — 006-navigation

- **Slice:** 006
- **Spec:** `specs/006-navigation/spec.md`, approved 2026-08-29
- **Status:** proposed
- **Stack facts this plan assumes**, verified against the tree before writing
  it: Next 16.3.3, React 19.2.8, App Router with `app/` at the repo root,
  TypeScript `strict`, `@/*` → `./*`, **plain CSS — no Tailwind, no PostCSS
  config, no CSS-in-JS**. Three global stylesheets are imported once in
  `app/layout.tsx` (`tokens.css`, `globals.css`, `prose.css`) and one CSS Module
  exists, for the code block. `components/` exists and holds three files, all
  slice 005's. A layout may take `params` — read in
  `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/layout.md`,
  not assumed — but this plan does not need one.
- **Frame facts, measured rather than assumed:** `main` is today
  `max-width: var(--content-width); margin: 0 auto; padding: 2rem 1rem` with
  `box-sizing: border-box`, so its content box is `min(48rem, 100vw) − 2rem` —
  **46rem at desktop, 343px at 375px**. Any replacement frame has to reproduce
  those two numbers exactly, because `.prose` computes its own tracks inside
  them and slice 004's measure was counted against them.
- **Content facts, counted rather than assumed:** two modules, `00-start` and
  `01-jak-powstaje-oprogramowanie`; six lessons; module 0 holds **exactly one
  lesson, at `order: 3`** — so its list has one row and that row is `0c`. Both
  `index.mdx` files carry a two-paragraph body which `getModule` compiles and
  then discards. The longest lesson title is *"Na żywo: agent buduje
  aplikację"* (31 characters); the longest module title is *"Jak dziś powstaje
  oprogramowanie"* (33). No lesson uses `week`.
- **Baseline:** `npm run build` takes **13.3s** end to end, of which static
  generation of 13 pages is **1.5s**. That is the number the extra compiles in
  §2 are judged against.

---

## Shape of the change

Five ideas carry the slice.

**1. There is one derived model of the course, and every page reads it.** A
breadcrumb, a lesson list, a previous/next control and a module card are four
views of the same three facts: which modules exist, in what order, and which
lessons are in each. Deriving them four times is how one page comes to disagree
with another about what a lesson is called — the concern `lib/numbering.ts`
already writes into its own header. So the content layer grows one function that
returns the whole course, memoised per render pass, and every component takes a
slice of it as a prop. No component reads the file system.

**2. The page frame gains a full-width lane, and the reading column keeps its
width to the pixel.** The band has to touch the edges of the viewport, and today
the only box on the page is `main`, which is 48rem wide and centred. `main`
becomes a three-column grid with named lines — the identical idiom `.prose`
already uses one level down, chosen there for the identical reason: the
viewport-width breakout is how a page acquires a horizontal scrollbar at 375px.
Content children sit in the middle column and carry the 1rem side padding that
`main` used to carry, which reproduces the 46rem / 343px content box exactly.

**3. The chevron is one clipped shape, drawn twice by two pseudo-elements.**
An outlined chevron is a shape whose stroke has to follow two diagonals, which
`border` cannot do and `clip-path` cuts off. The answer is two absolutely
positioned pseudo-elements behind the link's text: the outer one clipped and
filled with the stroke colour, the inner one inset by the stroke width, clipped
by the same polygon, and filled with the colour of the ground behind it. The
element itself is **not** clipped, which is the whole point — a clipped element
clips its own focus ring away, and this slice has a criterion about focus rings.

**4. A rule that identifies a component gets a value that can be seen, and the
build starts checking every floor this repository has committed to.** One new
token, one ADR amending ADR-0007, and one check. The check is the durable half:
three verification documents now contain contrast ratios computed by hand, all
of which were true on the day they were written and none of which would notice a
token being edited afterwards.

**5. Nothing inside the article moves.** `app/prose.css` is not edited, no MDX
component is added, the code block is not touched. The frame around the reading
column changes shape, and the criteria for that are measurements taken against
slices 004's and 005's recorded numbers.

## Dependencies, and the ADR

**No dependency is added.** Everything here is a clipped polygon, two arrow
glyphs, and links.

**One ADR — a structural rule value, amending ADR-0007.** The number is claimed
by listing `docs/adr/` immediately before writing the file, per AGENTS.md §7;
`0011` is the highest today, and that is a fact about today rather than a
reservation.

Its content: WCAG 1.4.11 requires 3:1 of anything needed to identify a component
or its state and exempts decorative separators; slice 003 measured `--rule` at
1.47:1 on dark and 1.36:1 on light and recorded the exemption as conditional;
this slice's card frames, chevron outlines and button borders are component
identification and end the exemption. One value, `#83807a`, **the same in both
themes**, computed at **3.69:1 against the dark page and 3.64:1 against the
light one**. `--rule` keeps its value and every use slices 003, 004 and 005 gave
it.

Why one value: the two themes pull in opposite directions — a rule needs to be
lighter than a dark page and darker than a light one — and a mid grey satisfies
both. `#83807a` is very near the point where the two ratios meet, which is where
the worst of the two is at its best; there is no single value that does better,
and a value per theme buys nothing over 3.64:1.

Rejected in the ADR: reusing `--rule` (the thing the roadmap's constraint exists
to forbid); reusing `--text-muted` at 5.86:1 and 6.34:1 — it clears the bar, and
slice 004 used it for the one table rule that carries meaning, but it is the
*text* token, and a card's frame drawn in the same value as the caption inside it
reads as one object rather than as a container and its contents; raising `--rule`
itself, which restyles every hairline three slices have already placed and
measured; and per-theme values.

## File map

| File | New/Edit | What it holds |
| --- | --- | --- |
| `docs/adr/00NN-structural-rule-value.md` | **new** | The token, the arithmetic, the amendment to ADR-0007. |
| `app/tokens.css` | edit | `--rule-strong`, once, on bare `:root`. |
| `scripts/check-design-invariants.mjs` | edit | Check E — the contrast floors, computed from the token file in both themes. |
| `lib/numbering.ts` | edit | `moduleNumber`, `moduleLabel`, `lessonId`. Identity, in the file that already owns it. |
| `lib/plural.ts` | **new** | Polish plural selection. One function, three forms. |
| `lib/content.ts` | edit | The course model, the neighbours, the module body. |
| `app/nav.css` | **new** | The whole navigation treatment: header, band, chevrons, rows, cards, pager. |
| `app/globals.css` | edit | `main` becomes the frame. |
| `app/layout.tsx` | edit | The header above `main`; `nav.css` imported. |
| `app/theme-toggle.tsx` | edit | The provisional note goes; the component is unchanged otherwise. |
| `app/theme-toggle.module.css` | edit | The fixed positioning goes. |
| `app/moduly/[module]/[lesson]/lesson-header.module.css` | edit | One line: its bottom margin becomes the frame's row gap. |
| `components/site-header.tsx` | **new** | Wordmark and the theme control. |
| `components/breadcrumb.tsx` | **new** | The chevron trail. |
| `components/band.tsx` | **new** | The accent stripe and its inner box. |
| `components/lesson-list.tsx` | **new** | The chevron rows. |
| `components/module-grid.tsx` | **new** | The cards. |
| `components/pager.tsx` | **new** | Previous/next, for lessons and for modules. |
| `app/page.tsx` | edit | Headline, description, button, grid. |
| `app/moduly/page.tsx` | edit | Heading and the same grid. |
| `app/moduly/[module]/page.tsx` | edit | Band, introduction, lesson list, module pager. |
| `app/moduly/[module]/[lesson]/page.tsx` | edit | Band, header, prose, lesson pager. |
| `app/styleguide/page.tsx` | edit | Specimens of the navigation furniture. |
| `app/styleguide/page.module.css` | edit | Only what that section needs. |
| `specs/006-navigation/verification.md` | **new** | The evidence, as 003, 004 and 005 did it. |

**Not touched:** everything under `content/`; `app/prose.css`; `app/fonts.ts`;
`lib/content-schema.ts`; `lib/code-highlight.ts`; `lib/code-meta.ts`;
`components/code-block.tsx`; `components/code-block.module.css`;
`components/copy-button.tsx`; `app/moduly/[module]/[lesson]/lesson-header.tsx`;
`package.json`; `next.config.ts`.

## The parts

### 1. Identity — `lib/numbering.ts`

The file already owns the one derivation this repo treats as identity. It gains
the other two.

```ts
export function moduleNumber(slug: string): number   // "01-foo" → 1, throws otherwise
export function moduleLabel(number: number): string  // 1 → "Moduł 1"
export function lessonId(moduleNumber: number, order: number): string  // (1, 2) → "1b"
```

`moduleNumber` matches `^(\d+)-` and **throws** when it does not, naming the
folder and quoting Article VI. It is called from the content layer during a
build, so the failure surfaces as a build failure with the folder in the message
— spec criterion 4. It is deliberately not lenient: ADR-0003 forbids deriving a
lesson's letter from its position in a list, and deriving a module's number from
its position in a directory is the same mistake with a different index.

`moduleLabel` is Polish, in a file otherwise made of arithmetic, because *Moduł
1* is the module's name rather than a rendering of its number — the same reason
the letter lives here.

### 2. The course — `lib/content.ts`

One new exported function and two derived from it:

```ts
export interface CourseLesson extends LessonSummary {
  moduleSlug: string; letter: string; id: string; href: string;
}
export interface CourseModule extends ModuleSummary {
  number: number; label: string; href: string; lessons: CourseLesson[];
}
export const getCourse: () => Promise<CourseModule[]>          // React cache()
export async function getLessonNeighbours(moduleSlug, lessonSlug)
export async function getModuleNeighbours(moduleSlug)
```

`getCourse` is wrapped in React's `cache()`, so it is built **once per render
pass** rather than once per component that asks for it. Not a module-level Map:
that would survive a file edit in `next dev` and serve a stale course until the
process restarted, which is the sort of thing that costs an hour on a Sunday.

Modules are sorted by `moduleNumber`, not by folder name. The alphabetical sort
in `readModuleSlugs` today is correct only while every prefix is two digits, and
puts module 10 before module 2 on the day one is not. Lessons keep their
existing sort by `order`.

Neighbours are computed by flattening the course into one array of
`{ module, lesson }` and taking the entries either side. That is what makes the
sequence cross a module boundary without a special case, and it is why the flat
list is built from the sorted course rather than assembled per module.

`getModule` additionally returns the compiled `body`. `readModuleFrontmatter`
already compiles the whole file and throws the content away; it becomes
`readModule` and returns both. `listModules` keeps returning summaries plus the
number and the lesson count.

**Cost:** `getCourse` compiles every lesson of every module. Eight prerendered
pages × six lessons is 48 compiles where there were 13, against a baseline where
all static generation takes 1.5s of a 13.3s build. Measured in T02 rather than
assumed; if it ever matters the answer is a frontmatter-only read, which is a
plan change and not a silent one.

### 3. The frame — `app/globals.css` and `app/layout.tsx`

```css
main {
  display: grid;
  grid-template-columns:
    [full-start] minmax(0, 1fr)
    [content-start] min(var(--content-width), 100%) [content-end]
    minmax(0, 1fr) [full-end];
  align-content: start;
  row-gap: var(--gap-apart);
  padding-block-end: var(--gap-section);
}

main > * { grid-column: content; padding-inline: 1rem; min-width: 0; }
main > [data-full-bleed] { grid-column: full; padding-inline: 0; }
```

Four things fall out of that, and each answers something:

- **The content box is unchanged.** The column is `min(48rem, 100%)` and each
  child carries the 1rem side padding `main` used to carry, so a content child's
  padding box is 46rem at desktop and 343px at 375px — the two numbers measured
  above. `.prose` computes its own tracks inside that box and therefore does not
  move. Spec criterion 12.
- **`row-gap` replaces margins between the frame's children.** Margins do not
  collapse between grid items, so `margin-block-start` on every child plus a
  `margin-block-end` on the lesson header would produce a doubled gap. A row gap
  produces exactly one, by construction. It is also why
  `lesson-header.module.css` loses its `margin-block-end`: the gap it was
  creating is now the frame's, at the same token, so the rendered result is
  identical and there is one mechanism instead of two.
- **`min-width: 0`** for the reason `.prose` already carries it: a grid item
  defaults to `min-width: auto`, and one long unbreakable run inside it pushes
  the track wider than its declared size, which is a horizontal page scrollbar.
- **`align-content: start`**, so a short page does not distribute its rows down
  the viewport.

The layout gains `<SiteHeader />` above `<main>` and the `nav.css` import. The
theme control moves inside the header and loses `position: fixed`; nothing about
its behaviour changes, which is the point — spec criterion 14 re-checks slice
003's behaviour because its housing changed, not its logic.

### 4. The chevron — `app/nav.css`

One global stylesheet, plain class names, in `app/` beside `prose.css` and for
the reason `prose.css` records: every check in this slice is performed by reading
a rendered page, and a hashed class name makes that harder for no gain. Rejected:
five CSS Modules, one per component, which is five files and five hashed
prefixes to query around.

The geometry:

```css
.chev {
  --point: 0.5rem;
  --stroke: var(--rule-strong);
  --ground: var(--bg);
  --shape: polygon(0 0, calc(100% - var(--point)) 0, 100% 50%,
                   calc(100% - var(--point)) 100%, 0 100%);
  position: relative;
  isolation: isolate;
}
.chev::before, .chev::after { content: ""; position: absolute; z-index: -1; clip-path: var(--shape); }
.chev::before { inset: 0;   background: var(--stroke); }
.chev::after  { inset: 1px; background: var(--ground); }
```

- **`isolation: isolate` plus `z-index: -1`** puts both pseudo-elements above
  the element's own background and below its text. Without the isolation a
  negative index would escape to the nearest ancestor stacking context and
  disappear behind the page.
- **The element itself is never clipped**, so its focus ring is drawn whole.
  This is the reason for two pseudo-elements rather than `clip-path` on the link.
- **`--point` is an absolute length**, so the inner polygon on a box inset by
  1px is the outer polygon moved 1px inward on every edge. Along the diagonal the
  perpendicular stroke is `1px × sin θ`; at 0.5rem of run over half a 2rem row it
  is about 0.87px, which reads as the same hairline as the flat edges.
- A **notched** variant adds `var(--point) 50%` as a final vertex, so a trail
  segment's left edge takes the previous segment's point. The first segment in a
  trail does not get it.
- A **filled** variant sets `--ground` to the stroke colour and inverts the text.
  That is the design reference's *inverted active item*, and the current
  breadcrumb step is its first use.

Segments are separated by a small gap rather than overlapped exactly, so every
segment's outline is a closed shape. Overlapping to the pixel makes the two
strokes coincide and the trail reads as one long arrow.

**Colours are set by context, not by variant.** On the band `--stroke` becomes
`--accent-ink` and `--ground` becomes `--accent-surface`; on the page background
they stay `--rule-strong` and `--bg`. Two custom properties, one override block,
and the same shape rules everywhere.

### 5. Focus, and the band

```css
:where(a, button):focus-visible { outline: 2px solid var(--accent-line); outline-offset: 2px; }
[data-band] :where(a, button):focus-visible { outline-color: var(--accent-ink); }
```

On the dark theme `--accent-line` and `--accent-surface` are **the same value**
(ADR-0007: one pale value serves both roles there). A focus ring in the site's
accent, drawn on the accent band, is therefore invisible — on the theme that is
the default. The override is not a refinement; it is the difference between a
keyboard being usable on that band and not. Computed per surface in
verification, because it is exactly the kind of thing that passes a review
carried out with a mouse.

### 6. The rows, the cards, the pager

**The lesson rows.** One chevron per lesson, full width, outlined at rest,
filled with the accent on hover and on focus. Each row is `id` in the monospace
face at `--accent-line`, then the title. Not staggered — spec decision 12. The
row wraps rather than truncating; the shape is a percentage polygon on the box's
height, so it follows a two-line row without being told to.

**The cards.** A link containing the module number at `--text-3xl` in
`--accent-line`, the module title in the monospace face, and one muted line
giving the lesson count. The doubled frame is a `::after` with
`inset: 0; translate: 0.3rem 0.3rem; border: 1px solid var(--rule-strong);
z-index: -1`, which is a second border offset behind the card rather than a
shadow — the design reference's word for it. The card carries `background:
var(--bg)` so the offset frame shows as an L on the right and bottom. 0.3rem of
overhang sits inside the frame's 1rem gutter, so it cannot reach the viewport
edge; checked at 375px all the same.

`grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr))` gives three across
inside 46rem, and one across on a phone, with no media query.

**The pager.** Two rectangles, bordered at `--rule-strong`, each with a muted
mono label, an arrow glyph, the neighbour's identity string in the accent and
its title. When the neighbour is in another module the label names that module,
which is what makes the crossing visible. A missing neighbour renders nothing —
not a disabled control. It is a `nav` with an accessible name, separated from the
article above by a `--rule` hairline, which is decorative and stays decorative.

The same component serves modules, with the module label and title in place of
the lesson's.

### 7. Check E — `scripts/check-design-invariants.mjs`

The contrast floors this repository has committed to, computed from
`app/tokens.css`, for the dark block and for the light one, on every build:

| Pair | Floor |
| --- | --- |
| `--text` on `--bg` | 4.5 |
| `--text-muted` on `--bg` | 4.5 |
| `--link` on `--bg` | 4.5 |
| `--accent-line` on `--bg` | 4.5 |
| `--accent-ink` on `--accent-surface` | 4.5 |
| `--rule-strong` on `--bg` | 3 |
| `--rule-quote` on `--bg` | 3 |

It reuses `readTokenBlocks()`, which Checks C and D already built and which
already refuses to answer if the file ever grows a nested rule. A resolver
follows `var()` indirection to a literal — `--link` and `--rule-quote` are both
aliases — and the WCAG 2.x relative-luminance arithmetic is eight lines. The
failure message names the pair, the theme, the computed ratio and the floor.

Rejected: extending it to the code palette in this slice. Those eight colours
are checked against their own surface in slice 005's verification, Checks C and
D already keep them defined and theme-independent, and a check nobody's spec
asked for is scope taken quietly.

### 8. The reference page

A section carrying the navigation furniture on its own: a breadcrumb in both
segment states, a chevron row, a module card and a previous/next pair, built from
literal props rather than from the course, so the specimens do not change when
the content does. Labels stay English like the rest of that page; the specimens'
own text is Polish, because that is what they render on the site.

No colour value may be printed there — Check B walks `app/`, and the reference
page failing its own rule is a mistake this repo has already made once.

## Order of work

Sequenced so the build is green at every commit boundary, and so the two things
most likely to be wrong — the frame's geometry and the focus ring on the band —
are reachable early.

1. **Record the slice.** `plan.md` and `tasks.md` into the repository.
2. **Identity and the course model.** `moduleNumber` and its build failure, the
   sorted course, the neighbours, the module body. Nothing renders yet; the
   evidence is printed values and a failing build shown and reverted.
3. **The rule value.** The ADR, the token, and Check E. Contrast computed by the
   build before anything is drawn with it.
4. **The frame.** `main`'s grid, the header, the theme control's move, and the
   band as an empty stripe. **Verify here** that the content box is still 46rem
   and 343px and that 004's gaps have not moved — cheaper to find out now than
   after four components are sitting in it.
5. **The breadcrumbs**, with the focus ring on the band.
6. **The module page** — introduction, chevron rows, module pager.
7. **The lesson pager**, including the crossing into module 0.
8. **The landing page and `/moduly`** — the grid, the cards, the button.
9. **The reference page specimens.**
10. **Verification pass**, written into `specs/006-navigation/verification.md`.
11. **Close the slice** — the fresh-context review of AGENTS.md §3.

## How the by-eye and by-measurement criteria get checked

| Criterion | Method |
| --- | --- |
| 1 — no loose colour | The build's own Check B. Its output is the evidence. |
| 2, 3 — the floors | Check E's output, and each floor broken once and shown failing. |
| 4 — the module prefix | A module folder renamed temporarily; the failing build shown; reverted. |
| 5 — `0c` | Read out of the rendered HTML of the module page, the lesson page's breadcrumb, and `1a`'s previous control. |
| 6, 7, 8 — reachability | Walked in the browser pane, link by link, with the resulting URLs printed; and the absent controls confirmed by a query returning zero elements. |
| 9 — the trail's markup | Read from the rendered HTML: the landmark, its name, the ordered list, and `aria-current`. |
| 10 — focus | The computed outline colour on each surface, and the WCAG ratio against that surface's own background, printed for the band and for the page. |
| 11, 19 — the phone | Browser pane at 375×812; the band's rendered width against the viewport's, and `document.documentElement.scrollWidth <= clientWidth` on every page in both themes. |
| 12 — 004 unmoved | The measure counted with `Range.getClientRects()` as 004 counted it, and the six adjacency sequences' computed margins printed, both compared to `specs/004-lesson-typography/verification.md`. |
| 13 — 005 unmoved | The nine blocks on the Git lesson counted, their surface colour read, and the code block's gaps compared to `specs/005-code-blocks/verification.md`. |
| 14 — the theme | Slice 003's own checks re-run: toggle, reload, navigate, in both directions. |
| 15, 18 — the shapes | Judged on a rendered page at desktop and 375px in both themes, and the judgement written down; plus the computed text/fill contrast printed for each chevron state. |
| 16 — the button | The rendered `href` compared against the first lesson of the first module read off disk. |
| 17 — the introductions | The rendered text compared with the `index.mdx` bodies, and `git diff --stat` over `content/`. |
| 21 — no requests | The browser pane's network log for each page, filtered to images and third-party origins. |

## Risks

| Risk | Signal | Response |
| --- | --- | --- |
| The new frame moves the reading column | 004's measure or gaps differ | The content box is reproduced by construction — `min(48rem, 100%)` plus 1rem of child padding — and step 4 measures it before anything is built on top. If it differs, the frame is wrong, not the measurement. |
| The doubled frame overhangs into a horizontal scrollbar at 375px | `scrollWidth > clientWidth` on the landing page | 0.3rem of overhang inside a 1rem gutter. Measured, not reasoned about. |
| The negative-index pseudo-elements paint behind the page instead of behind the text | The chevrons are invisible | `isolation: isolate` on the element. It is in the plan because it is the known failure of this technique. |
| A clipped chevron eats its own focus ring | Criterion 10 | The link is not the clipped element; two pseudo-elements are. Same reason. |
| The focus ring is invisible on the band | Nothing — this is the silent one, and only on the default theme | The override, and a computed ratio per surface rather than a look. |
| `cache()` does not dedupe across a page's components | Build time grows | It is per render pass, which is what a prerendered page is. The 1.5s static-generation baseline gives room either way; measured in step 2. |
| A stale course in `next dev` after editing content | A lesson's neighbour is wrong until the server restarts | `cache()` rather than a module-level Map, deliberately. |
| The chevron's inner shape reads as an uneven stroke | The outline looks heavier at the point | The point is a length, not a percentage, so the inset is uniform; if it still reads wrong the answer is a deeper point, which is one value. |
| Check E's resolver meets a `var()` chain it cannot follow | The build fails on a token that is fine | It follows aliases to a literal and fails loudly naming the token if it cannot. A token file whose values are not resolvable is a thing to know about. |
| Moving the theme control breaks slice 003's pre-paint guarantee | A flash of the wrong theme | The inline script in `<head>` is untouched; only the button's position changes. Re-checked all the same — criterion 14. |

## What this plan does not do

Named so the closing review can check the diff against it: no contents panel, no
scroll-spy, no back-to-top, no sticky or shrinking header; no search; no MDX
component; no change to any file under `content/`; no change to `app/prose.css`,
to the code block, to the frontmatter schema or to the highlighter; no per-page
title, description, sitemap or robots change; no `publish` flag; no per-module
accent; no module "last updated" line; no `week`, timetable or group modelling;
no new dependency; no new colour outside the one structural rule value; and no
`prefers-color-scheme`.
