# Brief — 2f · C# na pierwszy rzut oka, dla kogoś po Javie i C++

| | |
| --- | --- |
| Lesson | `content/moduly/02-warsztat/csharp-na-pierwszy-rzut-oka.mdx` · `order: 6` |
| Written | 2026-09-02, by write-lesson · approved: (blank until Viktar says so) |
| Mode | supervised — brief only; **no Polish is drafted until this is approved** |
| Structure | `course-structure-v2.md` v2.5, Moduł 2, row 2f |
| Research | none needed for the concepts (ADR-0008: concept explanations need no source); the two claims that are not concepts — the Avalonia handler signature and the `avalonia.app` template's file layout — are found at drafting time on `docs.avaloniaui.net` (code-behind page last updated 2026-08-25) and in the student's own `okno` project. Research gate: **case 2** |
| Drafted | — |

## Reader position

Has read: 0a, 1b–1g (or only 1g), 2a–2e. Has done: installed both class
editors and run the 25-minute experiment (2a); one folder, one repo, SDK
verified (2c); `dotnet new avalonia.app -o okno`, a window on screen, one
agent change of two lines read as a diff, one change by hand in
`MainWindow.axaml` (2d); `git diff`, `restore`, `revert`, a branch (2e).
Can, per the survey of 2026-09-02 (n = 12): write simple programs in Java
(5 of 12) or C++ (3), read someone else's code in C++ (4) or JS (5); explain
„klasa i obiekt” (6 of 12), „interfejs” (6). Has never: written a line of C#
(11 of 12 „nie znam”); explained an exception (1), a list (1), an event (1);
read a `.cs` file end to end. **The diff they read in 2d was two lines of
markup. Moduł 3 will ask them to read forty lines of C# a week.**

## Carrying question

„Co właściwie jest w tym pliku, który agent napisał — i ile z tego już
znam pod inną nazwą?”

## Anchor

The student's own `okno` project from 2d — specifically `MainWindow.axaml.cs`
and `Program.cs` as the template generated them, plus the two-line agent
change from 2d. Every construct in the lesson is pointed at in these files
(or added to them by the agent in one small, read-before-accepting request
where the template lacks it — the handler). Not a fresh example project: the
point is that the code they already have is readable.

## Shape

**Narrative reading lesson, no build.** The student opens their own files and
reads them beside the lesson; nothing is typed except one two-line agent
request. Two hours. Structure: six short sections, one construct each, every
section ending with „znajdź to u siebie”.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | 2d's diff was two lines of markup; next week the agent's diffs are forty lines of a language nobody in the room has written. The good news: most of it is Java or C++ wearing a different coat. Today's question. | `MainWindow.axaml.cs` opened beside the lesson |
| 1 | Plik, przestrzeń nazw, klasa | `namespace`, `using`, `public partial class MainWindow : Window` — the same three things as a Java file (package / import / class extends) and a C++ file (#include / class : public); `partial` explained in one sentence as „the other half is generated from the .axaml”. `InitializeComponent()` as the line that loads the window; „if you delete it, the window is empty” | the class header and constructor of `MainWindow.axaml.cs` |
| 2 | Właściwość zamiast gettera i settera | `public string Title { get; set; }` beside Java's `getTitle()`/`setTitle()` and a plain C++ field; why the agent's code says `Title = "…"` and not `setTitle(…)`; `var` in one clause | the `Title` the student changed by hand in 2d, now seen from the C# side |
| 3 | Lista | `List<string>` beside Java's `ArrayList<String>` and C++'s `std::vector<std::string>`; `Add`, `Count`, `foreach` — the three things the Moduł 3 block will use. Survey fact stated plainly: one in twelve can explain a list; this section is the first time, not a reminder | not in the template — shown as the three lines the 3a block will ask for, read only |
| 4 | Zdarzenie: metoda, którą wywołuje ktoś inny | The agent adds a button with a `Click` handler (one request, read before accepting — the lesson gives the prompt); the signature `(object? sender, RoutedEventArgs e)` beside Java's `ActionListener` / `onClick` and C++'s callback; „you do not call it; the window does”. Only the shape today — 3c types one, Moduł 5 explains the loop under it | the agent-added handler in the student's `MainWindow.axaml.cs` |
| 5 | `try` i `catch`, i słowo `async` | `try`/`catch` identical to Java and C++, one example; `async`/`await` as the one thing with no Java/C++ counterpart at this level — recognise it, do not touch it: „a method that waits without freezing the window; why, in Moduł 5” | none in the template; the 3d fragment's `async void` shown as a thing to recognise |
| 6 | (ending) Sześć rzeczy, które umiesz przeczytać | Answers the opening: a list of the six shapes with their Java/C++ names; what reading them buys next week (the ten minutes of diff-reading stop being reading in a foreign language); what it does not buy (writing — that is the by-hand blocks and Moduł 5) | the whole file, re-read top to bottom in two minutes |

## Owns · recalls · avoids

- **Owns** (proposed appendix rows): *właściwość (property)*, *`partial`*,
  *`using` / przestrzeń nazw*, *`var`*, *`List<T>` as read* (the 3a block owns
  typing it), *`async`/`await` as a word to recognise*. Home of *zdarzenie* as
  a mechanism stays Moduł 5; this lesson owns only its C# *shape*.
- **Recalls**: 2d's diff and the `Title` change (one clause, link); 1b's
  „jednostka pracy” — not needed, avoid.
- **Avoids**: pętla zdarzeń, wątek UI, MVVM, wiązanie danych, stan (all
  Moduł 5); LINQ, generics beyond `List<T>`, nullable reference types (say
  „the question mark means «może być puste», ignore it today”).

## Exercises

1. Recall — from memory: the six shapes and, for each, the Java or C++ name
   it corresponds to.
2. Action on the anchor — in `MainWindow.axaml.cs` mark (comment `// 1`…`// 6`)
   one example of each shape that is present; write on the card which of
   the six are *not* in the file.
3. Build step — the agent request from section 4 (a button with a handler
   that changes the title), read before accepting, committed as
   `dodaj przycisk z obsluga klikniecia`; this button is what the 3c block
   will look at for its shape.
4. Research — open the C# guide's page on properties (Microsoft Learn) and
   find one thing the lesson simplified; write it down with the link and
   date.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| Avalonia handler signature `(object sender, RoutedEventArgs e)` and `Click` attribute | https://docs.avaloniaui.net/docs/basics/user-interface/code-behind | 25.08.2026 | have |
| The `avalonia.app` template's files (`Program.cs`, `App.axaml(.cs)`, `MainWindow.axaml(.cs)`) | the student's own project; Avalonia templates repo | at drafting | to find |
| „C# is Java-like” — not asserted as a claim; shown construct by construct | — | — | dropped as a claim |
| Survey numbers quoted (1 of 12 can explain a list / an event) | `docs/surveys/ankieta-start-2026-09-aggregate.md` | 02.09.2026 | have — aggregate only, and only if Viktar wants the class's own numbers in a lesson |

## Reader assumptions to verify

- That the second group's survey does not overturn „Java strongest, C#
  unknown” (block A1/C1).
- That every student still has the `okno` project from 2d with the
  two-line agent change (if not, the lesson's anchor is a fresh
  `dotnet new avalonia.app`, and section 2 loses the by-hand `Title`).
- Whether comparisons to C++ help or hurt: 5 of 12 „nie znam” C++ — the
  lesson leads with Java and gives C++ as the second column.

## Decisions

- A reading lesson with no build, two hours — rejected: a mini C# course
  (the language is taught by doing in Moduł 3 and 5; this lesson only makes
  the diffs readable).
- The anchor is the student's own template project — rejected: a purpose-
  built example (would be the seventh file they have never seen).
- Six constructs, no more — rejected: LINQ, generics, nullability (every one
  a section the reader cannot use next week).
- `async` shown as a word to recognise, not explained — rejected: explaining
  it (needs the UI-thread rule, which is Moduł 5's).
- Java first, C++ second in every comparison — rejected: C++ first (more
  of them „nie znam” it than Java).
- The lesson may quote the class's own survey numbers as aggregate — left to
  Viktar (open question 2).

## Open questions for Viktar (≤ 3)

1. Slug: `csharp-na-pierwszy-rzut-oka` (ASCII, Article III) — or
  `c-sharp-…`? The title keeps „C#”.
2. May the lesson say „w naszej ankiecie jedna osoba na dwanaście…”? It is
   aggregate and anonymous (Article IV allows it) and it is the most honest
   opening available; but it is your class's number on a public site.
3. Is two hours right, and does it happen in the week of 2e or in the first
   hour of 3a's week? (The structure counts it in Moduł 2's 14 h.)

## Deviations from the approved arc

(filled in after drafting; one line each)
