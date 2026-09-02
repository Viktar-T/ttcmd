# Brief — 04b · Konstytucja projektu i reguły

| | |
| --- | --- |
| Lesson | `content/moduly/04-specyfikacja/konstytucja-i-reguly.mdx` · `order: 2` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** (see `04-index.md`) |
| Mode | autonomous (unapproved) |
| Research | `research-06` §2.1 (constitution row), §2.5 (ADR), §5.7; Spec Kit's constitution template and `spec-driven.md` (nine articles, „Governance”) |
| Drafted | 2026-09-02 |

## Reader position

Has read 0a–0c, 1b–1h, 2a–2d, 3a–4a. Can: write and revise a rules file (`AGENTS.md`, 3c)
and say why it must be short; keep `dziennik.md`; create a repository and make a first
commit (2b, 0c); has just written the minutnik's retro-description (4a) and knows the word
*specyfikacja*. Has seen `DECISIONS.md` in the 1d demo prompt („one line per decision, each
naming the alternative you rejected”). Has never: written a rule that outranks a
description of a feature; recorded a decision with its rejected alternative in their own
project; made a first commit that contains no code.

## Carrying question

What in a project must stay true no matter which feature you add next — and where do you
write it so that no specification can break it?

## Anchor

**The `notatnik-v2` repository, created in this lesson, empty.** By the end it holds two
files and no code: `konstytucja.md` (six to eight lines) and
`decyzje/0001-format-pliku-notatek.md` (one paragraph with four fields). The katalog's
`AGENTS.md` from 3c is the foil in section 1: it is reread and its lines are sorted.

## Shape

Hands-on: a short concept, then two files written section by section, each with what to
notice; a procedure-like middle (write, sort, commit) inside a narrative frame.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | reread the katalog's `AGENTS.md`; try to answer from it „czy ta aplikacja może kiedykolwiek wysłać dane do internetu?” — it does not say, nothing does → question | the rules file as the thing that exists, the constitution as the thing that does not |
| 1 | Trzy rodzaje zdań o projekcie | introduce the distinction by sorting: sentences about *how code is written* (rules file), about *what this feature does* (spec), about *what is always true of the program* (constitution); a short table of examples from the katalog and the notatnik | ten sentences sorted, three of them from `AGENTS.md` |
| 2 | Konstytucja: to, czego żadna funkcja nie zmieni | the concept and the file: what the program is (one sentence), for whom, what it never does, the language rule, no dependencies, the rank rule („specyfikacja nie może temu zaprzeczyć”), and how it changes (only by an explicit decision, recorded); written for the notatnik-v2 in six to eight lines; Spec Kit's constitution with nine articles named as the same idea at company size, one sentence on its „Governance” section | `konstytucja.md` written |
| 3 | Dlaczego działa na agenta, choć nie jedzie z każdym zapytaniem | mechanism and trade-off: unlike the rules file, the constitution is read when a spec or a plan is written, not on every request; Spec Kit's plan template has a „Constitution Check” gate before any code; it is short because it is for humans first; what it costs (one more file to keep true) | the gate, applied to a sample sentence a spec might try („notatki synchronizują się z telefonem”) |
| 4 | Zapis decyzji: dlaczego, nie tylko co | the second file: Nygard 2011 — decisions get lost, and someone who meets one without its reasons accepts or reverses it blindly; the record — kontekst, decyzja, odrzucone, skutki — one paragraph, numbered, never deleted, superseded rather than edited; `DECISIONS.md` from 1d recalled as the one-line version | `decyzje/0001-format-pliku-notatek.md`: Markdown as in Budowa 2 — rejected: JSON, one file per note |
| 5 | Pierwszy commit bez kodu | the action: commit both files, push; what a repository with two decisions and no code says to whoever opens it | `git log` with one entry |
| 6 | Zanim powstanie linijka | ending: the answer — the constitution is where the sentences go that no feature may argue with; the decision record is where the *why* goes so it is not lost; both exist before the first line of code, which is the point; next: the spec | — |

## Owns · recalls · avoids

- **Owns** (proposed appendix rows): *konstytucja projektu*; *zapis decyzji / ADR*
  (kontekst, decyzja, odrzucone, skutki); Nygard 2011 („one of the hardest things to track…
  is the motivation behind certain decisions”; „large documents are never kept up to
  date”); Spec Kit's nine-article constitution as the company-size example; the three kinds
  of sentences (how / what this feature / what is always true).
- **Recalls**: 3c's rules file and its „czy powiem to jeszcze w trzech kolejnych prośbach?”
  test (link); 3c's „plik reguł musi być krótki — z arytmetyki” (one clause); 1d's
  `DECISIONS.md` rule (link); 4a's definition of a spec (one clause).
- **Avoids**: the loop's other stages by name (4c); tool names beyond Spec Kit's
  constitution (4d); *kryterium akceptacji* (4c); *architektura* as a term — say „decyzja,
  która będzie miała skutki w każdym pliku”.

## Exercises

1. Recall — the three kinds of sentences and where each lives; the four fields of a
   decision record.
2. Action on the anchor — sort the twelve sentences given in the lesson into rules file /
   spec / constitution / decision record; two are deliberately ambiguous, say why
   (observable result: a table with twelve rows and two arguments).
3. Build step — `notatnik-v2`: `konstytucja.md` and `decyzje/0001-….md`, committed and
   pushed, before any template is generated; the repository is used in every later lesson
   of the module.
4. Research — open Spec Kit's constitution template (linked) and count its sections;
   write one sentence on which of its example principles would be nonsense for a notatnik
   and why — the point is that a constitution is sized to the project.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| Nygard: motivation behind decisions is one of the hardest things to track; ADR = title, context, decision, status, consequences; „one or two pages long”; „Large documents are never kept up to date”; numbered, never deleted, superseded | [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) | 15.11.2011 | have |
| Spec Kit: a constitution of nine articles („architectural DNA”); the plan has a „Constitution Check” gate; „Constitution supersedes all other practices” in the template's Governance section | [spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md) · [constitution-template.md](https://raw.githubusercontent.com/github/spec-kit/main/templates/constitution-template.md) · [plan-template.md](https://raw.githubusercontent.com/github/spec-kit/main/templates/plan-template.md) | 02.09.2026 (checked) | have |

## Reader assumptions to verify

- That the class may create a fourth GitHub repository under the account rules in force
  (decision #2) — otherwise `notatnik-v2` is a local repository until pushes are allowed.
- That the katalog's `AGENTS.md` exists for most students (3c's build exercise). If it does
  not, the opening uses the lesson's printed example instead.

## Decisions

- **The constitution is six to eight lines, not articles** — rejected: imitating the ttcmd
  or Spec Kit form with numbered articles. For a one-person notatnik that is theatre; the
  lesson shows Spec Kit's version as what the idea looks like when a company needs it.
- **The first decision record is the notes' file format** — rejected: „new repository
  instead of a branch”, which is a course decision, not the student's. Format is a decision
  the student actually makes, the spec relies on it, and it has honest rejected
  alternatives (JSON; one file per note).
- **The decision record has four fields, not Nygard's five** — status is folded into the
  file name and the folder's convention („a later file supersedes an earlier one”); four
  fields fit in a paragraph, which is the size a student will actually keep writing.
- **`decyzje/` in Polish, `konstytucja.md` in Polish; `specs/` in English in 4c** —
  rejected: all-English names. The student-facing files a student writes for themselves
  are Polish; `specs/` follows the folder name every tool in 4d uses, so the mapping table
  there reads without translation. Said in one sentence in 4c.

## Open questions for Viktar (≤ 3)

1. None beyond the module's three.

## Deviations from the approved arc

- Drafted 2026-09-02; revised the same day after the fresh-context review.
- The decision record's four fields are now presented honestly against Nygard's five:
  three of his stay, his title becomes the file name and his status the number, and the
  fourth — rejected alternatives — is said to come from 1d's `DECISIONS.md`, not from
  Nygard.
- Spec Kit's phrase „architectural DNA” is paraphrased („zbiór zasad, których żadna
  funkcja nie zmienia”) to keep *architektura* out of this lesson; „największe z
  narzędzi” became „jedno z narzędzi”.
- The format decision says „pięć wariantów” of Budowa 2 (the five `rundy/` files), to
  agree with the module brief and with 4e.
- Exercise 4 prints the template's five example principles in the lesson so that the
  judgement can be made without reading a page of English; the link stays for the
  willing.
