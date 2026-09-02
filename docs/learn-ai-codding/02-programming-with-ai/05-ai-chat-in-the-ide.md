# AI chat in the IDE

**Source (RU):** AI-чат внутри IDE  
**Path:** Home → Basics of Programming with AI → AI chat in the IDE  
**Published:** ~4 weeks ago

## Contents

- Why you need AI chat in the IDE
- Use cases
- What can go wrong
- Popular IDEs and tools
- Related club content

Once you are comfortable with [smart code suggestions](03-smart-code-suggestions.md), the next step is using AI chats right in the IDE. You can write code in ChatGPT or another browser tool, but that is not the same as working inside a real project. When you deal with large codebases, **context** matters — and that is where an integrated AI chat shines.

*GIF on the platform: `chat_landing.gif` — illustration of an integrated IDE chat at work. [resource]*

## Why you need AI chat in the IDE

**It is simply more convenient.** You do not need to switch between the browser and the editor, copying code back and forth. Everything is in one place.

**Context awareness.** When it is built into the IDE, the AI can get access to the full project context. That means more accurate and relevant answers — understanding not only the file you are working on, but the whole codebase.

**Extended IDE features.** An integrated AI chat can unlock new capabilities in the IDE — such as inline hints in chat, generating commands in the terminal, or contextual help while you write code.

**A starting point for “agentic” workflows.** AI chat becomes the starting point for generating whole functions, writing tests, doing refactors, and much more. We will go into this in detail in the next chapter, on [agentic code generation](06-agentic-code-generation.md).

## Use cases

Here are a few popular ways developers use integrated AI chats:

- Generating code (tests, documentation, functions, and so on)
- Explaining code, stack traces, or error messages
- Project-related questions — like a built-in Stack Overflow
- Refactoring or fixing bugs
- Discussing and sketching system architecture
- Brainstorming ways to implement features

And that is only the beginning.

These days, AI chat in the IDE is like a **pair-programming partner** — always available, and always in context.

## What can go wrong

No tool is perfect — and integrated AI chats have their limits:

**Hallucinations.** Like any language model, the AI can sometimes “make things up.” Always double-check the code it generates. (See [Hallucinations](../01-basic-theory/02-user/04-hallucinations.md) in Basic Theory.)

**Outdated knowledge.** Models are trained on past data and are not updated in real time. That means they may not know about the latest frameworks or libraries. You can work around this by providing up-to-date documentation yourself, or by using [RAG](../01-basic-theory/04-master/05-rag.md) techniques.

**Weak built-in tools.** AI chats often rely on built-in helpers — such as search tools, image generation, and so on — and their quality varies a lot by vendor. One chat may instantly find the GitHub issue you need; another may return irrelevant results.

**Unstable services.** Because of high demand, even popular tools sometimes go down or slow down because of overloaded servers.

**Privacy.** Most tools send prompts to the cloud for processing. That means it is on you what data you share. Always check whether the tool is approved for use at your company, review privacy settings, and turn off training on your data if you can. A good sign of a privacy-conscious tool is **SOC 2** certification (Type II is better than Type I). More in [Security](17-security.md).

## Popular IDEs and tools

Here are a few popular tools that include AI chat:

- [Cursor IDE](https://cursor.com/)
- Devin Desktop (formerly Windsurf Editor)
- [GitHub Copilot](https://github.com/features/copilot)
- [JetBrains AI Assistant](https://www.jetbrains.com/ai/)

The full list of AI development environments is in [AI-first IDE](21-ai-first-ide.md).

## Related club content

- 2025.03.24 / Windsurf Editor review
- 2025.03.12 / The full Cursor knowledge base (+ MCP) / Valera Selitsky and Lex Kartynnik
- 2024.12.09 / Big GitHub Copilot review
- 2024.10.23 / JetBrains AI Assistant / Anton Arkhipov
