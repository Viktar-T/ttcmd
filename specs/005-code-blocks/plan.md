# plan.md — 005-code-blocks

- **Slice:** 005
- **Spec:** `specs/005-code-blocks/spec.md`, approved 2026-08-29
- **Status:** proposed
- **Stack facts this plan assumes**, verified against the tree before writing
  it: Next 16.3.3, React 19.2.8, App Router with `app/` at the repo root,
  TypeScript `strict`, `@/*` → `./*`, **plain CSS — no Tailwind, no PostCSS
  config**. MDX is compiled by `next-mdx-remote` 6.0.0 `compileMDX` in
  `lib/content.ts`, today with `remark-gfm` and **no rehype plugins and no
  `components` map**. `compileMDX` accepts a `components` map — checked in
  `node_modules/next-mdx-remote/dist/rsc.d.ts`, not assumed. There is no
  `components/` directory yet; `scripts/check-design-invariants.mjs` already
  walks one if it exists. `app/prose.css` gives `pre` `overflow-x: auto` and
  `--gap-apart`, and nothing else.
- **Pipeline facts, probed rather than assumed:** a fenced block's info string
  survives `remark-rehype` as `node.data.meta` on the `<code>` element — run
  against this repo's own `remark-parse`/`remark-rehype`, output
  `{"props":{"className":["language-csharp"]},"data":{"meta":"title=\"Program.cs\" {2,4-5}"}}`.
  That is exactly what the highlighter's rehype integration reads.
- **Facts about the content this plan is built on**, counted rather than
  assumed: **9 fenced blocks, all `bash`, all in one file** —
  `content/moduly/00-start/git-i-github.mdx`. Seven are one line, one is two,
  one is three. The longest code line is **55 characters**
  (`git config --global user.email "twoj-adres@example.com"`). **No fence
  declares a filename or a line range**, no lesson contains C#, no lesson
  contains a raw `<pre>` or `<code>` in JSX, and no lesson contains an indented
  code block — the four-space-indented runs in five files are JSX inside `<svg>`
  and MDX comments. So today's `<pre>` count on the whole site is 9, and they
  are the entire test subject the content provides.

---

## Shape of the change

Four ideas carry the slice.

**1. Highlighting is a rehype plugin, and it runs where the MDX is already
compiled.** `compileMDX` is called twice in `lib/content.ts` — once for lessons,
once for module index files — through one shared options object. The highlighter
goes into that object, so a module index gets the same treatment as a lesson
with no second decision to keep in sync. It runs at build, in a Server
Component, and nothing about it is shipped.

**2. Every colour is a CSS variable, because the highlighter is told to emit
variables instead of colours.** This is the whole of spec §2 and it is not a
workaround — the highlighter has a first-class mode for it. The theme it is
given resolves every token colour to `var(--code-token-…)`, so the generated
markup contains **no colour value at all**, the palette lives in `app/tokens.css`
with everything else, and slice 003's guard covers the highlighting for free
rather than being evaded by it.

The corollary is a new failure mode, and it is silent: an emitted variable that
nobody defined makes the declaration invalid at computed-value time, so `color`
falls back to `inherit` and that token class renders as ordinary body text with
no error anywhere. That is the same shape as slice 003's missing font subset,
and it gets the same answer — a check in the build (spec criterion 3).

**3. The block is one component, and the code is not inside the thing that
scrolls alone.** The copy control has to stay pinned while the code scrolls
under it, so the scroller cannot be the outermost element. `pre` scrolls; a
wrapper holds the surface, the optional filename, and the control. Getting there
means opening a `components` map on `compileMDX` — which slice 004's plan
explicitly declined to open *for that slice*, and which is the right mechanism
for this one.

**4. Everything the author can write on a fence is parsed strictly, and anything
else fails the build.** The info line is a tiny grammar — a filename and a set
of line ranges — and it is the only new authoring surface this slice creates.
Spec §6 asks for three build failures (an unknown language, a line reference off
the end, an info line that does not parse); two of them come from that grammar
and one comes from configuring the highlighter to have no fallback.

## Dependencies, and the two ADRs

**`shiki` and `@shikijs/rehype`** are added. AGENTS.md §8 requires an ADR line
saying what a dependency replaces and why, so:

- **ADR-00NN — build-time syntax highlighting.** The engine, why it and not a
  browser-side highlighter or a class-emitting one, and the CSS-variables theme
  that keeps the palette in `tokens.css`. Its rejected alternatives are the ones
  that matter: `rehype-highlight`/highlight.js (class-based and tokenised, but
  markedly weaker on C#, which Article VII makes the language that must work),
  `rehype-pretty-code` (does filename and line ranges out of the box, and is a
  third dependency wrapping the second to give us a meta grammar we would have
  to constrain anyway), a browser-side highlighter (spec decision 1), and
  hand-rolling (ADR-0002 already rejected hand-rolling this pipeline).
- **ADR-00NN+1 — the code palette.** The values, why they are theme-independent,
  and why they are a set of about seven rather than an editor theme's full range.

**Numbers are claimed by listing `docs/adr/` immediately before writing the
files**, per AGENTS.md §7 — the number space is shared. `0009` is the highest
today; that is a fact about today and not a reservation.

Two ADRs rather than one because they are two decisions and the directory holds
one decision per file. The palette can be vetoed without touching the engine,
which is the point of writing it down separately.

`@shikijs/transformers` is **not** added: the one function this slice would use
from it is a meta parser we are replacing with a stricter one anyway. Neither is
`unist-util-visit` — `@shikijs/rehype` owns the tree walk.

## File map

| File | New/Edit | What it holds |
| --- | --- | --- |
| `package.json` | edit | `shiki`, `@shikijs/rehype`. |
| `docs/adr/00NN-code-highlighting-at-build.md` | **new** | The engine and the dependencies. |
| `docs/adr/00NN+1-code-block-palette.md` | **new** | The palette and its theme-independence. |
| `lib/code-meta.ts` | **new** | The fence info-line grammar, and the errors it throws. |
| `lib/code-highlight.ts` | **new** | The theme, the rehype options, and the one transformer. |
| `lib/content.ts` | edit | Wires the plugin and the `components` map into the shared options; names the file in any compile error; exports a compile helper for the reference page. |
| `components/code-block.tsx` | **new** | The block: wrapper, optional filename, `pre`, control. Server. |
| `components/copy-button.tsx` | **new** | The copy control. `"use client"`. |
| `components/code-block.module.css` | **new** | The surface, the header, the control, the marked lines. |
| `app/tokens.css` | edit | The code palette, in one block, defined once. |
| `app/prose.css` | edit | The code block's place in slice 004's rhythm, now that the flow child is a wrapper and not a `pre`. |
| `app/styleguide/page.tsx` | edit | The specimens of spec §8, including C#. |
| `app/styleguide/page.module.css` | edit | Only what that section needs. |
| `scripts/check-design-invariants.mjs` | edit | Checks C and D. |
| `specs/005-code-blocks/verification.md` | **new** | The evidence, as 003 and 004 did it. |

**Not touched:** `content/` (criterion 4 is that the diff contains no change
there), `lib/content-schema.ts`, `lib/numbering.ts`, `app/globals.css`,
`app/layout.tsx`, `app/fonts.ts`, `app/theme-toggle.tsx`, `app/page.tsx`, the
lesson and module route files, `next.config.ts` — the last one conditionally;
see the risks table.

## The parts

### 1. The highlighter — `lib/code-highlight.ts`

```ts
export const CODE_VARIABLE_PREFIX = "--code-";

const codeTheme = createCssVariablesTheme({
  name: "ttcmd",
  variablePrefix: CODE_VARIABLE_PREFIX,
  variableDefaults: {},
  fontStyle: true,
});
```

Probed output for `bash` and for C#, before writing this plan:

```html
<span style="color:var(--code-token-keyword)">public</span>
<span style="color:var(--code-token-function)"> Main</span>
<span style="color:var(--code-token-string-expression)">$"Zażółć </span>
```

No colour value anywhere, Polish intact. That is spec §2 satisfied by
construction rather than by discipline.

The rehype options:

```ts
{
  theme: codeTheme,
  langs: [],              // nothing preloaded
  lazy: true,             // a grammar is loaded the first time a block asks for it
  defaultLanguage: "text",// a fence with no language, spec §3
  // no fallbackLanguage and no onError: an unrecognised language throws.
  parseMetaString: (raw) => ({ ttcmd: parseCodeMeta(raw) }),
  transformers: [ttcmdCodeTransformer],
}
```

`langs: []` with `lazy: true` is the whole of spec decision 6: there is no
allow-list to maintain, every language in the bundle is available, and only the
grammars a lesson actually uses are ever loaded. It is also what makes decision
7 free — with no `fallbackLanguage` and no `onError`, an unknown language
rejects the load, the plugin's promise rejects, and the build fails.
**Verified from the integration's own source**, not from its README.

`defaultLanguage: "text"` is spec decision 8. `text` is one of the highlighter's
special languages and needs no grammar, so an unlabelled fence still gets the
surface, the control and the rhythm, and no colour.

The single transformer does three things and no more:

| Hook | What |
| --- | --- |
| `preprocess(code)` | Has the code after the trailing newline is stripped, so this is where a line range is checked against the real line count. Throws on a reference past the end. |
| `pre(node)` | Strips the highlighter's inline `style` — CSS owns the surface and the colour, and a `pre` painting its own background pokes out of the wrapper's rounded corners. Carries the filename onto the element as a data attribute. |
| `line(node, n)` | Marks the requested lines with a data attribute. `n` is 1-based, which is what an author writing `{2,4-5}` means. |

The parsed info line reaches all three through `this.options.meta`, where
`parseMetaString`'s return value is merged — so it is parsed **once** per block.

### 2. The info line — `lib/code-meta.ts`

The grammar, complete:

```
info   := ( WS+ item )*
item   := 'title="' [^"]* '"'  |  '{' range ( ',' range )* '}'
range  := N | N '-' N            (N ≥ 1, and in N-M, M ≥ N)
```

`title="Program.cs"` and `{2,4-5}`, in either order, at most one of each.
**Anything else throws**, including a bare word, an unquoted title, an empty
`{}`, `{0}`, `{5-2}`, and a second `title=`. That is spec §6's "an info line
that does not parse fails the build" and spec decision 9.

Errors say what was written and what the grammar accepts. They are thrown during
`compileMDX`, and `lib/content.ts` catches and re-throws with the file path in
front — the highlighter knows the block but not the lesson, and a build failure
that does not name the lesson is a build failure somebody has to bisect.

Rejected: accepting the wider dialect other tools use — `showLineNumbers`,
`caption`, word highlighting, `/regex/` ranges, `[!code highlight]` comments.
Every one of them is a feature this slice's spec put out of scope, and a parser
that silently ignores what it does not implement is exactly what decision 9 refuses.

### 3. The block — `components/`

```tsx
<figure className={styles.block} data-code-block>
  {filename && <figcaption className={styles.filename}>{filename}</figcaption>}
  <pre className={styles.pre} tabIndex={0}>{children}</pre>
  <CopyButton />
</figure>
```

`pre` is mapped to this component through `compileMDX`'s `components` map, so
every fenced block in every lesson and every module index gets it, with no
lesson edited — spec criterion 4. `children` is the highlighter's `<code>`
subtree, untouched.

`tabIndex={0}` is kept from the highlighter's own output: a horizontally
scrollable region has to be reachable from a keyboard, and on this site some
blocks scroll and some do not.

`data-code-block` on the wrapper is what `app/prose.css` targets. It is on the
wrapper rather than on the `pre` because the wrapper is the flow child now.

**The copy control** — `components/copy-button.tsx`, the only client component
this slice adds:

- Reads `figure > pre > code`'s `textContent`. That is exactly the block's
  source: the highlighter emits one `<span class="line">` per line with literal
  `\n` text nodes between them and nothing after the last one, and the trailing
  newline was already stripped before tokenising. No text is added by the
  filename (it is outside the `pre`), by the control (it is outside the `pre`),
  or by the line marking (an attribute, not content). Spec criterion 12, made
  true by where things are rather than by post-processing a string.
- `navigator.clipboard.writeText`, in a `try`/`catch`. It rejects on an insecure
  origin and when a browser denies the permission, and a rejected promise that
  nobody catches is an unhandled rejection on a lesson page.
- Three states: `kopiuj`, `skopiowano`, `nie udało się`. The visible label is
  `aria-hidden`; the button carries a stable `aria-label`; the change is
  announced through a visually hidden `role="status"`. The button has a
  `min-width` sized for the longest of the three so the corner does not twitch.
  Polish, because it is student-facing (Article III).
- `user-select: none`, so dragging a selection across the block does not put the
  word `kopiuj` in it.
- The reset timer is cleared on unmount.

**Layout**, and it is the one part of this slice with a real constraint:

```css
.block { position: relative; overflow: hidden; border-radius: …; background: var(--code-background); }
.pre   { overflow-x: auto; padding-block: …; padding-inline: 0; }
.pre code       { display: block; width: fit-content; min-width: 100%; }
.pre .line      { display: block; padding-inline: 1.1rem 3.5rem; }
.copy  { position: absolute; inset-block-start: …; inset-inline-end: …; }
```

Three things fall out of that and each answers a criterion:

- **The horizontal padding is on the line, not on the `pre`.** A marked line's
  band then runs edge to edge instead of starting at a padding inset — and a
  scroll container's own end padding is the classic thing an overflowing line
  does not honour, which would leave the last characters unreachable.
- **`width: fit-content; min-width: 100%` on the `code`** makes the code box as
  wide as its widest line but never narrower than the block. A block-level line
  inside it therefore fills the *scrollable* width, so a marked line stays
  marked when the block is scrolled right. Spec criterion 15 says to check it
  scrolled, not at rest, because this is precisely what fails.
- **`padding-inline-end: 3.5rem` on every line** reserves the control's width
  inside the scrollable area. The control still overlays the end of the first
  line at rest — that is spec decision 12 — but the reserved space means the
  text under it can always be scrolled clear. Spec criterion 19.

The filename header carries the same background as the code and is separated by
a hairline rule only, so the control's occluding background is the same colour
wherever it sits, and there is no seam. It takes the monospace face and a
quieter colour than the code.

### 4. The palette — `app/tokens.css`

One block, on bare `:root`, **never repeated under `[data-theme="light"]`**.
That is spec decision 4 and it is the thing this slice is most likely to get
wrong, because everything is built while looking at the dark theme where the
page palette happens to work on a dark surface too.

Seven colours do the work — plain text, comment, keyword, string, interpolated
string, function/identifier, constant — plus the surface, the filename, the
control, the marked-line band and its marker. The remaining variables the theme
can emit (diff colours, the sixteen terminal ANSI slots) are **defined as
aliases of those seven** rather than left undefined: nothing renders them today,
and an undefined one is invisible until the day something does.

Two values are aliases of existing tokens rather than new literals:
`--code-background` is `--bg-code`, and the marker is `--accent-surface`. Both
are already identical in both themes — `tokens.css` says so in a comment for the
first and ADR-0007 says so for the second — and Check D below turns that comment
into something the build enforces.

Every one of these must clear **4.5:1 against the surface** (spec criterion 6).
They are computed with the same WCAG relative-luminance arithmetic slices 003
and 004 used, and recorded in `verification.md`. Any value that does not clear
it is changed, not excused.

Code is set at `--text-base` inside prose set at `--text-lg`: 16px monospace
next to 18px sans is the pair that reads as the same size, and it is the
existing scale token. Line height is `--leading-normal`; no new token enters.

### 5. The rhythm — `app/prose.css`

Slice 004 gave `pre` `--gap-apart` above and below. The flow child is now the
wrapper, so those two rules take `[data-code-block]` in place of `pre`, and
nothing else in the file changes. `.prose pre { overflow-x: auto }` stays and
still applies — it is a descendant selector.

Spec criterion 20 is that the rhythm did not move, and it is measured the way
004 measured it, not asserted.

### 6. The build checks — `scripts/check-design-invariants.mjs`

Two new checks, in the file's existing idiom: source scans, failures collected,
reasons in the message.

**Check C — every colour the highlighting can emit is defined.** The prefix is
read out of `lib/code-highlight.ts` by a source scan, the same technique Check A
uses on `fonts.ts` and for the same reason: the value has to be a literal at the
call site. The theme is then constructed with that prefix, every `var(--…)` it
can emit is collected, and each is required to have a definition in
`app/tokens.css`. This imports `shiki`, which is a dependency of the project by
then; the file's "Node built-ins only" note is about *adding* dependencies, and
this adds none.

**Check D — the code palette does not move with the theme.** Two assertions:
no `--code-…` is defined inside any `[data-theme…]` block, and every token the
palette refers to through `var()` has the same value in `:root` as in every
theme block. The second is what stops `--code-background` and the marker from
becoming theme-dependent by reference — a change nobody would notice on the dark
theme, which is the only one anybody looks at while building this.

### 7. The reference page — `app/styleguide/page.tsx`

Spec §8 is explicit that nine one-line `bash` blocks do not cover this slice.
The specimens are written as **Markdown, compiled through the same pipeline**,
so what is on the page is what a lesson would get — the meta parser, the
highlighter and the components map all run. A helper exported from
`lib/content.ts` compiles a string with the shared options; the page renders it
inside a `prose` wrapper, like the 004 section above it.

The specimen source uses **tilde fences** (`~~~`). They are CommonMark, they
behave identically to backticks including the info string, and they can sit in a
TypeScript template literal without escaping every fence character into
unreadability. Rejected: backtick fences escaped one by one, and a separate
Markdown file read from disk at render — the first is unreadable, the second
adds a file-system read to a page whose whole job is to be obvious.

What it contains, one specimen each: `bash` (matching the lesson), **C#** with
keywords, a type, a comment and a Polish string, a fence with no language, a
block with a filename header, a block with marked lines, a line long enough to
scroll at the measure, a Polish comment carrying every diacritic, and a one-line
block. That is spec criterion 23, and the C# one is the only place in the
repository where Article VII's language is rendered at all.

No colour value may be printed on that page — Check B walks `app/`, and the
reference page failing its own rule is a mistake this repo has already made once.

## Order of work

Sequenced so the build is green at every commit boundary, and so the two things
most likely to be wrong — the light theme and what lands in the clipboard —
are reachable early.

1. **Record the slice.** `plan.md` and `tasks.md` into the repository.
2. **Highlighting arrives.** ADR for the dependency; `shiki` and
   `@shikijs/rehype` installed; the theme, the rehype options and the plugin
   wired into the shared options in `lib/content.ts`. **Verify here** that the
   compiled lesson contains `var(--code-…)` spans, that no grammar reaches the
   client bundle, and that the build does not need `serverExternalPackages` —
   cheaper to find out now than in step 9.
3. **The palette.** The ADR, the token block, and Checks C and D. Contrast
   computed before it is looked at.
4. **The block.** The `components` map, the wrapper, the surface, the scroll
   geometry, and `prose.css` keeping 004's rhythm.
5. **The copy control.** Including what is in the clipboard, compared against
   the `.mdx` source character for character.
6. **The info line and the filename header.** The grammar, its three build
   failures, and the header.
7. **Marked lines.** Including the scrolled-right check.
8. **The reference page specimens**, and with them C#'s first rendering.
9. **Verification pass**, written into `specs/005-code-blocks/verification.md`.
10. **Close the slice** — the fresh-context review of AGENTS.md §3.

## How the by-eye and by-measurement criteria get checked

| Criterion | Method |
| --- | --- |
| 3, 2 — colours defined, none loose | The build's own Checks B and C. Their output is the evidence. |
| 5 — theme-independence | The same block's computed colours read on the dark theme and on the light one and printed side by side, for the surface, the code, a comment, a keyword, a string, the filename, the control and a marked line. |
| 6 — contrast | The WCAG 2.x relative-luminance formula over `tokens.css`, as 003 and 004 did, every palette colour against the surface. |
| 7 — readable without colour | Chromium DevTools → Rendering → *Emulate vision deficiencies: achromatopsia*, on the Git lesson and on the reference page. |
| 9, 16, 17 — the build failures | Introduce each temporarily, show the failing output, revert, show the build passing. |
| 12 — the clipboard | Read `code.textContent` from the rendered page and compare to the fence body read from the `.mdx` file. Equality, printed — not eyeballed. |
| 15 — marked lines when scrolled | Scroll the block to `scrollLeft = scrollWidth` and compare the marked line's rendered width to the code box's, printed. |
| 18, 19 — the phone | Browser pane at 375×812; `document.documentElement.scrollWidth <= clientWidth` asserted on every lesson in both themes; and the text under the control brought out from under it by scrolling. |
| 20 — the rhythm | Computed `margin-top` of each block around a code block, printed and compared to 004's recorded numbers. |
| 22 — nothing shipped | Grep the built client chunks for a grammar marker and for the highlighter's package name; the copy control's own chunk is the only addition. |

## Risks

| Risk | Signal | Response |
| --- | --- | --- |
| The highlighter's WebAssembly engine does not bundle cleanly in the Next build | `npm run build` fails on a wasm import from a Server Component | `serverExternalPackages` in `next.config.ts`, one line — or the JavaScript RegExp engine, which needs no wasm at all. Found in step 2, deliberately. |
| Mapping `pre` in the `components` map catches something that is not a code block | A raw `<pre>` in a lesson renders with a copy control | There is none today, counted. If one appears it is a code block in all but name and the treatment is correct. |
| `textContent` is not exactly the source | Criterion 12's comparison fails | The comparison is the check. If it fails, the cause is a transformer adding content, and the fix is to stop doing that — not to normalise a string afterwards. |
| A marked line's band stops at the viewport edge | Criterion 15 at `scrollLeft > 0` | `width: fit-content; min-width: 100%` on the code box. It is in the plan because it is the known failure, not because it was found. |
| The control's occluding background does not match the header's | A seam at the top-right of a block with a filename | The header takes the code surface and is separated by a rule only. |
| The palette reads well on dark and is wrong on light | Nothing — this is the silent one | Check D makes it structural; criterion 5 makes it measured; the verification pass reads every lesson on the light theme. |
| A palette colour is pretty and under 4.5:1 | The contrast table | Change the value. It is one line in one file and no other decision depends on it. |
| The lazily loaded grammars slow the build noticeably | `npm run build` wall time | Only the languages actually used are loaded — today that is one. If it ever matters, the answer is a preloaded list, and that is a plan change, not a silent one. |

## What this plan does not do

Named so the closing review can check the diff against it: no MDX component —
`Prompt`, `Zadanie`, `Uwaga`, `Cele`, image and caption — beyond the `pre`
mapping the code block itself needs; no change to inline code; no navigation,
header bar, breadcrumb, accent band, contents panel, prev/next or back-to-top;
no line numbers, diff rendering, tabbed or collapsible blocks, run button or
editor link; no change to any file under `content/`; no change to the lesson or
module route components; no change to the frontmatter schema; no change to
slice 004's rhythm, measure, headings, quotations, lists, tables or links; no
new colour outside the code palette block; no second theme for the code surface;
and no `prefers-color-scheme`.
