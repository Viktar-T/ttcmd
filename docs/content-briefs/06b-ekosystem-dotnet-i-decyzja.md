# Brief — 5b · Ekosystem .NET i nasza decyzja

| | |
| --- | --- |
| Lesson | `content/moduly/06-pod-maska/ekosystem-dotnet-i-decyzja.mdx` · `order: 2` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** |
| Mode | autonomous |
| Research | `research-02` §2 (the three candidates, .NET 10 LTS / 11 STS), §4.1; `research-03-desktop-app-history.md` §A2.4 (markup → object graph + binding engine), §B2 (MVVM downstream of a platform feature), §A4 and „What this means” → 4b, 4c (the XAML lineage in ninety seconds; Delphi as the case study); `research-03-building-desktop-apps.md` §10.3 (WPF not in maintenance; MAUI reaches Linux through Avalonia). Research gate: **case 1**; five links re-checked at drafting time (NuGet Avalonia versions; .NET support dates; Gossman 2005; RAD Studio price list; Borland → Inprise) |
| Drafted | 2026-09-02 — `ekosystem-dotnet-i-decyzja.mdx`; deviations at the end |

## Reader position

Has read 5a: four families, the operational definition, the five constants.
Has written one ADR in 4b's format (`decyzje/0001-format-pliku-notatek.md`)
and knows the four headings (kontekst · decyzja · odrzucone · skutki). Was
told in 2d that the stack is provisional and that „prawdziwe porównanie — i
decyzja podejmowana razem z wami, z pełnym prawem do odrzucenia tego, co
wybrałem — czeka w Module 5”. Has never compared two frameworks with a table;
has never seen a technology lose for a reason that was not technical.

## Carrying question

Czy zostajemy przy C# i Avalonii — i jak podjąć tę decyzję tak, żeby za rok
dało się przeczytać, dlaczego?

## Anchor

The decision file the student writes at the end, `decyzje/0002-stack.md` in
`notatnik-v2`: every section of the lesson produces one paragraph of its
context (what we have built; what the table says; why every .NET window
speaks XAML; what Delphi teaches about how stacks actually lose), and the
class's vote fills the decision.

## Shape

Narrative with a decision procedure at the end. Two hours.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | in week 2 someone chose your stack for you and promised to decide it with you when you could judge; you now have four apps and a family map — today the promise is paid, and the decision is written down the way 4b taught | the file exists, empty, with four headings |
| 1 | Co już wiemy z własnych rąk | the evidence the class has: what worked in eleven weeks, what fought back (the diff sizes, the `SaveFileDialog` that no longer exists in version 12 — 3d recall), where it ran (lab and home) — collected as the *kontekst* paragraph, not argued | kontekst, paragraph 1 |
| 2 | Uczciwa tabela | the .NET desktop candidates on 2026-09-02: MAUI (no Linux), Avalonia (12.1.2, everywhere, draws its own pixels — family B), Uno (browser too), plus WPF and WinForms as Windows-only ancestors that still ship features; rendering, licence, where each comes from; .NET 10 LTS as the runtime and why the course does not chase .NET 11 in November. Every version and date in the cell, linked | kontekst, paragraph 2 |
| 3 | Dlaczego każde okno w .NET mówi XAML-em | the lineage in ninety seconds: WPF, November 2006, shipped markup + a binding engine together; MVVM was invented for that engine the year before (Gossman, 8.10.2005, quoted: „relies on one more thing: a general mechanism for data binding”); every later .NET UI inherited the package, Avalonia's `.axaml` included — and the sentence that prevents a year of confusion: a XAML file is a saved tree of controls plus an engine that keeps that tree in sync with data that live elsewhere (5f will build the elsewhere) | kontekst, paragraph 3 — why switching inside .NET costs less than it looks |
| 4 | Jak naprawdę przegrywa technologia | Delphi: the RAD product everyone copied, still sold at 2 000 / 3 400 / 4 416 USD per seat (price list, dated), by a company that renamed itself in 1998 to say it was „no longer just a supplier of desktop programming tools”; the lesson: a stack rarely loses on merit — it loses on price, on who owns the platform, on who can be hired. Which is why the decision record needs *odrzucone* and *skutki*, not a feature comparison | odrzucone: what the class considered |
| 5 | Decyzja | the procedure: three questions to the room (does it run where you work; can you read what the agent writes in it; would a stranger install it), the vote, the two legitimate outcomes (ratify; overturn to WinForms/WPF on a Windows-only lab — with the cost named: Linux at home is gone), the decision written by each student with the *skutki* they personally accept | decyzja · skutki |
| 6 | (ending) Decyzja, którą da się przeczytać | answers the opening: the stack is now the class's, not the teacher's, and the file says why; what changes in the next lesson (the tool changes, the stack does not) | commit `decyzje/0002-stack.md` |

## Owns · recalls · avoids

- **Owns:** *ekosystem .NET* (the table); *XAML jako zapisane drzewo
  kontrolek + silnik wiązania* (the sentence — proposed appendix row); the
  Delphi story (price + Inprise) — proposed story row „Delphi did not lose on
  merit → 5b”; *LTS / STS* in one clause.
- **Recalls:** 2d's promise (link); 4b's ADR format (link, „the four
  headings”); 3d's version-12 removal of `SaveFileDialog` (one clause, link);
  5a's family B.
- **Avoids:** binding syntax and `INotifyPropertyChanged` (5f); the XAML
  lineage's dependency-property system (research detail, not lesson);
  INF.04 as a fact (Article V) — it appears only in exercise 4 as something
  the student looks up in the official informator.

## Exercises

1. Recall — from memory: three .NET frameworks and the one line that
   separates them; the year and the two things WPF shipped together.
2. Action on the anchor — write the *kontekst* of `0002-stack.md` from the
   class's own evidence (three sentences, each with a fact from your repos).
3. Build step — finish `decyzje/0002-stack.md` after the vote, with
   *odrzucone* and *skutki*; commit and push.
4. Research — open the current CKE informator for INF.04 and write down
   which desktop technologies it names and the document's date; one sentence
   on what that changes in your *skutki* (the site asserts nothing about the
   exam; the student checks).

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| Avalonia latest stable 12.1.x; templates default 12.1.2 | https://www.nuget.org/packages/Avalonia ; https://github.com/AvaloniaUI/avalonia-dotnet-templates | checked 02.09.2026 | have (12.1.1 on the NuGet page fetched 02.09; 12.1.2 in the templates and in the build log the same day) |
| Avalonia renders with Skia (family B) | https://docs.avaloniaui.net/docs/fundamentals/cross-platform-architecture | 25.08.2026 | have |
| MAUI has no Linux desktop target; Uno has production WebAssembly | `research-02` §2.1 | 29.08.2026 | have — table cells link to vendor pages found at drafting time |
| .NET 10 LTS until November 2028; LTS/STS alternate | https://learn.microsoft.com/en-us/dotnet/core/releases-and-support | checked 02.09.2026 | have |
| WPF shipped with .NET Framework 3.0 in November 2006 | Microsoft docs / research-03-history §A2.4 | 29.08.2026 | have |
| Gossman, MVVM, 8.10.2005, „relies on one more thing: a general mechanism for data binding” | https://learn.microsoft.com/en-us/archive/blogs/johngossman/introduction-to-modelviewviewmodel-pattern-for-building-wpf-apps | 08.10.2005 | have |
| RAD Studio 13.1 prices 2 000 / 3 400 / 4 416 USD | https://www.embarcadero.com/app-development-tools-store/rad-studio | checked 02.09.2026 | have |
| Borland → Inprise, 29.04.1998, „no longer just a supplier of desktop programming tools” | https://www.techmonitor.ai/technology/borland_becomes_inprise_as_it_shifts_to_the_enterprise/ | 29.04.1998 | have |
| Avalonia `.axaml` extension exists „due to technical issues integrating with Visual Studio” | https://docs.avaloniaui.net/docs/fundamentals/avalonia-xaml | research-03-history | to re-check at drafting |

## Reader assumptions to verify

- The class still has the lab's OS question open in their heads (decision #1)
  — the vote's second outcome depends on it.
- Nobody in the room has used MAUI, WPF or WinForms (survey: C# unknown to
  11 of 12) — the table is read, not remembered.

## Decisions

- The decision is recorded per student, not once for the class — rejected: a
  class-wide file (it is the student's first real ADR, per v2.5).
- WPF and WinForms are in the table as Windows-only ancestors with a real
  cost, not as legacy — rejected: omitting them (they are the alternative the
  vote can choose).
- INF.04 appears only as a research exercise — rejected: a sentence on what
  the exam names (Article V).

## Open questions for Viktar (≤ 3)

1. Whether the vote is real (the class may overturn the stack, and the
   remaining lessons of the module would then need a WinForms variant) or
   consultative (the decision is Viktar's; students record their own
   *skutki*). The draft is written for a real vote with a named cost.

## Deviations from the approved arc

1. **The opening was rewritten after `check:content`** flagged „W lekcji…” as its first words; it now opens from the four apps and the diffs the student has read, and the 2d promise arrives in the third sentence.
2. **Avalonia's version in the table is 12.1.2**, the version the template installed on the build machine that day; the NuGet page fetched earlier the same day still showed 12.1.1 as latest — the Źródła entry says which is which.
3. **WPF's release date (7.11.2006) is sourced to Microsoft's own announcement post** (via `research-03-history` §A1), not to the Desktop Guide; the Desktop Guide is cited for „WPF only runs on Windows” and for the binding engine.
4. The `.axaml`-extension explanation was dropped (page not re-checked today); the lesson says only that the language is the same.
5. `check:content`: 7 one-sentence paragraphs by its count (the Gossman quote body, the procedure lead-in, list lead-ins) — kept; „mentions Delphi — home is czterdziesci-lat-zmian”: 5b is now the in-pipeline home (appendix row added); the checker's pattern is left for the publication pass.
6. The vote is written as real, with the named cost; the module brief's open question 1 stands.
