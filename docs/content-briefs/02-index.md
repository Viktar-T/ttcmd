# Brief — Moduł 2 · Warsztat: środowisko pracy

| | |
| --- | --- |
| Module | `content/moduly/02-warsztat/index.mdx` |
| Written | 2026-09-01, by write-lesson · approved: **2026-09-01, by Viktar** |
| Mode | supervised — this brief and the four lesson briefs (02a–02d) are proposals; nothing is drafted until Viktar approves them |
| Structure | `course-structure-v2.md` v2.3, Moduł 2 — written on Viktar's request of 2026-09-01 („napisz moduł 2”), which this brief treats as approval of the v2 Moduł 2 *shape* (open decision #7's „once v2 is approved”) |
| Research | `course-structure-v2.md` (Moduł 2 table, lab preparation, open decisions #1–#4); `research-02` §2, §4 |
| Supersedes | The 2026-08-30 content of this file — the index brief for v1's Moduł 2 *Rozmowa z modelem: prompt i kontekst*, dissolved into Moduł 3 by v2. Old content in git history. `02a-prompt-token-kontekst.md` is left in place untouched: it feeds the future 3a brief (decision #7) and is renamed when that brief is derived |
| Drafted | 2026-09-01 — deviations listed at the end |

## Reader position

Has read: 0a, 0c (0b does not exist yet), the Module 1 introduction, 1b–1h.
Did the 1e experiment: drove one of the two class tools for 25 measured
minutes on a task of their own; the observation card is committed to their 0c
repo. Can: the 0c Git minimum (config, status/add/commit/push, clone/pull, a
branch, an open pull request). Has never: named what kind of program the 1e
tool is, organised a project folder, seen a project template, read a diff
themselves, verified an SDK with a command, written C# (TO CONFIRM, block D).

## The module's one argument

> An agent does not work in thin air. It works in a workshop — an editor, a
> folder, a repository, an SDK — and every part of that workshop can be
> checked with a command instead of believed. By the end of the module a
> window your agent built runs from a repository you control: you can point
> at the file that makes the window, say who changed what and when, and undo
> any change cheaply. That workshop, not any single tool in it, is what the
> rest of the course builds in.

## One sentence per lesson

- **2a Narzędzia: dwa edytory z agentem** — the tool you drove in 1e gets a
  category (agent-first editor, a VS Code fork), a twin, and a reason there
  are two of them: one set of habits, double the free use, a spare when one
  refuses.
- **2b Projekt, folder, repozytorium** — where a project lives so that
  neither you nor the agent gets lost: one folder per project, a repository
  from day one, and the SDK proven present with a command, not assumed.
- **2c Pierwsze okno** — the training stack declared honestly provisional
  („C# + Avalonia na czas nauki; wybór potwierdzimy w Module 5”); a template
  puts a window on the screen with no AI at all; then the agent changes one
  visible thing and you read your first diff line by line.
- **2d Git i GitHub w pracy z agentem** — the working level of Git on the 2c
  project: reading a diff before accepting it, one task one commit, undoing
  an agent's change as a cheap boring operation, a branch as the agent's
  sandbox, `.gitignore` for what the build generates, the repo as the
  course's portfolio.

## Why this order

2a first because 1e left the reader inside a tool they cannot describe, and
the editors exist before any project does. 2b before 2c because `dotnet new`
needs a disciplined place to run, and the folder-and-repo conventions are
cheaper to learn on an empty project than to retrofit. 2c before 2d because
reading history needs a project with history in it. 2d closes the module
because control over what the agent changed is the habit every Moduł 3 build
week repeats, and Moduł 4 formalises.

## Introduction shape

Three paragraphs, per the guide's „A module” rule: where the reader starts
(they have driven an agent once, in a tool they cannot yet name, in a folder
they did not choose); the question the module answers (what has to exist —
and be checked — before programming with agents is work rather than magic);
one sentence per lesson, in order. One additional honest sentence: the stack
named in this module is „na czas nauki” and the real decision is made with
the class in Moduł 5 — the introduction states this, 2c argues it.

## Decisions

- Module slug `02-warsztat`, lesson slugs and orders exactly as the v2 table
  — rejected: renaming now, which re-opens ADR-0003 identity questions.
- This file was overwritten in place (same module number, new module) —
  rejected: keeping both index briefs, which leaves two contradictory
  „module 2 arguments” in one folder; git history preserves the old one.
- The introduction is drafted together with the four lessons, not after 2a
  is read — rejected: the old brief's staging question, moot now that all
  five briefs are approved as one set.
- The introduction makes no promise about hours or weeks (Article V; `week`
  stays empty metadata).

## Open questions for Viktar

None here — the module's single open question (sign-in wording) lives in
02a, where it blocks a section.

## Deviations from the approved shape

- **Four paragraphs, not three.** The brief's „three paragraphs + one honest
  sentence” became three paragraphs plus a fourth carrying the „na czas nauki”
  note on its own. The note has to say two things — what is provisional and
  when the real decision happens — and appended to the lesson-by-lesson
  paragraph it read as an afterthought about 2c rather than about the module.
- **The lesson-by-lesson paragraph names moves, not terms.** 2d's sentence
  drops `.gitignore` and „portfolio”, which 2d owns; it names four moves
  instead. Same for 2b's „SDK”, said as „zestaw do budowania sprawdzony
  poleceniem”.
- **„W Module 5” appears once**, as the brief asked, and is the introduction's
  only forward reference.
