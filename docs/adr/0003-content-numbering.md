# ADR-0003 — Module numbers, lesson letters, exercise numbers

- **Date:** 2026-08-28
- **Status:** accepted
- **Amends:** `constitution.md`, Article VI
- **Decision by:** Viktar

## Context

Article VI fixes the module→lesson axis but says nothing about how either is
identified. `docs/design-reference.md` adopts the reference's scheme: numbered
modules, lettered lessons, and exercises numbered across a whole module.

These strings are not presentation. `1b` is what a teacher says out loud, what
thirty students type into a browser, and what a task sheet refers to. If a slice
changes the scheme in November, every reference made in September breaks —
including ones written on paper.

## Decision

- **Module number** comes from the folder prefix: `content/moduly/01-…` → *Moduł 1*.
- **Lesson letter** is derived from the lesson's `order` within its module
  (1 → a, 2 → b, 3 → c). **Never stored by hand** — a stored letter and a stored
  order are two sources of truth that will disagree.
- **Exercises are numbered `<module>.<n>`, continuously across the whole
  module.** A lesson does not restart at 1. Module 1's exercises run 1.1, 1.2,
  1.3 … regardless of which lesson they appear in.

Added to Article VI, and changeable only by a superseding ADR.

## Why continuous exercise numbering

It is what makes an exercise reference unambiguous. "Zadanie 1.7" identifies
exactly one exercise in the course; "exercise 3 of lesson 1b" does not survive
being said out loud, and breaks the moment a lesson is split or reordered.

The reference does this and its contents panel shows the consequence: a chapter
lists its exercises as a range — *Exercises 1.1.-1.2.* — because the numbers
belong to the part, not the chapter.

## Consequence that constrains implementation

**An exercise cannot know its own number from inside its own file.** Numbering
has to be resolved at the module level, walking the module's lessons in `order`
and counting exercises as it goes.

Any plan that computes the number per-file, or stores it in frontmatter, is
wrong and will drift the first time a lesson is reordered or an exercise is
inserted. This is the single most likely mistake in the exercise slice, which is
why it is written here rather than left to be rediscovered.

## Alternatives rejected

- **Numbers only, no letters** (Moduł 1 → Lekcja 1, 2, 3). "Lesson 2 of module 1"
  is clumsy to say and ambiguous in writing. Letters make the two levels
  audibly different.
- **No visible numbering.** Cleanest to look at, worst in a classroom where the
  instruction is "open 3c" and thirty people must land on the same page.
- **Exercise numbers restarting per lesson.** Ambiguous references; see above.
- **Storing the letter in frontmatter.** Two sources of truth for one fact.
