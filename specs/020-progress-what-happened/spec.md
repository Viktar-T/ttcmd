# spec.md — 020-progress-what-happened

- **Slice:** 020. Numbered past the queue on purpose: `docs/roadmap.md` reserves
  017, 018 and 019 for search, the glossary and being found, and renumbering
  that queue a second time in one day is churn. Slice numbers are append-only,
  not contiguous (Article IX).
- **Status:** written in an autonomous run (AGENTS.md §2, "Two modes") —
  unapproved by construction. The change itself is Viktar's, asked for after
  looking at the built page; everything about how it is done is decided here
  and reviewed afterwards from `## Decisions taken` and the final report.
- **Date:** 2026-09-10
- **Depends on:** slice 016, which built the page and the schedule; ADR-0014
- **Supersedes:** slice 016's criteria 4 and 5, in the one respect named below.
  016's spec is not edited to match this (AGENTS.md §8); this slice is the
  record of the change.

---

## Why

**Two of the table's seven columns say what was planned, and the page is about
what happened.**

Slice 016 gave each session a planned week and a planned date beside the four
group cells. Those four cells now hold real dates, and against them the two
planned columns do two unhelpful things. `Data` is a second date on a row that
already has four, so a reader scanning across has to work out which one is the
plan. `Tydz.` repeats a number that the calendar directly above the table is
entirely about.

The cost is not only clutter. The seven columns spend about 591 px of a 624 px
lane, and every one of those pixels is spent on a column that answers a
question no student asked.

Viktar looked at the built page and asked for both to go. That is criterion 18
of slice 016 — the one it deliberately left for his eye — being answered.

## What

### 1. The table shows the session, the groups and the topics

The header row is the session's number and the four group codes, in the order
ADR-0014 fixes. Nothing else. `Tydz.` and `Data` are gone from the table, at
every width, in both layouts.

### 2. The week and the planned date stay in the data

Both remain fields of a session, both stay validated, and neither is rendered.

- A session still names a week, and the build still refuses one that names a
  week the calendar does not have. That is what keeps the calendar above the
  table connected to the sessions below it rather than decorative.
- A planned date is still optional and still refused when it is not a real date.

Nothing about `content/schedule.json` changes. A file written for slice 016
renders correctly here without being touched.

### 3. Everything else about the page is unchanged

The calendar, the topics, the row group per session, the stacked layout below
41 rem, the labels in the DOM, the left edge, the link from the front door.

## Out of scope

- **Promoting the topics to a column.** Five columns cost about 433 px of the
  624 px lane, which leaves about 191 px for a topic that wants some 340 px —
  three wrapped lines per topic. The room the two columns free is not enough,
  and this slice was not asked to restructure the table.
- **Removing `week` or `date` from the schedule.**
- **Any other page.**

## Acceptance criteria

1. `npm run build` succeeds, lists `/postep` as a **static** route, and
   `npm run lint` is clean.
2. The table's header row reads exactly `Nr`, `4Ta-1`, `4Ta-2`, `4Tc-1`,
   `4Tc-2`, in that order, and the table has five columns.
3. No cell anywhere on the page renders a session's week or its planned date,
   in either layout. Read from the rendered markup at a wide width and at
   375 px.
4. The calendar above the table is unchanged: every week in the data, once,
   with its number and both dates, ascending.
5. A session's topics still render in a row of their own, spanning the table,
   with a lesson's letter and title derived from the content tree and linked
   when the lesson is published.
6. The group cells still hold a date or nothing, and the real dates now in the
   seeded file render: session 1 shows four dates, session 2 shows two and two
   blanks.
7. **The build still refuses a session naming a week the calendar does not
   have**, with the same message — the field is unrendered, not unvalidated.
8. `content/schedule.json` is not modified by this slice.
9. No document scrolls sideways at 320, 375, 768, 1024, 1280 and 1585 px on
   `/postep`.
10. At 375 px each session still reads as one block with every group's date
    beside its own code.
11. No page other than `/postep` changes. No token moves, no new colour, no new
    dependency, no client-side behaviour.
12. **Human eye, and therefore left unchecked by the run that builds it:**
    whether the narrower table is the one Viktar wants in front of a class.
13. The fresh-context review reports no gap against these criteria.

## Decisions taken

1. **Both columns go.** *Viktar's call, 2026-09-10, after seeing the built
   page.* Rejected: keeping `Tydz.` because the calendar needs a way in — the
   week is in the file and the calendar is directly above; nothing was navigating
   between them.
2. **The fields stay in the data and stay validated.** Rejected: deleting them,
   which throws away the record of what was planned, leaves the calendar
   unconnected to anything, and turns bringing a column back into a data
   migration rather than a rendering change.
3. **The topics keep a row of their own.** Rejected: promoting them to a column
   now that two are free — the arithmetic is in *Out of scope* and it does not
   work.
4. **The two `<th>`s and their cells are removed rather than hidden with CSS.**
   Rejected: `display: none`, which leaves them in the accessibility tree and in
   the markup, so the page would still announce a week nobody can see.
