# Plan 002 — Deploy

- **Date:** 2026-08-28
- **Status:** proposed
- **Spec:** [`spec.md`](spec.md)

## Blocking decision before any code

`spec.md` requires a temporary no-index posture. Article IV of the constitution
states, as fact, that "the Vercel site is public **and indexed**". A spec may
not contradict the constitution, so this slice cannot be executed as written
until that is resolved — and an agent may not amend Article IV (Article X).

Resolution proposed: **ADR-0003**, which records the temporary no-index
decision, its expiry gate, and proposes the one-line Article IV refinement that
makes "indexed" the end state rather than a present-tense property. Viktar
accepts or rejects it. If rejected, the no-index criteria (6, 12) come out of
the spec and the slice is re-specced — not silently executed either way.

Everything below assumes ADR-0003 is accepted.

## What is already true

- `main` is **8 commits ahead of `origin/main`**; the remote still holds only
  `C0`. Criterion 1 is a push, not a guess about one.
- The working tree is **not clean**: `package-lock.json` is modified and
  `docs/roadmap.md` is untracked. A hosted build runs `npm ci` from a clean
  checkout, so the lockfile must be committed and in sync or criterion 5 fails
  in the host rather than locally.
- `.gitignore` already excludes `.vercel/`, `.env*` (except `.env.example`) and
  `next-env.d.ts`. Criterion 10 needs nothing added; it needs nothing done.
- `next.config.ts` exists and sets no `output` — Article VIII holds, and it is
  the natural place for a response header.

## Mechanism: how "do not index" is actually delivered

Three layers, because criterion 6 asks for something a crawler receives, not
something the repository contains.

1. **`X-Robots-Tag: noindex, nofollow` on every response**, via `headers()` in
   `next.config.ts` matching `/:path*`. This is the layer that survives the
   page being a prerendered static file, and the one that is verifiable with
   `curl -I`. It is the primary evidence for criterion 6.
2. **`robots: { index: false, follow: false }` in the root layout's
   `metadata`**, which emits `<meta name="robots" content="noindex, nofollow">`
   into every page. Every route inherits it; none override it. Belt to the
   header's braces, and visible to anything that reads HTML but not headers.
3. **`app/robots.ts`** returning `MetadataRoute.Robots` — see the docs at
   `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/robots.md`
   before writing it.

**`robots.txt` allows crawling.** This looks backwards and is not: a
`Disallow: /` forbids the *fetch*, so the crawler never reads the `noindex` it
was forbidden from fetching, and the URL can still be listed from external
links. Allow the fetch, deny the index. The reasoning and the rejected
alternatives belong in ADR-0003, not here.

## File map

```
docs/adr/0003-temporary-no-index.md   the decision, its expiry, Article IV
next.config.ts                        + async headers() → X-Robots-Tag
app/robots.ts                         robots.txt, crawling allowed
app/layout.tsx                        + metadata.robots
docs/roadmap.md                       committed, + the no-index removal gate
README.md                             the live URL, and a State section that is
                                      no longer "pre-scaffold"
specs/002-deploy/tasks.md             this plan, broken into commits
```

No dependency is added, so no ADR line is owed for one. Nothing under
`content/`, `lib/` or the schema is touched — if a diff in this slice shows
those, it has gone out of bounds (`spec.md`, Out of scope).

## What only Viktar can do

The hosting project needs his account. Two tasks are his, and the plan is
written so the agent stops rather than improvises:

- **Create the Vercel project**: import `Viktar-T/ttcmd` from GitHub, project
  name `ttcmd`, framework detected automatically (do not override it —
  criterion 2 says detected), no environment variables, production branch
  `main`. *Contingency:* if `ttcmd.vercel.app` is already taken, stop. The URL
  is fixed by the spec and is not the agent's to substitute.
- **Fill the vault's `ttcmd.md` Remote row.** The vault is outside this repo
  and outside the agent's reach; criterion 9 closes on Viktar pasting the
  result back.

No Vercel CLI, no `vercel link`, no token anywhere. The connection lives in the
host (criterion 10).

## Order of work

The one ordering that is not negotiable: **the no-index layers ship before the
first public deployment exists.** Deploying first and adding `noindex` after is
the exact window the spec exists to close.

1. Record the planning artifacts; flip `spec.md` to accepted.
2. ADR-0003 — and **stop** for Viktar's decision.
3. Implement the three no-index layers. Verify locally against a production
   build, over HTTP, not by reading the source.
4. Make the tree clean and prove a clean checkout builds: commit the lockfile
   and `docs/roadmap.md` (carrying the no-index removal gate, criterion 12),
   then clone the repo to a scratch directory and run `npm ci && npm run build`
   there. This is criterion 5 tested before the host tests it.
5. Push `main`.
6. *(Viktar)* Create the Vercel project. Read the build log.
7. Verify the live site: all six routes, logged out, plus the header over the
   wire.
8. Record the URL in `README.md` and *(Viktar)* in the vault. **This push is
   also the evidence for criterion 7** — one push, no dashboard step, a new
   deployment. Do not spend a throwaway commit proving auto-deploy when a real
   one is due anyway.
9. Close the slice: fresh-context review against all 12 criteria, then the
   journal.

## Verification notes

- **The header, over the wire.** Locally: `npm run build && npm start`, then
  `curl -sSI http://localhost:3000/moduly`. Live: the same against
  `https://ttcmd.vercel.app/`. If neither shell can reach the live URL, the
  browser pane's network reader shows response headers; a pasted `curl -I` from
  Viktar's own terminal is equally good evidence. A screenshot of a rendered
  page is **not** evidence for criterion 6.
- **Logged out.** Criterion 3 says "not signed in to anything". Check it in a
  private window, or `curl -sS -o /dev/null -w '%{http_code}'` — a browser
  already signed in to Vercel cannot tell a public deployment from a protected
  one.
- **Six URLs** for criterion 4: `/`, `/moduly`, both module pages, both
  lessons. Each must render its Polish title and body, not just return 200.
- **Criterion 5** is claimed only after the scratch-clone `npm ci && npm run
  build` passes *and* the hosted build log shows the same.
- `npm run build` and `npm run lint` (criterion 8) run before every commit that
  touches code, not once at the end.

## Known risk

`ttcmd.vercel.app` is a global namespace and this slice assumes it is free.
That is the one assumption here that a plan cannot verify and that no amount of
local work makes safer. It is checked at the first moment it can be — step 6 —
and if it fails, the slice stops there for a decision, because the alternative
is an agent quietly picking a URL that becomes student-facing.
