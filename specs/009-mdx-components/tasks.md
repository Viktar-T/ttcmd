# tasks.md — 009-mdx-components

- **Slice:** 009
- **Spec:** `specs/009-mdx-components/spec.md`
- **Plan:** `specs/009-mdx-components/plan.md`
- **Date:** 2026-08-30

Ordered and commit-sized. One task, one commit, `009/TNN:`. A box is checked
when the task is done **and verified**, with the check's command and output
recorded — never when it is merely written (AGENTS.md §3).

Task numbers follow this repo's convention, in which the three artefacts are
T01–T03; the plan's own §9 numbering is offset by three.

---

- [x] **T01 — record the spec.**
      `specs/009-mdx-components/spec.md`. Check: the file exists, ends in
      acceptance criteria and carries `## Decisions taken`.

- [x] **T02 — record the plan, written from the spec alone.**
      `specs/009-mdx-components/plan.md`, produced in a fresh context whose
      only inputs were `constitution.md`, `AGENTS.md`, this slice's `spec.md`,
      ADR-0003 and the code it names (AGENTS.md §2). Check: the file exists and
      carries a file map and an order of work.

- [x] **T03 — record the tasks.** This file.

- [x] **T04 — the numbering primitives, and the anchor reservation.**
      `lib/numbering.ts` gains `exerciseNumber`, `exerciseId` and
      `EXERCISE_ID_PATTERN`; `lib/section-anchors.ts` treats a heading-derived
      id of that shape as taken, so it falls through to the existing collision
      loop. Nothing renders differently yet.
      Check: `npm run build` passes and the emitted route list is unchanged.

- [x] **T05 — the plugin, and every refusal it makes.**
      `lib/exercises.ts`: the policy union, the tree walk, the count, the
      stamping of `number` and `id`, and the refusals of plan §3 — an
      author-written attribute, an empty or non-literal `title`, an inline
      element, and an exercise where the module cannot number it. Not yet
      wired into the pipeline.
      Check: `npm run build` passes (the file is type-checked; nothing imports
      it yet).

- [x] **T06 — the exercise, and its treatment.**
      `components/exercise.tsx`, `components/exercise.module.css`, and
      `[data-exercise]` joining the two set-apart selectors in `app/prose.css`.
      Still unreachable from any page.
      Check: `npm run build` passes with Check B scanning the new stylesheet,
      and Check E's report unchanged.

- [ ] **T07 — wire the pipeline.**
      `lib/content.ts`: the policy through `buildMdxOptions`, `compile`,
      `readModule`, `readLessonFrontmatterAndBody`, `listLessons`,
      `getCourse` (the offsets, accumulated after the publish filter and the
      `order` sort), `getLesson` (resolved through `getCourse`) and
      `compileProse`; plus the fields the type change forces onto
      `app/styleguide/page.tsx`'s specimen literals.
      Check: `npm run build` passes and the emitted route list is identical to
      the baseline — no content writes an exercise yet, so the site is
      unchanged.

- [ ] **T08 — the permanent specimen.**
      `app/styleguide/page.tsx` gains two exercises compiled through
      `compileProse`: one with a title, one without.
      Check: the built page carries `Zadanie 7.1` with its title and
      `Zadanie 7.2` with nothing in its place, ids `zadanie-7-1` and
      `zadanie-7-2`; both themes; 375 px with no horizontal scrollbar.
      (Criteria 10, 12, 14.)

- [ ] **T09 — the numbering, proved on real lessons and reverted.**
      Stage the corpus's 33 exercises per plan §10, read the numbers off the
      built pages, stage the insertion, the unpublish and the three refusals,
      then restore `content/` from the pre-staging copy and prove the tree is
      byte-for-byte unchanged. Evidence into
      `specs/009-mdx-components/verification.md`.
      This task changes no source file; its commit carries the verification
      document only. (Criteria 2–9, 12, 13, 16.)

- [ ] **T10 — close the slice.**
      Fresh-context review of the diff against `spec.md` (criterion 17),
      `tasks.md` matching reality, and the final report naming the criterion
      left open for a human eye.

---

## Not closable by an agent

Named here so no box is checked for it: the spec's *"unmissable when scrolling
back"* judgement. Criteria 11, 12 and 14 pin what is measurable; whether an
exercise actually reads as unmissable in rendered Polish prose, on both themes,
is decided by looking at a lesson page.
