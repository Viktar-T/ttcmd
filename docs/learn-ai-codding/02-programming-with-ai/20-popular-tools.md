# Popular AI tools for developers

**Source (RU):** Популярные AI-инструменты для разработчиков  
**Path:** Home → Basics of Programming with AI → Popular tools  
**Published:** ~4 weeks ago

## Contents

- AI-first IDE
- IDE plugins
- Prompt-based web IDEs
- CLI assistants
- AI terminals
- PR and coding agents
- Low-code automation platforms
- Agentic browsers

Now that you have studied the key workflows — [smart completions](03-smart-code-suggestions.md), [next-tab edits](04-next-edit-suggestions.md), [agentic generation](06-agentic-code-generation.md), and [chats integrated into the IDE](05-ai-chat-in-the-ide.md) — it is time to meet the tools that make all of that possible.

This chapter is a categorized overview of the most widely used AI tools for development. From fully AI-native IDEs to terminal agents and low-code automation platforms — this is your main list when you pick the right tools for a workflow.

## AI-first IDE

These are the most popular fully integrated development environments built around AI from the start.

- [**Cursor IDE**](https://cursor.com/) — based on VS Code
- [**Google Antigravity**](https://antigravity.google/) — an agentic platform from Google, based on Gemini
- [**Qoder**](https://qoder.com) — based on VS Code, developed by Alibaba
- [**Kiro**](https://kiro.dev) — based on VS Code, developed by AWS
- [**Devin Desktop**](https://docs.devin.ai/desktop) — formerly Windsurf Editor; after Cognition bought it, it was merged with the AI engineer Devin
- [**Trae**](https://www.trae.ai) — based on VS Code, developed by ByteDance

💡 A detailed breakdown of the category is in [AI-first IDE](21-ai-first-ide.md).

## IDE plugins

These plugins bring AI straight into the workflow.

- [**Cline**](https://cline.bot) — open-source, for all popular IDEs
- [**Roo Code**](https://roocode.com) — open-source, a fork of Cline
- [**Kilo Code**](https://kilo.ai) — open-source, a merge of Cline and Roo Code
- [**Codex**](https://openai.com/codex) — assistant from OpenAI; has convenient plugins for all popular IDEs
- [**Claude Code**](https://code.claude.com) — assistant from Anthropic; has convenient plugins for all popular IDEs
- [**Windsurf Plugin**](https://docs.devin.ai/windsurf) — for JetBrains, VS Code, Xcode, and others
- [**Junie**](https://www.jetbrains.com/junie/) — an agentic plugin for JetBrains
- [**JetBrains AI Assistant**](https://www.jetbrains.com/ai/)
- [**Amazon Q Developer**](https://aws.amazon.com/q/developer/)
- [**Zencoder**](https://zencoder.ai) — support for JetBrains and VS Code (they acquired Machinet)

## Prompt-based web IDEs

These tools let you create code right from prompts in the browser.

- [**Replit Agent**](https://replit.com)
- [**Lovable**](https://lovable.dev)
- [**Bolt**](https://bolt.new)

## CLI assistants

Work right from the terminal with these powerful AI-driven command-line tools.

- [**aider**](https://aider.chat) — open-source assistant
- [**Claude Code**](https://code.claude.com) — from Anthropic
- [**Codex CLI**](https://github.com/openai/codex) — from OpenAI
- [**Gemini CLI**](https://github.com/google-gemini/gemini-cli) — open-source, from Google
- [**Cursor CLI**](https://cursor.com/cli) — from Cursor
- [**Trae Agent**](https://github.com/bytedance/trae-agent) — open-source from Trae
- [**Antigravity CLI**](https://antigravity.google/) — from Google, the terminal part of the Antigravity platform, which replaced Gemini CLI
- [**Copilot CLI**](https://docs.github.com/en/copilot/how-tos/use-copilot-for-common-tasks/use-copilot-in-the-cli) — from GitHub, with integration into issues and pull requests
- [**Kiro CLI**](https://kiro.dev) — from AWS; shares specs and settings with the IDE of the same name
- [**Qoder CLI**](https://qoder.com) — from Alibaba, the terminal part of Qoder
- [**Qwen Code**](https://github.com/QwenLM/qwen-code) — open-source from Alibaba, a fork of Gemini CLI; works with different providers and local models
- [**Cline CLI**](https://github.com/cline/cline) — open-source; uses the same core as the Cline plugin, so you can invoke the agent from scripts and on a schedule
- [**Mistral Vibe**](https://github.com/mistralai/mistral-vibe) — open-source from Mistral AI
- [**Kimi Code**](https://github.com/MoonshotAI/kimi-cli) — open-source from Moonshot AI; installs as a single binary with no Node.js
- [**Mini Agent**](https://github.com/MiniMax-AI/Mini-Agent) — open-source from MiniMax; more a reference implementation of an agent loop than a finished product — useful to read the code if you want to understand how an agent is built inside
- [**Deep Agents CLI**](https://www.langchain.com/blog/introducing-deepagents-cli) — open-source from LangChain, with long-term memory between sessions and a set of specialized agents ([repo](https://github.com/langchain-ai/deepagents))
- [**Oz CLI**](https://docs.warp.dev/platform/) — from Warp (formerly `warp-cli`); runs Warp’s cloud and local agents from any terminal, script, or CI

See also [AI in the terminal](15-ai-in-the-terminal.md).

💡 This category is growing faster than all the others: almost every large model vendor and IDE has its own CLI agent today. You should choose not by brand, but by three things: which models it can work with, whether you can plug in your own API key, and how conveniently it fits into your scripts and CI.

## AI terminals

AI-enhanced terminals that support natural-language commands and smart automation.

- [**Warp**](https://www.warp.dev)

## PR and coding agents

AI tools that help review, generate, or even automatically merge pull requests.

- [**Claude Code Action**](https://github.com/anthropics/claude-code-action) — open-source
- [**Gemini Code Assist**](https://cloud.google.com/products/gemini/code-assist)
- [**GitHub Copilot Coding Agent**](https://docs.github.com/en/copilot/concepts/agents/about-copilot-coding-agent)
- [**Junie Agent**](https://www.jetbrains.com/junie/)
- [**Cursor CLI**](https://cursor.com/cli) — CLI from Cursor; has a built-in PR agent
- [**Codex**](https://openai.com/codex) — from OpenAI; has a built-in PR agent

See also [AI code review](13-ai-code-review.md).

## Low-code automation platforms

Ideal for stitching AI tools, APIs, and background logic together with a minimal amount of code.

- [**n8n**](https://n8n.io)
- [**Dify**](https://dify.ai)

A fuller portrait of both is in [Automation and low-code](14-automation-and-low-code.md).

## Agentic browsers

Browsers with built-in AI capabilities.

- [**Dia**](https://www.diabrowser.com) — from The Browser Company (bought by Atlassian)
- [**Arc**](https://arc.net) — from The Browser Company, but implementation of new features was stopped in May 2025 (they switched to developing Dia)
- [**Comet**](https://www.perplexity.ai/comet) — from Perplexity
- [**Microsoft Edge**](https://www.microsoft.com/edge) — Microsoft’s unkillable browser, which they have stuffed quite solidly with AI features
- [**Chrome**](https://www.google.com/chrome/) — the well-known browser from Google; it is also rolling in AI features
- [**Opera Neon**](https://neon.opera.com) — an AI browser from Opera, for now available only for beta testing and at $60 for 9 months

See also [AI in the browser](16-ai-in-the-browser.md) and [Security](17-security.md) (prompt injection in agentic browsers).

Whether you are building a full-stack application or finishing one component, you will likely find a suitable assistant in this list. The ecosystem develops fast — so use this chapter as a launch pad for practical experiments.
