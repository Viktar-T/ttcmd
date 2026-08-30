# spec.md — 010-sources-and-figures

- **Slice:** 010
- **Status:** drafted in an autonomous run — unapproved by construction;
  execution is recorded by the slice's commits and the run's final report, and
  Viktar reviews the `## Decisions taken` list afterwards
- **Date:** 2026-08-30
- **Depends on:** 001 (the MDX pipeline and the build-time schema, Article
  VIII), 004 (the reading treatment these blocks sit inside, and the quotation
  treatment they must not be mistaken for), 008 (a lesson that is not published
  is not part of the course), 009 (the precedent: an element registered once
  for every lesson, stamped during the compile, whose misuse fails the build),
  ADR-0012 (a line that is a boundary takes the strong rule value)
- **Related, and deliberately not amended:** ADR-0008 is *proposed*, not
  accepted. This slice does not adopt it, does not cite it as authority, and
  does not touch `constitution.md`. What it does is make the shape that ADR
  describes **cheap to write and impossible to write wrongly**, so the decision
  can be taken later against something real.
- **Unblocks:** the content lane — every lesson currently hand-builds its
  evidence apparatus out of Markdown, and no two of them build it the same way

---

## Why

**The course argues from other people's work, and the apparatus that says so is
hand-assembled prose.** Six published lessons carry fourteen block quotations,
five diagrams and six evidence lists. Every one of those is built out of
generic Markdown, and the result is not one shape but several.

**A quotation is a blockquote, and half of them lose their source.** Six
quotations end in an attribution line the author typed by hand — an ordinary
paragraph beginning with an em dash, with the date carrying the link
(`…/vibe-coding-kontra-inzynieria.mdx:22`, `:43`, `:126`, `:186`). The other
eight carry nothing: the reader is told somebody said this and never told who,
where, or when (`…/co-model-naprawde-potrafi.mdx:128–131`,
`…/od-podpowiedzi-do-agenta.mdx:109`). Nothing distinguishes the two cases from
each other, and nothing distinguishes either from a blockquote used for
something that is not a quotation at all — `…/vibe-coding-kontra-inzynieria.mdx:249`
is the teacher's own rule, set in the same treatment as Karpathy's words.

**A diagram's caption is drawn inside the drawing.** Two of the five diagrams
end with a line of `<text>` inside the SVG:

| File | Line | What is inside the drawing |
| --- | --- | --- |
| `…/co-model-naprawde-potrafi.mdx` | 116 | `Dane: analiza Stanford (Denisov-Blanch, 2025)` |
| `content/interesting-to-read/czterdziesci-lat-zmian.mdx` | 85 | `Każde pudełko to inna praca programisty … Szczegóły i źródła niżej.` |

Text inside an SVG is not text the page can reflow, cannot be selected the way
the paragraph above it can, is set at a size chosen against the drawing's own
coordinate system rather than against the reading scale, and — for the data
source specifically — hides the one line that says where the numbers came from
inside the picture the numbers are drawn in.

**An evidence list is a bulleted list whose grammar is per-line convention.**
Six lessons end in `## Źródła` and a `-` list, and the shape of an entry is
whatever its author typed that day. Across the corpus a single list carries
entries with a date and entries without
(`…/od-podpowiedzi-do-agenta.mdx:222–223`), entries with one link and entries
with two or three (`…/czterdziesci-lat-zmian.mdx:394`, `:396`, `:401`), a
publisher before the date and a publisher after it, a secondary-source warning
in running prose (`:403`), a re-check date written as ISO inside a list that
otherwise uses `dd.mm.yyyy` (`:401`), and — mixed into the same list — four
entries that are not evidence for anything but suggestions to go and read
(`…/od-podpowiedzi-do-agenta.mdx:220–223`). A student cannot tell, from the
page, which entries back a claim in the lesson and which are an invitation.

**And every one of those links behaves in a way the author cannot see.**
Nothing on this site marks a link as leaving it, and every one of the roughly
one hundred and sixty links in the corpus opens in the tab the student was
reading in. The internal ones are worse: five lessons link to five other
lessons by typing the path by hand, and nothing checks that the path exists.
One lesson has already moved out of `content/moduly/` during the writing of
this course; the only reason the corpus is not currently shipping a dead link
is that the moved lesson happened to be the one nothing pointed at.

**None of this is a style complaint.** Each item above is the same failure: a
fact the reader needs — who said this, when, where the numbers came from,
whether this link leaves the site, whether this link goes anywhere — is carried
by a convention rather than by a structure, so it is *optional*, and half the
time it is omitted. This slice turns the conventions into elements and the
omissions into build failures.

## What

### 1. Four elements a lesson writes, and no lesson imports

`Cytat`, `Rysunek`, `Zrodla` and `CzytajDalej` are available in every lesson
and every module introduction without an import, the way an exercise already
is. Two of them take entry children — `Zrodlo` inside `Zrodla`, `Lektura`
inside `CzytajDalej` — so six names are registered; four are the ones an author
reaches for.

The names are Polish and ASCII, and the attribute names are English and ASCII:
Article III holds every identifier to ASCII, an author writing a lesson is
writing Polish, and slice 009's `Zadanie title="…"` already set both halves of
that convention.

### 2. `Cytat` — a quotation and its source, as one block

It carries: the quoted words (one paragraph or several), **who** said them,
**what** they said it in, **when**, and **a link to it**. Optionally a moment
inside a recording — and then the link opens at that moment, not at the start —
and a second link to a transcript.

It is visibly one block, visibly not body prose, and **visibly not a plain
Markdown blockquote**: the lessons keep using blockquotes for passages that are
not attributed quotations, and if the two render alike the element buys the
reader nothing.

The reference case is the one the corpus already contains: DHH on *Lex Fridman
Podcast #501*, a YouTube link with a timestamp, plus a separate transcript page.

**A quotation with no date, or with no way to reach the source, is refused by
the build.** A source that exists only in print has no URL and must still be
citable, so the element accepts a printed locator *in place of* a link — an
explicit statement that this one is on paper, never a silent absence.

### 3. `Rysunek` — a figure, whose caption is not inside the drawing

It wraps a diagram — today an inline SVG, later an image — and renders **a
caption as HTML text outside the drawing**, plus an optional one-line data
source, which may itself carry a link.

A diagram that is not wrapped keeps rendering exactly as it does today. This
element adds a way to say what a drawing shows and where its numbers came from;
it does not change what an unwrapped drawing does.

A caption is required — a figure wrapper whose caption is optional guarantees
nothing — and a data source is not: a diagram of an idea asserts no
measurement, and requiring a source would make its author invent one.

### 4. `Zrodla` — the evidence list, as a structure

The block carries the date the list was checked. Each entry carries a title,
who published it, the date the source itself bears, a link, and an optional
one-line note. **Everything but the note is required**: an entry whose publisher
is unknown is an entry a reader cannot weigh, and the title is the link's text,
so an entry without one is a link that does not name the thing
(`docs/content-style.md` §Mechanics).

**The note is where every irregularity in today's lists goes**, and it is rich
enough to hold them: a second link, a moment inside a recording, "źródło
wtórne", "sprawdzone później". It is one line — a run of inline text — and not
a paragraph, a list, or a second entry wearing a note's clothes.

**An entry with no date or no link fails the build.** That is the whole point of
the element: an evidence list whose entries may be undated is the list the
corpus already has.

`Zrodla` renders no heading. The lesson keeps writing `## Źródła`, which is what
puts the section in the contents panel, and this slice does not touch the panel.

### 5. `CzytajDalej` — further reading, which is a different promise

Each item carries a link, a title that names what is behind it and is the link's
text, a **kind** — at most four, and the four are *artykuł*, *wideo*,
*dokumentacja*, *kurs* — and one line saying why to read it. It carries **no
date**, and writing one is refused: an item that needs a date is evidence and
belongs in the other list.

It is a separate element rather than a flag on `Zrodla`, and the reason is the
obligation, not the layout: **evidence must be dated because a claim rests on
it; a recommendation need not be, because nothing rests on it.** One element
carrying both would have to either force a date onto a recommendation or excuse
an evidence entry from carrying one, and the second of those is the rule this
slice exists to make visible. The two read differently on the page, and a
reader can tell at a glance which entries the lesson is standing on.

### 6. One link treatment, applied when the site is built

- **A link to another site is marked as such and opens in a new tab**, with the
  relationship attributes that implies. The mark is visible, and it is also
  available to a reader who is not looking at the screen.
- **A link into the course is resolved against the content on disk.** A module
  or lesson that does not exist **fails the build, naming the file and the
  line**. So does a link to a lesson that exists but is not published: slice 008
  makes such a lesson answer as not-found, so a link to it is a link to nothing,
  and a link to nothing on a public page is worse than a build that stops.
- **Links inside `Cytat`, `Zrodla` and `CzytajDalej` get the same treatment as
  links in prose** — one derivation of what a link is, not two that agree until
  somebody edits one.

The whole treatment runs at build. Nothing here needs a browser (Article VIII).

### 7. Every visible form the style guide prescribes is kept, and produced

`docs/content-style.md` §Mechanics fixes the visible forms: „…” quotation marks
in prose, two date forms — day and month in words for prose, `dd.mm.yyyy` in
lists — an ISO date after `Stan na`, and link text that names the thing rather
than saying *tutaj*.

An author writes one machine-readable date. **Which visible form it takes is the
element's decision, not the author's**, so the guide's two forms stop being two
things an author has to remember and become two things the site cannot get
wrong. A date may be given to the day, the month or the year, and the rendering
never invents a precision the author did not write.

Which element takes which form:

| Where the date appears | Form | Example |
| --- | --- | --- |
| a quotation's attribution — it reads as a sentence | prose | `2 lutego 2025` |
| an entry in either list | list | `02.02.2025` |
| after *Stan na*, which the guide fixes | ISO | `2026-08-29` |

**The elements supply every fixed Polish word around those values** — *Stan na*,
the label before a data source, the one before a transcript link, the one before
a printed locator, and the four kind names. An author writes none of them, and
they live in one place, so rewording them is one edit and not seven.

### 8. Misuse fails the build, and no element may hide the rule it exists for

These elements exist to make a rule visible. **None of them may be usable in a
way that hides it.** A quotation without a date or a source, an evidence entry
without a date or a link, an entry element outside its list, a list containing
something that is not an entry, a kind that is not one of the four, an internal
link to nothing — each stops the build with a message naming the file, and none
of them ever renders as a blank, a dash or a plausible-looking gap.

### 9. The rendering stays checkable after this slice ends

No lesson uses these elements yet — adopting them is content-lane work and is
out of scope below. The site's existing reference surface therefore carries a
**specimen of every element and every variant**, compiled through the same
pipeline a lesson goes through. That is the argument slices 005 and 009 both
made, for the same reason: without a permanent specimen the treatment is
unrenderable anywhere on the site the moment this slice ends.

## Out of scope

- **A callout, and a `Zasada` element for a rule in the teacher's own words.**
  Put to Viktar during slice 009 and left out; the corpus's two unattributed
  block quotations are an argument for one, and the palette it needs is still
  recorded as indicative (ADR-0007, `docs/design-reference.md` open question 6).
  It returns as its own slice when the content asks.
- **Kinds, difficulty or time markers on `Zadanie`.** Slice 009 closed.
- **A `Lekcja` link element** — one that renders a link to another lesson from
  its identity. The link treatment in §6 resolves a hand-written path, which is
  what the corpus writes today; an element that spells the link is a separate,
  later convenience.
- **A bibliography, footnotes, inline citation markers, a citation counter, or
  any link from a claim in the prose to an entry in the list.** The list is read
  as a list.
- **Video embeds.** A timestamped link does the work without putting a
  third-party script on a site read by minors.
- **Any change to the contents panel**, including an entry for the sources
  section beyond the one its `## Źródła` heading already produces.
- **Any change to content.** No file under `content/` is edited by this slice.
  The lessons keep their blockquotes, their unwrapped diagrams and their
  Markdown source lists, and keep rendering as they do now — except that their
  links acquire the treatment of §6, which is the one change §6 is for.
  Migration is content-lane work, after this slice closes.
- **Validating the fragment of an internal link.** The path is resolved; `#…`
  after it is not. Section anchors are minted per compile and an exercise's
  identifier depends on the whole module's walk; checking fragments is a
  worthwhile slice and it is not this one.
- **Anything about links that are neither internal nor `http(s)`** — `mailto:`,
  `tel:`, a relative path. Nothing in the corpus writes one; the build refuses
  them rather than guessing, and the day one is wanted is the day to decide how
  it renders.
- **A frontmatter field for sources.** ADR-0008 weighed one and deferred it.
  This slice puts the apparatus in the body, where the reader is.

## Acceptance criteria

Observable conditions. Each is checked and the check's output is the evidence.

Criteria 12–16 are staged by **temporarily** writing the elements into real
lesson files, reading the result, and reverting — the method slices 008 and 009
both used. Criterion 21 is the proof that nothing was left behind.

1. **`npm run build` succeeds**, every existing guard and contrast check passing
   unchanged, the emitted route list identical to the one before this slice, and
   **no new dependency** in the manifest.
2. **Each of the four elements, and both entry elements, is usable with no
   import**, in a module introduction as well as in a lesson.
3. **A quotation renders its words, who said them, the source's name, the date,
   and a link**, as one block; it is visibly distinct from body prose and from a
   plain Markdown blockquote on the same page.
4. **A quotation with a moment inside a recording renders that moment, and its
   link opens there** — checked against the reference case, a YouTube link with
   a timestamp — and its transcript link is present and separate.
5. **A quotation missing its date, its source, or any way of reaching it fails
   the build, naming the file.** A quotation whose source is print with no URL
   renders, with the printed locator visible in place of the link.
6. **A figure renders its caption as HTML text outside the drawing**, and its
   optional data source as one line, which carries a link when one is given. The
   caption is selectable and reflows; nothing the reader needs is inside the
   drawing.
7. **A figure with no caption fails the build**, naming the file.
8. **An unwrapped diagram renders exactly as it does today** — same placement,
   same width, no caption furniture — proved on a real lesson page.
9. **An evidence list renders its checked date in the form the style guide
   prescribes, and each entry its title, publisher, date, link and note**, with
   the note carrying a second link when one is written in it.
10. **An evidence entry with no date, or no link, fails the build**, naming the
    file — and so does an entry element outside its list, a list holding
    something that is not an entry, and a further-reading item with a kind that
    is not one of the four.
11. **Evidence and further reading are visibly different blocks**, and a
    further-reading item shows its kind. Read from the reference surface, both
    themes.
12. **Every link to another site in the corpus is marked as external and opens
    in a new tab**, with the relationship attributes that implies, and the mark
    is available to a reader not looking at the screen. Read from a built lesson
    page.
13. **Every internal link in the corpus resolves**, and the build says so by
    passing; **an internal link to a module or lesson that does not exist fails
    the build, naming the file and the line**. Shown by staging one, and
    reverted.
14. **A link to a lesson that exists but is not published fails the build**,
    naming the file and the line, with a message that says which of the two it
    is. Shown by staging, and reverted.
15. **Links inside a quotation, an evidence list and a further-reading list get
    the same treatment as links in prose** — same external mark, same new-tab
    behaviour, same refusal of an unresolvable internal target.
16. **The build reports which file and which line** for every refusal in
    criteria 5, 7, 10, 13 and 14.
17. **The reference surface carries a specimen of every element and every
    variant**: a quotation of one paragraph and of several, with a timestamp and
    without, with a transcript and without, with an organisation as its author,
    and with a print source; a figure with a data source and without; an
    evidence list including an entry whose note carries a second link; a
    further-reading list showing all four kinds; and both an external and an
    internal link in prose.
18. **No colour literal is introduced outside the token file** — the existing
    build guard is the check — and every line the reader relies on to see where
    a quotation, a figure or a list ends is the strong rule value, in **both**
    themes, at or above its 3:1 floor (ADR-0012). Ratios computed by the
    existing check, not by hand.
19. **At 375 px the page has no horizontal scrollbar** with any of these
    elements on it, and every one of them wraps inside the reading column.
20. **No client-side JavaScript is added by this slice.** Every element renders
    from the server, and the link treatment runs at build.
21. **The content directory is untouched.** After verification, the working tree
    under `content/` is byte-for-byte what it was before this slice began.
22. The fresh-context review reports no gap against these criteria and nothing
    outside this slice's scope touched — in particular no surviving content
    edit, no change to the contents panel, no new dependency, and no element
    beyond the six named here.

**Needs a human eye — not closable by an agent.** Two things:

- **Whether a `Cytat` reads as a quotation rather than as a callout**, and
  whether it is distinguishable at a glance from the blockquotes the lessons
  keep. Criteria 3, 18 and 19 pin what is measurable; the judgement is made by
  looking at a lesson page in rendered Polish, on both themes.
- **Whether the external-link mark is legible without being noisy** in a sources
  list of thirty entries, which is the density the corpus actually has.

## Decisions taken

Per AGENTS.md §4. One line each, naming what was rejected.

1. **Six registered names — four elements and two entry children.** Rejected:
   four elements whose entries are Markdown list items, which puts the required
   fields back into per-line convention, exactly where they are today.
2. **Entries are child elements, never a data property.** Rejected: an entries
   array written as a JSX expression — the build cannot read an expression
   attribute, so every refusal in this slice would become a runtime surprise on
   a public page instead of a build failure in front of its author.
3. **A quotation supplies no „…” marks; the author writes the words.** Rejected:
   the element wrapping its text in „…”, which is wrong across several
   paragraphs and collides with the marks a quoted passage already contains —
   the corpus has both.
4. **An author writes one machine-readable date; the element chooses the visible
   form.** Rejected: the author writing the visible form, which is the current
   arrangement and the reason one list mixes `dd.mm.yyyy`, `yyyy-mm-dd` and a
   month in words.
5. **A date may be given to the day, the month or the year, and renders at the
   precision given.** Rejected: requiring a full date, which makes an author
   invent a day for a source that shows only *sierpień 2026*.
6. **An author is a name, not a person**, so an organisation is written the same
   way. Rejected: separate fields for a person and a publisher on a quotation,
   which asks every author to classify a byline before quoting it.
7. **A print source is written as an explicit printed locator, in place of a
   link.** Rejected: allowing a missing link, which is the silent omission this
   slice removes; and rejected: refusing print outright, which would make the
   only citable sources the ones that happen to be online.
8. **A moment inside a recording is deep-linked for hosts the build knows how to
   address, and a host it does not know fails the build.** Rejected: rendering
   the moment as text beside a link that opens at the start — a promise to the
   reader that the page quietly breaks.
9. **A figure requires a caption and does not require a data source.** Rejected:
   both optional, which makes the element a wrapper that guarantees nothing; and
   rejected: both required, which makes a drawing of an idea invent a
   measurement.
10. **An evidence entry's note is inline content, not a block.** Rejected: a
    plain string attribute, which cannot carry the second link four entries in
    the corpus already need; and rejected: free block content, which is a second
    paragraph of lesson hiding inside a reference list.
11. **Further reading is its own element.** Rejected: an evidence list with a
    kind on each entry, which must either force a date onto a recommendation or
    excuse an evidence entry from carrying one.
12. **Four kinds, written as ASCII and rendered in Polish.** Rejected: a free
    string, which becomes six spellings of *artykuł* within a term.
13. **Neither list renders a heading.** Rejected: the element rendering *Źródła*
    itself, which would take the section out of the contents panel — the panel
    reads the lesson's own `##` headings, and this slice does not touch it.
14. **A link is classified by one derivation, used by the build check and by the
    rendering.** Rejected: the check knowing one definition of "external" and
    the rendering another.
15. **A link to an unpublished lesson fails the build.** Rejected: rendering it
    as plain text, which silently deletes a link the author wrote; and rejected:
    letting it through, which publishes a link to a not-found page.
16. **A root-relative link outside the course's own routes fails the build.**
    Rejected: checking only paths beginning with the course prefix, which lets a
    mistyped prefix through as a link to nothing.
17. **The strong rule value draws the edge of a block; the ordinary rule
    separates rows inside one.** Rejected: the ordinary rule on a block's
    boundary, which is ADR-0012's 1.47:1 doing the one job it was measured unfit
    for.
18. **A quotation is not given the exercise's frame or the code surface.**
    Rejected: reusing either — the first makes a quotation look like something
    to do, the second like something to copy.
19. **The elements are proved by permanent specimens; the link treatment is
    proved on the real corpus and its refusals are staged and reverted.**
    Rejected: proving the link treatment on a synthetic fixture, which
    demonstrates a parallel derivation rather than the one the site runs.
20. **No lesson is migrated by this slice.** Rejected: converting the six
    lessons' quotations, diagrams and source lists here, which is a content-lane
    change with its own commit prefix (Article IX).

Four more, added after the plan was written from this spec alone and reported
them as gaps — §2 of AGENTS.md asks for exactly that, and the plan's own
`## Gaps in the spec` section is the record of what it had to assume:

21. **An evidence entry's publisher and title are required, not only its date
    and link.** Rejected: making the acceptance criteria the whole contract,
    which would let an entry ship with no publisher and a link whose text is a
    raw URL.
22. **A further-reading item carries a title of its own, and refuses a date.**
    Rejected: an item whose link text is its URL, and rejected: tolerating a
    date on it, which would quietly re-merge the two lists this slice separated.
23. **A quotation's attribution takes the prose date form; a list entry takes
    `dd.mm.yyyy`; the checked date stays ISO.** Rejected: leaving the choice to
    each element as it is written, which is how the corpus's one list came to
    hold all three.
24. **The fixed Polish words the elements supply live in one place.** Rejected:
    a string beside each component, which makes Viktar's editorial pass over
    student-facing wording a search rather than an edit.

## Notes for the reviewer

- **The mistake this slice is most likely to make is a second definition of
  "external".** The build check and the rendered link have to agree exactly, or
  a link is validated as internal and rendered as external. Criterion 15 exists
  because the elements' own links are the place the two would drift apart first.
- **Criteria 12 and 15 look like the same fact and are not.** One is about links
  the author wrote as Markdown; the other about links the elements build out of
  attributes. An implementation that marks prose links and renders raw anchors
  inside a sources list passes 12 and fails 15.
- **Criterion 8 is what keeps this slice from being a content change.** Five
  diagrams render today; after this slice they must render identically, because
  wrapping them is not this slice's to do.
- **Criterion 21 is what keeps this slice inside its scope.** Everything the
  refusal criteria need is staged in content, and content is precisely what this
  slice may not change.
