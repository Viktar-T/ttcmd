# Brief — 2d · Git i GitHub w pracy z agentem

| | |
| --- | --- |
| Lesson | `content/moduly/02-warsztat/git-w-pracy-z-agentem.mdx` · `order: 4` |
| Written | 2026-09-01, by write-lesson · approved: **2026-09-01, by Viktar** |
| Mode | supervised (brief approved before drafting) |
| Research | `course-structure-v2.md` (2d row and the v2.3 changelog entry — the scope contract: 0c keeps its terms, nothing re-explained); corpus: 0c in full, 2c (the history this lesson reads), 1e (the unread-approval count) |
| Drafted | 2026-09-01 — deviations listed at the end |

## Reader position

Has read: 0a, 0c, module 1 intro, 1b–1h, 2a–2c. Can: the 0c minimum; has a
`pierwsze-okno/` repo with at least three commits (template, agent change,
hand change) and has read one small diff line by line (2c). Has never:
rejected an agent's change, undone a commit, used a branch for a real
purpose (0c exercise 4 created one, once), written a `.gitignore`. On the
1e card: a counted number of things approved without reading.

## Carrying question

Skoro część kodu pisze agent, skąd wiesz, co naprawdę się zmieniło — i jak
cofnąć to, na co nie było zgody, tanio i bez dramatu?

## Anchor

The `pierwsze-okno/` repo and its growing history. Every command in the
lesson runs on it: a diff read in two views, a bad change deliberately
invited and undone twice (before and after commit), an experiment branch, a
`.gitignore` that keeps the build out, the pushed result as the first entry
of the course portfolio.

## Shape

Hands-on. Command-heavy, but each round is concept → run on the anchor →
what to notice; the narrative spine is the 1e loan being repaid.

## Arc

| # | Heading (Polish, working) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | on your 1e card there is a number: things approved without reading — the loan; 2c showed the repayment (one diff, read); today the repayment becomes a system | the repo with 2c's history |
| 1 | Diff przed zgodą | the habit stated: nothing is accepted unread; the same diff in two doors — `git diff` in the terminal and the editor's diff view; recall 0c's history-as-control sentence, now practice, one clause | an agent change read in both views |
| 2 | Jedno zadanie, jeden commit | history that answers „co zrobił agent i kiedy”: one task, one commit, message rules recalled from 0c in one clause; `git log --oneline` as the story so far; forward, one clause: Moduł 4 makes this a formal discipline | the log of 2c read aloud |
| 3 | Cofanie jest nudne: restore i revert | undoing an agent's change as a cheap, boring operation: `git restore` (before commit), `git revert` (after); deliberately invite a bad change, reject it both ways | one restored file, one reverted commit visible in the log |
| 4 | Gałąź: poligon agenta | recall 0c's branch in one clause; the new consequence: a branch is where the agent may experiment without risking `main`; try, then merge or delete — both ends are cheap | an experiment branch with one agent change; kept or deleted by the diff's verdict |
| 5 | `.gitignore`: co wygenerował build | `bin/` and `obj/` appeared the moment 2c built — generated, big, nobody's work (recall 0c's never-list, one clause; recall *build*, 1d); write the two-line `.gitignore`, watch `git status` go quiet | the repo clean; `git status` empty after a build |
| 6 | (ending) Repozytorium jako portfolio | answers the opening: the history now says what the agent did, what you approved and what you undid; this repo is the first entry of the course's working portfolio — every Moduł 3 build lands beside it; the workshop of Moduł 2 is complete | the pushed, clean repo |

## Owns · recalls · avoids

- **Owns:** the commands `git diff`, `git restore`, `git revert` (proposed
  appendix row: „git diff / restore / revert → 2d”; the *concept* diff stays
  1d, all Git terms stay 0c — per the v2.3 scope contract).
- **Recalls:** 0c — branch, never-list, commit-message rule,
  history-as-control (link once, one clause each; nothing re-explained);
  diff first read (2c); the unread-approval count (1e card); *build* (1d).
- **Avoids:** pull request as a gate (Moduł 6 — 0c already points there;
  not re-opened); one-commit-per-task as formal SDD discipline (Moduł 4 —
  one forward clause only); merge conflicts (nothing shared yet — the
  branch section stays on the happy path); `git reset --hard` (dangerous in
  week 3; restore/revert cover every need the course has).

## Exercises

1. **Recall** — from memory: which command undoes an uncommitted change,
   which a committed one; the two folders that never enter the repo; the
   two doors to the same diff.
2. **Action on the anchor** — ask the agent for one change; read it in the
   terminal and in the editor view; reject it with `git restore`; write on
   the card how long the reading took.
3. **Build step** — the repo ends the module with: a committed
   `.gitignore`, one experiment branch (merged or deleted, stated why in
   the commit or the card), everything pushed, `git status` clean after
   `dotnet build`.
4. **Reflection** — reread your 1e card and its unread-approval count;
   write one sentence under it: what you would do differently now, and one
   thing you still accept without reading. Commit the card.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| `git restore` / `git revert` semantics | git-scm.com/docs | — | have — link at draft |
| `bin/`, `obj/` are build output | — | — | no source needed: observed in class on the anchor (concept, ADR-0008) |

## Reader assumptions to verify

- 2c ended with the repo pushed and ≥ 3 commits; the lesson opens with a
  one-line fallback for students behind (make two quick commits first).
- The editor diff view is available in both class tools (2a's tour showed
  it) — TO CONFIRM at install time with the tools as imaged.

## Decisions

- `restore` and `revert` only; `reset --hard` not taught — rejected: the
  „one command that fixes everything”, which also destroys uncommitted work
  and teaches fear instead of boredom.
- The bad change is deliberately invited from the agent, not staged by hand
  — rejected: a scripted broken file, which would be the course's first
  invented artifact; an agent asked for a deliberately wrong-headed change
  produces a real one.
- Branch section stays on the happy path (merge own fast-forward or
  delete); conflicts arrive when two people share history (Moduł 5 at the
  earliest) — rejected: conflict resolution now, on history nobody shares.
- The portfolio framing is one repo per build (2b's convention extended),
  not one portfolio repo — rejected: a monorepo portfolio, contradicting
  2b.

## Open questions for Viktar (≤ 3)

None.

## Deviations from the approved arc

- **Section 1 also names `git diff --staged`.** Not in the brief, and needed:
  an agent that has already run `git add` makes a plain `git diff` print
  nothing, which reads to a beginner as „there was no change”.
- **The `reset --hard` warning is sourced, not asserted** — git's own
  `git-revert` page carries it, and the lesson links there rather than making
  the claim on its own authority.
- **The never-list recall names the difference in reason.** `bin/` and `obj/`
  sit on the same list as passwords and keys for an entirely different reason
  (generated and worthless, not secret), and saying so keeps the list from
  reading as one undifferentiated prohibition.
- **The ending echoes the module introduction** („warsztat jest kompletny”,
  nothing new is added to it from here on), because 2d closes the module and
  not only the lesson.
- **A one-line fallback opens the lesson** for students whose 2c repository has
  no history yet, as the brief's reader assumption asked.
