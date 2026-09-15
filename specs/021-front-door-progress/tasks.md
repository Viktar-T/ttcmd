# tasks.md — 021-front-door-progress

Ordered, commit-sized, each objectively checkable. One commit per task,
`021/TNN:`. A box is ticked when its check has run and the output is recorded
in `verification.md`. The order is `plan.md`'s.

---

- [ ] **T01 — The front door's one button opens the progress page.**
  `app/page.tsx`: the hero keeps its title and lede and ends in one
  `Postęp grup` button to `/postep`, unguarded. The first-lesson derivation, the
  „Zacznij kurs" button and the text link are removed with their comments.
  **Check:** `npm run build`, `npm run lint`; criteria 2, 3 and 4 read from the
  prerendered home page.

- [ ] **T02 — The reference page's specimen shows the label the site has.**
  `app/styleguide/page.tsx`: the bordered-button specimen reads `Postęp grup`.
  **Check:** `git diff` of that file is one line.

- [ ] **T03 — Nothing else moved.**
  No source change. The pre-slice versions of the two files are built back to
  back with the slice's on one content tree, and the prerendered pages compared
  with the per-build id normalised.
  **Check:** criterion 6, the module grid's markup byte-identical; criterion 8,
  every page but the home and reference pages byte-identical; criterion 9, the
  old reference page with every „Zacznij kurs" replaced by „Postęp grup" equal
  to the new one byte for byte; criteria 5 and 7 measured live — the click lands
  on the `/postep` address, and the hero's left edges hold at 1280 px with no
  overflow at 320, 375 and 1280 px.

- [ ] **T04 — Close the slice.**
  `verification.md`, then the diff reviewed against `spec.md` in a fresh
  subagent context.
  **Check:** the review reports no gap. Criterion 11 is Viktar's eye and stays
  unchecked.
