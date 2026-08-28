@AGENTS.md

# CLAUDE.md — ttcmd

`AGENTS.md` is imported above and is the working contract.
**`constitution.md` outranks it** — read `constitution.md` in full before the
first task of a session.

## State of the repo

Deployed at **<https://ttcmd.vercel.app>**, rebuilt from `main` on every push.
The module → lesson pipeline works: MDX under `content/`, Zod-validated at
build time, routes rendering. The content is still placeholder — two example
modules, two example lessons. The commands below work.

## Commands

```bash
npm install
npm run dev      # localhost:3000
npm run build    # the check — fails on invalid lesson frontmatter
npm run lint
```

## Map

```
constitution.md         the rules that outlive every slice
AGENTS.md               how to work here
specs/NNN-slug/         spec.md · plan.md · tasks.md
docs/adr/               one decision per file, with rejected alternatives
docs/sdd-journal.md     Viktar's log of how the method actually behaved
docs/sources.md         what was read while designing this repo
```
