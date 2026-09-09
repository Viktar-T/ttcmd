# Brief — Moduł 5 · Pod maską: aplikacja własną ręką

| | |
| --- | --- |
| Module | `content/moduly/05-pod-maska/index.mdx` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** |
| Mode | **autonomous** (AGENTS.md §2) — this brief and 05a–05h were written and drafted in one run on Viktar's request of 2026-09-02 („fully build Moduł 5”), which is treated as approval of the v2.5 Moduł 5 *shape* and of three answers given the same day (stack inside the module: **C# + Avalonia**, the training stack, no third framework — open decision #12 closed for this draft; scope: briefs + all lessons; nothing committed). Nothing here says „approved by Viktar”; the `## Decisions` sections are the review surface |
| Structure | `course-structure-v2.md` v2.5, Moduł 5 (28 h: 2 / 2 / 2 / 4 / 4 / 4 / 4 / 4 + 2 reserve) |
| Research | `research-03-desktop-app-history.md` §A2.3, §A2.4, §A6, §B2, „The cross-cutting questions” §3, „What this means for the course” (5c/5d); `research-03-building-desktop-apps.md` §2 (four families), §10; `research-02` §2, §4.1; `change-proposal-2026-09-02-modul-5-pod-maska.md`; vendor and reference documentation found at drafting time, dated per lesson brief |
| Drafted | 2026-09-02 — `content/moduly/05-pod-maska/index.mdx`; deviations at the end |

## Research gate (write-lesson §3)

Case **1 + 2**. The module's argument — the constants since 1984 and the
history of „state outside the widget tree” — is researched and sourced in
`research-03-desktop-app-history.md`; the stack table and the IDE facts in
`research-02` and `research-03-building-desktop-apps.md`. The by-hand lessons
(5d–5g) are case 2 on top of that: their claims are a handful of framework and
reference facts (a property name, a documented exception, a menu path), each
found on `docs.avaloniaui.net` or `learn.microsoft.com` at drafting time and
dated in the lesson's Źródła. The code itself is not a claim to source but a
thing to build: see „Code verification” below.

## Code verification (write-lesson §5, by-hand rule)

Every block a student types in 5d–5g was built as a stage of one real
`dotnet new avalonia.app` project (`spis`, Avalonia **12.1.2**, the version
the templates install on 2026-09-02) in `tmp-modul5-build/` at the repo root —
an untracked throwaway folder with the stages, a headless test project and
`build.log`. The build had to run on Viktar's Windows machine, because neither
the cloud workspace nor the local VM may reach nuget.org. **First run,
2026-09-02 19:34: the machine had only SDK 8.0.424, and Avalonia 12's source
generator (`Avalonia.Generators`, Roslyn 4.14) does not load under the SDK 8
compiler (4.11) — even the untouched template fails with `CS0103:
InitializeComponent`.** That is a lab-preparation fact in its own right (the
SDK, not only the target framework, must be 10) and is recorded in the
course-structure file. The re-run after SDK 10 is installed is recorded in
each lesson brief's Deviations; until then every code block carries the status
„built: pending SDK 10” there, and no lesson of 5d–5g may lose `publish:
false` before that line says „built and tests green”.

## Reader position

Has read: 0a, 0c, 1g (and 1b–1f in their own time), 2a–2f, 3a–3d, 4a–4f. Has
done, with an agent: `okno` (2d), minutnik, notatnik, katalog (3a–3c),
`notatnik-v2` built by the loop from a spec of their own (4e); `pomysly.md`
(4f). Has done by hand: a title change (2d); three thirty-minute blocks — a
`List<string>` with a „świeża kopia” for the window (3a), `try`/`catch
(Exception)` around one write (3b), one `Click` handler with `sender`/`e`
(3c) — each with a commit and a minute count on the card. Can: read a C# diff
of forty lines (2f); run `dotnet build`/`dotnet run`; `git diff`, `restore`,
`revert`, a branch (2e); write a spec with checkable criteria and run the loop
(4c–4e). Per the survey of 2026-09-02 (n = 12): 1 of 12 can explain an event
and a click handler; 1 a list, 1 an exception, 1 a thread; 5 have used Visual
Studio, 2 a debugger; C# is new to 11 of 12; 8 say they read all of the
agent's code and 6 rate their understanding of it 2 of 5. Has never: typed a
window from an empty file; seen the window freeze *and* known why; put a
breakpoint in a handler and read who called it; kept data anywhere but in a
control or a local list; caught anything narrower than `Exception`; measured
what a feature costs done three ways.

## The module's one argument

> For eleven weeks an agent built your windows and you read what it built.
> You can say what a change does; you cannot yet say whether it is *too
> complicated*, because you have never made the same thing yourself. This
> module switches the agent off and puts your hands on the four things that
> have not changed since the first mass-market window in 1984 — the loop that
> calls your program, the one thread that owns the window, the state that must
> not live in the controls, the file that can fail — and then, in the last
> lesson, builds one feature of your own notatnik three ways, timed, so that
> the difference between doing and accepting is a number in your journal and
> not a feeling. The point is not to type faster than the agent. The point is
> to be the editor lesson 1d describes: the one who can say „za skomplikowane”
> and be right.

## One sentence per lesson

- **5a Co system naprawdę daje aplikacji** — the four apps you have all look
  the same on Windows and Linux; this lesson takes one apart to show who draws
  what (the system the frame, Avalonia every pixel inside), maps the four
  families every desktop toolkit belongs to, defines a desktop application by
  what it owns (a window, an event loop, one UI thread), and names the five
  constants since 1984 that the module will build.
- **5b Ekosystem .NET i nasza decyzja** — the training stack was chosen for
  you in week 2 with a promise to decide it together here; the honest .NET
  table, why every .NET window speaks XAML (WPF 2006 shipped markup *and* a
  binding engine; MVVM was invented for it the year before), Delphi as the case
  where a language did not lose on merit, and the decision ratified or
  overturned with the class and recorded as each student's first real ADR.
- **5c Visual Studio: pełne IDE** — a different program from everything in the
  VS Code family: solution, project file as MSBuild XML, the debugger with a
  breakpoint in the notatnik's save handler and the call stack that shows who
  called it; the Avalonia extension is a previewer, not a designer; Copilot
  stays signed out. From here the hand work happens here.
- **5d Pętla zdarzeń: program, który jest wywoływany** — a new project `spis`,
  a button and a counter typed by hand; `Thread.Sleep` in the handler freezes
  the window and Windows writes „Nie odpowiada” after five seconds — a number
  in Microsoft's documentation; the wrong fix throws „Call from invalid
  thread”, the 1984 fix is the dispatcher, the 2012 fix is `async`/`await`.
- **5e Układ i kontrolki własną ręką** — the markup the agent generated in
  Moduł 3, now typed line by line: a text box, a button, a list and a counter
  in a grid; what `Name` does and where `InitializeComponent` comes from (a
  generator at build time); the same window as a dock panel to see that layout
  is a choice.
- **5f Stan poza kontrolkami** — the load-bearing lesson: a `Stan` class with
  an `ObservableCollection` and one notifying property replaces the 3a
  „świeża kopia”; the window binds to it and notices changes itself; the same
  value shown in two places from one object; the debugger watching the
  collection; MVC 1979 → MVVM 2005 as one rule re-derived for forty-seven years —
  and why the mobile module will be „change the shell”.
- **5g Zapis do pliku i błędy, których nie widać** — `spis.txt`: save on every
  change, load on start; the exceptions named instead of `catch (Exception)`,
  the order the compiler enforces, the file that is missing, read-only, or
  open in another program (the notatnik spec's „Do ustalenia” answered by
  hand), and the write that fails halfway — fixed with a temporary file.
- **5h Trzy tryby: ta sama funkcja bez AI, z podpowiadaniem, z agentem** — one
  small feature of the student's own `notatnik-v2`, specified in a sentence,
  built three times on three branches — by hand in Visual Studio, with
  completion only, with an agent — timed and journaled; then the agent's
  version re-read with 5d–5g's questions: where is the state, on which thread,
  what happens when the file is missing.

## Why this order

Three lessons of *deciding* (what the system gives, which stack, which tool)
before four of *building*, because the module's by-hand work should happen in
the environment students will keep using and on a stack they have consciously
kept — the 2d promise („wybór potwierdzimy w Module 5”) is paid in 5b before a
line is typed in 5d. The four build lessons follow the order in which a window
comes into being and then breaks: first it is called (5d), then it has a shape
(5e), then it has data that outlive the controls (5f), then those data have to
survive the program closing (5g). 5h comes last because its measurement needs
all four: the three modes are compared on a feature that touches the loop,
the layout, the state and the file, and the *Rozbierz to* at the end asks the
four questions the four lessons taught.

## Owns · recalls · avoids (module level)

- **Owns (proposed appendix rows):** *pętla zdarzeń, jeden wątek UI,
  zamrożone okno i pięć sekund, `Dispatcher`* → 5d; *układ / kontener
  układu, `Grid`/`StackPanel`/`DockPanel`, `Name` jako pole, generator w
  czasie budowania* → 5e; *stan, model, wiązanie danych, `INotifyPropertyChanged`,
  `ObservableCollection`, MVVM (jako reguła, nie wzorzec do kopiowania)* →
  5f; *wyjątek jako typ (nie tylko `Exception`), kolejność `catch`, zapis
  przez plik tymczasowy* → 5g; *cztery rodziny narzędzi okienkowych, „program,
  który ma okno, pętlę zdarzeń i jeden wątek”, pięć stałych od 1984* → 5a;
  *Visual Studio kontra rodzina VS Code, solution, punkt przerwania, stos
  wywołań* → 5c; *trzy tryby pracy (bez AI / tylko podpowiadanie / agent)* → 5h.
  The story row „The constants since 1984” moves its practical home from 1a to
  **5a (named) and 5d–5g (built)**, as the appendix already announces.
- **Recalls:** the 3a/3b/3c blocks and their minute counts (each lesson
  recalls the one it explains); 3d's „Call from invalid thread” source and
  „biegłość to nie poprawność”; 4b's ADR format; 4c's „Do ustalenia” about
  the file open elsewhere; 1b's layers (5h maps the three modes onto them);
  1d's editor role and „wyczucie” (index and 5h); 2d's „stack na czas nauki”
  promise (5b); 1c's Anthropic RCT, one clause, in 5h.
- **Avoids:** tests (Moduł 7); the shared app (Moduł 6); mobile (Moduł 8 —
  5f points forward in one sentence); MVU/declarative UI beyond one clause in
  5f; any INF.04 claim (Article V — the exam appears only as a research
  exercise in 5b, never as a fact on the site); free-tier and licence figures
  (dated links only).

## Reader assumptions to verify

- The second survey run (block D) confirms that typing a click handler is new
  to almost everyone; 5d's opening assumes the 3c block was the first and only
  handler they typed.
- Visual Studio Community with the „.NET desktop development” workload is on
  the lab machines before 5c (lab list A, step 6) and the lab is Windows (open
  decision #9 — if Ubuntu, 5c needs a room).
- The class kept `notatnik-v2` and can still build it (5h depends on it).

## Decisions

- **Running example for 5d–5g is a new, small project `spis`** (a list of
  things — parts, books, anything — typed, counted, saved) — rejected:
  rebuilding the notatnik by hand (5h would then repeat it; and the contrast
  lesson needs the agent-built notatnik intact), and continuing in `okno`
  from 2d (too many agent commits to read around).
- **Avalonia, the training stack, inside the module (Viktar, 2026-09-02).**
  5c drops the drag-and-drop designer: the Avalonia extension is a previewer,
  which suits a module whose point is that the markup is typed — rejected:
  WinForms for the designer (a third framework).
- **5d shows four handlers, not two:** freeze → wrong thread → dispatcher →
  `async`; the two middle stages are what makes the 2012 syntax an answer to
  a 1984 problem — rejected: jumping from `Thread.Sleep` to `async` (the
  student would learn a keyword, not a rule).
- **5f writes `INotifyPropertyChanged` by hand, no MVVM toolkit** — rejected:
  CommunityToolkit.Mvvm (what agents generate; named in 5f as what to
  recognise, not typed).
- **5h's feature is a count of notes under the list**, one sentence of spec,
  sized for twenty minutes by hand — rejected: a feature the notatnik spec
  excludes (search, delete), which would reopen the spec.
- **Hours as in v2.5**; the two reserve hours are named for 5d and 5f in the
  index text so the class knows where slack goes.

## Open questions for Viktar (≤ 3)

1. **`spis` as the by-hand project** (a plain list app) versus a by-hand
   rebuild of the minutnik — the minutnik is more fun and the class knows
   it, but its timer forces threading in 5d before the lesson is ready for
   it. Both drafts exist only as this brief's decision; changing costs the
   four build lessons.
2. **Where each student's `decyzje/0002-stack.md` (5b) lives** — in
   `notatnik-v2` beside `0001-format-pliku-notatek.md`, or in the course notes
   repository next to `pomysly.md`. The draft says `notatnik-v2`.
3. **Whether 5c is taught before the SDK-10 lab image is confirmed** — 5c
   assumes Visual Studio 2026 Community on Windows; if the exam-station
   question (#9) lands on Ubuntu, 5c becomes a reading lesson and the hand
   work of 5d–5g stays in VS Code.

## Deviations from the approved arc

1. **Code verification status, final for this run.** First run 19:34: SDK 8.0.424 only → `NETSDK1045`; second run (net8.0 target) → `CS9057` + `CS0103: InitializeComponent` (Avalonia 12's generator does not load under Roslyn 4.11); third run 19:43, after SDK 10 was installed: every stage reported „Kompilacja powiodła się” in 0,9 s — false, because `Copy-Item` kept the stage files' timestamps and MSBuild skipped `CoreCompile` (the tests then ran against the untouched template and all threw `NullReferenceException`); fourth run 19:48 with `--no-incremental` and touched files: **all eleven stages compiled, stage 10 failed with `CS0160` as intended, stages 05 and 11 ran for 8 s, 7 of 8 headless tests passed.** The one failure was a finding (see 05g deviations): a file locked by another program makes `File.Move` throw `UnauthorizedAccessException`, not `IOException`. Stage 11's message and the test were corrected and four plain fact-tests added (10 tests); the confirming run is pending Viktar's next double-click on `build.cmd` — until its log says 10/10, the by-hand lessons keep `publish: false` for this reason as well as for approval.
2. **The module introduction says „dwie godziny rezerwy leżą przy czwartej i szóstej lekcji”** — the reserve is named in the student-facing text, as this brief decided, rather than kept in the plan only.
3. **Links inside the module and to Moduł 4 are plain text**, not links: the build refuses links to unpublished lessons (lib/links.ts), and every lesson of Moduł 4 and 5 is `publish: false`. Also 2f („C# na pierwszy rzut oka”) does not exist yet, so 5d and 5e refer to „lekcja o czytaniu C#” by name only. Links to Moduł 1–3 lessons are real.
4. **The stack decision (Avalonia) is treated as taken** in every lesson; the index's own comment says where it came from and that #12 is now closed for this draft.
5. Reader-file corrections made while drafting: the phrase „nigdy nie widziała” about the class and completion mode was cut from 5h — the survey says 6 of 12 have used Copilot, so the claim was false.
6. **Fresh-context review (a subagent with only the reader file, the style guide, the drafts, the briefs and the build log), 2026-09-02 evening — 63 findings, the A and B lists fixed the same evening:** the `Task.Run` crash in 5d was described wrongly (an exception inside a task does not end the process; Visual Studio breaks on it, and without the debugger the click silently does nothing — rewritten and the summary changed); under F5 the working directory is `bin\Debug\net10.0`, not the project folder (5c's `notatki.md` sentence, 5g's file location, the PowerShell lock line and the delete step all corrected); the Call Stack window collapses non-user frames into `[External Code]` by default (5c now tells the student to *Show External Code*, and the bottom frame is named as `Program.Main`, not „coś z systemu”); two attributions to the non-existent 2f were removed (5d, 5e); *wątek* was used before being defined — defined in 5d's „Zamrożone okno” section and glossed in 5a; the false reader claim in 5h's ending (two layers „nie było w twojej historii”) was replaced; Delphi's current seller is not Borland (5b); the index's „siedem commitów” corrected to three, „pięć rzeczy, które moduł zbuduje” to „z których zbuduje cztery”; `dotnet new gitignore` added before the first `git add .` in 5d; 5d's exercise 2 no longer needs `git stash` or a commit that does not exist; the „1984” attributions inside 5d were made non-dated („pierwsze systemy okienkowe”, „sposób pierwszy”) and 5a's 1984 got a primary source (Hertzfeld, folklore.org); 5b's table cells got their links (Avalonia platforms, templates repo, Windows Forms) and the Uno rendering claim was withdrawn; WPF's „three things” became two; the INF.04 exercise got a neutral gloss; 5c's lab facts were made conditional (Article V) and its opening no longer assumes VS Code; `Note.cs`/`NoteFile.cs` hedged; 5f's lineage dates linked inline, `Opis`'s property syntax explained, MVU named, „drugi semestr” removed; 5g explains what an exception is before naming one, stops inside `Wczytaj`, counts „trzy wyjątki i jeden przypadek”, and gives the English CS0160 text beside the Polish; 5h's K8 check no longer assumes `##` per note, `git merge` is explained with the conflict escape, and the minute count is ten.
7. **Left as Viktar's call (from the review's list):** the index naming the two reserve hours in student text (Article V borderline); whether Visual Studio 2026 saves `.sln` or `.slnx` on the lab image (5c exercise 3 says „plik solution”); English menu labels; `Thread.Sleep(6000)` (the ghost window shows for about a second — the text now says so and offers 10000); the 59 second-person past-tense forms the checker lists (the clusters in 5c and 5f were thinned; the rest are the generic masculine the guide allows).
8. **`npm run build` evidence:** run in the local Linux VM on a copy of the tree (the mount refuses deletes, and the sandbox cannot reach Google Fonts, so `next build --webpack` ran with `NEXT_FONT_GOOGLE_MOCKED_RESPONSES` pointing at a local stand-in) — 27 static pages, no error, before and after the review fixes; the content pipeline (Zod frontmatter, `<Zrodlo>`/`<Cytat>` contracts, internal links incl. the unpublished-link rule) is exactly what that build exercises. Viktar's own `npm run build` on Windows the same evening passed with the same tree minus Moduł 5.

