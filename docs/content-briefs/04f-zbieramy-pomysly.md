# Brief — 04f · Zbieramy pomysły: co zbudujemy

| | |
| --- | --- |
| Lesson | `content/moduly/04-specyfikacja/zbieramy-pomysly.mdx` · `order: 6` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** (see `04-index.md`) |
| Mode | autonomous (unapproved) |
| Research | `course-structure-v1.md` 4e row and Moduł 8 row („someone real has to use it, and the student counts as someone”); `course-structure-v2.md` Moduł 4 („ideas captured, not committed”); `research-06` §5.9; `docs/content-reader.md` („Not done: had a user who was not themselves”; „Want: to build something that is theirs”) |
| Drafted | 2026-09-02 |

## Reader position

Has read 0a–0c, 1b–1h, 2a–2d, 3a–4e. Has: four repositories, one of them built from a
spec with criteria checked and evidence recorded; knows what a spec is and can write one
at notatnik size. Wants (reader file, block F/J, TO CONFIRM): to build something that is
theirs, probably on a phone first. Has never: had a user who was not themselves; received a
complaint about their program; chosen a project idea that had to survive three months.

## Carrying question

What program is worth building — and how do you write an idea down so that in three
months you can judge it instead of just remembering it fondly?

## Anchor

**`pomysly.md`** — one file, in a small new repository or in the student's course notes
repository, with three ideas, each written as a spec in miniature: four sentences (what it
does; who uses it — a named kind of person, not „everyone”; how you would know it works;
what it does not do). The bar the file is measured against: **someone real would use it,
and you count as someone.**

## Shape

Hands-on, short: an opening, two concept sections, the writing, a peer round, an ending.
No new build.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | the notatnik-v2 has exactly one user, and it is you; that was enough for the module — is it enough for a program you would build for three months? → question | — |
| 1 | Ktoś prawdziwy | the bar and why: the reader has never had a user who was not themselves, so the lesson builds one — a user is the person whose complaint you would have to answer; a program with zero such people is an exercise, and there is nothing wrong with an exercise except that you already have four; you count as a user if you would actually open the program next month | the second sentence of each idea: „kto go otworzy za miesiąc, w zwykły wtorek” |
| 2 | Pomysł zapisany jak specyfikacja | the four sentences (what; who; how you would know; what it never does), applied to a deliberately small example; why „what it never does” is the sentence that keeps an idea buildable; what „fits in a semester” looks like measured against the notatnik (a spec of one page, not five) | one idea written in full in the lesson |
| 3 | Zebrane, nie wybrane | the rule from the course structure: ideas are captured today and the choice is confirmed in the project module, when you will know things you do not know yet (how a window is really built, what a test is, whether the training stack stays); why choosing now would be choosing blind; what to do with an idea you fall in love with (write a fifth sentence: what you would have to learn) | `pomysly.md`, three ideas |
| 4 | Runda: cudze pomysły | the peer round: read a classmate's three ideas; under each write one question a user would ask; mark the one you would open yourself — that mark is data, not a verdict | a classmate's file |
| 5 | Trzy pomysły i jedna miara | ending: the module closes — you can write down what a program should do before it exists, and now you have done it for something you want; what to notice until the project module (who around you does the same boring thing every week) | — |

## Owns · recalls · avoids

- **Owns**: the bar („ktoś prawdziwy ma tego używać — i ty się liczysz”); the idea as a
  spec in miniature (four sentences); „zebrane, nie wybrane”.
- **Recalls**: 4c's spec sections (one clause); 4e's one user (one clause); the reader
  file's „want” only as it is stated there — the lesson does not tell the reader what they
  want.
- **Avoids**: naming Moduł 5–8 by number or content beyond one forward pointer („w module
  o projekcie”); *MVP*, *startup*, *produkt* as terms; any market or app-store claim (Moduł 7
  and 9 own distribution); any invented example of a classmate's idea — the lesson's
  worked example is a deliberately small, domestic one and says nothing about
  any real person, the teacher included.

## Exercises

1. Recall — the four sentences of an idea; the bar, in one sentence.
2. Action on the anchor — write three ideas in `pomysly.md`, four sentences each, in
   twenty minutes (observable result: the file, with the „who” sentence naming a kind of
   person, never „każdy”).
3. Build step — commit and push `pomysly.md`; the file is reopened in the project module.
4. Research — ask one person outside the class what small task they repeat every week and
   would gladly hand to a program; write it down as a fourth idea, with their words in the
   „who” sentence.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| (none — the lesson is concept and activity; ADR-0008 requires no citation) | — | — | — |

## Reader assumptions to verify

- Block J of the questionnaire (what students want to build; phone first?) — the lesson
  does not assume an answer, but Viktar may want to seed the peer round with the aggregate
  once it exists.
- That a small repository for course notes exists per student, or that `pomysly.md` may
  live in `notatnik-v2`'s `docs/` (Viktar; the lesson offers both).

## Decisions

- **A separate short lesson, not a section of 4e** — see `04-index.md`, Decision 1.
- **The idea format is four sentences, not a full spec** — rejected: writing a spec per
  idea. Three specs for programs that will not be built is the bureaucracy the module
  argues against; four sentences is the size at which an idea can be judged in three
  months.
- **Ideas are not ranked or voted on in class** — rejected: a class vote. The choice is the
  project module's (course structure), and a vote in week 10 would commit students to what
  they know least about.
- **No `## Źródła`** — there is no evidence claim; `## Czytaj dalej` gives one reading on
  building for yourself first, or none if no source fits the reader (decided at drafting:
  one short reading).

## Open questions for Viktar (≤ 3)

1. None beyond the module's three.

## Deviations from the approved arc

- Drafted 2026-09-02; revised the same day after the fresh-context review.
- No first-person example: the worked idea is a small domestic one that presupposes no
  second program and says nothing about any real person (the earlier draft implied a
  fact about the teacher's household; removed).
- Every phrase implying the timetable („w drugiej połowie roku”, „w semestr”, „do końca
  roku”, „w listopadzie”) replaced by course-relative wording (Article V).
- „Stan nie mieszka w kontrolkach” removed — the term's home is outside the module
  pipeline; the idea is said in plain words.
- The size measure is „jedna strona, jak notatnik”, as the brief said.
- The peer-round section gained one sentence (a section under ninety words is a
  smell); *Czytaj dalej* has one reading — the *Getting Real* chapter „What's Your
  Problem?” (2006), verified to exist.
