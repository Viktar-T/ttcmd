# Brief — 2a · Narzędzia: dwa edytory z agentem

| | |
| --- | --- |
| Lesson | `content/moduly/02-warsztat/narzedzia-dwa-edytory.mdx` · `order: 1` |
| Written | 2026-09-01, by write-lesson · approved: **2026-09-01, by Viktar** |
| Mode | supervised (brief approved before drafting) |
| Research | `course-structure-v2.md` (2a row; lab preparation: „Class tools” decision; the 1e fallback); `research-02` §4.1–4.3; corpus: 1b (layers), 1h (categories), 1e (the card) |
| Drafted | 2026-09-01 — deviations listed at the end |

## Reader position

Has read: 0a, 0c, module 1 intro, 1b–1h. Drove **one** of the two class
tools in 1e for 25 minutes on their own task; has an observation card in
their 0c repo, including a count of things approved without reading. Knows:
the five layers (1b), „ucz się kategorii, sprawdzaj nazwy” (1h), momenty
zgody (1d/1e). Has never: named what kind of program the 1e tool is, used
the second tool, compared two tools on the same task.

## Carrying question

Czym właściwie jest program, w którym tydzień temu twój agent coś zbudował —
i po co nam na kursie dwa takie?

## Anchor

The student's own 1e task, run again in **the other** of the two editors:
same task, same first message, second tool. Everything the lesson names —
the category, the shared VS Code skeleton, the agent panel, the consent
moments, where output lands — is seen twice, once per editor, on this one
task.

## Shape

Hands-on — the first lesson of the course's default shape. The running
example is the 1e task re-run; every section ends with something found or
done in an open editor.

## Arc

| # | Heading (Polish, working) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | in 1e you used a tool you could not yet name; today you learn what it is — by meeting its twin | the 1e task comes back |
| 1 | Kategoria, nie nazwa | both class tools are one category: edytor z agentem, fork VS Code — 1h's rule made flesh; recall 1b's layers (this is warstwa 4 zamieszkała w edytorze) | both editors open; the reader says which category each UI element belongs to |
| 2 | Ten sam szkielet, dwa agenty | guided tour written as „znajdź u siebie”: editor area, agent panel, moment zgody, where a new file lands — the same three things found in both tools | the task's files, located in each editor |
| 3 | Konta | what kind of account each tool wants (vendor facts, dated, linked); the rules for whose account are set in class, not here (Article V — same stance as 1e) | sign-in as the student's own action, on the task |
| 4 | Po co dwa | redundancy made policy: limits are real (1e's fallback becomes standing procedure); more free use across two accounts; the category outliving the names (1h, practically) | the task when one tool refuses: switch, note the moment on the card |
| 5 | (ending) Dwa okna, jeden warsztat | answers the opening: one set of habits serves both; names will change, the category and the habits stay; what 2b adds (a disciplined place for projects) | the card updated: which tool, what differed |

## Owns · recalls · avoids

- **Owns:** *fork* (jednego projektu z kodu drugiego; VS Code → oba
  narzędzia) — proposed appendix row: „fork → 2a”. The category name
  *edytor z agentem / AI-first* formally (1h used it in passing) — proposed
  appendix row: „edytor z agentem (kategoria) → 2a”.
- **Recalls:** five layers (1b, link, one clause); „ucz się kategorii,
  sprawdzaj nazwy” (1h, link — this lesson is its practical form); momenty
  zgody and the unread-approval count (1e card, one clause); the 1d demo
  tools as the wider family (one clause).
- **Avoids:** free-tier sizes and prices — dated vendor claims, links only
  (ADR-0008, v2.1 decision); prompting techniques (3b); token/context
  vocabulary (3a) — plain words „co agent widzi” only in passing.

## Exercises

1. **Recall** — from memory: the category vs the two product names; the
   three places (where you write to the agent, where you approve, where
   files land) — for both editors.
2. **Action on the anchor** — open both editors on the same folder; find the
   agent panel, the consent setting and where a new file lands; note one
   difference and one identical thing on your 1e card.
3. **Build step** — run your 1e task in the other editor, same first
   message, fresh folder; commit the updated card with a note „to samo
   zadanie, drugi edytor”.
4. **Research** — open both tools' current terms/pricing pages; write down
   today's date and one thing that differs from what the lesson's Źródła
   said („nic się nie zmieniło” is also a result).

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| Antigravity is an agent-first editor built on VS Code | antigravity.google / launch docs | — | to find, dated at draft time |
| Cursor is an agent-first editor built on VS Code | cursor.com / docs | — | to find, dated at draft time |
| Antigravity requires a Google sign-in | vendor docs | — | to find |
| Cursor requires its own account (e-mail / Google / GitHub) | vendor docs | — | to find |
| (deliberately absent) any free-tier size or price | — | — | dropped by design; Źródła sends readers to the source |

## Reader assumptions to verify

- 1e actually happened, in class, in one of these two tools (v2 open
  decisions #1–#3 settled by teaching time).
- Students may sign in to both tools on their own accounts (#2) — gates the
  Konta section's wording.

## Decisions

- Product names appear in prose: the lesson's subject *is* the two tools.
  Tool-neutrality here means category-first, names as examples of the
  category — rejected: 1e's unnamed-tools device, which cannot survive a
  lesson about the tools themselves.
- The Konta section describes what kind of account each tool wants and
  stops; whose account and whose consent stays out of the repo (Article V),
  said in class — rejected: instructing sign-in as 0c does for GitHub,
  unless decision #2 is settled (open question 1).
- No screenshots. The tour is written as „znajdź u siebie” prompts —
  rejected: a screenshot walkthrough, which rots with every UI update and
  ties the lesson to one tool version.

## Open questions for Viktar (≤ 3)

1. ~~Is decision #2 (accounts, age, consent) settled enough that 2a may
   *instruct* sign-in the way 0c instructs a GitHub account — or should it
   keep 1e's stance (rules set in class, lesson silent)? Blocks the Konta
   section's wording.~~ **Answered 2026-09-01: keep 1e's stance.** The lesson
   names what each vendor requires, dated and linked, and says the rules are
   set in class. Drafting found this to be the only defensible answer anyway —
   both vendors publish an 18+ requirement (deviation 3), which makes
   eligibility, not consent, the first question, and it is not this repo's to
   answer.

## Deviations from the approved arc

1. **„Antigravity is a VS Code fork” — dropped, not guessed.** The claim is not
   in Antigravity's own documentation anywhere I could find it (docs home, IDE
   overview, FAQ, both launch posts), and since the
   [IDE-extensions announcement of 20.08.2026](https://antigravity.google/blog/antigravity-ide-extensions)
   Antigravity is a desktop app *plus* extensions inside five other editors —
   so the shared-skeleton premise is sourced for one tool and unverifiable for
   the other. Section 1 now argues category-not-codebase: Cursor's own docs are
   quoted for its VS Code lineage (which is where the term *fork* is owned) and
   Antigravity's change of shape is used as the counter-case. This makes the
   lesson a better instance of 1h's rule than the approved version was.
2. **Section 2's heading changed** from „Ten sam szkielet, dwa agenty” to
   „Trzy rzeczy, które znajdziesz w obu”. The move is unchanged — the
   „znajdź u siebie” tour, the same three things in both — but its premise is
   now the category rather than a shared codebase (deviation 1).
3. **Konta gained an age requirement, for both tools.** Not anticipated by the
   claim table: Antigravity's FAQ („At the moment, Antigravity is unavailable
   to under-18 users”) and Cursor's Terms of Service of 13.08.2026 (18, or the
   age of majority, whichever is higher). Both are quoted, dated and linked.
   The section's stance is unchanged — Viktar's answer of 2026-09-01 to open
   question 1 was **keep 1e's stance**, so the lesson names what each vendor
   requires and leaves whose account and whose consent to the classroom.
4. **Cursor's sign-in providers dropped.** The brief's „e-mail / Google /
   GitHub” is not stated in Cursor's documentation, which only says to sign in.
   The lesson says „własne konto Cursora” and links the installation page.
5. **Free-tier links, no numbers**, as decided — and the „dwa darmowe progi”
   point is made without any figure at all.
6. **First lesson in the corpus to use slice 010's elements** — `<Zrodla>`,
   `<Zrodlo>`, `<CzytajDalej>`, `<Lektura>` — under the existing `## Źródła`
   and `## Czytaj dalej` headings, which the components deliberately do not
   render themselves.
7. **No `<Cytat>`.** The two English vendor sentences are quoted inline with
   their links; a pair of block quotes would have made the Konta section
   heavier than „describes and stops”.
