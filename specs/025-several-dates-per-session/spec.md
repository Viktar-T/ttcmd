# spec.md — 025-several-dates-per-session

- **Slice:** 025
- **Status:** written in an autonomous run (AGENTS.md §2, "Two modes") —
  unapproved by construction. It was first drafted to stop at the supervised
  gate, because the prompt that opened it named no mode; Viktar then said "run
  it autonomously" and the run continued from it. What the page should show is
  his, asked for with a worked example; how it is done is decided here and
  reviewed afterwards from `## Decisions taken` and the final report.
- **Date:** 2026-10-01
- **Depends on:** slice 016 (the schedule and `/postep`), slice 020 (a cell says
  which week *its own date* fell in), slice 022 (the precedent for an additive
  change to the schedule: data that does not use it must render byte-for-byte
  as before); ADR-0014; constitution Articles V, VI, VIII and IX.
- **Supersedes:** slice 016's §5 and criterion 8 — "a group cell holds a date or
  nothing" — in the one respect named below: it now holds one date, several, or
  nothing. 016's spec is not edited to match (AGENTS.md §8); this slice is the
  record of the change.

---

## Why

**A group can need more than one class for a session, and the page can record
only one.**

A session is a row of the table — *Zajęcia 4*. Each group's cell in that row
holds the date that group did the session (016 §5). That has been enough while
every session fitted into a class. Viktar's example is where it stops: three
groups have a second date for session 4, *Budujemy okno ręcznie* — 29.09 for
4Ta-1, 01.10 for 4Ta-2 and for 4Tc-1 — and the only place the page lets him put
it is the next row, *Budujemy okno z agentem*, which is where those three dates
are today.

That is wrong in two directions at once. It says three groups have begun a
session they have not, and it says session 4 was done in a single class. The
page exists to show how far each group has got (016, *Why*), and read down a
group's column, a group still on session 4 appears to have moved on to
session 5.

## What

### 1. A group may have several dates for one session

A group's entry for a session may hold one date, as now, or several — one for
each class that group spent on that session. There is no upper limit.

Every entry already in the schedule keeps its meaning and needs no edit.

### 2. A cell shows every date it holds

Each date is shown the way a single date is shown today: day and month, a
hyphen, and `T` followed by the number of the week **that date** falls in
(slice 020, decision 4). So a session that crosses a week boundary says so in
its own cell, as `22.09-T4` and `29.09-T5`.

The dates are **one to a line, earliest first, whatever order they were written
in**, and each carries its own full machine-readable date.

A cell with one date reads exactly as it does today. A group with no entry is
still an empty cell, with no placeholder.

### 3. Each date is held to what one date is held to

Every date in an entry must be a real calendar day and must fall in a week the
calendar lists. A date that fails stops the build with the message a single date
gets today, so the message names the session, the group and the date.

Two refusals are new:

- **An entry with no date in it.** A group that has not got there yet is left
  out of the row, which is how that is said today; a second way of saying it
  would hide a half-finished edit.
- **The same date twice in one entry.** It is a typo, and two identical lines in
  a cell would read as a bug.

### 4. The phone

At 375 px a session still reads as one block, with each group's code beside its
own dates and every date visible. A cell with two dates is taller than a cell
with one. It is not two cells, and the reader must not be able to mistake it for
two groups.

### 5. Nothing else changes

The calendar, the topics, the session titles, the grouping of a session's rows,
the stacked layout and its labels, the other groups' cells, and every other page
render as before.

**No date is compared with any other date** — not within the entry, not with
another group's, not with the next session's. A group running behind, or a
session running over, is what the page exists to show, not an error (016,
decision 9).

## Out of scope

- **Moving the three dates in Viktar's example.** That is data, in the content
  lane, committed on its own after this slice (Article IX). It is also the first
  thing the finished feature is for.
- **Anything attached to a date** — a note, a time of day, a reason, a
  cancellation. The order of the lines is the whole of what a second date says.
- **Marking a later date as a continuation**, or showing how many classes a
  session took.
- **Checks across rows or down a group's column.** See §5.
- **The session's own planned week and date**, which stay in the data and stay
  unrendered (slice 020).
- **Any other page.**

## Acceptance criteria

1. `npm run build` succeeds, lists `/postep` as a **static** route, and
   `npm run lint` is clean.
2. **A schedule in which every group holds one date, or none, renders `/postep`
   byte-identically to before this slice** — the schedule as it stands today is
   one — once the per-build id and the name of the shared stylesheet are
   normalised, and the stylesheet itself differs from before only by the rules
   this slice adds. The normalisation is written in from the start: slice 022's
   plan found that every page links one stylesheet named by a hash of its
   contents, so any added rule renames it.
3. **A group entry with two dates renders both**, in one cell, one per line,
   each as `dd.mm-Tn` where `n` is the week **that date** falls in, and each in
   an element carrying its own full ISO date. A third date renders a third line.
4. **Written out of order, the dates render in date order.**
5. **Viktar's example renders as he asked.** For a schedule in which session 4
   holds 22.09 and 29.09 for 4Ta-1, 24.09 and 01.10 for 4Ta-2, and 24.09 and
   01.10 for 4Tc-1, and session 5 holds no group date at all: session 4's cells
   read `22.09-T4` over `29.09-T5`, `24.09-T4` over `01.10-T5`, `24.09-T4` over
   `01.10-T5`, and an empty 4Tc-2; session 5's four cells are empty and carry no
   placeholder. Checked on a temporary copy of the schedule, restored
   byte-for-byte afterwards.
6. **The build refuses each of these**, one at a time, reverting between: an
   impossible date inside an entry that holds several; a date in no week the
   calendar lists; an entry with no date in it; the same date twice in one
   entry. Each message names the session and the group and, where there is one,
   the date; the last two say what to write instead. The evidence is the four
   messages.
7. **A single date that is impossible, or falls in no week, is still refused
   with the message it gets today.**
8. **No document scrolls sideways** at 320, 375, 768, 1024, 1280 and 1585 px on
   `/postep`, with the schedule of criterion 5 in place.
9. **At 375 px** each session reads as one block, every group's code is beside
   its own dates, and every date is visible. Which dates belong to which group
   is unambiguous.
10. **No page other than `/postep` changes**, normalised as in criterion 2. No
    dependency, token, colour or client-side behaviour is added, and with
    scripting disabled the page still renders in full.
11. The schedule's data is not modified by this slice's own commits.
12. **Human eye, and therefore left unchecked by the run that builds it:**
    whether two stacked dates read, on a projector, as *this took two classes*
    rather than as two sessions or as a mistake.
13. The fresh-context review reports no gap against these criteria and nothing
    outside this slice's scope touched.

## Decisions taken

Per AGENTS.md §4. One line each, naming what was rejected.

1. **An entry is one date or a list of dates; one date is still written as one
   date.** In the schedule: `"4Ta-1": "2026-09-22"` keeps working, and several
   are `"4Ta-1": ["2026-09-22", "2026-09-29"]`. Rejected: making every entry a
   list, which rewrites every date already there and turns the common case into
   a one-item list; an object per group with a key for its dates, which is more
   to type each week for the same thing; and a second row for the second class
   (a "4b"), which invents a session Viktar did not ask for — he asked for
   several dates on *one* session.
2. **There is no upper bound on the number of dates.** Rejected: a cap of two,
   which is the case in hand and which the next session that runs to three
   classes would break.
3. **Each date shows the week it falls in, not one week for the cell.**
   Rejected: the first date's week for the whole cell, which would label 29.09
   as week 4 and say the group was a week earlier than it was — slice 020's
   decision 4 again.
4. **Dates display earliest first, whatever order they were written in.**
   Rejected: displaying them as written, which prints a hurried edit backwards;
   and refusing an out-of-order entry, which makes Viktar correct something that
   was never wrong. The calendar is already sorted by number for the same
   reason.
5. **An entry with no date in it is refused, and so is a date written twice in
   one entry.** Rejected: reading an empty entry as "not yet", which gives one
   meaning two spellings and hides a half-finished edit — the reasoning that
   gave a session at least one topic; and dropping a repeated date quietly,
   which hides a typo.
6. **One date to a line.** Rejected: two dates side by side or separated by a
   comma, which doubles what a cell asks of a narrow column and of the 375 px
   layout's half-width cell.
7. **No date is compared with any other.** Rejected: refusing a date that falls
   after the same group's first date on the next session, which would turn the
   page's subject into an error (016, decision 9).
8. **Viktar's example is data, and is committed after the slice, in the content
   lane.** Rejected: moving it inside the slice's commits — the data lane has no
   slice (Article IX), and criterion 2 needs the data unchanged while the code
   changes.
9. **No ADR.** Rejected: amending ADR-0014 or Article VI — their wording, "which
   group has reached which session, and when", already holds several whens.

## Notes for the reviewer

- **The riskiest criterion is 9**, the phone. The narrow layout lays each cell
  out as the group's code at one end and its value at the other, and a value
  that arrives as two things rather than one is the way this table breaks.
- **Criterion 2 is what keeps the slice additive.** A schedule that does not use
  the feature must not be able to tell the feature exists.
- **Criteria 5 and 6 write to the schedule temporarily.** At the time of writing
  the file carries an uncommitted edit of Viktar's — session 5's 4Ta-2 and
  4Tc-1 dates. Any run that writes a temporary schedule saves its bytes and hash
  first and restores by hash, as slice 022's journal entry records, and ends
  with `git status` showing only his edit.
