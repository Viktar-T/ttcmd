# spec.md — 016-group-progress

- **Slice:** 016
- **Status:** written in an autonomous run (AGENTS.md §2, "Two modes") —
  unapproved by construction. The three things that were Viktar's are marked as
  his in `## Decisions taken`: that the groups are named in public, that a group
  cell carries that group's own date, and the address. Everything else is
  decided here and reviewed afterwards from that section and the final report.
- **Date:** 2026-09-10
- **Depends on:** ADR-0014, which licensed the site to model groups at all and
  settled the four names; ADR-0003 (identity and numbering — a lesson's letter
  and a module's number are derived, never written by hand); constitution
  Articles III (Polish for the reader, ASCII identifiers), IV (public site),
  V (invent no institutional fact), VI (module → lesson, content identical for
  every group), VIII (validated at build, no backend) and IX (three lanes)
- **Unblocks:** the weekly update. After this slice, recording a lesson is an
  edit in the content lane, not a slice.

---

## Why

**Four groups, one two-hour lesson a week each, and nothing on the site says
where any of them is.**

The course runs four groups through the same material. They meet on different
days, so the first holiday, trip or absence puts them out of step, and from
then on "we did 2b last week" is true of one group and false of another. Viktar
tracks that today by remembering it. A student who missed a week has no way at
all to find out what they missed, because the site presents the course as an
ordered pile of lessons with no dates on it.

The site is the course's central source of information (Article I). It is the
one place a student already opens. What it does not carry is *when*: Article
VI's `week` field on a lesson has been optional since the content model was
written and no lesson has ever set it, so every lesson on the site is undated
and every module reads as though it happens all at once.

Two readers, one page. **The student** asks *where is my group, and what is
next for us*. **Viktar** asks *which group is behind, and by how much* — every
week, at the moment he sits down to update it. Both questions are answered by
the same table, which is why one page serves both rather than a public view and
a private one.

The page is also the only durable record of what was actually taught to whom.
Content is freely editable and the git history is the record (Article VI); a
schedule kept in the same repo inherits that property for free.

## What

### 1. One page, at `/postep`

A page of its own, in Polish like every page a student reads, holding the two
things below and nothing else. It is reachable from the site's front door.

It is a page, not a feature of the module pages: the question *where is my
group* is about the course as a whole and cannot be answered from inside one
module.

### 2. The calendar of weeks

Above the table, a short list of the course's weeks. Each week has **a number
and a date range**, its first and last day.

- The numbers are **the course's own**, counting from the first week of the
  course. They are not ISO week numbers, which start from January and would
  make the course begin in week thirty-six.
- **Only the weeks that have been written appear.** The page never generates a
  school year. Where the year's shape is unknown — the breaks, the holidays,
  the last week — the page says nothing rather than guessing, which is
  Article V's instruction in the case it was written for.

### 3. The table of sessions

One row per session of the course, in order. Each row carries:

- **The session's number**, counting from one across the whole course.
- **The week** it is planned for, which is one of the weeks in the calendar.
- **The date it is planned for**, which may be absent. A session whose date is
  not yet fixed leaves the cell empty and says nothing (Article V again).
- **Its topics**, one per line — see §4.
- **One cell per group**, four of them, headed with the group's code and always
  in the same order: `4Ta-1`, `4Ta-2`, `4Tc-1`, `4Tc-2`.

The session number and the week number are the **plan**. They are what Viktar
intended when he laid the row out, and they do not change when a group runs
late.

### 4. Topics name lessons, and are never retyped

A topic is one of three things, and the page can tell them apart:

- **A lesson of the course.** The row shows the lesson's identity string and
  its title exactly as the course carries them — `2a Na żywo: agent buduje
  aplikację` — both derived from the content tree, neither typed into the
  schedule. ADR-0003 makes the letter identity and derives it from the lesson's
  order; a schedule that spelled it out by hand would be a second opinion about
  a lesson's name, and the two would disagree the day a lesson's order changes.
- **A whole module**, for a session that covers a module rather than one of its
  lessons — `Moduł 1 Jak dziś powstaje oprogramowanie`. Number and title
  derived the same way.
- **Plain text**, for anything that is not in the course tree.

A topic that names a lesson or a module **links to it when a reader can open
it**. A lesson that is not published — Moduł 4 and Moduł 5 today — shows its
title without a link: the title is a fact about the course, the link would be a
door onto a page that is not there.

**A pointer that resolves to nothing fails the build.** A schedule that
silently names a lesson which has been renamed or removed is worse than no
schedule, because it is the page a reader trusts to tell them what to revise.

### 5. What a group cell holds

**The date that group actually did that session**, and nothing else.

- **An empty cell means the group has not got there yet.** That is its only
  meaning. It never records a cancellation, an absence or a skipped session.
- A group's date is **not required to fall inside the row's planned week**, and
  the build does not check that it does. Being two weeks behind the plan is not
  an error; it is the fact the page exists to show.
- The four cells of a row are independent. Nothing forces them to be filled in
  order, in step, or at all.

Read down a group's column and you see how far that group has got. Read across
a row and you see how far apart the four are. That is the whole page.

### 6. The build refuses a schedule that is wrong

The same gate that rejects a malformed lesson rejects a malformed schedule
(Article VIII): it fails `npm run build`, in front of the person who wrote it,
rather than rendering on a public page.

Refused: a date that is not a real calendar date; a group that is not one of
the four; a session pointing at a week the calendar does not have; two sessions
claiming the same number; two weeks claiming the same number; a week whose last
day is before its first; a topic pointing at a lesson or a module that does not
exist.

Every message says which row it is about and what to write instead. The reader
of these messages is Viktar on a Monday evening, and a message that only says a
value failed validation costs him the evening.

### 7. The weekly update is a content commit

After this slice, a week of teaching is recorded by editing **one place** —
adding a week, adding a session, or filling in one group's date — and nothing
under `app/` or `lib/` moves. That makes it a content-lane commit under Article
IX, not a new slice every Monday, and it is the reason the slice is worth
building rather than keeping the table in a document.

### 8. The lesson's own `week` field stays, and is not the truth

ADR-0014 recorded the consequence: two places could carry a week number.
**The schedule is the source of truth for when anything happens.** Article VI's
optional `week` on a lesson stays in the schema untouched, unset by every
lesson as it is today, and unread by this page. Removing it would contradict
Article VI, and setting it would create the drift the ADR warned about.

### 9. The page reads on a phone

Eight columns is a wide table and a phone is 375 px. Article I requires the
site to work on a phone, and slice 012's rule that no document scrolls
sideways is not suspended for this page.

So: **at every width, the whole of every row is reachable without the document
scrolling sideways**, and at the narrowest width a reader can still tell which
date belongs to which group. How the table gets there is the plan's to decide.

### 10. Nothing here changes how the site looks

- No new colour, type size, spacing value or rule value, and no token moves.
- No page that exists today changes, except the front door gaining one link.
- No backend, no dependency, no new network request, no client-side behaviour.
  The page is server-rendered, and with scripting absent every link on it
  navigates and every date is legible.
- Nothing on the page identifies a student, and nothing records attendance,
  presence or a grade. The cells hold dates and the headers hold group codes.

## Out of scope

Refused deliberately, not forgotten:

- **Attendance, presence, grades, and anything about an individual.** Article
  IV, and it is not what the page is for.
- **Per-group content of any kind.** ADR-0014 licensed one page. Content stays
  identical for every group.
- **A marker for "today" or "this week".** The page is built when it is
  deployed, not when it is read, so a highlight would be right on the evening
  Viktar pushes and quietly wrong for the six days after. A wrong "you are here"
  is worse than none.
- **Editing any lesson**, including giving one a `week`.
- **A per-group page or a per-group address.** Four columns on one page, and a
  student's group is a column, not a URL.
- **A navigation item in the site header.** The header has carried no
  navigation since slice 006 and adding the first one is a change to the look of
  the site that this slice was not asked to make.
- **Anything the schedule could grow into** — a note on a cell, a cancelled
  session, a room, a teacher, a second course.

## Acceptance criteria

Observable conditions. Each is checked and the check's output is the evidence.

1. `npm run build` succeeds and `npm run lint` is clean.
2. **The page exists at `/postep`** and renders the calendar above the table.
3. **The calendar shows only what is written.** Read from the rendered markup:
   every week in the data appears once with its number and both its dates, in
   ascending order, and no week that is not in the data appears.
4. **The table has the four groups, in order.** The header row carries `4Ta-1`,
   `4Ta-2`, `4Tc-1`, `4Tc-2` in that order, and one column each.
5. **A session row carries its number, its week, its planned date, its topics
   and four group cells**, and a session whose planned date is absent renders an
   empty cell rather than a placeholder, a dash or an invented date.
6. **Topics are derived, not retyped.** For the seeded data: the topic naming
   the first lesson of Moduł 0 renders the letter and title that lesson's own
   frontmatter gives it; the topic naming Moduł 1 renders that module's number
   and title; and changing a lesson's title in the content tree changes the
   schedule row, checked once and reverted, with `git status` clean under
   `content/` afterwards.
7. **A published lesson links, an unpublished one does not.** The topics of the
   seeded sessions link to their lessons. With a seeded lesson temporarily set
   `publish: false`, its topic renders the same title with no link and the build
   still succeeds; reverted, with `git status` clean under `content/`.
8. **A group cell holds a date or nothing.** Read from the rendered markup: each
   of the four cells in each row is either a date or empty, and an empty cell
   carries no placeholder text.
9. **A group date outside its row's planned week is accepted.** With one group's
   date temporarily moved two weeks past the row's week, the build succeeds and
   the page renders it; reverted.
10. **The build refuses each malformed schedule**, one at a time, reverting
    between: an impossible date such as `2026-02-30`; a group code that is not
    one of the four; a session naming a week the calendar does not have; two
    sessions with the same number; two weeks with the same number; a week
    ending before it starts; a topic naming a lesson that does not exist; a
    topic naming a module that does not exist. Each failure names the offending
    row in its message. The evidence is the eight messages.
11. **The weekly update touches nothing under `app/` or `lib/`.** Adding a week
    and a session and filling one group's date is demonstrated as a single edit
    outside those directories, `npm run build` succeeds, and `git diff --stat`
    shows only that edit; reverted afterwards.
12. **No document scrolls sideways** at 320, 375, 768, 1024, 1280 and 1585 px,
    on `/postep`, the home page, a module page and a lesson page.
13. **Every row is fully readable at 375 px**, and which date belongs to which
    group is unambiguous there.
14. **No page other than `/postep` changed**, except the front door gaining one
    link. The home page, the module grid, a module page and a lesson page
    measure what they measured before this slice at 1280 px and at 375 px.
15. **With scripting disabled**, at 1280 px and at 375 px: the calendar and the
    table render in full, every topic link navigates, and the console shows no
    errors.
16. The slice adds no dependency and no network request to any page.
17. **The seeded data contains only facts Viktar supplied**, and no group cell
    holds a date, because he supplied none. Checked by reading the data against
    his own message.
18. **Human eye, and therefore left unchecked by the run that builds it:**
    whether the table reads as part of this site rather than as a spreadsheet
    dropped into it, and whether the phone layout of §9 is one he would use in
    front of a class.
19. The fresh-context review reports no gap against these criteria and nothing
    outside this slice's scope touched.

## Decisions taken

Per AGENTS.md §4. One line each, naming what was rejected.

1. **The four groups are named in public, with their real codes.** *Viktar's
   call, 2026-09-10.* Rejected: neutral labels such as `Grupa 1`, which publish
   no school code but need a legend that either publishes the codes anyway or
   makes the page unreadable without him beside it; and keeping the tracker out
   of the site entirely, which students cannot open.
2. **A group cell holds that group's own date.** *Viktar's call.* Rejected: a
   done-or-not mark, which cannot show that one group is two weeks behind — the
   thing the page is for; and a date plus a free note, which is more to type
   every week for something no criterion needs yet.
3. **The address is `/postep`.** *Viktar's call.* Rejected: `/harmonogram`,
   which names the calendar rather than the progress, and `/plan`.
4. **The row keeps a planned date of its own, and it is optional.** Rejected:
   dropping it now that the group cells carry real dates, which loses the record
   of what was intended; and making it required, which would have forced an
   invented date onto the second seeded session, whose date Viktar did not give
   (Article V).
5. **Topics point at lessons and modules; the letter and the title are
   derived.** Rejected: typing the topic text into the schedule, which is a
   second opinion about a lesson's name that disagrees with ADR-0003 the day an
   order changes; and pointing only at lessons, which cannot express the seeded
   session that covers all of Moduł 1.
6. **Plain-text topics are allowed beside the two kinds of pointer.** Rejected:
   requiring every topic to resolve, which would make the schedule unable to
   record a class that is not a lesson — and would have been wrong about the
   seeded data by luck alone, since every topic Viktar wrote happens to resolve.
7. **A pointer that resolves to nothing fails the build.** Rejected: rendering
   it as plain text, which turns a stale reference into something that looks
   deliberate; and dropping the row, which hides the problem entirely.
8. **An unpublished lesson's topic shows its title without a link.** Rejected:
   hiding the topic, which would make the schedule lie about what is planned;
   and linking anyway, which sends a reader to a page that is not published.
9. **A group's date is not checked against its row's week.** Rejected: warning
   or failing when a group runs late, which turns the page's whole subject into
   an error.
10. **The schedule is the source of truth for when anything happens, and the
    lesson's `week` field stays untouched and unread.** Rejected: setting
    `week` from the schedule, which is the drift ADR-0014 named; and removing
    the field, which would contradict Article VI.
11. **No "today" or "current week" marker.** Rejected: highlighting the current
    week, which on a page built at deploy time is right for one evening a week
    and quietly wrong for the rest of it.
12. **The way in is a link on the front door, not a navigation item in the
    header.** Rejected: the site's first header navigation item, which is a
    change to the look of the site and Viktar's to make, not this slice's.
    Reversible in one commit if he wants it in the header.
13. **The seeded schedule contains exactly the two weeks and two sessions
    Viktar wrote, and no group dates.** Rejected: filling the group cells with
    plausible dates so the page demonstrates itself, which is the invention
    Article V forbids; and shipping an empty schedule, which cannot be checked
    against any criterion above.

## Notes for the reviewer

- **The riskiest criterion is 13**, the phone. Eight columns do not fit 375 px
  by any arrangement that keeps them all visible, so something has to give, and
  which thing gives is a judgement the build cannot make. Criterion 18 is the
  half of it that is Viktar's.
- **Criteria 6, 7, 9, 10 and 11 all touch the content tree or the data
  temporarily.** Every one of them reverts and every one of them ends with
  `git status`. A slice that leaves an experiment behind in `content/` has
  broken the lane rule it exists to respect.
- **Criterion 17 is the one that matters most and is the easiest to fail
  quietly.** Two of the dates in Viktar's message were written as examples. If
  any invented date reaches the seeded data, this slice has put a fabricated
  institutional fact on a public site, which Article V calls the most expensive
  mistake available in this repo.
