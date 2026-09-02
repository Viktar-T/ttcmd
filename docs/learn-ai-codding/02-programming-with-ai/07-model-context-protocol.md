# Model Context Protocol

**Source (RU):** Model Context Protocol  
**Path:** Home → Basics of Programming with AI → Model Context Protocol  
**Published:** ~4 weeks ago

## Contents

- Architecture: host, client, server
- How it works
- What a server can do
- What a client can do
- Practical example: GitHub + Cursor (local MCP)
- You can build your own MCP servers
- Remote MCP?
- MCP Apps: an interface instead of text
- Important notes
- Further reading
- Related club content

After [AI chats inside the IDE](05-ai-chat-in-the-ide.md) and [agentic code generation](06-agentic-code-generation.md), it is time to look behind the scenes — at the protocol that makes it all work together. Meet **Model Context Protocol**, or **MCP** — a universal standard for giving AI models access to tools, data, and context from any environment: your IDE, CRM, database, or internal service.

First presented by Anthropic in late 2024 and adopted by OpenAI in March 2025, MCP became the de facto standard for building AI agents and plugins. It lets applications talk to an LLM using a shared structure based on **JSON-RPC**, which simplifies integrating external tools in a safe and modular way.

In December 2025 Anthropic announced that they were handing the protocol to the **Agentic AI Foundation (AAIF)**.

AAIF is a non-profit under the **Linux Foundation**, co-founded with OpenAI, Block, and Anthropic in late 2025. It develops and maintains open AI initiatives such as MCP, **AGENTS.md**, and others.

A shorter overview of MCP among other AI protocols is in Basic Theory: [AI protocols](../01-basic-theory/04-master/08-ai-protocols.md).

## Architecture: host, client, server

MCP defines three key roles:

- **Host** — an application or agent, such as an IDE or AI chat, that can manage one or more MCP clients.
- **Client** — the link between the LLM and MCP servers.
- **Server** — where tools, prompt templates, and data resources live. These servers can run locally (via **stdio**) or remotely (via **Streamable HTTP**).

*GIF on the platform: `1_s93QDBWKx3Q_TrosXBmQ-g.gif` — paste it here if you want it in the local notes. [image source]*

If you see the old **SSE** transport (HTTP+SSE) in articles or configs — know that it is deprecated. The spec replaced it with **Streamable HTTP**, which uses a single HTTP endpoint with POST and GET and can stream responses via Server-Sent Events when needed. Old servers still show up, and clients usually support both for backward compatibility, but for new integrations choose Streamable HTTP.

## How it works

When the host starts, it begins an MCP session with a **capability handshake**, where both sides declare what they support. Then the LLM calls `tools/list` to see what is available, and can start calling tools — just like calling native functions. Everything is routed through the MCP client, and tool calls happen only with explicit user approval (unless **Auto-run** is on).

## What a server can do

Many people think MCP is “the tools protocol.” In fact a server can expose three different kinds of capability, and they differ by **who decides** when to use them:

| Capability | What it is | Who decides | Example |
|---|---|---|---|
| **Tools** | Functions the model can call: write to a database, hit an API, create a PR | The model | `create_pull_request` |
| **Resources** | Passive read-only data that the application mixes into context | The application | DB schema, file contents, docs |
| **Prompts** | Ready-made instruction templates, often available as slash commands | The user | `/review-pr`, `/write-tests` |

In practice most servers stop at tools, but resources and prompts often give more value for less money: a resource does not spend a model call, and a prompt turns a successful workflow into one command.

## What a client can do

The reverse direction is easy to miss — and that is a mistake, because the client also offers capabilities to the server:

**Elicitation** (requesting data) — the server can pause and ask you for missing information mid-work, instead of failing or requiring everything up front. The client shows a form from a schema the server sent. Useful for confirmations and clarifications.

**Roots** — the client tells the server which directories it should work with. Important nuance: this is **coordination, not protection**. The spec says the server “should respect” the bounds, but it is not required to. Real isolation is done with filesystem permissions and sandboxes.

**Sampling** (requesting generation) — the server can ask the client to go to the model on its behalf. That lets you write “smart” servers without embedding your own LLM access or paying for it: the client pays and stays in control, and the human can see both the request and the reply.

Support for these features varies a lot across clients — many IDEs implement tools only. If you write a server that depends on elicitation or sampling, check whether the target client actually has them.

## Practical example: GitHub + Cursor (local MCP)

Suppose you want the agent in Cursor IDE to open a GitHub Pull Request. Here is how simple that is:

1. Install `github-mcp-server`
2. Add a few lines to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "github-mcp-server",
      "args": [],
      "env": { "GITHUB_TOKEN": "ghp_***" }
    }
  }
}
```

When Cursor starts, it launches the GitHub server as an stdio process, does the MCP handshake, gets the description of the `create_pull_request` tool, and caches it.

The result? You type a natural prompt like “Open a PR with the fix for bug #XXX”, and the model understands that it needs to call exactly that tool to do the job. Nothing happens until you press **Approve** — that gives you full control. And if you want to speed things up, you can turn on **Auto-run** in Cursor settings so the agent can automatically run trusted tools. Just remember: with power comes responsibility.

A few practical details:

- Config has two levels: `~/.cursor/mcp.json` is global, for all projects, and `.cursor/mcp.json` at the repo root is only for that project. The second option is convenient to commit so the whole team gets the same set of servers (just do not put tokens in it — move them to environment variables).
- You no longer have to write JSON by hand: many tools now have marketplaces with one-click install. In Cursor that is the **Add to Cursor** button in the marketplace and the [cursor.directory](https://cursor.directory) catalog; in Claude Code — the `claude mcp add` command; in VS Code — its own extensions catalog.

## You can build your own MCP servers

One of the most powerful parts of MCP is that you do not have to wait for someone else to create the tools you need. You can create your own MCP server — and it is much simpler than it looks.

An MCP server is just a small program that follows a clear JSON-RPC spec and provides:

- a list of available tools via `tools/list`
- tool metadata and parameters
- optionally resources or prompt templates

You can build it in any language or framework — Node.js, Python, Go, Rust — and run it as a local stdio process or a remote server over Streamable HTTP.

If you can write a CLI script or a REST API, you already have the skills to create powerful tools that AI can use, via MCP.

## Remote MCP?

MCP also supports **remote** servers — tools hosted online rather than locally. They let agents and IDEs connect to cloud tools over Streamable HTTP, usually with authentication via **OAuth**.

This is useful when:

- you do not want to run a local server
- you work in a multi-user or cloud IDE environment
- you need tools that are hosted and maintained by a provider

Remote MCP works the same as local MCP: the model sees the same tool descriptions and can call them via `tools/list` — but the server lives in the cloud.

## MCP Apps: an interface instead of text

The protocol gained an **extensions** mechanism, and the first official one is **MCP Apps** — the ability to return not text, but an interactive interface right in the chat: a chart you can click, a form with validation, a dashboard with live metrics, a PDF viewer.

How it is set up:

1. A tool, in its description, points to a UI resource on the `ui://` scheme.
2. The host fetches that resource — an ordinary HTML page with its own scripts and styles.
3. The page is rendered in an isolated **iframe** inside the dialogue.
4. The app and the host talk via `postMessage`: the app can call the server’s tools, and the host can send it fresh data.

The key point is **security**: the app is locked in a sandbox and cannot reach the parent page, cookies, or `localStorage`. That is why the host can relatively calmly render UIs from third-party servers.

Why this matters in practice: when the user needs to **work with** data, not read about it. Setting up a deploy with two dozen interdependent options through a form is easier than through a dialogue of fifteen clarifying questions.

Support is already in Claude and Claude Desktop, VS Code with GitHub Copilot, Microsoft 365 Copilot, Goose, and other clients — but not everywhere yet, so check your tool.

## Important notes

Although MCP is becoming a shared standard, not every tool implements the full protocol. Some servers support only a limited set of features, and others do not yet allow remote connections. So before connecting any MCP tool, always check whether it supports the parts of the protocol you actually need.

When you work with MCP servers, almost all AI tools attach the descriptions of tools available in the connected MCP servers to the prompt that is sent to the model. That means: the more MCP servers you have connected, and the “larger” they are, the bigger the prompt sent to the model. That can hit both the quality of the model’s answer and your wallet. So use the minimum set of MCP servers needed for the current project, and turn the rest off.

An MCP server is code that runs on your machine (or in the cloud, if Remote). Installing one from an unknown author is the same as running someone else’s script with your user privileges. Specific attack vectors and how to reduce the risk are in [Security](17-security.md).

Do not confuse MCP with **Skills** — the second open standard for extending agents. MCP gives the agent access to external systems (hands), and Skills describe a work procedure (instructions) and are loaded into context only as needed. They complement each other well: a skill can happily call MCP tools from inside itself. Details: [Skills and subagents](11-skills-and-subagents.md).

## Further reading

You can study the full documentation at [modelcontextprotocol.io](https://modelcontextprotocol.io).

Useful directories for finding MCP tools and servers:

- [Official MCP registry](https://registry.modelcontextprotocol.io/) — the protocol now has its own registry where authors publish their servers. Start your search here.
- [MCPServers.com](https://mcpservers.org/)
- [MCP.so](https://mcp.so)
- [Glama MCP](https://glama.ai/mcp/servers)
- [Mastra MCP Registry](https://mastra.ai/blog/mcp-registry-registry)
- [Smithery](https://smithery.ai)

Stay curious and keep experimenting — MCP is quickly becoming one of the key protocols in AI-assisted programming. And the best part is that you can start today — no permission required.

## Related club content

- 2025.06.05 / Workshop on building a Remote MCP via Dify and n8n / Mikhail Savchenko
- 2025.05.13 / Call #9: Cursor updates, RCP, Gemini Pro 2.5 I/O, Mistral Medium 3, vendor lock, Product Engineer, MoE, Reasoning, useful MCP
- 2025.04.15 / Call #7: Junie, Windsurf, A2A, MCP, model degradation, Deep Research, US taxes and Trump
- 2025.03.12 / The full Cursor knowledge base (+ MCP) / Valera Selitsky and Lex Kartynnik
- 2024.12.23 / How MCP is structured and how it works / Sergey Parfenyuk
- 2024.12.14 / Writing a search MCP Server for Cline via Cline
