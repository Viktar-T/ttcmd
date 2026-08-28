# Spec 002 — Deploy

- **Date:** 2026-08-27
- **Status:** accepted; **amended 2026-08-28** — see "Amendment" below

## What

The site reachable by anyone at a stable public URL, rebuilt automatically from
`main`.

Concretely:

- A hosting project exists, connected to this repository's `main` branch, so
  that a push publishes. No manual upload step, ever.
- The public URL is **`ttcmd.vercel.app`** — decided, because it becomes
  student-facing the moment it is shared and is expensive to change afterwards.
- Every page the site currently has is reachable from that URL by a visitor
  with no account: the homepage, the module listing, both module pages, and
  both placeholder lessons.
- The live URL is recorded where someone who has never seen this repo could
  find it.

## Why

Two things change the moment this is done, and neither can be had from
`localhost`.

**Students can reach it.** The site's purpose is to be the course's source of
information and tasks (constitution, Article I). Until it has a URL it serves
nobody, and the whole point of slice 001's pipeline is unproven in the only
environment that matters.

**Every later slice gets a real verification target.** `npm run build`
succeeding locally is not the same claim as "the site works". From here on,
acceptance criteria can be checked against something a student could actually
open.


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
- Search-engine indexing, in either direction. Closed by **rejecting**
  [ADR-0006](../../docs/adr/0006-temporary-no-index.md) — read its *Outcome*
  section, not its *Decision* section, which records the proposal that was
  turned down. The site is indexed from the first deployment, like any other
  public site.
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
6. ~~No-index instruction on every response.~~ **Struck** — see Amendment.
7. A commit or a push to `main` results in a new deployment without any manual
   step beyond the push.
8. `npm run build` and `npm run lint` still pass locally with no errors.
9. The live URL appears in `README.md`, and in the vault's `ttcmd.md`
   **Remote**/URL row, which is currently empty.
10. No secret, token or credential is committed. Anything the host needs is
    configured in the host, never in the repository (Article IV).
11. Nothing in this slice adds a backend, an API route, authentication, a
    database, or static-export mode (Article VIII).
12. ~~The no-index removal recorded as a gate.~~ **Struck** — see Amendment.

## Amendment — 2026-08-28

Criteria **6** (no-index instruction on every response) and **12** (the removal
written down as a gate) are **struck**, together with the no-index paragraphs in
*What* and *Why*. Viktar's decision, recorded in
[ADR-0006](../../docs/adr/0006-temporary-no-index.md): the site may be indexed
from the first deployment.

The numbers **6** and **12** are not closed up, so that every surviving
criterion keeps the number `plan.md` refers to it by. Ten criteria are live;
6 and 12 remain in the list as struck placeholders.

They are placeholders rather than gaps for a rendering reason worth knowing:
CommonMark ignores every number in an ordered list after the first and
renumbers sequentially, so a literal gap looks fine in the source and silently
renumbers everything below it on GitHub — which would have defeated the whole
point of not closing them up.

`constitution.md` is unchanged — Article IV's "the Vercel site is public and
indexed" is simply true, which is why no amendment to it was needed.
