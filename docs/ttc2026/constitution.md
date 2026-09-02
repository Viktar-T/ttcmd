# constitution.md — ttc2026

> The rules that outlive every feature. A spec may not contradict this file.

| | |
| --- | --- |
| Repo | `ttc2026` — assignment checking for the course *Aplikacje desktopowe i mobilne* |
| Owner | Viktar |
| Seeded | 2026-09-01, in `ttcmd/docs/ttc2026/`; ratified when the repo goes live |
| Amended by | ADR only (Article X) |

## Article I — What ttc2026 is

A **local tool for one teacher**: it visits each student's assignment
repository on GitHub, runs deterministic checks, produces AI-written
feedback against the assignment's rubric, and presents results in a web UI
served on `localhost`. Two groups × ~30 students, one machine, one user.

It is **not a product**: no deployment, no accounts, no multi-tenancy, no
student-facing surface. Students only ever see GitHub. It is also not part
of ttcmd — ttcmd hosts no student work (its Article VI); this repo is
private and never linked from the course site.

## Article II — Why the method

Spec-Driven Development is heavier than this tool strictly needs. It is
used anyway, for the same reason as in ttcmd: **building the tool is
practising the method the course teaches.** The loop, the lanes, the
one-task-one-commit rule and the honest journal habits transfer unchanged.
When a shortcut is taken, it is recorded the same day in `docs/journal.md`.

## Article III — Language

- **Repo-facing text is English**: this file, specs, ADRs, code, commits.
- **AI feedback addressed to students is Polish.** That is the one
  student-facing text this tool produces, and the contract is fixed.
- UI labels are for the teacher; English identifiers, Polish allowed where
  natural. Identifiers, file names and slugs are ASCII English.

## Article IV — Privacy: treat the private repo as if it were public

- **GitHub logins only. Never** student names, e-mail addresses, grades,
  attendance, or anything traceable to an individual beyond the login they
  themselves publish on GitHub.
- **Grades do not exist in this system** — not in state files, not in
  reports, not in code. Grading happens offline, outside git.
- All fixture and sample data is obviously fake (`student-01`).
- Student code is sent to the model under the teacher's own account.
  Whether the school requires consent for that is an institutional
  question, answered before the first real run — never assumed.

## Article V — Invent no institutional facts

Deadlines, group names, rosters and the timetable are configuration the
teacher fills in, never values the code or a sample file asserts. A
placeholder must be unmistakably a placeholder.

## Article VI — Data model: flat files, no database

- All state lives in **files in this repo**: rosters as CSV, assignment
  definitions as YAML + a Markdown rubric, run state and results as JSON,
  reports as Markdown. Committing state is how it is backed up.
- Cloned student repositories live under `work/`, which is gitignored and
  disposable.
- A student's repo URL is **derived by convention**
  (`github.com/<login>/<assignment repo name>`), with an overrides file for
  exceptions. Reality wins over convention; the overrides file is not a
  failure.

## Article VII — The pipeline contract

- **Deterministic checks state facts** (pass / fail / skip, with
  evidence). They never express opinions.
- **AI output is feedback, never a grade**: no points, no marks, no
  ranking, no pass/fail verdicts. Its shape is fixed: 3–5 sentences to the
  student in Polish, one line to the teacher in English, flags from a
  fixed vocabulary.
- **Nothing is ever auto-posted** to a student repository. Any future
  posting feature is teacher-approved per batch, and needs an ADR first.
- Runs are **resumable**: progress is recorded per repo; an interrupted
  run continues, an unchanged repo is skipped.

## Article VIII — Technical invariants

- **Next.js App Router + React + TypeScript `strict: true`**, run locally
  with `npm run dev` — one process serving the UI and executing the
  pipeline server-side. Never deployed; nothing may depend on a cloud
  service beyond GitHub and the Claude CLI.
- The pipeline shells out to `git`, `gh`, `dotnet` and `claude` (headless,
  `claude -p`). The model is a configuration value, never hardcoded.
- Must run on **Windows**. No bash-isms in anything the app executes.
- No database, no auth, no analytics, no telemetry.
- A `--dry-run` path with committed fixture repos exercises the whole
  pipeline — including report generation — without network and without
  spending AI calls. It is the default verification of every slice.

## Article IX — The SDD loop

Nothing is implemented without a spec slice. Three lanes:

| Lane | What | Process | Commit prefix |
| --- | --- | --- | --- |
| **App** | `app/`, `lib/`, config of the app, dependencies | full slice | `NNN/TNN:` |
| **Data** | rosters, assignment definitions, rubrics, overrides | none — write it | `data:` |
| **Chore** | tooling, ignore files, housekeeping | none | `chore:` |

`specs/NNN-slug/` carries `spec.md` (what/why, acceptance criteria,
`## Decisions taken`), `plan.md` (how), `tasks.md` (ordered, commit-sized,
objectively checkable). Slices are numbered and append-only. Every task
closes on a shown check, never on an opinion; the default checks are
`npm run build` and the dry-run.

## Article X — Amendment

This file changes only by Viktar's explicit decision, recorded as an ADR in
`docs/adr/`. An agent may propose an amendment; it may never amend this
file silently.
