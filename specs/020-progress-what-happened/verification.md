# verification.md — 020-progress-what-happened

Evidence for every acceptance criterion in `spec.md`. A criterion with no check
under it is not met; criterion 12 is Viktar's and is marked as such.

**A note on the tree.** Viktar was editing content in this working directory
throughout the slice, and `content/moduly/05-pod-maska/` was deleted from the
working tree partway through, mid-rename to `06-pod-maska`. Nothing here touched
any of it, every commit staged its own paths, and the before/after comparison in
criterion 11 was rebuilt on both sides against the same tree once that was
noticed, so it compares code against code rather than code against content.

---

## 1. Build, static route, lint

```
✓ Compiled successfully
├ ○ /postep
```

`○` is a static route — the evidence that the validation in `lib/schedule.ts`,
including the new ninth refusal, runs at build time and not per request.
`npm run lint` and `npx tsc --noEmit` produce no output on any task.

## 2. Five columns, and which five

Read from the prerendered markup, scoped to the `<table>`:

```
headers: ["Nr","4Ta-1","4Ta-2","4Tc-1","4Tc-2"]
columns: 5
colSpan attr: 5
```

The topics row's `colSpan` is derived from `GROUPS`, not restated, so it and the
header row cannot disagree the first time a column moves.

## 3. No week and no planned date anywhere on the page

```
table mentions Tydzien: false
table mentions Data: false
```

**Scoped to the `<table>` element deliberately.** The calendar above it prints
„Tydzień" seventeen times and legitimately so, and a bare grep of the page would
have passed while proving nothing.

## 4. The calendar is unchanged

```
calendar weeks: 17 | ascending: true | first 1 last 17
calendar dates: 34 (two per week)
```

`app/postep/page.tsx` is absent from the slice's diff, which is the mechanism:
resolving the week in the model rather than in the component is what keeps the
page component out of it.

## 5. The topics still render in their own row, derived and linked

```
0a       | Ankieta na start — Aplikacje desktopowe i mobilne -> /moduly/00-start/jak-dziala-ten-kurs
Moduł 1  | Jak dziś powstaje oprogramowanie                  -> /moduly/01-jak-powstaje-oprogramowanie
2a       | Na żywo: agent buduje aplikację                    -> /moduly/02-warsztat/na-zywo-agent-buduje-aplikacje
2b       | Teraz ty: twój pierwszy agent                      -> /moduly/02-warsztat/teraz-ty-pierwszy-agent
```

Not one of those strings is in `content/schedule.json`.

## 6. The cells read in the new form

From the live DOM:

```
["Zajęcia 1", "4Ta-1 03.09-T1", "4Ta-2 04.09-T1", "4Tc-1 08.09-T2", "4Tc-2 08.09-T2"]
["Zajęcia 2", "4Ta-1 10.09-T2", "4Ta-2 11.09-T2", "4Tc-1",          "4Tc-2"]
```

**The two `4Tc` cells reading `T2` against a session planned for week 1 is the
criterion, not an accident.** Those groups did session 1 on 2026-09-08, which is
week 2, and the cell now says so instead of leaving a reader to compare dates
across the row. Session 2's two `4Tc` cells are empty, because those groups have
not reached it.

## 6a. The machine-readable date survives

```
datetimes: ["2026-09-03","2026-09-04","2026-09-08","2026-09-08","2026-09-10","2026-09-11"]
```

Six `<time>` elements, six full ISO dates, year included. Only the visible text
drops the year.

## 6b. A date in no listed week fails the build

Two shapes of it, each its own build:

```
Error: content/schedule.json — session 1: 4Ta-1 — "2026-09-05" falls in no week the calendar has, so the cell cannot say which week that class was in. Add the week containing it to "weeks", or correct the date: the calendar runs 2026-08-31 to 2026-12-25, Monday to Friday, and a weekend or a school break falls in none of it.
```

```
Error: content/schedule.json — session 1: 4Ta-1 — "2027-01-05" falls in no week the calendar has, so the cell cannot say which week that class was in. Add the week containing it to "weeks", or correct the date: the calendar runs 2026-08-31 to 2026-12-25, Monday to Friday, and a weekend or a school break falls in none of it.
```

The first is a Saturday inside the calendar's span; the second is past its end.
The message names the row, the group and the raw string, and opens with the same
`session 1: 4Ta-1 — ` shape a malformed group date already opens with, so a
reader learns one shape and not two.

**The ordering holds**, which is the thing that could have broken quietly:

```
Error: content/schedule.json — session 1: 4Ta-1 — "2026-02-30" has no day 30 — luty 2026 has 28.
```

An impossible date still gets the day-length message from `lib/dates.ts`, not
"falls in no week". The lookup runs after the parse.

## 7. The week is unrendered, not unvalidated

```
Error: content/schedule.json — session 1: it points at week 99, which the calendar does not have. Add that week to "weeks", or point the session at one of: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17.
```

The same message slice 016 shipped, now listing seventeen weeks instead of two.

## 8. `content/schedule.json` is not modified by this slice

The whole slice's diff:

```
app/postep/page.module.css
app/postep/schedule-table.tsx
lib/dates.ts
lib/schedule.ts
specs/020-progress-what-happened/tasks.md
```

The seeded group dates criterion 6 reads arrived in the content-lane commit
`8d7785f`, before this slice's first code change. They are not this slice's to
add or move, and the fact that the file needed no edit is the property spec §2
was claiming.

## 9. No document scrolls sideways

`document.documentElement.scrollWidth − clientWidth` on `/postep`:

| width | 320 | 375 | 768 | 1024 | 1280 | 1585 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| overflow | 0 | 0 | 0 | 0 | 0 | 0 |

At 1280 and at 1585 the table measures `left: 464, width: 624` — the site's
anchored content inset and `--measure`, unchanged from slice 016. The table
still has no inner scroller.

## 10. The phone still reads

At 375 px, from the DOM:

```
Zajęcia 1 | 4Ta-1 03.09-T1 | 4Ta-2 04.09-T1 | 4Tc-1 08.09-T2 | 4Tc-2 08.09-T2
```

A session is now **three lines** where slice 016 made it four: the number, the
four groups two-by-two, then the topics. The two removed cells sat in the row
*above* the group cells, so no group cell's width changed at any viewport, and
the stylesheet needed no rule change to get here:

```
CSS identical once comments are stripped: true
```

That comment-only diff is itself the evidence.

## 11. No page other than `/postep` changed

The prerendered HTML of every page was captured with the slice's code and with
the pre-slice code, both built against the same content tree, and compared with
the per-build id normalised — the instrument slice 016 established.

```
baseline pages: 44 | current pages: 44
identical: 43  differing: 1   (only ./postep.html)
```

`lib/dates.ts` is edited by this slice and is imported by `components/sources.tsx`
and `components/quote.tsx`. The edit is purely additive, and the 43 identical
pages are the measurement of that rather than the assertion.

No token moved, no colour was added, no dependency was added, and nothing on the
page is a client component.

## 12. Human eye — NOT MET, and not this run's to meet

Whether the narrower table is the one Viktar wants in front of a class, and
whether `03.09-T1` reads as well on a projector as it does on a laptop.

## 13. Fresh-context review

See the closing report.
