# ttcmd

Course web app — the source of lessons and tasks for a 4th-year **desktop and
mobile applications** course, from 2026-09-01.
<!-- TO CONFIRM: official PL course title, and whether to name the school here -->

Built with Spec-Driven Development, deliberately: the site is the first
deliverable, learning the method is the second. See
[`docs/adr/0001`](docs/adr/0001-sdd-by-hand-spec-kit-vocabulary.md).

## Live

**<https://ttcmd.vercel.app>** — rebuilt from `main` on every push.

## State

**Deployed, placeholder content.** The module → lesson pipeline works end to
end: MDX under `content/`, frontmatter validated by Zod at build time, routes
rendering. What it carries is two example modules and two example lessons that
say so in their own text. Real course content is the next thing that matters —
see [`docs/roadmap.md`](docs/roadmap.md).

Slices so far: `001-skeleton` (the pipeline), `002-deploy` (the URL).

## Read this first

| File | What it is |
| --- | --- |
| [`constitution.md`](constitution.md) | the rules that outlive every slice — outranks everything else |
| [`AGENTS.md`](AGENTS.md) | how to work in this repo (agents and humans) |
| [`CLAUDE.md`](CLAUDE.md) | Claude Code entry point; imports `AGENTS.md` |
| `specs/NNN-slug/` | one slice: `spec.md` → `plan.md` → `tasks.md` |
| [`docs/how-to-run-a-slice.md`](docs/how-to-run-a-slice.md) | the operating manual — the session-by-session loop, with the prompts |
| [`docs/roadmap.md`](docs/roadmap.md) | what gets built next, and what forces it |
| [`docs/design-reference.md`](docs/design-reference.md) | the visual model, and what is deliberately not copied |
| [`docs/adr/`](docs/adr/) | decisions, each with the alternatives rejected |
| [`docs/sources.md`](docs/sources.md) | what was read while designing the method, and what it changed |
| [`docs/sdd-journal.md`](docs/sdd-journal.md) | how the method actually behaved |

## Commands

```bash
npm install
npm run dev      # localhost:3000
npm run build    # the check — fails on invalid lesson frontmatter
npm run lint
```

## Language

Student-facing content is **Polish**. Repo, specs, ADRs, code and commits are
**English**. Identifiers and slugs are ASCII, without Polish diacritics.
