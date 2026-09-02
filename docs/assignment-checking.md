# Assignment checking — workflow and architecture

| | |
| --- | --- |
| Written | 2026-09-01, from the discussion of the same day |
| Status | **Design note, approved direction.** Viktar chose the „no platform” variant. This document is the reference for the separate implementation repo; the paste-whole prompt that starts that repo is `docs/_prompts/bootstrap-course-checks.md` |
| Lives where | The system itself is a **separate, private repo** (working name `course-checks` — Viktar names it). ttcmd hosts no student work and no backend (Articles VI, VIII); nothing from the checking system enters ttcmd except this note and the prompt |
| Scale | Two groups × ~30 students, one teacher, one machine |
| Context | GitHub Classroom was retired 2026-08-28 ([announcement](https://github.com/orgs/community/discussions/205975)); [Classroom 50](https://github.com/foundation50/classroom50/) noted as a future option, not adopted |

## The decisions this document encodes

1. **No platform.** Plain GitHub + `gh` CLI + a batch script. Rejected:
   Codio (commercial dependency, aimed at higher ed) and Classroom 50
   (promising, open-source, but months old — revisit mid-semester if the
   manual layer becomes tedious).
2. **Two layers, only one of them AI.** Deterministic checks decide facts
   (does it build, is the repo clean); AI reads code and writes *feedback*.
3. **AI reports, never grades.** Same contract as `npm run check:content`:
   reports, never fails. Grades exist only offline, outside every repo.
4. **Claude runs locally in a batch on the teacher's machine**, under the
   teacher's Claude Max login, headless (`claude -p`). Rejected: the
   subscription token in GitHub Actions — a personal subscription as a
   backend for sixty students is a rate-limit incident and a terms-of-use
   grey zone.
5. **Student repos stay the students' own** (2b convention: one repo per
   project, on the student's account). The checker visits them; it does not
   host them.

## The flow, per assignment

```
teacher publishes zadanie on ttcmd (content lane, as always)
        │
student builds in their own repo, pushes          ← nothing new for them
        │
deadline (or any evening)
        │
teacher runs:  check <assignment-id>              ← one command, local
        │
  1. resolve repos     roster + naming convention → list of clone URLs
  2. fetch             clone --depth or pull, per student
  3. deterministic     build, hygiene, history checks → facts (JSON)
  4. AI review         claude -p, rubric-driven → short Polish feedback
  5. report            one Markdown file per group per run
        │
teacher reads the report, spot-checks, hands feedback back in class
grades happen offline, never in any repo
```

## Components (all in the private `course-checks` repo)

- **Roster** — one CSV per group: GitHub login, nothing else. **Logins
  only, never names** (data minimisation; the repo is private anyway, but
  the habit is the point). An `overrides.csv` maps the exceptions where a
  student's repo name differs from the convention.
- **Assignment definitions** — one folder per assignment:
  `assignments/<id>/` with `assignment.yaml` (expected repo name, deadline
  TO CONFIRM semantics, which checks apply) and `rubric.md` — what the task
  promised, in the words of the published zadanie. The rubric is the core
  of the AI prompt; writing it is writing the assignment's acceptance
  criteria, which is the course's own culture applied to grading.
- **Repo resolution by convention** — the course names projects (2b:
  `pierwsze-okno`), so a student's repo URL is derivable from
  `github.com/<login>/<repo-name>`. Overrides file catches reality.
- **Deterministic checks** (v0.1 set): repo reachable · clone/pull OK ·
  `dotnet build` succeeds · no `bin/`/`obj/` tracked · `.gitignore` present
  · ≥ N commits · commit messages non-trivial (heuristic: not `fix`,
  `update`, `zmiany`…) · last commit vs deadline. Each check returns a
  fact, not an opinion.
- **AI review** — per repo, bounded context (source files only, size cap):
  rubric + `git log --oneline` + the code. Output contract: 3–5 sentences
  **to the student, in Polish** (what works, what to look at, one question
  worth asking), one line **to the teacher**, and flags (`nie-buduje`,
  `rozjazd-z-zadaniem`, `podejrzanie-duzy-commit`…). No points, no marks,
  no ranking.
- **Reports** — `reports/<assignment>/<yyyy-mm-dd>-<group>.md`: a summary
  table (login, build, checks, commits, link, one-line AI note), details
  per student below it. Reports stay in the private repo.
- **Resumability and cost** — the run records the last-checked commit SHA
  per repo; unchanged repos are skipped, an interrupted run (rate limit,
  evening ends) continues where it stopped. Sequential, off-peak, model
  selectable per run.

## Stages

| Stage | What it adds | When |
| --- | --- | --- |
| **v0.1** | The batch: resolve → fetch → deterministic → AI → report. Teacher-only; students see nothing automatic | build now, pilot on Moduł 2's `pierwsze-okno` |
| v0.2 | A copyable `.github/workflows/check.yml` for student repos: build + hygiene on push, instant red/green for the student. Optional per assignment | when Moduł 3 builds start |
| v0.3 | Posting AI feedback back as an issue/comment in the student's repo — **teacher-approved per batch, never auto** | only if v0.1 reports prove worth forwarding |

## Privacy and boundary rules

- The `course-checks` repo is **private** and never linked from ttcmd.
- Logins only; no student names, e-mails, grades or attendance anywhere in
  git (the Article IV list applies to this repo as if it were public —
  private repos leak by being cloned).
- Student code goes to the model under the teacher's account. **TO CONFIRM
  with the school before the first real run** — same decision family as
  open decision #2 (accounts, consent, minors).
- Whether student repos are public or private-with-teacher-as-collaborator
  is the student's choice per 0c; the checker must handle both (private
  needs the collaborator invite — a one-line instruction in the zadanie).
- Deadlines, groups, the timetable: institutional facts, TO CONFIRM,
  config values — never hardcoded, never published (Article V).

## What this is not

Not a ttcmd feature (no slice, no schema field, no route). Not an
auto-grader. Not a plagiarism detector. Not a platform for students to log
into — students only ever see GitHub and, from v0.3 at the earliest, a
comment in their own repo.
