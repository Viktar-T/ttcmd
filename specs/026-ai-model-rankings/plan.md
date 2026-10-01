# plan.md — 026-ai-model-rankings

- **Slice:** 026
- **Date:** 2026-10-01
- **Status:** written by the autonomous run, unreviewed (AGENTS.md §2).
- **Written from:** `constitution.md`, `AGENTS.md` and this slice's `spec.md`
  only — the fresh-context test of AGENTS.md §2, requirement 1. The repository
  was read afterwards so that the file map names real files and the geometry
  below is the stylesheet actually in the tree; nothing about intent comes from
  it.
- **Libraries:** none added, none removed (§7).
- **Next.js in the tree:** 16.3.3. Guides read before naming any route,
  metadata or link mechanism, from `node_modules/next/dist/docs/`:
  `01-app/03-api-reference/02-components/link.md`,
  `01-app/01-getting-started/14-metadata-and-og-images.md`,
  `01-app/03-api-reference/04-functions/generate-metadata.md` (§`title`,
  §Merging), `01-app/03-api-reference/03-file-conventions/page.md`,
  `01-app/01-getting-started/11-css.md` (§Ordering and Merging, §Development vs
  Production) and `01-app/01-getting-started/08-caching.md` (Cache Components
  is not enabled in `next.config.ts`, so the classic prerender model applies).

The spec was sufficient to plan every step. It has **two gaps that the closing
review will hit** if nobody acts — the link treatment contradicts slice 010
(§11.1), and criterion 8 cannot hold literally once any CSS is added (§11.2) —
and three smaller ones. All five are collected in §11; none blocks a step.

---

## 1. File map

### New

| path | what it holds |
| --- | --- |
| `content/ai-rankings.json` | **The list.** The lede sentence and the three rankings, seeded verbatim from spec §3. The only file a later wording change touches (spec §4). |
| `lib/ai-rankings-schema.ts` | The Zod shape of that file. Mirrors `lib/schedule-schema.ts`: the *file*, not the model. |
| `lib/ai-rankings.ts` | Reads, parses, validates, and turns the first Zod issue into a sentence that names the entry. `getRankings()`, wrapped in React's `cache()`. Mirrors `lib/schedule.ts`. |
| `app/rankingi-ai/page.tsx` | The route. A Server Component: static `metadata`, the title, the lede, the table. |
| `specs/026-ai-model-rankings/verification.md` | House convention (012 onward): the evidence for every criterion, measured. |

### Edited

| path | change |
| --- | --- |
| `app/page.tsx` | The hero's one button becomes a wrapper holding two: „Postęp grup" first, unchanged, then „Ranking modeli AI" → `/rankingi-ai`. The comment above it is rewritten (it says "the front door's one action"). |
| `app/nav.css` | One rule, `.heroActions`, in the landing-page section beside `.heroText` (§5). |
| `lib/links.ts` | `SITE_ROUTES` gains `"/rankingi-ai"`, so a lesson can link to the page in the content lane (§6). |

**Not touched, each for a reason:** `app/tokens.css`, `app/globals.css`,
`app/prose.css` — criterion 9, and the page reuses `.prose` as it stands (§4.3).
`app/styleguide/page.tsx` — the bordered-button specimen stays one button;
criterion 8 wants the reference page unchanged. `components/prose-link.tsx` — not
used here (§4.4, §11.1). `components/site-header.tsx` — spec §6, *Out of scope*.
`specs/021-*`, `specs/010-*` — AGENTS.md §8. **Every path of slice 025**
(`app/postep/*`, `lib/schedule*.ts`, `content/schedule.json`,
`specs/025-*`) — they hold another session's uncommitted work; this slice reads
the *committed* `lib/schedule*.ts` as precedent and depends on nothing in their
working copies.

---

## 2. The data

### 2.1 `content/ai-rankings.json`

At the top of `content/`, beside `schedule.json` — the content lane (Article IX),
and **not inside `content/moduly/`**, where `readModuleSlugs` would read the
name as a module folder. JSON, for the reasons slice 016 §3.2 settled for the
schedule: no parser to add, no value coerced on the way in, `JSON.parse` fails
with a position. English keys and an English file name (Article III — nobody
types this name; the URL is Polish because students do).

```json
{
  "lede": "Każdy z tych rankingów mierzy coś innego, a ich wyniki zmieniają się często.",
  "rankings": [
    {
      "name": "Arena — Agent: Overall",
      "url": "https://arena.ai/leaderboard/agent/overall",
      "description": "Ogólny ranking modeli w pracy agentowej — …"
    }
  ]
}
```

| field | type | required | notes |
| --- | --- | --- | --- |
| `lede` | string with a visible character | yes | the one sentence under the title (spec §2). Here, not in the page, so rewording it is a `content:` commit like the descriptions (§10, decision 3). |
| `rankings` | array, ≥ 1 | yes | table order is file order (spec §3: "in this order") |
| `rankings[].name` | string with a visible character | yes | link text |
| `rankings[].url` | `https://` address | yes | rendered exactly as written — criterion 4 wants the target to *be* §3's address, so nothing normalises it (no trailing slash added or removed) |
| `rankings[].description` | string with a visible character | yes | plain text; the „…” quotes and dashes are characters, not markup |

Every object is `strictObject`: a misspelt key (`descripton`) is refused as a key
rather than read as a missing description.

**The seed.** The three entries are spec §3's three rows, **byte for byte**, in
that order — `name` is the link text, `url` the link target, `description` the
second cell. The lede above is this plan's Polish draft of spec §2's sentence
("each ranking measures something different and the numbers change often"); it
says nothing the spec does not, and it is for Viktar to rewrite (AGENTS.md §7,
§11.3). Written as UTF-8 **without a BOM** (the Write tool, not PowerShell's
`Set-Content`): `readFile(…, "utf8")` keeps a BOM and `JSON.parse` then fails on
the first character.

### 2.2 Why three files

Viktar's instruction and slice 016's precedent: the schema says what a
well-formed *file* is; the loader reads it and owns the messages. There is no
cross-check against the course here, so the loader is short — but the seam is
the same one `schedule-schema.ts` / `schedule.ts` and `content-schema.ts` /
`content.ts` already draw, and a later slice that needs one gets it for free.

---

## 3. Validation

### 3.1 Where it runs

**In the render path of `/rankingi-ai`**, exactly as `/postep` does it: the page
calls `getRankings()`, a refusal throws while the page is prerendered, and
`next build` stops — the same gate a malformed lesson fails (Article VIII).
**The page must stay statically prerendered** — no `cookies()`, `headers()`,
`searchParams`, `dynamic` or `revalidate` — or validation moves silently to
request time. The check is free: `npm run build` lists `/rankingi-ai` as `○`
static. No route segment config is added, matching `/postep`.

`getRankings()` is wrapped in `cache()` from `react`, not held in a module-level
constant, for the reason `readSchedule` gives: a module constant survives a
content edit under `next dev` (slice 015).

### 3.2 The schema — `lib/ai-rankings-schema.ts`

```ts
const visible = z.string().regex(/\S/); // `min(1)` would accept "   "

const rankingSchema = z.strictObject({
  name: visible,
  url: z.httpUrl().startsWith("https://"),
  description: visible,
});

export const rankingsFileSchema = z.strictObject({
  lede: visible,
  rankings: z.array(rankingSchema).min(1),
});
```

`z.httpUrl()` (checked in `node_modules/zod`, 4.4.3) requires a literal
`http://` or `https://`, parses with `new URL`, and requires a dotted domain as
the host; with `normalize` off it returns the trimmed input unchanged.
`.startsWith("https://")` then narrows it to https, and is available on the URL
format type (`ZodURL extends ZodStringFormat extends _ZodString`). **Malformed**,
for criterion 6, therefore means: no `://`, not parseable, or a host that is not a
dotted domain. Query strings are not refused — a ranking's own address may
legitimately carry one, and criterion 5 is checked on the shipped data (§10,
decision 7).

### 3.3 The messages — `lib/ai-rankings.ts`

Every message has the schedule's shape, `content/ai-rankings.json — <entry>:
<what is wrong>. <what to write instead>.`, with a local `fail(entry, message)`.

**The entry is named by its own `name`**, read off the *raw* parsed JSON
(the typed parse is the one that just failed): `ranking "SWE-bench"`. When the
name is itself missing or blank, by position: `ranking at position 2`
(1-based). That is criterion 6's "a message naming the entry".

| # | refusal | raised by | the sentence says |
| --- | --- | --- | --- |
| 1 | not JSON | `JSON.parse` in the loader | the parser's message, then the schedule's hint (double quotes, no trailing comma) |
| 2 | `lede` missing or blank | schema | write the one sentence the page shows under its title |
| 3 | `rankings` missing, not a list, or empty | schema | it must be a list of at least one ranking |
| 4 | an entry without `name` | schema | named by position; write the ranking's name as the page should show it |
| 5 | an entry without `url` | schema | write the ranking's address, starting with `https://` |
| 6 | `url` not a web address | `z.httpUrl()` | quotes the value; write the whole address as the browser shows it |
| 7 | `url` on `http:` | `.startsWith` | quotes the value; every ranking links over https |
| 8 | an entry without `description` | schema | write one or two sentences saying what this ranking measures |
| 9 | an unknown key, in an entry or at the top | `strictObject` | names the key and the keys that exist |

The loader reads the **first** Zod issue, picks the sentence from the issue's
path (`["lede"]`, `["rankings"]`, `["rankings", i, field]`) and its code/format,
and falls back to Zod's own message with the path spelled out — worse than a
sentence, better than nothing, as `describeSchemaFailure` already does. A
malformed URL also fails `startsWith`; the first issue is the format one, so it
reads as #6, not #7. T03 shows which fires.

Exported types: `Ranking { name; url; description }` and
`AiRankings { lede: string; rankings: Ranking[] }`.

---

## 4. The page — `app/rankingi-ai/page.tsx`

### 4.1 Route and title

A folder `app/rankingi-ai/` with a `page.tsx` makes the route (`page.md`). The
tab title is a static `metadata` export — `title: "Ranking modeli AI — ttcmd"` —
which is the site's existing pattern (`"Postęp grup — ttcmd"`,
`"Type and colour reference — ttcmd"`). The root layout's `title` is a plain
string, not a template, so the page's string replaces it; `description` is
inherited by shallow merge, as on `/postep` (`generate-metadata.md`, §`title`
and §Merging).

### 4.2 Markup

```tsx
export default async function AiRankingsPage() {
  const { lede, rankings } = await getRankings();

  return (
    <div className="prose lane">
      <h1>Ranking modeli AI</h1>
      <p>{lede}</p>
      <table>
        <thead>
          <tr>
            <th scope="col">Ranking</th>
            <th scope="col">Co mierzy</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((ranking, position) => (
            <tr key={position}>
              <td>
                <a href={ranking.url}>{ranking.name}</a>
              </td>
              <td>{ranking.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

The title and the two column headers are UI labels fixed by the spec and its
criteria, so they are code; the lede and the rows are content. Key by position:
the list is static and never reorders on a client, and keying by `url` would turn
a duplicated address — a content mistake the spec does not ask to refuse — into
a React warning. No `<caption>`: the `h1` and the lede directly above already
name the table.

### 4.3 Why `prose lane`, and no stylesheet of its own

The page is a title, a sentence and a table of sentences — exactly what a lesson
renders, and `app/prose.css` already styles all three: the `h1` (`--text-3xl`,
700, balanced), the paragraph, the table (mono `th`, the `thead` underline in
`--text-muted`, row separators in `--rule-table`, `0.5rem 0.9rem` cells,
`display: block; overflow-x: auto` as a last guard), the link underline, and the
rhythm (`h1`→`p` `--gap-block`, `p`→`table` `--gap-apart`).

`.lane` puts it on the band pages' left edge: `main > .lane` is
`margin-inline: 0 auto` at `--measure`, the edge `/postep`'s and `/moduly`'s
titles sit on. Inside a lane, `.prose`'s side tracks are `minmax(0, 1fr)` of
nothing, so its text track is the lane and `.prose > table`'s `full` column is
the same width. The two classes set no property in common. Nothing else in the
tree targets `.prose` in a way that reaches this page (`contents.css` only
touches `h2[id]` and exercises; `presentation.css` only `mark`).

Rejected: a page CSS module repeating `prose.css`'s table rules — a second copy
of the site's table style that drifts, and it would rename the merged
CSS-modules chunk on every page (§9). Rejected: the `/postep` shape,
`<header className="lane"><h1 className="pageTitle">` and a second lane below —
`main`'s `row-gap` would put 2.5rem between the title and its one sentence, and
the lede would read as a section of its own.

**Geometry, estimated here and measured at T06.** Inter at 16px, the table's
`--text-base`, ~8–9px per character; cell padding 28.8px per cell.

- **320px:** lane 288px. The widest unbreakable words are about 80px in the
  first column (`SWE-bench`) and about 105px in the second (`użytkowników,`).
  185 + 57.6 ≈ 243 < 288: the table fits, nothing scrolls, inside or out.
- **1280px:** lane 624px. Auto table layout gives the first column little more
  than its longest word — about 95px — so „Arena — Agent: Overall" sets on
  three lines and „Artificial Analysis" on two, beside five or six lines of
  description. That is how a lesson table with this content looks; it is named
  in the final report for criterion 10's look rather than fixed with a rule
  the spec did not ask for (§10, decision 6).

**One trap, written down so nobody "fixes" it:** `overflow-wrap: anywhere` on
the cells would collapse every column's min-content to one character, and auto
layout would then hand the first column ~15px and break „Arena" letter by
letter. Words must stay the unit the table sizes on.

### 4.4 The links

A plain `<a href>`: same tab, no icon, no `rel`, no tracking parameter (spec §5,
criterion 5). **Not `ProseLink`** — it renders every link to another site with
`target="_blank"`, `rel="noopener noreferrer"` and a visible ↗ mark (slice 010
§6), which criterion 5 forbids. **Not `next/link`** — its prefetch and client
navigation are for routes inside the app (`link.md`); for an external URL it
adds nothing to the anchor. `.prose a` styles the link. See §11.1: the spec's
reason for this choice is not true of the site as built.

---

## 5. The front door — `app/page.tsx`, `app/nav.css`

```tsx
<div className="heroActions">
  <Link href="/postep" className="button">
    Postęp grup
  </Link>
  <Link href="/rankingi-ai" className="button">
    Ranking modeli AI
  </Link>
</div>
```

Each label is one JSX text child, so the prerendered HTML carries
`<a class="button" href="/postep">Postęp grup</a>` — unchanged from today — and
`<a class="button" href="/rankingi-ai">Ranking modeli AI</a>` as plain
substrings. A `<div>`, not a `<nav>` (the header carries no navigation, and a
second landmark on the front door is a change nobody asked for) and not a `<ul>`
(list semantics for two buttons, and a list reset to write).

```css
/* The front door's two buttons (slice 026): side by side where the measure
   holds both, one under the other where it does not. flex-wrap moves the
   second to a line of its own instead of shrinking either or pushing the page
   sideways. The gap is tighter than .heroText's 1.1rem so a wrapped pair still
   reads as one group, not as two more rows of the hero. */
.heroActions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-tight);
}
```

No new token, no colour; `--gap-tight` exists. `.button` is untouched — both
anchors carry exactly it, which is criterion 2's "same style".

**Geometry.** JetBrains Mono at `--text-base` advances 9.6px; `.button` adds
2 × 22.4px padding and 2px of border. „Postęp grup" (11 characters) is
**152.4px** — slice 021's measured figure; „Ranking modeli AI" (17) is
**210px**. Side by side with the gap: **370.4px**. `.heroText` is a grid with
`justify-items: start`, so the wrapper is fit-content, capped at the text column:

| viewport | text column | result |
| --- | --- | --- |
| 320 | 288 | wraps; widest button 210 ≤ 288, both fully visible |
| 375 | 343 | wraps |
| ≥ ~403 | ≥ 370.4 | one line |
| 1280 | 624 (`--measure`) | one line |

A flex item shrinks only when it is alone on a line and wider than the
container, which no width ≥ 320 produces — so "wrap rather than shrink" holds,
and T06 measures it: each button's width at 320 equals its width at 1280.

The comment above the button is rewritten to say the hero has two actions,
progress first (slice 026, superseding 021's one-button rule), and keeps 021's
point that the site header carries no navigation.

---

## 6. `lib/links.ts`

`SITE_ROUTES` becomes `["/", "/moduly", "/postep", "/rankingi-ai"]`. Spec
*Out of scope* says a lesson that wants to point here "does so in the content
lane" — today such a link fails the build with "there is no such page", so that
sentence is only true with this edit. It is the deliberate edit the comment on
`SITE_ROUTES` describes, and slice 016 made the same one for `/postep`. The file
is imported only by server code (`lib/content.ts`, `lib/blocks.ts`,
`components/prose-link.tsx`, `components/quote.tsx` — none is a client
component), and no lesson links here, so no page's markup changes (§9).

---

## 7. Libraries, and what is not needed

**Nothing is added.** `zod` 4.4.3 (`z.strictObject`, `z.httpUrl`,
`.startsWith`, `.regex`, `z.array().min`), `react` (`cache`), `next`
(`Metadata`, `next/link` — already on the home page), `node:fs/promises` and
`node:path` cover everything. Criterion 9's dependency half is
`git diff <T01>^ HEAD -- package.json package-lock.json` being empty.

No client component is added: `next/link` is already in the home page's client
graph, and the new page is a Server Component with no hook and no handler.
Check B of `scripts/check-design-invariants.mjs` scans `app/` and `lib/` for
colour literals; the one new rule has none.

---

## 8. Order of work

One commit per step, `026/TNN:`. **Commits are path-scoped** — `git add` the
step's own paths, never `-a`, `-A` or `.` — because slice 025's uncommitted work
shares this working tree and must not be swept into a 026 commit. Steps that
change no code commit their section of `verification.md`.

Instruments, as before: `.next/server/app/**` is the prerendered markup;
`document.documentElement.scrollWidth − clientWidth` against `npm run dev`
checks sideways scroll (012); the before/after capture with the build id
normalised is 016's, extended by 022 (§9). A build overwrites `.next/`, so each
capture is copied into the scratchpad as soon as its build ends, and no dev
server runs while a build does.

| # | step | the check |
| --- | --- | --- |
| **T01** | `content/ai-rankings.json` (§2.1), `lib/ai-rankings-schema.ts` (§3.2), `lib/ai-rankings.ts` (§3.3). | `node -e "JSON.parse(require('fs').readFileSync('content/ai-rankings.json','utf8'))"` succeeds. A one-off node script reads spec §3's three table rows (`\| [name](url) \| description \|`) and asserts the JSON's `rankings` equals them exactly, in order, and that `lede` is non-blank. `npm run build` and `npm run lint` clean — nothing renders the loader yet, so the build is the type check that the Zod calls exist. **Criterion 1.** |
| **T02** | `app/rankingi-ai/page.tsx` (§4). | `npm run build` lists `/rankingi-ai` as `○` static; lint clean — **1**. In `.next/server/app/rankingi-ai.html`: `<title>Ranking modeli AI — ttcmd</title>`; one `<h1>` reading `Ranking modeli AI` — **3**, markup half. The `<tbody>` holds exactly three `<tr>`; in order, each first `<td>` is `<a href="X">` with X byte-equal to §3's address, and each second `<td>` has non-whitespace text — **4**. Across **every** `<a` in the file, header links included: no `target=` attribute, and no `href` containing `?` — **5**. |
| **T03** | No code. The refusals of criterion 6. Copy `content/ai-rankings.json` to the scratchpad first; after each staging restore it from that copy and confirm its sha256 equals the committed one. | **Criterion 6**, three builds that must fail: (a) `description` removed from „Artificial Analysis"; (b) „SWE-bench"'s `url` set to `http://www.swebench.com/`; (c) „Arena — Agent: Overall"'s `url` set to `https//arena.ai/leaderboard/agent/overall`. Each output contains `content/ai-rankings.json — ranking "<that name>":` and the sentence; quoted verbatim in `verification.md`. After the last restore, `npm run build` passes. If a message reads badly, fixing it is a code change: this step then edits `lib/ai-rankings.ts` and re-runs all three. |
| **T04** | `lib/links.ts`: `SITE_ROUTES` (§6). | Stage a temporary paragraph `[ranking](/rankingi-ai)` at the end of one published lesson (backed up by copy, restored by copy, sha-checked). **Before the edit** the build fails with the "no such page" message; **after it** the build passes. Unstage; `npm run build` and lint clean; `git status --porcelain -- content/moduly` is what it was before the step. |
| **T05** | `app/page.tsx` and `app/nav.css` (§5). | Build and lint clean — **1**. In `.next/server/app/index.html`: `class="heroActions"` occurs once in element markup, and directly inside it are `<a class="button" href="/postep">Postęp grup</a>` then `<a class="button" href="/rankingi-ai">Ranking modeli AI</a>`; `class="button"` occurs exactly twice in element markup — **2**, markup half. |
| **T06** | No code. The before/after comparison (§9), then the dev-server measurements. | **2**, computed half: at 1280, the two buttons' computed `border`, `padding`, `font-family`, `font-size` and `height` are equal. **3**: at 1280, click the second hero button; `location.pathname === "/rankingi-ai"` and the `h1` reads `Ranking modeli AI`. The check reads the pathname — the label and the heading are the same words, as on 021's button. **7**: `scrollWidth − clientWidth` is 0 on `/` and `/rankingi-ai` at 320, 375 and 1280; at 320 both `.heroActions .button` rects have `left ≥ 0` and `right ≤ clientWidth`, the second's `top` is below the first's `bottom` (wrapped), and each width equals its 1280 width (not shrunk). Also recorded, not a criterion: the table's own `scrollWidth − clientWidth` at 320 (0 expected — `.prose table` would otherwise scroll inside itself, which the page measure cannot see), and at 1280 the `left` of `/rankingi-ai`'s `h1`, `/postep`'s `h1` and `/`'s `.heroTitle` (one left edge). **8** and **9**: §9. |
| **T07** | `verification.md` completed; the closing review in a fresh subagent context (AGENTS.md §3). | **11**: the review reports no gap. **10 stays unchecked**, by the spec's own terms; the final report names what to look at — whether two equal buttons still read as one front door with progress first, whether the descriptions *and the lede* are Viktar's wording, and how the first column wraps at 1280 (§4.3). |

T01 is kept apart from T02 so a failure in the data's shape is told apart from a
failure in the page's. T05 comes after T02 so the hero never points at a page
that does not exist. T04 stands alone so its evidence — no page's markup moves —
is its own.

**Every criterion has a step.** 1 → every step · 2 → T05, T06 · 3 → T02, T06 ·
4 → T02 · 5 → T02 · 6 → T03 · 7 → T06 · 8 → T06 · 9 → T06 · 10 → nobody, by
design · 11 → T07.

---

## 9. Criteria 8 and 9 — the before/after comparison

**Measured in the current build, read-only:** every prerendered page links the
same two CSS chunks, a global one (`app/*.css`, holding `.heroText` and
`.button`) and one that merges every CSS module (`page-module__…`,
`prose-link-module__…`). Slice 022's plan found the file names are content
hashes, and 025's verification confirmed that a style rule renames its chunk on
every page. `11-css.md` says the same in general terms: production CSS is
concatenated and merged into chunks. **So §5's one rule renames the global chunk
in every page's HTML and payload, and criterion 8 as written — only the build
id normalised — cannot hold** (§11.2). This plan normalises that one name and
recovers the strength with an additive check. The modules chunk is **not**
normalised: this slice adds no module CSS, so its name must not move.

1. **One tree for both sides.** Before the first build, record a fingerprint:
   sha256 over every file under `content/`, paths sorted, plus
   `git status --porcelain` and `git diff | sha256sum` for every path outside
   this slice. Take it again after the second build. **If they differ, someone
   changed the tree between the builds — discard both and redo.** (020 found
   content edits between builds measured as code changes.) If slice 025's
   working copy makes the build fail, stop and report; never stash, restore or
   commit its files.
2. **After side.** Build at HEAD. Copy every `*.html`, `*.rsc`, `*.meta` and
   `*.segments/**` under `.next/server/app`, `.next/BUILD_ID` and
   `.next/static/chunks/*.css` to `scratch/after/`.
3. **Before side.** Confirm `git status --porcelain` is empty for every slice
   path. `git restore --source=<T01>^ -- app/page.tsx app/nav.css lib/links.ts`
   (path-scoped, byte-exact — not `git checkout`, not PowerShell `>`). Move
   `app/rankingi-ai/`, `lib/ai-rankings.ts`, `lib/ai-rankings-schema.ts` and
   `content/ai-rankings.json` into the scratchpad. Build; copy the same files to
   `scratch/before/`. Then `git restore --source=HEAD --` all seven paths, delete
   the moved copies, and confirm porcelain is empty again.
4. **Normalise both sides:** the build id → `BUILD_ID`; the global chunk's name
   (the chunk with no `page-module__`) → `CSS_GLOBAL`. Nothing else.
5. **Criterion 8:**
   - the file sets are equal except that *after* adds `rankingi-ai.html`,
     `.rsc`, `.meta` and `rankingi-ai.segments/**`;
   - every common file except `index.*` and `index.segments/**` is
     byte-identical. Any other difference — a moved JS chunk name included — is
     shown as a finding and **not** normalised away;
   - the CSS-modules chunk has the same name and the same bytes on both sides;
   - **additive:** *after*'s `CSS_GLOBAL` with its one `.heroActions{…}` rule
     cut out is byte-identical to *before*'s.
6. **Criterion 9:** `git diff <T01>^ HEAD -- package.json package-lock.json
   app/tokens.css` is empty; `git diff --stat <T01>^ HEAD -- . ':!specs'` names
   only §1's paths; the diff adds no `"use client"`, no `on[A-Z]…=` handler, no
   custom-property definition (`--…:`) and no colour literal (Check B also passed
   inside every build).

---

## 10. Decisions taken by this plan

1. **`content/ai-rankings.json`, `lib/ai-rankings-schema.ts`, `lib/ai-rankings.ts`.**
   Rejected: `rankingi-ai.json` (a Polish identifier, Article III), a bare
   `rankings.*` (says nothing about what is ranked), one `lib/` file (Viktar's
   instruction and 016's seam, §2.2).
2. **A top-level object `{ lede, rankings }`.** Rejected: a bare array — no
   place for the lede, and adding one later is a migration of the file's shape.
3. **The lede lives in the data file.** Rejected: hard-coding it in the page —
   rewording one sentence would then be an app slice, the friction spec
   decision 4 rejects for the rows.
4. **Strict objects, at least one ranking, visible text required.** Rejected:
   tolerating unknown keys (a misspelt key reads as "missing" with no hint) and
   an empty list (a table with headers and no rows reads as broken).
5. **https via `z.httpUrl().startsWith("https://")`; query strings allowed.**
   Rejected: `z.url({ protocol: /^https$/ })` — it skips Zod's `://` check and
   accepts `https:arena.ai`; and refusing `?` — not asked, and a real
   leaderboard address may need one.
6. **`prose lane`, no page stylesheet; the first column wraps.** Rejected: a
   page CSS module (a second table style, and a renamed modules chunk on every
   page); a fixed first-column width (a visual call the spec did not make —
   left for criterion 10's look).
7. **Plain `<a>`; not `ProseLink`, not `next/link`** (§4.4).
8. **Tab title `Ranking modeli AI — ttcmd`**, description inherited. Rejected:
   a page `description` of its own — nothing asked for one.
9. **`.heroActions` in `app/nav.css`, `display: flex; flex-wrap: wrap; gap:
   var(--gap-tight)`, on a `<div>`.** Rejected: an inline `style` attribute,
   which would keep criterion 8 literally true only by hiding a layout rule
   outside the stylesheet; a home-page CSS module (the hero's rules all live in
   `nav.css`, and it renames the modules chunk instead); `gap: 1.1rem` (a
   wrapped pair would read as two more hero rows); `<nav>` or `<ul>` (§5).
10. **`/rankingi-ai` added to `SITE_ROUTES`** (§6). Rejected: leaving it out,
    which makes the spec's "a lesson … does so in the content lane" false.
11. **Rows keyed by position; no `<caption>`; no route segment config** (§3.1,
    §4.2).
12. **The before/after normalises the global CSS chunk name and checks the
    stylesheet is additive** (§9). Rejected: the literal criterion, which no
    slice that adds CSS can meet.

---

## 11. Where the spec left this plan guessing

1. **Same-tab, unmarked links contradict slice 010, and the spec's reason is
   not true of the site.** Spec §5 says each name is "an ordinary link that
   opens the ranking in the same tab, like every other link on the site", and
   decision 6 rejects a new tab because "no other link on the site does". In
   the tree, **every link to another site** on a lesson page goes through
   `components/prose-link.tsx`, which sets `target="_blank"`,
   `rel="noopener noreferrer"`, a visible ↗ and a screen-reader
   "(link zewnętrzny)" — slice 010 §6, "one link treatment", and its criterion
   12. The spec's *Supersedes* line names only slice 021. This plan follows the
   spec as written, because criterion 5 is explicit — but after this slice the
   site has two treatments of an external link. **The spec needs one of:** (a)
   slice 010 §6 added to *Supersedes* for this page, with decision 6's reason
   corrected; or (b) §5, decision 6 and criterion 5 reversed, in which case the
   page renders each name through `ProseLink` — a one-line change in §4.2, and
   the ↗ mark arrives with it. Which treatment students meet is Viktar's call.
2. **Criterion 8 cannot hold as written.** The hero needs one layout rule; any
   CSS rule renames a content-hashed stylesheet chunk that every page links
   (§9; slice 022 plan §6.1, slice 025 verification). Suggested wording: "…is
   byte-identical before and after this slice once the per-build id **and the
   global stylesheet's chunk name** are normalised; the CSS-modules chunk is
   unchanged, and the global stylesheet differs only by the hero's added rule."
   T06 checks exactly that.
3. **The lede has no wording and no home.** Spec §2 describes the sentence but
   gives no Polish and does not say whether it is content or code. This plan
   drafts it and puts it in the data file (decision 3). Criterion 10 names only
   "the Polish descriptions"; it should name the lede too.
4. **"Nothing else changes" versus "a lesson … does so in the content lane".**
   The second is only true if the internal-link check knows the route, which is
   an edit to `lib/` that §6 of the spec does not list. This plan makes it (§6)
   and shows it moves no page's markup.
5. **ADR-0008's visible date.** The spec cites ADR-0008 (still *proposed*) for
   the descriptions, and that ADR makes the date a claim was checked "visible
   to the reader". The spec says the descriptions were checked on 2026-10-01
   but neither puts that date on the page nor says it is declined. This plan
   renders no date and stores none. If the date should show, the data file
   gains one field and the page one line under the table.

Smaller, read rather than asked: spec §1's "same style and size" is read as the
style's box — font, padding, border — not the pixel width, which follows the
label (152.4 against 210px), as slice 021's plan read the same words.
