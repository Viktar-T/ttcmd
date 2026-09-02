# Research 01 — How software is actually built in 2026

| | |
| --- | --- |
| Written | 2026-08-28 |
| For | Course structure v1.0 — *Aplikacje desktopowe i mobilne* |
| Status | **Research notes.** Not course content, not law. Repo-facing English (Article III). |
| Question asked | What are the current trends in programming, do they depend on project size, and why are they happening? |
| Feeds | `course-structure-v1.md`, modules 1–3 |

> Everything here is dated. Tool names in this field rot in weeks — see §6.
> The **structure** built on this file should survive; the **names** in it should not
> be copied into a lesson without re-checking them the week the lesson is taught.

---

## 1. The general trend, in one line

**Completion → chat → agent → orchestration.**

Four layers, each of which absorbed the previous one rather than replacing it:

| Layer | What the human does | Roughly when it became normal |
| --- | --- | --- |
| Smart completion (Tab) | Types; accepts ghost text | 2022 (Copilot) |
| Next-edit suggestion | Renames once, Tab-walks the rest | 2024 |
| Chat in the IDE | Asks; pastes code back | 2023–2024 |
| Agentic generation | States a task; the model writes files, runs the terminal, reads the error, loops | 2025 |
| **Orchestration** | Steers **several** agents in parallel; reviews, does not type | **2026 — the current frontier** |

The 2026 shift is not "the model got better at writing a function." It is that the
unit of work moved from *a diff* to *a task*, and the scarce human resource moved
from typing to **review and direction**. Anthropic's 2026 agentic coding report
describes engineers who "shepherd multiple features through development
simultaneously," and reports that developers use AI across roughly **60% of their
work** while being able to *fully* delegate only **0–20% of tasks**. Those two
numbers together are the whole story: AI is everywhere in the workflow and
autonomous almost nowhere.

One finding worth putting in front of students: about **27% of AI-assisted work is
work that would not have been done at all otherwise** — tests nobody would have
written, scripts nobody would have bothered with, docs nobody would have updated.
The gain shows up as *more things done*, not only *the same things done faster*.

## 2. Does it depend on the size of the project?

**Yes — and this is the single most useful thing to teach.** The effect size is not
a constant; it is a function of at least four variables.

### 2.1 Greenfield vs brownfield

Stanford's large-scale analysis (Denisov-Blanch, 2025) splits cleanly:

| | Simple tasks | Complex tasks |
| --- | --- | --- |
| **Greenfield** (new code, clean) | **+30–40%** | +10–15% |
| **Brownfield** (large, messy, legacy) | +15–20% | **0–10%** |

The quoted conclusion is the one to read out loud in class: *"Large, messy systems
are exactly where AI tools look most attractive, but they are also where the risks
are greatest."*

**Why this matters for a school course:** everything students build is greenfield
and small. They are working in the single most favourable cell of that table. They
will therefore over-estimate what the tools do, and the first real job will
disappoint them. Saying so once, early, is cheap insurance.

### 2.2 Seniority

A Microsoft study (Demirer et al., 2026) found pull-request productivity gains of
roughly **+40% for juniors** and **+7% for seniors**.

Read carefully, this is not "juniors benefit more." Juniors benefit more *from
assistant-style tools* — completion, explanation, boilerplate. Seniors extract
their value from **agentic workflows**, which pay off in evaluation, steering and
system-level judgement: exactly the skills a junior does not have yet. Which means
the course's job is to build the judgement, not the typing speed.

### 2.3 The productivity paradox

METR's randomised controlled trial (July 2025) is the necessary counterweight, and
belongs in the course precisely because it is inconvenient: **experienced
open-source developers were 19% slower** on real tasks in their own mature
repositories when allowed to use AI tools — and afterwards estimated they had been
**20% faster**.

A 39-point gap between measured and perceived performance. That is the finding to
teach, more than the 19% itself: **self-assessment of AI-assisted productivity is
unreliable**, in the direction of flattering the user. It is the adult version of
the student who feels they have learned because the assignment was easy (§5).

Caveats that must travel with the number, or it is being misused: small sample
(16 developers), mature repositories the developers knew deeply, early-2025 tools,
and limited prior agent experience. It does **not** generalise to a beginner
writing a new small app. It is evidence about *brownfield expert work*, which is
the opposite corner of the table from a technikum classroom.

### 2.4 Other conditioning factors

- **Language popularity.** Python / Java / JavaScript: +20–25% on simple tasks.
  Niche languages: −5% to +5%. Training data density is destiny. *(Relevant: C# is
  popular, but nowhere near JavaScript. Expect good, not miraculous.)*
- **Baseline code quality.** Cleaner codebases extract more benefit (R² = 0.40).
  The discipline pays twice.
- **Ramp time.** Roughly **30–100 hands-on hours** before AI tooling shows clearly
  positive effects. This is the empirical version of Kartynnik's "give a tool a
  week, not fifteen minutes" — and at 8 h/week it is **4–12 weeks of the course**.
  Plan for the trough.

### 2.5 The honest summary for students

> AI is most useful exactly where you are: small, new, popular language, simple
> task. It is least useful where you will be in three years: large, old, complex,
> unfamiliar. The skill that transfers is not prompting. It is being able to tell
> whether the thing it just wrote is right.

## 3. Why the trend is happening

Not "the models got smarter." Three mechanical reasons:

1. **Context, not intelligence, was the bottleneck** — and it moved. Windows went
   from ~4k to ~100k–2M tokens. But a window is not memory: **the chat is
   stateless**, the entire dialogue is re-sent every turn, and quality falls as it
   fills. Everything called "memory," "indexing," "RAG" or "context engineering" is
   an answer to that one constraint.
2. **The harness grew around the model.** A model cannot browse, run a terminal, or
   read your database. Tools can. MCP standardised how tools are attached, so the
   capability stopped being per-vendor. The competitive frontier moved from the
   model to *what is wired to it*.
3. **Cost fell fast enough to make iteration viable.** Reasoning models spend
   compute to think; when a unit of thinking gets an order of magnitude cheaper per
   year, "let it try, check, retry" becomes a rational default rather than a luxury.

The consequence that produces SDD: once the agent can execute a long chain
unattended, **the expensive failure stops being a wrong line and becomes a wrong
direction pursued for an hour.** Everything in §4 is a response to that.

## 4. Spec-Driven Development

### 4.1 What it is

A development approach where the **specification is the primary artifact and the
code is its derivative**. It exists to remove the chaos of vibe coding by giving
the agent a stable, written context with verifiable acceptance criteria, instead of
intent scattered across a chat log that dies with the session.

The lineage is unglamorous and worth showing students, because it makes SDD look
like an obvious next step rather than a fashion: `README` → `TASK.md` /
`CHECKLIST.md` → style rules and conventions for agents → ADRs → **`spec.md`**.

The loop, in every implementation:

```
spec  →  plan  →  tasks  →  implement  →  check against acceptance criteria
```

### 4.2 The frameworks, as of August 2026

| Tool | Shape | Note |
| --- | --- | --- |
| **GitHub Spec Kit** | CLI (`specify`), installs slash commands into 30+ agents | Commands: `/speckit.constitution`, `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`, plus `/speckit.clarify`, `/speckit.analyze`, `/speckit.checklist`, `/speckit.converge`, `/speckit.taskstoissues`. The reference implementation and the most widely adopted of these. |
| **Kiro** (AWS) | IDE + CLI, SDD built into the UX | Three phases: Requirements → Design → Implementation, with a generated task checklist and a "Start task" button. The most *legible* demo of the loop for a classroom. |
| **OpenSpec** | Lightweight, proposal/delta based | `openspec/specs` + `openspec/changes`; a change is proposed, agreed, implemented, then archived into the source spec. |
| **BMAD** | Multi-agent, role-based (PM, architect, dev, QA) | For large projects with distributed specialisation. **Too heavy for this course.** |
| **Spec Workflow MCP** | MCP server | Adds the workflow to any tool that has no native SDD. The route for Cursor / VS Code / Antigravity. |
| **Conductor** (Google, for Gemini CLI) | Extension; "context-driven development" | Same pattern, different accent: the problem is that context dies in chat logs, so it is moved to committed Markdown next to the code. Explicitly designed for brownfield too. |

Note the convergence: **six independent teams arrived at the same four-stage loop.**
That is the argument for teaching the loop rather than any one tool.

### 4.3 Vibe coding — the thing SDD is a reaction to

Karpathy, February 2025: *"you fully give in to the vibes, embrace exponentials, and
forget that the code even exists… I 'Accept All' always, I don't read the diffs
anymore."*

He was honest about the limit in the same post: fine for throwaway weekend
projects; the speed-up evaporates at real integration.

**This distinction is a course-defining one and needs its own lesson:**

- reading, testing and understanding generated code = **AI-assisted development**;
- not reading it = **vibe coding**.

Vibe coding is legitimate for prototypes, throwaway scripts and exploration. It is
not legitimate for anything anyone will use. Teaching it as a *named, bounded mode*
is far better than pretending students will not do it.

## 5. What the education research says — and what it forces in the course design

This section changed the structure more than anything else in this file.

### 5.1 The core finding: performance and learning come apart

A grounded-theory study of 41 undergraduates over a semester (Java OOP, Copilot
group vs pair-programming contrast group) identifies two loops that look identical
from outside and are opposite in effect:

| | **Scaffolding loop** (productive) | **Offloading loop** (harmful) |
| --- | --- | --- |
| What the student does | Modifies, tests, and **explains** the output | Delegates fast, verifies minimally |
| Prompting | Decomposition, iterative refinement | One-shot code acquisition |
| Result | Understanding | **Marks without understanding** |
| Metacognition | Calibrated | **Perceived readiness exceeds real capability** |

Two failure modes it names, both of which will happen in a technikum:

- **The Novice's Dilemma** — the student cannot verify correctness, because
  verifying requires the expertise the exercise was supposed to build.
- **The Boilerplate Blindspot** — stronger students accept "obviously simple" code
  without reading it, and miss subtle errors.

And the behaviour pattern that predicts which loop a student is in: **the Strategic
Dance.** Early in an assignment students ask Socratic questions; near the deadline
they switch to pure delegation. *"When it's 2 AM and the project is due at 9 AM…
I'm just trying to finish."* The loop is chosen by **time pressure**, not by
character. That is a schedule problem, and therefore mine to fix, not theirs.

Note also the discourse–behaviour mismatch the logs exposed: students *described*
a collaborative dialogue with the AI while their actual logs showed one-shot
commands and immediate acceptance. **Students' self-reports about how they use AI
are not evidence.** (Compare §2.3: neither are professionals'.)

### 5.2 The interventions that follow — adopt these

The study's recommended designs, mapped to what they become here:

| Recommendation | In this course |
| --- | --- |
| **Critique-the-AI phases** | An exercise type: *here is generated code, find what is wrong with it* |
| **Planned fading** | Named AI-free segments — not a ban, a scheduled removal |
| **Verification journals** | Document the check **before** accepting; this is already the repo's "evidence, not opinion" rule |
| **Peer assessment** | Read each other's generated code; social verification beats solo |
| **Reflective error traces** | Keep the failure in the log, explain it |

Plus one from the schedule side, implied by the Strategic Dance: **deadlines that
do not land at 2 a.m.** — small, frequent, checkable deliverables rather than one
large one.

The authors' closing point is the pedagogical thesis of this whole course:

> AI functions as a cultural tool mediated by human pedagogy — genuine scaffolding
> is distinguished from dependency by **intentional instructional design**, not by
> tool availability.

### 5.3 The national frame

MEN's stated priorities for the 2026/2027 school year name **responsible use of
artificial intelligence** and **digital hygiene / critical thinking** — the first
time AI features this prominently in Polish educational policy direction. The
priorities are framed as expectations rather than as detailed legal obligations.

*Not load-bearing for the structure, but it means a course built this way is
running with the policy, not against it. **TO CONFIRM** with the school before
being asserted anywhere student-facing.*

## 6. What rots, and how the course survives it

Kartynnik's warning, and it has held: *"Tools named in a January video will be
stale by March–April."* Courses in this field go stale in a week or two; what you
need is a **live** information source, not a frozen list.

Structural consequences, applied in `course-structure-v1.md`:

1. **Teach categories, not products.** "An AI-first IDE," "a CLI agent," "an MCP
   server" are stable. `<product name>` is not.
2. **Every tool list gets a visible date stamp** and an instruction to re-check.
3. **No lesson's learning objective may depend on one vendor's UI.** If the lesson
   dies when a menu moves, it was a manual, not a lesson.
4. **One lesson exists purely to teach staying current** — benchmarks, leaderboards,
   communities, release notes. It is the only part guaranteed not to expire.

---

## Sources

- [2026 Agentic Coding Trends Report — Anthropic](https://resources.anthropic.com/2026-agentic-coding-trends-report)
- [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity — METR, 2025-07-10](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)
- [State of AI Coding Efficiency (2026) — Ingo Eichhorst](https://ingoeichhorst.medium.com/state-of-ai-coding-efficiency-2026-1abfa0ab7434) (summarises Denisov-Blanch/Stanford 2025 and Demirer et al./Microsoft 2026)
- [Tool, tutor, or crutch? A grounded theory of cognitive scaffolding and offloading in AI-assisted programming education — International Journal of STEM Education](https://link.springer.com/article/10.1186/s40594-025-00592-w)
- [Spec-Driven Development: A Spec-First Approach to AI-Native Engineering — Microsoft for Developers](https://developer.microsoft.com/blog/spec-driven-development-ai-native-engineering/)
- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [Kiro](https://kiro.dev) · [OpenSpec](https://openspec.pro/) · [BMAD](https://github.com/bmad-code-org/BMAD-METHOD) · [Spec Workflow MCP](https://github.com/Pimzino/spec-workflow-mcp)
- [Conductor: context-driven development for Gemini CLI — Google](https://developers.googleblog.com/conductor-introducing-context-driven-development-for-gemini-cli/)
- [Szkoła ma być przyjazna, ale też odporna. MEN pokazało priorytety na rok szkolny 2026/2027 — rp.pl](https://edukacja.rp.pl/szkoly-podstawowe-i-srednie/art44482651-szkola-ma-byc-przyjazna-ale-tez-odporna-men-pokazalo-priorytety-na-nowy-rok-szkolny-2026-2027)
- Local corpus: `D:\Life-OS\124-Edu-TTC\learn-ai-codding` — *Основы программирования с ИИ* / *Базовая теория*, Lex Kartynnik, [learn.evocoders.ai](https://learn.evocoders.ai/); in particular `01-trends-and-techniques.md`, `12-spec-driven-development.md`, `21-ai-first-ide.md`, `20-popular-tools.md`, `01-basic-theory/02-user/05-vibe-coding.md`
- Local notes: `D:\EXOCORTEX\10_log\daily\2026-08-25.md`, `#idea` section
