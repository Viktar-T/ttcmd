# ADR-0010 — Syntax highlighting is computed at build, and emits CSS variables

- **Date:** 2026-08-29
- **Status:** accepted
- **Decision by:** agent, under AGENTS.md §4 (every technical choice) and §8
  (a dependency needs an ADR line saying what it replaces and why). Viktar
  vetoes by reverting one commit.
- **Slice:** 005-code-blocks, task T02.
- **Number claimed** after listing `docs/adr/` on 2026-08-29; `0009` was the
  highest.

## Context

This is a programming course and its code blocks have never been highlighted.
Constitution Article VII presumes C# and .NET for what students build, and adds
a constraint that rules out most of the easy answers:

> Code language is per-code-block metadata, never a global assumption.
> Changing the teaching stack must cost content edits — never a schema migration.

`docs/design-reference.md` asks for the same thing in the section on code
blocks, and adds the rest of slice 005: a copy control, an optional filename
header, marked lines, and scroll inside the block.

There is a second constraint, from slice 003, that decides this more than the
first one does. **`app/tokens.css` is the only file in the repository allowed to
contain a colour literal**, and `scripts/check-design-invariants.mjs` fails the
build otherwise. Syntax highlighting is the first thing in this repo with an
appetite for a dozen hues at once, and an off-the-shelf editor theme is a dozen
hues that arrive as markup — invisible to that guard, unrelated to this site's
palette, and impossible to change without changing the tool.

## Options considered

| Option | Why not |
| --- | --- |
| Highlight in the browser (Prism, highlight.js loaded client-side) | Ships a parser and a grammar to every phone in the classroom in order to colour three lines of shell. The site has no other client-side JavaScript beyond a theme toggle, and constitution Article I says it must load fast and work on a phone. |
| `rehype-highlight` (highlight.js, at build) | Class-based, so the palette would live in CSS and the guard would cover it — the right shape. Rejected on accuracy: highlight.js uses hand-written heuristic grammars, and C# is the language Article VII says must work. Being wrong about C# on the first C# lesson is the failure this slice exists to prevent. |
| `rehype-pretty-code` | Does the filename and the line ranges out of the box, which is genuinely most of slice 005's authoring surface. Rejected because it is a third dependency wrapping the second, and because the meta dialect it brings (`showLineNumbers`, word highlighting, `caption`) is wider than this slice's spec allows — we would be constraining a parser rather than writing one. Its own line-range syntax is copied here anyway; that part is a good idea. |
| Hand-roll a highlighter | ADR-0002 already rejected hand-rolling this pipeline, for the same reason. |
| **`shiki` + `@shikijs/rehype`, with a CSS-variables theme** | **Accepted.** |

## Decision

Add **`shiki`** and **`@shikijs/rehype`**, both pinned at `4.4.3`, and run the
highlighting as a rehype plugin inside the `compileMDX` calls that
`lib/content.ts` already makes — lessons and module index files alike, through
the one shared options object, so the two cannot drift.

Three configuration choices carry as much weight as the package choice, and are
part of this decision rather than details of it.

**1. The theme emits CSS variables, not colours.** `createCssVariablesTheme`
resolves every token colour to `var(--code-…)`. The generated markup therefore
contains **no colour value at all**:

```html
<span style="color:var(--code-token-keyword)">public</span>
<span style="color:var(--code-token-string-expression)">$"Zażółć </span>
```

The whole palette lives in `app/tokens.css` with everything else, slice 003's
guard covers the highlighting rather than being evaded by it, and the colours
are this site's rather than an editor's. The palette itself is ADR-0011.

**2. No language is preloaded and none is on an allow-list.** `langs: []` with
`lazy: true`: every language in shiki's bundle is available to a lesson, and
only the grammars a lesson actually uses are ever read. C# is not a configured
special case — it is one of about two hundred, which is what Article VII's
"never a global assumption" means in practice.

**3. No fallback language and no error handler.** An unrecognised language on a
fence makes the grammar load reject, the plugin's promise reject, and the build
fail. A misspelt language that silently renders grey looks like a styling bug
and is a typo; this repo already turns invalid frontmatter into a build failure
(Article VIII) and this is the same class of thing. A fence with **no** language
is different and is allowed: `defaultLanguage: "text"` gives it the surface and
no colour, because terminal output and directory trees have no language and
labelling them with one would be labelling them with a lie.

## Consequences

- **Two new build-time dependencies.** They replace nothing — the site had no
  highlighting. Both run only inside Server Components at build.
- **Nothing is shipped.** Measured, not assumed: after the build,
  `grep -rl -iE 'shiki|oniguruma|tmLanguage|textmate' .next/static/` returns
  nothing across all 12 client chunks. The string `shiki` does appear in the
  prerendered HTML, as the `class` attribute shiki writes on a `<pre>`; that is
  markup, and slice 005 replaces it with the site's own class anyway.
- **No Next.js configuration was needed.** The WebAssembly engine bundled
  cleanly under Turbopack with Next 16.3.3 — `next.config.ts` is untouched, and
  `serverExternalPackages` was not required. Recorded because the plan listed
  the opposite as the slice's first risk, and because a future Next upgrade that
  breaks it will want to know this was checked rather than lucky.
- **Build cost is one grammar today.** The content contains nine fenced blocks,
  all `bash`, in one lesson. Lazy loading means that is exactly one grammar
  read. If the wall time ever matters, the answer is a preloaded list — a plan
  change, not a silent one.
- **A new silent failure exists, and is answered.** An emitted variable that
  nobody defined makes the declaration invalid at computed-value time, so
  `color` falls back to `inherit` and that token class renders as ordinary body
  text with no error anywhere. That is the same shape as ADR-0005's missing font
  subset, and it gets the same answer: a check in
  `scripts/check-design-invariants.mjs` (Check C).
- **The variable prefix is a literal at its call site**, in
  `lib/code-highlight.ts`, because Check C reads it by a source scan — the same
  constraint, for the same reason, as `subsets` in `app/fonts.ts`.
- ADR-0002 stands unchanged. This does not revisit the choice of
  `next-mdx-remote`; it configures it, as ADR-0009 did.
