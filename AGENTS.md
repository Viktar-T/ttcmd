# AGENTS.md — ttcmd

How to work in this repository. Read this before touching anything.
`constitution.md` outranks this file; if they conflict, the constitution wins
and this file is wrong.

---

## 1. Read order

1. `constitution.md` — always, first, in full.
2. The **active slice**: `specs/NNN-slug/spec.md`, then `plan.md`, then `tasks.md`.
3. Only what the current task needs. Do not read the whole tree "for context".

If no slice is active, there is no work to do. Ask for one.

## 2. The loop

```
spec  →  (Viktar approves)  →  plan  →  tasks  →  execute, one commit per task
```

- **Propose the spec, then stop.** Do not write `plan.md` in the same turn as `spec.md`, and do not write code before the plan is approved. The pause is the method, not friction.
- **`spec.md` answers what and why**, ends with **acceptance criteria**, and carries a `## Decisions taken` section (§4). If a filename, a library or a component name appears in the *what*, it has leaked into the plan. Remove it.
- **`plan.md` answers how.** File map, libraries, order of work. It does not re-argue why the feature is wanted.
- **`tasks.md` is ordered and commit-sized.** Each task is objectively checkable — "the build fails on a lesson missing `title`" is a task; "improve the content pipeline" is not.
- **Execute one task at a time**, in order. Check the box when it is done *and verified*, never when it is merely written.

## 3. Verification

A task closes on a check, never on an opinion.

- Run the check and **show the evidence**: the command and its output. "Should work" is not a result.
- The default check is `npm run build`. It fails on frontmatter that breaks the Zod schema, so bad content and bad code surface the same way.
- **Before closing a slice**, review the diff against `spec.md` in a **fresh subagent context**: every acceptance criterion met, nothing outside the slice's scope touched. Report gaps that affect correctness or the criteria — not style preferences.
- If you cannot verify it, say so and stop. Do not check the box.

## 4. Deciding, and when to ask

**The default is to decide.** Viktar makes the general calls; you make the rest.
A spec session that asks fifteen questions has handed the work back.

**Decide yourself, without asking:**

- Anything the constitution, an ADR, or `docs/design-reference.md` already
  settles or clearly implies. Re-asking a settled question wastes the document.
- Every technical choice: libraries, file layout, component boundaries,
  implementation approach, naming, sizes, spacing, breakpoints, defaults.
- Anything reversible in one commit.
- Where a document is silent, choose the option most consistent with what the
  documents *do* say, and record why.

**Escalate — and only these:**

- **Irreversible or expensive to undo.** A URL, a numbering scheme, anything a
  student will bookmark or write down, anything published under Viktar's name.
- **About students, the school, or Viktar's name.** Disclosure, tone, what is
  said publicly, what the site claims.
- **Contradicts the constitution or an ADR**, or would need one amended. That is
  Article X and is never yours.
- **Visual identity** — a decision Viktar will have a taste about and has not
  already recorded.
- **Commits him to ongoing work**, or costs money.

When something clears that bar, batch the questions and ask with
`AskUserQuestion`. **Three at most.** If you have more, most of them are not
escalations.

**Record what you decided.** Every spec ends with a `## Decisions taken`
section: one line per decision, each naming the alternative you rejected. Viktar
reviews that list and vetoes what he disagrees with — which is faster for both
of you than answering questions one at a time, and leaves a record of what was
chosen rather than only what was built.

## 5. Commits

One task, one commit. Message format:

```
NNN/TNN: imperative summary in English

Optional body: what changed and why, one paragraph.
```

Example: `001/T04: add zod lesson frontmatter schema`

The commit log is how the loop stays legible after the fact (constitution,
Article II). No `wip`, no `fix stuff`, no squashing that erases the sequence.

## 6. Session hygiene

- **Context is not elastic.** A wide "let me first understand the project" read is how a session degrades. Read what the task needs.
- Investigate broad questions in a **subagent**, so the reading stays out of the main context and only the answer comes back.
- **Do not carry two unrelated tasks in one session.**
- **Ending a session:** `tasks.md` must match reality. Boxes checked for what is really done; for a half-finished task, one line under it saying what is done and what is next. That line is the handoff — the next session starts by reading it, not by re-deriving it.

## 7. You may

- Draft specs, plans, tasks, ADRs, and code for the active slice.
- Draft Polish lesson content in `content/` when a slice calls for it — Viktar rewrites anything student-facing before it is delivered.
- Propose amendments to `constitution.md`, as an ADR, for Viktar to accept or reject.
- Claim an ADR number **only after listing `docs/adr/`**. The number space is
  shared with Viktar and with other sessions working this repo, and two
  simultaneous sessions will both reach for the next free number. On a
  collision, the **later** file is renumbered, the rename is recorded in the
  file's own header, and commit messages that already name the old number are
  left alone — history is permanent (Article IV) and a visible mistake beats a
  tidy fiction (Article II).
- Append **factual** entries to `docs/sdd-journal.md` under "Agent notes" — what happened, what broke. The reflection sections of that file are Viktar's alone; never write in them.

## 8. You may not

- Implement anything that has no approved spec slice.
- Edit `constitution.md` — see Article X.
- Edit an approved `spec.md` or `plan.md` to match what the code ended up doing. Write a new slice instead.
- Edit `tasks.md` except to check a box or add a handoff line. New work means a new task, proposed, not silently inserted.
- Add a dependency without an ADR line saying what it replaces and why.
- Commit secrets, `.env`, student names, grades, rosters, or school-internal documents. The repo and the site are **public** — Article IV.
- Invent a timetable, class code, room, group name, or exam scope — Article V.
- Introduce `src/app`, a backend, auth, a database, or `output: 'export'` — Article VIII.

## 9. Language

Student-facing → **Polish**. Repo, specs, ADRs, code, commits → **English**.
Identifiers and slugs → ASCII, no Polish diacritics. Article III.

## 10. Next.js guardrail

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 11. Growing this file

This file is loaded on **every** request, so every line in it costs context on
every request — and an over-long rules file gets ignored in the middle. Before
adding a line, ask whether removing it would cause a mistake. If not, leave it out.

A **repeatable procedure** — how to add a lesson, how to add an MDX component —
does not belong here. It belongs in `.claude/skills/<name>/SKILL.md`, which is
loaded only when the task matches its `description`.

## 12. When you are unsure

Say so and stop. An unasked question that turns into an invented fact on a
public site is the most expensive mistake available in this repo.
