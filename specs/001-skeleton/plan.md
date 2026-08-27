# Plan 001 — Skeleton

- **Date:** 2026-08-27
- **Status:** accepted
- **Spec:** [`spec.md`](spec.md)

## Stack

- Next.js, App Router, latest stable release, `app/` at the repo root
  (constitution, Article VIII). Scaffolded fresh, not copied from a template
  — read `node_modules/next/dist/docs/` before writing anything that touches
  routing or data fetching (AGENTS.md §9).
- TypeScript, `strict: true`.
- `npm` (already implied by the commands documented in `AGENTS.md` /
  `README.md`).
- `zod` — frontmatter validation, single source of truth for lesson and
  module metadata (Article VIII).
- `next-mdx-remote` (`/rsc` entry point) — MDX compilation and frontmatter
  parsing. See [ADR-0002](../../docs/adr/0002-mdx-content-pipeline.md) for
  why, and for the alternatives rejected.
- No CSS framework. A single hand-written stylesheet covers "legible": a
  system font stack, a readable measure, and nothing else. Adding a
  framework is a dependency this slice doesn't need and would itself need
  an ADR line.
- `eslint` with the standard Next.js config, for `npm run lint`.

## Content model

Two levels on disk, matching the module→lesson axis (Article VI):

```
content/moduly/NN-slug/index.mdx        module metadata (+ optional body)
content/moduly/NN-slug/lesson-slug.mdx  one lesson
```

- The module's own page is driven by `index.mdx` in its folder — frontmatter
  only needs `title`. Its position in the module list comes from the `NN-`
  folder prefix already fixed by Article VI; no separate `order` field on
  modules.
- A lesson file's frontmatter requires `title`, `order` (its position within
  the module), and `summary`. `week` stays optional and absent on the
  placeholders (Article V — no invented timetable).
- Both placeholder modules and their one lesson each live under
  `content/moduly/`, clearly named so nobody mistakes them for real content
  later (e.g. `przyklad`-style slugs and titles, not anything that reads
  like a real topic).

## Route map

```
app/layout.tsx                 root layout, <html lang="pl">, imports globals.css
app/page.tsx                   homepage — static text, link to /moduly
app/globals.css
app/moduly/page.tsx            module list — reads every module, validates, lists
app/moduly/[module]/page.tsx   one module — lists its lesson(s)
app/moduly/[module]/[lesson]/page.tsx   one lesson — renders compiled MDX body
```

`app/moduly/[module]/page.tsx` and `.../[lesson]/page.tsx` both implement
`generateStaticParams`, enumerating every module/lesson slug from disk. This
is what makes `next build` actually read and validate every content file
(see ADR-0002's consequences) — without it, a broken lesson would only fail
at request time, not at build time, contradicting Article VIII.

## Content library

```
lib/content-schema.ts   moduleFrontmatterSchema, lessonFrontmatterSchema (zod)
lib/content.ts           listModules(), getModule(slug), listLessons(moduleSlug),
                          getLesson(moduleSlug, lessonSlug)
```

`lib/content.ts` reads the filesystem (`content/moduly/`), splits each file
into frontmatter and body via `next-mdx-remote`'s `compileMDX`, and calls the
matching schema's `.parse()` — never `.safeParse()` — so a malformed file
throws instead of building with missing data. A slug that doesn't exist on
disk is a normal 404 (`notFound()` from `next/navigation`), not a schema
failure — the two cases stay distinct.

## Order of work

1. Land [ADR-0002](../../docs/adr/0002-mdx-content-pipeline.md) — already
   drafted alongside this plan; commit it as its own task before any code.
2. Scaffold the Next.js app: `package.json`, `tsconfig.json` (`strict`),
   ESLint config, root layout, `globals.css`, a homepage that still just
   says "hello" — enough for `npm run dev` and `npm run build` to succeed
   before content exists.
3. Add `lib/content-schema.ts` and `lib/content.ts`.
4. Add the two placeholder modules and their one lesson each under
   `content/moduly/`.
5. Add the three `app/moduly/...` routes, wired to `lib/content.ts`, with
   `generateStaticParams` on both dynamic segments.
6. Verify against every acceptance criterion in `spec.md`: install, dev,
   build, lint all pass; review confirms `.parse()` is used (not
   `safeParse()`) on both schemas; fresh-context diff review against
   `spec.md` before the slice closes (AGENTS.md §3).

`tasks.md` breaks this into commit-sized, independently checkable steps.
