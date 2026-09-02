# Content style — student-facing lessons

| | |
| --- | --- |
| Audience | The reader described in `docs/surveys/content-reader.md`: 4th-year *technik programista* students, 17–19, with two to three years of school programming and no industry experience. Read that file first; this one assumes it |
| Applies to | Module introductions, lessons and lesson summaries under `content/moduly/` |
| Language | Student-facing prose in Polish; this guide in English (Article III); identifiers and slugs in ASCII English |
| Basis | Reader audit of modules 00 and 01, 2026-08-29 (`docs/content-research/content-style-audit.md`), the flow rewrite that followed it the same day, and the reader revision of 2026-08-30 — the reader test, the anchor, the opening recipe, the name budget, the hands-on shape and sources at the point of use |
| Loaded by | `.claude/skills/write-lesson` and `.claude/skills/revise-lesson`, in full, after `docs/surveys/content-reader.md` and before any content is drafted, revised or checked |
| Checked by | `npm run check:content` — reports the smells in “Budgets”, cohesion and comprehension alike; never blocks the build |
| Status | Working guide. Recalibrate through `docs/_prompts/analyze-course-writing-style.md` as the corpus grows |

This file owns the course's prose style. Research files own facts and sources.
`constitution.md` and `AGENTS.md` own repository rules. When they conflict,
this file loses.

## The voice in one paragraph

Write as a knowledgeable teacher speaking directly to an intelligent student
who is new to the topic. Be concrete, candid and calm. Explain causes, choices
and consequences rather than displaying expertise. Keep the second-person
singular (`ty`) and the anti-hype stance. Do not sound like a research report,
a product announcement, a motivational speech or a simplified textbook.

There is no reference lesson yet. Module 1 was written before this guide had
a reader in it; it is read and discussed in class, not rewritten. The first
Module 2 lesson written through `write-lesson` and read by Viktar becomes the
reference. Until then, when a rule below is unclear, the before-and-after
demonstrations at the end of this file are the model — and the passages the
audit named as already working: the „instrukcja oglądania” frame of 1d, the
question-first opening of 1f, the operational reading of advice in 1g.

## Who is reading, and the reader test

`docs/surveys/content-reader.md` says who the student is, what they have done with
their own hands, what they have not, what they believe on day one and what
they want. This guide does not repeat it. It applies one rule from it:

> At the opening of any lesson, the student knows exactly what the reader file
> says plus what the published lessons before it have taught. Nothing else.

The **reader test** is applied to every paragraph, in drafting and in
revision. Three questions:

1. What must the reader already know to understand this paragraph?
2. Is every item of that in the reader file or in an earlier lesson?
3. Does the paragraph assert something about the reader — their experience,
   their habits, what they have seen?

A *no* to the second question means the paragraph depends on knowledge the
course has not supplied. It moves after the passage that supplies it, or it is
rewritten so that it explains rather than alludes. „Ktoś, kto w 1990 roku znał
swój warsztat od podszewki, sześć lat później znów musiał się uczyć” fails
here: it needs the reader to know what a *warsztat* was in 1990 and what
replaced it in 1996. It cannot open a lesson; it can close the section that
has just explained Visual Basic and Delphi.

A *yes* to the third question means the claim is checked against the reader
file. „Całe twoje doświadczenie z oprogramowaniem to telefon i przeglądarka”
is not in the file — the file says two years of console programs, a website
and probably a form with a database — so the sentence goes, and with it the
rhetorical move it was making. A lesson may say what the reader *has* done,
in the file's words; it does not tell the reader who they are.

The test is not a plea for simplicity. A long, exact sentence about something
the reader can picture is fine. A short, elegant sentence that only an
experienced programmer can decode is the failure.

## What “storytelling” means here

Storytelling is truthful causal movement, not decoration:

> a concrete situation creates a problem → someone makes a choice → the choice
> changes what becomes easy or difficult → the consequence matters to the
> student.

A lesson tells a story when the student can say, at any point, which question
is open and why this paragraph is here. Prefer a decision or action the
student can picture before an abstract label: the explanation of Visual Basic
works because the student can imagine dragging a button onto a window before
reading the word RAD.

Never invent a student, a classroom event, a quotation, a dialogue or a
historical scene for colour. Do not add generic anecdotes. A clear sequence of
real causes and consequences is the material of a story — but it is not yet a
story for this reader. Causes and consequences that happened to programmers in
1996 are an *argument* to someone who has never lost a tool. What turns them
into something the student can follow is a thing in front of the reader that
the causes act on: the anchor.

## The anchor

Every lesson carries **one concrete thing** from its first section to its
last, and every abstraction in the lesson is attached to that thing in the
same section where the abstraction appears. The anchor is named in the brief
before drafting; a lesson whose brief cannot name one is not ready to draft.

- For a history or trends lesson the anchor is a small, specific program the
  student can picture doing: a window with one button and a counter, and what
  the programmer had to type to make it in 1984, drag in 1995, declare in
  2006, and ask for in 2025. Every era is measured against the same window.
- For a map lesson it is one small task carried through every layer: „zmień
  nazwę pola `Email` na `Adres` wszędzie, gdzie występuje” — what Tab does
  with it, what the chat does, what the agent does.
- For a hands-on lesson the anchor is the running example: the code the
  student has open, extended section by section, the way an introductory web
  course carries one small app through a whole part.
- For a procedure lesson it is the repository or the file the commands act on.

An anchor is not an analogy. It is the actual thing the lesson is about, at
the smallest size that still shows the mechanism. The best paragraph in the
old 1a — „Wyobraź sobie najprostsze okno z przyciskiem…” — is an anchor that
the lesson introduced and then abandoned; the rule is to keep it.

A real person's decision belongs in a lesson when the decision *is* the point
(Apple's 2010 clause is the mechanism, not colour). A name that appears to
lend authority or atmosphere, and is gone in a sentence, does not.

## Three lesson shapes

Most lessons are **narrative lessons**: one carrying question, sections as
stages of an argument, an ending that answers the opening. Everything below
applies to them in full.

Some lessons are **procedure lessons** — a Git command set, a demo script, an
installation. They are read while doing, so they must scan. Give them a
narrative frame and a scannable middle:

1. an opening that says what problem the procedure solves and what to notice
   while doing it — two or three paragraphs, never a definition;
2. the procedure: a heading per step, commands in code blocks, short prose
   between them saying what a command does and what the common mistake is;
3. one narrative section that turns the procedure into understanding — “Na co
   patrzeć” in the demo lesson is the model;
4. an ending that says what changed and what comes next.

Do not novelise a command list, and do not turn a narrative lesson into a list
of tips.

From Module 2 on, most lessons are **hands-on lessons**, and they are the
default shape for anything that has code in it. The pattern is the one an
introductory course like Full Stack Open uses for every part, and it is used
here because the student's attention is different once they have touched the
thing:

1. an opening that starts from what the student did last time and poses
   today's question — two or three paragraphs, never a definition;
2. the concept in two or three paragraphs, attached to the running example;
3. the running example itself: a code block with a filename the student
   creates or extends and runs, followed by what to notice in the output and
   the mistake most people make here;
4. a variation that shows the concept from a second side, in the same
   example;
5. the next concept, again attached to the example — as many rounds as the
   lesson needs, each a section;
6. an ending that says what changed in the example and in the student's
   understanding;
7. exercises that extend the same running example, numbered by the module.

A hands-on lesson still has one carrying question and one anchor — the
running example is the anchor — and its sections still make one move each.
What changes is that every section ends with something the student can run.

A **by-hand block or lesson** (the „Własną ręką” sections of Moduł 3; every
lesson of Moduł 5, course-structure v2.5) is a hands-on shape with the agent
switched off, and three things are different about it. The code the student
types is the anchor, so it is short, complete, and was built and run before
it was written down (`write-lesson` §5). The student's own program differs
from everyone else's, because an agent built it: the block therefore starts
with **reading** — what to search for in the agent's code and what shape to
expect — and names the line to find, never a line number. And it ends with
the same two things every time: a commit in the student's own words and a
line on the card saying how many minutes it took, because those minutes are
the first honest measure of what doing it yourself costs. The block states
its *tryb pracy* in one plain sentence; „bez agenta” is a fact about the
work, not a moral about the tool, and the prose does not editorialise about
AI in either direction.

## The brief

Every lesson has a brief in `docs/content-briefs/`, written in English before
a word of Polish, and approved or edited by Viktar before drafting starts. It
is the lesson's spec: the reader position (which lessons the reader has read,
what they can do), the carrying question, the anchor, the shape, one sentence
per section naming its move, the stories and terms the lesson owns, recalls or
must avoid, what the student can do at the end, the exercise plan, the claims
that will need a source, and the assumptions about the reader to verify. The
template is in `.claude/skills/write-lesson/brief-template.md`.

The brief is where „this opens from what the course said, not from what the
student did” is caught, at the cost of a paragraph rather than a lesson. A
lesson revised later is checked against its brief; a lesson that has none gets
one reconstructed first, and the reconstruction is usually the diagnosis.

## Build a reading journey

### A module

A module carries one argument. Its introduction tells the student, in this
order: where they are starting; what question the module will answer; why the
lessons appear in this order. One sentence per lesson is enough for the third
point — do not compress seven lessons into one sentence.

Each lesson must add something the previous lesson made possible. Recall an
earlier idea briefly, then develop it: “you already know X; now notice Y.” Do
not explain X again as if it were new.

Before drafting a full module, write its arc in one sentence per lesson. If
two lessons have the same job, combine or distinguish them before writing
prose.

### A lesson

Give each lesson one carrying question, tension or problem. The opening starts
from something the student knows, then shows what is missing. The ending
answers the opening and tells the student what changed in their understanding
or what they can now do.

The lesson title and headings should reveal the journey, not merely label
topics. “Co się naprawdę zmieniło” promises movement. A heading that names a
source rather than a stage — “Głos z drugiej strony”, “Trzeci głos”, “Uczciwy
głos praktyka” — tells the reader that the lesson is a catalogue of opinions.
A heading repeated across lessons — “Co z tego wynika dla ciebie” — stops
carrying meaning by its second appearance.

### A section

Each section makes one move in the lesson's argument: introduce a problem;
show evidence or an example; explain the mechanism; draw a consequence;
prepare the next question.

Its first sentence connects it to what came before. Its last sentence either
lands the point or creates the need for the next section. Lesson 1a does this
at every boundary:

> RAD uczynił budowę okna tanią, ale utrzymanie dużej aplikacji drogim. Kolejne
> narzędzia wizualne powtórzą ten sam układ korzyści i kosztów.

> Zanim jednak rynek rozstrzygnął, czy ten kompromis się opłaca, użytkownicy
> zaczęli wybierać coś wygodniejszego niż instalator: adres URL.

Use the cut-or-move test: if a section can move anywhere in the lesson without
changing the argument, its role or transition is unclear. Use the merge test
too: a section under about ninety words with no table, diagram or list is
usually a paragraph of its neighbour that was given a heading. Twelve H2
sections in two thousand words is a catalogue, whatever the headings say.

### A paragraph

One paragraph carries one main idea. Make the relationship between sentences
visible: cause, contrast, example, consequence or qualification. Do not stack a
new person, date, statistic, limitation and conclusion in one paragraph.

Vary sentence length. Short sentences give weight to a conclusion only when
the preceding prose has earned it. Longer sentences are welcome when their
logic remains easy to follow. Clarity is about connections, not a fixed word
count.

A one-sentence paragraph is a spotlight. One per section is a device; three in
a row is a list wearing a paragraph's clothes. The same holds for “To nie X.
To Y.” — once per lesson, at the turning point.

## One home for every story

The corpus draws on a small number of people, studies and numbers, and the
same ones are useful in several lessons. A student reading the module in order
notices every second telling.

- Every recurring story, quotation and number has **one home lesson**: the
  lesson where it does the most work. There it is told in full, with its
  source.
- Elsewhere it appears as a **recall**: one clause, a link to the home lesson
  on first recall, and a *new* consequence for the current lesson. A recall
  never re-tells the setup.
- An earlier lesson may **point forward** to a story's home in one sentence
  when it needs the fact now. It does not tell the story first.
- **No person narrates consecutive lessons.** When one interview supplies the
  evidence for a whole lesson (DHH in 1e), the neighbouring lessons use that
  person as a witness in one place each, not as a second narrator.

The current map is in the appendix. A new lesson that needs a story from the
map recalls it. A new story that will clearly be reused gets a home and a row
in the map, in the same change.

## Control cognitive load

### Names, dates and numbers

A detail earns its place when it changes the argument. Group dates into a
pattern instead of narrating every date separately.

A proper name — a person, a product, a company, a library — earns its place
when it is used in at least two sentences of the lesson or belongs to the
anchor. A name that gets one sentence is moved to *Czytaj dalej* or cut; the
sentence keeps its point without the name („jedna z pierwszych bibliotek
opakowujących API Windows” carries the argument as well as „OWL (1991)”, and
costs the reader nothing). Budget: fewer than three distinct new names per
hundred words of prose; a section that introduces more than five is a
catalogue whatever its heading says. The old 1a runs at 3,3 per hundred by
the checker's count — sixty-one distinct names in 1 850 words of prose, one
every thirty words — which is the density of a reference, not a lesson. After a statistic, explain
what it means before presenting another. Two numbers in one sentence is a
comparison; four is a table pretending to be prose.

When several numbers matter, give the reader a stable comparison: what was
measured; which two values should be compared; what conclusion is justified;
what the result does not prove.

Write a fraction as a word when the word is the point (“ufa jedna trzecia”)
and keep the exact figure where the reader might quote it (“33%”). Do not do
both for every number.

### Technical vocabulary

On first use, give an unfamiliar term the original term, a plain Polish
explanation, and one concrete example when the term is still abstract. Later,
use one consistent term. Do not alternate synonyms merely for variety. Names of
products and models are examples of a category, not the category itself.

A term is introduced once in the course, in the first lesson that needs it;
the appendix lists the current owners. A later lesson uses the term without
re-explaining it — if the reader may have forgotten, one clause of reminder is
enough. Do not use a term before its home lesson: say the thing in plain words
and let the term arrive where it is explained.

### Forward references

Use a future-module reference only when it gives the current passage a local
payoff. “Wrócimy do tego” cannot replace an explanation the student needs now.
State what is sufficient to understand today, then defer the implementation.
Refer forward by topic (“w module o specyfikacjach”) and link once the target
exists. More than three forward references in one lesson means the lesson is
postponing its own content.

## Use rhetoric deliberately

The direct formulations are worth preserving:

- “To nie zarzut — to punkt wyjścia.”
- “Wrażenie nie jest dowodem.”
- “Nie patrz na to, jak szybko powstaje kod.”

They work because they interrupt longer explanation at decisive moments. Bold
text, fragments, rhetorical questions and “To nie X. To Y.” compete when
several appear in one section, and the prose begins to sound manufactured.

Bold the term or conclusion a student should find when scanning: roughly one
bold span per hundred words of prose, and rarely more than one per paragraph.
Lesson 1a runs at about one per eighty; the lesson the audit found hardest to
read ran at one per thirty. If every paragraph ends in a bold sentence, none
of them is the thesis. Exercises may bold their first words; the sources
section bolds only the date.

Be firm about safety, evidence and responsibility. Be exploratory about
predictions and unsettled trade-offs. Do not confuse confidence of tone with
certainty of evidence.

### Quotations

A block quote earns its place when the exact wording matters: a definition
someone will be held to, a claim the lesson will test, a sentence the student
should recognise later. Otherwise paraphrase and link to the timestamp. Before
a quote, say what to notice; after it, say what it means for the argument. A
lesson built on quotations (1f) still needs the connective prose between them
— the quotes are evidence, not paragraphs.

### Sources at the point of use

A claim is checkable where it is made, not only in a list at the end.

- Every verbatim quotation carries its attribution *with* it: who, the source,
  the date, a link — and for a recording, the timestamp and a transcript link
  where one exists. Until slice 010 lands, the form is the blockquote with an
  attribution line, as 1f does it: „— Andrej Karpathy, [2 lutego 2025](…)”.
  From slice 010 on, the form is `<Cytat>`, and a quotation without a date or
  a link fails the build.
- Every number, price, date of an announcement or measured result — anything
  that could be wrong on a given day (ADR-0008) — has its link in the same
  paragraph or the same table cell. A table that promises „każda z linkiem”
  has the link in the cell, not in Źródła.
- `## Źródła` lists **evidence**: what the lesson's claims rest on, each entry
  with a date. It opens with `Stan na **yyyy-mm-dd**.` From slice 010 on it is
  `<Zrodla>`, and an entry without a date or a link fails the build.
- `## Czytaj dalej` lists **further reading**: where to go deeper on the
  lesson's main concepts — an article, a video, documentation — each with one
  line saying why it is worth the time. Evidence and further reading do not
  share a list. From slice 010 on it is `<CzytajDalej>`.
- A diagram has a caption in prose, outside the drawing. From slice 010 on it
  is wrapped in `<Rysunek>`; until then the caption is the paragraph after it.

### The teacher's first person

The teacher may say *ja* — “najlepszą odpowiedź, jaką znalazłem”, “każda data
ma link, żebyś mógł sprawdzić, że nie zmyślam” — when reporting an editorial
choice: what was looked for, why a source was chosen, what the teacher is
unsure about. It is part of the candid voice. It is never used to invent an
experience, a classroom moment or a student's opinion.

## Address the student

The student is `ty`. Both groups are mixed, so prefer constructions that do
not force a gender when the neutral phrasing costs nothing: “jeśli masz
włączoną ochronę adresu” rather than “jeśli włączyłeś”, “kiedy skończysz”
rather than “kiedy skończyłeś”, present tense and second-person future rather
than a past-tense form. Where the neutral phrasing would be visibly awkward,
the generic masculine stays. Do not write double endings
(“włączyłeś/włączyłaś”) in running prose. `npm run check:content` lists the
gendered forms it finds so each can be judged on its own.

## Explain abstractions concretely

Use this sequence when introducing a difficult idea:

1. **Situation:** what the student or programmer is trying to do.
2. **Friction:** what becomes difficult or fails.
3. **Concept:** the name for the mechanism or response.
4. **Trade-off:** what it makes cheaper and what it makes more expensive.
5. **Student consequence:** where the learner will encounter it.

Not every concept needs all five as separate paragraphs, but the reader should
be able to recover all five from the explanation.

## Balance prose and reference material

A lesson must work both when read continuously and when scanned during class.

- Prose carries the argument.
- Headings expose its stages.
- Tables compare stable dimensions; they do not replace explanation. When a
  table's last column carries the *why*, the prose after the table says it
  too, in the order the argument needs.
- Diagrams make a relationship easier to see. Before one, say what to look
  for; after it, say what the student should have seen.
- Lists collect parallel items. They do not hide a sequence that needs causal
  prose, and they do not stack numbers.
- Sources support claims and open doors for further reading; they are not
  part of the lesson's narrative climax.
- Exercises turn the main idea into an observable action.

Put the conceptually important section before long setup or installation
instructions whenever the task permits it. Reference material that annotates
a concept — a dates table, a list of model versions — comes *after* the
concept, not before it.

## Openings, endings and the summary

### Open a lesson

In two or three short paragraphs, in this order:

1. **Something the student has done with their own hands** — in the lab, at
   home, in the previous lesson's exercise — named concretely. A form with a
   button, a program that read a file, the prompt they typed on Tuesday. The
   reader file and the brief's reader position say what is available.
2. **What that experience cannot explain** — today's question or tension. A
   recall of the previous lesson belongs here, as one clause, if it sharpens
   the question. It never opens the lesson: „Poprzednia lekcja…” and „W lekcji
   X…” as first words are continuity for the author, not a hook for the
   student, and five of the seven Module 1 lessons opened that way.
3. **What the lesson will let them see or do**, in one or two sentences.

Do not begin with a catalogue of names, a person's credentials, a claim about
who the reader is, three paragraphs of framing about what the lesson is *not*
about, or a definition that has no visible problem. When a lesson turns on
someone's words, the question comes first and the person is introduced in one
clause when the words arrive.

### End a lesson

Return to the opening question. Prefer three to five consequences phrased as
actions or decisions: what to notice, check, choose, avoid or remember. Do not
merely summarize section headings, and do not give the ending a heading that
could close any lesson.

Exercises come in four kinds, in this order, and a lesson has at least the
first two:

1. **Recall** — from memory, before looking: the layers, the four cells, the
   three commands.
2. **A short action on the anchor** — two to ten minutes, with an observable
   result: run it, change one line, see what happens, write down what you saw.
3. **A build step** — extend the running example or produce a file that will
   be used again; in a hands-on lesson this is the exercise that carries the
   example into the next lesson.
4. **Research or reflection** — find a source, ask a person, keep a note for a
   week.

Exercises are written as `<Zadanie>` elements, one per exercise, with a blank
line inside the element before and after the body, and an optional `title`
(slice 009; the specimen on `/styleguide` shows both forms). The number is
derived from the module at build time and never written by hand. Module 1's
lists stay as they are until they are migrated in the content lane.

### The summary

The `summary` in the frontmatter is student-facing: it is what the lesson
list shows. One or two sentences that state the question or tension and what
the student will be able to do — not a list of the sections. Write it last,
from the finished lesson.

## Mechanics

- Quotation marks: „…” (U+201E and U+201D). Never the ASCII `"` in prose, and
  never „…" with a straight closing mark.
- Dashes: spaced em dash ( — ) for asides; en dash without spaces in ranges
  (1984–1991, 30–100 godzin).
- Dates: in prose, day, month in words, year (24 listopada 2025); in tables
  and in the sources list, `dd.mm.yyyy`. The sources section opens with
  `Stan na **yyyy-mm-dd**.`
- Numbers: decimal comma (1,4), percent without a space (19%), “punkty
  procentowe” written out.
- Link text names the thing (“w lekcji [Co model naprawdę potrafi](/moduly/…)”),
  never “tutaj”.
- Code, commands, file names and identifiers in backticks; UI labels in bold in
  their original language (**Keep my email addresses private**).
- Repository comments inside MDX (`{/* … */}`) are English and stay where they
  are.

## Budgets

`npm run check:content` reports these per lesson. They are smells, not rules:
exceed one on purpose and say why in the commit message. A procedure lesson
will trip the one-sentence-paragraph count by design.

| Smell | Reported when |
| --- | --- |
| Bold spans per 100 words of prose (code, exercises and sources excluded) | above 1.5 |
| One-sentence paragraphs (at most 25 words) | above 3 in a lesson |
| “To nie X. To Y.” | above 1 |
| Block quotes | above 4 |
| Forward references (*wrócimy*, *w module o…*, *w dalszej części kursu*, *w osobnej lekcji*) | above 3 |
| H2 sections under 90 words with no table, diagram, list or code block | any |
| H2 headings repeated in another lesson of the module (apart from Ćwiczenia and Źródła) | any |
| Straight `"` or a „…" pair in prose | any |
| Gendered second-person past-tense forms | listed, not counted |
| Recurring stories mentioned outside their home lesson | listed, not counted |
| Distinct capitalised names per 100 words of prose | above 3 |
| Names that appear in one sentence of the lesson only | listed, not counted |
| A phrase asserting the reader's experience (*twoje doświadczenie*, *nigdy nie widziałeś*, *na pewno znasz*…) | any |
| An opening paragraph whose first words recall the previous lesson | any |
| A block quote without an attribution line carrying a date and a link | any |
| A section with a percentage and no link anywhere in it | listed, not counted |

The first six rows are cohesion; the last six are comprehension. The revision
of 2026-08-29 optimised the first six and left the prose exactly as hard for
this reader as before — which is why the second six exist.

## Revision order

Revise the reader before the structure, and the structure before sentences:

1. Write the reader position: which lessons this reader has read, what they
   can do, from `docs/surveys/content-reader.md`. Read the brief, or reconstruct one.
2. Write the lesson's carrying question in one sentence.
3. Name the anchor. If the lesson has none, that is the first finding.
4. Write one sentence describing the job of each section.
5. Run the reader test paragraph by paragraph: what each assumes, whether the
   course has supplied it, whether it makes a claim about the reader.
6. Remove, combine or move sections that do not advance the sequence; attach
   every abstraction to the anchor in its own section.
7. Give every recurring story one home; reduce its other appearances to
   recalls.
8. Add bridges where the reason for the next section is invisible.
9. Run a cognitive-load pass for names, dates, numbers and new terms; apply
   the name budget.
10. Put every quotation's attribution and every number's link where the claim
    is made; split Źródła from Czytaj dalej.
11. Revise paragraphs so each carries one idea; cut emphasis back to the
    turning points.
12. Read continuously for rhythm; only then edit individual sentences.
13. Run `npm run check:content` and judge each smell.
14. Check facts, links and visible dates separately from prose style.

## Before and after

Five demonstrations from the audit. Each keeps every fact and changes only the
connections. They are also what the corpus now does — compare with the lessons.

### 1. Three spotlights in a row → one earned emphasis

*Co model naprawdę potrafi*, the METR result. Before:

> Wynik: z AI byli **o 19% wolniejsi**.
>
> Po wszystkim zapytano ich, jak im poszło. Odpowiedzieli, że AI przyspieszyło
> ich **o 20%**.
>
> Trzydzieści dziewięć punktów procentowych różnicy między tym, co się stało,
> a tym, co ludzie czuli, że się stało. **To jest najważniejsza liczba w tej
> lekcji** — nie te 19%. Bo mówi ona coś, czego nie da się obejść lepszym
> narzędziem: **własne poczucie, że praca idzie szybciej, nie jest dowodem, że
> idzie szybciej.**

Three one-sentence paragraphs and four bold spans: the reader receives three
punches and has to reconstruct the relation between them alone. After:

> Wynik: z narzędziami AI byli o 19% wolniejsi. Zapytani po wszystkim, jak im
> poszło, odpowiedzieli, że AI przyspieszyło ich o 20%.
>
> Między tym, co się stało, a tym, co ludzie czuli, jest więc trzydzieści
> dziewięć punktów procentowych — i to ta różnica, nie samo 19%, jest
> najważniejszą liczbą w tej lekcji. Mówi bowiem o czymś, czego nie naprawi
> lepsze narzędzie: **własne poczucie, że praca idzie szybciej, nie jest
> dowodem, że idzie szybciej.**

The relation is now stated (*więc*, *bowiem*), the drama survives in the first
short paragraph, and the single bold span marks the actual thesis. Rule: “A
paragraph”, “Use rhetoric deliberately”.

### 2. A number stack → numbers in argument order

The Stack Overflow survey in the same lesson. Before:

> - **84%** używa narzędzi AI albo planuje; wśród zawodowców **51%** używa ich
>   codziennie,
> - ale poprawności ich odpowiedzi **ufa 33%**, a **46% nie ufa**,
> - najczęstsza frustracja, wskazana przez **66%**: odpowiedzi „prawie dobre,
>   ale nie do końca",
> - agentów — czyli warstwy 4 — używa codziennie **14%**, a 38% nie zamierza.

Seven numbers in four bullets, each bolded, in no argumentative order. After:

> Ankieta nie mierzy wydajności, mierzy nastroje — i nastroje są rozdwojone.
> Prawie wszyscy używają narzędzi AI albo zamierzają (84%), a wśród zawodowców
> co drugi używa ich codziennie. Zaufanie idzie jednak w drugą stronę:
> poprawności odpowiedzi ufa jedna trzecia (33%), a niemal połowa (46%) nie
> ufa. Najczęstsza skarga, wskazana przez dwie trzecie (66%), brzmi „prawie
> dobrze, ale nie do końca”. Agentów, czyli warstwy 4, używa codziennie 14%, a
> 38% nie zamierza ich używać wcale.

The same seven numbers, ordered as an argument — use, then trust, then the
complaint, then agents — with the fractions named. Rule: “Names, dates and
numbers”.

### 3. A name-first opening → a question-first opening

*Vibe coding kontra inżynieria*. Before:

> W lutym 2025 roku Andrej Karpathy — współzałożyciel OpenAI i były szef AI w
> Tesli — wrzucił na Twittera notatkę, która nazwała coś, co wszyscy już
> robili:

The lesson opens with a stranger's credentials; the student has no question
yet. After:

> Na pokazie zgody były wyłączone i nikt nie czytał diffów. Kod powstawał,
> aplikacje się uruchamiały — i przez kilkanaście minut nikt na sali nie
> programował. Czy to było w porządku?
>
> Ta lekcja jest o tym, kiedy wolno nie czytać kodu, a kiedy nie wolno — i o
> tym, że ta granica nie biegnie tam, gdzie zwykle się ją stawia. Słowo
> na to, co działo się na pokazie, istnieje od lutego 2025 roku. Nadał je
> Andrej Karpathy, współzałożyciel OpenAI i były szef AI w Tesli, w notatce
> opublikowanej na X, dawnym Twitterze — notatce, która nazwała coś, co
> wszyscy już robili:

The question comes from the demo the student has just seen; Karpathy is
introduced in one clause when his words arrive. Rule: “Open a lesson”.

### 4. A second telling → a recall with a pointer

The Basecamp story of February 2026 was told in full in *Nowy warsztat
programisty* and again, nearly verbatim, in *Vibe coding kontra inżynieria*,
where it does its real work as the dark end of the axis. Before, in 1e:

> - **Duży, stary kod nadal wymaga programisty.** W lutym 2026 w 37signals
>   pozwolono projektantom „wibrować" pull requesty do Basecampa — dużej,
>   dojrzałej aplikacji. Razem, jego słowami, **zniszczyli architekturę
>   systemu**, i ludzie musieli to sprzątać ręcznie. To ta sama komórka
>   macierzy z lekcji o danych: stary projekt, złożone zadanie. Na osobistym
>   narzędziu, które budujesz od zera, jest inaczej — i o tym jest ćwiczenie 5
>   z pokazu.

After, in 1e — the fact this lesson needs, and a pointer:

> - **Duży, stary kod nadal wymaga programisty.** Kiedy w lutym 2026
>   projektanci w 37signals zaczęli wysyłać agentowe pull requesty do
>   Basecampa — dojrzałej aplikacji, z której korzystają firmy — uszkodzili
>   jej architekturę. To ta sama komórka macierzy z lekcji o danych: stary
>   projekt, złożone zadanie. Tę historię rozbierzemy w następnej lekcji, bo
>   wyznacza granicę, o którą tam chodzi.

1f keeps the full telling: the black-box editor on one side, Basecamp on the
other, and the criterion they yield. Rule: “One home for every story”.

### 5. A source heading → a stage heading

| Before | After | Why |
| --- | --- | --- |
| Głos z drugiej strony | Dlaczego ta lekcja jest zbudowana z liczb | the section's job is to justify the method, not to add a voice |
| Co z tego wynika dla ciebie (1c) | Trzy zależności i jedna zasada | names the stage; cannot be reused by another lesson |
| Co z tego wynika dla ciebie (1e) | Co zostaje człowiekowi | answers the lesson's own question |
| Trzeci głos, z sierpnia 2026 | Ta sama granica, półtora roku później | the move is confirmation, not a third opinion |
| Uczciwy głos praktyka | merged into *Zasada na ten kurs* | the section was the setup for the rule |

Rule: “A lesson”.

## Publication checklist

- [ ] Does the opening start from something the student has done, not from what the previous lesson said?
- [ ] Can the student state the lesson's question after the opening?
- [ ] Is there one anchor, named in the brief, and is every abstraction attached to it in its own section?
- [ ] Does any paragraph depend on knowledge that neither the reader file nor an earlier lesson has supplied?
- [ ] Does any sentence tell the reader who they are?
- [ ] Is every proper name used in at least two sentences, or part of the anchor?
- [ ] Does every quotation carry its author, date and link where it appears, and every checkable number its link?
- [ ] Is the lesson's shape right — narrative, hands-on, or procedure with a narrative frame?
- [ ] Does each section clearly follow from the previous one?
- [ ] Does every paragraph have one main idea?
- [ ] Are causal and contrasting relationships stated rather than implied?
- [ ] Does every unfamiliar term receive enough explanation on first use, in its home lesson?
- [ ] Does every name, date, number and quotation move the argument?
- [ ] Is each important statistic interpreted before the next one appears?
- [ ] Does every recurring story appear in full only in its home lesson, and elsewhere as a one-clause recall?
- [ ] Are concrete situations used before difficult abstractions?
- [ ] Are rhetorical emphasis and bold text reserved for real turning points?
- [ ] Can the prose be read smoothly without relying on headings?
- [ ] Do tables, diagrams and lists support rather than replace the argument?
- [ ] Does the ending answer the opening, under a heading of its own?
- [ ] Does the summary state the question, not the table of contents?
- [ ] Does at least one exercise test the lesson's central idea directly?
- [ ] Has `npm run check:content` run, and is every remaining smell deliberate?
- [ ] Is every story factual and every claim sourced under repository rules?

## Appendix — where recurring stories and terms live

Mirrored, as patterns, in `scripts/check-content-style.mjs`; update both when
a row changes. Lesson letters follow the `order` in the frontmatter.

**Letters shifted on 2026-08-30.** The lesson *Teraz ty: twój pierwszy
agent* (`teraz-ty-pierwszy-agent`) was inserted at `order: 5`; the former 1e/1f/1g became 1f/1g/1h. The
audit of 2026-08-29 predates both shifts and keeps the original letters, and
so does the body of this guide (there 1d is the demo, 1e DHH's day, 1f vibe
coding, 1g *jak nie wypaść*).

**Letters shifted again on 2026-09-02** (course-structure v2.5): *Teraz ty*
moved to Moduł 2 as **2a** (the former 2a–2d are 2b–2e); the demo
*Na żywo* moved to the end of Moduł 1 as **1g**; the former 1f/1g/1h are
now 1d/1e/1f. The tables below use the 2026-09-02 letters.

**1a is outside the module.** `czterdziesci-lat-zmian.mdx` was moved to
`content/interesting-to-read/` on 2026-08-30 and is not part of the content
pipeline. Its rows stay because the Module 1 lessons still recall its stories,
and the checker reports every such recall as a mention outside the home — read
those reports as „points at a lesson the student cannot open” until the module
introduction and 1b's opening stop relying on it.

### Stories, quotations and numbers

| Story / number | Home | Elsewhere |
| --- | --- | --- |
| The forty-year promise of “programming by talking” (4GL, Visual Basic, iPhone web apps) | 1a | 1b opens by recalling it in one sentence |
| The constants since 1984 (event loop, one UI thread, five seconds, state outside controls, installation) | 1a | Moduł 5 (Pod maską), when it exists — 5a names them, 5d–5g build them |
| The causes table; Visual Basic 6 and Delphi; Airbnb and Shopify | 1a | — |
| The five layers and the dated timeline (Copilot 21.06.2022 → Fable 5 09.06.2026); sub-agents in spring 2026 | 1b | later lessons refer to layers by number |
| “Jednostka pracy” (linijka → zadanie) | 1b | 1c, 2a, 1d as a term |
| METR 2025 (19% / 20% / 39 pp) and its 2026 correction (40 pp; 3× vs 1,4–2×) | 1c | 2a recalls the gap without its numbers; 1f, one clause |
| The Stanford matrix (+30–40% … 0–10%) | 1c | 1g, 1d, 1e as “komórka macierzy”, one clause, link on first recall |
| Microsoft: junior +40%, senior +7% | 1c | — |
| Anthropic RCT of 29.01.2026 (67% vs 50%; debugging; two ways of using the assistant) | 1c | later modules, when “bez AI” segments are introduced |
| Osmani's 70% | 1c | 1g, in the post-demo questions |
| Anthropic 2026 report: 60% / 0–20% / 27% | 1c | 1b quotes a different sentence of the same report |
| Stack Overflow 2025 (84 / 51 / 33 / 46 / 66 / 14 / 38) | 1c | 1d, one clause and at most one figure |
| “Środek stawki” and “front” | 1c | 1d, one clause |
| “30–100 godzin” | 1c | 1f, one clause |
| Torvalds, “90% marketing” | 1c | 1f, one clause |
| The demo prompt, the three tools and models, the loop diagram, the comparison table; “Nie patrz na to, jak szybko powstaje kod” | 1g | 2a (the loop, one clause), 1d, 1e, 1f by link |
| DHH: the three moments; 24.11.2025 as the dividing line; the harness (term and diagram); “seven updates a day”; 16 threads, terminal, Linux; the Rust port and 550 USD; “opcjonalny w części, która wytwarza kod”; mechanical coding vs building | 1d | 1b: one sentence in layer 4, pointing forward, without the word *harness*; 1f: “seven times a day”, one clause |
| Basecamp, February 2026; the black-box C++ editor; “kto poniesie koszt” | 1e | 1d: one sentence in “Uczciwe granice”, pointing forward |
| Karpathy's definition and its last sentence; Willison's two definitions and the twelve practices; Kent Beck's 90/10; Ronacher's two points | 1e | 1f lists Willison and Ronacher as sources to follow |
| “Dogoni front w dwa tygodnie”; “nie próbuj niczego przewidywać” | 1f | 1e keeps its one Beck-anchored sentence about no ten-year head start; 1d none |
| The six questions, the three questions, the four rankings, IEEE Spectrum's 2025 note | 1f | — |
| Singh (AWS), „it's gone” — prototypes whose prompts nobody can recover two months later | 4a | 4d, one clause (the 250 000 developers of Kiro's preview) |
| Larbi et al. 2025 (Pass@1 −20–40%; runnable-but-wrong 24 → 54 / 65 / 89) and the stated limit: no controlled study of the *method* on real applications exists | 4a | 4d recalls the limit in one sentence, in the Böckeler section |
| Brooks 1987, „deciding precisely what to build” | 4a | — |
| Nygard 2011 — the ADR (context, decision, status, consequences); „large documents are never kept up to date” | 4b | 5b, when the students write their first real ADR (stack ratification) |
| Spec Kit's nine-article constitution and its „Constitution Check” gate | 4b | 4c (the `[NEEDS CLARIFICATION]` marker as `[DO USTALENIA]`), 4d (the mapping table) |
| North 2006 (Given/When/Then), Mavin's EARS 2009 (Rolls-Royce), OpenSpec's SHALL + scenario — three notations, one sentence shape | 4c | 4d, one clause („trzy notacje z poprzedniej lekcji”) |
| Anthropic's size rule („if you could describe the diff in one sentence, skip the plan”) and the disagreement about file names in a spec | 4c | 4d (the answer to Böckeler), 4e (evidence, fresh-context review, the reviewer warning) |
| The 2025 SDD timeline (Kiro 14.07 → Spec Kit 02.09 → OpenSpec 06.09 → Tessl 23.09 → Kiro GA 17.11 → Conductor 17.12) and the your-file ↔ tool mapping table | 4d | — |
| Böckeler's three levels and her critique („I'd rather review code than all these markdown files”; „a sledgehammer to crack a nut”) | 4d | — |
| Cursor Plan Mode / Antigravity Implementation Plan as the plan-and-tasks half of the loop | 4d | 4e uses the feature without naming the products |
| „Ktoś prawdziwy ma tego używać — i ty się liczysz” | 4f | Moduł 9 (the project; v2.5 numbering), when the project is chosen |

### Terms

| Term | Home |
| --- | --- |
| Git, repozytorium, commit, gałąź (branch), pull request, `.gitignore`, `clone`, `pull`, `push` | 0c |
| pętla zdarzeń, framework, RAD, XAML / język znaczników, wiązanie danych, MVVM, deklaratywnie, SDK, sklep jako bramka | 1a |
| podpowiedzi kodu, autouzupełnianie, IDE, czat w IDE, next edit, agent, pętla agenta, orkiestracja, podagent, MCP, jednostka pracy, refaktoryzacja | 1b |
| randomizowane badanie z grupą kontrolną, open source, junior i senior, boilerplate, debugowanie, CRUD, mediana, punkt procentowy | 1c |
| prompt, diff, build, tokeny, niedeterministyczny, zgody / tryb zatwierdzania, `DECISIONS.md` | 1g |
| harness, przegląd kodu przez agenta, ocena różnicowa, „programowanie po angielsku” | 1d |
| vibe coding, vibe engineering, AI-assisted, CI, lintowanie, formatowanie, środowisko podglądowe | 1e |
| benchmark, ranking, klucz API, pay-as-you-go, notatki o wydaniach | 1f |
| okno kontekstu, tokenizacja / tokenizer, bezstanowość modelu, wątek (sesja), zapytanie do modelu, limit odpowiedzi, kompaktowanie wątku | 3a |
| format odpowiedzi, zero-shot / one-shot / few-shot, łańcuch myśli (chain-of-thought), meta-prompt, kodowanie pliku | 3b |
| plik reguł (`AGENTS.md`), kontekst projektu, indeksowanie, RAG, świeża sesja | 3c |
| halucynacja, dziennik weryfikacji, `Rozbierz to`, „biegłość to nie poprawność” | 3d |
| first contact, by hand, with `List<T>` (3a), `try`/`catch` (3b), an event handler and `sender`/`e` (3c) — the „Własną ręką” blocks; the *home* of each construct is Moduł 5, which explains what these blocks only use | 3a–3c |
| specyfikacja (the term and its definition), „Do ustalenia”, the checkable sentence „Kiedy …, to …” (not yet named), opis spisany po fakcie | 4a |
| konstytucja projektu, zapis decyzji / ADR (kontekst, decyzja, odrzucone, skutki), „trzy rodzaje zdań o projekcie” (jak pisać kod / co robi funkcja / co jest zawsze prawdą), `decyzje/NNNN-…` | 4b |
| kryterium akceptacji, pętla specyfikacja → plan → zadania → kod → sprawdzenie, plan, lista zadań, „gotowe, gdy”, wyciek do planu, `[DO USTALENIA]`, świeży kontekst jako test specyfikacji, `specs/NNN-…/`, EARS, Given/When/Then | 4c |
| spec-driven development / SDD, spec-first / spec-anchored / spec-as-source, Plan Mode, Implementation Plan, „jedna pętla, pięć opakowań” | 4d |
| „specyfikację zmienia się przed kodem”, dowód w dzienniku (polecenie i wynik, nie zdanie), przegląd w świeżym kontekście (luki w kryteriach, nie styl), wariant konsolowy jako dowód, że specyfikacja nie mówi *jak* | 4e |
| pomysł jako specyfikacja w miniaturze (cztery zdania: co robi, kto otworzy, po czym poznam, czego nie robi), „zebrane, nie wybrane” | 4f |

**Moduł 4's rows were added on 2026-09-02** from drafts that are still `publish: false`; if a lesson changes before publication, its rows change with it. `scripts/check-content-style.mjs` was not touched: its story patterns are for stories re-told across lessons, and no Moduł 4 story is told outside its home.

**Moduł 2's rows are missing.** The Warsztat lessons (2b–2e; 2a is „Teraz ty”) own at least
*stack*, *szablon projektu*, *diff* (working level), `restore`, `revert`,
*gałąź jako poligon*, *panel kontroli wersji* — and none of them is recorded
here yet. Added when that module is next revised; until then a Moduł 3 lesson
that needs one of those terms recalls it by link rather than re-explaining.
