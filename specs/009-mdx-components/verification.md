# verification.md — 009-mdx-components

- **Slice:** 009
- **Date:** 2026-08-30
- **Spec:** `specs/009-mdx-components/spec.md`

Evidence for the acceptance criteria. Criteria 2–9, 12 and 13 were staged by
temporarily marking exercises in real lesson files; **every staged edit was
reverted and criterion 16 is the proof**. No lesson file is changed by this
slice.

> **The revert was NOT `git checkout -- content/`.** Seven files under
> `content/` carried uncommitted edits when this slice opened and two paths
> there were untracked, so that command would have deleted work this slice
> never touched and the loss would have looked exactly like a success. The
> tree was copied to the session scratchpad before staging and restored from
> that copy, and the hash manifest below is what proves it came back.

---

## 1 — the build, unchanged

`npm run build`, with no content file changed, before the staging and again
after the revert:

```
  Design invariants OK.
  Contrast floors (Check E):
    dark (:root)               --text          on --bg               12.21:1  (needs 4.5)
    dark (:root)               --text-muted    on --bg                5.86:1  (needs 4.5)
    dark (:root)               --link          on --bg                8.67:1  (needs 4.5)
    dark (:root)               --accent-line   on --bg                8.67:1  (needs 4.5)
    dark (:root)               --accent-ink    on --accent-surface   10.27:1  (needs 4.5)
    dark (:root)               --rule-strong   on --bg                3.69:1  (needs 3)
    dark (:root)               --rule-quote    on --bg                5.86:1  (needs 3)
    :root[data-theme="light"]  --text          on --bg               14.71:1  (needs 4.5)
    :root[data-theme="light"]  --text-muted    on --bg                6.34:1  (needs 4.5)
    :root[data-theme="light"]  --link          on --bg                5.86:1  (needs 4.5)
    :root[data-theme="light"]  --accent-line   on --bg                5.86:1  (needs 4.5)
    :root[data-theme="light"]  --accent-ink    on --accent-surface   10.27:1  (needs 4.5)
    :root[data-theme="light"]  --rule-strong   on --bg                3.64:1  (needs 3)
    :root[data-theme="light"]  --rule-quote    on --bg                6.34:1  (needs 3)
✓ Compiled successfully
  Finished TypeScript
✓ Generating static pages using 8 workers (14/14)
```

The route table was captured before the first line of this slice was written
and diffed against the build after the revert:

```
$ diff <(sed -n '/^Route (app)/,$p' build-before.txt) \
       <(sed -n '/^Route (app)/,$p' build-after.txt)
ROUTES IDENTICAL TO THE PRE-SLICE BASELINE

$ diff <(grep "on --" build-before.txt) <(grep "on --" build-after.txt)
CHECK E IDENTICAL
```

`package.json` and `package-lock.json` are untouched: **no new dependency.**

## 2 — module 1 runs 1.1 … 1.29, continuously, in `order`

All 29 exercises of the module's six published lessons staged, read off the
**built pages** rather than off the source:

| `order` | lesson | numbers rendered |
| --- | --- | --- |
| 2 | `od-podpowiedzi-do-agenta` | 1.1 1.2 1.3 1.4 |
| 3 | `co-model-naprawde-potrafi` | 1.5 1.6 1.7 1.8 1.9 |
| 4 | `na-zywo-agent-buduje-aplikacje` | 1.10 1.11 1.12 1.13 1.14 |
| 5 | `nowy-warsztat-programisty` | 1.15 1.16 1.17 1.18 1.19 |
| 6 | `vibe-coding-kontra-inzynieria` | 1.20 1.21 1.22 1.23 1.24 |
| 7 | `jak-nie-wypasc-z-obiegu` | 1.25 1.26 1.27 1.28 1.29 |

No lesson restarts at 1, no number is repeated and none is skipped. The
identifiers ran `zadanie-1-1` … `zadanie-1-29` in the same order.

Note that module 1 has no lesson at `order: 1` and still starts at 1.1 — the
offset is the running total of the module's earlier published lessons, never
the lesson's own `order`.

## 3 — module 0 starts at 0.1

Its only written lesson has `order: 3`, so it is lesson **0c**:

```
./00-start/git-i-github.html
  numbers: 0.1 0.2 0.3 0.4
  ids    : zadanie-0-1 zadanie-0-2 zadanie-0-3 zadanie-0-4
```

## 4 — no number is written in any lesson

With the whole corpus staged:

```
$ grep -rnE "Zadanie [0-9]+\.[0-9]+" content/
  none
$ grep -rnE "<Zadanie[^>]*(number|id)=" content/
  none
$ grep -rhoE "<Zadanie[^>]*>" content/ | sort | uniq -c
      1 <Zadanie title="Cztery rankingi.">
      1 <Zadanie title="Eksperyment z długością polecenia.">
      1 <Zadanie title="Ocena różnicowa.">
      1 <Zadanie title="Spróbuj samodzielnie.">
     29 <Zadanie>
```

Thirty-three exercises, four of them with the title the corpus had already
written as a bold lead-in, and not one number or offset in the source.

## 5 — the number is in the HTML the server sends

From the built page — the document a browser receives before any JavaScript
runs — and again from the running server over HTTP:

```
$ curl -s http://localhost:3000/moduly/01-jak-powstaje-oprogramowanie/co-model-naprawde-potrafi \
  | grep -oE '(Zadanie [0-9]+\.[0-9]+|id="zadanie-[0-9-]+")' | sort -u
Zadanie 1.5 … Zadanie 1.9
id="zadanie-1-5" … id="zadanie-1-9"
```

## 6 — inserting one exercise renumbers everything after it

One `<Zadanie>` added at the head of the `order: 2` lesson, nothing else
edited. Every number from that point on moved by one, in five other files:

| lesson | before | after |
| --- | --- | --- |
| `od-podpowiedzi-do-agenta` | 1.1 – 1.4 | 1.1 – **1.5** |
| `co-model-naprawde-potrafi` | 1.5 – 1.9 | **1.6 – 1.10** |
| `na-zywo-agent-buduje-aplikacje` | 1.10 – 1.14 | **1.11 – 1.15** |
| `nowy-warsztat-programisty` | 1.15 – 1.19 | **1.16 – 1.20** |
| `vibe-coding-kontra-inzynieria` | 1.20 – 1.24 | **1.21 – 1.25** |
| `jak-nie-wypasc-z-obiegu` | 1.25 – 1.29 | **1.26 – 1.30** |

## 7 — an unpublished lesson consumes no numbers

`publish: false` on the `order: 4` lesson. Its route left the build output —

```
$ ls .next/server/app/moduly/01-jak-powstaje-oprogramowanie/
  co-model-naprawde-potrafi.html
  jak-nie-wypasc-z-obiegu.html
  nowy-warsztat-programisty.html
  od-podpowiedzi-do-agenta.html
  vibe-coding-kontra-inzynieria.html
```

— and its five exercises left the sequence, with the lessons around it running
continuously through the gap:

```
od-podpowiedzi-do-agenta         1.1 1.2 1.3 1.4
co-model-naprawde-potrafi        1.5 1.6 1.7 1.8 1.9
nowy-warsztat-programisty        1.10 1.11 1.12 1.13 1.14
vibe-coding-kontra-inzynieria    1.15 1.16 1.17 1.18 1.19
jak-nie-wypasc-z-obiegu          1.20 1.21 1.22 1.23 1.24
```

`nowy-warsztat-programisty` picks up at **1.10**, not at 1.15. This is the
first place in the repository where one lesson's frontmatter changes what a
different lesson renders.

## 8 — the number is an address

Every exercise carried `id="zadanie-<module>-<n>"`, lowercase ASCII letters,
digits and hyphens (Article III), unique on its page. Requesting the page at
the fragment landed on the exercise — measured in the browser, on a real
staged lesson and on the reference page:

```
url                       …/co-model-naprawde-potrafi#zadanie-1-7
fragmentLandedTopPx       0
```

**The reservation that makes it unique was staged too.** A heading reading
`## Zadanie 1.7` derives exactly `zadanie-1-7` through `slugifyHeading`. Added
to the lesson that also holds exercise 1.7:

```
h2 ids     : ['cwiczenia', 'zrodla', 'zadanie-1-7-2']
exercise id: ['zadanie-1-5', … 'zadanie-1-7', … 'zadanie-1-9', 'zadanie-1-7-2']
```

The heading took the numeric suffix; the exercise kept the number.

## 9 — the number is text

On a real staged lesson, in the browser:

```
windowFind('Zadanie 1.7')  true
labelIsOneTextNode         true
labelNodeValue             "Zadanie 1.7"
generatedContent           { before: "none", after: "none" }
selection of the exercise  "Zadanie 1.7\n\nWejdź na stronę badania METR i znajdź, ilu prog…"
```

Find-in-page locates it, no CSS-generated content is involved, and selecting
the exercise takes the number with it.

This is why the label is interpolated into one string rather than written as
`Zadanie {number}`: two JSX children are two text nodes, and React separates
them in the server HTML with an empty comment. The first build of this slice
emitted `Zadanie <!-- -->7.1`, which was found by this check and fixed.

## 10 and 14 — the reference page's two specimens

Permanent, on `/styleguide`, compiled through `compileProse` with an explicit
numbering context:

```
title elements   : 1
label elements   : 2
exercise sections: 2
Zadanie 7.1  (with the title "Cztery rankingi.")
Zadanie 7.2  (no title — and nothing in its place)
```

The second specimen's markup goes straight from the label to its first
paragraph:

```html
<section … id="zadanie-7-2"><p class="…label">Zadanie 7.2</p><div class="…content"><p>Ćwiczenie bez tytułu — …
```

## 11 — colour, in both themes

No colour literal is introduced outside `app/tokens.css`: **Check B passes**
with `components/exercise.module.css` inside its scan (`SCAN_DIRS = ["app",
"lib", "components"]`).

Read off the rendered element in the browser, under each theme:

| part | token | dark | light | ratio (Check E) |
| --- | --- | --- | --- | --- |
| page ground | `--bg` | `rgb(42,41,38)` | `rgb(247,246,242)` | — |
| the frame | `--rule-strong` | `rgb(131,128,122)` | `rgb(131,128,122)` | 3.69:1 / 3.64:1, floor 3 |
| the band | `--accent-surface` | `rgb(201,194,245)` | `rgb(201,194,245)` | — |
| the number | `--accent-ink` | `rgb(28,27,24)` | `rgb(28,27,24)` | 10.27:1 / 10.27:1, floor 4.5 |
| the body | `--text` | `rgb(237,235,230)` | `rgb(35,34,31)` | 12.21:1 / 14.71:1, floor 4.5 |

All three pairs were already in Check E's table, so the build recomputes them
on every run and this file promises no ratio the build does not keep.

## 12 — 375 px

On a real staged lesson and on the reference page:

```
innerW               375
clientW / scrollW    375 / 375
horizontalScrollbar  false
overflowingCount     0
exercise             left 16, width 343, right 359, own scroll false
```

And at 1280 px on the same lesson: `scrollW 1265`, `clientW 1265`, nothing
overflowing, the exercise 624 px wide inside the reading measure.

## 13 — misuse fails the build, naming the file

Four refusals, each staged and reverted:

```
a) an exercise in a module's own introduction
Error: content/moduly/01-jak-powstaje-oprogramowanie/index.mdx: […]
<Zadanie>: an exercise belongs to a lesson. A module's introduction is not on the
walk that numbers exercises across the module (ADR-0003), so there is no number
this one could be given. Move it into a lesson.

b) an author-written number
Error: content/moduly/00-start/git-i-github.mdx: […]
<Zadanie>: unknown attribute "number". The only attribute is title. In particular
an exercise carries no number and no offset: the number is derived from the module
when the site is built (ADR-0003), and one written here would be a second source
of truth for the string a teacher says out loud.

c) an exercise inline in a paragraph
Error: content/moduly/00-start/git-i-github.mdx: […]
<Zadanie>: an exercise is a block, and this one is inside a paragraph. Leave a
blank line before it, and one before its body.

d) an empty title
Error: content/moduly/00-start/git-i-github.mdx: […]
<Zadanie>: title is empty. Leave the attribute out instead.
```

Each names its file, because the plugin throws from inside the compile and
`compile()` in `lib/content.ts` prefixes the relative path.

## 15 — no client JavaScript

`components/exercise.tsx` and `lib/exercises.ts` carry no `"use client"`
directive and import no client island:

```
$ grep -rn "use client" components/exercise.tsx lib/exercises.ts
  neither file is a client component
```

The number reaches the page as a prop stamped onto the node at compile, and
leaves as a text node in the server HTML (criterion 5).

## 16 — the content directory is untouched

```
$ find content -type f | wc -l
10                                   # baseline: 10

$ sha256sum -c content.sha256
content/interesting-to-read/czterdziesci-lat-zmian.mdx: OK
content/moduly/00-start/git-i-github.mdx: OK
content/moduly/00-start/index.mdx: OK
content/moduly/01-jak-powstaje-oprogramowanie/co-model-naprawde-potrafi.mdx: OK
content/moduly/01-jak-powstaje-oprogramowanie/index.mdx: OK
content/moduly/01-jak-powstaje-oprogramowanie/jak-nie-wypasc-z-obiegu.mdx: OK
content/moduly/01-jak-powstaje-oprogramowanie/na-zywo-agent-buduje-aplikacje.mdx: OK
content/moduly/01-jak-powstaje-oprogramowanie/nowy-warsztat-programisty.mdx: OK
content/moduly/01-jak-powstaje-oprogramowanie/od-podpowiedzi-do-agenta.mdx: OK
content/moduly/01-jak-powstaje-oprogramowanie/vibe-coding-kontra-inzynieria.mdx: OK
```

Ten files, every one byte-for-byte identical to the manifest taken before the
first line of this slice was written. `git status --porcelain content/` shows
exactly the seven modified files and two untracked paths that were already
there when the slice opened, and nothing else. Nothing under `content/` was
ever staged in git.

No exercise survives in any built lesson page:

```
$ grep -rl "data-exercise" .next/server/app/moduly/
  none
```

`npm run check:content` reports the same pre-existing smells it reported
before — the tree is identical, so its output is identical by construction.

---

## Not verified here

**"Unmissable when scrolling back."** The design reference asks an exercise to
carry enough visual weight to be unmissable when a student scrolls back past
it. Criteria 11, 12 and 14 pin what is measurable — the tokens, the ratios, the
geometry, the absence of an empty header — but whether the result *reads* as
unmissable in rendered Polish prose, on both themes, is a judgement made by
looking at a page. It is left open, per AGENTS.md §3.

Screenshots could not be captured in this session: the browser pane returned
blank frames throughout, so every browser check above was made by reading the
DOM, the computed styles and the measured geometry instead. That is stronger
evidence for the measurable criteria and no evidence at all for the one above.
