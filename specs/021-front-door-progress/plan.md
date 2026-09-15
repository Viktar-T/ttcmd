# plan.md — 021-front-door-progress

- **Slice:** 021
- **Date:** 2026-09-15
- **Written from:** `constitution.md`, `AGENTS.md` and this slice's `spec.md`
  only — the fresh-context test of AGENTS.md §2, requirement 1. The repository
  was read afterwards so that the file map names real files and the geometry
  below is the stylesheet actually in the tree; nothing about intent comes from
  it.
- **Libraries:** none added, none removed. No Next.js API is used that the home
  page does not already use.

The spec was sufficient to plan from. Three small gaps are named in §6; none
blocks a step.

---

## 1. File map

| path | change |
| --- | --- |
| `app/page.tsx` | **Edited.** The hero loses the text-link paragraph and the `start` derivation; its one `.button` points at `/postep` and reads `Postęp grup` (§2). |
| `app/styleguide/page.tsx` | **Edited, one line.** The bordered-button specimen's label (§3). |
| `specs/021-front-door-progress/verification.md` | **New.** House convention since 012: the evidence for every criterion. |

**Not touched:** `app/nav.css` — `.hero`, `.heroLede` and `.button` all keep a
user and none needs a new declaration (criterion 10). `components/module-grid.tsx`
and `lib/content.ts` — criterion 6 and spec §4. `app/postep/` — out of scope.
`specs/008-*`, `specs/016-*` — AGENTS.md §8.

---

## 2. `app/page.tsx`

The hero becomes three children — title, lede, button:

```tsx
export default async function HomePage() {
  const course = await getCourse();

  return (
    <>
      <section className="hero lane">
        <h1 className="heroTitle">Aplikacje desktopowe i mobilne</h1>
        {/* …the existing course-name comment, unchanged… */}
        <p className="heroLede">
          Materiały i zadania kursu aplikacji desktopowych i mobilnych.
        </p>
        {/* The front door's one button opens the progress page (slice 021).
            Here rather than in the site header, which carries no navigation;
            adding some is a change to the look of the site. No guard: /postep
            is a static route in every build, so there is no page without a
            target. The lessons are the module grid directly below. */}
        <Link href="/postep" className="button">
          Postęp grup
        </Link>
      </section>

      <ModuleGrid modules={course} />
    </>
  );
}
```

**Removed:**

- `const start = …` and the seven-line comment above it (slice 008's rule;
  spec §3, decision 3).
- The `{start && ( … )}` guard around the button (decision 2).
- The `<p className="heroLede"><Link href="/postep">Postęp grup — gdzie jest
  twoja grupa</Link></p>` paragraph and the comment above it. That comment's
  point about the header carrying no navigation stays true and moves, shortened,
  onto the button. Its `.heroLede`-on-a-bare-paragraph argument goes with the
  paragraph.

**Becomes unused: nothing but `start`.** `Link` still renders the button;
`getCourse`, `course` and `ModuleGrid` still feed the grid. The derivation read
only `CourseModule.lessons` and `.href`, and `ModuleGrid` reads both, so no
export in `lib/` loses its last reader. `.heroLede` keeps the lede and `.button`
keeps the button and the specimen, so no CSS rule becomes unused.

The label is one JSX text child, so the prerendered HTML carries
`<a class="button" href="/postep">Postęp grup</a>` as a plain substring, with no
`<!-- -->` separators. The existing button already prerenders `class` before
`href`, so T01 can grep for it.

---

## 3. The reference page

`app/styleguide/page.tsx`, the specimen under `bordered button`:

```diff
             <a className="button" href="#">
-              Zacznij kurs
+              Postęp grup
             </a>
```

`href="#"` stays, and so do the specimen label, the wrapper and every other
section: spec §5 changes what the specimen *reads* and nothing else. A
repository-wide search finds `Zacznij kurs` in application code only in these
two files. The other hits are specs from earlier slices, which are history.

---

## 4. The hero's grid, before and after

`.hero` is `display: grid; justify-items: start; gap: 1.1rem`, and it is the
first child of `main`, which is a grid with `row-gap: var(--gap-apart)`.

**Vertical.** Four rows and three gaps become three rows and two gaps. The
removed row is the **last** one, so the title, the lede and the button keep
their tops. The button does not move at all, which is spec §1's "position" in
full. The hero gets shorter by the link paragraph's height plus one gap
(1.1rem = 17.6 px). `main`'s row gap and the hero's `margin-block-start` do not
change, so the module grid moves up by exactly that amount and nothing else. At
1280 px the paragraph is one line of `--text-lg`; at narrow widths it may have
wrapped, and the shift is larger. T03 measures it rather than assuming it:
`before.grid.top − after.grid.top = before.paragraph.height + 17.6` (±1 px).

**Horizontal.** No left edge depends on the removed paragraph.
`justify-items: start` puts every hero child at the start of the hero's box. The
hero's width is `.lane`'s — `width: 100%` up to `--measure` — and is not derived
from its children. The grid is a separate `.lane` in the same `main` column. At
1280 px (= 80rem) that column sits in the anchored frame: a fixed
`--content-inset` track of 408 px, with the 624 px lane centred in 736 px, which
gives **464 px**, the figure 016 measured for all four boxes. A fixed track
cannot follow the page getting shorter, so criterion 7's edges cannot move even
if a vertical scrollbar disappears. (Below 80rem the column is centred on the
viewport and a disappearing classic scrollbar could shift it by half its width.
Criterion 7 measures left edges only at 1280, and `scrollWidth − clientWidth` is
not affected.)

**One horizontal size does change:** the button's width. The label goes from
12 to 11 monospace characters at `--text-base` (0.6em advance ⇒ 9.6 px each),
so the button goes from 016's measured **162 px** to **152.4 px**. Its left edge
stays, and its right edge moves 9.6 px left. See §6.1.

---

## 5. Order of work

One commit per step, `021/TNN:`. The instruments are the ones already used here:

- `.next/server/app/**/*.html` is the prerendered markup;
- `document.documentElement.scrollWidth − clientWidth` against `npm run dev`
  checks for sideways scrolling (012);
- a before/after capture of every page's HTML with `.next/BUILD_ID` replaced by
  a placeholder is 016's and 020's comparison.

A build overwrites `.next/`, including a build started by another process, so
each capture is copied into the scratchpad as soon as its build finishes. No
dev server runs while a build does.

| # | step | the check |
| --- | --- | --- |
| **T01** | `app/page.tsx` as §2. | `npm run build` succeeds and lists `/` as `○` static; `npm run lint` clean — **criterion 1**. In `.next/server/app/index.html`: `class="button"` occurs exactly once, and `<a class="button" href="/postep">Postęp grup</a>` is present — **criterion 2**. `Zacznij kurs` occurs 0 times (2 today: the element and the inline RSC payload) — **criterion 3**. `gdzie jest twoja grupa` occurs 0 times — **criterion 4**. The whole file is searched, payload included. |
| **T02** | `app/styleguide/page.tsx` as §3. | `npm run build`, `npm run lint`. `git show --stat HEAD` reports 1 insertion and 1 deletion in that one file. `git grep -n "Zacznij kurs" -- app components lib` is empty. |
| **T03** | No code. The before/after comparison, both sides built back-to-back against the same content tree. 020 found that content edits made between two builds get measured as code changes. | **After side**, slice code in place: build, then copy the HTML and `BUILD_ID` to `scratch/after/`. Start the dev server and, at 1280 px, record `getBoundingClientRect()` of `.heroTitle`, `.heroLede`, `.button`, `.moduleGrid`. Record `scrollWidth − clientWidth` at 320, 375 and 1280. Click `.hero .button`; `location.pathname` must be `/postep` and `h1.pageTitle` must render. The check reads the pathname, not a text search: the `/postep` title and the button label are the same words — **criterion 5**. Stop the dev server. **Before side:** confirm `git status --porcelain -- app/page.tsx app/styleguide/page.tsx` is empty. Run `git restore --source=<T01>^ -- app/page.tsx app/styleguide/page.tsx`: path-scoped and byte-exact. Do not use `git checkout`, which would touch Viktar's uncommitted content, and do not use PowerShell `>`, which re-encodes. Build, copy the output to `scratch/before/`, and take the same four rects plus the link paragraph's height in dev. Then `git restore --source=HEAD --` the same two paths, and the porcelain check is empty again. **Compare** with the build id normalised on both sides: • **criterion 6**: the substring from `<ul class="moduleGrid lane"` to its first `</ul>` is byte-identical in both `index.html` files. • **criterion 7**: the four `left` values are equal before and after (expected 464); all overflow readings are 0; the grid's top moved by §4's amount; the button's top did not move. • **criterion 8**: the two sides list the same set of pages, and every page except `index.html` and `styleguide.html` is byte-identical. If any other page differs, show its diff as a finding and do not normalise it away. • **criterion 9**: in `before/styleguide.html`, replace every `Zacznij kurs` with `Postęp grup`, record the count (2 today), and the result must be byte-identical to `after/styleguide.html`. • **criterion 10**: `git diff --stat <T01>^ HEAD -- . ':!specs'` names only the two files of §1; `git diff <T01>^ HEAD -- package.json package-lock.json 'app/*.css'` is empty; the diff adds no `use client`. |
| **T04** | `verification.md`, then the closing review in a fresh subagent context (AGENTS.md §3). | **Criterion 12**: the review reports no gap. **Criterion 11 stays unchecked**, by the spec's own terms. The final report names it: whether a student who came for a lesson finds the grid without „Zacznij kurs". |

T01 and T02 stay separate so that T02's one-line diff is its own evidence for
"nothing else on the reference page changes".

**Every criterion has a step.** 1 → T01 · 2 → T01 · 3 → T01 · 4 → T01 · 5 → T03
· 6 → T03 · 7 → T03 · 8 → T03 · 9 → T03 · 10 → T03 · 11 → nobody, by design ·
12 → T04.

---

## 6. Where the spec left this plan guessing

1. **"Keeps the style, the size and the position" (§1).** The button's box —
   font, padding, border — is unchanged, but its rendered width shrinks from 162
   to 152.4 px, because the new label is one character shorter (§4). This plan
   reads "size" as the style's box, not the pixel width. Criterion 7 asks only
   about left edges, so it does not decide the question either way.
2. **"That specimen's label is the only change to the reference page's markup"
   (criterion 9).** The prerendered HTML carries the label twice, in the element
   and in the inline RSC payload. This plan reads "the label" as every
   occurrence of the string, and T03 records the count.
3. **"Before this slice" (criteria 6, 7, 8).** The spec does not pin what
   "before" is built against while content keeps moving in the tree. T03 takes
   it as the pre-slice application code, built back-to-back with the slice's
   code against one content tree, which is the reading 020's verification
   settled on.
