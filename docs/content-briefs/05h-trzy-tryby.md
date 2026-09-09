# Brief — 5h · Trzy tryby: ta sama funkcja bez AI, z podpowiadaniem, z agentem

| | |
| --- | --- |
| Lesson | `content/moduly/05-pod-maska/trzy-tryby.mdx` · `order: 8` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** |
| Mode | autonomous · **tryb pracy: all three, in this order, on three branches** |
| Research | `course-structure-v2.md` 5h row and the change proposal §3, §6 („three modes, not two — rejected: with AI / without AI, which skips the 2021–2023 completion era”); 1b's layers and dated timeline (recalled by link); `research-01` §5 (the RCT's two ways of using an assistant — recalled through 1c); 3d (*Rozbierz to*, „biegłość to nie poprawność”); the students' own minute counts from 3a–3c and 5d–5g. Research gate: **case 1** — the lesson's evidence is the class's own measurement; the only external facts are the layer dates already homed in 1b and the vendor facts homed in 2b/5c |
| Drafted | 2026-09-02 — `trzy-tryby.mdx`; deviations at the end |

## Reader position

Has 5d–5g: built `spis` by hand and has minute counts for four blocks plus
the three from Moduł 3. Has `notatnik-v2` with its spec, plan and tasks
(4e), branches (2e), Visual Studio with Copilot off (5c), both class editors
with Tab completion and an agent panel (2b), a journal (3d). Knows 1b's
five layers by number. Has never built the same thing twice on purpose; has
never timed themselves against a tool; has never re-read an agent's feature
with a checklist of their own.

## Carrying question

Ile naprawdę kosztuje zrobienie tej samej rzeczy samemu, z podpowiadaniem i
z agentem — i co z tych trzech wersji potrafisz teraz przeczytać, czego nie
widziałeś w Module 3?

## Anchor

One feature of the student's own `notatnik-v2`, specified in one sentence
the way 4c taught — *„Kiedy lista pokazuje N notatek, to pod listą widać
napis «Notatek: N», po starcie i po każdym zapisie. Sprawdzenie: policzyć
wpisy w pliku i porównać z napisem.”* — built three times on three branches
(`tryb-1-bez-ai`, `tryb-2-podpowiadanie`, `tryb-3-agent`), each timed, each
committed, each with a journal entry; then the third re-read with the four
questions of 5d–5g.

## Shape

Procedure with a narrative frame, then a *Rozbierz to* section. Four hours:
roughly 25 + 20 + 15 minutes of building, the rest reading, comparing and
writing.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | seven minute-counts on your card say what doing it yourself costs; none says what the alternatives cost on the same task — today the same feature three times, and the numbers go next to each other | the spec sentence, written into `specs/001-notatnik/spec.md` as K8 |
| 1 | Jedna funkcja, trzy gałęzie | the feature (why this one: it touches the state, the binding, a file count and the loop — the four lessons); three branches from `main`; the card's three columns: minutes, lines changed (`git diff --stat`), lines understood; the rule for all three: the result must pass K8's check | the branches created |
| 2 | Tryb 1: bez AI, w Visual Studio | Copilot off; the student finds where the notes live (5f's question), adds the count where the state is, binds or sets it, runs, checks K8; timer; commit `tryb 1: licznik notatek`; journal entry: what took longest | branch 1 |
| 3 | Tryb 2: tylko podpowiadanie | the class editor with the agent panel closed and Tab on (2022's layer 1 — 1b, by link — the era the class never lived through); the same feature from scratch on branch 2; the rule: Tab accepts only what you have read to the end; timer; commit; journal: what Tab knew and what it guessed wrong | branch 2 |
| 4 | Tryb 3: agent | one message, the spec sentence itself, on branch 3; read the diff before accepting (2d's rule); run, check K8; timer includes the reading; commit; journal: what the agent did that the task did not ask for | branch 3 |
| 5 | Trzy liczby obok siebie | the card's table read as an argument, with the honest limits said first: N = 1, the feature was learned in mode 1 (the third try is always faster — the order was chosen so the by-hand number is the honest one), one feature; what the class table shows when the three columns are pooled on the board (counts only, no names — Article IV); 1c's RCT recalled in one clause: two ways of using an assistant, and which one each mode is | the three columns |
| 6 | Rozbierz to: wersja agenta czytana oczami modułu | the *Rozbierz to* at feature scale, four questions from four lessons: who calls this code and on which thread (5d); which container and which names (5e); where is the state and who else mutates it (5f); which `File.` calls and which failures they survive (5g); each answered with a line number from branch 3; the verdict is not „good / bad” but „what I would change and why” | branch 3's diff, annotated |
| 7 | Co zostaje na `main` | merge the version the student can defend, with a journal line saying why; the other two branches stay (history, 2e); the module's card closed: eleven minute-counts and the sentence from 1d — the editor's *wyczucie* is what those numbers have started to build | `main` |
| 8 | (ending) Nie szybciej — trafniej | answers the opening: the cost is now a number and the reading is now a method; the by-hand blocks continue in the shared app as the named exception, not the default; what changes in Moduł 6 (everyone the same app, by the loop, read with these four questions) | the card, complete |

## Owns · recalls · avoids

- **Owns (appendix rows):** *trzy tryby pracy* (bez AI / tylko podpowiadanie /
  agent) with the branch procedure; *Rozbierz to na skalę funkcji* (the four
  questions); *„nie szybciej — trafniej”*.
- **Recalls:** 1b's layers 1 and 4 with their dates (link, one clause each);
  1c's RCT (one clause, link); 1d's *wyczucie* sentence (link); 2b's two
  editors; 2d's read-before-accept; 2e's branches; 3d's *Rozbierz to* and
  „biegłość to nie poprawność”; 4c's criterion shape; the minute counts of
  3a–3c and 5d–5g.
- **Avoids:** any claim about speed in general (the data is N = 1 per
  student); vendor names for the completion mode (category, 2b's rule);
  tests as the check (Moduł 7 — K8's check is counting).

## Exercises

1. Recall — from memory: the three modes and the layer each corresponds to;
   the four questions of the feature-scale *Rozbierz to*.
2. Action on the anchor — `git diff --stat main..tryb-3-agent` and the same
   for branch 1; write both line counts on the card and one sentence on
   where the difference is.
3. Build step — the chosen branch merged into `main` with a journal entry;
   the card committed with all eleven minute-counts.
4. Research or reflection — a week later, open the merged version and
   change the label text; write down whether you had to open the agent
   again to find where it lives.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| Copilot GA 21.06.2022 (layer 1); Claude Code 24.02.2025 (layer 4) | 1b's table (github.blog; anthropic.com) | 21.06.2022; 24.02.2025 | have — recalled by link, not re-cited |
| The Anthropic RCT: two ways of using an assistant | 1c (research-01 §5) | 29.01.2026 | have — one clause, link to 1c |
| (deliberately absent) any external number on productivity | — | — | dropped by design; the class's own table is the evidence |

## Reader assumptions to verify

- Every student's `notatnik-v2` builds on the day (a broken repo means mode
  1 starts with a repair — allowed, timed separately).
- Both class editors have a way to run with the agent panel closed and Tab
  completion on (2b: TO CONFIRM under the school's accounts; without it,
  mode 2 uses Visual Studio's inline suggestions with a signed-in personal
  account, or is skipped and said so).

## Decisions

- The feature is a **count of notes under the list** with a K8-style
  criterion — rejected: a feature the spec excludes (search, delete); a
  feature with no file side (would not exercise 5g).
- Mode order **bez AI → podpowiadanie → agent** — rejected: agent first (the
  by-hand number would then be measured on a feature already seen); random
  order per student (unpooled data at n = 30 is noise anyway; the honesty of
  the by-hand number matters more).
- The pooled class table shows counts only, on the board, never in the repo
  — Article IV.
- Verdict language „what I would change and why” — rejected: grading the
  agent's version (3d's lesson: fluency is not correctness, and neither is a
  verdict).

## Open questions for Viktar (≤ 3)

1. Which branch goes to `main`: the student's choice (draft) or always the
   by-hand one (cleaner history, weaker lesson).
2. Whether the pooled class table is kept anywhere (a photo of the board is
   fine; a file in the course repo is not — Article IV).

## Deviations from the approved arc

1. **No compiled code** (the feature is the student's); the K8 sentence is in a `markdown` fence so the student copies it into `spec.md`.
2. **The reader claim „ta klasa nigdy nie widziała” (completion mode) was cut** after `check:content` — the survey says 6 of 12 have used Copilot; the sentence now speaks of the industry's three years on that layer.
3. **Section „Tryb 3” was extended** (the message is the K8 sentence and nothing else, and why) after the checker reported it under 90 words.
4. The class table is described as counts on the board; the lesson says so and the exercises never ask for it in a repository (Article IV).
5. No `## Źródła`: the lesson's only external facts are 1b's dates and 1c's RCT, recalled by link (ADR-0008 — no new evidence claim).
