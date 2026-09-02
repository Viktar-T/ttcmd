# Brief — 2b · Projekt, folder, repozytorium

| | |
| --- | --- |
| Lesson | `content/moduly/02-warsztat/projekt-folder-repo.mdx` · `order: 2` |
| Written | 2026-09-01, by write-lesson · approved: **2026-09-01, by Viktar** |
| Mode | supervised (brief approved before drafting) |
| Research | `course-structure-v2.md` (2b row; lab preparation: .NET SDK step, per-user traps); `research-02` §2.4 (.NET 10 LTS); corpus: 0c in full, 1e (where did the files go) |
| Drafted | 2026-09-01 — deviations listed at the end |

## Reader position

Has read: 0a, 0c, module 1 intro, 1b–1h, 2a. Can: the 0c Git minimum; can
open both class editors and knows where their output lands (2a). Has never:
organised a project folder deliberately, decided where a project lives,
checked what is installed on a machine with a command. In 1e files landed
wherever the tool put them — most students could not find them today.

## Carrying question

Gdzie mieszka projekt — tak, żeby ani ty, ani agent, ani wspólny komputer w
pracowni nigdy nie musieli zgadywać?

## Anchor

The folder-and-repository that will hold the first window: `pierwsze-okno/`
— created this lesson, empty but real (a README, a first commit, a push, a
verified SDK), handed to 2c as its starting point. The running example is
the folder itself, growing from nothing to a versioned, verified project
home.

## Shape

Hands-on. Every section ends with a command run in this folder and its
output read.

## Arc

| # | Heading (Polish, working) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | in 1e the agent created files — can you find them today? the cost of „gdzieś” | the hunt for last week's files fails or embarrasses |
| 1 | Jeden folder, jeden projekt | the convention and its two whys: the agent treats the project folder as its whole world (co jest w folderze, to agent widzi — plain words, no context vocabulary), and two groups share these machines; where projects live on the lab disk | `pierwsze-okno/` created in the agreed place |
| 2 | Repozytorium od pierwszego dnia | 0c applied, not re-taught: repo + clone, README, first commit, push; why day one and not „kiedy będzie co pokazać” — recall 0c's sentence about history as a control tool, now about to become real; recall the never-list in one clause (build folders return in 2d) | the folder becomes a repo; commit 1 |
| 3 | SDK — narzędzia, którymi buduje się programy | own the term (plain gloss + the concrete instance: .NET SDK builds C# programs); the habit the whole module runs on: a claim about the environment is **checked with a command, never believed**; `dotnet --list-sdks`, reading its output; terminal named formally (to konsola, którą już znasz) | the command runs inside `pierwsze-okno/`; output copied into the README |
| 4 | (ending) Pusty, ale prawdziwy | answers the opening: an empty folder that is versioned, published and verified is a workbench, not nothing; what 2c puts on it (a window) | the repo pushed; `git status` clean |

## Owns · recalls · avoids

- **Owns:** *SDK* (formally; old home 1a is outside the content pipeline —
  proposed appendix row: „SDK → 2b”). *Terminal* (named once, glossed as the
  konsola the reader knows — proposed appendix row: „terminal → 2b”). The
  „sprawdzone komendą, nie uwierzone” habit (practice, not a term — no row).
- **Recalls:** 0c commands and the never-list (link, one clause each — v2:
  0c keeps every term it owns); history-as-control (0c's own sentence);
  where each editor puts files (2a, one clause).
- **Avoids:** okno kontekstu and „kontekst projektu” (homes 3a/3c) — plain
  words only; `.gitignore` mechanics (2d); `dotnet new` (2c).

## Exercises

1. **Recall** — from memory: the one-folder-one-project rule and its two
   reasons; what SDK means; the command that proves an SDK is present.
2. **Action on the anchor** — run `dotnet --list-sdks` at your station; if
   you have a computer at home, run it there too and bring both outputs —
   a claim next to a check.
3. **Build step** — `pierwsze-okno/` exists in the agreed place, is a repo
   on GitHub with a one-sentence README saying what it will become, and is
   pushed. This repo is where 2c starts.
4. **Research** — on the official .NET support page, find what LTS means
   and until when .NET 10 is supported; write both down with today's date.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| .NET 10 is the current LTS, supported three years | dotnet.microsoft.com support policy | — | have (research-02 §2.4) — re-check and date at draft time |
| `dotnet --list-sdks` lists installed SDKs | learn.microsoft.com dotnet CLI docs | — | to find (link at draft time) |

## Reader assumptions to verify

- The lab is imaged per the v2 install list: SDK 10 present, standard
  (non-admin) accounts, per-user NuGet cache warmed (#1).
- There is an agreed place on the lab disk where a student's projects live
  and survive between lessons (profile? disk policy?) — **the lesson needs
  one concrete path sentence from Viktar** (institutional fact, Article V:
  nothing invented).

## Decisions

- One repository **per project**, not one course-wide repo; the 0c personal
  repo stays for cards and notes — rejected: a single course repo, which
  grows unreadable, muddles `.gitignore` teaching and makes „agent widzi
  folder projektu” false.
- The project is named `pierwsze-okno` in the lesson, so 2c/2d prose can
  refer to it by name — rejected: free naming, which costs every later
  lesson a clause of „w twoim folderze, jakkolwiek go nazwałeś”.
- The SDK section verifies; it does not install (no admin rights; install
  is lab prep) — rejected: an installation walkthrough, which fails on
  standard accounts and belongs to 0b/lab prep.

## Open questions for Viktar (≤ 3)

None blocking the arc. The lab-disk path (assumption above) can be a single
sentence supplied at draft review.

## Deviations from the approved arc

- **No lab-disk path is written** (Article V). Section 1 says the path is
  settled in class and tells the student to write it down and keep to it. The
  brief's reader assumption stands unanswered; one sentence from Viktar turns
  it into a concrete instruction.
- **Section 2 follows 0c's clone-first path** (repo on GitHub → `clone` →
  README → `commit` → `push`) rather than `git init`, so the lesson introduces
  no Git command 0c does not already own — which is the scope contract v2.3
  set for 2d and applies here just as well.
- **The .NET 10 claim is dated, not just named.** The support-policy page gives
  LTS = three years, .NET 10 released 11.11.2025, supported to 14.11.2028; the
  lesson uses those three facts and says that the last one is the only reason
  this version matters to the course.
- **The never-list recall points forward to 2d** for build folders, one clause,
  as the brief planned — and 2c is written so those folders are never actually
  committed, which is what makes 2d's `.gitignore` section honest.
