# ttcmd

Course web app — the source of lessons and tasks for a 4th-year **desktop and
mobile applications** course, from 2026-09-01.
<!-- TO CONFIRM: official PL course title, and whether to name the school here -->

Built with Spec-Driven Development, deliberately: the site is the first
deliverable, learning the method is the second. See
[`docs/adr/0001`](docs/adr/0001-sdd-by-hand-spec-kit-vocabulary.md).

## State

**Pre-scaffold.** There is no application yet — no `package.json`, no `app/`,
no `content/`. Slice `001-skeleton` creates it.

## Read this first

| File | What it is |
| --- | --- |
| [`constitution.md`](constitution.md) | the rules that outlive every slice — outranks everything else |
| [`AGENTS.md`](AGENTS.md) | how to work in this repo (agents and humans) |
| [`CLAUDE.md`](CLAUDE.md) | Claude Code entry point; imports `AGENTS.md` |
| `specs/NNN-slug/` | one slice: `spec.md` → `plan.md` → `tasks.md` |
| [`docs/adr/`](docs/adr/) | decisions, each with the alternatives rejected |
| [`docs/sources.md`](docs/sources.md) | what was read while designing the method, and what it changed |
| [`docs/sdd-journal.md`](docs/sdd-journal.md) | how the method actually behaved |

## Commands

Nothing to run yet. After slice `001`:

```bash
npm install
npm run dev      # localhost:3000
npm run build    # the check — fails on invalid lesson frontmatter
npm run lint
```

## Language

Student-facing content is **Polish**. Repo, specs, ADRs, code and commits are
**English**. Identifiers and slugs are ASCII, without Polish diacritics.
