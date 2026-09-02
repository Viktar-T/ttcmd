# Brief — 04a · Po co komu specyfikacja

| | |
| --- | --- |
| Lesson | `content/moduly/04-specyfikacja/po-co-specyfikacja.mdx` · `order: 1` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** (see `04-index.md`) |
| Mode | autonomous (unapproved) |
| Research | `research-06` §0, §1.1–1.2, §2.6, §4.1, §4.5; `research-01` §3 (the consequence that produces SDD) |
| Drafted | 2026-09-02 |

## Reader position

Has read 0a–0c, 1b–1h, 2a–2d, 3a–3d. Can: open any of their three repositories and read
its history; run `dotnet build` and `dotnet run`; read a diff; write a prompt with a format
and an example; keep `dziennik.md`. Knows from 3d that a model completes rather than says
„nie wiem”, and from 3a that the whole thread is re-sent every turn and dies with the
session. Has never: written down what a program should do before building it; compared a
running program against a written description of it; seen a number for how much an
unclear description costs.

## Carrying question

Three applications work — so why write anything down, and what exactly?

## Anchor

**The minutnik repository, opened today.** Section 0 asks where in it the seven rules from
3a are written. They are not: the code, `AGENTS.md`-less (the minutnik predates 3c),
`dziennik.md` with one retroactive entry, perhaps a README. The rules exist in lesson 3a
and in a thread that is gone. The anchor is carried to the end: the student reconstructs
the minutnik's description from the running app (what it does; what it never does; five
„Kiedy…, to…” sentences) and finds the two things nobody decided.

## Shape

Narrative with a hands-on spine: the argument runs through numbers and a forty-year-old
quotation, but every section returns to the minutnik on the student's screen and the
lesson ends with a file written and committed.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | open the minutnik repository → find where it says what the app should do → nothing does → question | the seven rules: where are they now? |
| 1 | Trzy repozytoria i ani jednego zdania o tym, co miało powstać | introduce the problem: what each repository does contain (code; a rules file that says *how*; a journal that says *what was checked*; a README that says *how to run*) and what none contains; Singh's „it's gone” as the industry's version of the same discovery | inventory of the minutnik repo |
| 2 | Co model robi z tym, czego nie napisałeś | show evidence: Larbi et al. — 20–40% fewer correct solutions on unclear descriptions; code that runs but is wrong from 24% to 54/65/89%; models do not notice the description is unclear; limits stated (small functions, 2025 models) | notatnik round 1 recalled: „do pliku” and the model chose the format |
| 3 | Najtrudniejsza część była zawsze ta sama | explain the mechanism historically: Brooks 1987 — deciding what to build was always the hardest part; agents made typing cheap and left that part where it was; 1f's warning recalled (DHH can be vague; you cannot) with link | the two minutnik rules the student cannot reconstruct |
| 4 | Czym specyfikacja jest, a czym nie jest | the concept: a written statement of what the program does, for whom, what it never does, and how you will know — before the code, next to the code; not a prompt (dies with the thread), not the rules file (how, not what), not documentation (after); the lineage README → AGENTS.md → dziennik → spec; the cost (an hour before building; things dropped as undecided) and what it buys (three things) | the 1d demo prompt recalled by link as half a spec already |
| 5 | Co spisujesz dzisiaj | the action: reconstruct the minutnik's spec from the running app on one page; the two things nobody decided go under „Do ustalenia” | the retro-spec, `docs/co-mial-robic.md` in the minutnik repository |
| 6 | Plik, którego brakowało | ending: the answer — not for bureaucracy; for the agent (what it cannot guess), for you (what to check against), for you in two months (why); the next lesson: before specs, the thing that outlives them | — |

## Owns · recalls · avoids

- **Owns** (new home; proposed appendix rows): *specyfikacja* (the term and its
  definition); Brooks's „deciding precisely what to build”; Singh's „it's gone”; Larbi et
  al. 2025 (20–40%; 24 → 54/65/89%); the lineage README → AGENTS.md → dziennik → spec.
- **Recalls** (one clause, link on first recall): 3d's „model completes rather than says
  I don't know” (link); 3a's thread re-sent and gone (no link needed — same module family,
  one clause); 3b's round 1 („do pliku”, the model chose the format) with link; 1f's „DHH
  może być niejasny… ty tego wyczucia jeszcze nie masz” with link; the 1d demo prompt's
  functional requirements and done-criterion with link; 1g's *vibe coding* as a term, no
  re-explanation.
- **Avoids**: *kryterium akceptacji* as a term (home 4c — 4a says „zdanie, które da się
  sprawdzić”); *konstytucja* (4b); the tools and their names (4d) — 4a does not name Spec
  Kit or Kiro, only „narzędzia, które w 2025 roku dostały to samo pytanie”; *test
  jednostkowy* (Moduł 6).

## Exercises

1. Recall — the three things a spec gives (agent / you / future you) and one sentence each
   on how a spec differs from the rules file and from the journal.
2. Action on the anchor — reconstruct the minutnik's description from the running app in
   thirty minutes: what it does, what it never does, five „Kiedy…, to…” sentences; mark
   what you could not decide (observable result: a one-page file with at least one item
   under „Do ustalenia”).
3. Build step — commit the file as `docs/co-mial-robic.md` in the minutnik repository and
   push; it is compared with the real spec in 4c.
4. Research — reread the 1d demo prompt: which of its lines say *what*, which say *how*,
   which say *how we will know it is done*; count each kind.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| „if a developer returns two months later… they have absolutely no idea what prompts led to that. It's gone.” — Deepak Singh (AWS) | [GeekWire](https://www.geekwire.com/2025/amazons-surprise-indie-hit-kiro-launches-broadly-in-bid-to-reshape-ai-powered-software-development/) | 17.11.2025 | have |
| Pass@1 falls 20–40% on ambiguous / incomplete / contradictory descriptions; GPT-4 HumanEval 73,8% → 45,1 / 34,8 / 6,7; runnable-but-incorrect 24% → 54 / 65 / 89%; models cannot reliably detect unclear descriptions | [Larbi et al., arXiv 2507.20439](https://arxiv.org/abs/2507.20439) | 27.07.2025 | have |
| Brooks: „The hardest single part of building a software system is deciding precisely what to build…” | [No Silver Bullet, IEEE Computer 20(4)](https://www.cgl.ucsf.edu/Outreach/pc204/NoSilverBullet.html) | 04.1987 | have |
| Delimarsky: „exceptional at pattern completion, but not at mind reading” | [GitHub Blog](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) | 02.09.2025 | have — used in one clause |

## Reader assumptions to verify

- That the minutnik repositories exist and have no written description in them beyond
  `dziennik.md` (Viktar — if 3a's class added a README with the seven rules, the opening
  softens to „nie ma tam kryteriów, po których poznasz, że działa”).
- That the class can open a five-week-old repository and run it (lab profile persistence,
  decision #1).

## Decisions

- **The anchor is the minutnik, not the notatnik** — rejected: opening on the notatnik,
  which the module rebuilds. The minutnik is the oldest repository and the one whose rules
  were the most explicit (seven, numbered) and are the most completely gone; the notatnik
  keeps its first appearance in the module for 4b.
- **Larbi et al. are quoted with four numbers and their limits in the same paragraph** —
  rejected: quoting only the 20–40% headline. The runnable-but-incorrect figure is the one
  that connects to 3d (fluent ≠ correct), and the limits (single functions, 2025 models)
  are what keep the lesson honest.
- **Brooks is the only historical name; the lineage is told without names** — rejected:
  adding North / Mavin / Nygard here. They have homes in 4b and 4c where their ideas are
  used.
- **The retro-spec goes into the minutnik repository as `docs/co-mial-robic.md`** —
  rejected: a loose file. It should be a commit so that 4c can compare it with a real spec
  and the student can see how much the vocabulary changed in a week.

## Open questions for Viktar (≤ 3)

1. None beyond the module's three (`04-index.md`).

## Deviations from the approved arc

- Drafted 2026-09-02; revised the same day after the fresh-context review.
- §2's heading is „Co model robi z tym, czego nie napiszesz” (neutral form).
- Delimarsky's „pattern completion, not mind reading” was **not** used — the paragraph
  carried the point without a fifth name.
- The Larbi numbers are split into two paragraphs with an interpretation between them,
  the unit is the paper's („o 20–40%”, not percentage points), and a further paragraph
  states the limit the research file demanded: the study measures description quality,
  not the method; no controlled study of the method on real applications exists.
- An invented class measurement („Większości osób udaje się cztery lub pięć”) was
  removed; the reader is asked to count for themselves.
- Singh's setup is limited to what GeekWire supports (vice-president for developer
  tools at AWS; the quotation); „tysiące repozytoriów” dropped.
- Brooks is introduced without a ranking of his book („informatyk i autor książek o
  tym, jak powstają duże programy”).
- The retro-description is called „spisana po fakcie”, not „wstecz”; the file name
  `docs/co-mial-robic.md` stays.
