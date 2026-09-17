# spec.md — 024-module-marks

- **Slice:** 024. Append-only numbering (Article IX); 023 is the highest slice
  in the tree and the roadmap's reserved 017–019 stay reserved.
- **Status:** **accepted for an autonomous run** (AGENTS.md §2, "Two modes").
  Viktar asked for the slice and its implementation in one run on 2026-09-17,
  named the reference he wants (`fullstackopen.com/en/#course-contents`), and
  answered the three questions recorded in `## Decisions taken`. That is
  approval of the slice, not of every line: an autonomous run is unapproved line
  by line by construction, and he reviews it afterwards from that section and
  the final report.
- **Date:** 2026-09-17
- **Depends on:** 021 (the front door as it stands), 023 (the band the grid
  fills, and the card geometry this slice draws into)
- **Reverses:** `docs/design-reference.md`'s **"no illustrations"** — in three
  places that file says ttcmd has none, will commission none, and "must not have
  an agent generate filler". Viktar reversed it. The reversal is recorded as an
  ADR and the reference file is corrected so it no longer contradicts the site;
  neither is rewritten to pretend the earlier position was never held
  (Article II).

---

## Why

The front door names eight modules and tells a student nothing about any of them
until they click. Each card carries a kicker, a large number, a title and a
lesson count — four lines of type, three of which look the same on every card.
The number is doing the work of an illustration, and it was put there because
the earlier position was that ttcmd would have no illustrations at all.

That position was about **commissioned** drawings and about **filler**. It has
turned out to cost something specific: a student scanning eight near-identical
rectangles has to read every title to find the one about testing, and nothing on
the page distinguishes *Warsztat* from *Pod maską* at a glance. The reference
site solves this with one picture per part, and a student reaching for Part 3
reaches for its picture, not for its number.

A drawing that says what a module is about is not filler. A drawing chosen
because the rectangle looked empty would be, and that is the line this slice
holds: **every drawing depicts a subject taken from that module's own lessons**,
and a module that has no drawing of its own shows what it shows today rather
than borrowing one.

Second, the course itself has no image anywhere. The course name sits alone at
the top of the front door, with a lede and a button, beside a wide empty right
half — the same complaint slice 023 fixed for the grid and did not fix for the
hero. One drawing of what this course is about — a desktop application and a
mobile one — fills it, and says in a second what the lede says in a sentence.

## What

**One drawing per module, in the card, where the large number is today.** The
drawing takes the number's place; the module's number moves into the line above
the title, which already reads *Moduł*. Card height, frame and hover border are
unchanged.

**The whole card leads to the module, drawing included.** This is already true
and must stay true: the drawing is inside the link, not beside it.

**Under the pointer the drawing takes the accent colour**, together with the
card's frame, which already does this. Leaving the pointer returns it. Keyboard
focus does the same thing — a student tabbing the grid sees what a student
hovering it sees.

**One larger drawing for the course, beside the course name on the front door**,
to the right of it where the window is wide enough to hold both. It is the
course's mark, not a module's: it depicts a desktop application and a mobile one
together, which is the course's name.

**The drawings are monochrome outline line art** — thin strokes in the page's
own text colour, no fill, no black and no white of their own. That is what makes
one drawing work on both the dark and the light theme, and it is why the answer
to "what colour are they" is "the colour of the text beside them".

**The subject of each drawing comes from the module it marks:**

| Module | Subject | Taken from |
| --- | --- | --- |
| 0 · Start | a flag on a post | the module is the starting line: the survey, the setup, saving your work |
| 1 · Jak dziś powstaje oprogramowanie | two speech bubbles, one holding a caret | five reading lessons on talking to a model — from suggestion to agent |
| 2 · Warsztat: środowisko pracy | a wrench and a screwdriver crossed | the module is literally the workshop: IDE, terminal, project, repository |
| 3 · Budujemy: pierwsze aplikacje | blocks stacking into a window | building the first applications, one build after another |
| 4 · Specyfikacja zamiast wibracji | a document sheet inside a loop arrow | spec → plan → tasks → code, "one loop, five wrappers" |
| 5 · Twoja aplikacja | a lightbulb | three ideas, one choice, and the student's own application |
| 6 · Pod maską: aplikacja własną ręką | a window with a cogwheel behind it | under the hood: the event loop, controls by hand, state, the file |
| 7 · Testy, jakość i przegląd kodu | a magnifier over a checklist | tests, the CI gate, the review of someone else's diff |
| — · the course | a desktop window beside a phone | *Aplikacje desktopowe i mobilne* |

**The course contents page shows what the front door shows.** The two pages ask
the same question, and two different answers to it would be a defect.

**Nothing else gets a drawing.** Not the module page, not the lesson page, not
the band. The reference puts its illustration on all three; this slice does not,
because nobody has asked for it and because a drawing repeated on every lesson
page is the "large empty coloured rectangle above every lesson" the design
reference already warned about, with a picture in it.

## What this slice does not do

- It does not touch lesson content, the schema, or any module's text.
- It does not change the card's size, its frame, its hover border, or the grid.
- It does not introduce a dependency, an image pipeline, or a build step.
- It does not add a per-module colour. One accent, ADR-0007, unchanged.

## Acceptance criteria

1. Each of the modules published on the site shows a drawing of its own on the
   front door, and no two modules show the same drawing.
2. The large accent-coloured module number is gone from the card; the module's
   number is still readable on the card as text.
3. Clicking the drawing opens that module's page; clicking the module's title
   opens the same page. Both were one link before and still are.
4. With the pointer over a card, the drawing's strokes are the accent colour,
   and they return to the text colour when the pointer leaves. The same happens
   on keyboard focus.
5. The course drawing appears on the front door to the right of the course name
   at a desktop width, and at 375px the front door has **no horizontal scroll**
   and the course name is neither pushed off screen nor shrunk below the floor
   it has today.
6. On both themes every drawing is visible and legible: no drawing carries a
   hard-coded colour value of its own, verified by reading the rendered markup
   rather than by looking at it.
7. A module with no drawing of its own renders without error and falls back to
   the card as it is today. Adding a ninth module never breaks the front door.
8. The drawings cost **no additional network request** on the front door, and no
   visible layout shift on load.
9. The drawings announce nothing to a screen reader, and the accessible name of
   each card is what it was before this slice.
10. The course contents page shows the same drawings, for the same modules, as
    the front door.
11. `npm run build` passes and `npm run lint` reports no new problem.
12. `docs/design-reference.md` no longer states that ttcmd has no illustrations,
    and an ADR records the reversal, its reason, and what was rejected.

Criteria 4, 5 and 8 have a part only a human eye closes — that the hover reads as
a change rather than a flicker, and that the course drawing sits well beside the
name at the width Viktar actually works in. What can be checked in the markup and
in the build is checked; what is left is named in the final report.

## Decisions taken

- **Reverse "no illustrations" rather than work around it.** Rejected: keeping
  the rule and calling these "marks" or "icons" so the letter of the document
  survives. That is a fiction, and Article II prefers a visible change of mind
  to a tidy one.
- **Scope the reversal to the front door and the contents page.** Rejected:
  reversing it everywhere at once, which would put a drawing in every band — the
  composition the design reference gives a concrete reason to avoid.
- **Outline line art in the text colour** — Viktar's answer, of three offered.
  Rejected: solid filled shapes (large pale masses on the dark theme), and the
  reference's light illustration tile (a permanently light rectangle on a
  dark-default site).
- **The drawing replaces the large number** — Viktar's answer. Rejected: keeping
  both, which makes two things compete on a card that has four lines already;
  and writing the number into the drawing, which would have to be recomposed for
  every module and could never be swapped for commissioned art.
- **Hover recolours the strokes to the accent** — Viktar's answer. Rejected:
  inverting the drawing into an accent tile, and recolouring the whole card.
- **Keyboard focus does what hover does**, decided here and not asked. A
  hover-only affordance is invisible to a student who tabs, and the card is a
  link that already takes focus.
- **The drawings are decorative, not content.** Each card's link already says the
  module's name; a drawing that repeats it in alternative text makes a screen
  reader read every module twice. Rejected: descriptive alternative text.
- **A module without a drawing falls back rather than fails the build.** The
  drawings mark content but are not content, and a new module folder should
  publish on the day it is written, plainly, rather than block the front door.
  Rejected: making a missing drawing a build error — the right rule for lesson
  frontmatter (Article VIII) and the wrong one here.
- **No drawing on the module or lesson pages.** Rejected: following the reference
  all the way, for the reason in *What this slice does not do*.
