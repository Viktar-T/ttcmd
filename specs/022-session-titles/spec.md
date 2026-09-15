# spec.md — 022-session-titles

- **Slice:** 022
- **Status:** written in an autonomous run (AGENTS.md §2, "Two modes") —
  unapproved by construction. What the page should show is Viktar's, asked for
  with the exact titles; how it is done is decided here and reviewed afterwards
  from `## Decisions taken` and the final report.
- **Date:** 2026-09-15
- **Depends on:** slice 016 (the schedule and `/postep`), slice 020 (the table
  as it stands, and the rule that every refusal lives in the schedule's model).

---

## Why

**A session on `/postep` says which lessons it covered, but not what the class
was called.**

Every class Viktar teaches has a topic entered in the technikum's own plan — a
formal name such as „Organizacja projektu programistycznego: folder,
repozytorium Git i GitHub." That name is what a student sees in the school
register, and it is not the same thing as the course's lesson titles: one class
can cover a lesson and a whole module, and its registered name describes the
class, not either of them.

Today the progress page can only list the lessons. A student comparing the page
with the register has to guess which row is which.

## What

### 1. A session may carry a title

A session in the schedule may have a **title**: the name of that class as it is
entered in the school's plan. Polish free text, written once, exactly as Viktar
wants it read, including its closing punctuation.

It is optional. A session without one is valid and renders as it does today, so
nothing already in the schedule has to change for this slice to ship.

### 2. The title opens the session's topics

On `/postep` a session's title appears **before its list of topics**, in the row
the topics already occupy, at every width and in both layouts. It reads as the
heading of those topics, not as one more topic: it is not a link, and it is
visibly distinct from the topic lines beneath it.

It is shown with the session's number in front of it — `1. Jak dziś powstaje
oprogramowanie.` — and **that number is the session's own, derived, not typed
into the title**. A title and a session number can then never disagree.

### 3. The build refuses a title that carries its own number

Because the number is added for it, a title written as `1. Jak dziś powstaje
oprogramowanie.` would render as `1. 1. Jak dziś…`. The build refuses a title
that begins with a number followed by a full stop, naming the session and saying
that the number is added automatically. An empty title is refused too.

### 4. Nothing else changes

No other part of a session, no other page, no new token, colour, dependency or
client-side behaviour. The calendar, the group cells, the topics and their links
render exactly as before.

## Out of scope

- **Writing the titles and adding session 3.** That is data, in the content lane,
  committed after this slice on its own.
- **Making the title required**, or deriving it from lessons.
- **Showing the title anywhere but `/postep`.**

## Acceptance criteria

1. `npm run build` succeeds, lists `/postep` as a static route, and
   `npm run lint` is clean.
2. **A schedule with no titles renders `/postep` byte-identically to before this
   slice**, once the per-build id **and the name of the shared stylesheet** are
   normalised, and the stylesheet itself differs from before only by the rules
   this slice adds. The field is additive.
3. **With a title set on a session**, the rendered page shows, inside that
   session's topics row and before its first topic, exactly the session number, a
   full stop, a space and the title text — `2. Budowa pierwszej aplikacji
   desktopowej za pomocą agenta AI.` — and that text is not inside a link.
4. **A session without a title in the same schedule** renders no title element
   and no stray number.
5. **The title is distinct from the topics** in the rendered page — a different
   element and treatment from a topic line — using only tokens that already
   exist.
6. **The build refuses a title beginning with a number and a full stop**, and
   refuses an empty title, each with a message naming the session.
7. No document scrolls sideways on `/postep` at 320, 375 and 1280 px with the
   longest of Viktar's three titles set.
8. Every page other than `/postep` is byte-identical before and after this slice,
   with the build id and the shared stylesheet's name normalised as in
   criterion 2.

*Criteria 2 and 8 amended 2026-09-15, after the plan and before any code.* As
first written they allowed only the build id to differ. The plan found that
every page links one shared stylesheet named by a hash of its contents, so any
rule this slice adds renames it everywhere, and the criteria could not have
passed for a reason unrelated to what they are checking.
9. No dependency, token, colour or client-side behaviour is added.
10. **Human eye, and therefore left unchecked by the run that builds it:** whether
    the title reads as the heading of its topics on a projector.
11. The fresh-context review reports no gap against these criteria.

## Decisions taken

1. **The title is optional.** Rejected: required, which would fail the build on
   today's schedule and make a class with no registered name unrecordable.
2. **The number is derived from the session and prefixed at render time.**
   Rejected: storing „1. …" as Viktar wrote it — the session number already
   exists, and a second copy inside a string is the retyping slice 016 refused
   for lesson letters.
3. **A title starting with its own number is refused, not silently stripped.**
   Rejected: stripping a leading „N. " quietly, which would also strip it when it
   does not match the session and hide the disagreement.
4. **The title sits in the topics row, before the list.** Rejected: a column of
   its own — slice 020's arithmetic leaves about 225 px, and Viktar's longest
   title wants several times that — and a separate row, which would give each
   session a third row for one line of text.
5. **The title text is stored verbatim, closing full stop included.** Rejected:
   normalising punctuation — the text is what is entered in the school's plan,
   and it is Viktar's to punctuate.
