# ADR-0014 — The site models teaching groups, on one page

- **Date:** 2026-09-10
- **Status:** accepted (2026-09-10, Viktar)
- **Amends:** `constitution.md`, Article I and Article VI. Settles two facts
  Article V holds open.
- **Decision by:** Viktar — Article X, and AGENTS.md §4: it is about students
  and the school, it is published under his name, and a committed group code
  cannot be taken back.
- **Unblocks:** slice 016, the progress page at `/postep`

## Context

Article I describes the course as *"8 h/week, two groups"*. It was ratified on
2026-08-27, five days before the course began. The course as actually taught is
**four groups, two hours a week with each**. Four times two is eight, so the
eight hours were right and only the count of groups was wrong. The article is
stale, not mistaken in principle.

Article VI carries the bullet:

> **Both groups get identical content.** The site does not model groups.

Two claims in one line, and only the second is under pressure. The first holds
and this ADR strengthens it: every group gets the same lessons, the same
exercises, the same pages, and nothing proposed here varies content by group.

The second fails against a page that reports where each group has got to.
Four groups meeting on four different days drift apart the moment one loses a
week to a holiday or a trip, and the drift is the whole reason the page is
wanted. A page that shows it has to name the groups. Read literally, Article
VI forbids that.

Article V lists group names and class codes among the institutional facts that
are *"not settled and are not this repo's to decide"*, and instructs that where
such a fact is unknown the page says nothing. That article's target is
**invention**: a plausible guess on a public site is worse than a blank. These
names are not a guess. They come from the person who teaches the groups.

Article IV is not in tension. The site is public and indexed — ADR-0006
proposed a no-index posture and was rejected. A group code names a timetable
slot, not a person. Nothing on the page carries a student name, a grade, or the
attendance of an individual, and none of Article IV's prohibitions reaches a
label like `4Ta-1`.

## Decision

### 1. Article I — four groups

The opening sentence becomes:

> ttcmd is the **central source of information, lessons and tasks** for the
> course *Aplikacje desktopowe i mobilne* — 4th year, Technikum Cyfrowe
> Szczecin, from **2026-09-01**, 8 h/week, **four groups** of two hours each.

This also strikes the inline `TO CONFIRM: official PL course title` comment
attached to the title in that sentence. Slice 008 put the same title on the
home page and recorded in `app/page.tsx` that Viktar confirmed it, so the
comment has been stale since. It is edited here only because it lives inside
the sentence being replaced. **Veto this half on its own if you would rather
strike it separately.**

### 2. Article VI — the site models groups, in one place

The bullet becomes:

> - **Every group gets identical content.** No lesson, exercise or page of
>   content varies by group. The site models groups in exactly one place: the
>   schedule, which records which group has reached which session, and when.

*Every* rather than *both*, so a fifth group never sends this file back to
Article X.

### 3. Article V — two facts settled, the rest untouched

The four groups are **`4Ta-1`, `4Ta-2`, `4Tc-1`, `4Tc-2`**, and they are
published under those names.

Said plainly: this settles more than the group names. The groups are halves of
two classes, so publishing `4Ta-1` publishes the class code `4Ta` with it, and
Article V lists group names and class codes as separate open facts. Both close.

Everything else on Article V's list stays open and stays blank where it is
unknown: the timetable, the room, the roster, and the INF.03 / INF.04 exam
scope. A fact moving from unknown to known is what that article is for.

> **Correction, 2026-09-10, on applying this ADR.** This section originally
> ended *"Article V itself is not amended."* That was wrong, and it is left
> visible here rather than rewritten (Article II). Article V's opening sentence
> lists group names and class codes among the facts that are **not settled**.
> Leaving it untouched would have left the constitution asserting, in the same
> commit that published the codes, that they were undecided. So Article V is
> amended after all, minimally: the two settled facts leave the list, and a
> short paragraph names them and points back here. The timetable, room, roster
> and exam scope stay exactly as they were.

### 4. What this does not license

The amendment covers **one page and its data file**. It does not create a
per-group content axis, a per-group route, a per-group lesson variant, or any
record of attendance. Any of those is a new ADR.

## Alternatives rejected

- **Neutral column labels — `Grupa 1` to `Grupa 4`.** Publishes no school code
  and leaves Article V entirely alone. Rejected by Viktar on 2026-09-10: a
  student has to find their own column, so the mapping has to exist somewhere.
  On the page it publishes the codes anyway; off the page it makes the page
  unreadable unless Viktar is standing next to it, which is the opposite of
  what Article I means by a central source of information.
- **Keeping the tracker out of the site**, as a document in the repo. Needs no
  amendment at all, and costs nothing. Rejected for the same reason: students
  do not read this repo (Article II), so a tracker they cannot open is not the
  thing that was asked for.
- **Reading Article VI's second sentence narrowly and skipping this ADR**,
  arguing that *"the site does not model groups"* was always only about
  content. Convenient and probably even true of the author's intent. Rejected:
  the sentence as written is general, the honest account is that it did not
  anticipate this page, and Article II keeps a mistake visible rather than
  reinterpreting it out of existence. Article X forbids the silent version.
- **Amending Article IV to say something about group codes.** Rejected because
  there is nothing to amend. Its list is about personal data and school
  documents, and a timetable label is neither. Recording that here is enough.
- **Letting the group axis into content now**, on the grounds that four groups
  clearly will diverge in practice. Rejected pre-emptively, because it is the
  reading someone will take from this ADR later. Content stays identical. When
  it genuinely cannot, that is a new decision with its own file.

## Consequences

- Four real class-group codes enter a public, indexed site under Viktar's name.
  Git history is permanent (Article IV): once committed they are committed, and
  a later change of mind removes them from the page but not from the log.
  Accepted knowingly.
- **Two places would now carry a week number.** Article VI's `week` field on a
  lesson, optional and so far unused, says when a lesson happens; the schedule
  says the same thing from the other side. Two sources drift. Slice 016's spec
  must name one of them as the source of truth and say what the other is for.
- Changing a group's name after this is a content edit, not an ADR. The names
  are settled, not frozen.
- Slice 016 may proceed once this is accepted. It stays an App-lane slice under
  Article IX; only the weekly updates afterwards are content commits.
