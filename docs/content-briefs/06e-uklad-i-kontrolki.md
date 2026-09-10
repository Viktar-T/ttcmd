# Brief — 5e · Układ i kontrolki własną ręką

| | |
| --- | --- |
| Lesson | `content/moduly/06-pod-maska/uklad-i-kontrolki.mdx` · `order: 5` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** |
| Mode | autonomous · **tryb pracy: bez AI** |
| Research | `research-03-desktop-app-history.md` §A2.4 (stage two → three: designers and markup produce a serialized graph of widget instances; „markup moved the construction out of code, the mutation stayed”), §A6 (`partial class` + `InitializeComponent()` as the designer split); the Avalonia layout and control reference pages (Grid, DockPanel, StackPanel, TextBox, ListBox); the template's own files; the build log's proof that `InitializeComponent` and the `Name` fields come from a generator (`Avalonia.Generators`, CS0103 when it does not load). Research gate: **case 2** |
| Drafted | 2026-09-02 — `uklad-i-kontrolki.mdx`; deviations at the end |

## Reader position

Has 5d's `spis`: a stack panel with a button and a counter, the async
handler. Has *read* agent-generated `.axaml` for eleven weeks and typed two
lines of it in 3a and 3c (`<ListBox Name="HistoryList" />`, `<Button
Click="…">`), always into a file whose shape the agent chose. Knows from 2d
that `.axaml` reads like HTML. Has never chosen a layout container, never
asked why `Name` in markup becomes a field in C#, and never seen the
generated half of `partial class MainWindow`.

## Carrying question

Skąd okno wie, gdzie co położyć — i skąd twój kod C# zna kontrolkę tylko
dlatego, że w pliku znaczników dostała nazwę?

## Anchor

`spis`'s `MainWindow.axaml`, rewritten by hand into the window the module
will finish: a text box and a button on top, a list in the middle, a counter
at the bottom — first as a `Grid`, then the same four controls as a
`DockPanel`. The code-behind gains `DodajPozycje()` and an Enter handler.

## Shape

By-hand hands-on. Four hours.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | 3a's `<ListBox Name="HistoryList" />` went „obok kontrolki, która pokazuje licznik” — into a place the agent had chosen; today the place is yours: the whole window from the `<Window>` tag down, typed | the 5d window, about to be replaced |
| 1 | Trzy kontenery, jedna decyzja | *tryb pracy*; the three containers by what they do, in the docs' words: `StackPanel` (a line), `DockPanel` (edges, last child fills), `Grid` (rows and columns; `Auto`, `*`, pixels); why 5d's stack panel cannot give the list the rest of the window | the decision: `Grid` with `RowDefinitions="Auto,*,Auto"` |
| 2 | Okno wpisane linijka po linijce | the full `MainWindow.axaml` body typed: `TextBox Name="NowaPozycja" PlaceholderText`, `Button Grid.Column="1"`, `ListBox Grid.Row="1" Grid.ColumnSpan="2" Name="Lista"`, `TextBlock Name="Licznik"`; `Margin`, `Width`/`Height` on the window; run before the code — an empty, correctly laid-out window is a result | stage 06, markup only |
| 3 | Kod, który zna kontrolki po imieniu | code-behind: `DodajPozycje()` reads `NowaPozycja.Text`, trims, inserts at 0 into `Lista.Items`, updates `Licznik.Text`, clears the box; `Click` and a `KeyDown` handler checking `Key.Enter`; run, type, Enter, click. What to notice: the same method from two events | stage 06, code |
| 4 | Skąd się bierze `InitializeComponent` | the generated half: `partial class` means „the other half is elsewhere”; the other half is written at build time by a generator from the `.axaml` (`Avalonia.Generators`, in the `Avalonia` package): `InitializeComponent()` loads the markup, and every `Name` becomes a field; evidence the student can see: the build log's `CS0103: InitializeComponent does not exist` when the generator cannot load (SDK 8), and `EmitCompilerGeneratedFiles` to see the file under `obj/`; A6's designer split named as the reason the pattern exists | `obj/…/MainWindow.g.cs` (path from the build log) |
| 5 | To samo okno, inny kontener | the four controls re-parented into a `DockPanel` (top: a horizontal `StackPanel` with the box and the button; bottom: the counter; the list fills); run; what changed on screen and what did not (the code-behind: nothing) — layout is a choice the markup makes, the handlers do not care | stage 07 |
| 6 | Co narzędzie pisze, a czego nie pokazuje | what the agent generated in Moduł 3 and the student now recognises: containers chosen without a reason, `Margin` everywhere, names that exist only to be reached from code; what the previewer in 5c shows and what it hides (the generated class); the reading rule for agent markup from now on: find the container, find every `Name`, find who uses it | the student's minutnik `.axaml` re-read |
| 7 | (ending) Okno, którego każdy znacznik ma powód | answers the opening: layout is the container's rule; names become fields because a generator writes the other half of your class; commit; card line | stage 06 restored as `spis`'s state (the grid), commit |

## Owns · recalls · avoids

- **Owns (appendix rows):** *kontener układu* (`StackPanel`, `DockPanel`,
  `Grid`; `Auto`/`*`), *`Name` jako pole klasy*, *`partial class` i
  `InitializeComponent()` — druga połowa klasy generowana przy budowaniu*,
  *generator (Avalonia.Generators)*, *`KeyDown` / `Key.Enter`*,
  *`PlaceholderText`*.
- **Recalls:** 3a's `ListBox` line and 3c's `Button` line (link); 2d's
  „reads like HTML” (one clause); 5c's previewer; 2f's `partial` sentence
  („the other half is generated from the .axaml”) — now shown.
- **Avoids:** styles, themes, `DataTemplate`; binding of any kind (5f); the
  dependency-property system; `x:Name` vs `Name` beyond one clause.

## Exercises

1. Recall — from memory: the three containers and the one situation each is
   for; what `partial` means; what `InitializeComponent()` does.
2. Action on the anchor — change `RowDefinitions` to `"Auto,Auto,*"` and
   run; write down what moved and why the list vanished (`Auto` on an empty
   list).
3. Build step — the grid version committed as `wlasna reka: uklad okna`;
   card line with minutes and which container the student would choose for
   the minutnik, in one sentence.
4. Research — open the minutnik's `.axaml` from 3a; list every `Name` and,
   for each, the line of C# that uses it; one sentence on any name nothing
   uses.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| StackPanel „arranges child controls in a single line” | https://docs.avaloniaui.net/docs/basics/user-interface/building-layouts/panels-overview | 14.07.2026 | have |
| Grid: absolute / proportional (`*`) / `Auto` sizing; RowDefinitions, ColumnDefinitions | https://docs.avaloniaui.net/docs/reference/controls/grid | 20.04.2026 | have |
| DockPanel: docking edges, last child fills; `LastChildFill` | https://docs.avaloniaui.net/docs/reference/controls/dockpanel | 20.04.2026 | have |
| ListBox „displays items from an items source collection… allows individual or multiple selection” | https://docs.avaloniaui.net/docs/reference/controls/listbox | 23.07.2026 | have |
| `Watermark` obsolete in 12.1.2, `PlaceholderText` instead | Avalonia source, tag 12.1.2, `src/Avalonia.Controls/TextBox.cs` (`[Obsolete("Use PlaceholderTextProperty instead.")]`) | checked 02.09.2026 | have |
| `InitializeComponent` and `Name` fields are generated (`Avalonia.Generators`); CS0103 without the generator | `tmp-modul5-build/build.log` 02.09.2026 (SDK 8: CS9057 + CS0103) | 02.09.2026 | have — the generated file's path from the SDK-10 run goes into the lesson |
| Markup produces a serialized graph of widget instances; construction moved out of code, mutation stayed | `research-03-desktop-app-history.md` §A2.4 | 29.08.2026 | have (concept; Microsoft's XAML overview linked) |

## Reader assumptions to verify

- The SDK-10 build shows a generated file under `obj/` whose path the lesson
  can name (deviation to fill).
- Students still have their Moduł 3 repositories (exercise 4).

## Decisions

- Grid first, DockPanel as the variation — rejected: DockPanel first (its
  „last child fills” is the neat trick, but Grid is what agents generate).
- `Lista.Items.Insert(0, …)` in this lesson, although 5f replaces it — the
  point of 5f is the replacement — rejected: introducing the collection here.
- The generator is shown through the failing build log, not only described —
  rejected: „trust me, it is generated”.

## Open questions for Viktar (≤ 3)

1. Whether to keep section 4's `EmitCompilerGeneratedFiles` step for all
   students (one line in the csproj, reverted after) or make it a teacher
   demo; the draft makes it an exercise for those who want to see the file.

## Deviations from the approved arc

1. Build evidence: `tmp-modul5-build/build.log` of 2026-09-02 19:48 (SDK 10.0.400, Avalonia 12.1.2, net10.0): stages 06 (Grid) and 07 (DockPanel) compiled; with `EmitCompilerGeneratedFiles=true` the build emitted `obj\Debug\net10.0\generated\Avalonia.Generators\Avalonia.Generators.NameGenerator.AvaloniaNameIncrementalGenerator\spis.MainWindow.g.cs`, quoted in section 4 with its attributes stripped (fields are `internal`; `InitializeComponent(bool loadXaml = true)`).
2. **`Watermark` → `PlaceholderText`**: the 12.1.2 source marks `WatermarkProperty` obsolete; the lesson uses the current name and Źródła cites the file.
3. **Section 2 runs the empty window before the code exists** by leaving out the `KeyDown` attribute for that one run — the arc's „run before the code” kept, at the cost of one sentence of instruction.
4. `Lista.Items.Insert(0, …)` compiled but was not exercised by a test at this stage (the headless tests run against the final state, where the list is bound); the API exists in the 12.1.2 source (`ItemCollection.Insert`).
5. `check:content` flagged „nigdy nie widziałeś” in the opening — rewritten as „której zwykle nikt nie ogląda” (no claim about the reader).
