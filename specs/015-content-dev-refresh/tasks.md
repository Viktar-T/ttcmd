# tasks.md — 015-content-dev-refresh

Ordered, commit-sized, objectively checkable. One task, one commit, message
prefixed `015/TNN` (AGENTS.md §5).

`T00` is the spec, already committed.

---

- [x] **T01 — Confirm no server cache stands between a request and the file.**

  The plan names this as the risk that would make the slice impossible without
  touching the pipeline: if content is read behind `cacheComponents`, a `use
  cache` boundary or a route-level `revalidate`, a refresh re-renders against
  stale data. Check `next.config.*` and the lesson, module and module-list
  routes. **Checked by:** the search and its output, recorded here. No commit if
  nothing changes — this is a gate, not a change.

- [x] **T02 — Add the development-only refresh component.**

  Two files, per the plan's file map: the `"use client"` component that renders
  `null` and refreshes the route when the browser regains attention, and the
  Server Component wrapper that returns `null` outside development and reaches
  the client module through a dynamic import inside the guard.

  The plan expects `components/dev/`; `components/` in this repo is flat, so the
  files take a `dev-` name prefix instead and the scope stays legible from the
  file map. **Checked by:** `npm run lint` and `npm run build`, both clean, with
  the component unused at this point.

- [ ] **T03 — Mount it in the root layout.**

  Last child of `<body>`, after the existing children. Verify first that the
  root layout is a Server Component and is the file rendering `<html>` and
  `<body>`. **Checked by:** `npm run build` and `npm run lint` (criterion 1),
  and the served development page containing the component's markup — which is
  nothing, so the check is that the page still renders and the behaviour of T04
  now exists.

- [ ] **T04 — Verify the development behaviour and record it.**

  Criteria 2, 3, 4, 5, 6, 8, 9. Run each against `npm run dev` in a real
  browser, editing real content files and reverting them, and write the
  observations and their output to `specs/015-content-dev-refresh/verification.md`.
  **Checked by:** that file, and `git status --porcelain content/` returning
  nothing at the end.

- [ ] **T05 — Verify that production carries nothing, and record it.**

  Criterion 7, the criterion the spec names as the one that matters most.
  Against a real production build served locally: no request on return, and the
  component's code absent from the chunks the page loads. Appended to
  `verification.md`. **Checked by:** the network record and the chunk search,
  both pasted.

Criterion 10 is a human-eye judgement (AGENTS.md §3) and is not closable by the
run that builds the slice. Criterion 11 is the closing fresh-context review.
