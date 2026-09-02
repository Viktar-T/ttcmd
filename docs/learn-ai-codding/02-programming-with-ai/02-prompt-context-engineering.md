# Prompt / context engineering

**Source (RU):** Промпт/контекст-инженерия  
**Path:** Home → Basics of Programming with AI → Prompt / context engineering  
**Published:** ~4 weeks ago

## Contents

- Refresh from Basic Theory
- On prompt engineering
- Further reading
- Related club content

Before you dive into the practice of programming with AI, it is important to learn how to talk to the model effectively. That skill is called **prompt engineering** or **context engineering**.

## Refresh from Basic Theory

In the [Basic Theory](../01-basic-theory/README.md) course we already covered a lot of prompt engineering:

- Lesson [Prompt](../01-basic-theory/02-user/01-prompt.md) — start here if it is not quite clear what a prompt is. It introduces the basic idea of giving instructions to a language model.
- Lesson [Context](../01-basic-theory/02-user/03-context.md) — this article goes deeper into context and context engineering. If you have ever wondered why two almost identical prompts give completely different answers, this is where you will find the explanation.
- Lesson [Prompting techniques](../01-basic-theory/04-master/01-prompting-techniques.md) — a practical walkthrough of commonly used prompting strategies such as **role prompting**, **chain-of-thought prompting**, **multi-shot examples**, and others. It also covers **meta-prompting** in detail.

## On prompt engineering

**Prompt engineering** is the process of designing, formulating, and refining prompts for LLMs and other GenAI models so that you get more useful, accurate, complete, and relevant answers. It is not just typing into a chat — it is writing instructions on purpose.

Modern prompt-engineering techniques are mostly focused on manipulating both the model’s context and the business-domain context; that is why this practice is often called **context engineering**.

Main principles of good prompt engineering:

- **Be precise** — describe the task clearly. Make sure the model understands the requirements, has access to relevant context, and knows the desired output format.
- **Structure the prompt** — use lists, sections, and formatting so the model can process the instructions more effectively.
- **Provide context** — the more relevant information you include, the better the model can adapt its answer.
- **Iterate** — try different wording for the same task. Fine-tune prompts based on how the model behaves in different tools or interfaces.
- **Use meta-prompting** — sometimes you can even ask the model to help improve your prompt. That is called **meta-prompting**, and it is a surprisingly powerful technique.

Prompt engineering / context engineering is more of an art than a checklist. It is a key part of productive work with AI, and one of the fastest-moving knowledge areas in this field. Whole courses, blog posts, and even research papers are devoted to it.

## Further reading

We cannot fully cover prompt engineering in one post. These resources — together with the foundational theory from our course — will help you get confident with AI tools.

- [Prompt Engineering Guide](https://www.promptingguide.ai/) — a comprehensive resource with real examples and strategies
- [Gandalf](https://gandalf.lakera.ai/) — a game that teaches you to write prompts by “hacking” an AI
- [A complete guide to context engineering (DeepWiki)](https://deepwiki.com/davidkimai/Context-Engineering)
- [OpenAI Prompt Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Claude Prompt Engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- [Gemini Prompting Strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies)
- [Mistral Prompt Guide](https://docs.mistral.ai/inference/prompting)
- [Google & Kaggle Prompt Engineering Guide](https://www.kaggle.com/whitepaper-prompt-engineering)
- [OpenAI GPT-4.1 Prompting Guide](https://developers.openai.com/cookbook/examples/gpt4-1_prompting_guide)
- [Anthropic Extended thinking tips](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking)
- [Prompt Tuning Playbook (GitHub)](https://github.com/varungodbole/prompt-tuning-playbook)
- [Ollama’s Interactive Prompt Engineering Tutorial](https://github.com/ivanfioravanti/prompt-eng-ollama-interactive-tutorial)

## Related club content

- 2025.08.27 / Workshop meetup on Context Engineering / Mikhail Savchenko
