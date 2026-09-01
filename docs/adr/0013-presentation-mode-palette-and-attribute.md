# ADR-0013 — The presentation palette, and the mode it belongs to

- **Date:** 2026-09-01
- **Status:** proposed — written inside an autonomous run (AGENTS.md §2), so
  nothing here has been read by Viktar. The **dark red is his**, stated in the
  slice's brief; the values, the structure and the attribute are this ADR's, for
  him to accept or veto.
- **Amends:** nothing. ADR-0007 fixed the theme default and the accent and is
  untouched; this adds a palette beside it, for a mode that did not exist when
  0007 was written.
- **Number:** `docs/adr/` was listed before the number was claimed (AGENTS.md
  §7). `0012` was the highest; this is `0013`.
- **Unblocks:** slice 013, presentation mode

## Context

The site is taught from. Every week the course runs in front of a class, from a
projector, and what should be on the projector is the course site itself — the
same page the student opens that evening. A lesson page cannot do that job as it
stands: twenty paragraphs of evenly set Polish give a class no place to look.

Slice 013 adds a second mode. The author marks the fragments to be read aloud
with a plain `<mark>`; in **reading** mode — the default, and the site as it is
today — nothing distinguishes them, and in **presentation** mode they light up
and the prose around them steps back.

That needs two things this repository has not had to decide before: **a second
colour with a semantic load**, and **a second piece of state on the root
element**. ADR-0007 chose the site's one accent *precisely because it carries no
semantic load* — amber means warning, red means error, green means success — so a
red entering the palette is exactly the kind of thing that should be recorded
here rather than discovered in a token file later.

## Decision 1 — the palette

**Four tokens, in `app/tokens.css`, on bare `:root`.** Three of them are the same
value in both themes; the fourth is an alias.

| Token | Value | Role |
| --- | --- | --- |
| `--present-fill` | `#6E1C1C` | the highlight behind a marked fragment |
| `--present-ink` | `#F8EFEC` | its text |
| `--present-line` | `#CE6262` | its boundary |
| `--present-dim` | `var(--text-muted)` | the prose behind it, stepped back |

Computed with the WCAG 2.x relative-luminance formula, against `--bg` = `#2A2926`
(dark) and `#F7F6F2` (light), and — this is the point — **recomputed by
`scripts/check-design-invariants.mjs` on every build**, in both themes, beside
the floors slices 003, 004 and 012 already hold:

| Pair | Floor | Dark | Light |
| --- | ---: | ---: | ---: |
| `--present-ink` on `--present-fill` | 4.5 | **10.05** | **10.05** |
| `--present-line` on `--bg` | 3 | **3.84** | **3.50** |
| `--present-dim` on `--bg` | 4.5 | **5.86** | **6.34** |
| `--present-fill` on `--bg` | *none* | 1.28 | 10.52 |

### The fill is deliberately held to no floor

The last row is the one that has to be argued rather than noticed.

A fill dark enough to be **dark red** has a relative luminance around 0.04. The
dark page is 0.022. Clearing WCAG 1.4.11's 3:1 against it would need a luminance
above 0.166 — four times as light — which is not dark red any more, it is coral.
The fill cannot be both the colour Viktar chose and 3:1 against a near-black
page; the arithmetic does not allow it.

So the roles are split, exactly as ADR-0012 splits `--rule` from `--rule-strong`:

- **The fill carries the identity.** It is what makes a lit fragment recognisably
  *this* site's highlight, and on the light theme it is also a strong block at
  10.52:1.
- **The line carries the shape.** It is the visual information that identifies
  the component, so it is what 1.4.11 applies to, and it clears 3:1 on **both**
  pages.

Written down because a missing row in a contrast table is the exact shape of an
oversight, and the next person to read that table should find the reason there
rather than assume nobody looked.

### Why the line's value is where it is

A single value clearing 3:1 against both a near-black and a near-white page is
confined to a narrow luminance band — above `3(L_dark + 0.05) − 0.05` and below
`(L_light + 0.05)/3 − 0.05`. That is the identical constraint `--rule-strong`
sits under, and ADR-0012 solved it by taking the point where the two ratios meet.

This line has a **third** ground `--rule-strong` never had: it is drawn on the
fill. So inside that band it is placed to clear 3:1 against the fill as well —
**3.84 on the dark page, 3.50 on the light one, 3.01 on the fill** — rather than
at the two-ground optimum. It is the fill's own hue, lifted, so the boundary
reads as part of the highlight rather than as a generic outline.

### Why the ink is a literal and not `var(--text)`

`--text` flips with the theme. The ground under the ink does not. Aliasing them
would render the lit fragment near-black on dark red at about 1.7:1 on the light
theme — and invisibly so to anyone building this while looking at the dark one,
which is everyone. It is the same failure Check D exists to catch in the code
palette next door, arrived at by a different route.

### Why the dim is an alias

`--text-muted` already means *quieter* on this site, it is above the body-text
floor in both themes, and no new hue enters for it. **Dimmed means quieter, never
illegible**, and the 4.5:1 floor is what stops it going further. If the projector
says the step is too small, this alias is the one line that moves, and Check E
re-checks the floor the same minute.

## Decision 2 — the mode is a second attribute, not a third theme

**`data-mode="presentation"` on `<html>`, absent for reading**, persisted in
`localStorage` under `ttcmd-mode`, and applied by the same parser-blocking inline
script in `<head>` that already applies the theme.

Three properties, each chosen rather than inherited:

- **Orthogonal to the theme.** Presentation works on dark and on light. A teacher
  does not know which theme the classroom machine is in and should not have to
  give one up to teach.
- **Reading is the *absence* of the attribute**, not `data-mode="reading"`. That
  makes reading what the served bytes already say and what renders if the script
  never runs — a default expressed as a CSS fact rather than as a promise about
  JavaScript, which is how ADR-0007 already treats dark.
- **One script, not two.** The theme's pre-paint script is extended, not
  duplicated. The reason it is a raw inline script rather than `next/script` is
  recorded in `app/layout.tsx` and is unchanged.

The palette above is **never** defined under `[data-mode]` in `app/tokens.css`.
Check E enumerates themes by looking for `[data-theme` in a selector, so a token
hidden under `[data-mode]` would be a colour held to no floor and reported for
neither theme. The mode's rules rebind tokens on `.prose`, in
`app/presentation.css`, and never on `:root`.

## Alternatives rejected

- **A third `data-theme` value.** One attribute, no new state — and presentation
  mode would then exist in exactly one theme, and switching to it would throw
  away the reader's choice of dark or light every time the class starts.
- **A `data-presentation` boolean**, the idiom `data-band` and `data-full-bleed`
  already use. It is the same thing in fewer characters; `data-mode` is the exact
  sibling of `data-theme`, reads the same way in a stylesheet, and leaves room
  for a third mode without a rename.
- **Lightening the fill until it clears 3:1 on the dark page.** One token, no
  split of roles, one fewer thing to explain — and it ships a colour that is not
  the one Viktar chose. The fill was the one decision this slice was told not to
  re-open.
- **A fill per theme** — dark red on light, something lighter on dark. Each theme
  gets its best highlight, and the lit fragment becomes two different things, so
  a teacher has a reason to care which theme the classroom machine is in. That is
  the reason the code palette next door is theme-independent too.
- **A new, deeper grey for the dim** instead of `--text-muted`. It buys a bigger
  step down, and the 4.5:1 floor caps how much bigger — about 1.3× before it is
  illegible — for the cost of a hue that has to be defended in two themes.
- **Fading the prose with `opacity`.** One declaration, no tokens at all — and
  opacity on an ancestor fades the highlight with it, and the text it does fade
  drops under the contrast floor. It fails the constraint from both ends.
- **A second, dimmed code palette**, so code blocks recede with the prose. Eight
  colours to keep in step with eight others, for a surface that is usually the
  thing the class has been asked to look at.
- **Persisting the mode for the browser session only.** It would forget between
  two lessons on the same morning, and the brief asks for the mode to survive
  navigation the way the theme does. A shared classroom machine left in
  presentation mode is a student pressing one button, which is a state they can
  see and undo.
