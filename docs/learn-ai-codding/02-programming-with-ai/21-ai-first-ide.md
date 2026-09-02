# AI-first IDE

**Source (RU):** AI-first IDE  
**Path:** Home → Basics of Programming with AI → AI-first IDE  
**Published:** ~4 weeks ago

## Contents

- What to count as an AI-first IDE
- Current AI-first IDEs
- Classic IDEs with a strong AI layer
- How to choose
- Archive: large comparison of AI-first IDEs (May 2025)

This chapter is a current list of development environments built around AI. Below, under the fold, sits our large comparison of AI-first IDEs as of spring 2025: it is outdated on the facts, but still useful as a checklist of what to look at when choosing a tool.

A short catalog of the same products is in [Popular tools](20-popular-tools.md#ai-first-ide).

## What to count as an AI-first IDE

An **AI-first IDE** is a development environment in which AI is not a plugin or an add-on, but sits at the base of the interface and the workflow. The practical difference is simple: in an ordinary IDE you write the code, and AI sometimes helps; in an AI-first IDE you set the task, and the agent mostly writes the code, while you review, steer, and make decisions.

Over the last couple of years the category has evolved a lot: if in 2024 everyone competed on the quality of completions and chat, today the focus has shifted to **orchestration of agents** — parallel sessions, background tasks, boards with agent state, handing work between the local machine and the cloud.

See also [agentic code generation](06-agentic-code-generation.md), [background agents](08-background-agents.md), and [skills and subagents](11-skills-and-subagents.md).

## Current AI-first IDEs

[**Cursor**](https://cursor.com/) — based on VS Code, the most popular representative of the category. Notable: an agents window with parallel sessions, [Design Mode](https://cursor.com) for visual work with UI, and its own fast model [Composer](https://cursor.com/composer), which works on par with models from Anthropic, OpenAI, and Google.

[**Google Antigravity**](https://antigravity.google/) — an agent-first environment from Google, based on Gemini. It started in late 2025 as an editor based on VS Code, and in 2026 grew into a separate platform: a desktop app, CLI, and SDK, dynamic subagents for parallel workflows, background tasks on a schedule. It can not only write code, but also check the result in the browser.

[**Kiro**](https://kiro.dev) — an environment from AWS with an emphasis on development by specs: a prompt turns into requirements, a design, and an ordered list of tasks, which parallel agents then pick up. Available as an IDE, a CLI, and a web version with cloud sandboxes. See [Spec-driven development](12-spec-driven-development.md).

[**Devin Desktop**](https://docs.devin.ai/desktop) — formerly Windsurf. After Cognition bought it, the IDE was merged with their AI engineer Devin and renamed. Interesting bits: a command center for agents in the form of a kanban board, and integration with cloud agents.

[**Trae**](https://www.trae.ai) — based on VS Code, developed by ByteDance.

[**Qoder**](https://qoder.com) — based on VS Code, developed by Alibaba. It can auto-generate and maintain a wiki for the project.

## Classic IDEs with a strong AI layer

Formally these are not AI-first tools — AI appeared in them on top of a mature development environment. But in capabilities they have long caught up with the category, and in quality of code understanding they often outrun it.

[**JetBrains AI Assistant**](https://www.jetbrains.com/ai/) **+** [**Junie**](https://www.jetbrains.com/junie/) — a pair of an assistant (completions, chat, inline prompting) and an agent (Junie takes the task as a whole). Both are in the JetBrains AI subscription and work in all JetBrains IDEs. The main ace: the agent leans on a real project index from IntelliJ, not only on vector search. See [Indexing and memory](09-indexing-and-memory.md).

[**VS Code**](https://code.visualstudio.com/) **+** [**GitHub Copilot**](https://github.com/features/copilot) — agent mode, custom chat modes, support for [MCP](07-model-context-protocol.md) and [Skills](11-skills-and-subagents.md). The cheapest way to try agentic development if you already live in VS Code.

[**Zed**](https://zed.dev) — a fast native editor with open source and a built-in agent. A good choice if performance and work with local models matter.

💡 A separate class is plugins (Cline, Roo Code, Kilo Code) and CLI agents (Claude Code, Codex CLI, Gemini CLI) that plug into any IDE. The full catalog of tools, split by category, is in [Popular tools](20-popular-tools.md).

## How to choose

There is no universal answer, but there are landmarks:

- **Models.** Can you plug in your own API key, is there access to current frontier models, is there a fast in-house model for routine work.
- **Work with context.** Project indexing, rules and memory, support for MCP and Skills.
- **Agentic-ness.** Parallel sessions, background agents, isolation in containers or a worktree, control over command execution.
- **Money.** Credits versus a fixed limit, pay-as-you-go, transparency of spend stats.
- **Security.** Privacy settings, zero data retention, [SOC 2](17-security.md), self-hosted for corporate scenarios.
- **Habits.** If you have ten years of muscle memory in JetBrains — moving to a VS Code-like environment will cost more than it seems.

💡 Do not lock yourself to one tool. They all change every month, and the leader from six months ago can end up at the tail. Look for current discussion and live experience from participants in the club, in the Tools channel.

## Archive: large comparison of AI-first IDEs (May 2025)

The platform has a collapsed comparison from spring 2025. It is outdated on the facts, but still useful as a checklist of what to look at when choosing a tool.

*Not pasted yet — drop that archive block here when you want it filed locally.*
