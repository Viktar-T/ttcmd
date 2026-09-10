# Brief — 05f · Budowa: tydzień drugi

| | |
| --- | --- |
| Lesson | `content/moduly/05-twoja-aplikacja/budowa-tydzien-drugi.mdx` · `order: 6` |
| Written | 2026-09-10, by write-lesson · approved: **not approved — autonomous run** |
| Mode | autonomous (unapproved) |
| Research | `course-structure-v2.md` v2.9, the 5f row (old 6d: „the second half of the specification; the first *Rozbierz to* on their own application; the rule that the specification changes before the code when the build proves it wrong”) and the module paragraph's rubric list, from which the two capabilities in section 3 are taken verbatim; lessons 3d and 4e as written |
| Drafted | 2026-09-10 |

## Reader position

Has read 0a–4e, 5a–5e. Has an application that starts, with about half its
criteria passing and evidence for each in `dziennik.md`; a task list with the
easy half left; and at least one criterion that turned out to be a wish. Has done
*Rozbierz to* once, in 3d, on a classmate's build — never on their own code,
where there is nobody else to hold responsible.

## Carrying question

Co robisz, kiedy budowa udowodni, że twoja specyfikacja się myli — i skąd wiesz,
że twój własny program jest za skomplikowany?

## Anchor

**The second half of `tasks.md`, and the specification beside it**, with the
diff of the whole two weeks as the thing *Rozbierz to* is run on at the end. The
lesson ends with every criterion either passing with evidence or rewritten with a
dated line saying why.

## Shape

Procedure with a narrative frame, four hours; section 4 is narrative.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | the criteria still open are, almost always, the ones written last — the ones you could not picture when you wrote them → this week is about what you do when the thing you wrote turns out to be wrong | the unticked half |
| 1 | Druga połowa to ta trudniejsza | why: the criteria you could picture went first, and what is left is what the specification only asserted. Read the remaining ones before touching code, and mark the ones you now cannot check | the remaining criteria, marked |
| 2 | Kiedy myli się specyfikacja, a kiedy kod | three signals that it is the specification: the criterion has two readings; the check cannot be run by anybody but you; the criterion is true and the application is still wrong. The move in each case — edit, commit, then code | one criterion, rewritten |
| 3 | Dwie rzeczy, które musi umieć każda z tych aplikacji | the module's own rubric, stated to the student: **aplikacja pamięta coś po zamknięciu** and **aplikacja przeżywa błąd, który użytkownik może spowodować**. Each with how to check it and no word about how to do it — the how is the next module's | two checks added to the journal |
| 4 | Rozbierz to, na własnym kodzie | 3d's exercise, now on the diff of your own two weeks. What is different: no author to ask, and the honest question is not „czy działa” but „czy zrozumiem to za miesiąc”. Three things to look for, and the one line of verdict with „bo” | the two-week diff |
| 5 | Zamknięcie listy | what „skończony” means this week: every criterion passing with evidence, or rewritten with a dated line; `pozniej.md` holding what did not fit; the task list matching reality | the finished list |
| 6 | Program, który jest twój | ending: the two weeks in one sentence, and the thing still missing — somebody who is not you | — |

## Owns · recalls · avoids

- **Owns** (proposed appendix rows): the three signals that the specification and
  not the code is wrong; the two capabilities as a rubric sentence pair; „czy
  zrozumiem to za miesiąc” as the *Rozbierz to* question for one's own code.
- **Recalls**: 3d's *Rozbierz to* (one clause, link, new consequence); 4e's
  „specyfikację zmienia się przed kodem” and the evidence rule; 5b's
  `pozniej.md`; 5e's stuck rubric.
- **Avoids**: how persistence or error handling is done — that is Moduł 6's
  („zapis i błędy”, „stan poza kontrolkami”), and naming either mechanism here
  would spend a home lesson's term. One forward pointer, by topic, no more.

## Exercises

1. Recall — the three signals that it is the specification that is wrong.
2. Action on the anchor — check the two capabilities: close the application,
   open it again, and write down what survived; then do the worst thing a user
   could plausibly do and write down what the application did.
3. Build step — finish the list: every criterion passing with evidence, or
   rewritten with a dated line saying why; pushed.
4. Reflection — *Rozbierz to* on your own two-week diff: three things you would
   not be able to explain in a month, and one verdict with „bo”.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| (none new — the method's evidence was spent in Moduł 4; 3d owns *Rozbierz to*) | — | — | — |

## Reader assumptions to verify

- That „the worst thing a user could plausibly do” is safe to ask of every
  application in the room. The draft bounds it: something a person could do by
  accident with the application open, never anything that touches another
  program or the system.

## Decisions

- **The two capabilities are stated as checks, not as features** — the module's
  rule; each is phrased so that it is true or false for an application whose
  subject the lesson does not know.
- **The rubric sentences are quoted from the module's own rule** — rejected:
  inventing a longer list. Two capabilities are what v2.9 names, and a third
  would be a feature in disguise.
- **One forward pointer to the next module** — rejected: explaining persistence
  here. The lesson needs the capability, not the mechanism.

## Open questions for Viktar (≤ 3)

1. None beyond the module's.

## Deviations from the approved arc

- Drafted 2026-09-10, same session (autonomous).
