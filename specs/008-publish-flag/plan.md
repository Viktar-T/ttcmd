# plan.md — 008-publish-flag

- **Slice:** 008
- **Status:** written in a fresh context whose only inputs were
  `constitution.md`, `AGENTS.md`, this slice's `spec.md` and the code named
  below — the autonomous-mode substitute for the approval pause (AGENTS.md §2)
- **Date:** 2026-08-29
- **Spec:** `specs/008-publish-flag/spec.md`

---

## The shape of the change

Every surface the spec lists — the module page's list, the contents panel, the
card counts, both pagers, the breadcrumbs, the emitted routes — is a view of
one derivation: `getCourse()` in `lib/content.ts`. That is the whole plan.
Filter unpublished lessons out of the course model at the one place it is
built, and every listing, count, pager and `generateStaticParams` is correct
with **zero component changes**, because none of them ever sees an unpublished
lesson to mishandle.

Two paths do not go through the course model and need their own line of code:

- **The direct request.** `getLesson()` reads the lesson file straight from
  disk, and the host renders unlisted routes on first request by running the
  page — which runs `getLesson`. The refusal therefore lives there: an
  unpublished lesson returns `null`, and the page already answers `null` with
  `notFound()`. That is the request-level enforcement the spec's decision 9
  requires, and it is the same code path in `next dev` and in production —
  spec §5 for free.
- **The landing page's entry link.** `app/page.tsx` derives it from the first
  module alone (`course[0]?.lessons[0]?.href ?? course[0]?.href`). The spec's
  decision 10 makes it the first published lesson of the *course*, so the
  derivation widens to the flattened course.

Two supporting changes in the content layer:

- **The schema learns the field.** `publish: z.boolean().optional()` — a bare
  `z.boolean()` coerces nothing, so a quoted `"false"`, a `no`, a `0` arrive
  from the YAML layer as string, string, number and fail the parse. Absent
  means published; the readers apply `!== false`.
- **A schema failure must name the file.** Today
  `lessonFrontmatterSchema.parse` sits *outside* the `try/catch` in
  `compile()` that prefixes the relative path — only MDX compile errors name
  the file; a frontmatter error surfaces as a bare `ZodError`. Criterion 2
  says "naming the file", so the lesson-frontmatter parse gets the same
  `` `${relativePath}: detail` `` wrapping convention `compile()` already
  established. Every frontmatter mistake gains the name, not just `publish` —
  the spec demands the *same gate*, and this is what makes it one.

Letters need no code at all: `getCourse` derives `letter` and `id` from
`lesson.order` via `lib/numbering.ts` *after* any filtering, never from a list
position, so a hidden `1a` leaves `1b` reading `1b`. Criterion 7 is a
verification obligation, not an implementation one.

No new dependency. No new framework API — the plan uses only calls the
codebase already makes (`notFound()`, `generateStaticParams`, `cache()`).

## File map

| File | Change |
| --- | --- |
| `lib/content-schema.ts` | Add `publish: z.boolean().optional()` to `lessonFrontmatterSchema`, with a doc comment in the file's existing style: absent means published, and only a real boolean passes — the strictness is the point. |
| `lib/content.ts` | Three changes: wrap the lesson-frontmatter parse so a failure names the file; filter `publish: false` lessons out of the course model in `listLessons`, after the read-parse-compile of every file; make `getLesson` return `null` for an unpublished lesson, after the same parse-and-compile. |
| `app/page.tsx` | Derive the entry link from the first published lesson of the whole course, falling back to the first module's page when no lesson anywhere is published. |

No other file changes. `components/` render whatever course model they are
given; `lib/numbering.ts` already derives identity from `order`; the module
routes, the styleguide and the CSS are untouched.

## The changes, in detail

### 1. `lib/content-schema.ts` — the field

```
publish: z.boolean().optional()
```

`.optional()` rather than `.default(true)`, deliberately: a default would make
`publish` required on the schema's *output* type, which `LessonFrontmatter`,
`LessonSummary` and `CourseLesson` all inherit — and `app/styleguide/page.tsx`
hand-builds `CourseLesson` specimen objects that would then fail
`strict: true` until edited. This slice has no business touching the
styleguide. With `.optional()` the specimens compile unchanged, and "absent
means published" is a one-expression rule (`publish !== false`) applied at the
two read sites.

### 2. `lib/content.ts` — naming the file on a frontmatter failure

In `readLessonFrontmatterAndBody`, the `lessonFrontmatterSchema.parse` call
moves inside a `try/catch` that rethrows as
`` new Error(`${relativePath}: ${detail}`, { cause }) `` — the exact
convention `compile()` uses two functions up, so the two failure classes read
identically in a build log. (The module-index parse in `readModule` shares the
gap; it is not a lesson and no criterion of this slice reaches it, so it is
left alone rather than fixed as a side effect.)

### 3. `lib/content.ts` — the filter

In `listLessons`, after the `Promise.all` that has read, schema-parsed and
MDX-compiled **every** lesson file in the module, drop the lessons whose
`publish` is `false`. The position is load-bearing and gets a comment saying
so: filtering at the slug stage — before the read — is the rejected
alternative the spec's decision 3 names, the one that parks a rotting draft
outside the build gate. Because every file is compiled before the filter runs,
a draft that is both unpublished and malformed still stops the build, naming
the file (criterion 9), and flipping the flag ships content that has been
passing the gate all along.

Everything downstream of `getCourse` is then correct by construction:

- `ModuleGrid` counts `moduleItem.lessons.length` — the count drops
  (criterion 3), and a module gone fully dark shows `0 lekcji`, which
  `lib/plural.ts` already renders in correct Polish (criterion 8).
- `LessonList` and the module page's `lessons.length > 0` guard — a module
  with no published lessons renders its introduction and no list, exactly the
  branch that exists today for a module with no lessons written (criterion 8).
- `ContentsPanel` maps `moduleItem.lessons` (criterion 3).
- `generateStaticParams` on the lesson route flat-maps the course — no page is
  emitted for an unpublished lesson (criterion 4). The module route's params
  come from the module list, independent of lessons, so a dark module's route
  is still emitted (criterion 8).
- `getLessonNeighbours` flattens the filtered course, so the pagers skip a
  hidden lesson by construction — including across a module boundary, and
  including the course starting later when the first lessons on disk are
  drafts: the sequence simply begins at the first published lesson, whose
  `previous` is `null` and whose control the `Pager` already omits
  (criteria 6 and 8).
- Both breadcrumbs and every `id` are derived from `order` after the filter
  (criterion 7).

### 4. `lib/content.ts` — the direct request

In `getLesson`, after the existing read-parse-compile, return `null` when
`frontmatter.publish === false`. The lesson page's first act is
`if (!lesson) notFound()`, so a direct request for an unpublished lesson gets
the site's not-found response — indistinguishable from a slug that never
existed, because it is the same `null` and the same `notFound()` (criterion
5). The refusal is data-level on purpose: a route-config alternative (refusing
params absent from `generateStaticParams`) puts the rule in a second place,
enforced by the host's machinery instead of the content layer's, and this way
`next dev` — which ignores emitted params — behaves identically, which is what
spec §5 demands.

The lesson page also fails to find the entry in the filtered course two lines
later; that would 404 as well, but it is incidental lookup order. The content
layer owns the rule; the page merely obeys it.

### 5. `app/page.tsx` — the entry link

```
const start =
  course.flatMap((m) => m.lessons)[0]?.href ?? course[0]?.href;
```

The first published lesson of the course, wherever publishing starts
(criterion 8, decision 10). The fallback keeps today's shape for the state the
spec declines to specify further — a course with no published lessons at all
sends the button to the first module's own page: a real route, not a hidden
lesson, not a not-found. The comment above the derivation is updated to say
what it now derives.

## Order of work

1. **Capture the baselines, before any code changes.** `npm run build` with
   the tree as it stands — save the printed route table to the scratchpad
   (criterion 1's "before"). Save `git diff -- content` and
   `git status --porcelain content` alongside it (criterion 10's "before" —
   the working tree already carries uncommitted content edits, so the
   criterion is measured against this snapshot, not against HEAD).
2. **Name the file on a frontmatter failure** (`lib/content.ts`). Verified
   with a temporary invalid field on one lesson — the build fails and the
   message carries `content/moduly/...mdx` — then reverted.
3. **Add `publish` to the schema** (`lib/content-schema.ts`). Verified by
   criterion 2's own staging: a temporary `publish: "false"` (quoted string)
   fails the build naming the file; reverted. An unquoted `publish: false`
   builds clean.
4. **Filter the course model and refuse the direct request**
   (`lib/content.ts`). With no content file changed, `npm run build` still
   emits the baseline route table — criterion 1 is checked here and again at
   close.
5. **Widen the landing-page derivation** (`app/page.tsx`).
6. **The verification pass** — the staged flips below, each reverted as it is
   checked, then the byte-for-byte comparison of the content tree against the
   step-1 snapshot.
7. **The fresh-context diff review** against the spec's criteria (criterion
   11, AGENTS.md §3), then close.

Steps 2–5 are candidate commit boundaries for `tasks.md`; each leaves the
build green.

## Verification

The evidence for rendered pages is read from the production build actually
serving: `npm run build`, then `npm run start`, then fetch with `curl -i` and
grep for the hrefs, ids and counts. Criteria 5, 6, 7 and 8 need the running
server (5 by definition — it is about what a server refuses, not what the
build emits); 3 can be read from the same server for one uniform evidence
trail. Criteria 1, 2, 4, 9 and 10 are build output and `git` output alone.
Every staged edit below is a flag flip (plus criterion 9's one malformed
field) applied to the tree as it stands at verification time, checked,
reverted immediately; the letters, counts and paths actually read are recorded
as the evidence, per the spec's phrasing.

| Criterion | Staging | Check |
| --- | --- | --- |
| 1 | none | `npm run build` route table byte-compares to the step-1 baseline. |
| 2 | one lesson gets `publish: "false"` (string) | build fails; output names the `.mdx` file. Revert. |
| 3 | **Stage A:** a mid-sequence lesson of the multi-lesson module — one with published lessons on both sides — gets `publish: false` | its module page's list lacks it; a sibling's contents panel lacks it; the module's card count on `/` and `/moduly` is one lower than baseline, in correct Polish. |
| 4 | Stage A | the build's route table lacks its path. |
| 5 | Stage A | `curl -i` its URL against `npm run start` → the site's not-found response; `curl -i` a slug that never existed → same status, same body. Both responses recorded. |
| 6 | Stage A | the earlier sibling's page carries "Następna lekcja" linking to the later sibling; the later's "Poprzednia lekcja" links to the earlier; the hidden lesson's href appears on neither page. Revert stage A. |
| 7 | **Stage B:** the lowest-`order` lesson of the multi-lesson module gets `publish: false` | the next-`order` lesson renders the letter its own `order` derives — not the module's first letter — in the module list, the contents panel of a sibling, the neighbouring pager, and its own breadcrumb. The letters read are the evidence. Revert. |
| 8 | **Stage C:** the first module's only lesson gets `publish: false` | the `/moduly` grid still holds the module's card, count `0` in correct Polish; the module page renders its introduction and no list; its route is in the build's table; the landing page's "Zacznij kurs" href is the first published lesson of the next module; that lesson's page has no previous control. Revert. |
| 9 | one lesson gets `publish: false` **and** an invalid frontmatter field | build fails; output names the file. Revert. |
| 10 | none — this is the proof the stagings left nothing | `git diff -- content` and `git status --porcelain content` byte-compare to the step-1 snapshot. |
| 11 | none | fresh-context review of the closing diff against the spec — no gap, nothing out of scope, no content edit, no visual change, no new dependency, no sitemap. |

## Not in this plan

- **No component or CSS change.** The components render a course model that no
  longer contains unpublished lessons; there is nothing for them to do.
- **No route-config change** (`dynamicParams` and kin) — argued in §4 above.
- **No change to `readModule`'s parse wrapping** — out of this slice's reach.
- **No dependency** — `zod` already carries the whole mechanism.
- **No sitemap, no crawler metadata** — slice 010 owns the obligation the spec
  records.
- **No content edit survives** — criterion 10 is the proof.
