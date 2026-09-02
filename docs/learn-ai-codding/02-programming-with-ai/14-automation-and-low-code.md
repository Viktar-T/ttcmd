# Automation and low-code

**Source (RU):** Автоматизация и low-code  
**Path:** Home → Basics of Programming with AI → Automation and low-code  
**Published:** ~4 weeks ago

## Contents

- Why low-code in AI automation at all
- Workflow structure
- Main players
- Examples
- Tips and recommendations
- Limits of low-code
- Related club content

Now let’s sort out how you can quickly assemble working AI processes without a ton of code — on visual builders.

A shorter portrait of Dify and n8n is also in Basic Theory: [Applied tools and frameworks](../01-basic-theory/04-master/06-applied-tools-and-frameworks.md).

## Why low-code in AI automation at all

Low-code builders let you connect, on a canvas, triggers (webhooks, cron jobs), data transforms / ETL, LLM / RAG modules, decision branching, and external services (HTTP, Slack, databases, CRM), combining all of that into what are called **workflows** or **pipelines**. The result:

- **Speed of development:** from idea to a working prototype in hours.
- **Collaboration:** not only developers can work with these platforms’ workflows.
- **A fast path to prod:** low-code platforms give you ready endpoints, key integration, logging, retry policies, and other ready-made solutions.

**When to take low-code?** You need a “business process + AI” *now*. **When is it better to think?** Extreme performance, raised security requirements, complex unusual integrations — then better in code.

## Workflow structure

Trigger → Data transform / ETL → RAG / LLM → Decision branching → Actions → Logging

```text
[Trigger: Webhook/Cron]
            │
      [Parse / ETL]
            │
   [RAG: embed → retrieve]
            │
        [LLM / Agent]
            │
   [Route / Tool / Branch]
            │
     [Action: Slack/DB/HTTP]
            │
      [Logs / Metrics]
```

See [RAG](../01-basic-theory/04-master/05-rag.md) and [Agents](../01-basic-theory/04-master/03-agents.md).

## Main players

Below is a short portrait of two leaders of this market.

### Dify

*Image on the platform: Dify — paste it here if you want it in the local notes.*

[Dify](https://dify.ai) (dee-fye) is a visual builder, a canvas for workflows, RAG (Knowledge / Indexing Pipeline), agent graphs, prompt versioning, publishing as an API.

- **Hosting:** cloud or self-host (Docker Compose).
- **Strengths:** RAG “out of the box,” observability, convenient publishing of apps / endpoints, fine context tuning.
- **When to take it:** you need an AI-centric flow with careful knowledge management and a fast path to prod.

### n8n

*Image on the platform: n8n — paste it here if you want it in the local notes.*

[n8n](https://n8n.io) (n-eight-n) is a powerful visual builder with hundreds of integrations (Slack, Telegram, Notion, Jira, Postgres, HTTP, and so on), webhooks, cron, queues.

- **Hosting:** cloud or self-host (Docker Compose).
- **AI capabilities:** chains on LangChain, nodes for OpenAI / Anthropic, agent nodes, support for local models via Ollama and others.
- **Strengths:** a very large number of triggers and ready integrations, flexible secret settings, good pipeline control.
- **When to take it:** you need to “stitch” AI into already existing business processes and integrations, you need many ready integrations out of the box.

Each of these tools, even though it is low-code, has a very powerful and flexible system for extending functionality, including through code.

A short catalog entry for n8n and Dify is also in [Popular tools](20-popular-tools.md#low-code-automation-platforms).

And a few more worthy players:

- [Flowise](https://flowiseai.com) — a light visual LangChain builder
- [Langflow](https://www.langflow.org) — agent graphs, RAG, a growing ecosystem
- [Make](https://www.make.com) — a universal builder with a large number of integrations
- [Zapier](https://zapier.com) — another universal builder with a large number of integrations

### Opal

*Image on the platform: Opal — paste it here if you want it in the local notes.*

[Opal](https://opal.google) is a visual editor for creating multi-step mini-apps on the Google Gemini API, made by Google.

It has an enterprise analogue: **Google Agentspace** (now part of **Gemini Enterprise**).

### AgentBuilder

*Image on the platform: OpenAI AgentBuilder — paste it here if you want it in the local notes.*

**AgentBuilder** is a visual editor for creating multi-step agent workflows on the OpenAI API, made by OpenAI. It lets you extend the capabilities of the OpenAI API.

You can find more information about similar tools in our club, in the Tools channel, under the hashtag `#lowcode`.

## Examples

### Dify: “Documents → RAG summary → Webhook / Slack”

**Task:** accept a document via webhook, parse / split it, add it to the index, generate a summary, and send it to Slack (or any HTTP endpoint).

Steps:

1. **Deploy:** Dify cloud or Docker Compose locally.
2. **Dataset / Knowledge:** upload PDF / HTML / text → chunking → embeddings.
3. **Workflow:** Start → Retrieve (from the dataset) → LLM (a strict system prompt + token limits) → HTTP / Webhook Sender (Slack Incoming Webhook URL).
4. **Publish:** turn on API access for the workflow, test in “Try it.” For incoming requests, add a webhook step at the start of the graph.

Hints:

Return strict JSON. For example, set a schema in the prompt:

```json
{
  "title": "string",
  "key_points": ["string"],
  "risks": ["string"],
  "links": ["url"]
}
```

Turn on response streaming for long summaries and watch the token budget.

For private data, use local embeddings and closed models.

### n8n: “Daily ticket digest with a local LLM”

**Task:** every weekday at 09:00 collect new tickets from an API, aggregate them by labels via Ollama (Llama 3 / other), send a digest to Slack.

Node scheme (left → right):

Schedule Trigger (09:00 Europe/Warsaw) → HTTP Request (tickets API) → Function / Set (normalize to an array) → Ollama Chat or LLM Chain with the prompt “Summarize by label; return JSON `{label, items[], priority}`” → Slack / Webhook.

Prompt stub fragment:

```text
You are a ticket-aggregation assistant. Input is a list of tickets with {id,title,label,createdAt}.
Group by label and return **ONLY** JSON:
{
  "groups": [
    {"label": "string", "count": 0, "top_items": ["id: title"], "priority": "low|mid|high"}
  ]
}
Rules: if the word "SEV" is found in title → priority=high. Max 5 top_items per group.
```

Pitfalls and tips:

- Set the timezone in Cron, otherwise you get shifts.
- In HTTP Request, set retries and backoff.
- When working with Ollama in Docker, check the container network (`--network=host` on localhost) and VRAM / CPU volume.
- If you need a branched flow, add IF / Switch based on `priority`.

## Tips and recommendations

- Use structured answers: JSON schemas and validation at every step are the key to success.
- **Observability:** collect request / response logs, token metrics, traces — watch how your workflow works.
- **Secrets and sensitive data:** store them in the platform’s secret manager, do not log raw personal data; for sensitive cases — local models.
- Watch reliability: implement retries, deadlines, idempotent webhooks, DLQ / retry queues when needed.
- **Budget control:** set token limits and use a “draft → refine” pipeline instead of one long request.

## Limits of low-code

- You need millions of events / hundreds of RPS: a custom microservice / worker is more profitable.
- Strict SLOs and tracing at the level of a distributed system.
- Exotic integrations / algorithms that are not in the nodes — easier to “write by hand” (though nothing stops you from extending the workflow through code).

## Related club content

- 2025.07.15 / Building smart chatbots via n8n and Dify / Mikhail Savchenko
- 2025.06.05 / Workshop on building a Remote MCP via Dify and n8n / Mikhail Savchenko
- 2025.01.30 / Workshop on building agentic apps with Dify / Mikhail Savchenko
- 2024.07.25 / Working with LangChain, LangSmith, and LangGraph / Mikhail Savchenko
