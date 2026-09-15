# spec.md — 021-front-door-progress

- **Slice:** 021
- **Status:** written in an autonomous run (AGENTS.md §2, "Two modes") —
  unapproved by construction. The change itself is Viktar's, asked for in so
  many words; everything about how it is done is decided here and reviewed
  afterwards from `## Decisions taken` and the final report.
- **Date:** 2026-09-15
- **Depends on:** slice 016, which put a text link to `/postep` on the front
  door; slice 008, whose rule chose where „Zacznij kurs" pointed; slice 014,
  whose decision 14 holds the reference page to showing what the site renders.
- **Supersedes:** slice 016 decision 12 in form only. The way to the progress
  page stays on the front door, as that decision chose; it stops being a line
  of text and becomes the front door's one button. 016's spec is not edited
  (AGENTS.md §8).

---

## Why

**The front door offers two ways forward, and Viktar wants one.**

Today the hero ends in a bordered button, „Zacznij kurs", which opens the first
published lesson, and under it a text link, „Postęp grup — gdzie jest twoja
grupa". The button is the thing the eye lands on and the link is the thing a
student in this course actually came for: which group has reached which session,
and what is next. The two compete, and the one that wins is the one students
need less.

The lessons do not become harder to reach. The module grid sits directly below
the hero on the same page, and every module in it is a card that opens the
module. „Zacznij kurs" was a shortcut to the first lesson of that grid, not the
only door into it.

## What

### 1. The hero's one button opens the progress page

The bordered button in the hero reads **„Postęp grup"** and opens `/postep`. It
keeps the style, the size and the position the „Zacznij kurs" button has today.

It always renders. The progress page is a static route that exists on every
build, so there is no case in which the button has nowhere to go.

### 2. The text link is gone

„Postęp grup — gdzie jest twoja grupa" is removed from the home page. The button
replaces it; one action, not the same action twice.

### 3. „Zacznij kurs" is gone from the home page, and so is what fed it

No element on the home page reads „Zacznij kurs". The derivation that chose its
target — the first published lesson of the whole course, falling back to the
first module's page — has no other reader and is removed with it. The rule it
implemented is recorded in slice 008 and in the git history, which is where a
rule nobody currently applies belongs.

### 4. The course stays one step away

The module grid below the hero is unchanged: the same cards, in the same order,
each opening its module.

### 5. The reference page shows the label the site now has

The reference page's bordered-button specimen reads „Postęp grup" instead of
„Zacznij kurs". Nothing else on the reference page changes.

### 6. Nothing else changes

No new style, no new token, no header navigation, no client-side behaviour, no
dependency. Every page other than the home page and the reference page renders
exactly as it did.

## Out of scope

- **A navigation item in the site header.** Still Viktar's call about the look
  of the site, still unasked.
- **Restyling the button** or giving the progress page a different kind of
  control.
- **A second way to the first lesson on the front door**, such as a link under
  the button. The grid is that way.
- **Any change to `/postep`**, to the module grid, or to any lesson page.

## Acceptance criteria

1. `npm run build` succeeds and `npm run lint` is clean.
2. **The hero has exactly one button**, read from the rendered markup of the
   home page: one element carrying the bordered-button style, its text exactly
   „Postęp grup", its target `/postep`.
3. **„Zacznij kurs" appears nowhere in the home page's markup.**
4. **„gdzie jest twoja grupa" appears nowhere in the home page's markup.**
5. **Clicking the button in a browser lands on `/postep`**, and that page renders
   its title.
6. **The module grid is unchanged**: the home page lists the same module cards,
   with the same targets, in the same order as before this slice.
7. **The hero does not move sideways.** At 1280 px the title, the lede, the
   button and the module grid keep the left edge they had before this slice, and
   no document on the home page scrolls sideways at 320, 375 and 1280 px.
8. **No other page changed.** The prerendered markup of every page other than
   the home page and the reference page is byte-identical before and after this
   slice, once the per-build id is normalised.
9. **The reference page's bordered-button specimen reads „Postęp grup"**, and
   that specimen's label is the only change to the reference page's markup.
10. No dependency, no token, no colour, and no client-side behaviour is added.
11. **Human eye, and therefore left unchecked by the run that builds it:**
    whether a student who opens the site wanting a lesson, rather than their
    group's progress, finds the module grid without the „Zacznij kurs" button.
12. The fresh-context review reports no gap against these criteria.

## Decisions taken

1. **The one button opens the progress page.** *Viktar's call, 2026-09-15.*
   Rejected: keeping both „Zacznij kurs" and „Postęp grup" as buttons, which is
   the competition this slice removes, restyled.
2. **The button always renders.** Rejected: keeping the existing guard that
   hides the button when there is no target — `/postep` is a static route and a
   guard that can never fire is a false statement about the page.
3. **The first-lesson derivation is removed, not kept dormant.** Rejected:
   leaving it computed and unused in case the button returns — unused code on the
   front door is a second opinion about where the course starts, and slice 008
   plus the git history already hold the rule.
4. **The reference page's specimen is relabelled.** Rejected: leaving it reading
   „Zacznij kurs", which would make the reference show a control the site no
   longer has (slice 014, decision 14).
5. **Same style, same position.** Rejected: a new or more prominent style for the
   progress button — that is a visual decision nobody asked for, and the bordered
   button is already the most prominent control on the page.
