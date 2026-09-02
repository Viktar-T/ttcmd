# Indexing and memory

**Source (RU):** Индексация и память  
**Path:** Home → Basics of Programming with AI → Indexing and memory  
**Published:** ~4 weeks ago

## Contents

- Why index a project?
- Kinds of indexing
- What goes into an index
- How information is mixed into prompts
- What “memory” is
- In short
- Related club content

This chapter is about how IDE agents understand your project: what kinds of indexes there are, how local vector search on top of [RAG](../01-basic-theory/04-master/05-rag.md) works, how that differs from plain grep / search, where “memory” of code style lives, and — most important — how all of that is mixed into the prompt before an answer is generated.

See also [Context](../01-basic-theory/02-user/03-context.md) in Basic Theory.

## Why index a project?

An agent needs to get its bearings in a codebase fast: find entities, links, contracts, and examples. Indexing gives you:

- faster search over the project and less “noise”
- a way to pull out code fragments that are relevant to your prompt
- a base for explanations, refactors, and auto-documentation

Without a project index the agent has to either read files by hand or rely only on what you put in context.

## Kinds of indexing

**Local vector index.**  
Files are cut into pieces (**chunking**), embeddings are computed for each chunk, then everything is put in a vector store. Queries are encoded into a vector too and look for the nearest chunks by cosine similarity. Pros: it understands “meaning,” and it is robust to renames. Cons: the index needs warming up / updating, and chunks need careful tuning.

**Hybrid index (vector + symbolic).**  
On top of embeddings they add “ordinary” indexes: inverted (BM25), symbol maps (classes / functions), AST links (imports / calls), a dependency graph. That combination raises accuracy: keywords and paths filter candidates, meaning ranks them.

**Search without a local index (on-demand search).**  
The agent makes fast queries over the project via regex, ripgrep, built-in search, reads files “on demand,” and leans on navigation. Pros: no cost to build / sync an index, data is always fresh. Cons: less “understanding” of abstractions, worse on vague queries (“where do we validate the token?”).

In the industry you will meet both camps: with RAG / vectors and without them. The argument is about cost / benefit: a local index gives semantic navigation, and “simple” grep often wins on speed and predictability. And I write “often” on purpose: one of the best tools today for [agentic code generation](06-agentic-code-generation.md), **Claude Code**, uses “smart” grep and does **not** use RAG.

## What goes into an index

A good index usually contains:

- Code text chunks with bounds (lines / characters), file paths, language
- Embeddings for chunks, headings, comments, sometimes for diagrams and READMEs
- Metadata: module → package → service, branch, version, owners, tags
- A symbol table: classes / functions / variables, signatures, definition / use sites
- AST / CFG links: imports, dependencies, calls, references to schemas / migrations
- Documentation: ADRs / architecture notes, API contracts, example requests

All of that helps the retriever not just “find similar text,” but pull what the agent actually needs for the next action.

## How information is mixed into prompts

A typical pipeline before the model answers looks like this:

**1. Building the query**  
The agent turns your prompt + open files + history into one or more search queries (keywords, regexes, “semantic” questions).

**2. Fetching candidates**  
Search over the index (hybrid: symbols → vector) returns a set of chunks / files with relevance scores.

**3. Reranking and deduplication**  
Duplicates are removed, “different” chunks by meaning are chosen (MMR), priority goes to files near the ones you are editing.

**4. Assembling context**  
The agent builds a “context pack”: short extracts + quotes with paths and line ranges. Wiki / README / ADR notes are often added.

**5. Injecting into the prompt**  
Context is placed in the system / tool prompt with careful markup, for example:

```text
[SYSTEM]
You are an AI assistant in an IDE. Answer briefly, give precise patches.

[CONTEXT]
<<file: src/auth/jwt.ts#L18-L64>>
…quote…

<<file: docs/ADR-007-authz.md#decision>>
…decision extract…

[INSTRUCTIONS]
1) Analyze the context.
2) Generate a diff for the function verifyToken().
3) Update the tests and mention which files you change.
```

**6. Truncation by tokens**  
If context does not fit — the agent applies a truncation policy: first it drops low-relevance chunks, then shortens quotes, and only then cuts secondary prompt subsections.

A useful habit: give the agent explicit hints (“here is the directory,” “here is the technology,” “here is the place in the pipeline”), not another generic request “fix auth.”

## What “memory” is

Besides a code index, some tools use **memory** — a mechanism for storing information about you and the project that is always available to the agent, on any request. Sometimes this is also called **Rules** — a set of rules the agent must follow when doing tasks, and therefore must “remember” all the time. What can live in memory / rules:

- Guidelines and conventions, project style guides
- Project profile (stack, linters, formatters, bans, target library versions)
- Personal memory (answer style, favorite libraries, language of communication)

All of this is stored in tool-specific `.md` files inside the repo (`CLAUDE.md`, `GEMINI.md`, `AGENTS.md`, rules in `.cursor/rules`, and so on), or in the tool’s system files, or in the project workspace folder. Less often — in the cloud. Memory is usually filled on request in chat or by hand. Less often — automatically (the way it works in ChatGPT, for example).

Because every agentic tool invents its own names for memory files, the community is trying to standardize the process through the file **[AGENTS.md](https://agents.md/)**.

The initiative was started by OpenAI and later handed to the open-source **Agentic AI Foundation (AAIF)**. More on AAIF in [Model Context Protocol](07-model-context-protocol.md). Read more about AGENTS.md at [agents.md](https://agents.md/).

## In short

- There are editors / agents that do full project indexing (including vector search) and automatically mix found chunks into prompts.
- There are tools that do not use a local index and instead do on-demand search over the project and read files as needed. That is fine, and that approach has its own pluses.

The main thing is to understand how **your** tool works and adapt the workflow: either “warm up” the index and keep file docs, or learn to write precise search queries and add the right files to context. Whether your IDE supports project indexing is covered in [AI-first IDE](21-ai-first-ide.md).

Next we will talk about advanced techniques for working with context, which will let you work with code more efficiently and productively. That is the next chapter: [Advanced context enrichment](10-advanced-context.md).

## Related club content

- 2025.04.09 / Meetup on CodeAlive — RAG over a codebase at full power / Rodion Mostovoy and Ivan Biryuk
- 2025.03.11 / Memory for agentic applications / Mikhail Savchenko
- 2024.10.24 / Building RAG over a codebase / Dmitry Andrienko
