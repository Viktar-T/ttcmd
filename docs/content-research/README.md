# content-research

Working material for deciding **what the course teaches**. Not the course, and not
the app.

| | |
| --- | --- |
| Status | **Research and proposals.** Nothing here is law and nothing here is a spec slice. |
| Language | English (Article III — repo-facing). Polish appears only as proposed student-facing titles. |
| Audience | Viktar. Not students — this folder is not classroom material (Article II). |
| Relation to `content/` | `content/` is what students read. This folder is the reasoning that decided it. |

## Files

| File | What it is |
| --- | --- |
| [`research-01-ai-assisted-development.md`](research-01-ai-assisted-development.md) | How software is built in 2026: the trend, the evidence on where AI helps and where it does not, SDD and its frameworks, and what the education research forces in the course design |
| [`research-02-stack-tooling-constraints.md`](research-02-stack-tooling-constraints.md) | .NET desktop + mobile options, the lab-machine constraint, INF.04 as public sources describe it, tooling and licences, and how a finished app reaches a user |
| [`research-03-building-desktop-apps.md`](research-03-building-desktop-apps.md) | The state of desktop application development in 2026: the four families of UI toolkit, what shipping software actually uses, why most published benchmarks are wrong, how the answer changes with the size of the app, distribution and signing, the 2025-26 platform shifts, and on-device AI |
| [`research-04-building-mobile-apps.md`](research-04-building-mobile-apps.md) | **The mobile half of the pair with 03.** The obligations every mobile app carries whatever its size, then what actually changes with the size of the team, the size of the binary, and the size of the problem |
| [`research-03-desktop-app-history.md`](research-03-desktop-app-history.md) | **The historical pair, desktop half.** How building a desktop application changed 1970s→2026 and why — 60 % programming languages; the eras, the forces that moved the language, what was tried and came back, what has not changed since 1984. Feeds Moduł 1a and Moduł 4 |
| [`research-04-mobile-app-history.md`](research-04-mobile-app-history.md) | **The historical pair, mobile half.** 1996→2026; the platform owner picks the language, the store as a gate, and the answer to whether "desktop versus mobile" is still a real distinction. Feeds Moduł 1a and Moduł 4 |
| [`research-05-the-new-era.md`](research-05-the-new-era.md) | What changed in 2025–26 and how a working programmer's day looks now: the DHH / Lex Fridman conversation condensed with timestamps, three 2026 evidence updates (METR's correction, the Anthropic learning RCT, Stack Overflow 2025), and the dated timeline the lessons cite. Feeds Moduł 1 (v1.1) |
| [`research-06-spec-driven-development.md`](research-06-spec-driven-development.md) | **Feeds Moduł 4 (v2.3).** Spec-driven development in September 2026: the 2025 timeline and the tool makers' claims, Böckeler's spec-first / spec-anchored / spec-as-source, the anatomy of the loop (constitution · spec · plan · tasks · check) and the older ideas each stage is made of (Brooks 1987, North 2006, Mavin's EARS 2009, Nygard's ADRs 2011, Wake 2003), the tool table as of 2026-09-02 including the class editors' plan features, the measurable evidence on unclear task descriptions and its limits, the critique, and what all of it forces in the module |
| [`course-structure-v1.md`](course-structure-v1.md) | The superseded proposal (v1.1); kept per this folder's rules. The scheme, mechanics table, Semester 2 and INF.04 mapping still live here and are inherited by v2 |
| [`course-structure-v2.md`](course-structure-v2.md) | **The working proposal, at v2.5 (2026-09-02).** Learning-by-doing restructure of 2026-08-30 — Warsztat at position 2, old Moduł 2 dissolved into build weeks, stack declared provisionally and ratified with students, the lab-preparation lists — and, from v2.5: Moduł 1 as free-time reading with the demo last, „Teraz ty” as 2a, a C# reading lesson 2f, the by-hand blocks of Moduł 3, and **Moduł 5 „Pod maską”**, the by-hand fundamentals module, with the shared app at 6 and tests at 7 |
| [`change-proposal-2026-09-02-modul-5-pod-maska.md`](change-proposal-2026-09-02-modul-5-pod-maska.md) | The reasoning behind v2.5's Moduł 5 and the reorder: what the repo already promised, the decision, the file changes, the rejected alternatives — and, in §0, what Viktar decided against it after the survey |
| `../surveys/ankieta-start-2026-09-aggregate.md` | The first survey's aggregate (n = 12) and what it changed: the reader file, Moduł 1's hours, 2f, the Moduł 3 blocks, Moduł 5's size. The export itself never enters the repo |

**Read the two 03 and the two 04 files as pairs.** The `-building-` files ask *what
does building one of these look like in 2026, at every size*; the `-history` files ask
*how did it get that way and why*. Each cites the others rather than repeating them.

**A numbering collision to resolve.** The two *historical* briefs in
[`docs/_prompts/`](../_prompts/) have now been run, and their outputs —
`research-03-desktop-app-history.md` and `research-04-mobile-app-history.md` — share
their numbers with the two present-state documents. Both history files and this README
propose renumbering; none has done it, because filenames are referenced from
`course-structure-v1.md` and from each other. `research-05` took the next free number
rather than adding to the collision. Viktar's call — noted here rather than decided.

## Rules for this folder

- **Everything is dated and sourced.** Tool names in this field rot in weeks; a
  claim without a link is a claim that cannot be re-checked next year.
- **`TO CONFIRM` means it is not known.** The exam scope, the lab machines, the
  timetable and the school's rules are not this repo's to decide (Article V). A
  plausible guess that reaches the site is the most expensive mistake available here.
- **Nothing here authorises an app change.** When a piece of content turns out to be
  blocked by the application, that is the signal to open a spec slice (Article IX),
  not to edit `app/`.
- **Superseded research is not deleted**, it is dated and left in place. The history
  of how a decision was reached is the point.
