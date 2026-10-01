# verification.md — 025-several-dates-per-session

Evidence for every acceptance criterion in `spec.md`. Criterion 12 is Viktar's
and is marked as such, and the perceptual remainder of criterion 9 is named
beside it. Sections 11 and 13 were completed last, after the commits existed and
after the review.

**A note on the tree.** `content/schedule.json` carried Viktar's own uncommitted
edit — session 5's 4Ta-2 and 4Tc-1 dates — for the whole slice. **No check wrote
to it.** Every temporary schedule, and every "before" build, lives in a scratch
copy of the tree: `git archive` of the commit the slice began from, plus a copy of
`node_modules` (581 MB — a symlink or junction was not tried, because Turbopack
refuses a `node_modules` that resolves outside the project). The file's SHA-256
was `3b4be031…0f46` when the run began and was compared with that after each of
T01, T02 and T03; it never moved. The two dev servers already running on this
machine (ports 3000 and 3001) answered `200` on `/postep` before the first build,
after the first main-tree build, after T02, and again once T03 was in place — the
one on 3001 rendering today's schedule with the new code. The scratch server used
port 3101 and was stopped by its PID.

**A note on the method.** Viktar said, while the plan was being written, that
all changes could be committed at the end. So no commit was made after the spec
until the work was done: each task was verified on the working tree at its own
state, its files were snapshotted, and the commits were then made in order, one
per task. Every figure below was measured on the tree *as it stood at that task*.

**Another slice was being built in the same tree.** Commits that are not this
slice's landed during the run, all Viktar's: `8a0a35f 026/T00: spec ai model
rankings` first, touching only `specs/026-ai-model-rankings/` — nothing a build
reads (`git diff --name-only 7db9833 8a0a35f -- app lib components content
scripts` is empty) — and then 026's plan, tasks and T01 to T05, which add
`lib/ai-rankings.ts`, `app/rankingi-ai/` and their data. Every "before" capture
is `git archive 7db9833`, so none of that reached a "before". For some minutes
`app/rankingi-ai/` was an uncommitted directory in the working tree, and one
capture, which at that time overlaid whole directories from the working tree,
picked it up and failed on a data file the scratch content does not have. The
capture script was changed to overlay **only this slice's four files**; every
capture before the change was taken while `git status` showed this slice's files
and Viktar's schedule and nothing else (checked when T03 was snapshotted), and
every capture after it cannot contain another slice's code. The commits below
are made by path, so nothing of 026's is in them.

**A line-ending quirk, unrelated to the slice.** `content/moduly/02-warsztat/
budujemy-z-agentem.mdx` is stored with LF and sits on disk with CRLF
(`git ls-files --eol`: `i/lf w/crlf`; `core.autocrlf=true`), so a main-tree build
differs from an archive build on that one lesson page. It is why every
comparison here is between two archive builds and not between a main-tree build
and a scratch one. The review found it independently.

---

## 1. Build, static route, lint

`C0` — `npm run build`, `npm run lint`, `npx tsc --noEmit` in the main tree —
was run on the unchanged code and after each task:

| stage | build | invariants (Check B) | route | pages | lint | tsc |
| --- | --- | --- | --- | --- | --- | --- |
| baseline, `7db9833` | exit 0, 18.6 s | `Design invariants OK.` | `├ ○ /postep` | 55/55 | exit 0, no finding | exit 0, 0 bytes |
| T01 | exit 0 | OK | `├ ○ /postep` | 55/55 | exit 0, no finding | exit 0, 0 bytes |
| T02 | exit 0 | OK | `├ ○ /postep` | 55/55 | exit 0, no finding | exit 0, 0 bytes |
| T03 | exit 0 | OK | `├ ○ /postep` | 55/55 | exit 0, no finding | exit 0, 0 bytes |
| **final** — T03 plus the review's two comment fixes, in the scratch tree | exit 0 | OK | `├ ○ /postep` | 55/55 | exit 0, no finding | exit 0, 0 bytes |
| **final, in the main tree**, on top of `2540e5d` (the other slice's commits) | exit 0 | OK | `├ ○ /postep`, `├ ○ /rankingi-ai` | 56/56 | exit 0, no finding | exit 0, 0 bytes |

`○ (Static) prerendered as static content`: `/postep` is static, so validation
still runs at build time and not at request time. The baseline was clean, so the
criterion reads as written. The last row is the integration check: the slice, on
top of the other slice's commits that landed during the run, builds, lints and
type-checks, and `/postep` is still static beside the new `/rankingi-ai`.

## 2. No change when no group holds several dates

Four comparisons, each on the schedule as it stood when the run began (all single
dates), each in the scratch tree, each over **330 files** (55 pages: `html`,
`rsc`, `meta` and every `segments/` file). `N1` is the build id, a 21-character
string found 275 times; `N2` is the stem of the stylesheet carrying the page's
rules.

| comparison | normalised | files differing | the other stylesheet |
| --- | --- | --- | --- |
| BASE → T01 | N1 + N2 | **0** | identical in name and bytes |
| T01 → T02 | N1 only | **0** | both stylesheets identical in name and bytes |
| T02 → T03 | N1 only | **0** | both stylesheets identical in name and bytes |
| BASE → final | N1 + N2 | **0** | `3ypc2jqy4p_lb.css`, identical in name and bytes |

**The stylesheet differs only by the rules the slice adds.** The modules
stylesheet was renamed `3uqvg85e28zvs` → `313fbbsy_drm8` (12,237 → 12,372 bytes).
Deleting from the new one exactly the two rules that name `page-module__da8XEa__dates`
leaves the old one byte for byte:

```
removed: .page-module__da8XEa__dates{flex-direction:column;align-items:flex-end;display:flex}
removed: .page-module__da8XEa__dates{align-items:flex-start}
headMinusRules == base: true   (12237 bytes)
```

**The instrument has teeth.** The same comparison of BASE against the spec's
example (S5) differs in exactly four files — `postep.html`, `postep.rsc`, and the
two `postep.segments/` files — and nowhere else, with the global stylesheet still
identical. A comparison that cannot fail proves nothing; this one did.

**One correction to the spec, found by the plan.** Criterion 2 said every page
links one stylesheet. Each links two — a global chunk and a chunk of merged CSS
modules — and only the second is renamed by a style rule. The spec was amended
before any code to hold the first to identity.

**Repeated on the final code.** The review's two comment fixes touch `app/` and
`lib/`, so the comparison was run again on the final code. BASE → final (N1 +
N2): **330 vs 330 files, 0 differing**, the global stylesheet identical. T03 →
final (N1 only): **0 differing, both stylesheets identical** — the comment edits
changed no output. A schedule that uses the feature agrees: S5 and S5b, each built
before and after the fixes, are identical (0 files differing, both times).
Deleting the two `.dates` rules from the final stylesheet leaves BASE's byte for
byte, as before.

### What the one-date cell's code has to be, and what it does not

The comment on the date's markup made two claims. Both were built.

- **A template literal in place of the three text children changes the page.**
  Built on today's schedule, four files differ from the three-children form —
  `postep.html`, `postep.rsc` and the two `postep.segments/` files, nothing else —
  and the first difference is `03.09<!-- -->-T<!-- -->1` against `03.09-T1`. So
  the JSX has to stay as it was, and the comment says so.
- **Calling the helper as a function, rather than rendering it as a component,
  does not.** With the date rendered as `<DateElement one={…} />`, the built page
  is byte for byte the function-call page — 330 files, 0 differing — on today's
  schedule *and* on the spec's example. The first draft of the comment called the
  function call "load-bearing". The fresh-context review doubted it; it was
  wrong, and the comment now says that it is not. The reasoning had been carried
  over from slice 022, where what mattered was a `false` child changing the shape
  of a cell's children, not a function boundary.

## 3. Two dates render in one cell, a third renders a third line

Built with the spec's example (S5) and with a variant (S5b). The cells of
session 4 were extracted from the built `postep.html` and compared with the
exact bytes they must be. For `4Ta-1` on S5:

```html
<td><span class="page-module__da8XEa__label">4Ta-1</span><span class="page-module__da8XEa__dates"><time dateTime="2026-09-22">22.09<!-- -->-T<!-- -->4</time> <time dateTime="2026-09-29">29.09<!-- -->-T<!-- -->5</time></span></td>
```

`4Ta-2` and `4Tc-1` are the same with `24.09-T4` and `01.10-T5`
(`dateTime="2026-09-24"` and `"2026-10-01"`); `4Tc-2` is
`<td><span class="…__label">4Tc-2</span></td>`. **S5: 15/15 assertions pass.**
On S5b, `4Ta-1` holds three `<time>` elements — a third date renders a third
line — and **S5b: 16/16 pass**. Each `<time>` carries its own full ISO date, and
its week is the one *that date* falls in: 22.09 is `T4`, 29.09 and 01.10 are
`T5`.

A list of one date (`4Ta-2` on S5b) renders `<td><span class="…__label">4Ta-2</span><time dateTime="2026-09-24">24.09<!-- -->-T<!-- -->4</time></td>`,
**byte for byte the cell the bare date produces on today's schedule**, with no
wrapper — that equality is itself an assertion, and it passes.

## 4. Written out of order, the dates render in date order

S5b writes `4Ta-1` as `2026-10-01`, `2026-09-22`, `2026-09-29`. The rendered
order, read from the `dateTime` attributes: `2026-09-22`, `2026-09-29`,
`2026-10-01`. Pass.

## 5. Viktar's example renders as he asked

S5 is the example exactly: session 4 holds 22.09 and 29.09 for 4Ta-1, 24.09 and
01.10 for 4Ta-2 and for 4Tc-1; session 5 holds no group date and no `groups` key.

```
session 4 row text:  Zajęcia 4 4Ta-1 22.09-T4 29.09-T5 4Ta-2 24.09-T4 01.10-T5 4Tc-1 24.09-T4 01.10-T5 4Tc-2
session 5:           contains no <time at all; each of its four <td> is exactly <td><span class="…__label">GROUP</span></td>
sessions 1, 2, 3:    whole <tbody> identical to the BASE page's
```

The schedule was a file in the scratch tree. Looked at in the browser pane, the
phone layout shows each code beside its first date, the second date directly
under it at the same right edge, and session 5 as four bare codes; the wide
layout shows the two dates one over the other in each column of session 4.

## 6. The build refuses each of these

Each is a separate build in the scratch tree, which exits `1`, and the message is
the first `content/schedule.json —` line of its log. Nothing needed reverting:
the owner's file was never written. Session 4 and `4Ta-1` are the row and group
varied; every message names both.

```
impossible day in a list ["2026-09-22","2026-09-31"]:
content/schedule.json — session 4: 4Ta-1 — "2026-09-31" has no day 31 — wrzesień 2026 has 30.

a date in no week ["2026-09-22","2026-12-28"]:
content/schedule.json — session 4: 4Ta-1 — "2026-12-28" falls in no week the calendar has, so the cell cannot say which week that class was in. Add the week containing it to "weeks", or correct the date: the calendar runs 2026-08-31 to 2026-12-25, Monday to Friday, and a weekend or a school break falls in none of it.

an entry with no date in it []:
content/schedule.json — session 4: 4Ta-1 — the list is empty. A group that has not got to this session yet is left out of the row, and a second way of saying so would hide a half-finished edit. Delete the "4Ta-1" line, or write its dates: "4Ta-1": ["yyyy-mm-dd", "yyyy-mm-dd"].

the same date twice ["2026-09-22","2026-09-22"]:
content/schedule.json — session 4: 4Ta-1 — "2026-09-22" is written twice. A group's entry holds each class once, and two identical lines in a cell would read as a bug. Delete one of them, or correct the one that was meant to be another day.

neither a date nor a list — 5, and ["2026-09-22", 29] (the same sentence for both):
content/schedule.json — session 4: 4Ta-1 must be a date, as "4Ta-1": "yyyy-mm-dd", or a list of dates, as "4Ta-1": ["yyyy-mm-dd", "yyyy-mm-dd"], one for each class the group spent on this session. A group that has not got there yet leaves the "4Ta-1" key out altogether.
```

The three new refusals say what to write instead, which is what criterion 6 asks
of the last three; the two old ones say what they said before, and the second of
them also says what to do. No message contains a plausible date (the placeholder
is `yyyy-mm-dd`; `grep -c 2026-` is 0 on the empty-entry and wrong-type
messages), which is Article V's instruction in a place it is easy to break.

**Beyond the criterion, two edge cases the plan chose on purpose:**
`["2026-09-22", " 2026-09-22"]` — the same day with a space, which the date
parser trims — is refused as written twice, with the normalised date;
`["2026-09-22", "2026-09"]` gets the old message verbatim: `content/schedule.json
— session 4: 4Ta-1 is "2026-09", which is a month rather than a day. Write the
whole date, as yyyy-mm-dd.` And the unknown-group sentence, which said a cell
holds one date, now reads: `…and a group's entry holds that group's own date as
yyyy-mm-dd, a list of dates when the session took more than one class, or nothing
at all.`

## 7. A single date is still refused with today's message

U1 (`"4Ta-1": "2026-09-31"`) and U2 (`"4Ta-1": "2026-12-28"`) were built on the
code from before the slice and on the final code. **The two message lines are
equal character for character** (`cmp` on the extracted lines, both pairs), and
each equals the message the same date gets inside a list (U1 = R1, U2 = R2) — the
same code ran for a single date and a listed one, by construction.

## 8. No document scrolls sideways

The S5 build, served by `next start` on port 3101 and measured in the built-in
browser pane. A window cannot be made 320 px wide, so each width is a
same-origin iframe of exactly that CSS width, tall enough for no vertical
scrollbar — an iframe has its own viewport, media queries and scrollbars.

| width | iframe `clientWidth` | `html` overflow | `body` overflow | elements past the root |
| ---: | ---: | ---: | ---: | ---: |
| 320 | 320 | 0 | 0 | 0 |
| 375 | 375 | 0 | 0 | 0 |
| 655 | 655 | 0 | 0 | 0 |
| 656 | 656 | 0 | 0 | 0 |
| 768 | 768 | 0 | 0 | 0 |
| 1024 | 1024 | 0 | 0 | 0 |
| 1280 | 1280 | 0 | 0 | 0 |
| 1585 | 1585 | 0 | 0 | 0 |

655 and 656 are either side of the 41rem fold. Pass at all eight. Measured a
second time on the final code, with the same result at every width.

## 9. At 375 px

S5, session 4 (with session 3 beside it for a one-date cell), measured on the
laid-out page in the built-in browser, on the **final code**, at 375 px and, as an
extra, 320 px. Twelve checks, **all true at both widths**: the tbody holds its
four cells and its topics row and does not overlap its neighbours; each filled
cell shows its group's code beside its first date; a probe shows that this test
*can* fail (below); every date is visible, inside its own cell and the document,
with `elementFromPoint` returning it; no date wraps; no date's centre lies in
another cell; the four cells do not intersect; each filled cell has one code; a
cell's dates share a right edge; the second date sits one line under the first.

```
375 px · line pitch 22.39 px · the code's TEXT top == the first date's TEXT top
4Ta-1 [22.09-T4 | 29.09-T5]   1707.52 == 1707.52      4Ta-2 [24.09-T4 | 01.10-T5]   1707.52 == 1707.52
4Tc-1 [24.09-T4 | 01.10-T5]   1757.10 == 1757.10      4Tc-2 [empty]
cell heights in lines: 2 · 2 · 2 · 2     one-date cell (session 3): 22.4 px = 1 line     neighbours' text tops equal
320 px · the same, at 1948.95 and 1998.53
```

**S5b, three dates beside one date beside two** — the worst realistic row. At 375
and 320 px all twelve checks are true; the cells are 3, 3, 2 and 2 lines high; the
label's text top equals the first date's text top in every filled cell (1707.52
and 1779.49 at 375 px; 1948.95 and 2020.92 at 320 px); and the one-date cell
beside the three-date one has its text on the same line (1707.52 and 1707.52). A
cell that grows downward does not move its neighbour's text.

**Wide layout** (656, 768, 1280 and 1585 px on S5; 768 and 1280 on S5b): the first
dates of every filled cell share a text top — 1391.11, 1081.11, 971.42 and 971.42
on S5; 1081.11 and 971.42 on S5b — and no wide-layout check fails. The label is
`display: none` in every cell (the header row carries `Nr 4Ta-1 4Ta-2 4Tc-1
4Tc-2`), and the dates stack with equal left edges, 8 px in from the cell, as the
single dates in the other rows sit.

**The instrument was wrong four times, and one of them was found by the review
and not by me.**

1. *Found by the review.* My first "code beside its first date" compared the
   label's **element box** with the date's. The label stretches to the full height
   of its cell (`align-items: stretch`), so its box overlaps every date in the
   cell and **the check could not fail**. The review measured the text instead:
   in 16 of 16 filled cells at 320 and 375 px the label's text top equals the
   first date's text top and the label sits to its left. I re-measured with text
   rectangles and added a probe — the same test against the *second* date of a
   cell with several must be false — and it is (`probeCodeIsNotBesideSecondDate:
   true`), so the test now discriminates.
2. My wide-layout run reused that phone-only test where the label is hidden by
   design, and reported a failure that was the check's.
3. On S5b the first wide metric compared element boxes and found the one-date cell
   1.72 px lower than its neighbours. That is real geometry and not a defect: a
   bare `<time>` is an inline box, whose top sits half a leading below the line's,
   and a wrapped one is a flex item, whose top is the line's. Measured on the text
   — `Range` rectangles and a baseline probe — the text tops are equal (1081.11 at
   768 px, 971.42 at 1280 px) and the baselines are equal (1095.39 and 985.71),
   with `line-height: 22.4px` and `font-size: 14px` in every cell.
4. The corrected script's own first run had two wrong checks. It counted the
   rectangles of a `Range` as lines — there is one per text node, and a date has
   three — and it allowed 4 px for the gap between one date's text bottom and the
   next one's top, which is 4.11. Both were the checks' and not the page's: the
   heights and tops beside them were consistent throughout. Both were fixed and
   the whole run repeated; the results above are that run.

**What this does not close.** The geometry stands in for "reads as one block" and
"unambiguous". It cannot say how it looks. See criterion 12.

**Below 320 px**, which no criterion names, the review observed that
nine-character dates wrap at 300 px — single dates too — and that the page
overflows by 4 px at 280 px. It did not trace the cause, and the slice did not
touch either.

## 10. Nothing else changed

**(a) No other page changed.** The BASE → final comparison of criterion 2 is this
check, and it was run on the final code: every page file of the 55, `html`, `rsc`,
`meta` and every segment, is identical once the build id and the modules
stylesheet's name are normalised. The spec's example (S5) differs from today's
schedule in `/postep`'s four files and nowhere else.

**(b) Nothing was added.** Against `7db9833`:

```
git diff --stat <base> -- package.json package-lock.json app/tokens.css app/globals.css   → empty
added lines matching use client | useState | useEffect | addEventListener | <script        → none
custom property defined in the stylesheet diff                                            → none
colour literal in any added line (hex, rgb(, hsl(, oklch(, oklab(, lch(, lab(, color(, color-mix()  → none
Check B of the build, which scans every comment as well as every rule                     → Design invariants OK.
files changed since the base: app/postep/page.module.css, app/postep/schedule-table.tsx,
                              lib/schedule-schema.ts, lib/schedule.ts (+ this slice's specs/)
                              content/schedule.json is Viktar's own uncommitted edit, not the slice's
```

**(c) With no script engine the page renders in full.** `curl` against the S5
server (nothing executes) returned `HTTP 200`, 38,181 bytes, byte-identical to the
built file, and the same exact-markup assertions of criterion 3 and 5 pass on
that response: every date is in the HTML. 52 `<time` elements in all (34 in the
calendar and 18 in the table).

## 11. No commit of this slice touches the schedule

The commits were made at the end, one per task, and then examined:

```
git log --grep='^025/T' --name-only --format= | grep -c '^content/'       → 0
git log -1 --format='%h %s' -- content/schedule.json                        → b4dd8dd harmonogram   (Viktar's, not a slice commit)
```

The seven commits so far whose subject begins `025/T` — the spec, the plan, the
amendment, the task list and T01 to T03 — touch only `specs/025-several-dates-per-session/`,
`app/postep/page.module.css`, `app/postep/schedule-table.tsx`, `lib/schedule.ts` and
`lib/schedule-schema.ts`. The T04 commit adds this note, the journal, and the
review's two comment fixes. The one commit since the base that touched `content/`
is not this slice's: `8e6b937 026/T01`. Every commit was made with an explicit
pathspec after the staged set had been compared with the files expected, with
nothing staged by anyone else.

**The one write to Viktar's file.** The move he asked for — session 5's three dates
onto session 4 — is a separate commit with a `content:` prefix, made after this one
(decision 8 of the spec). Before it, the working-tree copy still hashed
`3b4be031…0f46`, as at the start. `diff` against the file as found shows session
4's three entries becoming lists and session 5's `groups` block removed, and
nothing else; sessions 1 to 3 and the calendar are equal as parsed JSON. The
real page built from it passes the same exact-markup assertions as the spec's
example, and the dev server on port 3001 serves it.

## 12. Human eye — **NOT MET, and not this run's to meet**

Whether two stacked dates read, on a projector, as *this took two classes* rather
than as two sessions or as a mistake — and whether, on a phone, a cell with two
dates reads as one group's and not as two.

What to look at, in `/postep` once the schedule carries the move:

- **The wide layout in a projector-sized window**, at 1280 and 1585 px: session
  4's columns, each holding its two dates one over the other, beside session 5's
  empty row. The question is whether the stacked pair reads as one group's two
  classes.
- **The phone**, at 375 px: `4Ta-1  22.09-T4 / 29.09-T5` with the second date
  right-aligned under the first.

Both were looked at in the built-in browser during the run and read correctly to
the run; a projector across a classroom is not something the run has.

## 13. The fresh-context review

A subagent with none of this session's context (run on the `opus` model) was given
`spec.md`, the code diff against `7db9833` and this note, with the repository open,
and asked for gaps that affect correctness or a criterion — not preferences. It ran
its own checks: `npm run build`, `lint` and `tsc` in the main tree; a build in a
copy of the tree on a harsher schedule (five dates in one cell, two-digit weeks,
several dates in the right-hand column and in session 1); and a battery of
wrongly typed entries.

**Its verdict: criteria 1–10 met; no gap affecting correctness or a criterion;
nothing outside the slice's scope touched.** On inputs beyond the builder's
variants — `null`, `true`, `{}`, `[5]`, `[["…"]]` and `["…", null]` — each produced
exactly one error at the entry's own path, which the new sentence catches; `[]`,
`[""]` and `""` reach the loader and are refused there; the sort is chronological;
a duplicate is caught after trimming. Its own main-tree build of `/postep` matched
the scratch capture byte for byte once only the build id was normalised, so the
scratch evidence holds for the real tree; and a page with several dates in a cell
loaded with no hydration or console error.

**What it found, and what was done** — three things, none a defect in the
behaviour that ships:

1. **The test behind criterion 9's "code beside its first date" could not fail.**
   It measured the label's element box, which stretches to the cell. *Fixed in the
   evidence:* re-measured on text rectangles, with a probe that must fail and does
   (§9). The review had already re-measured the same thing and agreed.
2. **A false comment in `lib/schedule-schema.ts`** — "a list is accepted here
   whatever it holds"; a list with a non-string in it is refused right there.
   *Fixed:* it now says a list of strings, whatever its length.
3. **An overstated comment in `app/postep/schedule-table.tsx`** — that calling the
   date's helper as a function was load-bearing. *Tested, and the comment was
   wrong:* the page is byte-identical either way. The half about a template literal
   is true and was measured too (§2). *Fixed:* the comment says both.

The two comment fixes changed no output (§2). **The slice was not re-reviewed
after them.** The review reported no gap, the fixes are to two comments and to the
evidence, and the evidence was re-measured and the build re-compared — which is
how slice 022 closed over its own wording fixes. A reader who wants the stricter
rule can ask for a second review.

It could not verify criteria 11 to 13, by design, nor any browser but the pane's
Chromium.
