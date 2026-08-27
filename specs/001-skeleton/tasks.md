# Tasks 001 — Skeleton

Ordered, commit-sized, one task per commit. Message format `001/TNN: ...`.
Each check must be run and its output shown before the box is checked
(AGENTS.md §3) — a box is checked when the task is done *and verified*.

- [x] **T01 — Record planning artifacts**
  Commit `tasks.md` (this file) and the status flips on `spec.md`,
  `plan.md`, and ADR-0002 (all now `accepted`, per Viktar's approval in
  session). No application code yet.
  **Check:** `git log` shows the commit; the three files read `Status:
  accepted`.

- [x] **T02 — Scaffold the Next.js app**
  `package.json`, `tsconfig.json` (`strict: true`), ESLint config,
  `app/layout.tsx` (`<html lang="pl">`), `app/globals.css` (system font
  stack, readable measure, nothing else), `app/page.tsx` (minimal Polish
  static text, a link to `/moduly` that doesn't need to resolve yet). No
  content pipeline, no `content/` reads.
  **Check:** `npm install` succeeds; `npm run build` succeeds; `npm run
  lint` succeeds.

- [x] **T03 — Content schema and content-reading library**
  `lib/content-schema.ts` (`moduleFrontmatterSchema`,
  `lessonFrontmatterSchema`) and `lib/content.ts` (`listModules`,
  `getModule`, `listLessons`, `getLesson`), per `plan.md`. Both schemas use
  `.parse()`. No routes consume this yet.
  **Check:** `npm run build` succeeds; `npm run lint` succeeds; TypeScript
  reports no errors.

- [x] **T04 — Placeholder content**
  Two module folders under `content/moduly/`, each with an `index.mdx`
  (`title` only) and one lesson `.mdx` (`title`, `order`, `summary`;
  `week` absent). Polish, unmistakably placeholder — no real topic, date,
  or scope (Article V).
  **Check:** four files exist with the required frontmatter fields present
  and correctly typed (numeric `order`, non-empty strings); `npm run
  build` still succeeds (nothing reads them yet, so this only confirms
  nothing else broke).

- [ ] **T05 — Wire up the module and lesson routes**
  `app/moduly/page.tsx`, `app/moduly/[module]/page.tsx`,
  `app/moduly/[module]/[lesson]/page.tsx`, reading through `lib/content.ts`.
  Both dynamic routes implement `generateStaticParams`.
  **Check:** `npm run build` output lists `/moduly`, both module routes,
  and both lesson routes as prerendered (static) routes; `npm run dev` and
  a manual click-through from `/` reaches every placeholder lesson.

- [ ] **T06 — Verify the invalid-frontmatter path**
  Code review only (spec's acceptance criterion 8 — no committed broken
  fixture): confirm `lib/content.ts` calls `.parse()`, never
  `.safeParse()`, on both schemas, and that a missing required field would
  throw during `compileMDX`/route rendering rather than fall back to a
  default.
  **Check:** the two `.parse()` call sites are pointed to directly (file:line)
  in the commit message or PR description.

- [ ] **T07 — Close the slice**
  Fresh-context review of the full diff against `spec.md`'s 13 acceptance
  criteria (AGENTS.md §3), run from a clean subagent context that has not
  seen this implementation session. Fix anything it flags as affecting
  correctness or an acceptance criterion before checking this box; note
  anything it flags that's out of scope, without fixing it here.
  **Check:** review report attached (or summarized) with zero unresolved
  correctness/acceptance gaps.
