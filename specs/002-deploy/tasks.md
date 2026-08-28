# Tasks 002 — Deploy

- **Date:** 2026-08-28
- **Spec:** [`spec.md`](spec.md) · **Plan:** [`plan.md`](plan.md)

Ordered. One task, one commit. A box is checked when the check has been run and
its output is in the commit or in this file — never when the work is merely
written.

Two tasks are **Viktar's** and are marked so; the agent stops at them rather
than improvising (`plan.md`, "What only Viktar can do").

---

- [ ] **T01 — Record the slice's planning artifacts.**
      Commit `spec.md`, `plan.md` and this file, and flip `spec.md` Status from
      `proposed` to `accepted`.
      *Check:* `git show --stat HEAD` lists exactly the three files under
      `specs/002-deploy/`, and `spec.md` reads `Status: accepted`.

- [ ] **T02 — ADR-0003: the temporary no-index decision. (decision: Viktar)**
      `spec.md` requires a no-index posture; Article IV states as fact that the
      site is "public and indexed". Write `docs/adr/0003-temporary-no-index.md`
      recording the decision, the alternatives rejected (`Disallow: /`, Vercel
      password protection, deploying indexed and cleaning up later), the expiry
      gate, and the one-line Article IV refinement it proposes. **Then stop.**
      Article X: an agent proposes an amendment, it never makes one.
      *Check:* the ADR exists and its Status line records Viktar's accept or
      reject. If rejected, criteria 6 and 12 leave the spec and the slice is
      re-specced — T03 does not run either way on its own.

- [ ] **T03 — The three no-index layers, verified over the wire.**
      `X-Robots-Tag: noindex, nofollow` on `/:path*` via `headers()` in
      `next.config.ts`; `metadata.robots` in `app/layout.tsx`; `app/robots.ts`
      that **allows** crawling (a forbidden fetch is a `noindex` never read).
      *Check:* `npm run build && npm run lint` clean, then against
      `npm start` — `curl -sSI http://localhost:3000/moduly` shows the header,
      `curl -sS http://localhost:3000/robots.txt` shows `Allow: /`, and the
      page HTML contains `<meta name="robots" content="noindex, nofollow">`.
      Reading the source is not the check.

- [ ] **T04 — Make the tree clean and prove a clean checkout builds.**
      Commit the modified `package-lock.json` and the untracked
      `docs/roadmap.md`, the latter carrying the no-index removal as a gate on
      the first real-content slice (criterion 12).
      *Check:* `git status --porcelain` prints nothing, and a fresh
      `git clone` of this repo into the scratch directory runs
      `npm ci && npm run build` to success (criterion 5, tested before the host
      tests it).

- [ ] **T05 — Push `main`.**
      The remote holds only `C0`; the entire application is local. This is the
      task that fixes the live 404 — the host has been building a repository
      with no `package.json` in it.
      *Check:* `git log --oneline -1 origin/main` equals local `HEAD`, and
      `git ls-tree --name-only origin/main` lists `package.json`, `app`, `lib`
      and `content` (criterion 1).

- [ ] **T06 — Confirm the hosting project and read the build log. (Viktar)**
      The project already exists at `ttcmd.vercel.app`, so the URL is not at
      risk. Confirm it is connected to `Viktar-T/ttcmd`, production branch
      `main`, framework **detected** and not overridden, no environment
      variables — and that the T05 push produced a succeeding deployment.
      *Check:* the deployment for the pushed commit is Ready, its log shows
      `next build` completing, and the project settings show framework
      "Next.js" as detected (criteria 2, 5, 10).

- [ ] **T07 — Verify the live site, logged out.**
      *Check:* `curl` returns 200 for all six routes — `/`, `/moduly`, both
      module pages, both lessons — and each body contains its Polish title;
      `curl -sSI https://ttcmd.vercel.app/` shows `X-Robots-Tag: noindex,
      nofollow`; `/robots.txt` allows crawling (criteria 3, 4, 6). A screenshot
      is not evidence for the header.

- [ ] **T08 — Record the live URL, and let the push prove auto-deploy.**
      Put the URL in `README.md` and replace its "Pre-scaffold" State section,
      which has been wrong since 001 closed. Pushing this commit is itself the
      evidence for criterion 7 — no throwaway commit for that.
      *Check:* a new deployment appears for this commit with no dashboard step,
      and the live homepage serves the updated content. **(Viktar)** fills the
      empty **Remote** row in the vault's `ttcmd.md` and pastes back the result
      (criterion 9).

- [ ] **T09 — Close the slice.**
      Review the whole diff against `spec.md` in a **fresh subagent context**,
      against all 12 acceptance criteria, reporting gaps that affect
      correctness — not style. Then append the factual entry to
      `docs/sdd-journal.md` under "Agent notes".
      *Check:* the review reports no gap, every box above is checked, and the
      journal entry is committed.
