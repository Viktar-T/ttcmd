# Brief — 05g · Pierwszy użytkownik i pierwsze zgłoszenie

| | |
| --- | --- |
| Lesson | `content/moduly/05-twoja-aplikacja/pierwszy-uzytkownik.mdx` · `order: 7` |
| Written | 2026-09-10, by write-lesson · approved: **not approved — autonomous run** |
| Mode | autonomous (unapproved) |
| Research | `course-structure-v2.md` v2.9, the 5g row (old 6e, widened: „the review against the criteria — and then the thing 8 of 12 have never had: a user … the owner reproduces it and decides in writing”); `docs/surveys/content-reader.md` („Had a user who was not themselves: 8 never”; „a release, a bug report, installing on someone else's machine: assume no”); Joel Spolsky, *Painless Bug Tracking*, found and dated at drafting; Bugzilla's Bug Writing Guidelines for *Czytaj dalej* |
| Drafted | 2026-09-10 |

## Reader position

Has read 0a–4e, 5a–5f. Has a finished application: every criterion passing with
evidence or rewritten with a reason, a specification that changed at least once
because the build proved it wrong, a `pozniej.md`, and a two-week diff they have
taken apart. Every one of those checks was run by the person who wrote the
criteria. Has never had a user who was not themselves (8 of 12), never received a
bug report, never installed a program on somebody else's machine.

## Carrying question

Co się dzieje z twoim programem, kiedy otworzy go ktoś, kto nie nazywa się tak
jak ty?

## Anchor

**`zgloszenia.md` in the author's own repository** — empty at the start of the
lesson, and by the end holding one report written by a classmate in three parts,
the author's note that it was reproduced, and one written verdict with „bo”.

## Shape

Hands-on, two hours: two short concept sections and then the exchange, which is
the lesson.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | every criterion in your journal passes — checked by the person who wrote it. That is the whole weakness of the last two weeks in one sentence → what happens when the checker did not write the criteria? | the empty `zgloszenia.md` |
| 1 | Przegląd przed użytkownikiem | the review against the criteria, recalled from 4e and given one new part: this reviewer also runs the application. What they get (specification, criteria, the diff), what they report (gaps in the criteria, never style) | the criteria list |
| 2 | Uruchomienie u kogoś innego | the first thing that breaks is that it ran on your machine. Three things the application must survive, as a rubric: it starts from a folder that is not yours; it does not need a file only you have; it says what it needs when it does not have it. How the classmate gets it — a clone, or a copied folder | one first launch, watched |
| 3 | Zgłoszenie ma trzy części | Spolsky's three parts, quoted with attribution, and why the third is the one everybody drops. What a report is not: a diagnosis, a proposed fix, or „nie działa” | the report, written by the classmate |
| 4 | `zgloszenia.md` | the format and where it lives: the reporter writes the entry, hands it over, the author commits it in their own repository. Why not a change sent into somebody else's repository — that is a later module's subject, once | the file, one entry, committed |
| 5 | Odtwarzam, potem decyduję | reproduce first, decide second, and the three verdicts in writing, each with „bo”: *naprawiam · nie naprawiam · to nie błąd, to brak w specyfikacji*. The third is the one that teaches, because it sends you back to the file | the verdict under the entry |
| 6 | Ktoś prawdziwy, wreszcie | ending: the module's own bar from 5a, now met once, and what it cost; what the application carries into the next module | the committed file |

## Owns · recalls · avoids

- **Owns** (proposed appendix rows): Spolsky's three parts of a report (home 5g);
  `zgloszenia.md` and its entry shape; the three verdicts with „bo”; the three
  things an application must survive on somebody else's machine.
- **Recalls**: 5a's bar („ktoś prawdziwy ma tego używać”) — this is where it is
  paid; 4e's fresh-context review and the warning about a reviewer asked to find
  gaps, one clause with a link; 5c's criteria.
- **Avoids**: a pull request into a classmate's repository — Moduł 7 owns it and
  the lesson says so in one sentence; *issue*, *tracker*, *triage*, *release* as
  terms; any application code; anything that presumes what the application does.

## Exercises

1. Recall — the three parts of a report and the three verdicts, from memory.
2. Action on the anchor — install a classmate's application and use it for ten
   minutes as the person from their second sentence would; write one report in
   three parts.
3. Build step — commit the report you received into `zgloszenia.md`, reproduce
   it, and write the verdict with „bo”; if the verdict is *naprawiam*, the fix
   is one task with one commit; if it is *brak w specyfikacji*, the specification
   changes first.
4. Reflection — one paragraph in `dziennik.md`: the difference between a
   criterion you wrote for yourself and a complaint you received, and what you
   would put in the specification if you were starting the two weeks again.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| „1. Steps to reproduce, 2. What you expected to see, and 3. What you saw instead.” | [joelonsoftware.com, 08.11.2000](https://www.joelonsoftware.com/2000/11/08/painless-bug-tracking/) | 08.11.2000 | have |
| „Steps to reproduce are the most important part of any bug report” | [bugzilla.mozilla.org, Bug Writing Guidelines](https://bugzilla.mozilla.org/page.cgi?id=bug-writing.html) | page undated — checked 10.09.2026 | have (*Czytaj dalej*) |
| „a reviewer prompted to find gaps will usually report some” — recalled, sourced in 4e | [code.claude.com/docs](https://code.claude.com/docs/en/best-practices) | checked 02.09.2026 in 4e | have (one clause, link only) |

## Reader assumptions to verify

- That a classmate can obtain and run the application: a clone from GitHub if the
  repository is public, a copied folder otherwise. Depends on 5c's open question
  about repository visibility.
- That pairing students for the exchange is a classroom arrangement Viktar makes;
  the draft says „zamień się z kimś” and nothing about groups (Article V).
- Whether reporting on a classmate's application should be attributed by name in
  the file. The draft has the entry signed with a first name or an initial —
  it lives in a student's own repository, which may be public, so this is
  Viktar's call.

## Decisions

- **The report is a file in the author's repository, not an issue** — Viktar's
  answer, 2026-09-10. Rejected: an issue in the author's repository (it needs the
  repository to be public or the reporter invited, and leaves a login on a public
  artifact), and a pull request (Moduł 7's promoted move).
- **Reproduce before deciding** — rejected: deciding from the description. „Nie
  umiem tego powtórzyć” is itself a finding and belongs in the file.
- **Three verdicts and no fourth** — rejected: „do rozważenia”. A fourth verdict
  is where reports go to die, and the module has one lesson to make that visible.

## Open questions for Viktar (≤ 3)

1. Whether the reporter signs the entry, and with what — a first name, an
   initial, a GitHub login — given that the repository may be public (Article IV
   is about this repo, but the habit is the point).

## Deviations from the approved arc

- Drafted 2026-09-10, same session (autonomous).
