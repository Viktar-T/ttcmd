# Prompt — Analyze the course writing style

| | |
| --- | --- |
| Written | 2026-08-29 |
| Revised | 2026-08-29, after the first audit and the flow rewrite of modules 00 and 01 |
| Kind | **Editorial-analysis brief.** One single-shot prompt, meant to be pasted whole. |
| Reads | `content/moduly/**/*.mdx`, `docs/content-style.md`, the output of `npm run check:content` |
| Produces | `docs/content-research/content-style-audit.md` |
| Feeds | `docs/content-style.md` (including its appendix and demonstrations), `docs/content-reader.md` where the corpus contradicts it, `scripts/check-content-style.mjs`, used by `.claude/skills/write-lesson` and `.claude/skills/revise-lesson` |
| Run it in | An agent session with access to the repository. Web search is not required. |

## Why this exists

The canonical writing rules live in `docs/content-style.md` and are loaded by
the lesson-authoring skill. This prompt is the slower calibration pass: it
checks those rules against the growing corpus and proposes evidence-based
changes. It is not pasted for every lesson and it does not silently rewrite the
canonical guide.

The guide also carries two things that go stale as the corpus grows: an
appendix that says which lesson owns each recurring story and term, and five
before-and-after demonstrations taken from the corpus. This pass checks both.

## Run log

| Run | Date | Corpus | Output | Notes |
| --- | --- | --- | --- | --- |
| 1 | 2026-08-29 | modules 00 and 01, 16 136 words | `content-style-audit.md` | Produced by hand in the session that revised the guide and rewrote the corpus, not by pasting this prompt. The next run should compare against it. |

---

## The prompt

```text
You are an editorial analyst defining the writing style for a Polish
secondary-school course. Read these instructions in full before working.

## What you are producing

Create or replace one file:

`docs/content-research/content-style-audit.md`

If the file exists, read it first: it is the previous audit. Your file
replaces it, but its "Run log" line in `docs/_prompts/analyze-course-writing-style.md`
is appended, not rewritten, so that the sequence of audits stays visible.

This is a repo-facing editorial audit for the course owner. Write the analysis
in English, but quote and discuss the Polish source text in Polish. It must
test the current style guide, identify drift and propose concrete improvements.
It does not replace the short canonical guide that lesson-writing models load.

Do not edit any lesson. Do not create or modify any other file.

## Reader and context

The student-facing lessons are for the reader described in
`docs/content-reader.md` — 4th-year *technik programista* students, roughly
17–19, with two to three years of school programming and no industry
experience. That file says what they have done with their own hands, what
they have not, what they believe on day one and what they want; read it
before the lessons and judge every passage against it. Many of the
historical events, people, tools and professional practices in the first
module are new to them.

The writing should respect their intelligence without assuming the background
knowledge of an experienced software engineer. It should sound like a teacher
who knows the subject and is speaking directly to a class: clear, concrete,
calm, candid and interested in causes rather than hype.

Read first:

1. `constitution.md`, especially Articles III–V.
2. `AGENTS.md`, especially the language and public-repository rules.
3. `docs/content-reader.md`, in full — the reader every finding is judged
   against.
4. `docs/content-style.md`, in full, including the appendix (story and term
   ownership) and the before-and-after demonstrations.
5. The output of `npm run check:content` — the mechanical smells per lesson,
   cohesion and comprehension. Treat it as a list of questions, not findings.
6. Every MDX file under `content/moduly/`, in lesson order, and the briefs
   in `docs/content-briefs/` for the lessons that have one.
7. The previous audit, if present.

The guide names no reference lesson. Module 1 predates the reader file and is
read in class as it stands; `content/interesting-to-read/czterdziesci-lat-zmian.mdx`
was the first audit's reference and is now outside the module. Determine from
the text itself which passages are the strongest models now, and say whether
any Module 2 lesson written through `write-lesson` has earned the role.

State which files and modules you analyzed, where the corpus is thin or
imbalanced, and which apparent patterns are still too early to treat as
permanent course rules.

## The question you must answer

What writing style will let a student read these lessons from beginning to end
without feeling that the sentences, paragraphs or sections are disconnected?

The concern is not grammar. It is continuity: the material is often well
researched and individual sentences may be strong, yet the reading experience
can still feel difficult. Test that concern against the corpus rather than
accepting it automatically. The first audit found it supported in two lessons
and not in one; say where it stands now.

Analyze the text from the reader's perspective, not the author's:

- What does the reader know at the start of each passage?
- What new idea is introduced next?
- Is the connection to the previous idea visible?
- Does the reader understand why this detail appears now?
- Is there enough time to absorb a name, date, number or new term before the
  next one arrives?
- Does each paragraph advance one narrative or argumentative thread?
- Do headings divide a coherent journey, or merely separate topics?
- Do examples make abstractions concrete?
- Does emphasis guide attention, or does frequent bold text make every sentence
  compete to be the thesis?
- Do repeated formulations create useful rhythm or make the prose feel
  manufactured?
- Has a story or a number been told in full in more than one lesson?

## What “more storytelling” means here

Do not interpret storytelling as fictionalising the course, adding decorative
anecdotes or making the tone childish. In this course, storytelling means:

- a visible question, tension or problem that carries a section;
- causes before consequences, with the connection stated;
- concrete situations before abstract conclusions where possible;
- one idea creating the need for the next;
- details selected because they move the argument, not merely because they are
  interesting;
- short moments of orientation that tell the reader where they are and why the
  next section follows;
- conclusions earned by the preceding evidence rather than announced as
  isolated slogans.

Never invent a student, classroom event, quotation, historical scene or
institutional fact to create narrative colour. A truthful causal sequence is a
story; fiction is not required.

## Dimensions to assess

### 1. Whole-course and module flow

Determine whether the module introductions establish a useful promise and
whether lessons form a cumulative argument. Identify missing bridges,
unnecessary repetition, repeated dependence on the same source or personality,
and places where a lesson assumes knowledge that has not yet been built. Check
whether recurring theses return with a new consequence or are merely stated
again.

### 2. Lesson architecture

For every substantive lesson, identify:

- the apparent reader question;
- the lesson's shape — narrative, or procedure with a narrative frame;
- the narrative or argumentative spine;
- where that spine is strongest;
- where the lesson becomes a catalogue, report or sequence of mini-essays;
- sections that could be moved or cut without the reader noticing, because the
  transitions do not establish necessity.

### 3. Paragraph and sentence cohesion

Examine how sentences refer back and lead forward. Look for abrupt subject
changes, missing causal links, pronouns without a stable referent, stacked
contrasts, fragments used too often, and paragraphs that contain several
competing claims.

Do not recommend “make every sentence shorter.” Sentence length should vary.
The goal is a clear relation between sentences, not uniformly simple syntax.

### 4. Cognitive load

Identify clusters of unfamiliar names, products, dates, percentages, English
terms and abstract concepts. Explain when density is justified and when the
reader needs selection, grouping, an example, a recap or a pause.

Distinguish necessary technical vocabulary from avoidable expert shorthand.
Recommend how a term should be introduced on first use and how later uses
should reinforce it. Check the term table in the guide's appendix: is every
term explained in its home lesson, and is any term used before its home?

### 5. Voice, tone and rhetoric

Assess the direct second-person voice, its gender-neutral forms, the
teacher's occasional first person, confidence, humour, warnings, rhetorical
questions, bold emphasis, one-line paragraphs, aphorisms and repeated patterns
such as “To nie X. To Y.” State which devices are effective, how often they can
be used before they become mannerisms, and what should replace them elsewhere.
Compare with the budgets in the guide; propose changing a budget only with
corpus evidence.

### 6. Concrete explanation

Find where the lessons successfully turn an abstraction into an action,
decision, trade-off or consequence a student can picture. Use these passages
to derive a repeatable method for future lessons.

### 7. Scannability versus continuous reading

A lesson must work both when scanned during class and when read continuously.
Assess headings, lists, tables, diagrams, source sections and exercises from
both perspectives. Do not mistake a highly scannable reference page for
smooth prose.

### 8. Story and term ownership

Check the guide's appendix against the corpus: every recurring story,
quotation and number told in full in exactly one lesson and recalled in one
clause elsewhere; every term explained once, in its home. List drift in both
directions — second tellings that crept back, and stories or terms the
appendix does not yet know about.

## Evidence standard

Support every editorial finding with short exact excerpts from the corpus and
file paths with line ranges. Include both:

- passages that demonstrate a problem; and
- passages that already demonstrate the desired style.

Do not quote long blocks. Use the smallest excerpt that shows the pattern.
Separate systemic patterns from isolated weak sentences. Do not turn personal
preference into a rule unless the corpus and reader needs support it.

Label prescriptions as:

- **Observed** — supported by at least two corpus examples;
- **Emerging** — supported by one strong example but not yet a stable pattern;
- **Proposed** — an editorial recommendation not demonstrated by the current
  partial corpus.

This is not a factual research pass. Do not use web search and do not re-check
the historical or technical claims. Preserve facts, citations, lesson goals,
MDX structures and the Polish second-person singular unless you identify a
clear reader-facing reason to recommend otherwise.

## Required output structure

### 1. Executive judgment

Answer plainly:

- Is the concern about difficult, disconnected reading supported?
- What are the three to five main causes?
- What is already working and must not be lost?
- What changed since the previous audit, if there is one?

### 2. Reader journey through the corpus

Give a concise assessment of each module and substantive lesson in reading
order. Focus on the experience of moving through it, not copy-editing every
sentence.

### 3. Systemic patterns

For each recurring strength or problem:

1. name the pattern;
2. show two or more short examples where possible;
3. explain its effect on a student reader;
4. state the editorial response.

### 4. Assessment of the current style guide

For each relevant rule in `docs/content-style.md`, classify it as:

- supported by the expanded corpus;
- useful but not yet evidenced strongly;
- contradicted or producing an unintended effect;
- missing from actual writing practice.

Then assess the appendix (§8 above) and the five demonstrations: is each
demonstration still the clearest example of its rule, or does the corpus now
offer a better one?

Then define any recommended additions to the target style positively. Cover:

- relationship with the reader;
- narrative movement;
- paragraph construction;
- sentence rhythm;
- transitions;
- vocabulary and first-use explanations;
- examples and analogies;
- use of dates, names and numbers;
- headings, lists, tables and diagrams;
- emphasis and rhetorical devices;
- lesson openings, recaps and endings.

Every rule must include a brief reason. Prefer operational rules a writer can
apply over adjectives such as “engaging” or “accessible.”

### 5. Before-and-after demonstrations

Select five representative short passages from different lessons. For each:

- quote the original;
- explain the reader problem;
- provide a revised Polish version that preserves its meaning and facts but
  improves continuity;
- name the style rule demonstrated.

These are demonstrations only. Do not write them back to `content/`. Say
which of them, if any, should replace a demonstration currently in the guide.

### 6. Editing method for an existing lesson

Give a repeatable sequence for revision, starting with the lesson's spine and
section order before sentence-level editing. Include a “cut or move” test, a
transition test, a story-ownership pass and a cognitive-load pass. Compare
with the “Revision order” in the guide and say what should change.

### 7. Proposed changes to the canonical guide

End with a section titled:

`## Proposed changes to docs/content-style.md`

List only changes justified by the audit. For each one, give the current rule
or location, the proposed replacement or addition, and the corpus evidence.
Include proposed rows for the appendix and proposed pattern changes for
`scripts/check-content-style.mjs` where a story or term gained or lost a home.
Do not apply the changes. The course owner reviews this section before the
canonical guide is edited.

### 8. Final checklist

Provide no more than 15 yes/no questions that can be applied to a draft before
publication. The checklist must test continuity and reader comprehension, not
only grammar.

## Guardrails

- Student-facing text remains Polish; the audit itself is English.
- Preserve the author's direct, candid voice. Do not turn it into bureaucratic
  textbook prose.
- Do not solve density by removing all specificity. Dates, numbers, quotations
  and names stay when they carry the argument.
- Do not add invented stories, fake dialogue or generic motivational filler.
- Do not assume “shorter” always means “clearer.”
- Do not prescribe one rigid paragraph or sentence template.
- Do not edit `constitution.md`, `AGENTS.md`, `content/`, `app/`, `lib/`,
  `scripts/` or `specs/`.

## Stop condition

Write `docs/content-research/content-style-audit.md` and stop. No other file is
created or edited.

Before stopping, re-read the audit and verify:

1. Could a writer use the findings to revise a difficult lesson without asking
   what “better flow” means?
2. Is every major diagnosis grounded in exact corpus evidence?
3. Does the audit preserve the strongest qualities of the existing voice
   rather than recommending generic educational prose?
4. Is every proposed change to `docs/content-style.md` specific and supported
   by corpus evidence?
5. Do the demonstrations improve connections between ideas, not merely shorten
   sentences?
6. Has every recurring story and term been checked against the appendix?
```
