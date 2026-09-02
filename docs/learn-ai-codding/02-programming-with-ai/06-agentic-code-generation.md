# Agentic code generation

**Source (RU):** Агентная кодогенерация  
**Path:** Home → Basics of Programming with AI → Agentic code generation  
**Published:** ~4 weeks ago

## Contents

- What agents can do
- How agents work
- Further reading
- Related club content

By this point you have already seen how AI can [suggest code](03-smart-code-suggestions.md) and even [talk inside the IDE](05-ai-chat-in-the-ide.md). But what if you can just describe what you need — and AI builds it from scratch, without extra questions? Welcome to the world of **agentic code generation**.

**Agentic code generators** (sometimes just called **agents** or **AI agents**) are the most powerful and autonomous tools in the AI-coding ecosystem. Unlike classic AI assistants that answer individual prompts, agents can carry a whole task from start to finish — from understanding the request to writing and testing the final code.

*Image on the platform: `img resource` — paste it here if you want it in the local notes.*

## What agents can do

Agents are usually part of the built-in AI chats inside the IDE. They can handle tasks of different scale — from generating a few lines of code to building full modules, or even whole medium-sized projects. While they work, they can:

- create new files and edit existing ones
- run commands in the terminal
- run tests and analyze the results
- call other tools (via [tool use](../01-basic-theory/04-master/04-tool-use.md) and [MCP](07-model-context-protocol.md))

All of this happens in an autonomous loop: the agent evaluates progress and adjusts its strategy without intervention — unless something goes wrong or approval is required.

## How agents work

Every agent follows a cycle:

**Understand the task → Break it into parts → Choose the right tool → Evaluate the results → Decide the next step**

This cycle is what makes agents more than chatbots. They orchestrate tools, validate results with tests or linters, read terminal output, talk to APIs, and even prepare pull requests. Some advanced agents can reason about what they are missing (using build or linter errors) and write extra prompts to themselves.

More on agents as a basic term is in the [Agents](../01-basic-theory/04-master/03-agents.md) chapter of Basic Theory.

## Further reading

- A list of popular tools for agentic code generation is in [Popular tools](20-popular-tools.md)
- [Claude Code: Best Practices for Agentic Coding](https://www.anthropic.com/engineering/claude-code-best-practices) — Anthropic’s guide to agentic development
- [AI Blindspots](https://ezyang.github.io/ai-blindspots/) — a small site with ~20 tips on programming with LLMs. Genuinely useful, common-sense advice.
- [Hacker News discussion of AI Blindspots](https://news.ycombinator.com/item?id=43414393)

## Related club content

- 2024.06.20 / Evgeny Sorokin — Machinet: from Java unit tests to Mate. How assistants work under the hood
- 2024.06.13 / Vlad Yanchenko — probabilistic parrots that are changing programming / Mate & Machinet
