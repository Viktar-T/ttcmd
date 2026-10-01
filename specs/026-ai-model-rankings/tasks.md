# tasks.md — 026-ai-model-rankings

Ordered, commit-sized, each objectively checkable. One commit per task,
`026/TNN:`, staged path by path — never `-a`, `-A` or `.`, because slice 025's
uncommitted work shares this working tree. A box is ticked in the same commit
that records its check's command and output in `verification.md`, never
before. The order is `plan.md` §8's; criteria are `spec.md`'s as amended
2026-10-01. Written by the autonomous run, unreviewed.

---

- [x] **T01 — The list exists, and the build knows its rules.**
  `content/ai-rankings.json` (the lede and spec §3's three rows),
  `lib/ai-rankings-schema.ts`, `lib/ai-rankings.ts` (plan §2–§3).
  **Check:** a one-off script reads spec §3's three table rows and asserts the
  file's `rankings` equals them exactly, in order, and that `lede` is
  non-blank; `npm run build` and `npm run lint` clean. Criterion 1.

- [x] **T02 — `/rankingi-ai` renders the list.**
  `app/rankingi-ai/page.tsx` (plan §4).
  **Check:** `npm run build` lists `/rankingi-ai` as `○` static; lint clean.
  In the prerendered `rankingi-ai.html`: the tab title follows the
  `… — ttcmd` pattern; one `h1` reading `Ranking modeli AI`; `tbody` holds
  exactly three rows whose first cells link to §3's three addresses byte for
  byte, in order, and whose second cells are non-empty; no anchor anywhere in
  the file carries `target=` or an `href` with `?`. Criteria 1, 3 (markup
  half), 4, 5.

- [x] **T03 — Invalid data fails the build, naming the entry.**
  No code unless a message reads badly (plan §3.3 — then `lib/ai-rankings.ts`
  is fixed and all three re-run). The data file is copied aside and
  sha256-recorded first, restored after each break and its hash re-checked;
  no broken state is committed.
  **Check:** three builds fail, each output naming its entry — (a) a
  description removed, (b) an `http:` address, (c) a malformed address — and
  the build after the last restore passes. Criterion 6.

- [x] **T04 — A lesson can link to the page.**
  `lib/links.ts`: the address joins the site's known routes (plan §6).
  **Check:** with a temporary link to `/rankingi-ai` added to one published
  lesson (copied aside, restored, sha256-checked), the build fails before the
  edit and passes after it; once restored, `git status` of `content/moduly`
  is what it was before the task.

- [x] **T05 — The front door has two buttons, progress first.**
  `app/page.tsx` (a wrapper holding both buttons, the comment rewritten) and
  `app/nav.css` (one wrapping rule; plan §5).
  **Check:** build and lint clean. In the prerendered `index.html`: the
  wrapper holds `<a class="button" href="/postep">Postęp grup</a>` then
  `<a class="button" href="/rankingi-ai">Ranking modeli AI</a>`, and
  `class="button"` occurs exactly twice in element markup. Criteria 1, 2
  (markup half).

- [x] **T06 — Nothing else moved, and it holds at every width.**
  No code. The before/after comparison of plan §9 on one fingerprinted tree,
  then live measurements in the browser.
  **Check:** criterion 8 — the file sets differ only by the new page; every
  other common page byte-identical with the build id and the global
  stylesheet's name normalised; the modules stylesheet unchanged; the global
  one equal to before once the slice's one rule is cut out. Criterion 9 — no
  diff to the dependency files or the token file, no `"use client"`, handler,
  custom property or colour literal added. Criterion 2's computed half — both
  buttons' border, padding, font and height equal. Criterion 3 — the click
  lands on the pathname `/rankingi-ai` and its `h1`. Criterion 7 —
  `scrollWidth − clientWidth` is 0 on `/` and `/rankingi-ai` at 320, 375 and
  1280 px, and at 320 both buttons lie inside the viewport.

- [x] **T07 — Close the slice.**
  `verification.md` complete; the diff reviewed against `spec.md` in a fresh
  subagent context, real gaps fixed; a factual entry under "Agent notes" in
  `docs/sdd-journal.md`.
  **Check:** the review reports no gap affecting correctness or the criteria.
  Criterion 11. **Criterion 10 is Viktar's eye and stays unchecked.**
