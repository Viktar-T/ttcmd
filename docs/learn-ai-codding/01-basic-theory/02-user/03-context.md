# Context

**Source (RU):** Контекст  
**Path:** Home → Basic Theory → Level “User” → Context  
**Published:** ~4 weeks ago

## Contents

- What context is
- Context size / context window
- Going out of context
- Output context-window limit
- Context engineering
- Related club content

When you talk to an LLM, it cannot remember everything forever. It only sees input and output inside a limited **context** — the amount of data it can work with effectively, without forgetting much or getting confused.

Context includes:

- all of your prompts
- all of the model’s replies
- any files, instructions, or code that were included in those prompts and replies

The model does not “remember” in the traditional sense — each time it rereads the entire dialogue history to generate a new answer, so it has no state: it is essentially **stateless**. That is why it matters to keep prompts concise and include only relevant information. Working with information inside the context, the LLM can answer questions and do tasks more accurately and efficiently. The basic mechanism behind context is the **attention mechanism** (which we already covered in this chapter).

## Context size / context window

**Context size** (the **context window**) is the maximum number of tokens the model can process at once.

If a model has a context window of 128 thousand tokens (128k tokens), it can work effectively with about 128,000 tokens across the whole dialogue. A larger context window means the model can handle more data in the conversation. But once you hit the limit, older parts of the conversation may be cut off — which brings us to the next point.

## Going out of context

When the size of your dialogue with the model exceeds the context window, that is called going **out of context**. The model then simply truncates the beginning of the dialogue down to what still fits in the window. There are also more optimal ways to “compress” a dialogue, for example shortening part of it through summarization, and so on.

The important part: if the truncated or compressed chunks contained important details, the model will either know nothing about them, or its knowledge will be distorted, and it will start making things up — that behavior is called **hallucinating**. You may notice that answers suddenly become vague, confused, or outright wrong. That is not because the model broke — it simply “forgot” some information because you went out of context.

## Output context-window limit

Every model also has a maximum **output limit** (`output limit`, `output token limit`, `max tokens to sample`, and similar names) — the number of tokens it can generate in a single reply.

For example, even if the model’s context window is 100k tokens, replies are often capped, say at 16k tokens at a time. That means long answers can be truncated or compressed. So it is especially important to give the model clear instructions about output format.

When you work through the API, you can usually control the output window size with request parameters such as `max_tokens`.

## Context engineering

If prompt engineering is the skill of writing better prompts, **context engineering** is the skill of managing data effectively across the whole dialogue with the model.

Skills a context engineer should have:

- a good understanding of the model’s architecture and its limits (model size, context-window size, and so on)
- knowing which data belongs in context and which does not (domain understanding of the task)
- compressing dialogues well (dialogue summarization)
- mixing key facts back into context so the model does not forget them
- structuring the dialogue — essentially applying prompt-engineering approaches and techniques

Think of it as organizing the model’s short-term memory. Clean, well-managed context leads to more accurate and relevant answers — especially on long or technical tasks.

Context engineering becomes especially powerful for:

- working with large amounts of data (large codebases, large text corpora, and so on)
- building agentic AI systems
- building AI systems with long-term memory
- building systems with multi-step workflows and complex operating scenarios
- connecting external data sources (for example RAG, which we will cover in later chapters)

## Related club content

- 2025.08.27 / Workshop meetup on Context Engineering / Mikhail Savchenko
- 2025.03.11 / Memory for agentic applications / Mikhail Savchenko
- 2024.08.01 / Obsidian + LLM / Igor Nesterenya
