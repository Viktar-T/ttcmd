# Brief — Moduł 7 · Testy, jakość i przegląd kodu

| | |
| --- | --- |
| Module | `content/moduly/07-testy-i-jakosc/index.mdx` |
| Written | 2026-09-10, by write-lesson · approved: (blank until Viktar says so) |
| Mode | **semi-supervised.** Viktar answered the two blocking questions on 2026-09-10 (six lessons with the pull request as its own lesson; research first, written to a file) and asked for the module in full. The seven briefs were therefore **not** individually approved before drafting — read them as the record of what was decided, and veto what you disagree with |
| Research | `docs/content-research/research-07-testy-jakosc-przeglad.md` (written the same day, all four sections), `course-structure-v2.md` §Moduł 7 and §Moduł 5, `docs/surveys/content-reader.md` |
| Drafted | 2026-09-10 |

## The module's one argument

> **Do tej pory jedynym sprawdzeniem byłeś ty. Ten moduł buduje sprawdzenia,
> które działają, kiedy ty nie patrzysz — i jedno, które patrzy inaczej niż ty.**

Everything before Moduł 7 verified by eye: read the diff, ask the four
questions, write it in the journal. That worked because the student was there.
Moduł 7 answers the case where they are not: an agent changes a file next
Tuesday, or the student themselves comes back in three weeks. Four mechanical
checks (a test, a model's review, a gate, a boundary) and one human one (a
classmate), each introduced by the failure it answers.

## What the structure document says, and the one contradiction resolved

`course-structure-v2.md` §Moduł 7 says „lessons 7a–7e as v1's 6a–6e” (where v1's
6e is **Bezpieczeństwo**) and, two paragraphs later, calls 7e „**the
peer-review lesson**”, promoted to a real pull request. Those cannot both be
true. **Viktar resolved it on 2026-09-10: six lessons, the pull request as its
own, with the hour taken from 7a–7d.** That answers **open decision #16** in the
affirmative — it needed the hour — and the decision should be written back into
`course-structure-v2.md` in the same change as this module.

Hours: **3 / 5 / 3 / 3 / 4 / 2 = 20.** Unchanged module total.

## Reader position at the module's first lesson

Has read 0a–0c, 1b–1f (reading), 1g, 2a–2f, 3a–3d, 4a–4f, 5a–5g, 6a–6h.

**Can:** run `dotnet build` and `dotnet run`; read a C# diff and say what it
does; write a specification with checkable criteria in the „Kiedy …, to …”
shape; run the loop specyfikacja → plan → zadania; type a `StackPanel`, a
`try`/`catch` with named exception types, an event handler, and
`INotifyPropertyChanged` by hand; say where the state of their application
lives, because they moved it out of the controls themselves in 6f; commit,
branch and merge; keep a `dziennik.md` with evidence rather than opinions.
**Owns a working desktop application of their own**, specified, built and taken
apart, in their own public GitHub repository.

**Has never** (from the reader file, and each one is built inside the lesson
that relies on it): written an automated test — **6 of 12 never**, 4 once in
class; resolved a merge conflict — **nobody**; reviewed another person's change
— **nobody**; worked on the same files as another person — **7 of 12 never**;
had a user who was not themselves — 8 of 12 never; opened a pull request into a
repository they do not own. **Nobody has run CI.** „SQL, baza danych” is
unknown to 9 of 12, so no example in this module uses one.

**Believes, on the day-one survey:** „Kod od AI jest zwykle poprawny” scores
**2,2 of 5** — they already do not trust it — and „Wolno oddać niezrozumiany
kod, jeśli działa” scores **1,4**, unanimous no. **This module therefore does
not argue that AI code is untrustworthy.** They agree already. It argues
something they do not yet have: that *reading it* is not the same as *knowing
it works*, and that their own eyes are the check that does not scale.

## The module anchor

**One acceptance criterion out of the student's own `specs/001-*/spec.md`,
carried through all six lessons** — from a sentence, to a test, to a comment in
a review, to a green tick that blocks a merge, to somebody else's opinion about
it.

Under it, in 7a and 7b, sits one concrete, measured defect that nearly every
application in the room has: **the round trip *zapisz → zamknij → otwórz*.**
Moduł 5's rubric required „aplikacja pamięta coś po zamknięciu”, so every
student has this code, and the naive version agents produce fails in two ways
that clicking through the window never shows (research §6.2, built and run on
SDK 10.0.112 on 2026-09-10):

- an item containing the separator comes back as two, and the first is truncated
  — **2 in, 3 out**;
- an **empty list comes back with one empty item** — 0 in, 1 out — which is the
  *first run* of every one of these applications.

This is the module's gift: the anchor is not an example, it is a bug in the
reader's own repository, and it is the reason the first test is worth writing.

## The teaching problem this module inherits, and its answer

Moduł 5 created it and named it: up to sixty different applications, no shared
feature, in a class that already complained about „too little help”. The rule
stands here and is stricter, because this module contains code: **no zadanie and
no code block may name a feature of an application.** A code block shows the
*shape* on the teacher's reference build (`tmp-modul5-build/`), and the student
finds the corresponding shape in their own repository — the lesson names what to
search for, never a line number. The rubric words this module may use:
*jedno kryterium ze specyfikacji · jeden test na jedno kryterium · zielone albo
czerwone · nie da się scalić, kiedy czerwone · ktoś inny to przeczytał*.

## Lesson arc — one sentence each

| | Title | slug | h | The move |
| --- | --- | --- | --- | --- |
| **7a** | Testy to nowe złoto | `testy-to-nowe-zloto` | 3 | Finds the round-trip bug in the student's own application **by hand**, then asks what would have caught it while nobody was looking — and answers with how the industry itself decides whether a model fixed a bug |
| **7b** | Pierwszy test: jedno kryterium, jedno zdanie | `testy-jednostkowe` | 5 | Writes it. `dotnet new nunit`, one criterion from their own spec, red before green; why the logic had to leave the window first (6f collecting its payment); and the agent's version compared with theirs |
| **7c** | Przegląd kodu: model czyta twój diff | `ai-code-review` | 3 | The same diff read by a model. What it catches, what it invents, and the two measurements — 71% and 0,066 — that disagree |
| **7d** | CI: bramka, która nie przepuszcza zepsutego kodu | `ci-bramka` | 3 | The test runs without the student. Nine lines of YAML, a red tick, a ruleset that makes red mean „nie da się scalić” — and the two ways a gate silently passes nothing |
| **7e** | Pull request do repozytorium kolegi | `pull-request-do-kolegi` | 4 | The one thing 7 of 12 have never done. A branch in somebody else's repository, a review that names criteria rather than style, a conflict resolved, a decision written down |
| **7f** | Bezpieczeństwo: sekrety, dane, prompt injection | `bezpieczenstwo` | 2 | The boundary. A secret in a public repository is compromised, not deleted; a fork outlives the repository; and an agent that reads untrusted text is holding your credentials |

**Why this order.** 7a creates the need (a bug they can see), 7b answers it (a
test), 7c adds a second reader, 7d removes the student from the loop, 7e adds a
human who is not them, 7f draws the line around everything they just switched
on. Each lesson's ending is the next lesson's opening. Security is last on
purpose and **before** nothing — it is the lesson that closes the semester,
because by then the student has a public repository, an agent, a CI workflow
with a token, and a classmate's code on their disk: only now does the trifecta
have all three of its parts in the reader's own life.

## Hand-in assignments

**Four of six end in an assignment the teacher marks: 7b, 7d, 7e and 7f.**
7a ends in a finding written into `dziennik.md` (its work is folded into 7b's
conditions) and 7c ends in a comparison written into the same file (folded into
7d's). This follows `docs/content-style.md`, „The hand-in assignment”, and Moduł
6's ratio.

## Owns · recalls · avoids

- **Owns** (proposed appendix rows in the same change): *test jednostkowy,
  `dotnet new nunit`, `dotnet test`, `[Test]`, `[TestCase]`, `Assert.That`,
  czerwony/zielony, asercja, regresja* (7b) · *przegląd kodu przez model, fałszywy
  alarm (false positive), `/code-review`* (7c) · *CI jako bramka, workflow,
  `.github/workflows`, runner, ruleset, wymagany status* (7d) · *fork, pull
  request do cudzego repozytorium, konflikt scalenia, przegląd wg kryteriów* (7e)
  · *sekret, push protection, rotacja klucza, prompt injection, śmiertelna trójca*
  (7f).
- **Recalls, one clause with a link:** the four questions and the „werdykt z bo”
  (6h) · „gdzie jest stan” and „okno tylko pokazuje” (6f) · the criterion shape
  „Kiedy …, to …” (4c) · dziennik weryfikacji and „biegłość to nie poprawność”
  (3d) · the METR gap, without its numbers (1c) · CI as a word (1e) · pull
  request, gałąź, `.gitignore` (0c).
- **Avoids:** mutation testing, coverage as a target, integration and end-to-end
  tests as categories, dependency injection, mocking frameworks, headless
  Avalonia (named in *Czytaj dalej* only), signing and release (Moduł 10), SQL
  in any example.

## Claims that need a source

All of them are in `research-07-testy-jakosc-przeglad.md` with links and dates,
and each lesson repeats the link at the point of use. The four that carry the
module: SWE-bench Verified's `PASS_TO_PASS` definition (13.08.2024); Meta's
75/57/25/73 chain (14.02.2024); GitHub's 71% against the preprint's F1 = 0,066
(05.03.2026 / 09.04.2026); GitGuardian's 6,4%-versus-4,6% and 3,2%-versus-1,5%
(11.03.2025 / 17.03.2026). **§7 of the research file lists what was searched for
and not found; nothing from that list appears in any lesson.**

## Reader assumptions to verify

- That every student really does have a persistence step in their application.
  Moduł 5's rubric required it, but 5b's cut („a first version of one screen is
  a pass”) may have removed it for the weakest. **7a needs a fallback for a
  student whose application saves nothing** — the brief for 7a proposes one.
- That students may sign in to GitHub Copilot / Claude Code accounts (**open
  decision #2**). 7c and 7d both assume a GitHub account that can run Actions.
- That the lab SDK is on the **10.0.4xx** band. The research build ran on
  10.0.112; the package versions the template pins differ by band.

## Decisions

- **Six lessons, not five** — Viktar, 2026-09-10, answering open decision #16 in
  the affirmative. Rejected: folding the pull request into 7c (half a lesson for
  a conflict and a stranger's code), and dropping security (INF.04.8, and the
  only place the course says what a public repository means).
- **NUnit 4, not xUnit** — research §3.1. Rejected: the built-in `xunit`
  template, which generates **deprecated** v2 packages and cannot be combined
  with Avalonia 12's headless testing; `xunit3`, which costs a template install
  and probably a `global.json`; MSTest, for which Avalonia ships no headless
  integration.
- **The tests test plain C# logic, not the window** — research §3.5, on
  Avalonia's own documentation. Headless Avalonia is further reading.
- **v1's slugs are kept** (`testy-to-nowe-zloto`, `testy-jednostkowe`,
  `ai-code-review`, `ci-bramka`, `bezpieczenstwo`) because they are what the
  structure document says and a slug is identity; the Polish **titles** are
  rewritten to name a stage rather than a topic, per `docs/content-style.md`.
- **No number the research file could not verify.** No regression rate, no
  SWE-bench leaderboard score, no „41% more bugs”, no invented console output.

## Open questions for Viktar (≤ 3)

1. **7e needs pairs.** Two groups of ~30, and a pull request needs a partner
   whose repository builds. Who assigns the pairs, and what happens to a student
   whose partner's application does not run on their machine? The brief for 7e
   proposes: teacher-assigned pairs inside a group, fixed for the whole lesson,
   plus the teacher's reference build as the fallback partner. **Blocks 7e's
   zadanie.**
2. **Every code block in 7b and 7d is unbuilt on a lab machine.** NuGet is
   unreachable from the drafting container (research §6), so the NUnit project
   was never restored or run. The module stays `publish: false` until you run
   the 7b sequence once on SDK 10.0.4xx and paste the real `dotnet test` output.
   Do you want that run recorded in the briefs' *Deviations*, as Moduł 6 did
   with `tmp-modul5-build/`?
3. **7f names two real incidents** (the GitHub MCP exploit of 26.05.2025 and Nx
   „s1ngularity” of August 2025). Antigravity's November 2025 findings were
   **deliberately left out** — they are excellent and they concern a tool this
   course told students to install, which would read as a warning about the tool
   rather than about the mechanism. Confirm, or say to put it in.

## Deviations from the approved arc

- The module was drafted from these briefs in the same session, without a
  separate approval step, at Viktar's request („zbadaj i napisz w całości”).
- 7c's title departs from v1's „AI robi code review”; the slug does not.
- The lesson count went from five to six, funded from 7a–7d as open decision #16
  anticipated.
