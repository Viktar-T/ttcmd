# verification.md — 005-code-blocks

Evidence for the acceptance criteria in `spec.md`. Numbers are **measured**,
not estimated. Checked 2026-08-29 against the dev server on `localhost:3000`,
Next 16.3.3, Chromium in the Browser pane.

**Two limitations, stated up front because they change what the rest of this
file can claim.**

1. **Screenshots were unavailable again**, as in slice 004: the Browser pane
   would not composite frames, so `computer{action:"screenshot"}` timed out
   every time. Everything measurable was measured; the criteria that need eyes
   are marked **outstanding** rather than quietly asserted, and listed together
   at the end. AGENTS.md §3: if you cannot verify it, say so.
2. **Nothing was composited, so no animation timeline advanced.** That is worth
   knowing because it produced one false alarm during T05: the copy control's
   `color` appeared not to change on focus, and it turned out the 120 ms
   transition simply never ran. Disabling the transition showed the cascade —
   `rgb(162,154,140)` at rest, `rgb(232,228,219)` on focus. Any transitioned
   property read in this session is the *start* value unless the transition was
   disabled first.

Geometry was read with the tab's viewport emulated to an explicit size
(`375 × 812` or `1280 × 900`). With emulation cleared, the hidden pane reports a
zero-width viewport and every rectangle is nonsense — one set of measurements
was thrown away for that reason before this file was written.

---

## 1 — `npm run build` succeeds

```
> ttcmd@0.1.0 build
> node scripts/check-design-invariants.mjs && next build

  Design invariants OK.
▲ Next.js 16.3.3 (Turbopack)
✓ Compiled successfully in 618ms
  Running TypeScript ...
  Finished TypeScript in 1531ms ...
✓ Generating static pages using 8 workers (13/13) in 1397ms
```

No change to `next.config.ts` was needed. The plan's first risk was that the
highlighter's WebAssembly engine would not bundle under Turbopack and that
`serverExternalPackages` would be required; it was not. Recorded in ADR-0010 so
that a future Next upgrade which breaks it knows this was checked rather than
lucky.

**Pass.**

## 2 — No colour literal outside the token file, including the highlighting

`Design invariants OK.` above is Checks A and B from slice 003 plus Checks C and
D added by this slice, all run ahead of every `next build`.

This slice is the first thing in the repository with an appetite for a dozen
hues, and it passes Check B for a structural reason rather than a careful one:
**the highlighter is configured to emit CSS variables instead of colours**, so
the generated markup contains no colour value at all. From the prerendered
`/moduly/00-start/git-i-github`:

```html
<span style="color:var(--code-token-function)">git</span>
<span style="color:var(--code-token-string)"> config</span>
<span style="color:var(--code-token-string-expression)"> &quot;Imie Nazwisko&quot;</span>
```

84 `var()` colour references across the nine blocks, zero hex literals. The four
`#000`/`#fff` occurrences found anywhere in that HTML belong to Next's own
built-in `not-found` styles in the RSC payload, not to this site.

**Pass.**

## 3 — Every colour the highlighting can emit is defined

Check C constructs the theme with the prefix read out of `lib/code-highlight.ts`
by a source scan, collects every `var(--…)` it can emit, and requires each to be
defined in `app/tokens.css`. Broken deliberately by deleting one definition:

```
  [Check C] the syntax theme can emit 1 variable(s) that app/tokens.css does not
  define: --code-token-parameter. An undefined one is invalid at computed-value
  time, so that token class renders as ordinary body text with no error anywhere.
  Define it in the code palette block — as an alias of an existing one if nothing
  renders it yet.
```

exit 1. Restored, `Design invariants OK.`

30 variables are emitted by the theme and all 30 are defined: 8 text colours,
the surface, the foreground, 3 diff colours and the 16 terminal ANSI slots. The
last 19 are aliases of the 8 — nothing renders them today, which is exactly why
they were at risk of being left as a hole.

**Pass.**

## 4 — All nine blocks render highlighted, with no lesson edited

`document.querySelectorAll('[data-code-block]').length` on
`/moduly/00-start/git-i-github` is **9**, matching the nine fenced blocks in the
`.mdx`. Each is a `<figure data-code-block>` containing a `<pre>` whose `<code>`
carries `var(--code-…)` spans.

Rendered in both themes — see criterion 5, where the same block is read twice.

```
$ git diff --stat 61a4243..HEAD -- content/
(no output)
```

Nothing under `content/` changed across the whole slice. Three temporary fences
were introduced during T06 and T07 to make build failures happen and were
reverted with `git checkout --` each time; the two modified files still showing
in `git status` are Viktar's own uncommitted content edits, present before this
slice started.

**Pass.**

## 5 — Every colour inside a code block is the same in both themes

Read off the same C# block on `/styleguide`, with `data-theme` toggled between
reads.

| | dark | light |
| --- | --- | --- |
| surface | `rgb(30, 29, 27)` | `rgb(30, 29, 27)` |
| code text | `rgb(232, 228, 219)` | `rgb(232, 228, 219)` |
| keyword | `rgb(201, 194, 245)` | `rgb(201, 194, 245)` |
| function / type | `rgb(142, 214, 200)` | `rgb(142, 214, 200)` |
| string | `rgb(232, 193, 136)` | `rgb(232, 193, 136)` |
| comment | `rgb(162, 154, 140)` | `rgb(162, 154, 140)` |
| constant | `rgb(240, 172, 162)` | `rgb(240, 172, 162)` |
| punctuation | `rgb(176, 169, 156)` | `rgb(176, 169, 156)` |
| filename | `rgb(162, 154, 140)` | `rgb(162, 154, 140)` |
| filename rule | `rgb(59, 56, 49)` | `rgb(59, 56, 49)` |
| copy control | `rgb(162, 154, 140)` | `rgb(162, 154, 140)` |
| control background | `rgb(30, 29, 27)` | `rgb(30, 29, 27)` |
| marked-line band | `rgb(46, 43, 37)` | `rgb(46, 43, 37)` |
| marked-line marker | `rgb(201, 194, 245) inset` | `rgb(201, 194, 245) inset` |
| *page* background | `rgb(42, 41, 38)` | `rgb(247, 246, 242)` |
| *page* text | `rgb(237, 235, 230)` | `rgb(35, 34, 31)` |

Fourteen of fourteen identical. The only two values that differ are the page's
own background and text, which is the theme doing its job.

Check D makes this structural rather than lucky. Both halves were broken
deliberately:

```
  [Check D] app/tokens.css: `--code-token-keyword` is defined inside
  `:root[data-theme="light"]`. The code surface stays dark in both themes
  (ADR-0007), so a colour on it must not move with the theme — it would be
  legible on one and invisible on the other.

  [Check D] app/tokens.css: `--code-line-marker` refers to `--accent-surface`,
  which is `#c9c2f5` on :root and `#b3a8f0` in `:root[data-theme="light"]`. That
  makes a code colour theme-dependent by reference — the failure Check D exists
  to catch, and the one nobody sees on the dark theme.
```

Both exit 1; both reverted; `Design invariants OK.`

**Pass.**

## 6 — Every colour is ≥ 4.5:1 against the code surface

WCAG 2.x relative luminance, the same arithmetic slices 003 and 004 used.
Surface `#1e1d1b`, luminance `0.01234`. Checked against the plain surface **and**
against the marked-line band `#2e2b25`, because a marked line changes the ground
under the text.

| token | value | vs surface | vs band |
| --- | --- | --- | --- |
| `--code-foreground` | `#e8e4db` | 13.28:1 | 11.12:1 |
| `--code-token-string` | `#bdb6a8` | 8.36:1 | 7.00:1 |
| `--code-token-punctuation` | `#b0a99c` | 7.22:1 | 6.05:1 |
| `--code-token-comment` | `#a29a8c` | 6.05:1 | 5.06:1 |
| `--code-token-keyword` | `#c9c2f5` | 10.04:1 | 8.41:1 |
| `--code-token-function` | `#8ed6c8` | 10.11:1 | 8.47:1 |
| `--code-token-string-expression` | `#e8c188` | 9.96:1 | 8.34:1 |
| `--code-token-constant` | `#f0aca2` | 8.93:1 | 7.48:1 |

Lowest value anywhere: **5.06:1**, the comment on a marked line. The floor is
4.5:1. Nothing was excused.

Non-text, recorded rather than held to that floor:

| | value | vs surface | why |
| --- | --- | --- | --- |
| `--code-line-highlight` | `#2e2b25` | 1.19:1 | a band, not a second surface |
| `--code-rule` | `#3b3831` | 1.44:1 | decorative — the filename is already told apart by colour and position (slice 003's precedent) |
| `--code-line-marker` | `#c9c2f5` | 10.04:1 | the site accent |

**Pass.**

## 7 — Readable with colour removed

The **arithmetic half passes and is above**: every colour a token can take
clears the body-text floor against both grounds, so removing colour cannot take
anything below readability. Highlighting on this site is supplementary by
design (spec §2) — the distinctions colour makes are a convenience, and the
marked line is carried by a lightness change plus a marker rather than by hue.

The four hues sit between 8.93:1 and 10.11:1, so in greyscale they read as one
tone and it is the warm grey ramp — foreground 13.28, punctuation 7.22, comment
6.05 — that carries the structure. That is intended and recorded in ADR-0011.

**The visual half is outstanding.** Achromatopsia emulation needs a rendering
pane. See "Outstanding" below.

## 8 — C# renders with its parts told apart

On `/styleguide`, the C# specimen — the first C# rendered anywhere in this
repository. Spans grouped by the variable each resolves to:

| variable | spans | sample |
| --- | --- | --- |
| `--code-token-keyword` | 33 | `using`, `namespace`, `public`, `record`, `string`, `decimal` |
| `--code-token-function` | 17 | `System`, `Collections`, `Pozycja`, `Koszyk` |
| `--code-foreground` | 37 | `;`, `.`, `(`, `{` |
| `--code-token-constant` | 11 | `0.23m`, `pozycja`, `Ilosc`, `0` |
| `--code-token-punctuation` | 3 | `,` |
| `--code-token-comment` | 1 | `// Zażółć gęślą jaźń — ĄĆĘŁŃÓŚŹŻ ążćęłńóśź` |
| `--code-token-string-expression` | 1 | `"Ilość musi być dodatnia"` |

Seven distinct roles, including Polish inside both a comment and a string.

**Pass.**

## 9 — An unrecognised language fails the build

```` ```csharrp ```` introduced into `git-i-github.mdx`:

```
Error: content/moduly/00-start/git-i-github.mdx: [next-mdx-remote] error compiling MDX:
Language `csharrp` is not included in this bundle. You may want to load it from external source.
> Build error occurred
```

The language and the file are both named. The file comes from the wrapper in
`lib/content.ts`: the highlighter knows the block but not the lesson, and a
build that stops without saying which of eight files it is in is a build
somebody has to bisect. Reverted; build green.

**Pass.**

## 10 — A fence with no language renders, unhighlighted

The third specimen on `/styleguide` is a fence with no info string at all. It
renders as a `[data-code-block]` with 3 lines and
**`code span[style]`.length === 0** — the surface, the control and the rhythm,
and not one colour span. The build succeeds.

**Pass.**

## 11 — The copy control: position, quietness, keyboard, focus indicator

Measured on `/styleguide`'s C# block at `1280 × 900`:

| | |
| --- | --- |
| control rect | top 2317, left 875, right 940, bottom 2344 |
| code (`pre`) top | 2345 |
| block right edge | 945 |

So the control sits at the block's top-right, inside it, and — where a filename
header exists — entirely within that header row: its bottom (2344) is above the
code's top (2345).

Keyboard, with real key events: focus the `<pre>`, press Tab —

```
{ "afterTab": "Kopiuj kod do schowka", "tag": "BUTTON", "matchesFocusVisible": true,
  "outline": "rgb(201, 194, 245) solid 1.71429px" }
```

Tab reaches it, `:focus-visible` matches, and the focus outline is the accent,
drawn inset so the wrapper's `overflow: hidden` cannot clip it. (The 1.714px is
the pane's own scaling of 2px.)

Quiet at rest, raised on focus — read with the transition disabled, per the note
at the top of this file:

```
{ "blurred": "rgb(162, 154, 140)", "focused": "rgb(232, 228, 219)" }
```

`#a29a8c` → `#e8e4db`. 6.05:1 at rest, 13.28:1 focused.

**Pass**, except that "reads as quiet rather than as broken" is an eye judgement —
see "Outstanding".

## 12 — What is copied is exactly the source

The criterion that matters in class. Compared **character for character**
against the fence bodies read out of `content/moduly/00-start/git-i-github.mdx`:

```
fences in the .mdx: 9   code elements rendered: 9
 0  IDENTICAL  chars=145/145  endsWithNewline: source=false rendered=false  "git config --global user.name \"Imie Nazw"
 1  IDENTICAL  chars=26/26    …  "git config --global --list"
 2  IDENTICAL  chars=10/10    …  "git status"
 3  IDENTICAL  chars=32/32    …  "git add nazwa-pliku.cs"
 4  IDENTICAL  chars=46/46    …  "git commit -m \"dodaj obsluge przycisku z"
 5  IDENTICAL  chars=8/8      …  "git push"
 6  IDENTICAL  chars=28/28    …  "git clone adres-repozytorium"
 7  IDENTICAL  chars=8/8      …  "git pull"
 8  IDENTICAL  chars=26/26    …  "git switch -c nazwa-galezi"

ALL NINE IDENTICAL, none ends in a newline
```

Then what the control actually hands over, captured by stubbing
`clipboard.writeText` — the pane cannot grant clipboard permission, so the real
call rejects, and stubbing it verifies the *argument*, which is the thing the
criterion is about:

```
{ "clicked": 9, "capturedEqualsBlock": true, "anyTrailingNewline": false,
  "capturedLengths": [145, 26, 10, 32, 46, 8, 28, 8, 26] }
```

The nine captured lengths are the nine source lengths. No filename, no control
label, no line marking, no trailing newline. Re-run after every other task had
landed.

**Pass.**

## 13 — The confirmation, and the return to rest

```
{ "labelAfter300ms": "gotowe", "labelAfter3000ms": "kopiuj",
  "statusClearedAfterReset": true }
```

and the live region's text, read while the copy was in flight:

```
{ "distinctStatuses": ["Skopiowano kod do schowka."] }
```

The failure path was exercised for real, since the pane denies clipboard
permission:

```
{ "labelAfterClick": "błąd", "status": ["Nie udało się skopiować. Zaznacz kod i skopiuj ręcznie."] }
```

Both states are announced through a `role="status"` region that is present in
the DOM from the first render — one added at the moment it has something to say
is one a screen reader does not read. The visible label is `aria-hidden` and the
button's own `aria-label` is stable, so a screen reader is not told the button
renamed itself.

**Deviation from the plan, recorded rather than hidden.** The plan said the
button would take a `min-width` sized for the longest of three labels. All three
visible labels are instead six characters or fewer — `kopiuj` / `gotowe` /
`błąd` — which keeps the same "the corner never moves" property in a box a third
narrower. The precise sentence goes to the live region, where length costs
nothing. The narrower box matters: the control's width is reserved inside every
block's scrollable area, and at 4.5rem the widest line in the written lessons
still fits the measure without scrolling (528 + 17.6 + 72 < 624). At the plan's
width it would not have.

**Pass.**

## 14 — A filename header when declared, and no empty bar when not

Measured with a temporary `title=` on one fence of the Git lesson (reverted):

```
{ "blocks": 9, "blocksWithHeader": 1, "blocksWithoutHeader": 8, "emptyBarsAnywhere": 0,
  "headerText": "terminal — sprawdzenie stanu repozytorium.sh",
  "headerFont": "\"JetBrains Mono\" 14px",
  "headerColour": "rgb(162, 154, 140)",
  "headerBackground": "rgba(0, 0, 0, 0)",
  "headerRule": "1px rgb(59, 56, 49)" }
```

The header is transparent over the wrapper's own `--code-background`, so the
copy control's occluding background is the same colour wherever it sits and
there is no seam where the two meet.

A long filename does not run under the control:

```
{ "filenameTextRight": 708, "controlLeft": 875, "filenameClearsControl": true }
```

Permanently on `/styleguide`: `Koszyk.cs` on one of five specimens, four with no
header and no bar.

**Pass** on the measurements; "reads as a header rather than as a first line of
code" is an eye judgement — see "Outstanding".

## 15 — Marked lines, including when the block is scrolled

On `/styleguide`'s C# specimen, `{7,17-18}`:

```
[ { "n": 7,  "text": "// Zażółć gęślą jaźń — ĄĆĘŁŃÓŚŹŻ ążćęłńóśź" },
  { "n": 17, "text": "if (pozycja.Ilosc <= 0)" },
  { "n": 18, "text": "throw new ArgumentException(\"Ilość musi być …" } ]
```

Exactly the three lines named, and no others.

Treatment: band `rgb(46, 43, 37)`, marker
`rgb(201, 194, 245) 2px 0px 0px 0px inset`; unmarked lines
`rgba(0, 0, 0, 0)`.

Scrolled, which is where this fails if the geometry is wrong — measured at
375 px on a three-line `bash` block carrying a temporary `{2}`:

```
atRest   { scrollLeft: 0,   lineW: 618, lineLeft: 16,   lineRight: 634, preClientW: 343, preScrollW: 618 }
scrolled { scrollLeft: 275, lineW: 618, lineLeft: -259, lineRight: 359, preRect: [16, 359] }
bandCoversViewportWhenScrolled: true
bandWidthEqualsCodeWidth: true
```

The band is 618 px — the code box's whole scrollable width, not the 343 px that
is visible — so at `scrollLeft: 275` it still covers the viewport edge to edge.
A tint that stopped where the viewport does would have lied about which line was
marked as soon as the block moved.

**Pass.**

## 16 — A marked line past the end of a block fails the build

`{2,4-5}` on the three-line block:

```
Error: content/moduly/00-start/git-i-github.mdx: [next-mdx-remote] error compiling MDX:
code block: the info line marks line 4, 5, but the block has 3 lines.
```

The check lives in the transformer's `preprocess` hook, the only place that sees
the code after the trailing newline has been stripped and therefore the only
place that knows the real line count. Reverted; build green.

**Pass.**

## 17 — An info line that does not parse fails the build

Two of the three, both reverted:

```
```bash showLineNumbers
Error: content/moduly/00-start/git-i-github.mdx: [next-mdx-remote] error compiling MDX:
code block: cannot read the info line `showLineNumbers` — `showLineNumbers` is not
something a fence may carry. The whole grammar is: expected `title="name"` and/or
`{1,3-5}`, separated by spaces, in either order. Nothing else is accepted,
deliberately: silently ignoring part of an info line drops something the author wrote.
```

```
```bash title="a.cs" title="b.cs"
code block: cannot read the info line `title="a.cs" title="b.cs"` — `title=` appears
twice, and a block has one filename. …
```

`showLineNumbers` is deliberately in that list: it is the most likely thing to
be copied in from another site's documentation, and it is a feature this slice's
spec put out of scope. Refusing it by name beats rendering a block that quietly
ignores it.

**Pass.**

## 18 — Scroll inside the block, never on the page

At `375 × 812`, `/moduly/00-start/git-i-github`:

| block | first line | `pre.scrollWidth` | `pre.clientWidth` | scrolls |
| --- | --- | --- | --- | --- |
| 0 | `git config --global user.name …` | 618 | 343 | yes |
| 1 | `git config --global --list` | 343 | 343 | no |
| 2 | `git status` | 343 | 343 | no |
| 3 | `git add nazwa-pliku.cs` | 343 | 343 | no |
| 4 | `git commit -m "dodaj obsluge …"` | 519 | 343 | yes |
| 5 | `git push` | 343 | 343 | no |
| 6 | `git clone adres-repozytorium` | 358 | 343 | yes |
| 7 | `git pull` | 343 | 343 | no |
| 8 | `git switch -c nazwa-galezi` | 343 | 343 | no |

`document.documentElement.scrollWidth <= clientWidth` on every page in the site,
at 375 px, in **both** themes:

| page | dark | light |
| --- | --- | --- |
| `/` | no h-scroll | no h-scroll |
| `/moduly` | no h-scroll | no h-scroll |
| `/moduly/00-start` | no h-scroll | no h-scroll |
| `/moduly/01-jak-powstaje-oprogramowanie` | no h-scroll | no h-scroll |
| `/moduly/00-start/git-i-github` (9 blocks) | no h-scroll | no h-scroll |
| `…/od-podpowiedzi-do-agenta` | no h-scroll | no h-scroll |
| `…/co-model-naprawde-potrafi` | no h-scroll | no h-scroll |
| `…/vibe-coding-kontra-inzynieria` | no h-scroll | no h-scroll |
| `…/jak-nie-wypasc-z-obiegu` | no h-scroll | no h-scroll |
| `…/na-zywo-agent-buduje-aplikacje` | no h-scroll | no h-scroll |
| `/styleguide` (5 blocks, 4 of them scrolling) | no h-scroll | no h-scroll |

**Note, since block 6 is the interesting case.** `git clone adres-repozytorium`
is 28 characters and would fit 343 px on its own; it scrolls because every line
carries `--control-space` at its end. That reservation is doing real work on
exactly this block: without it the line would end at 286 px while the control
starts at 274 px, so the last characters of `repozytorium` would sit under the
control permanently. The 15 px of extra scroll is the price, and no scrollbar
takes layout space (`offsetHeight - clientHeight === 0` on every block).

**Pass.**

## 19 — Text under the control can be scrolled clear

The widest block, at 375 px, measured with a `Range` over the first line:

```
atRest   { textRight: 466, controlLeft: 290, coveredPx: 176 }
scrolled { textRight: 191, controlLeft: 290, coveredPx: 0 }
```

At rest 176 px of the first line lies beyond the control's left edge. Scrolled to
the end, the line's text ends at 191 px and the control begins at 290 px: nothing
is under it. That is what the trailing `--control-space` on `.line` buys, and it
is why the horizontal padding is on the line rather than on the scroller — a
scroll container's own end padding is the classic thing an overflowing line does
not honour.

**Pass.**

## 20 — Slice 004's rhythm did not move

Computed margins around all nine code blocks on the Git lesson:

```
{ "allMarginBottomZero": true,
  "distinctMarginTops": ["40px", "68px"],
  "largestGapOnPage": 68 }
```

Every code block: `margin-top: 40px`, `margin-bottom: 0`. Every block following
one: `40px`, except where a heading follows, which takes `68px`. Exactly one
non-zero margin per boundary, because nothing in the prose column carries a
bottom margin.

Against slice 004's own `verification.md`, which recorded `pre → h2` at 68px and
`pre → p` at 40px and `--gap-apart` at 40px: **identical**. The flow child is now
a wrapper rather than a `pre`, and `app/prose.css` moved the two `--gap-apart`
rules onto `[data-code-block]` to follow it; the numbers did not change.

68px is the largest gap on the page, so no block gap exceeds the heading gap.

**Pass.**

## 21 — Polish inside a code block

```
{ "fontsReady": "loaded",
  "monoCanRenderPolish": true,
  "sansCanRenderPolish": true }
```

`document.fonts.check('16px "JetBrains Mono"', 'ąćęłńóśźżĄĆĘŁŃÓŚŹŻ')` — every
Polish diacritic, both cases, in the face a code block is set in. The specimens
put them where they would show first: `// Zażółć gęślą jaźń — ĄĆĘŁŃÓŚŹŻ
ążćęłńóśź` as a comment in both `bash` and C#, and `"Ilość musi być dodatnia"`
inside a C# string. Their rendered `textContent` comes back intact.

Check A already fails the build if either face drops `latin-ext`, which is the
mechanism ADR-0005 put in place for exactly this.

**Pass** on the loading and the text. Whether a glyph *draws* rather than
falling back is an eye judgement — see "Outstanding".

## 22 — The browser receives no highlighting code

After a clean `next build`, across all 14 client chunks:

```
$ grep -rl -iE 'shiki|oniguruma|tmLanguage|textmate|createCssVariablesTheme' .next/static/
(no output)
```

Zero hits. The only client-side JavaScript this slice adds is the copy control,
which lands in two chunks totalling **11.4 kB before compression** — and most of
that is the React client-component runtime those chunks already carry, not the
control.

The string `shiki` does appear in the prerendered HTML: it is the `class`
attribute the highlighter writes on a `<pre>`. That is markup, and the block
component replaces it with the site's own class before anything renders.

**Pass.**

## 23 — The reference page carries a specimen of every construct

`/styleguide`, section "Code blocks", compiled from Markdown through the same
pipeline a lesson goes through — the info-line parser, the highlighter and the
components map all run:

| specimen | lines | filename | marked | scrolls at 375 px | colour spans |
| --- | --- | --- | --- | --- | --- |
| `bash`, Polish comment and quoted string | 3 | — | — | yes | 16 |
| C#, filename and marked lines | 24 | `Koszyk.cs` | 7, 17, 18 | yes | 103 |
| no language — output | 3 | — | — | no | **0** |
| one line | 1 | — | — | no | 2 |
| a long line | 1 | — | — | yes | 11 |

That is `bash`, C#, a fence with no language, a filename header, marked lines, a
line long enough to scroll, a Polish comment carrying every diacritic, and a
one-line block — the whole of spec §8.

**Pass.**

## 24 — The closing review

Carried out in a fresh context against `spec.md`, `plan.md` and the whole diff
`61a4243..HEAD`, per AGENTS.md §3 and Article IX.

**No blocking findings.** The reviewer re-derived the contrast table from the
token values, re-extracted all nine code texts from the prerendered HTML and
compared them to the `.mdx` itself, re-grepped the client chunks, and ran 35
info-line cases and 15 pathological documents — an empty block, a blank-line
block, a block inside a list and inside a blockquote, an indented block, a raw
`<pre>`, a mark on a one-line block, `bash{2}`, `BASH`, a whitespace-only info
line — through the real pipeline. Nothing crashed, nothing was wrongly accepted
or wrongly refused, and a filename containing a script tag is inert: it is a
React text child, and the grammar cannot produce a double quote inside a
filename, so the attribute cannot be broken either.

Ten notes came back. **Four were fixed** because they affect correctness or a
criterion; the rest are recorded here rather than chased, per T10.

### Fixed

**1. `lib/code-meta.ts` — the parser allocated before it refused.** Ranges were
expanded into a list of line numbers at parse time, and the bounds check happens
afterwards, in `preprocess`, which is the only hook that knows the block's real
length. So a range of two million lines built two million entries in ~290 ms
before anything looked at a three-line block; a larger typo exhausts memory
instead of producing criterion 16's message. **Ranges are now kept as ranges and
never expanded**; `marksLine` tests membership and `rangesPast` reports the
overrun. Re-checked, with a two-million-line range on the three-line block:

    Error: content/moduly/00-start/git-i-github.mdx: [next-mdx-remote] error compiling MDX:
    code block: the info line marks 1-2000000, but the block has 3 lines.
      build wall time, including the failure: 4683 ms

and criterion 16's own case still reads `marks 4-5, but the block has 3 lines`.

**2. `app/prose.css` — a cascade guarantee had quietly become source order.**
`:is()` takes the specificity of its most specific argument, so replacing `pre`
with `[data-code-block]` raised the two `--gap-apart` rules from (0,1,1) to
(0,2,0) — a tie with `.prose > :first-child`, whose comment claims to beat
everything above it on specificity. Behaviour was unchanged only because the
reset comes later in the file, and no lesson currently opens with a code block,
so nothing would have caught it. **The attribute selector is now wrapped in
`:where()`**, which contributes zero specificity, so the rules keep exactly what
they had when they said `pre`. Re-checked on the Git lesson:
`firstChildMarginTop: "0px"`, code blocks `40px`, largest gap on the page `68`.

**3. `scripts/check-design-invariants.mjs` — the flat scan did not fail to read
nesting, it mis-read it.** A `:root` inside an `@media` block would have been
parsed as a bare `:root` and passed Check D — the exact failure Check D exists
to catch. **Brace depth is now measured first and the check refuses to answer
rather than answering wrongly:**

    [Check D] app/tokens.css nests rules 2 deep (braces balanced). Checks C and D
    read it with a flat scan, which would read a nested `:root` as a bare one and
    let a theme-dependent code colour through. The scan has to grow before the
    file does.

**4. `lib/code-highlight.ts` — a stray attribute, latent.** shiki copies every
`meta` key not starting with an underscore onto the `<pre>`'s properties
(`@shikijs/core/dist/index.mjs:835`), so `parseMetaString` returning `ttcmd`
put `ttcmd="[object Object]"` in the hast tree. It never reached a page only
because the block component builds its own `<pre>` and ignores incoming props —
one refactor away from being visible. **Renamed to `_ttcmd`**, the documented
escape. Confirmed on the rendered page: the `<pre>` carries `class` and
`tabindex` and nothing else, and `ttcmd=` appears nowhere in the DOM.

### Recorded, not fixed

**5. Criterion 19's margin is under three pixels and nothing checks it.**
`--control-space` is 72 px; the control's footprint is 69.2 px
(`min-width: 4.6em` at `--text-sm`, plus its 0.3 rem inset). Raising
`--text-sm`, widening the control's padding, or a monospace fallback with a
wider advance would silently put text back under it — and shrinking the
reservation is bounded from the other side by the 55-character line fitting the
measure. The comment in `code-block.module.css` warned about one direction; it
now warns about both. Not fixed further because both bounds are content-derived,
and inventing a check for a three-pixel slack is a worse trade than writing it
down.

**6. Check D covers the palette, not its use.** Nothing stops a future edit to
`components/code-block.module.css` from reaching for `--text-muted` or `--rule`
inside a surface that does not flip — which is spec decision 4, currently held
by discipline rather than by the build. A Check E confining that file to the
`--code-*` set would close it. Deliberately not added at the closing review:
criterion 5 is met and measured today, and a new build check is a new task, not
a fix.

**7. The code surface is 1.16:1 against the dark page.** `--bg-code` `#1e1d1b`
against `--bg` `#2a2926`; 15.58:1 on the light theme. Spec §1 asks for "a
surface distinctly darker than the page", and on the dark theme that separation
is carried mostly by the rounded corners. `--bg-code` is ADR-0007's and predates
this slice, and no numbered criterion measures it, so retuning it here would be
changing a ratified token silently. **Added to the outstanding by-eye list**;
the cheap answer if it does read as flat is a hairline in `--code-rule`, which
changes no ratified value.

**8. A marked line scrolled right is carried by the 1.19:1 band alone.** The
accent marker sits at the line's start and scrolls out of view with the code.
Spec decision 14 chose that explicitly over a pinned gutter, so it is sanctioned
rather than a defect — recorded because §6's "visible without colour" leans on
the marker.

**9. Every copy control has the same accessible name.** Nine identical "Kopiuj
kod do schowka" buttons in a screen reader's element list on the Git lesson, and
`tabIndex={0}` on all nine `<pre>`s including the six that do not scroll at a
desktop width. Both are deliberate — which blocks scroll depends on the
viewport, so a focusable region cannot be chosen at build time — and no
criterion requires otherwise. Distinguishing the labels wants the filename or a
section anchor, which is the contents-panel slice's material.

**10. `npm run lint` is red, and it is not this slice's.** Two
`react/no-unescaped-entities` errors at `app/styleguide/page.tsx:312-313`. The
identical JSX sits at line 229 of the same file at `61a4243`; the specimen block
merely displaced it. It is an App-lane change (Article IX) and therefore not
this slice's to make. **Flagged for Viktar.**

**Pass**, with the five by-eye judgements below still open.

---

## Outstanding — the judgements that need eyes

The pane never composited a frame, so `computer{action:"screenshot"}` timed out
on every call and no visual judgement could be made. As in slice 004, these are
listed rather than asserted.

| Criterion | What is already proved | What still needs looking at |
| --- | --- | --- |
| 7 — readable without colour | Every colour clears 4.5:1 against both grounds; the marked line is carried by lightness plus a marker, not by hue | Achromatopsia emulation on the Git lesson and on `/styleguide` |
| 11 — the control reads as quiet, not as broken | `#a29a8c` at rest, `#e8e4db` on focus, accent focus ring, exact position measured | Whether a muted label in the corner reads as a control at all, on a projector |
| 14 — the filename reads as a header | Font, size, colour, rule and geometry all measured; no seam by construction | Whether it reads as a header rather than as a first line of code |
| 21 — the diacritics draw | Both faces report they can render all 18 characters; text content intact | Whether `ł` and `ę` draw rather than falling back, in a code block specifically |
| the palette as a whole | Every ratio computed and recorded | Whether eight colours on warm near-black look like this site or like an editor — the taste question ADR-0011 exists to let Viktar veto |
| spec §1 — "distinctly darker than the page" | 1.16:1 on dark, 15.58:1 on light; the rounded corners and the gutter also separate the block | Whether a code block reads as an object on the dark theme. If it does not, a hairline in `--code-rule` fixes it without touching a ratified token |

Slice 004 settled its equivalent list from four screenshots supplied by Viktar,
recorded as task T12a. The same is available here, and until it happens these
five are honestly open.
