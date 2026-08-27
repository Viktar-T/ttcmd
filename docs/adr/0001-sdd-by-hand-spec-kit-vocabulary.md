# ADR-0001 — Run SDD by hand, in Spec Kit's vocabulary

- **Date:** 2026-08-27
- **Status:** accepted
- **Decision by:** Viktar

## Context

ttcmd is built with Spec-Driven Development, on a project small enough that SDD
is not strictly necessary. That is deliberate: the method is the second
deliverable (constitution, Article II). The tool is **Claude Code**, with the
strongest available models.

The ecosystem offers several ways to run SDD, surveyed in
`02-programming-with-ai/12-spec-driven-development.md` of the EvoCoders notes:

| Option | Shape |
| --- | --- |
| **GitHub Spec Kit** | CLI + slash commands, linear `constitution → specify → plan → tasks → implement → converge`, artifacts in `specs/` and `.specify/` |
| **Spec Workflow MCP** | the same loop delivered as an MCP server to a tool that has no native SDD |
| **Kiro Specs / Qoder Quest** | SDD baked into the IDE UX (`Requirements → Design → Implementation`) |
| **BMAD** | a simulated Agile team of role agents; aimed at large, distributed work |
| **OpenSpec** | proposals, changes and deltas archived back into a source spec |

## Decision

**Follow Spec Kit's vocabulary and artifact names, executed by hand.**

```
constitution.md
specs/NNN-slug/spec.md      what and why, ending in acceptance criteria
specs/NNN-slug/plan.md      how — stack and file map
specs/NNN-slug/tasks.md     ordered, commit-sized, checkable
docs/adr/NNNN-slug.md       decisions, with rejected alternatives
```

No Spec Kit CLI, no MCP server, no framework of any kind, for now.

## Why

1. **Learning the method, not a tool's UX.** Typing the artifacts by hand is the
   point. A CLI that generates a spec skeleton hides exactly the step worth
   feeling — deciding what belongs in the spec and what does not.
2. **The names are the standard.** Spec Kit's own guidance ("focus on the *what*
   and *why*, not the tech stack" for the spec; "your tech stack and architecture
   choices" for the plan) is the boundary this repo enforces. Using its filenames
   means adopting the CLI later is a `specify init`, not a migration.
3. **BMAD is the wrong scale.** A role-playing agent team for a static content
   site is theatre. One developer, one agent, one slice at a time.
4. **OpenSpec's archive-and-merge model** conflicts with append-only slices
   (Article IX). Slices as permanent history are worth more here than a single
   always-current spec, because the history is what the journal reflects on.
5. **No MCP dependency.** Claude Code needs no MCP server to read Markdown, and
   an unnecessary dependency is one more thing to be broken on a Monday.

## Consequences

- The discipline is unenforced. Nothing stops a spec from naming a file except
  attention — which is why leaks get logged in `docs/sdd-journal.md` rather than
  quietly fixed.
- Spec Kit's `converge` step (assess the codebase against the artifacts and
  append what is missing) has no automated equivalent. Its manual substitute is
  the fresh-context diff review required before a slice closes (`AGENTS.md` §3).
- If the by-hand loop proves too loose after two or three slices, adopting
  Spec Kit is cheap, precisely because the names already match. That would be a
  new ADR, not an edit to this one.
