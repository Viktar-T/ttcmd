# ADR-0004 — Three lanes of change; SDD applies to the application

- **Date:** 2026-08-28
- **Status:** accepted
- **Amends:** `constitution.md`, Article IX
- **Decision by:** Viktar

## Context

Article IX opened with *"Nothing is implemented without a spec slice."* Within a
day of ratification that rule was broken by a commit adding `.gitignore`,
`.gitattributes`, `.env.example` and `README.md` — housekeeping that plainly
needs no specification.

It would be broken far more often, and far worse, by content: writing a Polish
lesson does not need a `spec.md`, a `plan.md` and a `tasks.md`. Requiring that
would make writing lessons expensive, and **writing lessons is the one activity
in this project that must never become expensive** (`docs/roadmap.md`: content
beats features).

The rule was not wrong in spirit. It was wrong in scope.

## Decision

Three lanes, with different gates:

| Lane | What | Process | Commit prefix | Gate |
| --- | --- | --- | --- | --- |
| **App** | `app/`, `lib/`, config, dependencies | full slice: spec → plan → tasks | `NNN/TNN:` | acceptance criteria + fresh-context review |
| **Content** | `content/`, `public/img/` | none | `content:` | `npm run build` + Viktar's Polish editorial pass |
| **Chore** | tooling, ignore files, housekeeping | none | `chore:` | it works |

Article IX's requirement is scoped to the **App** lane.

**A content commit may not touch `app/` or `lib/`.**

## Why the boundary is worth enforcing

Because it is a **detector**, not merely a rule.

The moment writing a lesson requires changing a component, the boundary stops
the commit — and that stop is the signal that the application is missing a
feature. The lesson pauses, a slice opens, the slice closes, the lesson resumes.

That is the mechanism by which the app gets built in response to content that is
genuinely blocked, rather than in anticipation of content nobody has written yet.
Features specified from imagination are the ones that turn out wrong.

## Alternatives rejected

- **Specs for content too.** Ceremony that would suppress the project's most
  important activity.
- **No lanes; judgement each time.** Which is what produced the rule-breaking
  chore commit. An unenforceable rule teaches that rules are decorative — a bad
  lesson in a repository built to learn a method.
- **A branch per lane.** Overhead for one person, and it would hide the
  interleaving of app and content work that the commit log should show honestly.
- **Separate repositories for content and app.** The content *is* the site;
  splitting them means a build-time fetch and two things to keep in step.

## Consequences

- `git log` becomes readable by prefix: `001/T04`, `content:`, `chore:`.
- The chore commit that started this is retroactively legitimate.
- A fourth lane will eventually be proposed (docs? specs themselves?). It needs
  its own ADR, not an assumption.
