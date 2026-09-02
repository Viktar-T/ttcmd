# Brief — 04d · Narzędzia SDD: jedna pętla, pięć opakowań

| | |
| --- | --- |
| Lesson | `content/moduly/04-specyfikacja/narzedzia-sdd.mdx` · `order: 4` |
| Written | 2026-09-02, by write-lesson · approved: **not approved — autonomous run** (see `04-index.md`) |
| Mode | autonomous (unapproved) |
| Research | `research-06` §1.1 (timeline), §1.3 (Böckeler's levels), §3 (tool table; the class editors' plan features), §4.4 (critique), §5.2 |
| Drafted | 2026-09-02 |

## Reader position

Has read 0a–0c, 1b–1h, 2a–2d, 3a–4c. Has: `notatnik-v2` with `konstytucja.md`, one
decision record and a reviewed `specs/001-notatnik/spec.md`; has seen a plan and a task
list written from the spec (4c's worked example). Knows from 1h that the category is stable
and the names are not, and from 2a that the two class editors are two products of one
category. Has never: used a tool that generates a spec, a plan or a task list; read a
tool's template; switched on a plan mode in their editor on purpose.

## Carrying question

If the loop is one, why are there five tools — and which one will you actually use?

## Anchor

**The student's own four files** (`konstytucja.md`, `spec.md`, `plan.md`, `tasks.md`) laid
in a table against each tool's files: the same four slots, different names. The table is
built row by row through the lesson and is what the student takes away; the exercise puts
the student's spec into their own editor's plan mode and compares the plan that comes out
with the one from 4c.

## Shape

Narrative with a reading exercise; no build. A dated table, a mapping table, one critical
voice, one section about the students' own editors.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | you have four files written by hand; between July and December 2025 five companies shipped tools whose whole job is to generate those four files → question | the folder listing of `notatnik-v2` |
| 1 | Pięć opakowań w pięć miesięcy | show the evidence: the dated table (Kiro 14.07.2025; Spec Kit 02.09.2025; Tessl 23.09.2025; Kiro GA 17.11.2025 with 250 000 developers in the preview; Conductor 17.12.2025; OpenSpec in the same year) — each with one line on its shape; the convergence argument (1h recalled: learn the category) | — |
| 2 | Ta sama pętla, inne nazwy | the mapping table: your file ↔ Spec Kit (`/speckit.constitution`, `.specify`, `.plan`, `.tasks`, `.implement`) ↔ Kiro (steering; `requirements.md`, `design.md`, `tasks.md`, *Start task*) ↔ OpenSpec (`openspec/specs`, `changes/`, `archive/`) ↔ Conductor (`setup`: product/tech/workflow; `newTrack`: spec + plan; `implement`); what each adds that yours lacks (a clarify step; a button; an archive that merges the change back into the spec; a name that says the thesis — context out of the chat) | each row ends with the student's file name |
| 3 | Trzy poziomy, i na którym jesteś | Böckeler's spec-first / spec-anchored / spec-as-source, quoted; where the notatnik-v2 is (first, with one anchored habit: the spec stays and is edited before the next change); as-source as Tessl's bet, with the „do not edit” marker; her critique in her words („I'd rather review code than all these markdown files”; sledgehammer / nut) and what the module answers with (the size rule from 4c) | the student's spec as a level-1 artefact and what would make it level 2 |
| 4 | Połowa pętli jest już w twoim edytorze | the practical turn: Cursor's Plan Mode (Shift+Tab; clarifying questions; an editable Markdown plan; „save to workspace”) and Antigravity's Implementation Plan and Task List artefacts (reviewed; **Proceed**) — both produce the plan-and-tasks half and neither produces the spec or the constitution; TO CONFIRM note in an MDX comment about the school's accounts | the student's `spec.md` pasted into plan mode; the plan that comes out vs `plan.md` from 4c |
| 5 | Dlaczego w tym module nic nie instalujemy | the consequence: the piece the tools do not supply is the piece to learn; install costs named plainly (Python and `uv`; a third editor and account; an unmaintained server); when a wrapper pays for itself (a team; several features in flight; a spec you keep for months) | — |
| 6 | Kategoria, nie produkt | ending: the answer — the tool you will use is whichever your editor has, for the plan and the tasks; the spec and the constitution you write yourself, and that skill transfers to every wrapper in the table; next: the build | — |

## Owns · recalls · avoids

- **Owns** (proposed appendix rows): the 2025 SDD timeline (Kiro / Spec Kit / Tessl /
  Conductor / OpenSpec with dates); Böckeler's three levels and her critique („I'd rather
  review code than all these markdown files”); the mapping table; Cursor Plan Mode and
  Antigravity's Implementation Plan as „the plan half of the loop”; Singh's 250 000
  developers (one clause; the „it's gone” quotation stays in 4a).
- **Recalls**: 4c's four files and the size rule (link once); 1h's „category, not product”
  (link); 2a's two editors as one category (link); 3c's `AGENTS.md` as the file every tool
  here also reads (one clause); 4a's Singh in one clause.
- **Avoids**: re-explaining the acceptance criterion notations (4c owns them — one clause
  „trzy zapisy z poprzedniej lekcji”); BMAD (research-01 already says too heavy — one
  line in the table's last row at most, or dropped); pricing and free-tier sizes (never
  student-facing); any claim about what the school's accounts allow (TO CONFIRM).

## Exercises

1. Recall — the four stages under three tools' names, from memory; which level of
   Böckeler's three your notatnik-v2 is at and why.
2. Action on the anchor — open Spec Kit's spec template (linked) beside your `spec.md`;
   list two things it has that yours lacks and decide for each whether to add it (observable
   result: two lines in `dziennik.md`, each with a decision).
3. Build step — switch on your editor's plan feature with your spec and constitution in the
   project; ask for a plan; compare it with `plan.md` from 4c: what did it add, what did it
   skip, did it stay out of the spec's territory; write the comparison in `dziennik.md`. If
   the feature is unavailable under your account, read the feature's documentation and
   write which of the four files it produces.
4. Research — read the definitions section of Böckeler's article (linked) and write one
   sentence on what would have to change in your project for it to be spec-anchored.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| Kiro preview 14.07.2025 (July 2025), GA 17.11.2025; „more than 250,000 developers” in the preview | [Kiro GA post](https://kiro.dev/blog/general-availability/) · [GeekWire](https://www.geekwire.com/2025/amazons-surprise-indie-hit-kiro-launches-broadly-in-bid-to-reshape-ai-powered-software-development/) | 17.11.2025 | have |
| Spec Kit open-sourced 02.09.2025; commands `/speckit.constitution … implement`; „30+” agents; needs `uv` | [GitHub Blog](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/) · [README](https://github.com/github/spec-kit) | 02.09.2025 / checked 02.09.2026 | have |
| Tessl framework and registry launched 23.09.2025; „more than 10,000 pre-built specs” | [Tessl blog](https://tessl.io/blog/tessl-launches-spec-driven-framework-and-registry) | 23.09.2025 | have |
| Conductor 17.12.2025; `/conductor:setup`, `newTrack`, `implement`; „impermanent chat logs” | [Google Developers Blog](https://developers.googleblog.com/conductor-introducing-context-driven-development-for-gemini-cli/) | 17.12.2025 | have |
| OpenSpec: `openspec/specs`, `changes/`, `archive/`; `/opsx:propose … archive`; „30+ tools” | [OpenSpec README](https://github.com/Fission-AI/OpenSpec) | checked 02.09.2026 | have |
| Kiro: `requirements.md`, `design.md`, `tasks.md`; steering `product.md`, `tech.md`, `structure.md` | [Kiro docs](https://kiro.dev/docs/specs/) · Böckeler | checked 02.09.2026 | have |
| Böckeler: the three definitions verbatim; „I'd rather review code than all these markdown files”; „a sledgehammer to crack a nut”; Tessl marks generated code „GENERATED FROM SPEC - DO NOT EDIT”; „spec-first is definitely valuable” | [martinfowler.com](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) | 15.10.2025 | have |
| Cursor Plan Mode: Shift+Tab; clarifying questions; editable Markdown plan; „Save to workspace” | [cursor.com/docs/agent/planning](https://cursor.com/docs/agent/planning) | checked 02.09.2026 — TO CONFIRM on the lab | have |
| Antigravity: Task List, Implementation Plan („meant to be reviewed by the user”), Walkthrough; **Proceed** button unless „Always Proceed” | [Google Codelabs](https://codelabs.developers.google.com/getting-started-google-antigravity) | checked 02.09.2026 — TO CONFIRM on the lab | have |
| Spec Workflow MCP: maintainer on a „temporary break” | [repository](https://github.com/Pimzino/spec-workflow-mcp) | checked 02.09.2026 | have — one clause, or dropped if the lesson runs long |

## Reader assumptions to verify

- Whether Plan Mode / Implementation Plan are available under the school's accounts and
  tiers (open question 2 in `04-index.md`). The exercise degrades gracefully.
- That students can reach github.com and martinfowler.com from the lab (allowlist:
  `github.com` is listed; `martinfowler.com`, `kiro.dev`, `cursor.com` docs are not — add
  or accept that exercise 4 is homework).

## Decisions

- **Five tools plus the two class editors; BMAD dropped from the student text** —
  rejected: the full research table. Seven names is already at the budget's edge for a
  lesson; BMAD has no row the student can use.
- **Numbers on the site: dates only, plus Kiro's 250 000 and Tessl's 10 000 with links** —
  rejected: star counts (they move weekly and say little to this reader).
- **Böckeler is the one witness and appears in three or more sentences** — rejected: a
  second critic. One well-placed sceptic who tried the tools is stronger than a chorus, and
  the name budget is tight.
- **The lesson does not recommend a wrapper** — rejected: „use Spec Kit”. The course's
  editors are fixed (2a) and neither is Spec Kit's home; recommending an install the lab
  does not have would be a manual, not a lesson (research-01 §6 rule 3).

## Open questions for Viktar (≤ 3)

1. None beyond the module's three (open question 2 there is this lesson's).

## Deviations from the approved arc

- Drafted 2026-09-02; revised the same day after the fresh-context review.
- The opening now describes the state 4c actually leaves: three files of the student's
  own (konstytucja, decyzja, specyfikacja) and two more known from the worked example
  (plan, tasks, written by the agent in a fresh session) — not „cztery pliki napisane
  ręcznie”. Exercise 3 compares the editor's plan with the plan *printed* in 4c.
- The convergence argument no longer claims the five teams worked independently (the
  dates make influence likely); it claims only that the stages and their order repeat
  exactly enough to be taught as a category. The research file says the same.
- Python and `uv` are not named (install cost said without names); Spec Workflow MCP is
  described in one clause, unnamed; BMAD dropped, as decided.
- Cursor and Antigravity each get a second sentence (the name budget).
- The Böckeler section recalls 4a's honesty paragraph in one sentence („pięć firm …
  zrobiło zakład, nie dowód”).
- The ending answers both halves of the carrying question in the right order (why five;
  which one).
- Exercise 4 carries a homework clause for a lab where martinfowler.com is not
  allowlisted.
