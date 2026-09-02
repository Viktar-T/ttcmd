---
name: revise-lesson
description: Diagnoses and, on request, fixes an EXISTING Polish lesson or module introduction under content/moduly for the ttcmd course — reader test, structure, anchor and concreteness, citations, language and typos — reporting findings first and changing nothing until told which to apply. Use when asked to revise, review, check, fix, improve, smooth, polish, proofread or "bring into the course style" a lesson, a module introduction, a hand-edited draft or a pasted draft ("popraw 1b", "sprawdź lekcję", "more storytelling", "better flow", "does this match the style"). Not for writing a new lesson — that is write-lesson.
---

# Revise a lesson

Diagnosis first, changes second, and only the changes Viktar names. The
reader is revised before the structure, and the structure before sentences.

## 1. Which lesson, which mode

Name the file. Then the mode:

- **diagnose** (default) — report, change nothing.
- **fix N, M, …** — apply the named findings from a previous report.
- **fix all under E** — apply every finding in one pass of the report.
- **check a draft** — the text was pasted or hand-edited; diagnose it as it
  stands, against the brief if one exists.

If the request is for a lesson that does not exist yet, stop and use
`write-lesson`.

## 2. Load — in this order, nothing more

1. `constitution.md` Articles III, IV, V, IX; `AGENTS.md` §4 and §9.
2. `docs/surveys/content-reader.md` in full.
3. `docs/content-style.md` in full, including the appendix.
4. `docs/content-briefs/NNx-slug.md` if it exists. If it does not, you will
   reconstruct one (step 3).
5. The lesson. The module's `index.mdx`. The previous lesson's ending and the
   next lesson's opening, if they exist.
6. `npm run check:content <file>` — its block for this lesson is a list of
   questions to answer in the report, not findings to copy.
7. `report-template.md` beside this file.

## 3. Reconstruct the brief when there is none

From the lesson as it stands, write: reader position, the question the
lesson appears to ask, the anchor (or „none”), one line per section naming
what it does. Put it at the top of the report. This reconstruction is usually
the diagnosis: a lesson that feels wrong tends to have no anchor, two
questions, or sections that describe rather than move. Do not save it as a
brief until Viktar approves it; then save it to `docs/content-briefs/`.

## 4. Diagnose — five passes, fixed order

Each finding: pass letter and number, the line, the smallest quote that shows
it, why it fails for this reader, and a one-line proposed fix. Findings are
sorted by pass, not by severity; the passes are the severity.

**A. Reader.** Paragraph by paragraph: what it assumes; whether the reader
file or an earlier lesson supplies it; whether it asserts something about the
reader. A dependency on later knowledge → move or rewrite. A claim about the
reader → check against the file, usually cut. The opening: does it start from
something the reader has done, or from what the previous lesson said?

**B. Structure.** One question or two? Is the arc the brief's arc? Cut-or-move
test per section; merge test for short sections; headings that name a stage
rather than a source; does the ending answer the opening; is the summary the
question or the table of contents.

**C. Concreteness.** Is there an anchor, and is it carried to the end? Which
abstractions have no example in their own section? Which names appear once;
which terms are used before their home; which numbers arrive before the
previous one was interpreted.

**D. Sources.** Every quotation with its attribution where it appears (author,
date, link; timestamp for a recording); every checkable number with a link in
its paragraph or cell; a table that promises links has them; `## Źródła` is
evidence only, dated; further reading is under `## Czytaj dalej`. Recurring
stories told in full outside their home.

**E. Language.** Typos and slips („Naprzykład”, „Każdazmiana”); case and
number agreement; „…” marks, dashes, decimal comma, date forms; gendered
second-person forms, judged one by one; a term alternating with a synonym;
link text that names the thing; English MDX comments.

Then the checker's block: every smell it reported, answered — kept on
purpose, or a finding above.

## 5. Report — then stop

Write the report from `report-template.md` in the conversation. Findings
numbered `A1, A2, … E7`. End with a three-line verdict: what the lesson does
well and must keep; the one change that would help most; whether the lesson
needs a brief before further work.

Change nothing. Wait.

## 6. Fix — only what was named

- Apply exactly the findings named. A fix that pulls another change with it
  is stated, not silently made.
- Preserve every verified fact, link, date, quotation, diagram, table, code
  block, exercise and frontmatter key unless the finding is about it.
  Reducing a story to a recall is a fix; changing a number is not.
- Keep the author's voice. You are removing what fails the reader, not
  rewriting into a different teacher.
- A fix that needs an application change — a component, a schema field — is
  reported as a slice, not worked around (Article IX).
- After fixing: `npm run check:content <file>` and `npm run build`; show
  both. Summarise what changed, finding by finding. Update the brief's
  *Deviations* if the arc moved.

## 7. Commit only when asked

`content:` prefix for the lesson; `chore:` for a brief or an appendix row,
in a separate commit. A content commit may not touch `app/` or `lib/`.
