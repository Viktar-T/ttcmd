# Brief — 3d · Halucynacje, weryfikacja i pierwszy Rozbierz to

| | |
| --- | --- |
| Lesson | `content/moduly/03-budujemy/halucynacje-i-weryfikacja.mdx` · `order: 4` |
| Written | 2026-09-01, by write-lesson · approved: **not approved — autonomous run** |
| Mode | **autonomous** — drafted in the same run, unapproved (AGENTS.md §2) |
| Research | `research-01` §5 (scaffolding vs offloading, the Novice's Dilemma, the Boilerplate Blindspot, the Strategic Dance) and §2.5; `course-structure-v1.md` „Course-wide mechanics" for `Rozbierz to` and the dziennik weryfikacji; primary sources in the table below |
| Drafted | 2026-09-01, revised the same day after a fresh-context review — deviations at the end |

## Reader position

Has read 0a, 0c, 1b–1h, 2a–2d, 3a–3c. Has three applications in three
repositories, each built with an agent, and a card with three weeks of notes,
including at least one entry saying „nie chciało się zbudować" and at least one
saying „nie rozumiem, co tu zrobił". Knows: what the model receives (3a); that
a stated format and an example change the result (3b); that conventions live
in a rules file (3c). Has never: read someone else's generated code on
purpose; found a defect in code that compiles; written down what they checked
before accepting a change; met the word *halucynacja* in this course.

## Carrying question

Jak odróżnić kod, który jest dobry, od kodu, który tylko dobrze wygląda — i co
konkretnie sprawdzasz, zanim się zgodzisz?

## Anchor

**One fragment of Avalonia code that is fluent, well-formed, in the right
place — and wrong.** It is the save routine from the notatnik of 3b, in the
shape agents actually produce: `new SaveFileDialog()`, a class removed from
Avalonia in version 12; a timer from `System.Timers` touching a control from
the wrong thread; `double.Parse` with no culture, which breaks on the Polish
decimal comma; and a comment promising error handling that the code does not
contain. The fragment opens the lesson, is dissected section by section, and
returns at the end as the *Rozbierz to* specimen.

## Shape

**Narrative with a hands-on middle** — the only lesson of the module without a
build. The material is the three repositories the module has already produced.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | three apps, three weeks, and in each of them at least one moment when something did not compile or did not do what the description said → today we name it | the fragment appears, without a verdict |
| 1 | Kod, który wygląda dobrze | what is actually wrong with it, line by line, each fault with its source; the pattern was true for years, and the internet is still full of it | the fragment dissected |
| 2 | Dlaczego model zgaduje zamiast powiedzieć „nie wiem" | the mechanism: fluency and truth come out of the same process, and evaluation rewards a confident guess over an admission of ignorance | why *that* fragment, not a random error |
| 3 | Cztery kształty halucynacji | the taxonomy at the size the reader needs: a function that does not exist; a real one used wrongly; a claim about the code that is not true; a confident answer about your project, which the model has never read | one example of each drawn from the fragment and from the three builds |
| 4 | Dziennik weryfikacji | the card from the first experiment becomes a file in the repository: what I checked, what it returned, what I still do not know; three checks that cost seconds (does it build, does it run, does the thing I asked for actually happen) | each of the three apps gets one retroactive entry |
| 5 | Rozbierz to | the mechanic introduced and run: here is generated code, find what is wrong with it; then the same on a classmate's build, which is harder and more useful | the fragment returns, now as the exercise |
| 6 | Co sprawdzasz, zanim się zgodzisz | ending: four checks as actions, and the honest admission that verification is hardest exactly where you know least | the journal, open, with three entries |

## Owns · recalls · avoids

- **Owns** (proposed appendix rows): halucynacja · dziennik weryfikacji ·
  `Rozbierz to` (course mechanic) · „biegłość to nie poprawność" · przegląd
  kodu kolegi (peer review, as a classroom practice).
- **Recalls**: METR — the gap between what happened and what people felt (1c,
  one clause, no numbers re-told, link) · „nic nie wchodzi nieprzeczytane"
  (2d, one clause) · the removed `SaveFileDialog` as the thing that would not
  build in 3b (3b left it explicitly for this lesson) · niedeterministyczny
  (1d, one clause) · the observation card (1e).
- **Avoids**: testy jednostkowe and CI (home Moduł 6 — the lesson says the
  checks here are the cheap manual ancestors of what Moduł 6 automates, one
  forward reference) · `spec.md` and acceptance criteria (home Moduł 4, one
  forward reference) · RAG (3c).

## Exercises

1. **Recall** — four shapes of hallucination, one example each, from memory;
   and the difference between „działa" and „sprawdziłem, że działa".
2. **Action on the anchor** — *Rozbierz to*: the specimen, four faults, written
   down with what you would check to prove each one. The answer key is the
   lesson's own sources.
3. **Build step** — create `dziennik.md` in each of the three repositories and
   write one honest retroactive entry per application: what you accepted
   without checking, and what you would check now. Commit and push.
4. **Reflection / peer review** — swap one repository with a classmate. Find
   one thing in their generated code that you cannot explain, and ask them
   about it. Write down whether they could explain it.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| Models are optimised to be good test-takers; guessing when uncertain scores better than admitting uncertainty | https://arxiv.org/abs/2509.04664 | 04.09.2025 | have |
| `OpenFileDialog` / `SaveFileDialog` obsolete since Avalonia 11 and **removed in 12**; replaced by `IStorageProvider` pickers | https://v11.docs.avaloniaui.net/docs/avalonia12-breaking-changes/ | 05.03.2026 | have |
| All interaction with the UI must happen on the UI thread, otherwise `InvalidOperationException: Call from invalid thread`; `DispatcherTimer`'s callback already runs there | https://docs.avaloniaui.net/docs/app-development/threading | 03.06.2026 | have |
| Without an `IFormatProvider`, `Parse` / `TryParse` uses the current culture | https://learn.microsoft.com/dotnet/standard/base-types/parsing-numeric | 28.06.2025 | have |
| Avalonia's current stable release, for „check the version you actually have" | https://www.nuget.org/packages/Avalonia | 12.1.1 published 29.07.2026 | have |
| Verifying generated code requires the expertise the exercise was meant to build (the Novice's Dilemma); students' self-reports about their own use are not evidence | `docs/content-research/research-01-ai-assisted-development.md` §5 and the study it cites | — | have — via the research file's own citation |
| **Dropped:** any figure for how often models hallucinate | no source survives reading; rates are benchmark-specific and stale within months | — | dropped |

## Reader assumptions to verify

- That at least a few students really did hit the removed `SaveFileDialog` in
  3b. If nobody did, the fragment still works — it is written as a specimen,
  not as a claim about the class — but the opening's „w każdym z tych tygodni"
  should be softened by Viktar to match what actually happened.
- That swapping repositories between students is acceptable under the class's
  own rules. It is peer review of their own work, no personal data involved,
  but it is a classroom arrangement, not the site's to assume.

## Decisions

- **The specimen is written, not captured.** Four faults, every one of them
  sourced and every one of them a thing that genuinely happens in this stack
  this year. Rejected: an invented „student's code" with a name attached — the
  style guide forbids invented students, and an unsourced fault would be the
  same mistake the lesson is about. Open question 3 in `03-index.md` asks
  whether Viktar would rather substitute a real capture from the class.
- **No hallucination-rate number appears anywhere.** Rejected: quoting a
  benchmark figure, which would be stale before the module ends and would
  invite exactly the „wrażenie jest dowodem" reading the course argues against.
- **The journal is a file in the repository, not a sheet of paper** — it
  travels with the code it is about, and Moduł 6 can build on it.
- **`Rozbierz to` is introduced here rather than announced in the module
  introduction** — the mechanic needs the specimen in front of the reader to
  mean anything.
- **The lesson ends on the Novice's Dilemma, honestly stated**: verification is
  hardest exactly where the student knows least, and the answer is not „try
  harder" but the three cheap checks plus another pair of eyes. Rejected: a
  confident closing that says the reader can now spot generated defects.

## Open questions for Viktar (≤ 3)

1. Whether the peer-review exercise (swapping repositories) is something you
   want written into the site, or arranged in class each time.

## Deviations from the approved arc

- **The specimen was rebuilt.** The first draft had five faults, not four: an
  unintended one (`path` unchecked after a cancelled dialog) and a dead
  `double.Parse` line whose variable was never used — both of which a careful
  student would report as faults and be told they were wrong. The published
  specimen has exactly four: the removed dialog class (build fails), a timer
  touching a control from the wrong place (crash), `File.WriteAllText` quietly
  overwriting the whole notes file (runs, destroys data), and a comment
  promising error handling that is not there.
- **The answer key changed with it.** The brief said the three remaining faults
  were findable in `Źródła`; only one is. The lesson now says so — one from the
  sources, two only by reading the code against the notepad's own specification
  — which is a stronger version of the same exercise. The parsing source left
  `Źródła` together with the parse.
- **The study's date was wrong and is corrected** to 13.03.2026 (verified
  against the article page); the first draft carried a placeholder.
- **„Badacze z OpenAI" → „zespół badaczy, w większości z OpenAI"** — one of the
  four authors is at Georgia Tech.
- **The card is retired here explicitly**, and `dziennik.md` takes over per
  repository. The brief asked for the handover; the first draft left the two
  coexisting.
- **One forward reference to Moduł 6 was added**, placing the three cheap checks
  as the manual ancestors of automated tests, as the brief's *avoids* required.
- **The opening no longer claims every student hit a failure in every week** —
  the draft's own comment had asked for this and the first pass ignored it.
