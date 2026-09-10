# plan.md — 020-progress-what-happened

- **Slice:** 020
- **Date:** 2026-09-10
- **Revised:** 2026-09-10, after the spec was amended before any code was
  written. The amendment adds `## What` §3 — a filled group cell reads
  `03.09-T1` — plus criteria 6a and 6b, a changed criterion 6, an *Out of
  scope* line and three entries in `## Decisions taken`. The old §3 is now §4.
  What the first version of this plan decided about the column removal still
  holds and is kept; §4 is new, and §1, §2, §3, §7 and §8 are revised where the
  new cell touches them.
- **Written from:** `constitution.md`, `AGENTS.md` and this slice's `spec.md`
  only — the fresh-context test of AGENTS.md §2, requirement 1. The repository
  was read afterwards, so that the file map names files that exist and the
  arithmetic below is measured against the stylesheet that is actually in the
  tree; nothing about *intent* comes from it.
- **Libraries:** **none added, none removed.** Criterion 11 holds by
  construction: nothing here reaches for a package.
- **Next.js in the tree:** 16.3.3. No API is used that `/postep` does not
  already use.

The spec was sufficient to plan from. **Four gaps**, all small, are named in
§9; none blocks a step.

The slice is now two halves that meet in one component.

- **A subtraction.** Two columns go. The interesting parts are not the
  deletions — those are four elements — but the three things that must survive
  them: a validation whose only trigger is the code being deleted (§6.2), a
  stacked grid that must not be "tidied" while it is open (§5.2), and a set of
  comments that become false the moment the deletion lands (§3.4).
- **An addition.** A filled group cell stops being a date and becomes a date
  *and a fact looked up in the calendar*. That is a new field of the model, a
  ninth refusal, and a fourth visible date form — §4 is the whole of it.

They meet in `Cell`, which is the only function in the repository that renders
a group cell and, after the subtraction, the only caller `Cell` has.

---

## 1. The arithmetic, restated for five columns at the new cell width

Slice 016 built the table around one measurement; this slice changes the column
count *and* the widest cell, so it is taken again. Same conditions:
`--text-sm` (0.875 rem = 14 px), JetBrains Mono (advance 0.6 em ⇒ 8.4 px per
character), cell padding `0.5rem` each side ⇒ 16 px per cell, `.lane` =
`--measure` = **624 px**.

The cell is now `dd.mm-T` plus the week's digits: **8 characters** for weeks
1–9, **9** for weeks 10–17. The calendar in the tree runs to week 17, so the
budget is taken at 9 — the wide case is the real one from November onwards.

| column | widest content | chars | text px | + padding |
| --- | --- | ---: | ---: | ---: |
| `Nr` | the header, and a two-digit number | 2 | 16.8 | **32.8** |
| `4Ta-1` … `4Tc-2` | `03.09-T17`, four times (the header is 5 chars and never governs) | 9 | 75.6 | **366.4** |
| | | | | **399.2** |

**399.2 px against a 624 px lane — 224.8 px of slack**, where the seven columns
had 33 and five `dd.mm.yyyy` columns would have had 191. Weeks 1–9 cost
365.6 px and leave 258.4.

The spec's *Out of scope* quotes 433 and 191, which are the figures for a
five-column table whose cells still carried the year — they were written before
the amendment and were not revised with it. The correct pair is **399 and 225**,
and the conclusion is unaffected: the shortest seeded topic wants some 340 px,
225 is not 340, and the spec's refusal to promote the topics to a column holds
by a wider margin than the spec claims for it. Named again in §9; the spec is
not edited (AGENTS.md §8) and the component's own comment carries the true
numbers (§3.4).

Two consequences that are *not* acted on, each refused for a reason:

- **The breakpoint could move, and by more than before.** 399.2 px plus the
  frame's two 1 rem gutters is 431.2 px ≈ **27 rem**, so the five-column table
  would fit from about 27 rem where the seven needed 41. It stays at 41 rem.
  Spec §4 lists "the stacked layout below 41 rem" among the things that are
  unchanged, and 41 rem is also where `.lane` stops shrinking and the fold
  `app/nav.css` already uses — it is still a real boundary, it is simply no
  longer the *tightest* one. The comment that claims it is derived from the
  seven columns becomes false and is rewritten (§5.3), which is the whole of
  the change here.
- **The table could stop filling the lane.** `.table` carries `width: 100%`, so
  `table-layout: auto` will spread the freed 225 px across five columns rather
  than leave the table 399 px wide. Keep `width: 100%`. Dropping it would pull
  the header's underline 225 px short of the right edge of the `h2 Zajęcia`
  rule directly above it — two rules of different lengths stacked on the same
  left edge — which is a visual decision, and spec criterion 11 says this slice
  makes none. It is also exactly the kind of thing criterion 12 hands to
  Viktar; if he wants a shrink-wrapped table it is one declaration and one
  commit.

---

## 2. File map

Five files. Three carry behaviour, one carries only comments, one is the
slice's evidence.

### Edited

| path | change |
| --- | --- |
| `lib/dates.ts` | **`formatDateDayMonth` added** — the fourth visible form (§4.4). The three existing formatters and `parseContentDate` are not touched; the module's header comment gains the sentence that says why there is now a fourth and who may not use it. |
| `lib/schedule.ts` | **The week lookup, the model field and the ninth refusal** (§4.1–4.3): `ScheduleGroupClass`, `groups` retyped, `weekOf`, one `fail`. Plus two comments — the one on `ScheduleSession` (§7) and the extension of the "deliberately NOT checked against the row's week" note beside the group loop. |
| `app/postep/schedule-table.tsx` | Two `<th>`s and two `<td>`s removed; the topics row's `colSpan` re-derived; `Cell` rewritten to the new form; two imports dropped; the file's doc comment corrected to §1's arithmetic. |
| `app/postep/page.module.css` | **Comments only.** No selector, no declaration and no value changes — §5 is the argument, and the comment-only diff is itself the evidence for criterion 10. |

### New

| path | what it holds |
| --- | --- |
| `specs/020-progress-what-happened/verification.md` | House convention — 012, 014, 015 and 016 each carry one. The evidence for every criterion, measured rather than asserted, and the three refusal messages verbatim. |

**Not touched, each for a stated reason:**

- `content/schedule.json` — criterion 8, in as many words. The two seeded
  sessions render correctly with no edit, which is the property spec §2 is
  claiming; touching the file would destroy the claim rather than prove it.
  (The group dates criterion 6 checks arrived in the content-lane commit
  `8d7785f`, after 016 closed. They are not this slice's to add or move.)
- `lib/schedule-schema.ts` — `sessionSchema` keeps `week` and `date` exactly as
  they are, and a group cell stays `z.string().optional()`. The week a date
  falls in is not a fact about the *file* and cannot be, because the schema is
  forbidden from knowing about the weeks list (that module's own header).
- `app/postep/page.tsx` — the calendar is criterion 4's subject and is
  unchanged. It still passes `schedule.sessions` and nothing else, which is one
  of the arguments of §4.1: resolving the week in the model means the page
  component's diff is empty and criterion 4 is evidenced by that emptiness.
- `app/page.tsx`, `components/`, `app/tokens.css`, `app/globals.css`,
  `app/prose.css`, `app/nav.css` — criterion 11. `components/sources.tsx` and
  `components/quote.tsx` import from `lib/dates.ts`, which this slice edits;
  the edit is purely additive, so neither file changes and neither render
  changes. T07 measures that rather than asserting it.
- `constitution.md` — Article X.
- `specs/016-group-progress/` — AGENTS.md §8. 016's spec is not edited to say
  what this slice decided; this slice is the record.

---

## 3. The markup

### 3.1 What goes

In `app/postep/schedule-table.tsx`, four elements and one comment:

```diff
   <thead><tr>
     <th scope="col">Nr</th>
-    <th scope="col">Tydz.</th>          (and the comment above it about the
-    <th scope="col">Data</th>            abbreviation buying 30 of 33px)
     {GROUPS.map(...)}
   </tr></thead>

   <tr className={styles.figures}>
     <th scope="row"><span className={styles.label}>Zajęcia</span> {session.number}</th>
-    <td><span className={styles.label}>Tydzień</span>{session.week}</td>
-    <td><span className={styles.label}>Data</span><Cell date={session.date} /></td>
     {GROUPS.map(...)}
   </tr>
```

**Removed, not hidden.** Spec decision 7 settles it and the mechanism matters:
`display: none` leaves the two cells in the markup and their labels in the
accessibility tree, so the stacked layout — where every value carries its label
as a real `<span>` precisely so that assisted and sighted readers get the same
page — would still announce a week and a planned date that nobody can see.
There is no version of this change that is done in the stylesheet.

Everything else in the file stays and is not incidentally affected: the row
`<th scope="row">` keeps its `Zajęcia` label and the session number; `Topic`,
the topics `<ul>`, the published/unpublished link rule, the `GROUPS` loop and
the `<tbody>`-per-session structure are untouched — criterion 5.

**Two imports do go**, and the first version of this plan was wrong to say none
would. `Cell` was the renderer for both the planned date and the group cells;
after §3.2 it takes a `ScheduleGroupClass` and formats it with
`formatDateDayMonth` and `formatDateIso`. So:

```diff
-import { formatDateIso, formatDateList, type ContentDate } from "@/lib/dates";
+import { formatDateDayMonth, formatDateIso } from "@/lib/dates";
-import type { ScheduleSession, ScheduleTopic } from "@/lib/schedule";
+import type {
+  ScheduleGroupClass,
+  ScheduleSession,
+  ScheduleTopic,
+} from "@/lib/schedule";
```

`formatDateList` keeps a caller in `app/postep/page.tsx` (the calendar prints
both of a week's dates with it) and `ContentDate` keeps callers throughout
`lib/`, so nothing in `lib/dates.ts` becomes unused. `eslint` is run without
`--max-warnings 0`, so a stale import would be a warning rather than a failure
— which is exactly why it is named here instead of being left to the linter.

### 3.2 What the group cell becomes

```tsx
function Cell({ entry }: { entry: ScheduleGroupClass | undefined }) {
  /* Empty means the group has not got there yet, and that is its only meaning
     (016 spec §5, and this slice's §3 keeps it). No dash, no em dash, no
     question mark, and no bare week: a placeholder in a cell that means "not
     yet" reads as a value. */
  if (!entry) return null;
  const text = `${formatDateDayMonth(entry.date)}-T${entry.week}`;
  return <time dateTime={formatDateIso(entry.date)}>{text}</time>;
}
```

Three decisions inside four lines.

- **One `<time>`, carrying the whole cell text.** `datetime` is the machine
  value and the text content is free when it is present, so `03.09-T1` inside a
  `<time datetime="2026-09-03">` is valid and is what criterion 6a is checking:
  one element per cell, and it exposes the full date, year included. Rejected:
  `<time>03.09</time>-T1`, two nodes that can drift apart under a wrap and that
  make criterion 6a ambiguous about which element it means.
- **The string is built in JS, not assembled out of JSX children.** Written as
  `{formatDateDayMonth(entry.date)}-T{entry.week}` the element has three text
  children, and React's server renderer separates adjacent text nodes with
  `<!-- -->` in the prerendered HTML. The DOM would still read `03.09-T1`, but
  the HTML file T03 greps would read `03.09<!-- -->-T<!-- -->1`. One template
  literal, one text child, and the evidence is a plain substring match.
- **The empty cell is untouched.** `if (!entry) return null` is the same shape
  as before, so `.label`'s comment in the stylesheet — an empty cell keeps its
  code and shows nothing after it — stays true word for word.

### 3.3 `colSpan`

`3 + GROUPS.length` ⇒ **`1 + GROUPS.length`**, which is 5.

The 3 was the session number plus the two columns that are going; the 1 is the
session number alone. Written as an expression and not as the literal `5` for
the reason the header row is a `GROUPS.map` and not four hand-typed `<th>`s:
the number of columns has exactly one source, so the topics row and the header
row cannot come to disagree about how wide the table is. Criterion 2 asks for
five columns and this is the only place in the component where "five" is
computed rather than counted.

### 3.4 The comments that become false

The component's doc comment opens with *"The seven numeric columns cost about
591 px at `--text-sm` in the mono face, and the lane is 624 px: they fit with
33 px to spare."* After this slice that sentence is wrong in every number.

It is rewritten to §1's figures — five columns, 399 px at the widest cell,
225 px of slack — and the paragraph it supports is **kept and strengthened**: a
topics column still does not fit, because the shortest seeded topic wants some
340 px and 225 is not 340. It also gains the one sentence that explains the
cell to the next reader: `03.09-T1` is the group's own date and the week *that
date* falls in, resolved in `lib/schedule.ts`, never the session's planned week.

This is not housekeeping. 016's closing review found two comments in the files
that slice had just written asserting a fact the run itself had disproved, and
recorded it as the thing the criteria missed. A slice whose entire content is
"these two columns are gone and the cells now carry a week" that leaves the
code saying there are seven columns has reproduced that failure deliberately.

---

## 4. The week a group's date fell in

Spec §3. This is the half of the slice that adds rather than removes, and every
question it raises is answered here.

### 4.1 Where the lookup lives: the model, in `lib/schedule.ts`

**The resolved week becomes part of the rendering model.** A filled group cell
stops being a `ContentDate` and becomes:

```ts
/**
 * What a filled group cell holds.
 *
 * The week is the one THIS DATE falls in, looked up in the calendar — never
 * `ScheduleSession.week`, which is what the session was planned for. The two
 * differ exactly when a group is behind, which is the fact the page exists to
 * show (spec §3, decision 4).
 */
export interface ScheduleGroupClass {
  date: ContentDate;
  week: number;
}
```

and `ScheduleSession.groups` becomes
`Partial<Record<Group, ScheduleGroupClass>>`. Absent still means the group has
not got there yet, so the empty cell needs no representation of its own.

**One object rather than two parallel maps** (`groups` plus a `groupWeeks`):
a cell is one fact, two maps can disagree about which groups are filled, and
with the pair in one object `Cell` cannot render a date without its week. That
is criterion 6's invariant expressed in the type instead of in a comment.

Rejected: **computing it in the component.**

1. **It would put a refusal outside `lib/`.** `lib/schedule.ts` opens with
   *"EVERY REFUSAL IS RAISED HERE OR IN THE SCHEMA, AND NOWHERE ELSE"*, in
   capitals, with the reason: refusals split across layers mean two message
   formats and two places to look when the build stops. Criterion 6b is a
   ninth refusal. Raised from `app/postep/schedule-table.tsx` it would have no
   `row` string, no `where` prefix and no `fail()` — the message would be the
   only one of nine that does not read like the other eight.
2. **The component does not have the weeks and should not be given them.**
   `ScheduleTable` takes `sessions`. Passing `weeks` in too widens its props
   for something the model already knows, and makes the component's
   correctness depend on the caller handing it the right calendar. It would
   also put `app/postep/page.tsx` in the diff, where criterion 4 wants it
   absent.
3. **It is the decision this module has already taken twice.** Nothing in
   `content/schedule.json` carries a lesson's title or its letter either;
   `ScheduleTopic` resolves both in `lib/schedule.ts` and the component renders
   what it is handed. A week resolved from a date is a title resolved from a
   slug in every respect that matters.
4. **`readSchedule` is wrapped in React's `cache()`**, so the lookup runs once
   per render pass. In the component it would run four times per session on
   every render, over a weeks array passed down through props.

Also rejected: resolving it in `app/postep/page.tsx` and passing enriched
sessions down — same three objections, plus it makes the page component hold
logic that its own doc comment says it has none of.

The lookup goes **inside the existing `for (const group of GROUPS)` loop**,
after `scheduleDate` has turned the string into a `ContentDate`. Order matters:
`2026-02-30` must keep giving the day-length message from `lib/dates.ts` rather
than "falls in no week". `weeks` is fully built and sorted before the sessions
loop begins, and the week-ordering refusal (`end < start`) has already fired by
then — so `weekOf` never sees an inverted range and the two refusals cannot
race.

### 4.2 What "falls in" means

```ts
/** The calendar week a class date falls in, or null if the calendar has none. */
function weekOf(date: ContentDate, weeks: ScheduleWeek[]): number | null {
  const iso = formatDateIso(date);
  const found = weeks.find(
    (week) => formatDateIso(week.start) <= iso && iso <= formatDateIso(week.end)
  );
  return found?.number ?? null;
}
```

**A date falls in a week when it is on or after that week's `start` and on or
before its `end` — both bounds inclusive.** Precisely:

- **Compared as normalised ISO strings, not as `Date` objects.** The idiom is
  the file's own: the week-ordering check three dozen lines above compares
  `formatDateIso(end) < formatDateIso(start)` and carries the reason in a
  comment — `new Date("2026-09-07")` is UTC midnight, and a local-time
  comparison across a DST boundary is a bug that appears twice a year. All
  three values here are day-precision and zero-padded by `formatDateIso`, so
  lexicographic order *is* chronological order. A second convention in the same
  file would be worse than either convention.
- **Inclusive is load-bearing, not a corner case.** `4Ta-2` did session 2 on
  `2026-09-11`, which is week 2's `end` exactly. An exclusive upper bound
  fails criterion 6 on the seeded file.
- **No widening, no nearest-week.** The weeks run Monday to Friday, so
  `2026-09-05` and `2026-09-06` lie in the gap between week 1's end and week
  2's start and match nothing. They are meant to. A class did not meet on a
  Saturday; a Saturday in a group cell is a typo, and attributing it to the
  week before would print a confident `T1` over it. The gaps are not only
  weekends: `app/postep/page.tsx` says the calendar lists *only the weeks that
  have been written*, because the breaks and the holidays are institutional
  facts this repo does not hold (Article V) — so a date in a school break, or
  in January when the calendar stops at week 17 in December, also falls in
  nothing. Spec decision 6 wants all of those stopped, and criterion 6b's test
  is one of them.
- **First match wins**, and `weeks` is already sorted ascending by number, so
  the lowest-numbered containing week is chosen. Nothing in the file refuses
  two weeks that overlap; this makes the result deterministic and documented
  without adding a refusal the slice was not asked for (§9).
- **A linear scan**, seventeen weeks against at most four cells per session. No
  index, no map: the ranges are intervals, not keys, and building an
  index would be more code defending a cost nobody is paying.

### 4.3 The refusal — criterion 6b

Raised by the existing `fail(row, …)` in `lib/schedule.ts`, so it inherits the
`content/schedule.json — session N:` prefix that all eight refusals share:

```ts
const week = weekOf(date, weeks);
if (week === null) {
  fail(
    row,
    `${group} — "${value}" falls in no week the calendar has, so the cell ` +
      `cannot say which week that class was in. Add the week containing it ` +
      `to "weeks", or correct the date: the calendar runs ` +
      `${formatDateIso(weeks[0].start)} to ` +
      `${formatDateIso(weeks[weeks.length - 1].end)}, Monday to Friday, and a ` +
      `weekend or a school break falls in none of it.`
  );
}
groups[group] = { date, week };
```

Which reads, for criterion 6b's own test:

```
Error: content/schedule.json — session 1: 4Ta-1 — "2026-09-05" falls in no week the calendar has, so the cell cannot say which week that class was in. Add the week containing it to "weeks", or correct the date: the calendar runs 2026-08-31 to 2026-12-25, Monday to Friday, and a weekend or a school break falls in none of it.
```

Why it reads like the other eight:

- **The row** comes from `fail`, which is the only way any message in this
  module names one — `session 1`, by the number the row declares.
- **The group** is the `${group} — ` prefix, which is the same shape
  `scheduleDate(value, row, group)` already produces for a malformed group
  date. So a bad date and an out-of-calendar date in the same cell open
  identically: `session 1: 4Ta-1 — …`. A reader learns one shape, not two.
- **The date** is quoted as the author wrote it (`value`, the raw string), not
  as the parser normalised it — the same choice refusal 6 makes when it quotes
  `week.end` and `week.start` back.
- **It says what to write instead**, which is the module's stated contract with
  its reader: two repairs, in the order they are likely — add the week, or fix
  the date — and then the calendar's span, so that "past the end of the
  calendar" and "in a gap inside it" are distinguishable without opening the
  file. That mirrors refusal 3, which ends by listing the weeks that do exist;
  listing eighty-five valid school days is not an option, so the span is the
  enumeration's equivalent.
- **Non-empty by schema.** `scheduleFileSchema` requires `weeks` to have at
  least one entry, so `weeks[0]` and `weeks[weeks.length - 1]` are safe and
  need no `?.` — one comment says so, or the next reader adds one.
- The span is read off the ends of the number-sorted array, which is the
  calendar the reader sees on the page. Nothing forces a week's number order to
  match its date order; if it ever did not, the span in the message would be
  descriptive rather than exact — the refusal itself scanned every week, not
  just the ends, so the *decision* is right regardless of what the sentence
  says.

### 4.4 The visible form, and where it lives

**`dd.mm` goes into `lib/dates.ts` as a fourth exported formatter**, beside the
other three:

```ts
/**
 * `03.09` — a day and a month, for the group cells on /postep.
 *
 * The fourth visible form and the only one `docs/content-style.md` does not
 * assign, because it is not a form an author may choose: nothing under
 * content/ can reach it and no MDX component renders it. /postep covers one
 * school year and the calendar above the table prints the year on every row,
 * so the table's cells drop it (slice 020, decision 5) while the <time>
 * element keeps `formatDateIso` as its machine value.
 *
 * A coarser precision falls through to `formatDateList` rather than inventing
 * a shorter form — `09` is not a date. A group cell cannot reach that branch,
 * because `scheduleDate` refuses a schedule date that names no day.
 */
export function formatDateDayMonth(date: ContentDate): string {
  if (date.month === undefined || date.day === undefined) {
    return formatDateList(date);
  }
  return `${pad(date.day)}.${pad(date.month)}`;
}
```

The module's reason for existing is the argument for putting it there. Its
header says the three forms are spelled *"once, rather than three times beside
three components — which is how the mixing happened in the first place"*. A
`dd.mm` implemented inside `app/postep/schedule-table.tsx` is literally a
fourth date form spelled beside a fourth component: the shape the module was
written to end.

The objection worth answering is the other half of that header: the three forms
are derived from `docs/content-style.md`, which fixes three and assigns them to
three places, and a fourth export could be read as claiming the style guide has
four. It does not, and the function's doc comment says so in its first
sentence — this form is `/postep`'s furniture, it is unreachable from `content/`
and it is not an option an author has. The module's own header gains one
sentence to the same effect, so that the count in the header and the count of
exports do not silently disagree (the §3.4 discipline, applied to `lib/`).

Rejected:

- **`formatDateList(date).slice(0, 5)` in the component.** A string operation
  on a formatted string, correct only while day-precision output happens to
  start with `dd.mm`, and quietly wrong at the other two precisions —
  `08.2026` would become `08.20`. "THREE PRECISIONS, AND THE RENDERING NEVER
  INVENTS ONE" is the first thing `lib/dates.ts` says about itself.
- **A local helper in `app/postep/schedule-table.tsx`.** Honest about scope and
  wrong about placement, for the reason above; it also puts a second `pad` in
  the tree.
- **Throwing on a coarser precision.** A refusal in a fourth place (§4.1's
  objection 1), in the render path, for a case `scheduleDate` already refuses
  one layer up. None of the three existing formatters throws; this one does not
  either.

**`datetime` is untouched.** `formatDateIso(entry.date)` — the full ISO date,
year included, which is criterion 6a and is also what makes dropping the year
from the text a rendering decision rather than a loss of data.

---

## 5. The stylesheet

### 5.1 The stacked layout below 41 rem — what the grid becomes

**It becomes a 2 × 2 of the four groups, and `grid-template-columns: 1fr 1fr`
does not change.**

Today the grid's children are seven: the session-number `<th>`, which takes
`grid-column: 1 / -1` and spans, then six cells flowing two per row —

```
Zajęcia 1
Tydzień        1     Data          <- row 1
4Ta-1                4Ta-2         <- row 2
4Tc-1                4Tc-2         <- row 3
```

Remove two cells and the spanning `<th>` plus four group cells remain. Two
columns, two rows, with the new cell text:

```
Zajęcia 1
4Ta-1      03.09-T1    4Ta-2      04.09-T1
4Tc-1      08.09-T2    4Tc-2      08.09-T2
```

The first content row disappears and rows 2 and 3 move up. **Nothing else
happens**, and that is the argument for changing nothing:

- Two columns is already the right number for four groups, and the rows that
  survive are the two class-code halves ADR-0014 names — `4Ta` on one line,
  `4Tc` on the next. Any other track count breaks that pairing: one column
  gives four lines and loses the *read across a row* that the whole page is
  for; four columns gives 66 px per group at 375 px against a cell that wants
  76 px of value on its own.
- The removed cells were in the row **above** the group cells, so no group
  cell's *track* changes at any viewport. What changes is what sits in it, and
  it gets narrower — see the arithmetic below.
- `.figures > th`'s `grid-column: 1 / -1`, the `0.3rem 1.5rem` gap, the
  `space-between` flex on each cell and the `.label` colour are all still doing
  exactly the job they were written for.

**The 320 px tightness the first version of this plan flagged is gone, and the
new cell is what removed it.** Below 41 rem the lane is the viewport less two
1 rem gutters, so a column is `(343 − 24) / 2 = 159.5 px` at 375 and
`(288 − 24) / 2 = 132 px` at 320. A filled group cell is the label (`4Ta-1`,
5 chars, 42 px), the flex `gap: 0.5rem` (8 px) and the value:

| value | chars | value px | cell px | 320 px track (132) |
| --- | ---: | ---: | ---: | --- |
| `03.09.2026` — before this slice | 10 | 84.0 | 134.0 | **2 px over** |
| `03.09-T1` — weeks 1–9 | 8 | 67.2 | 117.2 | 14.8 px to spare |
| `03.09-T17` — weeks 10–17 | 9 | 75.6 | 125.6 | 6.4 px to spare |

So the cell fits at 320 px in both cases, where the dated cell did not, and the
contingency the first version of this plan reserved — drop the column gap from
`1.5rem` to `1rem` to buy 8 px — is not needed and is not taken. Criterion 9's
320 px reading measures a geometry that got *looser*, not one that changed
shape.

One note for the reader of the rendered page rather than the stylesheet: the
value now contains a hyphen, so it has a break opportunity that a bare date did
not, and a narrower track than any measured here would wrap it to `03.09-` /
`T17`. That is legible and is not a document overflow, so it fails no
criterion; the lever if it is ever wanted is `white-space: nowrap` on
`.figures > td`, and this slice does not take it, because the arithmetic says
it never happens at or above 320 px and because the CSS diff being comment-only
is worth more than a declaration nothing needs.

### 5.2 The specificity trap — the one thing not to touch

```css
.table .figures {          /* NOT `.figures` */
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

`.table tr { display: block }` is a class **and** an element — specificity
(0,1,1) — and out-specifies a bare `.figures` at (0,1,0). Written as `.figures`
the `display: grid` silently loses to `display: block` and every session stacks
into one column, fourteen lines each. 016 shipped that bug, found it at 375 px,
and left the reason in a comment beside the selector.

This slice opens that block to edit the comment two rules below it. **The
selector is not simplified, not merged, and not moved**, and the comment
explaining why stays word for word. It is the single highest-value line in the
file and it exists because the mistake has already been made once.

### 5.3 The wide layout — comments only

The declarations in `@media (min-width: 41rem)` are correct for five columns
and for the new cell without a change: `.table thead` back to a header group,
`.figures` back to a table row, cells back to table cells with `nowrap` and
`0.5rem` padding, `.label` back to `display: none` because the column header
says it, and `tbody + tbody > .figures > *` still drawing the separator on the
row group. `white-space: nowrap` here is what keeps `03.09-T17` on one line in
the wide table, and it is already present.

What changes is the block's opening comment, which currently derives 41 rem
from *"exactly where the 624 px the seven columns need is guaranteed"*. That
derivation is dead: five columns need 399 px and would fit from about 27 rem.
The rewritten comment keeps 41 rem and gives its two surviving reasons — it is
where `.lane` stops shrinking, and it is the fold `app/nav.css` already treats
as one — plus the note that spec §4 pins the stacked layout's boundary, so
moving it is not this slice's to do. The sentence about a media query being
unable to read `var(--measure)` stays; it is still why the literal is there.

The `.figures > *` comment ends *"Four groups, two lines"*, which was a
description of the last two rows of a three-row grid and is now a description
of the whole of it. One word.

---

## 6. What must not change, and the mechanism that guarantees it

Spec §2 asks for something easy to say and easy to break: two fields that stay
**validated** while becoming **unrendered**. There is no test suite in this
repo, so "guaranteed" has to mean *the code that validates them is not in the
diff*, not *we were careful*. §4 makes this harder rather than easier: the
module those two fields live in is now open for editing, and one of them —
`week` — is about to sit six lines away from a different week that the page
does print.

### 6.1 The week cross-check — criterion 7

`lib/schedule.ts` refuses a session naming a week the calendar does not have
with an explicit statement:

```ts
if (!seenWeeks.has(session.week)) {
  fail(row, `it points at week ${session.week}, which the calendar does not have. …`);
}
```

`session` there is a row of `parsed.data` — **the file**, not the model. The
check has no relationship to what any component renders and cannot be reached
from `app/postep/`. This slice does not touch that statement: it edits the
group loop below it, adds a type above it and adds two comments. T06 proves the
behaviour rather than the absence, because the file is no longer outside the
diff and an argument from the file map would now be worth less.

The message's tail lists the weeks that do exist, so it names 1–17 rather than
016's "1, 2". The *shape* is what criterion 7's "with the same message" means,
and T06 quotes the new one verbatim.

### 6.2 The planned date — spec §2, second bullet

This one is genuinely fragile and is the reason §7 exists. The only thing in
the repository that validates a session's planned date is the expression that
builds the model field:

```ts
date: session.date ? scheduleDate(session.date, row, "date") : null,
```

`scheduleDate` is what refuses `2026-02-30` and what refuses a month written
where a day belongs. **Delete the model field and the parse goes with it**, and
spec §2's "still refused when it is not a real date" stops being true with no
build failure, no lint error and no diff anywhere near the schema.

Note that the seeded file contains no `date` on either session — the field is
optional and neither session uses it. So nothing on the rendered page and no
build of the file as it stands would notice the loss. T06 proves it by adding a
temporary `"date": "2026-02-30"` to session 1 and watching the build stop.

### 6.3 The file and its schema

`content/schedule.json` is untouched (criterion 8, checked with
`git status --porcelain -- content/schedule.json` at the end of the slice) and
`lib/schedule-schema.ts` is untouched, so `sessionSchema` still requires
`week: z.number().int().min(1)`, still accepts an optional `date`, and still
takes a group cell as an optional string. A schedule file written for 016 is
parsed by exactly the schema 016 wrote and renders here without an edit — which
is spec §2's last claim, and criterion 6 is what demonstrates it: the dates the
new cells print are the dates that were already in the file.

---

## 7. The dead-code check, revisited

The amendment changes this section's answer in one respect and sharpens it in
another. Four layers now, and they must not be confused:

| layer | what | after this slice |
| --- | --- | --- |
| **The data** | `sessions[].week`, `sessions[].date` in `content/schedule.json`, and their entries in `sessionSchema` | **Live.** Read by the schema on every build. The spec forbids removing them and this slice does not go near them. |
| **The validation** | `if (!seenWeeks.has(session.week))` and `scheduleDate(session.date, …)` in `lib/schedule.ts` | **Live.** Both read the parsed *file*. Neither has a caller in `app/`. |
| **The resolved week** | `ScheduleGroupClass.week`, computed by `weekOf` | **New, and read.** `Cell` prints it. This is the field the amendment adds and it is the only week the page renders. |
| **The model's planned fields** | `ScheduleSession.week: number` and `ScheduleSession.date: ContentDate \| null` | **Written and never read**, exactly as before. `app/postep/schedule-table.tsx` is the only consumer of `ScheduleSession` in the repository — checked — and it is the file that stops reading them. |

So the first version's finding survives the amendment unchanged in substance:
**the two planned model fields become dead; nothing else does.** The new field
does not rescue `ScheduleSession.week`, because the `T` in a cell comes from
the group's own date and never from the session's plan — that is the whole
content of spec decision 4.

**But the hazard changed shape, and it got worse.** Before the amendment, an
agent told to tidy up would have seen two unread fields and deleted them.
Now it will see a page that prints `T1` next to a session whose model carries
`week: 1`, and the obvious "simplification" is to point the cell at
`session.week` and delete `weekOf`. The result builds, lints, and renders a
table where every cell in a row agrees — which looks *more* correct than the
truth. It would also make the two `4Tc` groups' being a week behind invisible
again, which is the exact failure spec decision 4 exists to prevent, and no
criterion in this slice or in 016 would catch it once the slice has closed.

**Decision: keep both planned fields, and write the comment that says all of
this.** The reasoning per field is unchanged:

- `date` **cannot be removed without removing its validation.** §6.2 is the
  argument. The only way to keep the parse after removing the field is a bare
  statement whose sole purpose is to throw —
  `if (session.date) scheduleDate(session.date, row, "date");` — a shape that
  reads as a no-op, has no test defending it, and is precisely what the next
  reader deletes.
- `week` **could** be removed without weakening criterion 7, since its check is
  a statement of its own. It stays anyway, for symmetry with `date` and because
  spec decision 2 wants bringing a column back to be a rendering change.

**What is added, and it is the whole non-functional part of the `lib/` diff:**

1. A comment on `ScheduleSession` recording that `week` and `date` are
   validated and deliberately unrendered as of slice 020; that `date`'s parse
   is the only thing that validates it; and — the new sentence — that the `T`
   in a group cell is `ScheduleGroupClass.week` and must never be rewired to
   `week`, with the reason in one clause.
2. An extension of the existing comment beside the group loop, which today
   reads *"Deliberately NOT checked against the row's week: a group two weeks
   behind the plan is not an error, it is the fact this page exists to show."*
   That is still true and is now easy to misread, because the loop directly
   below it does look a group's date up in the calendar. The extension says
   what the difference is: the date is matched against **every** week to find
   the one it is in, and is never compared against `session.week` to decide
   whether it is allowed.

**Rejected: leaving the comments out.** Cleaner as a diff, and it leaves two
fields that look unused and a third that looks redundant, in a file whose next
reader will be an agent told to tidy up. Comments are the only mechanism this
repo has here.

**Rejected: removing the model fields and moving `date`'s validation into
`lib/schedule-schema.ts`** as a Zod refinement. It would make the model honest
at the cost of giving Zod a second opinion about how many days February has —
the exact thing `lib/schedule-schema.ts`'s own header comment refuses, and the
reason `parseContentDate` is reused everywhere else. The same objection kills
the parallel idea of resolving the week in the schema: the schema is forbidden
to know about the weeks list at all.

---

## 8. Order of work

Each step is one commit, `020/TNN:`, and each names its check. The instruments
are 016's and 012's, reused rather than invented: `.next/server/app/postep.html`
is the prerendered markup `next build` writes for the route, and
`documentElement.scrollWidth − clientWidth` against the dev server is the
overflow instrument `specs/012-one-left-edge/verification.md` established.

The order is: the subtraction first, because it stands alone and builds green;
then the addition, in two commits, because `formatDateDayMonth` is additive and
can land on its own while the model field and its only consumer cannot.

| # | step | the check |
| --- | --- | --- |
| **T01** | `app/postep/schedule-table.tsx`: the four elements out, `colSpan` ⇒ `1 + GROUPS.length`, the doc comment rewritten to §1's arithmetic (§3.1, §3.3, §3.4). `Cell` still renders `dd.mm.yyyy` at this point. | `npm run build` succeeds **and lists `/postep` as `○` static**; `npm run lint` clean — criterion 1. Then, from `.next/server/app/postep.html`: the `<thead>` cells read exactly `["Nr","4Ta-1","4Ta-2","4Tc-1","4Tc-2"]` and each `.figures` row has five children — **criterion 2**. The `<table>`'s own text contains neither `Tydz.` nor `Data` and contains `Tydzień` zero times — **criterion 3, wide half**; scoped to the table element and not grepped over the page, because the calendar above legitimately prints `Tydzień N` seventeen times and a bare grep proves nothing. The topics `<td>` carries `colspan="5"`, its `<li>`s carry the letters and titles, and the published ones are `<a>` — **criterion 5**. |
| **T02** | `lib/dates.ts`: `formatDateDayMonth` and the header comment's fourth-form sentence (§4.4). Nothing calls it yet. | `npm run build`, `npm run lint`. `git diff -- lib/dates.ts` touches no existing function — the three formatters and `parseContentDate` are outside the diff, which is what keeps every other date on the site out of this slice. |
| **T03** | `lib/schedule.ts` **and** `app/postep/schedule-table.tsx`, one commit: `ScheduleGroupClass`, `groups` retyped, `weekOf`, the refusal, the two comments (§4.1–4.3, §7); and `Cell` rewritten with its imports (§3.2). **One commit because the field's type change and its only consumer cannot be split without a commit that does not build.** | `npm run build` succeeds and `/postep` is still `○` static; `npm run lint` clean. From `.next/server/app/postep.html`: session 1's four group cells read `03.09-T1`, `04.09-T1`, `08.09-T2`, `08.09-T2` and session 2's read `10.09-T2`, `11.09-T2` and two empties — **criterion 6**, quoted as substrings, with the two `4Tc` cells carrying `T2` against a session whose file says `"week": 1` called out as the point of the criterion rather than a coincidence. Each of those six is inside one `<time>` whose `datetime` is the full ISO date — **criterion 6a**. Then **criterion 6b**: session 1's `4Ta-1` temporarily moved from `2026-09-03` to `2026-09-05`, the Saturday after week 1 ends, ⇒ `npm run build` stops with the message of §4.3, quoted verbatim; the bytes read beforehand are written back rather than `git checkout` (see T06). |
| **T04** | `app/postep/page.module.css`: the wide-layout header comment rewritten, the `.figures > *` note corrected (§5.3). | `git diff -- app/postep/page.module.css` shows **only comment lines** — no `+`/`−` on a selector, a property or a value. That diff is the evidence for criterion 10's first half and for §5.2 not having been "tidied". `npm run build`, `npm run lint`. |
| **T05** | No code. Measurement, against `npm run dev`. | **Criterion 3, narrow half:** at 375 px, the live `<table>`'s `textContent` contains no `Tydzień`, no `Tydz.` and no `Data`, and the `.label` spans in it are exactly the four group codes plus `Zajęcia`. **Criterion 9:** `scrollWidth − clientWidth` on `/postep` at 320, 375, 656, 700, 768, 1024, 1280 and 1585 — all zero. 656 and 700 are 016's closing review's addition: just above the breakpoint is where the wide table is tightest, and the original six-width grid skipped it. **Criterion 10:** at 375 px each `<tbody>` renders three lines — the session number, then `4Ta-1`/`4Ta-2`, then `4Tc-1`/`4Tc-2` — with every group's cell beside its own code as a real `<span>` and on one line; read from the DOM, plus the measured cell width against §5.1's table, and a screenshot at 375 and at 320 for the report. **Criterion 4:** the calendar's `<li>`s still number seventeen, each with its number and both dates in `dd.mm.yyyy`, ascending — the year still appears there and nowhere else on the page. |
| **T06** | No code. The two refusals §6 is about, one at a time, **restoring the bytes read beforehand rather than running `git checkout`** — Viktar keeps uncommitted content edits in this tree and a checkout would take them with it (016's verification records the same discipline). | **Criterion 7:** session 1 temporarily pointed at a week the calendar does not have ⇒ `npm run build` stops with `content/schedule.json — session 1: it points at week N, which the calendar does not have. Add that week to "weeks", or point the session at one of: 1, 2, …, 17.` Quoted verbatim in `verification.md`. Then `"date": "2026-02-30"` added to session 1 ⇒ the build stops with `content/schedule.json — session 1: date — "2026-02-30" has no day 30 — luty 2026 has 28.`, which is the check that a field nothing renders is still refused (§6.2). **Criterion 8:** `git status --porcelain -- content/schedule.json` empty afterwards — covering T03's edit as well as these two — and `git log --oneline -- content/schedule.json` unchanged by this slice. |
| **T07** | No code. The did-anything-else-move check. | **Criterion 11:** the prerendered HTML of every page captured before and after the slice and compared with the build id normalised — 016's instrument — showing **`/postep` as the only page whose markup differs**. This is the check that carries the weight for `lib/dates.ts`: `components/sources.tsx` and `components/quote.tsx` import from it, and an empty diff on every lesson page is what proves the addition was additive. Plus `git diff --stat` naming only the four files of §2, and `git diff -- package.json package-lock.json` empty. |
| **T08** | `verification.md`, then the closing review in a fresh subagent context (AGENTS.md §3). | **Criterion 13:** the review reports no gap. `verification.md` carries the three refusal messages of T03 and T06 verbatim in one section, so the ninth refusal is filed beside the two it must read like. **Criterion 12 stays unchecked** — whether the narrower table is the one Viktar wants in front of a class is his eye, and the final report names it and points at the screenshots from T05. |

T01 and T04 could be one commit and are not, for the reason 016 separated its
own layout steps: the CSS diff being comment-only is the evidence that the
stacked layout did not change, and burying it inside a markup commit makes that
evidence something a reviewer has to reconstruct. T01 corrects the comment in
its *own* file, so no commit leaves a file contradicting itself — and T03 does
the same for the sentence about what the cell now holds.

**Every criterion has a step.** 1 → T01 · 2 → T01 · 3 → T01 + T05 · 4 → T05 ·
5 → T01 · 6 → T03 · 6a → T03 · 6b → T03 · 7 → T06 · 8 → T06 · 9 → T05 ·
10 → T05 · 11 → T07 · 12 → nobody, by design · 13 → T08.

---

## 9. Where the spec left this plan guessing

Named per AGENTS.md §3 rather than filled in quietly. None is load-bearing.

1. **What "falls in" means at the edges.** The spec says a date in no listed
   week fails the build and names the Saturday case only through criterion 6b's
   test instruction. It does not say whether a date between two listed weeks
   might be attributed to one of them. §4.2 reads "falls in" as `start ≤ d ≤
   end` and refuses everything else — which is the only reading under which
   criterion 6b's own test fails the build, so the criterion settles it. The
   inclusive **upper** bound is a decision the spec does not state at all, and
   criterion 6 depends on it: `4Ta-2`'s `2026-09-11` is week 2's last day.
2. **Which week wins when two listed weeks overlap.** Nothing in the file
   refuses an overlap, and the spec does not raise it. §4.2 takes the
   lowest-numbered match, deterministically, and adds no refusal — a slice that
   was asked for a lookup is not entitled to a tenth refusal.
3. **The spec's own arithmetic is stale by 34 px.** *Out of scope* says five
   columns cost about 433 px and leave about 191, which are the figures for
   cells that still carried the year; with `dd.mm-T17` they cost 399 and leave
   225 (§1). The conclusion — a topics column wants ~340 and does not fit — is
   unaffected and is in fact stronger than the spec claims. Not fixed here:
   editing an approved spec to match what was measured is AGENTS.md §8's second
   prohibition. Worth one line in the final report.
4. **Whether criterion 6a's "the element carrying each of those" permits one
   element carrying the date *and* the week.** §3.2 reads it as yes and renders
   a single `<time datetime="2026-09-03">03.09-T1</time>`, which is valid HTML
   and makes the criterion a check on one node. If Viktar wanted the `T1`
   outside the `<time>`, it is a two-line change in `Cell`.

Two carried forward from the first version of this plan, unchanged by the
amendment:

5. **Whether "the table has five columns" (criterion 2) is about the header row
   or about every row.** The topics row spans the table and is therefore one
   `<td>` with `colspan="5"`, exactly as it was one `<td>` with `colspan="7"`
   before. §3.3 reads the criterion as being about the table's column count —
   which is what `colSpan` is computed from — and T01 checks both the five
   `<th>`s and the `colspan="5"`, so either reading is satisfied by the same
   evidence.
6. **Whether the model may keep fields nothing renders.** Spec §2 and decision
   2 are explicit about the data and the validation and say nothing about
   `ScheduleSession`. §7 decides it — keep them, comment them — and names the
   alternative it rejected. If Viktar wants the model to carry only what the
   page draws, `week` can go in one commit; `date` cannot, and §6.2 is why.

And the smallest: the spec does not say whether the breakpoint may move now
that 41 rem is derived from nothing. §1 keeps it, because §4 lists the stacked
layout below 41 rem among the things that do not change, and reads that as
pinning the boundary as well as the layout.
