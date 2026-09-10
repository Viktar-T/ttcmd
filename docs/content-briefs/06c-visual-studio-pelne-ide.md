# Brief — 5c · Visual Studio: pełne IDE

| | |
| --- | --- |
| Lesson | `content/moduly/06-pod-maska/visual-studio-pelne-ide.mdx` · `order: 3` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** |
| Mode | autonomous |
| Research | `course-structure-v2.md` (v2.2 decision: Visual Studio the main environment from Moduł 5; lab list A step 6; per-user trap 4; open decision #9); `research-02` §4.1; `research-03-desktop-app-history.md` §A6 (`.csproj` as MSBuild XML; `partial class` + `InitializeComponent` as the designer split — reused in 5e), „What this means” → 5c. Research gate: **case 2** — vendor facts found and dated at drafting: VS 2026 GA date and current version; the Avalonia extension's features (previewer, IntelliSense) and minimum VS version; breakpoint / Watch / Call Stack menu paths; Copilot's sign-in requirement and the completions setting |
| Drafted | 2026-09-02 — `visual-studio-pelne-ide.mdx`; deviations at the end |

## Reader position

Has read 5a–5b; the stack is decided and written down. Has used VS Code
(10 of 12), Rider/IntelliJ (7), Visual Studio (5 — as „a program I opened”),
a debugger (2). Every editor the course has used so far — the two class
editors and VS Code — belongs to the VS Code family; nobody has opened a
`.sln`, set a breakpoint on purpose, or read a call stack. Has `notatnik-v2`
with a save handler the agent wrote.

## Carrying question

Czym różni się Visual Studio od wszystkiego, w czym dotąd pisaliśmy — i po co
komuś, kto ma agenta, debugger?

## Anchor

`notatnik-v2` opened in Visual Studio, and one breakpoint in its save handler:
the lesson's sections are the things the student finds around that breakpoint
— the solution, the project file, the run, the pause, the Watch window, the
Call Stack window with Avalonia's and the system's frames below their own
method.

## Shape

Procedure with a narrative frame (a tool lesson); read while doing. Two
hours. Copilot is not signed in on lab machines; the lesson says so once and
tells the student how to keep completions manual on their own machine.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | you have written in three editors and they were one program in three coats; the fourth is not — and the difference is not the agent, it is what happens when you press F5 | notatnik-v2's folder, about to be opened |
| 1 | Inny program, nie inny edytor | VS Code family vs Visual Studio: an editor with extensions vs an IDE with a compiler, a debugger and a project system built in; Windows only, a tens-of-GB install done at image time; „.NET desktop development” workload; the first launch trap; version and date, linked | opening `notatnik-v2.csproj`; the `.sln` Visual Studio makes |
| 2 | Solution, projekt, plik projektu | Solution Explorer: solution → project → Dependencies (the NuGet packages the agent added) → files; `.csproj` opened as text: an MSBuild XML file, which is why it has elements and not settings (A6 fossil, one sentence); the Avalonia extension: IntelliSense and a previewer for `.axaml` — a preview, not a drag-and-drop designer, and why that suits this module | the notatnik's csproj and its `<PackageReference>` lines |
| 3 | F5 | build + run under the debugger; the Output and Error List windows as the place the red underlines of 3a–3c come from; where the compiled files go (bin, obj — 2e's `.gitignore`) | the notatnik running from Visual Studio |
| 4 | Punkt przerwania: program stoi, ty patrzysz | click the margin at the first line of the save handler; click Save in the running window; the program stops *inside your method* — locals, Watch (`Debug › Windows › Watch`), F10 step over one line and watch the file appear; F5 to continue | the save handler paused |
| 5 | Kto wywołał twoją metodę | the Call Stack window: above nothing, below your handler a column of Avalonia frames and, at the bottom, the system's; read it top to bottom — you did not call this method, the window did, in response to a message; the next lesson is about that column | the call stack of the click, screenshot-free („znajdź u siebie” prose) |
| 6 | Agent zostaje za drzwiami | the same repository open in the class editor at the same time — the agent's door stays; Visual Studio's own Copilot is not signed in on lab machines and stays off in every by-hand segment; on a personal machine: inline suggestions set to manual (path, dated) — the *tryb pracy* sentence the module will repeat | notatnik-v2 open in two programs |
| 7 | (ending) Narzędzie do patrzenia | answers the opening: the debugger is the instrument for the questions the module asks — who called this, where is the state, what did the file do; from here the hand work happens here | the breakpoint removed, the lesson's card line |

## Owns · recalls · avoids

- **Owns:** *Visual Studio kontra rodzina VS Code*, *solution (`.sln`)*,
  *plik projektu jako XML MSBuild*, *punkt przerwania*, *okno Watch*, *stos
  wywołań (Call Stack)*, *krok (F10)* — proposed appendix rows; *tryb pracy*
  as the sentence every by-hand lesson opens with.
- **Recalls:** 2b's category argument (one program in three coats); 2e's
  bin/obj and `.gitignore`; 3c's handler (the breakpoint goes in the
  notatnik's, the agent-written one); 5a's „one UI thread” (the bottom of the
  stack), pointing to 5d.
- **Avoids:** explaining the message loop (5d); the previewer's features
  beyond „shows the window without running”; any licence figure (link only);
  IntelliCode/Copilot as a mode of work (5h owns the three modes).

## Exercises

1. Recall — from memory: three things Visual Studio has that VS Code does
   not; where a breakpoint goes and what F5, F10 do.
2. Action on the anchor — a breakpoint in the notatnik's load method; run;
   read the locals before and after one F10; write down the variable that
   held the file's text and its length.
3. Build step — the `.sln` committed (or ignored — decide and say why in the
   commit message); the card line: how many frames were below your handler in
   the call stack, and the name of the lowest one you could read.
4. Research — find, on the extension's page, the minimum Visual Studio
   version it needs today and the date of its latest release; compare with
   the lab's version.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| Visual Studio 2026 GA 11.11.2025 (18.0.0); current 18.9.2 of 25.08.2026 | https://learn.microsoft.com/en-us/visualstudio/releases/2026/release-history ; …/release-notes | checked 02.09.2026 | have |
| The Avalonia for Visual Studio extension: IntelliSense + previewer („see what the UI… will look like without needing to run the application”); no designer | https://docs.avaloniaui.net/tools/visual-studio-extension | 28.07.2026 | have |
| Extension minimum VS 17.14 (marketplace, v12.2.2.0) | https://marketplace.visualstudio.com/items?itemName=AvaloniaTeam.AvaloniaVS | checked 02.09.2026 | have |
| Set a breakpoint: click the far left margin / F9 | https://learn.microsoft.com/en-us/visualstudio/debugger/get-started-with-breakpoints | 23.04.2026 | have |
| Watch window: Debug › Windows › Watch › Watch 1; right-click › Add Watch | https://learn.microsoft.com/en-us/visualstudio/debugger/watch-and-quickwatch-windows | 12.03.2026 | have |
| Copilot in VS needs a GitHub sign-in; hide the badge: Tools › Options › Environment | https://learn.microsoft.com/en-us/visualstudio/ide/visual-studio-github-copilot-install-and-states | 22.04.2026 | have |
| Inline suggestions manual: Tools › Options › All Settings › Text Editor › Inline Suggestions › General; Alt+, to trigger | https://learn.microsoft.com/en-us/visualstudio/ide/visual-studio-github-copilot-extension | 06.05.2026 | have |
| Community edition free for education; classroom terms | vendor licence page | to find at drafting; linked, not paraphrased |
| Call Stack window path (Debug › Windows › Call Stack) | learn.microsoft.com (How to: use the Call Stack window) | to find at drafting | to find |

## Reader assumptions to verify

- Visual Studio 2026 Community is installed with the workload and launched
  once per profile (per-user trap 4) — else the lesson loses its first
  quarter-hour.
- The lab is Windows (open decision #9). If not, this lesson is read, not
  done, and the hand work of 5d–5g stays in VS Code.

## Decisions

- The breakpoint goes into the **agent-written** notatnik handler, not into
  a fresh example — rejected: a hello-world console program (the call stack
  of a console program has no column to read).
- No screenshots; every UI element is a „znajdź u siebie” sentence with the
  menu path — rejected: screenshots (they rot with each release; 2b's rule).
- The Avalonia extension is presented as a previewer and that is treated as
  a fit, not a lack — rejected: WinForms' designer as a side-path (Viktar,
  2026-09-02: Avalonia only).

## Open questions for Viktar (≤ 3)

1. Whether the `.sln` is committed to the students' repos (Visual Studio
   creates one when opening a `.csproj`) or ignored; the draft says commit,
   because the exam stations' Visual Studio will look for it — TO CONFIRM.

## Deviations from the approved arc

1. **Menu labels are given in English** as an English-language Visual Studio shows them; the file's comment says the lab's language is TO CONFIRM.
2. **The Community licence is linked, not paraphrased beyond one clause** („darmowa dla uczniów, do nauki w klasie i do własnych programów”), with „warunki na stronie producenta” next to it.
3. **F11 is mentioned in Źródła only**; the lesson teaches F9, F5, F10 — three keys, per the ending.
4. The Call Stack section names no frame — „znajdź u siebie” prose, as decided; the card line asks for the lowest readable frame instead.
5. `check:content`: names-once 24 — almost all UI labels (Solution Explorer, Error List, Hide Copilot Badge…) that appear once by nature; names/100 at 2,78 is under the budget but close, which is the cost of a tool lesson.
