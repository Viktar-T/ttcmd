# AI protocols

**Source (RU):** ИИ-протоколы  
**Path:** Home → Basic Theory → Level “Master” → AI protocols  
**Published:** ~4 weeks ago

As AI becomes more integrated with apps, infrastructure, and the web, a new wave of protocols is appearing to standardize how models talk to tools, agents, and online content.

These protocols are fundamental to making AI truly interoperable, agentic, and extensible in distributed systems.

*Image on the platform: `image.png` — paste it here if you want it in the local notes.*

## How to find your way around

There are a lot of protocols, and it is easy to drown in them at first. Look closely, though, and almost every one answers “who talks to whom.” Lay them out that way:

| Who talks to whom | Protocols |
|---|---|
| Agent ↔ tools and data | MCP, SCP |
| Agent ↔ agent | A2A |
| Agent ↔ IDE | ACP (Agent Client Protocol) |
| Agent ↔ user interface | A2UI, AG-UI, MCP Apps |
| Agent ↔ website | NLWeb, WebMCP |
| Agent ↔ store and money | UCP, AP2, ACP (Agentic Commerce Protocol), x402 |
| Transparency of agent work | Agent Trace |

Second thing to notice: **where the protocol was handed over**. Trend of recent years: authors give their standards to neutral foundations so the protocol does not look vendor-owned. MCP went to the **Agentic AI Foundation**, A2A and x402 to the **Linux Foundation**; AP2 standardization continues in **FIDO Alliance** working groups. That is a good sign of maturity: a consortium stands behind the protocol, not one company.

Watch the acronyms. Under **ACP** live two completely different standards: **Agent Client Protocol** from Zed (agents and IDEs) and **Agentic Commerce Protocol** from OpenAI and Stripe (purchases). They are unrelated — do not mix them up; both are covered below.

## Tools and context

### MCP

Proposed by Anthropic, **MCP** (Model Context Protocol) is a secure, lightweight JSON protocol that lets LLMs call external tools, APIs, or structured actions. MCP provides declarative tool registration, tool schemas, and safe interaction over a **JSON-RPC 2.0** interface. It also supports:

- secure access control and permissions for tools
- streaming output
- schema-first design for declaring tools

This is the best-known AI protocol, widely used for example in Cursor, Claude Code, Copilot, and other agent systems.

What changed recently:

- In December 2025 Anthropic handed the protocol to the **Agentic AI Foundation (AAIF)** under the Linux Foundation. Co-founders include Anthropic, Block, and OpenAI; participants include AWS, Google, Microsoft, Cloudflare, Bloomberg.
- Spec versions are named by the date of the last breaking change. The current one as of this lesson is **2025-11-25**.
- An official **MCP server registry** appeared, where authors publish their servers — previously you had to hunt through third-party catalogs.
- The protocol gained an **extensions** mechanism; the first official one is **MCP Apps** — the ability to return not only text but an interactive UI (see the interfaces section below).

A detailed lesson on MCP in programming is in Basics of Programming with AI: [Model Context Protocol](../../02-programming-with-ai/07-model-context-protocol.md).

### SCP

**SCP** (Science Context Protocol) is a scientific extension of MCP ideas from the **Shanghai AI Laboratory**, introduced in late 2025.

The problem it solves: ordinary MCP is enough to “call a tool,” but not enough to run a scientific experiment. Real research is a chain of planning, running on real equipment, collecting data, and — critically — **reproducibility**. SCP adds those layers:

- **Hub-and-spoke architecture.** Instead of a direct client ↔ server link, a central **Hub** parses the researcher’s intent, builds a workflow, plans tasks, and manages access rights; peripheral servers serve local resources — databases, tools, instruments.
- **Full experiment lifecycle:** registration → planning → execution → archiving, with end-to-end traceability for reproducibility.
- **Standard lab-equipment drivers** instead of a custom adapter per instrument — which lets you connect “dry” and “wet” labs.
- A **library of scientific skills** — hundreds of ready, reusable procedures with code and tests across eight domains: pharmacology and drug discovery, genomics, protein engineering, chemistry, physics, lab automation, Earth sciences, biomedical databases.

SCP is a good example of a base protocol growing industry-specific layers. We will likely see similar specialized extensions for medicine, finance, and industry.

## Agents among themselves

### A2A

**A2A** (Agent2Agent Communication) is a protocol and SDK developed by Google and handed to the **Linux Foundation**. It lets autonomous LLM agents find each other, connect, and collaborate in distributed systems.

It builds a secure network where agents:

- use JSON-RPC 2.0 over HTTP(S)
- exchange tasks, states, or messages in a structured form
- can coordinate plans asynchronously
- are discoverable through public registries

SDKs exist for Python, JavaScript, and Java for fast agent integration. A2A is especially useful for ecosystems of cooperating agents in enterprise, infrastructure, and science.

The protocol has reached stable **version 1.0**. Development is led by a technical committee that includes AWS, Cisco, Google, IBM Research, Microsoft, Salesforce, SAP, and ServiceNow. More than a hundred organizations have gathered around it — today it is the de facto standard for inter-agent communication in the enterprise.

## Agents and interfaces

For a long time an agent could only answer in text. Text is awkward for picking a date, setting a filter, or confirming an order — you need a UI. The problem: letting the model generate arbitrary HTML and JavaScript and then running it is a straight path to security holes. That is why several protocols grew up.

### A2UI

**A2UI** (Agent-to-User Interface) is an open project launched by Google in December 2025 with several teams inside and outside the company.

The idea is that the agent returns a **description** of the UI, not code:

- The agent generates a declarative JSON payload with a tree of UI components and a data model. No executable code — so nothing to “go off.”
- The client app keeps a catalog of trusted components (buttons, cards, input fields) and renders them with its own native tools — Lit, Angular, or React on the web; Flutter on mobile.
- Components are sent as a flat list with ID references — so the UI can render progressively as the model generates it.
- Transport is compatible with A2A and AG-UI; license Apache 2.0.

The key difference from **MCP Apps** is the rendering approach: MCP Apps shows the UI in an isolated iframe (**sandbox-first**); A2UI hands a blueprint for native drawing (**native-first**). The first is more flexible; the second is faster and fits the host app’s design better.

Nearby: **AG-UI** (Agent-User Interaction Protocol) from the CopilotKit team — a light event protocol that standardizes two-way exchange between a frontend and any agent backend via a stream of typed events. If A2UI answers “how should an agent describe a UI,” AG-UI answers “how should the frontend and the agent talk in real time.” They complement each other and are often used together.

## Agents and IDEs

### ACP (Agent Client Protocol)

**ACP** (Agent Client Protocol) is an open protocol from **Zed Industries**, published in August 2025. It solves the same fragmentation problem as MCP, but at a different joint: **editor ↔ coding agent**.

Before it, every “agent + IDE” pair needed a separate integration: Claude Code in JetBrains → a plugin; Gemini CLI in Neovim → another one. ACP replaces that N×N matrix with a single interface: any compatible agent works in any compatible editor.

- **Transport:** JSON-RPC over stdio for local agents; HTTP or WebSocket for cloud ones.
- Direct analogy: **LSP**. The Language Server Protocol did the same thing for language support: one language server — all editors. ACP repeats that move for agents.
- **Friends with MCP.** The protocol reuses JSON representations from MCP where it can, and adds its own types for coding specifics — for example showing diffs.
- **Agent registry.** A developer registers an implementation once, and it becomes available in all ACP-compatible clients.

In autumn 2025 JetBrains announced a partnership with Zed and joint development of the protocol — ACP got native support in IntelliJ IDEA, PyCharm, WebStorm, and the rest of their IDEs. That is an important shift: JetBrains has its own agent **Junie**, but still opened its environments to third-party agents. Besides Zed and JetBrains, there is support in Neovim, Emacs, and other editors via community plugins.

For you as a developer this means something simple: choosing an IDE and choosing an agent are gradually ceasing to be one decision. You can stay in a familiar environment and swap agents for the task.

## Agents and the web

### NLWeb

Developed by Microsoft, **NLWeb** (Natural Language Web) is an open framework for giving LLMs access to websites through natural-language interfaces. It lets you index, query, and summarize web content with LLMs via:

- metadata: Schema.org, RSS, sitemaps
- natural-language endpoints hosted on sites
- support for vector search and context packing
- compatibility with agents and MCP

This protocol is a step toward turning the web into a conversational, agent-navigable space, which opens doors for web agents, task execution, and site integration without blunt HTML parsing.

### WebMCP

**WebMCP** is a proposed web standard that Google and Microsoft engineers are developing in the W3C Web Machine Learning Community Group.

The problem it solves is familiar to anyone who has seen agent browsers in action: the agent has to guess the site’s UI — parse the DOM, simulate clicks, hope the button does what the label says. That works poorly, especially on complex flows like booking or multi-step forms.

WebMCP flips the approach: the **site itself** declares tools the agent can use — with a name, a natural-language description, and a JSON parameter schema:

```javascript
await document.modelContext.registerTool({
  name: 'toggle_layer',
  description: 'Control pizza layers (sauce, cheese). Use "add", "remove", or "toggle".',
  inputSchema: {
    type: 'object',
    properties: {
      layer: { type: 'string', enum: ['sauce-layer', 'cheese-layer'] },
      action: { type: 'string', enum: ['add', 'remove', 'toggle'] },
    },
    required: ['layer'],
  },
  execute: async ({ layer, action }) => {
    await toggleLayer(layer, action);
    return `Performed ${action || 'toggle'} on layer: ${layer}`;
  },
});
```

Besides this imperative JS API there is a declarative variant — via annotations on ordinary HTML forms.

Important nuances:

- **Tools are ephemeral.** They exist only while the page is open: leave the page — the agent loses access. That is how WebMCP differs in principle from an MCP server, which lives continuously.
- **This is not a replacement for MCP.** The docs say it outright: WebMCP is neither an extension nor a replacement of MCP. MCP is about persistent access to external systems; WebMCP is about working with the live session of a specific page, with its cookies and state. Using both is recommended.
- **Status.** The spec is a Community Group draft — not a W3C standard yet, not even Standards Track. In Chrome it is available for testing via origin trial and a flag.

## Commerce and payments

The hottest (and most tangled) zone. There is an open ecosystem fight: Google with a retailer coalition, OpenAI with Stripe, the crypto camp with its own approach. It is worth sorting out at least because **agentic commerce** — purchases an agent makes on your behalf — already runs in production.

### UCP

**UCP** (Universal Commerce Protocol) is an open standard presented by Google in January 2026 at NRF. It was developed with Shopify, Etsy, Wayfair, Target, and Walmart; the support coalition includes Amazon, Microsoft, Meta, Salesforce, Stripe, Mastercard, Visa, American Express, and dozens of others.

The problem it solves is the same N×N matrix, but in retail: without a shared standard, every store needs a separate integration for every AI agent.

How it is built:

- The store publishes a capabilities manifest at the standard address `/.well-known/ucp` — the agent discovers which functions, endpoints, and payment methods are supported, with no hardcoding.
- The protocol is assembled from modular **capabilities** (catalog, cart, identity binding via OAuth 2.0, checkout, orders) and **extensions** on top (discounts, shipping).
- Transport-agnostic: REST and JSON-RPC, over MCP or A2A — depending on the business’s infrastructure.
- Covers the full purchase path: from product search and cart building through payment and order-status webhooks, including complex cart logic, dynamic prices, and tax calculation.

The first ready spec is for shopping; industry extensions for hotels and food are coming. A reference implementation already runs in Google Search and Gemini.

### AP2

*Image on the platform: `ap2 image`.*

**AP2** (Agent Payments Protocol) is another open protocol from Google, meant for secure payments that AI agents make on your behalf. It introduces a shared language and verifiable “user will” through cryptographic **mandates** (proof of consent), so stores, payment networks, and the agents themselves all understand who allowed what and who is responsible for what. The protocol is designed as an interoperable layer on top of the agentic internet: it works with A2A (agent talk) and MCP (tool access), and supports different payment methods — from cards and instant bank transfers to stablecoins.

In short, AP2 is the missing **payment layer** for agentic commerce, making agent purchases standard, safe, and verifiable.

What changed: further AP2 standardization moved into **FIDO Alliance** working groups — the same organization behind passkeys and passwordless auth. The logic is clear: confirming user consent is exactly their profile. AP2 does not compete with UCP; it **joins** it: UCP handles the storefront and cart, AP2 handles provable consent to charge money.

### ACP (Agentic Commerce Protocol)

*Image on the platform: `acp image`.*

**ACP** (Agentic Commerce Protocol) is an open standardized protocol from **OpenAI and Stripe** that sets a unified “language” among buyers, their AI agents, and businesses, so the whole flow from product search to purchase can sit inside a dialogue. Inside ACP an agent can request a catalog, build a cart, pass payment data through a secure token, and the seller can accept or reject the order, take payment, and manage fulfillment — all while keeping control of their systems, brand, and customer relationship.

ACP is built for scale and flexibility: sellers can integrate without rewriting their whole backend, and use existing payment and logistics systems (it works via REST API and MCP); agents can work with different sellers through a single interface. The key principle: the seller remains **merchant of record** and decides what to sell and how to fulfill. The first platform to implement ACP was ChatGPT; the first payment provider was Stripe, with a Shared Payment Token mechanism.

In essence, **UCP and ACP are two competing answers to one question**, backed by different coalitions. Who wins is still unclear; large platforms may simply support both. Watch which one your payment platform supports.

### x402

**x402** is an open standard for internet-native payments that grew out of a Coinbase initiative and was handed to the neutral **x402 Foundation** under the Linux Foundation. Supported by Alchemy, AWS, Cloudflare, Stripe, and Vercel.

The idea is elegant in its simplicity: HTTP has reserved status code **402 Payment Required** since 1997, and it never found a use. x402 finally gives it meaning:

1. The agent requests a paid resource or API.
2. The server replies **402** with a description of how much to pay and where.
3. The agent attaches payment and retries the request — and gets the response.

Settlement happens in one round-trip, with no account signup, API keys, or subscriptions. Payment is in stablecoins on EVM-compatible networks and Solana; the protocol itself has no fees; server integration is basically plugging in middleware.

Why it is needed: an agent that walks dozens of APIs itself cannot reasonably open an account and a card at every service. x402 covers the **machine-to-machine micropayment** niche, where classic billing is too heavy.

## Transparency of agent work

### Agent Trace

**Agent Trace** is an open spec proposed by the Cursor team in January 2026 as an RFC (current version **0.1.0**).

It answers a question that grew large once the share of AI code in repos started being measured in tens of percent: **who actually wrote this code?** Git knows the commit author, but not whether a person typed those lines by hand, accepted them wholesale from an agent, or rewrote them halfway.

The spec describes a JSON **trace record** that captures:

- **What** — files and specific line ranges with content hashes
- **Who** — contributor type: `human`, `ai`, `mixed`, or `unknown`
- **With what** — tool and its version, model identifier
- **When and where** — timestamp, VCS, and revision
- **From where** — a link to the dialogue the code grew from

An important design detail: the spec deliberately does **not** dictate where to store traces. Local files, git notes, a database — anything. It describes only the data format, not a product.

What Agent Trace does **not** do: it does not score the quality of AI contribution and does not track which training data influenced the result. It is an **attribution** tool, not an audit tool.

Why it matters in practice: audit and compliance, honest team stats, incident investigation (“this bug came from an agent refactor in March”), and, later, legal questions about copyright on code. The spec is being discussed with Anthropic, GitHub, Vercel, Cloudflare, Cognition, and others — chances it sticks are decent.

## What to do with all this

The list above looks scary, but there is no need to panic — in practice the zoo collapses into a few simple thoughts:

- **Mandatory minimum — MCP.** It is the only protocol you will hit in almost any AI tool. The rest — as needed.
- If you write code with agents — look at **ACP** (freedom to mix agent + IDE) and **Agent Trace** (if the team asks about attribution).
- If you build a web product — look at **WebMCP** and **NLWeb**: they are about how your site will look to agents that will soon arrive instead of users.
- If you have e-commerce — you will have to choose between **UCP** and **ACP** or support both, and also sort out the payment layer: **AP2** for classic payments, **x402** for machine-to-machine micropayments.
- Do not rush to implement everything. Half of these protocols are still draft or preview. Watch two things: whether the protocol was handed to a **neutral foundation**, and whether a **coalition of companies** stands behind it. A lonely vendor protocol without a foundation may not live to version two.
