# Training and fine-tuning

**Source (RU):** Обучение и fine-tuning  
**Path:** Home → Basic Theory → Level “Pro” → Training and fine-tuning  
**Published:** ~10 months ago

## Contents

- Pre-training
- Fine-tuning
- Reinforcement Learning from Human Feedback
- PEFT / LoRA / QLoRA

**Model training** is a long, very resource-heavy process of training a model on a huge, pre-prepared dataset. It is one of the most expensive stages of building a model, along with collecting the dataset. It consists of several key stages: **pre-training** and **fine-tuning**.

## Pre-training

**Pre-training** is the first phase of training a model on a broad dataset so it can learn general patterns. This stage gives the model a basic understanding of language or other modalities. Pre-training needs enormous compute (hundreds of millions of dollars in equivalent electricity used by the hardware) and a large amount of data, but it is necessary for high performance.

## Fine-tuning

**Fine-tuning** is training a pretrained model on a smaller, task-specific dataset. This process helps the model specialize in certain domains or use cases. It lets you reuse foundation models without training from scratch.

Fine-tuning does not always need significant compute, so any company can potentially use it. High-quality fine-tuning, however, needs a high-quality dataset. It is often simpler not to further-train the model itself, but to improve the system around an existing model.

## Reinforcement Learning from Human Feedback

**RLHF** (Reinforcement Learning from Human Feedback) is a method of further-training a model from human feedback. It involves generating several answer variants, ranking them by people, and training the model to prefer the highly rated answers. This process became key to making safer and more useful models.

## PEFT / LoRA / QLoRA

These methods cut compute cost and make training more accessible.

**PEFT** (Parameter-Efficient Fine-Tuning) updates only a small part of the model’s parameters, essentially “freezing” the rest. Instead of updating all weights, PEFT focuses on adapting certain layers or components, which lowers compute and memory needs and still adapts the model to a specific task.

**LoRA** (Low-Rank Adaptation) is a PEFT technique introduced in 2021. Instead of changing all the neural net’s weights, LoRA adds extra low-rank matrices to the existing weights, which reduces compute and memory.

Imagine working on a large application and wanting to change it without touching all the code. LoRA lets you add a small module or patch (a **low-rank adapter**) that adapts the system’s behavior to new requirements. That makes retraining faster and cheaper, while keeping the original model’s core functionality.

**QLoRA** was introduced in 2023. It combines LoRA with quantization, so you can fine-tune large models with less memory. It retrains LLMs efficiently by quantizing them to 4-bit precision and using low-rank adapters. Quantization shrinks memory by lowering the bit depth of the numbers the model uses, and LoRA ensures the model can be adapted to new tasks without changing all of its parameters.
