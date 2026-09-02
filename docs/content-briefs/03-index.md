# Brief — Moduł 3 · Budujemy: pierwsze aplikacje

| | |
| --- | --- |
| Module | `content/moduly/03-budujemy/index.mdx` |
| Written | 2026-09-01, by write-lesson · approved: **not approved — autonomous run** |
| Mode | **autonomous** (AGENTS.md §2) — this brief and 03a–03d were written and drafted in one run on Viktar's request of 2026-09-01 („napisz moduł 3"), which is treated as approval of the v2 Moduł 3 *shape*, not of the briefs. Nothing here says „approved by Viktar"; the `## Decisions` sections are the review surface |
| Structure | `course-structure-v2.md` v2.3, Moduł 3 (26 h) |
| Research | `course-structure-v2.md`; `research-01` §2.5, §5, §6; primary sources found at drafting time (per lesson brief); `docs/learn-ai-codding/` used **only as a structure map** — see „Research gate" below |
| Drafted | 2026-09-01, revised the same day after a fresh-context review — deviations at the end |

## Research gate (write-lesson §3)

Case **2 + partial 1**. The module's concepts (statelessness, tokenisation,
context window, few-shot, rules files, hallucination) have no research file of
their own; `docs/learn-ai-codding/` covers the same ground but is a translated
third-party paid course (Evolution of Code / Lex Kartynnik) with relative
publication dates, no per-claim citations and a login wall. Under ADR-0008 and
`content-style.md` it **cannot be cited**. It was read as a map of what to
teach; every checkable claim in 03a–03d is re-sourced to a primary, dated
document, listed in each brief. The verification material of 3d comes from
`research-01` §5, which is stronger than anything in those notes.

Three errors in that corpus were found and are **not** carried into the
lessons: „the model truncates the beginning of the dialogue" (that is the
tool, not the model), „a token limit is why the model starts to hallucinate"
(conflates the hard limit with soft degradation), and prompt engineering
presented as the master skill (`research-01` §2.5 says the transferable skill
is judging the result).

## Reader position

Has read: 0a, 0c, 1b–1h, 2a–2d. Has done: the 25-minute 1e experiment with an
observation card; installed and signed into one of the two class editors;
one folder, one repository, SDK verified by command; `dotnet new avalonia.app`
run, an empty window on screen; one agent change of two lines, read as a diff
before accepting; `git diff`, `restore`, `revert`, a branch, `.gitignore`,
`push`. Has never: built a whole application of their own; held a session with
an agent long enough for it to degrade; written a prompt with a stated output
format; written a rules file; caught generated code that compiles and is
wrong; read someone else's generated code on purpose.

## The module's one argument

> The workshop is finished; from here you build. Three small desktop
> applications, one a week, each with an agent — and each chosen so that one
> concept becomes unavoidable in the week you need it. The minutnik is where
> the thread grows long enough that you find out the model has no memory. The
> notatnik is where the same request, asked four ways, puts four different
> files on the disk. The katalog is where you get tired of re-typing the
> same eight rules and write them down once. The fourth lesson has no new build:
> it takes the code the three weeks produced and asks the question the whole
> module has been circling — how do you tell code that is right from code
> that only looks right.

## One sentence per lesson

- **3a Budowa 1: co model naprawdę dostaje** — a Pomodoro timer with seven
  stated rules, long enough that around the fifth request the agent breaks one
  of them; the lesson explains why with what the model actually receives each
  turn — the whole thread, counted in tokens, inside a window that is a limit
  and not a memory.
- **3b Budowa 2: jak prosić, żeby dostać** — a notepad that saves to a file,
  built four times from the same task: without a format, with the format
  written out, with one example and with three; four files on the disk, side
  by side, and a fifth round in which the model improves the prompt itself.
- **3c Budowa 3: reguły zamiast powtarzania** — a catalogue of the student's own collection, three screens,
  where the conventions you re-typed in every session of the last two weeks go
  into one rules file that the tool re-sends for you; and why „paste
  everything in" is the answer that does not work.
- **3d Halucynacje, weryfikacja i pierwszy Rozbierz to** — no new build: a
  piece of code from your own repository that is fluent, plausible and wrong,
  the reason models guess rather than say „I don't know", the verification
  journal as a permanent file, and the first *Rozbierz to* on a classmate's
  work.

## Why this order

3a first because the concept it teaches is a precondition for the other two:
until you know that the whole thread is re-sent every turn, neither a prompt
technique nor a rules file has a mechanism to hang on. 3b second because once
you know *what* the model receives, the next question is what to put in it,
and a notepad is the smallest app whose output format is visible on disk. 3c
third because a rules file only pays for itself once there is something to
repeat — and after two builds there is. 3d last because it needs accumulated
code: verification practised on three weeks of your own output, and *Rozbierz
to* on a classmate's, is a different lesson from verification described.

## The module's rhythm (v2.3, „fixed segments")

Every build week carries the same three fixed segments, and they appear as
exercises, not as repeated sections: ten minutes of diff-reading, one change
made by hand without the agent, and one entry on the observation card. The
card is the one from 1e and stays a card until 3d names it *dziennik
weryfikacji* and moves it into the repository.

## Introduction shape

Four paragraphs. Where the reader starts (the workshop is complete and empty:
a repository, a window, no application). What the module answers (you can
build with an agent — what you cannot yet do is tell what the agent received,
what makes a request precise, where instructions live, and whether the result
is true). One sentence per lesson, in order. A last paragraph on the module's
rhythm and on the deliberately small size of the apps: each is finishable in a
week, and finishing is the point — the concept arrives because the build
forces it, not because a lesson announced it.

## Decisions

- **Module slug `03-budujemy`, lesson slugs exactly as the v2.3 table** —
  rejected: renaming the slugs after changing two of the three apps. The slugs
  name the concept (`budowa-1-prompt-token-okno`), not the app, which is
  precisely why they survive an app change. ADR-0003 identity stays untouched.
- **Two of the three placeholder apps replaced** (Viktar's answer of
  2026-09-01, „zaproponuj lepsze"). `stoper/licznik` → **minutnik pomodoro**,
  `konwerter jednostek` → **katalog własnego zbioru, trzy ekrany**; `notatnik z zapisem`
  kept but given a **stated save format**. Reason in one line each: a stopwatch
  is one prompt and sixty lines, so no thread ever grows long enough to
  degrade; a unit converter has no repeated conventions, so a rules file cannot
  pay for itself inside it; a notepad without a required format produces
  whatever the user typed, so nothing varies visibly between prompt rounds.
  Rejected: keeping the v2.3 names for continuity, which would have left three
  lessons whose central experience does not actually occur.
- **The apps are named in the lessons and in this brief, not in the module
  introduction's headline** — the introduction names them in the
  lesson-by-lesson paragraph only, so a later change of app costs one sentence.
- **No hours, weeks or dates in the introduction** (Article V; `week` stays
  empty metadata).
- **`docs/learn-ai-codding/` is not cited anywhere** — see the research gate.
- **Sound, animation, MVVM and data binding are out of scope for all three
  builds** — rejected: a Pomodoro with an audible signal, which needs an audio
  stack Avalonia does not ship, and would eat the week the concept is in. The
  end of a phase is signalled visually. Binding is deferred to Moduł 5 (5f),
  which the v2 table already owns.

## Open questions for Viktar (≤ 3)

1. **The tokenizer page for 3a must be allowlisted before the lesson runs**
   (v2.3 „Network allowlist" leaves the choice open). The lesson names
   `huggingface.co/spaces/Xenova/the-tokenizer-playground` — verified public,
   no account needed, as of 2026-09-01. Confirm this one, or name another, and
   have it allowlisted; without it, section 3 of 3a has no exercise.
2. **26 h across four lessons assumes ~8 h per build and ~2 h for 3d.** The
   three builds as specified are sized for that, but the katalog is the
   biggest; the lesson defines a three-screen minimum with the fourth screen
   as an extension. Confirm you are happy with „three screens is done".
3. **`Rozbierz to` gets its first outing in 3d** and the module is where the
   mechanic starts. The specimen there is written by the agent (deliberately
   defective Avalonia code). Confirm it should be a written specimen in the
   lesson rather than a live capture from the class's own repositories, which
   would be better teaching but cannot be written in advance.

## Deviations from the approved shape

- **A third app changed during drafting.** This brief proposed *fiszki* for 3c;
  the draft uses a **katalog własnego zbioru** instead. `Fiszki` is the
  application the 1d demo builds on the projector — `check:content` flags it as
  a story outside its home, the three demo repositories exist, and the demo
  prompt is printed in that lesson, so the „you will re-type the same
  conventions" premise of 3c could be skipped by pasting it.
- **The introduction settles what the observation card now is.** The brief did
  not say, and the closing review found the card homeless: it is now stated as
  a running log kept in one file from 1e onwards, replaced in 3d by a
  `dziennik.md` in each application's repository.
- **Appendix rows were added** to `docs/content-style.md` for every term 3a–3d
  own. `scripts/check-content-style.mjs` was **not** touched: it mirrors
  recurring *stories*, and this module introduces none that another lesson will
  re-tell. Moduł 2's missing rows are recorded there as a known gap.
- **The minutnik has seven rules, not six** — this brief said six in one place;
  03a and both drafts say seven.
