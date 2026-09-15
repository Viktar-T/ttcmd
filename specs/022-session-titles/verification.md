# verification.md — 022-session-titles

Evidence for every acceptance criterion in `spec.md`. Criterion 10 is Viktar's
and is marked as such.

**A note on the tree.** `content/schedule.json` carried Viktar's own uncommitted
edits for the whole slice — a third session and a group date on the second.
No commit in this slice touched it. Every temporary schedule was written over
it only after its bytes and hash were saved, and restored from those bytes after
a hash check confirmed nobody else had edited it in between. It was restored
byte-identical. Viktar's own `next dev` on port 3000 stopped partway through;
the project's launch configuration was started to take the live measurements.

---

## 1. Build, static route, lint

Every build in the slice succeeded with 55 pages and listed `○ /postep`, static.
`npx tsc --noEmit` and `npm run lint` produce no output.

## 2. No titles, no change

The pre-slice versions of the four source files, from `bc54dd4`, and the
slice's versions were built back to back against one content tree, with a
fingerprint of `content/` taken before and after:

```
after022:  55 pages, 2 stylesheets
before022: 55 pages, 2 stylesheets
content tree unchanged across both builds: yes
pages differing once the build id and the shared stylesheet's name are normalised: []
```

**The stylesheet differs only by the slice's rules.** The new one contains:

```
.page-module__da8XEa__title{margin:var(--gap-tight) 0 0;font-size:inherit;font-weight:var(--weight-strong)}
.page-module__da8XEa__title+.page-module__da8XEa__topics{margin-block-start:.2rem}
.page-module__da8XEa__topics,.page-module__da8XEa__title{margin:0}
```

The third is the minifier's work. The slice wrote `.title { margin: 0 }` inside
the wide-layout media block beside the existing `.topics { margin: 0 }`, and the
two were merged into one selector list. None of the three appears in the old
stylesheet, and:

```
new stylesheet, merge undone and the two standalone rules removed,
equals the old one byte for byte: true
```

**The instrument failed twice before it measured the slice, and both are
recorded.** The first comparison stripped every `__title` rule, including the
exercise component's own pre-existing one. The second was scoped correctly but
cut the `.title` half out of the merged selector list and left a stray comma.
Neither was a defect in the slice.

## 3. A title renders exactly, before the topics, outside any link

Temporary titles on sessions 2 and 3, none on session 1. From the prerendered
page:

```
<h3 class="page-module__da8XEa__title">2. Budowa pierwszej aplikacji desktopowej za pomocą agenta AI.</h3><ul …
heading text is exactly "2. " + title: true
heading comes before the first topic: true
heading is inside a link: false
session 3: "3. Organizacja projektu programistycznego: folder, repozytorium Git i GitHub." — exact: true
```

The text is one string, so it carries no React separator inside it.

## 4. An untitled session renders no title

```
session 1 (untitled) cell contains an h3: false
session 1 cell opens directly with the topic list: true
```

## 5. The title is distinct from the topics

A different element, `h3` against `li`. Computed live at 1280 px:

| | face | weight | colour |
| --- | --- | --- | --- |
| title | JetBrains Mono | 650 | `rgb(237, 235, 230)` — `--text` |
| topic link | Inter | 400 | `rgb(201, 194, 245)` — `--link` |

The face comes from the heading rule in `globals.css`, the weight from
`--weight-strong`, and no colour is declared. No token was added.

## 6. The refusals

Three builds, each with one malformed title:

```
Error: content/schedule.json — session 1: title — "1. Jak dziś powstaje oprogramowanie." begins with a number and a full stop. The page puts the session's number in front of every title automatically, and would show "1. 1. Jak dziś powstaje oprogramowanie." on this row. Write the title without the number, as "title": "Jak dziś powstaje oprogramowanie."
```

```
Error: content/schedule.json — session 2: title must be text with something in it — the name of the class as it is entered in the school's plan, written without its number, as "title": "Budowa pierwszej aplikacji desktopowej za pomocą agenta AI." A class with no registered name yet leaves the "title" key out altogether.
```

The same message for a title of three spaces, which is the case a minimum
length would have let through to render as a bare `2.`.

## 7. No sideways scroll with the longest title

Live, with „Organizacja projektu programistycznego: folder, repozytorium Git i
GitHub." set on session 3:

| width | 1280 | 375 | 320 |
| --- | ---: | ---: | ---: |
| overflow | 0 | 0 | 0 |

At 320 px the title is 288 px wide and 53 px tall at a 17.5 px line height —
three lines inside the lane.

## 8. No other page changed

The same comparison as criterion 2: 55 pages, none differing once the build id
and the stylesheet name are normalised.

## 9. No dependency, token, colour or client behaviour

```
package files changed by the slice: no
tokens.css / globals.css changed: no
use client in app/postep: 0
colour literals in the new CSS lines: 0
```

## 10. Human eye — NOT MET, and not this run's to meet

Whether the title reads as the heading of its topics on a projector.

## 11. Fresh-context review

See the closing report.
