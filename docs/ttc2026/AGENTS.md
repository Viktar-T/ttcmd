# AGENTS.md — ttc2026

How to work in this repository. `constitution.md` outranks this file; if
they conflict, the constitution wins and this file is wrong. The contract
is deliberately the same as ttcmd's — one method, two repos.

## 1. Read order

1. `constitution.md` — always, first, in full.
2. The active slice: `specs/NNN-slug/spec.md`, then `plan.md`, then `tasks.md`.
3. Only what the current task needs. If no slice is active, ask for one —
   `roadmap.md` holds the queue.

## 2. The loop

```
spec  →  (Viktar approves)  →  plan  →  tasks  →  execute, one commit per task
```

- `spec.md` answers **what and why**, ends with acceptance criteria, and
  carries `## Decisions taken` (one line per decision, naming the rejected
  alternative). A filename or library in the spec has leaked from the plan.
- `plan.md` answers **how**. `tasks.md` is ordered and commit-sized; each
  task objectively checkable.
- **Two modes.** Supervised (default): write `spec.md` and stop; Viktar
  approves between stages. Autonomous (the prompt says so): all stages in
  one run — but `plan.md` is written **from a subagent whose only inputs
  are `constitution.md`, `AGENTS.md` and the slice's `spec.md`**, and the
  closing diff is reviewed by a second fresh-context subagent. Neither mode
  invents approval.

## 3. Verification

- A task closes on a check with visible evidence: the command and its
  output. The defaults are `npm run build` and the fixture `--dry-run`
  (Article VIII) once slice 001 lands.
- Never run the pipeline against real student repositories during
  development or review. Fixtures exist so that real repos are touched
  only by the teacher, on purpose.
- Before closing a slice: fresh-context subagent reviews the diff against
  the spec's acceptance criteria. A criterion needing a human eye stays
  unchecked and is named in the report.

## 4. Deciding, and when to ask

The default is to decide; record every decision in the spec. Escalate only:
anything touching **students, the school, or data leaving the machine**
(Article IV — including any new place student code or logins flow to);
anything **irreversible** or that costs money; anything that would
**contradict the constitution or an ADR** (that is Article X, never
yours); visual identity Viktar will have a taste about. Batch questions,
three at most.

## 5. Commits

One task, one commit: `NNN/TNN: imperative summary in English`. Lanes and
prefixes per Article IX. No `wip`, no squashing that erases the sequence.

## 6. You may not

- Implement anything with no approved spec slice.
- Edit `constitution.md` (Article X), or rewrite an approved spec to match
  what the code did — write a new slice instead.
- Add a dependency without an ADR line saying what it replaces and why.
- Put a student name, grade, or non-fake sample data anywhere (Article IV).
- Auto-post anything to a student repository (Article VII).
- Add a database, auth, deployment target, or telemetry (Article VIII).

## 7. Journal

`docs/journal.md` — factual notes on how the method behaved, appended the
same day something is skipped or goes sideways. Viktar's reflections are
his own; agents append facts under "Agent notes" only.
