# Research 06 — Specification instead of vibes: what SDD is, where it came from, what it is worth

| | |
| --- | --- |
| Written | 2026-09-02 |
| For | Course structure v2.3, **Moduł 4 — Specyfikacja zamiast wibracji** (`course-structure-v2.md`) |
| Status | **Research notes.** Not course content, not law. Repo-facing English (Article III). Every claim carries a link and a date; a lesson that uses one inherits both (ADR-0008) |
| Question asked | What is spec-driven development in September 2026, where did its parts come from, what evidence exists that it helps, what do its critics say — and what does that force in a module taught to students who have three vibed desktop builds behind them? |
| Extends | `research-01` §4, which gave SDD one page and a tool table dated August 2026. This file replaces that table and adds the anatomy, the older roots, the evidence and the critique |
| Feeds | `docs/content-briefs/04-*.md`; the lessons under `content/moduly/04-specyfikacja/` |

> Everything here is dated. Tool names rot in weeks (`research-01` §6); the four-stage loop
> and the older ideas it is made of — requirements that say *what*, criteria written as
> *when X then Y*, decisions recorded with their rejected alternatives — have held for
> fifteen to forty years and are what the lessons should be built on.

---

## 0. The honest summary for the module

1. **The loop is older than the tools.** Every 2025–26 "SDD framework" is the same four
   stages — *specify → plan → tasks → implement, then check against acceptance criteria* —
   wrapped differently. The stages are made of ideas with dates: Brooks's "deciding what to
   build is the hardest part" (1987), user stories and *Given/When/Then* (North, 2006),
   EARS requirement templates (Mavin, 2009), architecture decision records (Nygard, 2011),
   INVEST/SMART sizing (Wake, 2003). Teach the loop and its parts; name the tools as a
   dated table.
2. **What changed in 2025 is why the loop matters now.** When an agent can execute a long
   chain of edits unattended, the expensive mistake stops being a wrong line and becomes a
   wrong direction pursued for an hour — and the chat that held the intent dies with the
   session (Singh, Kiro: *"they have absolutely no idea what prompts led to that. It's
   gone"*; Google's Conductor: *"impermanent chat logs"*).
3. **Evidence that clearer specs produce more correct code exists and is measurable**, but
   on small tasks and 2025 models: 20–40% fewer correct solutions when the task description
   is ambiguous, incomplete or contradictory, and the share of code that *runs but is wrong*
   rises from a quarter to a half or more (Larbi et al., July 2025). There is, as of this
   date, **no controlled study of SDD-as-a-method against vibe coding on real projects**.
   Say so in the lesson; do not oversell.
4. **The serious critique is real and belongs in the module**: Böckeler (Thoughtworks,
   October 2025) — the tools generate more Markdown than a human wants to review, they can
   be "a sledgehammer to crack a nut" on small problems, and *spec-as-source* risks the
   failure modes of model-driven development. Anthropic's own guidance agrees on scale: *"If
   you could describe the diff in one sentence, skip the plan."* The module's answer is a
   size rule, not a defence.
5. **For this class, the loop is run by hand, on a rebuild of their own notatnik.** No
   install (Spec Kit needs Python and `uv`, neither on the lab list), no vendor UI, one
   Markdown folder per feature, one commit per task. The class editors already carry half
   the loop — Cursor's *Plan Mode*, Antigravity's *Implementation Plan* artefact — and 4d
   shows them as wrappers around the thing the students just did by hand.

---

## 1. Where it came from

### 1.1 The lineage, and the 2025 turn

`research-01` §4.1 gave the unglamorous lineage — `README` → `TASK.md` / `CHECKLIST.md` →
rules and conventions for agents → ADRs → `spec.md` — and it holds. The students have walked
the first steps themselves: a README and a rules file (`AGENTS.md`, 3c), a verification
journal (3d), a `DECISIONS.md` that the demo prompt of 1d demanded of the agent. The step
this module adds is the one artefact none of those is: a written statement of **what the
program is supposed to do, checkable before and after the code exists.**

The term *spec-driven development* is old in the narrow sense — contract-first API work
with OpenAPI and its relatives has been "spec-first" for a decade — and Wikipedia traces the
phrase to a 2004 paper synthesising TDD and design-by-contract
([Ostroff, Makalsky, Paige, 2004](https://www.researchgate.net/publication/221592745), via
[Wikipedia, checked 2026-09-02](https://en.wikipedia.org/wiki/Spec-driven_development)).
What happened in 2025 is that the phrase was picked up, within five months, by the three
largest tool vendors in the field, each shipping a *workflow* rather than a format:

| Date | Event | Source |
| --- | --- | --- |
| 14.07.2025 | **Kiro** (AWS) preview: an IDE with *specs* — `requirements.md`, `design.md`, `tasks.md` — as a first-class mode beside "vibe" | [Introducing Kiro, 14.07.2025](https://kiro.dev/blog/introducing-kiro/); [Kiro GA post, 17.11.2025](https://kiro.dev/blog/general-availability/); [GeekWire, 17.11.2025](https://www.geekwire.com/2025/amazons-surprise-indie-hit-kiro-launches-broadly-in-bid-to-reshape-ai-powered-software-development/) |
| 02.09.2025 | **GitHub Spec Kit** open-sourced: a CLI that installs the loop as slash commands into any coding agent; the launch post by Den Delimarsky | [GitHub blog](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) |
| 23.09.2025 | **Tessl** launches a spec framework (closed beta) and a registry of "more than 10,000 pre-built specs" for libraries | [Tessl blog](https://tessl.io/blog/tessl-launches-spec-driven-framework-and-registry) |
| 15.10.2025 | **Böckeler** (Thoughtworks) publishes the first serious taxonomy and critique: spec-first / spec-anchored / spec-as-source | [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) |
| 17.11.2025 | Kiro generally available; "more than 250,000 developers" in the three-month preview | GeekWire, above |
| 17.12.2025 | **Conductor** (Google, for Gemini CLI): the same loop under the name *context-driven development* | [Google Developers Blog](https://developers.googleblog.com/conductor-introducing-context-driven-development-for-gemini-cli/) |

Two sentences from that period carry the *why* better than any definition and are worth a
student's attention:

> "The internet is full of prototypes built with AI … if a developer returns two months
> later, or hands it to a teammate, they have absolutely no idea what prompts led to that.
> It's gone."
> — Deepak Singh (AWS), quoted by [GeekWire, 17.11.2025](https://www.geekwire.com/2025/amazons-surprise-indie-hit-kiro-launches-broadly-in-bid-to-reshape-ai-powered-software-development/)

> "They're exceptional at pattern completion, but not at mind reading."
> — Den Delimarsky (GitHub), [02.09.2025](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/), on why vague prompts force a model to guess among unstated requirements

The first is the students' own situation by week 8: three repositories, none of which says
anywhere what the application was supposed to do — the seven rules of the minutnik went
into a thread that is gone. The second is 3d's hallucination lesson seen from the other
side: the model does not stop to ask, it completes.

### 1.2 What the tool makers say it is

- Spec Kit's methodology document calls it a **"power inversion"**: *"Specifications don't
  serve code — code serves specifications."* The spec is *"the primary artifact. Code
  becomes its expression in a particular language and framework."*
  ([spec-driven.md, checked 2026-09-02](https://github.com/github/spec-kit/blob/main/spec-driven.md))
- Delimarsky, same month: *"We're moving from 'code is the source of truth' to 'intent is
  the source of truth.'"* The spec is *"a living artifact that evolves as you learn more
  about your users."* ([GitHub blog, 02.09.2025](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/))
- Conductor: shift *"the context of your project out of the chat window and directly into
  your codebase"*; specs and plans *"live alongside your code in persistent Markdown
  files"*. ([Google, 17.12.2025](https://developers.googleblog.com/conductor-introducing-context-driven-development-for-gemini-cli/))
- Tessl's Podjarny: *"Spec-driven development gives agents the information they need about
  both what and how you want them to build."* ([Tessl, 23.09.2025](https://tessl.io/blog/tessl-launches-spec-driven-framework-and-registry))

The rhetoric ("executable specifications", "intent is the source of truth") should **not**
reach students as fact. What reaches them is the mechanism: a file that says what the
program must do, written before the code, kept next to it, and checked against the result.

### 1.3 Böckeler's three levels — the taxonomy the module should use

Birgitta Böckeler, [15.10.2025](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html), after trying Kiro, Spec Kit and Tessl:

1. **Spec-first** — *"A well thought-out spec is written first, and then used in the
   AI-assisted development workflow for the task at hand."*
2. **Spec-anchored** — *"The spec is kept even after the task is complete, to continue using
   it for evolution and maintenance of the respective feature."*
3. **Spec-as-source** — *"The spec is the main source file over time, and only the spec is
   edited by the human, the human never touches the code."*

*"All SDD approaches and definitions I've found are spec-first, but not all strive to be
spec-anchored or spec-as-source."* Kiro, in her reading, is spec-first (the spec is for the
task); Spec Kit aspires to anchored; Tessl explicitly pursues as-source, marking generated
files `// GENERATED FROM SPEC - DO NOT EDIT`.

**For the module:** the students do level 1 in full and level 2 in one honest way — the
spec stays in the repository, and when the notatnik changes later, the spec is edited first.
Level 3 is described as a bet some companies are making, not as the goal; Böckeler's own
warning (§4.3) is the reason.

---

## 2. The anatomy of the loop

### 2.1 The four stages and what each one answers

Every implementation in §3 has these stages, whatever it calls them:

```
constitution   →   spec.md   →   plan.md   →   tasks.md   →   implement   →   check
(rules that      WHAT and WHY  HOW: files,  ordered,        one task,        every
 outlive every    + acceptance  libraries,   commit-sized,   one commit       criterion
 feature)         criteria      order        checkable                        demonstrated
```

| Artefact | The question it answers | What must **not** be in it | The failure when it leaks |
| --- | --- | --- | --- |
| Constitution | What is always true of this project, whatever the feature | Anything about one feature | A rule that applies to one slice is a spec sentence, not a principle |
| `spec.md` | What the program does, for whom, what it never does, and how we will know | A file name, a library, a component, a class — the *how* | Spec Kit's template: *"Focus on WHAT users need and WHY … avoid HOW to implement"*; the ttcmd constitution's Article IX: *"A spec that names a file has leaked into the plan"* |
| `plan.md` | How: files, libraries, order of work | Re-arguing why the feature is wanted | A plan that re-litigates the why has no stable target to hit |
| `tasks.md` | The ordered, small, objectively checkable steps | A step whose completion is an opinion | *"A task that cannot be objectively checked off is not a task yet"* (Article IX) |
| The check | Did the result meet the criteria — with evidence | "Looks correct" | Anthropic: *"Have Claude show evidence rather than asserting success"* |

Sources for the *what vs how* boundary: Spec Kit's
[spec-template.md](https://raw.githubusercontent.com/github/spec-kit/main/templates/spec-template.md)
(User Scenarios & Testing → Requirements → Success Criteria → Assumptions, with the
instruction that success criteria be *"technology-agnostic and measurable"*) and
[plan-template.md](https://raw.githubusercontent.com/github/spec-kit/main/templates/plan-template.md)
(Technical Context: language, dependencies, storage, testing, target platform; a
*"Constitution Check"* gate; the project's file structure), both checked 2026-09-02.

**One honest tension to put in front of students.** Anthropic's Claude Code guidance
(checked 2026-09-02) says *"The most useful specs are self-contained: they name the files and
interfaces involved, state what is out of scope, and end with an end-to-end verification
step"* — i.e. it lets the *how* into the spec — while Spec Kit's template forbids exactly
that. Both are right about something: Anthropic is describing a spec written for one agent
in one session; Spec Kit is describing a spec that must survive a change of stack or tool.
The course draws the line where the constitution does (files go in the plan), and gives the
reason the students can test: **a spec that a fresh session can plan from, without having
seen the conversation that produced it, is a spec; one that cannot is notes.** That test is
also AGENTS.md §2's autonomous-mode rule, applied to their own work.

### 2.2 Acceptance criteria — three tools, three notations, one sentence shape

The part that makes a spec a spec is the list of observable conditions under which it is
done. Three tools write them three ways, and the shape is the same:

| Tool | Notation | Example from the tool's own docs | Origin of the notation |
| --- | --- | --- | --- |
| Spec Kit | *Given* [state], *When* [action], *Then* [outcome] | template: *"**Given** [initial state], **When** [action], **Then** [expected outcome]"* | Dan North, *Introducing BDD*, [Better Software, March 2006](https://dannorth.net/blog/introducing-bdd/): *"Given some initial context (the givens), When an event occurs, Then ensure some outcomes"* — and the story template *"As a [X] I want [Y] so that [Z]"* |
| Kiro | EARS: *WHEN* [event] *THE SYSTEM SHALL* [response] | *"WHEN a user submits a form with invalid data THE SYSTEM SHALL display validation errors next to the relevant fields"* ([Kiro docs](https://kiro.dev/docs/specs/concepts/)) | Alistair Mavin and colleagues, Rolls-Royce, 2009, writing requirements for jet-engine control software; six patterns — ubiquitous, *While*, *When*, *Where*, *If … then*, complex ([alistairmavin.com/ears](https://alistairmavin.com/ears/)); used by Airbus, Bosch, NASA, Siemens |
| OpenSpec | `### Requirement` … *The app SHALL* … `#### Scenario:` *WHEN* … *THEN* … | *"WHEN the user clicks the theme toggle THEN the app switches to dark mode and persists the choice"* ([README](https://github.com/Fission-AI/OpenSpec)) | the same two, merged |

The common shape — **a situation, an action, a checkable outcome** — is what students should
learn; the Polish form the lessons use is *„Kiedy …, to …”* with an explicit *„po czym
poznam”*. EARS's origin is worth one sentence in the lesson because it answers "is this a
fad": the same sentence pattern was designed for software where a vague requirement is a
safety problem, sixteen years before any coding agent.

Kiro's own list of what the notation buys — *clarity, testability, traceability,
completeness* ([docs](https://kiro.dev/docs/specs/concepts/)) — is the list of things the
students' three builds lacked.

### 2.3 Marking what you do not know: `[NEEDS CLARIFICATION]`

Spec Kit's templates *"mandate marking ambiguities rather than making plausible
assumptions"*, and a checklist verifies *"No [NEEDS CLARIFICATION] markers remain"* before
planning ([spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)).
This is the same move as 1d's demo prompt (*"record the decision in DECISIONS.md … each
naming the alternative you rejected"*) and 3b's meta-prompt round (*"wypisz, czego w niej
brakuje"*), now inside the artefact: a spec is allowed to contain open questions, and is not
allowed to hide them. Anthropic's guidance for larger features is the same idea run as a
dialogue — *"have Claude interview you … then write a complete spec to SPEC.md"*, then
*"start a fresh session to execute it"* ([best practices, checked 2026-09-02](https://code.claude.com/docs/en/best-practices)).

### 2.4 Tasks: small and checkable

Bill Wake, [August 2003](https://xp123.com/invest-in-good-stories-and-smart-tasks/): stories
should be **INVEST** — Independent, Negotiable, Valuable, Estimable, Small, Testable
(*"I understand what I want well enough that I could write a test for it"*) — and tasks
**SMART** — Specific, Measurable (*"team agrees on what 'done' means"*), Achievable,
Relevant, Time-boxed. Spec Kit's tasks template adds the agent-era conventions: numbered
tasks, `[P]` for tasks that can run in parallel, grouping by user story so that *"each story
can be implemented independently, tested independently, delivered as an MVP increment"*
([tasks-template.md](https://raw.githubusercontent.com/github/spec-kit/main/templates/tasks-template.md)).

The course's version is stricter and simpler: one task, one commit, task ID in the message,
and a task closes on a check the student can show (Article IX). 2d's *one task, one commit*
habit is the thing this formalises.

### 2.5 Decisions: the ADR

Michael Nygard, [15.11.2011](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions):
*"One of the hardest things to track during the life of a project is the motivation behind
certain decisions."* Someone who meets a decision without its reasons either accepts it
blindly or reverses it blindly. The record: **title, context, decision, status,
consequences** — *"one or two pages long"*, because *"Large documents are never kept up to
date. Small, modular documents have at least a chance"*; numbered, never deleted, superseded
rather than edited.

Students have already seen the miniature: `DECISIONS.md` in 1d, *"one line per decision,
each naming the alternative you rejected"*. 4b introduces the full form at the smallest
useful size (a paragraph), and 5b will have them write their first real one (whether to stay
on the training stack).

### 2.6 The oldest root: deciding what to build

Fred Brooks, *No Silver Bullet*, [IEEE Computer, April 1987](https://www.cgl.ucsf.edu/Outreach/pc204/NoSilverBullet.html):

> "The hardest single part of building a software system is deciding precisely what to
> build. No other part of the conceptual work is as difficult as establishing the detailed
> technical requirements … No other part of the work so cripples the resulting system if
> done wrong."

and, on the customer: *"The client does not know what he wants … he has almost never thought
of the problem in the detail necessary for specification."* The students are the client of
their own notatnik. This is the frame for 4a: agents made the typing cheap and left the
hard part exactly where Brooks put it.

---

## 3. The tools, as of 2026-09-02

| Tool | Maker · first public | Shape | Its names for the four stages | Where the spec lives afterwards | Would it fit the lab? |
| --- | --- | --- | --- | --- | --- |
| [**Spec Kit**](https://github.com/github/spec-kit) | GitHub · 02.09.2025 | CLI (`specify`) that installs slash commands into *"30+"* agents; MIT; ~128k stars | `/speckit.constitution` → `/speckit.specify` → `/speckit.plan` → `/speckit.tasks` → `/speckit.implement`; optional `/speckit.clarify`, `/speckit.analyze`, `/speckit.checklist`, `/speckit.converge` | `specs/NNN-feature/` in the repo; aspires to spec-anchored | Needs Python + `uv` — **not on the lab list**; the templates are readable on GitHub without installing, which is what 4d uses |
| [**Kiro**](https://kiro.dev/docs/specs/) | AWS · preview 14.07.2025, GA 17.11.2025 | Its own IDE (a VS Code fork) + CLI; specs built into the UI | Requirements (EARS) → Design → Tasks, with a *Start task* button; "Quick Spec" skips the approval gates | `.kiro/specs/<feature>/`; steering files `product.md`, `tech.md`, `structure.md`; spec-first in practice | A third editor and its own account — **no**; the most legible *screenshots* of the loop for a projector |
| [**OpenSpec**](https://github.com/Fission-AI/OpenSpec) | Fission AI · first npm release 0.1.0 on 06.09.2025 ([registry](https://www.npmjs.com/package/@fission-ai/openspec)) | Lightweight CLI + slash commands, *"30+ tools"*; MIT; ~67k stars | `/opsx:explore` → `/opsx:propose` → `/opsx:apply` → `/opsx:archive` | `openspec/specs/` (the truth) + `openspec/changes/` (deltas) + `archive/`; explicitly spec-anchored: a change is merged back into the spec | Node install; possible but adds a tool the week the loop should be visible by hand |
| [**Spec Workflow MCP**](https://github.com/Pimzino/spec-workflow-mcp) | Pimzino · 2025 | An MCP server; a web dashboard with approval gates; GPL-3.0; ~4k stars | Requirements → Design → Tasks → Implementation | `.spec-workflow/` with steering docs | The route for an editor with no native loop — but the maintainer notes a *"temporary break"*; **too fragile to teach** |
| [**Conductor**](https://developers.googleblog.com/conductor-introducing-context-driven-development-for-gemini-cli/) | Google · 17.12.2025 | Gemini CLI extension; *"context-driven development"* | `/conductor:setup` (product, tech, workflow) → `/conductor:newTrack` (spec + plan) → `/conductor:implement` | Markdown next to the code, committed; state survives a closed session | Gemini CLI is not a class tool; the *idea* — context out of the chat, into the repo — is the module's thesis |
| [**Tessl**](https://tessl.io/blog/tessl-launches-spec-driven-framework-and-registry) | Tessl · 23.09.2025 | Framework (beta) + registry of library specs | spec → generated code, marked *do not edit* | spec-as-source | No; it is the level-3 bet, described not used |
| BMAD | community | multi-agent roles (PM, architect, dev, QA) | — | — | `research-01` already says: too heavy |

**The two class editors already carry half the loop**, which is the practical point of 4d:

- **Cursor — Plan Mode** (`Shift+Tab`): asks clarifying questions, researches the codebase,
  writes *"a comprehensive, reviewable implementation plan"* as an editable Markdown file,
  which can be *"saved to workspace … for future reference, team sharing, and
  documentation"*; the docs recommend it for *"unclear requirements where you need to explore
  before understanding scope"* ([cursor.com/docs, checked 2026-09-02](https://cursor.com/docs/agent/planning)).
- **Antigravity — Artifacts**: a *Task List* (*"structured plan"* before coding), an
  *Implementation Plan* (*"meant to be reviewed by the user"*, with a **Proceed** button
  unless the review policy is set to *Always Proceed*), and a *Walkthrough* after the work
  ([Google Codelabs, checked 2026-09-02](https://codelabs.developers.google.com/getting-started-google-antigravity)).

Both are the *plan* and *tasks* stages, generated by the agent and shown for approval.
Neither produces the *spec* — the what — and neither keeps a constitution. That gap is
exactly what the students write by hand in this module, and it is why the module is run
without installing anything: the piece the tools do not supply is the piece to learn.

**Convergence, restated with dates — and its limit.** Six teams (AWS July, GitHub September,
Tessl September, Fission AI September, Google December, plus Anthropic's *interview →
SPEC.md → fresh session* guidance) arrived at the same stages within a year, and Cursor and
Antigravity built the plan/tasks half into their editors. Whether they arrived independently
is not established — the dates make mutual influence the likelier reading (Kiro shipped
first; the rest followed within months) — so the lesson must not claim independence. What
the dates do support is that the *stages and their order* repeat exactly enough to be worth
teaching as a category (`research-01` §6 rule 1); students verify that themselves in 4d's
exercise by reading two tools' templates side by side.

---

## 4. What the evidence says — and what it does not

### 4.1 Unclear task descriptions measurably break code generation

Larbi, Akli, Papadakis, Bouyousfi, Cordy, Sarro, Le Traon, *When Prompts Go Wrong*,
[arXiv 2507.20439, 27.07.2025](https://arxiv.org/abs/2507.20439). HumanEval and MBPP task
descriptions were mutated into *incomplete*, *ambiguous* and *contradictory* variants
(manually verified), and seven models (GPT-4, Qwen 7B/32B, DeepSeek-Coder 6.7B/33B, CodeLlama
7B/34B) were run on all four versions.

- **Pass@1 falls 20–40%**: ambiguous −25–30%, incomplete −20–25%, contradictory up to −40%.
  GPT-4 on HumanEval: 73,8% on the original descriptions, 45,1% incomplete, 34,8% ambiguous,
  6,7% contradictory.
- **Code that runs but is wrong rises**: GPT-4's *runnable-but-incorrect* rate goes from 24%
  (original) to 54% (incomplete), 65% (ambiguous), 89% (contradictory). *"Execution alone is
  not a reliable proxy for correctness."*
- **Models cannot reliably tell that a description is unclear** (best MCC ≈ 0,50) and
  *"would nevertheless attempt to produce a solution"* — 3d's point about guessing, measured.
- **Different flaws, different failures**: incomplete → structural errors (missing names,
  type errors); ambiguous → *"semantically incorrect but executable code"*; contradictory →
  logically inconsistent behaviour.

**Limits the lesson must state**: single Python functions, not applications; 2025 models,
several of them small; mutations generated by GPT-4 then hand-checked; the authors expect
worse on larger tasks but did not measure it. What survives those limits is the direction
and the shape: the less the description says, the more the model fills in, and what it fills
in looks exactly like correct code.

### 4.2 Stripping detail from a spec, same model, same tasks

Chacón Sartori, *The Specification Gap*, [arXiv 2603.24284, 25.03.2026](https://arxiv.org/abs/2603.24284):
51 class-generation tasks, specification detail stripped in four levels from full docstrings
to bare signatures; two Claude models, three runs. A single agent's accuracy falls from 89%
to 56% as detail is removed; when two agents build halves of the same class the fall is 58%
→ 25%, and *"restoring the full specification alone recovers the single-agent ceiling."*
The multi-agent framing is beyond this module; the single-agent number (89 → 56) is the
clean version of §4.1 on a 2026 model, and the conclusion the author draws — *"richer
specifications are both the primary coordination mechanism and the sufficient recovery
instrument"* — is the module's thesis stated by someone who measured it.

### 4.3 What the vendors themselves say about when to plan — and when not to

Anthropic's Claude Code guidance ([checked 2026-09-02](https://code.claude.com/docs/en/best-practices)):

- *"Letting Claude jump straight to coding can produce code that solves the wrong problem."*
  Recommended: explore → plan → implement → commit, with the plan approved before code.
- **But**: *"Plan mode is useful, but also adds overhead. For tasks where the scope is clear
  and the fix is small … ask Claude to do it directly. … If you could describe the diff in
  one sentence, skip the plan."*
- *"Give Claude a check it can run … Without a check it can run, 'looks done' is the only
  signal available, and you become the verification loop."* And: *"Have Claude show evidence
  rather than asserting success."*
- For larger features: *"have Claude interview you … then write a complete spec to
  SPEC.md"*; *"Once the spec is complete, start a fresh session to execute it."*
- Review: *"Before treating a task as done, have a subagent review the diff in a fresh
  context and report gaps"* — and the warning that a reviewer asked to find gaps will find
  some: *"Tell the reviewer to flag only gaps that affect correctness or the stated
  requirements."*

Cursor's Plan Mode docs recommend planning for *"complex features with multiple valid
approaches"* and *"unclear requirements"*, and suggest reverting and refining the plan rather
than patching with follow-up prompts when the result is off ([checked 2026-09-02](https://cursor.com/docs/agent/planning)).

### 4.4 The critique

Böckeler, [15.10.2025](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html), is
the one to quote because she tried the tools and liked the idea:

- **Volume**: *"I'd rather review code than all these markdown files."* Spec Kit in
  particular *"generates numerous markdown artifacts."*
- **Scale**: the tools may be *"a sledgehammer to crack a nut"* on small problems, and it is
  unclear which problem size they are for.
- **False precision**: despite elaborate specs the agents *"frequently ignore instructions
  or misinterpret existing code, creating duplicates rather than utilizing described
  components."* A spec is not a guarantee.
- **The model-driven-development parallel**: spec-as-source risks *"the downsides of both
  MDD and LLMs: Inflexibility and non-determinism."*
- Her closing verdict: *"spec-first is definitely valuable"*; the term is *"semantically
  diffused"*; and she asks whether the tools are a *Verschlimmbesserung* — a worsening by
  improvement.

Two more critiques the module should be able to answer when a student raises them:

- **"Isn't this waterfall?"** — the fear that writing everything down first means designing a
  year up front and discovering the mistakes at the end. The answer is size: a spec here
  covers one week's feature, not a product; the loop runs once per slice; the spec is edited
  when the build teaches something (Delimarsky: *"a living artifact"*). OpenSpec's own
  slogans are *"iterative not waterfall"*, *"fluid not rigid"*.
- **"The spec goes stale."** True for spec-first tools by construction (Böckeler); Kiro
  effectively leaves the spec behind after the feature. The module's answer is the smallest
  spec-anchored habit: the spec lives in the repo, and the next change to the notatnik
  starts by editing it.

### 4.5 What we do not know

As of 2026-09-02 I found **no randomised or controlled comparison of spec-driven development
as a method against unstructured agent use on real applications.** The available evidence is
(a) task-description quality on small benchmarks (§4.1, §4.2), (b) vendor recommendations
(§4.3), (c) practitioner reports (§4.4), and (d) the education research already in
`research-01` §5, which says students learn from what they *verify and can explain*, not from
what they generate. The module should claim exactly that much: specs measurably reduce
guessing; they are what you check against; the rest is a bet the industry is making, dated.

---

## 5. What this forces in Moduł 4

1. **The anchor is the notatnik from 3b, rebuilt.** It is the smallest of the three builds,
   its output is a file on the disk (so every acceptance criterion is observable without a
   test framework), the students already know its failure modes (the newest-first ordering
   that loses a note; the removed dialog class; the format nobody specified), and its spec
   fits on one page. The katalog stays as the extension for students who finish; a console
   tool is the fallback for students behind (v2.3).
2. **By hand, no install.** Spec Kit needs `uv`; Kiro is a third editor; the MCP server is
   unmaintained. A folder `specs/001-notatnik/` with `spec.md`, `plan.md`, `tasks.md`,
   plus `konstytucja.md` and `decyzje/` at the root, teaches the same loop as any wrapper.
   4d shows the wrappers *after* the students have done one stage by hand, and the class
   editors' Plan Mode / Implementation Plan as the plan-and-tasks half they can switch on.
3. **Acceptance criteria are written *„Kiedy …, to …”* with a *„po czym poznam”***, and
   at least one per criterion is checkable by opening `notatki.md` or running
   `dotnet build`. The sentence shape is North/Mavin; the lesson names EARS once and moves
   on.
4. **The fresh-context test is the definition of a good spec.** A classmate — or a fresh
   agent session — who has not seen your conversation must be able to write the plan from
   the spec alone. This is AGENTS.md §2's rule turned into a classroom exercise, and it
   catches "spec that names files" and "spec that hides a question" in one go.
5. **The failure modes are taught by name**, each with the ttcmd sentence that already
   exists for it: the spec that names a file (leaked into the plan); the task that cannot be
   checked (not a task yet); the assumption the agent made silently (`DECISIONS.md`, now
   `[DO USTALENIA]` in the spec); the reviewer who finds gaps because asked (report gaps that
   affect the criteria, not style).
6. **A size rule, said plainly**: if you could describe the change in one sentence, do not
   write a spec for it (Anthropic); a spec is for a week of work; three commits without a
   spec is fine, thirty is a mess. This is the answer to Böckeler and to the student who
   thinks the module is bureaucracy.
7. **Constitution ≠ rules file.** 3c's `AGENTS.md` says *how code is written here* and rides
   with every request. The constitution says *what this program is and never does*, is read
   when a spec is written, and outranks the spec. For a student project it is five to eight
   lines; Spec Kit's nine-article version is shown as what the same idea looks like at
   company scale, not copied.
8. **Terms this module owns** (for the style-guide appendix): *specyfikacja*, *kryterium
   akceptacji*, *konstytucja projektu*, *plan*, *lista zadań*, *ADR / zapis decyzji*,
   *pętla spec → plan → zadania → kod*, *spec-first / spec-anchored*, *„wyciek do planu”*,
   *świeży kontekst jako test*. **Terms it must not use**: *test jednostkowy*, *TDD*, *CI*
   (Moduł 6 and 1g own them) — 4c says "a check you can run" in plain words.
9. **The brainstorm (4f) applies the module to ideas**: each idea written as a spec in
   miniature — one sentence of what, one of for whom, one of how you would know it works —
   with the bar from v1's 4e: *someone real has to use it, and the student counts as
   someone*. Ideas captured, not committed; the choice is confirmed in Moduł 8.

## 6. TO CONFIRM / open

- Whether the class editors' plan features (Cursor Plan Mode; Antigravity's Implementation
  Plan with **Proceed**) are enabled under the school's accounts and free tiers — check on
  the lab machine the week before 4d (ADR-0008; the lesson is written so that it survives
  either answer).
- Spec Kit's star count and command list, Kiro's pricing tiers and OpenSpec's numbers are
  claims dated 2026-09-02; re-check the week 4d is taught, and do not put the numbers on the
  site (the lessons name the tools and link them; the table above is the repo's record).
- Whether Viktar wants the lessons to say, in the teacher's first person, that the course
  site itself was built with this loop. Article II keeps students away from this repo's
  specs; a one-sentence remark is a disclosure about his own work and is his call, not the
  agent's (AGENTS.md §4).

## Sources

All checked 2026-09-02 unless a publication date is given.

- [GitHub Spec Kit — repository](https://github.com/github/spec-kit) · [spec-driven.md (methodology)](https://github.com/github/spec-kit/blob/main/spec-driven.md) · [spec-template.md](https://raw.githubusercontent.com/github/spec-kit/main/templates/spec-template.md) · [plan-template.md](https://raw.githubusercontent.com/github/spec-kit/main/templates/plan-template.md) · [tasks-template.md](https://raw.githubusercontent.com/github/spec-kit/main/templates/tasks-template.md) · [constitution-template.md](https://raw.githubusercontent.com/github/spec-kit/main/templates/constitution-template.md)
- Den Delimarsky, [*Spec-driven development with AI: Get started with a new open source toolkit*](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/), GitHub Blog, 02.09.2025
- Birgitta Böckeler, [*Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl*](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html), martinfowler.com, 15.10.2025
- [Kiro — Specs](https://kiro.dev/docs/specs/) · [Specs — Concepts (EARS)](https://kiro.dev/docs/specs/concepts/) · [*Kiro is generally available*](https://kiro.dev/blog/general-availability/), 17.11.2025
- Todd Bishop, [*Amazon's surprise indie hit: Kiro launches broadly…*](https://www.geekwire.com/2025/amazons-surprise-indie-hit-kiro-launches-broadly-in-bid-to-reshape-ai-powered-software-development/), GeekWire, 17.11.2025
- [OpenSpec — repository](https://github.com/Fission-AI/OpenSpec) · [npm release history](https://www.npmjs.com/package/@fission-ai/openspec) (0.1.0 published 06.09.2025)
- [Introducing Kiro](https://kiro.dev/blog/introducing-kiro/), Kiro blog, 14.07.2025
- [Spec Workflow MCP — repository](https://github.com/Pimzino/spec-workflow-mcp)
- Keith Ballinger, Jay Kornder, Sherzat Aitbayev, [*Conductor: Introducing context-driven development for Gemini CLI*](https://developers.googleblog.com/conductor-introducing-context-driven-development-for-gemini-cli/), Google Developers Blog, 17.12.2025
- [*Tessl launches spec-driven development tools…*](https://tessl.io/blog/tessl-launches-spec-driven-framework-and-registry), Tessl, 23.09.2025
- [Spec-driven development — Wikipedia](https://en.wikipedia.org/wiki/Spec-driven_development)
- Alistair Mavin, [*EARS — Easy Approach to Requirements Syntax*](https://alistairmavin.com/ears/) (first published 2009)
- Daniel Terhorst-North, [*Introducing BDD*](https://dannorth.net/blog/introducing-bdd/), Better Software, March 2006
- Michael Nygard, [*Documenting Architecture Decisions*](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions), 15.11.2011
- Bill Wake, [*INVEST in Good Stories, and SMART Tasks*](https://xp123.com/invest-in-good-stories-and-smart-tasks/), August 2003
- Frederick P. Brooks Jr., [*No Silver Bullet: Essence and Accidents of Software Engineering*](https://www.cgl.ucsf.edu/Outreach/pc204/NoSilverBullet.html), IEEE Computer 20(4), April 1987
- Maya Larbi et al., [*When Prompts Go Wrong: Evaluating Code Model Robustness to Ambiguous, Contradictory, and Incomplete Task Descriptions*](https://arxiv.org/abs/2507.20439), arXiv, 27.07.2025
- Camilo Chacón Sartori, [*The Specification Gap: Coordination Failure Under Partial Knowledge in Code Agents*](https://arxiv.org/abs/2603.24284), arXiv, 25.03.2026
- Anthropic, [*Best practices for Claude Code*](https://code.claude.com/docs/en/best-practices)
- Cursor, [*Plan Mode*](https://cursor.com/docs/agent/planning)
- Google, [*Getting Started with Google Antigravity*](https://codelabs.developers.google.com/getting-started-google-antigravity) (Codelab)
- Earlier notes in this folder: `research-01` §3–§4 (the lineage, the August 2026 tool table), §5 (education research), §6 (what rots)
