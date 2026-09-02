# Model formats

**Source (RU):** Форматы моделей  
**Path:** Home → Basic Theory → Level “Master” → Model formats  
**Published:** ~10 months ago

When you work with open models you will run into various file formats. These formats define how the model is stored, loaded, and executed, depending on infrastructure, programming language, and security requirements.

Let’s go through them.

Models built with **PyTorch** are serialized as **`.pt`** or **`.pth`**. Serialization is often done with Python’s **Pickle** library, which can contain and run arbitrary Python code on load — a potential security risk. So be careful when loading models from untrusted sources.

**TorchScript** is a model format and a PyTorch serialization method that does **not** include arbitrary Python code. A TorchScript model can be loaded and run without access to the original Python source, which makes it safer than classic PyTorch checkpoints.

A **checkpoint** is a file that stores the model’s state (its weights) and, optionally, the optimizer state, so training can resume without starting from scratch.

**SafeTensors** is a relatively new serialization method. While standard PyTorch checkpoints can include arbitrary code, SafeTensors stores only weights and metadata, which prevents unwanted commands from running on load. That makes the format safer and often faster to load thanks to memory-mapped files.

**Hugging Face (Transformers)** is not so much a separate format as a **layout** for storing a model. In a Hugging Face model repo you will find weights as PyTorch `pytorch_model.bin`, SafeTensors `model.safetensors`, or another supported format, plus model config `config.json` and tokenizer files `tokenizer.json`, `vocab.txt`, `merges.txt` — which makes the model ready to use with the Transformers framework. That ecosystem makes integration easier, and further conversion to ONNX or TensorFlow SavedModel when needed.

**GGUF** (GPT-Generated Unified Format) is a format from the llama.cpp team. It is meant for running models on **CPU**, which widens the circle of users who do not have powerful GPUs.

**GGML** is GGUF’s predecessor and is now considered obsolete.

**MLX checkpoints** — models trained or converted into Apple’s **MLX** framework are saved in a native format optimized for Apple Silicon. These checkpoints support lazy loading, efficient execution on CPU/GPU/NPU, and fast experimentation on Macs. MLX includes tools to convert models from Hugging Face or ONNX into its own format for optimized local inference.

**JAX** is a specialized format (or rather a set of practices and tools) for Google’s JAX framework. JAX model weights are usually in a format compatible with **Flax**, often as **msgpack** (a binary serialization format meant as an efficient alternative to JSON) or as NumPy arrays. Google ships some of its models in this form.

**ONNX** (Open Neural Network Exchange) is an open standard for representing models, supported by various frameworks (PyTorch, TensorFlow, Keras, and others). ONNX models can run on **ONNX Runtime**, which is optimized for different hardware (CPU, GPU, TPU, and so on). It is a universal format that makes it easier to move models between ecosystems.

Choosing the right model format depends on the deployment environment:

- Use **TorchScript** or **ONNX** for production.
- Choose **SafeTensors** for safe sharing in the community.
- Prefer **GGUF** if you want to run the model on CPU devices, for example a Raspberry Pi.
- Choose the **MLX** format for local deployment on Apple hardware.
- Use **Transformers.js** when deploying AI entirely in the browser.

Understanding model formats helps close the gap between research prototypes and real deployment.
