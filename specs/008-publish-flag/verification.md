# verification.md — 008-publish-flag

Evidence per task and per criterion. Commands and their output, recorded as
they ran. Criterion numbers refer to `spec.md`.

## Baselines (before any code change, 2026-08-29)

The working tree carried uncommitted content edits when the slice began (six
modified lessons, two untracked, all in module 01 — Viktar's writing in
progress). Criterion 10 is therefore measured against this snapshot, not
against HEAD.

`git status --porcelain content/`:

```
 M content/moduly/01-jak-powstaje-oprogramowanie/co-model-naprawde-potrafi.mdx
 M content/moduly/01-jak-powstaje-oprogramowanie/index.mdx
 M content/moduly/01-jak-powstaje-oprogramowanie/jak-nie-wypasc-z-obiegu.mdx
 M content/moduly/01-jak-powstaje-oprogramowanie/na-zywo-agent-buduje-aplikacje.mdx
 M content/moduly/01-jak-powstaje-oprogramowanie/od-podpowiedzi-do-agenta.mdx
 M content/moduly/01-jak-powstaje-oprogramowanie/vibe-coding-kontra-inzynieria.mdx
?? content/moduly/01-jak-powstaje-oprogramowanie/czterdziesci-lat-zmian.mdx
?? content/moduly/01-jak-powstaje-oprogramowanie/nowy-warsztat-programisty.mdx
```

Content-tree fingerprint: `git diff content/ | git hash-object --stdin` →
`6b28db80c62ebc98bf39d32671fb2f051a81859f`; untracked files
`sha1sum` → `81cfdb37…` (czterdziesci-lat-zmian.mdx), `ff172cdc…`
(nowy-warsztat-programisty.mdx).

Baseline `npm run build`: **passes**, 15 static pages. Emitted lesson pages
(`find .next/server/app -name '*.html'`), the criterion-1 baseline:

```
.next/server/app/_global-error.html
.next/server/app/_not-found.html
.next/server/app/index.html
.next/server/app/moduly.html
.next/server/app/moduly/00-start.html
.next/server/app/moduly/00-start/git-i-github.html
.next/server/app/moduly/01-jak-powstaje-oprogramowanie.html
.next/server/app/moduly/01-jak-powstaje-oprogramowanie/co-model-naprawde-potrafi.html
.next/server/app/moduly/01-jak-powstaje-oprogramowanie/czterdziesci-lat-zmian.html
.next/server/app/moduly/01-jak-powstaje-oprogramowanie/jak-nie-wypasc-z-obiegu.html
.next/server/app/moduly/01-jak-powstaje-oprogramowanie/na-zywo-agent-buduje-aplikacje.html
.next/server/app/moduly/01-jak-powstaje-oprogramowanie/nowy-warsztat-programisty.html
.next/server/app/moduly/01-jak-powstaje-oprogramowanie/od-podpowiedzi-do-agenta.html
.next/server/app/moduly/01-jak-powstaje-oprogramowanie/vibe-coding-kontra-inzynieria.html
.next/server/app/styleguide.html
```

At baseline the course on disk holds **8 lessons**: 1 in `00-start`
(`git-i-github`, order 3 → `0c`), 7 in `01-jak-powstaje-oprogramowanie`
(orders 1–7 → `1a`–`1g`, two of them the untracked drafts).

## T04 — a lesson frontmatter failure names its file

Staged: `order: 3` → `order: 0` in
`content/moduly/00-start/git-i-github.mdx` (schema requires `int ≥ 1`).

`npm run build`:

```
Error: content/moduly/00-start/git-i-github.mdx: [
      "order"
  ...
  [cause]: Error [ZodError]: ...
> Build error occurred
Error: Failed to collect page data for /moduly/[module]/[lesson]
```

**The failure names the file** — before this task it surfaced as a bare
`ZodError` with no path.

Reverted (`order: 3` restored). `npm run build`: **passes**, same 15 pages,
route table identical to baseline. `git status --porcelain content/` matches
the baseline block above exactly.

## T05 — the schema learns `publish` (criterion 2)

With no content change: `npm run build` **passes**, 15/15 pages.

Staged: `publish: "false"` (quoted string) on
`content/moduly/00-start/git-i-github.mdx`. `npm run build`:

```
Error: content/moduly/00-start/git-i-github.mdx: [
    "expected": "boolean",
      "publish"
    "message": "Invalid input: expected boolean, received string"
```

**Criterion 2 holds**: a non-boolean fails the build, naming the file.

Staged: `publish: false` (bare boolean), same file. `npm run build`:
**passes**, 15/15 pages — at this task the filter does not exist yet, so a
valid flag changes nothing; the check is only that a real boolean parses.

Reverted. The staging line removed; the file back to its baseline bytes.

## T06 — the filter and the refusal (criterion 1)

The course model drops `publish: false` lessons after every file is read,
parsed and compiled; the single-lesson read returns the not-found signal for
an unpublished lesson.

With no content file changed: `npm run build` **passes**, 15/15 pages, and
the emitted page list byte-compares equal to the baseline
(`diff baseline-routes.txt t06-routes.txt` → no output,
`ROUTE TABLE IDENTICAL TO BASELINE`). **Criterion 1 holds** — nothing on
disk carries the flag, so nothing moved.

## T07 — the landing page starts at the first published lesson

The derivation widens from the first module's lessons to the flattened
course, falling back to the first module's page when no lesson anywhere is
published. `npm run build` **passes**, 15/15. The emitted landing page:

```
<a class="button" href="/moduly/00-start/git-i-github">
```

— the same entry href as the baseline, as it must be while nothing is
unpublished. The behaviour under an all-drafts first module is criterion 8's
to stage, in T08.

## T08 — the verification pass (criteria 3–10)

All rendered-page evidence read from the production build actually serving
(`npm run build`, `npm run start`, `curl` against `localhost:3000`). Every
staged edit is a frontmatter flip on the tree as it stood, reverted
immediately after its check. At staging time module 01 held lessons at
orders 1–7 (`1a`–`1g`); module 00 held one lesson at order 3 (`0c`).

### Stage A — `1d` (order 4, `na-zywo-agent-buduje-aplikacje`) unpublished

**Criterion 4 — gone from the build output.** Build emits 14/14 pages
(baseline 15). `diff` of the emitted-page list against baseline:

```
< .next/server/app/moduly/01-jak-powstaje-oprogramowanie/na-zywo-agent-buduje-aplikacje.html
```

— exactly one line, the hidden lesson's.

**Criterion 3 — gone from every listing.** The module page's list carries
six rows, `na-zywo` absent (hrefs listed in the run log); the whole rendered
page of sibling `1c` contains the hidden slug **0 times** (covers its
contents panel and its pager at once); card counts on `/` and `/moduly`
read `1 lekcja` / `6 lekcji` — down from `7 lekcji`, correct Polish.

**Criterion 5 — the direct request refused.**

```
GET /moduly/01-jak-powstaje-oprogramowanie/na-zywo-agent-buduje-aplikacje
HTTP/1.1 404 Not Found
GET /moduly/01-jak-powstaje-oprogramowanie/lekcja-ktorej-nie-ma
HTTP/1.1 404 Not Found
```

Same status, same `<title>ttcmd</title>`, same rendered not-found page. The
two bodies differ only in the framework's flight payload echoing the
requested path segments — which any 404 does for its own URL, and which the
requester already knows; a `grep` for the draft's title over the response
found **0 occurrences**. Recorded as holding in substance: nothing about the
lesson's existence or content is disclosed.

**Criterion 6 — the pagers skip it.**

```
1c page: pagerPrevious → …/od-podpowiedzi-do-agenta   (1b)
         pagerNext     → …/nowy-warsztat-programisty  (1e)
1e page: pagerPrevious → …/co-model-naprawde-potrafi  (1c)
         pagerNext     → …/vibe-coding-kontra-inzynieria (1f)
```

`1c` and `1e` link to each other across the gap; the hidden href appears on
neither page. Reverted.

### Stage B — `1a` (order 1, `czterdziesci-lat-zmian`) unpublished

**Criterion 7 — letters do not shift.** Build 14/14. Read from the server:

- module 01's list opens with `lessonRowId">1b` — Od podpowiedzi do agenta,
  not re-lettered `1a`;
- that lesson's own breadcrumb: `aria-current="page">1b`;
- `0c`'s next-pager: `pagerId">1b` Od podpowiedzi do agenta, crossing named
  (`Moduł 1`);
- a sibling's contents panel: `contentsId">1b<` through `contentsId">1g<`,
  six entries, no `1a`;
- the hidden slug appears **0 times** on the module page.

The gap is visible, the identity is not recomputed. Reverted.

### Stage C — module 00's only lesson (`git-i-github`, `0c`) unpublished

**Criterion 8 — a dark module stays a module; the course starts where
publishing starts.** Build 14/14, and `moduly/00-start.html` is still
emitted with no lesson pages beneath it. From the server:

```
/moduly grid:  moduleCardNumber">0<  moduleCardCount">0 lekcji<
               moduleCardNumber">1<  moduleCardCount">7 lekcji<
/moduly/00-start:  <h1>Start</h1> present, lessonRow count 0
landing:  <a class="button" href="/moduly/01-jak-powstaje-oprogramowanie/czterdziesci-lat-zmian"
1a page:  pagerPrevious count 0; pagerNext → …/od-podpowiedzi-do-agenta
/moduly/00-start pager:  pagerNext → /moduly/01-jak-powstaje-oprogramowanie
```

`0 lekcji` is correct Polish; the front door opens on the next module's
first published lesson, whose previous control is absent; the module route
and its module-level pager are untouched. Reverted.

### Criterion 9 — unpublished is still behind the gate

Staged both `publish: false` and `week: "not-a-number"` on `git-i-github`:

```
Error: content/moduly/00-start/git-i-github.mdx: [
    "expected": "number",
      "week"
```

The build fails, naming the file, exactly as it would for a published
lesson. Reverted.

### Criterion 10 — the content tree is untouched

After all reverts, `npm run build` passes 15/15 and the emitted-page list
byte-compares equal to baseline (`ROUTES AT BASELINE`). The content tree
against the pre-slice snapshot:

- `git status --porcelain content/` — identical, line for line;
- `git diff content/ | git hash-object --stdin` →
  `6b28db80c62ebc98bf39d32671fb2f051a81859f` — identical;
- untracked drafts' `sha1sum` → `81cfdb37…`, `ff172cdc…` — identical.

Byte-for-byte, nothing under `content/` moved.

### Human-eye remainder

None of criteria 1–10 needs a human eye: every check above is a command
over build output, served markup, or git state. There is no visual change
anywhere on the site to judge.
