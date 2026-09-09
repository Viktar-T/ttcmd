# plan.md — 015-content-dev-refresh

- **Slice:** 015
- **Written from:** `constitution.md`, `AGENTS.md`, and this slice's `spec.md` only,
  in a subagent with no other repository context (AGENTS.md §2, autonomous mode).
- **Date:** 2026-09-09
- **Next.js version in the tree:** 16.3.3 (`node_modules/next/package.json`).
  The API used below was read in `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-router.md`.

The spec was sufficient. Everything below follows from it. Two facts the plan
needs are properties of files this session was not permitted to read — where
client components live, and which attributes carry the theme and the mode — and
each is marked as *verify before editing* rather than guessed.

---

## The mechanism

`router.refresh()`, from `useRouter()` in `next/navigation`, is exactly the
operation clause 2 of the spec describes. The bundled reference says it makes a
new request to the server, re-renders the Server Components, and merges the
resulting payload "without losing unaffected client-side React (e.g. `useState`)
or browser state (e.g. scroll position)". A fresh server render is what a manual
reload already does — the spec records that a reload shows the edit immediately,
which is the evidence that the content pipeline reads the file per request and
holds no process-lifetime cache. So a refresh reads the file as it stands on
disk, and clauses 1, 2 and 4 of *What* are all satisfied by that one call.

The trigger is two browser events, because "the window came to the front" and
"this tab became the visible one" are separate facts:

- `focus` on `window` — the window regained the operating system's focus.
- `visibilitychange` on `document`, acted on only when
  `document.visibilityState === 'visible'` — the tab became the foreground tab.

Alt-tabbing back to a browser whose tab was already current fires both, so the
handler carries a short suppression window and refreshes once. There is no
timer, no interval, and no listener that does anything while the document is
hidden; the handler's first line returns when `document.visibilityState` is not
`'visible'`, which covers `focus` firing on a window that is in front but whose
tab is not the one being shown. Nothing runs on mount, so opening a page does
not cause a refresh, and there is no loop.

## File map

Three files. Two are new, one is edited.

### 1. The client component — new

A `"use client"` module exporting a component that renders `null` and installs
the two listeners in a `useEffect`. Shape:

```tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function RefreshOnReturn() {
  const router = useRouter()

  useEffect(() => {
    let last = 0
    const onReturn = () => {
      if (document.visibilityState !== 'visible') return
      const now = Date.now()
      if (now - last < 300) return
      last = now
      router.refresh()
    }
    window.addEventListener('focus', onReturn)
    document.addEventListener('visibilitychange', onReturn)
    return () => {
      window.removeEventListener('focus', onReturn)
      document.removeEventListener('visibilitychange', onReturn)
    }
  }, [router])

  return null
}
```

It renders nothing, so it can be mounted anywhere in the tree and cannot change
what a page looks like (spec §6, last constraint).

**Location:** the directory the repository already uses for shared client
components — list the top level and pick the existing convention rather than
inventing one; the constitution names `app/` and `content/` but is silent on the
rest. `components/dev/refresh-on-return.tsx` is the expected home if
`components/` exists. Whatever the directory, the name is ASCII English
(Article III) and the *dev* segment is part of the path so that the file's scope
is legible from the file map.

### 2. The development-only wrapper — new

A **Server Component** in the same directory, e.g.
`components/dev/dev-content-refresh.tsx`:

```tsx
export default async function DevContentRefresh() {
  if (process.env.NODE_ENV !== 'development') return null
  const { RefreshOnReturn } = await import('./refresh-on-return')
  return <RefreshOnReturn />
}
```

Two things are doing work here and both are deliberate.

The guard is `!== 'development'`, not `=== 'production'`, so that any other
environment (a `test` run, a preview harness) also gets nothing. `next build`
compiles the server bundle with `process.env.NODE_ENV` inlined as
`'production'`, so in a production build this component's body is a constant
`return null`.

The import is **dynamic and inside the guard**. That is what keeps the client
module out of the static client graph of the layout: a top-level
`import { RefreshOnReturn } from './refresh-on-return'` in a file the layout
imports would put the module into the route's client manifest and could have it
preloaded on a production page even though it is never rendered, which is
precisely what acceptance criterion 7 forbids. With the dynamic import the
client reference only comes into being when the branch runs, and the branch
never runs in production.

**Fallback if the dynamic import misbehaves under Turbopack** (Next 16 builds
with Turbopack by default): fall back to a static import in this wrapper file,
keep the conditional render, and settle criterion 7 on the network record and
the build manifest as described below. Do not reach for a `next.config` alias or
a bundler plugin — that is more machinery than this convenience is worth, and it
would need an ADR line the spec deliberately did not open.

### 3. The root layout — edited

`app/layout.tsx` (Article VIII puts `app/` at the repo root). Add the wrapper as
the **last child of `<body>`**, after the existing children:

```tsx
<DevContentRefresh />
```

**Verify before editing:** that this file is a Server Component (no `"use client"`
at the top) and that it is the file rendering `<html>` and `<body>`. If it is
not a Server Component the wrapper cannot be rendered from it, and the mount
point has to move to the outermost server component that wraps every route —
report that rather than converting the layout, which would be outside this
slice. No `Suspense` boundary is needed: the component reads no search params
and suspends on nothing.

Mounting in the root layout is what makes the behaviour site-wide (spec,
*Decisions taken* 4). No page file, no lesson route and no module route is
touched.

## What is deliberately not built

No dependency is added, so `package.json` and the lockfile stay untouched. No
file under `app/**` is created other than the edit above — in particular no
`route.ts`, no `middleware.ts`, and nothing that runs on a server in production.
Nothing is written to disk at run time, so `git status` is unchanged by running
the site. The content reader, the Zod schema and the MDX compilation are not
opened at all: the slice changes *when* a render happens, never *how* content is
read.

## Order of work

Four commits, in this order, prefixed `015/TNN` per AGENTS.md §5.

1. **Add the client component.** Verifiable on its own with `npm run lint` and
   `npm run build` — it compiles and is unused, which is a legitimate
   intermediate state only if the lint configuration does not fail on an unused
   export. If it does, fold steps 1 and 2 into one commit and say so in
   `tasks.md`.
2. **Add the development-only wrapper.**
3. **Mount it in the root layout.** After this commit the behaviour exists;
   `npm run build` and `npm run lint` are the gate (criterion 1).
4. **Verification pass.** The manual observations below, run against `npm run dev`
   and against a production build, with their output recorded in `tasks.md`.
   Criterion 10 is not closed by this run (AGENTS.md §3) — it is named in the
   final report as Viktar's to judge.

## Checks, criterion by criterion

Each row is the command or the observation that produces the evidence.

| # | Check |
| --- | --- |
| 1 | `npm run build` and `npm run lint`, output pasted into `tasks.md`. |
| 2 | `npm run dev`; open a lesson page; move focus to the editor; change a visible heading in that lesson's MDX; alt-tab back. The new heading is on screen within about two seconds, with no reload. Then revert the edit and show `git status --porcelain content/` returning nothing. |
| 3 | The same procedure on a module page (edit the module introduction) and on the module list (edit a lesson `title` in frontmatter). |
| 4 | With the browser out of focus, make the edit and watch the page for several seconds without touching the browser: nothing changes. Only the return changes it. |
| 5 | On a long lesson, scroll well down and open the contents disclosure. In the console record `window.scrollY` and the disclosure's open state (`open` on the `<details>`, or the rendered state of whatever element carries the table of contents — inspect it first). Alt-tab away and back; read both again; they are unchanged. |
| 6 | Choose a non-default theme and a non-default mode. Before the refresh, read the attributes the site actually sets on `<html>` from the Elements panel — do not assume their names. Record them, alt-tab away and back, read them again; they are unchanged. |
| 7 | `npm run build`, then serve it locally with the repository's production-serve script if one exists (otherwise `npx next start`). Open a lesson page with the Network panel recording and preserve-log on. Alt-tab away and back: **no** new request appears — in particular no document request and no RSC request (a URL carrying `_rsc=`). This is the authoritative check, as the spec directs. Supporting check: confirm the module does not appear in the lesson route's client chunk list in the build manifest under `.next/` (inspect which manifest the Turbopack build emits before relying on a path), and that a search of the chunks the page actually loaded contains no `visibilitychange` listener belonging to this component — note that Next's own runtime may legitimately register such a listener, so a hit must be attributed before it is treated as a failure. |
| 8 | In DevTools, Settings → Debugger → *Disable JavaScript*. Reload a lesson page and a module page: both render, links navigate, and the Console is empty. |
| 9 | `git diff --stat` against the slice's base commit: no path under `content/`, no `package.json` or lockfile change, no new file under `app/` other than the layout edit. |
| 10 | Not closable by the implementing run. Leave the box unchecked and name it in the final report: switching back from the editor should show the edit without a flash, a jump, or a loss of the line being edited. |
| 11 | The closing fresh-context review of the diff against `spec.md`, per AGENTS.md §3. |

## Risks, and what to verify

- **A `use cache` / `cacheComponents` configuration would defeat criterion 2.**
  `router.refresh()` clears the client cache but explicitly does *not* invalidate
  server-side caches. Before implementing, check `next.config.*` for
  `cacheComponents` or related experimental flags, and check the lesson and
  module routes for `export const revalidate` or `export const dynamic`. If the
  content read is behind a server cache, the refresh will re-render against
  stale data and criterion 2 cannot be met without touching the pipeline — which
  spec §6 forbids. In that case **stop and report it**; it is a different slice.
  The spec's own evidence (a manual reload shows the edit immediately) says this
  is unlikely, since a reload is the same server render.
- **The dedupe window is a judgement, not a measurement.** 300 ms is chosen to
  swallow the `focus` + `visibilitychange` pair that one alt-tab produces while
  staying far below the interval at which a writer could deliberately return
  twice. If a return is ever observed to produce two RSC requests, raise it, do
  not lengthen it silently.
- **The root layout may already mount other client components.** Adding one more
  null-rendering child at the end of `<body>` must not disturb them; confirm
  with criterion 8 that server-rendered HTML is unchanged in shape.
- **`app/layout.tsx` may not be where `<body>` is rendered.** Verify before
  editing, as above.
