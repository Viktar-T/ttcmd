# constitution.md — ttcmd

> The rules that outlive every feature. A spec may not contradict this file.
> Nothing here is feature-specific; if a rule only applies to one slice, it
> belongs in that slice's `spec.md`, not here.

| | |
| --- | --- |
| Repo | `ttcmd` — the course web app |
| Owner | Viktar |
| Ratified | 2026-08-27 |
| Amended by | ADR only (Article X) |
| Amendments | ADR-0003 (Art. VI) · ADR-0004 (Art. IX) · ADR-0005 (Art. III), all 2026-08-28 |

---

## Article I — What ttcmd is

ttcmd is the **central source of information, lessons and tasks** for the course
*Aplikacje desktopowe i mobilne*<!-- TO CONFIRM: official PL course title --> —
4th year, Technikum Cyfrowe Szczecin, from **2026-09-01**, 8 h/week, two groups.

It is used in class every week. It is built and maintained to production
quality: it must load fast, work on a phone, and never be broken on a Monday.

It is **not a commercial product**: one course, one teacher, no multi-tenancy,
no monetization, no third-party accounts, no growth surface. "Take it
seriously" and "do not turn it into a startup" are both true, and this article
is where they are reconciled.

## Article II — Why the method, on a project this size

Spec-Driven Development is heavier than this app strictly needs. It is used
anyway, because **building ttcmd is how Viktar learns SDD hands-on before
teaching it.** The site is the first deliverable; the method is the second.

That makes the following rules, not preferences:

- Follow the loop even where writing the code directly would be faster.
  Skipping the spec because the task is small defeats the reason this repo exists.
- When a shortcut *is* taken, it goes in `docs/sdd-journal.md` the same day.
  An unrecorded shortcut is the only real failure available here.
- One task, one commit, task ID in the message — so the loop stays legible
  afterwards, to Viktar and to the journal.
- If the honest history shows a mistake, the mistake stays. Deleting it deletes
  the only evidence of how the method actually behaves.

This repo is **not** classroom material. Students use the site as the course's
source of information and tasks; they are not shown the specs, the ADRs or the
commit log. Students build their own desktop and mobile apps — that is where
they meet SDD, not here.

## Article III — Language

- **Student-facing text is Polish.** Lesson bodies, task sheets, UI labels, page titles.
- **Repo-facing text is English.** This file, `AGENTS.md`, specs, plans, ADRs, code comments, commit messages.
- **Identifiers are ASCII English, no diacritics.** File names, slugs, frontmatter keys, component names. `moduly/01-trendy`, never `moduły/01-trendy`.
- **Every typeface must render Polish.** No face is adopted until it has been
  verified to carry the full alphabet — **ą ć ę ł ń ó ś ź ż Ą Ć Ę Ł Ń Ó Ś Ź Ż** —
  *and* the subset containing those glyphs is explicitly requested at load time.
  `ó` and `ł` live in different Unicode blocks; loading only the `latin` subset
  renders one and silently breaks the other, with no build error. See ADR-0005.

## Article IV — This repo and this site are public

The GitHub repository is public. The Vercel site is public and indexed.
Git history is permanent: a secret committed is a secret leaked — rotate it,
do not try to delete it.

**Never enters this repo or this site:**

- Student names, e-mail addresses, or any personal data of any student.
- Grades, assessment records, attendance, or anything that could be traced to an individual.
- School-internal documents, rosters, contracts, or correspondence.
- Credentials, API keys, `.env` files, tokens.
- Anything copied out of EXOCORTEX that is not Viktar's own work to publish.

Third-party course material is used under citation, not by wholesale copying.

## Article V — Invent no institutional facts

The timetable, class code, room, group names, roster, and the INF.03 / INF.04
exam scope are **not settled** and are not this repo's to decide.

Where such a fact is unknown, the schema carries an optional field left empty
and the page says nothing. A plausible guess rendered on a public site is worse
than a blank.

## Article VI — Content model

- The axis is **module → lesson**. Folders are `content/moduly/NN-slug/`.
- `week` is **optional metadata** on a lesson, filled in as the real timetable arrives. The timetable is never encoded in folder or file names.
- **Both groups get identical content.** The site does not model groups.
- The site does **not** host student work, student repos, or student submissions.
- Content is freely editable; the git history is the record of what changed and when.
  *(Consequence accepted knowingly: if a published task later counts toward a grade
  and its wording changes, the only evidence is the commit log.)*

**Identity and numbering** — these are spoken aloud in class and typed into
browsers. They are identity, not presentation, and no slice changes them without
a superseding ADR (ADR-0003):

- A **module's number** comes from its folder prefix: `01-…` → *Moduł 1*.
- A **lesson's letter** is derived from its `order` within the module
  (1 → a, 2 → b). Never stored by hand.
- **Exercises are numbered `<module>.<n>`, continuously across the whole
  module.** A lesson does not restart at 1 — which means an exercise cannot know
  its own number from inside its own file.

## Article VII — Teaching stack

**C# / .NET is the presumed stack** for the desktop and mobile apps students
will build, confirmed with the students in the opening weeks.

The content model must not depend on it. Code language is per-code-block
metadata, never a global assumption. Changing the teaching stack must cost
content edits — never a schema migration.

## Article VIII — Technical invariants

- Next.js App Router, `app/` **at the repo root** — not `src/app`.
- TypeScript, `strict: true`.
- Content is **MDX under `content/`**, validated by a Zod schema at build time.
  **An invalid lesson fails the build.** The schema is the single source of truth
  for lesson metadata.
- Deployed on **Vercel**. Do **not** set `output: 'export'` — a v2 route handler must stay possible.
- **v1 has no backend**: no auth, no database, no API routes, no analytics that collect personal data.
- Server Components by default; `"use client"` only where interactivity requires it.

## Article IX — The SDD loop

**Nothing is implemented in the application without a spec slice.**

Three lanes of change, with different gates (ADR-0004):

| Lane | What | Process | Commit prefix |
| --- | --- | --- | --- |
| **App** | `app/`, `lib/`, config, dependencies | full slice | `NNN/TNN:` |
| **Content** | `content/`, `public/img/` | none — write it | `content:` |
| **Chore** | tooling, ignore files, housekeeping | none | `chore:` |

**A content commit may not touch `app/` or `lib/`.** When writing a lesson
requires an application change, that is the signal to stop and open a slice. The
boundary is a detector, not only a rule: it is how the app comes to be built in
response to content that is genuinely blocked, rather than in anticipation of
content nobody has written yet.

```
specs/NNN-slug/
  spec.md    WHAT and WHY. Never names a file, a library, or a component.
  plan.md    HOW. File map, libraries, sequencing. Never re-argues the why.
  tasks.md   Ordered, commit-sized, objectively checkable.
docs/adr/NNNN-slug.md   One decision, its context, and the alternatives rejected.
```

- Slices are **numbered and append-only**. A later slice supersedes an earlier one; the earlier one is not rewritten or deleted.
- A spec that names a file has leaked into the plan. Fix the spec, and note the leak in `docs/sdd-journal.md`.
- A task that cannot be objectively checked off is not a task yet.

**Every `spec.md` ends with acceptance criteria** — observable conditions that
decide whether the slice is done. A spec without them is not a spec, it is a
wish, and there is nothing to check the result against.

**Done, per task:** the check passed **and the evidence is visible** — the
command that ran and what it returned. "Looks correct" is not done. The primary
check in this repo is `npm run build`: the Zod schema of Article VIII turns a
malformed lesson into a build failure, so content errors and code errors fail
through the same gate.

**Done, per slice:** every task checked, every acceptance criterion
demonstrably met, and a review of the diff against `spec.md` carried out in a
**fresh context** that reports no gap affecting correctness or the criteria.

## Article X — Amendment

This file changes only by an explicit decision of Viktar, recorded as an ADR in
`docs/adr/`. An agent may **propose** an amendment; it may never amend this file
silently or as a side effect of another task.
