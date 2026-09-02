# content-briefs

One brief per lesson: the lesson's spec, written **before** the lesson and
approved by Viktar before a word of Polish is drafted. The idea is the repo's
own loop applied to content — spec → approve → implement → review — at the
size of half a page, because the cheapest moment to catch „this opens from
what the course said, not from what the student did” is before the lesson
exists.

| | |
| --- | --- |
| Written by | `.claude/skills/write-lesson` (new lesson) or reconstructed by `.claude/skills/revise-lesson` (existing lesson without one) |
| Approved by | Viktar — the `approved` field in the header; an unapproved brief is a proposal |
| Template | `.claude/skills/write-lesson/brief-template.md` |
| Language | English (Article III — repo-facing). Headings and quotations from the lesson stay Polish |
| Lane | `chore:` commits, separate from the lesson's `content:` commit |
| Never | student-facing; never carries a student's name or answer (Article IV) |

## Naming

`NNx-lesson-slug.md` — two-digit module number, lesson letter, the lesson's
slug: `02a-narzedzia-dwa-edytory.md`. A module introduction is `NN-index.md`.
The letter follows `order` in the frontmatter (ADR-0003); if a lesson is
reordered, the brief is renamed in the same commit.

A brief made stale by a course-structure revision is **marked superseded** in
its `Mode` field (naming the structure version that killed it) or deleted —
never left looking current. A fresh brief for the same slot starts from the
current `course-structure` version, not from the stale brief.

## What a brief contains

Reader position · carrying question · anchor · shape · arc (one line per
section: heading, move, how the anchor is used) · stories and terms owned,
recalled, avoided · the four exercises · claims that need a source · reader
assumptions to verify · decisions taken · open questions for Viktar (≤ 3) ·
deviations from the approved arc, filled in after drafting.

## Writing a module, step by step

The operator's manual: what Viktar types, what the agent does, where the
pauses are. One lesson per session (AGENTS.md §6); the whole module is a
sequence of short sessions, not one long one.

### Before the first session

1. **Settle the plan.** The module's lessons, order and jobs live in the
   current `docs/content-research/course-structure-v*.md`. If your picture
   of the module has changed, update that file first — briefs are derived
   from it, and a brief argued against a stale plan wastes the approval.
2. **Clear stale briefs.** Look in this folder for `NN*` files from an
   earlier structure version; mark them superseded or delete them.
3. **Check the facts exist.** Every number, date and claim in a lesson comes
   from a research file under `docs/content-research/` or a source found
   while drafting — never from memory. If the module's ground is not
   researched yet, research comes first (the `docs/_prompts/` pattern).
   The skill enforces this itself: its research gate stops at the brief and
   proposes a research prompt instead of drafting when neither a research
   file nor at-keyboard sourcing can carry the lesson's claims.
4. **Check the reader.** `docs/content-reader.md` should reflect what you
   currently know about the class — after the questionnaire, update it
   before writing, because every brief's first line is derived from it.

### Research: before or during?

You do not research by default — the skill's research gate decides, and every
brief names its case:

1. **A research file covers the lesson** → nothing extra; the brief cites it.
2. **The claims are a few volatile vendor facts** (a version, a menu path, a
   free tier) → found, dated and linked during drafting; no separate pass.
3. **The ground is unresearched** → the run ends at the brief and proposes a
   research prompt (`docs/_prompts/` pattern) for you to run first. A lesson
   is never drafted from memory (ADR-0008).

### Session A — the module introduction

5. In a fresh session, say: **„napisz moduł N”**. The `write-lesson` skill
   loads the reader file, the style guide, the module's row in the course
   structure and the research, then writes `NN-index.md` here — the module's
   one argument, one sentence per lesson, the order argued — and **stops**.
6. **Read the brief. Edit it or say what to change.** This is the module's
   cheapest correction point: cutting a lesson here costs a line, cutting it
   in week 12 costs a rewrite. When it says what you mean, say **approved**
   (the header records it).
7. Say **„draft it”**. The agent writes `content/moduly/NN-slug/index.mdx`
   in Polish, runs `npm run check:content` and `npm run build`, and reports
   the smells it kept and why. Read the text; hand-edit freely — it is your
   voice the guide encodes, not the agent's.

### Sessions B, C, … — one lesson each, in reading order

8. Say: **„napisz lekcję Na”** (e.g. „napisz lekcję 2a”). The skill writes
   the lesson's brief — reader position, carrying question, **anchor**,
   arc, exercises, claims needing sources, its open questions — and
   **stops**. A brief that cannot name its anchor says so; that is a finding
   about the plan, not a formality to wave through.
9. **Approve or edit the brief.** Answer its open questions; they are the
   three things the agent judged to be yours (AGENTS.md §4).
10. Say **„draft it”**. The lesson lands with `publish: false`, checks run,
    the report lists deviations from the arc. **Trap:** an unpublished
    lesson is invisible on localhost by design (slice 008) — review it in
    the file, or flip `publish` locally while reading and flip it back.
11. **Read as the student.** Hand-edit, or say **„popraw …”** — that
    triggers `revise-lesson`, which diagnoses first (reader test →
    structure → anchor → sources → language) and fixes only the findings
    you name.
12. **Publish and commit when satisfied:** remove `publish: false`; the
    lesson goes in a `content:` commit, the brief and any style-guide
    appendix rows in a separate `chore:` commit. Ask for the commit
    explicitly — the agent does not commit on its own.
13. Repeat for the next lesson. Write in reading order: each opening builds
    on the previous lesson's ending, so an out-of-order draft guesses at a
    text that does not exist yet.

### Closing the module

14. Re-read the introduction against the lessons as written — arcs drift;
    `revise-lesson` on the index catches the drift cheaply.
15. Run `npm run check:content` with no arguments and read the
    **cross-lesson** block: repeated headings, stories told outside their
    home. Check that new stories and terms got their appendix rows in
    `docs/content-style.md`.
16. Open the module on localhost and walk it once as a student: pager order,
    exercise numbers continuous across the module, every internal link
    resolving.
17. Push. Vercel rebuilds from `main`; the module is live.

### The one hard stop

If a lesson cannot be written without an application change — a component
that does not exist, a schema field, anything in `app/` or `lib/` — the
session stops and says so. That is the signal for a spec slice (Article IX,
ADR-0004), never a workaround in the content lane.

## Lifecycle of one brief

1. Drafted from the template, presented, **stopped on**.
2. Viktar edits or approves; the header records it.
3. The lesson is drafted against it; deviations are appended.
4. A later revision is checked against it; if the lesson has moved on
   purpose, the brief is updated in the same change, so the two never
   disagree silently.

Module 1 has no briefs except `01e-teraz-ty-pierwszy-agent.md`: the module
was written before this folder existed and is read in class as it stands. A
Module 1 lesson gets a brief the first time it is revised, reconstructed by
`revise-lesson`.
