# Prompting techniques

**Source (RU):** Техники промптинга  
**Path:** Home → Basic Theory → Level “Master” → Prompting techniques  
**Published:** ~4 weeks ago

## Contents

- Prompt engineering
- Advanced prompting techniques
- Meta-prompting
- Further reading
- Related club content

Related lesson in Basics of Programming with AI: [Prompt / context engineering](../../02-programming-with-ai/02-prompt-context-engineering.md).

## Prompt engineering

**Prompt engineering** (prompting) is the art of writing prompts that steer the model toward the most accurate, useful, or creative answers.

A simple but effective structure for a good prompt includes:

- **Role (Actor)** — who is the model pretending to be?
- **Task** — what do you want it to do?
- **Output format** — what should the answer look like?
- **Constraints** — any limits, styles, or rules to follow?

General rule: the more **relevant context** you give, the better the answer.

Example:

```text
You are a recruiter at a tech company.
Write a short, friendly LinkedIn message
to a backend developer inviting them to apply.
Stay within 600 characters.
```

## Advanced prompting techniques

There are many prompting techniques that can point the model toward the right style and format, cut hallucinations, and improve accuracy.

**Chain of Thought (CoT)** — improves reasoning by asking the model to explain its thinking step by step before giving the answer. Especially effective for math and logic. For example, when solving a math problem the model first explains each intermediate step, then gives the final answer, which lowers the chance of calculation errors.

*GIF on the platform: `7.gif` — paste it here if you want it in the local notes.*

**Shot prompting** — add one or more examples (**shots**) of the desired behavior to the prompt. The goal is to show the model how it should answer, which raises accuracy.

Types:

- **Zero-shot prompting:** no examples; the model answers from its internal knowledge only.
- **One-shot prompting:** exactly one example, which gently steers the final result.
- **Few-shot prompting:** several correct examples, giving broader context and patterns to copy. Especially useful when the task is unusual or the model may be unsure how to phrase the result.

*Screen recording on the platform: `Screen Recording 2025-07-29 at 17.44.36.gif`.*

Example of a one-shot prompt:

```text
Task: Solve the following math problem and explain your reasoning.

Example:
Q: Sarah has 3 apples. She buys 5 more. How many apples does she have now?
A: 3 + 5 = 8. Sarah has 8 apples.

Now try:
Q: Anna reads 10 pages a day. How many pages will she read in 7 days?
A:
```

**Self-Consistency** — the model generates several answers to the same question and picks the most frequent or the most logically consistent one, which improves reliability.

**ReAct (Reason + Act)** — combines inner reasoning with tool use. The model thinks through the problem, then talks to APIs or tools to gather more information, then finalizes the answer.

**Instruction prompting** — clear, directive instructions (for example “explain before you answer” or “answer as a medical expert”) to set expectations, tone, or structure.

More on all of these approaches: [PromptingGuide.ai](https://www.promptingguide.ai/).

## Meta-prompting

**Meta-prompting** is asking the model to help improve your original prompt.

Example meta-prompts:

- “Improve the following prompt for clarity and specificity.”
- “Rewrite this prompt so it generates more creative answers.”
- “What is missing from this prompt?”

This is especially useful when you are building prompt libraries, adapting for non-technical users, or debugging unpredictable answers.

## Further reading

- Large prompting knowledge base: [PromptingGuide.ai](https://www.promptingguide.ai/)
- Deeper dive: [A Complete Guide to Meta Prompting](https://www.prompthub.us/blog/a-complete-guide-to-meta-prompting)
- Prompt and context engineering lesson in Basics of Programming with AI: [Prompt / context engineering](../../02-programming-with-ai/02-prompt-context-engineering.md)

## Related club content

- 2025.08.27 / Workshop meetup on Context Engineering / Mikhail Savchenko
