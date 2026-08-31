# tasks.md — 012-one-left-edge

Ordered, commit-sized, objectively checkable. One task, one commit,
`012/TNN:` in the message (AGENTS.md §5). A box is checked when the task's
check has **run and its evidence is recorded** — in the commit, and in
`specs/012-one-left-edge/verification.md`.

Criterion numbers refer to `spec.md`; the mechanism is `plan.md`'s.

- [x] **T00 — Record the spec.** *Check:* file in the tree, committed on its
      own. Viktar's two answers are marked as his in `## Decisions taken`.
- [x] **T01 — Record the plan.** Written by a subagent from `constitution.md`,
      `AGENTS.md` and this slice's `spec.md` alone. *Check:* committed exactly
      as the subagent wrote it, guesses and gaps included.
- [x] **T02 — Record the tasks.** This file. *Check:* committed on its own.

- [x] **T03 — Confirm the plan's two load-bearing assumptions, and record the
      baseline.** The plan says: stop and report if the three lengths do not
      sum to 408, and report before writing code if the lesson page's columns
      turn out to be produced *by* the frame rather than bypassing it.
      *Check, run and recorded below:*
      - `--lesson-margin: 2rem` + `--contents-width: 22rem` +
        `--contents-gap: 1.5rem` = 25.5rem = **408 px**. The plan's derivation
        from the criteria alone was right.
      - A lesson page's only children of the frame are the accent band and the
        two-column wrapper, and **both carry `data-full-bleed`**, which the
        frame maps to its full-width track. The content track's position
        therefore cannot reach a lesson page. The fork the plan feared is not
        there.
      - The fold in the stylesheet is `80rem`, as the plan inferred.
      - The reference page prints no geometry numbers, so the plan's gap 4 —
        a reference that would start documenting a geometry the site no longer
        has — is moot. Nothing there to update.
      - Baseline measured for every page at 1280, 1585, 1024, 768 and 375.

- [x] **T04 — The frame's content track is anchored where a lesson's article
      is.** The three lengths move to the token file beside the measure and the
      content width, and the offset the frame uses is derived there rather than
      written a second time; above the fold the frame's leading track becomes
      that fixed offset instead of a flexible one. Nothing below the fold, and
      no component restyled. *Check:* `npm run build` green with the contrast
      report unchanged and `npm run lint` clean (criterion 1); at 1280 and 1585
      the module page, the module grid and the home page measure 408 / 736 and
      464 / 624 (criterion 2); the module page's lesson list and the prose of
      the lesson it links to share a left edge (criterion 3); every box slice
      011 recorded on a lesson page is unmoved (criterion 4); the site header
      and the accent band are unmoved everywhere (criterion 5); at 1024, 768
      and 375 every page equals the T03 baseline (criterion 6); no document
      overflows at 320, 1279, 1281, 1585 or 2560 (criterion 7); the reference
      page renders and moves with the frame (criterion 8); each of the three
      lengths appears once in the repo (criterion 9).

- [x] **T05 — Back the hero title out of the geometry commit.** T04 staged
      `app/nav.css` whole and swept in another session's in-progress
      `.heroTitle` change, which broke criterion 6 unnoticed because nothing
      named it. The index entry is rebuilt from the pre-slice blob with only
      this slice's comment edit; the working tree keeps their work.
      *Check:* the slice's whole contribution to `app/nav.css` is 11 added
      lines and no declaration; `npm run build` green.

- [x] **T06 — Close the slice.** Fresh-context subagent review of the diff
      against `spec.md` (AGENTS.md §3, criterion 12); fix what affects
      correctness or a criterion, record the rest; this file matches reality;
      a factual entry in `docs/sdd-journal.md`. **Criterion 11 stays
      unchecked** — whether an empty strip where a lesson has its contents
      panel reads as deliberate is Viktar's eye, and the report names the page
      and the width to open.

---

## Slips, recorded rather than tidied away

- **T04 committed a change it did not make.** `git add app/nav.css` staged
  another session's `.heroTitle` edit along with this slice's comment. It was
  found by the closing review, backed out in T05, and is left in the history
  rather than rebased away — Article II. The lesson is written into T05's
  commit message: on a tree with concurrent work, stage from `HEAD` rather than
  from the file.
- **T03 has no commit.** Its box was already checked when `tasks.md` was
  committed as T02, so the log does not show the order the work was done in.
  T03 changed no code.

---

## Where the implementation departs from `plan.md`, and why

Recorded here rather than by editing the plan, which is the artefact of the
fresh-context test and stays as written.

1. **No "make full bleed frame-relative" commit.** The plan put a defensive
   no-op commit first, in case full-bleed elements were built on
   `calc(50% - 50vw)` — which would have overflowed by 136 px once the content
   column stopped being centred. The repo does not use that trick: full bleed
   is a named grid track, and `calc(50% - 50vw)` appears only in the comments
   explaining why it was rejected. The commit would have changed nothing, so it
   is not made.
2. **The baseline is folded into T03 rather than standing alone**, because T03
   had to read the same files to check the plan's two assumptions and the
   answer to both is part of the same evidence.
3. **The three lengths keep slice 011's names**, which the plan allowed for.
   The derived offset is a fourth property in the token file, so the frame
   names one thing rather than repeating a sum.
