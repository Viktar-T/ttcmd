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
