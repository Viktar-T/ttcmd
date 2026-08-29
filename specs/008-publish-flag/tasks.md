# tasks.md — 008-publish-flag

Ordered, commit-sized, objectively checkable. One task, one commit,
`008/TNN:` in the message (AGENTS.md §5). A box is checked when the task's
check has **run and its evidence is recorded** — in the commit, and where the
task says so in `specs/008-publish-flag/verification.md`.

Criterion numbers refer to `spec.md`; the mechanism is `plan.md`'s.

- [x] **T01 — Record the spec.** `spec.md` with acceptance criteria and
      decisions taken. *Check:* file in the tree, committed on its own.
- [x] **T02 — Record the plan.** `plan.md` written by a fresh-context
      subagent from constitution, AGENTS.md and the spec alone; whether the
      spec sufficed is the test's result, reported in the run's final report.
      *Check:* file in the tree, committed as the subagent wrote it.
- [x] **T03 — Record the tasks.** This file. *Check:* committed on its own.

---

- [x] **T04 — A lesson frontmatter failure names its file.** The
      lesson-frontmatter parse joins the path-naming convention the compile
      step already uses, so a schema error reads `content/moduly/…mdx: …` in
      the build log. Start `verification.md` with the baselines already
      captured (route table, content-tree snapshot). *Check:* `npm run build`
      passes on the unchanged tree; a temporary invalid frontmatter field on
      one lesson fails the build **naming the file**, then is reverted and
      the build passes again. Output recorded.

- [x] **T05 — The schema learns `publish`.** A strict optional boolean on the
      lesson frontmatter schema, absent meaning published, with a doc comment
      in the file's style. *Check:* `npm run build` passes with no content
      change; a temporary quoted `publish: "false"` fails the build naming
      the file (criterion 2), an unquoted `publish: false` builds clean;
      both reverted. Output recorded.

- [x] **T06 — Unpublished lessons leave the course model, and the direct
      request is refused.** The course derivation filters `publish: false`
      lessons after every file is read, parsed and compiled — the position is
      load-bearing and commented — and the single-lesson read returns the
      not-found signal for an unpublished lesson. *Check:* with no content
      file changed, `npm run build` emits the baseline route table
      byte-for-byte (criterion 1). Output recorded.

- [x] **T07 — The landing page starts the course at its first published
      lesson.** The entry-link derivation widens from the first module to the
      flattened course, falling back to the first module's page. *Check:*
      `npm run build` passes; the emitted landing page carries the same entry
      href as the baseline (nothing is unpublished, so nothing may move).
      Output recorded.

- [x] **T08 — The verification pass.** The staged flips of `plan.md`'s
      table, each applied to the tree as it stands, checked against the
      running production build, reverted: Stage A (mid-sequence lesson —
      criteria 3, 4, 5, 6), Stage B (lowest-`order` lesson of the
      multi-lesson module — criterion 7), Stage C (the first module's only
      lesson — criterion 8), the malformed unpublished draft (criterion 9),
      and the closing byte-comparison of the content tree against the
      baseline snapshot (criterion 10). *Check:* every criterion 1–10 has
      its command and output in `verification.md`, or a named human-eye
      remainder.

- [x] **T09 — Close the slice.** Fresh-context review of the whole diff
      against the spec's criteria; fix what affects correctness or a
      criterion, record the rest without fixing (criterion 11). *Check:* the
      review's findings and their disposition recorded in `verification.md`;
      every box above checked or its blocker named.
