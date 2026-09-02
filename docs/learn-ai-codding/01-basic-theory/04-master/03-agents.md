# Agents

**Source (RU):** Агенты  
**Path:** Home → Basic Theory → Level “Master” → Agents  
**Published:** ~4 weeks ago

## Contents

- What agents are
- Harness
- Further reading
- Related club content

Related lesson in Basics of Programming with AI: [Agentic code generation](../../02-programming-with-ai/06-agentic-code-generation.md).

**Agents** are autonomous or semi-autonomous neural-net systems that can make decisions, plan tasks, talk to tools, and keep memory across sessions. Unlike traditional chat models, agents work in several steps, using inner reasoning and outer actions to reach goals.

*GIF on the platform (`290946c9-6a12-4c09-9891-185aa03b6b06_1134x618.gif`, from a DevShorts post) — paste it here if you want it in the local notes.*

An agent iteratively talks to the model, data, and external services: it manages context, analyzes results, and makes decisions. For example, agents can automatically generate simple websites, write programs, process documents, analyze data, or automate routine processes end to end.

Agents can, for example:

- analyze goals and subgoals
- call external tools or APIs
- manage state and memory
- build multi-step interactions
- make conditional decisions

Agents are needed to build **goal-oriented AI** that can automate complex workflows, run tasks autonomously, and interact with users in an adaptive way.

## Harness

An **agent harness** (the “wrapper”) is a software shell around the model that turns a “bare” LLM into an agent. The model itself can only take text in and give text out; everything else is the harness:

- it runs the **agent loop**: the model proposes an action → the harness executes it → the result goes back to the model
- it gives the model **tools** (search, running commands, editing files) and parses the model’s replies into calls to those tools
- it manages **context and memory**: what to feed the model, what to compress, what to drop
- it watches **permissions and safety**: which actions are allowed without confirmation, and which need a human’s OK

The term comes from testing (**test harness** — a wrapper for running tests). Important: the same model in different harnesses can show completely different results — so agent benchmarks actually measure the **model + harness** pair, not the model in a vacuum. Coding harness examples: **Claude Code**, **Codex CLI**, **Cline**.

## Further reading

The best way to understand agents is to build several yourself. There is an excellent open repo for that:

[**GenAI Agents**](https://github.com/NirDiamant/GenAI_Agents) — a large collection of guides and working agent implementations: from a simple conversational bot to multi-agent systems, agents with memory, RAG agents, and orchestration. Every example has code and explanations, so the repo works both as a textbook and as a source of starters for your own projects.

## Related club content

- 2025.01.30 / Workshop on building agentic apps with Dify / Mikhail Savchenko
- 2025.01.23 / “Kitchen” self-hosted AI assistant Kaia and the BrainBox model decorator / Yuri Okulovsky
- 2024.09.07 / Building agents with CrewAI and MetaGPT / Mikhail Savchenko
