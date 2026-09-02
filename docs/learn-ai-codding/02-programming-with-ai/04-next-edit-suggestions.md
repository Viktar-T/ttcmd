# Next Edit Suggestions — autocomplete on steroids

**Source (RU):** Next Edit Suggestions - автокомплит на стероидах  
**Path:** Home → Basics of Programming with AI → Next Edit Suggestions  
**Published:** ~4 weeks ago

## Contents

- How it differs from basic autocomplete
- How it works
- Further reading
- Related club content

After [learning how AI can intelligently suggest code](03-smart-code-suggestions.md), let’s take one more step forward. What if AI can not only finish the line you are typing, but also predict the next actions across the whole codebase — inside the open file, or even in files you have not touched yet? Welcome to the world of **Next Edit Suggestions (NES)**.

This feature extends the idea of code completion and makes it **proactive**. Instead of simple autocomplete after the cursor, it predicts the next edits — above, below, or even in other files. That can be renaming classes, updating GraphQL schemas, or cleaning up duplicated code. Just keep pressing **Tab** — the AI will walk you through a chain of edits.

Tools like Cursor call this **Next Action Prediction** (powered by their **Fusion** model). Windsurf has **Windsurf Tab**, which even takes into account terminal output, the clipboard, and chat history.

## How it differs from basic autocomplete

**Compared with basic autocomplete:** ordinary autocomplete works from nearby tokens — for example, typing `pri` gives you `println`. But it does not understand that after renaming class `User` to `Customer` you also need to update `UserService`, tests, or serializers. Next Edit Suggestions does understand this — because it reasons from the **AST** and semantic context.

**Compared with IDE refactoring tools:** IDE refactoring is command-driven and tied to syntax. You explicitly tell the IDE what to rename or move. Next Edit Suggestions offers all of that **proactively** — and in the right order — so you just keep pressing **Tab** instead of running commands.

*GIF on the platform: `0_9UQ5PbFqvxlxCtMt.gif` — paste it here if you want it in the local notes. [image source]*

## How it works

Imagine renaming class `User`. Right after you press **Enter**, Cursor (or any tool with Next Edit Suggestions) instantly suggests updates to related interfaces, GraphQL types, and downstream function names — sometimes in other files. See a small **jump** marker next to each proposed change? Press **Tab** to go there, press again to apply the edit. This continues in a smooth flow until either the model runs out of ideas — or all the edits are done.

The result? One simple key — **Tab** — becomes a high-speed navigator for intelligent refactoring and code updates. That is a huge productivity gain, especially when you are changing complex logic or working on large-scale features.

You can put it this way: Next Edit Suggestions is the heart of **tab programming**.

## Further reading

- [Cursor: Next Action Prediction](https://cursor.com/tab)
- [Cursor Tab Fusion](https://cursor.com/blog/tab-update)
- [Windsurf Tab docs](https://docs.devin.ai/desktop/tab/overview)
- [VS Code: Next Edit Suggestions](https://code.visualstudio.com/docs/editing/ai-powered-suggestions)

## Related club content

- 2025.03.12 / The full Cursor knowledge base (+ MCP) / Valera Selitsky and Lex Kartynnik
- 2024.09.19 / Effective work with GitHub Copilot / Yulia Khadasevich
