# Model types and structures

**Source (RU):** Типы и структуры моделей  
**Path:** Home → Basic Theory → Level “Pro” → Model types and structures  
**Published:** ~4 weeks ago

## Contents

- Base / Instruct / Chat
- How to tell the type from the name
- Merged models
- Mixture of Experts (MoE)

## Base / Instruct / Chat

**Base / Chat / Instruct** classifies models by training stage and purpose.

A **base model** is pretrained on large datasets without being tuned for specific tasks. It is not optimized for following particular instructions or tasks.

An **instruct model** is a base model further trained on instruction–response pairs. That extra training helps it understand and follow user instructions, which makes it more useful for apps that need to follow directions.

A **chat model** is an instruct model specially trained for dialogue. It is trained on data with conversational interactions, so it can keep conversation context, answer questions, and produce fitting replies when talking to a user. Chat models are optimized for chatbots and assistants.

## How to tell the type from the name

In model catalogs (for example on Hugging Face) the type is usually encoded in a name suffix. Compare two versions of the same model:

- **google/gemma-4-31B** — no suffix: this is a **base** model. You work with it via completion-style prompts (continue the text), and there is no guarantee it will behave correctly as a chat assistant. This kind of model is a foundation for fine-tuning, research, and adapting to your own data.
- **google/gemma-4-31B-it** — the **-it** suffix means **instruction-tuned**: the same architecture, but further trained to follow instructions and hold a dialogue. On Hugging Face such models are tagged **conversational**, and usage examples go through `/v1/chat/completions` with `user` and `assistant` roles.

Besides `-it`, you will see **-instruct** (for example `Qwen2.5-Coder-32B-Instruct`), **-chat**, and **-base** when the author explicitly marks the base version.

Practical rule: for chat, assistants, and most applied work, take the version with `-it` / `-instruct` / `-chat`. Take the base version only if you plan further training or raw text completion.

## Merged models

**Merged models** combine several models into one. That is possible when the models share a common base (a base model) and/or a compatible weight structure. The result is a model that inherits the strengths of each source model.

## Mixture of Experts (MoE)

**MoE** (Mixture of Experts) is an architecture where the model consists of several specialized submodels (**experts**), trained on different parts of the data or different tasks. For each input prompt a **gating** (routing) mechanism decides which expert is best suited to handle that example.

It is like a plugin system or a strategy pattern in programming: depending on the type of task, you pick the most suitable algorithm or module.

A well-known example is **Mixtral 8x7B**. The name encodes the expert layout: 8 experts, each with 7B active parameters. The total parameter count is **not** 56 billion (it can be less), because some parameters belong to shared layers, not to individual experts. You may also see names like **MoE (300B/33B)**, meaning the model has 300 billion parameters in total, and is made of experts of 33 billion parameters each.
