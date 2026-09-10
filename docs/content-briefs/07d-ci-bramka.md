# Brief — 7d · CI: bramka, która nie przepuszcza zepsutego kodu

| | |
| --- | --- |
| Lesson | `content/moduly/07-testy-i-jakosc/ci-bramka.mdx` · `order: 4` · 3 h |
| Written | 2026-09-10, by write-lesson · approved: (blank) |
| Mode | semi-supervised |
| Research | `research-07-testy-jakosc-przeglad.md` §3.6 |
| Drafted | 2026-09-10 |

## Reader position

As 7c, plus: three buckets of review comments in `dziennik.md` and a working
test project. Runs `dotnet test` **on their own machine, when they remember to**.
Has pushed to GitHub since 0c; **has never seen a workflow run, a runner, or a
red tick.** *CI* was named once, in 1e, as a word in a list — this lesson is its
home. 8 of 12 have never had a GitHub project with history before this course.

## Carrying question

> Test działa, kiedy go uruchomisz. Co uruchomi go w środę o drugiej w nocy, i
> co się stanie, jeśli będzie czerwony?

## Anchor

**The student's own repository on GitHub**, and one file added to it:
`.github/workflows/ci.yml`. The anchor is watched changing state — first green,
then deliberately broken to red, then a merge that GitHub refuses.

## Shape

**Procedure with a narrative frame** (`docs/content-style.md`, three shapes): an
opening that says what problem the procedure solves, a scannable middle of
numbered steps with the common mistake named at each, one narrative section that
turns it into understanding — here „Bramka, która przepuszcza wszystko” — and an
ending that says what changed.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | You ran the tests because you remembered to. Name the day you will not remember | The repository, as it stands after 7b |
| 1 | Czym jest cudzy komputer, który buduje twój kod | The concept before the file: a machine that is not yours, checks out your repository, installs the SDK, runs your commands, reports one bit. Free on public repositories — with GitHub's own sentence quoted | Why the workflow must say the SDK version out loud |
| 2 | Dziewięć linijek | The file. `on`, `runs-on`, `checkout`, `setup-dotnet`, `build`, `test`. Where it lives. What each line does and what happens if it is missing | The YAML, typed, not generated |
| 3 | Pierwszy przebieg — i pierwsza porażka, która jest normalna | Push, watch it run, read the log. The three failures that hit almost everybody: wrong SDK version, a path that works on Windows and not on Linux, `bin/` committed | The run page, read to the end |
| 4 | Zepsuj to celowo | Revert the 7b repair on a branch, push, watch the tick go red — and see the failing test named in the log by somebody else's machine | The round trip fails again, publicly |
| 5 | Od czerwonego do „nie da się scalić” | The gate. Settings → Rules → Rulesets → new branch ruleset → Active → target the default branch → require the status check. Now red means the merge button is off | The pull request that cannot be merged |
| 6 | Bramka, która przepuszcza wszystko | The narrative section, and the lesson's real point. **Two documented ways a gate passes nothing:** a skipped job „will report its status as 'Success'”, and `dotnet test` returns 0 when it finds no tests at all. A green tick is evidence of what ran, not of what is true | Delete the test project on a branch and watch the gate stay green |
| 7 | GitHub's stale copy-paste | One short section on the fact that GitHub's own starter workflow still pins older action versions than the actions themselves ship. What to check, and how | The two version numbers, dated |
| 8 | Sprawdzenie, które nie zależy od twojej pamięci *(ending)* | Answers the opening in four decisions | |

## Owns · recalls · avoids

- **Owns:** *CI* (its home — 1e only named it), *workflow*, `.github/workflows`,
  *runner*, *przebieg (run)*, *zielony / czerwony status*, *ruleset*, *wymagany
  status*, *bramka*, and the rule **„zielone znaczy: to, co uruchomiono,
  przeszło”**.
- **Recalls:** `dotnet test` and the criterion (7b) · „zielone / czerwone” (7b) ·
  `.gitignore` (0c) · Linux and case-sensitive paths (2b/2c, in one clause) ·
  the round trip (7a).
- **Avoids:** matrices, caching, artifacts, `dotnet restore` as a separate step
  (implicit — research §3.6), deployment, releases, badges, secrets in Actions
  (7f), self-hosted runners, `dotnet format` unless the lesson runs short.

## Exercises

**One hand-in assignment.** Finished state: the repository has a workflow that
builds and tests on every push and pull request, a ruleset that makes the check
required on the default branch, and a history in which the tick was red at least
once.

Four conditions, all visible in the repository:

- `.github/workflows/ci.yml` exists and the **Actions tab shows at least one
  green run and at least one red one**, in that order or the other;
- the red run is a commit whose message says what was broken on purpose, and the
  repair that follows it is a separate commit;
- `dziennik.md` records: which of the three common failures hit you (or „żadna”),
  the two action version numbers you used **with the date you checked them**, and
  one sentence on what your green tick does **not** prove;
- the ruleset is on, and the pull request in which you saw the merge button
  disabled is still in the repository — **do not delete it.** A closed pull
  request is a record.

Then „Na koniec wypchnij wszystko.” and the standard hand-in sentence.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| „GitHub Actions usage is free for self-hosted runners and for public repositories that use standard GitHub-hosted runners.” | [docs.github.com](https://docs.github.com/en/billing/concepts/product-billing/github-actions) | checked 10.09.2026 | have |
| Workflows live in `.github/workflows` | [docs.github.com](https://docs.github.com/en/actions/tutorials/build-and-test-code/net) | checked 10.09.2026 | have |
| Current majors `actions/checkout@v7`, `actions/setup-dotnet@v6`, `'10.0.x'` | the actions' own repositories | checked 10.09.2026 | have — **release years unreadable (research §7); the lesson gives the tags and makes the re-check an exercise** |
| GitHub's starter workflow still pins v4/v4/8.0.x | [starter-workflows ci/dotnet.yml](https://raw.githubusercontent.com/actions/starter-workflows/main/ci/dotnet.yml) | checked 10.09.2026 | have |
| „A job that is skipped will report its status as 'Success'. It will not prevent a pull request from merging, even if it is a required check.” | [docs.github.com](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks) | checked 10.09.2026 | have |
| „When discovery finds no matching tests, the run prints a warning rather than an error and still returns `0` by default.” | [learn.microsoft.com](https://learn.microsoft.com/dotnet/core/tools/dotnet-test-vstest) | checked 10.09.2026 | have |
| Rulesets available on public repositories with GitHub Free | [docs.github.com](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository) | checked 10.09.2026 | have |
| `dotnet restore` is implicit | [learn.microsoft.com](https://learn.microsoft.com/dotnet/core/tools/dotnet-restore) | checked 10.09.2026 | have |
| **The exact ruleset checkbox label** | — | — | **GitHub's own docs give two different wordings** (research §7.5). The lesson gives the path and describes the rule, and does **not** print a label as if quoted |

## Reader assumptions to verify

- That lab machines can reach github.com and that pushes work from them (0c
  assumed it; **open decision #2** on accounts still applies).
- That the school network does not block the Actions UI.
- That a student's repository is **public**. A private one burns the 2 000 free
  minutes and the whole billing paragraph changes.

## Decisions

- **Nine lines, not GitHub's template.** Rejected: „use the starter workflow” —
  it is stale (verified) and a student who cannot read the file cannot debug it
  at step 3, which is where most of them will be.
- **No `dotnet restore` step.** It is implicit, and a line that does nothing
  visible is a line a student will cargo-cult for the rest of their life.
- **The „gate that passes nothing” section is the lesson, not a footnote.**
  Rejected: ending at the red tick. A gate the student believes in but has never
  seen fail open is worse than no gate — and both failure modes are documented,
  so this is evidence, not caution.
- **The version numbers are dated in the lesson and re-checked as an exercise**,
  per ADR-0008, because they will be wrong within months.

## Open questions for Viktar (≤ 3)

1. The ruleset step needs one screenshot to be usable in class, and the exact
   checkbox label must be read off the live UI (research §7.5). Do you want to
   take it, or should the lesson describe the path in prose only? The draft is
   written so it works without a picture.

## Deviations from the approved arc

- Drafted the same day as the brief, unapproved (module-level decision).
- The workflow YAML has not been executed on GitHub; it is assembled from the
  actions' own current documentation.
