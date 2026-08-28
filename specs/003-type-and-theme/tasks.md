# tasks.md — 003-type-and-theme

- **Spec:** `specs/003-type-and-theme/spec.md`, approved 2026-08-28
- **Plan:** `specs/003-type-and-theme/plan.md`, approved 2026-08-28

Ordered. One task, one commit. A box is checked when the check has **run** and
its output has been shown — never when the code is merely written.

The default check is `npm run build`.

---

- [x] **T01 — Record the slice**

  `spec.md`, `plan.md` and this file into the repository.

  **Check:** the three files exist under `specs/003-type-and-theme/` and are
  committed.

- [ ] **T02 — Load the two faces and apply the split**

  `app/fonts.ts` with both `next/font/google` calls, `subsets: ['latin',
  'latin-ext']`, exposed as CSS variables. Wire the variables onto `<html>` in
  `app/layout.tsx`. In `app/globals.css`, set the element-level defaults: mono
  for `h1`–`h6`, `code`, `kbd`, `samp`, `pre`, `nav`; sans on `body`.

  **Check:** `npm run build` succeeds, and a lesson page's rendered HTML shows
  the two font variables on `<html>`. Colours are untouched in this task.

- [ ] **T03 — The build fails without the Polish subset**

  `scripts/check-design-invariants.mjs`, Check A only: every `subsets:` array in
  `app/fonts.ts` must contain `latin` and `latin-ext`, and at least two font
  calls must be present. Wire it ahead of `next build` in `package.json`.

  **Check:** `npm run build` succeeds as written; then remove `latin-ext` from
  one call, show `npm run build` failing with a message naming the reason,
  revert, show it passing again. *(Acceptance criterion 2.)*

- [ ] **T04 — Every colour becomes a token**

  `app/tokens.css` with ADR-0007's values: dark on bare `:root`, light on
  `:root[data-theme='light']`, `color-scheme` per theme, the role aliases
  (`--link`, `--rule-quote`, `--rule-table`) bound to existing values, and the
  type scale. Convert `app/globals.css` to `var()` throughout. `data-theme="dark"`
  on `<html>`. No `prefers-color-scheme` anywhere.

  **Check:** `npm run build` succeeds; the site renders dark; `app/globals.css`
  contains no colour literal.

- [ ] **T05 — The build fails on a stray colour literal**

  Check B in the same script: walk `app/`, `lib/`, `components/` for
  `.css`/`.ts`/`.tsx`, skip `app/tokens.css`, fail on hex and on the colour
  functions. Support the `/* design-token-exempt: reason */` comment. Document
  both known limits in the script's header.

  **Check:** `npm run build` succeeds as written; then add a hex literal to
  `app/globals.css`, show the build failing with file, line and the offending
  text, revert, show it passing. *(Acceptance criterion 3.)*

- [ ] **T06 — The theme applies before first paint, and can be toggled**

  The inline pre-paint script in an explicit `<head>` in `app/layout.tsx`,
  reading `ttcmd-theme` from `localStorage` inside `try/catch` and flipping to
  light only. `suppressHydrationWarning` on `<html>`. `app/theme-toggle.tsx` —
  client component, no React state, no `useEffect`, state-independent
  `aria-label`, icon swapped in CSS. Fixed top-right, with a comment naming the
  slice that will move it.

  **Check:** `npm run build` succeeds. In the browser: first visit paints dark;
  toggling switches; the choice survives a reload and a navigation; with light
  stored, a throttled reload paints light on the first frame with no flash.
  *(Acceptance criteria 7, 8, 9.)*

- [ ] **T07 — The reference page**

  `app/styleguide/page.tsx` and its CSS module: both faces at heading and body
  size, the ADR-0005 pangram in each face at each size, a paragraph of real
  Polish prose containing a link, and every token as a labelled swatch —
  **names only, no hex values**. English labels; nothing links to the page.

  **Check:** `npm run build` succeeds; `/styleguide` renders; the swatch set
  changes with the theme. *(Acceptance criteria 5, 6.)*

- [ ] **T08 — Verification pass, recorded**

  Compute and record every text-on-background contrast pair in both themes.
  Judge the light-theme link colour on rendered Polish prose. Check a
  phone-width viewport. Read the lessons in both themes. Record all of it in
  `specs/003-type-and-theme/verification.md`.

  **Check:** the file exists and every ratio in it is computed, not estimated.
  *(Acceptance criteria 4, 10, 11, 12, 13.)*

- [ ] **T09 — Close the slice**

  Fresh-context review of the whole diff against `spec.md`: every acceptance
  criterion met, nothing outside scope touched — no lesson content, no
  navigation, no MDX component. Record the outcome.

  **Check:** the review reports no gap affecting correctness or the criteria.
  *(Acceptance criterion 14.)*
