# Brief — 05c · Od pomysłu do specyfikacji

| | |
| --- | --- |
| Lesson | `content/moduly/05-twoja-aplikacja/od-pomyslu-do-specyfikacji.mdx` · `order: 3` |
| Written | 2026-09-10, by write-lesson · approved: **not approved — autonomous run** |
| Mode | autonomous (unapproved) |
| Research | `course-structure-v2.md` v2.9, the 5c row (old 6a: „co robi, czego nigdy nie robi, kryteria in 4c's shape; reviewed by a classmate against the criteria, not against the idea; first commit = konstytucja + spec, no code”); `research-06` §2.1–§2.3 for the four files and `[NEEDS CLARIFICATION]`, already spent in 4b–4c; the lessons 4b and 4c as written |
| Drafted | 2026-09-10 |

## Reader position

Has read 0a–4e, 5a, 5b. Has: a cut idea in four sentences plus a „czego nie
robi” list and a `pozniej.md`; one specification written before (`notatnik-v2`),
whose subject was a program they had already built once by vibing; a constitution
of six to eight lines and one decision record. Has never specified something
that does not exist in any form — every previous specification described
something already seen running.

## Carrying question

Jak zamienić cztery zdania w specyfikację, z której obca sesja umie zaplanować
pracę — kiedy nie ma czego obejrzeć?

## Anchor

**The student's own new repository**, from `git init` to a first commit that
contains `konstytucja.md` and `specs/001-…/spec.md` and no code. The
specification grows section by section through the lesson; the domestic
worked example from 5a is the specimen where a shape has to be shown.

## Shape

Procedure with a narrative frame — four hours, and the deliverable is a
committed repository. The narrative sections are 1, 4 and 6.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | last time the specification had a running program behind it — you could open the old notatnik and read the answer off the screen. This time the folder is empty → what replaces looking? | the empty folder |
| 1 | Repozytorium, które zaczyna się bez kodu | name, `git init`, `.gitignore`, `konstytucja.md` first: six to eight lines, and one line nobody can write for you — the thing this application must never do to the person who opens it | the first two files |
| 2 | Cztery zdania rosną w sześć części | the map from 5a's four sentences and 5b's cut to the specification's sections: cel · dla kogo · co robi · czego nie robi · kryteria · do ustalenia. Each section says which sentence it comes from | the specification, sections filled in order |
| 3 | Kryteria, kiedy nie ma czego naśladować | the criterion in 4c's shape („Kiedy …, to …” + „Sprawdzenie: …”), written for something unseen: a criterion names what a person does and what is then true — on disk, on screen, in a file — and never how it is done. Five to nine of them; fewer than five usually means „co robi” with a full stop | K1–K7 of the student's own specification |
| 4 | Trzy sposoby, na jakie ta specyfikacja się psuje | the leak into the plan (a file name, a library); the criterion with no check; and the one this module adds — a criterion that describes a screen instead of an effect, which cannot survive the first layout change | three lines from the student's draft, corrected |
| 5 | `[DO USTALENIA]`, czyli co wolno zostawić otwarte | what may stay open going into the plan and what may not: an open question about *how* is fine, an open question about *what* stops the plan | the specification's last section |
| 6 | Przegląd kolegi: kryteria, nie pomysł | the rule the module needs most, because sixty ideas are sixty temptations to argue: the reviewer answers three questions about the criteria and does not touch the idea. „A nie lepiej byłoby…” is out of bounds, and so is „to za małe” | a classmate's specification, then yours with their notes |
| 7 | Specyfikacja czegoś, czego nikt nie zbudował | ending: what you have that yesterday's four sentences did not — a thing a stranger can plan from, and a list of what would prove it wrong | the first commit |

## Owns · recalls · avoids

- **Owns** (proposed appendix rows): „kryterium mówi, co jest prawdą, nie jak
  jest zrobione”; the third failure mode (a criterion that describes the screen);
  the reviewer's three questions and the two forbidden sentences.
- **Recalls**: 4b's constitution and decision record; 4c's criterion shape,
  `[DO USTALENIA]`, the leak into the plan, the fresh-context test; 5b's cut.
  One clause each, linked on first recall.
- **Avoids**: EARS, Given/When/Then and SHALL as notations — 4c owns them and
  this lesson uses the Polish shape only; any application code; naming a
  framework; Moduł 6's vocabulary (stan, pętla zdarzeń, kontrolka).

## Exercises

1. Recall — the six sections of the specification and the two halves of a
   criterion, from memory.
2. Action on the anchor — take one of your criteria and rewrite it so the check
   is a command or a file, not a look at the screen.
3. Build step — the repository: `konstytucja.md` + `specs/001-…/spec.md`, first
   commit with no code, pushed.
4. Peer / reflection — review a classmate's specification against the three
   questions and write your answers in their file; then write in `dziennik.md`
   which of your own criteria you could not check without opening the code.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| (none new — the method's evidence was spent in 4a–4d and is recalled by link) | — | — | — |

## Reader assumptions to verify

- That every student may create a new public repository on their own account
  (0c, 2c) and that this is the fifth one.
- Whether the repository should be public or private-with-the-teacher-invited.
  The draft says „jak w 0c”, without deciding.

## Decisions

- **The constitution comes before the specification** — as in 4b, and for the
  same reason; rejected: skipping it because the application is small. The
  module's later cuts need something that outranks the specification.
- **Five to nine criteria** — rejected: „siedem, jak w notatniku”. Seven was the
  notatnik's number, not a law, and the module must not presume a size for sixty
  different applications.
- **The reviewer may not argue with the idea** — rejected: an open peer review.
  With sixty ideas, an open review turns into sixty arguments about taste and
  costs the lesson.

## Open questions for Viktar (≤ 3)

1. Repository visibility for this project — public, or private with the teacher
   as collaborator (it also decides what 5g's classmate can clone).

## Deviations from the approved arc

- Drafted 2026-09-10, same session (autonomous).
