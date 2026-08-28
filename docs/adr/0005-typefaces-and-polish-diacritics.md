# ADR-0005 — Typefaces, and the rule that they must render Polish

- **Date:** 2026-08-28
- **Status:** accepted
- **Amends:** `constitution.md`, Article III
- **Decision by:** Viktar

## Context

`docs/design-reference.md` commits ttcmd to the reference's type split:
monospace for structure (navigation, headings, breadcrumbs, the contents panel,
lesson titles) and a proportional sans for prose.

That is only safe if both faces carry the Polish alphabet. All student-facing
text is Polish (Article III), and a lesson title is exactly where a missing
glyph is most visible.

The Polish alphabet splits across two Unicode blocks, which is where the danger
actually lies:

| Characters | Block | Google Fonts subset |
| --- | --- | --- |
| ó Ó | Latin-1 Supplement (U+00F3, U+00D3) | `latin` |
| ą ć ę ł ń ś ź ż and capitals | Latin Extended-A (U+0104–U+017C) | **`latin-ext`** |

**The real trap is not the font — it is the subset.** `next/font/google`
requires an explicit `subsets` array, and every tutorial and scaffold writes
`subsets: ['latin']`. With that, `ó` renders and `ł` does not: the browser
silently falls back to another family for that one glyph, or draws tofu. The
build passes. The lint passes. `Moduł` looks wrong on a projector in front of
thirty students.

## Decision

**Faces**

- **Monospace: JetBrains Mono.** Verified: its Google Fonts metadata declares
  `latin`, `latin-ext`, `cyrillic`, `cyrillic-ext`, `greek`, `vietnamese`.
  Designed for code, holds up at heading sizes, open licence.
- **Prose: Inter.** Verified: declares `latin`, `latin-ext`, `cyrillic`,
  `cyrillic-ext`, `greek`, `greek-ext`, `vietnamese`. Built for screen reading
  at small sizes.

**Loading**

- Both are loaded through `next/font`, which self-hosts them at build time. No
  request leaves the visitor's browser to a third party, and there is no
  layout shift from a late-arriving face.
- **Both must declare `subsets: ['latin', 'latin-ext']`.** Not `['latin']`.
- Both are exposed as CSS custom properties so no component names a family
  directly.

**The rule, which outlives these two fonts**

No typeface is adopted in this repository until it has been verified to render
the full Polish alphabet — **ą ć ę ł ń ó ś ź ż Ą Ć Ę Ł Ń Ó Ś Ź Ż** — *and* the
subset carrying those glyphs is explicitly requested at load time.

This is added to Article III, because it is a language-correctness rule and it
must not depend on anyone remembering this file.

## Verification

Two checks, both cheap, both belonging to the styling slice's acceptance
criteria rather than to anyone's memory:

1. **A guard against the subset trap.** The font configuration must name
   `latin-ext`; a check that fails the build if it does not. One line of code
   catches the entire failure mode described above.
2. **A visible pangram.** The placeholder content carries the Polish test
   string below, so a missing glyph is seen rather than reasoned about:

   ```
   Zażółć gęślą jaźń — ĄĆĘŁŃÓŚŹŻ ążćęłńóśź
   ```

   That sentence uses every Polish diacritic. Render it in both faces, at
   heading and body size, in both themes.

## Alternatives rejected

- **A system monospace stack** (`ui-monospace`, Menlo, Consolas, DejaVu Sans
  Mono). Free and fast, but the face differs per operating system, so the
  headings — the site's signature — would look different on every machine, and
  Polish coverage would vary with whatever the student happens to have.
- **Fonts with attractive display shapes but partial Latin coverage.** Several
  popular monospaces ship `latin` only. They are not candidates, whatever they
  look like.
- **Loading from the Google Fonts CDN.** A third-party request per visitor, a
  layout shift, and an external dependency for a site that has none.
- **Skipping monospace headings** to dodge the issue. It would remove the single
  cheapest and most distinctive thing the reference does.

## Consequences

- Two webfont families are now a build dependency. Both are self-hosted, so the
  runtime cost is a font file, not a network round trip.
- Any future face — a display font, an icon font — must pass the Article III
  check before it is added.
- If either family is later replaced, this ADR is superseded by a new one; the
  rule in Article III stays regardless.
