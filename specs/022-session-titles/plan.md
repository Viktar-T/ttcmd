# plan.md — 022-session-titles

- **Slice:** 022
- **Date:** 2026-09-15
- **Written from:** `constitution.md`, `AGENTS.md` and this slice's `spec.md`
  only — the fresh-context test of AGENTS.md §2, requirement 1. The repository
  was read afterwards, so that the file map names real files and the claims
  about the build output are measured against the `.next/` in the tree at
  `354ce30`; nothing about intent comes from it.
- **Libraries:** none added, none removed. Next.js 16.3.3, React 19.2.8,
  Zod 4.4.3, as installed.

The spec was sufficient to plan from. **One gap matters**: criteria 2 and 8
cannot hold literally once any stylesheet rule is added (§6.1). Three smaller
ones are in §7.

---

## 1. File map

| path | change |
| --- | --- |
| `lib/schedule-schema.ts` | **Edited.** `title` on `sessionSchema`, carrying refusal 1 (§2.1). |
| `lib/schedule.ts` | **Edited.** `ScheduleSession.title`; refusal 2 (§2.2); the written sentence for refusal 1 in `describeSchemaFailure`; two comments corrected (§2.3). |
| `app/postep/schedule-table.tsx` | **Edited.** The topics cell opens with the title when there is one (§3). |
| `app/postep/page.module.css` | **Edited.** Three rules for the title, all on existing tokens (§4). |
| `specs/022-session-titles/verification.md` | **New.** House convention since 012: the evidence for every criterion. |

**Not touched:**
- `content/schedule.json`. Writing the titles is content-lane work that comes
  after this slice (spec, *Out of scope*). Every variant used as evidence is
  temporary and restored from saved bytes (§5).
- `app/postep/page.tsx`. It passes `schedule.sessions` exactly as today.
- `app/tokens.css`, `app/globals.css`, `package.json`, `package-lock.json`.
  These are criterion 9.
- `specs/016-*`, `specs/020-*`. AGENTS.md §8.

---

## 2. The schema and the model

### 2.1 The field, and refusal 1: an empty title

In `sessionSchema`, after `date`:

```ts
title: z.string().regex(/\S/).optional(),
```

**Refusal 1 lives in the schema.** Emptiness is a property of the string
alone, and the schema already refuses an empty string for every other string
it holds: `date`, `start`, `end` and all three topic keys use `.min(1)`. The
file's own shape is where that rule already sits.

**Why `/\S/` and not `.min(1)`.** A title of spaces passes `.min(1)`. It would
then render as a bare `2.`, which is the stray number criterion 4 forbids.
`/\S/` refuses both `""` and `"   "` in one rule. It normalises nothing: an
accepted title is still stored verbatim (decision 5). There is one comment on
the field, saying exactly this.

**The message is written in `lib/schedule.ts`, not left to Zod.** A new branch
goes in `describeSchemaFailure`, before the `topics` branch:
`kind === "sessions" && inRow && trail[2] === "title"`. It fires for every
title failure, whether empty, blank, `null` or a number, so the sentence
covers all of them. The row prefix comes from the existing code, which names
the session by the number the raw row declares:

```
content/schedule.json — session 2: title must be text with something in it — the name of the class as it is entered in the school's plan, written without its number, as "title": "Budowa pierwszej aplikacji desktopowej za pomocą agenta AI." A class with no registered name yet leaves the "title" key out altogether.
```

The function's comment currently reads "Two shapes are worth naming"; it
becomes three.

### 2.2 Refusal 2: a title that begins with its own number

**Refusal 2 lives in `lib/schedule.ts`.** It is raised by a small
`sessionTitle(value, number, row)` beside `scheduleDate`, returning
`string | null`. It is called in the `sessions.push` literal next to `date`,
with the same shape: absent becomes `null`. The pattern is `/^\s*\d+\./`. It
tests the raw string, and leading spaces are allowed for, because
`" 1. Jak…"` would render as `2. 1. Jak…` just the same.

It belongs here rather than in a Zod `.refine`, for three reasons:

1. **The rule exists only because of the renderer.** The title is refused
   because the page puts `session.number` in front of it. That is a statement
   about the model's contract with the page, not about the file's shape. The
   schema's header keeps Zod to shape; the dates have the same split, with Zod
   holding a string and meaning one layer up.
2. **The sentence needs the session's number.** It shows the collision the
   reader would see, `1. 1. …`. A refinement on the field cannot see its
   session's `number`.
3. **The rule and its sentence stay together.** A refine would leave
   `describeSchemaFailure` telling two title issues apart on one path by Zod's
   issue codes, with the rule in one file and its sentence in another.

It is raised through the existing `fail(row, …)`, with the `field — "value"`
opening that `scheduleDate` already produces:

```
content/schedule.json — session 1: title — "1. Jak dziś powstaje oprogramowanie." begins with a number and a full stop. The page puts the session's number in front of every title automatically, and would show "1. 1. Jak dziś powstaje oprogramowanie." on this row. Write the title without the number, as "title": "Jak dziś powstaje oprogramowanie."
```

`would show` is `${number}. ${value}`, using the session's own number. If the
typed number does not match the session, the message shows the disagreement
rather than hiding it (decision 3). The suggestion is `value` with
`/^\s*\d+\.\s*/` removed. That removal happens in the message only and never
in stored data. "On this row" ends the sentence whether or not the title ends
with a full stop.

### 2.3 How the title reaches the renderer

- `ScheduleSession` gains `title: string | null`. Its comment says three
  things: the value is verbatim; it is **never** stored with a number; the
  number is added by the renderer (decision 2).
- `ScheduleTable` already receives `sessions`, so no prop, no page component
  and no second model changes.
- **A comment becomes false and is corrected.** `ScheduleTopic`'s comment says
  *"Nothing in `content/schedule.json` carries a title or a letter"*. A session
  now can, so it becomes *"No topic in … carries a title or a letter"*.

---

## 3. The markup

### 3.1 The element: `<h3>`, first in the topics cell

```
<td colSpan="5"><h3 class="…__title">2. Budowa pierwszej aplikacji desktopowej za pomocą agenta AI.</h3><ul class="…__topics">…
```

- **A heading, level 3.** The page's outline is `h1` Postęp grup, then `h2`
  Tygodnie and `h2` Zajęcia. A session's title heads that session's topics,
  which is what the spec asks it to read as, so `h3` is the next level with
  none skipped. A heading is flow content and is valid inside a `<td>`.
- **The number goes in as one text child**: `` {`${session.number}. ${session.title}`} ``.
  If it were written as JSX, `{session.number}. {session.title}`, React's
  server renderer would put `<!-- -->` between the text nodes in the
  prerendered HTML. Criterion 3 checks a plain substring (020 §3.2 learned
  this).
- **It is not inside a link.** It comes before the `<ul>`, and `Topic` is the
  only place that creates a `Link`.

**Rejected:**
- `<p>` or `<strong>`: no heading semantics, and they would need a
  `font-family` declaration to get the mono face that `globals.css` already
  gives every heading.
- `<caption>`: a table has one.
- A `<th>` in the topics row: it changes that row's cell structure.

### 3.2 The untitled branch must be the same JSX, not merely the same HTML

The RSC payload inside `postep.html` and `postep.rsc` serialises the cell's
children literally. Today that is `"colSpan":5,"children":["$","ul",…`, as
measured. If this were written as `{session.title && <h3/>}<ul/>`, the
children would become an array holding `null` or `false` next to the list.
The HTML would look the same, the payload bytes would change, and criterion 2
would fail.

So the cell is a branch. With no title, its only child is the same `<ul>`
element it has today. With a title, it is the heading followed by that
`<ul>`, with the list built once and used in both branches. The component's
doc comment gets one sentence saying why, because `&&` is the obvious
"simplification" for the next reader.

### 3.3 Accessibility consequence

- **Titled sessions are in the heading list.** A screen-reader user can jump
  between them by their registered names.
- **The heading matters most in the stacked layout.** Below 41rem the table
  elements are `display: block`, and they lose their table roles there, as the
  stylesheet's header already states. The heading keeps its role at every
  width, so in that layout it is the one structural marker left.
- **An untitled session has no heading.** Heading navigation skips it, so the
  outline is only as complete as the data. This cost is accepted: a
  placeholder heading would be an invented fact (Article V).
- **The number is spoken twice.** In the wide table the row header already
  says "Zajęcia 2" and the heading then begins "2.". The spec requires the
  number, so this is accepted.
- **Nothing becomes focusable**, so the tab order does not change.

---

## 4. The stylesheet

These three rules go after `.topics` in the stacked section, plus one line in
the `@media (min-width: 41rem)` block:

| rule | declarations | why |
| --- | --- | --- |
| `.title` | `margin: var(--gap-tight) 0 0; font-size: inherit; font-weight: var(--weight-strong);` | The heading takes the top gap that the list takes today when the list comes first. `inherit` cancels the browser's default 1.17em and keeps the table's `--text-sm`. |
| `.title + .topics` | `margin-block-start: 0.2rem;` | The same gap as between topic lines, so the title reads as the first line of the group. Specificity (0,2,0) beats both `.topics` rules, which are (0,1,0), so one rule covers both layouts. |
| `.title` inside the 41rem block | `margin: 0;` | Matches `.topics { margin: 0 }` in the same block. |

**How it differs from a topic line, using only existing tokens:**
- **Element:** `h3` against `li`.
- **Face:** mono. It comes from `globals.css`'s `h1…h6` rule, with no
  declaration here. Topic lines are sans, and only their ids are mono.
- **Weight:** `--weight-strong`, against 400. This is the theme-tuned bold,
  and `components/exercise.module.css` uses it for its own `.title`, also with
  a tight gap to the thing it names.
- **Colour:** the inherited `--text`. Published topics are `--link`, so the
  title does not look like a link.

No colour is declared, and nothing new enters `app/tokens.css`. Check B still
runs as the first half of `npm run build`.

**Below 41rem.** The heading is a block the width of the card and wraps like
prose. `white-space: nowrap` applies only to `.figures > *` in the wide
layout, and the title is not in `.figures`. The longest title is
„Organizacja projektu programistycznego: folder, repozytorium Git i GitHub.",
74 characters, about 622px unwrapped at 8.4px per mono character:
- **At 320px:** the lane is 288px, so the title takes three lines. Its longest
  word, `programistycznego:`, is about 151px.
- **At 1280px:** it spans the 624px cell.

A spanning cell's minimum width is its longest word, so the title cannot
widen the table at any width. Criterion 7 measures this rather than trusting
it.

**Rejected: no stylesheet change at all.** That would leave the browser's
1em margins above and below a heading in every titled cell. It would also
avoid §6.1's problem entirely, which is why it was considered.

---

## 5. Temporary schedules: the discipline

None of the evidence commits a change to `content/schedule.json`. The owner's
uncommitted edits (session 3, and `4Tc-2` on session 2) are in that file
throughout.

- **A script in the scratchpad, not the repo,** with three commands:
  - `save` copies the file's bytes to `scratch/schedule.saved.json` and records
    their sha256.
  - `variant <name>` first checks that the file's current sha256 equals the
    saved one. If it differs, the owner has edited mid-run: stop, and never
    overwrite. Otherwise it parses the saved bytes, applies the variant to
    sessions **found by `number`**, and writes the result with
    `fs.writeFileSync`.
  - `restore` writes the saved bytes back and confirms the sha256 matches.
- **Never** `git checkout`, `git restore` or `git stash` on `content/`, and
  never PowerShell `>` or `Set-Content`, which re-encode. `git status
  --porcelain -- content/schedule.json` should read the same after every
  restore as it did before `save`.
- **Every variant touches only sessions 1 and 2.** Those exist in the
  committed file. If either is missing at run time, the script stops rather
  than inventing a session.

| variant | change | for |
| --- | --- | --- |
| `untitled` | every `title` key removed. If there are none, no write happens at all | criteria 2 and 8 |
| `titled` | session 1 has no `title`; session 2 has `"Budowa pierwszej aplikacji desktopowej za pomocą agenta AI."` | criteria 3, 4, 5 |
| `longest` | session 2 has `"Organizacja projektu programistycznego: folder, repozytorium Git i GitHub."` | criterion 7 |
| `empty`, `blank` | session 2 has `""`, then `"   "` | criterion 6, refusal 1 |
| `numbered` | session 1 has `"1. Jak dziś powstaje oprogramowanie."` | criterion 6, refusal 2 |

A build overwrites `.next/`, including one started by another process, so
each build's output is copied to the scratchpad as soon as it finishes. No dev
server runs while a build does.

Rejected: building the evidence in a separate `git worktree`. It would keep
the owner's file untouched, but it has no `node_modules`, and it would
measure a tree other than the one that ships.

---

## 6. Criterion 2: no titles means `/postep` is byte-identical

### 6.1 The gap: the build id is not the only thing that changes

**Measured in the current build:**
- 53 of the 54 prerendered pages link the same two CSS chunks.
- One chunk, `1wg8_-repj78h.css`, holds **every** page module's classes:
  `/postep`'s (`page-module__da8XEa__…`) and `/styleguide`'s.
- Each page names it three times.
- Its file name is a content hash.

So the §4 rules rename that chunk in every page's HTML and payload. Criteria 2
and 8, which allow only the build id to be normalised, cannot hold literally
for any slice that adds CSS. Nothing in the spec says so.

**What the plan does instead:**
- Normalise the CSS chunk names as well as the build id.
- Recover the lost strength with a separate check that the stylesheet change
  is purely additive (§6.2, step 4).
- Record the gap in the final report.

**A risk this relies on.** CSS module class names (`da8XEa`) are expected to
come from the file path, not the file's contents. If the comparison shows them
changed, that is a finding. It is not normalised away. Criterion 2 is then
unmet for any stylesheet edit, and the run stops and reports.

### 6.2 The instrument: 016's before/after comparison, extended

1. **One schedule for both sides.** Run `save`, then `variant untitled`. A
   schedule with titles cannot be the "before" anyway, because the pre-slice
   `strictObject` refuses the unknown key. Record a fingerprint of `content/`:
   sha256 over every file, paths sorted. Take it before the first build and
   again after the second. **If they differ, the owner changed content between
   the builds: discard both and redo them.** 020 found that content edits made
   between two builds get measured as code changes.
2. **After side.** Build at HEAD. Copy every `*.html` and `*.rsc` under
   `.next/server/app` (recursively), `.next/BUILD_ID` and
   `.next/static/chunks/*.css` to `scratch/after/`.
3. **Before side.** First confirm `git status --porcelain` on the four slice
   paths is empty. Then run
   `git restore --source=<T01>^ -- lib/schedule-schema.ts lib/schedule.ts app/postep/schedule-table.tsx app/postep/page.module.css`.
   This is path-scoped, byte-exact and application code only. Build, and copy
   the same files to `scratch/before/`. Then `git restore --source=HEAD --` the
   same four paths, and confirm porcelain is empty again. Run `restore` on the
   schedule.
4. **Compare, after normalising both sides:**
   - Replace each side's build id with `BUILD_ID`.
   - Replace each side's CSS chunk names with `CSS_MODULES` (the chunk that
     contains `page-module__`) and `CSS_GLOBAL` (the other one).

   Then check:
   - **Criterion 2:** `postep.html` and `postep.rsc`, and every file under
     `postep.segments/`, are byte-identical.
   - **Criterion 8:** both sides list the same files, and every other file is
     byte-identical. Any difference is shown as a finding.
   - **The additive check:** `CSS_GLOBAL` is byte-identical. `CSS_MODULES` from
     after equals the one from before once every selector naming `__title` is
     removed. A rule whose selector list becomes empty is dropped; a selector
     is removed from a list if the minifier merged it into one.

---

## 7. Order of work

One commit per step, `022/TNN:`. Criterion 1 is re-checked by every step that
changes code.

| # | step | the check |
| --- | --- | --- |
| **T01** | `lib/schedule-schema.ts` and `lib/schedule.ts`: the field, `ScheduleSession.title`, both refusals, the new `describeSchemaFailure` branch, and the corrected comments (§2). Nothing renders the title yet. | `npm run build` succeeds against the schedule as it stands and lists `/postep` as `○` static. `npm run lint` is clean. `git show --stat HEAD` names only the two `lib/` files. **Criterion 6:** `variant empty`, `variant blank` and `variant numbered`, one build each. Each build stops with §2.1's or §2.2's message, quoted verbatim, naming session 2, 2 and 1 in turn. `restore` after each, sha256 confirmed. |
| **T02** | `app/postep/schedule-table.tsx` and `app/postep/page.module.css` (§3, §4). One commit, because the element and its treatment are one change: a heading without the rules would render with the browser's margins. | Build and lint as T01. With the untitled schedule: `postep.html` contains no `<h3`, and every `colSpan="5"` cell opens with `<ul`. Copy it to `scratch/untitled/`. **`variant titled`**, then build: **Criterion 3:** session 2's topics cell opens with `<td colSpan="5"><h3 class="…__title">2. Budowa pierwszej aplikacji desktopowej za pomocą agenta AI.</h3><ul`, with no `<a` before `</h3>`. **Criterion 4:** session 1's whole `<tbody>…</tbody>` is byte-identical to session 1's `<tbody>` in `scratch/untitled/postep.html`, which shows there is no title element and no stray number. **Criterion 5, markup half:** the title is an `h3` with the `__title` class, and topics are `li`. `restore`. |
| **T03** | No code. The comparison in §6.2. | **Criteria 2 and 8**, plus the additive CSS check. **Criterion 9:** `git diff <T01>^ HEAD -- package.json package-lock.json app/tokens.css app/globals.css` is empty. Every `var(--…)` added in `page.module.css` names a token already in `app/tokens.css` (`--gap-tight`, `--weight-strong`), and none is `color`. The diff adds no `"use client"` and no event handler. |
| **T04** | No code. `npm run dev` with `variant longest`. | **Criterion 7:** `documentElement.scrollWidth − clientWidth` is 0 at 320, 375 and 1280. 656 is added as well, because just above the breakpoint is where the wide table is tightest (020). At 1280, the table's rect is `left 464, width 624`. **Criterion 5, style half:** computed styles of the title are a mono `font-family`, `font-weight` 650 on dark and 700 on light, and `color` equal to `--text`. A topic `li` is sans at 400. Screenshots at 375 and 1280 for criterion 10. Stop the dev server, then `restore`. |
| **T05** | `verification.md`, then the closing review in a fresh subagent context (AGENTS.md §3). | **Criterion 11:** the review reports no gap. **Criterion 10 stays unchecked.** The final report names it, points at T04's screenshots, and restates §6.1. |

**Every criterion has a step.** 1 → T01, T02 · 2 → T03 · 3 → T02 · 4 → T02 ·
5 → T02 + T04 · 6 → T01 · 7 → T04 · 8 → T03 · 9 → T03 · 10 → nobody, by design ·
11 → T05.

---

## 8. Where the spec left this plan guessing

1. **Criteria 2 and 8 normalise only the build id** (§6.1). This one matters.
   A slice that adds a CSS rule renames the shared page-module chunk on every
   page, so the criteria as written fail for a reason unrelated to titles. The
   plan also normalises the chunk names and adds the additive-CSS check.
   Viktar may prefer to amend the wording in a later slice; this one does not
   edit its own spec (AGENTS.md §8).
2. **"The longest of Viktar's three titles" (criterion 7)** is never given as a
   set. The plan takes the three Polish titles that appear in the spec (the
   example under *Why*, §2's and criterion 3's). The longest is „Organizacja
   projektu programistycznego: folder, repozytorium Git i GitHub.", at 74
   characters.
3. **"Empty" and "begins with a number followed by a full stop" (§3).** Empty
   is read as "no visible character", for §2.1's reason. The number rule is
   read literally, as `^\s*\d+\.`. That also refuses a title that opens with a
   decimal such as `2.0 …`, which is improbable in a register entry and not
   special-cased. `1) …` and `1 …` are not refused, and nothing in the spec
   asks for that.
