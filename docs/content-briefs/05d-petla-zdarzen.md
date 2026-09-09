# Brief — 5d · Pętla zdarzeń: program, który jest wywoływany

| | |
| --- | --- |
| Lesson | `content/moduly/05-pod-maska/petla-zdarzen.mdx` · `order: 4` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** |
| Mode | autonomous · **tryb pracy: bez AI** (Visual Studio, Copilot signed out) |
| Research | `research-03-desktop-app-history.md` §A2.3 (the constant, three vendors; the five seconds; the responses in order — pump, thread + marshal, `async`/`await` in C# 5 / VS 2012 aimed at UI responsiveness), §A6 (`object sender, EventArgs e` as the Win32 loop; `Dispatcher.Invoke` as the 1984 rule enforced), „The cross-cutting questions” §3; „What this means” → 4a (open with the frozen window) and 5c (fossil-naming). Research gate: **case 1 + 2**; framework facts dated at drafting (Avalonia threading page; Win32 message-queue page; the hang-prevention page; Toub's FAQ) |
| Drafted | 2026-09-02 — `petla-zdarzen.mdx`; deviations at the end |

## Reader position

Has read 5a–5c: knows the operational definition, has watched a call stack
with Avalonia's frames under their own handler, has Visual Studio open and
Copilot off. Typed exactly one handler in their life (3c: `OnCountClick`,
`sender`/`e` „z lat osiemdziesiątych — skąd dokładnie, jest jednym z tematów
Modułu 5”). Has seen a window say „Nie odpowiada” (everyone has) and has
never caused it on purpose. Survey: 1 of 12 can explain a thread; 3d gave
them the sentence „Call from invalid thread” as a thing that happens to
agent-written code.

## Carrying question

Kto właściwie wywołuje twoją metodę po kliknięciu — i dlaczego okno
zamarza dokładnie wtedy, kiedy w tej metodzie jest coś do zrobienia?

## Anchor

A new project `spis` (`dotnet new avalonia.app -o spis`, from the same
template as 2d's `okno`), with one button and one counter typed by hand:
`Dodaj` / „Kliknięć: 0”. The handler is rewritten four times in the lesson —
freeze, wrong thread, dispatcher, `async` — and every abstraction is read off
the same seven lines.

## Shape

By-hand hands-on (content-style, „A by-hand block or lesson”): every section
ends with something the student runs; the code is short, complete, and was
built as stages 01–05 of `tmp-modul5-build`. Four hours; the module's first
reserve hour is named for this lesson.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | 3c: you typed a handler and it worked; 5c: you saw a column of frames under it; today you build the smallest window that can freeze, freeze it on purpose, and read the number that decides when the system gives up on you | the empty `spis` project |
| 1 | Przycisk i licznik, od pustego okna | *tryb pracy* sentence; `dotnet new avalonia.app -o spis`; commit the template; replace the window's body with a `StackPanel`, a `Button` with `Click="OnDodajClick"` and a `TextBlock Name="Licznik"`; the handler with `_klikniecia++`. Run, click, count. What to notice: nothing runs until you click — the constructor once, the handler per click | stage 01 |
| 2 | Program, który jest wywoływany | the mechanism: the window does not run top to bottom like a console program; the system keeps a queue of messages per thread (Win32 page, quoted: „they wait for the system to pass input to them”), the library takes them off one by one and calls the method whose name is in `Click`; `object? sender, RoutedEventArgs e` is that message with a suit on (A6). Breakpoint in the handler → the same column as 5c, now named: the loop | stage 01 under the debugger |
| 3 | Zamrożone okno i pięć sekund | `Thread.Sleep(6000)` as the first line of the handler („udajemy długą pracę”); run, click, try to move the window — nothing; after five seconds Windows writes „Nie odpowiada” and replaces the window with a ghost; the number is in Microsoft's documentation, quoted and linked; why: the one thread that pumps the queue is busy in your method, so no message is read | stage 02 |
| 4 | Zły sposób: drugi wątek dotyka okna | the obvious fix — do the work on another thread (`Task.Run`) and set the text from there; run: the window does not freeze and the program dies with „Call from invalid thread” (3d's source, now caused by hand); the rule stated by three vendors in their own words (5a recall): one thread owns the window | stage 03 |
| 5 | Sposób z 1984: oddaj wynik wątkowi okna | `Dispatcher.UIThread.Post(() => …)` around the two lines that touch the window; run: no freeze, no crash; this is the rule enforced, the same shape under every name (`Dispatcher.Invoke`, `runOnUiThread`, `@MainActor`) | stage 04 |
| 6 | Sposób z 2012: `async` i `await` | `private async void OnDodajClick`, `await Task.Delay(6000)`, the two lines after it unchanged; run: same result, no `Task.Run`, no dispatcher; what the compiler does for you (the code after `await` comes back to the window's thread — Toub's FAQ, 2012, linked); why the agent writes this form and what to look for in its code (`async void` on handlers, `await` before every long thing, nothing touching the window from `Task.Run`) | stage 05 |
| 7 | (ending) Cztery wersje jednej metody | answers the opening: who calls (the loop), why it freezes (one thread), the two fixes and their dates; the card line — minutes, and which of the four versions the student's own notatnik uses (open it and look); commit | stages 01–05 in the student's history, one commit each |

## Owns · recalls · avoids

- **Owns (appendix rows):** *pętla zdarzeń* (moved from 1a), *kolejka
  komunikatów*, *jeden wątek UI / wątek okna*, *zamrożone okno i pięć
  sekund*, *`Dispatcher.UIThread`*, *`async`/`await` jako odpowiedź na
  zamrożone okno* (2f showed the keyword; this is its home), *`Thread.Sleep`
  jako „udawana długa praca”*.
- **Recalls:** 3c's handler and `sender`/`e` (link, one clause); 3d's
  „Call from invalid thread” (link); 5a's three vendors (link); 5c's call
  stack and breakpoint (link); 2d's template command (link, no
  re-explanation).
- **Avoids:** `ConfigureAwait`, `SynchronizationContext` by name, cancellation,
  `Task` return types; the Mac/Android APIs beyond one clause; structured
  concurrency (research, not lesson).

## Exercises

1. Recall — from memory: the two parameters of every handler and what each
   is; the number of seconds; the two ways to touch the window from another
   thread and which one the agent writes.
2. Action on the anchor — change 6000 to 4000 in stage 02 and click twice
   quickly; write down whether „Nie odpowiada” appeared and why the second
   click still counted (the queue).
3. Build step — keep stage 05 as `spis`'s state; commit `wlasna reka:
   przycisk, licznik, async`; the card line with minutes.
4. Research — open the student's own `notatnik-v2` and find the save
   handler: which of the four versions is it? Copy the line that decides and
   write one sentence on what would happen with a 6-second file write.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| Windows apps are event-driven; per-thread message queue; the loop of GetMessage/DispatchMessage | https://learn.microsoft.com/en-us/windows/win32/winmsg/about-messages-and-message-queues | 14.07.2025 | have |
| Five seconds; ghost window with „Not Responding”; `DisableProcessWindowsGhosting` | https://learn.microsoft.com/en-us/previous-versions/windows/win32/win7appqual/preventing-hangs-in-windows-applications | 31.05.2018 | have |
| Avalonia: all UI access on the UI thread; `InvalidOperationException` „Call from invalid thread”; `Dispatcher.UIThread.Post` / `InvokeAsync` | https://docs.avaloniaui.net/docs/app-development/threading | 03.06.2026 | have |
| `async`/`await` in C# 5 / VS 2012, aimed at „maintain[ing] the responsiveness of your UI thread” | https://devblogs.microsoft.com/dotnet/asyncawait-faq/ | 12.04.2012 | have (research-03-history) |
| Three vendors, one rule (WPF / Android / Apple) | as in 5a | — | recall, link to 5a |
| `Task.Delay`, `Task.Run` (BCL) | learn.microsoft.com API pages | to link at drafting | to find |

## Reader assumptions to verify

- Windows lab: the ghost window and „Nie odpowiada” are Windows behaviour;
  on GNOME the shell shows its own „aplikacja nie odpowiada” dialog after its
  own timeout — the lesson says which one it describes.
- Nobody has typed `async` before (2f: recognise only).

## Decisions

- Four handler versions, each a stage with its own commit — rejected: two
  (Sleep → async), which teaches a keyword without the rule.
- The „wrong thread” version is run on purpose to crash — rejected: telling
  the student it would crash (the survey says they distrust what they are
  told; the thrown exception is the evidence).
- `Thread.Sleep` as the stand-in for long work, said plainly — rejected: a
  real slow operation (a big file read), which would blur 5g's topic.
- `Console.WriteLine` is not used to show the call order: a `WinExe`
  launched from `dotnet run` on Windows has no console attached, so the
  evidence is the breakpoint and the counter — rejected: switching
  `OutputType` for a demo.

## Open questions for Viktar (≤ 3)

1. Whether the crash of stage 03 is shown in class from the projector (the
   exception dialog is the point) or left to the student's own run; the draft
   has the student cause it.

## Deviations from the approved arc

1. Build evidence: `tmp-modul5-build/build.log` of 2026-09-02 19:48 (SDK 10.0.400, Avalonia 12.1.2, net10.0): stages 01–05 all „Kompilacja powiodła się”, 0 warnings; stage 05 (`async`) smoke-ran for 8 s (`alive after 8 s: True`). The crash of stage 03 („Call from invalid thread”) is documented (Avalonia threading page, 03.06.2026), not reproduced by an automated run — it needs a click.
2. **Every code block is complete** (the whole `MainWindow.axaml.cs` each time), not a diff — five short files read better for a first-time typist than four patches.
3. **The Win32 quotation is paraphrased in Polish with the English on the page** rather than a `<Cytat>`; the five-second rule is the lesson's one `<Cytat>`.
4. `check:content`: 8 one-sentence paragraphs by its count — code lead-ins („Zostaw w projekcie wersję piątą i zapisz ją:”), the quote body, „F5, kliknij…” lines — kept as the rhythm of a hands-on lesson.
5. „lekcja o czytaniu C#” is named, not linked (2f does not exist yet).
