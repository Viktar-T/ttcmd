# ttc2026 — assignment checking for the course

A local tool for one teacher: fetch each student's assignment repo from
GitHub, run deterministic checks (does it build, is the repo clean, does the
history make sense), ask Claude for short feedback against the assignment's
rubric, and show it all in a simple React web app running on the teacher's
machine. **Feedback, never grades.**

## What this folder is

The **seed of a separate, private repository**. It currently lives inside
`ttcmd/docs/ttc2026/` for drafting convenience only; ttcmd hosts no student
work and no backend, so the project moves out before any code exists.

No code is here yet, by design. The seed is the method: a constitution, the
working contract (`AGENTS.md`, `CLAUDE.md`), the architecture note, and a
roadmap whose first prompt builds slice 001.

## How to start the real repo

1. Create a new **private** GitHub repository (suggested name: `ttc2026`).
2. Copy the contents of this folder to its root; `git init` if needed,
   commit the seed as `chore: seed method files`.
3. Open Claude Code in the repo and paste, whole, the **Slice 001 prompt**
   from `roadmap.md`.
4. Review the run afterwards from the spec's `## Decisions taken` section
   and the final report — the loop is the same one ttcmd uses.

## Read order

`constitution.md` → `AGENTS.md` → `docs/architecture.md` (what we are
building and why) → `roadmap.md` (in what order).
