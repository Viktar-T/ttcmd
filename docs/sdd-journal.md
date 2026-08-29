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

---

## Slice 004 — lesson typography

**Agent notes** *(factual, appended by agents)*

- **The approved `plan.md` said no dependency would be added and that
  `lib/content.ts` would not be touched. Both were wrong, and neither was
  discovered by looking for it.** While measuring T04's vertical rhythm, the
  prose column turned out to contain no `<table>` at all: MDX implements
  CommonMark, Markdown tables are a GFM extension, and the one table in the
  lessons had been rendering as a paragraph of pipe characters on the live site
  since the day it was written. `remark-gfm` was added and wired into both
  `compileMDX` calls (T06a, ADR-0009). The plan was **not** edited to match
  (AGENTS.md §8), and the task was suffixed `T06a` rather than renumbered so the
  insertion stays visible in the sequence. The lesson generalises: the spec, the
  plan and the tasks all said "the one table in the lessons", and none of the
  three had checked that it rendered.
- **The by-eye criteria could not be checked in the session that wrote them.**
  The Browser pane never composited frames, so every screenshot call timed out.
  `verification.md` was written listing seven criteria as **outstanding** with
  their measurements beside them rather than claiming them. Viktar supplied four
  screenshots from his own Chrome afterwards, which settled five and exposed
  three defects no measurement had caught: a 68px void under the lesson header,
  a header with three different left edges, and `/moduly` and `/` sitting at a
  different left margin from every other page because neither had been given the
  prose class — the plan named only `[module]/page.tsx`. Fixed in T12a.
- **A `git add -A` in T06a swept two untracked directories of Viktar's own
  research drafts into the commit.** Caught before any push; the commit was
  reset, the paths unstaged, and the same message re-committed with only the
  five intended files. Every later commit was scoped to a path.
- **The closing fresh-context review found exactly one surviving defect, and it
  was this file.** Four independent reviewers over the diff, every finding then
  put to an adversarial verifier told to refute it; one survived. ADR-0009 ended
  by saying the deviation was recorded "in `docs/sdd-journal.md`" — and it was
  not. The ADR was left alone and the entry written instead: Article II wants
  the record, not the retraction. The other findings were refuted against the
  documents, the most substantial being a claim that `overflow-x: auto` on code
  blocks breached the slice's own out-of-scope list; it did not, because
  `plan.md` had named that single exception, with its reasoning, eleven commits
  before the CSS was written.

## Slice 006 — navigation

**Agent notes** *(factual, appended by agents)*

- **Four defects in this slice were found by measuring left edges and widths;
  three of them looked entirely correct in a screenshot.** The page frame put
  the 1rem gutters back on the children as padding, which made the lesson header
  32px narrower than the prose below it and shifted its left edge by 16px —
  precisely the misalignment slice 004 closed in T12a, rebuilt from scratch
  eleven weeks later by someone who had read that fix. `margin-inline: auto` on
  a **grid item** suppresses `justify-self: stretch`, so the previous/next pair
  sized itself to its content and came out 186px wide on a phone beside 343px
  lesson rows. `.moduleGrid` reset `margin: 0` to kill a list's block margins
  and took the lane's auto inline margins with it, putting the module grid 56px
  left of the headline above it. And the current breadcrumb step rendered
  outlined with invisible text, because `[data-band] .chev` is (0,2,0) and a
  bare `.chevCurrent` is (0,1,0). The generalisable part: **a screenshot proves
  a layout is plausible, not that it is aligned.** The check that caught all
  four was printing the left edge of every page-level block and comparing the
  numbers.
- **The most valuable thing this slice built may be Check E**, which recomputes
  every contrast floor from `app/tokens.css` on every build. Three verification
  documents had those ratios worked out by hand — all true on the day they were
  written, none of which would have noticed a token being edited afterwards. It
  found nothing on the day it was written, which is the point.
- **The spec's own constraint turned out to forbid a fix the ADR it produced
  asks for.** ADR-0012 lists "a button's border" under `--rule-strong`; the
  theme control's border is still `--rule` at 1.47:1, and spec §7 says nothing
  slices 003 and 004 placed is restyled. Both are right, and they disagree. It
  is recorded in `verification.md` rather than fixed, because editing an
  approved spec to permit a fix is the thing AGENTS.md §8 forbids. A later slice
  resolves it in one line.
- **The content lane moved while the app lane was being verified, and that
  turned into the best evidence in the file.** Two lessons were written and
  module 1 was reordered — `vibe-coding-kontra-inzynieria` from `order: 3` to
  `order: 6` — with no application file touched. The whole navigation
  re-derived: `1a` to `1g`, the moved lesson now `1f`, the landing card *7
  lekcji* in the right plural form. ADR-0003's rule is not provable by a test
  that the same person writes; it is provable by somebody reordering content
  without telling you.
- **A review finding worth carrying forward:** nothing enforces that two lessons
  in one module have distinct `order`. Two lessons at `order: 1` both render
  `1a` — two pages with one spoken name, and no error anywhere. That is exactly
  the failure ADR-0003 exists to prevent, and slice 006 is the first to make the
  string visible on every page. The schema belongs to slice 001; the fix belongs
  to a slice that asks for it.

## Slice 007 — contents panel

**Agent notes** *(factual, appended by agents)*

- **Run autonomously end to end** — spec, plan, tasks, nine implementation
  commits, fresh-context review — with both of the mode's required subagents:
  the plan was written by a session whose only briefing was the constitution,
  AGENTS.md and the spec, and the closing diff was reviewed by another. The
  plan subagent surfaced one real spec ambiguity (the bottom-of-document rule
  against the followed-link rule) and resolved it with a pin that releases on
  the next real scroll; the spec was left as written and the gap recorded in
  the plan, which is the honest order.
- **The panel landed without moving the article by a pixel**, by replicating
  the frame's grid tracks in a full-bleed wrapper and hanging the panel in the
  left gutter track. The baseline was committed before any code (T04), which
  turned "the article does not move" from an intention into a diff of two
  measurements: 264.5/736 and 320.5/624, both times.
- **The instrument shaped one line of product code.** The driven browser pane
  runs hidden, and a hidden document suspends rendering steps — native scroll
  events and rAF with them. The harness dispatches the scroll event a visible
  browser fires itself; the one code change was a direct fallback in the spy
  when `document.hidden`, so an rAF that never fires is not the only path.
- **What the working tree taught:** Viktar's uncommitted content edits changed
  lesson count, letters and section titles between the committed tree and the
  build. Everything derived — ids, letters, the panel — simply followed, which
  is ADR-0003 doing its job; the verification records working-tree counts.
- **Carried forward, not fixed:** the transliteration map is NFC-only (an NFD
  heading would mint a mangled slug rather than fail); the layout wrapper's
  tracks are a verbatim copy of the frame's and a future frame edit would
  silently diverge them; nothing yet enforces distinct `order` per module
  (already in 006's notes). The untracked `_to_delete/` leftovers had begun
  failing the build's type-check and were deleted per the roadmap's own
  housekeeping note.
