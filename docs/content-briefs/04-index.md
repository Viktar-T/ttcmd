# Brief — Moduł 4 · Specyfikacja zamiast wibracji

| | |
| --- | --- |
| Module | `content/moduly/04-specyfikacja/index.mdx` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** |
| Mode | **autonomous** (AGENTS.md §2) — this brief, 04a–04f and the six lessons were researched, briefed and drafted in one run on Viktar's request of 2026-09-02 („make the deep research and fully write the brief and content for Moduł 4”). The request is treated as approval of the v2.3 Moduł 4 *shape*, not of the briefs. Nothing here says „approved by Viktar”; the `## Decisions` sections are the review surface |
| Structure | `course-structure-v2.md` v2.3, Moduł 4 (20 h): v1's 3a–3e, the full loop on a rebuild of Budowa 2 or 3, the „Zbieramy pomysły” brainstorm at the end |
| Research | **`research-06-spec-driven-development.md`** (written in this run, 2026-09-02) — the whole module; `research-01` §3–§4, §5, §6; `course-structure-v1.md` Moduł 3 and 4e rows |
| Drafted | 2026-09-02 — deviations at the end |

## Research gate (write-lesson §3)

Case **1, created in this run.** `research-01` §4 gave SDD one page and a tool table dated
August 2026 — enough for a module row, not for six lessons. `research-06` was written
first (timeline with dates, the anatomy of the loop and the older ideas each stage is made
of, the tool table as of 2026-09-02 including the class editors' plan features, the
measurable evidence and its limits, the critique). Every checkable claim in 04a–04f is
listed in that lesson's brief with its link and date and appears in the lesson where it is
made. `docs/learn-ai-codding/12-spec-driven-development.md` was read as a structure map
only and is **not cited** (see the 03-index brief for why).

## Reader position

Has read: 0a, 0c, 1b–1h, 2a–2d, 3a–3d. Has: three Avalonia applications — minutnik,
notatnik, katalog — each in its own GitHub repository; `AGENTS.md` in the katalog;
`dziennik.md` in all three (3d's exercise); a `rundy/` folder in the notatnik with five
saved outputs of the same request asked five ways; the habit of a fresh session, of reading
a diff before accepting it, of one change by hand per week; one *Rozbierz to* done. Has
seen the 1d demo prompt — numbered functional requirements, a done-criterion, a
`DECISIONS.md` rule — and 1f's promise that „w module o specyfikacjach nauczysz się pisać
je razem z kryteriami akceptacji”. Has never: written down what a program should do before
building it; written a sentence that could be checked as true or false about their own
app; handed a description to someone else to build from; written a test; returned to code
after a month — although by now the minutnik is five or six weeks old, which the module
uses.

## The module's one argument

> Three applications work, and none of them says anywhere what it was supposed to do. The
> rules file says how the code is written; the journal says what was checked; the chat that
> held the intent is gone. This module adds the one file that was missing — a written
> statement of what the program does, for whom, what it never does and how you will know —
> and shows that everything else hangs on it: the agent gets what it cannot guess, you get
> something to check against, and the you of two months from now gets the reason. The
> loop that grows around that file (constitution → spec → plan → tasks → code → check) is
> the same in every tool shipped in 2025; you run it once, by hand, on the notatnik you
> already know the chaos of, and only then look at the tools.

## One sentence per lesson

- **4a Po co komu specyfikacja** — open the minutnik repository and look for where it says
  what the app should do; there is no such place, the seven rules went into a thread that
  is gone, and the lesson shows with numbers what a model does with what you did not write
  — then has you reconstruct the minutnik's spec from the running app.
- **4b Konstytucja projektu i reguły** — three kinds of sentences about a project (how code
  is written, what this feature does, what is always true), the third gets its own short
  file that outranks every spec, and a decision gets a record with the alternative it
  rejected; the new notatnik repository's first commit has no code in it.
- **4c Pętla: spec → plan → zadania → kod** — the four stages and the question each
  answers, written out in full for the notatnik; the acceptance criterion as a sentence
  with a situation, an action and a checkable outcome; the two ways a spec fails (it names
  a file; a task cannot be checked); the test of a good spec — a fresh session can plan from
  it alone.
- **4d Narzędzia SDD: jedna pętla, pięć opakowań** — five tools in five months of 2025,
  laid against the four files you wrote by hand; Böckeler's three levels and her critique;
  the half of the loop already in your editor's plan mode; why this module installs
  nothing.
- **4e Pełna pętla: notatnik od nowa** — the build week: spec corrected after review, plan
  from a fresh session, tasks with their checks, one task one commit, every criterion
  demonstrated with evidence, a review in a fresh context; the console variant from the
  same spec as the fallback; two notatniks side by side.
- **4f Zbieramy pomysły: co zbudujemy** — three ideas for a program someone real would
  use (you count as someone), each written as a spec in miniature, captured in a file and
  not committed to; the choice is confirmed in the project module.

## Why this order

4a first because the module's motivation is a discovery, not an announcement: the student
has to look for the missing file and not find it before a lesson about writing it can
land. 4b before 4c because the constitution is what a spec is checked against — writing
the spec first and the constitution second reverses the rank the module teaches. 4c is the
method lesson and sits in the middle, where the notatnik's constitution exists and its
code does not. 4d after 4c and before 4e because the tools only make sense once the student
has written the files the tools generate, and because a student who has seen Plan Mode
before the build week will use it in the build week — as intended. 4e is the build and
needs everything before it. 4f closes the module because v2.3 puts the brainstorm here
(the „1–2 months” of the original note) and because ideas written as miniature specs are
the module applied one last time, on something the student wants.

## The module's rhythm

The three fixed segments of Moduł 3 continue in 4e as exercises: ten minutes of diff
reading, one change by hand, one journal entry per task. 4a–4d each end with a file
committed (a retro-spec; a constitution and a decision; a spec; a note in the journal
comparing the editor's plan with your own), so the notatnik-v2 repository grows for three
weeks before its first line of code — which is the point, said in the introduction.

## Introduction shape

Four paragraphs. Where the reader starts (three working apps; open any repository — the
rules file says how, the journal says what was checked, nothing says what; the chat is
gone). What the module answers (what to write down before building, so that the agent
gets what it cannot guess, you get what to check against, and the file survives the
conversation — and why that file, not a better prompt, is the answer). One sentence per
lesson, in order. A last paragraph on how the module is run: on the notatnik, rebuilt from
a spec, by hand and without a new tool; the size rule (a spec is for a week of work — for
a one-sentence change you do not write one); and the honest note that the rebuilt app may
look the same as the old one from the outside — the difference is in what you can check
and what survives.

## Decisions

- **Module slug `04-specyfikacja`, six lessons, slugs from v1's Moduł 3 plus
  `zbieramy-pomysly`** — rejected: folding the brainstorm into 4e's ending. The brainstorm
  is a different activity with a different deliverable (`pomysly.md`), it has its own
  anchor, and v1's 4e row gives it a bar („someone real has to use it”) that deserves a
  heading of its own. Six short-to-long lessons in 20 h ≈ 2 / 2 / 4 / 2 / 8 / 2.
- **The rebuild target is the notatnik (Budowa 2), not the katalog** — rejected: the
  katalog. The notatnik is the smallest app, its output is a file on the disk so every
  acceptance criterion is observable without a test framework, its failure modes are
  already known to the class (the newest-first ordering that loses a note, the removed
  dialog class, the format nobody chose), and its spec fits on a page. The katalog is
  offered as the extension for students who finish; the console notatnik is the fallback
  for students behind (v2.3).
- **A new repository `notatnik-v2`, not a branch or a rewrite in the old one** — rejected:
  continuing in the old repository. The old notatnik stays untouched as the before-picture:
  4e's comparison of two histories and two `notatki.md` files needs both to exist side by
  side, and a student should not be deleting working code in week 8.
- **The loop is run by hand: a `specs/001-notatnik/` folder with `spec.md`, `plan.md`,
  `tasks.md`, plus `konstytucja.md` and `decyzje/` at the root** — rejected: installing
  Spec Kit (needs Python and `uv`, neither on the lab list; a third tool the week the loop
  should be visible), OpenSpec (Node install, same objection) or Kiro (a third editor with
  its own account). The class editors' plan features are used in 4d/4e as the plan-and-tasks
  half, once the student has done that half by hand.
- **The four files are spread over 4b–4e, not all written in 4e** — rejected: v1's shape,
  where 3e ran the whole loop in one sitting on a fresh console tool. Spreading them makes
  each lesson end with a committed file on the same repository (hands-on shape), and lets
  4c's spec be reviewed by a classmate a week before it is built, which is where the
  „fresh context” test is cheapest. 4e still runs spec → plan → tasks → code → check inside
  one week, opening with the spec's revision.
- **Polish forms**: *specyfikacja* (never „spec” alone in prose; `spec.md` as a file name
  is fine), *kryterium akceptacji*, *konstytucja projektu*, *plan*, *lista zadań*, *zapis
  decyzji* (with „ADR” given once as the English name). *Vibe coding* is used as 1g
  defined it and not re-explained.
- **No hours, weeks or dates of the class in the introduction** (Article V).
- **`docs/learn-ai-codding/` is not cited anywhere.**
- **The course site's own use of this loop is not mentioned** — Article II keeps students
  away from this repo's specs and ADRs; a first-person remark about Viktar's own work is
  his to make (open question 3).

## Open questions for Viktar (≤ 3)

1. **`notatnik-v2` as a new repository** (Decision 3) means every student has a fourth
   repository by week 9 and the old notatnik is frozen as a museum piece. Confirm, or say
   „same repository, new branch” and 4b's opening and 4e's comparison section change
   wording (not shape).
2. **4d tells students to switch on Plan Mode (Cursor) / the Implementation Plan artefact
   (Antigravity) and compare with their own plan.** Both are vendor features checked
   2026-09-02 (`research-06` §3); whether they are available under the school's accounts
   and free tiers is TO CONFIRM on a lab machine before 4d. The lesson is written so that
   the exercise degrades to „read the tool's documentation and say which of the four files
   it produces” if either is absent.
3. **Do you want one sentence, in the teacher's first person, saying that this course
   site is built with the same loop?** It would be true and it would land; it is also a
   statement about your work on a public site, which AGENTS.md §4 says is not mine to make.
   The drafts do not contain it.

## Deviations from the approved shape

- **Written 2026-09-02, revised the same day after a fresh-context review** (a
  subagent that read only the reader file, the style guide, 3c, 3d, the briefs and the
  drafts). Its 25 findings were all acted on; the material ones are listed per lesson
  below and in each lesson's brief.
- **Intra-module links are plain text.** The build refuses a link to a lesson with
  `publish: false` (lib/links.ts), and every Moduł 4 lesson is a draft; recalls of
  earlier Moduł 4 lessons therefore say „w lekcji o pętli” without a link, exactly as
  Moduł 2 and 3 did. Add the links in the `content:` commit that publishes the module.
- **The honesty paragraph the research asked for was missing from every draft and is
  now in 4a** (after Larbi's limits: no controlled study of the method itself exists;
  the rest is a dated industry practice) **and recalled in 4d** (the Böckeler section).
- **The introduction no longer says „największe firmy w branży”** — 4d's own count is
  „pięć firm, w tym trzy z największych”, and the introduction now says the same.
- **`docs/content-style.md` appendix rows added** for every story and term 4a–4f own
  (stories table and terms table), with a dated note; `scripts/check-content-style.mjs`
  untouched (no Moduł 4 story is re-told outside its home).
- **A checker gap, not fixed here (chore lane):** `check:content` predates slice 010 and
  counts `<Cytat>`, `<Rysunek>` and `<CzytajDalej>` tags as one-sentence paragraphs and
  their attribute quotes as straight quotes in prose. Every such smell in Moduł 4's
  report is that, as it is in Moduł 3's.
