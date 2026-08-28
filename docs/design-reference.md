# design-reference.md — the model ttcmd follows

**Reference:** [fullstackopen.com/en](https://fullstackopen.com/en/) — University of
Helsinki's open full-stack course.

| | |
| --- | --- |
| Status | **Intention.** Not law; `constitution.md` still outranks it. |
| Purpose | So "make it look like Fullstack Open" means something specific and checkable |
| Evidence | Page fetches plus screenshots of the landing page, a part page and a chapter page, 2026-08-27 |
| Colour values | **Approximate — read off screenshots.** Sample from the live site before committing them to tokens. |

---

## Why this reference, and not a prettier one

Fullstack Open is a **reading and doing** site, and that is exactly the problem
ttcmd has: long technical text in Polish, code students must copy, and exercises
they must complete, read on a phone in a lit classroom and on a laptop at home.

Everything it does well follows from that. The things we drop are the things
that serve *its* institution rather than its students.

## Structure — the mapping

| Fullstack Open | ttcmd |
| --- | --- |
| Part 0…14 | **Moduł 1…N** — `content/moduly/NN-slug/` (already exists) |
| Chapter a, b, c, d within a part | **Lekcja 1a, 1b, 1c** — the letter derived from `order`, never stored by hand |
| Exercise 1.1, 1.2 … numbered across the whole part | **Zadanie 1.1, 1.2 …** numbered across the whole **module** |
| Course contents page | The module listing at `/moduly` |
| Landing page with parts grid | Landing page with module grid |
| "Suggest an improvement" | "Zgłoś problem" → a GitHub **issue** |
| Language selector (6 languages) | **Dropped.** Polish only. |

### Numbering is identity, not decoration

`1b` is what a teacher says out loud and what a student types into a browser.
It has to be stable and derivable:

- A module's number comes from its folder prefix (`01-`, `02-`).
- A lesson's letter comes from its `order` within the module (1 → a, 2 → b).
- **Exercise numbers are `<module>.<n>`, running continuously across the whole
  module** — a lesson does not restart at 1.

Confirmed on screen: the chapter's own table of contents ends with an entry
reading *"Exercises 1.1.-1.2."* — the exercises are a numbered section of the
chapter, and the numbers belong to the part, not the chapter.

That has a real implementation consequence: an exercise component cannot know
its own number from inside one file. Numbering must be resolved at the module
level, across lessons, in `order`. Any plan that computes it per-file is wrong.

> **Proposed constitution amendment.** Article VI fixes the module→lesson axis
> but says nothing about numbering, and this rule is durable enough that a
> future slice must not casually change it. An agent may only *propose* an
> amendment (Article X) — so this is a proposal, for an ADR, not an edit.

---

## The two decisions that define the look

Everything visual follows from these two. Get them right and the rest is detail.

### 1. Dark first

**The site is dark by default**, not light. The background is a warm, slightly
olive charcoal — roughly `#2E2D28` — not black and not a cool grey. Body text is
a soft near-white, around `#F0EFEA`. The theme toggle in the header shows a sun,
i.e. it offers *light* as the alternative.

This corrects an earlier assumption in this file: the `#e1e1e1` value in the
site's metadata is not the page background.

**Decision needed:** ttcmd's dark mode is already agreed, but *which theme is
default* is still open. Matching the reference means dark-first. Consider that
students read this on school machines in bright rooms.

### 2. Monospace for structure, proportional sans for prose

This is the signature, and it is nearly free to copy.

**Monospace** — logo, every navigation item, the hero headline, "Part 0", part
subtitles, breadcrumbs, the chapter list, the lesson title, and the whole
left-hand table of contents.

**Proportional sans** — body paragraphs, and only body paragraphs.

The effect is that everything *structural* reads as code and everything you
actually *read* is comfortable. In the screenshots the contrast is unmistakable:
"Introduction to React" as a heading is monospace, while the paragraph beneath it
is not.

Two details that matter when implementing:

- **Section headings inside the article are monospace too.** `Complex state` as
  an `h2` in the middle of a lesson is mono, in a lighter tone than the body.
  The rule is not "headings of pages" — it is *every* heading.
- **Inline code inside prose is monospace with no background box** — just the
  different face, slightly smaller, slightly lighter. `useState` sits inside a
  sans sentence without a grey pill around it. Quieter than the usual treatment,
  and it stops a paragraph full of identifiers looking like a ransom note.

**The faces are decided — ADR-0005.** Monospace **JetBrains Mono**, prose
**Inter**. Both verified to ship a `latin-ext` subset, which is where Polish
lives.

And the trap Polish sets here is not the font, it is the subset: `ó` sits in
Latin-1 while `ą ć ę ł ń ś ź ż` sit in Latin Extended-A. Load only `latin` — the
default in every Next.js scaffold and tutorial — and `ó` renders while `ł`
silently falls back or draws tofu, with no build error. Both faces must declare
`subsets: ['latin', 'latin-ext']`, and a check must fail the build if they do
not. Article III now carries this rule for every future typeface.

---

## Colour

- **Background (dark):** warm charcoal, ≈ `#2E2D28`
- **Text on dark:** ≈ `#F0EFEA`
- **Code block:** darker than the page, near-black, rounded corners
- **Accent:** a saturated pastel — Part 1 uses a mint green, ≈ `#B0F5D0`

The accent is used, and only used, for: the wide band at the top of part and
lesson pages, the circle around the lesson letter, link underlines in prose,
the border around terminal screenshots, and fills inside the illustrations.

**Per-part accent colours.** Each part appears to carry its own accent, so the
colour itself tells a student which part they are in — wayfinding that costs no
screen space. For ttcmd this would be one token per module, set in the module's
frontmatter, defaulting to a single accent when absent.

Worth having, but **optional**, and it must not delay anything. If it is skipped,
one accent for the whole site is perfectly coherent.

Contrast in both themes: body text ≥ 4.5:1, large headings ≥ 3:1. A pale mint on
warm charcoal passes easily; the same mint on a light background will not.

## ttcmd's palette — decided (ADR-0007)

**Dark is the default.** Both themes exist; a visitor with no stored preference
gets dark, whatever their operating system is set to, and the stored choice must
be applied **before first paint**.

**One accent, site-wide: a pale periwinkle `#C9C2F5`.** Chosen because it carries
no semantic load — amber means warning, red means error, green means success, and
blue is taken by *note*. An accent drawn from any of those makes every page look
like a callout and makes real callouts unreadable. Periwinkle sits just off blue:
cool against the warm charcoal ground, and distinct from the reference's mint.

**The accent needs two tokens, not one.** It is both a *surface* (the stripe,
carrying dark text) and a *line* (links, the circled letter, active states). On
the dark theme one pale value does both; on the light theme the pale value still
works as a surface but fails as link text on near-white, so the light theme needs
a darker `--accent-line` (`#5B4FBF`). A token set with a single `--accent` will
break the moment the light theme is tried.

Full token tables and the computed contrast ratios — 8.68:1, 10.27:1, 5.86:1 —
are in ADR-0007. The semantic callout colours listed there are indicative and
still need checking before they ship.

---

## Page composition

### Landing (`/`)

Dark throughout. In order: large monospace headline over two lines; a smaller
label beneath it; a bordered rectangular **"Start course"** button; then a short
prose description in sans. An illustration sits to the right.

Then the **module grid, three across**. Each card is a large light illustration
tile inside a doubled frame, with the monospace title (`Part 0`) beneath it and a
one-line subtitle below that.

For ttcmd: same grid, same rhythm, **no illustrations** — see below.

### Module overview (`/moduly/[modul]`)

A wide accent-coloured band carrying the breadcrumb, a short paragraph on what
this module covers, and — a detail worth stealing — an italic *"Part updated on
17th January 2025"* line followed by a bulleted list of what changed. Honest,
cheap, and exactly what a student wants to know when they return to a page.

Below the band, the lesson list as **chevron-shaped rows** of staggered width:
`a Introduction to React`, `b JavaScript`, and so on — light fill, dark text, a
pointed right edge.

### Lesson (`/moduly/[modul]/[lekcja]`)

Accent band carrying the breadcrumb, then the dark content area.

The heading is a **circled letter** — the lesson's letter inside a thin
accent-coloured circle — followed by the title in large monospace, wrapping to
two lines when long, with the circle aligned to the first line.

Below that, **two columns**:

**Left: the contents panel.** This is an **accordion, not a flat list**, and it
is the most carefully built thing on the page:

- Every lesson of the module is listed by letter and title (`a Introduction to
  React`, `b JavaScript`, `c …`, `d …`).
- The **current** lesson is expanded in place, showing its own section anchors
  indented beneath it, each prefixed with a hyphen.
- The section the reader is currently in is highlighted with an **inverted box**
  — light fill, dark text — and updates as they scroll.
- The exercises appear as one of those anchors (`-Exercises 1.1.-1.2.`).
- The panel has **its own scrollbar** and scrolls independently of the article.
  Lessons here have twenty-plus sections; without this the panel would either
  push the page down or scroll away.

One panel answers all three questions a student has: where am I in this lesson,
what else is in this lesson, and what else is in this module.

**Right: the prose column**, comfortably narrow, with a visible vertical rule
separating it from the panel.

A back-to-top arrow floats at the bottom right — lessons are long enough to need
it.

Note the header behaviour: the full navigation bar scrolls away, but a **compact
square logo mark stays** pinned at the top left. Cheaper than a sticky header and
it keeps a way home.

> This settles the open question from the first draft of this file. There **is**
> a left-hand contents panel. It is scoped to the current module rather than the
> whole site, which is why the earlier text-only read missed it.

---

## Signature elements

Small, distinctive, and cheap. These are what make it recognisable:

| Element | What it is |
| --- | --- |
| **Chevron breadcrumbs** | Connected arrow-shaped segments; earlier steps outlined, the current one filled |
| **Chevron list rows** | The lesson list on a module page, same arrow shape, staggered widths |
| **Circled letter** | The lesson's letter in a thin accent circle beside the title |
| **Doubled frames** | Cards and buttons drawn with an offset second border rather than a shadow |
| **Bordered button** | Rectangular, outlined, monospace label — no fill, no rounding |
| **Shrinking logo** | The full logo becomes a small square mark once the page is scrolled |
| **Copy affordance** | A muted `copy` label at the top-right *inside* the code block |
| **Persistent logo mark** | Nav scrolls away; a small square logo stays pinned top-left |
| **Inverted active item** | The current section in the contents panel: light fill, dark text |

Not all of these need to arrive at once. The breadcrumbs and the circled letter
carry most of the character; the rest is polish.

## What we cannot copy

**The illustrations.** Every part has a commissioned black line-art drawing —
on its card, in its band, on every lesson page. They are a large share of the
site's identity and ttcmd has none, will not commission any, and must not have
an agent generate filler.

The honest substitute is **typography doing the work**: a large monospace module
number in the accent colour where the illustration would be. The result is
plainer than the reference. Accept that rather than fill the space badly.

A consequence worth planning for: the reference's accent band is **tall** —
roughly 450px on a lesson page — because it is holding an illustration. Copy the
height without the drawing and you get a large empty coloured rectangle above
every lesson, pushing the actual content below the fold. **ttcmd's band should be
a stripe, not a panel** — tall enough for the breadcrumb and its breathing room,
and no taller.

---

## Code blocks

A programming course lives or dies here.

- Near-black background, distinctly darker than the page. Rounded corners.
- Syntax highlighting, **C#** first (Article VII), with the language as
  per-block metadata — never a global assumption.
- **Copy control top-right, inside the block.** Muted until hover.
- Optional filename header.
- Horizontal scroll inside the block. A code line must never widen the page.
- Highlighted lines, so a lesson can point at *the* line.
- Screenshots of terminal or IDE output get a thin accent border — it separates
  "a picture of a program running" from "code you should type".

## Exercises

The mechanic that makes the reference work: exercises sit **inline, in the
lesson, where the concept was just explained** — not collected at the end, not on
a separate page — and they appear as a numbered entry in the lesson's own
contents panel, so a student can jump straight to "what do I have to do".

Each needs: its number (`1.4`), a title, the body, and enough visual weight to be
unmissable when scrolling back.

## Component inventory

| Component | Why |
| --- | --- |
| `Zadanie` (exercise) | The core mechanic. Numbered `<module>.<n>`. |
| `Code` | Highlighting, copy control, filename, line highlighting |
| `Uwaga` / callout | Note · warning · gotcha. Three variants, no more. |
| `Cele` (objectives) | Opens a lesson: what you'll be able to do after it |
| `Prompt` | Copyable prompt block. **Specific to this course** — prompts are artifacts students reuse rather than read. |
| Breadcrumb | Chevron form. On every module and lesson page. |
| Lesson contents panel | Accordion: module's lessons, current one expanded to its section anchors; scroll-spy highlight; own scrollbar |
| Prev/next | Module-to-module and lesson-to-lesson |
| Circled letter heading | The lesson header |
| Image + caption | Screenshots of IDE and tool output, accent-bordered |
| Back-to-top | Lessons are long |

## Deliberately dropped

- **Announcements** — a feed nobody reads and everybody must maintain
- **Partners / "in cooperation with"** — there are no partners
- **Authors and licence block** — one author
- **Challenge** — a marketing device for an open course
- **Language selector** — Polish only (Article III)
- **Certificates, submission and exercise tracking** — needs a backend (Article VIII)
- **The institutional footer** — logos, social links, contact addresses
- **The illustrations** — see above

Roughly a third of the reference's surface area, doing the part that teaches.

## Deliberately different

- **Polish throughout**, including navigation labels.
- **"Report a problem" points at GitHub issues, not an edit link.** Lower barrier
  than fork-and-PR, less to moderate mid-term.
- **A `Prompt` component**, which the reference has no need for.
- **No illustrations.** Typography and the accent colour carry the identity.

## Open questions

Settled since the first draft:

1. ~~Light or dark default?~~ **Dark**, ADR-0007.
2. ~~One accent, or one per module?~~ **One**, ADR-0007. Per-module deferred, not
   refused — adding the frontmatter field later is not a migration.
3. ~~The accent colour itself.~~ **`#C9C2F5`**, ADR-0007.
4. ~~A monospace with complete Polish diacritics.~~ **JetBrains Mono + Inter**,
   ADR-0005.

Still open:

5. **How much of the chevron geometry to build.** Breadcrumbs and the circled
   letter carry most of the character; the staggered chevron rows on the module
   page are the expensive part and can wait.
6. **The semantic callout colours.** Amber, coral and green are named in
   ADR-0007 but their contrast is unverified. Belongs to the callout slice.

Nothing on this list blocks slice 003.
