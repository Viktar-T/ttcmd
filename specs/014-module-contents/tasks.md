# tasks.md — 014-module-contents

Ordered, commit-sized, objectively checkable. One task, one commit,
`014/TNN:` in the message (AGENTS.md §5). A box is checked when the task's
check has **run and its evidence is recorded** — in the commit, and in
`specs/014-module-contents/verification.md`.

Criterion numbers refer to `spec.md`; the mechanism is `plan.md`'s. Where this
list departs from the plan's own ordering it says so on the spot — the plan was
written blind to the repository, and three of its inferences turned out not to
match what is there.

- [x] **T00 — Record the spec.** *Check:* file in the tree, committed on its
      own. Viktar's two calls are marked as his in `## Decisions taken`.
- [x] **T01 — Record the plan.** Written by a subagent from `constitution.md`,
      `AGENTS.md` and this slice's `spec.md` alone. *Check:* committed exactly
      as the subagent wrote it, inferred names and gaps included.
- [x] **T02 — Record the tasks.** This file. *Check:* committed on its own.

- [x] **T03 — The baseline, and the plan's five gaps answered from the tree.**
      The plan's one unrecoverable ordering constraint: the baseline exists
      before the first code commit. Measure every page and width the slice
      compares against, and answer each gap with a fact rather than an
      assumption. *Check:* the baseline table and the five answers in
      `verification.md`; `npm run build` and the contrast report captured for
      criterion 1 to be diffed against.

- [x] **T04 — Rename the two-column wrapper for what it now is.** Names only,
      no declaration changed, done alone so no later measurement can be blamed
      on it (plan T01, decision 6). *Check:* `git diff` shows renames and
      comment edits and no changed declaration; the lesson page, both module
      pages, the module grid, the home page and the reference page measure the
      T03 baseline exactly; `npm run build` and `npm run lint` green.

- [x] **T05 — One built list, the same entries.** The list's rows stop being
      derived twice over — an entry model inside the contents, one row
      renderer, `href` absent meaning *this is the page you are on* and the
      identity string rendered only where there is one. Emits exactly what the
      list emits today. *Check:* the rendered HTML of a lesson page's panel and
      disclosure is **byte-identical** before and after; `npm run build` and
      `npm run lint` green.

- [x] **T06 — „Wstęp" enters the list, and the dead-housing rule generalises.**
      The first entry, a link from every lesson page; a housing renders when
      its list holds at least one link. The module page is not touched yet.
      *Check:* criteria 4 and 6 and the lesson half of 5, read from the
      rendered markup of a lesson in each module; the consequence spec §8
      names — a one-lesson module's lesson page now has a panel — shown on the
      reference page's one-lesson specimen module.

- [x] **T07 — The module page becomes two columns and carries both housings.**
      The page moves into the renamed wrapper, gains the panel and the
      collapsed disclosure with „Wstęp" as the current entry, gives its title
      and introduction the skip target, and mounts the existing scroll-spy.
      The skip target travels in the same commit because a panel whose skip
      control points at nothing is a broken link, not a smaller step.
      *Check:* criteria 2, 3, 9, 10, 13 as a diff against the T03 baseline on
      **both** modules' pages; criterion 11 at 320, 1279, 1281, 1585 and
      2560 px on four kinds of page; criteria 4 and 5 read from both module
      pages' markup; criterion 8 as an experiment — every lesson of a module
      temporarily unpublished, neither housing rendered, no dead row, reverted,
      `git status` clean under `content/`.

- [x] **T08 — The introduction's sections reach the list.** They are collected
      when the introduction is compiled and dropped by the loader; stop
      dropping them and hand them to the entry that names it. *Check:*
      criterion 7 in both halves — with no introduction carrying a heading,
      „Wstęp" is a single row with nothing beneath it on both modules' pages;
      with a heading temporarily added to one introduction, the entry expands
      to it, links to the identifier the page gives that heading, and following
      it lands the heading below the top edge; reverted, `git status` clean
      under `content/`.

- [x] **T09 — The reference page tells the truth about the list.** Specimens
      for „Wstęp" as a link and „Wstęp" as the current entry. *Check:*
      criterion 16 — the page renders without error at 1280 px and 375 px and
      its specimens match what the module and lesson pages render.

- [x] **T10 — The sweeps.** No production code: run what is left and record it.
      Criterion 1 (build, lint, colour-literal guard, contrast report unchanged
      against T03); criterion 12 (the lesson page's boxes at 1280 and 1585, and
      007's behaviours — the three scroll-spy states, the panel's own
      scrollbar, back-to-top); criterion 14 (scripting disabled at 1280 and
      375 on a module page); criterion 15 (every module-page criterion checked
      on both modules); criterion 17 (`git diff --stat` touches nothing under
      `content/`, no dependency, no new network request).
      *Commit:* the checked boxes in this file, `verification.md` complete, and
      a factual entry under "Agent notes" in `docs/sdd-journal.md`
      (AGENTS.md §7).

- [x] **T11 — The closing review.** A fresh subagent reads the whole diff
      against `spec.md` (AGENTS.md §3, criterion 19). What affects correctness
      or a criterion is fixed in a commit of its own; the rest is recorded
      without being fixed.

**Criterion 18 is not closable by this run.** Whether the module page and a
lesson page now read as the same site is a judgement about the look of the
site, and the run that builds it cannot make it. Its box stays unchecked and
the final report names what to open and at what width.
