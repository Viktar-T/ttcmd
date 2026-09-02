# Prompt — Bootstrap the assignment-checking repo (`course-checks`)

| | |
| --- | --- |
| Written | 2026-09-01 |
| Kind | **Bootstrap brief.** One single-shot prompt, meant to be pasted whole into a fresh Claude Code session in a **new, empty, private repository** — not into ttcmd |
| Reads | Nothing outside the new repo. The prompt is self-contained; the design it implements is `docs/assignment-checking.md` in ttcmd, summarised inside |
| Produces | The v0.1 scaffold of the checking system: layout, schemas with fake sample data, the batch runner, one example rubric, README |
| Run it in | Claude Code, on Viktar's machine (Windows), in the empty repo. `git`, `gh` (authenticated), `dotnet` SDK and the `claude` CLI must be on PATH |

## Run log

| Run | Date | Result | Notes |
| --- | --- | --- | --- |
| — | | | |

---

## The prompt

```text
You are bootstrapping a small, private tool repository. Read all of this
before writing anything.

## Who and what this is for

I am a secondary-school teacher (technikum, Poland). Two groups of ~30
students, 4th year, course "Aplikacje desktopowe i mobilne". Students build
small C#/.NET desktop apps with AI agents, each assignment in a repo on the
student's own GitHub account, named by a convention I publish (e.g. every
student has a repo `pierwsze-okno`). I need to check their work without a
platform: GitHub Classroom was retired on 2026-08-28 and I chose plain
GitHub + a local batch script over adopting a replacement.

This repo — call the system "course-checks" — is that tool. It runs only on
my machine (Windows). It is PRIVATE and it is not part of my course website.

## The system in one picture

  roster (logins per group) + assignment definition (repo name, rubric)
      -> resolve each student's clone URL by convention (+ overrides file)
      -> clone or pull each repo (shallow)
      -> deterministic checks per repo -> facts as JSON
      -> AI review per repo (claude CLI, headless) -> short Polish feedback
      -> one Markdown report per group per run, for me only

## Hard rules — never violate these

1. AI output is FEEDBACK, never a grade: no points, no marks, no ranking,
   no pass/fail verdicts. Deterministic checks state facts; the AI review
   is 3-5 sentences to the student (in Polish: what works, what to look at,
   one question worth asking), one line to me (in English), and flags from
   a fixed vocabulary (e.g. nie-buduje, rozjazd-z-zadaniem,
   podejrzanie-duzy-commit).
2. Data minimisation: GitHub logins only. No student names, e-mails,
   grades, attendance — not in code, not in sample data, not in reports.
   All sample/fixture data is obviously fake (logins like "student-01").
3. Nothing is ever auto-posted to student repos. v0.1 writes local reports
   only.
4. No server, no database, no web app, no cloud function. Files in this
   repo are the whole state.
5. Do not invent institutional facts (deadlines, group names, timetable).
   Those are config values I will fill in; ship them as clearly marked
   placeholders.

## Technical guardrails

- Python 3.12+, standard library only (subprocess to git/gh/dotnet/claude).
  No pip dependencies in v0.1. Must run on Windows; do not use bash-isms.
- The AI step calls the claude CLI non-interactively (claude -p) with a
  prompt assembled from the assignment's rubric.md, `git log --oneline`,
  and the repo's source files (source files only; skip bin/, obj/, and any
  file over a size cap; cap total context per repo). Model is a CLI flag
  with a sensible default, never hardcoded in logic.
- Resumable and cheap by design: store the last-checked commit SHA per
  (assignment, login); skip repos unchanged since the last run; on any
  failure or rate limit, record progress and exit cleanly so a re-run
  continues where it stopped. Process repos sequentially.
- A student repo may be public or private-with-me-as-collaborator; handle
  both, and report "unreachable" as a check result, not a crash.

## Repository layout to create

  README.md                    what this is, how to run, the hard rules above
  roster/group-a.csv           header + 3 fake logins
  roster/group-b.csv           same
  roster/overrides.csv         login,assignment_id,repo_name (empty + header)
  assignments/pierwsze-okno/
    assignment.yaml            id, repo_name, deadline placeholder, checks on/off
    rubric.md                  EXAMPLE rubric for a first Avalonia window app:
                               what the task promised, in plain Polish
  src/                         the runner (entry point: check.py)
  reports/                     .gitkeep; runs write
                               reports/<assignment>/<yyyy-mm-dd>-<group>.md
  state/                       .gitkeep; last-checked SHAs live here (JSON)
  .gitignore                   cloned student repos (work/ dir), state/? no —
                               state IS committed; ignore work/ and caches

## Deterministic checks, v0.1

repo reachable · clone/pull OK · `dotnet build` succeeds · no bin/ or obj/
tracked in git · .gitignore present · commit count >= N (from
assignment.yaml) · commit messages non-trivial (heuristic list: fix,
update, zmiany, wip...) · last commit date vs deadline placeholder. Each
check returns {name, status: pass|fail|skip, evidence}.

## How to work

1. First reply: a short plan — file list and the order you will build in,
   plus any question that genuinely blocks you (max 3; prefer deciding and
   noting the decision in README under "Decisions").
2. Then build in small, verifiable steps, one commit per step, imperative
   English commit messages.
3. Verify as you go: the runner must work end-to-end against a --dry-run
   mode that uses two local fixture repos you create under fixtures/ (one
   that passes checks, one that fails several), so the whole pipeline —
   including report generation — is demonstrable without network and
   without spending AI calls (mock the claude step in --dry-run).
4. Definition of done for this session: `python src/check.py pierwsze-okno
   --group a --dry-run` produces a readable report in reports/, README
   documents real usage, and `python src/check.py --help` explains every
   flag. Show me the dry-run report at the end.

Out of scope for v0.1 (do not build): GitHub Actions templates, posting
comments/issues, plagiarism detection, any UI, any notion of grades.
```
