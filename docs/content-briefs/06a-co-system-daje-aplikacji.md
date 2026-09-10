# Brief — 5a · Co system naprawdę daje aplikacji

| | |
| --- | --- |
| Lesson | `content/moduly/06-pod-maska/co-system-daje-aplikacji.mdx` · `order: 1` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** (see `05-index.md`) |
| Mode | autonomous |
| Research | `research-03-building-desktop-apps.md` §2 (the four families), §10.1; `research-03-desktop-app-history.md` §A2.3 (one UI thread, three vendors), „The cross-cutting questions” §3 (the constants), „What this means” → Moduł 4a (operational definition; the three-way trade with one honest number each side); `research-02` §2.3 (iOS, one sentence). Research gate: **case 1**, plus four dated links re-checked at drafting time (Avalonia's cross-platform architecture page; Hopp's Tauri-vs-Electron measurement; 1Password's account; VS Code's FAQ naming Electron) |
| Drafted | 2026-09-02 — `co-system-daje-aplikacji.mdx`; deviations at the end |

## Reader position

Has read 0a–4f; built four Avalonia apps with an agent and typed three
by-hand blocks (index brief). Knows from 2d that the stack is „C# + Avalonia
na czas nauki” and that Avalonia „działa tak samo na Windowsie, na Linuksie i
na macOS”. Knows the term *framework* only from the reader file's „must be
introduced” list (its 1a home is outside the pipeline) — this lesson says the
thing in plain words and lets *rodzina* carry the argument. Has never asked
who draws the pixels of their window; has never seen a desktop application
defined by anything but „program, który się instaluje”.

## Carrying question

Kiedy twój notatnik stoi na ekranie, co z tego, co widać, zrobił system, co
Avalonia, a co ty — i dlaczego to rozstrzyga, jak w ogóle wybiera się
technologię do okien?

## Anchor

The student's own `notatnik-v2` window, running, taken apart with the eyes:
the frame and title bar (drawn by Windows or GNOME), the inside (every pixel
drawn by Avalonia through Skia), the moment it stops responding (a rule of
the system, not of the app). The same window is then placed on the map of
four families, and the five constants are named by pointing at it.

## Shape

Narrative, with two short observations the student makes on their own
running app (no code written). Two hours.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | four apps, all looking the same on the lab's Windows and on a Linux laptop at home — you accepted that as a feature in 2d; today it is the question: who is drawing this? | notatnik-v2 running, window frame vs inside |
| 1 | Ramka od systemu, środek od biblioteki | observation 1: drag the window, compare its title bar with Explorer's — the system draws the frame and handles moving, closing, „Nie odpowiada”; inside, Avalonia draws every pixel itself through Skia (docs, dated) — that is *why* it looks the same everywhere and *why* its buttons do not look like Windows buttons | the notatnik beside Explorer |
| 2 | Cztery rodziny | the map from research-03 §2: A web shell (the class editors and VS Code are browsers in a box — Electron; VS Code's own FAQ), B one renderer everywhere (Avalonia, Flutter), C native controls (the Windows calculator, open source, C++ and XAML), D own renderer (games). Each family with what you get and what you pay; the student places every program on their taskbar into a family | the notatnik as family B; the editor they build it in as family A |
| 3 | Jedna uczciwa liczba z każdej strony | the trade in one measurement and one account: Hopp's 8,6 MB vs 244 MB bundle, 172 vs 409 MB memory (N = 1, published by a Tauri user — said aloud); 1Password choosing a web shell over a Rust core to end „four separate technology stacks”. Conclusion stated plainly: the cost is technical, the benefit is organisational; „which framework” is the least interesting question and the only one the internet argues about | which family the notatnik would be in if its author had a team of forty |
| 4 | Co to właściwie jest aplikacja desktopowa | the operational definition: a program that owns a window, an event loop and one UI thread — checkable, unlike „program na komputer”; observation 2: the three vendors' one rule (WPF, Android, Apple — quoted, linked); iOS named once as needing a Mac (research-02 §2.3) | the notatnik passes the definition; a website in a tab does not |
| 5 | Pięć rzeczy, które się nie zmieniły od 1984 | the module's map: the loop that calls you, one UI thread, the frozen window and its five seconds, state outside the controls, install as the user's burden; one sentence each, each with the lesson that will build it; the framing rule said once: nie „jak się kiedyś robiło”, tylko „co musisz umieć, żeby powiedzieć *za skomplikowane* i mieć rację” | the notatnik will be rebuilt against the first four; the fifth waits for the release module |
| 6 | (ending) Okno, które da się rozłożyć | answers the opening: system / library / you, and what that decides about choosing a stack — next lesson decides it with you | the notatnik, named layer by layer |

## Owns · recalls · avoids

- **Owns:** *cztery rodziny narzędzi okienkowych* (A–D); *aplikacja
  desktopowa* as an operational definition; *pięć stałych od 1984* (named,
  not built); *silnik przeglądarki w pudełku* (Electron as the example);
  *Skia* as „biblioteka rysująca piksele” — proposed appendix rows in the
  index brief.
- **Recalls:** 2d „stack na czas nauki” and the Avalonia-runs-everywhere
  claim (link); the class editors (2b) as family A; 3d's threading source
  in one clause (the „Call from invalid thread” exception) — pointing
  forward to 5d.
- **Avoids:** *framework* as a term (plain words; the reader file lists it as
  unhomed); MAUI / Uno / WPF names (5b's table); the event loop mechanism
  (5d); binding and MVVM (5f); any INF.04 claim.

## Exercises

1. Recall — from memory: the four families with one program each, and the
   three things a desktop application owns.
2. Action on the anchor — run the notatnik and Explorer side by side; write
   down three things the system does for both and two things Avalonia does
   only inside the notatnik.
3. Build step — a file `docs/rodziny.md` in `notatnik-v2`: every program on
   the student's taskbar placed in a family, with one line of evidence each
   (the vendor's page or the app's About box), dated; commit.
4. Research — find the current memory use of the class editor and of the
   notatnik in Task Manager; write both numbers with the date, and one
   sentence on what the comparison does *not* prove (N = 1, different
   programs).

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| Avalonia renders its controls with Skia rather than wrapping native controls | https://docs.avaloniaui.net/docs/fundamentals/cross-platform-architecture | 25.08.2026 | have |
| VS Code runs in an Electron shell | https://code.visualstudio.com/docs/supporting/faq („The Electron shell used by Visual Studio Code…”) | 04.02.2026 | have |
| Windows Calculator is C++/C# with XAML, open source, ships with Windows | https://github.com/microsoft/calculator | checked 02.09.2026 | have |
| Hopp: 8,6 MB vs 244 MB bundle; ~172 vs ~409 MB memory; N = 1 | https://www.gethopp.app/blog/tauri-vs-electron | 09.04.2025 | have |
| 1Password 8: web front end + Rust core to end four separate stacks | https://1password.com/blog/1password-8-the-story-so-far | 12.08.2021 | have |
| One UI thread — WPF, Android, Apple, each in its own words | learn.microsoft.com (WPF threading model); developer.android.com (Processes and threads); developer.apple.com (Thread Safety Summary) | research-03-history, 29.08.2026 | have |
| Five-second hang rule and the ghost window | https://learn.microsoft.com/en-us/previous-versions/windows/win32/win7appqual/preventing-hangs-in-windows-applications | page 31.05.2018, checked 02.09.2026 | have — named here, used in 5d |
| iOS builds need macOS and an Apple account | `research-02` §2.3 (Apple developer docs) | 29.08.2026 | have, one sentence |

## Reader assumptions to verify

- The lab runs Windows (the „Nie odpowiada” and Explorer observations assume
  it; on Ubuntu the words change, the argument does not).
- Students may open Task Manager on lab machines (exercise 4).

## Decisions

- The lesson opens from the 2d claim the student accepted, not from a
  definition — rejected: the research file's own suggestion to open with the
  frozen window (kept for 5d, where the student *causes* it).
- Families before products; products only as the example a student has on
  their machine — rejected: research-02's three-candidate table here (5b).
- Two numbers, one account, and the caveat said aloud — rejected: the size
  table from research-03 §4 (a lesson of its own, „Ile waży aplikacja”, not
  in v2.5).

## Open questions for Viktar (≤ 3)

1. Whether to keep the Windows-only observations (Explorer, „Nie
   odpowiada”) in the text or move them into a bracketed teacher's note until
   open decision #1 lands.

## Deviations from the approved arc

1. **The iOS sentence was dropped, not guessed** — no Apple page was checked at drafting time; mobile has its own module.
2. **Windows Calculator stands in for family C** with its GitHub repository as the source; „Ustawienia” is mentioned as a look-alike only. The DirectX/WinUI detail from the research was left out.
3. **`framework` is not used as a term** — „biblioteka do okien”, „rodzina” carry the argument; the reader file lists *framework* as unhomed and 1a is outside the pipeline.
4. `check:content`: 3 one-sentence paragraphs (the section opener „Wybór rodziny jest wymianą…” kept as the section's thesis; the recall exercise; a quote line); names-once list is UI/product names used inside the anchor (Skia, Hopp, Electron, Windows/Linux) — kept.
5. „Czytaj dalej” carries the Avalonia architecture page instead of a research file, because `docs/` is not classroom material (Article II).
