# Spec 002 — Deploy

- **Date:** 2026-08-27
- **Status:** accepted

## What

The site reachable by anyone at a stable public URL, rebuilt automatically from
`main`, and deliberately kept out of search results while its content is still
placeholder.

Concretely:

- A hosting project exists, connected to this repository's `main` branch, so
  that a push publishes. No manual upload step, ever.
- The public URL is **`ttcmd.vercel.app`** — decided, because it becomes
  student-facing the moment it is shared and is expensive to change afterwards.
- Every page the site currently has is reachable from that URL by a visitor
  with no account: the homepage, the module listing, both module pages, and
  both placeholder lessons.
- The deployed site instructs search engines not to index it. This is a
  **temporary posture, not a permanent property**: the content is placeholder
  and must not surface in a search for Viktar's name or the school's. The
  removal is not left to memory — it becomes a required task in the first slice
  that publishes real content.
- The live URL is recorded where someone who has never seen this repo could
  find it.

## Why

Three things change the moment this is done, and none of them can be had from
`localhost`.

**Students can reach it.** The site's purpose is to be the course's source of
information and tasks (constitution, Article I). Until it has a URL it serves
nobody, and the whole point of slice 001's pipeline is unproven in the only
environment that matters.

**Every later slice gets a real verification target.** `npm run build`
succeeding locally is not the same claim as "the site works". From here on,
acceptance criteria can be checked against something a student could actually
open.

**The indexing decision expires.** Once a public site is crawled, the
placeholders are in an index that is not ours to clear, and removal takes weeks.
This is the last slice in which the decision is free, which is why it belongs
here rather than in a tidier one later.

## Out of scope

- A custom domain. `ttcmd.vercel.app` is the URL for the foreseeable future.
- Password protection or any access gate. The URL is public by decision
  (constitution, Article IV).
- Any policy about preview deployments for branches — this slice only requires
  that `main` publishes.
- Analytics of any kind, including privacy-preserving ones. Article VIII.
- Performance, caching or image-optimisation work. It is a placeholder site.
- Any change to styling, content, navigation, or the content schema. If this
  slice edits `content/`, `lib/content.ts` or the schema, it has gone out of
  bounds.
- Removing the no-index posture. That belongs to the first real-content slice,
  by design.
- CI checks on push. There is no CI, and adding it here would be scope creep.

## Acceptance criteria

1. `main` on the remote contains the full application — at minimum
   `package.json`, `app/`, `lib/` and `content/` — and the local branch is not
   ahead of it.
2. A hosting project is connected to this repository and to the `main` branch,
   detecting the framework automatically rather than by manual override.
3. `https://ttcmd.vercel.app` loads the homepage over HTTPS for a visitor who
   is not signed in to anything.
4. From that URL, a visitor can reach the module listing, both module pages,
   and both placeholder lessons, and each renders its Polish title and body.
5. The hosted build completes from a clean checkout — no local artefact,
   uncommitted file, or machine-specific setting is required for it to succeed.
6. Every page served carries an instruction to search engines not to index it,
   and this is verifiable in the response a crawler would receive, not only in
   the source code.
7. A commit or a push to `main` results in a new deployment without any manual
   step beyond the push.
8. `npm run build` and `npm run lint` still pass locally with no errors.
9. The live URL appears in `README.md`, and in the vault's `ttcmd.md`
   **Remote**/URL row, which is currently empty.
10. No secret, token or credential is committed. Anything the host needs is
    configured in the host, never in the repository (Article IV).
11. Nothing in this slice adds a backend, an API route, authentication, a
    database, or static-export mode (Article VIII).
12. The no-index removal is written as a required task in the first
    real-content slice's `tasks.md`, or — if that slice does not exist yet —
    recorded in `docs/roadmap.md` as a gate on it. It is not left as an
    intention in someone's head.
