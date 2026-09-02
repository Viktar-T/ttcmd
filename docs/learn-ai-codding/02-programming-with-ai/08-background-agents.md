# Background agents

**Source (RU):** Фоновые агенты  
**Path:** Home → Basics of Programming with AI → Background agents  
**Published:** ~4 weeks ago

## Contents

- Where the idea came from
- Background agents vs agent chat in Cursor
- Popular tools
- Typical cases for background agents
- How to assign tasks to background agents
- Risks and precautions
- Related club content

**Background agents** are autonomous asynchronous agents that take on long and routine engineering tasks and run them in the background, in parallel with your work. They start in an isolated environment (local containers, VMs, or the cloud of the agent-service vendor), get repository context, build a development plan, edit code, run tests, and bring back the result as commits, ready pull requests, or a report.

## Where the idea came from

The first mass wave of interest in background agents came after the loud announcement of **Devin** from Cognition Labs in mid-2024: it was positioned as an “AI software engineer” that integrates with Slack / Linear / Jira, plans the steps itself, writes code, tests, and opens a PR. After the announcement Devin stayed in closed beta for a long time, but the community picked up the idea, and first open-source projects, then commercial tools for background agents, started appearing in bulk. Today the approach of asynchronous, multi-step work in the background on virtual machines is becoming part of the base feature set in many development tools.

## Background agents vs agent chat in Cursor

In short: a **chat agent** is your pair programmer in the IDE here-and-now; a **background agent** is an autonomous executor that runs asynchronously in a remote environment, with progress logs and a result as a PR / commits.

| | Chat agent | Background |
|---|---|---|
| **Where it runs** | Locally around your open files and projects, and the OS | In a remote sandbox (remote environment), where the agent itself edits and runs code |
| **Work model** | You talk to the assistant as in a pair-programming session, solving the task step by step | You send the task and forget it, keep doing your own work, and occasionally check status |
| **How you talk** | Directly through agent chat inside the IDE, or via CLI | Through simplified web UIs from your phone, through task-tracker UIs (for example GitHub); sometimes you can continue the task right in the IDE (that is how Cursor and its background agents work, for example) |

See also [AI chat in the IDE](05-ai-chat-in-the-ide.md) and [Agentic code generation](06-agentic-code-generation.md).

## Popular tools

### Cursor Background Agents

In the Cursor ecosystem you can start background tasks right in the browser and talk to the agent there (comments, clarifications), then continue in the IDE with the same context. GitHub, Slack, and Linear are also supported. That “through-line” scenario cuts context switching: planning in the web / task tracker / chat → execution in a cloud sandbox → review and polish in the IDE or on GitHub. Included in the Cursor subscription.

Docs: [Cloud Agents](https://cursor.com/docs/cloud-agent) (Cursor now uses this name; they were formerly called Background Agents).

### OpenAI Codex

**Codex** is a cloud dev agent that, working with your GitHub repository, starts flexible cloud sandboxes, does the task, writes features / fixes bugs, runs tests, and in the end proposes a PR. It has CLI / IDE extensions and state transfer between them. Included in the ChatGPT subscription (as an extension it can also work through the OpenAI API).

### Devin

A standalone “AI engineer,” one of the first background agents on the market. It creates a plan, writes code, tests, opens a PR; talks in Slack / Linear / Jira; can run several work streams. Focus: long autonomous tasks and team integration. Has its own subscription; developed by Cognition Labs.

### Replit Agent

**Replit Agent:** a cloud agent with long autonomous runs, auto-testing / fixing, and live monitoring; aimed at quickly creating / iterating apps and automations. Replit was one of the first companies to offer AI agents for **low-code and no-code** — that is, without a focus on hardcore developers, concentrating more on fast app and automation building without specific development knowledge.

### GitHub Copilot Coding Agent

**GitHub Copilot Coding Agent:** starts autonomously in an environment based on GitHub Actions: clones the repository, solves the task, and opens a PR; available from the GitHub web / mobile / CLI.

### Continue Workflows

**Continue Workflows:** background agents for repeating tasks, managed from the IDE and the Continue.dev website.

### Jules Tools

**Jules Tools:** a CLI wrapper for **Jules** — Google’s prompt-based WebIDE.

## Typical cases for background agents

Because background agents mostly work without a developer in the loop, they are a better fit for routine and intellectually simple tasks that already have fairly clear templates and scenarios in the project context:

- Refactoring, dependency updates, import fixes, generating types / schemas
- Covering routine scenarios with tests; fixing tests
- Auto-updating docs / changelogs
- Preparing DB migrations and mechanical API-contract edits
- Generating telemetry / metrics, basic perf improvements

## How to assign tasks to background agents

**Context:** give as much task context as you can — this critically affects result quality, how well the agent understands the task, and how well it does it.

**Goal and acceptance criteria:** what should be in the PR (list of changes, green tests, no-lint), testing, logs.

**Constraints:** PR size, forbidden changes, specific files that need to be changed, and so on.

## Risks and precautions

**Privacy:** check the policies and privacy modes of services that provide cloud sandboxes.

**Repository rules:** configure rights and rules for PRs, merges, and branches on GitHub; be sure to set up a pipeline for code review.

**Budget:** understand the cost of running agents, set time / resource limits, watch the budget for model calls. An agent started and forgotten, with no limits, can become a black hole in your bank card.

**Hallucinations / regressions:** tests are the new gold — they can make your life much easier and cut the amount of smelly code in production. Do not forget CI/CD settings and automating code-review processes (through AI as well). See [Hallucinations](../01-basic-theory/02-user/04-hallucinations.md) in Basic Theory. Continuous security review in the background is in [Security testing](18-security-testing.md).

## Related club content

- 2025.05.27 / Call #10: Cursor Background Agent, fine-tuning, and languages for AI
- 2025.02.06 / Workshop on how Devin is structured and how to work in it / Oleksandr Vasileiko
