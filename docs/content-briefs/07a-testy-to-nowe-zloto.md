# Brief — 7a · Testy to nowe złoto

| | |
| --- | --- |
| Lesson | `content/moduly/07-testy-i-jakosc/testy-to-nowe-zloto.mdx` · `order: 1` · 3 h |
| Written | 2026-09-10, by write-lesson · approved: (blank) |
| Mode | semi-supervised — the module was approved in shape, this brief was not read before drafting |
| Research | `research-07-testy-jakosc-przeglad.md` §1 (whole), §6.2 (the built example) |
| Drafted | 2026-09-10 |

## Reader position

Has read 0a–6h. Owns a working desktop application of their own, in a public
repository, whose specification has numbered acceptance criteria and which
**remembers something after it is closed** (Moduł 5's rubric). Can read a C#
diff and say what it does. **Has never written an automated test** — 6 of 12
never, 4 once in class. Believes already that AI code is often wrong („kod od AI
jest zwykle poprawny” = 2,2 of 5) and that you may not hand in code you do not
understand (1,4 — unanimous). Has spent eleven weeks verifying by reading.

## Carrying question

> Sprawdzałeś dotąd wzrokiem. Co sprawdzi twoją aplikację w środę, kiedy agent
> zmieni plik, a ciebie przy tym nie będzie?

## Anchor

**The round trip in the student's own application: `zapisz → zamknij → otwórz`.**
In the first section they run it by hand with awkward data and watch it break;
in the last section they know what would have caught it in a tenth of a second.

The concrete defect, **built and run on SDK 10.0.112 on 2026-09-10**
(research §6.2): the naive „join with a separator” save that agents commonly
produce loses data twice — an item containing the separator comes back as two
items with the first truncated (**2 in, 3 out**), and an **empty list comes back
holding one empty item** (0 in, 1 out), which is the first run of the
application.

**Fallback** for a student whose application saves nothing (5b's cut may have
removed it): the same exercise on any criterion whose input the student can make
awkward — an empty field, a very long line, a Polish diacritic, the same thing
added twice. The finding is what matters, not the file.

## Shape

**Hands-on with a narrative frame.** The first two sections are the student at
their own keyboard breaking their own application; the middle is the argument;
the ending is a decision. No test is written in this lesson — that is 7b — and
saying so early is what keeps the lesson honest rather than an advertisement.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | Eleven weeks of reading diffs, and one question reading cannot answer: what happens on Wednesday | Names the round trip as the thing they will attack |
| 1 | Zepsuj to sam, w trzy minuty | Action before argument: run your own application, put a separator character and then nothing into it, close, open | The measured 2-in-3-out and 0-in-1-out, found by the student |
| 2 | Dlaczego tego nie widziałeś | The defect was always there; clicking through with normal data cannot reach it. „Wrażenie nie jest dowodem” gets its second, concrete instance | Explains what the student just saw |
| 3 | Jak cała branża sprawdza, czy model naprawił błąd | The evidence section. SWE-bench Verified's two test sets — `FAIL_TO_PASS` proves the fix, `PASS_TO_PASS` proves nothing else broke. The definition, not a score | The round trip is a `PASS_TO_PASS` test that nobody wrote |
| 4 | „Napisz mi testy” — i dlaczego to nie ta lekcja | The honest counterweight: Meta's 75/57/25 before its 73%; the misguidance effect; Böckeler's red test that proves only that the agent saw red | Why the student will write the first one themselves in 7b |
| 5 | Co się zmienia, kiedy kod pisze agent | The argument, stated once: the test is unchanged, the reason for it is not — the volume and the speed changed, and so did who is not looking | The round trip runs in milliseconds and never gets bored |
| 6 | Sprawdzenie, które działa bez ciebie *(ending)* | Answers the opening in four decisions | The criterion the student picks for 7b |

## Owns · recalls · avoids

- **Owns:** *regresja* (as a plain word first: „coś, co działało wczoraj, dziś
  nie działa”), *test* as a mechanical check, *round trip* in Polish only
  („zapisz i odczytaj to samo”), and the pair **„zielone / czerwone”** as a
  promise for 7b.
- **Recalls, one clause each with a link:** „wrażenie nie jest dowodem” and the
  METR gap **without its numbers** (1c) · dziennik weryfikacji and „biegłość to
  nie poprawność” (3d) · „gdzie jest stan” (6f) · the four questions and the
  „werdykt z bo” (6h) · the file failures and exception types (6g, which is
  where this application's save code came from).
- **Avoids:** NUnit, any attribute, any command — all of 7b. Coverage. TDD as a
  named method. Kinds of test (unit/integration/e2e). The word *asercja*.

## Exercises

Folded into 7b's hand-in assignment (`docs/content-style.md`, „The hand-in
assignment”: 7a's work lands in a repository only in the next lesson). 7a
therefore keeps two of the four kinds, both ending in `dziennik.md`:

1. **Action on the anchor** — break your own application with awkward data;
   record in `dziennik.md`: what you put in, what came out, and whether the
   window showed anything. Observable result: two lines and a verdict.
2. **Research** — find the acceptance criterion in your own
   `specs/001-*/spec.md` that the defect violates, quote it, and write one
   sentence saying which criterion 7b's first test will check. If **no**
   criterion covers it, that is the finding: write „specyfikacja o tym milczy”
   and add the sentence. *(4e's rule: the specification changes before the code.)*

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| `FAIL_TO_PASS` / `PASS_TO_PASS` definition, verbatim | [openai.com](https://openai.com/index/introducing-swe-bench-verified/) | 13.08.2024 | have |
| Meta TestGen-LLM 75 / 57 / 25 / 73 | [arXiv:2402.09171](https://arxiv.org/abs/2402.09171) | 14.02.2024 | have |
| The misguidance effect — direction only, **no percentage** | [arXiv:2607.22883](https://arxiv.org/abs/2607.22883) | 24.07.2026 | have; number dropped (research §7.1) |
| Böckeler on a red test proving only that the agent saw red | [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/tdd-in-the-agent-loop.html) | 10.08.2026 | have |
| „Give Claude a check it can run…” | [code.claude.com](https://code.claude.com/docs/en/best-practices) | **undated** — say so in the lesson | have, with the caveat |
| Kent Beck, „Any indication that the genie was cheating…” | [newsletter.kentbeck.com](https://newsletter.kentbeck.com/p/augmented-coding-beyond-the-vibes) | 25.06.2025 | have |
| GitClear duplication / refactoring figures | [gitclear.com](https://www.gitclear.com/the_ai_code_quality_maintainability_gap) | 01.2026 | have; month-only date stated in the lesson |
| The measured 2-in-3-out / 0-in-1-out | research §6.2, this repository | 10.09.2026 | have — built and run |
| **A regression rate („AI breaks working code N% of the time”)** | — | — | **dropped — does not exist** (research §7.2) |

## Reader assumptions to verify

- That every student's application persists something. If not, the fallback
  above is used and Viktar should know how many students needed it.
- That students still have `dziennik.md` from Moduł 5 and 6 in the same
  repository.

## Decisions

- **No test is written in 7a** — rejected: showing one „so they see where it is
  going”. The lesson's whole force is the gap between finding the bug and having
  something that finds it for you; closing that gap in the same hour throws it away.
- **The bug is found by the student, not shown by the lesson** — rejected:
  printing the broken code and asking what is wrong with it. That is a *Rozbierz
  to*, and this class has done four of them; being bitten by your own code is a
  different experience and it is the one v1 said this module was placed here for.
- **No numbers from METR here.** 1c owns them; 7a needs the idea, not the study.
- Quoting Anthropic's undated documentation is allowed **only** with „strona bez
  daty, sprawdzona 10 września 2026” in the attribution — ADR-0008's rule for a
  living page.

## Open questions for Viktar (≤ 3)

1. Is three hours right for a lesson with no code in it? It could be two, with
   the hour going to 7b, which is the one with a compiler in it.

## Deviations from the approved arc

- Drafted the same day as the brief, unapproved (module-level decision).
