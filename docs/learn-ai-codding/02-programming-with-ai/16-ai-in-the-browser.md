# AI in the browser

**Source (RU):** ИИ в браузере  
**Path:** Home → Basics of Programming with AI → AI in the browser  
**Published:** ~4 weeks ago

## Contents

- What an AI browser is
- Main AI capabilities
- Practice and security
- List of AI browsers
- Related club content

This chapter is focused on the web browser and how AI understands page content, helps you work with history, and performs actions for you right in site UIs.

## What an AI browser is

An **AI browser** is a browser with an extra AI layer that:

- analyzes the content of open tabs and can interact with it through a built-in AI chat
- can perform actions on the page: click, navigate, fill forms
- integrates with your history and bookmarks so it can answer questions about them

The key idea: you describe what needs to be done with web content, and the browser does it **with you** — from searching for information and summarizing a page to a full “find → compare → draft a post” scenario.

*Image on the platform: `ai-browser-chat.png` — paste it here if you want it in the local notes.*

In practice this looks like a chat on the side or at the bottom of the page, where you write your request in natural language.

## Main AI capabilities

### Built-in AI chat

What it gives:

- **Summarization and work with content.** Compress a long article, pull out theses, list sources, generate a synopsis, a social thread, a post with quotes, a task list, and so on.
- **Multi-page context.** Compare two or more pages, put the differences in a table, merge sources.
- **Command shortcuts.** In some browsers you can configure custom chat slash-commands. For example, in **Dia** there are “skills” — pre-set prompts invoked via `/`, so one command starts a complex scenario (analysis, comparison, preparing drafts, and so on). See also [Skills and subagents](11-skills-and-subagents.md).

### Smart work with history

The idea: the browser remembers where you were, and AI can use that memory to answer questions and search “by meaning.”

- **Search by idea, not by string.** “Find the interview about a Rust DSL where they mentioned safe macros” — and AI will return the right pages.
- **Answers over history.** “What did I read about RAG architectures last week? A 10-point summary.”
- **Restoring context.** “Bring back the chain of tabs where I compared AI browsers.”

That is already how **Dia** works, for example: you ask natural questions of your history, get relevant fragments, quick previews, and links to go back to the right pages.

### Agentic behavior on sites

Through chat you describe the goal, and the agent itself warms up tabs and acts:

- clicks links, moves between pages
- fills and submits forms, enters confirmation codes
- searches the internet, gathers sources, compares
- prepares drafts of emails / posts, saves them as drafts

This direction is developed, in particular, by **Comet** from Perplexity and **Microsoft Edge**.

**Important:** agentic browsers are vulnerable to hidden instructions on pages (**prompt injection**). If a site “hides” commands in the content, the agent can execute them. Before turning on autonomous mode, read the section on agentic-browser vulnerabilities and set limits. Details are in [Security](17-security.md).

### Other capabilities

- **Personalization and memory.** Many browsers let you tune chat for yourself, add your own instructions and templates, remember information about you, set styles, and so on. That helps improve work with the browser and make its answers more personalized.
- **Integration with web services.** Browsers made by AI-service vendors often integrate those services directly into the browser. That is how **Comet** and **Microsoft Edge** do it, for example.

## Practice and security

Companies that make AI browsers do not do it for nothing. The data we generate while working with a browser is unique and there is a lot of it — so it is an ideal way to mine data for training AI models. Some browsers let you turn off sending data for training.

Agents in the browser can be unsafe, because they can fully imitate your behavior and use personal data (cookies, session data, and so on).

- Keep the agent on a short leash: preview of actions, step-by-step confirmation.
- Turn on limits: domain / action allowlists, masking of fields and cookies.
- Do not give access to sensitive data without need.
- Watch the sites on which you run the agent.

More on threats and protection is in [Security](17-security.md).

## List of AI browsers

See the current list of AI browsers and their capabilities in [Popular tools → Agentic browsers](20-popular-tools.md#agentic-browsers). There are more examples and links to projects.

Named in this chapter and in club reviews: [Dia](https://www.diabrowser.com), [Comet](https://www.perplexity.ai/comet) (Perplexity), Microsoft Edge, [ChatGPT Atlas](https://chatgpt.com/atlas), [Opera Neon](https://neon.opera.com), [Strawberry](https://strawberrybrowser.com), [Arc](https://arc.net).

## Related club content

- 2025.10.28 / Call #21: AI-browser use cases, Claude Skills, Context Management, GitHub Copilot, AI replacing us and where to grow so we are not replaced
- 2025.10.26 / Review of AI browsers GPT Atlas, Opera Neon, and Strawberry
- 2025.08.04 / Club call #15 / Review of Microsoft Edge and commands in Comet
- 2025.07.22 / Recording of club call #14 / Comet review
- 2025.06.13 / Review of the Dia browser and comparison with Arc
