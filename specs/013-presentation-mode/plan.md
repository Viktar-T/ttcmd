# plan.md — 013-presentation-mode

- **Slice:** 013
- **Date:** 2026-09-01
- **Provenance:** written from `constitution.md`, `AGENTS.md` and
  `specs/013-presentation-mode/spec.md` in a fresh context (AGENTS.md §2, "Two
  modes", requirement 1), then against the repository itself. Unlike slice 012's
  plan, every file name, selector and token name below is read off the tree
  rather than inferred, so nothing here is marked as a guess. Nothing here is
  approved: the spec is unapproved by construction and so is this.
- **Libraries:** none added, and none may be (AGENTS.md §8). Everything below is
  CSS, one `"use client"` button, four lines of inline script, three rows in an
  existing build check, and one block of specimens on a page that already
  exists. No dependency, no network request, no schema change.

---

## 1. The shape of the change

### 1.1 The attribute, the key, and what runs before first paint

**The attribute is `data-mode="presentation"` on `<html>`, and reading is its
absence.** Not `data-mode="reading"`: spec decision 2 makes reading the
unconditional rendering, and an attribute that has to *arrive* to say "reading"
is the promise about JavaScript that decision rejects. Rejected `data-presentation`
as a bare boolean attribute (the idiom `data-band` / `data-full-bleed` /
`data-external` already use): `data-mode` is what the spec calls it, it is the
exact sibling of `data-theme`, and a named value leaves room for a third mode
without a rename. It is reached in JS as `document.documentElement.dataset.mode`,
the same access `app/theme-toggle.tsx` already uses for `dataset.theme`.

**The storage key is `ttcmd-mode`**, beside `ttcmd-theme`, in `localStorage` —
spec decision 3, and the same store `app/layout.tsx` and `app/theme-toggle.tsx`
already read and write. It holds `"presentation"` or `"reading"`, mirroring the
theme key exactly (which stores both `"dark"` and `"light"` and only acts on
`"light"`). Writing `"reading"` rather than removing the key keeps the two
controls one shape; only `"presentation"` has any effect on render.

**The pre-paint mechanism already exists and is extended, not duplicated.**
`app/layout.tsx` holds one string, `applyStoredTheme`, injected as a classic
parser-blocking `<script>` in `<head>`. That script runs while the parser is
still in the head, before `<body>` is parsed and therefore before anything is
painted — the file's own comment records why this is a raw inline script and not
`next/script` (`beforeInteractive` is for external `src` scripts and does not
block hydration). The mode joins it:

```js
// app/layout.tsx — renamed from applyStoredTheme
const applyStoredPreferences =
  `try{var d=document.documentElement;` +
  `if(localStorage.getItem('ttcmd-theme')==='light')d.dataset.theme='light';` +
  `if(localStorage.getItem('ttcmd-mode')==='presentation')d.dataset.mode='presentation'}` +
  `catch(e){}`;
```

Three properties of that one line are load-bearing and must survive review:

1. **One script, still parser-blocking, still in `<head>`.** Two scripts would
   work; one is what the comment in that file already argues for.
2. **It only ever *adds* the attribute.** The server-rendered HTML carries
   `data-theme="dark"` and no `data-mode` at all, so the common case executes
   nothing and reading mode is what the served bytes already say.
3. **`try`/`catch` around the whole thing**, for the reason already written
   there: `localStorage` throws outright in some privacy modes, and neither a
   theme nor a mode is worth a blank page.

`<html>` already carries `suppressHydrationWarning`, which covers an attribute
this script adds to the element React owns. No new suppression is needed.

### 1.2 Reading mode: the unconditional reset

Spec §2 and criterion 3, and the spec's own "riskiest criterion". The UA
stylesheet gives `mark` `background-color: mark; color: marktext` — the browser's
yellow. It is removed **unconditionally, at element level**, in
`app/globals.css`, beside the other element-level defaults that file exists for:

```css
mark {
  background-color: transparent;
  color: inherit;
}
```

Not scoped under `.prose`, deliberately. The failure criterion 3 guards against
is a yellow fragment reaching a student on a public page, and the strongest form
of that guarantee is one that holds wherever a `mark` is written, not only where
this slice expects one. It is also, literally, an element-level default, which is
what `app/globals.css` says it is for.

`.prose mark` is never styled in reading mode at all — there is no reading-mode
rule to get wrong, because reading mode is the absence of one.

### 1.3 The lit fragment

New file **`app/presentation.css`**, imported last in `app/layout.tsx` (after
`tokens`, `globals`, `prose`, `nav`, `contents`). A file of its own, beside
`nav.css` and `contents.css`, for the reason those two record: plain global class
and element selectors, because every check in this slice is performed by reading
a rendered page and a hashed module class makes that harder for no gain.

```css
:root[data-mode="presentation"] .prose mark {
  background-color: var(--present-fill);
  color: var(--present-ink);
  box-shadow: 0 0 0 1px var(--present-line);
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  padding-inline: 0.18em;
  padding-block: 0.04em;
  border-radius: 0.08em;
}
```

- **`box-shadow`, not `border`, for the boundary.** A border on an inline box
  adds layout width and shifts the words around it when the mode is switched;
  a box-shadow of zero blur and 1px spread draws the same hairline and changes
  no geometry. Rejected `outline`, which `box-decoration-break` does not govern.
- **`box-decoration-break: clone` is criterion 6's wrapping case**, not a
  refinement. Its default, `slice`, gives a fragment that wraps across a line
  break one open-ended box — no boundary on the broken edges — which is exactly
  the "open-ended highlight" the criterion names. `clone` gives the background,
  the padding, the radius **and the box-shadow** to each fragment. The
  `-webkit-` prefix is still required by WebKit and costs one line.
- **The vertical padding is small on purpose.** At `--text-lg` (18px) and
  `--leading-normal` (1.6) a line box is 28.8px against a ~18px content box, so
  0.04em top and bottom leaves clearance between stacked highlights. Growing it
  is what makes two wrapped lines of highlight touch — the thing criterion 6
  looks for.
- **Scoped to `.prose`.** Spec §3 lights the prose and nothing else, and the
  chrome contains no `mark`.

**The marked link — criterion 7, and both nestings.** Markdown can write either,
and both were confirmed to compile: `[<mark>x</mark>](url)` produces `<a><mark>`
and `<mark>[x](url)</mark>` produces `<mark><a>`.

```css
/* <mark><a>…</a></mark> — the anchor's own colour rule would otherwise win. */
:root[data-mode="presentation"] .prose mark a {
  color: var(--present-ink);
}

/* <a><mark>…</mark></a> — the underline is drawn by the ANCHOR and painted in
   the anchor's colour, which the dim below has moved to --present-dim. A
   descendant cannot repaint decoration propagated from an ancestor, so the
   decorating box is what has to be selected. */
:root[data-mode="presentation"] .prose a:has(mark) {
  text-decoration-color: var(--present-ink);
}
```

Nothing removes the underline: `app/prose.css` sets `text-decoration-line:
underline` on `.prose a` unconditionally, with the ogonek clearance slice 004
computed, and this slice touches none of it. In the `<mark><a>` case the anchor's
`text-decoration-color` is `currentColor`, so setting `color` above carries the
underline with it and no second rule is needed.

### 1.4 The dim, and why one declaration is not enough

Spec §3, decision 7, criterion 5.

```css
:root[data-mode="presentation"] .prose:has(mark) {
  --text: var(--present-dim);
  --text-muted: var(--present-dim);
  --link: var(--present-dim);
  color: var(--present-dim);
}
```

**Both halves are required, and this is the single most likely thing to get
wrong.** A custom property is substituted where it is *used*. Ordinary paragraph
text has no `color` declaration of its own — it inherits the *computed* colour
from `body { color: var(--text) }` in `app/globals.css`, resolved at `body`.
Rebinding `--text` on `.prose` therefore does **nothing** to a paragraph. The
`color:` declaration is what dims inherited text, including every diagram drawn
in `currentColor`; the three rebindings are what dim the things that *do* read a
token inside the prose:

| reads it | where | dims via |
| --- | --- | --- |
| ordinary prose, headings h1–h5, `code` (`color: inherit`) | inheritance | `color:` |
| the five inline diagrams and `<Rysunek>`'s SVGs (`currentColor`) | inheritance | `color:` |
| `blockquote` | `app/prose.css` `color: var(--text)` | `--text` |
| `<Cytat>` body and attribution | `components/quote.module.css` | `--text`, `--text-muted` |
| `h6`, `li::marker`, `thead th` border, figure caption, reference rows | `app/prose.css`, `figure.module.css`, `reference-list.module.css` | `--text-muted` |
| links in prose | `app/prose.css` `color: var(--link)` | `--link` |

`--text-muted` is rebound even though `--present-dim` is bound *to* it and the
rebinding is a no-op today. It is there so the rule stays correct on the day the
spec's own reviewer note fires and the dim token moves — "if it is not, the token
moves and the build re-checks the floor". Structural rather than remembered, as
Checks C, D and E already are.

**`:has(mark)` is what satisfies §4 and criterion 8** — a page with no marked
fragment is not dimmed, and no page-type list has to be maintained to make that
true. The home page and the module grid have no `.prose` at all; a module page
has one and it contains no `mark`; a lesson that has not been marked up yet has
one and it contains no `mark`. All three are unchanged by construction. On the
reference page, which has several `.prose` blocks, only the one carrying
specimens dims — which conveniently leaves the others beside it as an unlit
control.

**What deliberately does not dim, and why no rule is needed to protect it:**

- **The chrome** — header, band, breadcrumb, contents panel, `LessonHeader`'s
  `h1`, disclosure, pager, back-to-top (decision 12). Every one of them is
  outside `.prose` in `app/moduly/[module]/[lesson]/page.tsx`, so the selector
  never reaches them.
- **Code blocks** (decision 11). They sit inside `.prose`, but every visible
  thing in `components/code-block.module.css` sets its own colour from the
  `--code-…` palette — `.pre` sets `--code-foreground`, each token span sets its
  own, the copy control and the filename set `--code-token-comment`. Nothing in a
  code block inherits `color`, so a dimmed ancestor cannot reach it. Verified by
  reading that file; **confirm it by measurement in T03** rather than trusting
  this paragraph, and if something does leak, fix it with one explicit reset —
  never with a second palette.
- **`--rule`, `--rule-strong`, `--rule-quote`, `--rule-table`, and the exercise's
  accent badge.** These are the *frames* of blocks a reader steps out of the
  prose to look at, not the prose itself. `--rule-quote` is `var(--text-muted)`
  resolved at `:root`, so it does not follow the rebinding — and today that is
  invisible, because `--present-dim` is the same value. See §4.6.
- **`--accent-line` / `--accent-surface` inside the prose.** Not rebound.
  Decision 7 names *text* tokens, and the accent inside a lesson's prose is what
  a diagram uses to point at the thing being talked about; dimming it would dim
  the emphasis a diagram makes for itself, which §8 says is the diagram's own
  job. Recorded as a decision, not an oversight; §4.4 is the risk.

### 1.5 The control

Two new files, named as exact siblings of the theme control (which lives in
`app/` and is imported by `components/site-header.tsx` — an odd home, but it is
the convention this repo has):

- `app/presentation-toggle.tsx` — **the slice's only `"use client"` file**
  (criterion 14).
- `app/presentation-toggle.module.css`.

```tsx
"use client";

export function PresentationToggle() {
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => {
        const root = document.documentElement;
        const next =
          root.dataset.mode === "presentation" ? "reading" : "presentation";
        if (next === "presentation") root.dataset.mode = "presentation";
        else delete root.dataset.mode;
        try {
          localStorage.setItem("ttcmd-mode", next);
        } catch {
          // A private-mode browser can refuse storage. The mode still changes
          // for this page; it simply is not remembered.
        }
      }}
    >
      <svg className={styles.icon} /* … */ aria-hidden="true" />
      <span className={`${styles.name} ${styles.nameOn}`}>
        Włącz tryb prezentacji
      </span>
      <span className={`${styles.name} ${styles.nameOff}`}>
        Wyłącz tryb prezentacji
      </span>
    </button>
  );
}
```

- **`delete root.dataset.mode`, never `= "reading"`.** That is decision 2 made
  operational, and it is also what makes criterion 9's "pressing it twice returns
  the page to its exact initial rendering" true of the DOM and not only of the
  pixels: after two presses the attribute is absent again, exactly as served.
- **No React state, no `useEffect`, no `aria-pressed`.** The theme control's file
  already explains why state is wrong here — it would have to be initialised to
  something on the server, and that something is wrong for anyone who chose the
  other value. Decision 8 rejects `aria-pressed` for the same reason: it cannot
  be correct before hydration.
- **The accessible name is two Polish phrases, one removed by CSS.** Both spans
  carry the repo's standard clip pattern (identical to `.announcement` in
  `components/code-block.module.css` and `components/prose-link.module.css`), so
  neither is drawn; the inactive one is `display: none`, which removes it from
  the accessibility tree, so the button's computed name is exactly one phrase.
  The swap is CSS keyed off `:root[data-mode]`, the same mechanism as the theme
  control's sun/moon swap, so it is right before hydration and right with
  scripting disabled.
  - reading → **"Włącz tryb prezentacji"** · presentation → **"Wyłącz tryb
    prezentacji"**. Each names the direction the control will move the site
    (spec §5), each is a phrase a fourth-year student reads without being told
    the mode exists, and *tryb prezentacji* is the same word a projector-facing
    mode is called in Polish everywhere else.
- **One icon, filled when on** (decision 9). The icon is a screen on a stand —
  a rounded rectangle with a short stem and a base line — drawn in the theme
  control's exact idiom so the pair reads as one set: `viewBox="0 0 24 24"`,
  `width`/`height` 18, `fill="none"`, `stroke="currentColor"`,
  `strokeWidth="1.6"`, `aria-hidden="true"`.

```css
/* app/presentation-toggle.module.css — the geometry is the theme control's,
   copied rather than shared: two 2.25rem squares beside each other must not
   drift, and one shared class across two files in two directories is a worse
   coupling than eleven duplicated declarations. */
.toggle {
  position: relative;           /* the clip pattern is absolutely positioned */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  color: var(--text-muted);
  background: var(--bg);
  border: 1px solid var(--rule);
  border-radius: 0;
  cursor: pointer;
}

.toggle:hover { color: var(--text); border-color: var(--accent-line); }
.toggle:focus-visible { outline: 2px solid var(--accent-line); outline-offset: 2px; }

/* THE ON STATE — spec §4 and §5. On a page with no marks this is the only
   evidence the mode is on, so it is a filled control in the mode's own three
   colours, not a hover affordance and not a comparison. */
:root[data-mode="presentation"] .toggle {
  background: var(--present-fill);
  border-color: var(--present-line);
  color: var(--present-ink);
}

:root[data-mode="presentation"] .toggle:hover { border-color: var(--present-ink); }

.name { /* the repo's clip pattern, verbatim */ }
.nameOff { display: none; }
:root[data-mode="presentation"] .nameOn { display: none; }
:root[data-mode="presentation"] .nameOff { display: inline; }
```

The filled control needs no new token and clears its own floors from the three
this slice already computes: the icon is `--present-ink` on `--present-fill`
(10.05:1, §1.6), the border is `--present-line` against the page (3.67:1 in both
themes), and the focus ring is drawn outside the button on `--bg`, where Check E
already holds `--accent-line` at 4.5:1.

**The header slot.** `components/site-header.tsx` gains one import and one
wrapper. `.siteHeaderInner` is `display: flex; justify-content: space-between`,
so a third child would spread the row; the two controls go in one box:

```tsx
<div className="headerControls">
  <PresentationToggle />
  <ThemeToggle />
</div>
```

```css
/* app/nav.css, in the site-header block */
.headerControls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
```

Presentation first, theme second: the theme control has been the rightmost thing
on the page since slice 003 pinned it to the corner, and moving it is a change
this slice was not asked to make (out of scope: "retro-fitting the theme
control"). `site-header.tsx` stays a Server Component.

### 1.6 The tokens, and where each value comes from

Four names, ASCII, added to **`app/tokens.css`** — the only file allowed to hold
a colour literal — in one new flat block on **bare `:root`**, at the end of the
file after the code palette:

```css
:root {
  --present-fill: #6e1c1c;
  --present-ink: #f8efec;
  --present-line: #ca604e;
  --present-dim: var(--text-muted);
}
```

**Two structural rules on that block, both enforced by machinery that already
exists in `scripts/check-design-invariants.mjs`:**

1. **Flat, on bare `:root`, never nested and never inside `@media`.**
   `readTokenBlocks()` measures brace depth first and *refuses to answer* if
   `app/tokens.css` nests, which would fail Checks D and E outright.
2. **No `[data-mode]` block ever enters `app/tokens.css`.** Check E enumerates
   themes by looking for `[data-theme` in a selector; a token redefined under
   `[data-mode]` would be a colour the build reports on and the site does not
   use. The mode's own rules live in `app/presentation.css` and rebind tokens on
   `.prose`, never on `:root`.

`--present-fill`, `--present-ink` and `--present-line` are **defined once and not
repeated under `[data-theme]`** — that is decision 4 ("identical in both
themes") expressed as a property of the file. `--present-dim` is a `var()` alias
of `--text-muted`, which *is* per-theme, and that is decision 6: the dim is the
token that already means "quieter", so no new hue enters for it and it is above
the body floor in both themes by construction.

**The arithmetic, computed against `--bg` = `#2a2926` (dark, bare `:root`) and
`#f7f6f2` (light), with the WCAG 2.x formula `scripts/check-design-invariants.mjs`
already implements:**

| pair | floor | dark | light | why this value |
| --- | --- | --- | --- | --- |
| `--present-ink` on `--present-fill` | 4.5 | **10.05** | **10.05** | identical in both themes by construction — both tokens are theme-independent, which is what makes the two report lines the *evidence* for decision 4 |
| `--present-line` on `--bg` | 3.0 | **3.67** | **3.67** | see below |
| `--present-dim` on `--bg` | 4.5 | **5.86** | **6.34** | it is `--text-muted`, unchanged since slice 003 |
| `--present-fill` on `--bg` | *none* | 1.28 | 10.52 | §7's deliberate absence — a fill dark enough to be dark red is by arithmetic close to a near-black page |

**Where `--present-line` comes from, exactly.** A single value that clears 3:1
against *both* a near-black and a near-white page is confined to a narrow
luminance band: it must sit above `3(L_dark + 0.05) − 0.05 = 0.1665` and below
`(L_light + 0.05)/3 − 0.05 = 0.2737`. The point where the two ratios are equal is
`L = √(0.0722 × 0.9710) − 0.05 = 0.2148`, giving **3.67:1 on both** — the best the
worse of the two can be. That is the identical construction `--rule-strong`
(`#83807a`, 3.69 / 3.64) already uses and records in the token file, arrived at
independently here; `#ca604e` is a brick red sitting on that optimum. It reads as
a lighter member of the fill's own family, which is what makes the boundary
belong to the highlight rather than look like a generic outline.

**The exact hue within that band is the implementer's to pick and Viktar's to
veto**, through the ADR of §1.9 — not the plan's to fix. What the plan fixes is
the *derivation*: the fill is a dark red held to no floor, the ink is a warm
off-white above 4.5:1 on the fill, and the boundary sits in the 0.1665–0.2737
luminance band with its hue taken from the fill. Any triple satisfying that
passes; the three above are one that provably does, so nobody has to search.

`--present-ink` is a fresh literal rather than an alias. `--text` is per-theme
and `--accent-ink` is near-black, so neither can serve; `--code-foreground` is
theme-independent and near-white but belongs to a palette Check D governs, and
borrowing it would couple the classroom highlight to the code surface for no
gain.

### 1.7 The build check — three rows in Check E

`scripts/check-design-invariants.mjs`, the `CONTRAST_FLOORS` array, **appended at
the end** so every line the report already prints keeps its position and value
(criterion 2's "every pair the report already carried is unchanged"):

```js
{ foreground: "--present-ink",  background: "--present-fill", floor: 4.5, what: "text on the presentation highlight" },
{ foreground: "--present-line", background: "--bg",           floor: 3,   what: "the highlight's boundary against the page (WCAG 1.4.11)" },
{ foreground: "--present-dim",  background: "--bg",           floor: 4.5, what: "dimmed prose in presentation mode" },
```

That is the whole change to the script. Everything criterion 2 asks for is
already there and needs nothing new:

- **"computed for both themes"** — `checkContrastFloors()` already loops every
  theme it finds in the file and merges `:root` under each, so three rows become
  six report lines.
- **`--present-dim` resolves through its alias** — `resolve()` follows a bare
  `var(--x)` recursively *inside the merged theme map*, so `--present-dim` reads
  `--text-muted` per theme and reports 5.86 / 6.34, not one value twice.
- **The fill is absent from the table on purpose**, and the token file's comment
  beside it must say so in one sentence, because a missing row is exactly the
  shape of an oversight. §7 is the argument; the ADR is where it is recorded.

Two constraints the new values inherit: `resolve()` accepts only `#rgb`,
`#rrggbb` or a single `var()` alias — **no `color-mix()`, no `rgb()`, no
`oklch()`** in these four declarations, or Check E stops with "not a hex literal
or a var() alias". And Check B is satisfied because every literal is in
`app/tokens.css`, its single exemption.

### 1.8 The specimen surface

`app/styleguide/page.tsx` — the permanent reference page, decision 14, which
already carries the code, exercise and sourcing specimens for exactly this
reason and states in its own header comment that deleting it would make a
slice's evidence unreproducible.

**A new `PRESENTATION_SPECIMENS` Markdown constant, compiled with
`compileProse`** the way `CODE_SPECIMENS`, `EXERCISE_SPECIMENS` and
`SOURCE_SPECIMENS` are — through the real pipeline, so `remark-gfm`, the section
anchors, the link classifier and the components map all run on it (§9: "compiled
through the real content pipeline"). It is rendered in one new `<section
className={styles.section}>` inside a `<div className="prose">`, with an English
label like every other block on that page and Polish specimen text, because
Polish is what is under test.

The constant carries **one specimen of every case in §8**, and all six were
confirmed to compile to a real `<mark>` element:

| §8 case | how it is written |
| --- | --- |
| ordinary prose | a paragraph with a marked clause mid-sentence, long enough to **wrap a mark across a line break** at the measure (criterion 6) |
| a heading | `#### Nagłówek z <mark>wyróżnieniem</mark>` — `####`, matching the file's existing specimens, so no `h2` anchor is minted |
| a link | **both nestings**: `[<mark>…</mark>](url)` and `<mark>[…](url)</mark>`, to an external URL the page already publishes (`https://fullstackopen.com/en/`), so no new claim about the world enters (Article V) |
| a quotation | a Markdown `>` blockquote with a marked clause — slice 004's treatment, not `<Cytat>`, which would need an author, a source and a date it does not have |
| a list item | one marked item in a `-` list, beside two unmarked ones |
| a table cell | a GFM table whose body has one marked cell and one plain one |

Around them, **unmarked Polish prose in the same block**, which is what
criterion 5 measures the dim against, and at least one `ą`/`ę` inside a mark so
the underline-and-ogonek work of slice 004 is visible under a fill.

Also on that page, in the same task: **three swatch rows** for `--present-fill`,
`--present-ink` and `--present-line` in the existing `TOKENS` array, with three
`.chipPresentFill` / `.chipPresentInk` / `.chipPresentLine` classes in
`app/styleguide/page.module.css`. The page's contract is that the colour system
can be re-checked after any later slice touches it; three tokens entering the
palette and not appearing there would quietly break that. Names only — the page
must never print a value, or it trips Check B on itself.

**What this specimen block does *not* get: a control of its own.** The header's
control is on every page including this one, which is the whole point of §4.

### 1.9 ADR-0013

Spec decision 16. `docs/adr/0013-presentation-mode-palette-and-attribute.md`.
**0013 is the next free number**: `docs/adr/` was listed and ends at
`0012-structural-rule-value.md` (AGENTS.md §7 — the number space is shared, so if
`0013` has appeared by the time this is written, take the next free one, record
the renumber in the file's own header, and leave earlier commit messages alone).

It records two things and their rejected alternatives:

- **The palette** — the three literals, the arithmetic of §1.6, the two floors
  they clear and **the one floor the fill is deliberately not held to**, with
  §7's argument; rejected: lightening the fill to clear 3:1 on dark, which stops
  being the dark red Viktar chose.
- **The mode attribute** — `data-mode="presentation"` on `<html>`, absent for
  reading, persisted at `ttcmd-mode`, applied by the same pre-paint script as the
  theme; rejected: a third `data-theme` value, a `data-presentation` boolean, and
  a session-only store.

It is the first colour in this palette that carries a semantic load, which is
why the spec asks for a record rather than letting a red be discovered in a token
file later.

---

## 2. File map

Twelve files. No file under `content/`, no `package.json` change, no new
dependency, no `lib/` change, no schema change (criterion 14).

| File | New? | Change |
| --- | --- | --- |
| `app/tokens.css` | | one flat `:root` block: `--present-fill`, `--present-ink`, `--present-line`, `--present-dim`, with the arithmetic and the deliberate absence of a fill floor in the comment beside them |
| `scripts/check-design-invariants.mjs` | | three rows appended to `CONTRAST_FLOORS` (§1.7). Nothing else in the file moves |
| `app/globals.css` | | the unconditional `mark` reset (§1.2), beside the other element-level defaults |
| `app/presentation.css` | **new** | the whole of the mode: the lit fragment, the two link rules, the dim on `.prose:has(mark)` |
| `app/layout.tsx` | | `import "./presentation.css"` last; `applyStoredTheme` renamed to `applyStoredPreferences` and extended with the `ttcmd-mode` line (§1.1) |
| `app/presentation-toggle.tsx` | **new** | the control. **The slice's only `"use client"` file** |
| `app/presentation-toggle.module.css` | **new** | the control's box, its on state, and the two-phrase name swap |
| `components/site-header.tsx` | | one import, one `.headerControls` wrapper around the two controls. Stays a Server Component |
| `app/nav.css` | | `.headerControls` in the site-header block |
| `app/styleguide/page.tsx` | | `PRESENTATION_SPECIMENS`, its `compileProse` call, one `<section>`, three rows in `TOKENS` |
| `app/styleguide/page.module.css` | | three chip classes |
| `docs/adr/0013-…md` | **new** | §1.9 |
| `specs/013-presentation-mode/tasks.md` | **new** | §3, written before any code (Article IX) |

Expected untouched, and each is worth confirming with `git diff --stat` at T08:
`app/prose.css` (slice 004's treatment is not edited — the mode rebinds the
tokens it reads, which is decision 7's whole point), `app/contents.css`,
`components/code-block.module.css`, everything under `lib/`, everything under
`content/`, `package.json`.

---

## 3. Order of work

One task, one commit, `013/TNN:` (AGENTS.md §5). The order is chosen so that the
riskiest unknown is settled first and every commit leaves the tree green.

### T01 — `tasks.md`

The ordered list below, written before any code. **Check:** the file exists and
every task is objectively checkable.

### T02 — The reset, and somewhere to see it

`app/globals.css` gains the `mark` reset; `app/styleguide/page.tsx` and
`app/styleguide/page.module.css` gain the specimen block of §1.8 (without the
three swatch rows, which have no tokens to point at yet).

First, because **it is where the pipeline can still surprise this slice.** Six
constructs have to survive `remark-gfm`, the section-anchor walk, the link
classifier and the components map. All six were confirmed at plan time by
compiling them, and two facts came back worth carrying:

- **MDX emits `<mark>` as a literal element**, not through `_components`, so the
  map in `lib/content.ts` is irrelevant to it and nothing has to be added there.
  §9's "no new element, no import for an author to remember" is already true.
- **`textOf()` in `lib/section-anchors.ts` recurses into children**, so a mark
  inside an `h2` contributes its words and the anchor is byte-identical to the
  unmarked heading. Bookmarked URLs cannot move when a lesson is marked up.

**Check:** `npm run build` and `npm run lint` clean. Open `/styleguide` in both
themes: every marked fragment has the same colour, background, weight and
decoration as the text beside it, and nothing on the page distinguishes one.
Compare against the same block with the marks deleted if there is any doubt.
**Closes:** criteria 3 and 4 (nothing yet reads storage or scripting, so the
default is reading by construction).

### T03 — The tokens and Check E

`app/tokens.css` and `scripts/check-design-invariants.mjs`, plus the three swatch
rows on the reference page now that the tokens exist.

**Check:** `npm run build` prints six new contrast lines — three pairs × two
themes — all above their floors, and every line the report carried before is
unchanged. Diff the report against the output captured before T02. **Closes:**
criterion 2.

### T04 — The mode's stylesheet

`app/presentation.css` and its import. No control yet: the mode is reached by
setting `document.documentElement.dataset.mode = "presentation"` in devtools,
which is also the honest way to check that the CSS is right independently of the
button.

**Check**, on `/styleguide`, in both themes, in both modes:

- every mark carries the fill, the ink and a visible boundary (criterion 5);
- the unmarked prose in the same block is measurably dimmer — read
  `getComputedStyle(p).color` in both modes and confirm it moves from `--text` to
  `--present-dim` (criterion 5);
- the heading, link, quotation, list-item and table-cell specimens each render
  with no clipped, overlapping or invisible text, and **the wrapping specimen is
  a complete highlight on each line** (criterion 6);
- both link nestings keep their underline and take the ink (criterion 7);
- the code-block specimens are untouched in both modes — compare
  `getComputedStyle` on a token span, the copy control and the filename;
- `/`, `/moduly` and a module page render identically in both modes, in both
  themes (criterion 8).

**Closes:** criteria 5, 6, 7, 8.

### T05 — ADR-0013

Written now, when both subjects are real in the tree. **Check:** the file exists,
carries the values that are actually in `app/tokens.css`, and names a rejected
alternative for each decision.

### T06 — The control

`app/presentation-toggle.tsx`, `app/presentation-toggle.module.css`,
`components/site-header.tsx`, `app/nav.css`.

**Check:** it sits beside the theme control on every page type; the accessible
name is Polish and names the direction — read it out of the browser's
accessibility inspector in **both** states, not out of the source; the on state
is visible on `/moduly`, which has no marks; pressing it twice returns
`document.documentElement.outerHTML`'s attribute list to what was served.
**Closes:** criterion 9.

### T07 — Persistence, before the paint

The `app/layout.tsx` script of §1.1.

**Check:** choose presentation on one page, navigate to another, reload — still
in force (criterion 10). Switch theme in both modes and switch mode in both
themes: all four combinations render and neither control moves the other
(criterion 12). `curl` the served HTML of a lesson page and confirm the script is
in `<head>` before `<body>`, and that the served markup carries no `data-mode`.
**Closes:** criteria 10 and 12.

### T08 — The sweep

No code unless something fails. `npm run build`, `npm run lint`,
`npm run check:content`. `git diff --stat` against the slice's base: no path
under `content/`, no `package.json`, exactly one file containing `"use client"`.
Grep the diff for `fetch`, `http`, and any colour literal outside
`app/tokens.css` (Check B does the last one, but read it anyway). **Closes:**
criteria 1 and 14.

### T09 — Fresh-context review

The diff against `spec.md`, in a fresh subagent context (AGENTS.md §3,
Article IX). **Closes:** criterion 15.

### Not closed by this run

**Criteria 11 and 13 stay unchecked, together.** Criterion 13 is a projector and
a human eye by its own words, and criterion 11 routes its confirmation into 13
("*Criterion 13 covers the eye that has to confirm this*"). AGENTS.md §3 forbids
checking either box. The final report must say:

- **what to open** — a lesson page will have no marks on the day this ships, so
  it is `/styleguide`, the presentation-specimen block, on the projector, with
  presentation mode stored and the page hard-reloaded;
- **what to look at** — (a) whether the lit fragments carry from the back of the
  room, (b) whether the dim is enough of a step down at ten metres, (c) whether
  the page ever paints undimmed for a frame on that reload, on both themes;
- **what moves if the answer is no** — the token, and the build re-checks the
  floor. `--present-dim` is at 5.86 / 6.34 against a 4.5 floor, so there is room
  to go dimmer, and the floor is where it stops.

---

## 4. Risks

### 4.1 The rebinding that does nothing — §1.4's two halves

**The likeliest way this slice ships half-broken.** Writing only
`--text: var(--present-dim)` on `.prose:has(mark)` and stopping there dims
`blockquote`, `h6`, list markers and links — everything with an explicit
declaration — and leaves **every ordinary paragraph at full brightness**, because
a paragraph inherits a computed colour from `body` and never uses the token. The
page then looks *almost* dimmed, which is worse than not dimmed, and a reviewer
looking at a lesson full of quotations and lists could miss it.

What reveals it: read `getComputedStyle` on a plain `<p>` in both modes, not on
the container and not on a quotation. That check is written into T04 for this
reason.

### 4.2 Criterion 3, and the browser default that survives

The spec's own riskiest criterion, and its failure is silent on a public page.
Two ways it comes back:

- Someone later scopes the reset under `.prose`, and a `mark` written anywhere
  else goes yellow. Hence element-level in `app/globals.css` (§1.2).
- **Forced-colors mode** (Windows high contrast — plausible on a school machine)
  replaces `mark`'s colours with system ones regardless of author styles. That is
  true of the entire site's palette, not of this element, and nothing in this
  slice can or should override it. Named so it is not mistaken for a defect.

### 4.3 `:has()` and the diagram that is not HTML

`.prose:has(mark)` is the mechanism for §4 and criterion 8, and it has one edge
worth knowing. §8 forbids a mark inside a diagram and says the words silently
disappear there. CSS type selectors match by local name without regard to
namespace, so a `<mark>` inside an inline `<svg>` **would** match `:has(mark)`:
the prose would dim and nothing would light. That is the forbidden case failing
slightly *louder* than §8 predicts — a dimmed page with no highlight is visible,
where vanished words might not be — so it is an improvement rather than a bug,
but it is not what §8 describes and it should not surprise the next reader.

`:has()` itself is supported everywhere this site runs and needs no fallback;
if it were ever unsupported the rule would simply not match, and the page would
render in reading mode. The failure direction is safe.

### 4.4 The accent inside dimmed prose

§1.4 decides not to rebind `--accent-line` / `--accent-surface`, so a diagram's
accent strokes and an exercise's accent badge keep full strength inside a dimmed
passage. The argument is that a diagram's own emphasis is the diagram's job
(§8). The risk is the opposite reading: on a projector, a pale lilac accent
beside a dark red highlight may be the thing the class looks at. Nobody can
settle that from a laptop — it belongs with criterion 13, and the fix if it is
wrong is one more line in the same rule.

### 4.5 The accessible name, swapped by CSS

Toggling `display: none` between two spans changes the button's computed
accessible name with no DOM mutation of the button itself. Browsers recompute
the name on a subtree change, and this is the same mechanism as the theme
control's icon swap — but the theme control's name never changes, so this slice
is the first to depend on it. **Verify with the browser's accessibility
inspector in both states**, and with a screen reader if one is to hand; do not
infer it from the markup. If a reader turns out to cache the name, the fallback
is not `aria-label` (which needs state, which needs hydration, which is what
decision 8 rejects) — it is to report it, because the alternatives all reopen a
decision the spec took.

### 4.6 The quotation's rule, if the dim token ever moves

`--rule-quote: var(--text-muted)` is declared on `:root`, so it resolves there
and does not follow a rebinding on `.prose`. Today that is invisible, because
`--present-dim` *is* `--text-muted` and the two are the same colour. The day
criterion 13's eye says the dim is not enough and `--present-dim` moves off
`--text-muted`, a quotation's 2px rule stays at the old value and the block stops
matching its own text. One line in the same rule fixes it; it is written here so
the person moving the token finds it.

### 4.7 The header at 375px

`.siteHeaderInner` is a flex row with `padding: 0.75rem 1rem` inside a lane one
`--measure` wide. It gains a second 36px control and 0.5rem of gap — 44px more on
the right. The wordmark is two monospace characters at `--text-xl` and the row
has `gap: 1rem`, so there is room, but it has never been measured with three
things in it. Check it at 320px as well as 375px, and confirm no horizontal
scrollbar appears (`scrollWidth === clientWidth`).

### 4.8 Check E's theme enumeration

Check E finds themes by `selector.includes("[data-theme")`. If a later hand adds
`:root[data-mode="presentation"]` to `app/tokens.css`, the tokens in it are
invisible to Check E — reported for neither theme, held to no floor. §1.6 forbids
it and the token file's comment must say why. **There is no check enforcing that
today**, and there is likewise no check enforcing that `--present-fill`,
`--present-ink` and `--present-line` are never redefined under `[data-theme]`,
which is decision 4's invariant. Check D does exactly that job for the `--code-`
prefix and would extend to a `--present-` prefix in about ten lines. The spec
asks for three floors and does not ask for this, so it is **not in the task list**
— it is named here as the obvious next check if that invariant ever matters
enough.

---

## 5. Was the spec sufficient

Blunt, as asked. **Yes — the plan above was written from the spec without a
question that had to be guessed at.** The spec fixes the attribute's semantics
(decision 2), the storage (decision 3), the palette's structure (decisions 4, 5,
6), the dim's mechanism (decision 7), the control's naming and its on state
(decisions 8, 9), what does not dim (decisions 11, 12), where the specimens live
(decision 14), and it states the three floors and the one deliberate absence
precisely enough to compute values from. Everything §1 decides beyond that —
selectors, file names, token names, the icon, the header wrapper, the order of
work — is implementation, which is the plan's to decide.

Four things were left open. None of them blocked the plan; all four are recorded
here so Viktar can see what was filled in on his behalf.

1. **§3 says "The lit fragment must look the same in both themes", and §7 says
   the fill is held to no floor against the page.** Taken literally the two pull
   against each other: the same dark red fill is 1.28:1 against the dark page and
   10.52:1 against the light one, so on the dark theme the class sees an outlined
   fragment with light text and on the light theme a solid dark red block. This
   plan reads §3 as decision 4 operationalises it — *the same three colours in
   both themes*, with the boundary carrying the shape (decision 5) — because
   decisions 4 and 5 are unambiguous and §3's sentence is a paraphrase of them.
   If Viktar meant "indistinguishable to the eye in both themes", that is not
   achievable with one theme-independent fill and the spec would have to change.

2. **The exact colours are not given, only "dark red" and three floors.** The
   plan computes a triple that provably clears every floor and shows the
   derivation (§1.6), but the hue is a visual-identity choice and AGENTS.md §4
   puts those with Viktar. Treated as: the plan fixes the *derivation*, ADR-0013
   records the *values*, and Viktar vetoes there. No question was escalated,
   because the spec's own preamble says the dark red was already his call and the
   plan is not entitled to re-open it.

3. **"The prose recedes" is not defined at its edges.** §3 dims "the prose" and
   decision 7 names *text* tokens; it says nothing about rules, borders, or the
   accent inside the prose — an exercise's accent badge, a diagram's accent
   strokes, a quotation's 2px rule, a code block's frame. The plan decided:
   text dims, frames and the accent do not (§1.4), on the grounds that decision 7
   says "text tokens" and decision 12 keeps the furniture a reader navigates by.
   It is a judgement, it is reversible in one line, and §4.4 sends it to
   criterion 13's eye.

4. **The control's two Polish phrases are not written in the spec**, only their
   shape ("one per mode", "names the direction", "understandable to a
   fourth-year student"). *Włącz / Wyłącz tryb prezentacji* is the plan's
   wording. It is student-facing Polish, which AGENTS.md §7 says Viktar rewrites
   before delivery — so it is a draft, not a decision, and it is flagged rather
   than assumed.

One thing the spec asked for that turned out to cost nothing, worth saying
because it could easily have gone the other way: **§9's "no change to what the
content pipeline accepts" is already true.** MDX emits `<mark>` as a literal
element rather than routing it through the components map, and
`lib/section-anchors.ts` reads a heading's text through every descendant, so a
mark inside an `h2` leaves the bookmarked anchor byte-identical. Both were
confirmed by compiling the six §8 constructs, not assumed.
