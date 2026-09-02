# Prompt — Research 03: the history of building desktop applications

|              |                                                                                          |
| ------------ | ---------------------------------------------------------------------------------------- |
| Written      | 2026-08-29                                                                                |
| Kind         | **Deep-research brief.** One single-shot prompt, meant to be pasted whole.                 |
| Produces     | `docs/content-research/research-03-desktop-app-history.md`                                 |
| Feeds        | `course-structure-v1.md` — Moduł 4a/4b primarily, 4c and 5c/5d secondarily                 |
| Run it in    | **Cowork**, or any agent session with web search. Not a spec slice — it produces no commit to `app/`. |
| Weighting    | **60 % programming languages, 40 % the rest of the lifecycle.** Enforced in the brief.     |
| Sibling of   | [`research-04-mobile-app-history.md`](research-04-mobile-app-history.md) — the mobile half of the same pair. **Run this one first**; Research 04 reads it and argues against it. |

## Why this exists

Moduł 4a has to answer *"what is a desktop application"* to students who have
only ever used web and phone software. The honest answer is historical: a
desktop app is what it is because of a sequence of constraints that no longer
apply, plus a small set that never went away. Moduł 4b then asks them to read a
framework comparison table — which is unreadable without knowing why WPF, MAUI,
Avalonia and Uno all speak XAML in the first place.

Neither lesson can be written from memory without inventing dates. Hence a
research pass, sourced per ADR-0008, before any Polish is typed.

## Notes before you paste it

- The brief deliberately restates the sourcing rule and the language rule.
  Unlike the slice prompts in `how-to-run-a-slice.md`, this one may be run in a
  session that has **not** loaded `constitution.md` — Cowork is not the repo.
- It ends with a stop condition. If the agent starts drafting Polish lesson
  text, the prompt failed and that is worth a `sdd-journal.md` line.
- Expect one full session. If the agent asks to split it, let it write the
  language half first — that is the 60 %, and the half the course needs most.
- **Connectors that earn their place here:** *Firecrawl* (paper search, and it
  reads archived and JS-heavy pages that plain fetch chokes on — half the best
  sources for this topic are twenty-year-old blog posts), *Microsoft Learn*
  (authless; the primary source for the Win32 / WinForms / WPF / XAML and MSI /
  ClickOnce / MSIX claims). Neither is required; both raise the hit rate on
  primary sources, which matters in a repo where an unsourced claim gets
  dropped rather than softened.

---

## The prompt

```
You are doing a deep research pass for a course repository. Read the
instructions in full before searching, then work through them in order.

## What you are producing

One file: `docs/content-research/research-03-desktop-app-history.md`

It is research notes for the course owner (Viktar), not classroom material.
Written in English. Nothing you write here reaches a student directly — it is
the reasoning that will later decide what a lesson says.

The course is a 4th-year secondary-school course, *Aplikacje desktopowe i
mobilne*, running from 2026-09-01 in Poland. The students are 18-ish, will
write C# with an AI assistant, and have essentially no memory of software
before smartphones. Two sibling files already exist and set the shape you must
match: `research-01-ai-assisted-development.md` and
`research-02-stack-tooling-constraints.md`. Read both first if you can reach
them; if you cannot, follow the shape described below.

## The topic

**How building a desktop application changed, from the 1970s to 2026 — and
why.**

Start where "desktop application" starts meaning something: Xerox PARC, the
Alto, Smalltalk-80, the first commercial GUI machines. The batch and mainframe
era appears only as the thing personal computing broke away from — one section
at most, as context for what the personal machine changed.

End in 2026, with the situation the course actually sits in.

## The weighting — this is the main instruction

**About 60 % of the document is about programming languages.** Not 60 % of the
sections; 60 % of the words, the evidence and the analytical effort. The
lifecycle material is real but subordinate. If you find yourself writing a
fourth paragraph about installer technology before you have finished the
language argument, you have drifted.

## Part A — Languages (≈60 %)

Do not write a chronological parade of language names. Write an argument, in
which the chronology is evidence. Cover, at minimum:

**A1. The eras, and the language each one made obvious**
Assembly and Pascal on the early GUI machines; C plus the platform API (Mac
Toolbox, Win16/Win32); C++ with the framework wrappers (MFC, OWL); the RAD
years (Visual Basic, Delphi / Object Pascal, PowerBuilder); managed runtimes
(Java/AWT/Swing, C# with WinForms then WPF); dynamic languages on the desktop
(Tcl/Tk, Python with Qt or GTK); Objective-C and then Swift; JavaScript and
TypeScript arriving via Electron; the systems revival (Rust with Tauri, modern
C++, Go); and the present cross-platform declarative set (Dart/Flutter, Kotlin
Multiplatform, Swift UI, C# across MAUI / Avalonia / Uno).

For each: roughly when it was the default choice, what it made easy that the
previous one did not, and what it gave up.

**A2. The forces that actually moved the language**
This is the analytical spine of the document. Trace each of these as its own
thread across the whole period, not era by era:

- **Memory management** — manual → reference counting → tracing GC → ownership
  and borrowing. What each shift bought, and what it cost in latency and
  binary size.
- **Type systems** — dynamic vs static, the gradual-typing turn (TypeScript,
  Python type hints), nullability as a language feature (C# 8 nullable
  reference types, Kotlin, Swift optionals). Why null handling became a
  *language* problem and not a discipline problem.
- **Concurrency and the frozen window** — the single UI thread as a constant
  from 1984 to now; callbacks → threads → background workers → `async`/`await`
  (C# 5) → structured concurrency. Note explicitly that `async`/`await`, now
  everywhere, was designed against a desktop-GUI problem.
- **How the UI gets described** — imperative widget construction in code →
  resource files and form designers → markup (XAML, QML, XML layouts) →
  declarative / reactive code-as-UI (React's model, SwiftUI, Compose,
  Flutter). Is the current state a return to 1985 with better tooling, or
  something new? Argue it.
- **Compilation and distribution model** — native → bytecode and a VM → JIT →
  AOT back to native (NativeAOT, R2R). What forced the return trip.
- **Interop** — FFI, COM, P/Invoke, JNI, the ABI problem, and why "just call
  the platform" is still where cross-platform frameworks bleed.

**A3. Ideas that were born on the desktop and escaped it**
MVC out of Smalltalk-80; event-driven programming; the component/property
model out of VB and Delphi that became every visual builder since; data
binding; `async`/`await`; declarative UI. Say where each came from, with a
source, and where it lives now.

**A4. The languages that lost, and honestly why**
Delphi / Object Pascal, Visual Basic 6 and the VB.NET break, Java on the
desktop, Smalltalk itself, Objective-C. For each, separate the technical
reason from the commercial and ecosystem reasons — and where the evidence says
the technical reason was not the deciding one, say so. Avoid "X killed Y"
framing without a cited mechanism.

**A5. Measuring popularity, and why you should distrust it**
If you cite TIOBE, Stack Overflow's survey, GitHub's Octoverse or similar,
date the figure and state in one line what the index actually measures and what
it cannot see. A course that teaches students to read evidence cannot itself
launder a search-engine ranking into a fact about the world.

**A6. What this arc means for a student writing C# in 2026**
Which of the above they will meet by name in their first month; which
vocabulary in their IDE is a fossil of a decision made before they were born.
Keep this short and concrete — it is the payload for Moduł 4a.

## Part B — The rest of the development lifecycle (≈40 %)

Same rule: an argument, not a timeline. Cover:

- **Requirements and specification** — waterfall as it was actually practised
  vs as it is caricatured, RUP, XP and agile, and where AI-assisted / spec-
  driven development sits now. Connect to `research-01` rather than repeating it.
- **Architecture patterns for UI** — MVC → MVP → MVVM → MVU / unidirectional
  data flow. Why the desktop generated so many of these and what problem each
  new one claimed the previous one had.
- **Build and dependencies** — makefiles → IDE project files → MSBuild →
  package managers (NuGet, npm) → lockfiles and reproducible builds. Cover
  "DLL hell" properly: what it actually was, and which of assemblies, the GAC,
  side-by-side, containers and app-local deployment solved which part.
- **Version control** — none / shared folders → RCS, SCCS, CVS, SVN → Git →
  pull-request review as the default unit of work.
- **Testing** — manual QA departments → xUnit's descent from SUnit → CI →
  UI automation. Address directly why automated testing of desktop UIs stayed
  hard for thirty years and still is, and what that implies for Moduł 6.
- **Release and distribution** — floppies and shrink-wrap, CD and boxed retail,
  installers (InstallShield, MSI), the shift to downloads, auto-update
  (Sparkle, Squirrel, ClickOnce), code signing and notarization, app stores
  and sandboxing, and today's package managers (winget, Homebrew, Flatpak,
  Snap, MSIX). Trace the release *cycle* alongside the mechanism: multi-year
  boxed versions → service packs → continuous.
- **Feedback after release** — crash reporting and telemetry as a lifecycle
  stage that simply did not exist in 1990, and the privacy argument it created.
- **The desktop's own boom, eclipse and return** — dominance, the web eclipse
  roughly 2005–2015, and the return through Electron-class apps (Slack, VS
  Code, Figma, Discord). Handle Electron evenhandedly: state the resource cost
  with a dated measurement if you can find one, and state equally clearly why
  serious teams keep choosing it.

## Cross-cutting questions the document must answer explicitly

Put these in their own section near the end. They are the part a lesson is
actually built from:

1. **What caused each transition** — hardware capability, economics,
   distribution channel, or language design? Where the evidence points at
   economics rather than technical merit, say so plainly.
2. **What is genuine progress and what is a cycle?** Thin client ↔ fat client,
   interpreted ↔ compiled, imperative ↔ declarative, monolith ↔ modular. For
   each, argue whether 2026 is a return with better tools or a different place.
3. **What has not changed since 1984?** Candidates: the event loop, the single
   UI thread, the frozen-window problem, keeping state out of the widget tree,
   install / update / uninstall as a user-visible burden. Anything on this list
   is a candidate for something worth teaching, because it will still be true
   when the framework in the syllabus is dead.
4. **What was tried, failed, and came back?** With the reason it failed the
   first time and what changed.

## Sources and evidence

- **Every claim about the world carries a link and the date you checked it.**
  This is a repository rule (ADR-0008): a statement about what a tool does,
  what it cost, what a benchmark measured or what a platform requires needs a
  source, and where no source can be given the claim is not made. Explanations
  of concepts need no citation; checkable assertions do.
- **Links do two jobs, and the report must do both.** A link is evidence for
  the sentence it sits on, *and* it is a door for a reader who wants to go
  further. Write them as both:
  - **Inline, in the prose, on the claim itself** — a full URL or a markdown
    link at the point the assertion is made, not only collected at the bottom.
    A reader should never have to guess which entry in the Sources list backs
    the paragraph they are reading.
  - **Deep enough to be worth opening.** Prefer the specific page, paper,
    release note, section or archived post over a project homepage or a
    search result. Where the evidence is one figure in a long document, say
    where in it to look.
  - **Enough of them.** Every substantive subsection of Part A and Part B
    carries at least a few external links. A subsection with none is either
    unsourced opinion or a subsection that should be cut.
  - **Openable by the reader.** Prefer sources with a free, stable, public
    URL. Where the best source is paywalled or offline — an ACM paper, a book,
    a scanned magazine — cite it anyway, mark it as such, and add a free
    alternative alongside it where one exists (an author's own copy, an
    archived version, a good secondary summary).
- **Some links are there to open a door, not to prove a point.** Alongside the
  evidence, include pointers a curious reader can follow: a canonical
  retrospective paper, a well-made archive, a talk, a still-running project to
  read the code of. Label these as further reading rather than passing them
  off as evidence for a claim.
- **Prefer primary and retrospective sources.** The ACM *History of Programming
  Languages* (HOPL I–IV) papers are the highest-value source for Part A and
  should be used heavily — many are written by the language designers
  themselves. Also: original vendor documentation and release notes, design
  documents, the Smalltalk-80 literature, folklore.org for the early Macintosh,
  Raymond Chen's *The Old New Thing* for Win32 decisions, Joel Spolsky's
  API-war essays, contemporaneous trade press where nothing better exists.
- **Dates are part of the claim.** Anything true only as of a date says so in
  the visible text, not in a comment.
- **Mark confidence.** Where sources disagree or the record is folklore, write
  that instead of picking the tidier version. "Widely repeated, poorly
  sourced" is a legitimate and useful finding.
- Institutional facts about the school — the timetable, the lab machines, the
  INF.04 exam scope — are not yours to assert. If one is needed, mark it
  `TO CONFIRM`.

## Shape of the output file

Follow the sibling research files:

1. `# Research 03 — <title>` and a small header table: `Written`, `For`,
   `Status`, `Feeds`.
2. A short framing note if any rule applies throughout (as `research-02` does
   for Article V).
3. **One timeline table**, compact, as an orientation device — era, dominant
   language(s), how the UI was described, how it shipped. One table, not five.
   The prose carries the argument; the table only lets a reader find their
   place.
4. Part A, Part B, the cross-cutting questions.
5. **`## What this means for the course`** — the section that justifies the
   document. Concrete, addressed to Moduł 4a first (what a desktop app is and
   why), then 4b (why every .NET UI framework speaks XAML), then 4c and
   5c/5d. Say what should be taught, what should be mentioned once, and what
   should be left out because it is interesting to you and useless to them.
6. **`## What rots`** — which claims here have a short shelf life and what
   should be re-checked before the lesson is written next year.
7. **`## Sources`** — grouped, each with the full URL, one line on what it
   supports, and the date checked. This section is a *reading list a person
   could work through*, not a bibliography that proves you did the work: mark
   which entries are the ones to start with, and which are primary,
   secondary, paywalled or archived.
8. **Further reading where a reader would want it.** Each major section of
   Part A and Part B ends with a short line or two of "if you want to go
   deeper here" links — the two or three sources that best repay actually
   opening them, with one clause each on what they give. The point is that
   both the course owner and, later, a student who is curious after a lesson
   can follow the topic outwards without asking anyone.

Length: comparable to `research-02` — substantial, but every paragraph earning
its place. If a section has nothing sourced to say, cut it rather than padding.

## What not to do

- Do not write nostalgia. "Remember when software came in boxes" is not a
  finding; "the boxed release cycle made a bug a year-long liability, which is
  why testing budgets looked the way they did" is.
- Do not produce a list of languages with a paragraph each. A1 is scaffolding
  for A2, not the deliverable.
- Do not invent dates, version numbers, prices or benchmark figures. If you
  cannot source it, drop the claim and say the record is unclear.
- Do not write any Polish. Do not draft lesson text. Do not propose changes to
  `content/`, `app/`, `specs/` or the course structure.
- Do not repeat `research-01` on AI-assisted development; link to it.

## Stop condition

Write `docs/content-research/research-03-desktop-app-history.md` and stop.
No other file is created or edited. If the research turns up something that
should change `course-structure-v1.md`, note it inside the "What this means for
the course" section as a proposal — do not make the edit.

Before you stop, re-read your own draft against three checks and fix what
fails:
1. Is Part A about 60 % of the document by weight?
2. Does every checkable claim have a link and a date, inline, on the claim?
3. Could a curious reader take any major section and keep going from the links
   in it alone — or do the links only prove points and lead nowhere?
4. Does the "What this means for the course" section say anything a lesson
   writer could act on tomorrow, or is it a summary of what you just wrote?
```
