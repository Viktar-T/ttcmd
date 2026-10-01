# spec.md — 026-ai-model-rankings

- **Slice:** 026
- **Status:** reviewed by Viktar 2026-10-01, executed autonomously
  (AGENTS.md §2, "Two modes"). Drafted in supervised mode; the change itself
  is his, asked for in so many words, and the address was his answer to the
  one escalated question. The plan and tasks are the autonomous run's and are
  unreviewed.
- **Date:** 2026-10-01
- **Amended:** 2026-10-01, after the plan and **before any code**, on the
  strength of the fresh-context test (AGENTS.md §2). The plan's subagent could
  plan from this file and named what follows; each change is marked where it
  is made. **No behaviour moved.** (1) §5 and decision 6 said no other link on
  the site opens a new tab. That is false: slice 010 §6 opens every link that
  leaves a lesson in a new tab, with a ↗ mark. The claim is corrected and the
  departure is named under *Supersedes*; same-tab, unmarked links stand as
  reviewed. (2) Criterion 8 allowed only the build id to differ, but every page
  links one shared stylesheet named by a hash of its contents, so the hero's
  one layout rule renames it everywhere — as slice 022 found and amended the
  same way. (3) §2's sentence under the title had no stated home; it now lives
  with the list (§4), and criterion 10 names it. (4) §4 now says the build's
  check of links between pages knows the new address, which *Out of scope*
  already presumed.
- **Depends on:** slice 021 (the hero's button, its style and position);
  slice 016 (the precedent for a page of its own reachable from the front door,
  and for a list that is data validated at build time); ADR-0008 (claims about
  the outside world are sourced); constitution Articles III, IV, VIII and IX.
- **Supersedes:** slice 021's criterion 2 and decision 5 in one respect only —
  „the hero has exactly one button" becomes „the hero has two buttons, and
  „Postęp grup" is the first". 021's spec is not edited (AGENTS.md §8).
  *Added 2026-10-01:* it also departs from slice 010 §6 — a link that leaves
  the site opens in a new tab and carries a ↗ mark — **for this page's links
  only**. Lessons keep that treatment; 010's spec is not edited either.

---

## Why

**Students are asked to choose and judge AI models, and the course has no
place that tells them where models are compared.**

The course leans on AI tools from Moduł 0 onward. A student who wants to know
which model is good at writing code today has no pointer from the site, and a
web search returns marketing before it returns measurements. Three public
rankings answer the question from three different angles — what real users of
AI agents report across their work, what an independent lab measures on intelligence, speed
and price, and whether a model can fix a real bug in a real repository. Viktar
wants them one click from the front door, each with a sentence saying what it
measures, so a student reads the right ranking for the right question instead
of the first number they see.

Rankings change weekly. The site therefore links to them and describes what
each one measures; it never copies a position, a score or a model name from
them.

## What

### 1. A second button on the front door

The hero gains a second bordered button reading **„Ranking modeli AI"**, after
„Postęp grup", in the same style and size. On a narrow screen the two wrap
rather than shrink or scroll sideways. Clicking it opens the rankings page.

### 2. A page at `/rankingi-ai`

A page of its own at **`/rankingi-ai`**, titled **„Ranking modeli AI"** (the
browser tab follows the site's existing pattern for page titles). Under the
title, one sentence telling the student that each ranking measures something
different and that the numbers change often. Then a table. *(Amended
2026-10-01:)* the sentence is content, kept with the list (§4); its Polish is
a draft, like the descriptions.

### 3. The table

One row per ranking, two columns: **„Ranking"** — the ranking's name as a link
to its page — and **„Co mierzy"** — one or two sentences of description. In
this order:

| Ranking | Co mierzy |
| --- | --- |
| [Arena — Agent: Overall](https://arena.ai/leaderboard/agent/overall) | Ogólny ranking modeli w pracy agentowej — przy kodzie, w rozmowie i w zadaniach biurowych — zbudowany z prawdziwych sesji użytkowników: czy zadanie zostało wykonane, jak model radzi sobie z narzędziami i czy słucha poleceń. Mówi, jak model sprawdza się w codziennej pracy, a nie w jednym teście. |
| [Artificial Analysis](https://artificialanalysis.ai/) | Niezależne porównanie modeli i dostawców API: zbiorczy wskaźnik „inteligencji” z kilku testów, szybkość odpowiedzi (tokeny na sekundę) i cena. Przydaje się, gdy wybierasz model pod budżet albo pod czas odpowiedzi. |
| [SWE-bench](https://www.swebench.com/) | Test, w którym model ma rozwiązać prawdziwe zgłoszenia (issues) z projektów open source na GitHubie; zadanie liczy się dopiero wtedy, gdy przechodzą testy projektu. Ma kilka wersji, m.in. Verified i Lite. |

The Polish above is a **draft for Viktar to rewrite** (AGENTS.md §7); each
description was checked against the linked page on 2026-10-01 and says only
what that page says about itself (ADR-0008). Exact wording is content and may
change without reopening this slice.

### 4. The list is content, not code

The three rankings are kept as data in the content lane, validated at build
time: an entry without a name, a valid `https` address or a description fails
`npm run build`. Adding, removing or rewording a ranking afterwards is a
`content:` commit that touches neither `app/` nor `lib/` (Article IX).

*(Amended 2026-10-01:)* the sentence under the title (§2) is kept with the
list and is rewritten the same way. The build's check of links between pages
knows the new address, so a lesson that links here (see *Out of scope*) passes
it without an app change.

### 5. Links are plain links

Each name is an ordinary link that opens the ranking in the same tab. No icon,
no tracking parameter, no preview. *(Amended 2026-10-01: this first read "like
every other link on the site". It is not like a lesson's link that leaves the
site, which opens in a new tab with a ↗ mark (slice 010 §6); this page departs
from that, see Supersedes and decision 6.)*

### 6. Nothing else changes

No header navigation, no new token or colour, no client-side behaviour, no
dependency. Every page other than the home page and the new page renders
exactly as before.

## Out of scope

- **Showing scores, positions or model names** taken from the rankings, live or
  copied. They go stale in days and would be claims the site cannot keep true.
- **A recommendation** of which model students should use.
- **Grouping, sorting or filtering** the table.
- **A link from lessons** to the new page. A lesson that wants to point here
  does so in the content lane.
- **A header navigation item.** Still unasked (slice 021, out of scope).

## Acceptance criteria

1. `npm run build` succeeds and `npm run lint` is clean.
2. **The hero has two buttons**, read from the rendered home page: the first
   reads exactly „Postęp grup" and targets `/postep`, unchanged; the second
   reads exactly „Ranking modeli AI" and targets `/rankingi-ai`. Both carry the
   same bordered-button style.
3. **Clicking „Ranking modeli AI" in a browser lands on `/rankingi-ai`**, which
   renders the heading „Ranking modeli AI".
4. **The page's table has exactly three body rows**, in the order of §3; each
   row's first cell is a link whose target is exactly the address in §3, and
   whose second cell is non-empty.
5. **No link on the page carries `target="_blank"`** or a query string not
   present in §3.
6. **Invalid data fails the build.** A ranking entry with its description
   removed, or with an `http:`/malformed address, makes `npm run build` fail
   with a message naming the entry; restoring it makes the build pass.
7. **No sideways scroll** on the home page or the new page at 320, 375 and
   1280 px, and on the home page at 320 px both buttons are fully visible.
8. **No other page changed.** The prerendered markup of every page other than
   the home page and `/rankingi-ai` is byte-identical before and after this
   slice, once the per-build id **and the name of the shared global
   stylesheet** are normalised; that stylesheet differs from before only by the
   rule this slice adds, and every other stylesheet is unchanged.
   *(Amended 2026-10-01, before any code: as first written only the build id
   was normalised, which no slice adding a CSS rule can meet — slice 022 hit
   the same wall.)*
9. No dependency, no token, no colour, and no client-side behaviour is added.
10. **Human eye, and therefore left unchecked by the run that builds it:**
    whether two equal buttons in the hero still read as one front door with the
    progress page first, and whether the Polish descriptions — and *(amended
    2026-10-01)* the sentence under the title — are Viktar's wording.
11. The fresh-context review reports no gap against these criteria.

## Decisions taken

1. **Address `/rankingi-ai`.** *Viktar's call, 2026-10-01.* Rejected:
   `/rankingi`, `/ranking-modeli`.
2. **A page of its own, not a panel that unfolds on the front door.** Rejected:
   an expanding table in the hero — it needs client-side behaviour, cannot be
   linked to from a lesson or written on the board, and pushes the module grid
   down.
3. **Same bordered-button style, placed after „Postęp grup".** Rejected: a
   new, quieter style for the second button — a visual decision nobody has
   made — and a text link, which slice 021 removed from the hero for being the
   weaker of two competing actions. Order keeps the progress page first, which
   is what students open the site for (slice 021).
4. **The list lives in content and is validated at build time.** Rejected:
   hard-coding the three rows in the page — every new ranking would then be an
   app slice, which is the friction Article IX's content lane exists to avoid.
5. **Describe, never quote.** Rejected: showing current leaders or scores —
   they change weekly and would turn a public page into a stale claim.
6. **Same-tab links.** Rejected: opening in a new tab — the student's back
   button already returns them. *(Amended 2026-10-01: this also said "no other
   link on the site does", which is false — slice 010 §6 opens every link that
   leaves a lesson in a new tab, with a ↗ mark. The reason is corrected; the
   decision is unchanged and goes back to Viktar to confirm or reverse.)*
7. **A one-sentence lede above the table.** Rejected: a bare table, which
   invites reading the three rankings as three opinions on the same question.
