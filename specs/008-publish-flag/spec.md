# spec.md — 008-publish-flag

- **Slice:** 008
- **Status:** drafted in an autonomous run — unapproved by construction;
  execution is recorded by the slice's commits and the run's final report, and
  Viktar reviews the `## Decisions taken` list afterwards
- **Date:** 2026-08-29
- **Depends on:** 001 (the content pipeline and the build-time schema, Article
  VIII), 006 (the previous/next controls, the lesson lists and the module
  cards this flag must be absent from), 007 (the contents panel, ditto),
  ADR-0003 (a lesson's letter is derived from its `order`, never from its
  position in a list), constitution Articles I, IV, VI
- **Unblocks:** writing lessons ahead of the timetable — the roadmap's
  "Drafting ahead" — and slice 010, whose sitemap must honour the same flag

---

## Why

**The moment a lesson file exists, it is on the public site.** Every listing,
every previous/next control, every count and every route is derived from the
content directory, with no notion of "not yet". That was correct while the
content was being built out in lockstep with the app; it stops being correct
the week the course starts.

From 2026-09-01 this site is used in class every week, and the sane way to
write for it is ahead of time: a lesson drafted on a Saturday for a class three
weeks away. Today that draft is published the instant it is saved — listed on
the module page, counted on the module card, offered as "Następna lekcja" at
the foot of the lesson before it, indexed by anything that crawls the site.
Students read ahead into half-finished instructions, and the letter spoken
aloud in class next week points at text the teacher has not finished deciding
on.

The workarounds are all worse. Keeping drafts outside the repo loses them the
build gate — the whole point of the pipeline is that a malformed lesson fails
the build (Article VIII), and a draft that first meets that gate on the morning
it is published is a Monday-morning gamble, on the one site that must never be
broken on a Monday (Article I). Keeping drafts on a branch is the same gamble
plus a merge. Committing them and racing to finish before anyone notices is
not a method.

So: one boolean on a lesson, `publish`, defaulting to true. False means the
lesson is the author's, not yet the students'. Note the repo itself is public
either way (Article IV) — a determined reader can always read drafts on
GitHub. The flag controls what the **site** presents as the course, not
secrecy.

## What

### 1. The flag

A lesson's frontmatter may carry **`publish`**, a boolean. Absent means true.
Every lesson written so far carries no flag and is therefore published — this
slice changes no content file and no existing lesson's visibility.

Only a real boolean is accepted. A quoted `"false"`, a `no`, a `0` — anything
that is not a boolean — **fails the build**, naming the file, through the same
gate every other frontmatter mistake fails through. A flag that guesses is a
flag that silently publishes a draft.

### 2. Unpublished means absent

A lesson marked `publish: false` is absent from everything the site derives
from the course:

- **Every listing.** The lesson list on its module page, the contents panel on
  its sibling lessons, and the lesson count on its module's card — the count
  says how many lessons a student can open, so a hidden lesson is not in it.
- **Every pager.** The previous/next controls treat the course as one
  sequence of *published* lessons: the "next" at the foot of the lesson before
  it leads to the first published lesson after it, across a module boundary if
  that is where the sequence continues, exactly as slice 006 built the
  crossing — and where nothing published remains in a direction, the control
  is absent, as 006 left the course's two ends. If the first lesson on disk is
  a draft, the course simply starts later: the lesson before the first
  published one is nothing, not a hidden something.
- **Every derived link.** No control anywhere on the site links to it — in
  particular the landing page's one way into the course, which leads to the
  **first published lesson of the course**, never to a hidden lesson and never
  to a not-found page. A course with no published lessons at all is not
  specified beyond that same sentence: no control may link to a hidden lesson
  or a not-found page.
- **Every route.** Requesting its URL directly answers with the site's
  not-found response, indistinguishable from a lesson that never existed. Not
  a placeholder, not a "coming soon" — a URL that promises a lesson by name is
  half a publication.
- **The build output.** No page is emitted for it. And because absence from
  the emitted pages is not by itself a refusal to render — this host can
  render an unlisted route on first request — the direct-request behaviour
  above is its own requirement, checked separately.

A module whose every lesson is unpublished renders the way a module with no
lessons written already renders: its introduction, no list. The module itself
is not hidden — the flag is a lesson's, and the module's own text has its own
status: it is published by existing, as before.

### 3. Unpublished does not mean unchecked

An unpublished lesson is still **validated and compiled on every build**. Its
frontmatter goes through the same schema, its body through the same pipeline,
and a mistake in it fails the build today — not on the morning it is
published. Publishing is the flip of one boolean whose content has been
passing the gate all along. That is the entire value of keeping drafts in the
repo, and suppressing only the *emission* is what makes the flag safe to use.

### 4. Identity does not move

A lesson's letter comes from its `order`, never from its position in a list
(ADR-0003, Article VI). An unpublished lesson therefore **keeps its slot**:
unpublishing `1b` does not turn the lesson after it into `1b` — it stays `1c`,
in every listing, pager and breadcrumb. The visible consequence is accepted
knowingly: a module page may show `1a` then `1c`, and that gap is the truth.
Compacting the letters over the published lessons would renumber a lesson —
the string students write down — every time a draft appears or a lesson is
withdrawn, which is exactly the class of mistake ADR-0003 exists to forbid.

### 5. One site, every environment

The flag behaves identically everywhere the site runs — the development server
shows the same course the deployed site shows. An author who wants to see a
draft rendered flips the flag locally and does not commit the flip. Two
behaviours for one site is how a page gets checked in the environment where it
is visible and shipped in the one where it is not.

### Carried forward, not built here

When slice 010 builds the sitemap and everything else a crawler reads, an
unpublished lesson must be absent from all of it. This spec records the
obligation; slice 010 owns it.

## Out of scope

Refused deliberately, not forgotten:

- **Authentication, preview URLs, or any way to view an unpublished lesson on
  the deployed site.** v1 has no backend (Article VIII), and the preview is
  the local dev server.
- **Scheduled publishing by date.** The flag is flipped by a person, in a
  commit. A date field that publishes by itself invents a timetable the repo
  does not have (Article V) and a promise nobody made.
- **Content changes.** No file under the content directory is edited by this
  slice. Verification may flip a flag temporarily; every such edit is reverted
  and the diff under the content directory ends empty.
- **A publish flag on modules.** The scope line says lessons. A module's
  introduction is published by existing, as it is today.
- **The sitemap and crawler metadata.** Slice 010, with the obligation
  recorded above.
- **Any authoring UI, draft styling, or "draft" badge.** The site never shows
  an unpublished lesson, so there is nothing to style.

## Acceptance criteria

Observable conditions. Each is checked and the check's output is the
evidence. The checks run against the content tree **as it stands at
verification time** — the criteria are phrased relative to it, and the
letters, counts and paths actually read are the evidence. The temporary edits
in 2–9 are flag flips (plus one deliberately malformed field), each reverted;
criterion 10 is the proof they left nothing behind.

1. **With no content file changed, `npm run build` succeeds** and emits
   exactly the routes it emitted before this slice — every existing lesson is
   still published by default, and the route list is the evidence.
2. **A non-boolean `publish` fails the build, naming the file.** Shown by
   temporarily giving one lesson `publish: "false"` (a string), and reverted.
3. **A lesson marked `publish: false` disappears from every listing**: its
   module page's lesson list, the contents panel of a sibling lesson, and its
   module's card count — the count drops by one. Read from the rendered pages.
4. **It disappears from the build output**: the route list of a build with the
   flag set no longer contains the lesson's path.
5. **Its URL answers with the site's not-found response** on a direct request
   — not only absent from the emitted pages, but refused when asked for.
6. **The pagers skip it.** With a lesson that has a published lesson on each
   side of it marked unpublished, the earlier lesson's "next" and the later
   lesson's "previous" link to each other — not to the hidden lesson, and not
   to nothing. The module-boundary form of the same fact is criterion 8's to
   stage, in the only shape this content tree can stage it.
7. **Letters do not shift.** With the lowest-`order` lesson of a module that
   holds more than one lesson marked unpublished, the lesson at the next
   `order` still renders the letter its own `order` derives — not the first
   module letter — in the module list, the contents panel, the pagers and its
   own breadcrumb. The gap is visible, the identity is not recomputed, and the
   letters actually read are the evidence.
8. **A module with no published lessons stays a module, and the course starts
   where publishing starts.** With the first module's only lesson marked
   unpublished: its card stays in the grid with a count of zero in correct
   Polish, its page renders its introduction and no lesson list, its own route
   is still emitted — and the landing page's way into the course leads to the
   first published lesson of the next module, whose "previous" control is
   absent. This is the module-boundary case of criterion 6 as this content can
   stage it: the sequence of published lessons simply starts later, and
   nothing links across the boundary at a hidden lesson.
9. **An unpublished lesson is still behind the build gate**: a lesson that is
   both `publish: false` and malformed (an invalid frontmatter field) fails
   the build, naming the file. Shown temporarily and reverted.
10. **The content directory is untouched**: after verification, the working
    tree under the content directory is byte-for-byte what it was before this
    slice began.
11. The fresh-context review reports no gap against these criteria and
    nothing outside this slice's scope touched — in particular no content
    edit, no visual change to any rendered page, no new dependency, and no
    sitemap.

## Decisions taken

Per AGENTS.md §4. One line each, naming what was rejected.

1. **Absent means published.** Rejected: requiring an explicit `publish: true`
   on every lesson, which edits every lesson file on disk — files this slice
   has no business touching — and makes a *forgotten* field hide a finished
   lesson silently.
2. **Only a boolean is accepted; anything else fails the build.** Rejected:
   coercing strings and numbers, where the most likely mistake — a quoted
   `"false"` — coerces to *published*, the one wrong answer the flag exists to
   prevent.
3. **An unpublished lesson is still validated and compiled every build.**
   Rejected: skipping the file entirely, which parks a rotting draft outside
   the build gate and turns publishing into the gamble the flag exists to end.
4. **Letters keep their slots; a gap renders as a gap.** Rejected: compacting
   letters over the published lessons, which renumbers the identity students
   write down every time a draft appears — ADR-0003's forbidden mistake, worn
   as a feature.
5. **A direct request for an unpublished lesson gets the site's not-found
   page.** Rejected: a "coming soon" placeholder, which publishes the URL, the
   slug and the promise of a lesson that may never appear in that shape.
6. **Identical behaviour in every environment; local preview is flipping the
   flag without committing.** Rejected: showing drafts in the dev server only,
   which forks the site into two versions and gets a page checked in the one
   where it renders and shipped in the one where it does not.
7. **The flag is a lesson's; modules have none.** Rejected: a module-level
   flag, which is outside the scope line and representable the honest way —
   a module with no published lessons shows its introduction and no list.
8. **A module whose lessons are all unpublished stays visible.** Rejected:
   hiding the module too, which punches a hole in the numbered module sequence
   the course is spoken in, for a state the site already renders honestly.
9. **The not-found answer is enforced at the request, not assumed from the
   emitted output.** Rejected: trusting the absence of a generated page, which
   on this host merely defers rendering to the first visitor.
10. **The landing page's way into the course targets the first published
    lesson of the course.** Rejected: deriving it from the first module's
    lessons alone, which the day that module is all drafts sends the course's
    front door to an empty module page instead of the first lesson a student
    can actually read.

## Notes for the reviewer

- **Criteria 6 and 8 are the slice's reason to exist beyond a filter.** The
  pagers flatten the course into one sequence; a lesson absent from that
  sequence is skipped by construction, and the pair pins the construction.
  The general boundary case — a module's last lesson withdrawn while an
  earlier sibling stays published, the crossing landing on that sibling —
  cannot be staged on a content tree whose only boundary follows a
  single-lesson module, so criterion 8 stages the boundary in the shape that
  exists: the course's first module going dark, and the sequence starting
  later. The two cases exercise the same construction; the day the content
  grows a second boundary, the general case comes free.
- **Criterion 7 catches the tidy-looking mistake.** A filtered list numbered
  by position looks perfect on every module whose drafts are at the end —
  which is where drafts will almost always be. The one time a middle lesson is
  withdrawn is the one time it must not look perfect.
- **Criterion 5 versus criterion 4 is deliberate.** They read like the same
  fact and are not: one is about what the build emits, the other about what a
  running server refuses. The host renders unlisted routes on demand, so
  passing 4 while failing 5 is the likeliest wrong implementation available.
- **The criteria are phrased relative to the tree, not to a census.** The
  content directory is being written in daily; a criterion that names today's
  letters or counts is stale by Monday. The evidence records what was actually
  read at verification time.
