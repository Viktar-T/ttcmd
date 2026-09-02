# Reasoning

**Source (RU):** Рассуждение  
**Path:** Home → Basic Theory → Level “Beginner” → Reasoning  
**Published:** ~4 weeks ago

## Contents

- What is reasoning?
- The test-time compute idea
- Summary

So far we have seen that generative AI can generate, see, and even hear. But can it think?

This is where **reasoning** comes in — the ability of models to go beyond pattern matching and actually make logical decisions. We often talk about **thinking models**: systems that can reason step by step, solve problems, follow logical chains, and adapt to new situations. There is research showing that model reasoning can go well beyond the training dataset.

## What is reasoning?

In simple terms, reasoning is when a model does not just react — it analyzes. It connects ideas, breaks tasks into parts, and explains why it gives a particular answer. That is very different from how early models worked, which simply completed the input text based on patterns.

For example, a model with reasoning can:

- Solve math word problems
- Follow multi-step instructions
- Explain cause and effect
- Debate, argue, or think through uncertainty

Older models (such as GPT-2) were mostly “completion engines” — they guessed what comes next in a sentence. They were good at surface fluency, but not at deep understanding. Modern models are built to handle tasks that need deep understanding, and long tasks that can take tens of minutes or even hours to solve.

Technically, reasoning shows up as a preliminary “conversation” the model has with itself, before it answers the user. Models use techniques such as **Chain of Thought**, **self-reflection**, or **tool use** (calling external tools) to give better answers. Reasoning models also have a different training process: they are literally taught to reason.

So reasoning is a big leap forward in model performance and reliability. The trade-off is longer response time and higher compute cost.

## The test-time compute idea

One of the technical ideas behind reasoning is **test-time compute**.

This term describes how much compute the model uses when answering your question. Traditional models use a fixed amount of power to generate an answer. Newer models increase compute dynamically — they think more deeply if the task is hard.

It is like a person who spends more time on a difficult puzzle than on a simple question. More test-time compute = more internal steps = deeper reasoning = a better answer.

You will learn more about test-time compute in [Model optimization](../03-pro/04-model-optimization.md) at Level 3 (Pro).

## Summary

Reasoning turns models from passive respondents into active problem solvers. It is one of the signs of growing intelligence in LLMs — and today it is the most important mechanism that makes models smarter.

This does not mean AI has consciousness or self-awareness. It does mean we are entering an era where models can handle more complex, logical, and high-stakes tasks.

Next we will talk about the foundation that makes all of this possible — foundation models.
