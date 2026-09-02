# Brief — 04c · Pętla: specyfikacja → plan → zadania → kod

| | |
| --- | --- |
| Lesson | `content/moduly/04-specyfikacja/petla-spec-plan-zadania.mdx` · `order: 3` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** (see `04-index.md`) |
| Mode | autonomous (unapproved) |
| Research | `research-06` §2.1–2.4, §4.3 (the size rule), §5.3–5.6; Spec Kit's spec/plan/tasks templates; North 2006; Mavin's EARS; Wake 2003; Anthropic best practices |
| Drafted | 2026-09-02 |

## Reader position

Has read 0a–0c, 1b–1h, 2a–2d, 3a–4b. Has: a minutnik retro-description with items under
„Do ustalenia” (4a); `notatnik-v2` with a constitution and one decision record and no code
(4b); the old notatnik with its `rundy/` folder and its Markdown format from 3b. Can: start
a fresh session and knows what it proves (3c); read a diff; make one commit per change
(2d). Knows the words *specyfikacja*, *konstytucja projektu*, *zapis decyzji*. Has never:
written an acceptance criterion; handed a description to a classmate to build from; seen a
plan or a task list as separate written artefacts.

## Carrying question

How do you write down what is to be built so that someone who never saw your conversation
could build it — and so that you can check they built *that*, not something similar?

## Anchor

**`specs/001-notatnik/spec.md` in `notatnik-v2`**, written in the lesson section by
section as the worked example, then the `plan.md` and `tasks.md` derived from it. The
student's own spec (their format from 3b may differ from the lesson's) is the build
exercise, reviewed by a classmate. The old notatnik's known failure — the newest-first file
that lost a note — is the acceptance criterion the lesson keeps returning to.

## Shape

Hands-on: a diagram of the loop, then the three files written in the lesson with what to
notice after each, two failure modes shown on the same files, a variation (the same spec
would fit a console notatnik), and the student's own spec as the build step.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | the retro-description from 4a: some sentences could be checked („czas jako mm:ss”), some could not („ma być wygodny”); the constitution exists and the code does not — what goes between them? → question | — |
| 1 | Cztery pliki, cztery pytania | the loop as a drawing (`<Rysunek>`: konstytucja → spec → plan → zadania → kod → sprawdzenie, with the check arrow back to the spec) and a table: file → the question it answers → what must not be in it; a forward pointer that every 2025 tool has these four stages under other names | the folder `specs/001-notatnik/` |
| 2 | Specyfikacja: co, dla kogo, czego nigdy, po czym poznam | the worked example, in full: Cel; Dla kogo; Co robi (numbered „Program pozwala…”); Czego nie robi; Kryteria akceptacji; Do ustalenia — with what to notice after it (no file name, no class name, no library; every criterion checkable by opening `notatki.md` or running `dotnet build`) | `spec.md`, ~40 lines |
| 3 | Kryterium akceptacji: zdanie, które da się sprawdzić | the concept: a situation, an action, a checkable outcome — „Kiedy…, to…”; three tools write it three ways (Given/When/Then — North 2006; EARS „WHEN… THE SYSTEM SHALL…” — Mavin, Rolls-Royce 2009, jet engines; OpenSpec's SHALL + scenario) and the shape is the same; good vs bad on the notatnik („zapis działa” vs „Kiedy zapiszę piątą notatkę, plik ma pięć wpisów, najnowszy pierwszy”); why the file on the disk is the cheapest check | the criterion about the fifth note |
| 4 | Wyciek do planu | failure mode 1: a spec that names `NotesWindow.axaml.cs`, `DispatcherTimer` or „klasa NoteStore” has leaked; why it matters (the same spec must let a fresh session — or the console fallback — plan); the honest tension: one vendor's guidance lets file names into a spec written for one session, and the course draws the line at the constitution's rule for a reason the student can test; the test: hand the spec to someone who has not seen your chat — can they write the plan? | a leaked version of two lines of the spec, and the repair |
| 5 | Plan: jak, i tylko jak | `plan.md` written by the agent in a **fresh session** that sees only `konstytucja.md` and `spec.md` (3c's fresh-session mechanism recalled); what a plan holds: file map, order of work, what stays outside, the constitution check; it never re-argues why | `plan.md` for the notatnik, ~25 lines, with one line the student should strike („uzasadnienie: notatnik jest potrzebny, bo…”) |
| 6 | Zadania: małe i sprawdzalne | `tasks.md`: ordered, each with „gotowe, gdy…”; failure mode 2: „ulepsz zapisywanie” is not a task; Wake's „done means” in one clause; one task one commit (2d recalled); the size rule from Anthropic: if you could describe the change in one sentence, skip the plan — a spec is for a week of work | six tasks for the notatnik, T01 = template and first commit |
| 7 | Cztery pliki zamiast jednej rozmowy | ending: the answer — a stranger can build it and you can check it; what the student can now do; next: the tools that wrap these files (4d), then the build (4e) | — |

## Owns · recalls · avoids

- **Owns** (proposed appendix rows): *kryterium akceptacji* („Kiedy…, to…” + „po czym
  poznam”); *pętla spec → plan → zadania → kod* and its drawing; *plan*, *lista zadań*;
  *wyciek do planu*; *świeży kontekst jako test specyfikacji*; *Do ustalenia*
  (`[NEEDS CLARIFICATION]`); Dan North 2006 (Given/When/Then; „As a… I want… so that”);
  Mavin's EARS 2009; the size rule („jeśli zmianę da się opisać jednym zdaniem, nie pisz
  specyfikacji”); Wake 2003 in one clause.
- **Recalls**: 4a's definition (one clause); 4b's constitution and the rank rule (link);
  3c's fresh session (link); 3b's newest-first bug and the Markdown format (link); 2d's one
  task one commit (link); 1d's `DECISIONS.md` (one clause, as the ancestor of „Do
  ustalenia”); 3d's „biegłość to nie poprawność” (one clause).
- **Avoids**: tool names beyond the three needed for the notations (Spec Kit, Kiro,
  OpenSpec each appear in ≥ 2 sentences in section 3, or the sentence loses the name);
  Böckeler (4d); *test jednostkowy*, *TDD*, *CI* (Moduł 6, 1g) — say „sprawdzenie, które
  umiesz uruchomić”; *user story* as a term — say „zdanie o użytkowniku”.

## Exercises

1. Recall — the four files and the question each answers; the two failure modes, one
   example each.
2. Action on the anchor — rewrite five bad criteria given in the lesson into checkable ones
   (observable result: five „Kiedy…, to…” sentences, each with how it would be checked).
3. Build step — write your own `specs/001-notatnik/spec.md` in `notatnik-v2` (your format
   from Budowa 2, your criteria), commit; swap with a classmate: from the spec alone, they
   list the files they would create and mark every leak and every hidden question; fix,
   commit again. The spec is built in 4e.
4. Research — reread the 1d demo prompt and sort its lines into konstytucja / spec / plan /
   zadania; write which stage it lacked entirely and what that cost on the demo (the
   `DECISIONS.md` files told you).

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| Spec Kit's spec template: User Scenarios → Requirements → Success Criteria („technology-agnostic and measurable”) → Assumptions; acceptance scenarios as Given/When/Then; `[NEEDS CLARIFICATION]` markers | [spec-template.md](https://raw.githubusercontent.com/github/spec-kit/main/templates/spec-template.md) · [spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md) | 02.09.2026 (checked) | have |
| North: „Given some initial context, When an event occurs, Then ensure some outcomes”; „As a [X] I want [Y] so that [Z]” | [Introducing BDD](https://dannorth.net/blog/introducing-bdd/) | 03.2006 | have |
| EARS: Mavin and colleagues, Rolls-Royce, first published 2009; „When <trigger>, the <system> shall <response>”; six patterns; used by Airbus, NASA, Siemens | [alistairmavin.com/ears](https://alistairmavin.com/ears/) | checked 02.09.2026 | have |
| Kiro uses EARS: „WHEN a user submits a form with invalid data THE SYSTEM SHALL display validation errors…”; clarity, testability, traceability, completeness | [Kiro docs — concepts](https://kiro.dev/docs/specs/concepts/) | checked 02.09.2026 | have |
| OpenSpec: „The app SHALL…” + „#### Scenario: WHEN… THEN…” | [OpenSpec README](https://github.com/Fission-AI/OpenSpec) | checked 02.09.2026 | have |
| Anthropic: „If you could describe the diff in one sentence, skip the plan”; „The most useful specs are self-contained: they name the files and interfaces involved…”; „start a fresh session to execute it” | [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) | checked 02.09.2026 | have |
| Wake: Testable = „I understand what I want well enough that I could write a test for it”; SMART tasks, Measurable = „team agrees on what done means” | [INVEST in Good Stories, and SMART Tasks](https://xp123.com/invest-in-good-stories-and-smart-tasks/) | 08.2003 | have |

## Reader assumptions to verify

- That students can pair up for the spec swap in class (Viktar — a classroom arrangement,
  as with 3d's peer exercise). If not, the swap becomes „a fresh agent session gets the
  spec and is asked to list the files it would create”.
- That most students' notatnik from 3b saved to a Markdown file with newest-first ordering;
  the worked example assumes it. A student whose format differed writes their own criteria.

## Decisions

- **The worked spec is shown in full (≈ 40 lines) and the plan and tasks in full** —
  rejected: fragments. Students have never seen these files; the whole thing at notatnik
  size is short enough to read in class and is the model for the build step.
- **The line between spec and plan is the constitution's (no file names in the spec), and
  the vendor guidance that disagrees is quoted, not hidden** — rejected: pretending there is
  one rule. Students will meet the other rule the week they read a vendor's docs; better to
  give them the reason the course chose (a spec that survives a change of stack or tool;
  the fresh-context test) and let them see the disagreement.
- **Three notations are shown for the acceptance criterion, and EARS gets its origin
  sentence** — rejected: only „Kiedy…, to…”. The three-tools-one-shape point is what makes
  the Polish form credible, and the Rolls-Royce origin answers „is this a fad” in one line.
- **`specs/` in English, the files inside in English names with Polish content** — matches
  every tool in 4d's table so the mapping reads without translation; said in one sentence.
- **The plan is written by the agent in a fresh session, the spec by the student** —
  rejected: student writes all three by hand. Writing the plan is where the agent is good
  and the fresh session is the test; the student's job is to read it against the spec.

## Open questions for Viktar (≤ 3)

1. None beyond the module's three.

## Deviations from the approved arc

- Drafted 2026-09-02; revised the same day after the fresh-context review.
- **Title changed to „Pętla: specyfikacja → plan → zadania → kod”** (the module brief's
  decision: *specyfikacja*, never „spec” alone in prose); the H2 „Spec: …” likewise; the
  slug `petla-spec-plan-zadania` is unchanged.
- Spec Kit, Kiro and OpenSpec are named in the notations table and each earns a second
  sentence, as the brief required; Anthropic is named (two sentences) as the vendor whose
  guidance draws the spec/plan line elsewhere; Bill Wake is not named in prose (one
  clause with a link; his article is in *Czytaj dalej*).
- „Do ustalenia” is introduced as the same section the student wrote for the minutnik
  in 4a, not as new.
- Forward references trimmed to the budget (the `specs/` naming sentence and the
  „wrócimy” lead-in no longer point forward).
- „Największe z narzędzi” and „pierwsze sformułowanie” (Wake) removed as unsourced
  superlatives.
