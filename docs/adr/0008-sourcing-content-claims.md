# ADR-0008 — Claims about the world carry their source

- **Date:** 2026-08-28
- **Status:** **proposed** — an agent may propose an amendment, never adopt one (Article X). `constitution.md` is untouched until Viktar accepts this.
- **Amends:** `constitution.md`, Article V
- **Decision by:** Viktar — pending
- **Proposed by:** agent session, 2026-08-28

## Context

Article V says the timetable, class code, room, group names, roster and the
INF.03 / INF.04 exam scope are not settled and not this repo's to decide, and
that **"a plausible guess rendered on a public site is worse than a blank."**

That article is scoped to **institutional** facts — things that belong to the
school. It says nothing about facts that belong to the world.

This course is unusually dense in the second kind. Its subject is AI-assisted
development and cross-platform application frameworks, where almost every
concrete statement is a checkable fact with a short shelf life: what a tool
costs, what a free tier includes, what a benchmark measured, which framework
runs on which operating system, what a platform will require from next
September.

The evidence is already in the tree. `content-research/research-01` and
`research-02` contain, among many others:

- greenfield +30–40% vs brownfield 0–10% (Stanford, 2025)
- experienced developers 19% slower while estimating 20% faster (METR, 2025-07)
- .NET MAUI has no Linux support and no roadmap for it
- .NET 11 is STS, releasing 2026-11-10, supported to 2028-11-09
- a Google Play developer account is $25 one-time; the free limited account caps at 20 devices
- Android developer verification becomes required in four countries on 2026-09-30

Every one of those is true today, checkable today, and **several will be wrong
within a year.** Those files carry links and dates. A lesson written from them
would not, unless something requires it — and nothing currently does.

Three things make this likely rather than hypothetical:

1. **The lane's one human gate does not check this.** Article IX gives the
   content lane no process — *"none — write it"* — deliberately, and that stays.
   ADR-0004 does record a verification for it: `npm run build` plus **Viktar's
   Polish editorial pass**. But that pass is a *language* pass. Reading a sentence
   for good Polish does not reveal that the price in it changed in June.
2. **The build cannot help either.** Article VIII's Zod schema validates
   frontmatter. It cannot check whether a free tier still includes what a lesson
   says it does. Article IX's promise that content errors and code errors fail
   through the same gate holds for *malformed*; it cannot hold for *false*.
3. **The site is public, indexed and permanent.** The roadmap settled that the
   site is searchable, permanently, and Article IV records that git history is
   permanent. A wrong figure taught to thirty students and then indexed is the
   same class of mistake as an invented timetable. Only the owner of the fact
   differs.

`research-01` §6 states the underlying problem plainly: tool names in this field
rot in weeks, so the course must teach categories and date every list. That is a
research note. It has no force over `content/`.

## Decision

Extend Article V so that it covers both kinds of fact. Proposed text, to be
added under the existing Article V paragraphs:

> **Claims about the world carry their source.**
>
> A statement about what a tool does, what it costs, what a benchmark measured,
> what a standard or platform requires, or what the market does, carries a link
> to its source and the date it was checked. Where no source can be given, the
> claim is not made.
>
> **This binds claims, not explanations.** It applies to statements that could be
> checked and found false on a given date. It does not apply to explanations of
> concepts — what a variable is, how a loop works, why state does not belong in
> the UI. Those must be correct; they need no citation.
>
> **The date is part of the claim** and is visible to the reader, not hidden in a
> comment. A claim whose date is old is not wrong; it is a claim the reader knows
> to re-check.

The scope limit is not a softening. It is what makes the rule survivable: a rule
that demands a citation per sentence turns a lesson into a bibliography, gets
ignored within a week, and takes the useful half with it when it goes.

## Why this belongs in the constitution and not somewhere cheaper

`AGENTS.md` §10 sets the test: before adding a line to a file loaded on every
request, ask whether removing it would cause a mistake.

It would — and it is the mistake `AGENTS.md` §11 already names as the most
expensive one available in this repo: an unasked question turning into an
invented fact on a public site. That sentence is currently backed, in the
constitution, only by Article V's institutional half. This amendment extends the
backing to cover the facts this particular course is actually made of.

It also has to bind at the moment someone decides to type a number, which is
earlier than any on-demand file gets loaded. A style guide or an authoring skill
is read once writing is already under way; the decision to assert `$25` happens
before that.

## What it costs, honestly

- **Writing a lesson gets slower.** Every figure needs a link found and a date
  recorded.
- **Some claims get dropped** because no source can be found. That is the rule
  working, not the rule failing.
- **The content lane's "no process" becomes very slightly less true.** Accepted:
  the lane still has no spec, no plan and no approval gate. It gains one rule
  about what may be written, not a workflow.

## Consequences

- **The build does not enforce this.** `npm run build` validates frontmatter, not
  truth. Enforcement is by reading, and a violation is silent — which is exactly
  why the rule has to live in the file that is read every time rather than in one
  that is loaded on demand.
- **No schema change is required, and none is made.** A `sources` / `checked`
  frontmatter field would make the rule mechanically checkable and is worth
  considering later — but it is an application change, it needs its own spec
  slice, and requiring it here would mean this rule could not take effect until
  that slice shipped. The rule should be in force before the first lesson is
  written; the field can catch up.
- **Secondary and paywalled sources are allowed, and said so.** `research-02`
  already does this for INF.04: the source is named, and marked as secondary with
  the instruction to verify against CKE. That is the pattern.
- **`content-research/` already complies** and is the worked example. A lesson
  drawing on it inherits its links rather than inventing new ones.
- **Article V's institutional half is unchanged.** Nothing here weakens it, and
  the INF.04 scope specifically remains something the repo does not assert.

## Alternatives rejected

- **A second `constitution.md`, for content.** The two-file ranking works because
  there are exactly two: the constitution outranks `AGENTS.md`, and that sentence
  is written in both. A third file needs its own rung, and the first genuine
  conflict with Article VI would have to be adjudicated rather than read. Worse,
  a parallel constitution is not bound by Article X — so it is the one that drifts.
  Rejected on structure. The rules proposed for it were not the problem.
- **A style guide (`docs/content-style.md`) instead.** Right home for voice,
  length, and Polish/English technical vocabulary. Wrong home for this: loaded on
  demand, and this rule must bind before the writing starts.
- **An authoring skill instead.** Same objection, plus the roadmap's own timing:
  the skill is *"worth doing after roughly the third hand-written lesson, when the
  real procedure is known rather than guessed."* Zero lessons exist.
- **Requiring a citation for every statement.** Unreadable, unenforceable, and
  self-defeating — see the scope limit above.
- **A Zod-enforced `sources` field now.** Attractive, because it would make the
  rule checkable through the existing gate. Rejected for now: it is an app change
  requiring a slice, and it would delay a rule that costs nothing to state.
  Revisit once real lessons show what a source list actually needs to hold.
- **Doing nothing until content exists.** The first lesson is the one most likely
  to break the rule, and the cheapest moment to state it is before it is broken.

## Not decided here

Two content rules were proposed alongside this one and are deliberately left out,
recorded so they are not lost:

1. **"Do not repeat previous content; check existing lessons before writing."**
   A procedure with a step, not a principle — `AGENTS.md` §10 sends procedures to
   a skill. It also needs sharpening first: blunt non-repetition would forbid
   deliberate recall, which is one of the few teaching techniques that reliably
   works. The real rule is closer to *do not re-explain a concept as if it were
   new; do recall it, and say where it came from.*
2. **Voice, lesson length, Polish versus English technical vocabulary, and when a
   `Zadanie` earns its place.** A style guide, read while writing.

Both wait for the third hand-written lesson, per the roadmap. Guessing a
procedure before performing it three times is how the procedure comes out wrong.
