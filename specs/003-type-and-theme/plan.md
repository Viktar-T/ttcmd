# plan.md — 003-type-and-theme

- **Slice:** 003
- **Spec:** `specs/003-type-and-theme/spec.md`, approved 2026-08-28
- **Status:** proposed
- **Stack facts this plan assumes:** Next 16.3.3, React 19.2.8, App Router with
  `app/` at the repo root, TypeScript `strict`, **plain CSS — no Tailwind, no
  PostCSS config, no CSS-in-JS**. Verified against `package.json`,
  `next.config.ts` and `app/globals.css` before writing this.

---

## Shape of the change

Six moving parts, and one rule that shapes all of them: **`app/tokens.css` is
the only file in the repository permitted to contain a colour literal.**
Everything else references a token. That single sentence is what the build guard
enforces, and it is why the token file exists as its own file rather than as a
block at the top of `globals.css` — the guard's exemption has to be a path, not
a line range.

## File map

| File | New/Edit | What it holds |
| --- | --- | --- |
| `app/fonts.ts` | **new** | The two `next/font/google` calls, exported. The only place a family is named. |
| `app/tokens.css` | **new** | Every colour token, per theme, plus the type scale. **The guard's only exempt path.** |
| `app/globals.css` | edit | Reset, the mono/sans element defaults, base colours — all via `var()`, no literals. |
| `app/layout.tsx` | edit | Font variables and `data-theme` on `<html>`, the pre-paint script, the toggle. |
| `app/theme-toggle.tsx` | **new** | `"use client"`. The provisional control. |
| `app/styleguide/page.tsx` | **new** | The reference page: pangram, both faces, every token as a swatch. |
| `app/styleguide/page.module.css` | **new** | Its layout. Kept out of `globals.css` — it is not a site-wide concern. |
| `scripts/check-design-invariants.mjs` | **new** | The two build guards. Node built-ins only. |
| `package.json` | edit | `build` runs the guards before `next build`. |

**No dependency is added.** The guards are a Node script using `node:fs` and
`node:path`, so AGENTS.md §7's ADR requirement is not triggered. If that turns
out to be wrong during execution — if a guard genuinely needs a parser — stop
and write the ADR rather than adding the package quietly.

Not touched: `content/`, `lib/`, `app/moduly/**`, `next.config.ts`. The lessons
are the test subject; they receive the type split by inheritance and no lesson
file is edited.

## The parts

### 1. Fonts — `app/fonts.ts`

`next/font/google` for both families, per ADR-0005. Both are variable fonts, so
no `weight` is specified; if either turns out not to be variable at build time
the loader will say so and `weight` gets added.

```ts
import { Inter, JetBrains_Mono } from 'next/font/google'

export const sans = Inter({
  subsets: ['latin', 'latin-ext'],   // latin-ext carries ą ć ę ł ń ś ź ż — ADR-0005
  display: 'swap',
  variable: '--font-sans',
})

export const mono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-mono',
})
```

The `variable` option is what lets the rest of the CSS refer to
`var(--font-mono)` without any component naming a family — ADR-0005's third
loading requirement. `next/font` self-hosts both at build time, which satisfies
the spec's "no request leaves the visitor's browser".

Two consequences worth stating, because they constrain the guard in §6:
`next/font` options are read by the compiler's static analysis, so `subsets`
**must be an array literal at the call site**. It cannot be imported from a
shared constant, which rules out enforcing the subset with a TypeScript type.
The guard therefore reads this file as text.

### 2. Tokens — `app/tokens.css`

Values are ADR-0007's, transcribed unchanged.

```css
:root {
  color-scheme: dark;
  --bg: #2A2926;
  --bg-code: #1E1D1B;
  --text: #EDEBE6;
  --text-muted: #A8A49C;
  --rule: #45433E;
  --accent-surface: #C9C2F5;
  --accent-line: #C9C2F5;
  --accent-ink: #1C1B18;
}

:root[data-theme='light'] {
  color-scheme: light;
  --bg: #F7F6F2;
  --bg-code: #1E1D1B;
  --text: #23221F;
  --text-muted: #5E5A53;
  --rule: #D8D5CD;
  --accent-surface: #C9C2F5;
  --accent-line: #5B4FBF;
  --accent-ink: #1C1B18;
}
```

Dark lives on bare `:root`, not on `[data-theme='dark']`, so that dark is what
renders even if the attribute is missing entirely. That is the spec's default
expressed as a CSS fact rather than as a promise about JavaScript.

`color-scheme` is declared per theme so scrollbars and form controls follow.
This is us *telling* the browser what we are, not *asking* it what the user
prefers — **there is no `prefers-color-scheme` media query anywhere in this
slice**, per ADR-0007 as amended.

**Role aliases**, for the roles slice 004 needs. Bound to existing values; no
new hue is introduced, which is what spec §2 requires:

```css
:root {
  --link: var(--accent-line);
  --rule-quote: var(--rule);
  --rule-table: var(--rule);
}
```

**Type scale**, also here — one token file, not two. Sizes as `rem`, line
heights unitless:

```css
:root {
  --text-sm: 0.875rem;  --text-base: 1rem;   --text-lg: 1.125rem;
  --text-xl: 1.375rem;  --text-2xl: 1.75rem; --text-3xl: 2.25rem;
  --leading-tight: 1.25;  --leading-normal: 1.6;
}
```

The reading column's `max-width` is **not** set here and the existing `main`
rule in `globals.css` is left exactly as it is. Measure is 004's (spec §3).

### 3. The split — `app/globals.css`

Rewritten to reference tokens only. The split is element-level, so Markdown
rendered by slice 004 inherits it with nothing to annotate:

- `body` → `var(--font-sans)`, `var(--text)` on `var(--bg)`
- `h1, h2, h3, h4, h5, h6` → `var(--font-mono)`, `--leading-tight`
- `code, kbd, samp, pre` → `var(--font-mono)`
- `nav` → `var(--font-mono)` (nothing uses it yet; the rule is the contract with the nav slice)
- `a` → `var(--link)`

Inline code gets the face and a slightly smaller size and no background box —
`design-reference.md` is explicit that the pill treatment is wrong here. Code
*block* styling stays out; that is 005.

**Escape hatch.** The two legitimate overrides named in spec §1 are written as
`font-family: var(--font-sans)` / `var(--font-mono)` at the point of use. No
utility classes are invented until something actually needs one — inventing
`.font-mono` now would give 004 a second way to do the same thing.

### 4. Theme — `app/layout.tsx`

```tsx
<html
  lang="pl"
  data-theme="dark"
  className={`${sans.variable} ${mono.variable}`}
  suppressHydrationWarning
>
```

`suppressHydrationWarning` is required and not decorative: the pre-paint script
mutates `data-theme` on the element React owns, and without it React logs a
mismatch on every light-theme load.

**The pre-paint script.** A raw inline `<script dangerouslySetInnerHTML>` inside
an explicit `<head>` in the root layout — not `next/script`. The docs for
`beforeInteractive` describe a strategy for external `src` scripts whose
execution "does not block page hydration"; what this needs is a classic
parser-blocking inline script, which is a different thing. Its whole body:

```js
try {
  if (localStorage.getItem('ttcmd-theme') === 'light')
    document.documentElement.dataset.theme = 'light'
} catch {}
```

Wrapped in `try/catch` because `localStorage` throws outright in some privacy
modes, and a theme preference is not worth a blank page. The script only ever
flips *to* light: dark is already in the server-rendered HTML, so the common
case executes nothing.

**Verify this empirically during execution.** React 19 hoists some elements out
of the tree, and if the script is moved after the stylesheet it stops being
pre-paint. Acceptance criterion 9 — throttled reload with a light preference
stored — is the check that would catch it. If it fails, the fallback is to move
the attribute decision server-side onto a cookie, which is a different design
and means stopping and amending the plan, not improvising.

### 5. The toggle — `app/theme-toggle.tsx`

A client component **with no React state and no `useEffect`**:

```tsx
'use client'
export function ThemeToggle() {
  return (
    <button
      type="button"
      aria-label="Przełącz motyw"
      onClick={() => {
        const el = document.documentElement
        const next = el.dataset.theme === 'light' ? 'dark' : 'light'
        el.dataset.theme = next
        try { localStorage.setItem('ttcmd-theme', next) } catch {}
      }}
    >…</button>
  )
}
```

State would have to be initialised to *something* on the server, and that
something is wrong for every visitor who chose light — the classic toggle
hydration mismatch. Reading the DOM on click sidesteps it completely. The icon
follows the same rule: both glyphs are in the markup and CSS shows the right one
off `:root[data-theme='light']`, so nothing about the button's appearance
depends on JavaScript state. The `aria-label` is deliberately state-independent
for the same reason.

Placed in the layout, outside `<main>`, `position: fixed`, top right.
**Provisional by decision (spec §4)** — the nav slice moves it. A comment in the
file says so, naming the slice, so it is not mistaken for finished work.

Polish label, because it is a student-facing control (Article III). The
styleguide page's labels are English, because it is not.

### 6. The guards — `scripts/check-design-invariants.mjs`

One file, two checks, distinct failure messages so acceptance criteria 2 and 3
each have their own observable output. Wired ahead of the build:

```json
"build": "node scripts/check-design-invariants.mjs && next build"
```

**Check A — the Polish subset.** Reads `app/fonts.ts` as text, finds every
`subsets: [...]` array, and fails unless each contains both `latin` and
`latin-ext`. Also fails if fewer than two font calls are found, so that deleting
the file cannot pass the check vacuously. Text, not types, for the reason given
in §1.

**Check B — no colour literal outside the tokens.** Walks `app/`, `lib/` and
`components/` (when it exists) for `.css`, `.ts`, `.tsx`; skips
`app/tokens.css`; fails on `#rgb`/`#rrggbb`/`#rrggbbaa`, `rgb(`, `rgba(`,
`hsl(`, `hsla(`, `oklch(`, `oklab(`, `color-mix(`. Reports file, line and the
offending text.

Two honest limits, both to be written into the script's own header comment
rather than left for someone to rediscover:

- It catches the realistic failure — somebody pastes `#2A2926` into a component
  — not every conceivable one. A CSS named colour (`white`) slips through. That
  is accepted; widening it to a named-colour list produces false positives on
  English prose in `.tsx` for very little gain.
- `#abc`-shaped **id selectors** would trip it. The repo uses none. If one ever
  appears, it takes the exemption below rather than a weakened regex.

**Exemption mechanism**, per spec §2 — explicit and recorded, never a softened
rule: a `/* design-token-exempt: <reason> */` comment on the preceding line
skips that line, and the reason is in the diff forever.

### 7. The reference page — `app/styleguide/page.tsx`

Route `/styleguide`. English slug and English labels: Article III puts
student-facing text in Polish and repo-facing text in English, and this page is
a maintainer's instrument that happens to be publicly reachable. Nothing links
to it (spec §5). It is a plain static server component.

Sections: both faces at heading and body size; the ADR-0005 pangram
`Zażółć gęślą jaźń — ĄĆĘŁŃÓŚŹŻ ążćęłńóśź` rendered in each face at each size; a
paragraph of real Polish prose with a link in it, for criterion 11; every token
as a labelled swatch; muted text, the rule, and the accent surface with
`--accent-ink` on it, since lessons never exercise those.

**A trap to avoid:** printing each token's hex value next to its swatch would put
colour literals in `page.tsx` and trip Check B — the styleguide failing its own
guard. Swatches are labelled with **token names only**; the values live in
ADR-0007 and in `tokens.css`. Reading computed values client-side would restore
them, and is not worth making this page interactive.

## Order of work

Sequenced so the build is green at every commit boundary.

1. **Fonts.** `app/fonts.ts`; wire the variables into `layout.tsx`; apply the
   mono/sans element defaults in `globals.css`. Build stays green; the lessons
   visibly change face.
2. **Check A**, immediately behind the fonts it guards. Demonstrate it by
   removing `latin-ext`, showing the failure, reverting.
3. **Tokens.** `app/tokens.css`; convert `globals.css` to `var()` throughout;
   `data-theme="dark"` on `<html>`. The site turns dark. **No literal survives
   in `globals.css` after this step** — which is what makes step 4 possible.
4. **Check B.** Added only now: added earlier it would fail against the CSS that
   step 3 removes. Demonstrate the same way.
5. **Pre-paint script and the toggle.** Both themes reachable. Criterion 9 is
   checked here, and it is the step most likely to send us back to §4's
   fallback.
6. **The styleguide page.**
7. **Verification pass.** Contrast computed and recorded for every pair in both
   themes; the light-theme link judged on rendered Polish prose; phone-width
   viewport; throttled reload; the lessons read end to end in both themes.

Steps 2 and 4 are deliberately *after* the thing they guard. A guard written
first would be a red build for the length of a task, and AGENTS.md §3 wants each
task closing on a passing check.

## Risks

| Risk | Signal | Response |
| --- | --- | --- |
| React 19 relocates the inline script; it stops being pre-paint | Criterion 9 flashes on a throttled reload | Stop. Cookie-based server rendering is a different design — amend the plan, do not improvise. |
| Either family is not variable in Google's metadata | `next/font` errors at build naming `weight` | Add explicit `weight` ranges. No ADR: ADR-0005 chose the families, not their axes. |
| Check B false-positives on legitimate CSS | Build fails on something correct | Use the exemption comment with a written reason. Do not loosen the regex. |
| `#5B4FBF` passes 5.86:1 and still reads badly in Polish prose | Criterion 11, by eye | A new value needs an ADR amending 0007. Do not silently retune a ratified token. |
| Font download needs network at build time | Build fails offline | Expected. Vercel has network; a local offline build is not a supported case. |

## What this plan does not do

Named so the reviewer can check the diff against it: no MDX components, no
navigation or header beyond the toggle's fixed placement, no code-block styling,
no blockquote or table treatment, no prose measure, no sitemap or robots
handling, no semantic callout colours, no content edits.
