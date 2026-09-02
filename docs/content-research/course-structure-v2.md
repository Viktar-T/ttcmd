# Course structure v2 — *Aplikacje desktopowe i mobilne*

| | |
| --- | --- |
| Version | **2.4 — proposal** (supersedes v1.1 as the working proposal; v1 stays in the tree, per this folder's rules) |
| Written | 2026-08-30 |
| Status | **Not law.** For Viktar to cut, reorder and reject. Not a spec slice; nothing here authorises an app change (Article IX). Institutional facts stay TO CONFIRM (Article V) |
| Course | 4th year, 8 h/week, two groups, from 2026-09-01 <!-- TO CONFIRM: official PL course title --> |
| Language | This document: English (Article III). Titles: the Polish that would go into frontmatter |
| Built on | [`course-structure-v1.md`](course-structure-v1.md) (v1.1) — the scheme, the mechanics table, Semester 2 and the INF.04 mapping are inherited from it, not repeated; the research files listed there; `docs/content-reader.md`; the discussion of 2026-08-30 |

---

## What v2 changes, and why

**One principle moved: learning by doing, from the first practical lesson.**
v1.1 made students spend roughly 70–80 class hours on trends, prompting
theory and specification method before Moduł 5 let them build an application,
around week 11. That contradicted the course's own evidence twice over: the
structure already placed testing *after* the first app "because students who
have been bitten will care", and the reader file says these students learn
from a thing in front of them, not from an argument. v2 applies the same
logic backwards. Students build desktop applications from about week 3;
theory arrives just in time, in the week whose build forces it.

Four concrete moves, all from the discussion of 2026-08-30:

1. **„Teraz ty” — a new lesson directly after the 1d demo.** The teacher's
   agents build apps on the projector; the same week, students install the
   class tool and try to build something themselves, with zero desktop
   knowledge, framed as an **experiment with a recorded result** — not a task
   with a success criterion. Every outcome is data: the worksheet (prompt
   sent, what happened, what was checked, where it stopped, one thing not
   understood) becomes the first entry of the verification journal, the raw
   material for the first *Rozbierz to*, and the before-picture for December's
   *Bez AI* segment. 1e–1g shift by one letter (consequences below).
2. **The environment module moves to the front.** Old 4d (środowisko pracy)
   plus the tool half of 0b becomes **Moduł 2 — Warsztat**: the IDE with an
   agent, the SDK, the project conventions, and it ends with a window on the
   screen. Nothing practical is taught before the environment exists.
3. **Old Moduł 2 (prompt i kontekst) and part of old Moduł 3 dissolve into
   the build weeks.** Prompt, token and the context window are taught the
   week a student's own session degrades mid-build; rules files the week they
   are tired of re-typing instructions; verification the week the agent lies
   to them. The mapping table below says where every old lesson went — no
   topic is dropped.
4. **The stack is declared provisionally early and ratified late.** Building
   in week 3 means someone chose a stack in week 2. v2 says so honestly: a
   *training stack* is declared in Moduł 2 („wybór potwierdzimy świadomie,
   kiedy będziecie umieli go ocenić”), and the full comparison and the
   decision recorded with students (old 4b/4c) happen in Moduł 5, when they
   have opinions grounded in use. Article VII (presumed C#/.NET, confirmed in
   the opening weeks) already permits this.

**What v2 keeps unchanged:** Moduł 0; Moduł 1 as a reading-and-discussion
module (per Viktar: students read it, and it is discussed on the first
lessons — its class hours shrink, its text does not); the course-wide
mechanics table of v1 (`Zadanie`, `Rozbierz to`, `Bez AI`, dziennik
weryfikacji, peer review, `Prompt`) — with the scheduling change that the
scaffolding mechanics start inside the first build week, not in Moduł 6,
because doing-with-an-agent otherwise becomes watching-an-agent-do
(`research-01` §5, the Anthropic RCT in 1c); small frequent deliverables,
never one large deadline; Semester 2 as sketched in v1.

### The shape in one line

> **Build from week 3; explain each thing in the week that makes it hurt;
> formalise the method (SDD) once the chaos has been felt; decide the stack
> with students once they can judge it.** AI and SDD remain the method;
> desktop first, mobile in Semester 2.

---

## Semester 1

### Moduł 0 — Start

`content/moduly/00-start/` · est. **8 h** · unchanged from v1

0a jak działa ten kurs (+ **the questionnaire**, `docs/ques-for-content-reader.md`,
run in class); 0b konta, sprzęt i instalacja — now mostly a **verification**
lesson, because the lab is prepared before week 1 (see „Lab preparation”
below); each student proves their environment with commands that print
versions; 0c Git i GitHub (written).
0b ttcmd/docs/ques-for-content-reader.md

> **Blocked, with a deadline now.** 0b and the whole of v2 need open
> decisions #1 (lab OS, admin rights) and #4 (accounts and age — the class
> tool requires a Google sign-in) answered **before 1 September**, not "in
> the opening weeks". „Teraz ty” lands in week 2–3.

### Moduł 1 — Jak dziś powstaje oprogramowanie

`content/moduly/01-jak-powstaje-oprogramowanie/` · est. **16 h** (v1.1: 22)
· seven written lessons + one new

A reading module, and preparation: the teacher's view of the profession,
read by students and discussed in class. The 22 h of v1.1 shrink to 16
because the reading moves partly to homework and the discussion is the class
time; the texts are not cut. `czterdzieści lat zmian` stays outside the
module in `content/interesting-to-read/` as optional reading.

|        | Polish title                      | slug                             | v2 change                                                                                                                                                                                                                                                                                                                                                                                        |
| ------ | --------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **1b** | Od podpowiedzi do agenta          | `od-podpowiedzi-do-agenta`       | unchanged                                                                                                                                                                                                                                                                                                                                                                                        |
| **1c** | Co model naprawdę potrafi         | `co-model-naprawde-potrafi`      | unchanged; the questionnaire's E5 aggregate („what we believed in September”) can open it                                                                                                                                                                                                                                                                                                        |
| **1d** | Na żywo: agent buduje aplikację   | `na-zywo-agent-buduje-aplikacje` | unchanged; the fixed point again                                                                                                                                                                                                                                                                                                                                                                 |
| **1e** | **Teraz ty: twój pierwszy agent** | `teraz-ty-pierwszy-agent`        | **NEW.** Students, in the prepared lab, give the class tool a small task of their own choosing and record what happens on the worksheet. No success criterion; the worksheet is graded for honesty of observation, not for a working app. Fallback plan written into the lesson: switch to the second class tool when one free tier throttles; half build / half observe, then swap, if both do. |
| **1f** | Nowy warsztat programisty         | `nowy-warsztat-programisty`      | was 1e — students now read it one week after *being* the person in it                                                                                                                                                                                                                                                                                                                            |
| **1g** | Vibe coding kontra inżynieria     | `vibe-coding-kontra-inzynieria`  | was 1f — „nikt nie czytał diffów” is now about their own Tuesday                                                                                                                                                                                                                                                                                                                                 |
| **1h** | Jak nie wypaść z obiegu           | `jak-nie-wypasc-z-obiegu`        | was 1g                                                                                                                                                                                                                                                                                                                                                                                           |

### Moduł 2 — Warsztat: środowisko pracy

`content/moduly/02-warsztat/` · est. **10 h** · new; absorbs old 4d and the
tool half of old 0b

The lesson the discussion asked for: „how a student organises their
programming environment before programming with agents”. Everything here is
verified by a command, and it ends with a window on the screen.

|        | Polish title                     | slug                    | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------ | -------------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **2a** | Narzędzia: dwa edytory z agentem | `narzedzia-dwa-edytory` | The two class tools — Antigravity and Cursor — as *categories* first (1b's layers made flesh): both agent-first editors, both VS Code forks, so one set of habits serves both. Sign-ins under the school's account rules; where the agent's output lands in each; when to reach for which. Why two, said to students plainly: a spare when one free tier throttles, more combined free usage, and 1h made practical — the category is stable, the names are not.                                                                                                                                                                                                                                                                                                                                               |
| **2b** | Projekt, folder, repozytorium    | `projekt-folder-repo`   | The conventions that survive the whole course: one folder per project, a repo from day one (0c applied), what never enters a repo; the SDK verified (`dotnet --list-sdks`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **2c** | Pierwsze okno                    | `pierwsze-okno`         | The training stack declared, honestly provisional: „C# + Avalonia na czas nauki; wybór potwierdzimy w Module 5”. `dotnet new`, a window runs, the agent changes one visible thing, the student reads the diff.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **2d** | Git i GitHub w pracy z agentem   | `git-w-pracy-z-agentem` | **New in v2.3.** The working level of Git, on the project from 2c — 0c stays the minimum (clone, add, commit, push) and keeps every term it owns; this lesson does not re-explain, it puts the tools to work where agents make them necessary: reading a diff before accepting it (in the terminal and in the editor's diff view); one task, one commit, so the history says what the agent did and when; undoing an agent's change (`restore`, `revert`) as a cheap, boring operation; a branch as a place to let the agent experiment without risk; `.gitignore` for what the build generates (`bin/`, `obj/`); the GitHub repo as the course's working portfolio, where every build from Moduł 3 will land. Prepares the history-as-control habit that Moduł 4's one-commit-per-task discipline formalises. |

### Moduł 3 — Budujemy: pierwsze aplikacje

`content/moduly/03-budujemy/` · est. **26 h** · new doing time; absorbs old
Moduł 2 (16 h) as just-in-time theory (3d runs on the accumulated code of
the three builds rather than a build week of its own)

One small desktop application per week, in the training stack, each small
enough to finish and each chosen to force one concept. Every build week
contains, as fixed segments: ten minutes of diff-reading, one change made by
hand without the agent, and a verification-journal entry. The app names
below are placeholders sized for one week, not decisions.

| | Polish title | slug | Build | The concept it forces (old home) |
| --- | --- | --- | --- | --- |
| **3a** | Budowa 1: co model naprawdę dostaje | `budowa-1-prompt-token-okno` | stoper / licznik | prompt as the whole thread, token, okno kontekstu, why the session degraded (old 2a) |
| **3b** | Budowa 2: jak prosić, żeby dostać | `budowa-2-techniki-promptowania` | notatnik z zapisem | task + format; zero/one/few-shot; meta-prompting as the visible win (old 2b + 2c) |
| **3c** | Budowa 3: reguły zamiast powtarzania | `budowa-3-reguly-projektu` | konwerter jednostek | AGENTS.md-style rules files, project context, why „wklej wszystko” fails (old 2d) |
| **3d** | Halucynacje, weryfikacja i pierwszy Rozbierz to | `halucynacje-i-weryfikacja` | on the accumulated code | fluent ≠ correct; the journal formalised; *Rozbierz to* on a classmate's build (old 2e) |

### Moduł 4 — Specyfikacja zamiast wibracji

`content/moduly/04-specyfikacja/` · est. **20 h** (old Moduł 3, 24 h,
trimmed — the motivation now exists)

Taught to students who have three vibed builds behind them and have felt
what the second „dodaj jeszcze jedno” does to an unspecified app. Lessons as
v1's 3a–3e (po co spec; konstytucja i reguły; pętla spec → plan → zadania;
narzędzia SDD as one loop with five wrappers; pełna pętla) with one change:
**the full loop runs on the rebuild of Budowa 2 or 3** — a desktop app the
student already knows the chaos of — with the console-tool variant kept as
the fallback for students behind. Ends with the „Zbieramy pomysły” brainstorm
moved from old 4e: ideas captured, not committed (the note's 1–2 months ≈
week 9–10 holds).

**Drafted 2026-09-02** (`research-06`; briefs `docs/content-briefs/04-*.md`,
unapproved; lessons `publish: false`). Two calls made there, for Viktar to keep
or overturn: the rebuild target is the **notatnik** (Budowa 2), in a **new
repository `notatnik-v2`**, with the katalog as the extension and the console
notatnik as the fallback; and the brainstorm is a sixth, short lesson rather
than a section of 4e. The loop is run by hand — `konstytucja.md`, `decyzje/`,
`specs/001-notatnik/{spec,plan,tasks}.md` — with no tool installed; the class
editors' plan features appear in 4d as the plan-and-tasks half of the same loop.

|        | Polish title                                   | slug                       | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------ | ---------------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **4a** | Po co komu specyfikacja                        | `po-co-specyfikacja`       | Open the minutnik repository and look for where it says what the app should do — nothing does; the seven rules went into a thread that is gone (Singh's „it's gone”). What a model does with what you did not write, measured (Larbi et al. 2025: −20–40% correct, runnable-but-wrong 24 → 54/65/89%) and bounded honestly (small tasks; no controlled study of the method itself). Brooks 1987: deciding what to build was always the hard part. The term *specyfikacja* defined against prompt, rules file and documentation. Deliverable: the minutnik's description written after the fact, `docs/co-mial-robic.md`, with a „Do ustalenia” list. |
| **4b** | Konstytucja projektu i reguły                  | `konstytucja-i-reguly`     | Three kinds of sentences about a project — how code is written (rules file), what this feature does (spec), what is always true (constitution) — sorted on the katalog's `AGENTS.md`. A six-to-eight-line constitution that outranks every spec and is read at spec and plan time, not on every request; Spec Kit's nine articles as the company-size version. The decision record (Nygard 2011; kontekst · decyzja · odrzucone · skutki), growing 1d's `DECISIONS.md` line into a paragraph. Deliverable: `notatnik-v2` created, first commit = `konstytucja.md` + `decyzje/0001-format-pliku-notatek.md`, no code. |
| **4c** | Pętla: specyfikacja → plan → zadania → kod     | `petla-spec-plan-zadania`  | The method lesson. The loop as a drawing and a four-file table (file → the question it answers → what must not be in it). The notatnik's `spec.md` written in full (cel, dla kogo, co robi, czego nie robi, kryteria K1–K7, do ustalenia); the acceptance criterion as „Kiedy …, to …” + „Sprawdzenie: …”, with the same sentence shape in three notations (North's Given/When/Then, Mavin's EARS as Kiro uses it, OpenSpec's SHALL). Two failure modes: the spec that names a file (wyciek do planu) and the task without a check. The test of a good spec: a fresh session plans from `konstytucja.md` + `spec.md` alone. The size rule: one sentence of change is not a spec. Deliverable: the student's own `specs/001-notatnik/spec.md`, reviewed by a classmate. |
| **4d** | Narzędzia SDD: jedna pętla, pięć opakowań      | `narzedzia-sdd`            | The dated 2025 table (Kiro 14.07 → Spec Kit 02.09 → OpenSpec 06.09 → Tessl 23.09 → Kiro GA 17.11 → Conductor 17.12) and the mapping table your-file ↔ each tool's names — the same four slots. Böckeler's spec-first / spec-anchored / spec-as-source and her critique in her words; the module's answer is the size rule, not a defence. Cursor's Plan Mode and Antigravity's Implementation Plan as the plan-and-tasks half already in the class editors (TO CONFIRM under the school's accounts); why nothing is installed. No build. Deliverable: two `dziennik.md` entries — the editor's plan compared with 4c's. |
| **4e** | Pełna pętla: notatnik od nowa                  | `pelna-petla`              | The build week, procedure with a narrative frame: finish the spec (close „Do ustalenia”; the spec changes before the code, always); plan from a fresh session with two files attached; tasks with „gotowe, gdy”; one task, one commit, `T0n:` in the message; the three things that go wrong (agent does more than the task → revert; task too big → split, appended; build proves the spec wrong → spec first). Every criterion checked with evidence in `dziennik.md`; a review in a fresh context that reports gaps in the criteria, not style. The console notatnik from the same spec as the fallback — and the proof that the spec named no *how*. Two repositories side by side, compared honestly. |
| **4f** | Zbieramy pomysły: co zbudujemy                 | `zbieramy-pomysly`         | Old 4e, short. The bar — **someone real has to use it, and the student counts** — built for a reader who has never had a user. An idea as a spec in miniature: four sentences (co robi · kto go otworzy, a named kind of person · po czym poznam · czego nie robi), three ideas per student, a peer round with one user's question under each. Captured, not committed: the choice waits for Moduł 8. Deliverable: `pomysly.md`, committed. |

The three fixed segments of Moduł 3 (ten minutes of diff reading, one change by
hand, a journal entry) continue in 4e per task; 4a–4d each end with a file
committed, so `notatnik-v2` grows for three lessons before its first line of
code. Hours, indicative only: 2 / 2 / 4 / 2 / 8 / 2 = 20.

### Moduł 5 — Stack na serio i wspólna aplikacja

`content/moduly/05-wspolna-aplikacja/` · est. **40 h** · absorbs old 4a/4b/4c
(~12 h) and old Moduł 5, which shrinks because Moduł 3 already taught the
basics of okno/układ/zdarzenia in practice

| | Polish title | What it does |
| --- | --- | --- |
| **5a** | Co system naprawdę daje aplikacji | old 4a: native vs cross-platform vs web-wrapped — now with three of their own builds as evidence |
| **5b** | Ekosystem .NET i nasza decyzja | old 4b + 4c merged: the honest table, the constraints, the decision **ratified or overturned with students**, recorded as their first ADR („czy zostajemy przy stacku treningowym?”) |
| **5c** | Visual Studio: pełne IDE | **New in v2.2.** First contact with the full IDE — not another VS Code fork: solution and project, the visual designer, the debugger with breakpoints and variable inspection, where the agent editors end and this begins. Matters twice: it is the professional desktop toolchain, and public sources describe the INF.04 practical stations as Visual Studio on Windows — **TO CONFIRM against the school's actual exam stations** (`research-02` §3; Article V — nothing asserted on the site until checked). **From this lesson on, Visual Studio is the main environment for building the desktop apps**: the shared app is created in it and every later desktop module (5–6, and Semester 2's 7–9) presumes it. The agent editors stay in the workflow for agent-driven work — same repo, two doors: Visual Studio for hand work, designer and debugging; Antigravity/Cursor for the agent. |
| **5d** | Od pomysłu do spec.md | the shared app: what it does, what it never does, acceptance criteria |
| **5e** | Plan i lista zadań | commit-sized tasks; how big „small enough” is |
| **5f** | Architektura okna: układ, zdarzenia, stan | the formal pass over what Moduł 3 did by feel; why state does not live in controls — with the debugger from 5c as the way to *watch* state live |
| **5g** | Zapis do pliku i błędy, których nie widać | persistence, exceptions; **the first Bez AI segment of real weight**, done in Visual Studio, where nothing suggests anything |
| **5h** | Przegląd: czy kod robi to, co obiecuje spec | diff vs criteria; peer review round |

### Moduł 6 — Testy, jakość i przegląd kodu

`content/moduly/06-testy-i-jakosc/` · est. **24 h** · unchanged from v1
(6a–6e). Still after the shared app, still the quality floor; the difference
is that its habits (journal, diff-reading, Rozbierz to) have been practiced
weekly since Moduł 3, so this module names and systematises rather than
introduces.

### Where every old lesson went

| v1.1 | v2 |
| --- | --- |
| 1a history | `interesting-to-read/`, optional |
| 1b–1g | 1b–1d unchanged; 1e→1f, 1f→1g, 1g→1h; new 1e Teraz ty |
| 2a prompt/token/okno | 3a |
| 2b techniki promptowania | 3b |
| 2c meta-prompting | 3b |
| 2d kontekst projektu | 3c |
| 2e halucynacje i weryfikacja | 3d |
| 3a–3e specyfikacja | 4 (on a desktop rebuild instead of only a console tool) |
| 4a co to desktop/mobile | 5a |
| 4b ekosystem .NET | 5b |
| 4c nasza decyzja | 5b (ratification) + 2c (provisional declaration) |
| 4d środowisko pracy | 2a–2c |
| 4e burza mózgów | end of Moduł 4 |
| 5a–5f wspólna aplikacja | 5c–5g |
| 6a–6e | unchanged |

## Semester 2

Unchanged from v1 (Moduł 7 mobile, 8 project, 9 release, 10 dalej; gates and
the standing rule „if Moduł 8 is behind, Moduł 10 is what gets cut”). One
delta: students arrive with five months of desktop building instead of one
shared app, so Moduł 7's „same logic, different shell” argument has more to
stand on.

## Volume check

| | Module | v1.1 h | v2 h |
| --- | --- | --- | --- |
| S1 | 0 Start | 8 | 8 |
| S1 | 1 Jak powstaje oprogramowanie | 22 | 16 |
| S1 | 2 Warsztat *(new)* | — | 10 |
| S1 | 3 Budujemy *(new; absorbs old 2)* | 16 | 26 |
| S1 | 4 Specyfikacja *(old 3)* | 24 | 20 |
| S1 | 5 Stack + wspólna aplikacja *(absorbs old 4)* | 16 + 40 | 40 |
| S1 | 6 Testy i jakość | 24 | 24 |
| | **Semester 1** | **150** | **144** |

The v1.1 overrun (open decision #8) is resolved: Moduł 1's reading moves
partly out of class hours, and the shared app shrinks because its basics are
practiced in Moduł 3. 144 h = the 18-week estimate with zero slack — still a
ceiling, not a plan.

---

## Lab preparation — installed on every computer before 1 September

Repo-facing checklist for Viktar and the school administrator. **Stan na
2026-08-30**; every version number and download source is a claim with a
date and must be re-checked at install time (ADR-0008). Nothing here goes on
the student site until 0b is written from what was actually installed
(Article V). Which of the two lists applies is open decision #1.

### Decisions this list encodes

- **Training stack: C# + Avalonia.** The one .NET desktop framework that
  runs on Windows *and* Linux labs (`research-02` §2: MAUI has no Linux
  support; WPF/WinForms are Windows-only). If the labs are confirmed
  Windows-only, WinForms becomes an acceptable simpler alternative — but
  Avalonia keeps the option of Ubuntu labs and of students' own Linux
  machines, so it is the default proposal either way.
- **Class tools: Antigravity (Google) and Cursor — two, on purpose;
  TO CONFIRM.** Both are agent-first editors and VS Code forks, so one set
  of habits serves both; each has a free tier — vendor claims with dates,
  checked and recorded at install time, never asserted on the site. Two
  tools buy three things: redundancy when one tier throttles mid-lesson
  (the 1e fallback), roughly double the free usage per student across two
  accounts of their own, and the practical form of 1h's lesson — the
  category is stable, the names are not. Every lesson stays written
  tool-neutral per `docs/content-style.md`; a build week names one tool as
  primary and the other appears in a „to samo zadanie, drugi edytor”
  exercise. Antigravity requires a **Google sign-in**, Cursor **its own
  account** (e-mail, Google or GitHub) — both **blocked on open decision
  #2** (whose accounts, whose consent). Plain **VS Code** stays on every
  machine as the neutral editor for `Bez AI` segments and the fallback if a
  vendor changes terms mid-semester. Do **not** pre-sign-in anything on lab
  machines; sign-in is the student's own action in 2a, under whatever the
  school decides.
- **Visual Studio Community — from Moduł 5 the main environment for
  building desktop apps; Windows only.** The agent editors and VS Code are
  all VS *Code*-family; the full Visual Studio is a different program, and
  students should not meet the difference for the first time in an exam
  room: public sources describe INF.04 practical
  stations as Visual Studio on Windows (`research-02` §3 — TO CONFIRM
  against the school's stations). Install the current Community edition
  (licence terms for classroom use TO CONFIRM at install time) with the
  „.NET desktop development” workload at image time — it is a tens-of-GB
  download, not a lesson activity. **Visual Studio does not exist for
  Linux**: if the lab is list B, where students meet it is open decision #9.
- **No admin rights needed after imaging.** Everything students do in class
  must work from a standard account. Anything requiring elevation is on
  these lists, done once, before week 1.

### Per-user traps (both systems)

Four things are **per-user, not per-machine**, and two groups share the
machines. Either the lab's profile management handles them, or they are a
scripted first-login step verified in 0b:

1. VS Code / Antigravity **extensions and settings** live in the user
   profile.
2. `dotnet new` **templates** (Avalonia) are installed per user:
   `dotnet new install Avalonia.Templates`.
3. The **NuGet package cache** (`~/.nuget`) is per user — the first
   `dotnet run` downloads packages. Warm it per profile (run one template
   build at image/first-login time), or thirty students will hit the network
   simultaneously in lesson 2c.
4. **Visual Studio's first launch** does minutes of per-user configuration.
   Launch it once per profile at image or first-login time, or lesson 5c
   loses its first quarter-hour to thirty progress bars.

### Network allowlist (school filtering)

`ttcmd.vercel.app` · `github.com` (+ `raw.githubusercontent.com`,
`codeload.github.com`) · `dotnet.microsoft.com` and `builds.dotnet.microsoft.com` ·
`api.nuget.org` · `code.visualstudio.com`, `update.code.visualstudio.com`,
`marketplace.visualstudio.com` · `visualstudio.microsoft.com`,
`download.visualstudio.microsoft.com` and `aka.ms` (Visual Studio installer) · `antigravity.google` plus Google
account/API endpoints (`accounts.google.com`, `*.googleapis.com`) ·
`cursor.com` plus its update and API endpoints — for both tools the exact
endpoint list is TO CONFIRM against their documentation at install time ·
one public tokenizer page for 3a (choose and allowlist it then).

### A. Windows lab (Windows 10/11, TO CONFIRM which)

Install as administrator, once per machine; verify per user.

1. **OS updated**; a standard (non-admin) student account model confirmed
   with the administrator; Polish keyboard.
2. **Browser** — Edge is present; Chrome optional.
3. **Git for Windows** — `winget install Git.Git` (includes Git Credential
   Manager, which 0c's GitHub push needs).
4. **.NET SDK 10 (LTS)** — `winget install Microsoft.DotNet.SDK.10`.
   Current LTS as of 2026-08 (`research-02` §2; .NET 11 is STS, due
   2026-11-10 — do not chase it mid-semester). Verify: `dotnet --list-sdks`.
5. **Visual Studio Code** — `winget install Microsoft.VisualStudioCode`
   (machine-wide installer). Extensions per user in first login script: the
   C# extension (or C# Dev Kit — its licence for education TO CONFIRM at
   install time).
6. **Visual Studio Community** — current edition (2026 line; exact edition,
   winget id and classroom licence terms TO CONFIRM at install time) with
   the **„.NET desktop development”** workload. Needed from Moduł 5, but
   installed now: it is a tens-of-GB download per machine, and the lab does
   it once at image time, not mid-semester. First launch per user — see
   per-user trap 4.
7. **Antigravity** — installer from `antigravity.google` (winget package TO
   CONFIRM at install time). Installed, never signed in.
8. **Cursor** — installer from `cursor.com` (winget package TO CONFIRM at
   install time). Installed, never signed in.
9. **Avalonia templates + cache warm-up**, per user profile:
   `dotnet new install Avalonia.Templates`, then in a temp folder
   `dotnet new avalonia.app -o smoke && cd smoke && dotnet build`.
10. **Optional fallback for 1e** (zero-toolchain try-it if .NET breaks):
    Python 3 with Tkinter — `winget install Python.Python.3.13`
    (version TO CONFIRM); verify `python -c "import tkinter"`.
11. **Smoke test, per machine, before week 1**: as a student account, clone
    a repo from GitHub, `dotnet run` the warmed Avalonia app, open
    Antigravity and Cursor to their sign-in screens, launch Visual Studio
    once (it must reach its start window, already configured), open
    `ttcmd.vercel.app`. Six checks, written down.

### B. Linux lab (Ubuntu LTS — 26.04, TO CONFIRM which the school images)

Install with `sudo`, once per machine; verify per user. Desktop Ubuntu with
X11/Wayland as imaged is sufficient for Avalonia.

1. **OS updated** (`sudo apt update && sudo apt upgrade`); standard student
   accounts; Polish keyboard (`settings` or `gsettings`).
2. **Browser** — Firefox is present; Chrome/Chromium optional.
3. **Git** — `sudo apt install git`. For GitHub pushes over HTTPS students
   will need a credential helper (Git Credential Manager or
   `gh auth login` via **GitHub CLI**: `sudo apt install gh`) — decide one
   in 0b and verify it.
4. **.NET SDK 10 (LTS)** — `sudo apt install dotnet-sdk-10.0` from the
   Ubuntu feed **if the imaged release carries it (TO CONFIRM)**; otherwise
   Microsoft's install script (`dotnet-install.sh`) or the
   `packages.microsoft.com` repo. Verify: `dotnet --list-sdks`.
5. **Visual Studio Code** — the `.deb` from `code.visualstudio.com` (adds
   Microsoft's apt repo; keeps updates working). The snap also works;
   choose one for the whole lab. Extensions per user, as on Windows.
6. **Antigravity for Linux** — download from `antigravity.google`
   (**the existence and format of the Linux build — .deb vs tarball — TO
   CONFIRM at install time**). Installed, never signed in.
7. **Cursor for Linux** — download from `cursor.com` (**format TO CONFIRM
   at install time — historically an AppImage, which may need `libfuse2`
   on some releases; verify it launches from a student account**).
   Installed, never signed in.
   If either tool's Linux build is absent or broken, the other becomes the
   single class tool and VS Code + an agent extension the alternative — the
   lessons do not change, only 2a's wording.
8. **Visual Studio — does not exist for Linux.** No install step can fix
   this: if the lab is Ubuntu, lesson 5c and INF.04 preparation need Windows
   machines from somewhere — the exam stations, a second room, or a policy
   decision (open decision #9). Decide before Moduł 5, not in it.
9. **Avalonia templates + cache warm-up**, per user profile: same two
   commands as Windows step 9.
10. **Optional fallback for 1e**: `sudo apt install python3-tk`; verify
    `python3 -c "import tkinter"`.
11. **Smoke test** — the Windows step 11 checks minus Visual Studio.

### The teacher's demo machine (1d)

Not lab prep, but on the same deadline: the three agents of the demo
(per 1d: Claude Code, Cursor, Antigravity) installed, signed in with
Viktar's own accounts, and the demo prompt rehearsed on the classroom
projector and network — not at home.

---

## Open decisions — for Viktar

| # | Decision | Deadline | Blocks |
| --- | --- | --- | --- |
| 1 | Lab OS (list A or B) and admin/profile model | before imaging, August | everything above; 0b; 1e |
| 2 | Accounts and age: may students sign into Google (Antigravity), Cursor and GitHub, on whose consent | before week 2 | 1e, 2a, 0c pushes |
| 3 | Two class tools, Antigravity + Cursor, with VS Code as the neutral editor and fallback — confirm, with both free tiers' terms checked and dated | week 1 | 2a; the 1e fallback plan |
| 4 | Training stack C# + Avalonia (vs WinForms on Windows-only labs) | with #1 | 2c, all of Moduł 3 |
| 5 | Approve the 1e insertion and the 1e→1f→1g→1h letter shift; update `docs/content-style.md` appendix and audit references in the same change | before 1 September (letters are spoken aloud) | Moduł 1 |
| 6 | Moduł 1 reading: how much homework vs class time (the 22→16 h assumption) | week 1 | the volume table |
| 7 | The v1-scoped briefs `docs/content-briefs/02-index.md` and `02a-prompt-token-kontekst.md` are superseded — re-derive for 2a–2c and 3a once v2 is approved | after approval | write-lesson runs |
| 8 | Whether the INF.04 mapping of v1 still holds against this order (indicative only until checked against CKE) | semester 1 | nothing on the site |
| 9 | What environment the school's INF.04 practical stations actually run, and — if the lab is Ubuntu — where students get Visual Studio hours (exam stations? a Windows room?) | before Moduł 5 | 5c; exam preparation |

## Changelog

- **v2.4 — 2026-09-02.** **Moduł 4 lesson table added** (4a–4f), recording the
  shape drafted that day from `research-06-spec-driven-development.md`: the
  full loop runs on a rebuild of the **notatnik** in a new repository
  `notatnik-v2` (katalog as extension, console notatnik as fallback), by hand
  with no tool installed; the „Zbieramy pomysły” brainstorm becomes a sixth,
  short lesson 4f; 4c's title says *specyfikacja*, not „spec”. The paragraph
  above the table is unchanged; the table describes unapproved drafts
  (`publish: false`) and the reasons live in `docs/content-briefs/04-*.md`.
  Hours unchanged (20).
- **v2.3 — 2026-08-30.** **2d Git i GitHub w pracy z agentem** added to
  Moduł 2 (Viktar's call): the working level of Git on the 2c project —
  diff-reading before accepting, one task one commit, undoing an agent's
  change, a branch for experiments, `.gitignore` for build output, the
  GitHub repo as the course portfolio. 0c keeps the minimum and its term
  ownership; nothing is re-explained. Moduł 2 goes 8 → 10 h, Moduł 3 28 →
  26 h (3d works on accumulated code, not a fresh build), so Semester 1
  stays at 144 h.
- **v2.2 — 2026-08-30.** **Visual Studio** added, and from Moduł 5 it is
  the **main environment for building desktop apps** (Viktar's call): new
  lesson 5c (full IDE — solution, designer, debugger; the shared app is
  created in it; the agent editors stay as the agent's door into the same
  repo; old 5c–5g shift to 5d–5h), a Community-edition step in the Windows install
  list with the „.NET desktop development” workload, per-user trap 4 (first
  launch), allowlist entries, the Ubuntu list's honest note that Visual
  Studio does not exist for Linux, and open decision #9 (where VS hours
  happen if the lab is Ubuntu; what the INF.04 stations really run — TO
  CONFIRM, `research-02` §3).
- **v2.1 — 2026-08-30.** Cursor added as the **second class tool** beside
  Antigravity (Viktar's call): two free tiers per student on their own
  accounts, experience in two agent-first editors, and a built-in spare when
  one tier throttles mid-lesson. Both install lists, the network allowlist,
  lesson 2a, the 1e fallback and open decisions #2–#3 updated; VS Code
  recast as the neutral editor for `Bez AI` segments and the last-resort
  fallback. Free-tier sizes are deliberately not written anywhere
  student-facing — they are dated vendor claims, checked at install time
  (ADR-0008).
- **v2.0 — 2026-08-30.** Learning-by-doing restructure, from the discussion
  of 2026-08-30: „Teraz ty” lesson inserted after the 1d demo (letters
  shift); environment module (Warsztat) moved to position 2 with a
  provisional training stack; old Moduł 2 dissolved into four build weeks
  (Moduł 3) as just-in-time theory; specification module runs its full loop
  on a rebuild of a student's own app; old Moduł 4 split between Warsztat
  (environment), Moduł 5 (stack ratification with students) and Moduł 4's
  end (brainstorm); Semester 1 lands on 144 h, resolving v1.1's open
  decision #8. Added the lab-preparation lists (Windows and Ubuntu) with the
  per-user traps, the network allowlist and the smoke tests. Semester 2,
  course-wide mechanics, numbering scheme and INF.04 mapping inherited from
  v1.1 unchanged.
- **v1.1 / v1.0** — see [`course-structure-v1.md`](course-structure-v1.md).
