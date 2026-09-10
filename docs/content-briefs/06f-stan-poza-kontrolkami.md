# Brief — 5f · Stan poza kontrolkami

| | |
| --- | --- |
| Lesson | `content/moduly/06-pod-maska/stan-poza-kontrolkami.mdx` · `order: 6` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** |
| Mode | autonomous · **tryb pracy: bez AI** |
| Research | `research-03-desktop-app-history.md` §B2 (MVC 1979 → MVP 1996 → Presentation Model 2004 → MVVM 2005 → MVU; „each pattern moved the mutable state one step further from the widget”; Gossman: MVVM „relies on… a general mechanism for data binding”), §A2.4 (markup = object graph + binding engine; „the mutation stayed”), „The cross-cutting questions” §3 („State does not belong in the widget tree”), „What this means” → 5d (the load-bearing lesson; Moduł 7/8 as payoff); Avalonia data-binding docs (compiled bindings and `x:DataType` in v12; `INotifyPropertyChanged`), .NET `ObservableCollection<T>` reference. Research gate: **case 1 + 2** |
| Drafted | 2026-09-02 — `stan-poza-kontrolkami.mdx`; deviations at the end |

## Reader position

Has 5e's `spis`: a grid, `Lista.Items.Insert(0, …)`, `Licznik.Text = …` set
by hand after every change. Remembers 3a's block: „zwykła lista nie mówi
oknu, że się zmieniła, więc okno dostaje ją całą od nowa po każdym cyklu…
sposób, w którym okno samo zauważa zmianę, jest jednym z tematów Modułu 5”.
Has seen `{Binding …}` in agent-generated markup (3b, 4e) and a `ViewModel`
folder in the MVVM template if they ever chose it; has never written a class
whose only job is to hold the window's data; has never seen the same value
in two places update from one change. Survey: nobody has an app whose data
outlived a control. Can set a breakpoint and watch a variable (5c).

## Carrying question

Gdzie właściwie *jest* twoja lista — w kontrolce, która ją pokazuje, czy
gdzie indziej — i dlaczego od 1979 roku każdy, kto budował okna, dochodził
do tej samej odpowiedzi?

## Anchor

`spis` again: a new file `Stan.cs` (an `ObservableCollection<string>
Pozycje` and a notifying `Opis`), the window bound to it (`x:DataType`,
`ItemsSource="{Binding Pozycje}"`, `Text="{Binding Opis}"`, and — the proof
— `Title="{Binding Opis}"` on the window itself), the code-behind shrunk to
`_stan.Dodaj(nazwa)`. The debugger watches `Pozycje.Count` while the list
and the title bar change on their own.

## Shape

By-hand hands-on with one narrative section (the lineage). Four hours; the
second reserve hour is named for this lesson.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | 3a: you handed the window a fresh copy of the list after every change; 5e: you still set `Licznik.Text` by hand after every insert — the truth about what the user sees is scattered over three controls and two lines of code; today it moves into one object and the window follows it | the 5e code-behind, the three lines that keep things in sync by hand |
| 1 | Klasa, która nie wie, że jest okno | *tryb pracy*; `Stan.cs` typed: `ObservableCollection<string> Pozycje`, `string Opis => $"Pozycji: {Pozycje.Count}"`, `Dodaj(nazwa)` inserting at 0; no `using Avalonia` anywhere in it — the point; what an `ObservableCollection` is in the docs' words (notifications when items are added or removed) | stage 08, `Stan.cs` |
| 2 | Okno, które zauważa | the binding: `xmlns:local="using:spis"`, `x:DataType="local:Stan"` on the window (compiled bindings are the default in 12 and need the type — docs, dated), `ItemsSource="{Binding Pozycje}"`, `Text="{Binding Opis}"`; `DataContext = _stan` in the constructor; run: adding works and the code-behind no longer touches the list. Why the list updates: the collection tells anyone listening; the engine listens | stage 08, markup + constructor |
| 3 | Dwie kontrolki, jedna prawda | `Opis` bound twice — the `TextBlock` and the window's `Title` — and the missing half: `INotifyPropertyChanged`, the one event, raised in `Dodaj` for `Opis` (docs quoted: „notify any bound elements that the property has changed”); run: title bar and counter change together from one line; remove the `PropertyChanged` line and run again: the list updates, the counter does not — the most instructive bug of the module | stage 08, `Opis` in two places |
| 4 | Debugger patrzy na stan, nie na okno | breakpoint in `Dodaj`; Watch on `Pozycje.Count` and on `Opis`; F10 past `Insert`, see the window update while the program is paused… or not — the window redraws only when the loop runs again (5d recall); the state is already right, the pixels are late | stage 08 under the debugger |
| 5 | Czterdzieści siedem lat tej samej reguły | the lineage as one rule re-derived: MVC 1979 (Smalltalk), MVP 1996, Presentation Model 2004, MVVM 2005 — Gossman's sentence: the pattern „relies on… a general mechanism for data binding” — and MVU/declarative UI in one clause as the current answer (no mutable state on your side at all); what the student typed today *is* MVVM without the name: a model of the view, a binding engine, a window that only displays; what agents generate (`ObservableObject`, `[ObservableProperty]`, a `ViewModels` folder) as the same thing packaged — recognise it, do not need it | `Stan` named as a view model after the fact |
| 6 | Dlaczego to jest lekcja o telefonie | the payoff stated once: if the state is not in the window, the mobile module is „change the shell” — the same `Stan` under a different `.axaml`; the shared app (Moduł 6) will be read with this question first: where is the state? | `Stan.cs` with no `using Avalonia` |
| 7 | (ending) Lista, która jest gdzie indziej | answers the opening; the reading rule for every agent diff from now on: find the state, then find who else mutates it; commit; card line | stage 08 as `spis`'s state |

## Owns · recalls · avoids

- **Owns (appendix rows):** *stan* (as the term), *model / model widoku*,
  *wiązanie danych* (moved from 1a), *`INotifyPropertyChanged` /
  `PropertyChanged`*, *`ObservableCollection`*, *`DataContext` i `x:DataType`*,
  *MVVM* (as one rule with a date, moved from 1a), *„okno tylko pokazuje”*;
  story row: „MVC 1979 → MVVM 2005, 47 years of the same rule → 5f”.
- **Recalls:** 3a's „świeża kopia” (link, the sentence quoted); 5e's three
  sync lines; 5c's Watch window; 5d's loop (why the pixels are late); 5b's
  „XAML = saved tree + binding engine” sentence (link); 2f's property syntax
  (one clause).
- **Avoids:** commands / `ICommand`; `RelayCommand`; converters; two-way
  binding beyond one clause; `DataTemplate`; the dependency-property system;
  MVU beyond one clause.

## Exercises

1. Recall — from memory: the two things a bound window needs from its state
   object (a collection that notifies; a property that notifies); the year
   and the sentence of the MVVM post.
2. Action on the anchor — remove the `PropertyChanged?.Invoke` line, run,
   add three items; write down which controls updated and which did not,
   then put the line back.
3. Build step — `Stan.cs` and the bound window committed as `wlasna reka:
   stan poza kontrolkami`; card line with minutes.
4. Research — open `notatnik-v2` and find where its list of notes lives:
   a field in the window, a class of its own, a `ViewModel`? Copy the
   declaration and write one sentence: would the mobile module need to
   change it?

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| Compiled bindings are the default in Avalonia 12; `x:DataType` required | https://docs.avaloniaui.net/docs/data-binding/compiled-bindings | 25.08.2026 | have |
| `INotifyPropertyChanged`: one event, `PropertyChanged`, „notify any bound elements that the property has changed” | https://docs.avaloniaui.net/docs/guides/data-binding/inotifypropertychanged | checked 02.09.2026 (page shows no date) | have |
| `ObservableCollection<T>`: „provides notifications when items get added or removed, or when the whole list is refreshed” | https://learn.microsoft.com/en-us/dotnet/api/system.collections.objectmodel.observablecollection-1 | checked 02.09.2026 | have |
| Binding modes (OneWay default for most targets) | https://docs.avaloniaui.net/docs/basics/data/data-binding/data-binding-syntax | 07.03.2026 | have |
| Gossman, 08.10.2005, „relies on one more thing: a general mechanism for data binding”; „Model of a View” | learn.microsoft.com archive (5b's link) | 08.10.2005 | have |
| MVC 1979 / MVP 1996 (Potel) / Presentation Model 2004 (Fowler) / MVVM 2005 | `research-03-desktop-app-history.md` §B2, each with its link | 29.08.2026 | have |
| CommunityToolkit.Mvvm as Microsoft's packaged form of the pattern | https://learn.microsoft.com/en-us/dotnet/communitytoolkit/mvvm/ | to date at drafting | to find |

## Reader assumptions to verify

- The headless tests of `tmp-modul5-build` confirm that `Title="{Binding
  Opis}"` and the `TextBlock` both update from one `PropertyChanged`
  (deviation to fill from `build.log`).
- Students' `notatnik-v2` has a list of notes somewhere findable (exercise 4).

## Decisions

- `INotifyPropertyChanged` implemented by hand in six lines, no toolkit —
  rejected: CommunityToolkit.Mvvm (hides the event the lesson exists to show).
- `Opis` as a computed string property (`Pozycji: N`) — rejected: an `int
  Liczba` with `StringFormat` in the binding (one more syntax for no gain).
- The window's `Title` bound as the second display of the same value —
  rejected: a second `TextBlock` (too easy to read as decoration).
- MVU named in one clause only — rejected: a section on declarative UI (the
  research says it is a different place; the reader has no React to hang it on).

## Open questions for Viktar (≤ 3)

1. Whether the lineage section (5) stays in the middle of a by-hand lesson
   or moves to the end as the „why” — the draft keeps it after the hands have
   done the thing, before the mobile payoff.

## Deviations from the approved arc

1. Build evidence: `tmp-modul5-build/build.log` of 2026-09-02 19:48 (SDK 10.0.400, Avalonia 12.1.2, net10.0): stage 08 compiled; the headless tests on the final state (which keeps this lesson's `Stan`, `x:DataType`, `ItemsSource="{Binding Pozycje}"`, `Text="{Binding Opis}"` and `Title="{Binding Opis}"`) passed: `Dodaj_wstawia_pozycje_aktualizuje_opis_i_zapisuje_plik` (ListBox ItemCount 1, Title „Pozycji: 1”, box cleared), `Nowsza_pozycja_jest_na_gorze`, `Enter_w_polu_dodaje_pozycje` (via `KeyPressQwerty(PhysicalKey.Enter)`), `Pusty_tekst_nie_dodaje_pozycji`.
2. **The „remove the `PropertyChanged` line” experiment is described, not tested** — its outcome follows from the two documented mechanisms (collection notifies; property does not without the event).
3. The lineage stays in the middle (section 5), after the hands have done the thing — the brief's open question 1 stands.
4. `check:content`: names-once 17 — the four pattern names and their authors appear once each by design (a dated lineage, not a catalogue); 5 one-sentence paragraphs by its count (the „gdzie jest stan?” spotlight is deliberate, one per lesson).
5. Internal references to 5b and 5d are plain text (unpublished-link rule).
