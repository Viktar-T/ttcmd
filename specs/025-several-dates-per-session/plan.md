# plan.md — 025-several-dates-per-session

- **Slice:** 025
- **Date:** 2026-10-01
- **Written from:** `constitution.md`, `AGENTS.md` and this slice's `spec.md`,
  read in that order and in full — the fresh-context test of AGENTS.md §2,
  requirement 1. **A design was fixed from those three alone, before any other
  file was opened:** an entry that is a date or a list of dates; each date
  checked by the code that checks a single date today, so the old messages
  survive untouched; a model that holds a date-ordered list per cell; a wrapper
  element only where there are two or more dates, so one date renders as it
  does now; existing tokens only; and a scratch copy of the tree, made with
  `git archive`, for every "before" build and every temporary schedule. The
  order of the tasks was *not* fixed at that point.
  **The repository was read afterwards**, so that the file map names real files
  and every claim about existing behaviour is measured. Nothing about intent
  comes from it. What was read, all after the design:
  - Code: `lib/schedule-schema.ts`, `lib/schedule.ts`, `lib/dates.ts`,
    `app/postep/page.tsx`, `app/postep/schedule-table.tsx`,
    `app/postep/page.module.css`, `app/fonts.ts`; `package.json`,
    `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `.gitattributes`,
    `.gitignore`, `.claude/launch.json`, `scripts/check-design-invariants.mjs`;
    `content/schedule.json` (read only, never written) and the committed copy
    of it from `git show`.
  - Installed packages: `node_modules/next/dist/docs/` (dev and build output
    directories, `cssChunking`, the route-table legend) and
    `node_modules/zod/v4/core/schemas.js` plus `locales/en.js` (how a union
    reports failure in 4.4.3).
  - **The earlier production build in `.next/`, dated 2026-09-24 by its trace**
    — before sessions 4 and 5 had any group date. Used for *structure only*:
    the markup of a cell, how many stylesheets a page links, where the build id
    occurs. Nothing was written to it.
  - Process records, for method and not for intent: `docs/sdd-journal.md`
    (slices 022 and 024), `specs/022-session-titles/verification.md`, the first
    forty lines of `specs/022-session-titles/plan.md` (header shape; the start
    of its file map), a search of `docs/roadmap.md`, `docs/design-reference.md`
    and `docs/adr/0014-…`, a search of `docs/`, `.claude/` and the root
    documents for any description of the schedule's format (none beyond the
    roadmap and the journal), and one search of
    `specs/016-group-progress/spec.md` to confirm that its decision 9 exists.
  - Read-only shell commands: git reads (`log`, `status`, `show`, `ls-files`,
    `check-ignore`), `netstat`, `du`, `wc`, `grep`, `ls`, `cat`, `find`, `awk`,
    and version queries. **Two inline `node -e` one-liners** also ran, both
    read-only — one parsed a built CSS file to print its rule boundaries, one
    parsed a JSON piped from `git show`. No npm script, build, install or git
    write was run, and the only file written is this one.
- **What reading changed in the design:** (1) the date refusals already live in
  `lib/schedule.ts`, not in Zod, so the union only affects a wrongly typed entry
  (§2.5, X1); (2) the prerendered page embeds a cell's children literally and
  React separates adjacent text nodes, so the one-date cell must stay the same
  JSX, not merely the same HTML (§2.3); (3) pages link *two* stylesheets, not
  one (§6, G1); (4) Check B of the invariants script scans comments as well as
  rules (§2.4); (5) builds fetch two typefaces from Google, so a scratch build
  needs the network (§4.1); (6) the task order — style rules first — came from
  reading how the class would be consumed (§5).
- **Libraries:** none added, none removed. Next.js 16.3.3 (Turbopack), React
  19.2.8, Zod 4.4.3, as installed. `Fragment` comes from `react`, which is
  already a dependency.

The spec was sufficient to plan from. No gap blocks the plan. Four deserve a
look, because the spec's words and the code disagree, or the spec is silent
where a message has to be written: G1 (the stylesheet), G2 (a sentence that
contradicts two others), G3 (a wrongly typed entry) and G5 (an old message
that becomes false) — all in §6. This plan is unapproved by construction
(AGENTS.md §2); the decisions it makes are listed at the end of §2 for Viktar
to veto.

---

## 1. File map

| path | change |
| --- | --- |
| `app/postep/page.module.css` | **Edited (T01).** One rule for the block that holds several dates, one override in the wide layout, and the "ONE VALUE, ONE LINE" comment corrected (§2.4, §3). |
| `lib/schedule.ts` | **Edited (T02, T03).** T02: `groups` holds a list per cell, and the loader wraps today's single date in a list of one. T03: the loop accepts lists, checks each date, refuses an empty entry and a repeated date, sorts; a written sentence for a wrongly typed entry; the unknown-group sentence amended; five comments corrected (§3). |
| `app/postep/schedule-table.tsx` | **Edited (T02).** `Cell` takes the list. The one-date branch is today's JSX moved into a helper unchanged; the several-dates branch is new. |
| `lib/schedule-schema.ts` | **Edited (T03).** A group's entry is a string or a list of strings; the type and its comment. |
| `specs/025-several-dates-per-session/tasks.md` | **New**, written from §5 by the caller. Boxes are ticked only for what was verified. |
| `specs/025-several-dates-per-session/verification.md` | **New (T04).** House convention since slice 012: the command and its output for every criterion. |
| `docs/sdd-journal.md` | **Edited (T04).** A "Slice 025" heading with one *Agent notes* entry. The reflection sections are Viktar's and are not written. |

**Not touched, deliberately:**

- `content/schedule.json`. Criterion 11, and the owner's uncommitted edit lives
  there. No check writes to it (§4.1); no commit stages it (§5, rule 2).
- `app/postep/page.tsx` — passes `schedule.sessions` as today.
- `lib/dates.ts` — `formatDateIso` and `formatDateDayMonth` are reused as they
  are; no fifth date form.
- `app/tokens.css`, `app/globals.css`, `package.json`, `package-lock.json`,
  `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`,
  `scripts/check-design-invariants.mjs` — criterion 10. The last one *reads*
  the files this slice edits (§2.4, Check B).
- `docs/roadmap.md` — recording a slice there is a separate `docs:` commit by
  precedent (`6d851ed docs: record slice 022 in the roadmap`), not a task.
- `docs/adr/`, `constitution.md`, `AGENTS.md`, `CLAUDE.md`,
  `specs/016-*`, `specs/020-*`, `specs/022-*` — spec decision 9, Article X,
  AGENTS.md §8. Line 133 of the roadmap ("a group cell reads 03.09-T1") is a
  record of slice 020 and stays true of a one-date cell.
- Every other page and component.

---

## 2. Design

### 2.1 The data, as written and as accepted

As the author writes it, in a session's `groups`:

```json
"groups": {
  "4Ta-1": ["2026-09-22", "2026-09-29"],
  "4Ta-2": "2026-09-24"
}
```

| entry | file layer (`lib/schedule-schema.ts`) | loader (`lib/schedule.ts`) |
| --- | --- | --- |
| key absent | accepted (optional) | no cell content, as today |
| `"2026-09-22"` | accepted: a string | one date, held as a list of one |
| `["2026-09-22", "2026-09-29"]` | accepted: a list of strings | each date checked, then sorted |
| `["2026-09-22"]` | accepted | identical to the bare string, including the markup |
| `[]` | accepted — it is a list of strings | **refused**, R3 |
| `5`, `null`, `{}`, `["2026-09-22", 29]` | **refused** by the union | a written sentence, X1 |
| a key that is not one of the four groups | refused by `strictObject`, as today | the sentence is amended, X2 |

The file layer says only what shape the file has: the entry becomes
`union(string, list of string)` under the existing `optional()`, inside the
existing `strictObject` built from `GROUPS`. Dates stay strings there and become
dates one layer up, as the schema's own header says. `[]` is left to the loader
because only the loader knows the session, so it is the loader that can name it.

**Order of work inside one entry**, in written order, stopping at the first
refusal exactly as the build stops at the first refusal today:

1. an empty list → R3;
2. for each date: `scheduleDate` (a real day, day precision — unchanged) →
   `weekOf` and the "falls in no week" refusal (unchanged) → the repeated-date
   check, on the *normalised* ISO form → push `{ date, week }`;
3. sort the list ascending by the ISO form. Sorting never refuses.

Because every date goes through the same `scheduleDate` and the same
`weekOf`-then-`fail` the single date goes through, criterion 7 holds by
construction and criterion 6's first two refusals are the *existing* messages.
The comment above the loop already says the order matters — an impossible date
must keep the day-length message instead of "falls in no week" — and the loop
keeps that order for every date.

### 2.2 The model the renderer receives

`ScheduleGroupClass` keeps its shape — `{ date: ContentDate; week: number }`,
one date with the week that date falls in. What changes is its meaning
(one date, no longer one cell) and the field that holds it:

```ts
groups: Partial<Record<Group, ScheduleGroupClass[]>>
```

Every key that is present holds a **non-empty** list, **ascending** by date,
**no two the same**. An absent key is an empty cell. All three are true by
construction in `readSchedule`, and the field's comment says so — the file's own
habit of stating an invariant where the type is. A plain array is used rather
than a non-empty tuple: TypeScript cannot narrow a length check into a tuple,
and a cast would assert what the loop already guarantees.

Sorting lives in the model, not in the renderer, so a second consumer cannot
print them in another order.

### 2.3 The rendered markup

Three cases. The first two are what the page emits today, measured in the
2026-09-24 build (`{m}` is the page module's class prefix, `page-module__`
plus a hash — `da8XEa` in that build and in slice 022's record, which an edit
to the file's rules did not move):

```html
<!-- no entry: unchanged -->
<td><span class="{m}__label">4Tc-2</span></td>

<!-- one date: unchanged, byte for byte -->
<td><span class="{m}__label">4Ta-1</span><time dateTime="2026-09-22">22.09<!-- -->-T<!-- -->4</time></td>

<!-- two or more: new -->
<td><span class="{m}__label">4Ta-1</span><span class="{m}__dates"><time dateTime="2026-09-22">22.09<!-- -->-T<!-- -->4</time> <time dateTime="2026-09-29">29.09<!-- -->-T<!-- -->5</time></span></td>
```

Three consequences of what the measured HTML shows:

- **The one-date cell keeps the same JSX.** `{day-month}-T{week}` has three
  text children, which React separates with `<!-- -->`; a template literal
  would print `22.09-T4` with no markers and change every one-date cell's bytes
  and the page's embedded data. The journal records the same lesson for an
  untitled session in slice 022. So the single-date branch returns today's
  expression, moved into a helper without edit, with no key and no wrapper.
- **The wrapper exists only from two dates up.** Wrapping every cell would
  change the embedded data of every cell that holds one date, and criterion 2
  would fail for every one of them.
- **The wrapper is the cell's second flex item, not a pair of them.** The narrow
  layout lays a cell out as the code at one end and its value at the other
  (`display: flex; justify-content: space-between` on every direct child of the
  row). Two `<time>` elements as direct children would be three flex items and
  would spread across the cell. One `span` holding them keeps the cell a
  two-item row.

A single space separates the dates in the wrapper. Flex layout ignores it; a
text-only reader and `textContent` get `22.09-T4 29.09-T5` instead of
`22.09-T429.09-T5`. It sits between two elements, so React adds no marker.

Illustrative shape of `Cell` (the helper is today's JSX; the keyed branch is the
only new markup):

```tsx
function dateTime(one: ScheduleGroupClass) {
  return (
    <time dateTime={formatDateIso(one.date)}>
      {formatDateDayMonth(one.date)}-T{one.week}
    </time>
  );
}

function Cell({ held }: { held: ScheduleGroupClass[] | undefined }) {
  if (!held) return null;
  if (held.length === 1) return dateTime(held[0]);
  return (
    <span className={styles.dates}>
      {held.map((one, index) => (
        <Fragment key={formatDateIso(one.date)}>
          {index > 0 && " "}
          {dateTime(one)}
        </Fragment>
      ))}
    </span>
  );
}
```

The key is the ISO date, which is unique inside an entry because a repeated date
is refused.

### 2.4 The stylesheet

Two rules in `app/postep/page.module.css`, on no new token and no colour:

```css
/* stacked layout, after .label */
.dates {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

/* inside the existing @media (min-width: 41rem) block, after .label */
.dates {
  align-items: flex-start;
}
```

Stacked: the wrapper is the cell's value, so it sits at the end beside the
code, its lines stacked and right-aligned to one edge. The code stretches to the
cell's height with its text on the first line, so it is beside the first date.
The grid row takes the taller cell's height; a neighbour's text stays on its
first line. Wide: the cell is a table cell, the label is `display: none`, and
the dates stack from the left like the single dates in the other rows. The
rules are not nested under `.figures > *`: the wrapper is a grandchild of the
row, so that selector never reaches it and the specificity of
`.table .figures` is not in play. No `nowrap` is added in the stacked layout —
a single date does not have one there either, and giving two dates one would
swap "a date may wrap at its hyphen" for "the document may scroll sideways"
(criterion 8).

**What the built stylesheet will look like** (from the 2026-09-24 build): the
minifier moves `display` last in a block and merges adjacent rules with equal
declarations into a selector list — slice 022 met that with
`.topics,.title{margin:0}`. Neither new rule has a twin, so no merge is
expected; the check (§4.1, I3) removes the new rules by selector and undoes a
merge explicitly if one appears.

**Check B** (`scripts/check-design-invariants.mjs`, run by `npm run build`)
reads every line of every `.css`, `.ts` and `.tsx` under `app/`, `lib/` and
`components/` — comments included. A new comment or message must contain no hex
literal of three, four, six or eight digits and none of `rgb(`, `hsl(`,
`oklch(`, `oklab(`, `lch(`, `lab(`, `color(`, `color-mix(`. The messages in §2.5
contain none.

### 2.5 Every refusal, in full

`fail(row, message)` prefixes `content/schedule.json — session N: `. Each
message below is what is passed as `message`; the line printed is shown for one
example. The reader is Viktar on a Monday evening: each names the row and the
group, and says what to write instead.

**Unchanged — and they stay unchanged, character for character (criterion 7).**
Each date in a list goes through the same code as a single date.

- R1, an impossible day (from `lib/dates.ts`, via `scheduleDate`):
  `content/schedule.json — session 4: 4Ta-1 — "2026-09-31" has no day 31 — wrzesień 2026 has 30.`
- R2, a date in no week:
  `content/schedule.json — session 4: 4Ta-1 — "2026-12-28" falls in no week the calendar has, so the cell cannot say which week that class was in. Add the week containing it to "weeks", or correct the date: the calendar runs 2026-08-31 to 2026-12-25, Monday to Friday, and a weekend or a school break falls in none of it.`
- The month-precision and malformed-string messages likewise (`4Ta-1 is "2026-09",
  which is a month rather than a day. …`; `4Ta-1 — "22.09.2026" is not a date. …`).

**New — spec §3.**

- R3, an entry with no date in it:
  `${group} — the list is empty. A group that has not got to this session yet is left out of the row, and a second way of saying so would hide a half-finished edit. Delete the "${group}" line, or write its dates: "${group}": ["yyyy-mm-dd", "yyyy-mm-dd"].`
  Printed:
  `content/schedule.json — session 4: 4Ta-1 — the list is empty. A group that has not got to this session yet is left out of the row, and a second way of saying so would hide a half-finished edit. Delete the "4Ta-1" line, or write its dates: "4Ta-1": ["yyyy-mm-dd", "yyyy-mm-dd"].`
- R4, the same date twice in one entry (the date is shown in its normalised
  form, which is also what the page would have printed twice):
  `${group} — "${iso}" is written twice. A group's entry holds each class once, and two identical lines in a cell would read as a bug. Delete one of them, or correct the one that was meant to be another day.`
  Printed:
  `content/schedule.json — session 4: 4Ta-1 — "2026-09-22" is written twice. A group's entry holds each class once, and two identical lines in a cell would read as a bug. Delete one of them, or correct the one that was meant to be another day.`

**New — added by this plan, not by the spec (§6, G3, G5).**

- X1, an entry that is neither a date nor a list of dates. Zod 4.4.3 reports a
  union whose branches both fail on type as one `invalid_union` issue at the
  entry's own path, whose message is "Invalid input" (`handleUnionResults`;
  `locales/en.js`) — worse than today's "expected string, received number". A
  branch in `describeSchemaFailure`, after the unknown-key branch and before the
  topics branch, taken when the path runs `sessions → N → groups → <group>` or
  deeper:
  `${group} must be a date, as "${group}": "yyyy-mm-dd", or a list of dates, as "${group}": ["yyyy-mm-dd", "yyyy-mm-dd"], one for each class the group spent on this session. A group that has not got there yet leaves the "${group}" key out altogether.`
  Printed:
  `content/schedule.json — session 4: 4Ta-1 must be a date, as "4Ta-1": "yyyy-mm-dd", or a list of dates, as "4Ta-1": ["yyyy-mm-dd", "yyyy-mm-dd"], one for each class the group spent on this session. A group that has not got there yet leaves the "4Ta-1" key out altogether.`
  (The shape follows the existing title sentence: *title must be text … as
  "title": "…". A class with no registered name yet leaves the "title" key out
  altogether.* The placeholders are `yyyy-mm-dd`, as in the existing messages,
  so no plausible date is written into a message.)
- X2, an unknown group, sentence amended (it said a cell holds one date):
  `"4Tb-1" is not one of this course's groups. The four are 4Ta-1, 4Ta-2, 4Tc-1, 4Tc-2 (ADR-0014), and a group cell holds that group's own date as yyyy-mm-dd, a list of dates when the session took more than one class, or nothing at all.`

Illustrative shape of the loop (T03), to show where each refusal sits and that
the old ones are not re-worded:

```ts
const entry = session.groups?.[group];
if (entry === undefined) continue;
const written = typeof entry === "string" ? [entry] : entry;
if (written.length === 0) fail(row, `${group} — the list is empty. …`);   // R3
const classes: ScheduleGroupClass[] = [];
const seen = new Set<string>();
for (const value of written) {
  const date = scheduleDate(value, row, group);          // R1, unchanged
  const week = weekOf(date, weeks);
  if (week === null) fail(row, `${group} — "${value}" falls in no week …`); // R2, unchanged
  const iso = formatDateIso(date);
  if (seen.has(iso)) fail(row, `${group} — "${iso}" is written twice. …`);   // R4
  seen.add(iso);
  classes.push({ date, week });
}
classes.sort((a, b) => (formatDateIso(a.date) < formatDateIso(b.date) ? -1 : 1));
groups[group] = classes;
```

### 2.6 Decisions made in this plan

One line each, naming what was rejected. For Viktar to veto.

1. **The wrapper exists from two dates up.** Rejected: wrapping every cell
   (fails criterion 2 for every one-date cell); `<br>` between the dates (a
   child of the flex row in its own right); a `<ul>` (list semantics, a second
   markup shape and a reset of its margins and bullets for the same thing).
2. **A single space between the dates in the wrapper.** Rejected: nothing,
   which prints `22.09-T429.09-T5` wherever layout is not applied.
3. **Style rules first (T01), the model and renderer second (T02), the new
   syntax last (T03).** Rejected: markup and rules in one commit (the rename of
   a stylesheet that most pages link would land beside the behaviour change and
   criterion 2 could not be checked cleanly); the syntax first (the owner could
   write a list the page cannot yet lay out; and a class used before it exists
   fails silently, since `styles.dates` would be `undefined`).
4. **A list of one date is accepted** and renders as the bare string does.
   Rejected: refusing it — a third refusal the spec did not ask for, which
   would stop the build on a half-finished edit that is valid.
5. **A repeated date is found after parsing, on the ISO form, in the same loop
   as the other checks.** Rejected: comparing the raw strings (misses
   `" 2026-09-22"`, which `parseContentDate` trims and accepts); a separate
   pass first (would report a repeat before an impossible date).
6. **The list is sorted in `readSchedule`.** Rejected: sorting in the
   renderer.
7. **A written sentence for a wrongly typed entry (X1).** Rejected: letting
   "Invalid input" through.
8. **The unknown-group sentence is amended (X2).** Rejected: leaving a message
   that says a cell holds one date.
9. **Every "before" build and every temporary schedule lives in a scratch tree
   built with `git archive`.** Rejected: producing the "before" in the working
   tree (slice 022's note describes the old and new source built back to back
   against one content tree — it works, and every file it swaps is one two dev
   servers are watching); and writing temporary schedules over the owner's
   file, as the spec's notes describe (it works, and is a write to a file he is
   editing).

---

## 3. Stale comments

Line numbers are as at `7db9833`. Each is corrected in the task that makes it
untrue, in the same commit.

| # | where | says | why it stops being true | corrected to | task |
| --- | --- | --- | --- | --- | --- |
| 1 | `lib/schedule-schema.ts:31` | "What a group cell may hold: a date, or nothing at all (spec §5)." | a cell may hold several | "What a group's entry may hold: one date, a list of dates — one for each class the group spent on the session — or nothing at all (016 §5, widened by slice 025)." The type becomes `Partial<Record<Group, string or list of string>>`. | T03 |
| 2 | `lib/schedule.ts:171-173` — a **message**, not a comment | "…a group cell holds that group's own date as yyyy-mm-dd, or nothing at all." | same | X2 in §2.5 | T03 |
| 3 | `lib/schedule.ts:115-119` | "Three shapes are worth naming, … the three a person actually types wrong: a session title with nothing in it, an unknown group code, and a topic…" | a fourth branch (X1) is added | "Four shapes …: a session title with nothing in it, an unknown group code, a group's entry that is neither a date nor a list of dates, and a topic…" | T03 |
| 4 | `lib/schedule.ts:211-224` (`ScheduleGroupClass`) | "What a filled group cell holds." … "a cell is one fact: with the pair together the renderer cannot print a date without its week" | a cell holds a list of these | "What ONE of a group's dates holds. … a date is one fact: with the pair together the renderer cannot print a date without its week. A cell holds one of these or several, earliest first (slice 025)." | T02 |
| 5 | `lib/schedule.ts:247` (`groups` on `ScheduleSession`) | no statement of what a present entry holds | the field becomes a list | a short doc comment: non-empty, ascending, no two the same, by construction in `readSchedule`; absent means an empty cell | T02 |
| 6 | `lib/schedule.ts:280-281` (`weekOf`) | "A linear scan: seventeen weeks against at most four cells in a session." | each cell may hold several dates | "…against the few dates a session's four cells hold." | T03 |
| 7 | `lib/schedule.ts:427-438` (the group loop) | drift is "visible in the cell rather than inferable by comparing dates across a row — and the date is still never compared with `session.week`" | still true, but silent on the new rule within an entry | extended: "…and since slice 025 no date is compared with another for order: an entry is sorted for display and refused only for a date written twice." (This sentence is also where the reading of spec §5 in §6, G2, is recorded in the code.) | T03 |
| 8 | `app/postep/schedule-table.tsx:39-48` (`Cell`) | "`03.09-T1` — the day, the month, and the week THAT DATE fell in …" | still true per date; silent on several | add: one per date, earliest first (slice 025); one date renders with nothing around it, several sit in `.dates` | T02 |
| 9 | `app/postep/page.module.css:146-155` | "ONE VALUE, ONE LINE: the label at the start, the value at the end …" | a cell with several dates has a value of several lines | "ONE VALUE, ONE BLOCK: … a cell with several dates keeps the shape — its value is `.dates`, one flex item whose lines stack, so the code stays at the start of the first line." | T01 |

**Checked and left alone — still true:** `schedule-table.tsx:35-37` ("Empty
means the group has not got there yet, and that is its only meaning");
`page.module.css:93-107` ("every value carries its label in the DOM" — a cell
carries it once); `page.module.css:174-177` (`.label` — an *empty* cell is
unchanged); the first paragraph of `lib/schedule-schema.ts` ("Dates are
`z.string()` here" — true of each date in a list); `lib/schedule.ts:23-42`;
`lib/dates.ts:155-168`; the citations to 016 §5 that remain as history.
**Stale for another reason, not touched:** the width arithmetic in the header of
`schedule-table.tsx` ("a 624px lane — 225px of slack") has been out of date
since slice 023.

---

## 4. Checks

### 4.1 Ground rules and instruments

**Ground rules.**

1. **`content/schedule.json` in the working tree is read and never written** by
   any check. Every temporary schedule is a file inside the scratch tree. So
   "restored byte-for-byte" holds for the owner's file trivially, and the
   protocol the spec cites — save bytes and hash first, restore by hash, end
   with `git status` showing only his edit — is kept as a **tripwire**, not as
   the method: `sha256sum content/schedule.json` before the first check (call it
   H0; it was `3b4be0313d06f5478c2a24153c22bffd837ba74d832665f1ae0caf4f96b60f46`
   when this plan was written — an indication, not a gate: read it afresh) and
   after the last. Equal: say so. Different:
   the owner edited it during the run (the journal records this happening in
   slices 022 and 024) — say so, change nothing, and rest criterion 11 on the
   commit list instead (§4.2, 11).
2. **Staging is by path.** `git add -A` and `git commit -a` would sweep the
   owner's uncommitted edit into a slice commit. Before every commit,
   `git diff --cached --name-only` is printed and must equal the task's file
   list in §5.
3. **Ports 3000 and 3001 are the owner's dev servers** (`netstat`: 3000 and
   3001 listening; `.next/dev/lock` names the one on 3001). The scratch server
   uses 3101, after `netstat -ano | grep :3101` shows it free, and is stopped by
   the PID the run started.
4. **Network.** `app/fonts.ts` uses `next/font/google`, so every build — scratch
   or main — downloads two typefaces. A failed download fails the build for a
   reason that is not the slice's: retry; if it cannot be done, say "not
   verified" and stop (AGENTS.md §3). Build the two sides of a comparison back
   to back: if Google serves a new font file between them, the global
   stylesheet's `@font-face` lines and the preloads differ, and that is not the
   slice's either (the control in I2, step 4).
5. **A main-tree `npm run build` is safe beside the dev servers.** Next 16
   writes `next dev` output to `.next/dev` and `next build` to `.next`
   (`node_modules/next/dist/docs/01-app/03-api-reference/06-cli/next.md` says
   the two can run concurrently without conflicts, and `.next/dev/` is there).
   It overwrites the 2026-09-24 build in
   `.next/`, which this plan used for structure only. `npx tsc --noEmit` writes
   the ignored `tsconfig.tsbuildinfo`. If a build rewrites `tsconfig.json`,
   `git status` will show it — that file is tracked: report it, do not commit it.
6. Anything in `git status --short` other than ` M content/schedule.json` and
   the current task's own files is reported and left alone.

**The instruments.** They live in the scratch root and are not committed.

**I1 — the scratch tree.** `S=D:\t025`: outside the repository (`tsconfig.json`
includes `**/*.ts` and `**/*.tsx` and ESLint walks the tree, so a scratch tree
inside it would be checked as the project's) and a short path (nested
`node_modules` paths against Windows' 260 characters). Once:

- create `D:\t025` with `tree`, `cap`, `pinned` and `out` inside it;
- `cp /d/code/ttcmd/content/schedule.json /d/t025/pinned/schedule.json` —
  **P**, "the schedule as it stands today", with H0 recorded. A *read* of the
  working-tree file;
- copy `node_modules`: `robocopy D:\code\ttcmd\node_modules D:\t025\tree\node_modules /E /MT:16 /NFL /NDL /NJH /NJS /NP`
  in PowerShell (exit code below 8 is success). 581 MB were measured; a
  directory junction was not tried — Turbopack is reported to refuse a
  `node_modules` symlink that resolves outside the project root, and a copy
  cannot be wrong that way.

To **capture** a revision `<rev>` with a schedule `<sched>` as `<label>`, in Git
Bash:

1. empty the tree except `node_modules`:
   `cd /d/t025/tree && find . -mindepth 1 -maxdepth 1 ! -name node_modules -exec rm -rf {} +`;
2. `git -C /d/code/ttcmd archive <rev> app components lib content scripts package.json package-lock.json next.config.ts tsconfig.json eslint.config.mjs | tar -x -C /d/t025/tree`.
   This reads the object database and nothing else. Nothing under `docs/` or
   `specs/` is read at build time (a search of `app`, `lib`, `components` and
   `scripts` finds them named only in comments), `public/` is not tracked, and
   limiting the pathspec keeps `docs/`'s non-ASCII paths out of `tar`.
   `.gitattributes` is `* text=auto eol=lf`, so the committed bytes are LF as
   they are in the working tree;
3. if commits that are not the slice's landed on `main` between BASE and `<rev>`
   (the owner commits content-lane work while a slice runs), overlay BASE's
   content so the two trees differ only by the slice's code:
   `git -C /d/code/ttcmd archive <BASE> content | tar -x -C /d/t025/tree`, and
   record `git log --format='%h %s' BASE..HEAD -- content` in `verification.md`;
4. `cp <sched> /d/t025/tree/content/schedule.json`; `rm -rf /d/t025/tree/.next`;
5. `cd /d/t025/tree && npm run build > /d/t025/out/<label>.log 2>&1; echo $? > /d/t025/out/<label>.exit`
   (redirect from Git Bash, which keeps UTF-8 — `>` in Windows PowerShell 5.1
   re-encodes, and the messages contain `—` and `ń`). A build is about 35 s
   (measured: 34 s, 22 of them static generation);
6. keep, under `/d/t025/cap/<label>/`: `.next/BUILD_ID`; every `*.html`, `*.rsc`
   and `*.meta` under `.next/server/app/`, with their paths (`cp --parents`),
   which includes every `*.segments/` directory; and `.next/static/chunks/*.css`.

**BASE** is the parent of the T01 commit
(`git rev-parse "$(git log --format=%h --grep='^025/T01:' -1)^"`). The commits
between `7db9833` and BASE should touch only `specs/`; check it with
`git diff --stat 7db9833 BASE -- app lib components scripts package.json`, which
must be empty, and say what moved if it is not.

**I2 — compare two captures, normalised.** For each capture:

- **N1 — the build id**, the literal text of its `BUILD_ID` file (21
  characters; `XumUqte4dIGBjEdwgvsaj` in the earlier build, found once in each
  of `postep.html`, `postep.rsc` and each of the three segment files, and in
  `postep.meta` not at all). Replaced by `@BUILD_ID@` in every kept `html`,
  `rsc` and `meta` file.
- **N2 — the stem of the CSS-modules chunk**: the one chunk under
  `static/chunks/` that contains the page module's rules, found by
  `grep -l '__figures>' *.css` (`3uqvg85e28zvs` in the earlier build; three
  times in `postep.html`, twice in `postep.rsc`). Replaced by `@MODULES_CSS@`.
- **Nothing else.** In particular **not** the global chunk's name
  (`3ypc2jqy4p_lb` in the earlier build): it must be equal as it stands. And not
  the module's class prefix `{m}`: it is `da8XEa` both in the earlier build and
  in slice 022's record, so an edit to the file's rules did not move it. That is
  an observation, not a promise — if it does move, every `class` attribute on
  the page differs and the comparison below says so, which is the right outcome.

The replacement is binary-safe (read and write as `latin1` in a short Node
script, or `sed`); the files are UTF-8 and the strings are ASCII.

1. Both captures have the same list of files.
2. Every file is byte-identical after normalisation: `cmp`. **The HTML is one
   line, so a line diff is useless** — on a difference print 80 bytes either
   side of the first differing offset (`cmp -l | head -1`, then `head -c`).
3. The global chunk has the same name and the same bytes in both.
4. The control (only if step 2 fails): capture BASE a second time and compare
   it to the first. If *that* differs, the build is not deterministic — name
   the files, exclude exactly those from the comparison and say so. This is the
   check for the font hazard in rule 4.

**I3 — the stylesheet, "only by the rules this slice adds".** On the *head*
capture's CSS-modules chunk: read the prefix `{m}` from
`{m}__figures` (`grep -o 'page-module__[A-Za-z0-9_-]*__figures'`); split the
file into top-level rules by brace matching, descending one level into
`@media`; in every selector list that names `{m}__dates`, delete that selector
and its comma; if the list is then empty, delete the rule; touch nothing else.
Print what was removed. Pass: **the result equals the base capture's chunk
byte for byte** (`cmp`), and the removed text is exactly the two `.dates` rules
(or, if the minifier merged one into a list, that merge, named). The scope is
the prefix plus `__dates`, never the bare word: slice 022's first instrument
also stripped another module's own `__title`, and its second cut a half out of a
merged list and left a comma. Contingency: if the build drops unused CSS-module
rules, the T01 build has no `__dates` text at all, "removed" is empty and the
chunk equals base — record that, and let T02 (where the class is first used)
carry the check.

**I4 — a refusal run.** In the scratch tree, at the head revision (U1 and U2
also at BASE, for criterion 7): write the
variant to `tree/content/schedule.json`; `npm run build`; expect a non-zero exit
and the message in the log (`grep -F`, not a regex — the messages contain
regex characters); then **revert** by copying `$S/pinned/schedule.json` back and
`cmp`-ing it. Variants are **P with only the named change** — all in session 4
(`4Ta-1` is the group varied; the other two groups keep P's dates):

| name | change | purpose |
| --- | --- | --- |
| S5 | session 4 `groups` = `4Ta-1: ["2026-09-22","2026-09-29"]`, `4Ta-2: ["2026-09-24","2026-10-01"]`, `4Tc-1: ["2026-09-24","2026-10-01"]`; session 5: the `groups` key removed | criteria 5, 8, 9 — the spec's example |
| S5b | S5, except `4Ta-1: ["2026-10-01","2026-09-22","2026-09-29"]` and `4Ta-2: ["2026-09-24"]` | criteria 3, 4; and a list of one |
| R1 | `4Ta-1: ["2026-09-22","2026-09-31"]` | 6, an impossible day inside several |
| R2 | `4Ta-1: ["2026-09-22","2026-12-28"]` | 6, a date in no week |
| R3 | `4Ta-1: []` | 6, no date |
| R4 | `4Ta-1: ["2026-09-22","2026-09-22"]` | 6, a repeat |
| U1 | `4Ta-1: "2026-09-31"` | 7, a single impossible day |
| U2 | `4Ta-1: "2026-12-28"` | 7, a single date in no week |
| X1 | `4Ta-1: 5`; and `4Ta-1: ["2026-09-22", 29]` | added: the wrongly typed entry |
| X2 | an extra key `"4Tb-1": "2026-09-22"` in session 4 | added: the amended sentence |

The variants are produced from P by a short script that parses, edits and
writes JSON, never by hand — so everything not named is P's.

**I5 — the browser.** In the scratch tree after an S5 build:
`npx next start -p 3101` in the background. Evaluate the measurements below in
the page with any browser that has a script console (the Browser pane will do).
A width the window cannot reach is tested in a same-origin `iframe` of exactly
that CSS width, created from the page itself, with the measurements run on
`iframe.contentDocument`: an iframe has its own layout viewport, its own media
queries and its own scrollbar, so it is the stand-in for a window of that width.
Stop the server by its PID afterwards.

### 4.2 Criterion by criterion

Every "passes when" is a measurement. Evidence in `verification.md` is the
command and its output.

1. **Build, static route, lint.** In the main tree at the final commit:
   `npm run build`; `npm run lint`; `npx tsc --noEmit`. Passes when all three
   exit 0; the build prints `Design invariants OK.`; its route table has a line
   `○ /postep` (the legend is `○  (Static)   prerendered as static content`,
   per the Next docs); and `.next/server/app/postep.html` exists afterwards.
   `npm run lint` prints no finding. The *baseline* is measured first, on BASE
   and before T01: if lint is not clean there, the criterion reads "no new
   finding" and the report says why (§6, G9). Every task runs this check.
2. **No change when no group holds several dates.** I1 with P, at BASE and at
   the head revision; I2 and I3. Passes when I2 steps 1–3 pass, the page count
   is equal on both sides (55 in the earlier build — compare, do not assume),
   and I3 passes. In particular `postep.html`, `postep.rsc`,
   `postep.segments/**` and `postep.meta` are identical after N1 and N2. The
   per-task versions are in §5: T01 against BASE (N1 and N2), T02 against T01
   and T03 against T02 (**N1 only**: no style rule moves in those two, so even
   the stylesheet's name is equal).
3. **Two dates render in one cell, a third renders a third line.** S5 and S5b,
   from `postep.html`. Find the `<tbody>` whose row header is
   `<span class="{m}__label">Zajęcia</span> <!-- -->4</th>`. On **S5** the four
   `<td>` that follow the header must be, in order, exactly:
   - `<td><span class="{m}__label">4Ta-1</span><span class="{m}__dates"><time dateTime="2026-09-22">22.09<!-- -->-T<!-- -->4</time> <time dateTime="2026-09-29">29.09<!-- -->-T<!-- -->5</time></span></td>`
   - the same for `4Ta-2` and `4Tc-1` with `24.09-T4` and `01.10-T5`
     (`dateTime="2026-09-24"`, `dateTime="2026-10-01"`);
   - `<td><span class="{m}__label">4Tc-2</span></td>`.

   On **S5b**, `4Ta-1` must hold three `<time>` elements in the order `22.09-T4`,
   `29.09-T5`, `01.10-T5`; and `4Ta-2` — written as a list of one — must be
   `<td><span class="{m}__label">4Ta-2</span><time dateTime="2026-09-24">24.09<!-- -->-T<!-- -->4</time></td>`,
   with no wrapper, identical to the cell the bare string produces. The text of
   each `<time>`, with `<!-- -->` removed, is `dd.mm-Tn` for the week that date
   falls in (22.09 is in week 4, 28.09–02.10 is week 5).
4. **Written out of order, the dates render in date order.** S5b: written
   `01.10, 22.09, 29.09`, rendered `22.09-T4, 29.09-T5, 01.10-T5`. Passes when
   the three `<time>` elements appear in that order.
5. **The example renders as asked.** S5. Passes when the session-4 row is
   exactly the four cells listed under criterion 3 for S5; the text of the
   row reads `Zajęcia 4 4Ta-1 22.09-T4 29.09-T5 4Ta-2 24.09-T4 01.10-T5
   4Tc-1 24.09-T4 01.10-T5 4Tc-2`; and the session-5 `<tbody>` contains **no**
   `<time` and each of its four `<td>` equals `<td><span class="{m}__label">GROUP</span></td>`
   exactly — no placeholder. The schedule was a scratch file; the working-tree
   file's hash is H0 (or the owner's change is reported, rule 1).
6. **The build refuses each, one at a time, reverting between.** I4 with R1–R4,
   each `cmp`-reverted before the next. Passes when each build exits non-zero
   and its log contains, as a fixed string, the line from §2.5:
   R1 `…session 4: 4Ta-1 — "2026-09-31" has no day 31 — wrzesień 2026 has 30.`;
   R2 the "falls in no week" line for `"2026-12-28"`;
   R3 the "list is empty" line for `4Ta-1`;
   R4 the "is written twice" line for `"2026-09-22"`.
   Each names session 4 and `4Ta-1`; R1, R2 and R4 name the date; R3 and R4
   say what to write instead. The four lines are the evidence.
7. **A single date is refused with today's message.** I4 with U1 and U2 at
   **BASE and at the head revision**. Passes when, for each, the message line
   in the BASE log equals the head log's, character for character (`cmp` on the
   two extracted lines), and U1's line equals R1's, U2's equals R2's — the same
   code ran for the single and the listed date.
8. **No document scrolls sideways.** S5 build, I5, at 320, 375, 768, 1024,
   1280 and 1585 px (and, free, 655 and 656 — either side of the 41rem fold).
   For each width, on the `<html>` and `<body>` of `/postep`: `scrollWidth −
   clientWidth`. Passes when it is ≤ 0 for both at every width, and no element
   in the document has `getBoundingClientRect().right` more than 0.5 px beyond
   the root's `clientWidth`. If a width fails, run the same on a P build
   before deciding whom it belongs to (§6, G9).
9. **At 375 px each session reads as one block.** S5 build, I5, a 375 px frame,
   the `<tbody>` of session 4 (and, as an extra, the same at 320). Passes when,
   by `getBoundingClientRect`, **all** hold:
   - *one block:* the `<tbody>` rect contains every cell and the topics row;
     the previous session's `<tbody>` ends at or above where this one begins,
     and this one ends at or above where the next begins;
   - *code beside its dates:* for each non-empty cell, the code's rect and the
     first `<time>`'s overlap vertically, and the code's right edge is at or
     left of that `<time>`'s left edge;
   - *every date visible:* each `<time>` has a non-zero width and height, lies
     inside its own cell's rect and inside `0…clientWidth`, has
     `visibility: visible` and a `display` other than `none`, and
     `elementFromPoint` at its centre returns it or a descendant; the cell's
     `scrollWidth` does not exceed its `clientWidth`;
   - *unambiguous:* each date's centre lies in exactly one cell's rect; the
     four cells' rects pairwise do not intersect; each non-empty cell holds
     exactly one code; the right edges of a cell's dates agree within 0.5 px;
   - *one cell, not two:* in a two-date cell the second date's top is within
     2 px of the first's bottom, and the cell is taller than a one-date cell of
     another session (session 3, say) by one line pitch, within 2 px — a single
     block that grows, with one code.
   An **extra on S5b**, whose session-4 row puts a three-date cell (`4Ta-1`)
   beside a one-date cell (`4Ta-2`): at 375 px the neighbour's `<time>` has the
   same top as the first `<time>` of the tall cell, within 1 px, so a taller
   cell does not move its neighbour's text; and at 768 px and up the first
   dates of every non-empty cell in the row share a top, within 1 px.
   Screenshots at 375, 1280 and 1585 are saved to `$S/out/` for Viktar. They
   are supporting evidence and close nothing.
10. **Nothing else changed.** (a) The full-page comparison of criterion 2 *is*
    the "no other page" check: every page file in both captures is identical
    after N1 and N2 (53 of the 55 pages linked the renamed chunk in the earlier
    build). (b) `git diff
    BASE..HEAD -- package.json package-lock.json app/tokens.css app/globals.css`
    is empty; `git diff -U0 BASE..HEAD -- app lib components | grep '^+' | grep -E 'use client|useState|useEffect|addEventListener|<script'`
    prints nothing; `git diff -U0 BASE..HEAD -- app/postep/page.module.css |
    grep '^+' | grep -E -- '--[a-z-]+[[:space:]]*:'` prints nothing (no custom
    property defined) and the build's Check B passed (no colour literal);
    `git diff --name-only BASE..HEAD` lies inside §1's file map. (c) Scripting
    disabled: `curl -s http://localhost:3101/postep` — no script engine runs —
    on the S5 build returns HTML containing every `<time>` of criterion 3. The
    client scripts the page loads are named in the HTML and are therefore
    covered by (a). Passes when (a), (b) and (c) pass.
11. **No commit of this slice touches the schedule.**
    `git log --format='%h %s' --grep='^025/T' BASE..HEAD -- content` prints
    nothing; `git diff --name-only BASE..HEAD | grep -c '^content/'` prints 0
    unless the owner committed content in between (then the first command is the
    evidence and the second is shown with its commits named). The working-tree
    file is compared with H0 (rule 1) and `git status --short` is shown.
12. **Human eye. Left unchecked by this run.** Whether two stacked dates read,
    on a projector, as "this took two classes" rather than as two sessions or
    as a mistake. What to look at: the 1280 px and 1585 px screenshots of
    session 4, and the same in a real projector-sized window — the wide layout,
    where each group's column holds its two dates one over the other. The
    run reports it as not met and says what to look at.
13. **Fresh-context review.** T04. A subagent that has none of this
    conversation is given `spec.md`, `git diff BASE..HEAD` and `verification.md`
    and nothing else, and is asked for gaps against the criteria and anything
    outside the slice's scope — not style. Passes when it reports no gap
    affecting correctness or the criteria; its report is quoted in the closing
    report. A gap it finds becomes a proposed `025/T05`, and T04 does not
    close until a re-review reports none.

### 4.3 What the run cannot close

- **12**, in full.
- **The perceptual part of 9.** The geometric tests stand in for "reads as one
  block" and "unambiguous"; they cannot say how it looks. The spec lists only 12
  as human-eye, so 9 is closed on its measurements, but the screenshots are
  there for him and the report says so (§6, G8).
- Anything that needs the network when it is down (rule 4).

---

## 5. Order of work

The spec's commit is `025/T00`; by precedent (slice 024) the plan and `tasks.md`
commits are `T00` too, and the code tasks begin at T01. Each task is one commit,
each leaves `npm run build` green with the owner's dev servers running, and none
stages `content/schedule.json`.

**Rules for every task.** (1) Read the relevant Next docs before writing code
(AGENTS.md §10): before T01,
`node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` and
`node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/cssChunking.md`.
(2) Stage by path and print
`git diff --cached --name-only` first. (3) **C0**, in the main tree, with its
output shown: `npm run build` (exit 0, `Design invariants OK.`, `○ /postep`),
`npm run lint` (exit 0, no finding), `npx tsc --noEmit` (exit 0, no output).
(4) Any later commit that touches `app/` or `lib/` re-runs the T03 evidence.
(5) A box in `tasks.md` is ticked only for what was verified; a half-done task
gets one handoff line.

**Preflight (no commit).** `git status --short` is exactly
` M content/schedule.json`. Record H0. Record BASE-to-be (`git rev-parse HEAD`).
Run C0 once on unchanged code and keep the output as the baseline for
criterion 1. Build the scratch tree (I1).

**T01 — `025/T01: add the style rules for a cell with several dates`**
- Files: `app/postep/page.module.css`.
- What: the two `.dates` rules (§2.4); comment 9 (§3). The rules are unused
  until T02.
- Check: C0; then `git diff --cached -U0 app/postep/page.module.css` — added
  lines are the two rules and the corrected comment, removed lines are only the
  old comment's; no `--x:` definition; no colour literal. Then capture BASE and
  T01 on P: I2 with N1 and N2 (zero differing files among every page),
  global chunk identical, and I3 (or its contingency).
- Why first: the class exists before anything uses it, and the one event that
  renames a stylesheet most pages link is isolated in a commit whose only change
  is style.

**T02 — `025/T02: model a cell as a list of dates`**
- Files: `lib/schedule.ts` (the `groups` type; the loader wraps the single date
  in a list of one — the schema is untouched, so nothing new can arrive);
  `app/postep/schedule-table.tsx` (`Cell`, §2.3).
- What: comments 4, 5 and 8 (§3). No behaviour changes; the several-dates
  branch exists and cannot yet be reached.
- Check: C0; then capture T01 and T02 on P: **every page file byte-identical
  with only N1**, and both stylesheets identical in name and bytes. This is a
  stronger statement than T01's, and it is what proves the one-date branch is
  today's JSX.

**T03 — `025/T03: accept several dates per group entry`**
- Files: `lib/schedule-schema.ts`; `lib/schedule.ts`.
- What: the union (§2.1); the loop, R3, R4, the sort (§2.5); the X1 branch; the
  X2 sentence; comments 1, 2, 3, 6 and 7 (§3).
- Check: C0; capture T02 and T03 on P (N1 only, as T02); then at T03 in the
  scratch tree: S5 (criterion 5, 3 and the session-5 cells), S5b (3, 4, the
  list of one), R1–R4 (6), U1 and U2 at BASE and T03 (7), X1 and X2, then
  the production server on S5 for 8, 9 and 10(c). All of §4.2 except 2's final
  form, 10(b), 11, 12 and 13.

**T04 — `025/T04: close the slice — verification and the journal`**
- Files: `specs/025-several-dates-per-session/verification.md` (new),
  `docs/sdd-journal.md`, `specs/025-several-dates-per-session/tasks.md` (boxes).
- What, in this order: (1) C0 at the final commit; (2) the I2/I3 comparison of
  BASE and HEAD on P (criteria 2 and 10(a)); (3) criteria 3–9 and 10(c) again at
  HEAD if any commit touched `app/` or `lib/` since T03; (4) 10(b) and 11;
  (5) `verification.md`, with criterion 12 written as **NOT MET — and not this
  run's to meet**, and the human-eye screenshots named; (6) the fresh-context
  review (criterion 13); (7) the journal entry — factual: what the instruments
  found, which gaps of §6 were real, whether the owner moved the schedule
  during the run; (8) clean up: stop the scratch server by PID, delete
  `D:\t025`, show the final `git status --short`, and H0 against the file.
- Check: `verification.md` has an entry for each of criteria 1–13, each with
  its command and output; the review reports no gap; after the commit,
  `git status --short` shows ` M content/schedule.json` and nothing else.
  If the review finds a gap, the run stops, proposes `025/T05`, and does not
  tick 13.

---

## 6. Gaps

In the order they matter. For each: the spec's words, what was assumed, whether
it moves a criterion.

**G1. The stylesheet.** Spec criterion 2: "once the per-build id and the name of
the shared stylesheet are normalised", with the reason given in the same
criterion: "slice 022's plan found that every page links one stylesheet named by
a hash of its contents, so any added rule renames it". **Measured** in the
2026-09-24 build (Next 16.3.3, Turbopack): every
page links *two* — a global chunk (fonts, tokens, prose) and a chunk of merged
CSS modules (`code-block-module…`, `page-module…`); 53 of 55 pages link the
second (all but `_global-error` and `_not-found`); `cssChunking` defaults to
`true`, which merges them. Only the second can change in this slice.
*Assumed:* N2 names the modules chunk only; the global chunk is compared with
its name unnormalised; "differs only by the rules this slice adds" is checked
after undoing a minifier merge (I3). *Moves:* nothing in what 2 and 10 ask; it
makes both stricter than written.

**G2. "Not within the entry".** Spec §5: "No date is compared with any other
date — not within the entry, not with another group's, not with the next
session's." Against §2 ("earliest first, whatever order they were written in")
and §3 ("The same date twice in one entry"): sorting and a repeat check both
compare dates inside an entry. *Assumed:* §5 forbids a refusal that turns on
order or position — a date before or after another is never an error — while
equality and display order are the entry's own rules; the group-loop comment
says so (§3, row 7). *Moves:* no criterion. A reader who takes §5 literally
would flag the sort and the repeat check, so the reading is written down.

**G3. A wrongly typed entry.** Silent: `"4Ta-1": 5`, `null`, `{}`, a list with a
number in it. With the union the message is Zod's "Invalid input", worse than
today's "expected string, received number". *Assumed:* a written sentence (X1).
*Moves:* none; it adds one refusal beyond criterion 6, verified as X1.

**G4. A list of one date.** Silent. *Assumed:* accepted, rendered exactly as
the bare string. The spec asks for two new refusals and this is not among them;
refusing it would stop the build on a half-finished edit that is valid.
*Moves:* none; checked in S5b.

**G5. An existing message becomes false.** §5: "Nothing else changes." The
unknown-group refusal says "a group cell holds that group's own date as
yyyy-mm-dd, or nothing at all", which this slice makes untrue. *Assumed:*
amended (X2). *Moves:* none; no criterion pins that sentence.

**G6. A procedure delegated outside the inputs.** Notes for the reviewer:
"restores by hash, as slice 022's journal entry records". A planner holding the
three inputs cannot know what that says. *Assumed:* save the bytes and the hash,
restore by hash, end with `git status` showing only his edit — and, going
further, never write his file at all (§4.1, rule 1). The journal and the
verification note of 022 were read afterwards. As they describe it, the old and
new source were built back to back against one content tree, and each temporary
schedule was written over his file after its bytes and hash were saved and
restored after a hash check. That is sound, and every one of those writes lands
in a tree two dev servers are watching. This plan makes none. *Moves:* none.

**G7. What "before" is, and what data both sides use.** Criterion 2 does not say
how the "before" is produced, and "the schedule as it stands today" moves — the
journal records the owner editing it mid-run in slices 022 and 024. *Assumed:*
BASE is the parent of T01; both captures use P, pinned and hashed at the start;
BASE's `content/` is overlaid on the head tree if the owner commits content in
between. *Moves:* none.

**G8. A criterion that is partly perceptual.** Criterion 9: "each session reads
as one block" and "which dates belong to which group is unambiguous". The spec
names only 12 as human-eye. *Assumed:* closable by geometry (§4.2, 9), with the
perceptual remainder named in the report and the screenshots left for Viktar.
AGENTS.md §3 would leave a criterion that needs an eye unticked; whether this
one does is his call. *Moves:* possibly 9's tick.

**G9. No baseline.** Criteria 1 and 8 presume a clean page today — lint clean, no
sideways scroll at six widths — and the spec states none. *Assumed:* measured
first (the preflight C0; the sweep on a P build if any width fails), so a
failure can be attributed. *Moves:* none, unless the baseline is itself red.

**G10. Environment the plan has to carry.** Not the spec's business, but a
verification that cannot run is a finding: builds need the network
(`next/font/google`), the scratch tree needs a real copy of a 581 MB
`node_modules`, and the checks need ports other than 3000 and 3001. §4.1.

**No contradiction with the constitution or AGENTS.md was found.** Article V:
no institutional fact is written — messages use `yyyy-mm-dd`, and the test
dates exist only in scratch files. Article VIII: the page stays statically
prerendered and no client code is added. Article IX: the commits are app-lane
`025/TNN`, none touches `content/`, and the spec names no file in its *What*.
AGENTS.md §8: no approved spec or plan is edited, and `tasks.md` is not written
by this plan.
