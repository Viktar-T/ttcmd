# how-to-run-a-slice.md

The operating manual: where to sit, what to type, and what to do between steps.

`constitution.md` says *what* the rules are and `AGENTS.md` says *how an agent
works here*. Neither says how **you** run a day. This does.

---

## The shape of a slice, on one screen

```
0.  chore      commit whatever is pending, so the slice starts from a clean tree
1.  SPEC       Claude Code session 1  →  interview → spec.md → agent stops
       ↓       YOU read it, edit it by hand, mark it accepted
2.  PLAN       Claude Code session 2  →  plan.md → agent stops
       ↓       YOU read it, edit it, mark it accepted
3.  TASKS      Claude Code session 3  →  tasks.md → agent stops
       ↓       YOU read it, resize anything too big
4.  EXECUTE    sessions 4…n  →  one task, one check, one commit, stop
       ↓       YOU watch the check output, not the prose
5.  CLOSE      fresh-context review against the acceptance criteria
       ↓       fix real gaps, check the last box, push
6.  JOURNAL    you, alone, ten minutes
```

**Every arrow is a `/clear` and a new session.** That is not ceremony. A fresh
session has never seen the conversation that produced the spec, so it can only
work from what is written down — which is the only honest test of whether the
spec is any good.

## Where to sit

| Tool to use                         | For                                                                                                                                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Claude Code, in `D:\code\ttcmd`** | Everything in the loop above. Specs, plans, tasks, code, commits.                                                                                                              |
| **Cowork (the desktop chat)**       | Thinking before the loop: research, reading other sites, comparing options, drafting `docs/` and ADRs, arguing about a decision. Anything needing the web or a second opinion. |

Rule of thumb: **if it produces a commit in this repo, it happens in Claude
Code.** If it produces a decision, it can happen anywhere, but it ends up in
`docs/`.

Do **not** run `/init` in Claude Code. It generates a `CLAUDE.md` and would
overwrite the one this repo already has.

## Keep the prompts thin

The prompts below deliberately do **not** restate the rules — they don't say
"end the spec with acceptance criteria" or "one commit per task", even though
both are required.

That is on purpose. `constitution.md` and `AGENTS.md` exist so the agent already
knows. A prompt that repeats them will appear to work even when the files are
being ignored, and you will not find out until a session where you forgot to
repeat them. **Let the files do their job, and note it in the journal when they
fail.** That failure is information you are paying for.

---

## 0. Start clean

```
git status
```

Uncommitted work from before the slice gets committed first, in its own lane
(`chore:`, `content:`, or `docs:`). A slice that begins on a dirty tree cannot
produce a readable diff at step 5.

## 1. SPEC — session 1

New Claude Code session, in the repo. Paste:

**Use the prompt from that slice's entry in `docs/roadmap.md`.** Each one is
already written, with its reads, its scope and its exclusions.

The shape is always the same:

```
Read in full, in this order:
- constitution.md
- AGENTS.md
- <whatever this slice is about>

Slice NNN-<slug>.

Scope: <one or two sentences>

Out of scope: <the things it must not grow into>

Decide everything else yourself, per AGENTS.md §4 — and ask nothing unless it
clears the escalation bar there.
Record each decision in the spec's "Decisions taken" section, one line each,
naming the alternative you rejected.

Then write specs/NNN-<slug>/spec.md and STOP.
No plan.md, no tasks.md, no code.
```

**You make the general decisions; the agent makes the rest.** That division is
defined once in `AGENTS.md` §4, not repeated per prompt. The agent decides
libraries, layout, naming, sizes, defaults — anything reversible in a commit —
and escalates only what is irreversible, what touches students or the school,
what would need the constitution amended, or what you will have a taste about.

Most slices should therefore ask you **nothing**. If a spec session asks five
questions, either the slice is genuinely strategic or the documents have a hole
in them — and finding out which is worth a journal line.

**Then you.** Open `spec.md`. Read `## Decisions taken` first — that is where
the agent's judgement is, one line per decision with the alternative it
rejected. Veto what you disagree with; that is faster than being asked, and it
leaves a record of what was chosen rather than only what was built.

Then edit the rest by hand. This is the step where you learn the most, and the
one you will be tempted to skip.

Read it as an adversary. Is there anything in the *What* that names a file, a
library or a component? That has leaked from the plan — cut it. Is every
acceptance criterion something a person could check and get the same answer as
you? "Looks good" is not a criterion; "`npm run build` exits 0" is. Is the *Out
of scope* list honest, or does it quietly leave room?

When you are happy, change `Status:` to `accepted`.

## 2. PLAN — session 2

`/clear`, or start a new session. Paste:

```
Read in full: constitution.md, AGENTS.md, specs/NNN-<slug>/spec.md.
Then read the existing code this slice will touch.
Then read any ADR the spec refers to, for concrete values.

Write specs/NNN-<slug>/plan.md and STOP.
No tasks.md. No code.
```

**Then you.** Does the plan re-argue *why* the feature is wanted? Cut it — that
belongs to the spec. Does it name every file it will create or change? It
should. Does it silently add a dependency? That needs an ADR first.

Mark it `accepted`.

## 3. TASKS — session 3

`/clear`. Paste:

```
Read in full: constitution.md, AGENTS.md,
specs/NNN-<slug>/spec.md and specs/NNN-<slug>/plan.md.

Write specs/NNN-<slug>/tasks.md and STOP. No code.
```

**Then you.** One question per task: *could I check this off without arguing
with anyone?* If not, it is not a task yet. And: is any task bigger than one
commit? Split it. Ten small tasks beat four vague ones.

## 4. EXECUTE — sessions 4 onwards

`/clear`. Paste:

```
Read in full: constitution.md, AGENTS.md, and
specs/NNN-<slug>/spec.md, plan.md, tasks.md.

Do T01 only. Run its check and show me the command and its output.
Commit it. Then stop and wait for me.
```

Then, for each task after that:

```
Do T02. Same rules: run the check, show the output, commit, stop.
```

**Then you — and this is the whole job:** read the *check output*, not the
explanation. An agent describing why something works is not evidence. The
command and its result are.

`/clear` every three or four tasks, or whenever the session starts feeling
heavy. Re-paste the read-in-full line; it is cheap.

## 5. CLOSE

`/clear`. Paste:

```
Read constitution.md, AGENTS.md, and specs/NNN-<slug>/spec.md.

Use a subagent with fresh context to review the complete diff of this slice
against spec.md's acceptance criteria — every criterion met, and nothing
outside the slice's scope touched. Tell it to report only gaps that affect
correctness or an acceptance criterion, not style preferences.

Report what it found. Fix nothing yet.
```

A reviewer asked to find gaps will usually find some, because that is what it
was asked to do. **Fix what affects a criterion. Write the rest down and leave
it.** Chasing every finding is how a clean slice grows a second, unspecified one
inside it.

Then check the final box, commit, and `git push`.

## 6. JOURNAL — you, alone

`docs/sdd-journal.md`, ten minutes, same day. Not tomorrow — the useful part
evaporates fastest.

An agent may append facts under *Agent notes*. The reflection sections are
yours, and they are the only thing in this repository that could not be
reconstructed from the repository. That is the entire reason ttcmd is being
built this way.

---

## When it goes wrong

| Symptom | Do this |
| --- | --- |
| You have corrected the same thing twice and it is still wrong | Stop. `/clear`. Write a better opening prompt using what you just learned. A clean session with a good prompt beats a long one full of failed attempts. |
| The agent wrote `plan.md` when you asked for `spec.md` | Delete it, re-run the step, and put a line in the journal. It means `AGENTS.md` §2 is not landing. |
| A task cannot be checked off objectively | The spec was too vague. Fix the spec, not the task. |
| A content commit wants to touch `app/` or `lib/` | That is the boundary doing its job (ADR-0004). Stop the lesson, open a slice. |
| The build passes but the page is wrong | You are missing a check. Add one to the acceptance criteria before continuing. |
| Two sessions both want the next ADR number | The later file renumbers, records the rename in its own header, and leaves old commit messages alone (`AGENTS.md` §6). |

---

## Right now: slice 003

Ready to run. Both prerequisites are closed — typefaces in ADR-0005, palette in
ADR-0007 — and nothing on the open-questions list blocks it.

**Step 0.** `git status`, commit what is pending.

**Step 1**, paste this:

```
Read in full, in this order:
- constitution.md
- AGENTS.md
- docs/roadmap.md
- docs/design-reference.md
- docs/adr/0005-typefaces-and-polish-diacritics.md
- docs/adr/0007-theme-default-and-accent.md

We are starting slice 003-type-and-theme.

Scope, from the roadmap: the two typefaces, the monospace-for-structure /
sans-for-prose split, every colour as a token, and the light/dark toggle with
dark as the default. No components, no navigation, no content.

Do not write any file yet, and do not write code.

Interview me using AskUserQuestion. Ask what is in scope, what is deliberately
out, what "done" looks like, and the things I have not thought about. Dig into
the hard trade-offs; skip the obvious questions.

Then write specs/003-type-and-theme/spec.md and STOP.
Do not write plan.md, do not write tasks.md, do not write code.
```

**Two things to make sure survive into the acceptance criteria** — they are the
ones most likely to be lost, and both are already required by the constitution:

1. The font configuration declares `subsets: ['latin', 'latin-ext']`, and a
   check **fails the build** if it does not. Without `latin-ext`, `ó` renders and
   `ł` silently does not (Article III, ADR-0005).
2. The pangram **`Zażółć gęślą jaźń — ĄĆĘŁŃÓŚŹŻ ążćęłńóśź`** renders correctly
   in both faces, at heading and at body size, in both themes — verified by
   looking at it.

If the interview does not raise them, raise them yourself. If it does, the files
are working.
