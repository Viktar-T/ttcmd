# plan.md — 024-module-marks

How the slice is built. The *why* is `spec.md` and is not repeated here.

Written in a fresh context from `constitution.md`, `AGENTS.md` and this slice's
`spec.md` only (AGENTS.md §2, autonomous mode), plus the source tree.

---

## 1. File map

### Created

| File | What it does |
| --- | --- |
| `components/marks.tsx` | The nine drawings and the lookup. Exports `ModuleMark({ slug })` — the drawing for a module folder, or nothing — and `CourseMark()`, the course's own. Server Components; no `"use client"`. Holds the eight square module marks keyed by folder slug and the one wide course mark. |
| `docs/adr/0015-illustrations-on-the-front-door.md` | Records the reversal of the design reference's "no illustrations" position, its reason, its scope (the front door and `/moduly`, nothing else), and what was rejected. Number claimed after listing `docs/adr/` — 0014 is the highest present. If a collision appears at commit time, this file is the later one and is renumbered per AGENTS.md §7. |

### Changed

| File | What changes |
| --- | --- |
| `components/module-grid.tsx` | The card's kicker becomes `Moduł {number}`; the `.moduleCardNumber` span is removed and `<ModuleMark slug={moduleItem.slug} />` takes its place, between the kicker and the title, inside the existing `<Link className="moduleCard">`. The header comment, which currently explains at length that this grid has **no illustrations**, is replaced by one that says what is now true and names ADR-0015. |
| `app/nav.css` | In the module-grid section: delete `.moduleCardNumber`, add `.moduleCardMark` (the mark's box and stroke convention) and the hover/focus recolour rules. In the landing-page section: `.hero` becomes the two-column band grid, a new `.heroText` takes the rules `.hero` carries today, and `.heroMark` is added. No new stylesheet and no new import in `app/layout.tsx`. |
| `app/page.tsx` | `<section className="hero">` loses `lane`; its three existing children move inside a `<div className="heroText">`; `<CourseMark />` is added as the hero's second child. |
| `docs/design-reference.md` | The three statements that ttcmd has no illustrations, will commission none, and must not have an agent generate filler are corrected in place, each with a dated note naming ADR-0015. The earlier position is marked as reversed, not deleted (Article II). |

### Deliberately not touched

`lib/` (no schema, no content model change), `content/` (Article IX forbids a
content commit touching `app/` or `lib/`, and this slice is the other way
round: an app slice has no business in `content/`), `components/band.tsx`,
`app/moduly/[module]/page.tsx`, `app/moduly/[module]/[lesson]/page.tsx`,
`package.json`, `next.config.ts`, `scripts/check-design-invariants.mjs`.

`app/moduly/page.tsx` needs **no edit**: it already renders the same
`<ModuleGrid>` component as `app/page.tsx`, so criterion 10 holds structurally
rather than by a second implementation.

`app/styleguide/page.tsx` needs **no edit** either, and that is load-bearing —
see §3.

---

## 2. Approach — how a drawing is represented

**Each drawing is an inline `<svg>` returned by a Server Component.** Eight
module marks share one square `viewBox="0 0 48 48"`; the course mark has its
own wider box. Every svg carries `fill="none"`, `stroke="currentColor"`,
`aria-hidden="true"`, the `width`/`height` attributes equal to its viewBox
units, and a class name; the geometry is `<path>`, `<circle>`, `<rect>` and
nothing else. The shared stroke convention — `stroke-width`, `stroke-linecap`,
`stroke-linejoin` — is set once in `app/nav.css` on the class, not repeated in
nine files.

Why this satisfies each of the four requirements:

- **(a) recolours on hover and keyboard focus.** `stroke="currentColor"` makes
  the strokes follow the CSS `color` of the svg element, so one declaration —
  `.moduleCard:hover .moduleCardMark, .moduleCard:focus-visible .moduleCardMark
  { color: var(--accent-line); }` — moves the whole drawing. The card already
  sets `color: var(--text)`, which is the resting state, and the card's frame
  rules gain the same `:focus-visible` selector alongside the `:hover` they
  have. No JavaScript, no state, no client component.
- **(b) carries no hard-coded colour.** The only colour words in the markup are
  `currentColor` and `none`; the only colour words in the CSS are `var(--text)`
  and `var(--accent-line)`. `scripts/check-design-invariants.mjs` Check B scans
  `app/`, `lib/` and `components/` for hex and functional colour notations and
  runs ahead of `next build`, so a literal that slipped into a drawing fails the
  build. The svg's own `stroke` attribute is the lowest-specificity place the
  colour can be stated, so the theme and the hover rule both win over it.
- **(c) no extra network request.** The markup is part of the page's HTML,
  produced by the same render that produces the cards. There is no `public/`
  directory in this repository today and this slice does not create one.
- **(d) a module without one falls back.** `ModuleMark` returns `null` for a
  slug it does not know. The card then renders kicker, title and count with the
  mark's slot simply absent; `.moduleCard`'s `min-height: 11rem` and
  `align-content: start` keep the card's shape.

Rejected representations:

- **`.svg` files under `public/`, referenced with `<img>` or
  `background-image`.** One request per card (fails c) and no way to reach the
  strokes from the page's CSS, because an external document does not inherit
  `currentColor` (fails a and b).
- **`.svg` files imported as components (SVGR or an equivalent loader).** Needs
  a dependency and a bundler rule; `spec.md` §*What this slice does not do*
  rules out a dependency, an image pipeline and a build step, and AGENTS.md §8
  makes a dependency an ADR of its own.
- **A CSS `mask-image` with a `data:` URI, coloured by `background-color`.**
  Recolours correctly, but puts nine drawings inside a stylesheet as
  percent-encoded text — unreadable, undiffable, and invisible to the Check B
  scan in any useful way.
- **One inlined `<symbol>` sprite plus `<svg><use href="#…">` per card.** Saves
  markup that is already small, and buys a document-order dependency between
  the sprite and its users plus a shadow-tree question about inherited
  `currentColor`, for nine drawings on two pages.
- **A Unicode glyph or an icon font.** Article III already requires every
  typeface to be verified for Polish; adding a face for pictures is a new
  font-loading problem for no gain, and the available glyphs do not depict the
  subjects `spec.md` names.

### The number's slot, and the card's height

`.moduleCardMark` is sized `calc(var(--text-3xl) * 1.75)` square with
`margin-block-end: 0.4rem` — the **same box** `.moduleCardNumber` occupied
(`font-size: calc(var(--text-3xl) * 1.75)`, `line-height: 1`, the same margin).
Written as the same expression rather than as a measured equivalent, so "card
height unchanged" is preserved by construction and verified by measuring, not
assumed. `justify-self: start` keeps the svg from stretching across the card's
grid column.

### The course mark and the hero

`.hero` drops `lane` and becomes a grid in the frame's content track — the
whole band, as the module grid below it already is. Its text moves into
`.heroText`, which takes over the rules `.hero` holds today (`display: grid`,
`justify-items: start`, `gap: 1.1rem`) plus `max-width: var(--measure)`, so the
heading, the lede and the button keep exactly the width and the left edge they
have. `.heroLede`'s `justify-self: stretch` and `.heroTitle`'s viewport-based
`clamp()` are not touched: the clamp reads `vw`, not its container, so the
name's size does not move.

`.heroMark` is `display: none` below a `min-width: 64rem` fold and a second
grid column above it. 64rem is the first fold where the leftover is a drawing
rather than a stamp: at 1024px the band is 992px and the measure 624px, leaving
328px after the column gap; at the grid's existing 48rem fold the same sum
leaves 112px. Above 88rem the measure widens to 47.5rem and the `1fr` column
absorbs the rest, with `max-width` on the mark keeping it from ballooning.

Hiding rather than reflowing below 64rem is what closes criterion 5's 375px
half outright: at a phone width the drawing is not laid out at all, so it can
neither push the name off screen nor force the clamp down. The cost is ~1 kB of
markup a phone does not paint, which is cheaper than any alternative that would
need JavaScript to decide.

---

## 3. Matching a module to its drawing

**By folder slug, in a lookup inside `components/marks.tsx`.** The eight keys
are the folder names as they stand in `content/moduly/`:

| Key | Subject (`spec.md`) |
| --- | --- |
| `00-start` | a flag on a post |
| `01-jak-powstaje-oprogramowanie` | two speech bubbles, one holding a caret |
| `02-warsztat` | a wrench and a screwdriver crossed |
| `03-budujemy` | blocks stacking into a window |
| `04-specyfikacja` | a document sheet inside a loop arrow |
| `05-twoja-aplikacja` | a lightbulb |
| `06-pod-maska` | a window with a cogwheel behind it |
| `07-testy-i-jakosc` | a magnifier over a checklist |

An unmatched slug renders nothing: `ModuleMark` returns `null`, the card keeps
its kicker, title and count, and the build does not care. **`tsconfig.json` does
not set `noUncheckedIndexedAccess`**, so a plain `Record<string, ReactElement>`
would type the lookup as always-present and the `null` branch would be
unreachable to the type checker while still being taken at runtime. The lookup
is therefore a `Map<string, ReactElement>` (`.get()` is `| undefined` under
`strict`), or a record whose value type is written `ReactElement | undefined`.
This is the one place in the slice where the fallback can be quietly wrong.

Rejected: **matching on `moduleItem.number`**. It reads more naturally and is
wrong here for a concrete reason already in the tree —
`app/styleguide/page.tsx` renders `<ModuleGrid>` from two invented specimen
modules, `07-przyklad` (number 7) and `08-drugi` (number 8). Under number
matching the first would silently borrow module 7's magnifier onto a specimen
whose whole purpose is to be unmistakably not content. Under slug matching both
specimens fall back — which means **`/styleguide` is a live, already-committed
exercise of criterion 7's fallback path, requiring no new fixture.**

Also rejected: **a `mark` field in the module frontmatter.** It would put the
choice of drawing in `content/`, where an app slice may not reach (Article IX),
make a missing one a Zod concern, and give a module two identities.

### The reading taken where the spec is ambiguous

Criterion 7 says an unmatched module "falls back to the card as it is today",
and criterion 2 says "the large accent-coloured module number is gone from the
card". For an unmatched module those cannot both be literally true: today's
card *is* the one with the large number. The plan reads criterion 7 as "renders
as an ordinary card, without error" and criterion 2 as unconditional — so
`.moduleCardNumber` is deleted outright and the fallback card is kicker, title
and count with an empty slot. The alternative reading — keep the large number
as the fallback treatment — would need `.moduleCardNumber` retained and a
conditional in the grid, and would leave criterion 2 false on exactly the cards
the styleguide renders. Flagged for Viktar in the final report; reversing it is
one commit either way.

---

## 4. Order of work

One task, one commit, `024/TNN:` prefixes (AGENTS.md §5).

1. **ADR-0015 and the `docs/design-reference.md` correction.** First, because
   every later commit contradicts that document until it is corrected, and
   because a run that stops early should leave the reversal recorded rather
   than a tree that quietly disagrees with its own reference. Independent of
   all code; closes criterion 12 on its own.
2. **`components/marks.tsx`** — the nine drawings and the lookup, imported by
   nothing yet. `npm run build` (Check B) and `npm run lint` both run over it
   while no layout has moved, so "do the drawings compile and carry no colour"
   is settled before "does the card still look right" is asked.
3. **The card** — `components/module-grid.tsx` and the module-grid section of
   `app/nav.css`. The number into the kicker, the mark into its slot, the
   hover and focus rules, `.moduleCardNumber` deleted. This is eight of the
   nine drawings and every criterion except 5 and 12.
4. **The hero** — `app/page.tsx` and the landing-page section of `app/nav.css`.
   One drawing and one layout decision, done after the card so that a
   regression in the hero's geometry cannot be confused with a regression in
   the grid's.
5. **Close the slice** — the full check set of §5, then the fresh-context diff
   review against `spec.md` that AGENTS.md §3 and constitution Article IX
   require, then the final report naming what only a human eye can close.

---

## 5. Verification

The rendered markup is read from a real server, not from `.next`: this tree
builds with Turbopack and leaves no `.html` in `.next/server/app`. Recipe —
`npm run build`, then `npx next start -p 3100` in the background, then
`curl -s http://localhost:3100/ > <scratch>/home.html` (Git Bash) or
`Invoke-WebRequest` (PowerShell), and likewise for `/moduly` and `/styleguide`.

| Criterion | Closed by |
| --- | --- |
| 1 — every published module has a drawing of its own, none repeated | `home.html`: eight `.moduleCardMark` svgs, one per card; compare the nine geometries pairwise for equality. |
| 2 — the large number is gone, the number still readable as text | `home.html`: no `moduleCardNumber` class anywhere; each card's first line reads `Moduł N`. `grep -n moduleCardNumber app/nav.css components/` returns nothing. |
| 3 — the drawing and the title open the same page | `home.html`: each `<svg class="moduleCardMark">` is a descendant of the card's single `<a href="/moduly/…">`, with no second `<a>` in the card. |
| 4 — hover and focus recolour the strokes | Markup half: the svg carries `stroke="currentColor"` and `app/nav.css` holds the `:hover` and `:focus-visible` rules for both the mark and the frame. **Behaviour half needs a human eye** — that it reads as a change rather than a flicker. |
| 5 — the course drawing beside the name at desktop; 375px clean | Browser at 1440px: the mark is to the right of the name. Browser at 375px: `document.documentElement.scrollWidth <= document.documentElement.clientWidth`, and the computed `font-size` of `.heroTitle` equals the value measured on `main` before the slice. **Needs a human eye** for "sits well beside the name" at the width Viktar works in. |
| 6 — no drawing carries a hard-coded colour | `npm run build` runs Check B over `app/`, `lib/`, `components/`. Plus, on the rendered page, a grep of `home.html` for `#[0-9a-f]{3,8}`, `rgb(`, `hsl(`, `oklch(` between `<svg` and `</svg>`, expecting no match. Both themes are then one fact, not two: `currentColor` has no per-theme value to check. |
| 7 — an unmatched module falls back, a ninth module is safe | `styleguide.html`: the two specimen cards (`07-przyklad`, `08-drugi`) render with no `.moduleCardMark` and the page builds. No new fixture is written for this. |
| 8 — no extra request, no layout shift | `home.html` contains no `<img>`, no `<use href=`, no `url(` for a mark; `ls public` confirms no asset directory exists. Every svg carries `width`/`height` attributes and a `viewBox`, so its intrinsic ratio is known from the first byte of markup. **The "no visible shift" half needs a human eye** on a real load. |
| 9 — silent to a screen reader, accessible name unchanged | `home.html`: every mark svg carries `aria-hidden="true"` and contains no `<title>`, `<desc>`, `role` or `aria-label`. The name itself is the card's concatenated text, and the number moved into the kicker rather than into a new element precisely so the same words stay in the same order: `Moduł` · `3` · title · count before, `Moduł 3` · title · count after. Whether the two compute to the identical string is a **spacing** question the accname algorithm answers per element, so it is read off the browser's accessibility inspector for one card at each of the two commits, not asserted from the markup. |
| 10 — the contents page shows what the front door shows | Structural: `app/moduly/page.tsx` and `app/page.tsx` render the same `<ModuleGrid>`. Confirmed by diffing the `<ul class="moduleGrid">` block of `moduly.html` against `home.html`. |
| 11 — build and lint | `npm run build` and `npm run lint`, output pasted into the task. |
| 12 — the reference no longer forbids illustrations; an ADR records it | `grep -n -i "illustration" docs/design-reference.md` shows every remaining statement is the corrected one; `docs/adr/0015-*.md` exists and names the rejected alternatives. |

**Cannot be closed without a human eye**, and to be named in the final report:
the hover reading as a change rather than a flicker (4); the course mark
sitting well beside the name at Viktar's own width (5); the absence of a
visible shift on a real load (8); and — beyond any criterion — whether nine
hand-drawn marks are *good*, which no command in this repository can answer.

---

## 6. Risks

- **Card height drifts.** Mitigated by giving the mark the number's exact box
  expression; still measured rather than assumed, because the number had
  `line-height: 1` on a glyph and the mark is a replaced element.
- **The hero loses its measure.** Dropping `lane` moves the hero into the
  81rem band; if `max-width: var(--measure)` or `justify-self: stretch` does
  not land on `.heroText`, the lede either stretches across the band or
  shrink-wraps to its text. Both are the exact failure slice 023 closed. Check
  the lede's rendered width against the measure at 1440px and at 375px.
- **The 64rem fold is a judgement.** Too low and the drawing crowds the name in
  a small laptop window; too high and it never appears on the machine Viktar
  uses. Verified at 1024px, 1280px and 1440px, not reasoned about.
- **Stroke weight at scale.** A stroke authored for a 48-unit box renders
  ~1.3× thicker at the card's 63px and thinner again in the hero. One
  `stroke-width` per class rather than one per drawing keeps that adjustable in
  two places.
- **The fallback type hole.** See §3: without `noUncheckedIndexedAccess`, a
  record lookup typechecks as always-present. A `Map` makes the missing case
  visible to the compiler.
- **Nine drawings is the bulk of the work and none of the checkable part.**
  The build can prove a mark is theme-safe and cannot prove it looks like a
  flag. Budget the review time there, not on the CSS.
- **Check B false negatives.** Its own header names two known gaps, one of
  which is CSS named colours: `stroke="white"` inside a drawing would pass the
  build and break the light theme. The grep in criterion 6 is run against the
  rendered markup for exactly that reason.
