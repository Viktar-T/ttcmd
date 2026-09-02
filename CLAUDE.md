@AGENTS.md

# CLAUDE.md — ttcmd

`AGENTS.md` is imported above and is the working contract.
**`constitution.md` outranks it** — read `constitution.md` in full before the
first task of a session.

## State of the repo

Deployed at **<https://ttcmd.vercel.app>**, rebuilt from `main` on every push.
The module → lesson pipeline works: MDX under `content/`, Zod-validated at
build time, routes rendering. Real content: Moduł 0–3 published, Moduł 4
drafted unpublished, Moduł 5 planned — see `docs/roadmap.md` „Where we are”
and `docs/content-research/course-structure-v2.md` (v2.5), written to
`docs/content-style.md`. The commands
below work.

## Commands

```bash
npm install
npm run dev      # localhost:3000
npm run build    # the check — fails on invalid lesson frontmatter
npm run lint
npm run check:content   # style smells per lesson; reports, never fails
```

## Student-facing content

Anything under `content/moduly/` — a lesson, a module introduction, a
summary — is written for the reader in **`docs/surveys/content-reader.md`** in the
voice and structure of **`docs/content-style.md`**. Two skills load both:
`write-lesson` for a new lesson (brief in `docs/content-briefs/` first,
Viktar approves, then the Polish draft) and `revise-lesson` for an existing
one (diagnosis first, fixes only when named). Use one of them for every
content task, and run `npm run check:content` before calling a lesson done.

## Map

```
constitution.md         the rules that outlive every slice
AGENTS.md               how to work here
specs/NNN-slug/         spec.md · plan.md · tasks.md
docs/adr/               one decision per file, with rejected alternatives
docs/surveys/content-reader.md  who the student is — what they have done, not done, believe, want
docs/content-style.md   how student-facing prose is written; loaded by .claude/skills/{write,revise}-lesson
docs/content-briefs/    one brief per lesson — the lesson's spec, approved before drafting
docs/content-research/  why the course teaches what it teaches; the style audit lives here too
docs/_prompts/          pasted-whole briefs: research, and the style calibration pass
docs/sdd-journal.md     Viktar's log of how the method actually behaved
docs/sources.md         what was read while designing this repo
```
