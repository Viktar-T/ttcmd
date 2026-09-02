@AGENTS.md

# CLAUDE.md — ttc2026

`AGENTS.md` is imported above and is the working contract.
**`constitution.md` outranks it** — read it in full before the first task
of a session.

## State of the repo

Seed only — method files and docs, **no code yet**. Slice 001 (skeleton)
is the first prompt in `roadmap.md`. Until it lands there is nothing to
build or run; after it lands, update this section and the commands below in
the same slice.

## Commands (from slice 001 on)

```bash
npm install
npm run dev      # localhost UI — the tool itself
npm run build    # the default check
npm run lint
```

## Map

```
constitution.md        the rules that outlive every slice
AGENTS.md              how to work here
roadmap.md             slice queue and the prompts that run them
docs/architecture.md   what this tool is and how it works — read before any app slice
docs/adr/              one decision per file, with rejected alternatives
docs/journal.md        how the method actually behaved (created with slice 001)
specs/NNN-slug/        spec.md · plan.md · tasks.md
roster/ assignments/   data lane (CSV, YAML, rubric.md) — created by slices
state/ reports/        run state and generated reports (committed)
work/                  cloned student repos — gitignored, disposable
```
