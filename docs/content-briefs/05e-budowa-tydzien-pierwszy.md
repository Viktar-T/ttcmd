# Brief — 05e · Budowa: tydzień pierwszy

| | |
| --- | --- |
| Lesson | `content/moduly/05-twoja-aplikacja/budowa-tydzien-pierwszy.mdx` · `order: 5` |
| Written | 2026-09-10, by write-lesson · approved: **not approved — autonomous run** |
| Mode | autonomous (unapproved) |
| Research | `course-structure-v2.md` v2.9, the 5e row (old 6c: „the loop at speed — one task, one commit, evidence in `dziennik.md`; 4e's three things that go wrong, met on their own code; the fixed segments continue”) and the module paragraph's rubric rule; `research-06` §4.3 (Anthropic on checks and evidence), spent in 4e and recalled here; lesson 4e as written |
| Drafted | 2026-09-10 |

## Reader position

Has read 0a–4e, 5a–5d. Has a repository with three commits and no code, a
specification with five to nine criteria, a plan, and a task list ordered with
the most uncertain task first. Has run this loop once, over one week, on a
program that already existed in another folder. Has never worked on code where
nobody else's version exists to compare against, and has never had to decide
alone that something is finished.

## Carrying question

Czy pętla, którą przeszedłeś na notatniku, wytrzyma program, którego nikt przed
tobą nie zbudował?

## Anchor

**`tasks.md` with its boxes, and `dziennik.md` beside it.** The lesson starts
with every box empty and ends with the first half ticked, each tick paired with
an entry that shows a command or a file rather than the word „działa”. The
commit log is the visible form of the same thing.

## Shape

Procedure with a narrative frame — six hours, the longest lesson of the module.
It trips the one-sentence-paragraph count by design, as 4e does.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | a task list with eight empty boxes and a folder with no code; the notatnik week had a finished program in the next folder to peek at, and this week has nothing → what plays the role the old notatnik played? (answer: the specification, and only it) | the empty boxes |
| 1 | Rytm: jedno zadanie, jeden commit | the loop at speed, in short: one task pasted in with its „gotowe, gdy”, the diff read, the check run, the box ticked only after the check, the commit carrying the task number | the first three tasks |
| 2 | Dziesięć minut na diff, kiedy nie znasz biblioteki | the fixed segment, now on code nobody has reviewed for you. Three questions that work without knowing the library: what did it change that I did not ask for; where does the data go in and come out; what happens if that call fails | one diff |
| 3 | Trzy rzeczy pójdą nie tak | 4e's three, recalled in a clause each, with the new consequence: on your own application there is no second version to compare with, so the specification is the only reference and „chyba tak miało być” is not an answer | three moments in the week |
| 4 | Zadanie stoi od godziny | the stuck rubric, written so it fits any of sixty applications: reduce to the smallest case that still fails; a fresh session with the specification and the one file; a classmate reads the diff without being told what it should do; and last, cut the criterion — with the specification edited first | one stuck task |
| 5 | Środa: połowa tygodnia, połowa listy | the mid-week gate and the cut, not the extension. What you cut, in what order („czego nie robi” grows, `pozniej.md` grows), and why cutting on Wednesday is a decision while cutting on Friday is a failure | the list, shortened |
| 6 | Co ma być gotowe na koniec tygodnia | the gate as capabilities, never as features: the application starts from a folder that is not the editor's; at least half the criteria pass with evidence; every commit names its task; the journal has one entry per task | the ticked half |
| 7 | Pierwsza połowa | ending: what changed — you now know which of your criteria were wishes | — |

## Owns · recalls · avoids

- **Owns** (proposed appendix rows): the three diff questions for an unknown
  library; the stuck rubric („najmniejszy przypadek, świeża sesja, cudze oczy,
  cięcie”); „w środę się tnie, w piątek się przegrywa”.
- **Recalls**: 4e's three failures and „specyfikację zmienia się przed kodem”;
  4e's evidence rule and the Anthropic guidance behind it, one clause with a
  link; 3d's verification journal; 5b's cut and `pozniej.md`.
- **Avoids**: any application code; any named framework, control or file format;
  Moduł 6's vocabulary; the second half of the criteria, which is 5f's subject.

## Exercises

1. Recall — the four steps of the stuck rubric, in order, and what you do before
   cutting a criterion.
2. Action on the anchor — take the diff of your last task and answer the three
   questions in writing; note the one thing the agent changed that no task asked
   for.
3. Build step — the week: the first half of the tasks ticked, one commit each,
   one journal entry each with a command or a file as the evidence, pushed.
4. Reflection — one paragraph in `dziennik.md`: which criterion turned out to be
   a wish, and what you would write instead.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| „Have Claude show evidence rather than asserting success” — recalled, already sourced in 4e | [code.claude.com/docs](https://code.claude.com/docs/en/best-practices) | checked 02.09.2026 in 4e | have (one clause, link only) |

## Reader assumptions to verify

- That the two build weeks are consecutive and that a mid-week point exists to
  put the gate at. The draft says „w połowie tygodnia” and never names a day.
- Whether a teacher's checkpoint sits at the mid-week gate. The draft describes
  the gate as the student's own decision, with one sentence saying it is worth
  showing to somebody.

## Decisions

- **The gate is a rubric of capabilities** — the module's rule; every sentence
  in section 6 was checked against „could this be true of an application that
  has no list, no window layout and no file format”.
- **The stuck rubric names four moves and a time** — rejected: „poproś o pomoc”.
  With sixty applications and one teacher, the first three moves have to be ones
  a student can make alone.
- **Cutting is a Wednesday decision** — rejected: cutting whenever it hurts. A
  cut with three days left changes the week; a cut with three hours left changes
  nothing.

## Open questions for Viktar (≤ 3)

1. Whether the mid-week gate should be a checkpoint you run in class (a short
   round of „ile masz odhaczonych”), which the draft only hints at.

## Deviations from the approved arc

- Drafted 2026-09-10, same session (autonomous).
