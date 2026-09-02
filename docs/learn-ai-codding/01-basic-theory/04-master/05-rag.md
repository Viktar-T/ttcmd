# Retrieval-Augmented Generation (RAG)

**Source (RU):** Retrieval-Augmented Generation (RAG)  
**Path:** Home → Basic Theory → Level “Master” → Retrieval-Augmented Generation (RAG)  
**Published:** ~1 month ago

**RAG** (Retrieval-Augmented Generation) is a technique that supplements an LLM with external knowledge. Instead of relying only on what the model was trained on, RAG retrieves relevant documents or context from an external database (usually a vector database) and passes them into the model as part of the prompt.

*Image on the platform: `image.png` (from Towards AI) — paste it here if you want it in the local notes.*

Typical architecture:

1. User query →
2. Search for relevant documents in a vector DB (for example Pinecone) →
3. Retrieve the top-N documents →
4. Merge them with the query in the prompt →
5. The model generates an answer using that extra context

This lets models:

- answer domain-specific questions (for example from internal docs)
- keep answers up to date (using fresh knowledge)
- reduce hallucinations
- build scalable knowledge-based applications

RAG is especially important in corporate AI systems, bots, and apps where accuracy and factual completeness of answers are critical.

Related lesson in Basics of Programming with AI: [Indexing and memory](../../02-programming-with-ai/09-indexing-and-memory.md).

## Related club content

- 2025.10.15 / Workshop on RAG basics and Dify’s new Knowledge Pipeline / Mikhail Savchenko
- 2025.04.09 / Meetup on CodeAlive — RAG over a codebase at full power / Rodion Mostovoy and Ivan Biryuk
- 2024.10.24 / Building RAG over a codebase / Dmitry Andrienko
