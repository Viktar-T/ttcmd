# sdd-journal.md

> **Doctrine: capture what no agent could rebuild.**
> The specs, the plans, the commits and the code are all reconstructible from
> this repo. What the loop *felt like* is not. That is the only thing this file
> is for — and it is what will actually shape how SDD gets taught later.
>
> Honesty beats tidiness. A slice that went badly is the more useful entry.
> Below is a **menu, not a form** — delete any line you did not use.

Owner: Viktar. Agents append facts under **Agent notes** only, and never write
in the reflection sections.

---

## Entry template

### Slice NNN — <name> · <date>

**Expected vs actual**
- What I thought this slice would take:
- What it actually took (time, turns, retries):

**Where the loop bent**
- Spec leaked into plan (what I wrote that named a file):
- Plan re-argued the why:
- A task I couldn't objectively check off:
- Where I skipped the pause and let it code too early:

**Where the agent went wrong**
- Ignored the constitution at:
- Invented something (fact, API, file):
- Did more than the task asked:
- Needed a rule that doesn't exist yet →

**What the spec bought me**
- A rework it prevented:
- A rework it did NOT prevent:
- Would a plain prompt have been faster here? Honestly:

**What this changes about teaching it**
- What I understand about SDD now that I didn't before this slice:
- The part students will find hardest — and why I now think so:
- What I'd tell them explicitly NOT to do:

**Known failure patterns — did any of these happen?**
<!-- From Claude Code best practices. Tick only what actually occurred. -->
- [ ] Kitchen sink session — unrelated tasks in one context
- [ ] Corrected the same thing more than twice instead of clearing and rewriting the prompt
- [ ] Rules file too long, and a rule got ignored
- [ ] Trust-then-verify gap — accepted something plausible without a check
- [ ] Infinite exploration — an unscoped "investigate this" that ate the context
- What I'll do differently next slice because of the ticks above:

**Agent notes** *(factual, appended by agents)*
- 

---

<!-- Newest entry at the top of the log below. -->

## Log

### Slice 001 — Skeleton · 2026-08-27

**Expected vs actual**
- What I thought this slice would take:
- What it actually took (time, turns, retries):

**Where the loop bent**
- Spec leaked into plan (what I wrote that named a file):
- Plan re-argued the why:
- A task I couldn't objectively check off:
- Where I skipped the pause and let it code too early:

**Where the agent went wrong**
- Ignored the constitution at:
- Invented something (fact, API, file):
- Did more than the task asked:
- Needed a rule that doesn't exist yet →

**What the spec bought me**
- A rework it prevented:
- A rework it did NOT prevent:
- Would a plain prompt have been faster here? Honestly:

**What this changes about teaching it**
- What I understand about SDD now that I didn't before this slice:
- The part students will find hardest — and why I now think so:
- What I'd tell them explicitly NOT to do:

**Known failure patterns — did any of these happen?**
- [ ] Kitchen sink session — unrelated tasks in one context
- [ ] Corrected the same thing more than twice instead of clearing and rewriting the prompt
- [ ] Rules file too long, and a rule got ignored
- [ ] Trust-then-verify gap — accepted something plausible without a check
- [ ] Infinite exploration — an unscoped "investigate this" that ate the context
- What I'll do differently next slice because of the ticks above:

**Agent notes** *(factual, appended by agents)*
- A stale, 0-byte `.git/index.lock` from before this session was blocking `git add`; no live git process was holding it (checked via `tasklist`), so it was removed before staging T01.
- The Next.js version installed for this slice (16.3.3) auto-manages a block in `AGENTS.md` between `<!-- BEGIN:nextjs-agent-rules -->` / `<!-- END:nextjs-agent-rules -->` markers, rewritten on `next dev`/`next build` to match the installed version's guardrail wording. The markers already existed in `AGENTS.md` §9 before this slice; running the dev server during T05's verification refreshed the inner text (same substance, updated wording) and it was committed with T05 rather than reverted, per the tool's own note that removing it just re-creates the uncommitted diff.
- `create-next-app@latest` (run in a scratch dir only, to inspect current-version scaffold conventions — never against the real repo) also defaults to generating its own `AGENTS.md` and `CLAUDE.md`; this was noted so the real repo's versions were never overwritten.
- ADR-0002 (MDX pipeline: `next-mdx-remote` over `@next/mdx`, Contentlayer, Velite, hand-rolled) was drafted during planning, before any code, since the constitution requires a dependency addition to carry an ADR line.
- Slice closed after a fresh-context subagent review (AGENTS.md §3) found all 13 acceptance criteria in `spec.md` met, confirmed live via its own `npm install`/`build`/`lint`/`dev` run and a browser click-through, and found no scope creep against the spec's "Out of scope" list.
