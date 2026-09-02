# Video: AI base for programming in 2025

**Source:** [youtube.com/watch?v=wsMlA0ckdSk](https://www.youtube.com/watch?v=wsMlA0ckdSk)  
**Title (RU):** AI-БАЗА по программированию в 2025 / Полный гайд разработки с ИИ  
**Channel:** IT Beard (АйТиБорода) — Lex Kartynnik (Алексей Картынник)  
**When:** early 2025 (~1 hour, talking-head lecture)

This is the video the course intro asks you to watch before continuing.

## Stance

Programmers will not be replaced in the next few years. Programmers **without** AI will be replaced by programmers **with** AI. The earlier “AI replaces developers” video was him retelling Matt Welsh’s view, not his own.

Give a new AI tool at least a **week** on real (or pet) work — not 30 minutes and a bad prompt. Learning a language took years; expecting Cursor to work in half an hour is the same mistake.

## What models were good at (early 2025)

Junior-sized tasks (no huge project knowledge), async “write the spec and come back to a commit,” thinking through a blank-page problem, boilerplate, unit tests, even a coherent mini-app (Win98-style demo in ChatGPT canvas). Limits are mostly **context**, not “can it write code.”

Three model traits that matter for coding:

1. **Thinking power** — follow the newest closed models (then: Claude Sonnet 3.5, GPT-4o / o-series, Gemini 2.0).
2. **Context window** — ~100k (OpenAI), ~200k (Anthropic), up to ~2M (Gemini). Overflow → garbage. RAG / indexing is how you stay inside the window.
3. **Reasoning / test-time compute** — more think-time, more cost. Use for architecture and unknown work; use fast non-reasoning models for tests, boilerplate, features.

He cites o1 around ~170th on Codeforces (with lots of think-time and money). Cost falling ~10× per year.

## Around the model (the “harness”)

Web search is a **tool**, not a built-in. **MCP** lets you plug extra tools (e.g. an internal DB) into Cursor. **RAG + embeddings** = external memory. Chats are **stateless**: every turn resends the whole thread. APIs: prompt cache, Batch API, structured output. Multimodal: paste a Jira/GitHub screenshot or a UI photo instead of typing.

Prompting still matters ([PromptingGuide.ai](https://www.promptingguide.ai/)): role/task/format, few-shot, CoT. Reasoning models want different prompts than chat models.

## Tools he said to install then

Must-try trio: **Cursor**, **GitHub Copilot**, **Cline**.

- **Cursor** (VS Code fork, then the leader): completions, Next Edit Suggestions, chat, Composer (agent edits files, can run terminal with confirm), MCP, docs indexing, commit messages. ~$20/mo for full agent/index features; BYOK unlocks some chat.
- Two-IDE habit is normal: JetBrains for hand-editing UX, Cursor/VS Code for AI. JetBrains AI Assistant lagged on project context.
- **Windsurf**: nicer UI; some say better on large repos.
- **Cline**: more autonomous agent, open source, needs API keys.
- **Copilot**: catching up (agent mode, better tabs); ~$10; marketplace of extra extensions.
- Also: **Warp** (AI terminal), **aider** (CLI agent), ZenCoder, Trae (free, weaker Chinese models).
- Do **not** use ChatGPT/Claude **web** as your main coding tool — use the IDE.

API rate limits on a new $5 account are tight; he used **tier 3** (~$200 lifetime spend) on OpenAI/Anthropic.

SWE-bench exists for tools+models but (then) omitted Cursor.

## Meta

Stargate-scale national spend, HR already screening for LLM skill, local open-source models on a laptop beating 2023 GPT-3.5. Course/club pitch: Evolution of Code — tools go stale in weeks; you need a live community, not a frozen course.

Snapshot of **early 2025**. Model names and “who is SOTA” in the talk are dated; the map (context, RAG, MCP, agents, prompts, IDE-native tools) is what the written course then unpacks.
