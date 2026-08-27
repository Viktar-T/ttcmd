# Spec 001 — Skeleton

- **Date:** 2026-08-27
- **Status:** accepted

## What

A working site that proves the module→lesson content pipeline end to end,
carrying no real course content.

Concretely:

- The site builds, runs locally, and is deployable in principle — nothing in
  the codebase would block a Vercel deployment, though actually connecting
  and deploying a Vercel project is not part of this slice.
- The module→lesson content axis (constitution, Article VI) exists and is
  populated with two placeholder modules, each holding one placeholder
  lesson — enough to prove the axis is genuinely two-level (module, then
  lesson within it), not just a single hardcoded page.
- A lesson has, at minimum, a title, an explicit ordering value, and a short
  summary. `week` remains optional, per Article VI, and is left blank on the
  placeholders — there is no real timetable to put there (Article V).
- Lesson content is authored content with structure — not a single string —
  and is validated against a schema before the site can build. A lesson
  missing a required field must fail the build. This slice does not need to
  demonstrate that failure with an in-repo example; it is enough that the
  validation code takes the strict path (raises rather than silently
  degrading) and that this is confirmed by review.
- A visitor can reach, from the homepage, a page listing the modules, and
  from there, each module's page listing its lesson, and from there, the
  lesson itself with its body rendered.
- The homepage itself carries minimal static text (site name, a way in) and
  is not the module listing.
- All student-facing text — module titles, lesson titles, lesson summaries,
  lesson bodies — is Polish. The placeholder lesson content is written to be
  unmistakably a placeholder (it does not read as if it were describing a
  real class), so nobody mistakes it for a real lesson later.

## Why

The content pipeline — folder structure, parsing, schema validation,
rendering — is infrastructure every future slice depends on. Getting it
wrong under the pressure of writing the first real lesson would mean
reworking both the pipeline and the content at once. Proving it now, against
throwaway content, means the first real lesson only has to be a lesson.

This is also slice 001 specifically because it is the smallest shape that
exercises the whole path once: two modules so the "module" level is real and
not assumed, one lesson each so the "lesson" level is real, a schema strict
enough that a broken lesson cannot silently ship.

## Out of scope

- Real lesson content of any kind.
- Search.
- Any styling beyond legibility — no design system, no visual polish.
- Actually connecting and deploying a Vercel project; this slice only avoids
  ruling deployment out.
- Demonstrating the invalid-frontmatter build failure with a committed
  broken example.
- Search-engine indexing controls (e.g. discouraging indexing of placeholder
  pages). Accepted as a gap for this slice, not an oversight.
- Anything requiring a backend: auth, a database, API routes, analytics
  (permanently out per constitution, Article VIII — restated here only
  because this slice is the first place it could have crept in).

## Acceptance criteria

1. A clean install (`npm install`) succeeds.
2. A local dev run (`npm run dev`) starts a server and the homepage loads in
   a browser, showing static landing text distinct from the module listing.
3. The production build (`npm run build`) completes with no errors — this is
   the primary check for this slice and for every slice after it.
4. From the homepage, a visitor can navigate to a page listing both
   placeholder modules.
5. From the module listing, a visitor can reach each module's own page,
   which lists that module's one lesson.
6. From a module's page, a visitor can reach the lesson page, which renders
   the lesson's title and its body content.
7. Both placeholder lessons carry a title, an ordering value, and a summary;
   `week` is absent or empty on both.
8. Code review confirms that a lesson missing a required field would raise
   during validation rather than build successfully with missing or
   default-filled data.
9. Type checking and linting (`npm run lint`) pass with no errors.
10. No student name, grade, timetable, room, class code, or group name
    appears anywhere in the codebase or rendered output (Article IV,
    Article V).
11. Nothing in the codebase sets static export mode, adds an API route, adds
    authentication, or adds a database dependency (Article VIII).
12. All student-facing text is Polish; all repo-facing text (code, comments,
    commit messages, this spec included) is English (Article III).
13. Every placeholder lesson and module reads unambiguously as a
    placeholder — no wording that could pass for a real lesson topic, date,
    or scope.
