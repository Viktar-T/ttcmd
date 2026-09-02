# Content reader — who is reading the lessons

| | |
| --- | --- |
| Status | **Provisional.** Written 2026-08-30 from the programme and Viktar's description of the class, before any student has been asked. Replaced by the aggregate of `docs/ques-for-content-reader.md` after the first lesson; every line marked TO CONFIRM is a guess until then |
| Owner | Viktar owns the facts. An agent may reformat this file; it may not change a fact in it without the questionnaire or Viktar behind the change |
| Loaded by | `.claude/skills/write-lesson` and `.claude/skills/revise-lesson`, in full, before `docs/content-style.md` |
| Feeds | The reader test and the opening recipe in `docs/content-style.md`; the "reader position" line of every brief in `docs/content-briefs/` |
| Privacy | Aggregate only. Counts, patterns and paraphrase. No name, no quote that could identify a student (Article IV) |

## The rule the skills apply

> At the opening of any lesson, the student knows **exactly** what this file
> says plus what the published lessons before it have taught. Nothing else.

A sentence that needs more than that to be understood is a sentence written
for a different reader. It is moved after the lesson that supplies the missing
piece, or rewritten so it does not need it. A sentence that asserts something
about the reader („całe twoje doświadczenie…”) is checked against this file;
if the file does not say it, the sentence goes.

## Who they are

Fourth-year students of a five-year *technikum*, profile *technik programista*,
seventeen to nineteen years old, two groups of roughly thirty, meeting eight
hours a week from 1 September 2026. Two to three years of programming lessons
at school. No industry experience: they have not worked in a software team,
maintained a codebase older than a week, or handed a program to a stranger.
Some may have a job outside IT, a family business or a paid website behind
them — TO CONFIRM (questionnaire block G).

They are intelligent and will notice condescension. They are also not the
reader of a technology essay: a name they have never met costs them a sentence
of attention, and three such names in a paragraph cost them the paragraph.

## Done with their own hands — TO CONFIRM (blocks A–D)

Written as the most probable picture for this profile. Every line is a
hypothesis the questionnaire will confirm, correct or delete.

- Console programs in **C++** and probably **Python**: loops, functions,
  arrays, files, simple classes. This is the language of their intuition.
- **HTML, CSS and some JavaScript**; a static site; probably **PHP with a SQL
  database** from the INF.03 scope — a form that writes to a table.
- **SQL**: SELECT with a JOIN, INSERT, UPDATE — on a lesson's database.
- Object-oriented basics: class, object, inheritance, probably an interface;
  exceptions as `try/catch`.
- Possibly one program with a window built in class (Windows Forms, Tkinter or
  similar): a button, a text box, a click handler. Possibly none.
- Git: some have typed `git commit` once in class; most have not used it for
  their own work. Lesson 0c is written as if for nobody.
- AI: most have used ChatGPT for homework; a few use an AI editor. Almost none
  have read generated code line by line before running it.

## Not done — TO CONFIRM, and to be kept as the list of things a lesson may not assume

- Worked on one codebase with another person; resolved a conflict; reviewed
  someone's change.
- Returned to their own code after a month and changed it.
- Had a **user** who was not themselves; received a bug report; shipped a
  release; installed their own program on someone else's machine.
- Written an automated test of any kind.
- Read a diff. Read a stack trace to the end. Read documentation in English
  for a whole feature rather than a snippet.
- Used a terminal with confidence; used Linux beyond a lesson.
- Paid for a developer tool, a subscription or an API key.
- Seen a technology they know be replaced by another. Nothing in their
  programming life has been *retired* yet.

The last line is why forty years of history do not land as a story for this
reader: there is no experience of loss to attach it to. The line before it is
why „koszt utrzymania” is an abstraction here and not a memory.

## Believe on day one — TO CONFIRM (block E)

Likely, from the profile and from the education research in
`docs/content-research/research-01-ai-assisted-development.md` §5:

- A program is finished when it runs.
- The hard part of programming is typing the code; AI does the hard part.
- Code that AI wrote and that works is correct.
- Either „AI will replace programmers” or „AI is a toy” — few hold the middle.
- Learning faster means reaching a working program faster.

Lesson 1c argues against three of these with numbers; the questionnaire's E5
says which three the class actually holds, and how strongly.

## Want — TO CONFIRM (blocks F, I, J)

- To build something that is theirs and that runs on a phone or a desktop;
  phone probably first (block J2).
- To know what they will do after school; INF.04 matters to some, not all.
- Not to be lectured about things they already know, and not to be left alone
  with things nobody taught them.

## Constraints — TO CONFIRM (blocks G, K; open decisions #1, #3, #4 in `course-structure-v1.md`)

- Eight hours a week in class; hours at home unknown and probably few (J8).
- Equipment at home unknown; lab OS and admin rights unsettled (decision #1).
- Whether they may open third-party accounts is unsettled (decision #4).
- Reading English: mixed. A sentence of English documentation is fine; a page
  is not, yet.
- Language of the course: Polish. English terms arrive one at a time, with a
  Polish gloss, in their home lesson (`docs/content-style.md`, appendix).

## Words they carry, and words they do not — TO CONFIRM (block D)

Can be used without explanation: zmienna, pętla, funkcja, tablica, lista,
klasa, obiekt, metoda, wyjątek, baza danych, tabela, zapytanie, SQL, HTML,
CSS, JavaScript, strona, serwer (loosely), plik, folder, kompilator, błąd,
konsola, IDE (as „program, w którym piszę kod”).

Must be introduced in a home lesson before use: repozytorium, commit, gałąź,
pull request, diff, terminal, build, framework, SDK, API, JSON, biblioteka
versus framework, pętla zdarzeń, stan, wiązanie danych, deklaratywnie, token,
okno kontekstu, prompt, agent, specyfikacja, test jednostkowy, CI, wdrożenie
(deploy), pakiet, podpis cyfrowy. The appendix of `docs/content-style.md`
records which lesson owns each.

## How a lesson uses this file

1. The brief's first line names the reader position: this file plus the
   lessons already read, by letter — „reader has read 0a–0c, 1b–1g; can run a
   C# console program; has never opened a pull request”.
2. Every paragraph passes the reader test in `docs/content-style.md`: what it
   assumes, whether the assumption is in the position, and whether it makes a
   claim about the reader.
3. Every „not done” item that a lesson needs — a user, a team, a release — is
   built inside the lesson before it is relied on.

## How this file is updated

After the questionnaire: replace each TO CONFIRM block with counts and
patterns („22 of 28 have built a program with a window in class; 3 on their
own; nobody has shipped one”), date-stamp the header, drop the *provisional*
status. The export stays in the vault. Repeat with the ↻ pulse questions in
November and January. A lesson written in March should know the reader it has
by then, not the one from September.
