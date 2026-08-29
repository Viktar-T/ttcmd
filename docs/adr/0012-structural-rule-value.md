# ADR-0012 — A rule you can see: `--rule-strong`

- **Date:** 2026-08-29
- **Status:** accepted
- **Amends:** ADR-0007, which fixed the token tables
- **Decision by:** Viktar delegated (AGENTS.md §4 — a value, reversible in one
  commit, living in one line of one file)
- **Unblocks:** slice 006, the navigation

## Context

Slice 003 computed `--rule` against the page background and recorded the result
rather than fixing it:

| | `--rule` | `--bg` | Ratio |
| --- | --- | --- | ---: |
| dark | `#45433E` | `#2A2926` | **1.47 : 1** |
| light | `#D8D5CD` | `#F7F6F2` | **1.36 : 1** |

WCAG 1.4.11 asks 3:1 of any visual information *needed to identify a user
interface component or its state*, and exempts purely decorative separators.
Every use of `--rule` in slices 003 to 005 is a hairline between sections, so
the exemption held — and `specs/003-type-and-theme/verification.md` says in as
many words that it holds **conditionally**, and that the navigation slice is
where the condition runs out.

It has run out. Slice 006 draws a card's frame, a chevron row's outline and a
button's border. In each of those the line **is** the component: nothing else
says where the card ends, nothing else says the row is one clickable thing, and
a button with no fill and no rounding is identified by its border and by
nothing else. At 1.47:1, on a projector, in a lit classroom, it is identified by
nothing at all.

Slice 004 already met a small version of this and answered it correctly: a
table whose first header cell is empty has only its underline separating header
from body, so that one rule took `--text-muted` and cleared 3:1 while the
decorative row separators kept `--rule`. This ADR generalises that answer into a
token rather than repeating the judgement per component.

## Decision

**One new token, `--rule-strong`, value `#83807A`, identical in both themes.**

| Theme | `--rule-strong` | against `--bg` | Ratio | Needs |
| --- | --- | --- | ---: | ---: |
| dark | `#83807A` | `#2A2926` | **3.69 : 1** | 3 |
| light | `#83807A` | `#F7F6F2` | **3.64 : 1** | 3 |

Computed with the WCAG 2.x relative-luminance formula, and — from slice 006
onward — **recomputed by the build on every run**, together with the four
contrast floors slices 003 and 004 established. Three verification documents now
contain ratios worked out by hand, every one of them true of the day it was
written and none of which would notice a token being edited afterwards.

`--rule` keeps its value and every use it already has. Nothing placed by slices
003, 004 or 005 is restyled.

**Where each is used, from here on:**

- `--rule` — a hairline that separates and means nothing: between sections, under
  a filename inside a code block, between the rows of a table, under the site
  header.
- `--rule-strong` — a line that *is* a component or its boundary: a card's frame,
  a chevron's outline, a button's border, an active item's edge.

## Why one value serves both themes

The two themes pull in opposite directions: a rule has to be lighter than a near
black page and darker than a near white one. A mid grey satisfies both, and
`#83807A` sits almost exactly where the two ratios meet — 3.69 and 3.64 — which
is where the worse of the two is at its best. Moving it lighter buys dark and
costs light, one for one. There is no single value that does better, and a value
per theme buys nothing over 3.64:1 while being two things to keep in step.

It is on the same warm ramp as the rest of the greys: `#45433E`, `#83807A`,
`#A8A49C` all step R > G > B by the same small amounts, so it reads as part of
this palette rather than as a neutral dropped into it.

## Alternatives rejected

- **Reusing `--rule` and hoping.** The thing the slice's own brief exists to
  forbid. 1.47:1 is not a near miss; it is half the required contrast.
- **Reusing `--text-muted`** (5.86:1 dark, 6.34:1 light). It clears the bar, and
  slice 004 used it for the one rule that carries meaning. But it is the *text*
  token: a card's frame drawn in the same value as the caption inside it makes
  the container and its contents one object, and at 5.86:1 a grid of framed
  cards reads as a spreadsheet.
- **Raising `--rule` itself to clear 3:1.** One token, no new name — and it
  restyles every hairline slices 003, 004 and 005 have already placed and
  measured: the lesson header's rule, the table's row separators, the code
  block's filename divider, the reference page's section rules. A decorative
  separator at 3.7:1 is a loud page.
- **A value per theme.** See above.
- **Leaving it to each component** to pick `--text-muted` or `--rule` as slice
  004 did once. It works, and it is a judgement that has to be made again every
  time, by whoever is writing the component, against a rule nobody re-reads.
