# Advanced context enrichment

**Source (RU):** Продвинутое обогащение контекста  
**Path:** Home → Basics of Programming with AI → Advanced context enrichment  
**Published:** ~4 weeks ago

## Contents

- Why Markdown stuck
- Temporary `.md` files as “desks” for the agent
- Auto-generated repo wikis
- “One file to rule them all”
- Advanced context patterns
- Recommendations
- Related club content

In the [previous chapter](09-indexing-and-memory.md) you saw how agents search and pick context from an index. Now we look at how to make that context richer, fresher, and more actionable through Markdown rituals, repo wikis, and standing “memory banks.”

From the [Tokens](../01-basic-theory/02-user/02-token.md) chapter you already know that to pass data into / out of an LLM efficiently it is worth using token-efficient formats such as JSON compact, **TOON**, and **TONL**. But when we write prompts we still use ordinary Markdown. Why?

## Why Markdown stuck

You can say Markdown is one of the most popular formats for working with context. It lets you structure information easily and efficiently, add code and logic into prompts, use checkboxes and other elements, and still stay very readable for a human.

Main advantages of Markdown:

- Convenient for people and models: headings, lists, code blocks, checkboxes — easy to parse and read
- Git-native: easy to review, commit, discuss in a PR
- Composition: you can glue notes, logs, and decisions into one “working page”
- Light and portable: no vendor lock, opens everywhere

Classic **XML** (Extensible Markup Language) is also used to mark up context, but it is not as convenient for a human to read and edit as Markdown (though sometimes XML is irreplaceable — for example for logically separating large blocks of information in prompts).

## Temporary `.md` files as “desks” for the agent

Many modern agentic tools create temporary `.md` files that sit next to the code and are used for the agent to “think” about the task. Typical roles of these files:

- **TASK.md** — the task statement: goal, acceptance criteria, constraints
- **CONTEXT.md** — background: domain notes, example payloads, SLAs, bugs
- **CHECKLIST.md** — a step-by-step plan with checkboxes `[ ]` / `[x]`
- **RUNBOOK.md** — repeatable procedures (deploy, migrations)

A template you can drop into any repo:

```markdown
# TASK.md
## Goal
Implement bulk invite via CSV.

## Acceptance criteria
- Schema and size validation
- Async job with retries and metrics
- Per-user audit log

## Constraints
- No DB migrations this sprint
- Reuse the existing S3 bucket/prefix

# CHECKLIST.md
- [ ] Read TASK.md and CONTEXT.md
- [ ] Propose a design (DAL, jobs, retries)
- [ ] Add unit/integration tests
- [ ] Update RUNBOOK.md and Changelog
- [ ] Open a PR and give a diff summary
```

Keep these files small and one-shot: the agent reads / updates them as it works; afterwards you either commit the valuable parts or delete them.

## Auto-generated repo wikis

Some tools (for example **Qoder** with its Repo Wiki, or **Kiro** with steering docs) can auto-generate a whole wiki for the project and keep it up to date. Agents in those tools can point at such wikis when planning changes.

If your tool cannot auto-generate project wikis, you can use ordinary `.md` files created by hand — just remember to add them to context. But I recommend reading this chapter to the end, because there are interesting workarounds.

## “One file to rule them all”

You often need to put a description of some library into context, for example because it is new and the model was not trained on it. Some tools (for example Cursor) are fairly good at parsing whole docs from a single link and intelligently adding them to context automatically.

Far from every tool can do that, and then a simple but working trick helps — compress the key parts of the docs into one text file. And sometimes just glue the whole documentation into one file. Then feed that file into context by hand. There are even special services for this trick:

- [Gitingest](https://gitingest.com) turns a repository into a “prompt-friendly” file
- [DeepWiki](https://deepwiki.com) generates structured documentation and diagrams from public repositories
- On an **LLM Documentation Hub** you can download a ready context file made from docs of popular libraries
- [Repomix](https://repomix.com) lets you shrink any repository locally via CLI, or through cloud LLMs

You can find more such services in our club, in the Tools channel, under the hashtag `#compressor`.

Important: do not drag “the whole world” into context — include only the modules / schemas / configs needed for the current task. Also remember that your context should contain only the files that actually relate to the current task. Context is not elastic.

## Advanced context patterns

The further we work with agentic code generators, the more often we start pulling familiar workflows into separate patterns.

### Context Pack

One such pattern is a **Context Pack**. The idea is to create — by hand (or automatically, for example with a prompt) — a context folder for each feature, branch, or task:

```text
/.context/feature-name/
  TASK.md
  CONTEXT.md
  CHECKLIST.md
  CHANGELOG.md
```

Then, when you work with the agent, you simply give it a rule: “First read `/.context/feature-name/*.md`, keep progress in `CHECKLIST.md`, describe changes in `CHANGELOG.md`.”

### Memory Bank

Over time you will notice it is quite convenient to store the project’s long-term memory in a small set of Markdown files that the agent always reads first. And it would be nice if those files survived across sessions, were not lost when the agent restarts, and were constantly updated as the project changes. Congratulations — you have invented the **Memory Bank** pattern.

How it works:

1. You create `/memory-bank/` with 4–5 files (see below). To start, you can use only one file — `PROGRESS.md`.
2. In the agent “preamble” you write: before any task, read these files; after significant changes — append a short dated update.
3. The folder lives in the repo (or in a service), so the next session continues exactly where you left off.

Minimal file set:

```text
/memory-bank/GOALS.md        # goals and non-goals
/memory-bank/STATUS.md       # sprint focus, risks, blockers
/memory-bank/PROGRESS.md     # dated log of steps
/memory-bank/DECISIONS.md    # ADR-lite: what/why/when/who
/memory-bank/PATTERNS.md     # conventions, style, error handling
```

Example prompt preamble for the agent:

```text
Before any task, read `/memory-bank/*.md`.
If the folder does not exist — create it (you need to add the folder structure here).
After every substantial step, add a short note (with a timestamp) to `PROGRESS.md` and update the related files.
If something is already written in a file, do not overwrite it — append.
```

Yes, that looks like quite a few steps. But do not be scared: there are already ready-made libraries for working with a Memory Bank, both per-tool and universal:

- [Context7](https://context7.com) — one of the most popular MCP servers, implementing the Memory Bank pattern in practice, and even more
- [Memory Bank for Cursor IDE](https://github.com/vanzan01/cursor-memory-bank) — a repo with files and a detailed guide on setting up and using a Memory Bank in Cursor IDE. A bit dated, but it will give you a sense of how to set up a Memory Bank in Cursor

In essence you just need to decide on a set of files and a workflow, configure it once in your tool, and then you can use it in any agent.

There is one downside in all of this: approaches like Memory Bank are quite greedy with tokens. Keep that in mind so you are not surprised by a higher bill for using the model.

### Handoff

A **handoff** (“passing the baton”) is a pattern for transferring work from one agent to another: a file or summary in which the current agent records the state of the work, so another AI (or the same agent in a new session) can continue from the same place.

When you need it:

- Context overflowed — the session “drifted,” it is easier to start a new one than fight quality degradation
- Switching tool or model — you started in Cursor, continue in Claude Code; you planned in a reasoning model, implement in a fast one
- Parallel work — one agent finished its piece, another picks up an adjacent one

A typical `HANDOFF.md` has four blocks:

```markdown
# HANDOFF.md
## What is done
A short summary of the work done, files touched.

## Key decisions
What was chosen and why (and what was rejected).

## Current state
What works, what is broken, which tests pass.

## Next steps
A concrete list of what to do next.
```

The workflow is simple: at the end of a session you ask the agent “write a handoff into `HANDOFF.md` to pass the work to another agent,” and you start a new session with “read `HANDOFF.md` and continue the work.” Many tools do something similar automatically when they compact context, but an explicit handoff file is more reliable: you control what goes into the “baton,” and you can pass it to any other tool.

## Recommendations

Memory and advanced context work are very important things that help agents work more efficiently and accurately. So building habits around context is something that will pay off very quickly:

- Treat Markdown files as tools, not “decoration”
- Try making a small Context Pack for your next small task and point the agent at it
- For mixing in external context — use compressed files and auto-wikis
- In your spare time, try installing and setting up Context7 or a Memory Bank for your tool, and do a couple of tasks with it

## Related club content

- 2025.08.18 / Call #16: GPT-5, Cursor CLI, Jules, Context7, Memory Bank, a base for beginners and patterns to copy
