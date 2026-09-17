# ADR-0015 — Drawings on the front door

- **Date:** 2026-09-17
- **Status:** proposed — written inside an autonomous run (AGENTS.md §2), so
  most of what is below has not been read by Viktar. **The reversal itself is
  his**: on 2026-09-17 he asked for a drawing per module on the front door and
  one for the course beside its name, and answered three questions about them —
  outline line art, the drawing replacing the large number, and the strokes
  recolouring to the accent under the pointer. Everything else here — the scope
  clause, the restated test for filler, the consequences and the rejected
  alternatives — is this ADR's, for him to accept or veto.
- **Number claimed** after listing `docs/adr/` (AGENTS.md §7); 0014 was the
  highest present.
- **Supersedes:** `docs/design-reference.md`'s "no illustrations" position, in
  the **four** places it was stated — the landing-page description, *What we
  cannot copy*, *Deliberately dropped* and *Deliberately different*. That file
  is corrected, not rewritten.
- **Touches no article of the constitution.** Article VIII is unaffected — no
  dependency, no backend, no build step. Article III is unaffected — a drawing
  has no language.

## Context

`docs/design-reference.md` was written against `fullstackopen.com`, which puts a
commissioned black line-art drawing on every part: on its card, in its band, on
every lesson page. The reference file drew a line under that and said it **four
times** — in the landing-page description, "For ttcmd: same grid, same rhythm,
**no illustrations**"; in *What we cannot copy*, that ttcmd "has none, will not
commission any, and **must not have an agent generate filler**", with the honest
substitute named as "typography doing the work", a large monospace module number
in the accent colour where the drawing would be; in *Deliberately dropped*, "The
illustrations — see above"; and in *Deliberately different*, "**No
illustrations.** Typography and the accent colour carry the identity."

That was a good rule for the problem it was written about. Two things about it
have turned out to be true in different measure:

- **"Will not commission any" is still true.** Nobody is paying an illustrator
  for a course site for one class.
- **"Must not have an agent generate filler" was aimed at filler**, and it has
  been read since as a ban on any drawing at all — which is how the front door
  ended up with eight near-identical rectangles distinguished only by a number
  and a title. A student looking for the module about testing has to read all
  eight.

Slice 023 widened those cards from 197px to 421px. It made the emptiness larger
rather than smaller: the card now has more room for the four lines of type, three
of which say the same thing on every card.

On 2026-09-17 Viktar asked for one drawing per module on the front door, matched
to what the module teaches, recolouring under the pointer, and one larger drawing
for the course beside its name.

## Decision

**ttcmd has drawings. They are made in this repository, they are monochrome
outline line art in the page's own text colour, and each one depicts a subject
taken from the module it marks.**

Scope, exactly:

- **The front door and the course contents page.** One drawing per module, in
  the place the large accent number held, and one for the course in the hero.
- **Nowhere else.** Not the module page, not the lesson page, not the band. The
  reference's band is around 450px *because* it is holding a drawing, and this
  file's own warning about a tall empty rectangle above every lesson still
  stands — with a picture in it, it would be a tall rectangle that repeats.
- **No commissioned art, and no purchased or generated raster.** The drawings
  are hand-written SVG paths in the repository, which is what makes them
  diffable, theme-aware and free to replace.

The rule that survives, restated so it can still do work:

> A drawing earns its place by saying what a module is about. A drawing that
> exists because the rectangle looked empty is filler, and filler is still
> forbidden. The test is whether the subject can be traced to a lesson in that
> module — and for every drawing in slice 024, the trace is written down in
> `specs/024-module-marks/spec.md`.

And the substitute it replaces: the large accent-coloured module number goes.
Keeping it beside a drawing would leave two things competing on a card that has
four lines already. The number is still on the card, in the line above the
title, where it reads *Moduł 3*.

## Consequences

- `docs/design-reference.md` is corrected in all four places named above. The
  earlier position is marked as reversed and dated, not deleted — Article II:
  if the honest history shows a change of mind, the change of mind stays.
- *Deliberately dropped* loses "The illustrations" and *Deliberately different*
  loses "No illustrations". What remains dropped is the **commissioned** art and
  its placement on every lesson page.
- A module with no drawing renders an ordinary card. Adding a module does not
  block on someone drawing for it.
- If ttcmd ever does get commissioned art, the drawings are one file and the
  card layout does not change. That was a reason to keep them out of the content
  model, not a reason to avoid them.

## Alternatives rejected

- **Keep the rule and call the drawings "marks" or "icons".** The letter of the
  document survives and its meaning does not. Article II prefers a visible
  change of mind to a tidy fiction.
- **Keep the rule, and solve the sameness with typography.** Per-module
  lettering, a different weight, a rule above each card. It is what the rule
  already asked for and it is what is on the page now: eight rectangles that
  differ by one digit. The rule has had its turn.
- **Reverse it everywhere at once**, including the band and the lesson page,
  which is what the reference does. Rejected for the reason this file already
  gives about band height, and because nobody asked for it.
- **A per-module accent colour to go with the per-module drawing.** ADR-0007
  settled one accent and deferred per-module colour without refusing it. This
  decision does not reopen it: the drawings are monochrome and inherit the text
  colour, so a later per-module accent would light them up for free.
- **Raster images under a public asset directory.** One network request per
  card, two files per drawing for the two themes, and no way for the stylesheet
  to reach the strokes. The repository has no asset directory today and this
  decision does not create one.
