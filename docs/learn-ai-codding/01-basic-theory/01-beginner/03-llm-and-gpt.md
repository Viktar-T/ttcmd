# LLM and GPT

**Source (RU):** LLM и GPT  
**Path:** Home → Basic Theory → Level “Beginner” → LLM and GPT  
**Published:** ~4 weeks ago

## Contents

- Large Language Models
- Transformers
- GPT
- Further reading
- Interactive visualizers

Now let’s talk about one of the best-known families of generative models — Large Language Models (LLMs).

## Large Language Models

Large Language Models (LLMs) are trained on huge amounts of text. Their job is to understand and generate human language (Natural Language Processing, NLP). That is why they can answer questions, summarize text, translate languages, or simply hold a conversation. Services such as ChatGPT, Claude, or Gemini all run an LLM under the hood.

## Transformers

The key breakthrough behind modern LLMs is the **transformer** architecture.

Introduced in 2017, transformers changed the rules of the game with the **attention mechanism**. Instead of processing words in order, transformers focus on the important parts of the input — wherever those parts are. That helps them understand long, complex sentences and generate high-quality text. Transformers and attention became the foundation of many modern language models.

The attention architecture became widely known through the paper [“Attention Is All You Need”](https://arxiv.org/abs/1706.03762), written by Google researchers in 2017. Three years earlier, in 2014, attention had already been introduced in [“Neural Machine Translation by Jointly Learning to Align and Translate”](https://arxiv.org/abs/1409.0473) by Yoshua Bengio, Dzmitry Bahdanau, and Kyunghyun Cho.

## GPT

One of the best-known implementations of the transformer architecture is **GPT** — short for Generative Pre-trained Transformer. The architecture was proposed by OpenAI in 2018.

The idea is simple: first pre-train the model on huge text datasets so that it understands language in general (this produces a so-called **base model**). Then fine-tune it for specific tasks such as conversation, question answering, or writing. GPT models are used in tools like ChatGPT, and they follow the transformer principles discussed above.

## Further reading

I recommend watching Andrej Karpathy’s video [“Deep Dive into LLMs like ChatGPT”](https://www.youtube.com/watch?v=7xTGNNLPyMI). It explains the structure of GPT and LLMs in general very well. Karpathy is a former OpenAI co-founder, has a PhD, and is a well-respected AI educator.

## Interactive visualizers

Transformer architecture is hard to understand from a description alone — it is much easier to see data pass through the network once. Luckily, there are excellent interactive visualizers for that:

- [**LLM Visualization**](https://bbycroft.net/llm) by Brendan Bycroft — a 3D visualizer with a detailed walkthrough of several transformers: GPT-2 small, nanoGPT, GPT-2 XL, and GPT-3. You can literally “fly” inside the model and see what happens at each layer.
- [**Transformer Explainer**](https://poloclub.github.io/transformer-explainer/) — a visualizer of the path tokens take through a transformer. You can type any phrase by hand and watch how the network parses and processes it.
- [**CNN Explainer**](https://poloclub.github.io/cnn-explainer/) — a visualizer of how convolutional neural networks work.
- [**Diffusion Explainer**](https://poloclub.github.io/diffusion-explainer/) — a visualization of diffusion models, with a detailed explanation of each mechanism.
- **Tensor Trace** by AlphaXiv — a visualization of how LLaMA 3.1 works.
- [**RL Playground**](https://www.alphaxiv.org/labs/rl-playground) by AlphaXiv — a game-like visualization of reinforcement learning.
- [**Interactive Tools for ML, DL and Math**](https://github.com/Machine-Learning-Tokyo/Interactive_Tools) — a collected repo with many interactive visualizations of machine learning, deep learning, and math concepts.

If you are just starting out, begin with Transformer Explainer: it is the most visual and needs no prior setup. After that, go into the 3D LLM Visualization for the details.
