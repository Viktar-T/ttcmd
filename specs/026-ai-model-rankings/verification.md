# verification.md — 026-ai-model-rankings

Evidence for every task in `tasks.md` and every acceptance criterion in
`spec.md` as amended 2026-10-01. Each section is the command that ran and what
it returned. Criterion 10 is Viktar's eye and is marked as such.

The working tree carried slice 025's uncommitted work throughout (`app/postep/*`,
`content/schedule.json`, `lib/schedule*.ts`, `specs/025-*`). None of it is in
any 026 commit; its fingerprint is recorded in T06.

---

## T01 — The list exists, and the build knows its rules

The seed equals spec §3, byte for byte, in order — a one-off script that reads
the spec's three table rows (`| [name](url) | description |`) and compares:

```
$ node scratchpad/t01-seed.mjs
spec §3 rows found: 3
file rankings: 3
 1. Arena — Agent: Overall -> https://arena.ai/leaderboard/agent/overall (295 chars)
 2. Artificial Analysis -> https://artificialanalysis.ai/ (213 chars)
 3. SWE-bench -> https://www.swebench.com/ (204 chars)
rankings === spec §3 rows, in order: true
lede non-blank: true
starts with BOM: false
exit 0
```

Build, lint, and the type check that sees the two new modules (nothing renders
them yet, so the build's own compile does not reach them):

```
$ npm run build
  Design invariants OK.
✓ Compiled successfully in 597ms
  Finished TypeScript in 2.9s ...
✓ Generating static pages using 9 workers (55/55) in 24.4s
build exit 0

$ npm run lint
> eslint
lint exit 0

$ npx tsc --noEmit --listFilesOnly | grep ai-rankings
D:/code/ttcmd/lib/ai-rankings-schema.ts
D:/code/ttcmd/lib/ai-rankings.ts
$ npx tsc --noEmit
tsc exit 0
```

Criterion 1 holds at this step.

## T02 — `/rankingi-ai` renders the list

```
$ npm run build
  Design invariants OK.
✓ Compiled successfully in 553ms
  Finished TypeScript in 2.1s ...
✓ Generating static pages using 10 workers (56/56) in 13.4s
├ ○ /postep
├ ○ /rankingi-ai
build exit 0

$ npm run lint
> eslint
lint exit 0
```

`○` — prerendered as static content, so the loader's validation runs at build
time. Read from `.next/server/app/rankingi-ai.html` with the `<script>` payload
cut away, so only element markup is counted; the addresses are read out of
spec §3 by the same pattern T01 used:

```
$ node scratchpad/t02-page.mjs
tab title: "Ranking modeli AI — ttcmd"
h1 count: 1 text: "Ranking modeli AI"
tbody rows: 3
 row 1: first cell <a href="https://arena.ai/leaderboard/agent/overall">Arena — Agent: Overall</a> | target === §3: true | second cell 295 chars, non-empty: true
 row 2: first cell <a href="https://artificialanalysis.ai/">Artificial Analysis</a> | target === §3: true | second cell 213 chars, non-empty: true
 row 3: first cell <a href="https://www.swebench.com/">SWE-bench</a> | target === §3: true | second cell 204 chars, non-empty: true
anchors on the page: 4
   <a class="wordmark" aria-label="Strona główna" href="/">
   <a href="https://arena.ai/leaderboard/agent/overall">
   <a href="https://artificialanalysis.ai/">
   <a href="https://www.swebench.com/">
anchors with target=: 0 | anchors whose href has '?': 0
'_blank' anywhere in the file: false
PASS
exit 0

$ grep -o '<h1>Ranking modeli AI</h1><p>[^<]*</p><table>' .next/server/app/rankingi-ai.html
<h1>Ranking modeli AI</h1><p>Każdy z tych rankingów mierzy coś innego, a ich wyniki zmieniają się często.</p><table>
```

Criterion 3's markup half (the heading), criterion 4 (three rows, exact
targets, non-empty descriptions, in §3's order) and criterion 5 (no
`target="_blank"`, no query string — across every anchor, the header's
included) hold. The lede sits between the title and the table (spec §2).

## T03 — Invalid data fails the build, naming the entry

No code changed: the messages read as written. The data file was copied
aside first and its hash recorded; after each break it was restored from the
copy and the hash compared with the committed one. The broken states existed
only in the working tree, for the length of one build each, and none was
committed (`scratchpad/t03-break.sh`):

```
committed sha256: e9afdbb98fcd64506e17cf5407cb3b87fc0a54792824cfa19af7ece1e83b038a
working   sha256: e9afdbb98fcd64506e17cf5407cb3b87fc0a54792824cfa19af7ece1e83b038a

=== (a) ===
-      "url": "https://artificialanalysis.ai/",
-      "description": "Niezależne porównanie modeli i dostawców API: zbiorczy wskaźnik „inteligencji” z kilku testów, szybkość od
+      "url": "https://artificialanalysis.ai/"
npm run build exit 1
Error: content/ai-rankings.json — ranking "Artificial Analysis": "description" must be text with something in it — one or two sentences saying what this ranking measures.
restored: sha256 e9afdbb9…b038a == committed e9afdbb9…b038a: true

=== (b) ===
-      "url": "https://www.swebench.com/",
+      "url": "http://www.swebench.com/",
npm run build exit 1
Error: content/ai-rankings.json — ranking "SWE-bench": "url" is "http://www.swebench.com/", which is not an https address. Every ranking is linked over https — write the address starting with https://.
restored: sha256 e9afdbb9…b038a == committed e9afdbb9…b038a: true

=== (c) ===
-      "url": "https://arena.ai/leaderboard/agent/overall",
+      "url": "https//arena.ai/leaderboard/agent/overall",
npm run build exit 1
Error: content/ai-rankings.json — ranking "Arena — Agent: Overall": "url" is "https//arena.ai/leaderboard/agent/overall", which is not a web address. Write the whole address as the browser shows it, starting with https://.
restored: sha256 e9afdbb9…b038a == committed e9afdbb9…b038a: true

=== after the last restore ===
npm run build exit 0
✓ Generating static pages using 10 workers (56/56) in 16.2s
├ ○ /rankingi-ai
(porcelain for the data file above; empty = clean)
```

Where the build stops, from break (b)'s log:

```
Error occurred prerendering page "/rankingi-ai". Read more: https://nextjs.org/docs/messages/prerender-error
Error: content/ai-rankings.json — ranking "SWE-bench": "url" is "http://www.swebench.com/", which is not an https address. Every ranking is linked over https — write the address starting with https://.
    at l (lib\ai-rankings.ts:26:9)
Export encountered an error on /rankingi-ai/page: /rankingi-ai, exiting the build.
⨯ Next.js build worker exited with code: 1 and signal: null
```

Criterion 6 holds: a removed description, an `http:` address and a malformed
address each fail `npm run build` with a message naming the entry by its own
name, and the restored file builds.

## T04 — A lesson can link to the page

A temporary paragraph `[Ranking modeli AI](/rankingi-ai)` was appended to one
published lesson, copied aside first, and restored from the copy with its hash
checked (`scratchpad/t04-stage.sh`).

Before the edit to the site's known routes:

```
staged; lesson sha256 before: d4b70c6072e80e0fab31933eedc7bc0f369e7ea24d73f73e034e25857a812156
+
+[Ranking modeli AI](/rankingi-ai)
npm run build exit 1
Error: content/moduly/00-start/jak-dziala-ten-kurs.mdx:40: the link /rankingi-ai — there is no such page. Links into the course are resolved against content/moduly/ when the site is built.
```

After it, with the same staged lesson:

```
npm run build exit 0
✓ Generating static pages using 10 workers (56/56) in 18.7s
$ grep -o '<a[^>]*href="/rankingi-ai"[^>]*>[^<]*</a>' .next/server/app/moduly/00-start/jak-dziala-ten-kurs.html
<a href="/rankingi-ai">Ranking modeli AI</a>
restored; sha256 now d4b70c6072e80e0fab31933eedc7bc0f369e7ea24d73f73e034e25857a812156, before d4b70c6072e80e0fab31933eedc7bc0f369e7ea24d73f73e034e25857a812156
(content/moduly porcelain above; empty = clean)
```

The link renders as an internal link — same tab, no mark. Then, on the
restored tree:

```
$ npm run build
npm run build exit 0
✓ Generating static pages using 10 workers (56/56) in 16.7s
$ npm run lint
> eslint
lint exit 0
```

`content/moduly` is as it was before the task, so the spec's *Out of scope*
promise — a lesson points here in the content lane — now holds.

## T05 — The front door has two buttons, progress first

```
$ npm run build
  Design invariants OK.
✓ Generating static pages using 10 workers (56/56) in 23.4s
┌ ○ /
├ ○ /rankingi-ai
npm run build exit 0

$ npm run lint
> eslint
lint exit 0
```

`Design invariants OK` includes Check B, the scan of `app/` and `lib/` for
colour literals; the one new rule has none. Read from
`.next/server/app/index.html`, element markup only:

```
$ node scratchpad/t05-hero.mjs
class="heroActions" in element markup: 1
directly inside it: <a class="button" href="/postep">Postęp grup</a><a class="button" href="/rankingi-ai">Ranking modeli AI</a>
equals the two buttons, progress first: true
class="button" in element markup: 2
  1. <a class="button" href="/postep">Postęp grup</a>
  2. <a class="button" href="/rankingi-ai">Ranking modeli AI</a>
heroText children: h1, p, div
PASS
exit 0
```

Criterion 2's markup half holds: the first button reads exactly „Postęp grup"
and targets `/postep`, its markup byte-for-byte what it was; the second reads
exactly „Ranking modeli AI" and targets `/rankingi-ai`; both carry the same
`button` class and nothing else. The computed half is T06.

## T06 — Nothing else moved, and it holds at every width

### Criterion 8 — the before/after comparison

**One tree for both sides.** The after side was built at `2540e5d` (T05). For
the before side, the pre-slice versions of `app/page.tsx`, `app/nav.css` and
`lib/links.ts` were restored from `ebe7fc4` (the commit before T01) and the
four new files removed. That build ran straight after the first, and then all
seven paths were restored from HEAD. Each build started from an emptied
`.next/` (the `dev/` cache kept). A fingerprint taken before the first build
and after the restore — every file under `content/`, slice 025's tracked diff,
its untracked spec files, the whole porcelain status and HEAD — was equal:

```
--- fingerprint 1
content/ tree:      c6db52c541fdc7fc
slice-025 diff:     67943769a25cd650
slice-025 untracked:4b48a24bd7f08cda
porcelain:          b35054da2784e74b
HEAD:               2540e5d
--- AFTER build (HEAD)
npm run build exit 0
captured 336 files, build id yEghhHW_vTjb7ycJJ_ZLe, css: 11ilu3xivd-bm.css 313fbbsy_drm8.css
--- BEFORE build (pre-slice code on the same tree)
 M app/nav.css
 M app/page.tsx
 D app/rankingi-ai/page.tsx
 D content/ai-rankings.json
 D lib/ai-rankings-schema.ts
 D lib/ai-rankings.ts
 M lib/links.ts
npm run build exit 0
captured 330 files, build id texE3Y42z-hmyavwSWO4P, css: 313fbbsy_drm8.css 3ypc2jqy4p_lb.css
--- restore slice code from HEAD
(slice paths porcelain above; empty = clean)
--- fingerprint 2
(identical to fingerprint 1, line for line)
FINGERPRINTS EQUAL: one tree for both builds
```

Every prerendered artefact under `.next/server/app` was compared — `.html`,
`.rsc`, `.meta` and `.segments/` — not only the HTML. Each side's own build id
and its global stylesheet's file name were replaced by a fixed token, and
nothing else was touched (`scratchpad/t06-compare.mjs`):

```
build ids  — before texE3Y42z-hmyavwSWO4P, after yEghhHW_vTjb7ycJJ_ZLe
global css — before 3ypc2jqy4p_lb.css, after 11ilu3xivd-bm.css
other css  — before 313fbbsy_drm8.css, after 313fbbsy_drm8.css

files: before 330, after 336
only in after:  ./rankingi-ai.html  ./rankingi-ai.meta  ./rankingi-ai.rsc  ./rankingi-ai.segments/_full.segment.rsc  ./rankingi-ai.segments/_tree.segment.rsc  ./rankingi-ai.segments/rankingi-ai/__PAGE__.segment.rsc
only in before: (none)

common files outside the home page: 324 (of which .html: 54)
byte-identical after normalising: 324
DIFFERING outside the home page: none
home-page artefacts that differ (expected): ./index.html  ./index.rsc  ./index.segments/__PAGE__.segment.rsc  ./index.segments/_full.segment.rsc

modules stylesheet: same name and same bytes: true
global stylesheet: rules matching .heroActions in after: 1 → .heroActions{gap:var(--gap-tight);flex-wrap:wrap;display:flex}
global stylesheet: after minus that rule === before, byte for byte: true
global stylesheet: before contains .heroActions: false

PASS
```

The control, with only the build id normalised, shows why the amended
criterion normalises the stylesheet's name as well:

```
common files outside the home page that differ: 265 of 324
```

Every one of the 54 other pages, `/postep` and `/styleguide` included, is
byte-identical. JavaScript chunk names did not move either, because they are
in the HTML that compared equal.

### Criterion 9 — nothing added that the spec forbids

```
$ git diff ebe7fc4 HEAD -- package.json package-lock.json app/tokens.css | wc -l
0
$ git diff --stat ebe7fc4 HEAD -- . ':!specs'
 app/nav.css               |  13 +++-
 app/page.tsx              |  22 +++---
 app/rankingi-ai/page.tsx  |  61 ++++++++++++++++
 content/ai-rankings.json  |  20 ++++++
 lib/ai-rankings-schema.ts |  48 +++++++++++++
 lib/ai-rankings.ts        | 175 ++++++++++++++++++++++++++++++++++++++++++++++
 lib/links.ts              |  16 ++++-
 7 files changed, 343 insertions(+), 12 deletions(-)
added lines with "use client":            0
added lines with an on[A-Z]...= handler:   0
added lines defining a custom property:  0
added lines with a colour literal:       0
useState/useEffect/window/document added:  0
<script added:                           0
```

The new page ships no script of its own, and the home page's set did not
change:

```
scripts on /rankingi-ai: 7
of those, not on /moduly: 0
scripts on /moduly: 8; on /postep: 8
home page: same script set before and after
```

No dependency, token, colour or client-side behaviour is added.

### Criteria 2 (computed), 3 and 7 — measured live

`.next/` was rebuilt at HEAD after the comparison. Port 3000 was free, but
`preview_start` for the project's launch config refused to start a second
`next dev`: one started outside this session was already serving this
directory on port 3001 (PID 43688). It was used read-only and not stopped. It
serves the working tree, which is HEAD plus slice 025's uncommitted files.
Measured in the browser pane with the viewport emulated, after
`document.fonts.ready`.

**1280 px, `/`** — criterion 2's computed half:

```
viewport 1280, path "/", overflow 0
 Postęp grup       /postep       border "1px solid rgb(131, 128, 122)"  padding "11.2px 22.4px"  font "JetBrains Mono" 16px  height 49.97  width 152.4  left 16     top 294.8
 Ranking modeli AI /rankingi-ai  border "1px solid rgb(131, 128, 122)"  padding "11.2px 22.4px"  font "JetBrains Mono" 16px  height 49.97  width 210    left 176.4  top 294.8
sameBox (border, padding, font-family, font-size, height): true
heroTitleLeft 16
```

The two sit on one line, 8px apart (`--gap-tight`), on the course name's left
edge.

**Criterion 3** — the second hero button (`find` → `link "Ranking modeli AI"
href="/rankingi-ai"`) clicked at 1280 px; then, on the page it landed on:

```
pathname: "/rankingi-ai"
title:    "Ranking modeli AI — ttcmd"
h1:       ["Ranking modeli AI"]
h1Left:   16
rows:     [["https://arena.ai/leaderboard/agent/overall", target null, 295],
           ["https://artificialanalysis.ai/", target null, 213],
           ["https://www.swebench.com/", target null, 204]]
pageOverflow 0, tableOverflow 0, firstColWidth 114
```

The landing is read from the pathname, not from the heading's text, because
the button's label and the heading are the same words. The new page's title
sits on the same 16px left edge as the hero's.

**Criterion 7** — `scrollWidth − clientWidth`. On the home page, each button's
rectangle is checked against the viewport:

| width | `/` overflow | `/rankingi-ai` overflow | table's own overflow | buttons |
| --- | --- | --- | --- | --- |
| 1280 | 0 | 0 | 0 | one line: 152.4 + 210 px |
| 375 | 0 | 0 | 0 | wrapped (second top 350.8 ≥ first bottom 342.8); both inside 0–375; widths 152.4, 210 |
| 320 | 0 | 0 | 0 | wrapped (second top 344.1 ≥ first bottom 336.1); both inside 0–320 (rights 168.4, 226); widths 152.4, 210 |

At every width each button keeps its 1280 width, so the two wrap rather than
shrink. The console showed no errors. Screenshots at 320 px of both pages were
taken in the pane: the two buttons stacked under the lede, and the table in
two columns with the names wrapping in the first.

Criteria 2, 3, 7, 8 and 9 hold.

## T07 — Close the slice

### Criterion 8, a second measurement

Before any slice code changed, the prerendered HTML of all 55 pages was
captured from a clean build, and a second clean build of the same tree
compared byte-identical with it (build id normalised), so the build is
deterministic. That session-start capture was diffed against the slice's
build from T06, normalising the build id and the global stylesheet's name:

```
differs: ./index.html
pages in the session-start baseline: 55; differing from the slice's build: 1
only in the slice's build: ./rankingi-ai.html
```

T06's back-to-back builds remain the primary evidence. Slice 025's working
files moved between this capture and T06 (see the journal), and only the
back-to-back pair is proven to have seen one tree. The two measurements agree.

### Criterion 10 — Viktar's eye, unchecked

Not judged by this run. What to look at:

- the front door at 1280 px and on a phone: whether two equal bordered buttons
  still read as one front door, with „Postęp grup" first;
- `/rankingi-ai`: whether the three descriptions and the sentence under the
  title are his wording. All four are drafts in `content/ai-rankings.json`;
- also `/rankingi-ai` at 1280 px: the first column takes about 114px, so
  „Arena — Agent: Overall" sets on three lines beside five or six lines of
  description. That is the site's lesson-table style as it stands; no rule
  was added for it (plan §4.3, decision 6).

### Criterion 11 — the fresh-context review

A subagent was briefed with only `constitution.md`, `AGENTS.md` and the
amended spec, and reviewed `git diff 7db9833 HEAD` read-only. Verdict: **no
gap**. What it checked:

- `git show --stat` on every commit. None touches slice 025's paths. Outside
  the slice folder the diff is the 7 files of the plan.
- **HEAD exported with `git archive` into a scratch folder**, so without slice
  025's uncommitted files: `npm ci`, `npm run build` exited 0 (56 pages,
  `○ /rankingi-ai`, prerender manifest `initialRevalidateSeconds: false`), and
  `npm run lint` exited 0.
- Criteria 2, 4 and 5 re-read from that build. The data file was compared
  with spec §3 by its own script.
- **Criterion 8 re-run on committed trees alone**: `7db9833` and HEAD built in
  isolation, every `.html`/`.rsc`/`.meta`/`.segments` file compared. Only the
  6 `rankingi-ai.*` files are new, 326 common files are byte-identical, and the
  only 4 that differ are the home page's. The global stylesheet minus the one
  `.heroActions` rule equals the old one, and the modules stylesheet is
  identical.
- Criterion 6's URL rules re-checked against Zod 4.4.3 directly. Criterion 9:
  no dependency, `"use client"`, handler or custom property added.
- The rules: nothing is called approved that Viktar did not read, the
  languages are right, `app/` stays at the root. No comment the slice touched
  is left stale.

It raised as open, not as gaps: decision 6 (same-tab links) and ADR-0008's
visible date are Viktar's call, and `docs/roadmap.md` has no row for 026 yet.
All three are in the final report and not done here.

### On the integrated HEAD

Slice 025 committed on `main` during this run, at 12:08–12:09 on top of
`026/T06` (`785adc9`…`ebfb04c`), and its files are no longer uncommitted. The
closing checks were re-run at `ebfb04c` before the close was committed:

```
$ npm run build
  Design invariants OK.
✓ Generating static pages using 10 workers (56/56) in 20.8s
┌ ○ /
├ ○ /postep
├ ○ /rankingi-ai
npm run build exit 0
$ npm run lint
lint exit 0
$ node scratchpad/t02-page.mjs   → PASS
$ node scratchpad/t05-hero.mjs   → PASS
$ node scratchpad/t01-seed.mjs   → rankings === spec §3 rows, in order: true
```

### Every criterion

| # | criterion | evidence | status |
| --- | --- | --- | --- |
| 1 | build succeeds, lint clean | every task; the review's isolated HEAD build | met |
| 2 | two buttons, „Postęp grup" first, same style | T05 markup; T06 computed box | met |
| 3 | the click lands on `/rankingi-ai` with its heading | T02 markup; T06 live click | met |
| 4 | three rows in §3's order, exact targets, non-empty | T02; the review | met |
| 5 | no `target="_blank"`, no query string | T02; T06 live; the review | met |
| 6 | invalid data fails the build naming the entry | T03, three breaks | met |
| 7 | no sideways scroll at 320/375/1280; buttons visible at 320 | T06 live | met |
| 8 | no other page changed | T06 back-to-back; T07 session-start baseline; the review's isolated builds | met |
| 9 | no dependency, token, colour, client behaviour | T06; the review | met |
| 10 | Viktar's eye | — | **unchecked, his** |
| 11 | fresh-context review reports no gap | above | met |
