# roadmap.md — ttcmd

What gets built, in what order, and what forces each step.

|              |                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Status       | **Intention, not law.** Revised whenever reality disagrees.                                                                                                       |
| Binding?     | No. `constitution.md` is law; an accepted `spec.md` is a commitment; this file is a plan.                                                                         |
| Scope        | **The application.** Not the curriculum.                                                                                                                          |
| Owner        | Viktar                                                                                                                                                            |
| Last revised | 2026-09-15 — **021 closed** (the progress button on the front door); 2026-09-10 — **020 closed** (the narrower progress table); **016 is now the group progress page**, built and closed; the three unbuilt slices renumbered up by two (search → 017, glossary → 018, discoverability → 019); **Done** brought up to date with 007–016 |

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
itself is 8 h/week across **four** groups, two hours with each. Every group gets
identical content — and since **ADR-0014** the app models the groups in exactly
one place, the progress page, and nowhere else.

Therefore: **small slices, small windows.** A slice that cannot be specced,
planned and executed inside a few short sessions is too big and must be split.
Slice 001 was correctly sized. Keep that size.

---
## Where we are

**Application** — eighteen slices closed: 001 through 016, 020 and 021. See **Done** below.

**Content** — the lane that matters (ADR-0004)

- **Moduł 0 — Start**
- **Moduł 1 — Jak dziś powstaje oprogramowanie** — five lessons, all
  free-time reading; the demo moved to Moduł 2 on 2026-09-09, so the orders
  stay 2–6 (1b–1f) and no published lesson letter changed
- **Moduł 2 — Warsztat** — 2a–2f published, with the demo as 2a since
  2026-09-09; the C# reading lesson still wants a brief first
- **Moduł 3 — Budujemy** — 3a–3d published, with the by-hand blocks of v2.5
- **Moduł 4 — Specyfikacja** — 4a–4f drafted, `publish: false`
- **Moduł 5 — Pod maską** — index and 5a–5h drafted, `publish: false` (autonomous run of 2026-09-02; briefs `docs/content-briefs/05-*.md` unapproved; the by-hand code built in the untracked `tmp-modul5-build/`, delete when done)
  (v2.5); no lesson yet

The remaining queue is **017 through 019** — search, the glossary, being found —
and everything in it is a proposal. The sections for 007 through 016 are kept
below rather than removed: they are the prompts that actually ran those slices.

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

Each entry gives its scope, what "done" looks like, and the prompt that runs it.

**These prompts are autonomous** (AGENTS.md §2, "Two modes"): spec → plan →
tasks → implement → close, in one run, with no approval between stages. You
review afterwards, from the spec's `## Decisions taken` section and the final
report.

That trades away the thing the pauses were for — a plan written by a session
that never watched the spec being drafted can only work from what the spec
actually says. Each prompt buys most of it back by requiring `plan.md` to be
written **from a subagent given nothing but the spec**. If that subagent cannot
plan from the spec alone, the spec is incomplete, and you want to know.

---

## Done

The specs, plans, tasks and verification notes are in `specs/`; the commit log is
the record. One line each here, no more.

| Slice | What it settled |
| --- | --- |
| **001-skeleton** | module→lesson pipeline, Zod-validated frontmatter, routes render |
| **002-deploy** | live at `ttcmd.vercel.app`, rebuilt from `main` on every push |
| **003-type-and-theme** | JetBrains Mono + Inter self-hosted, structure/prose split, every colour in `app/tokens.css`, dark default with a pre-paint toggle, two build guards, `/styleguide` |
| **004-lesson-typography** | a lesson written in plain Markdown reads properly |
| **005-code-blocks** | fenced code: highlighting, copy, filename, line highlighting |
| **006-navigation** | lettered scheme, chevron breadcrumbs, pagers, module page, module grid |
| **007-contents-panel** | a module's lessons listed, the current one expanded to its own sections, the active one highlighted as the reader scrolls |
| **008-publish-flag** | `publish: false` keeps a lesson out of every route, listing, pager and the build output |
| **009-mdx-components** | the elements the written lessons actually asked for, and no others |
| **010-sources-and-figures** | a claim a reader can check: quotations, sources, figures, and an internal link the build refuses when it is wrong |
| **011-lesson-columns** | the contents becomes a real column of the lesson page's grid rather than a passenger in the gutter |
| **012-one-left-edge** | every page on the site begins its content where a lesson's article begins — one left edge, unplanned by this file |
| **013-presentation-mode** | a second mode for the projector: the marked fragments lit, the prose around them stepped back |
| **014-module-contents** | the module page gets the same contents a lesson page has, opening with „Wstęp" |
| **015-content-dev-refresh** | a content edit reaches the browser without restarting the dev server — unplanned by this file |
| **016-group-progress** | `/postep`: four groups, week by week, each cell the date that group did that session. Amends Articles I, V and VI via ADR-0014 |
| **020-progress-what-happened** | the progress table shows what happened, not what was planned: the two planned columns go, and a group cell reads 03.09-T1 — the date, and the week THAT date fell in |
| **021-front-door-progress** | the front door's one button opens the progress page; „Zacznij kurs" and the text link are gone, and the course stays in the module grid directly below |

One finding from 003 is still live and is carried into 007 below: **`--rule`
computes to 1.47:1 on dark.** Exempt while a rule is decorative; not exempt the
moment one becomes structural.

**Three slices were built that this file never planned** — 012, 015 and 016 —
and each of them took the number the queue below had reserved for something
else. The unbuilt slices were therefore renumbered on 2026-09-10: search
**015 → 017**, the glossary **016 → 018**, being found **017 → 019**. Nothing
was removed. **020 then took the next free number past that queue rather than
taking 017**, so the queue keeps the numbers it was just given and the gap is
recorded rather than paid for with a third renumbering. Slice numbers are
append-only; nothing requires them to be contiguous.

The prompts inside the *closed* slices below still say "search —
that is slice 015", and they are left exactly as they were pasted: they are the
record of what was planned on the day they ran, and a commit log that disagrees
with a tidied plan is the worse of the two mistakes (Article II).

---

## 007 — The contents panel

The hardest piece of UI in the design, and the one the real lessons most need:
the module's lessons listed, the current one expanded to its own `##` anchors,
the active section highlighted as the reader scrolls, and its own scrollbar.

**Done when** a reader of the longest lesson always knows where they are and can
jump to any section.

```
Read in full, in this order:
- constitution.md
- AGENTS.md
- docs/design-reference.md — the "Lesson" section describes this panel in detail
- then the longest lesson under content/moduly/01-jak-powstaje-oprogramowanie/
  — the case this slice exists for

Slice 007-contents-panel.

Scope: the in-lesson contents panel — the module's lessons listed, the current one
expanded to its own heading anchors, the active section highlighted as the
reader scrolls, its own independent scrollbar, and a back-to-top control.

Out of scope: search, MDX components, content changes, anything already built in slices 003
to 006.

Constraint carried from slice 003's verification: `--rule` computes to 1.47:1
on the dark theme. That is exempt while a rule is decorative. Any rule this
slice makes structural — a divider a reader relies on to separate the panel
from the article — needs a token that clears 3:1, added alongside rather than
by changing `--rule` under the existing uses.

This slice has real behavioural edge cases — very long lessons, a lesson with
one heading, small screens, keyboard navigation. Decide how each behaves and
record the decision.

Decide everything else yourself, per AGENTS.md §4 — and ask nothing unless it
clears the escalation bar there.

Run this slice **autonomously** — AGENTS.md §2, "Two modes". Do not stop
between stages.

1. Write spec.md, ending in acceptance criteria and a "Decisions taken"
   section — one line per decision, naming the alternative you rejected.
2. Write plan.md **from a subagent whose only inputs are constitution.md,
   AGENTS.md and this slice's spec.md.** If it cannot produce a plan from the
   spec alone, the spec is incomplete: fix the spec and say so in the report.
3. Write tasks.md.
4. Implement it. One task, one check, one commit, in order. Show each check's
   command and output.
5. Close with a fresh-context subagent review of the diff against the
   acceptance criteria. Fix what affects correctness or a criterion; record
   the rest without fixing it.

Commit each artifact separately. Do not write that I approved anything — an
autonomous run is unapproved by construction, and I review it afterwards.

Stop and ask only if something clears the escalation bar in AGENTS.md §4, or
if a check fails twice and you do not know why.

Leave unchecked any criterion needing a human eye, and name it in the report.

Finish with a report: what you built, the decisions you took, what you could
not verify yourself, and what you deliberately left out.
```

## 008 — Drafting ahead

A `publish` flag on lessons, defaulting to true, so a lesson can be written on a
Saturday for a class three weeks away without students seeing it half-finished.

**Done when** a lesson marked `publish: false` is absent from every route, every
listing, every pager, and the build output.

```
Read in full, in this order:
- constitution.md
- AGENTS.md
- lib/content-schema.ts and lib/content.ts

Slice 008-publish-flag.

Scope: a `publish` boolean on lessons, defaulting to true. A lesson marked false is
absent from every route, every listing, every pager, and the build output.

Out of scope: authentication, preview URLs, scheduled publishing by date, content changes.

Note for later: when the sitemap is built in slice 017, unpublished lessons
must not appear in it. Do not build the sitemap here.

Watch the pagers built in slice 006 — previous/next must skip an unpublished
lesson rather than link to a 404.

Decide everything else yourself, per AGENTS.md §4 — and ask nothing unless it
clears the escalation bar there.

Run this slice **autonomously** — AGENTS.md §2, "Two modes". Do not stop
between stages.

1. Write spec.md, ending in acceptance criteria and a "Decisions taken"
   section — one line per decision, naming the alternative you rejected.
2. Write plan.md **from a subagent whose only inputs are constitution.md,
   AGENTS.md and this slice's spec.md.** If it cannot produce a plan from the
   spec alone, the spec is incomplete: fix the spec and say so in the report.
3. Write tasks.md.
4. Implement it. One task, one check, one commit, in order. Show each check's
   command and output.
5. Close with a fresh-context subagent review of the diff against the
   acceptance criteria. Fix what affects correctness or a criterion; record
   the rest without fixing it.

Commit each artifact separately. Do not write that I approved anything — an
autonomous run is unapproved by construction, and I review it afterwards.

Stop and ask only if something clears the escalation bar in AGENTS.md §4, or
if a check fails twice and you do not know why.

Leave unchecked any criterion needing a human eye, and name it in the report.

Finish with a report: what you built, the decisions you took, what you could
not verify yourself, and what you deliberately left out.
```

## 009 — The components the content asks for

**Deliberately unspecified until the content asks.** Module 1 has grown to eight
lessons; what they need is now closer to a fact than a guess, but the trigger is
still a lesson that cannot be written without a component (ADR-0004: the
content/app boundary is a detector).

The likely candidates are `Zadanie` — exercises numbered `<module>.<n>` across
the module, per Article VI — and one or two callout variants.

**The one slice with a question in it:** which components to build. The agent
derives the list from the content and cites its evidence; confirming that list is
a general decision, and yours.

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

Before writing the spec, work out which components the content needs and cite
the file and line that demonstrates each need. Put that evidence in the spec.
If a component in docs/design-reference.md has no content asking for it, say
so and leave it out.

Exercise numbering runs continuously across a module, so an exercise cannot
know its own number from inside its own file.

Decide everything else yourself, per AGENTS.md §4. Ask one question and one
only, before writing the spec: confirm the component list you derived from the
content. How each component looks and behaves is yours.

Run this slice **autonomously** — AGENTS.md §2, "Two modes". Do not stop
between stages.

1. Write spec.md, ending in acceptance criteria and a "Decisions taken"
   section — one line per decision, naming the alternative you rejected.
2. Write plan.md **from a subagent whose only inputs are constitution.md,
   AGENTS.md and this slice's spec.md.** If it cannot produce a plan from the
   spec alone, the spec is incomplete: fix the spec and say so in the report.
3. Write tasks.md.
4. Implement it. One task, one check, one commit, in order. Show each check's
   command and output.
5. Close with a fresh-context subagent review of the diff against the
   acceptance criteria. Fix what affects correctness or a criterion; record
   the rest without fixing it.

Commit each artifact separately. Do not write that I approved anything — an
autonomous run is unapproved by construction, and I review it afterwards.

Stop and ask only if something clears the escalation bar in AGENTS.md §4, or
if a check fails twice and you do not know why.

Leave unchecked any criterion needing a human eye, and name it in the report.

Finish with a report: what you built, the decisions you took, what you could
not verify yourself, and what you deliberately left out.
```

## 010 — What a reader needs to check a claim

The lessons make claims a reader could go and verify — a quotation, a number,
a diagram, a source — and today the means of checking them is scattered or
missing. Fourteen block quotations, twelve of them from a named person: one
lesson puts an attribution line under the quote, another leaves it bare and
parks the link in *Źródła* at the bottom, a third paraphrases „mówi wprost…”
with no link at the point of use. Six inline diagrams, none with a caption the
reader can select, find or hear — 1a draws its caption *inside* the SVG as
text, 1c draws its data source there. Ten hand-written *Źródła* lists that
already drift (entries with no date in 1b and 1d) and that mix evidence (the
METR study) with further reading (`learn.evocoders.ai`, Claude Code best
practices). Roughly eighty-five links parked in those lists against a dozen in
prose. Fifteen internal lesson links nothing validates — and 1a was just moved
out of the module.

ADR-0008, still *proposed*, says the date is part of the claim and visible to
the reader. This slice builds the surfaces that would make that rule visible
without accepting it.

**One family, on purpose.** Four elements and one link treatment, all of the
same kind — what a reader needs to check a claim. No callouts, no `Zasada`, no
exercise kinds, no footnotes: those are refused below by name. The writing and
revising skills will require these elements; the rule is theirs, the rendering
is this slice's. Migrating the lessons is content-lane work that follows in
its own commits.

**Done when** a lesson can wrap a quotation in `<Cytat>`, a diagram in
`<Rysunek>`, its evidence in `<Zrodla>` and its further reading in
`<CzytajDalej>`, and the reader sees for each who, when and where to check;
external links are marked; and a `Cytat` or `Zrodla` entry missing its date or
link, or an internal link to a lesson that does not exist, fails the build with
the file named instead of rendering.

```
Read in full, in this order:
- constitution.md — Articles V, VIII and IX
- AGENTS.md
- docs/adr/0008-sourcing-content-claims.md — the rule these elements make visible
- docs/adr/0012-structural-rule-value.md — the token for a line that is a boundary
- docs/design-reference.md
- docs/content-style.md — "Quotations", "Balance prose and reference
  material" (diagrams), "Mechanics" (dates, link text), and the Źródła
  conventions it describes
- lib/content.ts and lib/exercises.ts — how slice 009 registered an element,
  stamped it during the compile, and made misuse fail the build; follow the
  same pattern
- then, in content/moduly/01-jak-powstaje-oprogramowanie/:
  vibe-coding-kontra-inzynieria.mdx (quotations with an attribution line),
  co-model-naprawde-potrafi.mdx (bare quotations; a data source drawn inside
  the SVG), od-podpowiedzi-do-agenta.mdx (a Źródła list with undated entries
  and further reading mixed in), and content/interesting-to-read/
  czterdziesci-lat-zmian.mdx (a caption drawn inside the SVG; the longest
  Źródła list, with double-linked and secondary entries) — the shapes in use

Slice 010-sources-and-figures.

Scope: four MDX elements usable in a lesson without an import, and one link
treatment applied at build.

- Cytat — a verbatim quotation and its attribution rendered as one unit,
  visibly distinct from body prose and from a plain Markdown blockquote: the
  quoted text; who said it; the name of the source; the date; a link; and,
  optionally, a timestamp inside a recording (the link then opens at that
  moment) and a second link to a transcript. Reference case: DHH on Lex
  Fridman #501 — a YouTube link with a timestamp plus a transcript page.
- Rysunek — a figure wrapper around a diagram (today an inline SVG; later an
  image) with a caption rendered as HTML text outside the drawing, and an
  optional one-line data source. Nothing the reader needs is drawn inside the
  SVG any more. A diagram not wrapped in Rysunek keeps rendering exactly as it
  does today.
- Zrodla — the lesson's evidence list as a structured block: the "Stan na"
  date as a prop; each entry with a title, who published it, a date, a link
  and an optional one-line note. The note must carry what today's lists
  carry in prose: a second link, a timestamp, "secondary source", "checked on
  a later date". Decide the authoring shape — child elements or a data prop —
  and record it.
- CzytajDalej — further reading, separate from evidence: for each item a
  link, a kind (artykuł / wideo / dokumentacja, at most four kinds), and one
  line on why to read it. Decide whether this is its own element or Zrodla
  with a kind, and record it; either way the two read differently on the page.
- Link treatment — a link to another site is visibly marked as external and
  opens in a new tab with the rel attributes that implies; a link into
  /moduly/… is resolved against the content on disk during the build, and a
  module or lesson slug that does not exist fails the build naming the file
  and line. Decide what a link to a lesson marked publish: false does, and
  record it. Links inside Cytat, Zrodla and CzytajDalej get the same
  treatment as links in prose.

A specimen of every element and every variant goes on /styleguide.

Out of scope: a callout or a Zasada element for a rule in the teacher's own
words — put to Viktar in slice 009 and left out; it returns as its own slice
if the content asks. Exercise kinds on Zadanie. A Lekcja link element. A
bibliography, footnotes, inline citation markers or a citation counter. Video
embeds — a timestamped link does the job without third-party scripts on a
site read by minors. Any change to the contents panel. Content changes: the
lessons keep their blockquotes, diagrams and Źródła lists and keep rendering
exactly as they do now; migrating them is content-lane work after this slice
closes.

Constraints:
- A Cytat without a date or a link, a Zrodla entry without a date or a link,
  and an internal link to nothing each fail the build with a message naming
  the file — never a degraded render. These elements exist to make the rule
  visible, so none may be usable in a way that hides it (Article VIII, in
  spirit; ADR-0008 is not accepted by this slice and the constitution is not
  touched).
- Keep the visible forms docs/content-style.md prescribes — „…” marks, the
  two date forms, link text that names the thing. Decide whether an element
  supplies the quotation marks or the author writes them, and which date form
  each element shows; record both, and if a visible form has to change, say
  so in the report so the guide can follow.
- A quotation may run to several paragraphs; an author may be an organisation;
  a source may be print with no URL; a diagram may have no data source.
  Decide how each renders — or is refused — and record it.
- Server Components only; nothing here needs a browser script (Article VIII).
  The link treatment runs at build, not in the client.
- Any line the reader relies on to see where a quotation, figure or list
  ends uses `--rule-strong`, not `--rule` (ADR-0012). Both themes.

How the elements look, within the tokens of slice 003, is yours. Decide
everything else yourself, per AGENTS.md §4 — and ask nothing unless it clears
the escalation bar there.

Run this slice **autonomously** — AGENTS.md §2, "Two modes". Do not stop
between stages.

1. Write spec.md, ending in acceptance criteria and a "Decisions taken"
   section — one line per decision, naming the alternative you rejected.
2. Write plan.md **from a subagent whose only inputs are constitution.md,
   AGENTS.md and this slice's spec.md.** If it cannot produce a plan from the
   spec alone, the spec is incomplete: fix the spec and say so in the report.
3. Write tasks.md.
4. Implement it. One task, one check, one commit, in order. Show each check's
   command and output.
5. Close with a fresh-context subagent review of the diff against the
   acceptance criteria. Fix what affects correctness or a criterion; record
   the rest without fixing it.

Commit each artifact separately. Do not write that I approved anything — an
autonomous run is unapproved by construction, and I review it afterwards.

Stop and ask only if something clears the escalation bar in AGENTS.md §4, or
if a check fails twice and you do not know why.

Leave unchecked any criterion needing a human eye, and name it in the report.

Finish with a report: what you built, the decisions you took, what you could
not verify yourself, and what you deliberately left out.
```

## 011 — A column, not a margin

**Measured on `1c`, at a 1585-pixel viewport.** The contents panel is **208
pixels** wide, so its entries wrap every two or three words — „Badanie, które /
wyszło odwrotnie, / niż wszyscy / zakładali" — and the article is **centred**:
624 pixels of text starting 481 pixels in, with 480 pixels of slack on the right
and the panel tucked into the slack on the left. The panel is not beside the
article. It is parked in the article's left gutter, which slice 007 chose on
purpose — `app/contents.css` says so in as many words, *nothing placed in it can
move the content track* — and the cost of that choice is now visible: a strip
too narrow to read, a page with no second column, and a panel that begins below
the lesson header instead of level with it.

The reference does the plain thing. A wide navigation column on the left, the
article immediately to its right, the pair aligned left, and the leftover width
falling on the right where nobody needs it. **This slice adopts that arrangement
and supersedes 007's gutter** — the earlier slice is not rewritten (Article IX);
this one replaces the decision.

Several app slices now stand in a row — this, 013, 014, 015, 016 and 017. That does
not suspend the standing rule at the top of this file: content goes between
them.

**Done when** the lesson page reads as two columns — the contents on the left,
the article beside it, the pair aligned left — at a width a laptop actually has,
and still reads as one column on a phone.

```
Read in full, in this order:
- constitution.md
- AGENTS.md
- specs/007-contents-panel/spec.md — the panel this slice re-places, and every
  behaviour of it that has to survive the move
- app/contents.css and app/globals.css — where the centred content track, and
  the gutter the panel sits in today, are decided
- then content/moduly/02-warsztat/na-zywo-agent-buduje-aplikacje.mdx
  — the longest lesson, and the one whose contents list is worst served by a
  208-pixel strip

Slice 011-lesson-columns.

Scope: the lesson page becomes two real columns. The contents panel is a column of
the page's own grid, not a passenger in the left gutter, and it is wide enough that
its entries stop wrapping every two or three words. The article sits immediately to
its right. The pair is aligned left and the leftover width falls on the right. The
panel column starts level with the article, not below the lesson header.

Out of scope: search — that is slice 015. No content changes, no footer, no header
links, no new components.

This supersedes the placement slice 007 chose. Do not edit 007's spec, plan or tasks
to match what you build (AGENTS.md §8); this slice is the record of the change.

**The columns are the only thing that looks different afterwards.** No new colour,
no new typeface, no change to type sizes, rules or spacing inside either column, no
component restyled. The panel keeps everything slice 007 gave it — its own
scrollbar, the active section highlighted as the reader scrolls, the skip link, the
back-to-top control — and only its width and its place in the grid change.

Constraints:
- **Two columns is a wide-viewport arrangement.** On a phone the contents stay the
  disclosure slice 007 built, and the article still reads on one screen width.
  Decide the width at which the page becomes two columns, and record it.
- The measure is not the article's to lose. Prose has a comfortable line length and
  a wider column is not automatically a better one. Decide what the article does
  with the width it gains — and what happens to the wide lane its tables and
  diagrams already use — and record both.
- Every check slice 007 shipped still passes once the columns move. Scroll-spy, the
  panel's own scrollbar, the skip link and back-to-top are neither re-litigated nor
  regressed.
- The module page, the module grid and the home page are not lesson pages. Decide
  whether anything happens to them, and say so — silence there is a decision too.

Decide everything else yourself, per AGENTS.md §4 — and ask nothing unless it
clears the escalation bar there.

Run this slice **autonomously** — AGENTS.md §2, "Two modes". Do not stop
between stages.

1. Write spec.md, ending in acceptance criteria and a "Decisions taken"
   section — one line per decision, naming the alternative you rejected.
2. Write plan.md **from a subagent whose only inputs are constitution.md,
   AGENTS.md and this slice's spec.md.** If it cannot produce a plan from the
   spec alone, the spec is incomplete: fix the spec and say so in the report.
3. Write tasks.md.
4. Implement it. One task, one check, one commit, in order. Show each check's
   command and output.
5. Close with a fresh-context subagent review of the diff against the
   acceptance criteria. Fix what affects correctness or a criterion; record
   the rest without fixing it.

Commit each artifact separately. Do not write that I approved anything — an
autonomous run is unapproved by construction, and I review it afterwards.

Stop and ask only if something clears the escalation bar in AGENTS.md §4, or
if a check fails twice and you do not know why.

The columns are a criterion I have to look at. Leave it unchecked, and name in the
report which page and which viewport width to open.

Finish with a report: what you built, the decisions you took, what you could
not verify yourself, and what you deliberately left out.
```

## 013 — Presentation mode

The site already serves the reader at home; this slice makes it serve the same
material spoken aloud. Two modes: **reading** — the site exactly as it is
today — and **presentation** — what the projector shows while Viktar teaches.
In presentation mode the fragments marked in the lesson source light up — dark
red, Viktar's call — and the prose around them steps back, so the page works as
a teleprompter: walk the lesson top to bottom, read what is lit, and the class
watches the course site itself do the presenting — the same page they will open
at home afterwards. The switch sits in the header, next to the theme toggle —
also Viktar's call.

The markup side is already settled, and it cost nothing: plain `<mark>` around
a fragment passes the content pipeline with no app change (tested 2026-09-01 on
a throwaway copy of lesson 1b). So marking a lesson up is a `content:` commit,
one lesson at a time, later — and this slice is what makes the marks mean
something: invisible in reading mode (today the browser default paints them
yellow), lit in presentation mode.

**Done when** a lesson with marked fragments reads exactly as today in reading
mode, and in presentation mode the marked fragments are legible from the back
row while everything else visibly recedes — switchable from the header on any
page, in both themes, with nothing else about the site changed.

```
Read in full, in this order:
- constitution.md
- AGENTS.md
- docs/design-reference.md — the look this mode must not disturb
- app/theme-toggle.tsx and app/tokens.css — the pattern this mode follows: a
  pre-paint class, a small "use client" control, every colour a token
- then content/moduly/01-jak-powstaje-oprogramowanie/od-podpowiedzi-do-agenta.mdx
  — a lesson of the shape that will carry the marks

Slice 013-presentation-mode.

Scope: a site-wide presentation mode for teaching in class, beside the reading
mode that is the site today.

- The author marks read-aloud fragments in a lesson with plain <mark> —
  already verified to pass the content pipeline unchanged. No new element, no
  schema change, no import.
- Reading mode — the default — renders a marked lesson exactly as an unmarked
  one: the browser's default mark styling must not reach the reader.
- Presentation mode highlights every marked fragment and visibly dims the
  prose around them, so the lit fragments carry from the back of a classroom
  through a projector. The highlight is dark red — that is Viktar's recorded
  taste, not yours to re-decide; the exact values that make dark red clear
  contrast in both themes are yours.
- The toggle sits in the header next to the theme toggle — placement is
  Viktar's call — with a Polish accessible name, and the chosen mode survives
  navigation between pages the same way the theme does.

Out of scope: marking up the lessons themselves — content-lane work, one
lesson at a time, after this slice closes. Auto-scrolling, stepping between
highlights, a remote control, printing. Any change to what the content
pipeline accepts. Search, the contents panel, anything a previous slice
settled.

Constraints:
- "use client" for the toggle and nothing else; no backend, no storage beyond
  what the theme toggle already uses (Article VIII).
- No flash of the wrong mode on reload — the theme's pre-paint pattern from
  slice 003 is the bar.
- Every colour is a token in app/tokens.css. The highlight and the dimmed
  prose each clear contrast in both themes — dimmed means quieter, never
  illegible. If dark red cannot clear contrast on a surface, stop and ask
  rather than shipping a different hue.
- A mark inside a blockquote, a table cell, a link and a heading each render
  sensibly in both modes. Decide whether a mark is allowed inside a code
  block or an SVG, and record it. A page with no marks viewed in presentation
  mode is a case too — decide what, if anything, tells the teacher.
- The toggle is public — students will find it. Decide how it is labelled so
  a student who flips it understands what they are seeing, and record it.
- Every visible string is Polish; every identifier is ASCII (Article III).

Decide everything else yourself, per AGENTS.md §4 — and ask nothing unless it
clears the escalation bar there.

Run this slice **autonomously** — AGENTS.md §2, "Two modes". Do not stop
between stages.

1. Write spec.md, ending in acceptance criteria and a "Decisions taken"
   section — one line per decision, naming the alternative you rejected.
2. Write plan.md **from a subagent whose only inputs are constitution.md,
   AGENTS.md and this slice's spec.md.** If it cannot produce a plan from the
   spec alone, the spec is incomplete: fix the spec and say so in the report.
3. Write tasks.md.
4. Implement it. One task, one check, one commit, in order. Show each check's
   command and output.
5. Close with a fresh-context subagent review of the diff against the
   acceptance criteria. Fix what affects correctness or a criterion; record
   the rest without fixing it.

Commit each artifact separately. Do not write that I approved anything — an
autonomous run is unapproved by construction, and I review it afterwards.

Stop and ask only if something clears the escalation bar in AGENTS.md §4, or
if a check fails twice and you do not know why.

Whether the lit page carries from the back of a classroom is a criterion that
needs a human eye — and a projector. Leave it unchecked, and name in the
report which lesson to open and what to look at.

Finish with a report: what you built, the decisions you took, what you could
not verify yourself, and what you deliberately left out.
```

## 014 — The column the module page leaves empty

Open a lesson and the left quarter of the page is the contents: where you are,
what else is in this lesson, what else is in this module. Go up one level, to
the module page, and that column is **still there and blank.** Slice 012 moved
every non-lesson page's content to where a lesson's article begins, so the
module page holds 25.5rem open on the left and puts nothing in it. It reads as a
lesson page with the contents torn out.

What it offers instead is three one-way doors: the breadcrumb up, a chevron row
down into one lesson, the pager sideways to the next module. None of them shows
the module as a whole. Its lessons carry six to ten `##` sections each and not
one of them is visible until you are already inside the lesson that holds it —
so the page that exists to answer *what is in this module* is the one page that
cannot say.

The lesson panel has the matching hole, in the other direction. It lists every
other lesson in the module and never the module's own introduction. Moduł 1's is
330 words in six paragraphs — the only text that says what the module is for, in
what order its lessons come and why that order — and from inside `1c` it is
reachable only by climbing a breadcrumb that gives no hint a text is waiting up
there. Named „Wstęp" and put first in the list, it stops being the page you came
in through and becomes a place in the module.

So: one list, in both housings, on both kinds of page. „Wstęp" first, the
lessons after it, the entry you are on expanded. On the module page „Wstęp" is
where you are; from a lesson it is a link back.

Another app slice in a row, and the rule at the top of this file is not
suspended by it: content goes between them.

**Done when** the module page reads as the two columns a lesson does — the
contents on the left, the module beside it, its left edge exactly where it is
today — and the list opens with „Wstęp" on every page in the module.

```
Read in full, in this order:
- constitution.md
- AGENTS.md
- specs/007-contents-panel/spec.md — the list, its two housings, the dead-panel
  rule, the skip control and the scroll-spy: everything the module page is about
  to inherit
- specs/011-lesson-columns/spec.md and specs/012-one-left-edge/spec.md — the
  geometry, and the one left edge this page has to join without moving its own
- app/moduly/[module]/page.tsx and components/contents.tsx — the page as it is,
  and the list it has never been given
- then content/moduly/01-jak-powstaje-oprogramowanie/index.mdx — the
  introduction the new entry names

Slice 014-module-contents.

Scope: the module page gets the contents, and the contents get the module's
introduction.

- The module page shows the same contents a lesson page shows, in the same two
  housings — the panel at a wide viewport, the disclosure below the fold.
- The list opens with one new entry, „Wstęp": the module's introduction, which
  is the text the module page already renders. On the module page it is the
  current entry, exactly as the current lesson is one; from every lesson in the
  module it is a link back to the module page.
- Everything else in the list stays what it is today — the module's lessons, the
  entry you are on expanded to its sections.

That „Wstęp" appears on both kinds of page is Viktar's call and not yours to
re-decide; so is the Polish word itself. One list serving both pages rather than
a second list built for the module page is the point of the slice.

Out of scope: search — that is slice 015. The module grid and the home page. Any
change to the lesson page other than the one new entry in its list. Content: no
index.mdx is edited to give „Wstęp" something to expand, and no lesson is
touched. No footer, no new header links, no new component.

**Nothing here changes how the site looks** beyond a panel arriving on a page
that has been holding its column open since slice 012. No new colour, type size,
spacing value or rule, and the panel keeps every behaviour slice 007 gave it.

Constraints:
- **The module page's left edge does not move.** It sits today at the fixed
  inset slice 012 derived, which already reserves exactly the panel's width
  plus its gap. A page that gains a real panel column and keeps the inset lands
  408px to the right of every other page on the site — the precise failure 012
  exists to prevent. Measure the edge before and after, on both kinds of page.
- Everything slice 007 shipped keeps working where it now runs: the panel's own
  scrollbar, the current entry, the skip control, back-to-top. The module page
  has none of that today and gains a list that stands between the breadcrumb
  and the text — eight entries in Moduł 1. Decide what the skip control skips
  to on a page whose text is not an article, and where focus lands.
- „Wstęp" is not a lesson and must not wear a lesson's letter. `1a` is identity
  (ADR-0003) and a real lesson may claim it later. Decide what, if anything,
  marks the entry, and record it.
- The chevron lesson rows below the introduction now say what the panel says.
  Decide whether they stay and record why — silence there is a decision too.
- No module index carries a `##` today, and the pipeline collects the sections
  of one and throws them away. Decide whether „Wstęp" expands the way a lesson
  does if an introduction ever grows headings, and what the entry does while
  none has any.
- 007's dead-panel rule meets a case it was not written for: a module with an
  introduction and no published lesson. Decide what renders.
- Below the fold the disclosure stays collapsed, and opening the module page
  must not push the introduction a screenful down — 007's own rule, on a new
  page.
- Every visible string is Polish; every identifier, id and route segment is
  ASCII (Article III).
- No backend, no new dependency, `"use client"` only where slice 007 already put
  it (Article VIII, AGENTS.md §8).

Both modules are cases, not one. Moduł 0 is a 49-word introduction and two
lessons; Moduł 1 is 330 words and seven. Check both.

Decide everything else yourself, per AGENTS.md §4 — and ask nothing unless it
clears the escalation bar there.

Run this slice **autonomously** — AGENTS.md §2, "Two modes". Do not stop
between stages.

1. Write spec.md, ending in acceptance criteria and a "Decisions taken"
   section — one line per decision, naming the alternative you rejected.
2. Write plan.md **from a subagent whose only inputs are constitution.md,
   AGENTS.md and this slice's spec.md.** If it cannot produce a plan from the
   spec alone, the spec is incomplete: fix the spec and say so in the report.
3. Write tasks.md.
4. Implement it. One task, one check, one commit, in order. Show each check's
   command and output.
5. Close with a fresh-context subagent review of the diff against the
   acceptance criteria. Fix what affects correctness or a criterion; record
   the rest without fixing it.

Commit each artifact separately. Do not write that I approved anything — an
autonomous run is unapproved by construction, and I review it afterwards.

Stop and ask only if something clears the escalation bar in AGENTS.md §4, or
if a check fails twice and you do not know why.

Whether the module page and a lesson page now look like the same site is a
criterion I have to look at. Leave it unchecked, and name in the report which
module page and which viewport width to open.

Finish with a report: what you built, the decisions you took, what you could
not verify yourself, and what you deliberately left out.
```

## 017 — Finding the thing you half-remember

Seven lessons, just over fifteen thousand words, **fifty-six `##` sections.** A
student who remembers that one of them quoted a study where the developers came
out *slower* — and remembers nothing else about it — has no way to get there.
The breadcrumb goes up, the pager goes sideways, and the contents panel lists
the sections of the lesson that is already open. None of the three answers
*which lesson was it.* Today the answer is Ctrl+F, seven times, in seven tabs.
Slice 011 widens the panel; it does not make it list a lesson the reader is not
already in.

The material is unusually bad for this. It is prose, not API reference, and its
load-bearing facts are numbers and names sitting mid-paragraph — METR, the 70%
problem, `git switch -c`, Torvalds on "90% marketing and 10% reality". Slice
010 made that sharper rather than easier: the evidence is now findable *inside*
a lesson, and still invisible from outside one.

Two things are already built and this slice is what finally uses them. Every
`##` carries a stable anchor id, so a result can land on the section instead of
the top of a 400-line lesson; and those ids are **already stripped of
diacritics** — `badanie-ktore-wyszlo-odwrotnie-…` — so the function a Polish
search needs most is written and in the tree.

With 011 done, this is the last thing on the reference's lesson page that ours
has no answer to. Everything else it shows we either render or have refused on
purpose, and the two remaining scraps of its chrome are recorded under *Later,
unnumbered* below.

**Done when** a student who remembers a phrase but not the lesson can type it
from any page — with or without Polish diacritics — and land on the section that
contains it.

```
Read in full, in this order:
- constitution.md — Articles III, IV and VIII
- AGENTS.md
- lib/content.ts and lib/content-schema.ts — the corpus, and the publish flag
- lib/section-anchors.ts — the anchors a result has to land on, and the
  diacritic stripping already written there
- then content/moduly/02-warsztat/na-zywo-agent-buduje-aplikacje.mdx
  — the longest lesson, and the one it is hardest to find anything in

Slice 017-search.

Scope: search across every published lesson, reachable from every page. It matches a
lesson's title, its lede, its headings and its prose. A result names the module and
the lesson and links to the heading anchor the match sits under — not to the top of
the lesson. It is usable typed without Polish diacritics, on a phone, and from the
keyboard alone.

Out of scope: searching anything repo-facing — specs, ADRs, the journal. This repo is
not classroom material (Article II). No record of what anyone searched for, kept
anywhere, by anyone. No footer, no new header links beyond the control itself, no
"propose changes to material" link, no content changes, and no revisiting the columns
slice 011 settled.

**Nothing here changes how the site looks.** The control is built from the tokens
slice 003 already defines; the header, the lesson page and the contents panel are not
redesigned to make room for it, and no existing rule, colour or spacing is touched.

Constraints:
- A lesson with `publish: false` is not searchable **and its text must not reach the
  browser at all.** The same rule the sitemap gets in slice 019, and a stricter one:
  an index is the text.
- No backend, no API route, no third-party search service (Articles VIII and IV).
  The index is produced when the site is built.
- The index must not be paid for by every visitor on first paint. Decide when it
  loads and what it weighs, and put the number in the report.
- `"use client"` for the control and nothing else.
- A dependency needs an ADR line saying what it replaces and why (AGENTS.md §8).
  Hand-written is a legitimate answer; if you choose it, say why it is cheaper than
  the library you rejected.
- **Polish is the hard part, not the ranking.** Case-insensitive and
  diacritic-insensitive are required. Stemming — „agent", „agenta", „agentem" — is
  a judgement call. Record where you drew the line and what a student who types the
  other side of it sees.
- Every visible string is Polish; every identifier, route segment and file name is
  ASCII (Article III). If search gets a URL of its own, a student can bookmark it:
  choose it once and record it.

An empty query, a query that matches nothing, a query that matches every lesson, and
a match that falls inside a code block or inside a Źródła list are four different
results. Decide what each one shows, and record it.

Decide everything else yourself, per AGENTS.md §4 — and ask nothing unless it
clears the escalation bar there.

Run this slice **autonomously** — AGENTS.md §2, "Two modes". Do not stop
between stages.

1. Write spec.md, ending in acceptance criteria and a "Decisions taken"
   section — one line per decision, naming the alternative you rejected.
2. Write plan.md **from a subagent whose only inputs are constitution.md,
   AGENTS.md and this slice's spec.md.** If it cannot produce a plan from the
   spec alone, the spec is incomplete: fix the spec and say so in the report.
3. Write tasks.md.
4. Implement it. One task, one check, one commit, in order. Show each check's
   command and output.
5. Close with a fresh-context subagent review of the diff against the
   acceptance criteria. Fix what affects correctness or a criterion; record
   the rest without fixing it.

Commit each artifact separately. Do not write that I approved anything — an
autonomous run is unapproved by construction, and I review it afterwards.

Stop and ask only if something clears the escalation bar in AGENTS.md §4, or
if a check fails twice and you do not know why.

Leave unchecked any criterion needing a human eye, and name it in the report.

Finish with a report: what you built, the decisions you took, what you could
not verify yourself, and what you deliberately left out.
```


## 018 — The word you were told once

Twenty-seven rows in `docs/content-style.md`, one per lesson that owns a piece
of the course's vocabulary, each term homed to the lesson that owns it —
„okno kontekstu" to 3a, „pętla zdarzeń" to 5d. It is the closest thing to an
index of that vocabulary that exists, and **no student has ever seen a line of
it.** It also has a hole it does not hide: **Moduł 2 has no row at all.** The
Warsztat lessons own *stack*, *szablon projektu*, *diff* at working level,
`restore`, `revert`, *gałąź jako poligon* and *panel kontroli wersji*, and the
file records that none of them is written down yet — six published lessons, no
terms.

Sixteen of the twenty-seven rows are homed where the reader cannot follow:
nine Git terms in an unpublished Moduł 0 lesson, six filed against „1a", a text
that left the module tree on 2026-08-30 and is served by no route at all, and
fourteen rows of Moduł 4 and Moduł 5 drafts. The guide's own answer there — one
clause of reminder, and no link, because „Technical vocabulary" gives a term no
destination to link to — is a reminder for a reader who has already met the
term, and there is nothing at all for the reader who has not. So the term gets
told again. XAML is explained in `pierwsze-okno.mdx`, a published lesson that
does not own it, and again under a heading of its own in
`ekosystem-dotnet-i-decyzja.mdx`, the unpublished lesson one of its two rows
homes it to.

The reader paying for that is the one the survey counted: of eleven concepts,
**five of twelve students can explain none**, and the median explains one and a
half.

So, two halves. A term the reader can point at, tap, or reach from the
keyboard, returning one sentence without leaving the paragraph; and one page
after every module, always last, holding every term grouped by topic. The
rows carry a term and a home and nothing else — there is no topic column, so
the grouping has to be derived from them, named in the spec, and recorded row
by row; a grouping nobody can reconstruct drifts on the next revision, and it
invents nothing the lessons do not already teach. The sentence shown beside the
term and the entry on that page are the same text, **stored once** — two
copies of one definition is the failure ADR-0003 argues against for lesson
letters, and it would happen here on the first revision.

A gloss is one sentence in the home lesson's own words, not a second lesson: a
term is still introduced once, where it is owned, and nothing here licenses
using a term before its home lesson. Those sentences are student-facing Polish
and belong to the content lane (Article IX). **So the store lives under
`content/`, not in `lib/`** — a content commit may not touch `app/` or `lib/`,
and the sentences arrive one lesson at a time, one commit each. The fixed
strings the elements own are the precedent for chrome the app owns, not for
material a lesson author writes; the code that reads the store belongs in
`lib/`, the sentences do not. This slice ships the marker, the store's shape
and the destination; the sentences follow afterwards in `content:` commits, and
until they are written the destination is a seeded stub rather than a glossary.
That follow-on work is Viktar's, and this entry books it. So the slice closes
against a specimen and a seed rather than a filled glossary — as 013 shipped a
mode with nothing marked.

*Decided 2026-09-09: the destination is `/slownik` — a page, not a Moduł.* A
top-level route beside `/`, `/moduly` and `/styleguide`, and the course keeps
the twelve modules course structure v2.7 gives it. `99-slownik` sorts after
every module the course plans — v2.7 runs Moduł 0 through Moduł 11, nothing
above 11 — and would be last permanently with no code to keep it there; it lost
on the breadcrumb it produces, „Moduł 99", a number that names nothing, and on
adding a thirteenth Moduł to a structure that has twelve. `12-slownik` reads
honestly and is last only until a Moduł 12, and keeping it last past one means
renumbering a module folder, which ADR-0003 puts behind a superseding ADR. The
fourth answer — a folder that keeps its numeric prefix and renders „Słownik"
where the label would say „Moduł 99" — needs that superseding ADR too, Article
X and Viktar's alone; he opened none and chose the page instead, so it is
rejected rather than waiting.

The request asked for a Moduł and got a page, and what that costs is the
machinery a folder would have inherited. **Nothing derives its position or its
existence:** the module grid is built from `CourseModule[]` and a page is not
one, the breadcrumb's steps are the module listing, „Moduł N" and the lesson,
and the pager runs between lessons and between modules over the course model,
so today the last module and the last lesson of it both page into nothing. Each
of those is now something the slice states rather than inherits, and the build
has to be told the route exists at all before a lesson may link to it.

Another app slice in a row, and the rule at the top of this file is not
suspended by it: content goes between them. **Nor is Budget reality
suspended.** This carries the first inline element, a client component with
pointer, touch, keyboard and screen-reader behaviour, a build-time store with
its own checks, and a new destination in the route tree — more than 001's
worth. If the spec cannot hold all four inside a few short sessions, split it
at the seam the two halves already name: the marker and the gloss as 018, the
destination as a slice of its own, and say so in the report rather than running
long and calling it one.

**Done when** a marked term in the specimen returns one short sentence by
pointing, by tapping and from the keyboard alone, dismissible from the keyboard
and announced to a screen reader; the seeded terms appear on one page at
`/slownik` that sits after every module in the reading order and stays there
when a module is added, reachable from the course without a URL typed by hand,
grouped by topic, one anchor per term, the page saying in Polish that it is a
seed and which modules the appendix does not yet record; and the report names
what remains — the 31 unmarked lessons and the sentences still unwritten — as
the content work this slice deliberately does not do.

```
Read in full, in this order:
- constitution.md — Articles III, VI, VIII and IX
- AGENTS.md
- docs/content-style.md — "Technical vocabulary", "One home for every story",
  and the appendix's Terms table: 27 rows, one home lesson per row — except
  one row homed to a range (3a–3c), and terms that appear in two rows, XAML at
  1a and 5b, „pętla zdarzeń" at 5a and 5d, „Rozbierz to" at 3d and 5h. Decide
  what the store does with each, and record it. The note under the table says
  Moduł 2 has no row at all
- docs/surveys/content-reader.md — the eleven concepts, how many of twelve
  could explain each, and the nineteen words it lists as usable without
  explanation
- lib/blocks.ts and lib/content.ts — the six elements slice 010 bound, where a
  seventh name is registered, why refusals are collected with the file and the
  line rather than thrown, and where the elements' fixed Polish strings live in
  one `WORDS` map; lib/dates.ts holds the rest for the same reason. Note that
  a contract element written inside a paragraph is refused today, and a term
  marker is inline by definition
- lib/section-anchors.ts and lib/numbering.ts — the id derivation and the
  diacritic stripping to reuse rather than copy, and why a lesson's letter is
  never stored by hand
- lib/links.ts — SITE_ROUTES, and why a link to an unpublished lesson fails
  the build
- scripts/check-content-style.mjs — a map keyed on slugs that survived the
  2026-09-09 move untouched, and a checker that reports and never fails
- then content/moduly/02-warsztat/pierwsze-okno.mdx and
  content/moduly/05-pod-maska/ekosystem-dotnet-i-decyzja.mdx
  — XAML told once in a published lesson that does not own it, and once under
  its own heading in the unpublished lesson the table homes it to

Slice 018-terms-and-glossary.

Scope: a reader who meets a term gets one sentence about it without leaving the
paragraph, and every term the course has recorded has one destination.

- The marker — how a term in a lesson comes to carry a gloss. Two answers, and
  the spec picks one and records the other as rejected: an inline element an
  author writes around the term, usable without an import, named in Polish and
  spelled ASCII as slice 010's six are; or the store driving the marking when
  the site is built, glossing a term's first occurrence in each lesson from the
  entry that already names its home. By hand is legitimate — but say out loud
  that it leaves 31 written lessons, and „agent" in 28 of them, unglossed until
  the content lane catches up, and say how long that is expected to take.
  Either way it is the first inline element in the corpus.
- The gloss — one short Polish sentence, reachable by pointing, by tapping and
  from the keyboard, dismissible from the keyboard, announced to a screen
  reader, and carrying a link to the home lesson when that lesson is published.
  Reference case: „agent", used in 28 of the 31 lessons and homed in 1b.
- The store — one place under content/ where a term's sentence, its topic and
  its home lesson live, keyed on the home lesson's slug and read when the site
  is built, by the marker and by the destination alike.
- The destination — `/slownik`: every term the store carries, grouped by topic,
  one anchor per term, each entry naming its home lesson and linking to it when
  that lesson is published, and the page naming the modules the appendix does
  not yet record. Three pieces of machinery are built for modules and cannot
  see a page, and each is a decision to take and record here. The module grid
  takes `CourseModule[]`, so the glossary appears in no grid on /moduly or the
  home page unless something is written to put it there: decide how a reader
  who is not already holding the URL arrives — the module listing, the end of
  the reading order, the gloss itself — and note that the header is not free,
  Out of scope below holds it at the two controls it has. The breadcrumb takes
  a trail whose steps are the module listing, „Moduł N" and the lesson, and
  this page is none of those: decide whether it wears one and what its steps
  say, or whether it goes bare as /moduly does. And the pager runs over the
  course model twice — `getLessonNeighbours` flattens it, `getModuleNeighbours`
  walks the module list — so the last lesson of the last module and the last
  module page both end in nothing today: decide what previous and next do at
  both ends and on the glossary itself. Record also whether slice 017's index —
  scoped to published lessons — reaches a page that is not one, or skips it.
- A specimen of the marker, the gloss and one topic group goes on /styleguide.

Out of scope: search — that is slice 017, and no control is added to the
header, which holds two and says why a third would move both. The contents
panel, the scroll-spy and back-to-top slice 007 settled, and the columns slices
011, 012 and 014 settled. A sitemap entry for `/slownik` — that is slice 019;
leave it a note in the spec's Out of scope, as slice 008 did. Footnotes, a
bibliography and inline citation markers, refused by name in slice 010 and
still refused. Changing what the quotation element renders. Writing the Polish
sentences and marking the 31 existing lessons — content lane, one lesson at a
time, after this slice closes; what ships here is the mechanism, the
destination and a handful of seeded terms.

**Nothing here changes how the site looks.** The marker, the gloss and the
destination are built from the tokens slice 003 already defines; the header,
the lesson page and the contents panel are not redesigned to make room, the
empty strip slice 012 gave every non-lesson page stays empty on this one, and
the presentation palette and its dim rule are not touched.

Constraints:
- **The store lives under `content/`, never in `app/` or `lib/`, and is
  validated at build the way a lesson is.** A content commit may not touch
  `app/` or `lib/` (Article IX), so a store outside `content/` makes every
  sentence that follows this slice an illegal commit. An entry with no
  sentence, no topic, or a home slug no lesson has fails the build the way an
  invalid lesson does (Article VIII) — the style checker reports and never
  fails, and this material is student-facing.
- **`/slownik` is a route the build has to be told about, deliberately.** A new
  top-level segment beside `app/page.tsx`, `app/moduly/page.tsx` and
  `app/styleguide/page.tsx`, ASCII — `slownik`, never `słownik` (Article III).
  `SITE_ROUTES` in lib/links.ts holds `/` and `/moduly` and nothing else; every
  other target a link may resolve to comes from the course model, so a lesson
  linking to /slownik is refused by the build until the route is added there.
  Add it in the same slice that creates the page — one entry, made on purpose,
  and not the start of widening a list whose own comment says why /styleguide
  is absent from it. And because no folder prefix orders a page, **where it
  sits in the reading order is nothing the tree decides**: derive the module it
  comes after from the last entry of the course model rather than from a slug
  written by hand, so a module added later leaves it last, and decide where
  that ordering is stated to the reader — the page itself, the module listing,
  or both — keeping it in one place.
- **The page carries the empty strip every non-lesson page carries, and this
  slice does not fill it.** Since slice 012 a page that is not a lesson begins
  its content where a lesson's article begins, and 012 left the column to the
  left of that edge empty as a decision — filling it „with anything" is named
  there as a design decision nobody has made, with a nav and a repeat of the
  module list rejected by name. A glossary grouped by topic wants exactly that
  strip for its topic list, and slice 014 has already filled it once, on the
  module page, with the module's own contents — in a slice written for that,
  which is how a strip gets filled if one ever is. So the topic list goes in
  the content column with the rest of the page, and filling the strip is a
  later slice, not a quiet extension of this one. It is a slice and not an ADR:
  012 decided it in a spec, and a new spec is what overrules a spec (AGENTS.md
  §8). If what is wanted there is the contents panel itself, note that it is
  built from a `CourseModule` and a glossary is not one — making it serve a
  list that is not a module's lessons changes what that component is, and that
  is 014's shape, not this slice's to bend.
- **Nothing here may be hover-only.** Android 6 and iOS 3 of 12 on the survey's
  platform question, and there is no hover on a touch screen. Pointer, touch
  and keyboard are three ways into the same thing, and a screen reader is a
  fourth: the gloss is announced, not merely drawn.
- **A gloss is a reminder, not the lesson.** One sentence, capped — decide the
  cap and record it — in the words its home lesson used. The nineteen words the
  reader survey lists as usable without explanation — zmienna, pętla, funkcja,
  plik, terminal and the rest — get no gloss, or the site tells a student those
  are hard. Two of them are also homed terms — IDE at 1b and again at 5c, and
  „pętla" inside „pętla zdarzeń" at 5d — so decide and record how the list and
  the table are reconciled, and what the build does with a marked term on that
  list.
- **Key a term's home on the lesson slug, never on the letter.** A letter is
  derived from `order` and never stored (Article VI); the letters shifted three
  times in ten days — 2026-08-30, 2026-09-02, 2026-09-09 — and seven terms are
  still recorded against a „1g" that Moduł 1 no longer has. The style checker
  keys every story on the slug, and its map survived the last move untouched.
  Derive the letter a reader sees through the numbering already written rather
  than storing it, and decide what the build does when a store entry names a
  slug no lesson has.
- A term whose home the reader cannot open — sixteen of the twenty-seven rows
  today — must not put that lesson's text in front of a reader, and must not
  produce a link the build refuses. Decide what the destination shows for such
  a term, and for the seven filed against a lesson letter that no longer
  exists, and record it.
- No backend and no API route; the store is read when the site is built
  (Article VIII). `"use client"` for the gloss and nothing else. A dependency
  needs an ADR line saying what it replaces and why (AGENTS.md §8);
  hand-written positioning is a legitimate answer if you say why it is cheaper
  than the library you rejected. List docs/adr/ before claiming a number
  (AGENTS.md §7).
- This is the repo's first element anchored to a word, and the page it floats
  over is hostile: `.prose` grid items carry `min-width: 0` against a
  horizontal scrollbar, `pre` and `table` scroll themselves, the code block and
  the exercise clip, and the contents panel has its own scroller. Colours come
  from tokens only, both themes pass the contrast check, and any line the
  reader relies on to see where the gloss ends uses `--rule-strong` (ADR-0012).
- Every visible string is Polish and lives in one place, the way the elements'
  fixed strings already do; every element name, attribute, id and route segment
  is ASCII (Article III) — `slownik`, never `słownik`. Derive any per-term
  anchor through the heading slugifier the section anchors already use rather
  than minting ids beside it.

A term inside a heading, inside a quotation somebody actually said, inside a
code fence or inline code, and the same term used nine times in one lesson are
four different cases. Decide what each one does and record it — marking inside
a quotation is an edit to a quotation, which slice 010 exists to prevent. What
a marked term looks like in presentation mode is a fifth case, one this slice
creates, and that one is yours.

Slice 009 asks for the file and line that demonstrates a new element is needed.
Here the evidence is above and the request is mine; say which in the spec rather
than dressing one as the other.

Decide everything else yourself, per AGENTS.md §4 — and ask nothing unless it
clears the escalation bar there.

Run this slice **autonomously** — AGENTS.md §2, "Two modes". Do not stop
between stages.

1. Write spec.md, ending in acceptance criteria and a "Decisions taken"
   section — one line per decision, naming the alternative you rejected.
2. Write plan.md **from a subagent whose only inputs are constitution.md,
   AGENTS.md and this slice's spec.md.** If it cannot produce a plan from the
   spec alone, the spec is incomplete: fix the spec and say so in the report.
3. Write tasks.md.
4. Implement it. One task, one check, one commit, in order. Show each check's
   command and output.
5. Close with a fresh-context subagent review of the diff against the
   acceptance criteria. Fix what affects correctness or a criterion; record
   the rest without fixing it.

Commit each artifact separately. Do not write that I approved anything — an
autonomous run is unapproved by construction, and I review it afterwards.

Stop and ask only if something clears the escalation bar in AGENTS.md §4, or
if a check fails twice and you do not know why.

Whether the gloss can be read on a phone without covering the sentence it
explains is a criterion I have to look at. Leave it unchecked, and name in the
report which lesson, which term and which viewport width to open.

Finish with a report: what you built, the decisions you took, what you could
not verify yourself, and what you deliberately left out.
```


## 019 — Being found

*Decided 2026-08-28: the site is permanently open and searchable.* Choosing that
is not the same as achieving it — a site with almost no inbound links is not
indexed by being un-blocked. A `sitemap.xml`, a permissive `robots.txt`, and a
real `title` and `description` per page.

**Last, deliberately** — ordered by what it would expose, not by what blocks a
lesson.

```
Read in full, in this order:
- constitution.md — Article IV
- AGENTS.md
- docs/adr/0006-temporary-no-index.md — the decision and its history

Slice 019-discoverability.

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

Run this slice **autonomously** — AGENTS.md §2, "Two modes". Do not stop
between stages.

1. Write spec.md, ending in acceptance criteria and a "Decisions taken"
   section — one line per decision, naming the alternative you rejected.
2. Write plan.md **from a subagent whose only inputs are constitution.md,
   AGENTS.md and this slice's spec.md.** If it cannot produce a plan from the
   spec alone, the spec is incomplete: fix the spec and say so in the report.
3. Write tasks.md.
4. Implement it. One task, one check, one commit, in order. Show each check's
   command and output.
5. Close with a fresh-context subagent review of the diff against the
   acceptance criteria. Fix what affects correctness or a criterion; record
   the rest without fixing it.

Commit each artifact separately. Do not write that I approved anything — an
autonomous run is unapproved by construction, and I review it afterwards.

Stop and ask only if something clears the escalation bar in AGENTS.md §4, or
if a check fails twice and you do not know why.

Leave unchecked any criterion needing a human eye, and name it in the report.

Finish with a report: what you built, the decisions you took, what you could
not verify yourself, and what you deliberately left out.
```


---

## Settled — the indexing decision

The site is **public and searchable, permanently.** Not a temporary posture, so
there is nothing to remember and nothing to undo. Slice 019 is what makes it
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

- ~~**Search**~~ — numbered **017** above, 2026-08-31. The judgement here was
  "worthless under ~15 lessons, obvious above ~30, wait for the pain". What
  changed is that the pain turns out not to be lesson *count*: seven lessons
  already carry fifty-six sections and fifteen thousand words, and nothing
  crosses a file.
- **A footer, and a link to each page's source.** The two scraps of the
  reference's chrome left over after 011, 017 and 019. A footer would carry what
  *Not doing* below already refuses — partners, a licence block, a challenge —
  and "propose changes to material" serves contributors this repo does not
  have. Both are cheap the day either has something to say.
- ~~**An authoring skill**~~ — done 2026-08-30 as two: `.claude/skills/write-lesson`
  (brief → approve → draft) and `.claude/skills/revise-lesson` (diagnose →
  fix what is named), reading `docs/surveys/content-reader.md` and `docs/content-style.md`.
  The first Module 2 lesson is the test of them.
- **A syllabus page**, derived from lesson metadata rather than maintained by
  hand, so it cannot drift.
- **Task sheets**, if they turn out to be a different shape from exercises.

## Housekeeping, not slices

- `_to_delete/` at the repo root is untracked leftovers. Delete it; nothing
  tracks it, so it needs no commit.
- `docs/content-research/` and `docs/_prompts/` are untracked. Per
  `30_work/TTC/ttcmd.md`, curriculum plans and drafts belong in the vault, not
  in this public repo. Decide deliberately rather than sweeping them in.
- Eight lessons in Moduł 1 are modified or untracked. Content is its own lane —
  `content:` — and does not wait for a slice.

## Gated — needs a decision or an amendment first

Not scheduled. Each needs something that does not exist yet.

| Candidate | Blocked on |
| --- | --- |
| ~~Week / schedule view~~ | **Delivered as 016**, 2026-09-10 — and not by inventing a timetable. Viktar writes the weeks he actually has into `content/schedule.json`, and the page renders only those. `week` on a lesson stays optional metadata and stays unread: the schedule is the source of truth for when anything happens. |
| Per-group content | An amendment to Article VI. ADR-0014 lets the site *report* where each group is; content stays identical for every group, and a lesson that varies by group is a new decision with its own ADR. |
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
