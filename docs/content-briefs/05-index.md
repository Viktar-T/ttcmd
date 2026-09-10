# Brief — Moduł 5 · Twoja aplikacja (module introduction)

| | |
| --- | --- |
| Lesson | `content/moduly/05-twoja-aplikacja/index.mdx` |
| Written | 2026-09-10, by write-lesson · approved: **not approved — autonomous run** |
| Mode | autonomous (unapproved). Viktar asked for the whole module in one run („zbadaj i napisz w całości”), so brief and draft are in the same session and no brief in this module was approved before drafting |
| Research | `docs/content-research/course-structure-v2.md` v2.9, the Moduł 5 section and the v2.9 changelog; `docs/surveys/content-reader.md` (2026-09-02 counts); `docs/surveys/ankieta-start-2026-09-aggregate.md` via the reader file; `research-06` §2.4, §4.3, §4.5 for the loop's evidence, already spent in Moduł 4 |
| Drafted | 2026-09-10 |
| Supersedes | the previous `05-index.md`, which briefed „Pod maską”. That file was copied to `06-index.md` in the same change; the eight `05a–05h` briefs were copied to `06a–06h`. **The nine originals still sit in this folder and must be deleted by hand** — this session has no delete on the device |

## The module's one argument

Four repositories, and not one of them was your idea. The method is now the
thing you own; the object is not. This module hands over the object: you choose
what to build, you cut it to a size that fits, and you run the loop you already
know on something nobody assigned. What changes is not the method — it is that
nobody can tell you whether the result is right, because nobody else specified
it.

## Where the student is starting

Has read 0a–0c, 1b–1f, 2a–2e, 3a–3d, 4a–4e. Has four repositories: three from
Moduł 3's build weeks and `notatnik-v2`, built from a specification whose seven
criteria were checked with evidence in `dziennik.md` and reviewed in a fresh
context. Can: write a specification of one page, a constitution of six to eight
lines, a decision record, a plan from a fresh session with two files attached, a
task list with „gotowe, gdy”, one commit per task. Has just written three ideas
as four sentences each in `pomysly.md`, and marked one of a classmate's.

Has never (reader file, „Not done”): had a user who was not themselves (8 of
12); judged whether an idea fits the time available — the modal largest program
is about a hundred lines and **12 of 12 have no project of their own**; received
a complaint about a program; installed a program on somebody else's machine.

## The question the module answers

**Co potrafisz zbudować, kiedy nikt nie mówi ci, co zbudować?** — and its
practical half: how do you keep an idea small enough to finish, when you have
never finished one?

## Why the lessons are in this order

| | Lesson | The move | h |
| --- | --- | --- | --- |
| 5a | Trzy pomysły, jeden wybór | the object changes hands: three ideas become one, in writing, with the other two kept as the escape hatch. A short menu of ready-made ideas exists for whoever cannot land one | 2 |
| 5b | Ile to jest „małe” | the gate. Size is measured against `notatnik-v2`, not defined; three ways an idea is too big and the cut for each. Nobody reaches 5c with an uncut idea | 2 |
| 5c | Od pomysłu do specyfikacji | the loop starts on something nobody has built: a repository whose first commit is a constitution and a specification, no code. Reviewed by a classmate against the criteria, never against the idea | 4 |
| 5d | Plan i lista zadań | the plan from a fresh session; how big „small enough” is, answered against their own specification; the order that saves the week — the riskiest task first | 2 |
| 5e | Budowa: tydzień pierwszy | the loop at speed, on code nobody reviewed for you. The three things that go wrong, met on their own application; the mid-week cut; what to do when a task has been stuck for an hour | 6 |
| 5f | Budowa: tydzień drugi | the second half of the criteria; the specification changes before the code; the two capabilities every one of the applications must have; the first *Rozbierz to* on their own code | 4 |
| 5g | Pierwszy użytkownik i pierwsze zgłoszenie | a classmate installs it, uses it, and writes one report. The owner reproduces it and decides in writing: *naprawiam · nie naprawiam · to nie błąd, to brak w specyfikacji* | 2 |

The order is one long narrowing: an idea (5a) → a size (5b) → a sentence that
can be checked (5c) → a step that can be committed (5d) → two weeks of steps
(5e–5f) → a person who is not you (5g). Every stage is cheaper to fail than the
one after it, which is why the gate is at 5b and not at 5e.

## The rule that governs every lesson here

From v2.9, and load-bearing: **the zadania are a rubric of capabilities, never a
walkthrough.** No task in this module may name a feature — up to sixty
applications share none. A task may say *twoja specyfikacja ma kryteria K1–K7* ·
*jedno zadanie, jeden commit* · *aplikacja pamięta coś po zamknięciu* ·
*aplikacja przeżywa błąd, który użytkownik może spowodować* · *otworzył ją ktoś,
kto nie nazywa się tak jak ty*. Any task that presumes a list, a window layout
or a file format has broken the module.

Consequences the drafts obey:

- **No application code in any lesson of this module.** Code fences carry
  Markdown (a specification, a task list, a journal entry, a report), commands,
  or file layouts — never a control, a handler or a file format. The by-hand
  code is Moduł 6's, and the student's own code is nobody's to write here.
- **The shared object is `notatnik-v2`.** Where a lesson needs something
  concrete that every reader has, it uses the notatnik as a measuring rod. The
  domestic worked example from 5a (the shopping list) returns in 5b and 5c as a
  specimen, always labelled as not the reader's application.
- **The training stack stays provisional.** 2d promised the choice would be
  confirmed „w Module 6”; this module does not reopen it and does not name a
  framework.

## Owns · recalls · avoids

- **Owns** (proposed appendix rows, `docs/content-style.md`): the bar „ktoś
  prawdziwy ma tego używać — i ty się liczysz” and the idea as four sentences
  (home moves 4f → **5a**, with „zebrane, nie wybrane” replaced by „wybrane,
  jeszcze nie wycenione”); *apetyt* against *wycena*, from Ryan Singer's
  *Shape Up* (**5b**); the three ways an idea is too big (**5b**); the three
  parts of a report, from Joel Spolsky 2000 (**5g**); the three verdicts
  (**5g**).
- **Recalls**: 4a–4e in almost every lesson, one clause each, by link — the
  specification and its criteria (4c), the constitution and the decision record
  (4b), the fresh session and „gotowe, gdy” (4c, 4e), „specyfikację zmienia się
  przed kodem” and evidence in the journal (4e), Anthropic's size rule (4c).
  3d's *Rozbierz to* in 5f, with a new consequence: it is your own code.
- **Avoids**: everything Moduł 6 owns — the event loop, the layout containers,
  state outside controls, exceptions by type, the stack comparison. Moduł 7's
  pull request into a classmate's repository (5g stops at a file handed over).
  *MVP*, *produkt*, *startup*, *klient* as terms.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| „Estimates start with a design and end with a number. Appetites start with a number and end with a design”; „fixed time, variable scope” | [basecamp.com/shapeup/1.2-chapter-03](https://basecamp.com/shapeup/1.2-chapter-03) | checked 10.09.2026 | have (5b) |
| A good report has three parts: steps to reproduce, what you expected to see, what you saw instead | [joelonsoftware.com, 08.11.2000](https://www.joelonsoftware.com/2000/11/08/painless-bug-tracking/) | 08.11.2000 | have (5g) |
| „Steps to reproduce are the most important part of any bug report” | [Bugzilla, Bug Writing Guidelines](https://bugzilla.mozilla.org/page.cgi?id=bug-writing.html) | checked 10.09.2026 | have (5g, *Czytaj dalej*) |
| Everything else in the module is method already sourced in Moduł 4, or activity | — | — | — |

## Reader assumptions to verify

- That every student has a GitHub account with at least one repository of their
  own (0c, 2c). 5c creates a fifth repository and assumes the habit.
- That two build weeks of six and four hours are what the timetable actually
  gives (Article V — the drafts say „tydzień” and never a date or a lesson
  count).
- That a classmate can be given a folder to run in 5g without a network share —
  the draft assumes a clone from GitHub or a copied folder, and says both.

## Decisions

- **The module introduction replaces the placeholder** in `index.mdx` — rejected:
  keeping the holding note and adding prose beside it. The note is repo-facing
  and the file is student-facing.
- **`publish: false` on 5b–5g, `publish: true` kept on 5a** — 5a is a rewrite of
  a lesson that is already live, and hiding it would remove published material;
  the six new lessons follow the skill's default until Viktar has read them.
- **The stale `05*` briefs are copied to `06*` rather than left in place** —
  README step 2. They cannot be deleted from this session; the report names them.
- **No forward pointer to Moduł 9** — open decision #15 is unanswered, so 5a's
  old „w module o projekcie” becomes „ten moduł” and nothing replaces it.

## Open questions for Viktar (≤ 3)

1. Answered in session: #17 → slug `wybieramy-co-zbudujemy`, title „Trzy
   pomysły, jeden wybór”; #18 → a short menu of ready-made ideas inside 5a; 5g's
   report → a file in the author's repository, not an issue.
2. The seven published sentences that say „Moduł 5” and mean the by-hand module
   (`02-warsztat/index.mdx`, `03-budujemy` ×6) are now actively wrong — they
   point at this module. Not touched here: they are published lessons and belong
   to `revise-lesson`.
3. Whether the menu in 5a should be four ideas as drafted, or fewer.

## Deviations from the approved arc

- Drafted 2026-09-10, same session as this brief (autonomous).
