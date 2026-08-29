# verification.md — 007-contents-panel

Evidence for the acceptance criteria in `spec.md`, accumulated task by task.
Numbers are **measured**, not asserted. Measurements are taken in the in-app
driven browser against the dev server (`npm run dev`), the same instrument for
the baseline and for every later comparison, so the pairs are commensurable.
Viewport 1280×800 unless a check says otherwise; with the vertical scrollbar
the document `clientWidth` is 1265 px, which is why centred boxes read
`264.5` rather than `272`.

---

## T04 — The baseline the panel must not move (criterion 7's left side)

Taken on the **unmodified site** (commit `769baac`), before any code of this
slice exists. `npm run build` passes on this tree; the contrast report and
guards of the build output are unchanged from slice 006.

### The article's geometry at 1280 px, longest lesson

`/moduly/01-jak-powstaje-oprogramowanie/czterdziesci-lat-zmian`, read with
`getBoundingClientRect()`:

| box | left | width |
| --- | ---: | ---: |
| `.prose` (the content box) | 264.5 | 736 |
| the text track (first `> p`) | 320.5 | 624 |

736 px = 46rem (the frame's content track), 624 px = 39rem (`--measure`).
`document.documentElement.scrollWidth <= clientWidth` holds.

### Slice 004's six adjacency sequences, re-measured

Measured as `next.top − previous.bottom` against the second element's computed
`margin-top`; every preceding element's `margin-bottom` is 0px. The quotation
pairs live on other lessons (the longest lesson has no blockquote), measured
at the same viewport via a same-origin 1280×800 frame:

| sequence | where | measured gap | margin-top | 004's number |
| --- | --- | ---: | ---: | ---: |
| paragraph → list | czterdziesci-lat-zmian | 25.6 | 25.6 | 25.6 |
| list → heading | czterdziesci-lat-zmian | 68 | 68 | 68 |
| paragraph → quotation | od-podpowiedzi-do-agenta | 40 | 40 | 40 |
| quotation → heading | co-model-naprawde-potrafi | 68 | 68 | 68 |
| paragraph → diagram | na-zywo-agent-buduje-aplikacje | 40 | 40 | 40 |
| diagram → paragraph | czterdziesci-lat-zmian | 40 | 40 | 40 |

All equal slice 004's recorded numbers.

### Slice 006's furniture, present

On the same lesson page: `[data-band]` present; breadcrumb landmark
`nav` with accessible name "Ścieżka nawigacji"; `.pager` present;
`header.siteHeader` present.

### And the thing this slice exists to add, absent

All 9 `> h2` elements of the longest lesson have **no `id`** — confirmed by
reading `h2.id` on each: empty. There is nothing to link to yet.

*(Also done under this task, housekeeping the roadmap sanctions: the untracked
`_to_delete/` leftovers at the repo root were deleted — they had begun failing
`next build`'s type-check on the unmodified tree. Untracked, so no commit
records the deletion; noted here instead.)*

## T05 — Section anchors (criteria 2, 3, and 20 in part)

**A working-tree note that matters to every later check:** the content under
`content/moduly/01-…` carries Viktar's uncommitted edits (present since before
this slice started — the session's opening `git status` shows them). The
working tree is what builds, so evidence below reads the working-tree
content; the longest lesson currently has **9** sections and
`co-model-naprawde-potrafi` **14**, matching the spec's counts.

### Criterion 2 — every id lowercase ASCII, derived, unique

`npm run build` passes. Ids read from the rendered pages
(`.prose > h2[id]`, in document order):

`czterdziesci-lat-zmian` (9 of 9 h2s carry ids; all match
`^[a-z0-9]+(-[a-z0-9]+)*$`; all unique):

```
dwie-osie-czasu                            Dwie osie czasu
pulpit-od-asemblera-do-xaml-a              Pulpit: od asemblera do XAML-a
telefon-gdy-producent-wybiera-za-ciebie    Telefon: gdy producent wybiera za ciebie
dlaczego-nastepowala-zmiana                Dlaczego następowała zmiana
co-sie-nie-zmienilo-od-1984                Co się nie zmieniło od 1984
obietnica-wraca-po-raz-kolejny             Obietnica wraca po raz kolejny
jak-czytac-nastepna-zmiane                 Jak czytać następną zmianę
cwiczenia                                  Ćwiczenia
zrodla                                     Źródła
```

`co-model-naprawde-potrafi` (14 of 14; same checks pass) — the derivation
handles the awkward ones as specified: *"Problem 70%"* → `problem-70`,
*"…ciebie (jeszcze)"* → `…-ciebie-jeszcze`, *"Źródła"* → `zrodla`.

### Criterion 3 — an unrepresentable heading fails the build, named

A temporary lesson `content/moduly/00-start/_temp-criterion-3.mdx` containing
`## ???` was created; `npm run build` exited non-zero with:

```
Error: content/moduly/00-start/_temp-criterion-3.mdx: [next-mdx-remote] error compiling MDX:
heading "???" cannot derive a section id — nothing of it survives the ASCII
derivation. Reword the heading, or extend the transliteration in
lib/section-anchors.ts on purpose.
```

— the lesson and the heading, both named. The file was deleted;
`git status --porcelain -- content/` afterwards shows exactly the pre-existing
set of Viktar's content edits and nothing of this slice's; `npm run build` on
the reverted tree passes.

*(One edit outside the plan's T05 file list: the reference page's two
specimen-lesson literals gained `sections: []` — the type now requires the
field, and the build is the gate that noticed. The real §9 specimens still
arrive in T10.)*

## T06 — The panel beside an unmoved article (criteria 4, 5, 6, 15 in part, 7, 17)

`npm run build` passes. All of the following read from the rendered pages at
1280×800, dark theme.

### Criteria 4, 5, 6 — the panel's markup, longest lesson

`nav[aria-label="Spis treści"]`, visible at 1280 px, distinct from the
breadcrumb landmark (`aria-label="Ścieżka nawigacji"`). Seven lesson rows in
`order` (the working-tree content's count), each carrying identity string and
title; the current row is a `<span aria-current="page">` — **not a link** —
and every other row is a link; nine section entries beneath the current row,
`href`s equal to the article's `h2` ids **in the same order**
(`orderMatchesArticle: true`).

### Criterion 15 (markup half) — the skip control

The panel's first focusable element is `a.contentsSkip[href="#tresc"]`; the
article carries `id="tresc"` and `tabindex="-1"`.

### Criterion 7 — the article has not moved

Same instrument, same viewport, same lesson as the T04 baseline:

| box | baseline | with the panel |
| --- | --- | --- |
| `.prose` | 264.5 / 736 | **264.5 / 736** |
| text track | 320.5 / 624 | **320.5 / 624** |

Equal to the pixel. `scrollWidth <= clientWidth` still holds. The panel box
reads left 32.5 / right 240.5 / width 208 (13rem); the gap from its rule to
the content track is 24 px (1.5rem); its end border computes to
`rgb(131, 128, 122)` = `#83807a` = `--rule-strong`.

### Criterion 17 — module 0

`/moduly/00-start/git-i-github`: exactly **one** lesson row, a `<span
aria-current="page">` reading `0c …` (derived from `order: 3`), expanded to
that lesson's **nine** sections.

*(Console note: the dev overlay lists React's dev-only warnings about
kebab-case SVG attributes — `stroke-width`, `font-size` — inside the lessons'
own inline diagrams. Content-authored, present before this slice, invisible
in production; out of this slice's scope and left alone.)*

## T07 — The disclosure and the fold (criterion 12's static half, 13 in part)

`npm run build` passes. On the longest lesson, read from the DOM at each
width:

| viewport | panel | disclosure | collapsed by default | no h-scrollbar |
| --- | --- | --- | --- | --- |
| 1024×800 | `display: none` | visible | yes | yes |
| 768×800 | `display: none` | visible | yes | yes |
| 375×812 | `display: none` | visible | yes | yes |

At 1024 px the full interaction was exercised: the summary click opens the
details, a second click closes it, and the disclosure's box sits **between
the lesson header's bottom edge and the article's top edge**
(`betweenHeaderAndArticle: true`). The summary reads "Spis treści", keeps the
browser's own marker (`display: list-item`), and measures **44.7 px** tall —
a touch target.

**The no-JavaScript half, by construction and by probe:** the disclosure is a
native `<details>`; a same-origin iframe sandboxed **without**
`allow-scripts` was loaded with the same lesson, and toggling its summary —
a user-agent default action, no page script runs in that frame — set
`details.open` to true, with all 9 section links present in the frame's
markup. (The full no-JS walk, including the absence of highlight and
back-to-top, is T11's, after those exist.)

## T08 — The scroll-spy (criteria 8, 9, 10, 11, 12's dynamic half)

**Instrument note, so the numbers are honest:** the driven browser pane runs
hidden, and a hidden document suspends the rendering steps — native `scroll`
events and `requestAnimationFrame` with them — so the harness dispatches
`new Event("scroll")` after each programmatic `scrollTo`, which is precisely
the event a visible browser fires on its own. One code change came out of
this rather than the harness: `schedule()` falls through to a direct
`apply()` when `document.hidden`, since an rAF that never fires must not be
the only path to the state. A double check of every state below was also read
synchronously via that path.

### Criterion 8 — the three states, longest lesson, 1280×800

| state | expected | `aria-current="location"` reads |
| --- | --- | --- |
| `scrollY = 0` (the introduction) | nothing | **nothing** (0 elements) |
| 4th heading 10px past the 6rem reading line | `dlaczego-nastepowala-zmiana` | exactly that id — 2 elements, the panel's copy and the disclosure's, one id |
| document bottom | `zrodla` (the last) | `zrodla` |

### Criterion 9 — following a section link

From the top, clicking the panel's `obietnica-wraca-po-raz-kolejny`: the
heading lands at **32.4 px** below the viewport top (`scroll-margin-top:
2rem`), the URL gains the fragment, and the highlight moves to the target.

**The pin, including the case the plan's "Gaps in the spec" records:** on
`git-i-github` at 1280×1600, clicking `cwiczenia` (not the last section)
lands the viewport **at the document bottom**, where the geometric bottom
rule alone would highlight `zrodla` — the pinned target `cwiczenia` stays
active. A real scroll of −500 px releases the pin and geometry resumes
(`galaz-i-pull-request`, correct for that position).

### Criteria 10 and 11 — the panel scrolls itself; sticky

The fourteen-section lesson at **1280×600**: the panel's content is 963 px in
a 536 px box (`hasOwnScrollbar: true`). Scrolling the page to its bottom made
the spy self-scroll the panel to `scrollTop = 240`, the active `zrodla` entry
**visible inside the panel** — and the page's own position bit-identical
before and after the panel's self-scroll. Driving the panel's scroller from 0
to its end moved the page by **0 px** (`9250 → 9250`). Deep in the longest
lesson at 1280×800 (`scrollY = 8985`) the panel sits on screen at
`top = 32 px` — sticky.

### Criterion 12, dynamic half — the disclosure highlights the same way

375×812, disclosure open, scrolled so the 6th heading passed the line: the
disclosure's `liczba-ktora-dotyczy-ciebie-najbardziej` entry carries
`aria-current="location"` and computes to the inverted pair —
`background rgb(237, 235, 230)` = `--text`, `color rgb(42, 41, 38)` =
`--bg`. No horizontal scrollbar.

## T09 — Back to top (criterion 14)

At **375×812** and at **1280×800**, on the longest lesson:

- `scrollY = 0`: the control is **absent** (not hidden — not in the DOM).
- Past one viewport of scroll: present — a 44×44 px `<button
  aria-label="Wróć na początek">`, fixed 20 px from the bottom-right,
  computing to `--bg` ground, `--text` glyph, `--rule-strong` border.
- Activation: `scrollY` returns to 0 **and** `document.activeElement` is
  `MAIN` — a keyboard user's next Tab starts from the top. Back at the top,
  the control is absent again.
- The landing page, `/moduly` and the module page contain no trace of it in
  their served HTML; nor does the **lesson's own served HTML** — the control
  is client-rendered from null, so with JavaScript disabled it never exists.

## T10 — The reference page (criterion 18)

`npm run build` passes. `/styleguide` gains a "The contents panel" section
with four specimens, read from the rendered page:

1. **The panel**, the real component with specimen data — visible and
   `position: static` under the specimen override at every width; 2 lesson
   rows, 4 section entries, the skip control present.
2. **The row states**, hand-frozen: the current-lesson row a `SPAN`; the
   active entry carries `aria-current="location"` and computes to the
   inverted pair (`rgb(237, 235, 230)` on `rgb(42, 41, 38)`); rest and
   hover/focus states live.
3. **The disclosure**, the real component — visible at every width, native
   `details`, collapsed by default.
4. **Back to top** — the real markup, in flow (`position: static`), 44 px.

*(A screenshot of the section could not be captured: the driven browser pane
runs hidden and suspends repaints on deep scrolls, so frames beyond the
initial paint come back stale. Every property above is read from the DOM and
computed styles instead; how the section looks is one of the human-eye items
in the final report.)*

## T11 — The verification pass (criteria 1, 13, 15, 16, 19, 20)

### Criteria 1 and 16 — the build's own guards

`npm run build` passes end to end: "Design invariants OK." — no colour
literal outside `app/tokens.css` (Check B scans every `.css`/`.ts`/`.tsx`
under `app/`, `lib/`, `components/`, which includes everything this slice
added) — and Check E prints, among the floors unchanged from slice 006:

```
dark  (:root)               --rule-strong  on --bg   3.69:1  (needs 3)
:root[data-theme="light"]   --rule-strong  on --bg   3.64:1  (needs 3)
```

which is the value on the panel's divider, the disclosure's box and the
back-to-top's border (computed border colours read off the DOM in T06 and
T09). The decorative `--rule` is untouched — `git log` for the slice shows no
commit editing `app/tokens.css` at all. The inverted active entry and the
focus indicator are existing pairs the same report covers (`--text` on
`--bg`, `--accent-line` on `--bg` at 8.67:1 / 5.86:1).

### Criterion 13 — the no-JavaScript walk, whole

A same-origin iframe sandboxed **without** `allow-scripts`, loaded with the
longest lesson at 1280×800 — no page script runs in that frame:

- the panel is present with 6 lesson links and 9 section links;
- clicking a section link navigates the frame to `#cwiczenia` and the
  browser scrolls it — the heading lands at **32 px** below the top edge,
  the `scroll-margin-top` doing its work as pure CSS;
- the disclosure's summary opens and closes it (user-agent default action);
- a lesson link's `href` resolves to the real lesson route;
- **no** `aria-current="location"` exists anywhere, and **no** back-to-top
  control exists — neither is in the server HTML at all;
- the console shows no page errors (the only entries are React's dev-only
  kebab-case SVG warnings from the lessons' own diagrams, pre-existing).

### Criterion 15 — the skip control, under real keys

With focus in the page, two Tab steps after the breadcrumb land on
`a.contentsSkip` — which is **visible while focused** (156×22 px, from
1×1 clipped), matches `:focus-visible`, and shows the site's focus outline
in `--accent-line` (8.67:1 on the panel's surface, per Check E above).
Activating it sets `#tresc` and moves real focus to the article
(`document.activeElement` = the `.prose` div, outside the panel). One
honest caveat: activation was driven by `.click()` on the focused link —
the harness's synthetic Return keystroke did not trigger link activation
(a driver quirk; anchor activation on Enter is the browser's own,
unscripted behaviour).

### Criterion 19 — no new resource

The network log for a full lesson load: every request is
`http://localhost:3000` — the document, script chunks, two stylesheets, and
the **four** font files already shipped (two faces × two subsets, ADR-0005).
No image, no other font, no third-party host. (The dev server adds its own
HMR/devtools requests, including a devtools-only font — dev machinery, not
part of the built site.)

### Criterion 20 — nothing under `content/`

`git log 8862b22..HEAD -- content/` (the whole slice) lists **no commit**.
The working tree's `content/` modifications are Viktar's own, byte-for-byte
the set present in the session's opening status, before this slice began.

### Left for a human eye

Named per AGENTS.md §3; none blocks the behavioural criteria above:

1. **How the panel reads at a glance** — muted rows, the accent identity
   strings, the inverted active box — on a projector and on the light theme.
   Measured legible; whether it looks *right* is taste.
2. **The reference page's new section**, which the harness could not
   screenshot (hidden-pane repaint limits).
3. **The scroll-following highlight in live motion** — every state was
   verified from the DOM at rest; the feel of the transition while a human
   scrolls was not observable here.

## T12 — The fresh-context review (criterion 21)

A fresh-context subagent reviewed `git diff 8862b22..HEAD` against the spec,
its only briefing the constitution, AGENTS.md and this slice's documents. It
re-verified independently rather than trusting the record: re-ran the build,
re-read the built HTML, re-measured the article's geometry post-change
(equal to the baseline to the pixel), and reproduced the scroll-spy's three
states and the pin.

**Gaps affecting correctness or a criterion: none.** Commit hygiene clean;
scope clean; all 21 criteria confirmed met or honestly recorded.

**Observations recorded, not fixed** — none affects a criterion; each is a
one-commit change if Viktar wants it:

1. Criterion 7's post-change record was thinner than its wording (only the
   prose box was re-measured after the panel landed); the reviewer closed it
   itself — post-change adjacency gaps 25.6/68/40 equal 004's record and all
   006 furniture present.
2. The styleguide shows hover/focus row states live rather than frozen
   `data-specimen-state` twins the plan promised; rest, active and current
   are frozen. T10's record says so honestly.
3. The transliteration map covers precomposed (NFC) characters only; a
   heading saved in NFD form would mint a mangled-but-valid slug instead of
   failing. All current content is NFC.
4. `scrollbar-color`'s `transparent` keyword is outside Check B's pattern —
   theme-neutral by nature, noted so the guard's pass is not mistaken for
   keyword coverage.
5. The layout wrapper's column template is a verbatim copy of the frame's;
   a future frame edit would silently diverge them. Both files carry
   comments naming the coupling.
6. The followed-link pin releases only on a `scrollY` change; a resize alone
   keeps it. Micro-edge outside any criterion.
7. Two same-named landmarks coexist in the DOM with exactly one ever in the
   accessibility tree, guaranteed by the single `display: none` boundary.

The slice closes on this report.
