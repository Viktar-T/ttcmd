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
