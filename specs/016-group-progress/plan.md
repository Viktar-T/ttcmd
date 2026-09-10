# plan.md — 016-group-progress

- **Slice:** 016
- **Date:** 2026-09-10
- **Written from:** `constitution.md`, `AGENTS.md` and this slice's `spec.md`
  only — the fresh-context test of AGENTS.md §2, requirement 1. The repository's
  own files were read afterwards, to write a file map that is real rather than
  inferred; nothing about *intent* comes from them.
- **Libraries:** **none added.** Criterion 16 holds by construction — see §9.
- **Next.js in the tree:** 16.3.3. No API of it is used that the existing pages
  do not already use: a Server Component page, `next/link`, `node:fs/promises`.

The spec was sufficient to plan from, with **four gaps** that are named where
they bite and collected in §11. One of them — the seeded data of criterion 17 —
cannot be closed by this plan at all, and the step that writes the file says so
in as many words.

---

## 1. The two numbers that decide the whole design

Everything below follows from one measurement, so it is taken first.

The site's content column is `--content-width` − 2rem = **736 px**, and every
page's own content sits in `.lane`, which is `max-width: var(--measure)` =
**624 px** and centred inside it (`app/nav.css`). Slice 012 made that shared
left edge the site's one left edge. A table that does not fit 624 px either
breaks that edge or scrolls.

**Cost of the columns**, at `--text-sm` (0.875rem = 14 px), JetBrains Mono
(advance exactly 0.6 em ⇒ 8.4 px per character), cell padding `0.5rem` each
side (16 px per cell — the value `app/prose.css` already uses vertically on a
table cell and the value of `--gap-tight`):

| column | widest content | chars | text px | + padding |
| --- | --- | ---: | ---: | ---: |
| `Nr` | header, and a two-digit number | 2 | 16.8 | **32.8** |
| `Tydz.` | the header | 5 | 42.0 | **58.0** |
| `Data` | `15.09.2026` | 10 | 84.0 | **100.0** |
| `4Ta-1` … `4Tc-2` | `15.09.2026`, four times | 10 | 84.0 | **400.0** |
| | | | | **590.8** |

**590.8 ≤ 624, with 33 px of slack.** The seven numeric columns fit the lane,
so this page needs no breakout, no wider track and no second left edge.

**A topic column does not fit, at any width the site has.** The shortest
seeded topic — `0a Ankieta na start — Aplikacje desktopowe i mobilne` — wants
~340 px at `--text-sm` and would have 33 px. Widening the table to the content
track (736) buys 112 px; letting it run from `content-start` to `full-end`
above the fold buys 856 px at 1280 (topics: 159 px) and does nothing at all
between 768 and 1280, where the track is 736 whatever the viewport. Shortening
the group dates to `dd.mm` buys 168 px and gets the topic column to ~205 px at
768–1280 — two or three wrapped lines per topic on a classroom laptop, and it
invents a date format the site does not use.

**So the topics do not share a line with the numbers.** That is the one
structural decision of this slice, and §6.2 is its consequence.

---

## 2. File map

Ten files: five new application files, one new data file, three edited, one
slice artifact.

### New

| path | what it holds |
| --- | --- |
| `content/schedule.json` | **The schedule.** Weeks and sessions, seeded with Viktar's two and two. The only file a weekly update touches (§3). |
| `lib/schedule-schema.ts` | The Zod shape of that file, and `GROUPS` — the four codes of ADR-0014 in the order they are columns. Mirrors `lib/content-schema.ts`, deliberately (§5.1). |
| `lib/schedule.ts` | Reads the file, validates it, resolves every topic against the course model, and returns the rendered model. The eight refusals of criterion 10 are raised here or in the schema above, and nowhere else. |
| `app/postep/page.tsx` | The route. A Server Component: title, the week calendar, the table. |
| `app/postep/schedule-table.tsx` | The table — the header row, one row group per session, the group labels the narrow layout needs. |
| `app/postep/page.module.css` | Both layouts. Follows `app/styleguide/page.module.css`: a page's own stylesheet is a CSS module beside it, not a sixth global import in `app/layout.tsx`. |
| `specs/016-group-progress/verification.md` | House convention (012, 014, 015 all carry one): the evidence for every criterion, task by task, measured rather than asserted. |

### Edited

| path | change |
| --- | --- |
| `lib/numbering.ts` | Gains `lessonHref(moduleSlug, lessonSlug)`. One spelling of a lesson's URL, because §4.3 needs it for lessons the course walk currently drops. |
| `lib/content.ts` | `listLessons` returns its unpublished lessons as summaries rather than as bare hrefs; `readCourse` derives letter, id and href for **every** lesson file and exposes them as `getLessonIndex()`. Behaviour-preserving for every existing caller (§4.3). |
| `app/page.tsx` | One link to `/postep`, inside the existing `.hero` lane. Nothing else on the page moves (§7). |

**Not touched, and each for a stated reason:** `constitution.md` (Article X);
any lesson or module under `content/moduly/` (spec, *Out of scope* — the
temporary edits of criteria 6, 7 and 9 revert and end with `git status`);
`lib/content-schema.ts`, because §8 of the spec keeps `week` exactly as it is;
`components/site-header.tsx` (decision 12); `app/tokens.css`, `app/globals.css`,
`app/prose.css`, `app/nav.css` (spec §10 — no token moves, and the new
stylesheet is scoped to one page by being a module).

---

## 3. Where the schedule lives, and in what format

### 3.1 `content/schedule.json`

**The lane rule decides the directory.** Article IX gives the content lane
`content/` and `public/img/`, and criterion 11 requires the weekly update to
touch neither `app/` nor `lib/`. A data file anywhere but `content/` fails that
by construction. It sits at the top of `content/`, beside `moduly/` and
`interesting-to-read/` — **not inside `content/moduly/`**, where
`readModuleSlugs` would hand its name to `moduleNumber()` and stop the build
with a message about a missing folder prefix.

**English keys and an English file name**, Polish only in the one place a
reader sees. Article III names *frontmatter keys* and *file names* as
identifiers: ASCII English. This file is the schedule's frontmatter with no
body, and a lesson's frontmatter is already `title`/`order`/`summary` carrying
Polish values. `harmonogram.json` was the obvious alternative and it is the
wrong half of Article III — the URL is Polish because a student types it, and
nobody types this.

### 3.2 Why JSON, and not the three alternatives

**MDX with the schedule in its frontmatter** — the mechanism the repo already
has. Rejected on the YAML underneath it: an unquoted `2026-09-15` is parsed as
a `Date` by every YAML implementation, so the value the schema receives is
already a timestamp in some timezone, and `2026-02-30` — criterion 10's first
refusal — is resolved or rejected by the parser before any message of ours can
name the row. Reusing the mechanism would mean quoting every date and hoping
nobody forgets, which is a silent failure that publishes. A schedule is also
not prose, and the body would be empty.

**YAML on its own** needs a parser. `zod`, `next`, `react` and `shiki` are the
dependencies; a YAML library is a new one (criterion 16), and reaching into a
transitive dependency of `next-mdx-remote` is a new dependency with the ADR
skipped (AGENTS.md §8).

**A `.ts` module under `content/`** would type-check for free and is the worst
of the three: code in the content lane, invisible to Zod, and a weekly update
that is a code edit wearing a content commit's clothes.

**JSON wins on the failure mode.** `JSON.parse` throws with a position, no
value is coerced on the way in, a date stays the string that was written, and
there is no indentation semantics to get wrong at 21:00 on a Monday. The one
real cost is stated rather than discovered: **JSON has no comments**, and a
duplicate object key is silently the last one — which is why the group cells
are keyed by group code and nothing else is (§4.1).

---

## 4. The shape of the data

### 4.1 The file

```jsonc
{
  "weeks": [
    { "number": 1, "start": "2026-09-01", "end": "2026-09-07" }
  ],
  "sessions": [
    {
      "number": 1,
      "week": 1,
      "date": "2026-09-01",
      "topics": [
        { "lesson": "00-start/jak-dziala-ten-kurs" },
        { "module": "01-jak-powstaje-oprogramowanie" },
        { "text": "Ankieta na start" }
      ],
      "groups": { "4Ta-1": "2026-09-01" }
    }
  ]
}
```

> **The values above are a shape, not the seed.** Only `2026-09-01` is a fact
> this plan is entitled to — Article I dates the course from it. The seeded
> weeks, sessions, topics and planned dates come from Viktar's message of
> 2026-09-10 and from nowhere else, and **no group cell is filled at all**
> (decision 13, criterion 17). See §11, gap 1.

| field | type | required | notes |
| --- | --- | --- | --- |
| `weeks[].number` | integer ≥ 1 | yes | the course's own count, not ISO (spec §2) |
| `weeks[].start`, `.end` | `"yyyy-mm-dd"` | yes | day precision, both of them |
| `sessions[].number` | integer ≥ 1 | yes | counts from one across the whole course |
| `sessions[].week` | integer ≥ 1 | yes | must be a `weeks[].number` |
| `sessions[].date` | `"yyyy-mm-dd"` | **no** | absent ⇒ an empty cell (decision 4) |
| `sessions[].topics` | array, ≥ 1 | yes | §4.2 |
| `sessions[].groups` | object | **no** | absent ⇒ `{}` ⇒ four empty cells |
| `sessions[].groups["4Ta-1"]` | `"yyyy-mm-dd"` | **no** | each of the four independently optional (spec §5) |

`groups` is an **object keyed by group code**, validated with
`z.strictObject`, so `"4Tb-1"` is refused by the key and not by a value. The
alternative — `[{ "group": …, "date": … }]` — would catch a duplicated group
in one row, which JSON's last-key-wins hides. Rejected because the object is
what a person reads correctly at a glance, the duplicate is a mistake nobody
makes twice, and the spec's refusal list does not ask for it. Recorded here so
it is a known limit rather than a surprise.

`topics` is required and non-empty. Rejected: allowing it to be empty, which
renders a row that occupies a line and tells the reader nothing and is
indistinguishable from a half-finished edit. A session whose subject is
genuinely undecided is a row not yet worth adding — and if it must exist,
`{ "text": "…" }` says so out loud.

### 4.2 A topic is one of three things

```jsonc
{ "lesson": "02-warsztat/na-zywo-agent-buduje-aplikacje" }   // module slug / lesson slug
{ "module": "01-jak-powstaje-oprogramowanie" }               // module slug
{ "text": "Sprawdzian" }                                     // Polish, and not in the tree
```

**A lesson is named by its two slugs, never by `2a`.** The letter is derived
from `order` (ADR-0003) and moves when a lesson is reordered — which happened
twice in `02-warsztat` this month, and the comments in its `index.mdx` record
both. A pointer written as `2a` would silently name a different lesson
afterwards. The slug pair is the lesson's file identity: it survives reordering
and retitling, and it is exactly the key the course model already carries as
`moduleSlug` + `slug`, so resolving it is a lookup and not a second
derivation. The full href `/moduly/02-warsztat/…` was the other candidate and
retypes a route shape that `lib/content.ts` builds.

**Tagged by key, not by a `kind` discriminator.** `{ "kind": "lesson", "ref":
… }` gives Zod a discriminated union and a good error for free, and costs a
noun every week for something the key already says. Zod's union error is the
price, and it is paid in `lib/schedule.ts` by catching the issue and replacing
it with one written sentence (§5.2) — the pattern
`readLessonFrontmatterAndBody` already uses for a frontmatter failure.

### 4.3 What the content layer has to expose, and why it does not today

`getCourse()` returns published lessons only: `listLessons` filters on
`publish !== false`, and the drafts survive as `LinkTargets.unpublished`, a set
of **hrefs**. Spec §4 and criterion 7 need an unpublished lesson's **title and
letter** — Moduł 4 and Moduł 5 are the case the spec names.

Two ways to get them, and only one is allowed. A second walk of
`content/moduly/` inside `lib/schedule.ts` would re-implement the module-prefix
rule, the `order`→letter rule and the publish rule, and would disagree with the
first implementation the day any of the three changed. That is the second
opinion the spec forbids in §4 and decision 5.

So the walk that already exists produces the answer:

1. **`lib/numbering.ts` gains `lessonHref(moduleSlug, lessonSlug)`** —
   `/moduly/${moduleSlug}/${lessonSlug}`, one spelling, in the module that
   already owns derived identity. (`moduleHref` is deliberately *not* added:
   `/moduly/${slug}` is already written once, in `readCourse`.)
2. **`listLessons` returns `unpublished: LessonSummary[]`** instead of
   `string[]`. Its only caller is `readCourse`, which maps them through
   `lessonHref` to keep `LinkTargets.unpublished` exactly the set it is now.
3. **`readCourse` derives `letter`, `id` and `href` for every lesson file**,
   published or not, and returns them as a third value beside `modules` and
   `targets`:

   ```ts
   export interface LessonIndexEntry {
     moduleSlug: string;
     slug: string;
     title: string;
     order: number;
     letter: string;   // lessonLetter(order)
     id: string;       // lessonId(moduleNumber, order)
     href: string;     // lessonHref(moduleSlug, slug)
     published: boolean;
   }
   export async function getLessonIndex(): Promise<LessonIndexEntry[]>;
   ```

**The exercise walk is not touched.** Its accumulation still runs over
`listed.lessons` — already filtered, already sorted by `order` — because that
is the whole of ADR-0003's consequence and the comment in `readCourse` says so
at length. The index is built beside it, not through it.

**An array, not a `Map` keyed by `"module/lesson"`.** The pointer syntax is the
schedule's, and `lib/content.ts` should not learn it. `lib/schedule.ts` indexes
the array in one line.

---

## 5. Validation

### 5.1 Where it runs, and why it is the same gate

**In the render path of `/postep`, not in a pre-build script.** That is the
mechanism Article VIII already describes and `lib/content.ts` already uses: a
lesson's Zod failure is thrown while the page is being prerendered, and
`next build` stops. Two reasons it must be here rather than in
`scripts/check-design-invariants.mjs`:

- Two of the eight refusals — a topic naming a lesson or a module that does not
  exist — can only be decided against the course model, and the course model is
  produced by the MDX compile that only exists inside the Next build. A script
  would have to re-implement the walk (§4.3 again, by another door).
- Splitting the eight across two mechanisms means two message formats and two
  places to look when the build stops. Criterion 10 wants eight messages that
  read alike.

**The page must stay statically prerendered**, or validation stops running at
build time and starts running at request time — the one way this design fails
silently. No `dynamic`, no `revalidate`, no `cookies()`/`headers()`. The check
is free and objective: `npm run build` lists the route, and `/postep` must
appear as a **static** route in that listing. That line is part of the evidence
for criterion 1.

**Two layers, mirroring `content-schema.ts` / `content.ts`:**

- `lib/schedule-schema.ts` — the shape of the *file*. Zod: the two arrays, the
  integers, `z.strictObject` for `groups` keyed by `GROUPS`, the topic union,
  the required non-empty `topics`. Dates are `z.string()` here; they become
  dates in the layer below, where the message can name the row.
- `lib/schedule.ts` — the *model*. Reads, parses, cross-checks, resolves,
  sorts, and returns what the page renders. Wrapped in React's `cache()` for
  the reason `readCourse` is, and **not** in a module-level constant: that
  would survive a content edit under `next dev` and serve a stale schedule
  until the process restarted, which is exactly the failure slice 015 removed.

### 5.2 The eight refusals

Every message is prefixed `content/schedule.json:` and names the row —
`session 3`, `week 2` — and then says what to write instead. The reader is
Viktar on a Monday evening (spec §6).

| # | refusal | where | how |
| --- | --- | --- | --- |
| 1 | `2026-02-30` | `lib/schedule.ts` | `parseContentDate` from `lib/dates.ts`, on **every** date in the file — the two week bounds, the planned date, and every group date. It already refuses an impossible day with a message that names the month and its length. A wrapper requires day precision on top, because `2026-09` is a valid `ContentDate` and not a day a class met. |
| 2 | a group that is not one of the four | `lib/schedule-schema.ts` | `z.strictObject` over `GROUPS`; an unknown key is refused as a key. The message names the four and cites ADR-0014. |
| 3 | a session pointing at a week the calendar does not have | `lib/schedule.ts` | the set of `weeks[].number`, after the weeks are parsed. |
| 4 | two sessions with the same number | `lib/schedule.ts` | one pass over `sessions`, first duplicate wins the message. |
| 5 | two weeks with the same number | `lib/schedule.ts` | the same pass over `weeks`. |
| 6 | a week ending before it starts | `lib/schedule.ts` | compare the **normalised ISO strings** (`formatDateIso`), which order lexicographically exactly as they order chronologically. Deliberately not `new Date(...)`: `new Date("2026-09-07")` is UTC midnight and a local-time comparison across a DST boundary is a bug that appears twice a year. |
| 7 | a topic naming a lesson that does not exist | `lib/schedule.ts` | against `getLessonIndex()`, keyed `"moduleSlug/slug"`. **Unpublished counts as existing** — that is the point of §4.3, and criterion 7 requires the build to survive a lesson being unpublished. |
| 8 | a topic naming a module that does not exist | `lib/schedule.ts` | against `getCourse()`'s slugs. |

`parseContentDate` is reused rather than reimplemented for the same reason the
letter is derived rather than typed: the site has one date vocabulary
(`lib/dates.ts`), and a second date parser would disagree with the first about
a leap year in some February nobody tests.

---

## 6. Rendering

### 6.1 The route and the components

`app/postep/page.tsx` — a Server Component with no params, no `"use client"`
anywhere in the subtree, no hook, no effect, no fetch. Article VIII's default,
and criterion 15 falls out of it: with scripting disabled the page is what the
server sent.

```
app/postep/page.tsx            getSchedule() → <h1>, the week calendar, <ScheduleTable>
app/postep/schedule-table.tsx  the table
app/postep/page.module.css     both layouts
```

The week calendar is a `<ul>` of a dozen lines and stays in `page.tsx`; the
table is the substance and gets its own file, exactly as
`app/moduly/[module]/[lesson]/lesson-header.tsx` sits beside the page it serves.
Neither is in `components/`, which is for what more than one page renders.

The page's own Polish is UI text (Article III): `Postęp grup` as the `h1`
(`.pageTitle`, the class `/moduly` already uses, so no new type size),
`Tygodnie` and `Zajęcia` as `h2`s at `--text-xl`. Every box on the page carries
`.lane`, including the table — so this page's left edge is the site's left edge
at every width, which §1 showed it can afford.

### 6.2 The table

```html
<table>                      <!-- .lane, 624px, no breakout, no inner scroller -->
  <thead><tr>
    <th>Nr</th><th>Tydz.</th><th>Data</th>
    <th>4Ta-1</th><th>4Ta-2</th><th>4Tc-1</th><th>4Tc-2</th>
  </tr></thead>

  <tbody>                    <!-- one row group per session -->
    <tr class="figures">
      <th scope="row">3</th>
      <td><span class="label">Tydzień</span>2</td>
      <td><span class="label">Data</span><time datetime="2026-09-15">15.09.2026</time></td>
      <td><span class="label">4Ta-1</span><time …>15.09.2026</time></td>
      <td><span class="label">4Ta-2</span></td>
      …
    </tr>
    <tr class="topics"><td colspan="7"><ul>…</ul></td></tr>
  </tbody>
  …
</table>
```

**One `<tbody>` per session, two rows inside it.** §1 is the argument: the
topics cannot share a line with seven numeric columns at any width this site
has, and every arrangement that makes them try costs either the left edge, the
date format, or the readability of the thing a student came for. A row group is
what HTML has for *these rows are one thing*, several `<tbody>`s in a table is
ordinary, and the group is also the natural boundary for the separator between
sessions (`tbody + tbody { border-top }`) and for the block the narrow layout
makes.

Criterion 4 is satisfied literally: the header row carries `4Ta-1`, `4Ta-2`,
`4Tc-1`, `4Tc-2` in that order, one column each, and the order comes from the
`GROUPS` array, which is also the enum — so a column and a validation cannot
disagree about which four there are. Criterion 5 is satisfied by the session's
**row group**: its number, week, planned date, four group cells and topics are
all in it. That is a reading of the spec's word *row*, and §11 gap 2 flags it.

**The rejected alternative is the scrolling table** — `display: block;
overflow-x: auto`, which `app/prose.css` already uses for the one table in the
corpus. It satisfies §9 to the letter (the *document* does not scroll sideways)
and loses on three counts. The whole content of this page is the table, so the
only thing on the page would scroll sideways — §9's rule kept and its meaning
gone, and slice 012's left edge visibly abandoned as soon as a reader scrolls.
A student looking for `4Tc-2` would scroll right on the page rather than read
down a column. And it reads as a spreadsheet dropped into the site, which is
the exact worry criterion 18 hands to Viktar.

### 6.3 Cells

- **Session number** — `<th scope="row">`, mono.
- **Week** — the number alone under a `Tydz.` header. `Tydzień` in full costs
  30 px of the 33 px of slack in §1's table; the abbreviation is what buys the
  margin, and it is the only abbreviation on the page.
- **Planned date** — `<time dateTime={formatDateIso(d)}>{formatDateList(d)}</time>`
  ⇒ `15.09.2026`, the form `docs/content-style.md` fixes for a date in a table.
  Absent ⇒ **`<td />`**: no dash, no `—`, no `?` (criterion 5).
- **Group cells** — the same `<time>`, or empty (criterion 8). Nothing else
  ever goes in one.
- **Topics** — a `<ul>`, one per line:

| topic | renders | links? |
| --- | --- | --- |
| `{ "lesson": … }`, published | `<span class=id>2a</span> Na żywo: agent buduje aplikację` | yes, `href` from the index |
| `{ "lesson": … }`, `publish: false` | the same two strings | **no** — a `<span>`, not an `<a>` (decision 8) |
| `{ "module": … }` | `Moduł 1 Jak dziś powstaje oprogramowanie` | yes — a module page always exists |
| `{ "text": … }` | the text | no |

`id`, `letter`, `title` and `label` all come from `getLessonIndex()` and
`getCourse()`. **Nothing in the schedule file carries a title**, which is what
criterion 6 checks by editing a lesson's title and watching the row change.

**Ordering.** Weeks and sessions are sorted by `number` in the model, not taken
in file order — the same derivation `readCourse` performs on modules and
lessons, and it makes criterion 3's "ascending order" true of the page even
when a hurried edit appends a week in the middle. Topics keep file order: they
have no number and the author's sequence is the information. Rejected:
refusing a file whose rows are out of order, which is a ninth refusal for
something the page can simply get right.

---

## 7. The front door

`app/page.tsx` gains one link, inside the existing `.hero` section, after the
`Zacznij kurs` button:

```tsx
<p className="heroLede">
  <Link href="/postep">Postęp grup — gdzie jest twoja grupa</Link>
</p>
```

It reuses `.heroLede` and the global `a { color: var(--link) }`. `.heroLede`
rather than a bare `<p>` because `.hero` is a grid with its own `gap` and
`.heroLede` is the only paragraph style in it that carries `margin: 0` — a
default paragraph margin would add a second gap to a grid that already has one.
**No new class, no new token, no second button style** — a secondary button is
a visual decision, and §10 says this slice makes none. Nothing above it moves,
so every box criterion 14 measures on the home page keeps its `left` and its
`width`; only the hero grows taller.

---

## 8. The narrow viewport — §9 and criteria 12–13

**Mobile-first, one breakpoint, no JavaScript.**

- **Base (below 41rem): the stacked layout.** `thead` is `display: none`, and
  the table, its row groups, rows and cells all become blocks. A session's
  `<tbody>` is a card-shaped block: the number and week on one line, then the
  planned date, then the four group dates in a two-by-two grid, then the
  topics at full width. **Every value carries its label in the DOM** — a
  `<span class="label">` holding `Tydzień`, `Data`, `4Ta-1` … `4Tc-2` — which
  is `display: none` in the wide layout, where the column header already says
  it. Criterion 13's "which date belongs to which group is unambiguous" is then
  true with no interaction at all: the code is printed beside the date.
- **From 41rem: the table.** `display: table` and friends restored.

**41rem is derived, not chosen.** `.lane` stops shrinking when the viewport
reaches `--measure` + the frame's two 1rem gutters = 39 + 2 = 41rem, and 41rem
is precisely where §1's 624 px budget is guaranteed. Below it the lane is
`100% − 2rem`, and at 375 px that is 343 px — 248 px short of what the seven
columns cost, which is why nothing is attempted there. The literal `41rem` goes
in the media query with that sentence as its comment (a media query cannot read
`var(--measure)`).

**The cost, stated rather than discovered.** Changing `display` on table
elements drops their native ARIA roles in every engine. It is not papered over
with `role="table"`/`role="row"`, because in the stacked layout the column
headers are `display: none` and therefore gone from the accessibility tree too
— a restored `role="cell"` with no `columnheader` above it announces a position
that means nothing. The in-DOM labels are the honest answer and they serve
sighted and assisted readers identically: each block reads *3 · Tydzień 2 ·
Data 15.09.2026 · 4Ta-1 15.09.2026 · 4Ta-2 · …*, then its topics.

**Rejected: the inner scroller** — argued in §6.2. **Rejected: two DOM
trees**, a table for wide and a list for narrow with one `display: none` — it
doubles the markup of the only thing on the page and puts one model behind two
renderings, which is the seam this slice exists to avoid elsewhere. **Rejected:
dropping a column on a phone** — the spec never permits losing information, and
the group a student is looking for is the column that would go.

Nothing else on the page can overflow: the week list wraps, the topics wrap,
and `main > *` already carries `min-width: 0`. Criterion 12 is measured, not
assumed — `scrollWidth − clientWidth` at each of the six widths, on all four
pages, the instrument `specs/012-one-left-edge/verification.md` established.

---

## 9. Libraries, and what is not needed

**Nothing is added.** `zod` 4.4.3 (`z.strictObject`, `z.union`, `z.enum` all
present — checked in the tree), `react`, `next` and `node:fs/promises` cover
every requirement above.

Not needed and not used: a YAML or TOML parser (§3.2), a date library
(`lib/dates.ts`, §5.2), a table component, a CSS framework, `next/image`. The
page issues no network request: no image, no font beyond the two
`app/fonts.ts` already loads on every page, no script. Criterion 16 is a
consequence of the design, not a promise about it — the check is
`git diff package.json package-lock.json` being empty and the Network panel
being empty of anything the other pages do not also request.

**Check B of `scripts/check-design-invariants.mjs` scans `app/` and `lib/`**,
so `app/postep/page.module.css` may contain no colour literal. Every colour in
it is a `var()` on a token that already exists: `--rule-table` for the row
separators, `--text-muted` for the header underline (the value `app/prose.css`
already gives a header underline that carries meaning), `--text` and
`--text-muted` for the labels, `--link` inherited. No token is added and none
moves — spec §10.

---

## 10. Order of work

Each step is independently checkable, and the check is named. One commit each,
`016/TNN:`.

| # | step | the check |
| --- | --- | --- |
| 1 | `lib/numbering.ts`: `lessonHref`. `lib/content.ts`: `listLessons` returns unpublished summaries; `readCourse` derives the index; `getLessonIndex()` exported. | `npm run build` and `npm run lint` clean. The home page, the module grid, a module page and a lesson page measured at 1280 and 375 and **identical to the pre-slice baseline** — this step must move nothing, and it is the only step that could move something it did not intend to. |
| 2 | `content/schedule.json`, seeded. **Input: Viktar's message of 2026-09-10, verbatim. If the session running this task does not have it, stop and ask — do not reconstruct it from the spec** (§11 gap 1, criterion 17). | `node -e "JSON.parse(require('fs').readFileSync('content/schedule.json','utf8'))"` succeeds, and every value in the file is quoted back against his message in `verification.md`. No `groups` entry is filled. |
| 3 | `lib/schedule-schema.ts`: `GROUPS`, the file's Zod shape. | `npm run build`, `npm run lint`. Nothing renders it yet. |
| 4 | `lib/schedule.ts`: read, parse dates, the five structural cross-checks, pointer resolution, sorting, the model. | `npm run build`, `npm run lint`. Still nothing renders it; the checks are exercised in step 8. |
| 5 | `app/postep/page.tsx`, `app/postep/schedule-table.tsx`, `app/postep/page.module.css` — the **wide** layout only. | `npm run build` succeeds **and lists `/postep` as a static route**; the page renders. Criteria 2, 3, 4, 5, 6, 8 read from the rendered markup. |
| 6 | the stacked layout in the same stylesheet. | Criteria 12 and 13: `scrollWidth − clientWidth` at 320, 375, 768, 1024, 1280, 1585 on `/postep`, `/`, a module page and a lesson page — all zero; and every row's seven values readable at 375 with its label. |
| 7 | `app/page.tsx`: the link. | Criterion 14: the home page's boxes measure what they measured at step 1's baseline; the link navigates. |
| 8 | the eight refusals, one at a time, reverting between. | Criterion 10: eight build failures, eight messages, each naming its row. The messages are the evidence and they go in `verification.md` verbatim. |
| 9 | the four temporary experiments: a lesson's title changed (6), a seeded lesson set `publish: false` (7), a group date moved two weeks late (9), a week + a session + a group date added (11). | Each reverts, and each ends with `git status` clean under `content/`; criterion 11 additionally shows `git diff --stat` naming only `content/schedule.json`. |
| 10 | `verification.md`, then the closing review in a fresh subagent context (AGENTS.md §3, criterion 19). Criterion 18 is Viktar's and stays unchecked, named in the final report. | The review reports no gap. |

Steps 3 and 4 are separated from 5 so that a failure in the shape of the data
is distinguishable from a failure in the shape of the page; steps 6 and 7 are
separated from 5 so that the only step touching an existing page touches
nothing else.

---

## 11. Where the spec left this plan guessing

Named per AGENTS.md §3 and §12 rather than filled in quietly.

1. **The seeded data — and this one is not closeable here.** Criterion 17 and
   decision 13 fix the seed as "exactly the two weeks and two sessions Viktar
   wrote", in a message this plan has never seen. §4's example is a *shape*;
   the only date in it that is a fact is the course's start, from Article I.
   The spec's own reviewer note says two of the dates in that message were
   written as examples. **Step 2 must have the message. A session that does not
   have it must stop, not reconstruct** — a plausible date reaching
   `content/schedule.json` is the fabricated institutional fact Article V calls
   the most expensive mistake available in this repo. What is recoverable from
   the spec: one topic names the first lesson of Moduł 0
   (`00-start/jak-dziala-ten-kurs`, `order: 1` ⇒ `0a`), one names Moduł 1, and
   §4 quotes `2a Na żywo: agent buduje aplikację`.
2. **"One row per session" (§3) versus criterion 5's "a session row".** §1
   shows that a literal single `<tr>` carrying all five things is not
   constructible at any width this site has. §6.2 reads *row* as the session's
   row group. If the spec meant one `<tr>`, the fix is not in the plan — it is
   a decision about which of the five things leaves the row, and that is
   Viktar's, not this slice's.
3. **How much prose the page may carry.** §1 says the page holds "the two
   things below and nothing else". This plan takes that to allow an `h1` and
   two section headings — the page needs a title and the table needs a name —
   and to forbid an explanatory paragraph. If an introductory sentence in
   Polish is wanted, it is one line and one commit.
4. **The wording of the front-door link, and the page's own Polish labels**
   (`Postęp grup`, `Tygodnie`, `Zajęcia`, `Nr`, `Tydz.`, `Data`). Decided here
   per AGENTS.md §4; none is a URL, so all are reversible in one commit, and
   they are exactly the kind of thing criterion 18 puts in front of Viktar.

A fifth, smaller: the spec does not say whether a session must have at least
one topic. §4.1 requires one and says why.
