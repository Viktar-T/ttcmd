# plan.md — 010-sources-and-figures

- **Slice:** 010
- **Status:** written in a fresh context whose only inputs were
  `constitution.md`, `AGENTS.md`, this slice's `spec.md`, and the documents and
  code named below — `docs/adr/0012-structural-rule-value.md`,
  `docs/content-style.md` (§Quotations, §Mechanics), `specs/009-mdx-components/plan.md`,
  `lib/`, `components/`, `app/`, `scripts/check-design-invariants.mjs`,
  `package.json` and two lessons. Unapproved by construction — the
  autonomous-mode substitute for the approval pause (AGENTS.md §2).
- **Date:** 2026-08-30
- **Spec:** `specs/010-sources-and-figures/spec.md`

---

## 1. Shape of the change

Six authoring elements, **two rehype plugins**, **seven Server Components**,
**three CSS Modules and four edits to one global stylesheet**, and a change to
the compile pipeline that turns two per-compile collectors into three and adds
one post-compile check.

| Thing | What it is | Where |
| --- | --- | --- |
| `rehypeBlocks` | a rehype plugin: validates the six elements, refuses everything it does not implement, collects the URLs written in their attributes | `lib/blocks.ts` |
| `rehypeLinks` | a rehype plugin: classifies every anchor in the tree, stamps the external ones, collects the internal ones | `lib/links.ts` |
| `classifyLink` / `externalLinkProps` / `deepLink` / `resolveInternalLinks` | plain functions, no plugin, no React | `lib/links.ts` |
| `parseContentDate` / `formatDateProse` / `formatDateList` | plain functions | `lib/dates.ts` |
| `Quote`, `Figure`, `Sources`, `SourceEntry`, `FurtherReading`, `ReadingItem`, `ProseLink` | Server Components — no `"use client"`, no hooks, no event handlers, no client island imported | `components/` |
| `quote.module.css`, `figure.module.css`, `reference-list.module.css` | CSS Modules colocated with their components, as `components/exercise.module.css` is | `components/` |
| the rhythm, the list reset, the external mark, the figure's width | four edits to `app/prose.css` | `app/` |
| the collectors, the line offset, the post-compile check | `lib/content.ts` | `lib/` |

**No new dependency, and here is the proof.** Everything above is built from
what `package.json` already lists: `next-mdx-remote` (the compile),
`remark-gfm` and `@shikijs/rehype`/`shiki` (untouched, already configured),
`react`, and Node built-ins. `zod` is untouched — **no frontmatter field is
added** (spec, *Out of scope*: "A frontmatter field for sources"). URL parsing
and `URLSearchParams` are web/Node globals, not a package. Tree node types are
declared structurally inside each plugin file, exactly as `lib/section-anchors.ts`
declares its own `HastNode` and `lib/exercises.ts` its own `JsxNode`, so no
`@types/*` package is pulled in either; `import type { Root } from "hast"`
already resolves in this repo (both existing plugins do it). Nothing is added to
`devDependencies`. Criterion 1's "no new dependency in the manifest" is
therefore a property of the design, not something to remember at the end.

**No new Next.js API.** The only framework surfaces touched are ones the repo
already uses: async Server Components, `React.cache`, CSS Modules. If the
executor finds itself reaching for a framework API anyway,
`node_modules/next/dist/docs/` is the authority, not memory (AGENTS.md §10).

Article VIII holds unchanged: `app/` stays at the root, `strict` stays on,
nothing gains `"use client"` (criterion 20), no route handler, no
`output: 'export'`. The whole treatment — classification, validation,
resolution, deep-linking, date formatting — runs during `npm run build`; a
browser is handed HTML and one stylesheet rule.

---

## 2. The link mechanism — the part that has to be right

The spec's *Notes for the reviewer* name the likeliest failure: **a second
definition of "external"**, and a sources list rendering raw anchors while prose
anchors get the treatment. Everything in this section exists to make both
unconstructible, so it is written out before the file map.

### 2.1 One classifier, three consumers

`lib/links.ts` exports exactly one function that answers *what kind of link is
this*:

```ts
export type LinkKind =
  | { kind: "external"; href: string }
  | { kind: "internal"; href: string; target: string }  // target = href minus #fragment
  | { kind: "refused"; href: string; why: string };

export function classifyLink(href: string): LinkKind;
```

The rules, in order:

1. `https://…` or `http://…` → **external**.
2. begins with `/` → **internal**. The `#fragment` is split off and discarded
   here; validating it is out of scope (spec, *Out of scope*), and the split
   happens in the classifier so that both the check and the anchor see the same
   `target`. A query string is **not** split off: nothing in the corpus writes
   one, and leaving it attached means it simply fails to match a target and is
   refused, which is the "refuse rather than guess" behaviour the spec asks for.
3. anything else — `mailto:`, `tel:`, `./relative`, a bare `#fragment`, a
   protocol-relative `//host` → **refused**, with a message naming the href.
   Spec, *Out of scope*: "the build refuses them rather than guessing". The
   corpus writes none today (checked: `grep -rnE "\]\((mailto:|tel:|\.\.?/)" content/`
   and `grep -rn "](#" content/` both return nothing).

Three consumers, and **no fourth**:

- `rehypeLinks` calls it for every `a` element in the tree.
- `rehypeBlocks` calls it for every URL-bearing attribute of the six elements
  (`url`, `transcript`, `sourceUrl`).
- `ProseLink` — the Server Component every element renders its links through —
  calls it at render time.

**Rejected: a regex in the check and a `startsWith("http")` in the component.**
That is the drift criterion 15 exists to catch, and it fails in the direction
that publishes: a link validated as internal and rendered as external opens a
new tab onto a 404.

### 2.2 Where the set of valid targets comes from

**From `getCourse()`'s own return value, and from nothing else.** `CourseModule.href`
is already `/moduly/${slug}` and `CourseLesson.href` is already
`/moduly/${slug}/${lesson.slug}`, computed in `lib/content.ts` for the
navigation. The target set is

```ts
new Set([
  ...SITE_ROUTES,                                   // "/" and "/moduly"
  ...course.flatMap((m) => [m.href, ...m.lessons.map((l) => l.href)]),
]);
```

and `course.lessons` is already the published, `order`-sorted array, so
"published" needs no second expression anywhere.

**Rejected: a second walk of `content/moduly/` inside the checker**, or a scan
in `scripts/check-design-invariants.mjs`. Either would be a second derivation of
the content model — it would have to re-implement the publish rule, the module
prefix rule and the slug rule, and it would disagree with the first one the day
any of the three changes. The whole point of ADR-0003's argument, applied to a
different fact.

`SITE_ROUTES` is a two-entry constant in `lib/links.ts`: the site's non-content
routes a lesson may legitimately link to, `/` and `/moduly`, which are real
routes (`app/page.tsx`, `app/moduly/page.tsx`). `/styleguide` is deliberately
**not** in it: it is a maintainer's instrument that nothing links to, and a
lesson linking to it is a mistake worth stopping. Adding an entry is a
deliberate edit with a comment, not a pattern.

**Telling apart "does not exist" from "exists but is not published"** — criterion
14 wants the message to say which. On the failure path only, the checker calls
the existing `readLessonSlugs(moduleSlug)` (guarded with a try/catch for a
module folder that does not exist) and asks whether a file with that slug is on
disk. That is not a second derivation of the content model: it is the same
function `listLessons` already uses, called for one module, purely to word an
error. **Rejected: widening `CourseModule` with the draft slugs** — every page
would then carry them, and `app/styleguide/page.tsx`'s `SPECIMEN_MODULES`
literals would have to invent a value for a field that exists only to word a
build failure.

### 2.3 When the check runs, and on which files

Say it plainly, because the spec's own text does not and the ordering is the
trap:

- **Classification and stamping happen during a compile**, in the rehype phase,
  where `rehypeSectionAnchors` already runs.
- **Collection happens during a compile.** Each plugin pushes
  `{ line, href }` onto a per-compile array, the same shape `collect` already
  has for sections and exercises (`lib/content.ts:54-79`).
- **Resolution happens after every compile of the course has finished**, at the
  end of `getCourse`, against the array of modules that pass has just built.

It **cannot** happen during a compile. `getCourse` is the function that runs the
compiles: `readModule` and `listLessons` are called from inside it, so at the
moment a lesson's body is being compiled the course model does not exist yet —
and `getCourse` is wrapped in React's `cache()`, so a plugin calling `getCourse()`
to ask whether a target exists would re-enter a promise that is waiting on the
very compile that made the call. The check therefore runs *after* one compile
and *after all of them*: collected in each, resolved once at the end.

**Which files are checked:** every `.mdx` file the content layer compiles, which
is every file under `content/moduly/` —

- both module `index.mdx` files, through `readModule`;
- **every lesson file on disk, published or not**, because `listLessons`
  reads, schema-parses and compiles all of them before the publish filter runs
  (`lib/content.ts:320-340`), and that position is already load-bearing for
  exactly this reason: a broken draft fails the build today rather than on the
  morning its flag is flipped.

Not checked: anything outside `content/moduly/`. In particular
`content/interesting-to-read/czterdziesci-lat-zmian.mdx` — the lesson the spec's
*Why* section says has already moved out of the course — is compiled by nothing,
rendered by no route, and therefore gets neither the link treatment nor the link
check. That is not an oversight to fix in this slice; it is what "the corpus"
means in criteria 12 and 13, and the executor should not be surprised when the
counts do not match the spec's prose.

**Consequence, stated because it will be met during verification:** the rule of
spec §6 is unconditional, so a *draft* linking to another *draft* fails the
build. **Rejected: exempting unpublished lessons from the check** — the spec
states the rule without qualifying it by the linking file, and an exemption
would be the one place where an unresolvable link is allowed to sit until
somebody flips a flag, which is the shape of failure this slice removes.

`getLesson`'s render-pass compile collects links too, and they are discarded:
they are the same links the counting pass already collected and resolved, and
`getLesson` cannot run without awaiting `getCourse()` first (`lib/content.ts:487`).
`compileProse` — the reference surface — is the one caller outside the course
walk; it awaits `getCourse()` and calls the same resolver on its own collected
links. **That is deliberate:** the specimen's internal link is resolved by the
same function against the same targets, which is what makes criterion 17's
"an internal link in prose" worth having on that page.

> **The re-entrancy trap, written down because it is invisible until it hangs:**
> inside `getCourse`, resolve against the local `modules` array. Never against
> `await getCourse()`. `compileProse` may await it; `getCourse` may not.

### 2.4 The rendered anchor, and why it cannot drift from the check

Two code paths necessarily render an anchor, because they start from different
things:

- an anchor written as Markdown is already an `element` node in the tree, so
  `rehypeLinks` writes onto `node.properties`;
- an anchor built from an element's attribute does not exist at compile time, so
  `ProseLink` creates it at render.

What they must not do is disagree about *what* to write. So the attributes are
produced by one function returning one plain object, which both paths apply
verbatim:

```ts
export function externalLinkProps() {
  return { target: "_blank", rel: "noopener noreferrer", "data-external": "" };
}
```

hast `properties` and JSX props both accept that object as-is. `rehypeLinks`
does `node.properties = { ...node.properties, ...externalLinkProps() }`;
`ProseLink` spreads it into `<a>`. There is no second spelling to keep in step.

**The visible mark is CSS, keyed on `data-external`, and it is one rule:**

```css
.prose a[data-external]::after { content: "↗" / "(link zewnętrzny)"; }
```

- It is **visible** — the glyph.
- It is **available to a reader not looking at the screen** — the string after
  the slash is CSS generated-content alternative text, which is what assistive
  technology announces in place of the glyph. Where the alternative-text syntax
  is not supported the glyph itself is announced or ignored, which is no worse
  than today.
- It is **one derivation**: both paths set the same attribute, one stylesheet
  draws the mark, and a link built by `Zrodlo` cannot end up unmarked while a
  link in the paragraph above it is marked. That is criterion 15, made
  structural rather than checked.

**Rejected: appending a `<span>` in the plugin and again in the component.** Two
spellings of the same markup, in two languages (hast and JSX), is precisely the
drift the reviewer's note warns about. **Rejected: `aria-label` on the anchor** —
it replaces the accessible name instead of adding to it, so a sources list of
thirty entries would lose thirty link titles.

Two details the stylesheet must get right: the mark is inside `.prose` (every
one of these elements renders inside the lesson's `.prose` container, and so do
the specimens), and the glyph must not wrap onto a line of its own — give the
`::after` a leading no-break space, or `white-space: nowrap` on it.

**Rejected: mapping `a` to `next/link` in `mdxComponents`.** It would make the
prose path and the component path structurally different, and it ships client
JavaScript for a criterion (20) that forbids it.

---

## 3. How a refusal comes to name the file and the line

Criterion 16 wants file **and line** for every refusal in criteria 5, 7, 10, 13
and 14. Today the repository has half of that, and the missing half has a cause
worth knowing before any plugin is written.

### 3.1 Where the file name is prefixed today

In `compile()`, `lib/content.ts:123-141`:

```ts
} catch (error) {
  const detail = error instanceof Error ? error.message : String(error);
  throw new Error(`${relativePath}: ${detail}`, { cause: error });
}
```

Every throw from inside a compile — the highlighter's, the exercise plugin's,
the section-anchor plugin's — arrives here and gains `content/moduly/…/x.mdx: `.
The comment above it says why: a build that stops on a message the throwing code
could not attribute is a build somebody has to bisect. **No line number is added,
and none is available at that point.**

### 3.2 Position survives into the rehype phase; the frontmatter offset does not

Both halves verified against this repository's own `node_modules`, not assumed:

- **Position survives.** Compiling through `next-mdx-remote`'s `serialize` with a
  probe plugin, an `a` element and an `mdxJsxFlowElement` both arrive in the
  rehype phase carrying `node.position.start.line`. MDX's JSX nodes are passed
  through `remark-rehype` untouched, which is the same fact slice 009 rests on.
- **The line is body-relative, not file-relative.** `next-mdx-remote`'s
  `serialize` calls `matter(vfile, { strip: true })` *before* compiling
  (`node_modules/next-mdx-remote/dist/serialize.js`), and `vfile-matter`'s strip
  is `document.slice(match[0].length)` — the frontmatter block is **removed, not
  blanked**. Measured: a paragraph on file line 6, under a four-line frontmatter
  block, is reported at line 2.

So:

```
fileLine = reportedLine + (number of line terminators in the frontmatter block)
```

That offset is computed **once, in `compile()`**, which is the one place that
holds the raw `source` and already owns the message:

```ts
const FRONTMATTER = /^---(?:\r?\n|\r)(?:[\s\S]*?(?:\r?\n|\r))?---(?:\r?\n|\r|$)/;

function frontmatterLineOffset(source: string): number {
  const match = FRONTMATTER.exec(source);
  if (!match) {
    if (source.startsWith("---")) throw new Error(/* … */);
    return 0;
  }
  return (match[0].match(/\r\n|\r|\n/g) ?? []).length;
}
```

The regex is the shape `vfile-matter` uses. The guard is the point of it: a file
that opens with `---` but whose block this helper cannot match would silently
produce line numbers off by five, so it stops the build instead.

**Rejected: importing `vfile-matter` (or `vfile`) directly** to reuse its
matcher. Neither is in `package.json`; reaching into a transitive dependency is
adding an undeclared one, which AGENTS.md §8 makes an ADR-sized decision.

For `compileProse`, the source is a template literal with no frontmatter, the
offset is 0, and the number reported is the line **inside the literal**. The
label already names the file (`app/styleguide/page.tsx (…)`); say so in the
message rather than pretending it is a file line.

### 3.3 An error thrown inside a compile loses everything except its text

`serialize` wraps it:

```js
catch (error) { throw createFormattedMDXError(error, String(vfile)); }
```

`createFormattedMDXError` constructs a **new plain `Error`** and interpolates
`error.message`. So a custom error class, a `line` property, a `cause` — none of
it survives out of `compileMDX`. Worse, if the thrown error carries a `position`
property, that function prints a `@babel/code-frame` excerpt **of the stripped
source**, labelled with body-relative line numbers: a correct-looking frame with
wrong numbers beside a correct one. Do not set `position` on anything thrown.

### 3.4 The mechanism: collect the refusals, raise them in `compile()`

Because of §3.3, a plugin cannot throw and keep a line. So it does not throw.

Both new plugins take a `problems: ContentProblem[]` collector alongside their
other collectors, and push instead of throwing:

```ts
export interface ContentProblem { line: number; message: string }   // line: body-relative
```

`compile()`, **after `compileMDX` resolves**, converts and raises:

```ts
if (problems.length > 0) {
  const offset = frontmatterLineOffset(source);
  throw new Error(
    problems.map((p) => `${relativePath}:${p.line + offset}: ${p.message}`).join("\n\n")
  );
}
```

Four properties fall out, and each is an acceptance criterion or a working
convenience:

- Every refusal reads `content/moduly/01-…/x.mdx:214: …` — file and line
  (criterion 16).
- One place composes the location. The plugins know neither the path nor the
  offset, so there is nothing to keep in step.
- **All refusals in a file are reported in one run**, not one per build.
- Nothing is wrapped, because nothing is thrown from inside the compile.

The collected internal links take the same treatment: `compile()` stamps
`{ path: relativePath, line: line + offset, href }` onto each before returning
them, so `getCourse`'s resolver throws `${use.path}:${use.line}: …` with no
second offset computation anywhere (criteria 13, 14, 16).

`compile()`'s existing `catch` block stays exactly as it is. Slice 009's plugin
keeps throwing and keeps getting the path-only prefix; converting it is not this
slice's work.

### 3.5 What must still be verified before the plugin is written

The two facts above were measured with a throwaway probe outside the repository,
against this repository's `node_modules`. Before `lib/blocks.ts` is written,
**reproduce the offset end to end on a real lesson**: stage one refusable
element at a known line in
`content/moduly/01-jak-powstaje-oprogramowanie/vibe-coding-kontra-inzynieria.mdx`,
run `npm run build`, and confirm the reported line is the line the editor shows.
If it is off by a constant, the constant is the frontmatter block and
`frontmatterLineOffset` is what is wrong — not the plugin. Do this once, early
(it is T05's check), rather than discovering it while staging six refusals.

One consequence of §3.3 worth recording, because it also constrains §4:
**`next-mdx-remote` deletes expression-valued attributes and spread attributes
in the remark phase**, before any rehype plugin sees them
(`dist/plugins/remove-javascript-expressions.js`, added whenever `blockJS` is
true, which is the default and is what this repo uses). Measured: `date={ZMIENNA}`
on an element simply is not in `node.attributes` by the time the plugin runs. So
a plugin **cannot** refuse an expression attribute by seeing it — it can only
observe that a required attribute is absent. Every "missing required attribute"
message must therefore say that a value written as `{…}` is removed before this
check and looks identical to a value that was never written. (The same fact
makes `lib/exercises.ts`'s `title={expr}` and spread-attribute branches
unreachable. That is an existing condition, not this slice's to change.)

---

## 4. The six elements and their compile-time contract

Element names are **Polish ASCII**; attribute names are **English ASCII**
(spec §1, Article III, slice 009's `Zadanie title="…"`). Four are the ones an
author reaches for; two are entry children.

### 4.1 What a lesson writes

```mdx
<Cytat
  author="Andrej Karpathy"
  source="X"
  date="2025-02-02"
  url="https://x.com/karpathy/status/1886192184808149383">

Jest nowy rodzaj kodowania, który nazywam „vibe codingiem”…

</Cytat>

<Rysunek caption="Pięć warstw pracy z AI." source="analiza Stanford (Denisov-Blanch, 2025)" sourceUrl="https://…">

<svg viewBox="0 0 720 300" role="img" aria-label="…">…</svg>

</Rysunek>

<Zrodla checked="2026-08-29">

<Zrodlo title="Introducing the Model Context Protocol" publisher="Anthropic" date="2024-11-25" url="https://www.anthropic.com/news/model-context-protocol" />

<Zrodlo title="DHH: Future of Programming…" publisher="Lex Fridman Podcast #501" date="2026-08" url="https://www.youtube.com/watch?v=NYFGCESmikA">o „linii podziału” od 7:55; pełny zapis: [lexfridman.com/dhh-2-transcript](https://lexfridman.com/dhh-2-transcript/)</Zrodlo>

</Zrodla>

<CzytajDalej>

<Lektura kind="dokumentacja" title="Best practices for Claude Code" url="https://code.claude.com/docs/en/best-practices">jak wygląda praca z agentem w praktyce</Lektura>

</CzytajDalej>
```

**The blank lines between an element and its children are required by MDX**, not
by this slice: without them the children stay inline content. **A note and a
one-line recommendation are written on the same line as their opening tag** —
that is what makes them inline content rather than a paragraph, and it is
measured, not assumed: `<Zrodlo …>nota z [linkiem](…)</Zrodlo>` yields children
`[text, element:a]`, while the same content with blank lines around it yields
`[element:p]`.

### 4.2 The attributes

| Element | Attribute | Required | What it holds |
| --- | --- | --- | --- |
| `Cytat` | `author` | ✔ | a name — a person or an organisation, written the same way (spec, decision 6) |
| | `source` | ✔ | what it was said in: a podcast episode, a post, a book |
| | `date` | ✔ | `yyyy`, `yyyy-mm` or `yyyy-mm-dd` (§5) |
| | `url` | one of | the link |
| | `print` | one of | the printed locator, **in place of** a link |
| | `at` | | a moment in a recording: `m:ss`, `mm:ss` or `h:mm:ss` |
| | `transcript` | | a second link, to a transcript |
| `Rysunek` | `caption` | ✔ | the caption, rendered as HTML text outside the drawing |
| | `source` | | one line naming where the numbers came from |
| | `sourceUrl` | | a link on that line |
| `Zrodla` | `checked` | ✔ | `yyyy-mm-dd`, **full precision only** |
| `Zrodlo` | `title` | ✔ | the entry's title; it is the link text |
| | `publisher` | ✔ | who published it |
| | `date` | ✔ | the date the source itself bears; three precisions |
| | `url` | ✔ | the link |
| `CzytajDalej` | — | | takes no attributes |
| `Lektura` | `title` | ✔ | the item's title; it is the link text |
| | `url` | ✔ | the link |
| | `kind` | ✔ | one of `artykul`, `wideo`, `dokumentacja`, `kurs` |

Children: `Cytat` takes block content (the quoted words) and requires at least
one child. `Rysunek` takes the drawing and requires at least one child.
`Zrodla` takes `Zrodlo` children only; `CzytajDalej` takes `Lektura` children
only; both require at least one. `Zrodlo`'s children are an **optional** inline
note. `Lektura`'s children are a **required** inline line saying why to read it.

**`Zrodlo` has no `print` escape hatch and no `at`**, deliberately. The spec
grants a printed locator to `Cytat` only (§2) and makes a link an unconditional
requirement of an evidence entry (§4, criterion 10); a moment inside a recording
goes in the note, which is where the corpus already writes it. Do not
"helpfully" mirror `Cytat`'s affordances into `Zrodlo` — that is a spec change.

### 4.3 What each refuses

Every one of these pushes a problem and stops the build with
`path:line: message`. The precedent for refusing rather than shrugging is
`lib/code-meta.ts`, whose header says why: a parser that silently ignores what it
does not implement drops something the author wrote and leaves them looking for
a styling bug that is not there.

| Written | Result |
| --- | --- |
| an unknown attribute | throws, naming it and listing the ones this element takes |
| a required attribute absent or empty | throws — **and the message says a value written as `{…}` is deleted before this check and looks identical to absent** (§3.5) |
| the element inline, inside a paragraph (`mdxJsxTextElement`) | throws — it is a block; leave a blank line before it |
| an element that requires children written self-closing or empty | throws |
| `Cytat` with neither `url` nor `print`, or with both | throws — spec §2, criterion 5 |
| `Cytat` with `at` and no `url` | throws |
| `Cytat` with `at` on a host the deep-link table does not know | throws, naming the host — spec, decision 8 |
| `at` that is not `m:ss` / `mm:ss` / `h:mm:ss` | throws |
| a `date` that is not `yyyy`, `yyyy-mm` or `yyyy-mm-dd`, or that names an impossible day | throws |
| `Zrodla checked="2026-08"` | throws — *Stan na* names a day |
| a child of `Zrodla` that is not `Zrodlo` (a paragraph, a list, a `Lektura`) | throws — criterion 10 |
| a `Zrodlo` whose parent is not `Zrodla`; a `Lektura` whose parent is not `CzytajDalej` | throws — criterion 10 |
| a note or a recommendation written as a block (children contain `p`, `ul`, `ol`, `blockquote`, or a flow JSX element) | throws — spec, decision 10: one line of inline text |
| `Lektura kind="podcast"` | throws, listing the four — spec, decision 12 |
| `Lektura date="…"` | throws, with its own message: further reading carries no date; if the entry backs a claim it belongs in `Zrodla` — spec §5 |
| `Rysunek sourceUrl` with no `source` | throws |
| any of the six in a module's `index.mdx` | **allowed** — spec §1 says these are available in a module introduction, unlike `Zadanie` |

**There is no render-time backstop for nesting, and there cannot be.** A Server
Component cannot read React context, and a parent cannot inject props into MDX
children without cloning the compiled tree. The plugin is the whole guarantee
for "an entry element outside its list" — which is why it walks with parent
context (`visit(node, parentName)`), the way `lib/exercises.ts` already walks
with `insideExercise`. Each component still throws when a required prop is
missing, as `components/exercise.tsx` does, for the day somebody wires a compile
without the plugin.

Validation runs in **every** compile — the counting pass, the render pass, the
module index and `compileProse` — so misuse fails the build even in an
unpublished lesson and even on a page nobody visits.

### 4.4 The Polish the elements supply

The author writes no connective text; the elements do. Every fixed
student-facing string this slice introduces lives in **one exported constant
object in `lib/blocks.ts`**, so Viktar can reword the lot in one place
(AGENTS.md §7 — he rewrites anything student-facing).

| Where | String |
| --- | --- |
| `Zrodla`, the checked line | `Stan na **yyyy-mm-dd**.` — the form `docs/content-style.md` §Mechanics prescribes, verbatim |
| `Rysunek`, before the data source | `Dane: ` |
| `Cytat`, before a timestamp | `od 7:55` |
| `Cytat`, the transcript link | `Pełny zapis: ` |
| `Cytat`, a print source | `Wydanie drukowane: ` |
| `Lektura`, the four kinds | `artykuł` · `wideo` · `dokumentacja` · `kurs` |
| the external mark's alternative text | `(link zewnętrzny)` |
| month names | two tables — §5 |

The transcript link's **text is derived from its URL** — host without `www.`,
plus the path with a trailing slash trimmed, giving `lexfridman.com/dhh-2-transcript`,
which is exactly what the corpus writes by hand today and satisfies §Mechanics'
"link text names the thing". **Rejected: a `transcriptTitle` attribute** — an
eighth attribute on `Cytat` to say something the URL already says.

---

## 5. Dates — one written form in, two visible forms out

`lib/dates.ts`, three functions and two tables. It is one module rather than a
helper per element because the spec's decision 4 is precisely that the *element*
chooses the visible form and the *author* never does — and three copies of the
formatter is how one list in this corpus came to mix `dd.mm.yyyy`, `yyyy-mm-dd`
and a month in words.

```ts
export interface ContentDate { year: number; month?: number; day?: number }
export function parseContentDate(value: string): ContentDate;  // throws on shape or on an impossible day
export function formatDateProse(d: ContentDate): string;       // 2 lutego 2025 · sierpień 2026 · 2019
export function formatDateList(d: ContentDate): string;        // 02.02.2025 · 08.2026 · 2019
export function formatDateIso(d: ContentDate): string;         // 2025-02-02 — the machine-readable form
```

**Three precisions in, and the rendering never invents one** (spec §7, decision
5). `yyyy-mm-dd` → all three parts; `yyyy-mm` → month and year; `yyyy` → year.

**Two visible forms out**, per `docs/content-style.md` §Mechanics:

| Where | Function | Example |
| --- | --- | --- |
| `Cytat`'s attribution — it reads as a sentence | `formatDateProse` | `2 lutego 2025` |
| `Zrodlo`'s row — the sources list | `formatDateList` | `02.02.2025` |
| `Zrodla checked` — after *Stan na* | `formatDateIso` | `2026-08-29` |

**Two month tables, not one, and this is the detail that gets got wrong.**
Polish inflects: a day-month-year date takes the genitive (*24 listopada 2025*),
a month standing alone takes the nominative (*sierpień 2026*). The corpus
already writes both — `— Lex Fridman Podcast #501, sierpień 2026` in one sources
list, `18 kwietnia 2023` in an attribution. One table produces `24 listopad 2025`
or `sierpnia 2026`, and neither is a build failure.

**Rejected: `Intl.DateTimeFormat("pl-PL")`.** It needs no table and no
dependency, and it is right on a full-ICU Node — but on a small-ICU build it
falls back to English silently, on a public page, with no error. That is the
same class of failure as ADR-0005's missing font subset and Check C's undefined
variable. `lib/section-anchors.ts` already answers this question for a different
Polish mapping and answers it the same way: the table is written out, with a
comment saying why.

Every rendered date is wrapped in `<time dateTime={formatDateIso(d)}>`, so the
machine-readable form the author wrote is still in the HTML beside the human one.

**The timestamp and the deep link** live in `lib/links.ts`, next to the
classifier, because they are about URLs:

```ts
export function parseTimestamp(at: string): number;             // "7:55" → 475
export function deepLink(url: string, at?: string): string;     // throws on a host it cannot address
```

The table it knows: `youtube.com`, `www.youtube.com`, `m.youtube.com`,
`youtu.be` — set the `t` search parameter to the seconds, using the `URL` global.
Any other host throws, naming it, and the plugin turns that into a build failure
(spec, decision 8: rendering the moment as text beside a link that opens at the
start is a promise the page quietly breaks). The plugin calls `deepLink` to
**validate** and throws away the result; the component calls it to **render**.
One derivation, two consumers — the same shape as the classifier and the dates.

---

## 6. The treatment, and which line is the boundary

Every colour is an existing token. `components/` is already inside Check B's
`SCAN_DIRS`, so **no change to `scripts/check-design-invariants.mjs` is needed**
for criterion 18's first half, and no token is added to `app/tokens.css`.

**The rule that decides every line in this section** is the spec's decision 17,
which is ADR-0012 applied: *the strong rule value draws the edge of a block; the
ordinary rule separates rows inside one.*

| Element | The boundary line — `--rule-strong`, 1px | The inner line — `--rule`, 1px |
| --- | --- | --- |
| `Cytat` | a rule **above and below** the block | none |
| `Rysunek` | a rule **below the caption**, closing the figure | none |
| `Zrodla` | a rule **above and below** the list | between entries |
| `CzytajDalej` | a rule **above and below** the list | between entries |

Those are the lines criterion 18 is about, and every one of them is
`--rule-strong` on `--bg`, a pair Check E already recomputes and prints on every
build (3.69:1 dark, 3.64:1 light, floor 3). The inner separators are decorative —
they separate rows inside a block whose edges are already drawn — which is
ADR-0012's stated exemption, and `--rule` is 1.47:1 by design. **Do not add
`--rule`/`--bg` to `CONTRAST_FLOORS`**: it would fail, and it would be asserting
a promise ADR-0012 deliberately does not make.

The other pairs used are `--text` on `--bg`, `--text-muted` on `--bg` and
`--link` on `--bg` — all three already in `CONTRAST_FLOORS`. **No pair used by
this slice is outside Check E's table**, which is what criterion 18's "ratios
computed by the existing check, not by hand" needs.

**`Cytat` — visibly not a blockquote, visibly not an exercise.** Structure:

```
<figure data-quote>
  <blockquote>{children}</blockquote>
  <figcaption>— Autor, <a>Źródło</a>, od 7:55, <time>2 lutego 2025</time> · Pełny zapis: <a>…</a></figcaption>
</figure>
```

- Rules above and below, no left rule, no fill. A Markdown blockquote on this
  site is a 2px **left** rule in `--rule-quote` with an indent and nothing else
  (`app/prose.css:222-227`); a quotation bounded top and bottom with no left rule
  is a different object at a glance, in both themes.
- The attribution is `--text-sm`, `--text-muted`, in `var(--font-mono)` — on this
  site everything structural is monospace and everything you read is not.
- **Rejected: the exercise's frame or the code surface** (spec, decision 18): the
  first makes a quotation look like something to do, the second like something to
  copy. **Rejected: a heavier left rule** — `--rule-strong` is *lower* contrast
  than `--rule-quote` (which is `--text-muted`), so a "stronger" left rule would
  read as a weaker one.
- **The trap:** `<blockquote>` inside `[data-quote]` inherits `.prose blockquote`
  and would draw the left rule this element exists not to have. Neutralise it in
  `app/prose.css` with `.prose [data-quote] blockquote { border-inline-start: 0; padding-inline-start: 0; }`
  — specificity (0,2,1), deliberately higher than `.prose blockquote`'s (0,1,1),
  because a tie decided by source order is exactly what that file's own comments
  refuse to rely on. The `<blockquote>` element stays: it is what tells a screen
  reader this is a quotation.

**`Rysunek` — the caption is HTML, and the drawing keeps the width it has today.**

```
<figure data-figure>{children}<figcaption>…<span>Dane: <a>…</a></span></figcaption></figure>
```

- **The width trap, and it is the one thing in this section that is easy to miss:**
  `app/prose.css:50-53` gives `.prose > svg` the full grid column. A wrapped SVG
  is no longer a child of `.prose`, so it loses that — and would silently shrink
  to the reading measure. `[data-figure]` must join that rule
  (`.prose > svg, .prose > table, .prose > [data-figure] { grid-column: full; }`),
  and the caption inside must be constrained back to `max-width: var(--measure)`
  and centred, or it is set to the full page width and reads badly. That
  constraint is the whole argument for this element: caption at the reading
  scale, drawing at the drawing's scale.
- `min-width: 0` on the figure, because it is now the grid item and
  `.prose > *`'s guard applies to it rather than to the drawing.
- Criterion 8 is a **negative** requirement and is satisfied by not touching
  `.prose > svg`: an unwrapped diagram keeps its rule, its placement and its
  gaps exactly.

**`Zrodla` and `CzytajDalej` — one row treatment, two shapes.** Both render a
`<ul>` of `<li>`, so the list is announced as a list of *n* items. They are told
apart by structure rather than by colour (criterion 11): an evidence row leads
with its title-link and carries publisher, date and note; a further-reading row
leads with a small monospace kind label in `--text-muted` and carries no date at
all. Neither renders a heading (spec, decision 13) — the lesson keeps writing
`## Źródła`, which is what puts the section in the contents panel.

- **The list-reset trap:** `.prose :is(ul, ol)` is specificity (0,1,1) and a CSS
  Module class is (0,1,0), so `list-style: none; padding-inline-start: 0` written
  in `reference-list.module.css` **loses**. The reset goes in `app/prose.css`,
  keyed on the data attributes, the way `[data-code-block]` and `[data-exercise]`
  are already handled there.

**`app/prose.css` — four edits, and no more:**

1. `[data-figure]` joins the full-width pair at lines 50-53.
2. `[data-quote]`, `[data-figure]`, `[data-sources]`, `[data-further-reading]`
   join the two set-apart rhythm selectors at lines 102 and 109, **inside the
   existing `:where()`** — not `:is()`. The comment above them explains why:
   `:is()` takes its most specific argument's specificity and would tie with the
   `:first-child` reset below, whose guarantee the file's cascade depends on.
3. The blockquote neutralisation and the list reset.
4. The external-link mark, under the existing *Links* section.

**375 px** (criterion 19): every measurement is in rem or a token, nothing has a
fixed width, the rows are flow content that wraps, and the figure carries
`min-width: 0`. A long unbreakable URL rendered as link text is the one thing
that can widen a grid track — the entries' link text is a `title`, never a raw
URL, except the derived transcript label, which gets `overflow-wrap: anywhere`.

---

## 7. The permanent specimens

`app/styleguide/page.tsx` gains one section, following that file's conventions:
English labels around Polish specimen text, and the specimens **compiled through
`compileProse`** so the real plugins and the real components run — the argument
`CODE_SPECIMENS` (slice 005) and `EXERCISE_SPECIMENS` (slice 009) already make on
that page. Without it, criterion 17 has nowhere to live: no lesson uses these
elements, and migration is content-lane work.

One template literal, `SOURCE_SPECIMENS`, containing:

| Specimen | What it is there to prove |
| --- | --- |
| `Cytat` — one paragraph, a person, `url`, `at`, `transcript`, `date="2026-08-14"` | the common shape; the timestamp rendered *and* deep-linked; the transcript present and separate; the full-precision prose date (criteria 3, 4) |
| `Cytat` — several paragraphs, an organisation as `author`, `url`, no `at`, no transcript, `date="2026-08"` | multi-paragraph spacing inside the block; decision 6's "an author is a name"; the month-precision prose form, which is the nominative table (criterion 3) |
| `Cytat` — one paragraph, `print`, no `url`, `date="2019"` | the printed locator visible **in place of** the link; the year-only form (criterion 5, second half) |
| `Rysunek` — a small inline SVG, `caption` + `source` + `sourceUrl` | the caption as selectable HTML outside the drawing; the data-source line carrying a link (criterion 6) |
| `Rysunek` — the same SVG, `caption` only | a figure that asserts no measurement (criterion 6, decision 9) |
| `Zrodla` — `checked`, four `Zrodlo` entries: one plain, one whose note carries a **second link**, one with a `yyyy-mm` date, one with no note | the *Stan na* line in the prescribed form; title, publisher, date, link and note; the list date form at two precisions; the second link, which is decision 10's whole reason (criteria 9, 15) |
| `CzytajDalej` — four `Lektura` items, one per kind | all four kinds render, in Polish, and the block is visibly not the evidence list (criterion 11) |
| a paragraph with one external and one internal link | criterion 12's mark and criterion 17's last clause, on a page that is not a lesson |

**The specimen's internal link points at a real published lesson**
(`/moduly/00-start/git-i-github`), not at the invented module 7 the navigation
specimens use. It has to: `compileProse` resolves its links against the same
course model, and an invented target would have to be exempted from the check —
which is decision 19's rejected alternative ("a synthetic fixture demonstrates a
parallel derivation rather than the one the site runs") arriving by the back
door. The consequence is that renaming or unpublishing that lesson fails the
build on `app/styleguide/page.tsx`. That is the guarantee working, and the fix is
one path.

Rendered inside `<div className="prose">`, like the other specimens, so the
rhythm, the blockquote neutralisation and the external mark are all under test.

**`SPECIMEN_LESSONS` and `SPECIMEN_MODULES` are not touched.** No field is added
to `CourseLesson` or `CourseModule` by this slice (§2.2), which is what keeps
this from becoming the type-driven edit slice 009 needed.

---

## 8. File map

**Created**

| File | What lives in it |
| --- | --- |
| `lib/dates.ts` | `ContentDate`, `parseContentDate`, the two month tables and their comment, `formatDateProse`, `formatDateList`, `formatDateIso` (§5) |
| `lib/links.ts` | `classifyLink`, `SITE_ROUTES`, `externalLinkProps`, `parseTimestamp`, `deepLink` and its host table, `resolveInternalLinks(uses, modules)`, `rehypeLinks`, `LinkUse` (§2) |
| `lib/blocks.ts` | the six element-name constants, the attribute contracts and every refusal of §4.3, the fixed-Polish constant of §4.4, `ContentProblem`, `rehypeBlocks`. Walks a locally declared structural node type, as `lib/exercises.ts` does |
| `components/prose-link.tsx` | `ProseLink` — the one anchor the elements render (§2.4) |
| `components/quote.tsx` | `Quote` (`Cytat`) |
| `components/figure.tsx` | `Figure` (`Rysunek`) |
| `components/sources.tsx` | `Sources` (`Zrodla`), `SourceEntry` (`Zrodlo`) |
| `components/further-reading.tsx` | `FurtherReading` (`CzytajDalej`), `ReadingItem` (`Lektura`) |
| `components/quote.module.css` | §6, tokens only |
| `components/figure.module.css` | §6, tokens only |
| `components/reference-list.module.css` | §6, shared by the two list components |
| `specs/010-sources-and-figures/verification.md` | the evidence: the built-page reads, the Check E lines, every staged refusal's message, the revert proof. Slice 005's and 009's are the precedent |
| `specs/010-sources-and-figures/tasks.md` | written next, from §9 |

React function names and file names are English (Article III: component names are
ASCII English); only the MDX keys an author types are Polish, and they are
supplied by the components map.

**Changed**

| File | What changes |
| --- | --- |
| `lib/content.ts` | the centre of the slice. `buildMdxOptions` takes the two new collectors (`problems`, `links`) alongside the existing two; `mdxComponents` binds the six Polish names to the seven components in every mode; `compile` adds `frontmatterLineOffset`, raises collected problems as `path:line:` after `compileMDX` resolves, and stamps `{ path, line }` onto every collected link before returning it; `readModule` returns its links; `listLessons` returns `{ lessons, links }` so that **drafts' links are carried past the publish filter**; `getCourse` builds the target set from the modules it has just assembled and calls `resolveInternalLinks` once, at the end; `compileProse` awaits `getCourse()` and resolves its own links |
| `app/prose.css` | the four edits of §6 |
| `app/styleguide/page.tsx` | the specimen section of §7 |

**Deliberately not touched** — and the closing review should check each:
`package.json` and `package-lock.json` (criterion 1), `lib/content-schema.ts`
(no frontmatter field — spec, *Out of scope*), `app/tokens.css` (no new colour),
`scripts/check-design-invariants.mjs` (its existing scan already covers the new
files; see §6), `scripts/check-content-style.mjs` (its "block quotes" smell
counts source lines beginning with `>`, so it is unaffected until content
migrates — and migration is not this slice), `lib/exercises.ts`,
`components/exercise.*`, `components/contents.tsx` and `app/contents.css` (no
change to the contents panel — decision 13), `next.config.ts`, and
**everything under `content/`** (criterion 21).

---

## 9. Order of work

One task, one commit, `010/TNN:` (AGENTS.md §5). Each closes on `npm run build`
with its output shown, plus what is named below. Do not write `tasks.md` from
anything but this list.

1. **T01 — dates.** `lib/dates.ts`, the two tables, the three formatters, the
   parser and its refusals. Nothing imports it yet. *Check:* build passes — the
   file is type-checked by `next build` (tsconfig includes `**/*.ts`).
2. **T02 — links, as functions.** `lib/links.ts` minus the plugin: the
   classifier, `SITE_ROUTES`, `externalLinkProps`, `parseTimestamp`, `deepLink`,
   `resolveInternalLinks`. Still nothing imports it. *Check:* build passes.
3. **T03 — the link plugin.** `rehypeLinks` added to `lib/links.ts`, not yet
   wired. *Check:* build passes.
4. **T04 — the element plugin.** `lib/blocks.ts` in full: every refusal in §4.3,
   with its message. Not yet wired. *Check:* build passes.
5. **T05 — wire the pipeline.** `lib/content.ts` in full (§8), including
   `frontmatterLineOffset`. This is where the corpus's 143 links acquire the
   treatment and where every internal link is first resolved. *Check:* build
   passes; the emitted route list is identical to the T00 baseline; the
   prerendered HTML of one lesson carries `target="_blank" rel="noopener noreferrer" data-external`
   on external anchors and nothing on internal ones (criterion 12); **and the
   line-offset verification of §3.5** — stage one refusable element at a known
   line, read the message, revert it before committing.
6. **T06 — the components and the treatment.** The seven components, the three
   module stylesheets, the four edits to `app/prose.css`. Nothing writes an
   element yet, so the site is unchanged. *Check:* build passes; Check B still
   passes with three new stylesheets in its scan; Check E's report unchanged.
7. **T07 — the permanent specimens.** `app/styleguide/page.tsx`. *Check:* build,
   then read `/styleguide` — every variant of §7 present, both themes, 375 px
   with no horizontal scrollbar; the caption of each `Rysunek` selectable and
   outside the drawing (criteria 3, 4, 6, 9, 11, 17, 18, 19).
8. **T08 — the refusals and the corpus, staged and reverted.** Everything in
   §10: criteria 5, 7, 8, 10, 12, 13, 14, 15, 16, and then the revert and the
   content-tree proof (criterion 21). This task changes no source file; its
   commit carries only `verification.md`.
9. **T09 — close the slice.** The fresh-context review of the diff against
   `spec.md` (criterion 22, AGENTS.md §3), `tasks.md` matching reality, and the
   final report naming the two criteria left open for a human eye.

The order is not arbitrary: 1–4 add code nothing calls, so each is a small diff
the build still gates; 5 makes the link treatment live across the whole corpus
without any content depending on the new elements; 6 and 7 make the elements
visible on a page that is permanent; 8 is the only task that touches the content
tree, and it ends by proving it did not.

---

## 10. Verification staging, and getting the content tree back

Criteria 5, 7, 8, 10, 12, 13, 14, 15 and 16 cannot be closed on the reference
surface. Some are about refusals that must name a real file and a real line;
some are about the corpus itself. They are staged in real content and reverted.

### T00 — before anything is staged

Baselines, written **outside the repository** (the session's scratchpad), so no
baseline ever appears as an untracked file:

```bash
npm run build > "$SCRATCH/build-before.txt" 2>&1        # route list + Check E report
cp -r .next/server/app "$SCRATCH/html-before"           # the prerendered HTML, for criterion 8
cp -r content "$SCRATCH/content-baseline"
find content -type f -print0 | sort -z | xargs -0 sha256sum > "$SCRATCH/content.sha256"
find content -type f | wc -l > "$SCRATCH/content-count.txt"
npm run check:content > "$SCRATCH/style-before.txt" 2>&1
```

> **Do not revert with `git checkout -- content/` or `git restore content/`.**
> As this slice opens, seven files under `content/` carry uncommitted edits and
> `content/interesting-to-read/` is untracked. Either command would delete
> Viktar's unfinished work, and the loss would look exactly like a successful
> revert. The copy above is the only safe way back.

Capture `html-before` **after T05 has landed** as well, if criterion 8's diff is
easier to read against a tree that already has the link treatment — see below.

### What gets staged, and against which criterion

Stage one thing at a time, build, capture the message, revert that one thing.

| Criterion | Staged | Expected |
| --- | --- | --- |
| 5 | in `vibe-coding-kontra-inzynieria.mdx`: a `Cytat` with no `date`; one with no `source`; one with neither `url` nor `print` | three separate build failures, each `content/moduly/01-…/vibe-coding-kontra-inzynieria.mdx:NNN: …` |
| 5, second half | a `Cytat` with `print` and no `url` | builds; the printed locator visible where the link would be |
| 7 | a `Rysunek` with no `caption` | build failure naming file and line |
| 10 | a `Zrodlo` with no `date`; one with no `url`; a `Zrodlo` outside `Zrodla`; a paragraph inside `Zrodla`; `<Lektura kind="podcast">` | five separate build failures |
| 13 | `[x](/moduly/99-nie-ma/czegos)` and `[x](/moduly/01-jak-powstaje-oprogramowanie/nie-ma-takiej-lekcji)` | two build failures, each naming the file and the line, and saying the module / the lesson does not exist |
| 14 | **`publish: false` on `nowy-warsztat-programisty.mdx`**, which four other lessons link to | build failure naming **all four** linking files and lines, with a message that says the lesson exists but is not published. One flag, and it also proves the check covers the whole corpus rather than one file |
| 12, 15, 19 | in one lesson: a `Cytat` with a note-bearing `Zrodla` and a `CzytajDalej`, alongside the prose links already there | the built page carries the same `target`/`rel`/`data-external` on the elements' links as on the prose links; 375 px with no horizontal scrollbar |
| 8 | **nothing** — leave all five diagrams unwrapped | `diff -r "$SCRATCH/html-before" .next/server/app` after T05: every hunk is an anchor gaining `target`, `rel` or `data-external`; every `<svg …>` and its children byte-identical. Then wrap **one** diagram in a `Rysunek` and confirm the drawing's own markup is still byte-identical and only the surrounding `figure`/`figcaption` is new |
| 16 | all of the above | every failure message read and pasted into `verification.md`, with the file's real line number confirmed against the editor |

Criterion 18's ratios are not staged: every pair §6 uses is already in
`CONTRAST_FLOORS`, so every build prints them. Copy Check E's report into
`verification.md`. **If the executor's treatment ends up using a pair that is not
in that table, add it there** — extending the existing guard is inside this
slice; leaving a promise unchecked is the failure the script exists to prevent.
Do not add `--rule` on `--bg` (§6).

Criteria 3, 6, 11 and 17 are closed on `/styleguide` in T07, in both themes.

### The revert, and its proof

Restore the staged files from `$SCRATCH/content-baseline`, then:

```bash
find content -type f | wc -l                          # equals content-count.txt
sha256sum -c "$SCRATCH/content.sha256"                # every file byte-for-byte (criterion 21)
npm run check:content | diff - "$SCRATCH/style-before.txt"
npm run build | diff - "$SCRATCH/build-before.txt"    # route list identical; expect only the styleguide's page-size line to move
```

The hash manifest is criterion 21's evidence; the file count is what catches a
file added during staging that a manifest check alone would not flag. Never
`git add` anything under `content/` during this slice.

**Not closable by an agent** (spec, *Needs a human eye*), and both must be named
in the final report with a box left unchecked: whether a `Cytat` reads as a
quotation rather than a callout and is distinguishable at a glance from the
blockquotes the lessons keep; and whether the external-link mark is legible
without being noisy in a sources list of thirty entries, which is the density
`od-podpowiedzi-do-agenta.mdx` actually has.

---

## 11. What will be got wrong if this plan is followed carelessly

- **A second definition of "external".** The reviewer's note, and the reason §2.1
  exists. It fails in the direction that publishes: a link validated as internal
  and rendered as external. If `ProseLink` contains the word `http`, something has
  gone wrong.
- **Marking prose links and rendering raw `<a>` inside the elements.** Passes
  criterion 12, fails criterion 15, and looks correct on every page that has no
  sources list. Every anchor an element renders goes through `ProseLink`.
- **Resolving links during a compile.** The course model does not exist yet, and
  a plugin that reaches for `getCourse()` re-enters a cached promise that is
  waiting on it. Collect during, resolve after (§2.3).
- **Filtering drafts before collecting their links.** `listLessons` filters after
  it compiles; if the links are taken from the filtered array, every draft's
  links go unchecked and criterion 13 passes on a corpus it did not read.
- **Trusting the reported line.** It is body-relative. Off by the frontmatter
  block, in every lesson, always in the same direction — which is exactly the
  kind of wrong that looks plausible (§3.2, §3.5).
- **Throwing from inside the plugin.** `next-mdx-remote` wraps it and only the
  text survives (§3.3), so the line is lost and the plugin ends up learning the
  file path in order to put it back.
- **Refusing an expression attribute.** It is already gone by the rehype phase.
  Write the *missing required attribute* message so it covers both cases (§3.5).
- **Wrapping a diagram and losing its width.** `.prose > svg` no longer applies
  to a wrapped SVG. The figure has to claim the full column itself, and the
  caption has to be pulled back to the measure (§6).
- **The list reset in a CSS Module.** `.prose :is(ul, ol)` outranks a module
  class; the bullets stay (§6).
- **One month table.** *24 listopad 2025* and *sierpnia 2026* are both wrong and
  neither is a build failure (§5).
- **Reverting with git.** See the warning in §10. This is the only step in the
  slice that can destroy work that is not this slice's.

---

## Gaps in the spec

Four, none of which blocked the plan. Each is recorded with what was assumed, so
Viktar can veto the assumption rather than reverse-engineer it.

1. **Whether `publisher` is required on `Zrodlo`.** §4 lists it among what an
   entry "carries" and calls only the note optional; criterion 10 makes build
   failures of a missing **date** and a missing **link** and does not mention the
   publisher. *Assumed required*, on §4's wording — the criterion is a subset of
   the contract, not the whole of it. If that is wrong, one line of `lib/blocks.ts`
   changes.
2. **Whether `Lektura` carries a title separate from its link.** §5 says an item
   carries "a link, a kind, and one line saying why to read it", and never names
   the link's text. *Assumed a required `title`*, because §Mechanics forbids link
   text that does not name the thing, and the alternative is an anchor whose text
   is a raw URL.
3. **Which visible form `Cytat`'s date takes.** §7 fixes two forms and assigns
   them to "prose" and "tables and the sources list", and a quotation's
   attribution is neither exactly. *Assumed the prose form* (`2 lutego 2025`),
   because the attribution reads as a sentence and because that is what the four
   attributed quotations in the corpus already write.
4. **What the elements' fixed Polish words are.** The spec fixes the element
   names, the attribute names and the four kinds, and is silent on the connective
   words the elements supply — *Stan na*, *Dane:*, *od 7:55*, *Pełny zapis*,
   *Wydanie drukowane*, and the four kind labels. *Assumed the corpus's own
   phrasings* wherever the corpus has one, and collected all of them into one
   constant (§4.4) so that rewording them is one edit rather than seven.

Not a gap, recorded so it is not "fixed" by mistake: `Zrodlo` deliberately has no
printed-locator escape hatch and no `at` attribute, and `Lektura` deliberately
refuses a `date`. All three are the spec being explicit, not the spec being
silent (§4.2).
