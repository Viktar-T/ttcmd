# tasks.md — 007-contents-panel

Ordered, commit-sized, objectively checkable. One task, one commit,
`007/TNN:` in the message (AGENTS.md §5). A box is checked when the task's
check has **run and its evidence is recorded** — in the commit, and where the
task says so in `specs/007-contents-panel/verification.md`.

Criterion numbers refer to `spec.md`; the mechanism is `plan.md`'s.

- [x] **T01 — Record the spec.** `spec.md` with acceptance criteria and
      decisions taken. *Check:* file in the tree, committed on its own.
- [x] **T02 — Record the plan.** `plan.md` written by a fresh-context
      subagent from constitution, AGENTS.md and the spec alone; its "Gaps in
      the spec" section is the test's result. *Check:* file in the tree,
      committed as the subagent wrote it.
- [x] **T03 — Record the tasks.** This file. *Check:* committed on its own.

---

- [x] **T04 — Record the baseline the panel must not move.** Build and serve
      the unmodified site; on the longest lesson at 1280 px read the prose
      column's left edge and width; re-read slice 004's measure and six
      adjacency gaps and the presence of 006's band, breadcrumb, pager and
      header. Start `verification.md` with the numbers and the commands.
      *Check:* `verification.md` holds the criterion-7 baseline;
      `git status` shows no change outside `specs/007-contents-panel/`.

- [x] **T05 — Section anchors, derived once and enforced by the build.**
      `lib/section-anchors.ts` (transliteration, validation that throws,
      per-page dedupe seeded with the reserved skip-target id, the collector);
      `lib/content.ts` wires the plugin per call and exposes `sections` on
      lesson summaries. *Check:* `npm run build` passes; the built HTML of the
      longest and the fourteen-section lesson lists every `h2` id, lowercase
      ASCII, unique (criterion 2); a temporary unrepresentable heading fails
      the build naming the lesson and the heading, then is reverted and
      `git status` confirms `content/` untouched (criteria 3, 20).

- [x] **T06 — The panel, server-rendered, beside an article that has not
      moved.** `components/contents.tsx` (list + panel + skip control),
      `app/contents.css` (the replicated-track wrapper, panel geometry, the
      `--rule-strong` divider, row states, skip reveal, `scroll-margin-top`),
      the stylesheet import, the lesson page composition. *Check:* build
      passes; rendered markup of the longest lesson shows every lesson row
      with identity string and title, the non-link current row, one entry per
      section in order, the "Spis treści" landmark and the skip control
      (criteria 4, 5, 6, 15's markup half); the 1280 px geometry equals T04's
      baseline (criterion 7); module 0's lesson shows one non-link `0c` row
      expanded to nine sections (criterion 17).

- [x] **T07 — The disclosure, and the fold at 80rem.** `ContentsDisclosure`
      between the lesson header and the article, held to the lane; the one
      media boundary hiding panel or disclosure. *Check:* at 1024, 768 and
      375 px the side panel is absent, the collapsed "Spis treści" disclosure
      renders, opens and closes with JavaScript disabled, and
      `document.documentElement.scrollWidth <= clientWidth` holds (criterion
      12's static half, criterion 13 in part).

- [x] **T08 — The scroll-spy.** `components/scroll-spy.tsx` (reading line,
      the two edge rules, the followed-link pin, `aria-current="location"`
      applied to both lists, minimal panel self-scroll), the active styling.
      *Check:* on the longest lesson — top: nothing active; mid-lesson:
      exactly one active entry; bottom: the last (criterion 8); a followed
      link lands the heading below the top edge and moves the highlight
      (criterion 9); the fourteen-section lesson in a ~600 px-tall window
      scrolls the panel, not the page (criteria 10, 11); the open disclosure
      at 375 px highlights identically (criterion 12's dynamic half). All
      read from the DOM and recorded.

- [x] **T09 — Back to top.** `components/back-to-top.tsx` and its styles:
      threshold visibility, instant scroll, focus returned to the top.
      *Check:* criterion 14 at 375 px and desktop — absent at top, present
      past a viewport, viewport and `document.activeElement` at the top after
      activation; absent on module and landing pages; absent with JavaScript
      disabled.

- [x] **T10 — The reference page carries the specimens.** Row states at rest,
      hover, focus; the inverted active entry; the current-lesson row; the
      disclosure; the back-to-top control as a static specimen. *Check:* the
      styleguide's rendered markup carries each (criterion 18); build passes.

- [x] **T11 — The verification pass.** The full sweep into
      `verification.md`: build output for the colour guard and the contrast
      report (criteria 1, 16); the JavaScript-disabled walk (criterion 13,
      whole); the network log showing no new resource (criterion 19);
      `git diff` clean under `content/` (criterion 20); anything only a human
      eye can close, named as such. *Check:* every criterion has evidence or
      a named human-eye remainder.

- [x] **T12 — Close the slice.** Fresh-context subagent review of the whole
      diff against the spec's criteria; fix what affects correctness or a
      criterion, record the rest without fixing (criterion 21). *Check:* the
      review's findings and their disposition recorded in
      `verification.md`; every box above checked or its blocker named.
