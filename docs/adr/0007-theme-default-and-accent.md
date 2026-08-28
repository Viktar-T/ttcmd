# ADR-0007 — Dark by default, and one periwinkle accent

- **Date:** 2026-08-28
- **Status:** accepted
- **Decision by:** Viktar (default theme), Viktar delegated (accent choice)
- **Amended:** 2026-08-28 — Decision 1 as first written said both that the
  toggle honours `prefers-color-scheme` on a first visit and that dark is what a
  visitor with no preference gets. Those disagree for a first-time visitor on a
  machine set to light, which is the common case on school hardware. Surfaced
  while speccing slice 003; Viktar resolved it in favour of dark, and the
  `prefers-color-scheme` clause is struck.
- **Unblocks:** slice 003, the type and theme foundation

## Context

`docs/design-reference.md` left three colour questions open, all of which block
003 because every component built before the tokens exist gets its colours
hard-coded and has to be revisited.

## Decision 1 — dark is the default

Both themes exist. **Dark is what a visitor with no preference gets**, matching
the reference — and a visitor has no preference until they use the toggle. The
operating system's `prefers-color-scheme` is not consulted.

The site is read in a classroom, on a projector and on shared school machines. A
default that varies with each machine's settings is a default nobody can be
shown; one that does not is a thing Viktar can point at.

Consequence to respect in implementation: the stored choice must be applied
**before first paint**. A flash of light theme on every navigation is worse than
having no toggle at all.

## Decision 2 — one accent, not one per module

Per-module accents are better wayfinding, but they multiply every contrast check
by the number of modules and would have to be got right in a slice that has
enough to do. **One accent site-wide.** The frontmatter field that would carry a
per-module colour is not added now; adding it later is not a migration.

## Decision 3 — the accent is a pale periwinkle

**`#C9C2F5`**

### Why this hue

**It carries no semantic load.** This is the binding argument. A programming
course needs callouts, and callouts need meanings: amber warns, red is an error,
green is expected output. An accent drawn from any of those collides with a
meaning students must be able to read at a glance — an amber accent makes every
page look mildly alarming and makes a real warning invisible. Blue is the one
remaining common convention (*note* / *info*). Periwinkle sits just off it:
recognisably not-blue, and free of every callout meaning.

That leaves the semantic set clean and unambiguous:

| Role | Colour |
| --- | --- |
| Accent / note | periwinkle `#C9C2F5` |
| Warning | amber `#E8C07A` |
| Error, gotcha | coral `#E89A8A` |
| Expected output, success | green `#9FD8A8` |

**It is cool against a warm ground.** The background is a warm charcoal. A cool
accent separates cleanly instead of muddying; a warm one would sit too close.

**It is not the reference's mint.** Copying the structure is the point; copying
the identity is not.

**Pale, because the accent does two jobs at once** — see below.

### The structural point: an accent needs two roles

The accent is both a **surface** (the stripe at the top of module and lesson
pages, carrying dark text) and a **line** (links, the circled letter, active
states, exercise markers). Those two roles cannot always be the same value:

- On the dark theme, one pale value serves both.
- On the light theme, the pale value still works as a surface, but as link text
  on a near-white page it fails contrast badly. The light theme therefore needs a
  **darker** accent for text and lines while keeping the pale one for surfaces.

Any token set with a single `--accent` will hit this on the light theme. Two
tokens from the start.

## Tokens

Names are indicative; the slice may rename, but the pairs must survive.

**Dark (default)**

| Token | Value |
| --- | --- |
| `--bg` | `#2A2926` warm charcoal |
| `--bg-code` | `#1E1D1B` |
| `--text` | `#EDEBE6` |
| `--text-muted` | `#A8A49C` |
| `--rule` | `#45433E` borders, the vertical rule beside the contents panel |
| `--accent-surface` | `#C9C2F5` |
| `--accent-line` | `#C9C2F5` |
| `--accent-ink` | `#1C1B18` text on an accent surface |

**Light**

| Token | Value |
| --- | --- |
| `--bg` | `#F7F6F2` warm off-white |
| `--bg-code` | `#1E1D1B` — code stays dark in both themes |
| `--text` | `#23221F` |
| `--text-muted` | `#5E5A53` |
| `--rule` | `#D8D5CD` |
| `--accent-surface` | `#C9C2F5` — unchanged |
| `--accent-line` | `#5B4FBF` — darker, for links and lines |
| `--accent-ink` | `#1C1B18` |

## Verification

Contrast ratios computed, not estimated:

| Pair | Ratio | Requirement |
| --- | --- | --- |
| `#C9C2F5` on `#2A2926` — accent text, dark theme | **8.68 : 1** | ≥ 4.5 ✓ |
| `#1C1B18` on `#C9C2F5` — dark text on the stripe | **10.27 : 1** | ≥ 4.5 ✓ |
| `#5B4FBF` on `#F7F6F2` — links, light theme | **5.86 : 1** | ≥ 4.5 ✓ |

`--text` on `--bg` in both themes is far above the threshold by construction and
should still be checked once rendered.

The remaining semantic colours (amber, coral, green) are **indicative and not yet
verified**. They must pass the same check before they ship — a callout is text on
a background like anything else. That belongs to the callout slice, not this one.

## Alternatives rejected

- **Amber / terminal gold.** The most tempting for a programming course, and the
  most wrong: it is the warning colour. An accent that means "caution" on every
  page destroys the callout system.
- **Green.** Reads as success or "test passed", and it is the reference's colour.
- **Blue.** Semantically taken by *note* / *info*. Also the default choice
  everywhere, which makes it invisible.
- **Per-module accents.** Deferred, see Decision 2.
- **Copying `#B0F5D0` from the reference.** Structure yes, identity no.
