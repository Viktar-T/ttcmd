# plan.md — 014-module-contents

- **Slice:** 014
- **Answers:** how. The spec answered what and why; nothing here re-argues it.
- **Date:** 2026-09-01, written in an autonomous run (AGENTS.md §2)

---

## Provenance — read this before trusting a file name

This plan was written by a subagent whose only inputs were `constitution.md`,
`AGENTS.md` and this slice's `spec.md`. **It has not read one line of this
repository's source, stylesheets, components, other specs, ADRs or history.**
That is deliberate: AGENTS.md §2 requires an autonomous run's plan to come from
a context that saw only the spec, so that a spec which cannot carry a plan is
caught rather than patched from the drafting session's memory.

The consequence: **every path below is an inference** from the conventions the
three documents state — Article VIII (`app/` at the root, `lib/`, MDX under
`content/`, Zod at build time), Article III (ASCII English identifiers),
Article IX (the app lane is `app/`, `lib/`, config). Inferred paths are marked
`≈`. Where a name is wrong, the name is wrong and the mechanism beside it still
stands: rename and proceed, do not create the file the plan invented.

Where the spec alone could not settle something, it is in **Gaps** at the foot
with the assumption to proceed under. **No gap was large enough to stop the
plan — the spec carried it.**

## Libraries and dependencies

None added — criterion 17 forbids it and AGENTS.md §8 would require an ADR. The
change is server components, the existing MDX heading collection, existing CSS.
**No new `"use client"` file**: §9 admits no client behaviour that did not
already exist, so a new client directive in the diff is a defect, not a detail.
No ADR: ADR-0003 is *obeyed* by refusing to mint a letter for „Wstęp", not
amended. If reading the introduction's sections turns out to need a dependency
or a schema change, **stop** — the first needs an ADR, the second means an
introduction is being modelled as a lesson, which Article VI does not support.

## The shape of the change

One mechanism per numbered section of the spec's `## What`.

**§1 — the module page carries the contents.** The module route calls the same
panel and the same disclosure the lesson route calls, from the same files, with
the same props. Nothing is copied and nothing is re-styled. Both housings
already exist; the whole visual change is that a page which never called them
now does.

**§2 — the list opens with „Wstęp".** The entries stop being derived inside the
housings (or beside the lesson route) and become one value built by one
function, called by both routes with one differing argument: which thing is
current. Whether the first entry is a link is a property of that argument, not
of the page. See **The data the list needs**.

**§3 — „Wstęp" expands.** The introduction's top-level sections are already
derived when it is compiled and then dropped by whatever loads it for the module
page. Stop dropping them: widen that loader's return and pass them in as the
current entry's sections. Decision 13 forbids a second derivation — reuse the
collection the lesson path uses; no extra remark pass, no scan of MDX source.
(If it proves to run only on the lesson path, Gap 3.)

**§4 — the left edge does not move.** The module page stops taking the frame's
inset and starts using the same two-column grid the lesson page uses, and the
inset and the grid are made to be *the same expression* rather than two
expressions that happen to agree. See **The geometry**.

**§5 — the skip control.** Its target becomes a parameter of the contents rather
than a constant baked for the lesson page. The module route passes the id of the
block holding its title and introduction; that block carries `tabindex="-1"` and
no focus ring, exactly as the article does. The control's label: Gap 1.

**§6 — the disclosure sits above the title, collapsed.** Render order in the
module route: breadcrumb, disclosure, then the two-column grid whose second
column opens with the title. Above the fold the disclosure is `display:none`
(007 already does this) and so creates no grid track — but for that to hold it
must not be a grid item at all up there. Place it exactly where the lesson route
places its own, relative to that route's grid.

**§7 — the chevron rows stay.** Nothing to do. They travel into the grid's
second column with the rest of the page's content and keep their left and width.

**§8 — the dead-panel rule generalised.** The condition deciding whether a
housing renders moves *into* the contents and becomes a predicate over the built
list: **render iff at least one entry, at any level, carries an href.** One
place, both pages, both housings. Its consequence — a single-lesson module's
lesson page now gets a panel, because „Wstęp" is a link there — is not a
regression to suppress; it is the second half of §8.

**§9 — nothing changes how the site looks.** No token, colour, size or spacing
value is touched; criterion 1's colour-literal guard and contrast report are the
check. The reference page's specimens gain both of „Wstęp"'s states — and the
way to make that unforgettable is to make the new field on the entry type
**required**, so `tsc` under `strict` enumerates every construction site, the
reference fixtures among them.

## The data the list needs

One list, two kinds of page, a first entry that is sometimes current and
sometimes a link, expanding when it has sections. The shape that makes all of
that a property of the data rather than of the caller:

```ts
type ContentsSection = { id: string; label: string };

type ContentsEntry = {
  key: string;                  // ASCII, stable; React key and spy key
  label: string;                // Polish, what the row says
  ident?: string;               // "1a" — the identity string. Absent on „Wstęp".
  href?: string;                // absent ⇒ this entry is the current page
  sections: ContentsSection[];  // rendered only when href is absent
};
```

**`href` absent is what "current" means.** One field, one job, and the state
"current *and* a link" cannot be represented. Rejected: a separate `isCurrent`
boolean beside `href`, which permits exactly that disagreement and turns
criterion 5 into a coincidence between two fields instead of a fact about one.

**`ident` absent is what "not a lesson" means.** The row renders its identity
string only when there is one. The template must *omit* the identity element,
not render it empty at the identity column's width — an empty box holding that
width is the symbol decision 3 refused.

The builder, in the app lane:

```ts
buildContents(args: {
  module: Module;                      // number, href, its published lessons in `order`
  current: { kind: "intro" } | { kind: "lesson"; slug: string };
  currentSections: ContentsSection[];  // the sections of whatever `current` names
}): ContentsEntry[]
```

Every non-current entry gets `sections: []`, and that is not a shortcut: a
non-current entry's sections are never rendered, so loading them is work whose
result is discarded. **`currentSections` is the entire novelty in what has to be
threaded.** The lesson route already holds that array (007); the module route
has to stop throwing it away. That is §3, and it is one loader's return value,
not a pipeline.

The scroll-spy observes **exactly the ids in the current entry's sections** and
nothing else. If 007's spy instead observes every heading in the page's content,
narrow it to the list's ids before the module page renders it — otherwise a
heading belonging to the module page's own furniture becomes a highlight target
with no row to highlight. Narrowing touches lesson-page behaviour, which
criterion 12 re-checks.

## File map

The **role** is load-bearing; the path is an inference, marked `≈`.

| Role | Path (`≈` = inferred) | What changes |
| --- | --- | --- |
| The builder | `≈ lib/contents.ts` (new, or beside today's derivation) | `ContentsEntry`, `ContentsSection`, `buildContents`. |
| Housings | `≈ components/contents-panel.tsx`, `≈ components/contents-disclosure.tsx` | Take `entries` + a skip target instead of module/lesson objects. The render-iff-a-link predicate moves in here. |
| Rows | `≈ components/contents-list.tsx` | Render `ident` only when present; `href` absent ⇒ not a link, `aria-current`, sections expanded beneath. |
| Scroll-spy | `≈ components/contents-spy.tsx` (`"use client"`, existing) | Observe only the ids the list carries. No new client file. |
| Two-column wrapper | `≈ components/lesson-columns.tsx` and/or `≈ .lesson-columns` in a stylesheet | **Renamed** to say "page", not "lesson" (decision 6); rule bodies untouched. If it also carries lesson-only children or behaviour — the article element, back-to-top — extract the layout and leave those at the lesson route. |
| The frame's inset | `≈ app/globals.css`, or the frame component | Inset and grid become one expression (below). Possibly no change at all. |
| Module route | `≈ app/moduly/[modul]/page.tsx` | The centre: two columns, both housings, `current: {kind:"intro"}`, the skip target on the title+intro block, the disclosure above the title. |
| Lesson route | `≈ app/moduly/[modul]/[lekcja]/page.tsx` | Passes `current` and `currentSections`; otherwise unchanged. |
| Content loader | `≈ lib/content.ts` / `≈ lib/modules.ts` | Stops discarding the introduction's collected sections. |
| Reference page | `≈ app/reference/page.tsx` — the route, not `docs/design-reference.md` | Specimens gain „Wstęp" as a link and „Wstęp" as the current entry. |
| Measurement harness | `≈ scripts/measure.mjs` | Reuse whatever 011/012 measured with; write one only if none exists, as a `chore:` commit. |

**Not touched:** anything under `content/` (criterion 17; Article IX's content
lane), the Zod schema, `package.json`, the module grid and home routes, the
back-to-top control, the pager, the chevron rows' own markup, every token file.

## The geometry, and the one real risk

**What must be true above the fold on the module page**, at 1280 and 1585 px:
the contents column's left is the page margin; its width equals the contents
column's width on a lesson page at that viewport; its right edge is at or left
of the content column's left edge; its top is level with the top of the module's
text block within 1 px; and the title block, the chevron rows and the pager
measure the `left` and `width` they measured before this slice, as do the site
header, the accent band and the breadcrumb.

**The mechanism, in two moves, in this order.**

1. **Make the inset and the grid one expression.** The frame gives every
   non-lesson page a left inset of page margin + contents column + gap; the
   lesson page's grid produces the same edge from its track sizes. Whether those
   are the same tokens or two literals that agree is the first thing to find
   out. Same tokens already → nothing to do. Otherwise → in its own commit,
   rewrite the literal side in terms of the token side and prove it moves
   nothing: module page, module grid, home page and reference page each measure
   their baseline exactly. Not tidying — it is the only thing that makes
   criterion 2 hold *by construction* rather than by two numbers being equal
   today.

2. **Give the module page the lesson page's grid through the switch that already
   exists.** 012 gave the inset to "every page that is not a lesson", so a
   discriminator is already there — a prop on the frame, a class the lesson
   layout sets, or the lesson route nesting differently. **Use that one.** Do not
   add a second, and do not negative-margin out of the inset: that is how a
   document acquires the horizontal scrollbar criterion 11 checks for at 320 px.

The module route then mirrors the lesson route element for element, with the
difference confined to the second column's children:

```
site header, accent band     full-bleed, outside everything — untouched
breadcrumb                   where it is today, at today's inset, above the grid
disclosure                   the below-fold housing; display:none above the fold
two-column grid
  ├ col 1  contents panel    at the page margin
  └ col 2  title + introduction   ← the skip target, tabindex="-1", no ring
           chevron lesson rows
           pager
```

**Below the fold, stated honestly**, because §4 and criterion 10 read together
are stricter than they can be: the page **cannot** be byte-for-byte identical,
since §6 deliberately inserts one collapsed row between the breadcrumb and the
title. What is invariant below the fold is **horizontal** — every box's `left`
and `width` unchanged, one column, no panel, no horizontal scroll. Vertically,
every box below the disclosure moves down by **exactly the disclosure's outer
height and by nothing else**, and that is the check: not "top unchanged" but
"every top shifted by one identical delta equal to the measured height of the
collapsed disclosure". A box that shifts by a different amount is the defect.
Under any other reading of criterion 10, §6 makes it unsatisfiable.

**The risk, named.** The module page's content column moves out of a track it
gets by padding and into a track it gets by grid. Padding and grid round
differently, a gap sits on one side or the other of a boundary, and a
`max-width` measure inside a padded box does not necessarily land where the same
measure inside a grid track lands. A one-gap or one-pixel error is invisible on
the module page alone and glaring the moment a reader crosses from a module page
to a lesson page — the thing slice 012 exists to prevent.

**How the implementer proves it is absent.** Not by eye.

- **Before touching anything**, measure the tree as it stands: at 320, 375, 768,
  1024, 1279, 1280, 1281, 1585 and 2560 px, on Moduł 0's page, Moduł 1's page,
  one lesson in each, the module grid, the home page and the reference page,
  record `getBoundingClientRect()` `left` / `width` / `top` for the site header,
  the accent band, the breadcrumb, the title block, the chevron rows, the pager,
  the contents column and the content column, plus whether
  `documentElement.scrollWidth` exceeds `clientWidth`. Write it to a baseline
  file.
- **The baseline must exist before the first slice commit.** Afterwards there is
  nothing to compare against but a checkout, and a mismatch found then cannot be
  attributed to a step. This is the one ordering constraint here that cannot be
  recovered from.
- Re-run the same script, unmodified, after every geometry-bearing step and diff
  it. The diff is the evidence pasted under the task — the same instrument
  before and after, as criterion 2 demands.
- If 011 or 012 left a harness, use it. Re-measure anyway rather than trusting
  any record it left: the tree has moved since.

**One thing to watch that is not a criterion.** On Moduł 0 — a 49-word
introduction and two lessons — the panel may be taller than the whole content
column and so set the page's height. 007 capped it and gave it its own
scrollbar; if that cap is expressed against the viewport this is fine, and if it
is not, Moduł 0 at 1280 px is where it shows.

## Order of work

Nine steps; `tasks.md` is written from this list. Each names the check that
closes it. `npm run build` and `npm run lint` pass at every step — assumed, not
repeated.

**T00 — `chore:` baseline.** Find or write the harness; capture the baseline
above from the tree before any slice commit. *Check:* a baseline file covering
every width, page and box named. A new harness is a `chore:` commit (Article
IX); its run outputs are evidence, not repo content.

**T01 — rename the two-column wrapper.** Decision 6, names only; if the wrapper
carries lesson-only children or behaviour, extract the layout in the same commit
and leave those at the lesson route. *Check:* the harness returns the baseline
exactly on a lesson page and on every non-lesson page, and `git diff` shows
renames with no changed declaration. Done first and alone, so no later
measurement can be blamed on it.

**T02 — one built list, same entries.** Introduce the entry type and the
builder; port the lesson route and the reference page's fixtures; emit exactly
the entries the list has today. *Check:* the rendered markup of a lesson page's
contents is unchanged — capture the HTML before and after and diff it. The
cheapest strong check in the slice; take it.

**T03 — „Wstęp" enters the list; the housing predicate generalises.** The
builder emits the first entry, a link from a lesson page; the
render-iff-a-link predicate moves into the housings. *Check:* criteria 4, 5's
lesson half and 6, read from the rendered markup of a lesson in each module,
plus the stated consequence — a single-lesson module's lesson page now shows a
panel.

**T04 — the module page becomes two columns and carries both housings.** The
inset expression unified if it was not already; the module route moved into the
renamed wrapper; both housings rendered; „Wstęp" current. *Check:* criteria 2, 3
and 10 as a harness diff against T00; criterion 11 across all five widths and
all four page kinds; criteria 4 and 5 read from both module pages' markup. Also
criterion 8 here, as an experiment: temporarily unpublish every lesson of one
module, confirm neither housing renders and no dead row appears, revert, and
show `git status` clean under `content/`.

**T05 — the skip control on the module page.** Target parameterised; the
title+intro block takes the id, `tabindex="-1"` and no ring. *Check:* criterion
9 — the panel's first focusable is the skip control, hidden until focused;
activating it lands focus on that block with no visible ring; tabbing on reaches
the module's own text, not the pager.

**T06 — the introduction's sections reach the list.** Stop discarding them;
attach as the current entry's sections. *Check:* criterion 7 in both halves —
with no introduction carrying a heading, „Wstęp" is a single row with nothing
beneath it on both modules' pages; with a heading temporarily added to one
introduction, the entry expands to it, links to the identifier the page gives
that heading, and following it lands the heading below the top edge; reverted,
`git status` clean under `content/`.

**T07 — the reference page.** Specimens for „Wstęp" as a link and as the current
entry. *Check:* criterion 16 — renders without error at 1280 px and 375 px, and
its specimens match what the module and lesson pages render.

**T08 — the sweeps.** No production code; run what is left and record it.
Criterion 1 (build, lint, colour-literal guard, contrast report unchanged);
criterion 12 (the lesson page's boxes and 007's behaviours at 1280 and 1585);
criterion 13 (back-to-top absent on the module page at every width); criterion
14 (scripting disabled at 1280 and 375: links navigate, disclosure opens and
closes, no highlight, no back-to-top, console clean); criterion 15 (every
module-page criterion checked on both modules); criterion 17 (`git diff --stat`
touches nothing under `content/`, `package.json` unchanged, no new network
request). *Commit:* the checked boxes in `tasks.md` and a factual entry under
"Agent notes" in `docs/sdd-journal.md` (AGENTS.md §7).

**T09 — the closing review.** A fresh subagent reads the diff against `spec.md`
(AGENTS.md §3, criterion 19). No commit unless it finds something.
**Criterion 18 is not closable by this run** — whether the two kinds of page now
read as one site is Viktar's eye. Leave the box unchecked and say so in the
final report, naming a module page and a lesson page at 1280 px as what to look
at.

## Gaps in the spec

Five. None stopped the plan. Each carries the assumption I would proceed under,
so a wrong assumption shows up in review rather than buried in a commit.

1. **What does the skip control say on the module page?** §5 fixes its target
   and §1 forbids redesigning the panel, but nothing says what the control
   reads. If today's label names a lesson it is a lie on a module page; if it is
   neutral, nothing is needed. *Assumption:* the label travels with the target as
   one parameter, so the lesson page's string stays byte-identical (§9 allows it
   exactly one visible change, and that is the new row) and the module page gets
   a matching Polish string naming the module's own text. If the existing label
   is already neutral, change nothing. Either way name it in the final report — a
   new student-facing string is worth a line.

2. **Criterion 10 versus §6.** "Every other box measures what it measured before
   this slice" cannot include vertical position, because §6 inserts a collapsed
   row above the title. *Assumption:* `left` and `width` are the invariants, and
   every box below the disclosure shifts down by one identical delta equal to
   the collapsed disclosure's height; a box shifting by anything else is the
   defect the criterion is hunting. Written down so the check is not silently
   weakened at the moment it is run.

3. **Are the introduction's sections really collected today?** §3 asserts they
   are collected at compile time and thrown away. If they are collected only on
   the lesson path, the premise is false in a way that turns T06 from "stop
   discarding" into "route the introduction through the collector that already
   exists". *Assumption:* extend the existing collector's reach, never add a
   second derivation (decision 13). Either way it stays one derivation; only
   T06's size changes. Report which it was.

4. **The breadcrumb's left edge.** Criterion 2 requires the module page's
   breadcrumb not to move, so it stays at today's inset, above the grid. If the
   lesson page's breadcrumb sits at the page margin instead, the two pages'
   breadcrumbs stay misaligned after this slice — exactly the sort of thing
   criterion 18 asks a human to judge. *Assumption:* obey criterion 2, leave it,
   and name the discrepancy in the final report rather than fixing it. Moving it
   is a spec change, and AGENTS.md §8 forbids editing an approved spec to match
   what the code did.

5. **`aria-current`'s value.** §2 and criterion 5 say "marked as the current
   location for assistive technology" without naming the value. *Assumption:*
   whatever 007 put on the current lesson's row, applied verbatim to whichever
   entry is current — most likely `aria-current="page"`, correct for „Wstęp" on
   the module page since the module page *is* the page. No new pattern.
