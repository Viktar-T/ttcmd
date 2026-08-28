# verification.md — 003-type-and-theme

Evidence for the acceptance criteria in `spec.md`. Ratios are **computed**, not
estimated. Checked 2026-08-28 against the dev server on `localhost:3000`,
Next 16.3.3, Chromium.

---

## Contrast

Computed with the WCAG 2.x relative-luminance formula over the values in
`app/tokens.css`.

### Dark (the default)

| Pair | Foreground | Background | Ratio | Needs | |
| --- | --- | --- | ---: | ---: | --- |
| body text, and headings | `--text` | `--bg` | **12.21** | 4.5 | pass |
| muted text | `--text-muted` | `--bg` | **5.86** | 4.5 | pass |
| links | `--accent-line` | `--bg` | **8.67** | 4.5 | pass |
| text on the stripe | `--accent-ink` | `--accent-surface` | **10.27** | 4.5 | pass |
| inline code | `--text-muted` | `--bg` | **5.86** | 4.5 | pass |

### Light

| Pair | Foreground | Background | Ratio | Needs | |
| --- | --- | --- | ---: | ---: | --- |
| body text, and headings | `--text` | `--bg` | **14.71** | 4.5 | pass |
| muted text | `--text-muted` | `--bg` | **6.34** | 4.5 | pass |
| links | `--accent-line` | `--bg` | **5.86** | 4.5 | pass |
| text on the stripe | `--accent-ink` | `--accent-surface` | **10.27** | 4.5 | pass |
| inline code | `--text-muted` | `--bg` | **6.34** | 4.5 | pass |

Large headings need only 3:1 and clear it by the same values as body text.

**These reproduce ADR-0007's own figures** — 8.68 / 10.27 / 5.86 there against
8.67 / 10.27 / 5.86 here, the first differing only in rounding. Two independent
computations agreeing is worth more than either alone.

### `--rule`, and why it is not a failure

`--rule` against `--bg` is **1.47:1** on dark and **1.36:1** on light — well
under the 3:1 that WCAG 1.4.11 asks of non-text contrast.

It is recorded rather than fixed, because 1.4.11 governs UI components and
graphics *needed to understand the content*, and exempts purely decorative
separators. Every current use of `--rule` is a hairline between sections. The
one place it touches an interactive control is the theme toggle's border, and
that control is identified by its icon at `--text-muted` — 5.86:1 — not by its
border.

**This becomes a real question for the navigation slice**, where
`design-reference.md` puts a vertical rule beside the contents panel and an
active-item boundary. If a rule ever carries meaning rather than decoration, it
needs its own value at 3:1 and an ADR amending 0007. Flagged, not deferred
silently.

## Typefaces and Polish

`document.fonts.status` was `loaded`, and `document.fonts.check` returned true
for the full pangram in both families.

Tofu cannot be reasoned about, so it was **measured**:

- **JetBrains Mono.** All 18 Polish diacritics — ą ć ę ł ń ó ś ź ż Ą Ć Ę Ł Ń Ó Ś
  Ź Ż — measure exactly the monospace advance of `19.2px` at 32px, the same as
  `x`. A glyph served by a fallback family would not share that advance.
  Outliers: **none**.
- **Inter.** Each of the 18 was measured against the same character rendered in
  a deliberately non-existent family, which forces the generic fallback. All 18
  differ, so the real face is drawing them. Characters measuring as fallback:
  **none**.

The build's generated CSS carries **two** `@font-face` blocks whose
`unicode-range` begins `U+100-2BA` — the Latin Extended-A range holding
U+0104–U+017C — one per family.

## Themes

| Check | Result |
| --- | --- |
| First visit, nothing stored, OS set to **light** | `data-theme="dark"`, background `rgb(42,41,38)` — the OS is not consulted |
| First visit, nothing stored, OS set to dark | dark |
| Toggle | flips `data-theme` and writes `ttcmd-theme` |
| Survives a reload | yes — light restored with `--accent-line` `#5b4fbf` |
| Survives a navigation to another lesson | yes |
| Swatch set changes with the theme | 8 of 11 tokens change; the 3 that do not (`--bg-code`, `--accent-surface`, `--accent-ink`) are exactly the three ADR-0007 defines as identical in both themes |

**Pre-paint.** In the HTML the browser is actually served, the theme script is a
synchronous inline `<script>` at byte 1748, inside `<head>`, before `<body>` at
byte 1990, with only `async` scripts ahead of it. A synchronous inline script in
`<head>` blocks parsing, and a browser cannot paint before it has parsed
`<body>` — so it runs before the first paint by construction. React 19 did not
relocate it, which was the risk the plan flagged.

## The split, on the real lessons

All six written lessons render with `data-theme="dark"`, Polish diacritics
present in the body text, and between 7 and 14 headings each.

Measured on `co-model-naprawde-potrafi`, in **both** themes: `h1` and `h2` in
JetBrains Mono, `p` and `li` in Inter. No lesson file was touched — the split
arrives by inheritance, which was the point of setting it on plain elements.

## Phone width

At 375×812, on a lesson in both themes and on the reference page:
`scrollWidth === clientWidth === 375`, and **no element** extends past the
viewport. The 36px monospace pangram wraps rather than widening the page.

## No hard-coded colour

`grep` over `app/` and `lib/` for hex and the colour functions returns **16
lines, all of them in `app/tokens.css`** — the eight dark tokens and the eight
light ones. Fourteen source files were scanned. **No exemption comment was
needed anywhere**, so the exemption mechanism is currently unused, which is the
state to prefer.

The guard itself is demonstrated in the T03 and T05 commits: each was broken on
purpose, the build shown failing with the reason named, and reverted.

---

## The two checks that needed eyes

Both were made by Viktar on 2026-08-28, after the automated pass above. They are
recorded here because they are the evidence, and neither can be produced by
measurement.

**Criterion 11 — the light theme's link colour, judged on rendered Polish
prose.** `#5B4FBF` computes to 5.86:1, and the criterion exists precisely
because passing arithmetic is not the same as reading well. Judged on the
paragraph under "The split" at `/styleguide`, with a link mid-sentence:
**reads fine, passes.** ADR-0007's two-value accent is confirmed by use, not
only by ratio — the light theme keeps the pale value as a surface and the darker
one for lines, and the darker one holds up as link text.

**Criterion 9 — no flash, on a throttled connection.** With `light` stored and
the network throttled, a reload paints light on the first frame: **no flash of
dark, passes.** This is the empirical half of the structural argument above, and
it closes the plan's main risk — React 19 leaving the inline script where it was
written, early enough to matter.

One limitation stands, and it changes nothing: the toggle was exercised in the
automated pass by a click dispatched through the DOM, which runs React's real
handler through the real event system. An OS-level mouse click could not be
routed to a browser pane that was not displaying. The control's behaviour under
a real pointer is covered by Viktar's own two passes above.

---

## Closing review (T09)

Carried out in a fresh context on 2026-08-28, per AGENTS.md §3 and Article IX.
The reviewer did not write this code, re-ran the checks rather than trusting
this file, and modified nothing.

**Verdict: the slice closes.** All 14 acceptance criteria met. No `003/T`
commit touched anything outside `app/`, `scripts/`, `package.json` and
`specs/003-type-and-theme/`; `spec.md` and `plan.md` were never edited after
T01. Each item of the spec's "Out of scope" list was checked individually and
found absent.

Independently reproduced rather than taken on trust: all 16 token values against
ADR-0007 by hand, every contrast ratio from scratch, the glyph-advance
measurements, the grep for colour literals, and the pre-paint script's position —
that last one in the **production** HTML rather than the dev server's.

### What it found

**One real defect, since fixed.** Check B had three ways past it: 4-digit hex
`#1234`, uppercase `RGB(` (CSS function names are case-insensitive), and
`lab()` / `lch()` / `color()`. The realistic paste case was always caught, so
criteria 3 and 12 stood — but spec §2 promises the rule is enforced by the build
rather than by memory, and slice 004 is who that promise is for. Widened and
verified in commit `8a64c6b`.

Three findings left as recorded, not fixed:

- **Check A's failure message does not say *which* font call failed.** With two
  calls in one file it is a short hunt, and criterion 2 only asks that the
  failure name the reason, which it does.
- **`--leading-tight` and `--leading-normal` carry no labelled swatch.** A
  swatch of a line height is not a meaningful object and both are exercised by
  the specimens. Recorded as checked, not as a defect.
- **`spec.md` has no `## Decisions taken` section.** AGENTS.md §4 introduced
  that requirement in commit `60fd2a5`, **22 minutes after** the spec was
  recorded in `da136e7`. The rule postdates the spec, so this is not a gap in
  003, and retro-fitting it would mean editing an approved spec — forbidden by
  AGENTS.md §8, and Article II prefers the visible seam. Slice 004's spec is the
  first that should carry the section.

### Deliberately confirmed as sound

`suppressHydrationWarning` sits on `<html>`, the element the script actually
mutates, and no second mismatch path exists. The stateless toggle is sound —
the CSS icon swap survives module compilation and was observed working. The
`--link` alias resolves correctly in both themes despite its block sitting after
the light overrides, because `var()` resolves against the element's computed
value. `prefers-color-scheme` appears nowhere in the source or the built CSS.
`--text` on `--bg-code` is 1.06:1 in the light theme, but nothing in this slice
renders text on that surface — it is slice 005's question, correctly unanswered
here.
