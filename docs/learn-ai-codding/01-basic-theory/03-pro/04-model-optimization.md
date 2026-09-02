# Model optimization

**Source (RU):** Оптимизация моделей  
**Path:** Home → Basic Theory → Level “Pro” → Model optimization  
**Published:** ~4 weeks ago

## Contents

- Inference
- Quantization
- Distillation
- Pruning
- Multi-Token Prediction (MTP)
- Inference-time compute vs test-time compute

## Inference

**Inference** is applying a trained model to new data to get predictions or results. It is the third stage of the lifecycle, after training and deploying the model. It can run on-device or on remote compute, depending on performance needs and available resources. In short: it is the model’s **runtime**.

## Quantization

**Quantization** lowers the numerical precision of the model’s weights (for example from 16-bit to 8-bit or 4-bit). That reduces memory use and speeds up inference. In essence it is a search for a balance: keep as much of the original data as you can, while throwing away information that does not much affect the results. By default most models store parameters as 16-bit floating point (**fp16**). Special methods can drop that to 8 and 4 bits — **q8** and **q4**. Now you know what those numbers in a model name mean.

When you compress a model, answer quality drops, but resource use drops a lot.

How? For the model to run, it must be loaded into memory (VRAM or RAM, depending on software and hardware). Suppose we have a 13B-parameter model at fp16. 16 bits per parameter = 2 bytes per parameter. So we need 13,000,000,000 × 2 bytes = **24.2 GB** of memory. That is too much for an average laptop, so people convert models to q8 and q4: then the model takes **12.1 GB** or **6.1 GB**, which is much better — you can even try running it on a phone.

## Distillation

**Distillation** is training a smaller model (the **student**) to imitate a larger model (the **teacher**). The goal is to transfer knowledge efficiently, keeping accuracy while cutting size and compute. In other words, a large, complex “teacher” is used to train a smaller, faster “student.” The student should learn from the teacher and reach similar performance with less compute and memory. The teacher passes on not only final answers, but also “soft” probabilities or intermediate representations, so the student better understands how to make decisions.

Imagine complex software with many features, and you need a lightweight version for mobile. Instead of rewriting everything from scratch, you analyze which parts of the code and functionality matter most and optimize those for the new app. **Knowledge distillation** in that picture is transferring the key elements and logic from the original app into a new, more efficient one.

## Pruning

**Pruning** is removing redundant or less important parts of the model, such as neurons or low-impact weights. The goal is to shrink the model, cut compute, and speed up inference while keeping acceptable performance. Pruning can include analyzing how important weights are and setting a threshold below which they are removed.

## Multi-Token Prediction (MTP)

A classical LLM is autoregressive: in one pass it predicts exactly one next token, appends it to the text, and repeats. **Multi-Token Prediction (MTP)** is a technique where the model learns to predict several next tokens in one step.

That has two effects:

- **Better training** — the model gets a denser learning signal, because it has to “look ahead” and plan the continuation of the text, not only guess the nearest token.
- **Faster inference** — the tokens predicted ahead of time are used as a draft, in the spirit of **speculative decoding**: the model quickly sketches several tokens, then checks them in one pass. If they match, you get several tokens for the price of one step.

DeepSeek-V3 popularized the technique, and MTP modules are showing up more often:

- **Gemma 4** — Google uses MTP as one of the family’s key optimizations.
- **MiMo v2.5 Pro** — a Xiaomi model that uses MTP to speed up inference.

MTP is reaching local runs too: the community already posts GGUF builds with an MTP module, for example **Qwen3.6-27B-MTP**.

If you see the suffix **-MTP** in a model name, that is it: a build that keeps the multi-token prediction module to speed up generation.

## Inference-time compute vs test-time compute

**Inference-time compute** is how much compute the model uses when generating answers after training. It includes things like memory use, processing time, and number of operations. It is a general engineering term, especially when optimizing models for cost, speed, or hardware efficiency. Every time you use a model — for example asking ChatGPT a question — inference-time compute is the power spent to give you an answer.

**Test-time compute**, on the other hand, is used more in research. It describes how much compute the model uses during **evaluation**, or when processing a specific input. The focus is often on how compute varies with task difficulty. Some modern models can dynamically use more compute for hard questions and less for simple ones (the core of the model’s thinking process). This idea is especially relevant in advanced reasoning, adaptive inference, and efficiency research.

In short:

- **Inference-time compute** — the overall cost of running the model.
- **Test-time compute** — how much compute the model spends on a specific input for a specific task.

(The [Reasoning](../01-beginner/06-reasoning.md) lesson pointed here as “Model efficiency.”)
