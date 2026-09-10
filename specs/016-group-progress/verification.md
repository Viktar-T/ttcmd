# verification.md — 016-group-progress

Evidence for every acceptance criterion in `spec.md`. Each entry names the
check that ran and what it returned. A criterion with no check under it is not
met; criterion 18 is Viktar's and is marked as such rather than claimed.

Measurements were taken against the running dev server at `localhost:3000` with
the Browser pane, and build evidence from `npm run build` in this working tree.

**A note on the tree.** While this slice ran, Viktar was editing content in the
same working directory: `content/moduly/05-twoja-aplikacja/` and
`content/moduly/06-pod-maska/` appeared partway through, and several files under
`04-specyfikacja/` and `05-pod-maska/` were already modified and uncommitted.
Nothing here touched any of it, every commit staged its own paths explicitly,
and the temporary experiments restore bytes rather than running `git checkout`,
which would have taken his work with it. Where a measurement could be
confounded by that, it is said so below.

---

## 1. `npm run build` succeeds and `npm run lint` is clean

Both, on every task. The final build:

```
✓ Compiled successfully
  Finished TypeScript in 1610ms
✓ Generating static pages (52/52)
├ ○ /postep
```

`npm run lint` produces no output on any run. The colour-literal guard and the
contrast report run inside the build and did not fire: `app/postep/page.module.css`
contains no colour literal, only `var()` on tokens that already existed.

## 2. The page exists at `/postep`, calendar above table

`○ /postep` in the route listing — and **`○` means static**, which is the
evidence that the validation in `lib/schedule.ts` runs at build time and not per
request. Rendered order confirmed from the prerendered markup: `h1 Postęp grup`,
then `h2 Tygodnie` with the week list, then `h2 Zajęcia` with the table.

## 3. The calendar shows only what is written

From the prerendered markup: two `<li>` in the week list for the two weeks in
the data, each carrying its number and both dates, ascending.

```
Tydzień 1   <time dateTime="2026-08-31">31.08.2026</time> – <time dateTime="2026-09-04">04.09.2026</time>
Tydzień 2   <time dateTime="2026-09-07">07.09.2026</time> – <time dateTime="2026-09-11">11.09.2026</time>
```

No week that is not in the data appears. The page generates no school year.

## 4. The table has the four groups, in order

Read from the live DOM at 1585 px:

```
headers: ["Nr","Tydz.","Data","4Ta-1","4Ta-2","4Tc-1","4Tc-2"]
tbodyCount: 2
```

One column each, in the order `GROUPS` declares — the same array the schema
validates against, so a column and a refusal cannot disagree about which four
groups exist.

## 5. A session row carries all five things; an absent date is an empty cell

The session's **row group** carries them (see the note below). From the
prerendered markup of session 1, which has no planned date and no group dates:

```
<th scope="row"><span class=label>Zajęcia</span> 1</th>
<td><span class=label>Tydzień</span>1</td>
<td><span class=label>Data</span></td>
<td><span class=label>4Ta-1</span></td>   ... and three more
```

The planned-date cell and all four group cells are empty. No dash, no em dash,
no question mark, no placeholder of any kind. In the wide layout the `label`
spans are `display: none` and the cells render blank.

**A reading of the spec, flagged rather than assumed.** §3 says "one row per
session" and criterion 5 says "a session row". A literal single `<tr>` carrying
the seven numeric columns *and* the topics is not constructible at any width
this site has — the plan measured the numeric columns at about 591 px against a
624 px lane, leaving 33 px for a topic that wants some 340 px. The session is
therefore a `<tbody>` holding two `<tr>`s, and everything criterion 5 lists is
inside it. If Viktar meant one `<tr>`, the fix is a decision about which of the
five things leaves the row, and that is his.

## 6. Topics are derived, not retyped

From the prerendered markup:

```
<a href="/moduly/00-start/jak-dziala-ten-kurs"><span>0a</span> Ankieta na start — Aplikacje desktopowe i mobilne</a>
<a href="/moduly/01-jak-powstaje-oprogramowanie"><span>Moduł 1</span> Jak dziś powstaje oprogramowanie</a>
```

Neither the letter nor the title is in `content/schedule.json`, which carries
only `{ "lesson": "00-start/jak-dziala-ten-kurs" }` and
`{ "module": "01-jak-powstaje-oprogramowanie" }`.

The live check: the title in `content/moduly/00-start/jak-dziala-ten-kurs.mdx`
was temporarily replaced with a marker string and the site rebuilt.

```
build: succeeded
the schedule row now reads the new title: true
content/schedule.json still contains no title: true
```

Reverted from the bytes read beforehand; `git status --porcelain` identical
before and after.

## 7. A published lesson links, an unpublished one does not

The four seeded topics all link.

For the unpublished half, the experiment the spec describes — unpublishing a
seeded lesson — **fails the build for an unrelated reason**, and that is worth
recording rather than working around silently:

```
Error: content/moduly/03-budujemy/budowa-1-prompt-token-okno.mdx:55: the link
/moduly/02-warsztat/teraz-ty-pierwszy-agent — that lesson exists but is not
published (publish: false), so the site answers it as not found.
```

That is slice 010's link checker doing its job, and it has nothing to do with
this slice. The case the spec is actually about is a schedule naming a lesson
that is *already* unpublished, so the check was rewritten to add a topic
pointing at `00-start/git-i-github`, which is the one lesson in the tree
carrying `publish: false` today. That touches only `content/schedule.json`.

```
build: succeeded — the schedule may name a draft
its letter is on the page: true      (0c)
its title is on the page: true       (Git i GitHub — minimum, które wystarczy)
the page links to it: false
```

Reverted; `git status` clean.

**A correction to the spec's own wording.** §4 and the plan both say Moduł 4 and
Moduł 5 are unpublished. They are not, any more — Viktar published them before
this slice ran. `00-start/git-i-github` is the only draft lesson in the tree.

## 8. A group cell holds a date or nothing

From the prerendered markup of both seeded sessions: eight group cells, all
empty, none carrying placeholder text. Filled cells render
`<time dateTime="2026-09-16">16.09.2026</time>` and nothing else — see
criterion 9.

## 9. A group date outside its row's planned week is accepted

Session 1 is planned for week 1, which runs 2026-08-31 to 2026-09-04. Group
`4Tc-2` was temporarily recorded as having done it on 2026-09-16, twelve days
past the end of that week.

```
build: succeeded
the page renders it: true    (16.09.2026)
```

The build does not check a group's date against its row's week, deliberately: a
group two weeks behind the plan is the fact this page exists to show. Reverted.

## 10. The build refuses each malformed schedule

Eight builds, one malformation each, the file restored between. **All eight
stopped `npm run build`**, and every message names its row and says what to
write instead. Verbatim:

### 1. an impossible date
```
Error: content/schedule.json — week 1: end — "2026-02-30" has no day 30 — luty 2026 has 28.
```

### 2. a group that is not one of the four
```
Error: content/schedule.json — session 1: "4Tb-1" is not one of this course's groups. The four are 4Ta-1, 4Ta-2, 4Tc-1, 4Tc-2 (ADR-0014), and a group cell holds that group's own date as yyyy-mm-dd, or nothing at all.
```

### 3. a session pointing at a week the calendar does not have
```
Error: content/schedule.json — session 1: it points at week 9, which the calendar does not have. Add that week to "weeks", or point the session at one of: 1, 2.
```

### 4. two sessions with the same number
```
Error: content/schedule.json — session 1: two sessions carry the number 1. A session's number counts from one across the whole course and appears exactly once.
```

### 5. two weeks with the same number
```
Error: content/schedule.json — week 1: two weeks carry the number 1. A week's number is its identity in this file — every session points at one — so it appears exactly once.
```

### 6. a week ending before it starts
```
Error: content/schedule.json — week 1: it ends on 2026-08-31 and starts on 2026-09-04, so it ends before it begins. Swap them.
```

### 7. a topic naming a lesson that does not exist
```
Error: content/schedule.json — session 2: no lesson "02-warsztat/nie-ma-takiej-lekcji". A lesson topic names its module folder and its file, without the extension, as { "lesson": "02-warsztat/teraz-ty-pierwszy-agent" }. It is written that way and never as "2b", because the letter comes from the lesson's order (ADR-0003) and moves when a lesson is reordered.
```

### 8. a topic naming a module that does not exist
```
Error: content/schedule.json — session 1: no module "99-nie-ma-takiego-modulu". A module topic names the folder under content/moduly/, as { "module": "01-jak-powstaje-oprogramowanie" }. The modules are: 00-start, 01-jak-powstaje-oprogramowanie, 02-warsztat, 03-budujemy, 04-specyfikacja, 05-pod-maska, 05-twoja-aplikacja, 06-pod-maska.
```

Refusal 2 named the row by its position on the first run, because it is raised
at the schema layer where the row has not been parsed yet. That was fixed
(`016/T08`) to read the declared number off the raw value, and the message above
is from the re-run.

## 11. The weekly update touches nothing under `app/` or `lib/`

Week 3, session 3 with a plain-text topic, and one group's date were added to
`content/schedule.json` — one edit, one file.

```
build: succeeded
the new week is on the page: true          (14.09.2026)
the plain-text topic is on the page: true  (Sprawdzian)
git status --porcelain -- app lib: clean — nothing there moved
```

Scoped to `app` and `lib` rather than run bare, because Viktar's own
uncommitted content edits are in this tree and a bare `git diff --stat` would
list them. Reverted.

## 12. No document scrolls sideways

`document.documentElement.scrollWidth − clientWidth`, on four pages at six
widths. **Twenty-four measurements, every one zero.**

| width | /postep | / | /moduly/02-warsztat | a lesson |
| ---: | ---: | ---: | ---: | ---: |
| 320 | 0 | 0 | 0 | 0 |
| 375 | 0 | 0 | 0 | 0 |
| 768 | 0 | 0 | 0 | 0 |
| 1024 | 0 | 0 | 0 | 0 |
| 1280 | 0 | 0 | 0 | 0 |
| 1585 | 0 | 0 | 0 | 0 |

The table has no inner scroller either: at 1585 px it measures
`left: 464, width: 624`, and the page's `h1` measures `left: 464`. 464 is the
site's anchored content inset and 624 is `--measure`, so the table sits on the
site's one left edge and does not break out of it.

## 13. Every row is fully readable at 375 px

Screenshot taken at 375 px. Each session renders as a block of four lines:

```
Zajęcia 1
Tydzień            1     Data
4Ta-1                    4Ta-2
4Tc-1                    4Tc-2
0a Ankieta na start — Aplikacje desktopowe i mobilne
Moduł 1 Jak dziś powstaje oprogramowanie
```

Every value carries its group code beside it as a real `<span>` in the DOM, not
generated content, so which date belongs to which group is unambiguous with no
interaction and reads identically to a screen reader.

A defect was found here and fixed before the commit: `.table tr { display:
block }` is a class plus an element and out-specified the bare `.figures`, so
`display: grid` silently lost and every value stacked into one column, fourteen
lines per session. The selector is `.table .figures` now, with the reason
written beside it.

## 14. No page other than `/postep` changed, except the front door

**Under `lib/`:** T01 changed `lib/content.ts` and `lib/numbering.ts`, and the
check for it was the strongest one available. The prerendered HTML of all 40
pages was captured before and after and compared. Whole-file hashes all differ,
including `_global-error.html`, which that change cannot reach — each build
stamps a fresh build id into every page. With the two ids normalised:

```
pages compared: 40, differing once the build id is normalised: 0
```

Byte-identical markup on every page in the site.

**The home page**, measured live at 1280 px after the link was added:

| box | left | width |
| --- | ---: | ---: |
| `h1` | 464 | 624 |
| `.heroLede` | 464 | 522 |
| `.button` | 464 | 162 |
| `.moduleGrid` | 464 | 624 |

Every left edge and width is the site's anchored edge, unchanged. Only vertical
position moves, by the height of the one paragraph added above the grid, which
is what adding a line to a grid does.

## 15. With scripting disabled

`grep -rn "use client" app/postep/ lib/schedule.ts lib/schedule-schema.ts` →
**none**. The page and everything it renders are Server Components, so the
prerendered HTML is exactly what a browser with scripting disabled receives, and
that HTML contains the whole calendar, the whole table and every link:

```
{ listItems: 7, timeElements: 4, moduleAndLessonLinks: 4 }
```

The browser console reports no errors at 1280 px or 375 px, in either theme.

**Stated as a limit rather than glossed:** scripting was not actually switched
off in a browser. The argument above is that there is nothing to switch off in
this page's subtree, which is checkable and was checked; it is not the same act.

## 16. No dependency, no network request

```
git diff --stat -- package.json package-lock.json   →   (empty)
```

The page loads no image, no script, and no font beyond the two `app/fonts.ts`
already serves on every page.

## 17. The seeded data contains only facts Viktar supplied

```
parses. weeks: 2 sessions: 2
planned dates present: 0
group cells filled: 0
```

Checked value by value against `spec.md` §11, which records his message: week 1
is 2026-08-31 to 2026-09-04 and week 2 is 2026-09-07 to 2026-09-11; session 1 is
in week 1 with the first lesson of Moduł 0 and the whole of Moduł 1; session 2 is
in week 2 with the first two lessons of Moduł 2.

**No planned date and no group date is seeded.** He gave one planned date and
introduced it as an example of the column's format, gave none for the second
session, and gave no group dates at all. An example date written into a public
schedule is the plausible guess Article V refuses. Both are one edit from being
right.

The four week-bounds are kept because a week running Monday to Friday from
31 August is arithmetic, not an institutional claim, and Article I already dates
the course from 2026-09-01, which falls inside week 1.

## 18. Human eye — NOT MET, and not this run's to meet

Whether the table reads as part of this site rather than as a spreadsheet
dropped into it, and whether the four-line phone block is one Viktar would use
in front of a class. Screenshots of both layouts and both themes are in the
final report. The box stays unticked.

## 19. Fresh-context review

See the closing report. Run in a subagent whose only inputs were
`constitution.md`, `AGENTS.md`, this slice's `spec.md` and the diff.

---

## What the closing review changed

The review was run in a subagent whose only briefing was `constitution.md`,
`AGENTS.md`, this slice's `spec.md`, ADR-0014 and the diff. It re-ran the build,
the lint, the markup reads and the width measurements rather than taking this
file's word for them, and confirmed 17 of 19 criteria, with 18 correctly
unticked and 19 being itself. It found no gap that blocks closing, and four
things worth fixing. Three were fixed; one is recorded.

**A refusal that named a row that does not exist.** `describeSchemaFailure` read
the row index off the Zod path unconditionally, so a failure about the array
*itself* rather than about a row inside it produced `week at position NaN`. That
is reachable from an ordinary edit — an empty `weeks`, a missing `sessions` key
— and is not one of the eight refusals, so no criterion caught it. Fixed and
re-checked:

```
an empty weeks array
   Error: content/schedule.json — "weeks": weeks — Too small: expected array to have >=1 items
a missing sessions key
   Error: content/schedule.json — "sessions": sessions — Invalid input: expected array, received undefined
```

**Two comments asserting a fact this run disproved.** `lib/content.ts` and
`lib/schedule.ts` both said Moduł 4 and Moduł 5 are the unpublished lessons the
index exists for. They are published. Both now name
`content/moduly/00-start/git-i-github.mdx`, which is the one draft in the tree.
Criterion 7 caught the same stale claim in `spec.md` and `plan.md` and missed it
in the two source files the slice wrote.

**`lib/links.ts` grew and its comment did not.** `SITE_ROUTES` names three
routes now; the comment named two. Rewritten, and it says why `/postep` is there
— no criterion needed it, and no lesson links to it today, but the schedule is a
page a lesson may point at and leaving it out would refuse the first such link
as "there is no such page". It is the one behaviour change in the diff beyond
the spec's text.

**The band above the breakpoint was not measured.** This file's width grid ran
320, 375, 768, 1024, 1280, 1585 and skipped 656 to 768, which is where the wide
table is at its tightest. The review filled it in: zero overflow at 656, 660,
700 and 768 px, and the table's intrinsic width with every date cell filled is
591 px against the 624 px lane, so 33 px of slack that does not shrink as the
data fills in.

## What the review left open, and for whom

- **Criterion 18**, as expected. Viktar's eye.
- **Criterion 17's last mile.** This file checks the seeded data against
  `spec.md` §11, and §11 is this run's own transcription of Viktar's message.
  Nothing in the repo can check §11 against the message itself. Only he can.
- **Criterion 5's literal reading**, above.
