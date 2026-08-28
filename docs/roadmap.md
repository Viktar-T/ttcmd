# roadmap.md — ttcmd

What gets built, in what order, and what forces each step.

|              |                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------- |
| Status       | **Intention, not law.** Revised whenever reality disagrees.                               |
| Binding?     | No. `constitution.md` is law; an accepted `spec.md` is a commitment; this file is a plan. |
| Scope        | **The application.** Not the curriculum.                                                  |
| Owner        | Viktar                                                                                    |
| Last revised | 2026-08-28 — re-sliced against the real content of Moduł 0 and Moduł 1                     |

**The course plan does not live here.** Lesson plans, task sheets, the program
contract and anything student-facing belong in the vault (`30_work/TTC/`), per
that folder's own contract. This file only answers: *what must the app be able
to do, and when does teaching force it.*

---

## The rule that outranks everything else in this file

> **Content beats features.**
> An app with two beautiful modules and no lessons is a failure. A plain site
> carrying twelve real lessons is a success.

The predictable way this project fails is not technical. It is spending
September polishing the app because building software is more enjoyable than
writing lesson material — and arriving in November with an excellent platform
and nothing on it.

So, a standing commitment: **at most one app slice between real content
additions.** If two consecutive slices are both about the app, the next one is
content, whatever this roadmap says.

## Budget reality

This is priority 5 work. AgriRobot outranks it for deep-work blocks until its
wniosek is in or killed (`30_work/TTC/AGENTS.md`, rule 1), and the teaching load
itself is 8 h/week across two groups. Both groups get identical content, so the
app never models groups.

Therefore: **small slices, small windows.** A slice that cannot be specced,
planned and executed inside a few short sessions is too big and must be split.
Slice 001 was correctly sized. Keep that size.

---
## Where we are

**Application**

- **001-skeleton** ✅ module→lesson pipeline, Zod-validated, routes render
- **002-deploy** ✅ live at `ttcmd.vercel.app`, rebuilt from `main` on every push

**Content** — the lane that matters (ADR-0004)

- **Moduł 0 — Start** written
- **Moduł 1 — Jak dziś powstaje oprogramowanie** written

Everything below is a proposal.

## What the real content actually needs

The slices below are **derived from the lessons that exist**, not from the
reference site. Reading the four written lessons changed the plan, and the
differences are the point:

| Observed in the real lessons | Consequence |
| --- | --- |
| 148–202 lines each, 5–11 `##` sections | The contents panel is not a nicety. A student cannot navigate a 200-line lesson without it. |
| **Blockquotes everywhere** — 25 in one lesson | They carry quotations and cited claims, not warnings. They need real typographic treatment, and they are **not** a `Callout` component. Do not conflate them. |
| Code fences: **9, all `bash`.** No C# yet | The course *materials* teach with shell commands; C# is what students will *write*. Register both, but the language that exists now is `bash`. |
| Tables, and many external links | Table styling and a visible link treatment are load-bearing, not polish. |
| **No exercises. No images. No JSX components.** | `Zadanie`, `Uwaga`, `Cele`, `Prompt` have **no content using them**. They are deferred until a lesson asks. |

That last row is the method working. Four components were planned from
imagination in `design-reference.md`; none of them is needed by the content that
now exists, and two things that were barely mentioned — blockquotes and tables —
turn out to be load-bearing. **This is why content goes first.**

## How to read the queue below

These are a **queue, not a schedule.** The standing rule above still holds: at
most one app slice between real content additions. Write Moduł 2, take one
slice, write Moduł 3, take the next. Eight slices back-to-back would be the
exact failure this roadmap exists to prevent.

Each entry gives its scope, what "done" looks like, and the prompt that starts
its spec session. Run them through `docs/how-to-run-a-slice.md`.

---

## 003 — Type and theme

The foundation everything else renders inside. Two typefaces, the
monospace-for-structure / sans-for-prose split, every colour as a token, and the
light/dark toggle with dark as the default.

**First, because** components built before the tokens exist get their colours
hard-coded and have to be revisited.

**Done when** the four written lessons render in both themes with correct Polish
in both faces, and no colour is hard-coded anywhere.

**Nothing here is yours to decide.** The faces are fixed by ADR-0005, the palette
and the default theme by ADR-0007. Expect zero questions.

```
Read in full, in this order:
- constitution.md
- AGENTS.md
- docs/design-reference.md
- docs/adr/0005-typefaces-and-polish-diacritics.md
- docs/adr/0007-theme-default-and-accent.md

Slice 003-type-and-theme.

Scope: the two typefaces, the monospace-for-structure / sans-for-prose split,
every colour defined as a token, and the light/dark toggle with dark as the
default.

Out of scope: MDX components, navigation, the contents panel, code block
styling, content, sitemap.

The faces are fixed by ADR-0005 and the palette by ADR-0007. Do not re-open
either; apply them.

Decide everything else yourself, per AGENTS.md §4 — and ask nothing unless it
clears the escalation bar there.
Record each decision in the spec's "Decisions taken" section, one line each,
naming the alternative you rejected.

Then write specs/003-type-and-theme/spec.md and STOP.
No plan.md, no tasks.md, no code.
```

## 004 — A lesson reads properly

Everything a lesson written in plain Markdown needs in order to be readable:
prose measure and rhythm, `##`/`###` in monospace, **blockquotes**, tables,
lists, inline links, inline code, and the circled-letter lesson header.

**Not** code blocks — those are 005.

**Done when** all three Moduł 1 lessons are comfortable to read end to end, on a
phone, in both themes.

```
Read in full, in this order:
- constitution.md
- AGENTS.md
- docs/design-reference.md
- then every lesson under content/moduly/ — they are what this slice is for

Slice 004-lesson-typography.

Scope: everything a lesson written in plain Markdown needs to be readable — prose
measure and rhythm, headings in monospace, blockquotes, tables, lists, inline
links, inline code, and the circled-letter lesson header.

Out of scope: code blocks (slice 005), navigation, the contents panel, any MDX component,
content changes.

Blockquotes are used heavily in the real lessons for quotations and cited
claims. They are not callouts and must not be styled as warnings.

Decide everything else yourself, per AGENTS.md §4 — and ask nothing unless it
clears the escalation bar there.
Record each decision in the spec's "Decisions taken" section, one line each,
naming the alternative you rejected.

Then write specs/004-lesson-typography/spec.md and STOP.
No plan.md, no tasks.md, no code.
```

## 005 — Code blocks

Syntax highlighting, a copy control, an optional filename header, line
highlighting, and horizontal scroll inside the block so a long line never widens
the page.

**Done when** the nine `bash` fences in `00-start/git-i-github.mdx` are readable
and copyable, and a C# fence highlights correctly when one is written.

```
Read in full, in this order:
- constitution.md
- AGENTS.md
- docs/design-reference.md
- then content/moduly/00-start/git-i-github.mdx — the only lesson with code in
  it, and the one this slice is for

Slice 005-code-blocks.

Scope: fenced code rendering — syntax highlighting, a copy control, an optional
filename header, line highlighting, and horizontal scroll inside the block.

Out of scope: navigation, the contents panel, MDX components, content changes.

The language is per-block metadata, never a global assumption. bash is what
the existing content uses; C# must work when it appears.

Decide everything else yourself, per AGENTS.md §4 — and ask nothing unless it
clears the escalation bar there.
Record each decision in the spec's "Decisions taken" section, one line each,
naming the alternative you rejected.

Then write specs/005-code-blocks/spec.md and STOP.
No plan.md, no tasks.md, no code.
```

## 006 — Getting around

The lettered scheme (`0a`, `1b`) made visible, chevron breadcrumbs,
previous/next between lessons and between modules, the lesson list on a module
page, and the module grid on the landing page.

**Done when** a student can reach any lesson from the landing page and move
through a module without using the back button.

```
Read in full, in this order:
- constitution.md — Article VI on numbering
- AGENTS.md
- docs/design-reference.md
- docs/adr/0003-content-numbering.md

Slice 006-navigation.

Scope: the lettered lesson scheme made visible, chevron breadcrumbs, previous/next
between lessons and between modules, the lesson list on a module page, and the
module grid on the landing page.

Out of scope: the in-lesson contents panel (slice 007), search, MDX components, content
changes.

Constraint carried from slice 003: `--rule` computes to 1.47:1 against the dark
background and 1.36:1 against the light one, which WCAG 1.4.11 exempts only while
a rule is a decorative separator. This slice makes rules structural — a chevron
boundary or an active-item edge carries meaning and needs 3:1. Clearing that
takes a new value and an ADR amending 0007, not reusing `--rule` and hoping;
the measurements are in specs/003-type-and-theme/verification.md.

There are no illustrations and none will be commissioned. The module grid must
work with typography and the accent colour alone.

How much of the chevron geometry to build is yours to judge — the breadcrumbs
carry most of the character, the staggered rows are the expensive part.

Decide everything else yourself, per AGENTS.md §4 — and ask nothing unless it
clears the escalation bar there.
Record each decision in the spec's "Decisions taken" section, one line each,
naming the alternative you rejected.

Then write specs/006-navigation/spec.md and STOP.
No plan.md, no tasks.md, no code.
```

## 007 — The contents panel

The hardest piece of UI in the design, and the one the real lessons most need:
the module's lessons listed, the current one expanded to its own `##` anchors,
the active section highlighted as the reader scrolls, and its own scrollbar.

**Done when** a reader of the 202-line lesson always knows where they are and
can jump to any section.

```
Read in full, in this order:
- constitution.md
- AGENTS.md
- docs/design-reference.md — the "Lesson" section describes this panel in detail
- then content/moduly/01-jak-powstaje-oprogramowanie/co-model-naprawde-potrafi.mdx
  — 202 lines and 11 sections, the case this slice exists for

Slice 007-contents-panel.

Scope: the in-lesson contents panel — the module's lessons listed, the current one
expanded to its own heading anchors, the active section highlighted as the
reader scrolls, its own independent scrollbar, and a back-to-top control.

Out of scope: search, MDX components, content changes, anything in slices 003 to 006.

This slice has real behavioural edge cases — very long lessons, a lesson with
one heading, small screens. Decide how each behaves and record the decision;
they are yours, not Viktar's.

Decide everything else yourself, per AGENTS.md §4 — and ask nothing unless it
clears the escalation bar there.
Record each decision in the spec's "Decisions taken" section, one line each,
naming the alternative you rejected.

Then write specs/007-contents-panel/spec.md and STOP.
No plan.md, no tasks.md, no code.
```

## 008 — Drafting ahead

A `publish` flag on lessons, defaulting to true, so a lesson can be written on a
Saturday for a class three weeks away without students seeing it half-finished.

**Done when** a lesson marked `publish: false` is absent from every route, every
listing, and the build output.

```
Read in full, in this order:
- constitution.md
- AGENTS.md
- lib/content-schema.ts and lib/content.ts

Slice 008-publish-flag.

Scope: a `publish` boolean on lessons, defaulting to true. A lesson marked false is
absent from every route, every listing, and the build output.

Out of scope: authentication, preview URLs, scheduled publishing by date, content changes.

Note for later: when the sitemap is built in slice 010, unpublished lessons
must not appear in it. Do not build the sitemap here.

Decide everything else yourself, per AGENTS.md §4 — and ask nothing unless it
clears the escalation bar there.
Record each decision in the spec's "Decisions taken" section, one line each,
naming the alternative you rejected.

Then write specs/008-publish-flag/spec.md and STOP.
No plan.md, no tasks.md, no code.
```

## 009 — The components the content asks for

**Deliberately unspecified.** By the time this slice is reached, several more
modules will exist, and what they need will be a fact rather than a guess.

The likely candidates are `Zadanie` — exercises, numbered `<module>.<n>` across
the module, per Article VI — and one or two callout variants. But `Zadanie` has
no content using it yet, and a component built before a lesson wants it is a
component built wrong.

**Do not write this spec until a lesson is blocked without it.** That block is
the trigger (ADR-0004: the content/app boundary is a detector).

**The one slice with a real question in it:** which components to build. The
agent derives the list from the content and cites its evidence; confirming that
list is a general decision, and yours.

```
Read in full, in this order:
- constitution.md — Article VI on exercise numbering
- AGENTS.md
- docs/design-reference.md
- docs/adr/0003-content-numbering.md
- then every lesson under content/moduly/

Slice 009-mdx-components.

Scope: the MDX components the written content actually needs — no others.

Out of scope: components nothing is asking for, however good they look in the design
reference. Search, navigation, content changes.

Before proposing scope, work out which components the content needs and cite
the file and line that demonstrates each need. If a component in
docs/design-reference.md has no content asking for it, say so and leave it out.

Exercise numbering runs continuously across a module, so an exercise cannot
know its own number from inside its own file.

Decide everything else yourself, per AGENTS.md §4.
Ask one question and one only: confirm the component list you derived.
Everything about how each component looks and behaves is yours.
Record each decision in the spec's "Decisions taken" section, one line each,
naming the alternative you rejected.

Then write specs/009-mdx-components/spec.md and STOP.
No plan.md, no tasks.md, no code.
```

## 010 — Being found

*Decided 2026-08-28: the site is permanently open and searchable.* Choosing that
is not the same as achieving it — a site with almost no inbound links is not
indexed by being un-blocked. A `sitemap.xml`, a permissive `robots.txt`, and a
real `title` and `description` per page.

**Last, deliberately** — ordered by what it would expose, not by what blocks a
lesson. Pointing crawlers at half-built material is the one outcome nobody wants.

```
Read in full, in this order:
- constitution.md — Article IV
- AGENTS.md
- docs/adr/0006-temporary-no-index.md — the decision and its history

Slice 010-discoverability.

Scope: make the site actually findable — a sitemap, a permissive robots.txt, and a
real title and description per page. Assert that nothing in the app serves
noindex.

Out of scope: analytics of any kind, structured data, social preview images, content
changes.

A lesson with publish: false must not appear in the sitemap.

How page titles and descriptions are composed is yours to decide. Whether the
school is named anywhere is not — leave the TO CONFIRM markers alone.

Decide everything else yourself, per AGENTS.md §4 — and ask nothing unless it
clears the escalation bar there.
Record each decision in the spec's "Decisions taken" section, one line each,
naming the alternative you rejected.

Then write specs/010-discoverability/spec.md and STOP.
No plan.md, no tasks.md, no code.
```

---

## Settled — the indexing decision

The site is **public and searchable, permanently.** Not a temporary posture, so
there is nothing to remember and nothing to undo. Slice 010 is what makes it
true rather than merely permitted.

Why it was not a difficult call: **Article IV already forbids student names,
grades, rosters and any personal data from touching this repo or this site, and
Article VI keeps student work off it.** Nothing a crawler could reach belongs to
a minor. The decision was only ever about Viktar's own material.

What it buys: students find the course by searching rather than by keeping a
link; other teachers can use it; the work is visible. What it costs: the
material is publicly readable while it is still rough, and a lesson cannot be
quietly withdrawn once it has been indexed.

Two things deliberately **not** done, recorded so they are not re-argued:

- **No temporary no-index while the content was placeholder.** Proposed and
  rejected (ADR-0006). It bought protection from mild embarrassment at the cost
  of three layers of machinery, a constitution amendment, and a task to remember
  to undo.
- **`Disallow: /` is not a way out of a search index**, if the question is ever
  reopened. `Disallow` forbids the *fetch*, so the crawler never reads the
  `noindex` it was forbidden to fetch, and a URL discovered from a link elsewhere
  can still be listed. To be absent you must allow the crawl and serve
  `noindex`. The full options table is in ADR-0006, which stays in the tree for
  exactly this reason.

**Still open, and not a crawler question:** whether the school is named on the
site. `README.md` and Article I both carry `TO CONFIRM` markers. Being findable
and being an official TTC publication are different decisions; only the first is
made.

## Later, unnumbered

Ordered by when the pain arrives, not by number.

- **Search.** The reference has it. Worthless under ~15 lessons, obvious above
  ~30. Wait for the pain.
- **An authoring skill** — `.claude/skills/add-lesson/SKILL.md`, so adding a
  lesson is one invocation. Worth doing after the procedure is known rather than
  guessed; roughly the sixth hand-written lesson.
- **A syllabus page**, derived from lesson metadata rather than maintained by
  hand, so it cannot drift.
- **Task sheets**, if they turn out to be a different shape from exercises.

## Housekeeping, not slices

- `content/_to_delete/` still holds the placeholder module from slice 001. It
  needs deleting — a `chore:` commit.
- `content/moduly/00-start/` currently holds one lesson at `order: 3`. If lessons
  1 and 2 are still to be written, fine; if not, the ordering has a hole.

## Gated — needs a decision or an amendment first

Not scheduled. Each needs something that does not exist yet.

| Candidate | Blocked on |
| --- | --- |
| Week / schedule view | A confirmed timetable. Article V forbids inventing one, and `week` stays optional metadata until the school supplies it. |
| Student project pages | An amendment to Article VI, which currently states the site does not host student work. Would need an ADR and a hard look at Article IV — student work means student names on a public site. |
| Progress tracking, submissions, accounts | An amendment to Article VIII (no backend in v1) **and** a privacy answer good enough for minors' data on a public deployment. Do not start this because it is technically interesting. |
| Publishing the SDD artifacts as course material | A deliberate reversal — the repo is currently *not* classroom material (Article II). If that changes, it changes on purpose, in an ADR. |

## Not doing

Recorded so it is not re-litigated:

- Multi-tenancy, other teachers, other schools, monetization — Article I.
- A bespoke design system. The look is settled by
  [`design-reference.md`](design-reference.md): one accent colour, tokens, and
  no component beyond the one a lesson actually needs.
- The parts of the reference that serve its institution rather than its
  students: announcements, partners, an authors/licence block, a challenge, a
  language selector, certificates.
- A CMS. The content is MDX in git, and the build is the validator.
- CI-based AI code review. Nothing to gate yet; revisit if the repo gets
  contributors, which it currently does not have.
- Rebuilding anything kurs-arduino already solved, from memory. When a problem
  is one that repo already solved — MDX pipeline, sidebar, frontmatter schema —
  read how it did it before designing a new answer.

## External gates

Things this roadmap waits on, none of them the app's to decide:

| Gate | Owner | Blocks |
| --- | --- | --- |
| Official PL course title | The school | The `TO CONFIRM` markers in `README.md` and Article I |
| Tech stack confirmed with students | Viktar + students, opening weeks | Code examples; C# is presumed, not settled (Article VII) |
| Module structure of the course | Viktar, in the vault | Every real-content slice. **This is the true critical path — not the app.** |
| Timetable | The school | The week/schedule view, and nothing else |
| ~~Accent colour~~ | — | **Closed** 2026-08-28: `#C9C2F5`, ADR-0007 |
| ~~Light or dark default~~ | — | **Closed** 2026-08-28: dark, ADR-0007 |

## Maintaining this file

Revise it when a slice closes, when a gate opens, or when reality contradicts
it — and revise it *forward*. Do not quietly edit a closed slice so it
looks like it went to plan; that is the same honesty rule the journal runs on, and a
roadmap that was never wrong is a roadmap nobody was using.
