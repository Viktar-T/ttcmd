# spec.md — 015-content-dev-refresh

- **Slice:** 015
- **Status:** written in an autonomous run (AGENTS.md §2, "Two modes") —
  unapproved by construction. Viktar asked for the slice and for it to be
  implemented in the same run; he has not read this text. Everything in it is
  decided here and reviewed afterwards from `## Decisions taken` and the final
  report.
- **Date:** 2026-09-09
- **Depends on:** constitution Articles VIII (content is MDX under `content/`,
  validated at build; no backend in v1) and IX (three lanes — this slice exists
  to make the content lane cheap to work in), ADR-0002 (the content pipeline
  that reads MDX at request time, which is what causes the problem).
- **Unblocks:** nothing structural. It removes a tax on every future content
  commit.

---

## Why

**A saved lesson does not appear on the running site, and the writer cannot
tell that from a broken save.**

Content is read from disk when a page is requested, not imported into the
bundle. That is the pipeline ADR-0002 chose and it is the right one — it is why
a lesson is a file a person edits rather than a module a bundler owns. Its cost
has never been paid: the development server has no link from a route to a
lesson file, so saving a lesson changes nothing on screen. The server does
re-read the file on the next request, so a manual reload always shows the
change.

That gap is small and expensive. It was measured on 2026-09-09: a lesson was
edited, the page was watched, nothing happened for six seconds; a reload showed
the edit immediately. The file was right the whole time and the page was stale
the whole time, and there is nothing on screen that distinguishes the two. The
first move a stale page invites is a hunt through the pipeline for a bug that is
not there — a worse outcome than the missing reload itself.

Content is also the lane with the most traffic. Article IX gates it with
nothing, precisely because writing lessons should be cheap; a manual reload
after every save is the opposite of cheap, and it lands on the one lane the
constitution went out of its way not to tax.

The workflow the fix has to serve is the real one: **write in the editor, look
at the browser.** The moment the writer's attention returns to the browser is
the moment the page has to be current. Nothing before that moment is visible to
anyone, and nothing after it is acceptable.

## What

### 1. Returning to the browser shows what is on disk

In development, when the browser window regains the reader's attention — it is
brought to the front, or its tab becomes the visible one — the page it is
showing is re-rendered from the content as it exists on disk at that moment.
No keystroke, no reload, no control to press.

### 2. It is a refresh, not a navigation

The page is re-rendered in place. Scroll position is where the reader left it,
the contents disclosure is open if it was open, the chosen theme and the chosen
mode are the ones that were chosen. The reader's place in the page survives,
because the whole point is to look at the paragraph being edited.

### 3. It does nothing while nobody is looking

Nothing runs while the tab is hidden or the window is not in front. The
re-render happens on the return, once, not on a timer.

### 4. Production carries none of it

This is a writing-time convenience and it stays there. A production page ships
no code for it, makes no request because of it, and behaves exactly as it does
today. This is checked on a real production build, not asserted.

### 5. With scripting absent, the site is what it is today

Every page still renders, every link still navigates, and nothing new appears —
including no error. A reader without JavaScript has never seen this and must
not be able to tell it exists.

### 6. What it may not cost

Constraints, because each of them is the cheap wrong answer to this problem:

- **No new dependency.**
- **No new route, no request handler, no backend** — Article VIII.
- **No file generated into the working tree.** Nothing may appear in
  `git status` because the site was run, and nothing may need to exist for a
  production build that only a development run creates.
- **No change to how content is read, validated or compiled.** The pipeline is
  correct; only the moment of re-reading is at issue.
- **No change to what any page renders**, in either environment.

## Out of scope

Refused deliberately:

- **Instant refresh on save, without the reader touching the browser.** The
  supported channel for that does not exist, and the mechanisms that fake it
  cost more than the manual reload does — see `## Decisions taken`.
- **Hot module replacement of content**, and any redesign of the pipeline that
  would make a lesson part of the bundle.
- **Revalidation in production.** The site is rebuilt from `main` on every push,
  and that is the whole of its content deployment story.
- **Any change to a lesson, a module introduction, or the schema.**
- **Any visible change to any page.**

## Acceptance criteria

Observable conditions. Each is checked and the check's output is the evidence.

1. `npm run build` succeeds and `npm run lint` is clean.
2. **The edit appears on return.** With the development server running and a
   lesson page open: move the browser out of focus, change a visible heading in
   that lesson on disk, bring the browser back to the front. The new heading is
   on screen without a reload, within two seconds of the return. The change is
   reverted afterwards and `git status` reports nothing under `content/`.
3. **The same holds on a module page and on the module list**, checked the same
   way, against the module's introduction and against a lesson title.
4. **Nothing happens while the browser is away.** With the browser out of focus,
   the same edit does not change the page until attention returns.
5. **The reader's place survives.** Scrolled to a section far down a lesson,
   with the contents disclosure open, the refresh leaves the scroll offset
   unchanged and the disclosure open.
6. **The chosen theme and mode survive**, verified from the document's
   attributes before and after a refresh, with a non-default value of each.
7. **Production carries nothing.** Against a production build served locally:
   the page's JavaScript contains no refresh-on-return code, and bringing the
   browser back to the front issues no request for the page. Checked from the
   network record, not from the source.
8. **With scripting disabled**, on a lesson page and a module page: the page
   renders, links navigate, and the console shows no error.
9. The diff touches no file under `content/`, adds no dependency, and adds no
   route.
10. **Human eye, and therefore left unchecked by the run that builds it:**
    whether the refresh is unobtrusive when switching back from the editor — no
    flash, no jump, nothing that makes the writer lose the line being edited.
11. The fresh-context review reports no gap against these criteria and nothing
    outside this slice's scope touched.

## Decisions taken

Per AGENTS.md §4. One line each, naming what was rejected.

1. **The trigger is the browser regaining attention, not the file being saved.**
   Rejected: a watcher on the content tree that pushes the change to the
   browser — the development server offers no supported channel for a push, and
   the workable substitute writes a generated module into the working tree on
   every save, which churns `git status` and must still exist for a production
   build. Also rejected: a timer that re-renders every few seconds, which spends
   requests continuously to serve the one case the trigger misses — a writer who
   edits and watches without ever touching the browser.
2. **Development only.** Rejected: shipping it behind a runtime flag, which puts
   writing-time machinery on a page a student loads on a phone.
3. **A re-render in place, not a reload.** Rejected: reloading the document,
   which throws away scroll position and every client-side preference and is
   exactly the manual step the slice is removing.
4. **It applies to the whole site, not only to the pages that render lessons.**
   Rejected: wiring it into those pages alone — the module list and the home
   page read the same files, and one page that quietly lies is the failure this
   slice exists to remove.
5. **The number 015 is taken, although slice 014 forward-referenced "Slice 015"
   as search.** Rejected: skipping to 016 to honour that reference — a number is
   claimed by listing what exists (AGENTS.md §7), 014 is approved and is not
   rewritten to match what happened afterwards (Article II), and search takes
   the next free number on the day it is written.
6. **No ADR.** Rejected: writing one — this slice adds no dependency, amends no
   article and reverses no earlier decision; it pays a cost ADR-0002 already
   accepted, and the reasoning belongs here.

## Notes for the reviewer

- **Criterion 7 is the one that matters most.** Everything else is a
  convenience; this is the promise that a convenience did not reach a student.
  It is checked against a real production build and a real network record.
- **Criterion 10 is yours.** Whether the refresh feels right in the loop between
  editor and browser is a judgement about working in this repo, and the run that
  builds it cannot make it.
