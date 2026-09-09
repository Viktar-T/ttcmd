# verification.md — 015-content-dev-refresh

Evidence for the acceptance criteria in `spec.md`. Run 2026-09-09, in the
autonomous run that built the slice.

**One limitation, stated first, because it qualifies every observation below.**
The browser available to this run is an embedded pane that never receives an
operating-system focus transition: switching tabs inside it does not change a
tab's `document.visibilityState`, and the window is never alt-tabbed. The return
was therefore produced by dispatching the same `focus` and `visibilitychange`
events the browser dispatches, at the same target, with the visibility state the
browser would have. That exercises the handler, the guard, the deduplication and
the refresh itself against a real running server. **It does not exercise the
operating system's delivery of those events**, which is the one link the run
cannot check and which is folded into criterion 10, Viktar's to judge — an
alt-tab from the editor either produces the refresh or it does not, and it is
visible in one attempt.

---

## 1 — Build and lint

```
$ npm run lint
> ttcmd@0.1.0 lint
> eslint

$ npm run build
  Finished TypeScript in 1254ms
✓ Generating static pages using 8 workers (27/27) in 8.9s
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /moduly
├   /moduly/[module]        ● 6 paths
├   /moduly/[module]/[lesson]  ● 16 paths
└ ○ /styleguide
```

Clean, and the route table is what it was before the slice.

## 2 and 5 and 6 — The edit appears on return, and the reader's place survives

One observation covers four criteria. A lesson page open at `2400 px` of scroll,
theme set to `light` and mode to `presentation`, with `window.__sentinel` set —
a value a document reload would destroy and a refresh keeps. With the page out
of attention, `## Kiedy narzędzie odmawia` on disk became
`## Kiedy narzędzie odmawia HMRPROBE-T04`. On the return:

```
before  { probe: false, scrollY: 2400, sentinel: "alive-1788952180938",
          theme: "light", mode: "presentation" }
after   { probe: true,  scrollY: 2400, sentinel: "alive-1788952180938",
          theme: "light", mode: "presentation" }
```

The new heading is on screen. The scroll offset did not move, the sentinel
survived — so it was a refresh and not a reload — and both preferences are the
ones that were chosen.

The disclosure half of criterion 5 was checked separately, at 768 px, with the
contents disclosure opened and the page at 1800 px of scroll:

```
before  { probe: false, open: true, scrollY: 1800 }
after   { probe: true,  open: true, scrollY: 1800 }
```

## 3 — The module page and the module list

Same procedure. On `/moduly/02-warsztat`, a paragraph appended to the module's
introduction:

```
before false → after true, rscDelta 1, sentinel "alive3" intact
```

On `/moduly`, the module's `title` in frontmatter temporarily suffixed
`PROBE-LIST`:

```
before false → after true, sentinel "alive4" intact
```

Both probes reverted; `git status --porcelain content/` empty.

## 4 — Nothing happens while the browser is away

With `document.visibilityState` reporting `hidden`, both events were dispatched
and the page was watched for 2.5 s while a second heading changed on disk:

```
whileHidden  { visibility: "hidden", probeB: false }
afterReturn  { visibility: "visible", probeB: true, scrollY: 2400 }
```

The change waited for the return.

### The deduplication window

One return fires both events. Counting requests carrying `_rsc=` from the
performance timeline:

```
one focus + visibilitychange pair  → 1 request
a second, later return             → 1 request
```

One request per return, as intended.

## 7 — Production carries nothing

Two halves, both against the real production build.

**The chunks.** `npm run build`, then a search of every JavaScript file the build
emits under `.next/static` (14 files):

```
control — a component that IS shipped:  2 files match "ScrollSpy|scroll-spy"
target  — this slice's component:       0 files match "DevRefreshOnReturn"
the event name at all:                  0 files match "visibilitychange"
```

The control matters: it shows the search would have found the component had it
been there.

**The network record.** The production build served on port 3001, a lesson page
loaded, then a return dispatched:

```
{ origin: "http://localhost:3001", visibility: "visible",
  totalRequestDelta: 0, rscDelta: 0 }
```

No request of any kind on return, let alone an RSC request.

## 8 — With scripting absent

The component renders `null` and adds no element to the document, so a page
without JavaScript has nothing of this slice in it. On a lesson page and a
module page in development the error console is empty:

```
read_console_messages(onlyErrors) → No console logs.
```

## 9 — What the diff touches

```
$ git status --porcelain
(empty)
```

Every probe reverted. The slice's diff adds `components/dev-refresh-on-return.tsx`
and `components/dev-content-refresh.tsx`, edits `app/layout.tsx`, and writes this
slice's own documents. No path under `content/`, no `package.json` or lockfile
change, no file under `app/` other than the layout.

## 10 — Not closable by this run

Whether the refresh is unobtrusive on a real alt-tab from the editor — and, per
the limitation at the top, whether the operating system's focus event arrives at
all in Viktar's browser — is a judgement this run cannot make. Left unchecked.

## 11 — The closing review

Recorded in the final report of the run.
