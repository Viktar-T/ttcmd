# Brief — 5g · Zapis do pliku i błędy, których nie widać

| | |
| --- | --- |
| Lesson | `content/moduly/06-pod-maska/zapis-i-bledy.mdx` · `order: 7` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** |
| Mode | autonomous · **tryb pracy: bez AI** (the module's first Bez AI segment of real weight, in Visual Studio) |
| Research | `course-structure-v2.md` 5g row (old 5g: persistence, exceptions beyond `catch (Exception)`, the failures the happy path hides); the .NET reference for `File.WriteAllLines` / `File.ReadAllLines` (the documented exceptions, UTF-8 without BOM, encoding detection) and the C# exceptions guide (`finally`; „don't catch an exception unless you can handle it”); the notatnik spec's „Do ustalenia” (4c: the file open in another program). Research gate: **case 2** |
| Drafted | 2026-09-02 — `zapis-i-bledy.mdx`; deviations at the end |

## Reader position

Has 5f's `spis` with `Stan`. Typed one `try`/`catch (Exception ex)` in 3b
around an agent-written `File.WriteAllText` and read: „`catch (Exception ex)`
łapie każdy rodzaj błędu naraz… dlaczego bywa za szeroka i jak ją zawęzić,
jest tematem Modułu 5”. Wrote K6 („kiedy `notatki.md` nie istnieje…”) and a
„Do ustalenia” about the file being open elsewhere, and never answered it.
Survey: 1 of 12 can explain an exception. Has never seen a compile error
caused by the *order* of two `catch` blocks, a write that fails halfway, or
a file locked by another program.

## Carrying question

Co może pójść nie tak między twoją listą a plikiem na dysku — i skąd program
ma wiedzieć, *co* poszło nie tak, skoro `catch (Exception)` mówi tylko, że
coś?

## Anchor

`spis.txt`: `Stan.Zapisz` and `Stan.Wczytaj` with `File.WriteAllLines` /
`ReadAllLines`; the window loads on start and saves after every add; a
`Komunikat` line under the counter. The same two methods are then broken on
purpose four ways — missing file, read-only file, file open in another
program, write interrupted — and the code answers each by name.

## Shape

By-hand hands-on. Four hours.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | your list dies with the window; 3b's `catch (Exception)` said „coś się nie udało” and nothing more; today the list survives, and every failure gets its name | `spis` closing and losing everything |
| 1 | Zapis i odczyt w dwóch metodach | *tryb pracy*; `Zapisz` and `Wczytaj` in `Stan.cs` (`File.WriteAllLines(sciezka, Pozycje)`; `ReadAllLines` into the collection, then `PropertyChanged` for `Opis`); the window: `Wczytaj` in the constructor, `Zapisz` after `Dodaj`; run, add, close, run — the list is back; open `spis.txt` in an editor: one line per item, UTF-8 without BOM (docs), „Żółć” intact (K3 recalled) | stage 09 without `try` |
| 2 | Pierwsze uruchomienie: pliku nie ma | run with `spis.txt` deleted: the program dies before the window shows — `FileNotFoundException`, one of nine documented exceptions of `ReadAllLines` (linked); `catch (FileNotFoundException)` with an empty body and a comment saying why empty is right here (K6's answer); run again | stage 09, constructor |
| 3 | Plik tylko do odczytu, plik zajęty | the write side: the docs' list for `WriteAllLines`; two failures caused by hand — read-only attribute → `UnauthorizedAccessException`; the file open in another program with an exclusive lock → `IOException` (the 4c „Do ustalenia”, answered: the write fails, the list stays, the message says so); `Komunikat.Text` per case, `ex.Message` only for the one the program cannot name | stage 09, `DodajPozycje` |
| 4 | Kolejność, której pilnuje kompilator | `catch (IOException)` before `catch (FileNotFoundException)` → error CS0160 quoted from the build (FileNotFound *is* an IOException; the first clause would swallow it); the rule: specific first, general last, `Exception` last of all and rarely; the guide's sentence: „don't catch an exception unless you can handle it and leave the application in a known state” | stage 10 (the compiler's refusal) |
| 5 | Zapis, który pęka w połowie | the failure the happy path hides: `WriteAllLines` truncates then writes — power off, or a crash, between the two and `spis.txt` is empty; the fix that every serious program uses: write `spis.txt.tmp`, then `File.Move(tmp, path, overwrite: true)`; run the locked-file case again and look at what is left on disk (the `.tmp`) — a leftover you can now explain | stage 11 |
| 6 | Co jeszcze ukrywa szczęśliwa ścieżka | one paragraph each, no code: `finally` (what always runs); saving on every change vs on close (`Closing` event) and what each loses; the encoding trap the docs name (BOM); the folder that does not exist (`DirectoryNotFoundException`) — with the reading rule for agent code: find every `File.` call and ask which of these four it handles | the student's notatnik's `NoteFile.cs` re-read |
| 7 | (ending) Błędy z imienia | answers the opening; commit; card line; the notatnik's „Do ustalenia” closed in `spec.md` with today's answer (the spec changes before the code — 4e recall) | stage 11 as `spis`'s state; `specs/001-notatnik/spec.md` updated |

## Owns · recalls · avoids

- **Owns (appendix rows):** *wyjątek jako typ* (`FileNotFoundException`,
  `UnauthorizedAccessException`, `IOException`, `DirectoryNotFoundException`),
  *kolejność `catch` i CS0160*, *zapis przez plik tymczasowy*, *`finally`*,
  *zdarzenie `Closing`*, *UTF-8 bez BOM*.
- **Recalls:** 3b's block and its sentence (link); 4c's K3 and K6 and the
  „Do ustalenia” (link); 4e's „spec changes before the code”; 5f's `Stan`;
  2d's read-only trick (chmod / Właściwości) from 3b.
- **Avoids:** `Stream`s and `using` (named once as what `finally` becomes);
  async file IO (5d's fix applies; one clause); JSON (the notatnik's format is
  the student's own decision 0001); databases.

## Exercises

1. Recall — from memory: four things that can go wrong writing a file and
   the exception each raises; why `IOException` must come after
   `FileNotFoundException`.
2. Action on the anchor — lock `spis.txt` (open it in a program that holds
   it, or the test's `FileShare.None`), add an item, read the message; unlock
   and add again; look at the folder for a `.tmp` and write down why it is
   there.
3. Build step — stage 11 committed as `wlasna reka: zapis i bledy`; card
   line; the notatnik's spec: „Do ustalenia” answered in one sentence and
   committed.
4. Research — in `notatnik-v2`'s `NoteFile.cs`, list every `File.` call and,
   next to each, which of the four failures it would survive; one sentence
   on the one it would not.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| `File.WriteAllLines` exceptions: DirectoryNotFound, IOException, UnauthorizedAccess (read-only file), PathTooLong…; UTF-8 without BOM by default | https://learn.microsoft.com/en-us/dotnet/api/system.io.file.writealllines | checked 02.09.2026 | have |
| `File.ReadAllLines` exceptions incl. FileNotFound; detects encoding by BOM | https://learn.microsoft.com/en-us/dotnet/api/system.io.file.readalllines | checked 02.09.2026 | have |
| `finally` runs regardless; „don't catch an exception unless you can handle it and leave the application in a known state” | https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/ | 22.04.2023 | have |
| CS0160 for a general catch before a specific one | the C# compiler message reference page + the build log of stage 10 | to link at drafting; log 02.09.2026 | to confirm in the SDK-10 run |
| `File.Move(source, dest, overwrite)` | https://learn.microsoft.com/en-us/dotnet/api/system.io.file.move | checked 02.09.2026 | to link at drafting |
| `FileNotFoundException : IOException` (inheritance) | learn.microsoft.com API page | to link at drafting | to find |
| Window `Closing` event (Avalonia) | https://docs.avaloniaui.net/docs/reference/controls/window | to date at drafting | to find |

## Reader assumptions to verify

- The SDK-10 build of stage 10 shows CS0160 (the lesson quotes it); the
  headless tests show the locked-file message and the leftover `.tmp`.
- Windows: the read-only attribute path and the exclusive lock behave as
  documented (the test project checks both).

## Decisions

- Four named failures, each caused by the student, not described — rejected:
  a table of exception types (the survey: 1 of 12 can explain an exception;
  they need to *cause* one).
- The temp-file-then-move write is taught as the normal way, not as an
  advanced trick — rejected: leaving it to „Czytaj dalej” (the interrupted
  write is exactly the failure the happy path hides, the row's own words).
- Save on every change kept (as the notatnik does); on-close saving discussed,
  not built — rejected: building both (two more handlers for one idea).

## Open questions for Viktar (≤ 3)

1. Whether closing the notatnik's „Do ustalenia” in `spec.md` is a step of
   this lesson (it touches Moduł 4's repository) or an exercise only; the
   draft makes it exercise 3.

## Deviations from the approved arc

1. Build evidence: `tmp-modul5-build/build.log` of 2026-09-02 19:48 (SDK 10.0.400, Avalonia 12.1.2, net10.0): stage 09 compiled; **stage 10 failed with `error CS0160: Poprzednia klauzula catch przechwytuje już wszystkie wyjątki tego typu lub jego nadtypu („IOException”)`** — quoted in section 4; stage 11 compiled and smoke-ran 8 s. Headless tests on stage 11: missing file at start → „Pozycji: 0” (pass); a two-line file loads with „Żółć” intact (pass); read-only file → a non-empty message (pass); **locked file → the message started with „Plik jest tylko do odczytu”, not „Nie udało się zapisać” (fail)** — `File.Move` over a file held with `FileShare.None` throws `UnauthorizedAccessException` (its docs: „the Operating System has failed to acquire an exclusive access to the destination file”), and the leftover `spis.txt.tmp` (14 bytes) was on disk.
2. **That failure became section 5's second half**: the temp-file write changes which exception the locked-file case raises, so the `catch (UnauthorizedAccessException)` message is rewritten to „Brak dostępu do pliku — jest tylko do odczytu albo zajęty…”. Stage 11 and the test were changed accordingly, and four plain fact-tests were added (`WriteAllLines` to a locked file → `IOException`; `File.Move` onto a locked file → `UnauthorizedAccessException`; read-only → `UnauthorizedAccessException`; missing file → `FileNotFoundException`, an `IOException`). **Their run is pending** the next `build.cmd` click; the lesson's section-3 claim (direct write to a locked file → `IOException`) rests meanwhile on the `WriteAllLines` docs („An I/O error occurred while opening the file”).
3. **Locking the file is done with one PowerShell line** (`[System.IO.File]::Open(…, "None")`), an ordinary .NET call, instead of „open it in a program that locks it” — no everyday program was verified to hold an exclusive lock on a `.txt`.
4. The no-`try` intermediate (call `Wczytaj` in the constructor, crash on a missing file) is a strict subset of stage 09 and was not built separately.
5. `check:content`: 9 one-sentence paragraphs by its count (code lead-ins, „Zbuduj. Kompilator odmawia:”) — kept; „Właściwości”, „PowerShellu” once — UI/tool names.
