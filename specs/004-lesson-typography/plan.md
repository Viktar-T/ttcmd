# plan.md — 004-lesson-typography

- **Slice:** 004
- **Spec:** `specs/004-lesson-typography/spec.md`, approved 2026-08-29
- **Status:** proposed
- **Stack facts this plan assumes**, verified against the tree before writing
  it: Next 16.3.3, React 19.2.8, App Router with `app/` at the repo root,
  TypeScript `strict`, **plain CSS — no Tailwind, no PostCSS config**. MDX is
  compiled by `next-mdx-remote/rsc` `compileMDX` in `lib/content.ts` with **no
  `components` map**, so every lesson renders as plain HTML elements — `h2`,
  `p`, `ul`, `ol`, `blockquote`, `table`, `pre`, and the four top-level `<svg>`
  diagrams the lessons already contain.
- **Facts about the content this plan is built on**, counted rather than
  assumed: 6 lessons, 108–202 lines each; 46 `##` and 9 `###` and **no other
  heading level**; 9 fenced blocks, all `bash`; **one** table, with an empty
  first header cell; **four** top-level `<svg>` diagrams, `viewBox` widths 660
  to 720, each already carrying `style={{ width: "100%", height: "auto" }}`; no
  nested lists; no `<hr>`; no MDX component; the lowest `order` in module 0 is
  **3**.

---

## Shape of the change

Almost all of it is CSS on plain elements, which is what makes acceptance
criterion 3 achievable: no lesson file is edited and none needs to be. Three
structural ideas carry the slice, and everything else is detail.

**1. Two widths, not one.** Today `main` is a single 40rem box and the prose
measure is that box. This slice separates them: `main` becomes the **content
width**, and a **prose column** inside it carries the measure. Wide blocks — the
four diagrams and the table — live in the content width; prose lives in the
measure. That is spec §1's "the measure is a property of the prose column, not
of the page", expressed as two tokens instead of one.

**2. The breakout is a grid, not a negative margin.** The prose column is a CSS
grid with named column lines; ordinary blocks sit in the `text` column, wide
blocks span `full`. Negative-margin breakouts (`margin-inline: calc(50% - 50vw)`
and relatives) are the usual trick and they are how a page acquires a horizontal
scrollbar at 375px — which is criteria 13 and 20, twice.

**3. Every gap is a `margin-top`, and nothing carries a `margin-bottom`.** All
flow children are reset to `margin: 0`, then each gets a top margin only. This
is not a style preference; it is what makes criteria 5 and 6 structurally true
instead of case-by-case. Between any two adjacent blocks there is exactly one
margin, so a doubled gap cannot be constructed, a collapsed gap cannot be
constructed, and grid — which does not collapse margins at all — cannot change
the answer. "The space above a heading is larger than the space below it" then
falls out for free: the space below a heading is the *next* element's ordinary
block gap, and the space above it is the heading's own section gap.

The consequence to hold on to while writing the file: **the rules must be
ordered by rising priority** — ordinary block gap, then tight gaps, then
set-apart gaps, then heading gaps last — so that a heading following a
blockquote still gets the heading gap. That ordering is the whole of criterion 5.

One thing is *not* CSS: the lesson header. The circled letter has to be derived
from `order` in TypeScript, and that derivation is the criterion this slice is
most likely to fail (spec, notes for the reviewer). It gets its own module and
its own step.

## File map

| File | New/Edit | What it holds |
| --- | --- | --- |
| `app/tokens.css` | edit | `--measure`, `--content-width`, the rhythm scale, `--weight-strong`; rebinds `--rule-quote`. |
| `app/globals.css` | edit | `main` takes `--content-width`; inline code's colour becomes `inherit`. Nothing else. |
| `app/prose.css` | **new** | The whole reading treatment, every selector under `.prose`. |
| `app/layout.tsx` | edit | One import line. |
| `lib/numbering.ts` | **new** | `lessonLetter(order)`. ADR-0003's derivation, in one place. |
| `lib/content-schema.ts` | edit | `order` becomes a bounded positive integer. |
| `app/moduly/[module]/[lesson]/lesson-header.tsx` | **new** | Circled letter, title, standfirst. |
| `app/moduly/[module]/[lesson]/lesson-header.module.css` | **new** | Its two-column geometry. |
| `app/moduly/[module]/[lesson]/page.tsx` | edit | Renders the header; wraps the body in the prose column. |
| `app/moduly/[module]/page.tsx` | edit | Wraps its output in the prose column. Nothing else. |
| `app/styleguide/page.tsx` | edit | The specimen section spec §9 requires. |
| `app/styleguide/page.module.css` | edit | Only what that section needs. |
| `specs/004-lesson-typography/verification.md` | **new** | The evidence, as 003 did it. |

**No dependency is added**, so AGENTS.md §7's ADR requirement is not triggered.
**No ADR is needed**: every value used is an existing token or a rebinding of an
alias slice 003 created for exactly this purpose. If that turns out to be wrong
during execution — see the `--rule` risk below — stop and write the ADR rather
than inventing a value.

**Not touched:** `content/` (criterion 3 is that the diff contains no change
there), `lib/content.ts`, `scripts/`, `package.json`, `next.config.ts`,
`app/theme-toggle.tsx`, `app/page.tsx`.

## The parts

### 1. Tokens — `app/tokens.css`

Added to the existing type-scale block, because 003 settled on one token file
and a second one would immediately raise the question of which is authoritative.

```css
:root {
  --measure: 36rem;        /* the prose column. Verified by counting, not by this comment. */
  --content-width: 48rem;  /* main, and the wide-block column inside the prose grid */

  --gap-tight: 0.5rem;      /* between list items; between paragraphs of one quotation */
  --gap-block: 1.25rem;     /* the ordinary gap between two blocks */
  --gap-apart: 2rem;        /* around a quotation, a diagram, a table */
  --gap-subsection: 2.5rem; /* above an h3 */
  --gap-section: 3.5rem;    /* above an h2 */

  --weight-strong: 650;     /* dark; both faces are variable, so this is a real value */
}

:root[data-theme="light"] {
  --weight-strong: 700;
}
```

The five gaps are strictly increasing and the two heading gaps are the largest
two. **That ordering is criterion 5**, and it is a property of the token block
rather than of any rule that uses it, which is why the values live together.

`--weight-strong` is split per theme for criterion 16: light text on a dark
ground gains apparent weight, and Inter at 700 on `--bg` smears where the same
weight on the light theme reads correctly. Both values are provisional until the
eye check in step 11; the mechanism is not.

**One rebinding.** `--rule-quote` currently resolves to `--rule`, which 003
measured at **1.47:1** on dark and **1.36:1** on light. A 2px line at 1.47:1 is
not "distinguishable at a glance" (criterion 9); it is invisible on a projector.
It is rebound to an existing token:

```css
--rule-quote: var(--text-muted);   /* 5.86:1 dark, 6.34:1 light */
```

No new hue enters — criterion 2 and the spec's out-of-scope list both hold. The
rejected alternative is `--accent-line`, brighter still, which reads as a
callout marker, and callouts are explicitly not this slice.

### 2. The two widths — `app/globals.css`

Two edits, and nothing else in this file:

```css
main {
  max-width: var(--content-width);   /* was 40rem, "slice 004's decision" */
  margin: 0 auto;
  padding: 2rem 1rem;
}

:not(pre) > code {
  font-size: 0.9375em;
  color: inherit;                     /* was var(--text-muted) */
}
```

The inline-code change is spec §7 and criterion 8 in one line. `0.9375em` is
already relative and needs no change — JetBrains Mono's x-height runs large
against Inter's, so the reduction is what keeps a run of identifiers from
looking oversized in a paragraph, and being an `em` it scales inside a heading by
itself. The colour was the actual defect: `--text-muted` inside an `h2` mutes a
section title named after the command it teaches.

Widening `main` also widens the landing page, `/moduly` and `/styleguide`. That
is a visible change outside a lesson and it is unavoidable — the wide-block
column cannot be wider than the box it sits in. It is written down here so the
closing review sees it as intended rather than as leakage. Those three pages
carry a heading and a short list each; none of them regresses.

### 3. The prose column — `app/prose.css`

A new stylesheet, imported once in `app/layout.tsx`, every selector scoped under
a single `.prose` class. Rejected: putting it in `globals.css` (that file is the
reset and the element defaults, and this is two hundred lines of treatment), and
a CSS Module (which works — Modules hash class names, not element selectors —
but the class becomes a hash in devtools, and every verification step in this
slice is performed by reading a rendered page).

The scope class is applied by the page components, not by `main`, because the
styleguide's own furniture — the swatch grid — must **not** be inside a 36rem
measure.

**The grid, and the breakout:**

```css
.prose {
  display: grid;
  grid-template-columns:
    [full-start] minmax(0, 1fr)
    [text-start] min(var(--measure), 100%) [text-end]
    minmax(0, 1fr) [full-end];
  font-size: var(--text-lg);
  line-height: var(--leading-normal);
}

.prose > *              { grid-column: text; min-width: 0; margin: 0; }
.prose > :is(svg, table) { grid-column: full; }
.prose > :first-child   { margin-top: 0; }
```

`min(var(--measure), 100%)` is what makes the phone case fall out without a
media query: below the measure the text column is the container, and the
container is `main` minus its padding. `min-width: 0` on every child is not
decoration — a grid item defaults to `min-width: auto`, and a long unbreakable
run inside one will otherwise push the track wider than its declared size, which
is a horizontal page scrollbar and a failed criterion 20.

**Prose is set at `--text-lg`**, an existing scale token, not at `--text-base`.
16px is a defensible interface size and a poor one for the twenty-minute read
the spec describes; 18px is the size at which the measure is chosen. No token
changes, nothing new is introduced, and every heading stays above it
(`--text-xl` = 1.375rem is the smallest one).

**The rhythm**, written in this order and only in this order:

```css
.prose > *                     { margin-top: var(--gap-block); }
.prose li + li,
.prose blockquote > p + p      { margin-top: var(--gap-tight); }
.prose > :is(blockquote, svg, table, pre) { margin-top: var(--gap-apart); }
.prose > :is(blockquote, svg, table, pre) + :not(:is(h1, h2, h3, h4, h5, h6))
                               { margin-top: var(--gap-apart); }
.prose > :is(h3, h4, h5, h6)   { margin-top: var(--gap-subsection); }
.prose > h2                    { margin-top: var(--gap-section); }
```

The fourth rule is criterion 11's other half: a quotation is set apart *below*
as well as above, unless what follows is a heading, in which case the heading's
own larger gap wins. It is written as `:not(:is(h1…h6))` rather than left to
source order, so that re-ordering the file later cannot silently break it.

**Headings.** All six get a treatment (spec decision 12): the two the content
uses, and the four it does not, so that the next lesson needing an `h4` gets
typography rather than a browser default with no build failure to say so. The
face is already monospace from `globals.css`; this file adds size, weight and
wrap.

| | Size | Weight | Space above |
| --- | --- | --- | --- |
| `h2` | `--text-2xl` | 700 | `--gap-section` |
| `h3` | `--text-xl` | 600 | `--gap-subsection` |
| `h4` | `--text-lg` | 700 | `--gap-subsection` |
| `h5` | `--text-base` | 700 | `--gap-subsection` |
| `h6` | `--text-base` | 600, `--text-muted` | `--gap-subsection` |

Criterion 7 asks that `h2` and `h3` be distinguishable *when both are on screen*,
and explicitly not by a size difference a reader has to measure. They differ on
three axes at once — 1.75rem against 1.375rem, 700 against 600, and 3.5rem of
space above against 2.5rem. If the eye check in step 11 still says they read as
one level, the **documented fallback** is a hairline `border-top: 1px solid
var(--rule)` on `h2` with its padding folded into the section gap: a section
break made literal, from an existing token. It is a fallback rather than the
first choice because 46 `h2`s across six lessons is 46 rules, and the space
should be doing this work.

`text-wrap: balance` on all six, so a two-line heading does not leave one word
alone on the second line.

**Quotations.** Spec §4, and the treatment is deliberately subtractive:

```css
.prose blockquote {
  border-inline-start: 2px solid var(--rule-quote);
  padding-inline-start: 1.25rem;
  color: var(--text);        /* not --text-muted. Criteria 9 and 10. */
  font-style: normal;
}
```

No `background`, no `::before` quote glyph, no icon, no label, no border on the
other three sides — each of those is the callout treatment, and ADR-0007 leaves
the callout colours indicative, so building one here would mean inventing a
value. `color: var(--text)` makes criterion 10 true by construction rather than
by tuning: quoted text is the same token as body text, so its ratio is body
text's ratio, 12.21:1 dark and 14.71:1 light, already computed in 003's
`verification.md` and re-recorded in this slice's.

The attribution line gets **no rule at all** (spec decision 5). It is a
paragraph of the quotation, it begins with an em dash, and the lessons contain
both quotations that end with one and quotations that do not — any `:last-child`
rule misfires on half of them.

**Lists.** `padding-inline-start: 1.6em` and the browser default
`list-style-position: outside`, which already *is* the hanging indent criterion
12 asks for; the risk here is *adding* `inside` or a custom `::marker` layout
and breaking something that works. `li::marker { color: var(--text-muted) }` —
5.86 and 6.34, over the text floor, though a marker is not body text. `li + li`
takes `--gap-tight`, which is what makes a list read as one object.

**Tables.** Spec §6, and the one table on the site has an empty first header
cell, so nothing may assume a filled header band:

```css
.prose table         { display: block; overflow-x: auto; border-collapse: collapse; }
.prose :is(th, td)   { padding: 0.5rem 0.9rem; text-align: start; }
.prose th            { font-family: var(--font-mono), ui-monospace, monospace; font-weight: 600; }
.prose thead tr      { border-bottom: 1px solid var(--text-muted); }
.prose tbody tr + tr { border-top: 1px solid var(--rule-table); }
```

`display: block` on the `table` is what confines the scroll to the element's own
bounds. It is a known idiom and it costs the table its full-width layout — the
table shrinks to its content — which for three columns of short Polish phrases is
the better rendering anyway. **Rejected:** wrapping the table in a scrolling
`div` through a `components` map on `compileMDX`. That is the cleaner mechanism,
and it opens the MDX components map the spec's out-of-scope list closes, and it
moves a presentation decision into `lib/`.

Two rule strengths, deliberately. The **header underline carries meaning** — it
is what separates header from body on a table whose first header cell is empty —
so it takes `--text-muted` and clears WCAG 1.4.11's 3:1 without argument. The
**row separators are decorative** and take `--rule-table`. 003's
`verification.md` recorded `--rule` at 1.47:1 and flagged that the moment a rule
carries meaning it needs its own value and an ADR; this is that moment, and it is
answered with an existing token rather than a new one.

**Links.** Criterion 14 is the underline; criterion 15 is the ogonek:

```css
.prose a {
  color: var(--link);
  text-decoration-line: underline;
  text-decoration-thickness: 0.06em;
  text-underline-offset: 0.2em;
  text-decoration-skip-ink: auto;
}
```

`skip-ink` alone is not the answer — it is already the default, it treats the
ogonek as glyph ink, and it breaks the underline into fragments around every `ą`
and `ę`, which in a Polish sentence is most of the words. The offset is what
moves the line clear so `skip-ink` has almost nothing to skip. `0.2em` is a
starting value and the check is criterion 15, by eye, in both faces and both
themes.

**Bold, `hr`, `pre`.** `strong { font-weight: var(--weight-strong) }`. `hr` gets
a `1px solid var(--rule)` line and `--gap-apart`: no lesson contains one today,
and it is one line to stop the first one that does from arriving at a browser
default. `pre` gets **only** `overflow-x: auto` and its place in the rhythm — no
background, no padding, no radius, no copy control, that is slice 005 and
criterion 22 says so. The `overflow-x` is not an exception to that: without it a
long `bash` line widens the page, which is criterion 20, and containment is not
styling.

### 4. The letter — `lib/numbering.ts`

```ts
/** ADR-0003: a lesson's letter is derived from its order, never stored. */
export function lessonLetter(order: number): string {
  return String.fromCharCode("a".charCodeAt(0) + order - 1);
}
```

Its own module, not a helper inside the page, because the navigation and
contents-panel slices need the same derivation and a second copy is how module 0
comes to show **c** on one page and **a** on another.

The function is total only over a bounded domain, so the domain is enforced where
the constitution puts it — in the schema, which Article VIII makes the single
source of truth for lesson metadata:

```ts
order: z.number().int().min(1).max(26),
```

All six lessons already satisfy it, so this is not a content migration; it is the
guarantee that `lessonLetter` cannot return `{`. **Rejected:** throwing from
`lessonLetter` at render time, which fails the build in a worse place with a
worse message and leaves the schema claiming something untrue.

This is the criterion the spec singles out as most likely to fail. The derivation
takes `lesson.order`, and **nothing anywhere near it may use an array index** —
`listLessons` returns lessons sorted by `order`, and in module 0 that array's
only element is at index 0 and has `order: 3`. Index-based numbering would
produce **a**, would look entirely correct, and would contradict ADR-0003.
Criterion 17 is the check that catches it, and it gets its own task.

### 5. The header — `lesson-header.tsx` and its module CSS

```tsx
<header className={styles.header}>
  <span className={styles.letter}>{lessonLetter(order)}</span>
  <h1 className={styles.title}>{title}</h1>
  <p className={styles.standfirst}>{summary}</p>
</header>
```

Two columns, three grid areas: the letter in column 1 row 1, the title in column
2 row 1, the standfirst spanning row 2. `align-items: start` on the row, and the
circle's diameter set to exactly one line box of the title:

```css
.header { --title-size: var(--text-3xl); }

.letter {
  inline-size: calc(var(--title-size) * var(--leading-tight));
  aspect-ratio: 1;
  border: 1px solid var(--accent-line);
  border-radius: 50%;
  color: var(--accent-line);
  font-family: var(--font-mono), ui-monospace, monospace;
  display: grid;
  place-items: center;
}

@media (max-width: 30rem) { .header { --title-size: var(--text-2xl); } }
```

Deriving the diameter from the title's own line box is what makes criterion 18
hold: the circle is the height of the first line and top-aligned to it, so a
title wrapping to two or three lines cannot drag it downward and cannot push it
off the page. The single `--title-size` variable is why the media query is one
line — the circle follows the title without being told to.

The title takes `overflow-wrap: break-word`; the two longest written titles are
the test.

The letter is **not** `aria-hidden`. It is the lesson's identity (Article VI),
not decoration, and a screen reader announcing "c" before the title is correct.

The standfirst is `--text-xl`, `--text-muted`, in the sans face, with a `--rule`
hairline closing the header. Larger than body, quieter than body, and separated
from it — three signals that it is an abstract and not the lesson's first
sentence, which is criterion 19. It sits outside the prose column, so the prose
column's `:first-child` rule still sees the lesson's real first block.

The header is **not** the accent band. Spec §8 puts the band with the breadcrumb,
in the navigation slice.

### 6. The pages

`app/moduly/[module]/[lesson]/page.tsx`:

```tsx
<LessonHeader title={lesson.title} order={lesson.order} summary={lesson.summary} />
<div className="prose">{lesson.body}</div>
```

The `<h1>{lesson.title}</h1>` and `<p>{lesson.summary}</p>` it renders today move
into the header component; nothing else in the file changes.

`app/moduly/[module]/page.tsx` gets the `prose` class on a wrapper and **nothing
else**. Spec §9 says module pages inherit the treatment and that their
composition is not this slice's; the class is the inheritance, and the chevron
rows the design reference wants there belong to a later slice.

### 7. The reference page — `app/styleguide/page.tsx`

One new section, `className={styles.section + " prose"}`, carrying exactly what
spec §9 lists and nothing more:

- each heading level, `h2` through `h6`, with an `h3` named after a command so
  its inline code can be compared against the surrounding heading text
  (criterion 8);
- a bulleted list with bold lead-ins, and a numbered list with at least one item
  wrapping to three or more lines (criterion 12);
- a single-paragraph quotation, and a multi-paragraph quotation ending in an
  em-dash attribution line with a linked date (criteria 9 and 11);
- a table with an empty first header cell (criterion 13);
- a Polish sentence containing both `ą` and `ę` **inside the link text**
  (criterion 15);
- inline code in prose and inline code in a heading;
- a paragraph of real Polish prose dense with bold (criterion 16).

Specimen text is Polish, because Polish typography is what is being checked; the
section's labels stay English like the rest of that page. Six lessons do not
cover this — there is one table on the whole site and no lesson contains every
construct — which is the spec's own reason for the page.

Nothing here may print a colour value: 003's guard walks `app/`, and the
styleguide failing its own rule is a mistake this repo has already anticipated
once.

## Order of work

Sequenced so the build is green at every commit boundary, and so the two steps
most likely to fail — the measure and the letter — are reached early enough to be
argued about.

1. **Record the slice.** `plan.md` and `tasks.md` into the repository.
2. **Two widths.** `--measure`, `--content-width`, the rhythm scale and
   `--weight-strong` into `tokens.css`; `main` widened; `prose.css` created with
   the grid and the breakout only; imported in the layout; the class applied on
   the lesson and module routes. **Verify here that a top-level `<svg>` in MDX is
   a direct child of the prose column** — this plan asserts that
   `next-mdx-remote` does not wrap top-level JSX in a `<p>`, and if it does the
   breakout selector becomes `.prose > p:has(> svg)` and the rhythm rules follow
   it. Cheaper to find out now than in step 11.
3. **Count the measure.** Adjust `--measure` until a line of Polish body prose on
   a rendered lesson holds 60–75 characters. Counted, not computed (criterion 4).
4. **Rhythm.** The six gap rules, in the stated order. Criteria 5 and 6.
5. **Headings**, all six levels; inline code to `inherit`; `--weight-strong`.
   Criteria 7, 8, 16.
6. **Quotations**, including the `--rule-quote` rebinding. Criteria 9, 10, 11.
7. **Lists, tables, `hr`, `pre` containment.** Criteria 12, 13.
8. **Links.** Underline, offset, ogonek. Criteria 14, 15.
9. **The letter and the header.** `lib/numbering.ts`, the schema bound, the
   header component, the standfirst. Criteria 17, 18, 19.
10. **The reference page section.** Criterion 21.
11. **Verification pass**, written into
    `specs/004-lesson-typography/verification.md` as 003 did it: contrast
    recorded, the measure counted, every by-eye criterion judged on a rendered
    page at desktop and at 375px in both themes, and the six adjacency sequences
    of criterion 6 checked on the lessons that actually contain them.

Steps 3 and 11 are the ones that decide whether this slice worked. Everything
between them is mechanical.

## How the by-eye criteria get checked

Criteria 4, 9, 14, 15, 16, 18 and 20 are judgements on a rendered page, and 003
set the precedent that the judgement is recorded rather than skipped. The
methods, so the next session does not have to invent them:

| Criterion | Method |
| --- | --- |
| 4 — the measure | `Range.getClientRects()` over a paragraph's text node yields one rect per line box; characters per line are counted from the offsets, on at least three paragraphs from two different lessons. |
| 6 — adjacency | Computed `margin-top` read off each block on the lessons containing the sequence, and compared. Numbers, not impressions. |
| 10 — quoted contrast | The WCAG 2.x relative-luminance formula over `tokens.css`, as 003 did, cross-checked against 003's own table. |
| 14 — links without colour | Chromium DevTools → Rendering → *Emulate vision deficiencies: achromatopsia*, on a lesson and on the reference page. |
| 15 — the ogonek | Zoomed screenshot of a link containing `ą` and `ę`, both faces, both themes. |
| 16 — bold | A bold-dense paragraph from `co-model-naprawde-potrafi.mdx`, both themes, at 100%. |
| 18, 20 — 375px | Browser pane at 375×812; `document.documentElement.scrollWidth <= clientWidth` asserted, and every lesson read end to end. |

## Risks

| Risk | Signal | Response |
| --- | --- | --- |
| `next-mdx-remote` wraps a top-level `<svg>` in a `<p>` | The diagrams do not break out; the paragraph rules apply to them | Move the breakout to `p:has(> svg)`. Found in step 2 deliberately, not in step 11. |
| `--rule-table` is too faint even as a decorative separator | The table does not read as a table on the dark theme | Rebind `--rule-table` to `--text-muted` as well. A *new* value needs an ADR amending 0007 — do not retune a ratified token silently. |
| `display: block` on `table` renders badly somewhere | The one table loses its columns | Fall back to the `components`-map wrapper, and record the scope call in the journal. |
| `h2` and `h3` still read as one level | Criterion 7, by eye | The documented fallback: a hairline `border-top` on `h2`. Not a fourth size. |
| `--weight-strong` blooms on dark at every value that still reads as bold on light | Criterion 16, by eye | Lower the dark value further before touching anything else; the axis is continuous. If no value works, that is an ADR about the dark background, not a CSS fix. |
| A long unbreakable token in a lesson widens the page at 375px | Criterion 20 | `min-width: 0` on every grid child, `overflow-wrap` on prose. Never a `100vw` breakout. |
| A letter is derived from list position somewhere | Criterion 17 shows **a** for module 0 | It is a single exported function; nothing else may compute a letter. |

## What this plan does not do

Named so the closing review can check the diff against it: no code-block styling
beyond `overflow-x` and the vertical rhythm; no navigation, header bar,
breadcrumb, accent band, contents panel, prev/next or back-to-top; no MDX
component and no `components` map on `compileMDX`; no exercise numbering; no
change to any file under `content/`; no change to the diagrams' internals; no
semantic callout colours; no new colour value and no new hue; no dependency; no
change to `scripts/check-design-invariants.mjs`; no `prefers-color-scheme`.
