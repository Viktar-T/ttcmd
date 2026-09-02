# Brief — 3c · Budowa 3: reguły zamiast powtarzania

| | |
| --- | --- |
| Lesson | `content/moduly/03-budujemy/budowa-3-reguly-projektu.mdx` · `order: 3` |
| Written | 2026-09-01, by write-lesson · approved: **not approved — autonomous run** |
| Mode | **autonomous** — drafted in the same run, unapproved (AGENTS.md §2) |
| Research | `course-structure-v2.md` Moduł 3; `research-01` §6 (tool names rot, categories survive); primary sources in the table below |
| Drafted | 2026-09-01, revised the same day after a fresh-context review — deviations at the end |

## Reader position

Has read 0a, 0c, 1b–1h, 2a–2d, 3a, 3b. Has built two applications with an
agent and has, by now, typed the same conventions into every new session:
Polish interface, English identifiers, no extra libraries, one file per
screen, the save format. Knows: the thread is re-sent every turn (3a); the
window is finite (3a); a format written into the request changes the result
(3b). Has never: written a file meant to be read by a tool; wondered how the
agent knows anything about files it was not shown; met the words indeksowanie
or RAG.

## Carrying question

Skąd agent ma wiedzieć rzeczy, których nie napisałeś w tej wiadomości — i
gdzie mają mieszkać zasady, żebyś nie przepisywał ich po raz dziesiąty?

## Anchor

**`AGENTS.md` in the katalog repository, growing from zero to about eight
lines during the lesson** — each line born from a convention the student
caught themselves re-typing. The application under it is a *katalog* of the
student's own collection — films, books, board games: three screens (lista
pozycji → szczegóły → dodawanie), the data read from one text file with
`tytuł;rok;ocena` per line. The app is what makes the rules file necessary
— three screens means three chances to state the same eight things — and the
file is what the lesson is about.

## Shape

**Hands-on**, with one experiment in the middle: screen two is requested in a
**fresh session with no conventions repeated**, and the result decides what
gets added to the rules file.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | in two builds you typed the same four sentences into every session → today's app has three screens → where do those sentences live so you stop | the empty `AGENTS.md`, named |
| 1 | Katalog: pierwszy ekran i lista zasad | build screen one; write down every convention you state, as you state it | the file gets its first lines from your own typing |
| 2 | Plik reguł: jedno miejsce zamiast dziesięciu wiadomości | what a rules file is, where it lives, what the tool does with it: it is put into the context of every request — the mechanism from 3a, now working for you | the file, formatted, committed |
| 3 | Drugi ekran, świeża sesja | the experiment: new session, no conventions repeated, ask for screen two, record which rules held; the ones that did not get rewritten, not repeated louder | the file gets its second draft |
| 4 | Dlaczego „wklej wszystko" nie działa | a finite window re-sent every turn (3a) makes pasting the project both expensive and worse; what tools do instead — search the project, put fragments in the prompt; indeksowanie and RAG named once each | why the rules file is short and the project is not in it |
| 5 | Co należy do reguł, a co do prośby | durable conventions vs this task; and the honest limit — a rules file long enough to be a manual stops being read, by the tool and by you | the eight lines, and the three that were cut |
| 6 | Trzy ekrany i osiem linijek | ending: answers the opening as actions | the finished app, the committed file |

## Owns · recalls · avoids

- **Owns** (proposed appendix rows): plik reguł / `AGENTS.md` · kontekst
  projektu · indeksowanie · RAG (named once, as retrieval into the prompt) ·
  „świeża sesja" as a deliberate technique.
- **Recalls**: the thread is re-sent every turn (3a, one clause + link — the
  reason a rules file works at all, and the reason it must be short) · the
  window and its cost (3a) · format in the request (3b, one clause) ·
  `.gitignore` and „what does not enter the repository" (2d, one clause — the
  rules file *does* enter it, and why) · tool names rot, categories survive
  (1h, one clause — each editor calls its rules file something different).
- **Avoids**: konstytucja projektu, `spec.md`, the SDD loop (home Moduł 4 —
  this lesson stops at conventions and says the method module formalises them,
  one forward reference) · halucynacja (home 3d) · MVVM, wiązanie danych (home
  5f).

## Exercises

1. **Recall** — what a rules file is for, in one sentence that mentions the
   thread; two things that belong in it and two that do not.
2. **Action on the anchor** — the fresh-session test, run once more after the
   file is rewritten: ask for one small change without repeating anything, and
   record on the card which rules survived this time.
3. **Build step** — finish the katalog to three working screens, with
   `AGENTS.md` committed and every convention in it earned by having been typed
   at least twice; one change by hand without the agent; push.
4. **Research** — find in your editor's documentation what its rules file is
   called, where it must lie and whether it reads `AGENTS.md`. Link and date.
   Compare with a classmate using the other editor.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| `AGENTS.md` — an open format for instructing coding agents, „a README for agents", used by tens of thousands of projects | https://agents.md/ | no date on page; checked 01.09.2026 | have |
| Released by OpenAI in August 2025; now stewarded by the Agentic AI Foundation under the Linux Foundation | https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation | 09.12.2025 | have |
| **Dropped:** „Claude Code does not use RAG, it greps" and every other statement about how a named tool searches a project internally | vendor behaviour, undated and volatile (`research-01` §6) | — | dropped — the lesson describes the category, not any tool's internals |
| **Dropped:** token savings of a compact data format (TOON and similar) | vendor self-benchmark, no independent source | — | dropped |

## Reader assumptions to verify

- That the class tool actually reads `AGENTS.md` from the project root.
  **This must be checked on the lab machine before the lesson**: if the
  installed editor uses only its own file name, section 2 names that file
  instead and the standard becomes the second paragraph rather than the first.
- That three screens without data binding is reasonable for the week. The
  lesson deliberately keeps everything in code-behind and says so; binding is
  Moduł 5's.
- That students still have the two earlier repositories to look at, since the
  conventions in section 1 are recovered from them.

## Decisions

- **Katalog własnego zbioru instead of the v2.3 konwerter jednostek** — a converter is two text
  boxes and a multiplication, with nothing repeated inside it, so a rules file
  cannot pay for itself in the same sitting; three screens repeat the same
  conventions three times. Rejected: keeping the converter and asserting the
  value of a rules file rather than letting the build demonstrate it.
- **Three screens is „done"; the fourth (editing a set) is an extension** —
  the module has ~8 h for this build and the third screen is where the point
  has already been made.
- **The rules file is written by hand, from the student's own repeated
  sentences** — rejected: giving them a ready-made `AGENTS.md` to copy, which
  is faster and teaches nothing, because the whole argument is that a rule
  earns its line by having been typed twice.
- **RAG and indeksowanie get one paragraph together and no diagram** —
  rejected: a section on retrieval pipelines, which is a topic for a different
  course and would double the lesson.
- **No tool's internal search behaviour is described** (`research-01` §6):
  the lesson says what the category does and tells the student to check their
  own tool's documentation, with a date.

## Open questions for Viktar (≤ 3)

1. Confirm the katalog data format (`tytuł;rok;ocena` per line, one file, UTF-8) — it is also the input for the Moduł 4 rebuild, if the
   specification module runs its loop on this app rather than on the notepad.

## Deviations from the approved arc

- **The application is a katalog, not fiszki** — see `03-index.md`'s deviations:
  the flashcards are the 1d demo's own app.
- **The scaffolding the brief assumed is written out:** `dotnet new
  avalonia.app -o katalog`, the repository, creating `dane/pozycje.txt`, and one
  stated technical decision — everything in code-behind, screens swapped inside
  one window, binding deferred to Moduł 5 — so the week is not eaten by
  navigation.
- **Section 5 does not show „the three rules that were cut."** It makes the same
  point with the „would I say this in the next three requests" test and the
  arithmetic of shortness.
- **1h is recalled where the rules file and indexing arrive.** That lesson
  already told the student to ask a new tool whether it reads rules files and
  indexes the project; introducing both cold was a term-home violation.
- **Both `AGENTS.md` facts sit under one link.** August 2025 and December 2025
  are stated in the Linux Foundation release, which now carries both.
- **RAG arrives with the paper's link** and with no claim about how any named
  tool searches a project — as the brief's Decisions required.
- **Ending heading** „osiem linijek" → „kilkanaście linijek", to match the body.
