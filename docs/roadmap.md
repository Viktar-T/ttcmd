# roadmap.md — ttcmd

What gets built, in what order, and what forces each step.

| | |
| --- | --- |
| Status | **Intention, not law.** Revised whenever reality disagrees. |
| Binding? | No. `constitution.md` is law; an accepted `spec.md` is a commitment; this file is a plan. |
| Scope | **The application.** Not the curriculum. |
| Owner | Viktar |
| Last revised | 2026-08-27 |

**The course plan does not live here.** Lesson plans, task sheets, the program
contract and anything student-facing belong in the vault (`30_work/TTC/`), per
that folder's own contract. This file only answers: *what must the app be able
to do, and when does teaching force it.*

---

## The rule that outranks everything else in this file

> **Content beats features.**
> An app with two beautiful modules and no lessons is a failure. A plain site
> carrying twelve real lessons is a success.

The predictable way this project fails is not technical. It is spending
September polishing the app because building software is more enjoyable than
writing lesson material — and arriving in November with an excellent platform
and nothing on it.

So, a standing commitment: **at most one app slice between real content
additions.** If two consecutive slices are both about the app, the next one is
content, whatever this roadmap says.

## Budget reality

This is priority 5 work. AgriRobot outranks it for deep-work blocks until its
wniosek is in or killed (`30_work/TTC/AGENTS.md`, rule 1), and the teaching load
itself is 8 h/week across two groups. Both groups get identical content, so the
app never models groups.

Therefore: **small slices, small windows.** A slice that cannot be specced,
planned and executed inside a few short sessions is too big and must be split.
Slice 001 was correctly sized. Keep that size.

---

## Where we are

- **001-skeleton** ✅ — module→lesson pipeline, Zod-validated, two placeholder modules, routes render. Not deployed. Not styled. No real content.

Everything below is a proposal.

## Phase 0 — Reachable

*Gate: a public URL exists that opens the placeholder site.*

**002-deploy.** The two things 001 explicitly deferred: connecting a Vercel
project, and deciding search-engine indexing while the content is still
placeholder. Small on purpose — a cheap second repetition of the loop is worth
more right now than an ambitious one.

Closing this also means filling the empty **Remote** row in the vault's
`ttcmd.md`, which is the one place the repo's existence is recorded outside this
disk.

## Phase 1 — Publishable

*Gate: a real lesson can be written, and reads well on a student's phone.*

The app currently cannot carry a programming lesson: no syntax highlighting, no
callouts, no task boxes, and nothing but default typography.

- **Authoring components.** Code blocks with a language tag, copy button, and a
  filename header — C# first, since that is the presumed teaching stack
  (Article VII), but the language must stay per-block metadata, never a global
  assumption. Plus the small set of MDX components a lesson actually needs:
  a callout, learning objectives, a task box, and a **copyable prompt block** —
  the last one matters more here than in an ordinary course, because prompts
  are artifacts students reuse rather than read.
- **Reading experience.** Module and lesson navigation, breadcrumbs,
  previous/next, and typography that survives a phone in a classroom. Legible,
  not designed.

Order between the two is decided by whichever is blocking the first real
lesson. Do not do both in one slice.

## Phase 2 — Sustainable

*Gate: adding a lesson is boring, and the site is the spine of the course rather than an accessory to it.*

Candidate slices, unnumbered because their order depends on what teaching turns
out to demand:

- **Task sheets as a first-class type.** The site is meant to carry *tasks*, not
  only lessons. A task has a different shape from a lesson — a goal, a
  deliverable, acceptance criteria, a definition of done. Whether that is a
  second content type or a section within a lesson is a real schema decision and
  deserves its own spec.
- **An authoring skill.** `.claude/skills/add-lesson/SKILL.md` so that adding a
  lesson is one invocation instead of a re-explained procedure. This is the
  payoff of `AGENTS.md` §10 — the procedure loads on demand instead of costing
  context on every request. Worth doing after roughly the third hand-written
  lesson, when the real procedure is known rather than guessed.
- **A syllabus / program page.** What the course covers, derived from lesson
  metadata rather than maintained by hand, so it cannot drift from reality.
- **Search.** Client-side, post-build. Worthless under ~15 lessons; obvious
  above ~30. Wait for the pain.

## Phase 3 — Gated

Not scheduled. Each needs something that does not exist yet.

| Candidate | Blocked on |
| --- | --- |
| Week / schedule view | A confirmed timetable. Article V forbids inventing one, and `week` stays optional metadata until the school supplies it. |
| Student project pages | An amendment to Article VI, which currently states the site does not host student work. Would need an ADR and a hard look at Article IV — student work means student names on a public site. |
| Progress tracking, submissions, accounts | An amendment to Article VIII (no backend in v1) **and** a privacy answer good enough for minors' data on a public deployment. Do not start this because it is technically interesting. |
| Publishing the SDD artifacts as course material | A deliberate reversal — the repo is currently *not* classroom material (Article II). If that changes, it changes on purpose, in an ADR. |

## Not doing

Recorded so it is not re-litigated:

- Multi-tenancy, other teachers, other schools, monetization — Article I.
- A design system. Legible beats designed, all year.
- A CMS. The content is MDX in git, and the build is the validator.
- CI-based AI code review. Nothing to gate yet; revisit if the repo gets
  contributors, which it currently does not have.
- Rebuilding anything kurs-arduino already solved, from memory. When a problem
  is one that repo already solved — MDX pipeline, sidebar, frontmatter schema —
  read how it did it before designing a new answer.

## External gates

Things this roadmap waits on, none of them the app's to decide:

| Gate | Owner | Blocks |
| --- | --- | --- |
| Official PL course title | The school | The `TO CONFIRM` markers in `README.md` and Article I |
| Tech stack confirmed with students | Viktar + students, opening weeks | Code examples; C# is presumed, not settled (Article VII) |
| Module structure of the course | Viktar, in the vault | Every real-content slice. **This is the true critical path — not the app.** |
| Timetable | The school | The week/schedule view, and nothing else |

## Maintaining this file

Revise it when a slice closes, when a gate opens, or when reality contradicts
it — and revise it *forward*. Do not quietly edit a past phase so it looks like
it went to plan; that is the same honesty rule the journal runs on, and a
roadmap that was never wrong is a roadmap nobody was using.
