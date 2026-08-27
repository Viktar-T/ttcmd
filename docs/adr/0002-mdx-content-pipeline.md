# ADR-0002 — MDX content pipeline: next-mdx-remote over the alternatives

- **Date:** 2026-08-27
- **Status:** accepted
- **Decision by:** Viktar

## Context

Slice 001 (`specs/001-skeleton/`) needs to turn a folder of `.mdx` files under
`content/moduly/` into rendered pages, with frontmatter validated by Zod at
build time (constitution, Article VIII — Zod is the single source of truth
for lesson metadata, and an invalid lesson must fail the build).

The content lives outside `app/`, is enumerated from the filesystem by slug
(module folder, then lesson file within it), and must render inside App
Router Server Components. That shape rules out simply dropping `.mdx` files
into `app/` as routed pages.

## Options considered

| Option | Why not |
| --- | --- |
| `@next/mdx` | Compiles `.mdx` files that are themselves routed pages or statically-imported components. Does not fit a directory of content enumerated dynamically by slug at build time. |
| Contentlayer / Contentlayer2 | The original is unmaintained/archived. Both want to own the schema and generate their own typed content modules, which competes with Zod as the constitution's single source of truth rather than sitting under it. |
| Velite | Actively maintained, and uses Zod internally — but for its own collection config, generating its own typed output. Same objection as Contentlayer, smaller: it wants to own the schema, not validate a schema we already wrote. More machinery than two modules and two lessons need. |
| Hand-rolled (`fs.readdir` + `gray-matter` + `@mdx-js/mdx` `compile()`/`run()`) | This is what `next-mdx-remote` already is, maintained. Reimplementing it adds no capability, only more code and more chances to get the RSC `evaluate()` wiring wrong. |
| **`next-mdx-remote` (`/rsc` entry point)** | **Accepted.** Parses frontmatter and compiles MDX to React in one step, built for this exact case (content outside `app/`, rendered in Server Components), maintained by Vercel. Returns frontmatter as a plain object — it does not impose a schema of its own, so a hand-written Zod schema stays the single source of truth. |

## Decision

Use `next-mdx-remote`'s RSC entry point to compile lesson (and module-index)
MDX files. Validate the frontmatter it returns against a hand-written Zod
schema, using `.parse()` — never `.safeParse()` — so a missing or malformed
field throws.

## Consequences

- One new runtime dependency: `next-mdx-remote` (plus its transitive MDX
  compiler deps). `zod` is added alongside it — implied by the constitution,
  but this is the first slice that actually needs it in `package.json`.
- "Invalid lesson fails the build" (Article VIII) holds only where a route
  calls `generateStaticParams` for every module and lesson slug, because
  that is what forces every content file to be read and `.parse()`d during
  `next build` rather than lazily on first request. Slice 001's routes must
  do this. A future slice that renders content without `generateStaticParams`
  would silently skip build-time validation for that content — worth
  flagging then, not a problem to solve now.
- `.parse()` over `.safeParse()` is a discipline point, not something
  `next-mdx-remote` enforces on its own; code review must check for it.
