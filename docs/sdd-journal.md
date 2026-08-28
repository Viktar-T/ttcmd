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

---

## Slice 002 — deploy

**Agent notes** *(factual, appended by agents)*

- **The live 404 was never a hosting problem, and then it was.** `origin/main`
  held only `C0` — six markdown files, no `package.json`. All eight of slice
  001's commits were local, so Vercel had been building a repository with no
  application in it. Pushing fixed that and did **not** fix the site: the
  deployment then failed with `No Output Directory named "public" found after
  the Build completed`, which is what Vercel does when the Framework Preset is
  `Other`. The preset had been fixed at import time, against the empty repo,
  and no later push could change it. Two independent causes, the second hidden
  behind the first. Viktar re-imported the project rather than setting the
  preset by hand, which is what let criterion 2 ("detected, not overridden") be
  met as written instead of recorded as a deviation.
- **The plan named its blocking decision in its first section, and that
  section is what made the slice cheap.** `plan.md` opened by refusing to
  execute: the spec required a no-index posture, Article IV asserted the site
  was indexed, and an agent may not amend the constitution. The whole question
  was answered in one sentence — "it can be indexed right now, it is not
  important" — which deleted three implementation layers, two acceptance
  criteria, a constitutional amendment, and a file that was going to be added
  to `app/`. Written as a task instead of a question, it would have been built
  first and discussed afterwards.
- **A rejected ADR was still worth writing.** ADR-0006 records why
  `Disallow: /` does not keep a page out of an index — it forbids the fetch, so
  the crawler never reads the `noindex` — which is the mistake the slice would
  otherwise have made if the decision had gone the other way. It is kept in the
  tree at Status `rejected`.
- **ADR number collision: this slice filed ADR-0003; so did parallel work.**
  Two files claimed 0003, and the constitution had been amended to cite the
  other one (Article VI). This slice's ADR was renumbered to 0006. The cause is
  structural rather than careless: the number was picked from `ls docs/adr/`,
  which answers "what exists on disk now", not "what number is free" — and a
  session cannot see ADRs being written in another one. The slice's commit
  messages still say ADR-0003 and were left alone (Article II).
- **`git status` is part of a slice's context, not a formality.** The review
  caught that `docs/roadmap.md` had unrelated in-flight edits, so the roadmap
  was left untouched even though its "Where we are" section still reads *"Not
  deployed"* and its own closing rule says to revise it when a slice closes.
  That correction is outstanding and belongs to whoever owns those edits.
- **Two verification checks in `tasks.md` were written before it was known
  whether they could be run.** T08's "the live homepage serves the updated
  content" cannot be satisfied by a commit that touches only `README.md`, and a
  build-id comparison does not exist on a Next.js build serving content-hashed
  immutable chunks. The substitute — GitHub's commit-status API showing a
  Vercel deployment per pushed commit — is stronger, but the lesson is that a
  check can be objectively phrased and still be unrunnable against the artefact
  it names.
- **A deliberate formatting choice was silently undone by the renderer.**
  Striking criteria 6 and 12 by leaving numeric *gaps* was meant to keep
  `plan.md`'s citations stable. CommonMark renumbers ordered lists
  sequentially, so on GitHub every criterion below 6 shifted by one and every
  citation pointed at the wrong item — correct in the source, wrong in every
  rendered view. They are now struck placeholders instead. Caught by the
  fresh-context review, not by the author.
- Slice closed after that review, which found all ten live acceptance criteria
  met, one non-documentation file in the entire diff (`package-lock.json`,
  transitive dev/optional drift only), and no constitutional violation.
  Criterion 9's second half — the vault's `ttcmd.md` **Remote** row — is
  outside this repo and remains open.
