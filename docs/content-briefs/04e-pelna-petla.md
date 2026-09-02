# Brief — 04e · Pełna pętla: notatnik od nowa

| | |
| --- | --- |
| Lesson | `content/moduly/04-specyfikacja/pelna-petla.mdx` · `order: 5` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** (see `04-index.md`) |
| Mode | autonomous (unapproved) |
| Research | `research-06` §2.1, §4.3 (evidence, fresh-context review, reviewer warning), §5.1–5.6; constitution Article IX („Done, per task”; „Done, per slice”) and AGENTS.md §2–§3 as the course's own working version of the same loop |
| Drafted | 2026-09-02 |

## Reader position

Has read 0a–0c, 1b–1h, 2a–2d, 3a–4d. Has: `notatnik-v2` with `konstytucja.md`, one
decision record, a `spec.md` reviewed by a classmate, and in `dziennik.md` a comparison of
the editor's plan with 4c's; the old notatnik repository with its history and `notatki.md`.
Can: run the fresh-session test; read a diff; revert an agent's change (2d); one commit per
task (2d, named); keep the journal. Has never: built an application from a written spec;
checked a finished program against a list of criteria with evidence; had a reviewer read a
diff against a spec.

## Carrying question

Does an application built from a specification differ from the same one built out of a
conversation — and how would you tell?

## Anchor

**`notatnik-v2`, from spec to a running app with `notatki.md` on the disk**, with the old
notatnik repository open beside it as the before-picture. Every section ends with a commit
in `notatnik-v2`; the last section puts the two repositories side by side.

## Shape

Hands-on / procedure with a narrative frame: the loop is run for real, stage by stage,
each stage a heading with what to do, what to notice and the common mistake; one narrative
section („Dwa notatniki obok siebie”) turns the procedure into understanding.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | two folders on the disk: the old notatnik's `git log` (rundy, „popraw”, „jeszcze raz”) and the new one's (two files, no code) → question | both histories, side by side |
| 1 | Najpierw dokończenie specyfikacji | the loop starts with the spec, not the code: close every „Do ustalenia” from the classmate's review, fix every leak; commit `spec: …`; the rule that a spec is edited before code changes, always | `spec.md`, second commit |
| 2 | Plan ze świeżej sesji | fresh session, only `konstytucja.md` and `spec.md` attached; ask for `plan.md`; read it against three questions (does it name every file it will create; does it re-argue why; does it break the constitution); when the plan asks a question, the answer goes into the spec, not the chat; commit | `plan.md` |
| 3 | Zadania i ich sprawdzenia | `tasks.md` from the plan, each task with „gotowe, gdy…” and a check the student can run; T01 is the template and its commit; the three fixed segments of Moduł 3 continue per task (diff reading, one change by hand, journal); commit | `tasks.md`, ~6–8 tasks |
| 4 | Wykonanie: jedno zadanie, jeden commit | the working rhythm: one task in the prompt, the diff read, the check run, the box ticked, the commit `T0n: …`; the three things that go wrong and what to do — the agent does more than the task (revert, re-ask with the task's boundary), a task is too big (split it — a new task appended, not silently inserted), the build teaches that the spec was wrong (edit the spec first, then continue) | tasks T02–T0n, one commit each |
| 5 | Sprawdzenie: każde kryterium z dowodem | go through the criteria one by one; evidence in `dziennik.md` — the command and what it returned, or the file's contents; then the review in a fresh context: a classmate or a fresh session gets the spec and the diff and reports gaps that affect the criteria, not style — with the warning that a reviewer asked for gaps will find some | the criteria list ticked, `dziennik.md` |
| 6 | Wariant awaryjny: ta sama specyfikacja, bez okna | the variation and the fallback: a console notatnik from the same `spec.md` (`dotnet new console`, same file, same criteria); what it proves (the spec named no *how*) and who it is for (students behind by mid-week finish the loop on the console version and it counts) | the same criteria checked on a different program |
| 7 | Dwa notatniki obok siebie | the narrative section: `git log --oneline` of both; two `notatki.md` files; what each repository says about what it should do; the honest comparison — the windows may look the same, the difference is what you can check and what survives; where the spec turned out wrong and how you found out | both repositories |
| 8 | Co się zmieniło | ending: the answer to the opening; the module's habit in four lines; next: ideas | — |

## Owns · recalls · avoids

- **Owns** (proposed appendix rows): „Done, per task: the check passed and the evidence is
  visible” in student Polish („gotowe, gdy sprawdzenie przeszło i widać dowód”); the
  fresh-context review of a diff against a spec; „spec is edited before code changes”; the
  console variant as the same-spec proof.
- **Recalls**: 4c's four files and two failure modes (one clause, link); 4b's constitution
  (one clause); 3c's fresh session (one clause); 2d's `restore` / `revert` and one task one
  commit (link); 3d's journal and „biegłość to nie poprawność” (one clause); 3b's
  newest-first bug as the criterion most likely to fail (link).
- **Avoids**: *test jednostkowy*, *TDD*, *CI*, *pokrycie testami* (Moduł 6) — the checks
  here are manual and said so, with one forward pointer „w module o testach zobaczysz, jak
  się je zapisuje tak, żeby wykonywały się same” (3d already used this pointer; keep it to
  one clause); tool names (4d) — this lesson is tool-neutral; any hour count.

## Exercises

1. Recall — the stages of the loop with the check at each; what „gotowe” means for a task
   and for the whole spec.
2. Action on the anchor — run every acceptance criterion against `notatnik-v2` and record
   the evidence for each in `dziennik.md`; mark any that fail (observable result: one
   journal entry per criterion, each with a command or a file excerpt).
3. Build step — finish `notatnik-v2`: every task ticked, one commit per task, spec
   corrected wherever the build proved it wrong, the review's gaps fixed; push. Students on
   the console variant push that; students who finish early apply the same loop to one
   feature of the katalog (a spec for search).
4. Reflection — one paragraph in `dziennik.md`: where the spec was wrong, how you found
   out, and what you would write differently next time; then the peer round — read a
   classmate's spec and their `notatki.md` and say whether the file matches the criteria.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| Anthropic: „Have Claude show evidence rather than asserting success”; a reviewer in a fresh context sees „only the diff and the criteria you give it”; „A reviewer prompted to find gaps will usually report some… Tell the reviewer to flag only gaps that affect correctness or the stated requirements” | [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) | checked 02.09.2026 | have |
| Anthropic: „start a fresh session to execute it” once the spec is complete | same | checked 02.09.2026 | have |

Everything else in this lesson is procedure and concept (ADR-0008: no citation needed).

## Reader assumptions to verify

- That a week (≈ 8 h) is enough for the notatnik-v2 loop with the criteria as sized in 4c;
  the console fallback is the safety valve (Viktar).
- That the class editors allow attaching only two files to a fresh session (they do — `@`
  references in both — but the wording „dołącz tylko dwa pliki” assumes it).

## Decisions

- **The lesson opens by revising the spec, not by generating the template** — rejected:
  „start building, fix the spec as you go”. Opening with the revision makes the rule „the
  spec is edited before code changes” a lived first step rather than a sentence.
- **The plan is written by the agent, from the two files, in a fresh session; the tasks are
  derived with the agent and edited by the student** — rejected: all by hand (4c decided
  this for the plan; the same reason holds).
- **The console variant is a section, not an aside** — rejected: a footnote. It is the
  proof of the module's central rule (no *how* in the spec) and the honest fallback for a
  third of the class.
- **Comparison is described, not scored** — rejected: a rubric. The apps may look the same;
  a rubric would pretend to measure what the lesson says cannot be seen from outside.
- **No `<Cytat>` blocks** — the two Anthropic sentences are paraphrased with a link at the
  point of use; the lesson is procedure and a block quote would break its scan.

## Open questions for Viktar (≤ 3)

1. None beyond the module's three.

## Deviations from the approved arc

- Drafted 2026-09-02; revised the same day after the fresh-context review.
- §1 is „Najpierw dokończenie specyfikacji”, not „poprawka”: 4c's exercise already had
  the student revise after the classmate's review, so the opening shows three commits
  (konstytucja i decyzja; specyfikacja; specyfikacja po przeglądzie) and §1 closes what
  „Do ustalenia” still holds — with the rule that no commit is made if nothing changed.
- The fresh-session question in §2 is a real gap in 4c's printed spec (a note with a title
  and no body), not one the spec already answers.
- The `dziennik.md` fragment's failing K4 now shows evidence that actually contradicts
  the criterion (list 5, file 6).
- „Siedem kryteriów” became „tyle kryteriów, ile ma twoja specyfikacja” and the exercise
  is „Dowód na każde kryterium” — students wrote their own criteria in 4c.
- The old notatnik's history is described only as far as 3b mandated it (`runda 1` …
  `runda 5`); invented commit messages removed. The format's origin agrees with 3b and 4b
  (settled in round 4, by three examples).
- Dates in the journal example are placeholders (`rrrr-mm-dd`), not a month (Article V).
- „Spec” alone in prose replaced by „specyfikacja” (H2 and ending bullet).
