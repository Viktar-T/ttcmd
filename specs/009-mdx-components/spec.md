# spec.md — 009-mdx-components

- **Slice:** 009
- **Status:** drafted in an autonomous run — unapproved by construction;
  execution is recorded by the slice's commits and the run's final report, and
  Viktar reviews the `## Decisions taken` list afterwards
- **Date:** 2026-08-30
- **Depends on:** 001 (the MDX pipeline and the build-time schema, Article
  VIII), 004 (the reading treatment an exercise has to sit inside without
  disturbing), 005 (the precedent that an element a lesson writes is mapped
  into the compile once, for every lesson, with no lesson edited), 008 (a
  lesson that is not published is not part of the course), ADR-0003 and
  constitution Article VI (exercise numbers run `<module>.<n>` continuously
  across a module)
- **Unblocks:** the content lane — seven lesson files are currently carrying a
  written note that they cannot number their own exercises

---

## Why

**The course's exercises have no numbers, and the content says so in writing.**

Seven lessons are published. Every one of them ends with a section headed
*Ćwiczenia* and a bare ordered list — four exercises in module 0, twenty-nine
in module 1 — and **every one of the seven files carries a comment recording
that the numbering was left out on purpose, because a lesson cannot work it
out from inside itself**:

| File | Line | What it says |
| --- | --- | --- |
| `content/moduly/00-start/git-i-github.mdx` | 171–174 | "Exercise numbers deliberately omitted. Per ADR-0003 exercises are numbered module.n continuously across the whole module, so these numbers depend on how many exercises end up in lessons 0a and 0b, which do not exist yet." |
| `content/moduly/01-jak-powstaje-oprogramowanie/od-podpowiedzi-do-agenta.mdx` | 195 | "Numery zadań celowo nieprzypisane — ADR-0003, numeracja ciągła przez moduł." |
| `…/co-model-naprawde-potrafi.mdx` | 275 | the same line |
| `…/na-zywo-agent-buduje-aplikacje.mdx` | 364 | the same line |
| `…/nowy-warsztat-programisty.mdx` | 264 | the same line |
| `…/vibe-coding-kontra-inzynieria.mdx` | 258 | the same line |
| `…/jak-nie-wypasc-z-obiegu.mdx` | 185 | the same line |

This is Article IX's detector firing exactly as it was meant to. The content
lane was written until it hit something it could not do, and it stopped and
left a note rather than inventing a number. Seven notes in seven files is not
a preference; it is a blocked lane.

**And the number is not decoration.** ADR-0003 puts it with the module number
and the lesson letter: *"Zadanie 1.7" identifies exactly one exercise in the
course* — the string a teacher says out loud, writes on a task sheet, and
thirty students have to land on. Today the site cannot say it. A student told
to do 1.7 opens a lesson and counts list items, and the count is wrong the
moment a lesson is reordered or an exercise inserted.

**A second, smaller failure is visible on the same pages.** The design
reference asks an exercise to carry "enough visual weight to be unmissable
when scrolling back" (`docs/design-reference.md` §Exercises). Today an
exercise is an ordinary list item: the thing a student is actually being asked
to *do* is the least distinguishable block on the page, sitting below several
thousand words that were only ever to be read.

**What this slice is not.** Every other entry in the design reference's
component inventory was checked against the written content and left out —
the list and the reason for each are under *Out of scope*. Nothing here is
built in anticipation of content nobody has written.

## What

### 1. An exercise is a block a lesson writes, and it carries no number

A lesson marks an exercise as an exercise. It writes the exercise's body, and
optionally a short **title** — the corpus already writes four of those as bold
lead-ins (`…/nowy-warsztat-programisty.mdx:272` *"Eksperyment z długością
polecenia."*, `:279` *"Ocena różnicowa."*,
`…/na-zywo-agent-buduje-aplikacje.mdx:376` *"Spróbuj samodzielnie."*,
`…/jak-nie-wypasc-z-obiegu.mdx:196` *"Cztery rankingi."*) — and it writes **no
number and no offset of any kind**. The authoring element is named `Zadanie`,
after the design reference's inventory and after the word a student reads; its
optional title attribute is spelled `title`, as a code fence's already is.

Exercises are marked one at a time rather than as a group. The design
reference puts an exercise "inline, in the lesson, where the concept was just
explained"; the corpus happens to collect them at the end today, and a form
that only works while they are collected would have to be replaced the first
time one is not.

### 2. The number belongs to the module

Per ADR-0003 and Article VI, an exercise's number is `<module>.<n>`, where `n`
counts **continuously across the whole module**, walking the module's lessons
in `order` and counting exercises as it goes. A lesson does not restart at 1.

Consequences that are part of this specification, not side effects:

- **A lesson's exercises are numbered by what precedes them in the module**,
  and by nothing in their own file. Were the corpus to adopt this element
  unchanged today, module 0 would read 0.1–0.4 and module 1 would read
  1.1–1.29.
- **Only published lessons count.** A lesson hidden by slice 008's flag is not
  part of the course, so it contributes no exercises and consumes no numbers;
  the lessons around it number continuously through the gap.
- **A module whose earlier letters do not exist still starts at 1.** Module 0's
  only written lesson has `order: 3`; its first exercise is 0.1, not 0.5.
- **Inserting an exercise, reordering a lesson, or publishing a draft
  renumbers everything after it**, in every later lesson, with no lesson file
  edited. That is the intended behaviour and the reason the number may not be
  stored: a stored number and a derived position are two sources of truth that
  will disagree.
- **Nothing may compute the number per file.** ADR-0003 says so in as many
  words. A number derived from an exercise's position within its own lesson
  looks correct on the first lesson of every module and is wrong on all the
  others.

### 3. The number is text, in the page the server sends

The number is real text in the document: read aloud by a screen reader, found
by the browser's find-in-page, and included when a student selects and copies
the exercise. It is present in the HTML with JavaScript disabled.

This rules out generating it as decoration — a generated counter, a label
drawn into an image — which no student could search for and no reader could
copy, and which in any case cannot count across files.

### 4. The number is an address

Each exercise carries a stable fragment identifier containing its number, so
that the string a teacher says out loud is also a link that lands on the
exercise. ADR-0003 calls the number identity — something students "type into a
browser" — and an identity that cannot be linked to is half of one.

The identifier follows the rules every other identifier on this site follows
(Article III): lowercase ASCII letters, digits and hyphens.

### 5. An exercise is set apart, and is neither a quotation nor a callout

An exercise is visibly a different kind of block from the prose around it,
with its number the most prominent thing about it. It does not borrow the
quotation treatment — the lessons argue from twelve real quotations, and the
reading treatment already spends that treatment on saying "somebody else said
this" — and it does not introduce the note/warning/gotcha palette, whose
colours ADR-0007 still records as indicative and unverified.

It uses only colours that already exist as tokens, holds the site's contrast
floors in both themes, and does not widen the page on a phone.

### 6. Misuse fails the build

An exercise written where the module cannot number it — outside a lesson, in a
module's own introduction — **fails the build, naming the file**, through the
same gate every other content mistake fails through (Article VIII). A silent
zero, a blank or a `?` on a public page is worse than a build that stops in
front of its author.

### 7. The rendering stays checkable after this slice ends

No lesson uses this element yet — adopting it is a content-lane change and is
out of scope below — so without a permanent specimen the treatment would be
unrenderable anywhere on the site, and unre-checkable the next time a slice
touches typography or colour. The site's existing reference surface therefore
carries a specimen of an exercise with a title and one without, compiled
through the same pipeline a lesson goes through. This is the argument slice
005 made for its C# specimen, for the same reason.

The specimen proves the **treatment**. The **numbering** is proved on the real
lessons, temporarily, and reverted — see the acceptance criteria.

## Out of scope

Every remaining entry in the design reference's component inventory was checked
against the written corpus. Each is refused for a stated reason, not forgotten.

- **A copyable prompt block.** The corpus contains exactly one prompt
  (`…/na-zywo-agent-buduje-aplikacje.mdx:139–185`) and it is already a fenced
  block declaring a filename, so it already renders with the copy control and
  the filename header slice 005 built. Nothing is blocked.
- **A lesson-objectives block.** No lesson opens with objectives, and the
  content style guide's rule for opening a lesson (`docs/content-style.md`,
  §"Open a lesson") prescribes prose posing the lesson's question instead.
  Nothing asks for it, and the guide argues against it.
- **A note / warning / gotcha callout.** Twelve of the corpus's fourteen block
  quotations quote a named person; the two that quote nobody
  (`…/od-podpowiedzi-do-agenta.mdx:109` and
  `…/vibe-coding-kontra-inzynieria.mdx:249`) are an argument for one — but an
  inferred argument rather than a written request, and the palette it would
  need is explicitly unsettled (ADR-0007; `docs/design-reference.md` open
  question 6). Put to Viktar before this spec was written and confirmed left
  out.
- **An image with a caption.** No lesson contains an image. The five diagrams
  are inline vector drawings the reading treatment already places full-width,
  and none carries a caption.
- **Code blocks, breadcrumbs, the contents panel, previous/next, the circled
  lesson letter, back-to-top.** Built in slices 005, 006 and 007.
- **Any change to navigation.** In particular the design reference's exercise
  entry in the contents panel — *"Exercises 1.1.-1.2."* as one anchor —
  belongs to whichever slice reopens that panel.
- **Any change to content.** No file under the content directory is edited by
  this slice. Verification stages exercises in real lessons temporarily and
  reverts every one; the diff under the content directory ends empty. The
  lessons adopt the element afterwards, in the content lane, where that
  belongs (Article IX).
- **Exercise state, submission, completion tracking, difficulty or time
  markers.** v1 has no backend (Article VIII), and no student work is hosted
  here (Article VI).
- **Solutions or answer keys.** The repo and the site are public (Article IV).

## Acceptance criteria

Observable conditions. Each is checked and the check's output is the evidence.

Criteria 2–9 and 13 are staged by **temporarily** marking exercises in real
lesson files, reading the result, and reverting — the method slice 008 used
for its flag. Criterion 16 is the proof that nothing was left behind.

1. **`npm run build` succeeds with no content file changed**, every existing
   guard and contrast check passing unchanged, the emitted route list
   identical to the one before this slice, and **no new dependency** in the
   manifest.
2. **Module 1 numbers 1.1 … 1.29, continuously, in `order`.** With every
   exercise in the module's six published lessons staged, the rendered pages
   read 1.1–1.4, then 1.5–1.9, 1.10–1.14, 1.15–1.19, 1.20–1.24 and 1.25–1.29
   — no lesson restarting at 1, no number repeated, none skipped. Read from
   the rendered pages.
3. **Module 0 starts at 0.1.** Its only lesson has `order: 3`; its four
   exercises render 0.1–0.4.
4. **No number is written in any lesson.** In the staged tree, searching every
   content file for the rendered numbers finds nothing: the source carries no
   number and no offset.
5. **The number is in the HTML the server sends.** The numbers of criterion 2
   are present in the built output and render with JavaScript disabled.
6. **Inserting one exercise renumbers everything after it.** Adding a single
   exercise to the module's earliest staged lesson shifts every later number
   by one, in every later lesson, with no other file edited.
7. **An unpublished lesson consumes no numbers.** Marking a staged middle
   lesson `publish: false` removes its exercises from the sequence and leaves
   the lessons around it numbered continuously through the gap.
8. **The number is an address.** Each exercise carries a stable fragment
   identifier containing its number, valid per Article III and unique on its
   page; requesting the page at that fragment lands on the exercise.
9. **The number is text.** The browser's find-in-page locates a number such as
   1.7 on the page carrying it, and selecting an exercise and copying it
   includes the number.
10. **The reference surface carries a permanent specimen** of an exercise with
    a title and one without, compiled through the same pipeline a lesson uses.
11. **No colour literal is introduced outside the tokens file** — the existing
    build guard is the check — and every colour the exercise uses clears the
    site's contrast floor in **both** themes: body text ≥ 4.5:1, and any line
    that is the only thing identifying the block ≥ 3:1. Ratios computed and
    recorded.
12. **At 375 px the page has no horizontal scrollbar** with an exercise on it,
    and the exercise's body wraps inside the reading column. Checked on the
    reference surface and on a staged lesson.
13. **An exercise the module cannot number fails the build, naming the file.**
    Shown by staging one in a module's own introduction, and reverted.
14. **The optional title renders when given, and nothing renders in its place
    when absent** — no empty bar, no stray punctuation. Read from the
    reference surface's two specimens.
15. **No client-side JavaScript is added by this slice.** The exercise renders
    from the server and has no interactivity of its own.
16. **The content directory is untouched.** After verification, the working
    tree under `content/` is byte-for-byte what it was before this slice
    began.
17. The fresh-context review reports no gap against these criteria and nothing
    outside this slice's scope touched — in particular no surviving content
    edit, no change to navigation, no second component, and no new dependency.

**Needs a human eye — not closable by an agent.** The design reference asks an
exercise to be "unmissable when scrolling back" past it. Criteria 11, 12 and
14 pin what is measurable; whether the result actually reads as unmissable in
rendered Polish prose, on both themes, is a judgement made by looking at a
lesson page. It is named here and left open deliberately.

## Decisions taken

Per AGENTS.md §4. One line each, naming what was rejected.

1. **One component, not the inventory.** Rejected: building the prompt block,
   the objectives block and the callout alongside it — none of which any
   written lesson is blocked on, and the callout of which would need a palette
   ADR-0007 still calls unverified.
2. **The number is derived from the module on every build, never stored.**
   Rejected: a number in frontmatter or in the element — two sources of truth
   for one fact, and the mistake ADR-0003 names as the likeliest one available
   in this slice.
3. **Exercises are marked one at a time, not as a group.** Rejected: one
   element wrapping the whole *Ćwiczenia* section, which reads well against
   today's corpus and breaks the day an exercise sits inline where its concept
   was explained — which is what the design reference actually asks for.
4. **Only published lessons consume numbers.** Rejected: counting drafts too,
   which leaves holes in the sequence a student is told to work through, for
   lessons they cannot open.
5. **Renumbering on insertion or reordering is accepted, not mitigated.**
   Rejected: pinning a number once assigned, which is the stored-number
   mistake wearing a justification, and which ADR-0003 already weighed against
   the ambiguity of per-lesson numbering.
6. **Each exercise gets a fragment identifier built from its number.**
   Rejected: no identifier at all — cheaper, and it would make the one string
   a teacher says out loud the one thing on the site nobody can link to.
7. **A title is optional.** Rejected: requiring one, which would make
   twenty-nine of the corpus's thirty-three exercises invent a heading they
   were written without.
8. **Misuse fails the build.** Rejected: rendering a blank, a zero or a `?`,
   which publishes a wrong number to students rather than stopping a build in
   front of its author.
9. **The treatment is proved by a permanent specimen on the reference surface;
   the numbering is proved on real lessons and reverted.** Rejected: proving
   both on a synthetic fixture, which demonstrates a parallel derivation
   rather than the one the site runs.
10. **No lesson file is adopted into the new element by this slice.**
    Rejected: converting the seven lessons' exercise lists here, which is a
    content-lane change with its own commit prefix (Article IX) and was placed
    out of scope for this slice.

## Notes for the reviewer

- **The mistake this slice is most likely to make is the one ADR-0003 names.**
  A number computed from an exercise's position inside its own file passes
  every check performed on a single lesson, and on the first lesson of any
  module. Criterion 2 exists because spanning more than one lesson is the only
  shape of check that catches it.
- **Criterion 7 is not a repeat of slice 008.** Slice 008 established that a
  hidden lesson is absent from listings and routes. What is new is that it must
  also be absent from a *count* other lessons depend on — the first place where
  one lesson's frontmatter changes what a different lesson renders.
- **Criteria 4 and 5 look like the same fact and are not.** One is about what
  the author writes, the other about what the reader receives; an
  implementation that numbers correctly in a browser and writes nothing into
  the HTML passes 4 and fails 5.
- **Criterion 16 is what keeps this slice inside its scope.** Everything the
  numbering criteria need is staged in content, and content is precisely what
  this slice may not change.
