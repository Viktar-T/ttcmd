# plan.md — 009-mdx-components

- **Slice:** 009
- **Status:** written in a fresh context whose only inputs were
  `constitution.md`, `AGENTS.md`, this slice's `spec.md`, `docs/adr/0003-content-numbering.md`
  and the code named below. Unapproved by construction — the autonomous-mode
  substitute for the approval pause (AGENTS.md §2).
- **Date:** 2026-08-30
- **Spec:** `specs/009-mdx-components/spec.md`

---

## 1. Shape of the change

One authoring element (`Zadanie`), one rehype plugin that validates and stamps
it, one Server Component that renders it, and a numbering pass that lives where
ADR-0003 says it has to live: at the module level, in `getCourse`.

No new dependency. Everything below is built from packages already in
`package.json` — `next-mdx-remote` (the compile), `remark-gfm` and
`@shikijs/rehype` (untouched, already configured), `react`, `zod` (untouched:
no frontmatter field is added). Types for the tree are declared structurally in
the plugin file, exactly as `lib/section-anchors.ts` already declares its own
`HastNode`, so no `@types/*` package is pulled in either.

No new Next.js API is used. The only framework surfaces touched are ones the
repo already uses: async Server Components, `React.cache`, and CSS Modules
(`components/code-block.module.css` is the precedent). If the executor finds
itself reaching for a framework API anyway, `node_modules/next/dist/docs/` is
the authority, not memory (AGENTS.md §10).

Article VIII holds unchanged: `app/` stays at the root, `strict` stays on,
nothing gains `"use client"`, no route handler, no `output: 'export'`.

---

## 2. The numbering — the part that has to be right

ADR-0003: *"An exercise cannot know its own number from inside its own file …
Any plan that computes the number per-file, or stores it in frontmatter, is
wrong."* Spec §3: the number must be real text in the server-rendered HTML.
Those two together dictate the whole mechanism, so it is written out here
before any file map.

### 2.1 Where the count is taken

**In the compile that `listLessons` already runs**, through a `collect` array
handed to a rehype plugin — the same shape `rehypeSectionAnchors` already uses
for `sections` (`lib/content.ts:41-57`).

`listLessons` reads every `.mdx` in a module folder and compiles all of them
today, published or not, in order to get frontmatter and section anchors. That
pass becomes the counting pass: the plugin pushes one entry per `Zadanie` node
in document order, and `exercises.length` is the lesson's exercise count.

**Rejected: counting by scanning the raw MDX source with a regular
expression.** That is a second derivation of the same fact, and it disagrees
with the first the moment a lesson writes `<Zadanie>` inside a fenced code
block — which the corpus will do the first time a lesson teaches this element.
The count must come from the same parsed tree that renders.

### 2.2 Where the offsets are computed

**In `getCourse`, per module, after the publish filter and the `order` sort,
and nowhere else.** That single line of `listLessons`

```ts
return lessons.filter((lesson) => lesson.publish !== false).sort((a, b) => a.order - b.order);
```

is the only place in the repository where all three facts needed for an offset
exist at once: which lessons are published, what order they run in, and how
many exercises each contains. `getCourse` walks that already-filtered,
already-sorted array left to right accumulating a running total, and assigns
each lesson the total of every published lesson before it.

Three properties fall out of that position, and each one is an acceptance
criterion:

- The running total starts at 0 for every module, so module 0 — whose only
  lesson is `order: 3` — starts at 0.1 and not 0.5 (criterion 3). The offset
  comes from the accumulation, never from `order`.
- An unpublished lesson is gone before the accumulation begins, so it consumes
  no numbers and the lessons around it run continuously through the gap
  (criterion 7).
- Insert an exercise anywhere and every later lesson's offset moves, with no
  lesson file touched (criterion 6).

**Rejected: accumulating inside `listLessons` before the filter and sort** —
that counts drafts and counts in directory order, which passes on module 1
today (its files happen to sort near enough) and is wrong the first time a
lesson is renamed. **Rejected: an index into the lessons array** — the same
mistake `lib/numbering.ts` already opens by warning against for letters.

### 2.3 How the offset reaches the element

By being **stamped into the tree, as an attribute, during a second compile**.

```
getCourse()                                     ← React cache(), once per render pass
  └─ per module: listLessons()
       └─ per lesson file: compile(policy = COUNT)
            · plugin validates every <Zadanie> and pushes one entry
            · frontmatter + sections + exerciseCount kept
            · THE COMPILED BODY IS DISCARDED  (§2.4)
       └─ filter(published) → sort(order) → accumulate → exerciseOffset per lesson

getLesson(module, lesson)
  └─ await getCourse()                          ← the data dependency IS the ordering
  └─ look up { moduleNumber, exerciseOffset }
  └─ compile(policy = NUMBER { moduleNumber, offset })
       · plugin sets  number="1.7"  and  id="zadanie-1-7"  on each <Zadanie> node
  └─ body → the page → HTML text
```

The plugin runs in the rehype phase, where `mdxJsxFlowElement` nodes are
visible: `@mdx-js/mdx` passes them through `remark-rehype` untouched
(`node_modules/@mdx-js/mdx/lib/core.js:211` with `lib/node-types.js`), which is
why a rehype plugin — the same phase `rehypeSectionAnchors` already occupies —
can read and modify them. Verify that before writing the plugin; it is the one
framework fact this design rests on.

Because the number is an attribute on the node before `compileMDX` turns the
tree into JSX, the component receives it as an ordinary prop and renders it as
an ordinary text node. It is in the HTML the server sends, with no JavaScript
involved (criteria 5, 15).

**The ordering is enforced by data, not by convention.** `getLesson` cannot
produce a numbered body without awaiting `getCourse`, and `getCourse` cannot
finish without counting every lesson of every module. There is no sequence for
a future editor to remember or to break.

**Rejected: React context.** A Server Component cannot read context. Reading
one would force the exercise to become a client component, which ships
JavaScript (criterion 15) and moves the number out of the server HTML
(criterion 5). Named here because it is the reflex answer to "how does a value
get down a tree".

**Rejected: a CSS counter** (`counter-increment` / `content:`). Not searchable,
not copyable, not readable by a screen reader, and it cannot count across
files — spec §3 rules it out in as many words.

**Rejected: injecting the number at render time by cloning the compiled tree.**
`compileMDX` returns an already-created React element, not a component: its
components map and its props are fixed at the moment of compilation. There is
nothing left to inject into. This is the mechanical reason the second compile
exists.

**Rejected: a number in frontmatter or written in the element.** ADR-0003, and
the spec's own decision 2. Nothing is added to `lib/content-schema.ts` by this
slice, deliberately.

### 2.4 What happens to the un-numbered body

The counting pass compiles a body it has no offset for. That body is
**discarded, and structurally cannot be rendered**:

1. `listLessons` already drops it — it returns `{ slug, ...frontmatter,
   sections }` and nothing else (`lib/content.ts:213-235`). It keeps dropping
   it; only `exerciseCount` is added to that return.
2. In counting mode the components map binds `Zadanie` to a stub that **throws
   if it is ever rendered**, with a message saying the body was compiled for
   counting and has no number. It can never fire; that is the point. It turns
   a future refactor that starts rendering the wrong body into a loud failure
   instead of an exercise numbered `undefined` on a public page.
3. The `Exercise` component itself throws when it receives no `number` — one
   line, for the case where somebody removes the plugin from the pipeline.

The double compile is not a new cost: `listLessons` compiles a lesson and
`getLesson` compiles it again today, and the lesson page already awaits
`getCourse()` for its breadcrumb and its pager (`app/moduly/[module]/[lesson]/page.tsx:35`,
`getLessonNeighbours`). This slice adds no read of the content tree that was
not already happening.

### 2.5 Consequence for `getLesson`

`getLesson` needs the offset before it compiles, so it resolves the lesson
through `getCourse()` instead of through `readLessonSlugs` + a frontmatter
check:

```ts
const course = await getCourse();
const moduleItem = course.find((m) => m.slug === moduleSlug);
const entry = moduleItem?.lessons.find((l) => l.slug === lessonSlug);
if (!moduleItem || !entry) return null;      // unknown slug OR unpublished — the same null as today
```

**Slice 008's refusal is preserved, and so is the build gate**, but the
argument moves one function along and the comment at `lib/content.ts:338-345`
must be rewritten to say where it now lives:

- The gate is `listLessons`, which still reads, schema-parses and compiles
  **every file on disk** before the publish filter runs. A broken draft still
  fails the build today rather than on the morning its flag is flipped. That
  line does not change.
- The refusal is still data-level and still runs on first request under
  `next dev` and in production, because `getCourse` runs on this very path.
  An unpublished lesson is absent from the course model, so the lookup misses
  and the page is the site's not-found response — the same `null` a slug that
  never existed returns.

Nothing else about `getLesson` changes. `sections` still come from its own
compile; both passes produce the same section ids by §4 below.

---

## 3. The authoring element and its compile-time contract

What a lesson writes:

```mdx
<Zadanie title="Eksperyment z długością polecenia.">

Treść ćwiczenia, zwykłym Markdownem.

</Zadanie>
```

**The blank lines inside the element are required by MDX**, not by this slice:
without them the children are parsed as inline content and never become
paragraphs. The plan calls it out because every staged exercise and both
specimens have to be written that way, and because the component's stylesheet
has to space real block children (§6).

The plugin (`lib/exercises.ts`) enforces the whole contract, and refuses
everything it does not implement rather than shrugging — the precedent is
`lib/code-meta.ts`, whose header says why. Each refusal throws from inside the
compile, and `compile()` in `lib/content.ts:77-90` already prefixes the
relative path, so every message names its file with no machinery added here.

| Written | Result |
| --- | --- |
| `<Zadanie>` in a lesson, block position | counted; numbered in the render pass |
| `title="…"`, a non-empty string literal | rendered as the exercise's title |
| `title=""`, or `title={expr}` | throws — a header with no name in it, or a value the compile cannot read |
| `number=` / `id=` / any other attribute | **throws** — spec §1: a lesson writes no number and no offset of any kind (criterion 4). An author-written number is the one input that would silently defeat this slice |
| `<Zadanie/>` inline inside a paragraph (`mdxJsxTextElement`) | throws — an exercise is a block; leave a blank line before it |
| `<Zadanie>` in a module's `index.mdx` | **throws** — §5 below (criterion 13) |

Validation runs in **both** passes, so misuse fails the build even in an
unpublished lesson and even on a page nobody visits: the counting pass sees
every file in the module.

---

## 4. The fragment identifier, and why it cannot collide

`exerciseId(moduleNumber, n)` → `zadanie-1-7`. Derived from the number and from
nothing else, so criterion 8's "stable" and "containing its number" are the
same fact. Lowercase ASCII letters, digits and hyphens by construction
(Article III); the dotted form `zadanie-1.7` is a legal fragment but not a legal
identifier here, and is rejected for that reason.

Two exercises can never receive the same id: within a file the local index is
strictly increasing, and across a module the offsets are disjoint by
construction.

**A heading can.** `slugifyHeading` maps a Polish heading *"Zadanie 1.7"* to
exactly `zadanie-1-7`, and the two elements would then share an id on one page.
So `lib/section-anchors.ts` **reserves the shape**: a heading-derived id
matching `^zadanie-\d+-\d+$` is treated as already taken and gets the numeric
suffix the file's existing collision loop already mints (`zadanie-1-7-2`).

This is the same move the file already makes for `SKIP_TARGET_ID`, and its
comment already explains it: *"reserved here so a lesson heading that would
derive it … takes the numeric suffix instead of capturing the skip target."*

**Reserving by shape rather than by a list of minted ids is load-bearing.** The
counting pass has no offset and therefore mints no ids; a list-based reservation
would be empty in that pass and populated in the render pass, and the
`sections` array the contents panel renders (built in the counting pass) would
then disagree with the ids in the article's DOM (built in the render pass). A
regex is identical in both passes. The pattern is defined once, next to
`exerciseId` in `lib/numbering.ts`, and imported by the anchor plugin — one
derivation, two consumers, which is that file's stated reason for existing.

Plugin attach order becomes `[exercises, sectionAnchors, codeHighlight]`.
Correctness does not depend on it, precisely because the reservation is by
shape; it is first because a reader will expect the reservation's cause to
precede its effect.

---

## 5. Where the build failure is raised

In the plugin, from the `forbidden` policy, thrown during the compile — so
`compile()` prefixes `content/moduly/01-jak-powstaje-oprogramowanie/index.mdx:`
and the author is told which file to open. The precedent and the reason are
already written at `lib/content.ts:68-76`: a build that stops on a message the
throwing code could not attribute is a build somebody has to bisect.

The complete policy matrix — there are only three callers of `compile`:

| Caller | Policy | Why |
| --- | --- | --- |
| `readModule` (a module's `index.mdx`) | `forbidden` | an introduction is not a lesson; the module cannot number an exercise that sits outside the `order` walk (spec §6) |
| `readLessonFrontmatterAndBody` | `count` from `listLessons`, `number` from `getLesson` | §2 |
| `compileProse` (the reference surface) | the caller's, defaulting to `forbidden` | the styleguide passes an explicit numbering context; any future caller that forgets one gets a build failure rather than a page with no number on it |

**Rejected: rendering a blank, a `0` or a `?`.** The spec's decision 8, and
Article VIII's gate: a wrong number published to thirty students is worse than
a build that stops in front of its author.

---

## 6. The rendering, and the styling

`components/exercise.tsx` — a Server Component, no `"use client"`, no import of
`components/copy-button.tsx` or any other client island (criterion 15):

```
<section data-exercise id="zadanie-1-7">
  <p class="label">Zadanie 1.7</p>        ← one text node, mono, on the accent chip
  <p class="title">Eksperyment z długością polecenia.</p>   ← only when title is given
  <div class="body">{children}</div>
</section>
```

- **The label is one string, `Zadanie 1.7`.** Find-in-page for `1.7` finds it,
  a selection copy takes it, a screen reader reads a word and a number rather
  than a bare decimal (criteria 3, 9). *Rejected: the digits alone*, which is
  more prominent and less legible aloud; *rejected: a heading element*, which
  would inject a level the lesson did not choose — an exercise is meant to sit
  inline where its concept was explained, not only under `## Ćwiczenia`.
- **No title, no element and no empty bar** — the code block's `figcaption`
  precedent (`components/code-block.tsx:41-46`), and criterion 14.
- `data-exercise` is what `app/prose.css` targets, the way `data-code-block`
  already is.

`components/exercise.module.css` — colocated with the component, as the code
block's is. Every colour is a token; the file sits under `components/`, which
Check B's `SCAN_DIRS` already walks, so **no change to
`scripts/check-design-invariants.mjs` is needed** for criterion 11's first half.

The pairs, chosen so that criterion 11's ratios are ones the build already
recomputes and prints on every run (Check E's report is the record):

| Part | Tokens | Floor | Covered by Check E as |
| --- | --- | --- | --- |
| the frame, 1px, all four sides | `--rule-strong` on `--bg` | 3:1 — it is the only thing identifying the block | `--rule-strong` / `--bg` (3.69 dark, 3.64 light) |
| the number chip | `--accent-ink` on `--accent-surface` | 4.5:1 | already in `CONTRAST_FLOORS` |
| title and body | inherited `--text` on `--bg` | 4.5:1 | already in `CONTRAST_FLOORS` |

**No fill.** A tinted surface would need a token that does not exist, and
inventing one is both a Check B failure and the note/warning palette ADR-0007
still calls unverified (spec §5). `--bg-code` is the code surface and would make
an exercise look like a code block. The frame and the chip do the work.
**Not the quotation treatment**: no left rule, no indent-only — spec §5.

Sizes and rhythm come from existing tokens (`--text-base`, `--text-lg`,
`--gap-tight`, `--gap-block`, `--weight-strong`, `var(--font-mono)`); the only
new numbers are the component's own padding and radius, which is exactly what
`components/code-block.module.css` does with its local `--gutter`.

Two things the stylesheet must not get wrong:

- **Block children need their own spacing.** `app/prose.css:74` zeroes the
  margin of every `p`, `ul`, `ol`, `blockquote` *inside* `.prose`, and the
  rhythm rules only apply to `.prose > *`. An exercise's paragraphs are not
  flow children of `.prose`, so a two-paragraph exercise runs together unless
  the module sets `.body > * + * { margin-top: var(--gap-block); }`.
- **375 px** (criterion 12): padding in rem, no fixed width, nothing that can
  overflow; `.prose > *` already contributes `min-width: 0`, which is what
  keeps a long unbreakable run from widening the page (`app/prose.css:38-46`).

`app/prose.css` gains `[data-exercise]` to the set-apart pair of selectors at
lines 97 and 104, wrapped in `:where()` — **not** `:is()`. The comment above
them explains why: `:is()` would raise the rules from (0,1,1) to (0,2,0) and tie
with the `:first-child` reset below, whose guarantee the file's cascade depends
on. Two one-line edits, nothing else in that file.

---

## 7. The permanent specimen

`app/styleguide/page.tsx` gains a section, following the file's own conventions:
English labels around Polish specimen text, invented identity strings (module 7,
which that page already uses for the navigation specimens), and the specimens
compiled through `compileProse` so the real plugin and the real component run —
the argument slice 005's `CODE_SPECIMENS` constant already makes at
`app/styleguide/page.tsx:31-47`.

- A new `EXERCISE_SPECIMENS` template literal with **two** `<Zadanie>` blocks:
  one with a `title`, one without (criterion 14), the second one long enough to
  wrap at 375 px and containing two paragraphs, so the intra-exercise spacing
  of §6 is visible.
- `compileProse(EXERCISE_SPECIMENS, "app/styleguide/page.tsx (exercise specimens)", { mode: "number", moduleNumber: 7, offset: 0 })`
  → `Zadanie 7.1` / `Zadanie 7.2`, ids `zadanie-7-1` / `zadanie-7-2`, unique on
  that page and matching the invented `Ćwiczenia 7.1–7.3` the contents specimen
  already displays.
- Rendered inside `<div className="prose">`, like the code specimens, so the
  rhythm rule of §6 is under test too.
- **`SPECIMEN_LESSONS` must gain the new fields.** It is typed `CourseLesson[]`
  (`app/styleguide/page.tsx:145`), so adding required fields to that interface
  fails `next build` on this file until the two literals carry them. Give the
  second specimen `exerciseCount: 3` / `exerciseOffset: 0`, which is what its
  existing `Ćwiczenia 7.1–7.3` section entry claims.

---

## 8. File map

**Changed**

| File | What changes |
| --- | --- |
| `lib/numbering.ts` | `exerciseNumber(moduleNumber, n)` → `"1.7"`, `exerciseId(moduleNumber, n)` → `"zadanie-1-7"`, and `EXERCISE_ID_PATTERN` — the reserved shape, exported so the anchor plugin reads the same source. Asserted against the file's ASCII rule the way `slugifyHeading` is, so a future edit cannot widen it silently. Nothing existing is touched. |
| `lib/section-anchors.ts` | `rehypeSectionAnchors` treats a heading-derived id matching `EXERCISE_ID_PATTERN` as taken, so it falls through to the existing `-2` loop. Three lines and a comment, next to the `SKIP_TARGET_ID` reservation it copies. |
| `lib/content.ts` | The centre of the slice. `buildMdxOptions` takes both collectors and the exercise policy; `mdxComponents` becomes a function of the policy (binding `Exercise` under the key `Zadanie` in number mode, the throwing stub otherwise); `compile` takes and forwards the policy and returns `exercises`; `readModule` passes `forbidden`; `readLessonFrontmatterAndBody` takes the policy from its caller; `listLessons` returns `exerciseCount`; `LessonSummary` gains `exerciseCount`, `CourseLesson` gains `exerciseOffset`; `getCourse` accumulates the offsets after the filter and sort; `getLesson` resolves module and offset from `getCourse()` and compiles in number mode; `compileProse` takes an optional policy defaulting to `forbidden`. The comment at 338-345 is rewritten per §2.5. |
| `app/prose.css` | `[data-exercise]` joins the two set-apart selectors (lines 97 and 104), inside `:where()`. |
| `app/styleguide/page.tsx` | The specimen section of §7, and the two `SPECIMEN_LESSONS` literals gain the new fields. |

**Created**

| File | What lives in it |
| --- | --- |
| `lib/exercises.ts` | `rehypeExercises`, the `ExercisePolicy` union (`forbidden` / `count` / `number`), `ExerciseEntry`, the element name constant `"Zadanie"`, and every refusal in §3 with its message. Walks the tree the way `section-anchors.ts` does, over a locally declared structural node type — no new type dependency. |
| `components/exercise.tsx` | The `Exercise` Server Component of §6. The React function and the file are English (Article III: component names are ASCII English); only the MDX key an author types is `Zadanie`, which the components map supplies. |
| `components/exercise.module.css` | The treatment of §6. Tokens only. |
| `specs/009-mdx-components/verification.md` | The evidence: the numbers read off the built pages, the Check E lines, the staging/revert proof. Slice 005's `verification.md` is the precedent. |
| `specs/009-mdx-components/tasks.md` | Written next, from §9. |

**Deliberately not touched** — and the closing review should check each:
`package.json` and `package-lock.json` (criterion 1: no new dependency),
`lib/content-schema.ts` (no stored number — ADR-0003),
`scripts/check-design-invariants.mjs` (its existing scan already covers the new
files; see the conditional in §10), `app/tokens.css` (no new colour),
`next.config.ts`, every navigation component, and **everything under
`content/`** (criterion 16).

---

## 9. Order of work

One task, one commit, `009/TNN:` (AGENTS.md §5). Each closes on
`npm run build` with its output shown, plus what is named below.

1. **T01 — the numbering primitives and the anchor reservation.**
   `lib/numbering.ts`, `lib/section-anchors.ts`. Nothing renders differently
   yet. Check: build passes; the reservation's behaviour is proved in T06,
   which is where a heading can be staged against it.
2. **T02 — the plugin.** `lib/exercises.ts`, not yet wired into the pipeline.
   Every refusal in §3's table is written here. Check: build passes (the file
   is compiled and type-checked; nothing imports it yet).
3. **T03 — the component and its treatment.** `components/exercise.tsx`,
   `components/exercise.module.css`, the two lines in `app/prose.css`. Still
   unreachable from any page. Check: build passes, Check B still passes with
   the new stylesheet in its scan.
4. **T04 — wire the pipeline.** `lib/content.ts` in full, plus the
   `SPECIMEN_LESSONS` fields the type change forces. Check: build passes and
   the emitted route list is identical to the baseline captured in T00 of §10.
   Nothing yet writes a `Zadanie`, so the site is unchanged — which is the
   point of doing this before the specimen.
5. **T05 — the permanent specimen.** `app/styleguide/page.tsx`. Check: build,
   then read `/styleguide` — `Zadanie 7.1` with its title, `Zadanie 7.2`
   without and with no empty bar in its place, ids `zadanie-7-1` /
   `zadanie-7-2` present in the built HTML, both themes, and 375 px with no
   horizontal scrollbar (criteria 10, 12, 14).
6. **T06 — the numbering, proved on real lessons and reverted.** The staging
   of §10, criteria 2, 3, 5, 6, 7, 9, 12 and 13, then the revert and the
   content-tree proof (criteria 4, 16). Evidence into
   `specs/009-mdx-components/verification.md`. This task changes no source
   file; its commit carries only the verification document.
7. **T07 — close the slice.** The fresh-context review of the diff against
   `spec.md` (criterion 17, AGENTS.md §3), `tasks.md` matching reality, and the
   final report naming the criterion left open for a human eye.

The order is not arbitrary: 1–3 add code nothing calls, so each is a small diff
that the build still gates; 4 makes the mechanism live without any content
depending on it; 5 makes it visible on a page that is permanent; 6 is the only
task that touches the content tree, and it ends by proving it did not.

---

## 10. Verification staging, and getting the content tree back

Criteria 2, 3, 6, 7 and 13 cannot be checked on the reference surface: they are
about numbers that span files, and a synthetic fixture would demonstrate a
parallel derivation rather than the one the site runs (spec, decision 9). They
are staged in real lessons and reverted.

### T00 — before anything is staged

Three baselines, all written **outside the repository** (the session's
scratchpad), so the baseline itself never appears as an untracked file:

```bash
npm run build > "$SCRATCH/build-before.txt" 2>&1      # the route list and the Check E report
cp -r content "$SCRATCH/content-baseline"
find content -type f -print0 | sort -z | xargs -0 sha256sum > "$SCRATCH/content.sha256"
find content -type f | wc -l > "$SCRATCH/content-count.txt"
npm run check:content > "$SCRATCH/style-before.txt" 2>&1
```

> **Do not revert with `git checkout -- content/` or `git restore content/`.**
> As this slice opens, seven files under `content/` carry uncommitted edits and
> two paths there are untracked. Either command would delete Viktar's
> unfinished work, and the loss would look exactly like a successful revert.
> The copy above is the only safe way back.

### What gets staged

The counts below were read off the corpus; if they differ when the executor
looks, the corpus changed and the expected ranges must be recomputed, not
forced.

| Order | File (`content/moduly/01-jak-powstaje-oprogramowanie/`) | Exercises | Expected |
| --- | --- | --- | --- |
| 2 | `od-podpowiedzi-do-agenta.mdx` | 4 | 1.1 – 1.4 |
| 3 | `co-model-naprawde-potrafi.mdx` | 5 | 1.5 – 1.9 |
| 4 | `na-zywo-agent-buduje-aplikacje.mdx` | 5 | 1.10 – 1.14 |
| 5 | `nowy-warsztat-programisty.mdx` | 5 | 1.15 – 1.19 |
| 6 | `vibe-coding-kontra-inzynieria.mdx` | 5 | 1.20 – 1.24 |
| 7 | `jak-nie-wypasc-z-obiegu.mdx` | 5 | 1.25 – 1.29 |

Module 1 has no lesson at `order: 1`; the module still starts at 1.1, which is
the same property criterion 3 checks on module 0.

- **Criterion 2** — convert all 29 items of the six *Ćwiczenia* lists into
  `<Zadanie>` blocks (the four bold lead-ins named in spec §1 become `title`).
  Read the numbers off the built pages, not off the source.
- **Criterion 3** — the same for the four items in
  `content/moduly/00-start/git-i-github.mdx` (`order: 3`) → 0.1 – 0.4.
- **Criterion 4** — with the tree staged,
  `grep -rnE "Zadanie [0-9]+\.[0-9]+|\b[01]\.[0-9]{1,2}\b" content/moduly/`
  must find no rendered number and no offset in any source file. (The bare
  numeric form will also match dates and version strings; read the hits rather
  than counting them.)
- **Criterion 5** — grep the prerendered HTML under `.next/server/app/moduly/…`
  for `Zadanie 1.7` and `id="zadanie-1-7"`. Confirm the emitted path from the
  build output rather than assuming it.
- **Criterion 6** — add one `<Zadanie>` to the `order: 2` lesson; every number
  from 1.5 up shifts by one, in five other files, with nothing else edited.
- **Criterion 7** — set `publish: false` on the `order: 4` lesson; the module
  reads 1.1 – 1.24 with orders 5–7 continuing at 1.10, and the route is gone.
- **Criterion 9** — find-in-page and select-and-copy are browser actions. The
  property follows structurally from criterion 5 (a text node, no `content:`
  counter, nothing `aria-hidden`), but if the executor cannot drive a browser,
  the box stays unchecked and the final report says so (AGENTS.md §3).
- **Criterion 12** — one staged lesson at 375 px, alongside T05's check on the
  reference surface.
- **Criterion 13** — one `<Zadanie>` in
  `content/moduly/01-jak-powstaje-oprogramowanie/index.mdx`; the build must fail
  naming that path. Stage the two other refusals in the same task — an
  author-written `number=` and an inline `<Zadanie/>` — since both are cheap and
  both are the shapes criterion 4 depends on being impossible.
- **Criterion 11** — no staging. The pairs of §6 are already in Check E's
  table, so every build prints the ratios; copy the report into
  `verification.md`. **If the executor's treatment ends up using a pair that is
  not in `CONTRAST_FLOORS`, add it there** — that file is the existing guard and
  extending its table is inside this slice, whereas leaving a promise unchecked
  is the failure mode the whole script exists to prevent.

### The revert, and its proof

Restore the staged files from `$SCRATCH/content-baseline`, then:

```bash
find content -type f | wc -l                 # equals content-count.txt — no file added or lost
sha256sum -c "$SCRATCH/content.sha256"       # every file byte-for-byte
npm run check:content | diff - "$SCRATCH/style-before.txt"
npm run build | diff - "$SCRATCH/build-before.txt"   # route list identical; expect only the specimen's page-size line to move
```

The hash manifest is the proof for criterion 16; the file count is what catches
a file added during staging that a manifest check alone would not flag. Never
`git add` anything under `content/` during this slice.

---

## 11. What will be got wrong if this plan is followed carelessly

- **Numbering from the local index.** Every check on one lesson passes, and
  every check on the first lesson of a module passes. Criterion 2 spans six
  lessons because that is the only shape of check that catches it (ADR-0003;
  spec, *Notes for the reviewer*).
- **Accumulating before the filter and the sort.** Produces a sequence that is
  right today and wrong the first time a lesson is unpublished or reordered —
  criteria 6 and 7 exist for exactly this.
- **Reverting with git.** See the warning in §10. This is the only step in the
  slice that can destroy work that is not this slice's.
- **A tinted background on the exercise.** It is the obvious way to make a block
  "unmissable", it needs a token that does not exist, and it is a Check B
  failure and an ADR-0007 violation at once.
