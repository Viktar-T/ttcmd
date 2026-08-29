# ADR-0011 — The code block palette: eight colours, and none of them move with the theme

- **Date:** 2026-08-29
- **Status:** accepted
- **Decision by:** agent, under AGENTS.md §4. This is a taste decision and it is
  **recorded rather than escalated**: it is reversible in one commit, it lives
  in one block of one file, and §4's mechanism for exactly this is that Viktar
  reviews the decision list and vetoes what he disagrees with. The veto here is
  an edit to that block; nothing else moves.
- **Slice:** 005-code-blocks, task T03.
- **Depends on:** ADR-0007 (the accent, and that the code surface stays dark in
  both themes), ADR-0010 (the highlighter emits variables, not colours).
- **Number claimed** after listing `docs/adr/` on 2026-08-29; `0010` was the
  highest.

## Context

ADR-0010 configures the highlighter to emit `var(--code-…)` instead of colours,
which leaves the colours themselves undecided and puts them in `app/tokens.css`
— the only file allowed to hold one. Nothing in the repository had a value for
them. `docs/design-reference.md` settles the surface ("near-black background,
distinctly darker than the page") and says nothing about what sits on it.

Two constraints do most of the deciding.

**The surface does not change with the theme.** ADR-0007 already settled that
code stays dark on the light theme, and `app/tokens.css` carries `--bg-code` at
the same value in both. Follow that through and it forces a rule: **every colour
on that surface has to be theme-independent too.** A colour that flips
underneath a ground that does not is legible on one theme and invisible on the
other — and the light theme is not the one anybody looks at while building this.
Reusing `--text-muted` for a comment would have been the obvious thing to do and
would have rendered `#5e5a53` on `#1e1d1b`, about 2:1, on every light-theme
page.

**Highlighting is supplementary, not information.** The code has to be
completely readable with colour removed, which means no colour here is allowed
to be decorative-and-dim. Every one of them is body text and every one of them
clears 4.5:1 — against the surface *and* against the marked-line band, since a
marked line changes the ground under the text.

## Options considered

| Option | Why not |
| --- | --- |
| Adopt a well-known editor theme (One Dark, Vitesse, GitHub Dark) | The fastest answer, and the palette arrives as markup rather than as tokens — invisible to slice 003's guard, unchangeable without changing the tool, and belonging to somebody else's product. Its hues are also tuned against its own background, not against this site's warm charcoal. |
| Reuse the page palette — `--text`, `--text-muted`, `--rule`, `--accent-line` | Tempting because it introduces no new value at all. It is wrong for the reason above: those tokens flip with the theme and the surface does not. `--accent-line` alone would render at `#5b4fbf` on near-black on every light-theme page. |
| A second palette for a light code surface | Re-opens ADR-0007 and doubles what has to be checked, for a surface that does not change. |
| The full range an editor theme distinguishes (15–25 slots) | On a lesson page that is noise, and every extra hue is another value that has to clear the contrast floor against two grounds. |
| **Eight colours, defined once, all ≥ 4.5:1** | **Accepted.** |

## Decision

**Eight text colours: four steps of a warm grey ramp, and four hues.** They are
defined once on bare `:root` in `app/tokens.css` and never repeated under
`[data-theme]`.

| Variable | Value | vs surface | vs band | What it lands on |
| --- | --- | --- | --- | --- |
| `--code-foreground` | `#e8e4db` | 13.28:1 | 11.12:1 | plain code, operators, punctuation |
| `--code-token-string` | `#bdb6a8` | 8.36:1 | 7.00:1 | the generic `string` scope — in shell, an unquoted argument |
| `--code-token-punctuation` | `#b0a99c` | 7.22:1 | 6.05:1 | separators |
| `--code-token-comment` | `#a29a8c` | 6.05:1 | 5.06:1 | comments |
| `--code-token-keyword` | `#c9c2f5` | 10.04:1 | 8.41:1 | keywords, modifiers, storage types |
| `--code-token-function` | `#8ed6c8` | 10.11:1 | 8.47:1 | function names, type names, shell commands |
| `--code-token-string-expression` | `#e8c188` | 9.96:1 | 8.34:1 | `string.quoted` — a real string, in C# and in shell alike |
| `--code-token-constant` | `#f0aca2` | 8.93:1 | 7.48:1 | numbers, and variables |

Surface `#1e1d1b` (`--bg-code`, unchanged). Band `#2e2b25`, 1.19:1 against the
surface. Ratios are WCAG 2.x, computed with the same arithmetic slices 003 and
004 used; the script and its output are in
`specs/005-code-blocks/verification.md`.

Three decisions inside that table are worth naming.

**Keywords take the site accent, `#c9c2f5`.** Keywords are the structure of a
language, and the accent is what marks structure everywhere else on this site —
the circled lesson letter, link underlines, the marked line. Code then looks
like part of the site rather than like a screenshot pasted into it.

**`--code-token-string` is quiet and `--code-token-string-expression` is not**,
which reads backwards until you look at what the scopes are. `string.quoted`
maps to `string-expression`, so a real string — `"Imie Nazwisko"` in shell,
`"Ilość musi być dodatnia"` in C# — takes the amber. The bare `string` scope is
what a shell grammar gives an *unquoted argument*, and an argument is the
plainest thing on a command line. The result is that `git config --global
user.name "Imie Nazwisko"` reads as command, arguments, string — which is what
it is. Verified by tokenising both languages and printing the mapping, not
inferred from the names.

**The marked-line band is a change in lightness, not a hue**, so a marked line
stays marked with colour removed from the page. Its marker is
`var(--accent-surface)`, for the same reason keywords are periwinkle.

**Everything else the theme can emit is an alias**, not a new value: the three
diff colours and the sixteen terminal ANSI slots. Nothing on the site renders
any of them today, and an undefined one would render as ordinary body text with
no error — so they are defined rather than left as a hole. Four of the ANSI
slots (black, magenta, cyan, white) collide with something else and bright is
not distinguished from normal; that is an accurate statement of how much thought
terminal output has had, and the slice that renders any is the slice that fixes
it. ANSI black is deliberately **not** black: on a near-black surface that is an
invisible slot rather than a dark one.

## Consequences

- **Two build checks, because neither failure is visible.** Check C fails the
  build when the theme can emit a variable `tokens.css` does not define. Check D
  fails it when a `--code-…` is defined under `[data-theme]`, **or** when a
  palette entry written as `var(--x)` refers to an `--x` whose value differs
  between themes. The second half is what keeps `--code-background:
  var(--bg-code)` and `--code-line-marker: var(--accent-surface)` honest: both
  are aliases of existing tokens rather than duplicated literals, and both are
  only theme-independent for as long as what they point at is.
- **Both checks were broken deliberately and shown to fail** before this ADR was
  written. The output is in the slice's `verification.md`.
- **The palette is eight values in one block.** Vetoing it is editing that block.
  Nothing else in the repository names a code colour.
- **The four hues are close in lightness** — 8.9:1 to 10.1:1 — so in greyscale
  they read as one tone, and it is the ramp (foreground bright, comment quiet)
  that carries the structure. That is intended and it is what "highlighting is
  supplementary" means: the distinctions colour makes are a convenience, and the
  code is readable without any of them.
- **The semantic callout colours of ADR-0007 are untouched.** This is a separate
  set on a separate surface and settles nothing about them.
