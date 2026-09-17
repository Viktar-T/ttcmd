# baseline.md — 024-module-marks, T01

What the front door does **before** this slice. Every number below was read off
a running browser at the width it names, not computed from the stylesheets.
Criteria 5, 8 and 9 are comparisons, and this is the thing they compare to.

- **Tree:** `6a59832` (spec, plan, tasks; no code)
- **Server:** `npm run dev`, Next 16.3.3 Turbopack, `http://localhost:3000`
- **Read:** 2026-09-17, built-in browser, `getBoundingClientRect` and
  `getComputedStyle`

---

## At 1440 × 900 (client width 1425 — a 15px scrollbar)

| What | Value |
| --- | --- |
| Band (`.moduleGrid`) | **1296.0 × …** at x = 64.6 |
| Hero (`.hero.lane`) | **760.0 × 220.0** at x = 64.6 |
| `--measure` | `47.5rem` = 760px (above the 88rem fold) |
| Course name `.heroTitle` | font-size **48.6px**, box 760.0 × 106.9 — two lines |
| Lede `.heroLede` | **760.0** × 28.8 at x = 64.6 |
| Button `.button` | 151.5 × 49.1 at x = 64.6 |
| **Module card** | **421.3 × 187.3** at x = 64.6 — all eight identical in height |
| `.moduleCardNumber` | box height **63.0**, font-size **63px**, at x = 84.3 |
| Cards on the page | **8** |
| Space beside the hero inside the band | 1296 − 760 = **536px** |

## At 1024 × 800 (client width 1009)

| What | Value |
| --- | --- |
| Band | **977.1** at x = 16 |
| Hero | **624.0** at x = 16 (`--measure` is 39rem below the 88rem fold) |
| Course name | font-size **48.6px** |
| Module card | 315.0 × **187.3** — three across |
| Space beside the hero inside the band | 977 − 624 = **353px** |

## At 375 × 812 (a phone)

| What | Value |
| --- | --- |
| `scrollWidth` / `clientWidth` | **375 / 375 — no horizontal scroll** |
| Course name | font-size **30.03px** (the clamp's `8vw` middle term), box 343.4 × 99.1 |
| Lede | 343.4 × 57.6 |
| Module card | 343.4 × **187.3** — one across |

## The card's accessible name

`.moduleCard` is a single `<a href="/moduly/00-start">` — **one anchor in the
card**, which is criterion 3's starting point. Its four children all compute to
`display: block` (they are grid items), so the accessible-name algorithm joins
them with spaces:

- `textContent` — `Moduł0Start1 lekcja`
- `innerText` — `Moduł` / `0` / `Start` / `1 lekcja`
- **accessible name — `Moduł 0 Start 1 lekcja`**

After the slice the kicker carries `Moduł 0` and the number span is gone, so the
same words arrive in the same order. Criterion 9 is that this string does not
move.

## Network

22 requests on a cold load of `/`: 1 document, 4 `woff2`, 2 CSS, 14 JS (dev
client and HMR), 1 RSC payload.

- **`<img>` elements: 0**
- **image-type requests: 0**
- `svg` elements in the document: 3 — the theme and presentation toggles, all
  inline already

Criterion 8 is that the image-request count stays at zero.
