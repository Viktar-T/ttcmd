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
