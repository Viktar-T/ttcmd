# Course structure v2 — *Aplikacje desktopowe i mobilne*

| | |
| --- | --- |
| Version | **2.9 — proposal** (supersedes v1.1 as the working proposal; v1 stays in the tree, per this folder's rules; v2.5 and v2.6 revised in place on 2026-09-02; v2.7 and v2.8 on 2026-09-09; v2.9 on 2026-09-10) |
| Written | 2026-08-30 |
| Status | **Not law.** For Viktar to cut, reorder and reject. Not a spec slice; nothing here authorises an app change (Article IX). Institutional facts stay TO CONFIRM (Article V) |
| Course | 4th year, 8 h/week, two groups, from 2026-09-01 <!-- TO CONFIRM: official PL course title --> |
| Language | This document: English (Article III). Titles: the Polish that would go into frontmatter |
| Built on | [`course-structure-v1.md`](course-structure-v1.md) (v1.1) — the scheme, the mechanics table, Semester 2 and the INF.04 mapping are inherited from it, not repeated; the research files listed there; `docs/surveys/content-reader.md`; the discussions of 2026-08-30, 2026-09-02 and 2026-09-10; the survey aggregate `docs/surveys/ankieta-start-2026-09-aggregate.md` |

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

## What v2.5 changes, and why

**Revised 2026-09-02**, from three things that happened that day: the
discussion of a by-hand fundamentals module (`change-proposal-2026-09-02-modul-5-pod-maska.md`),
the first twelve answers to the start-of-course survey
(`docs/surveys/ankieta-start-2026-09-aggregate.md`), and Viktar's decisions on
both. Everything from v2.0–v2.4 that is not named below stands.

1. **Moduł 1 becomes free-time reading, and the demo closes it.** The five
   reading lessons are not cut — they stay for students who want them — but
   they leave the class hours. The one lesson done in class is the demo
   (`na-zywo-agent-buduje-aplikacje`), now the **last** lesson of the module,
   so that it leads straight into the first lesson of Moduł 2. Class hours
   16 → 4.
2. **„Teraz ty” opens Moduł 2 as 2a.** Viktar's flow in class: the demo on
   the teacher's screen, then straight to the student's own twenty-five
   minutes. The former 2a–2d are now 2b–2e. The lesson gains a **Krok 2** —
   what an editor with an agent is, and installing both class tools — because
   the survey showed the class does not have them; the former Krok 2 and 3
   (first message, observation card) became its first exercise.
3. **A reading lesson on C# at the end of Moduł 2 (2f).** The survey: C# is
   unknown to 11 of 12, and only 5 of 12 write simple programs in *any*
   language, Java being the strongest. Every lesson from 2d on assumes a diff
   in C# can be read. 2f is „C# na pierwszy rzut oka, dla kogoś po Javie i
   C++”: the six constructs met in every generated diff, each beside its
   Java/C++ shape. **Brief first, per `write-lesson`; not drafted in v2.5.**
4. **Moduł 3's „one change by hand” becomes a thirty-minute block per week
   that owns one construct** — a list in 3a, `try`/`catch` in 3b, an event
   handler in 3c — added to the student's own agent-built app, with code
   they type and a commit of their own. Written into the three lessons on
   2026-09-02.
5. **Moduł 5 is a by-hand fundamentals module, „Pod maską”.** The stack
   decision and Visual Studio it already owned (old 5a–5c), then the
   constants since 1984 built with the student's own hands, then one feature
   of `notatnik-v2` rebuilt three ways (no AI / completion only / agent).
   The shared application becomes **Moduł 6**, tests **Moduł 7**, Semester 2
   shifts to 8–11. Details in the Moduł 5 section and in the change proposal.
6. **A recorded principle is reversed on purpose.** v1.1's shape said: *„There
   is no point where the course «switches back» to programming without AI.”*
   v2.5 contradicts it, and the reason is the one 1f already gives students:
   the editor role needs *wyczucie* that only hand-built things produce
   („ty tego wyczucia jeszcze nie masz”). Hand-coding's purpose changed from
   production to judgment; that is a reason to teach less of it than in 2019
   and to teach it deliberately, not to teach none. Rejected alternatives:
   folding it into the shared app as segments only (the contrast stays
   invisible); placing it after the shared app (students would build the
   shared app unable to read what they accept); making it optional reading.
7. **Hours.** Moduł 1's twelve freed hours go to Moduł 2 (+4: 2a, 2f) and
   Moduł 5 (+4 over the proposal's 24, because the survey says the module
   starts lower than planned — collections, exceptions and events are owned
   there, not recalled), and four hours become the first slack this plan has
   ever had. Semester 1: **140 h + 4 h slack = 144**.

The survey also moved the reader file. The three facts every brief from here
on starts from: no one has taken INF.03 (so no PHP/SQL to lean on), half the
room cannot explain one concept from the D1 list, and 11 of 12 use a terminal
and Linux beyond lessons. `docs/surveys/content-reader.md` carries the counts.

### The shape in one line, v2.5

> **Build from week 3; explain each thing in the week that makes it hurt;
> formalise the method (SDD) once the chaos has been felt; then open the hood
> and build by hand what the agent has been building for you, so you can
> judge it; decide the stack with students once they can judge it.** AI and
> SDD remain the method; the by-hand module exists to make the student a
> competent editor of the agent's work, not a faster typist.

---
## What v2.9 changes, and why

**Revised 2026-09-10**, from the discussion of the same day. One principle
moves again: **the application a student chooses is not the reward at the end
of the course, it is the vehicle through the middle of it.** Everything from
v2.0–v2.8 that is not named below stands.

1. **The student's own application becomes Moduł 5 — „Twoja aplikacja”
   (22 h).** „Zbieramy pomysły” leaves Moduł 4, opens the new module as **5a**
   and stops being a capture: the student chooses. A new **5b** cuts the
   chosen idea to a size that fits. The rest of the module is the spine of the
   deleted shared-application module — specification, plan, two build weeks,
   review — run on each student's own idea instead of one idea for the room.
2. **„Wspólna aplikacja” is deleted, not moved.** Its five lessons *are* the
   last five lessons of the new Moduł 5; only the object changes. Its 20 h
   plus 4f's 2 h fund the new module exactly, so nothing below Moduł 7
   renumbers and Semester 2 is untouched.
3. **„Pod maską” becomes Moduł 6** — same shape, same eight lessons, same
   28 h — **and changes what it opens the hood on.** The by-hand lessons now
   run on the application the student built in Moduł 5 rather than on the
   neutral `spis` project, and the closing contrast lesson rebuilds one of its
   own features. This reverses a v2.6 drafting decision.
4. **Moduł 4 drops to 18 h** and ends on „Pełna pętla”.

**The reason.** The survey: „umiem samemu napisać program” is what a
successful June means to this class (4 of 9 on J4), **12 of 12 have no project
of their own**, and 5 of 12 describe their largest program as „nobody,
unfinished”. A module whose object is *their* application is the only place in
the plan where those three facts are answered at once. The order it produces
is also better than the one it replaces: a student who has shipped something
of their own arrives at Moduł 6 with a reason to look under the hood, and at
Moduł 7 with an application big enough to have hurt them — the motivation v1
wanted for the testing module and could only assert.

**What v2.9 does not do.** It does not shorten „Pod maską” (Viktar's call: the
module keeps 28 h and all eight lessons — the by-hand thread is what the
survey's „programowania ręcznie nadal warto się uczyć” = 4,0 asked for, and
cutting it would trade the part students asked for against the part the method
prefers). It does not touch Semester 2. It does not decide what Moduł 9 builds
(open decision #15).

**What it costs, stated where it cannot be missed.** Two bills, neither paid by
this file:

- **Seven published sentences say „Moduł 5” and mean the by-hand module** —
  the stack decision in `02-warsztat/index.mdx`, and six pointers in
  `03-budujemy` (`budowa-1` ×3, `budowa-2` ×1, `budowa-3` ×2) promising
  „budowa okna od podstaw”, „zapis do pliku od podstaw” and „obsługa
  kliknięcia” in Moduł 5. A module's number is identity (Article VI) and these
  numbers have been spoken in class. They are listed in the changelog entry
  and must be rewritten in the same change.
- **Nine `05-*` briefs and nine drafted lessons move from `05-pod-maska/` to
  `06-pod-maska/`**, and their running example changes from `spis` to the
  student's own application. That second half is a rewrite of the code blocks
  in 6d–6g, not a rename. The `tmp-modul5-build/` stages survive as the
  teacher's reference implementation.

### The shape in one line, v2.9

> **Build from week 3; explain each thing in the week that makes it hurt;
> formalise the method once the chaos has been felt; then build the
> application you chose yourself; then open the hood on that same application,
> so you can judge what an agent wrote for you.** From Moduł 5 onward the
> student's own application is the object of every module — Moduł 6 takes it
> apart, Moduł 7 tests it, Semester 2 puts it on a phone and releases it.

---
## Semester 1

### Moduł 0 — Start

`content/moduly/00-start/` · est. **8 h** · unchanged from v1

0a jak działa ten kurs (+ **the questionnaire**, `docs/surveys/ques-for-content-reader.md`,
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

`content/moduly/01-jak-powstaje-oprogramowanie/` · in class **4 h** (v2.4: 16; those hours are the demo, which left for
Moduł 2 in v2.7 — see the changelog) · five lessons, all read in the
student's own time

**v2.5:** a reading module in the literal sense. The five texts stay exactly
as they are — the teacher's view of the profession, for students who want to
read — and leave the class hours; the class time is the demo and the
discussion it starts.

**v2.7 (2026-09-09, Viktar's call):** the demo leaves the module altogether
and opens Moduł 2 as **2a**. The classroom order it was chasing in v2.5 — the
demo on the teacher's screen, then the student's own twenty-five minutes — is
now one unbroken pair inside one module, and Moduł 1 is purely reading. The
five reading lessons keep their orders 2–6, so no published letter or URL
moved. `czterdzieści lat zmian` stays outside the module in
`content/interesting-to-read/` as optional reading.

|        | Polish title                    | slug                             | v2.5 change                                                                                                                          |
| ------ | ------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **1b** | Od podpowiedzi do agenta        | `od-podpowiedzi-do-agenta`       | unchanged; reading                                                                                                                   |
| **1c** | Co model naprawdę potrafi       | `co-model-naprawde-potrafi`      | unchanged; reading. The survey's E5 aggregate can open it — and the argument's direction flips: this class already distrusts AI code (mean 2,2), what it has not seen is how much the tools do when driven well |
| **1d** | Nowy warsztat programisty       | `nowy-warsztat-programisty`      | was 1f; reading. Opening no longer assumes „Teraz ty”; refers to the demo as seen in class, with a link                             |
| **1e** | Vibe coding kontra inżynieria   | `vibe-coding-kontra-inzynieria`  | was 1g; reading                                                                                                                      |
| **1f** | Jak nie wypaść z obiegu         | `jak-nie-wypasc-z-obiegu`        | was 1h; reading                                                                                                                      |

„Teraz ty: twój pierwszy agent” → **2b**, and „Na żywo: agent buduje
aplikację” → **2a** (both below).
### Moduł 2 — Warsztat: środowisko pracy

`content/moduly/02-warsztat/` · est. **14 h** (v2.4: 10) · absorbs „Teraz
ty” and, from v2.7, the demo from Moduł 1, and gains a reading lesson on C#.
From v2.8 two lessons are dropped on Viktar's request: „Narzędzia: dwa
edytory z agentem” (the two class editors are installed and used in „Teraz
ty”, and no lesson is spent on the pair as a category) and „Git i GitHub w
pracy z agentem” (Git stays at the 0c level, and the `.gitignore` step moves
into „Pierwsze okno”). The hour estimate is not re-derived here.

The lesson the discussion asked for: „how a student organises their
programming environment before programming with agents”. Everything here is
verified by a command, and it ends with a window on the screen — and, from
v2.5, with a first reading of the language the window is written in.

|        | Polish title                                           | slug                       | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------ | ------------------------------------------------------ | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **2a** | Na żywo: agent buduje aplikację                        | `na-zywo-agent-buduje-aplikacje` | **Moved from 1g in v2.7.** The one lesson watched together on the teacher's screen, now opening the module it hands over to: one prompt, three agents, three applications, and the list of things to watch for. Its closing paragraph points forward to „Teraz ty” and back at 1d as free-time reading. |
| **2b** | **Teraz ty: twój pierwszy agent**                      | `teraz-ty-pierwszy-agent`  | **Moved from 1e in v2.5, renumbered from 2a in v2.7.** Straight after the demo: the student installs both class editors (**Krok 2**, new — what an editor with an agent is, download, first launch, sign-in deferred to the class rules, one empty folder), gives the agent a small task of their own choosing and records what happens on the observation card — now the lesson's first exercise, numbered by the build. No success criterion; the card is graded for honesty of observation. Fallback plan kept: switch to the second editor, then pairs. Vendor facts dated 2026-09-02. |
| **2c** | Projekt, folder, repozytorium                          | `projekt-folder-repo`      | was 2b, then 2d. The conventions that survive the whole course: one folder per project, a repo from day one (0c applied), what never enters a repo; the SDK verified (`dotnet --list-sdks`).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **2d** | Pierwsze okno                                          | `pierwsze-okno`            | was 2c, then 2e. The training stack declared, honestly provisional: „C# + Avalonia na czas nauki; wybór potwierdzimy w Module 6”  *(v2.9: was „w Module 5”; the published sentence must be rewritten with it)*. `dotnet new`, a window runs, the agent changes one visible thing, the student reads the diff.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **2e** | **C# na pierwszy rzut oka, dla kogoś po Javie i C++** | `csharp-na-pierwszy-rzut-oka` | **New in v2.5; brief first, not drafted.** A reading lesson, no build: the six constructs the student will meet in every generated diff — a class with properties, `List<T>`, `try`/`catch`, an event handler with its two parameters, `async`, and the file/namespace shape of a project — each shown beside the Java or C++ form the reader knows, on the `pierwsze-okno` project they already have. Owns the *reading* of C#; the by-hand Moduł 3 blocks and Moduł 6 own the *writing*. Reader position from the survey: Java strongest (5 write simple programs), C# 11 of 12 „nie znam”. |
### Moduł 3 — Budujemy: pierwsze aplikacje

`content/moduly/03-budujemy/` · est. **26 h** · new doing time; absorbs old
Moduł 2 (16 h) as just-in-time theory (3d runs on the accumulated code of
the three builds rather than a build week of its own)

One small desktop application per week, in the training stack, each small
enough to finish and each chosen to force one concept. Every build week
contains, as fixed segments: ten minutes of diff-reading, **a thirty-minute
block by hand, without the agent, that owns one language construct** (v2.5:
a list in 3a, `try`/`catch` in 3b, an event handler in 3c — typed into the
student's own agent-built app, committed as their own), and a
verification-journal entry. The app names
below are placeholders sized for one week, not decisions.

| | Polish title | slug | Build | The concept it forces (old home) |
| --- | --- | --- | --- | --- |
| **3a** | Budowa 1: co model naprawdę dostaje | `budowa-1-prompt-token-okno` | stoper / licznik | prompt as the whole thread, token, okno kontekstu, why the session degraded (old 2a) |
| **3b** | Budowa 2: jak prosić, żeby dostać | `budowa-2-techniki-promptowania` | notatnik z zapisem | task + format; zero/one/few-shot; meta-prompting as the visible win (old 2b + 2c) |
| **3c** | Budowa 3: reguły zamiast powtarzania | `budowa-3-reguly-projektu` | konwerter jednostek | AGENTS.md-style rules files, project context, why „wklej wszystko” fails (old 2d) |
| **3d** | Halucynacje, weryfikacja i pierwszy Rozbierz to | `halucynacje-i-weryfikacja` | on the accumulated code | fluent ≠ correct; the journal formalised; *Rozbierz to* on a classmate's build (old 2e) |

### Moduł 4 — Specyfikacja zamiast wibracji

`content/moduly/04-specyfikacja/` · est. **18 h** (v2.5: 20; „Zbieramy
pomysły” left for Moduł 5 in v2.9. Old Moduł 3, 24 h, trimmed — the
motivation now exists)

Taught to students who have three vibed builds behind them and have felt
what the second „dodaj jeszcze jedno” does to an unspecified app. Lessons as
v1's 3a–3e (po co spec; konstytucja i reguły; pętla spec → plan → zadania;
narzędzia SDD as one loop with five wrappers; pełna pętla) with one change:
**the full loop runs on the rebuild of Budowa 2 or 3** — a desktop app the
student already knows the chaos of — with the console-tool variant kept as
the fallback for students behind. **v2.9:** the module now ends on „Pełna
pętla”. The „Zbieramy pomysły” brainstorm that used to close it is **5a**,
and it chooses rather than captures; the note's 1–2 months ≈ week 9–10 still
holds, because Moduł 5 opens where Moduł 4 ended.

**Drafted 2026-09-02** (`research-06`; briefs `docs/content-briefs/04-*.md`,
unapproved; lessons `publish: false`). Two calls made there, for Viktar to keep
or overturn: the rebuild target is the **notatnik** (Budowa 2), in a **new
repository `notatnik-v2`**, with the katalog as the extension and the console
notatnik as the fallback; and the brainstorm is a sixth, short lesson rather
than a section of 4e — **that lesson moved to Moduł 5 in v2.9; the call
stands, the module it belongs to changed.** The loop is run by hand — `konstytucja.md`, `decyzje/`,
`specs/001-notatnik/{spec,plan,tasks}.md` — with no tool installed; the class
editors' plan features appear in 4d as the plan-and-tasks half of the same loop.

|        | Polish title                                   | slug                       | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------ | ---------------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **4a** | Po co komu specyfikacja                        | `po-co-specyfikacja`       | Open the minutnik repository and look for where it says what the app should do — nothing does; the seven rules went into a thread that is gone (Singh's „it's gone”). What a model does with what you did not write, measured (Larbi et al. 2025: −20–40% correct, runnable-but-wrong 24 → 54/65/89%) and bounded honestly (small tasks; no controlled study of the method itself). Brooks 1987: deciding what to build was always the hard part. The term *specyfikacja* defined against prompt, rules file and documentation. Deliverable: the minutnik's description written after the fact, `docs/co-mial-robic.md`, with a „Do ustalenia” list. |
| **4b** | Konstytucja projektu i reguły                  | `konstytucja-i-reguly`     | Three kinds of sentences about a project — how code is written (rules file), what this feature does (spec), what is always true (constitution) — sorted on the katalog's `AGENTS.md`. A six-to-eight-line constitution that outranks every spec and is read at spec and plan time, not on every request; Spec Kit's nine articles as the company-size version. The decision record (Nygard 2011; kontekst · decyzja · odrzucone · skutki), growing 1d's `DECISIONS.md` line into a paragraph. Deliverable: `notatnik-v2` created, first commit = `konstytucja.md` + `decyzje/0001-format-pliku-notatek.md`, no code. |
| **4c** | Pętla: specyfikacja → plan → zadania → kod     | `petla-spec-plan-zadania`  | The method lesson. The loop as a drawing and a four-file table (file → the question it answers → what must not be in it). The notatnik's `spec.md` written in full (cel, dla kogo, co robi, czego nie robi, kryteria K1–K7, do ustalenia); the acceptance criterion as „Kiedy …, to …” + „Sprawdzenie: …”, with the same sentence shape in three notations (North's Given/When/Then, Mavin's EARS as Kiro uses it, OpenSpec's SHALL). Two failure modes: the spec that names a file (wyciek do planu) and the task without a check. The test of a good spec: a fresh session plans from `konstytucja.md` + `spec.md` alone. The size rule: one sentence of change is not a spec. Deliverable: the student's own `specs/001-notatnik/spec.md`, reviewed by a classmate. |
| **4d** | Narzędzia SDD: jedna pętla, pięć opakowań      | `narzedzia-sdd`            | The dated 2025 table (Kiro 14.07 → Spec Kit 02.09 → OpenSpec 06.09 → Tessl 23.09 → Kiro GA 17.11 → Conductor 17.12) and the mapping table your-file ↔ each tool's names — the same four slots. Böckeler's spec-first / spec-anchored / spec-as-source and her critique in her words; the module's answer is the size rule, not a defence. Cursor's Plan Mode and Antigravity's Implementation Plan as the plan-and-tasks half already in the class editors (TO CONFIRM under the school's accounts); why nothing is installed. No build. Deliverable: two `dziennik.md` entries — the editor's plan compared with 4c's. |
| **4e** | Pełna pętla: notatnik od nowa                  | `pelna-petla`              | The build week, procedure with a narrative frame: finish the spec (close „Do ustalenia”; the spec changes before the code, always); plan from a fresh session with two files attached; tasks with „gotowe, gdy”; one task, one commit, `T0n:` in the message; the three things that go wrong (agent does more than the task → revert; task too big → split, appended; build proves the spec wrong → spec first). Every criterion checked with evidence in `dziennik.md`; a review in a fresh context that reports gaps in the criteria, not style. The console notatnik from the same spec as the fallback — and the proof that the spec named no *how*. Two repositories side by side, compared honestly. |

The three fixed segments of Moduł 3 (ten minutes of diff reading, one change by
hand, a journal entry) continue in 4e per task; 4a–4d each end with a file
committed, so `notatnik-v2` grows for three lessons before its first line of
code. Hours, indicative only: 2 / 2 / 4 / 2 / 8 = 18.

### Moduł 5 — Twoja aplikacja

`content/moduly/05-twoja-aplikacja/` · est. **22 h** · **new in v2.9** ·
absorbs 4f („Zbieramy pomysły”, 2 h) and the whole of the deleted „Wspólna
aplikacja” (five lessons, 20 h)

The module where each student builds the application they chose. It is the
shared-application module with one substitution — thirty ideas instead of one
— and the substitution is the point: the survey says autonomy, not speed, is
what „udany kurs” means to this class (J4), and that 12 of 12 have no project
of their own.

Taught to students who have four repositories behind them, one of them built
from a spec whose criteria they checked with evidence, and who have just
written down three ideas they would open themselves. What they cannot yet do
is **judge size** — their modal largest program is about 100 lines — so the
scope gate of 5b is load-bearing, not administrative: an idea leaves 5b cut
to something that fits, or it does not leave 5b.

**The teaching problem this module creates, and its answer.** Two groups of
thirty means up to sixty different applications, each stuck differently, in a
class whose survey already names „too little help” as what went worst before.
The answer is that **the zadania are a rubric of capabilities, never a
walkthrough.** No task in this module may name a feature — sixty applications
share none. A task may say: *twoja specyfikacja ma kryteria K1–K7* · *jedno
zadanie, jeden commit* · *aplikacja pamięta coś po zamknięciu* · *aplikacja
przeżywa błąd, który użytkownik może spowodować* · *otworzył ją ktoś, kto nie
nazywa się tak jak ty*. The same gate for everyone, a different application
behind it. Any task that presumes a list, a window layout or a file format
has broken the module.

|        | Polish title (proposed)                    | slug                         | What it does                                                                                                                                                                                                                                                                                                                                                                                                                     | h |
| ------ | ------------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | - |
| **5a** | Trzy pomysły, jeden wybór                  | `wybieramy-co-zbudujemy`     | **Moved from 4f, with its ending reversed.** Everything 4f already does — the bar („ktoś prawdziwy ma tego używać — i ty się liczysz”), the idea as four sentences (co robi · kto go otworzy · po czym poznam · czego nie robi), the peer round — but „zebrane, nie wybrane” becomes **„wybrane, jeszcze nie wycenione”**: the student leaves with one idea named in writing, and the two they did not pick stay in `pomysly.md` as the escape hatch. The forward pointer „w module o projekcie” goes | 2 |
| **5b** | Ile to jest „małe”                         | `ile-to-jest-male`           | **New; the gate.** Size measured, not defined: the chosen idea cut against `notatnik-v2` — a specification of one page, criteria checkable in one lesson, a first version with one screen. What the sentence „czego nie robi” buys. The three ways an idea is too big (it needs a second program; it needs somebody else's data; it needs a user you cannot reach) and the cut for each. Nobody reaches 5c with an uncut idea | 2 |
| **5c** | Od pomysłu do specyfikacji                 | `od-pomyslu-do-specyfikacji` | old 6a, on the student's own idea: co robi, czego nigdy nie robi, kryteria in 4c's „Kiedy …, to …” + „Sprawdzenie: …” shape. Reviewed by a classmate against the criteria, not against the idea. Deliverable: the student's own repository, first commit = `konstytucja.md` + `specs/001-*/spec.md`, no code | 4 |
| **5d** | Plan i lista zadań                         | `plan-i-lista-zadan`         | old 6b: the plan written from a fresh session with the two files attached; commit-sized tasks with „gotowe, gdy”; how big „small enough” is — now answered against their own specification instead of a shared one | 2 |
| **5e** | Budowa: tydzień pierwszy                   | `budowa-tydzien-pierwszy`    | old 6c: the loop at speed — one task, one commit, evidence in `dziennik.md`; 4e's three things that go wrong, met on their own code. The fixed segments continue: ten minutes of diff reading, a journal entry | 6 |
| **5f** | Budowa: tydzień drugi                      | `budowa-tydzien-drugi`       | old 6d: the second half of the specification; the first *Rozbierz to* on their own application; the rule that the specification changes before the code when the build proves it wrong | 4 |
| **5g** | Pierwszy użytkownik i pierwsze zgłoszenie  | `pierwszy-uzytkownik`        | old 6e, widened. The review against the criteria (diff vs kryteria, peer round) — and then the thing 8 of 12 have never had: **a user.** A classmate installs the application, uses it, and files one written zgłoszenie; the owner reproduces it and decides in writing — *naprawiam · nie naprawiam · to nie błąd, to brak w specyfikacji*. Support felt in one lesson rather than defined in a paragraph | 2 |

Hours: 2 / 2 / 4 / 2 / 6 / 4 / 2 = 22.

**What is lost with the shared application, and where it is bought back.** The
shared app was the only place where students worked on the same files as
somebody else — 7 of 12 have never done it, nobody has resolved a conflict or
reviewed another person's change, and „no group projects” is the complaint
this class raised twice, unprompted. Deleting it with no replacement would be
the one clearly wrong version of this change. The replacement is **Moduł 7's
peer review, promoted from an exercise to a real pull request into a
classmate's repository** — review, conflict and somebody else's code, on an
application whose owner actually cares about the answer. Recorded in the
Moduł 7 section.

**The floor that goes with it.** The shared app also guaranteed that the
weakest student ended the module with a working, well-formed application;
nothing here does. Two mitigations, for Viktar to accept or reject: a small
menu of pre-specified project options for a student who cannot land an idea
in 5a, and 5b's cut applied harder to whoever needs it — a first version of
one screen is a pass.

**Not drafted.** No brief exists for any lesson of this module. `write-lesson`
starts at 5a, which is a rewrite of the existing `zbieramy-pomysly` draft
rather than a new lesson (open decision #17), and 5c–5g are re-derived from
the deleted Moduł 6 rows, not from the v2.4 shared-app briefs, which never
existed.

### Moduł 6 — Pod maską: aplikacja własną ręką

`content/moduly/06-pod-maska/` · est. **28 h** · new in v2.5 as Moduł 5,
**renumbered to 6 in v2.9**; absorbs v2.4's 5a–5c (stack, decision, Visual
Studio) and v2.4's 5f–5g (architecture, persistence)

The by-hand fundamentals module. **v2.9 moved it from 5 to 6**, so that it
comes after the student has built an application of their own rather than
before. The number was the one real argument against the move: seven
published sentences say „Moduł 5” and mean this module — the stack decision
in `02-warsztat/index.mdx`, and six pointers in `03-budujemy` that promise
„budowa okna od podstaw”, „zapis do pliku od podstaw” and „obsługa
kliknięcia” here. A module's number is identity (Article VI), so those seven
must be rewritten to 6 in the same change; they are listed in the v2.9
changelog entry. This is the one cost of v2.9 that lands on content students
have already read.

The spine is `research-03-desktop-app-history.md` §3, „What has not changed
since 1984”: the event loop, one UI thread, the frozen window and its five
seconds, state outside the widget tree, install/update as the user's burden.
The stack inside the module is the training stack and no third framework
(open decision #12).

Framing rule for every lesson, from the discussion of 2026-09-02: the module
is **not** „how we used to do it”. It is what you must know to be the editor
1d describes — to say *za skomplikowane* and be right. Any draft that reads as
nostalgia is cut. Each lesson states its **tryb pracy** (bez AI / tylko
podpowiadanie / agent) in one plain sentence near the top — no component until
content asks (ADR-0004). After the survey the module starts lower than the
proposal assumed: collections, exceptions, events and files are **owned** here
(the Moduł 3 blocks give a first contact, not a home), which is why 28 h and
not 24.

|        | Polish title (proposed)                                        | slug                          | What it does                                                                                                                                                                                                                                                                                              | h |
| ------ | -------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | - |
| **6a** | Co system naprawdę daje aplikacji                              | `co-system-daje-aplikacji`    | old 5a: native / cross-platform / web-wrapped, with three own builds as evidence — and the five constants since 1984 named as the module's map                                                                                                                                                              | 2 |
| **6b** | Ekosystem .NET i nasza decyzja                                 | `ekosystem-dotnet-i-decyzja`  | old 5b unchanged: the honest table, the decision ratified or overturned *with* students, their first real ADR in 4b's format                                                                                                                                                                                 | 2 |
| **6c** | Visual Studio: pełne IDE                                       | `visual-studio-pelne-ide`     | old 5c: solution, debugger; the designer only if open decision #12 lands on WinForms. From here the hand work happens here; the agent editors keep their door                                                                                                                                                | 2 |
| **6d** | Pętla zdarzeń: program, który jest wywoływany                  | `petla-zdarzen`               | **new.** A window, a button, a handler typed by hand — the 3c block's shape, now explained; `Thread.Sleep` in the handler, the frozen window, the five seconds; one UI thread; the async fix. `object sender, EventArgs e` as the 1984 message loop. Opens from the survey's fact: one of twelve can explain a click handler | 4 |
| **6e** | Układ i kontrolki własną ręką                                  | `uklad-i-kontrolki`           | **new.** The markup an agent generated in the student's own application, now typed line by line; layout containers; what the tooling writes and what it hides                                                                                                                                                                     | 4 |
| **6f** | Stan poza kontrolkami                                          | `stan-poza-kontrolkami`       | **new; the load-bearing lesson** (`research-03-history`): model + binding by hand; the 3a block's „świeża kopia” finally replaced by a collection the window notices; MVC → MVVM as one rule re-derived for 47 years; the debugger from 6c used to *watch* state. Sets up Moduł 8 (mobile = change the shell) | 4 |
| **6g** | Zapis do pliku i błędy, których nie widać                      | `zapis-i-bledy`               | old 5g: persistence, exceptions beyond the 3b block's `catch (Exception)`, the failures the happy path hides. The first **Bez AI** segment of real weight, in Visual Studio                                                                                                                                  | 4 |
| **6h** | Trzy tryby: ta sama funkcja bez AI, z podpowiadaniem, z agentem | `trzy-tryby`                  | **new; the contrast lesson and the module's ending.** One feature of the student's own application rebuilt three ways, timed and journaled — the three minute-counts from the Moduł 3 blocks are the baseline; then the agent-built version re-read with 6d–6g's eyes (*Rozbierz to* at feature scale). Maps onto 1b's layers and the 2021 → 2023 → 2025 timeline the class did not live through | 4 |
| —      | *(reserve)*                                                    |                               | two hours unassigned inside the module for the lesson that runs long; 6d and 6f are the candidates                                                                                                                                                                                                          | 2 |

Fixed segments from Moduł 3 stay (diff reading, journal entry); „by hand” is
the default here and the agent is the named exception. 6d's opening depends
on a fact the survey's second run must confirm (block D: who has ever typed a
click handler).

**v2.9 — what the module opens the hood on.** Its students now arrive with an
application they chose, specified and built themselves (Moduł 5). The by-hand
lessons run on **that** application rather than on a neutral project: 6d
types an event handler into it, 6e retypes its layout, 6f replaces the way it
holds state, 6g writes its persistence and its error paths by hand, and 6h
rebuilds one of its own features three ways. This reverses the v2.6 drafting
decision below, and the reason that decision was taken — a codebase every
student has identically is far easier to write lessons against — becomes this
module's main authoring risk: **every code block in 6d–6g must be written
against a capability the student's application has, never against a screen it
happens to contain.** The `tmp-modul5-build/` stages stay usable as the
teacher's reference implementation and as the fallback for a student whose
own application cannot carry a lesson.

**Drafted 2026-09-02** (autonomous run on Viktar's request; briefs
`docs/content-briefs/05-*.md`, unapproved; lessons `publish: false` under
`content/moduly/05-pod-maska/` — **all of them move to `06-` in v2.9**).
Decisions taken there, for Viktar to keep or overturn: the stack inside the
module is **C# + Avalonia 12** — Viktar's answer the same day to open
decision #12, so 6c drops the drag-and-drop designer (the Avalonia extension
is a previewer) and 6e types the markup; **the by-hand running example was a
new small project `spis`** (a list typed, counted, saved) so that the closing
lesson could rebuild a feature of an intact agent-built `notatnik-v2` —
**reversed by v2.9**, which puts both on the student's own application and
leaves `spis` as the teacher's reference build; 6h's feature was a **count of
notes under the list**, one sentence of spec (K8), three branches, order bez
AI → podpowiadanie → agent, and is now one sentence of spec against the
student's own criteria; 6f writes `INotifyPropertyChanged` by hand, no
toolkit; the decision record of 6b lives in the student's own repository
(v2.6 said `notatnik-v2/decyzje/0002-stack.md`). Every code block a student
types in 6d–6g was built on Viktar's Windows machine as a stage of the
throwaway `tmp-modul5-build/` (SDK 10.0.400, Avalonia 12.1.2, net10.0; eleven
stages, one of them meant to fail with CS0160; headless tests of the final
state) — the log and the per-stage status are in each brief's Deviations, and
those stages survive v2.9 as the reference implementation even though the
lessons' running example changed. **A lab-preparation finding from that
build:** Avalonia 12's source generator (which writes `InitializeComponent`
and the `Name` fields) needs the Roslyn shipped with SDK 10 — on a machine
with only SDK 8 even the untouched template fails with `CS0103`, whatever the
target framework. The Windows and Ubuntu lists below say so at the SDK step.

### Moduł 7 — Testy, jakość i przegląd kodu

`content/moduly/07-testy-i-jakosc/` · est. **20 h** (v2.4 Moduł 6: 24) ·
**lessons 7a–7f — six, not five, since 2026-09-10** (v1's 6a–6e plus a
peer-review lesson; see the table below and open decision #16, now answered)

Still last, still the quality floor. 24 → 20 is defensible because v2 already
said this module „names and systematises rather than introduces”: its habits
(journal, diff-reading, *Rozbierz to*, the by-hand blocks) have been
practiced weekly since Moduł 3.

**v2.9 — two changes, no new hours.** Its students arrive with an application
of their own that they built (Moduł 5) and then took apart by hand (Moduł 6),
so the module tests **their** application rather than a shared one; „big
enough to need tests” is something a good number of them will already have
felt, which is the motivation v1 wanted and could not manufacture. Its running
example is one acceptance criterion out of the student's own `spec.md`, and
under it a defect nearly all of them have: the round trip *zapisz → zamknij →
otwórz*, measured and reproduced in
[`research-07-testy-jakosc-przeglad.md`](research-07-testy-jakosc-przeglad.md) §6.2.

And the peer-review lesson (7e) is **promoted from an exercise to a real pull
request into a classmate's repository.** This is where the collaboration the
deleted shared-application module used to carry now lives: branch, pull
request, a review that names criteria rather than style, a conflict resolved,
somebody else's code read for a reason. The survey makes it load-bearing — 7
of 12 have never worked on the same files as another person, nobody has
resolved a conflict or reviewed a change, and „no group projects” was raised
twice, unprompted, as what went worst before. **Open:** whether one pull
request is enough, and whether 7e needs an hour taken from 7a–7d to carry it
(open decision #16).

**Answered 2026-09-10 — and the contradiction it exposed.** This section said
both „lessons 7a–7e as v1's 6a–6e” (v1's 6e is *Bezpieczeństwo*) and „the
peer-review lesson (7e)”. Both could not be true. Viktar's decision: **six
lessons, the pull request as its own, funded by the hour #16 anticipated.**
Security keeps a home; collaboration gets a whole lesson rather than half of
one. The module was researched and drafted the same day.

|        | Polish title                                 | slug                       | What it does                                                                                                                                                                                              | h |
| ------ | -------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | - |
| **7a** | Testy to nowe złoto                          | `testy-to-nowe-zloto`      | v1's 6a. Opens by having the student break their own application with data they never gave it — the measured round-trip defect — then answers with how the industry itself decides whether a model fixed a bug (SWE-bench's `PASS_TO_PASS`), and why the first test is written by hand rather than asked for | 3 |
| **7b** | Pierwszy test: jedno kryterium, jedno zdanie  | `testy-jednostkowe`        | v1's 6b. `dotnet new nunit`, one criterion, red before green. 6f collects its payment — the logic is testable because it left the controls. Ends with the agent's version and the `Assert.AreEqual` trap that no longer compiles | 5 |
| **7c** | Przegląd kodu: model czyta twój diff          | `ai-code-review`           | v1's 6c, title rewritten, slug unchanged. Three buckets — trafione · nieistotne · zmyślone — and the 71%-versus-F1 0,066 pair, each with its limitation                                                       | 3 |
| **7d** | CI: bramka, która nie przepuszcza zepsutego kodu | `ci-bramka`             | v1's 6d. Nine lines of YAML, a deliberate red, a ruleset that makes red mean „nie da się scalić” — and the two documented ways a gate passes nothing and stays green                                          | 3 |
| **7e** | Pull request do repozytorium kolegi            | `pull-request-do-kolegi`  | **New — the replacement for the deleted shared application.** Fork, one test into a classmate's repository, a review that names criteria rather than style, a conflict resolved, a verdict written down       | 4 |
| **7f** | Bezpieczeństwo: sekrety, dane, prompt injection | `bezpieczenstwo`         | v1's 6e, re-scoped from three topics to three moves: the history you cannot undo, where a secret lives before you have one, and the lethal trifecta an agent already has                                      | 2 |

Hours: 3 / 5 / 3 / 3 / 4 / 2 = 20. **Module total unchanged.**

**What blocks publication.** Two things, both in the briefs' open questions:
7e's pairing is not decided, and every code block in 7b and 7d is unbuilt on a
lab machine — NuGet was unreachable from the drafting container, so the NUnit
project was generated and inspected but never restored or run. The round-trip
defect *was* built and run (SDK 10.0.112). The module is `publish: false` until
the 7b sequence runs once on SDK 10.0.4xx and the real `dotnet test` failure
output replaces the placeholder.
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

**v2.4 → v2.5**

| v2.4 | v2.5 |
| --- | --- |
| 1b, 1c | unchanged |
| 1d Na żywo | 1g — last in the module, the one class lesson |
| 1e Teraz ty | **2a**, with the new Krok 2 (install) |
| 1f, 1g, 1h | 1d, 1e, 1f — reading, free time |
| 2a–2d | 2b–2e |
| — | 2f C# na pierwszy rzut oka (brief first) |
| 3a–3d | unchanged; by-hand blocks inside 3a–3c |
| 4a–4f | unchanged |
| 5a, 5b, 5c | 5a, 5b, 5c (Pod maską) |
| 5d spec, 5e plan, 5h review | 6a, 6b, 6e |
| 5f architektura okna | 5d, 5e, 5f (three lessons) |
| 5g zapis i błędy | 5g |
| 6a–6e testy | 7a–7e |
| S2: 7, 8, 9, 10 | 8, 9, 10, 11 |

**v2.8 → v2.9**

| v2.8 | v2.9 |
| --- | --- |
| 0–3 | unchanged |
| 4a–4e | unchanged |
| 4f Zbieramy pomysły | **5a**, rewritten to choose rather than capture |
| — | **5b Ile to jest „małe”** — new, the scope gate |
| 6a Od pomysłu do specyfikacji | 5c, on the student's own idea |
| 6b Plan i lista zadań | 5d |
| 6c Budowa: tydzień pierwszy | 5e |
| 6d Budowa: tydzień drugi | 5f |
| 6e Przegląd | 5g, widened with the first user and the first zgłoszenie |
| 5 Pod maską, 5a–5h | **6 Pod maską, 6a–6h** — same lessons, running example changed to the student's own app |
| 6 Wspólna aplikacja | **deleted** — its five lessons are 5c–5g |
| 7a–7e | unchanged, except 7e becomes a real pull request into a classmate's repo |
| 8–11 | unchanged |
## Semester 2

Unchanged in content from v1, **renumbered in v2.5**: Moduł 8 mobile (was 7),
Moduł 9 project (was 8), Moduł 10 release (was 9), Moduł 11 dalej (was 10);
the standing rule „if the project module is behind, «Dalej» is what gets cut”
holds. Two deltas: students arrive with five months of desktop building
*and* a by-hand module, so Moduł 8's „same logic, different shell” argument
stands on 6f rather than on a claim; and the survey says half the phones are
iPhones, so Moduł 8 plans emulator-first, the student's own phone as a bonus.

**v2.9 changes nothing here, and opens one question.** Deleting the shared
application and adding Moduł 5 cancel out, so Moduł 8–11 keep their numbers
and their content. What v2.9 does change is what a student arrives with:
an application of their own, specified, built, taken apart and tested, from
about week 13 rather than from Moduł 9. Whether Moduł 9 („Projekt: aplikacja,
której ktoś używa”) is then the *same* application taken further — a real
user outside the class, a release, the features 5b cut — or a second, bigger
idea chosen with everything learned since, is **open decision #15**, to be
settled in January with five months of data, exactly as this section already
says about everything else in Semester 2.

**Sketch, not a decision — decide in January with five months of data:** the
project module (9) as the place where the student is explicitly the engineer
of a small agent team — spec and tasks by them, tasks executed by an agent,
the diff reviewed by a second agent from another vendor, CI as the gate, a
release a real person installs — with subagents / agent review / CI promoted
from „Dalej” into it, and MCP, memory and local models staying optional.
Recorded here so the intention exists; nothing is committed.
## Volume check

| | Module | v1.1 h | v2.4 h | v2.5 h | v2.9 h |
| --- | --- | --- | --- | --- | --- |
| S1 | 0 Start | 8 | 8 | 8 | 8 |
| S1 | 1 Jak powstaje oprogramowanie | 22 | 16 | **4** (reading leaves the class hours) | 4 |
| S1 | 2 Warsztat | — | 10 | **14** (+2a, +2f) | 14 |
| S1 | 3 Budujemy | 16 | 26 | 26 (by-hand blocks inside) | 26 |
| S1 | 4 Specyfikacja | 24 | 20 | 20 | **18** (4f leaves) |
| S1 | 5 Twoja aplikacja *(new in v2.9)* | — | — | — | **22** (20 from Wspólna + 2 from 4f) |
| S1 | 6 Pod maską *(v2.5: 5)* | — | — | **28** | 28 |
| S1 | 7 Testy i jakość *(v2.4: 6)* | 24 | 24 | **20** | 20 |
| — | ~~Wspólna aplikacja~~ *(v2.5: 6)* | 16 + 40 | 40 | 20 | **deleted — is Moduł 5** |
| | slack | — | 0 | **4** | 4 |
| | **Semester 1** | **150** | **144** | **144** | **144** |

144 h = the 18-week estimate. The plan still carries four hours of slack, and
it is still a ceiling, not a plan. **v2.9 is hour-neutral by construction:**
the new module is funded entirely by the module it replaces (20 h) plus the
lesson that moved into it (2 h), which is why nothing below Moduł 7 changes.
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
   Launch it once per profile at image or first-login time, or lesson 6c
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
   **Not optional even for a net8.0 target:** Avalonia 12.1.2's source
   generator needs the SDK 10 compiler; with SDK 8 alone the `avalonia.app`
   template fails to build (`CS9057` + `CS0103: InitializeComponent`) —
   seen on 2026-09-02 while verifying the Moduł 5 code.
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
   `packages.microsoft.com` repo. Verify: `dotnet --list-sdks`. SDK 10, not
   8, for the same reason as on Windows (Avalonia 12's generator).
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
   this: if the lab is Ubuntu, lesson 6c and INF.04 preparation need Windows
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
| 10 | ~~The v2.5 renumbering: Moduł 5 = Pod maską, shared app → 6…~~ **Overtaken by v2.9**, which deletes the shared app, makes Moduł 5 „Twoja aplikacja” and Moduł 6 „Pod maską”. The question it asked — whether the by-hand material is a module or segments inside another one — was answered twice the same way, and stays answered | — | — |
| 11 | Hours: 4 / 14 / 26 / 20 / 28 / 20 / 20 + 4 slack — or take the slack into Moduł 5 | with #10 | the volume table |
| 12 | ~~The stack inside Moduł 5: the training stack (Avalonia, no designer in Visual Studio — TO CONFIRM) versus WinForms on Windows-only labs (decision #4); the module must not introduce a third framework~~ **Answered 2026-09-02: C# + Avalonia.** The Avalonia extension is a previewer, confirmed against its docs (28.07.2026); the drafts of 5c and 5e are written for it | — | 5c, 5e drafted |
| 14 | ~~Moduł 5 as drafted: the `spis` running example…~~ **Superseded in part by v2.9**, which answers the running example (the student's own application, not `spis`). What stays open: the real vote in 6b, the `.sln` in student repos (6c), and the rest of the nine briefs' questions — now `06-*.md` | before the module is published | Moduł 6 |
| 13 | Whether the reading lessons of Moduł 1 get any class time at all beyond the demo (the 4 h assume one discussion hour); and whether 1c is taught or only read | week 2 | 1c's opening from the E5 aggregate |
| 15 | What Moduł 9 („Projekt”) builds, now that the student's own application starts in Moduł 5: the same application taken further (real user outside the class, release, the features 5b cut), or a second, bigger idea | January, with five months of data | Moduł 9; the forward pointer in 5a |
| 16 | ~~Whether 7e's pull request into a classmate's repository is enough to carry what the shared application used to carry, and whether it needs an hour taken from 7a–7d~~ **Answered 2026-09-10: it needs the hour, and it needs its own lesson.** Moduł 7 becomes six lessons, 3/5/3/3/4/2 = 20 h; security keeps its home as 7f. The contradiction between „7a–7e as v1's 6a–6e” and „the peer-review lesson (7e)” is resolved in the Moduł 7 section. Still open underneath it: **who assigns the pairs**, and what happens to a student whose partner's application does not build | — | 7e's zadanie |
| 17 | The 5a slug and title: `wybieramy-co-zbudujemy` / „Trzy pomysły, jeden wybór” as proposed here, or keep the drafted `zbieramy-pomysly` and change only the body. The lesson is unpublished, so the rename is free today and identity tomorrow (Article VI) | before 5a is rewritten | Moduł 5; the existing 4f draft and brief |
| 18 | The floor: whether a menu of pre-specified project options exists for a student who cannot land an idea in 5a, and who writes it | before Moduł 5 is taught | Moduł 5; the weakest students |

## Changelog

- **v2.9 — 2026-09-10.** **The student's own application becomes Moduł 5**, on
  Viktar's request. „Zbieramy pomysły” leaves Moduł 4 (20 → 18 h) and becomes
  **5a**, rewritten from „zebrane, nie wybrane” to a choice; a new **5b** cuts
  the chosen idea to size; **„Wspólna aplikacja” is deleted** and its five
  lessons become 5c–5g, run on each student's own idea instead of one shared
  one, with 5g widened to a first user and a first written zgłoszenie.
  **„Pod maską” is renumbered 5 → 6**, keeping all eight lessons and 28 h, and
  its running example changes from the neutral `spis` project to the
  application the student built in Moduł 5 — a reversal of a v2.6 drafting
  decision. Moduł 7 keeps its hours; its peer-review lesson 7e is promoted to
  a real pull request into a classmate's repository, which is where the
  collaboration the shared application used to carry now lives. Hour-neutral:
  20 (Wspólna) + 2 (4f) = 22 (Moduł 5); Semester 1 stays 140 + 4 slack = 144
  and Semester 2 is untouched. Open decisions #15–#18 added; #14 partly
  superseded. Sources: the discussion of 2026-09-10, the survey aggregate
  `docs/surveys/ankieta-start-2026-09-aggregate.md` (J4, J5, J7 and the
  „not done” list) and `docs/surveys/content-reader.md`.

  **The bill this entry leaves for the content lane.** Seven published
  sentences name „Moduł 5” and mean the by-hand module. They are wrong the
  moment this file is merged and must be rewritten to „Moduł 6” in the same
  change (line numbers as of 2026-09-10):
  `content/moduly/02-warsztat/index.mdx` (l. 50, the stack decision);
  `content/moduly/03-budujemy/budowa-1-prompt-token-okno.mdx` (l. 74, 85, 253);
  `content/moduly/03-budujemy/budowa-2-techniki-promptowania.mdx` (l. 253);
  `content/moduly/03-budujemy/budowa-3-reguly-projektu.mdx` (l. 57, 239).
  Also to be moved, not edited: the nine briefs `docs/content-briefs/05-*.md`
  → `06-*.md` and the nine drafted lessons `content/moduly/05-pod-maska/` →
  `06-pod-maska/`; the 4f brief and draft → Moduł 5; and the
  `docs/content-style.md` appendix rows that home *pętla zdarzeń, wiązanie
  danych, MVVM, stan* in 5d/5f → 6d/6f. **None of this is done by this
  revision** — it is a plan file, and the content lane is a separate change
  (Article IX).

- **v2.8 — 2026-09-09.** **Two Moduł 2 lessons removed**, on Viktar's
  request: „Narzędzia: dwa edytory z agentem” (was 2c) and „Git i GitHub w
  pracy z agentem” (was 2e). The module is now 2a–2d and ends on „Pierwsze
  okno”; the C# reading lesson, still only a brief, becomes 2e. The two class
  editors are installed and driven in „Teraz ty”, so nothing announces them as
  a category any more. Git returns to the 0c minimum: `restore`, `revert` and
  diff-reading are no longer taught anywhere, and the `.gitignore` step for
  `bin` and `obj` moves into „Pierwsze okno”. Five inbound links from Moduł 2,
  4 and 5 were rewritten to stand on their own. The v2.3 entry below recorded
  the Git lesson's addition and stays as written — history, not a claim about
  the present. Hour estimates are not re-derived; Moduł 2 still reads 14 h and
  is now overstated.
- **v2.7 — 2026-09-09.** **The demo moves to Moduł 2**, on Viktar's request:
  „Na żywo: agent buduje aplikację” leaves Moduł 1 as 1g and becomes **2a**,
  so the module that starts hands-on work opens with the pokaz and „Teraz ty”
  follows it immediately as **2b**; the former 2b–2f shift to 2c–2g. Moduł 1
  is five reading lessons and keeps orders 2–6, so no published lesson letter
  or URL there moved. The lesson's URL did move, with the file, from
  `/moduly/01-jak-powstaje-oprogramowanie/` to `/moduly/02-warsztat/`, and
  every inbound link in the content was rewritten in the same change. **Not
  settled here:** the 4 class hours v2.5 gave Moduł 1 were the demo and its
  discussion, so on paper they now belong to Moduł 2 (14 → 18 h, Moduł 1 → 0).
  The volume table is left as it stands until Viktar says which way to book
  them; nothing student-facing depends on the answer.
- **v2.6 — 2026-09-02 (evening).** **Moduł 5 drafted**: nine briefs
  (`05-index`, `05a`–`05h`, unapproved) and nine lessons under
  `content/moduly/05-pod-maska/` (`publish: false`), in one autonomous run on
  Viktar's request. Open decision #12 answered (C# + Avalonia; no third
  framework); #14 added for the briefs' open questions. The by-hand code of
  5d–5g built and tested on Viktar's machine in `tmp-modul5-build/`
  (untracked, throwaway); the SDK-10 finding recorded in the lab lists.
  `docs/content-style.md` appendix: the Moduł 5 term and story rows added,
  *pętla zdarzeń / wiązanie danych / MVVM* rehomed from 1a to 5d/5f. Hours
  unchanged (28).
- **v2.5 — 2026-09-02.** **Moduł 1 becomes free-time reading with the demo
  last** (1d → 1g; 1f/1g/1h → 1d/1e/1f; class hours 16 → 4); **„Teraz ty”
  moves to 2a** with a new Krok 2 on installing both class editors (former
  2a–2d → 2b–2e); **2f „C# na pierwszy rzut oka”** planned, brief first;
  **Moduł 3's by-hand segment becomes a thirty-minute block owning one
  construct per week** (list, `try`/`catch`, event handler — written into
  3a–3c the same day); **Moduł 5 „Pod maską”** — the by-hand fundamentals
  module (28 h) — inserted before the shared app, which becomes Moduł 6
  (20 h); tests → Moduł 7 (20 h); Semester 2 → 8–11. v1.1's „no switch back
  to programming without AI” reversed on purpose, with the reason recorded
  above. Volume 140 + 4 slack = 144. Open decisions #10–#13 added. Sources:
  the discussion of 2026-09-02, the change proposal
  `change-proposal-2026-09-02-modul-5-pod-maska.md`, and the survey aggregate
  `docs/surveys/ankieta-start-2026-09-aggregate.md` (n = 12).
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
