# Course structure v1.1 — *Aplikacje desktopowe i mobilne*

| | |
| --- | --- |
| Version | **1.1 — proposal** (v1.0 written 2026-08-28; Moduł 1 revised 2026-08-29, see changelog) |
| Written | 2026-08-28 |
| Status | **Not law.** A proposal for Viktar to cut, reorder and reject. Not a spec slice; nothing here authorises an app change (Article IX). |
| Course | 4th year, 8 h/week, two groups, from 2026-09-01 <!-- TO CONFIRM: official PL course title --> |
| Language | This document: English (Article III). Titles: the Polish that would go into frontmatter. |
| Built on | [`research-01-ai-assisted-development.md`](research-01-ai-assisted-development.md) · [`research-02-stack-tooling-constraints.md`](research-02-stack-tooling-constraints.md) · for Moduł 1 also [`research-03-desktop-app-history.md`](research-03-desktop-app-history.md) · [`research-04-mobile-app-history.md`](research-04-mobile-app-history.md) · [`research-05-the-new-era.md`](research-05-the-new-era.md) |
| Source of intent | `D:\EXOCORTEX\10_log\daily\2026-08-25.md` — `#idea` for this course |

---

## How to read this file

The scheme is the repo's, not this document's — ADR-0003 and `design-reference.md`:

- **Module number** comes from the folder prefix. `content/moduly/03-specyfikacja/` → **Moduł 3**.
- **Lesson letter** comes from `order` inside the module. `order: 1` → **3a**, `order: 2` → **3b**. Never stored by hand.
- **Exercises are `<module>.<n>`, continuous across the whole module.** Moduł 3 runs *Zadanie 3.1 … 3.8* regardless of which lesson they sit in.

So `4c` below means: module folder `04-…`, the lesson whose `order` is 3. That string
is what gets said out loud in class, and it is stable as long as nobody reorders a
module.

**The hour estimates are estimates.** They are a sanity check on volume at 8 h/week —
they are **not a timetable**, they must not be treated as one, and they must not be
written into the `week` frontmatter field. The timetable is the school's (Article V).

---

## The arc, and where it came from

The daily note lays out five steps. This is how they map:

| Note | Structure |
| --- | --- |
| 1. Understand trends in programming → agentic programming; SDD | **Moduł 1**, method established in **Moduł 3** |
| 2. What desktop and mobile apps are → choose first tech stack | **Moduł 4** |
| 3. Build a small desktop app with SDD, **without libraries** | **Moduł 5** |
| *(1–3 = the minimum everyone reaches)* | **End of Semester 1**, plus **Moduł 6** as the quality floor |
| 4. Specialised libraries for SDD + memory | **Moduł 10** |
| 5. Build real apps, desktop + mobile, used by at least one person | **Moduł 7–9** |

Two things from the note are not steps but properties, and are therefore spread
across everything: **meta-prompting** (2c) and **unit tests as the defence against
hallucination and regression** (Moduł 6, then never dropped).

### The shape in one line

> **AI and SDD are the method; desktop and mobile apps are the subject.**
> Modules 1–3 build the method on something small. From Moduł 4 on, every line of
> app code is written through the spec → plan → tasks loop. There is no point where
> the course "switches back" to programming without AI, and no point where AI is
> the topic instead of the work.

---

## Course-wide mechanics

These are not modules. They recur in every module, and they exist because of the
education research in `research-01` §5 — where the finding is that AI use splits
into a **scaffolding loop** and an **offloading loop** that look identical from the
outside and are opposite in effect.

| Mechanic | What it is | Why |
| --- | --- | --- |
| **`Zadanie`** | Ordinary exercise, numbered `<module>.<n>` | The spine |
| **`Rozbierz to`** *(critique-the-AI)* | Here is generated code. Find what is wrong with it. | Counters the Boilerplate Blindspot — students accepting "obviously simple" code unread |
| **Bez AI** *(planned fading)* | A named, scheduled segment done without the tools. Not a ban — a removal, announced in advance. | The only way to find out whether the understanding is real |
| **Dziennik weryfikacji** *(verification journal)* | Before accepting generated code: what did you check, and what did it return? | This is the repo's own rule — evidence, not opinion (Article IX) — applied to students |
| **Czytamy cudzy kod** *(peer review)* | Read someone else's generated code and say what it does | Social verification beats solo verification |
| **`Prompt`** | A copyable prompt block | Already in the component inventory. Prompts are artifacts students reuse, not text they read |

And one scheduling rule that is a design decision, not a preference:

> **Small, frequent deliverables. Never one large deadline.**
> The research names the *Strategic Dance*: students ask good questions early and
> switch to pure delegation as a deadline closes. That switch is caused by time
> pressure, not by character — so it is fixed in the schedule, not in a rule about
> honesty.

---

# Interesting to read material Modules
- I have not decided what to do with this parts. They are ready or partly ready.

|        | Polish title           | slug                     | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------ | ---------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **1a** | Czterdzieści lat zmian | `czterdziesci-lat-zmian` | **New in v1.1.** Two timelines — desktop from 1984, mobile from 1996 — told as *what the programmer actually did* in each era, what each era made cheap and what it made expensive. The causes table (hardware / economics / a vendor decided / distribution — fewer than half technical). The constants since 1984, named and handed to Moduł 4. Closes on the forty-year-old promise of "programming by talking" that never came true — the sceptic's frame for 1b. Built from `research-03/04-*-history` §A1, cross-cutting questions and A4. |

# Semester 1 — the minimum everyone reaches

*Estimated 144 h ≈ 18 weeks at 8 h/week.*

---

## Moduł 0 — Start

`content/moduly/00-start/` · est. **8 h** · *Zadania 0.1–0.4*

Getting thirty people to the same starting line: how the course works, what the
site is, what is installed, and enough Git to not lose work. Deliberately short and
deliberately first — every later module assumes all of it.

| | Polish title | slug | What it does |
| --- | --- | --- | --- |
| **0a** | Jak działa ten kurs | `jak-dziala-ten-kurs` | The site is the source of truth. How modules, lessons and `Zadanie` numbering work, what `Bez AI` segments are, and what is expected each week. |
| **0b** | Konta, sprzęt i instalacja | `konta-sprzet-instalacja` | Everything installed and logged in, verified by a command that prints a version. Blocked on `research-02` §1 and §4.3 — the lab OS and the accounts question. |
| **0c** | Git i GitHub — minimum, które wystarczy | `git-i-github` | `clone`, `add`, `commit`, `push`, branch, pull request. No theory of merge strategies. Git is in INF.04 scope and everything downstream needs it. |

> **Blocked.** 0b cannot be written before the lab OS, admin rights, network
> filtering and the accounts/age question are answered — `research-02` §1, §4.3.

---

## Moduł 1 — Jak dziś powstaje oprogramowanie

`content/moduly/01-jak-powstaje-oprogramowanie/` · est. **22 h** · *Zadania 1.1–1.33*

The trends module the note asks for — and the module that has to survive being
wrong. It teaches the **shape** of the change and the **evidence** about it, so a
student can evaluate a tool that does not exist yet. This module should have links and citations inside the site from well-known programmers, tech people. It should contain diagrams, too.

**v1.1 — the module now carries one argument, in this order:** the last forty
years show that *how* apps are built changed every few years and was rarely
decided on technical merit (1a); the last four years are a change of a different
kind — not *how* you write code but *whether* (1b); the evidence about it, including
what AI does to a *learner* (1c); a live demo (1d); what a professional's day looks
like once agents write the code, and which attitudes have to change with the tools
(1e); the boundary between using AI and pretending to program (1f); and how to
stay current when every name in the module rots (1g).

|        | Polish title                    | slug                             | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------ | ------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **1b** | Od podpowiedzi do agenta        | `od-podpowiedzi-do-agenta`       | The five layers: completion → chat → next-edit → agent → orchestration. **v1.1 adds** a dated, sourced timeline (Copilot 2022-06-21 → Fable 5 2026-06-09), DHH's "dividing line" of 2025-11-24 and his point that the leap was the *harness* (tools, self-checking) rather than the model, sub-agents in spring 2026, and the closing contrast with 1a: every earlier era changed *how* you write code; this one changes *whether*.                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **1c** | Co model naprawdę potrafi       | `co-model-naprawde-potrafi`      | The evidence, with numbers. Greenfield +30–40% vs brownfield 0–10%. Juniors +40%, seniors +7%. METR's 19%/20% story **plus, in v1.1, METR's own February 2026 update** (the design could not support the inference; newer estimates lean toward speedup; "very weak evidence") — kept because the self-assessment gap survived the correction (METR's May 2026 survey: a 40-pp overestimate). **Adds the Anthropic RCT of 2026-01-29**: learners with AI scored 50% vs 67% on comprehension, largest gap on debugging — the number that matters most for a school. Adds Stack Overflow 2025 (84% use, 33% trust, 66% "almost right"). **Answers the note's question directly: yes, it depends on the size and age of the project — and on whether the goal is shipping or understanding.**                                                                         |
| **1d** | Na żywo: agent buduje aplikację | `na-zywo-agent-buduje-aplikacje` | The demo from the note — one prompt, three agents, three apps, watched. Students see the loop before they are asked to believe in it. Recorded, because it will not reproduce identically. **Unchanged in v1.1; its `order: 4` is the fixed point the reordering was built around.**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **1e** | Nowy warsztat programisty       | `nowy-warsztat-programisty`      | **New in v1.1.** DHH (Lex Fridman #501, August 2026) as the case study of a professional's day after 2025-11-24: the three "moments", what a harness is (diagram), the old→new tool table (editor → terminal; one thread → ~16 parallel agents; human review → model A writes, model B from another lab reviews, a human decides), the habits (English as the language; short goal plus exact done-criterion — with the explicit warning that DHH can be vague because he has 25 years of taste and students do not, which is why Moduł 3 exists; differential evaluation; "software is product management"), and the honest limits (Basecamp's February 2026 architecture damage; unsustainable pace; token cost; one man vs the survey median). Closes on attitude: mechanical coding is under threat, building is not; "catch up to the frontier in two weeks". |
| **1f** | Vibe coding kontra inżynieria   | `vibe-coding-kontra-inzynieria`  | Karpathy's definition in his own words, and the honest limit he stated. Names vibe coding as a legitimate *bounded mode* and says exactly where it stops. **v1.1 adds** DHH's two 2026 experiments as the two ends of the axis — a black-box personal editor he never read a line of, and the Basecamp PRs that "destroyed the architecture" — with the sharper criterion they yield: *who pays if the code is wrong*. Moved after the demo so students place the demo on the axis themselves (new exercise).                                                                                                                                                                                                                                                                                                                                                      |
| **1g** | Jak nie wypaść z obiegu         | `jak-nie-wypasc-z-obiegu`        | Benchmarks, leaderboards, release notes, communities. **The only lesson guaranteed not to expire.** **v1.1 adds** the four-indices section proposed by `research-03-desktop-app-history` (TIOBE / Stack Overflow / Octoverse / IEEE Spectrum: what each measures and cannot see; IEEE's own 2025 note that AI assistants are eroding the signal), a checkable `Zadanie` built on it, and DHH's "two weeks to catch up".                                                                                                                                                                                                                                                                                                                                                                                                                                            |

**Why 1c stays before the demo:** the gap between measured and perceived
productivity — 39 points in METR 2025, 40 points in METR's 2026 survey — has to
land before students meet the tools, or it reads as an excuse afterwards. The
reordering in v1.1 kept 1b and 1c ahead of 1d for that reason and moved the
vibe-coding lesson behind it instead.

**Why 1a is a history lesson in a trends module:** the note's step 1 asks students
to *understand trends*. A trend is only visible against a baseline, and these
students have none — they have never seen software change. 1a supplies the
baseline in two hours and, as a side effect, makes 1b's claim ("this change is of a
different kind") falsifiable rather than rhetorical.

**Hours.** 22 h is six more than v1.0. They come out of nowhere in the volume table
below, which was already at the ceiling; the honest options are to accept the
overrun in Semester 1, or to take the six hours from Moduł 2 (already the second
candidate for cuts) — Viktar's call, open decision #8.

---

## Moduł 2 — Rozmowa z modelem: prompt i kontekst

`content/moduly/02-prompt-i-kontekst/` · est. **16 h** · *Zadania 2.1–2.8*

The mechanics under every tool in the course. Taught once, properly, because
everything from Moduł 3 onward is an application of it.

| | Polish title | slug | What it does |
| --- | --- | --- | --- |
| **2a** | Prompt, token, okno kontekstu | `prompt-token-kontekst` | What a token is, what a context window is, and the fact most people miss: **the chat is stateless — the whole conversation is re-sent every turn.** Explains why long sessions degrade. |
| **2b** | Techniki promptowania | `techniki-promptowania` | Task + format. Zero-shot, one-shot, few-shot, chain-of-thought. Different model families want different prompts. Hands-on: the same task, four prompts, compared. |
| **2c** | Meta-prompting | `meta-prompting` | From the note: **let the model improve the prompt.** Ask for a better prompt, then run it. Fast, concrete, and it visibly changes output quality — a good early win. |
| **2d** | Kontekst projektu: reguły i pamięć | `kontekst-projektu` | `AGENTS.md`-style rules files, project memory, indexing, RAG as a concept. Why "paste everything in" is the amateur move. Sets up 3b. |
| **2e** | Halucynacje i weryfikacja | `halucynacje-i-weryfikacja` | What a hallucination is, why fluency is not correctness, and the **verification journal** as a working habit. Introduces `Rozbierz to`. |

---

## Moduł 3 — Specyfikacja zamiast wibracji

`content/moduly/03-specyfikacja/` · est. **24 h** · *Zadania 3.1–3.8*

The method module. Everything after this is done this way, so it gets the largest
theory budget in the semester — and ends with a complete loop on something small
enough to finish.

| | Polish title | slug | What it does |
| --- | --- | --- | --- |
| **3a** | Po co komu specyfikacja | `po-co-specyfikacja` | The lineage: `README` → `TASK.md` → rules → ADR → `spec.md`. The spec is the primary artifact; code is its derivative. What it costs and what it buys. |
| **3b** | Konstytucja projektu i reguły | `konstytucja-i-reguly` | Rules that outlive the feature. Written once, read by the agent before every edit. Students write their own, short. |
| **3c** | Pętla: spec → plan → zadania → kod | `petla-spec-plan-zadania` | The four stages, what belongs in each, and the two failure modes: a spec that names files (leaked into the plan), and a task that cannot be objectively checked. **Acceptance criteria are what make a spec a spec.** |
| **3d** | Narzędzia SDD w praktyce | `narzedzia-sdd` | Spec Kit, Kiro, OpenSpec, Spec Workflow MCP, Conductor. Shown as *one loop with five wrappers* — six teams converged on the same four stages, which is the argument for learning the loop, not the product. |
| **3e** | Pełna pętla na mikroprojekcie | `pelna-petla` | Something finishable in one sitting — a console tool. Spec, plan, tasks, code, check against the criteria. One commit per task. The first time the whole method is felt rather than described. |

> **Note on 3e and the note's step 3:** "don't use libraries" starts here. A console
> tool with no dependencies makes the loop visible; a dependency at this point hides
> it. Libraries arrive in Moduł 10.

---

## Moduł 4 — Aplikacje desktopowe i mobilne

`content/moduly/04-desktop-i-mobile/` · est. **16 h** · *Zadania 4.1–4.5*

The subject finally arrives — and the module where a decision is made **with** the
students rather than announced to them, exactly as the note asks.

| | Polish title | slug | What it does |
| --- | --- | --- | --- |
| **4a** | Co to jest aplikacja desktopowa, a co mobilna | `desktopowa-i-mobilna` | Native vs cross-platform vs web-wrapped. What the OS actually gives you. Why "one codebase, two platforms" is a trade, not a free win. |
| **4b** | Ekosystem .NET | `ekosystem-dotnet` | WPF, MAUI, Avalonia, Uno — the honest comparison table from `research-02` §2, including the part that decides it: **MAUI has no Linux support and no roadmap for it.** |
| **4c** | Nasza decyzja: stack na ten kurs | `nasza-decyzja` | The decision lesson. The constraints on the table — the lab machines, INF.04, what runs where — and the choice recorded with the alternatives rejected. Students see a real decision made and written down. Their own first ADR. |
| **4d** | Środowisko pracy | `srodowisko-pracy` | SDK, IDE, emulator or phone, first build, first run. Ends with something running on a screen. |
| **4e** | Burza mózgów: co zbudujemy | `burza-mozgow` | From the note: project ideas after 1–2 months. Ideas captured, not committed. The bar is set here — **someone real has to use it, and the student counts as someone** — but the choice is confirmed in Moduł 8. |

> **Schedule tension, stated rather than hidden.** The note wants the brainstorm
> after 1–2 months; at these estimates 4e lands around week 9–10, which is 2½. Either
> accept it, or trim Moduł 2 and Moduł 3 by a week between them. **Do not** move 4e
> earlier than 4a — students cannot usefully propose a desktop app before they know
> what one is.

---

## Moduł 5 — Pierwsza aplikacja desktopowa

`content/moduly/05-pierwsza-aplikacja/` · est. **40 h** · *Zadania 5.1–5.12*

The biggest module of the semester and the one everything before it was for: a real
desktop application, built by the loop, **without libraries**. One shared app that
everyone builds, so that help is transferable across the room.

| | Polish title | slug | What it does |
| --- | --- | --- | --- |
| **5a** | Od pomysłu do spec.md | `od-pomyslu-do-spec` | One app, everyone the same. What it does, what it will never do, and the acceptance criteria that decide when it is finished. |
| **5b** | Plan i lista zadań | `plan-i-zadania` | The file map, the order of work, and tasks small enough to be one commit each. Where students learn how big "small enough" is. |
| **5c** | Okno, układ, zdarzenia | `okno-uklad-zdarzenia` | XAML, layout, controls, event handling. The first genuinely GUI-shaped thing they have written. |
| **5d** | Dane i stan aplikacji | `dane-i-stan` | Model, state, binding. Why the UI should not be where the data lives — an argument they will need again in Moduł 7. |
| **5e** | Zapis do pliku i błędy, których nie widać | `zapis-i-bledy` | Persistence, exceptions, the failure cases the happy path hides. Includes the first `Bez AI` segment of real weight. |
| **5f** | Przegląd: czy kod robi to, co obiecuje spec | `przeglad-kodu-i-spec` | Diff against the spec, criterion by criterion. Peer review round. **A slice closes on evidence, not on a feeling that it works.** |

---

## Moduł 6 — Testy, jakość i przegląd kodu

`content/moduly/06-testy-i-jakosc/` · est. **24 h** · *Zadania 6.1–6.9*

The quality floor, and the direct answer to the note's line about hallucination and
regression. Placed **after** the first real app on purpose: students who have
already been bitten will care.

| | Polish title | slug | What it does |
| --- | --- | --- | --- |
| **6a** | Testy to nowe złoto | `testy-to-nowe-zloto` | Why tests matter *more* with AI, not less: they are the mechanical check on hallucination and regression, and they are the one thing a model writes well and cheaply. |
| **6b** | Testy jednostkowe w praktyce | `testy-jednostkowe` | Writing them, running them, and what makes code testable in the first place — which is mostly what 5d was about. |
| **6c** | AI robi code review | `ai-code-review` | Have the model review the diff. What it catches, what it invents, and why a review you did not read is not a review. |
| **6d** | CI: bramka, która nie przepuszcza zepsutego kodu | `ci-bramka` | GitHub Actions: tests run on every push, a red build blocks. From the note — CI/CD and automated review. |
| **6e** | Bezpieczeństwo: sekrety, dane, prompt injection | `bezpieczenstwo` | Secrets never go in a repo. What a public repo means permanently. Prompt injection, and why an agent with tools is an attack surface. |

---

# Semester 2 — coarse

*Estimated 128 h ≈ 16 weeks. Themes and gates only — **deliberately not** broken into
lessons yet.*

Two honest reasons for the lower resolution: how far the groups actually get by
January is unknown, and the note itself says steps 4–5 are for the students who are
ready to continue. Writing lesson letters now would be inventing facts about
students who have not sat in the room yet.

| Module | Polish working title | Theme | Gate — what makes it possible |
| --- | --- | --- | --- |
| **Moduł 7** | Z pulpitu na telefon | The same app on Android. Shared logic, different shell — which is the payoff for having kept state out of the UI in 5d. What actually differs: screen, input, lifecycle, permissions. | Moduł 5 finished; emulator or phones available |
| **Moduł 8** | Projekt: aplikacja, której ktoś używa | The project from the note. Ideas from 4e confirmed, spec written, built by the loop across several weeks. **The bar: at least one real person uses it — the student counts.** Desktop first, mobile as the update. | Moduł 6 — no project ships without tests and CI |
| **Moduł 9** | Wydanie: jak oddać aplikację ludziom | Build, package, sign, release. Desktop: a GitHub Release, free, no gatekeeper. Android: Firebase App Distribution, the $25 Play account, and the 2026 developer-verification change as a live example of a platform reshaping what a developer may do. | Moduł 8 has something worth releasing |
| **Moduł 10** | Dalej | Step 4 from the note, plus everything deferred: SDD frameworks properly, MCP, subagents, background agents, memory and indexing, programming by voice, local models. **For students who are ready to continue.** | Everything else; explicitly optional |

**A standing rule for Semester 2, borrowed from the roadmap's "content beats
features":** if Moduł 8 is behind, Moduł 10 is what gets cut. A finished, released,
used application is the outcome; a tour of advanced tooling is not.

---

## Volume check

| | Module | Est. h | Cumulative |
| --- | --- | --- | --- |
| S1 | 0 — Start | 8 | 8 |
| S1 | 1 — Jak dziś powstaje oprogramowanie | 22 *(v1.0: 16)* | 30 |
| S1 | 2 — Prompt i kontekst | 16 | 46 |
| S1 | 3 — Specyfikacja | 24 | 70 |
| S1 | 4 — Desktop i mobile | 16 | 86 |
| S1 | 5 — Pierwsza aplikacja | 40 | 126 |
| S1 | 6 — Testy i jakość | 24 | **150** |
| S2 | 7 — Z pulpitu na telefon | 32 | 182 |
| S2 | 8 — Projekt | 64 | 246 |
| S2 | 9 — Wydanie | 16 | 262 |
| S2 | 10 — Dalej | 16 | **278** |

278 h ≈ 35 teaching weeks at 8 h/week — six hours over v1.0's 272, all of it in
Moduł 1 (v1.1). **This is a volume sanity check, not a plan.** It has no slack in
it for holidays, exams, absence or the weeks that simply go badly — so treat it as
the ceiling and expect to land lower. If something has to go, it goes from Moduł 10
first and Moduł 2 second; Semester 1 is now 150 h against an 18-week estimate of
144, which is the overrun open decision #8 is about.

---

## What v1.0 deliberately does not contain

Recorded so it is not re-argued:

- **Week numbers.** The timetable is the school's (Article V). `week` stays optional
  frontmatter, filled in when the real schedule arrives.
- **Assessment, grading, deadlines with dates.** None of it goes in this repo or on
  the site (Article IV).
- **iOS.** Needs macOS and an Apple account. Named once in 4a as a known limit, then
  dropped.
- **A web target for student projects.** Uno/WASM is mentioned in 4b as an answer to
  "can it run in a browser?", not adopted. A Semester 2 stretch at most.
- **Multi-agent frameworks (BMAD).** Too heavy for this course.
- **The SDD artifacts of `ttcmd` itself as classroom material.** The repo is not
  course material (Article II). Students meet SDD in their own projects.
- **Named products in learning objectives.** Tools are named in lesson bodies with a
  date stamp; no lesson's objective depends on a vendor's menu (`research-01` §6).

---

## Open decisions — for Viktar

Ordered by what they block.

| # | Decision | Blocks | Where the evidence is |
| --- | --- | --- | --- |
| 1 | **Lab OS and admin rights** | 0b, and the whole of Moduł 4 | `research-02` §1 |
| 2 | **INF.04: what is really required for desktop and mobile** | 4b, 4c — whether "modern" and "examined" agree | `research-02` §3 |
| 3 | **The class AI tool** — one standard, one named alternative | 0b, and every module after | `research-02` §4.2 |
| 4 | **Accounts and age** — may students sign up, and under what consent | Any lesson that says "sign up" | `research-02` §4.3 |
| 5 | **Does the 4e brainstorm move earlier**, or does the note's "1–2 months" bend | Moduł 2 and 3 length | Moduł 4 note above |
| 6 | **Is Moduł 0 worth 8 h**, or is it half a week and the rest folded into 1a | The whole schedule shifts by a week | — |
| 7 | **One shared app in Moduł 5, or one per student** | 5a, and how much help is transferable | Proposal: shared. Individual choice belongs in Moduł 8 |
| 8 | **Where Moduł 1's extra six hours come from** — accept a 150 h Semester 1, or trim Moduł 2 | The Semester 1 schedule | Moduł 1 note above; volume table |

---

## Mapping to INF.04 — **TO CONFIRM**

Indicative only. Public sources, not the official *podstawa programowa* — see
`research-02` §3. **Nothing here may be asserted on the site until checked against
CKE** (Article V).

| Unit | Covered by |
| --- | --- |
| INF.04.3 — projektowanie oprogramowania | Moduł 3 (spec, plan, acceptance criteria), 5a–5b |
| INF.04.4 — programowanie obiektowe | Moduł 5 throughout, Moduł 7 |
| INF.04.5 — aplikacje desktopowe | Moduł 4, **Moduł 5**, Moduł 9 |
| INF.04.6 — aplikacje mobilne | **Moduł 7**, Moduł 8, Moduł 9 |
| INF.04.8 — testowanie i dokumentowanie | **Moduł 6**, and the spec discipline throughout |
| INF.04.11 — organizacja małych zespołów | Peer review (course-wide), Moduł 8 |
| INF.04.9 — język obcy zawodowy | Incidental: English documentation and error messages, everywhere |

The gap worth naming: public sources list **WPF and Qt** for desktop. If the course
teaches Avalonia, the claim that the transfer is real needs checking against actual
recent arkusze — it is plausible, not established.

---

## Changelog

- **v1.1 — 2026-08-29.** Moduł 1 revised from five lessons to seven, on Viktar's
  brief that the module must *prove* to students that programming has entered a
  new era and that tools and attitude have to change with it. Two lessons added
  (1a *Czterdzieści lat zmian*, from the desktop and mobile history research;
  1e *Nowy warsztat programisty*, from the DHH / Lex Fridman #501 conversation);
  the vibe-coding lesson moved from 1c to 1f so that 1d keeps `order: 4`
  untouched; the evidence lesson updated with METR's February 2026 correction of
  its own result, the Anthropic learning RCT and Stack Overflow 2025; the
  staying-current lesson gained the four-indices section proposed by
  `research-03-desktop-app-history`. Estimate 16 h → 22 h; open decision #8
  added. Sources for the new material recorded in
  [`research-05-the-new-era.md`](research-05-the-new-era.md). Structure
  decisions confirmed with Viktar: seven lessons; one programmer-centred history
  lesson rather than two; keep the METR story and add both updates rather than
  replace it.
- **v1.0 — 2026-08-28.** First proposal. Built from the `#idea` note of 2026-08-25,
  the `learn-ai-codding` corpus, and web research recorded in `research-01` and
  `research-02`. Structure decisions confirmed with Viktar: full year with Semester 1
  detailed; English document with Polish titles; C#/.NET as the spine with
  alternatives flagged; AI/SDD as the method rather than a topic.
