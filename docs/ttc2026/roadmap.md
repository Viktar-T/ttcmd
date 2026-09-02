# roadmap.md — ttc2026

What gets built, in what order, and what forces each step.

| | |
| --- | --- |
| Status | **Intention, not law.** Revised whenever reality disagrees |
| Binding? | No. `constitution.md` is law; an accepted `spec.md` is a commitment; this file is a plan |
| Scope | The tool. Rosters, rubrics and real assignment data are the data lane, not slices |
| Owner | Viktar |
| Last revised | 2026-09-01 — seeded with the queue for v0.1 |

---

## The rule that outranks everything else in this file

> **The course beats the tool.**
> ttc2026 is priority work only in the gaps. A week in which lessons went
> unwritten because the checker gained a feature is the failure mode. The
> tool earns its time by giving evenings back, starting from slice 004 —
> before that it is an investment, and investments are capped.

Standing commitment: **the tool advances at most one slice between real
teaching weeks' obligations being met** (lessons written, zadania
published, feedback delivered). Same logic as ttcmd's „content beats
features”, one level up.

## Where the checking actually starts paying

Slices 001–003 produce plumbing. Slice 004 is the first evening saved
(facts about sixty repos without opening them). Slice 005 is the second
(draft feedback to react to instead of writing from zero). Everything after
is comfort. If time runs short, 001–005 is the whole of v0.1 worth having.

## How to read the queue

Each entry gives its scope, what „done” looks like, and the prompt that
runs it. **These prompts are autonomous** (`AGENTS.md` §2): spec → plan →
tasks → implement → close in one run, with `plan.md` written from a
subagent that sees only the constitution, `AGENTS.md` and the spec, and a
fresh-context diff review at the end. You review afterwards from
`## Decisions taken` and the final report. Escalation bar: `AGENTS.md` §4.

A slice that cannot be specced, planned and executed in a few short
sessions is too big — split it.

---

## 001 — Skeleton

The Next.js app exists and proves the data axis end to end, with no
pipeline yet: config files are read, validated and rendered.

Scope: scaffold (App Router, TypeScript `strict`, ESLint; runs on Windows);
the data-lane file formats (`roster/*.csv`, `roster/overrides.csv`,
`assignments/<id>/assignment.yaml`, `assignments/<id>/rubric.md`) defined,
Zod-validated at load, populated with obviously fake fixtures (`student-01`…);
a Zadania page listing assignments and groups from those files, and a
Zadanie page listing the resolved repo name per login (convention +
overrides — pure derivation, no network); `docs/journal.md` created;
`CLAUDE.md` „State of the repo” updated.

**Done when** `npm run build` passes, an invalid roster or assignment file
fails the load visibly, and the Zadanie page shows the derived repo names
for the fixture roster — all without touching the network.

```
Read in full, in this order: constitution.md, AGENTS.md,
docs/architecture.md. Then come back here.

Slice 001-skeleton.

Scope: the Next.js skeleton and the data axis, no pipeline. Concretely:
- Scaffold: Next.js App Router at the repo root, TypeScript strict: true,
  ESLint, npm. It must run on Windows. Do not add any dependency beyond
  the scaffold plus zod, csv parsing and yaml parsing; each addition gets
  an ADR line (AGENTS.md §6).
- Data formats (Article VI), each Zod-validated at load with errors that
  name the file and field: roster/group-a.csv and roster/group-b.csv
  (header + three fake logins each), roster/overrides.csv (login,
  assignment_id, repo_name; header only), assignments/pierwsze-okno/
  assignment.yaml (id, repo_name, min_commits, deadline as an explicitly
  marked placeholder — Article V) and rubric.md (a short example rubric in
  Polish for a first Avalonia window app, clearly marked example).
- Resolution as a pure function: (login, assignment, overrides) -> repo
  name and github.com URL. Unit-test it or prove it on the page; no
  network calls anywhere in this slice.
- UI, legible but unstyled beyond defaults: a Zadania page listing
  assignments with their groups, and a Zadanie page showing one row per
  fixture login with the resolved repo URL.
- Create docs/journal.md (header + empty Agent notes section). Update
  CLAUDE.md's "State of the repo" and commands to match reality.

Out of scope: cloning, checks, AI, run state, reports, any styling pass,
GitHub Actions, anything touching the network.

Decide everything else yourself per AGENTS.md §4; ask nothing unless it
clears the escalation bar there.

Run this slice autonomously — AGENTS.md §2, "Two modes". Do not stop
between stages.

1. Write spec.md ending in acceptance criteria and a "Decisions taken"
   section — one line per decision, naming the rejected alternative.
2. Write plan.md from a subagent whose only inputs are constitution.md,
   AGENTS.md and this slice's spec.md. If it cannot plan from the spec
   alone, the spec is incomplete: fix the spec and say so in the report.
3. Write tasks.md.
4. Implement: one task, one check, one commit, in order — npm run build is
   the default check; show each command and its output.
5. Close with a fresh-context subagent review of the diff against the
   acceptance criteria. Fix what affects correctness; record the rest.

Commit each artifact separately. Do not write that I approved anything.
Stop only if something clears the escalation bar, or a check fails twice
and you do not know why. Finish with a report: what you built, decisions
taken, what you could not verify, what you left out.
```

## 002 — Fetch

`work/` fills with the fixture repos' clones; reachability is a fact.

Scope: shallow clone / pull per resolved repo into `work/`; local fixture
repos (one healthy, one broken several ways) created under `fixtures/` and
used as clone sources so the slice needs no network; per-repo outcome
recorded (reachable, cloned, pulled, unreachable — a result, never a
crash); the Zadanie page shows fetch status. **Done when** a full fetch of
the fixture roster runs offline and unreachable repos render as facts.

## 003 — Deterministic checks

The facts engine. Scope: the v0.1 check set from `docs/architecture.md`
(build via `dotnet build`, `bin/`/`obj/` tracked, `.gitignore`,
`min_commits`, trivial-message heuristic, deadline placeholder), each
returning `{name, status, evidence}`; results as JSON under `reports/`;
the Zadanie table becomes the real table (row per login, cell per check).
**Done when** the healthy fixture passes, the broken one fails exactly
where designed, and the table says so without the teacher opening a repo.

## 004 — Runs, state, resume

The button. Scope: a run as a first-class thing — started from the UI,
sequential, progress visible (Przebieg screen), interruptible; last-checked
SHA per (assignment, login) in `state/`; unchanged repos skipped; a re-run
continues where it stopped. **Done when** killing the process mid-run and
restarting loses nothing and repeats nothing.

## 005 — AI review

The feedback engine. Scope: `claude -p` headless, prompt assembled from
rubric + `git log --oneline` + capped source files; the Article VII output
contract (Polish paragraph to the student, English line to the teacher,
fixed-vocabulary flags) parsed and stored with the run; model and caps as
config; `--dry-run` mocks the CLI so fixtures stay free; Uczeń drill-down
page shows feedback and evidence. **Done when** the dry-run produces the
full report for both fixture repos with zero AI calls, and one real call
against a fixture proves the contract parses.

## 006 — Reports

The handout. Scope: per-group Markdown report generated from a run
(summary table + per-student details), written under `reports/`, stable
enough to commit; a „copy feedback” affordance per student in the UI.
**Done when** the Monday report is one click and one commit.

## 007 — Student-side Actions template (v0.2)

Optional per assignment: a copyable `.github/workflows/check.yml` giving
students instant build/hygiene red-green on push. Needs nothing from the
app; deferred until Moduł 3 builds start. **Not before** a teaching week
forces it.

---

## Not scheduled, and why

- **Posting feedback into student repos (v0.3)** — needs an ADR and a
  standing teacher-approval flow first (Article VII). The report + class
  conversation may make it unnecessary.
- **Plagiarism / similarity detection** — a different tool with different
  ethics; out of scope for ttc2026 entirely.
- **Anything multi-user, hosted, or student-facing** — Article I says no.
