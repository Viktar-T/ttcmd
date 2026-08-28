# Tasks 002 — Deploy

- **Date:** 2026-08-28
- **Spec:** [`spec.md`](spec.md) · **Plan:** [`plan.md`](plan.md)

Ordered. One task, one commit. A box is checked when the check has been run and
its output is in the commit or in this file — never when the work is merely
written.

Two tasks are **Viktar's** and are marked so; the agent stops at them rather
than improvising (`plan.md`, "What only Viktar can do").

---

- [x] **T01 — Record the slice's planning artifacts.**
      Commit `spec.md`, `plan.md` and this file, and flip `spec.md` Status from
      `proposed` to `accepted`.
      *Check:* `git show --stat HEAD` lists exactly the three files under
      `specs/002-deploy/`, and `spec.md` reads `Status: accepted`.

- [x] **T02 — ADR-0003: the temporary no-index decision. (decision: Viktar)**
      `spec.md` requires a no-index posture; Article IV states as fact that the
      site is "public and indexed". Write `docs/adr/0003-temporary-no-index.md`
      recording the decision, the alternatives rejected (`Disallow: /`, Vercel
      password protection, deploying indexed and cleaning up later), the expiry
      gate, and the one-line Article IV refinement it proposes. **Then stop.**
      Article X: an agent proposes an amendment, it never makes one.
      *Check:* the ADR exists and its Status line records Viktar's accept or
      reject. If rejected, criteria 6 and 12 leave the spec and the slice is
      re-specced — T03 does not run either way on its own.
      **Done, 2026-08-28: rejected.** "It can be indexed right now. It is not
      important." No no-index layers are built and `constitution.md` is not
      amended; T03 below is the re-spec instead.

- [x] **T03 — Re-spec the slice around the rejection.**
      Mark ADR-0003 rejected with its outcome; strike criteria 6 and 12 from
      `spec.md`, leaving the numbers as gaps so the surviving criteria keep the
      numbers `plan.md` cites; append an amendment note to `plan.md` marking the
      no-index mechanism as not built. `constitution.md` is not touched.
      *Check:* `spec.md` lists ten criteria, numbered 1–5 and 7–11, and every
      surviving mention of "no-index" in it is in the Amendment recording the
      removal, not in a requirement; `grep -rn "noindex\|robots" next.config.ts
      app/` finds nothing, because no application file is in this slice at all.

- [x] **T04 — Make the tree clean and prove a clean checkout builds.**
      Commit the modified `package-lock.json` and the untracked
      `docs/roadmap.md`. Nothing is added to the roadmap: the gate it was going
      to carry died with ADR-0003.
      *Check:* `git status --porcelain` prints nothing, and a fresh
      `git clone` of this repo into the scratch directory runs
      `npm ci && npm run build` to success (criterion 5, tested before the host
      tests it).
      **Done, 2026-08-28.** Tree clean; `npm run build` and `npm run lint` both
      clean (criterion 8). Scratch clone: `npm ci` added 458 packages, 0
      vulnerabilities; `npm run build` prerendered all 8 routes. No local
      artefact is needed to build this repo.

- [x] **T05 — Push `main`.**
      The remote holds only `C0`; the entire application is local. This is the
      task that fixes the live 404 — the host has been building a repository
      with no `package.json` in it.
      *Check:* `git log --oneline -1 origin/main` equals local `HEAD`, and
      `git ls-tree --name-only origin/main` lists `package.json`, `app`, `lib`
      and `content` (criterion 1).
      **Done, 2026-08-28.** `8c15e7d..6b8e9aa  main -> main`; the remote tree
      now lists `app`, `lib`, `content`, `package.json`. GitHub's API confirms
      it independently: `default_branch: main`, and
      `raw.githubusercontent.com/.../main/package.json` returns 200. Criterion
      10 re-checked on the pushed tree — only `.env.example` is tracked, and it
      holds two comment lines and no variables.

- [ ] **T06 — Confirm the hosting project and read the build log. (Viktar)**
      The project already exists at `ttcmd.vercel.app`, so the URL is not at
      risk. Confirm it is connected to `Viktar-T/ttcmd`, production branch
      `main`, framework **detected** and not overridden, no environment
      variables — and that the T05 push produced a succeeding deployment.
      *Check:* the deployment for the pushed commit is Ready, its log shows
      `next build` completing, and the project settings show framework
      "Next.js" as detected (criteria 2, 5, 10).

      **Blocked, 2026-08-28 — this is where the slice stands.** The push
      landed at 09:43 UTC. `https://ttcmd.vercel.app/` was polled for ten
      minutes afterwards and returned `404` every time, and it still does.

      What the 404 says: the response is `Content-Type: text/plain`,
      79 bytes, `X-Vercel-Error: NOT_FOUND`, `Server: Vercel`. That is
      Vercel's own platform 404, **not** the Next.js `/_not-found` page,
      which would come back as HTML. So no Next.js output is being served
      for that hostname at all — the app is not merely misrouted, it is not
      there.

      The repository is not the cause, and that is now checked rather than
      assumed. The most likely cause, in order:

      1. **Framework Preset is "Other".** The project was created while the
         remote still held `C0` — a repo with no `package.json`. Vercel had
         nothing to detect, so it would have fallen back to a static build of
         the repo root, which contains no `index.html`: every path 404s, and
         will keep 404ing after every future push, because the build
         "succeeds" and produces nothing. This also fails criterion 2 on its
         own terms, which asks for the framework *detected*.
      2. **No Git connection.** If the project was created by upload or CLI
         rather than by importing `Viktar-T/ttcmd`, no push will ever trigger
         it, and criterion 7 cannot be met without reconnecting it.
      3. **Production branch is not `main`,** so the push built nothing.

      Whichever it is, the fix is in the dashboard and needs Viktar's account.
      Deleting the project and re-importing `Viktar-T/ttcmd` now that the
      repository has a `package.json` resolves 1, 2 and 3 in one step, and is
      the option that satisfies criterion 2 by construction — detection can
      only happen at import.

      **Cause confirmed, 2026-08-28,** from the build log Viktar pasted. Causes
      2 and 3 are eliminated: the push *did* trigger a deployment, and
      `next build` completed inside it — the log prerenders all 8 routes,
      identical to the local and scratch-clone builds. The build then failed
      on its last line:

      > `Error: No Output Directory named "public" found after the Build
      > completed.`

      Looking for a directory called `public` **after** running the build is
      what Vercel does when the Framework Preset is **"Other"**: it ran
      `next build`, discarded `.next/`, and went looking for a static site
      that was never going to be there. Cause 1, as predicted — the preset was
      fixed when the project was imported against a repo whose only content
      was `C0`.

      Two ways out, and they are not equivalent for this slice:

      - **Re-import the project** (delete, then import `Viktar-T/ttcmd`
        again). Detection runs against a repo that now has a `package.json`,
        so the preset lands on Next.js *by detection*. Nothing is lost —
        there are no environment variables, no custom domain, no protection
        settings to recreate. **This is the one that meets criterion 2**,
        which asks for the framework detected, not corrected.
      - **Set Framework Preset to Next.js by hand** in Settings → General.
        The site comes up, but by the manual override criterion 2 was written
        to exclude. If this route is taken, it is a deviation and is recorded
        as one in `docs/sdd-journal.md` — not quietly checked off.

      Note what is *not* the answer: a `vercel.json` with `outputDirectory`.
      It would paper over the wrong preset with a file in the repository, and
      it is a manual override with extra steps.

- [ ] **T07 — Verify the live site, logged out.** *(blocked on T06)*
      *Check:* `curl` returns 200 for all six routes — `/`, `/moduly`, both
      module pages, both lessons — and each body contains its Polish title
      (criteria 3, 4). Logged out means logged out: `curl` has no Vercel
      session, which is exactly why it is the check and a browser is not.

- [ ] **T08 — Record the live URL, and let the push prove auto-deploy.** *(blocked on T07 — `README.md` is deliberately not yet pointed at a URL that 404s)*
      Put the URL in `README.md` and replace its "Pre-scaffold" State section,
      which has been wrong since 001 closed. Pushing this commit is itself the
      evidence for criterion 7 — no throwaway commit for that.
      *Check:* a new deployment appears for this commit with no dashboard step,
      and the live homepage serves the updated content. **(Viktar)** fills the
      empty **Remote** row in the vault's `ttcmd.md` and pastes back the result
      (criterion 9).

- [ ] **T09 — Close the slice.** *(blocked on T06–T08)*
      Review the whole diff against the amended `spec.md` in a **fresh subagent
      context**, against the ten surviving acceptance criteria, reporting gaps
      that affect correctness — not style. Then append the factual entry to
      `docs/sdd-journal.md` under "Agent notes".
      *Check:* the review reports no gap, every box above is checked, and the
      journal entry is committed. The journal records the two things this slice
      actually taught: a plan that named its blocking decision up front got a
      one-line answer instead of a wrong implementation, and the live 404 was
      never a hosting problem — the remote had no application on it.
