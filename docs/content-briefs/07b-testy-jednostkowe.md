# Brief — 7b · Pierwszy test: jedno kryterium, jedno zdanie

| | |
| --- | --- |
| Lesson | `content/moduly/07-testy-i-jakosc/testy-jednostkowe.mdx` · `order: 2` · 5 h |
| Written | 2026-09-10, by write-lesson · approved: (blank) |
| Mode | semi-supervised |
| Research | `research-07-testy-jakosc-przeglad.md` §3.1–§3.5, §6 (build log), §1.4 |
| Drafted | 2026-09-10 |

## Reader position

As 7a, plus: has just watched their own application lose data on the round trip
and has written the finding and the offended criterion into `dziennik.md`. Knows
that a test is „a mechanical check that runs without you” and nothing more —
**no attribute, no command, no framework name has been used yet**. Moved state
out of the controls with their own hands in 6f and can say where it lives.

## Carrying question

> Jak zamienić jedno zdanie ze swojej specyfikacji w coś, co samo mówi
> „zielone” albo „czerwone” — i dlaczego to się udaje tylko dlatego, że w
> module szóstym wyprowadziłeś stan z okna?

## Anchor

**One acceptance criterion from the student's own `specs/001-*/spec.md`, turned
into one test that is red before it is green.** The reference shape — the only
code the lesson prints in full — is the round trip of 7a, on the teacher's
build:

```csharp
[Test]
public void Zapisane_pozycje_wracaja_w_calosci()
{
    var plik = Path.Combine(Path.GetTempPath(), "test-magazyn.txt");
    var wejscie = new List<string> { "mleko; chleb", "ser" };

    Magazyn.Zapisz(plik, wejscie);
    var wyjscie = Magazyn.Wczytaj(plik);

    Assert.That(wyjscie, Is.EqualTo(wejscie));
}
```

The student writes the **same shape** against their own criterion, in their own
repository. The lesson names what to search for, never a line number.

## Shape

**Hands-on**, in the by-hand tradition of Moduł 6 but with the agent switched on
in one named section. Every section ends with something the student runs.

**Tryb pracy**, stated in one plain sentence in the lesson: sections 1–5 are
*bez AI* — the first test is typed by the student. Section 6 is *z agentem*, on
purpose, and the comparison is the point.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | „Znalazłeś błąd, którego nie widziałeś przez trzy tygodnie” → what would have caught it → today you build that thing | The criterion from 7a's second exercise |
| 1 | Projekt, który nie ma okna | The mechanism: a second project beside the application, referencing it, with no window at all. `dotnet new nunit`, `dotnet reference add`, `dotnet test` — and the empty run that already passes | The commands, run once, on the student's own solution folder |
| 2 | Co właściwie da się przetestować — i dlaczego akurat to | 6f collecting its payment. A test can call a class; it cannot click a button. „Okno tylko pokazuje” stops being a rule about tidiness and becomes the reason this is possible at all. Avalonia's own documentation says it | The student finds the class their criterion lives in |
| 3 | Najpierw czerwone | Write the test against the **broken** code. Run it. Read the failure. Red first, because a test that has never failed proves nothing | The round trip fails; the exact failure is read, not skimmed |
| 4 | Potem zielone | Repair the code, not the test. Run again. The rule: when a test and the code disagree, the specification decides which one is wrong | 2 in / 2 out |
| 5 | Pięć zielonych to nie „działa” | The honest limit, from the build log: the repaired version drops empty lines, so an item that *is* empty is lost. Five green cases make five statements true. `[TestCase]` as the cheap way to add the awkward ones | The same test, four inputs |
| 6 | Teraz agent — i pułapka z 2023 roku | *Tryb: z agentem.* Ask for a second test. Compare. The model very likely writes `Assert.AreEqual`, correct for six years and **not compiling on NUnit 4** since the classic asserts moved to `NUnit.Framework.Legacy`. The compiler catches it, not the student's judgment — the module's first *Rozbierz to* | The agent's test beside the student's |
| 7 | Zdanie, które samo się sprawdza *(ending)* | Answers the opening: a criterion is now a sentence, a test and a colour | |

## Owns · recalls · avoids

- **Owns:** *test jednostkowy*, *asercja*, *czerwony / zielony*, `dotnet new nunit`,
  `dotnet reference add`, `dotnet test`, `[Test]`, `[TestCase]`, `Assert.That` +
  `Is.EqualTo`, *projekt testowy*, *regresja* (7a's plain word gets its term here).
- **Recalls:** „gdzie jest stan” and „okno tylko pokazuje” (6f, by link) ·
  the criterion shape „Kiedy …, to …” (4c) · „specyfikację zmienia się przed
  kodem” (4e) · `Rozbierz to` (3d) · file exceptions (6g).
- **Avoids:** coverage, mocking, dependency injection, `[SetUp]`/`[TearDown]`
  beyond deleting the temp file, `Assert.Multiple`, xUnit and MSTest except as
  one sentence naming them, headless Avalonia (*Czytaj dalej*), CI (7d).

## Exercises

**One hand-in assignment.** Finished state: the student's repository contains a
test project beside the application, at least three tests against named criteria
from their own specification, all green, and a commit history in which at least
one of them was red first.

Four conditions, all visible in the repository:

- the test project exists, references the application project, and
  `dotnet test` runs it — the `.csproj` is in the repository, `bin/` and `obj/`
  are not (`.gitignore`);
- **the history shows red before green**: one commit adding a failing test, a
  later commit repairing the code. Two commits, in that order, with the criterion
  number in the message;
- `dziennik.md` carries 7a's finding, the criterion each test checks, and one
  sentence naming what the tests **do not** prove;
- one thing found outside the course, with a link and a date: the version of
  NUnit your own `.csproj` pins, and today's latest version on nuget.org. If they
  differ, one sentence saying so; **if you could not find it, write that** — an
  absent answer is a result too.

Then „Na koniec wypchnij wszystko.” and the standard hand-in sentence.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| `nunit` is one of three SDK 10 test templates, default TFM `net10.0`, no `--test-runner` | [learn.microsoft.com](https://learn.microsoft.com/dotnet/core/tools/dotnet-new-sdk-templates); confirmed by execution, research §6.1 | 10.09.2026 | have |
| The built-in `xunit` template generates **deprecated** v2 packages | [nuget.org/packages/xunit](https://www.nuget.org/packages/xunit) · [dotnet/sdk#54499](https://github.com/dotnet/sdk/issues/54499) | 10.09.2026 | have |
| NUnit 4 moved the classic asserts to `NUnit.Framework.Legacy` | [NUnit 4.0 Migration Guide](https://docs.nunit.org/articles/nunit/release-notes/Nunit4.0-MigrationGuide.html) | checked 10.09.2026 | have |
| „View models can be unit tested like any other class, without launching a UI” | [Avalonia docs, MVVM](https://docs.avaloniaui.net/docs/fundamentals/the-mvvm-pattern/) | upd. 25.08.2026 | have |
| `dotnet reference add` is the .NET 10 form; verb-first still works | [learn.microsoft.com](https://learn.microsoft.com/dotnet/core/tools/dotnet-reference-add) | 10.09.2026 | have |
| Package versions the template pins (NUnit 4.3.2, adapter 5.0.0, Test.Sdk 17.14.0) | research §6.1, executed | 10.09.2026 | have — **on SDK 10.0.112, not 10.0.4xx** |
| **The console output of a failing `dotnet test`** | — | — | **to capture on a lab machine** (research §7.6). The lesson describes it and leaves the block to be pasted |

## Reader assumptions to verify

- That the students' applications have a class that can be called without a
  window. 6f required it; a student who kept everything in code-behind will need
  to extract one first, and the lesson must say so in one sentence rather than
  assume.
- That the lab machines can reach nuget.org. **If the school network blocks it,
  this lesson cannot run** — the restore is the first thing that happens.

## Decisions

- **NUnit, with the reason given to the student in one sentence** — rejected:
  saying nothing about the choice. This class has spent a module ratifying a
  stack; an unexplained framework here would contradict 6b.
- **Red before green as a repository condition, not a slogan.** Rejected:
  teaching TDD as a named method — the research (Böckeler, 10.08.2026) does not
  support the claim that the method improves the outcome, and this course does
  not teach unevidenced method.
- **The `Assert.AreEqual` trap is planned, not accidental** — it is the best
  available demonstration that fluent code can be six years out of date, and it
  is caught by a compiler rather than by taste.
- **`[TestCase]` yes, `[Theory]` no** — NUnit's `[Theory]` means something else
  than xUnit's, and the difference is not worth a paragraph here.

## Open questions for Viktar (≤ 3)

1. **This lesson has not been built end to end.** NuGet is unreachable from the
   drafting container (research §6), so the template was generated but never
   restored and `dotnet test` was never run. Every command is documentation-
   sourced and template-verified; the **failure output block is left empty in the
   draft** for you to paste from a real run. This is the one thing that must
   happen before `publish: true`.
2. Five hours: one for the setup, one for red/green, one for the awkward inputs,
   one for the agent comparison, one of slack. Right, or is the setup hour
   optimistic for a room of thirty on a school network?

## Deviations from the approved arc

- Drafted the same day as the brief, unapproved (module-level decision).
- The `dotnet test` failure block is a placeholder, marked in an MDX comment.
