# Architecture — what ttc2026 is and how it works

| | |
| --- | --- |
| Written | 2026-09-01, from the discussions of the same day |
| For | Viktar — the plain-language picture of what is being built. Specs decide details; this file decides shape |
| Status | Working note. Revised when a slice changes the shape; the constitution's articles outrank it |
| Context | GitHub Classroom retired 2026-08-28 ([announcement](https://github.com/orgs/community/discussions/205975)); the „no platform” variant was chosen over Codio and [Classroom 50](https://github.com/foundation50/classroom50/) |

## The idea in one paragraph

Students build each assignment in a repo on their own GitHub account, named
by a published convention (every student has a `pierwsze-okno`). This tool,
running only on your machine, visits those repos, establishes **facts**
(does it build, is `bin/` committed, how does the history look), asks
Claude for short **feedback** against the assignment's rubric, and shows
you everything in a local web app — one table per assignment, one page per
student. You read, spot-check, and hand feedback back in class. Grades
never enter the system.

## Why a local web app, and why Next.js

The checking pipeline needs a machine that can run `git`, `gh`,
`dotnet build` and the `claude` CLI — that is your computer, not a browser.
A React UI alone cannot do any of that, so the app is **Next.js (App
Router)**: one process, started with `npm run dev`, where the React pages
are the UI and the server side executes the pipeline and reads/writes the
state files. Rejected alternatives: a separate Vite frontend + Node backend
(two processes to wire and keep alive for no gain at this size), and a pure
CLI with Markdown reports (works, but a table of sixty rows with drill-down
is exactly what a browser is for). Next.js is also the stack you already
maintain in ttcmd — one set of habits, two repos.

The app is **never deployed**. `localhost` is the product.

## The flow, per assignment

```
you publish the zadanie on ttcmd (as always)
students push to their own repos                (nothing new for them)
        │
you open the app  →  pick the assignment  →  „Uruchom sprawdzanie”
        │
   1 resolve    roster (logins) + naming convention (+ overrides) → repo URLs
   2 fetch      clone into work/ or pull, per student, shallow
   3 checks     deterministic: build, hygiene, history → facts (JSON)
   4 review     claude -p, rubric-driven → feedback (Polish) + flags
   5 persist    results JSON per run + a Markdown report per group
        │
you read the results in the app, spot-check, decide what reaches whom
grades happen offline, outside this tool
```

Steps 1–3 need no AI and no judgement; they run on every push of the
button. Step 4 runs only for repos that changed since the last run
(resumability, Article VII) — which is also what keeps it inside a Claude
Max subscription's limits: sequential, skippable, interruptible.

## The screens

- **Zadania** — the assignments, each with its group summary: how many
  repos reachable, building, checked, when last run.
- **Zadanie** — the heart: one row per student (login, build status, check
  results as compact pass/fail cells, commit count, last activity, one-line
  AI note), sortable, with a link to the repo.
- **Uczeń × zadanie** — the drill-down: every check with its evidence, the
  full AI feedback (the Polish paragraph you may read out or forward), the
  flags, the history summary.
- **Przebieg** — the run in progress: which repo is being processed, what
  is skipped as unchanged, where it stopped if interrupted, a resume
  button.

Nothing here is a dashboard for students; no screen is reachable from
outside your machine.

## What is a file, and where

| Thing | Form | Committed? |
| --- | --- | --- |
| Roster | `roster/group-a.csv` — GitHub logins, nothing else | yes |
| Exceptions | `roster/overrides.csv` — login, assignment, actual repo name | yes |
| Assignment | `assignments/<id>/assignment.yaml` — repo name, deadline placeholder, which checks apply, N commits expected | yes |
| Rubric | `assignments/<id>/rubric.md` — what the task promised, in the words of the published zadanie; the core of the AI prompt | yes |
| Run state | `state/<id>.json` — last-checked SHA per login | yes |
| Results | `reports/<id>/<date>-<group>.md` (+ JSON the UI reads) | yes |
| Cloned repos | `work/…` | **no** — disposable |

Committing state and reports *is* the backup strategy (Article VI). The
repo stays private, and even so carries logins only — never names, never
grades (Article IV).

## The two output contracts

**A check returns a fact:** `{name, status: pass|fail|skip, evidence}`.
The v0.1 set: repo reachable · clone/pull OK · `dotnet build` succeeds ·
no `bin/`/`obj/` tracked · `.gitignore` present · ≥ N commits · commit
messages non-trivial (heuristic) · last commit vs deadline placeholder.

**The AI review returns feedback, never a grade:** 3–5 sentences to the
student in Polish (what works, what to look at, one question worth
asking), one line to you in English, and flags from a fixed vocabulary
(`nie-buduje`, `rozjazd-z-zadaniem`, `podejrzanie-duzy-commit`, …). Its
input is bounded: the rubric, `git log --oneline`, source files only, with
per-file and per-repo size caps.

## Stages

| Stage | What exists | Roadmap slices |
| --- | --- | --- |
| **v0.1** | The loop above, end to end, with fixtures and dry-run; UI shows results | 001–006 |
| v0.2 | A copyable GitHub Actions workflow for student repos — instant red/green for them on push; optional per assignment | 007 |
| v0.3 | Forwarding AI feedback into a student's repo as an issue — teacher-approved per batch, never automatic; needs an ADR first | not scheduled |

## The boundaries that keep this honest

Feedback is not a grade, and the tool holds no grades at all. Nothing is
auto-posted. Students never interact with the tool. Real student repos are
touched only by you, on purpose — every slice develops and verifies against
committed fake fixtures. And one question is answered with the school
before the first real run: whether sending student code to the model under
your account needs consent — the same family as ttcmd's open decision #2.
