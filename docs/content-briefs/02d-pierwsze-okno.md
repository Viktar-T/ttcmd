# Brief — 2c · Pierwsze okno

| | |
| --- | --- |
| Lesson | `content/moduly/02-warsztat/pierwsze-okno.mdx` · `order: 3` |
| Written | 2026-09-01, by write-lesson · approved: **2026-09-01, by Viktar** |
| Mode | supervised (brief approved before drafting) |
| Research | `course-structure-v2.md` (2c row; „Decisions this list encodes”: training stack); `research-02` §2.1–2.4 (Avalonia across OSes, .NET 10); constitution Article VII; corpus: 2b (the repo), 1d (diff as a term), 1e (agent robi wszystko sam — today that ends) |
| Drafted | 2026-09-01 — deviations listed at the end |

## Reader position

Has read: 0a, 0c, module 1 intro, 1b–1h, 2a–2b. Can: open both editors,
work in `pierwsze-okno/` (their own pushed repo with a verified SDK). Knows
*diff* as a word from the 1d demo — has watched diffs on a projector, never
read one themselves. Has never: seen a project template, run a program with
a window that they created, written C# (TO CONFIRM, block D — the lesson
must not require writing any).

## Carrying question

Skąd właściwie bierze się okno na ekranie — i czy potrafisz wskazać plik,
który je opisuje, oraz powiedzieć, co dokładnie zmienił w nim agent?

## Anchor

The window application in `pierwsze-okno/`: born from a template with zero
AI, run, understood file by file at gloss level, then changed twice — once
by the agent (and the diff read line by line before accepting), once by the
student's own hand. The same window from the first section to the last.

## Shape

Hands-on. The lesson's dramatic order is deliberate: the window exists
*before* any AI touches it.

## Arc

| # | Heading (Polish, working) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | in 1e a window (maybe) appeared out of nowhere and the agent did everything; 2b left an empty workbench; today a window appears twice — once without AI at all, once changed by it | the empty repo |
| 1 | Stack na czas nauki | declare, honestly provisional: „C# + Avalonia na czas nauki; wybór potwierdzimy w Module 5, kiedy będziecie umieli go ocenić”; the whole argument given now is one paragraph — .NET is the course's presumed stack (Article VII), Avalonia is the .NET window framework that runs on Windows and Linux alike (linked claim); *stack* glossed and owned; the real comparison deferred with a named payoff (Moduł 5, your own three builds as evidence) | the stack the window will be built in |
| 2 | Szablon, nie magia | *szablon projektu* owned: `dotnet new` generates a working project from a pattern; run `dotnet new` + `dotnet run`; a window on the screen with zero AI — the floor every agent builds on | the window runs; commit „okno z szablonu” |
| 3 | Plik, który jest oknem | what appeared, at gloss level only: `MainWindow.axaml` — the window described in a markup file, „jak HTML opisuje stronę” (reader knows HTML); the code files in one sentence each; explicitly *not* taught here: layout, events, state (Moduł 3 by feel, 5f formally) | find the title line in the axaml file |
| 4 | Agent zmienia jedną rzecz | the agent's first task in this repo: one visible change; **before** accepting — the reader's first self-read diff, built in-lesson: minus lines, plus lines, on a change small enough to read whole; recall diff (1d) in one clause | a two-line diff, read completely |
| 5 | Zmień coś sam | the same class of change by hand, no agent: edit one value, run, see it — proof the file is yours, and the seed of every future Bez AI segment | one line edited by hand; commit |
| 6 | (ending) Okno, które rozumiesz | answers the opening: the window runs, you can point at the file that makes it and at the two commits that changed it; what 2d does with this history | the pushed repo with ≥ 3 commits |

## Owns · recalls · avoids

- **Owns:** *stack* (gloss: zestaw technologii, z których zbudowana jest
  aplikacja — proposed appendix row „stack → 2c”); *szablon projektu*
  (proposed row „szablon projektu → 2c”); *XAML/axaml* at gloss level (old
  home 1a is outside the pipeline — proposed row „XAML → 2c”).
- **Recalls:** diff (term home 1d; first self-read happens here, one
  clause + link); SDK and the check-with-a-command habit (2b); „agent robi
  wszystko sam” as 1e's rule that ends today (one clause).
- **Avoids:** układ, zdarzenia, stan, wiązanie danych, MVVM (Moduł 3 by
  feel, 5f formally); the full framework comparison and „nasza decyzja”
  (5a/5b); prompting techniques (3b); any INF.04/exam claim (Article V —
  even though research-02 §3 tempts).

## Exercises

1. **Recall** — from memory: which command created the project; which file
   describes the window; what „na czas nauki” means about the stack.
2. **Action on the anchor** — change the window's title by hand, run, see
   it; then ask the agent for one visible change elsewhere and read the
   whole diff before accepting.
3. **Build step** — the repo holds at least three commits (template, agent
   change, hand change) with honest messages, and is pushed; 2d reads this
   history.
4. **Research** — on Avalonia's supported-platforms page, check whether the
   training stack runs on the system you have at home; write the answer
   down with the date.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| Avalonia runs on Windows and Linux (and macOS) as first-class desktop targets | docs.avaloniaui.net supported platforms | — | have (research-02 §2.1) — re-check and date at draft |
| The Avalonia template package and its `dotnet new` template name | Avalonia docs / Avalonia.Templates | — | to check at draft (name as installed in the lab) |
| .NET 10 as course baseline | — | — | recalled from 2b, no re-claim |

## Reader assumptions to verify

- Avalonia templates installed per user and NuGet cache warmed (v2 per-user
  traps 2–3) — otherwise section 2 becomes thirty simultaneous downloads.
- Training stack confirmed as C# + Avalonia (v2 open decision #4 with #1);
  if the lab is confirmed Windows-only and Viktar chooses WinForms instead,
  sections 1–3 are rewritten — the arc survives, the files change.
- No student is assumed to know C#; the lesson's only hand-edit is one
  value in markup (block D, questionnaire).

## Decisions

- The stack paragraph argues only „runs on both possible lab OSes + .NET is
  the course's presumed stack”, and defers the real comparison to Moduł 5 —
  rejected: the honest table now, which means nothing to a reader with zero
  desktop builds behind them.
- The first self-read diff is a one-visible-change diff, chosen to be
  readable whole — rejected: reading the template's initial hundreds of
  lines as a first diff, which teaches skimming, not reading.
- The window exists before the agent touches it (template first, agent
  second) — rejected: agent-builds-the-app-from-scratch, which repeats 1e
  instead of adding control to it.
- Hand edit before the lesson ends — rejected: postponing all hand edits to
  Moduł 3, which would leave „the file is yours” unproven.

## Open questions for Viktar (≤ 3)

None — #4 (stack) is v2's own default proposal and is treated as standing
unless Viktar overturns it at approval.

## Deviations from the approved arc

- **The template's file list is not enumerated.** The exact file set produced
  by `avalonia.app` could not be confirmed from a source, so section 3 names
  only what is sourced — `MainWindow.axaml`, its `.axaml.cs` companion, the
  `<Window>` container and the `Title` property — and asks the student to look
  at the rest. This also keeps the section in 2a's „znajdź u siebie” manner.
- **The commit order changed, on purpose.** The template is committed *before*
  `dotnet run`, and sections 4–5 stage `MainWindow.axaml` by name instead of
  `git add .`, so `bin/` and `obj/` never enter the repository. The lesson
  points at them once, untracked, and leaves them to 2d — which is what makes
  2d's `.gitignore` section a real cleanup rather than a demonstration.
- **The agent's prompt is a code block, not a block quote.** A block quote is
  read — by the style guide and by `check:content` — as a quotation needing an
  attribution line, and this is an instruction the student types.
- **The diff in section 4 is labelled a shape, not a copy**, in the prose right
  under it, since its exact content depends on what the agent does.
- **The stack paragraph's one argument is Avalonia's platform support**
  (Windows, macOS, desktop Linux — docs, 20.04.2026), phrased as „the commands
  in this lesson work in the lab and on what you have at home”, which is the
  form of that argument this reader can check.
