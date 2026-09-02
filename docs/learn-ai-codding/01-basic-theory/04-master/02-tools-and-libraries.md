# Basic tools and libraries

**Source (RU):** Базовые инструменты и библиотеки  
**Path:** Home → Basic Theory → Level “Master” → Basic tools and libraries  
**Published:** ~10 months ago

## Contents

- Development tools
- Core libraries

To build real applications with generative AI under the hood, you need more than just a model. Below are popular tools and libraries that make up the core ecosystem.

## Development tools

These tools and libraries make it easier to build, debug, visualize, and deploy LLM-based applications.

**Vector database** — a specialized store optimized for multidimensional vectors and embeddings. Each vector can be a numeric interpretation of the original data: text, images, audio, or video. These databases are a good fit for semantic search, nearest-neighbor search (k-NN), and working with embedding matrices — relevant for meaning-based search, recommendations, clustering, and similar tasks. Examples: Pinecone, Weaviate, Chroma, and others.

**Jupyter Notebook** — an interactive web development environment where you write code in one document (a notebook), run it in pieces, see results and visualizations right under the cells, and comment and document the process in the same file with Markdown. Notebooks are saved as `*.ipynb`. Widely used in research, data analysis, and machine learning because code, data, and charts sit together easily. There are IDE extensions that add notebook support.

**Hugging Face** — a platform for sharing models, datasets, and tools in machine learning and NLP. Think of it as a specialized “GitHub for ML and DL engineers.” It holds hundreds of thousands of models and datasets, plus demo apps (Spaces), which makes it easier to access new AI products, reuse them, and integrate them into your own projects.

**llama.cpp** — a high-performance C++ library for LLM inference without a dedicated GPU. It can run on CPU, which makes models available on a wide range of devices, including laptops and servers without expensive GPUs. It also provides tools for weight quantization, which shrinks models and improves their performance.

**Pandas** — the main tool for manipulating and analyzing data in Python. It makes tabular data easy to work with and simplifies cleaning, transforming, and preparing data for training. Built on top of NumPy (see below).

**Matplotlib, Seaborn, Plotly** — data visualization tools. Matplotlib is low-level and flexible; Seaborn is a high-level layer on Matplotlib with better defaults and less boilerplate; Plotly is interactive charts and dashboards right in Jupyter.

**MLflow, Weights & Biases, Neptune.ai** — platforms for tracking experiments, metrics, and parameters. They help you follow training progress, compare model versions, and organize the experimental process.

**DVC (Data Version Control)** — a tool for versioning data and models, integrated with Git. Helps reproduce experiments and track data changes as the project evolves.

**Streamlit, Gradio** — frameworks for quickly building interactive apps and model demos without going deep into web development. They let you present results clearly to clients or colleagues.

**Kubeflow, Airflow, Dagster** — platforms for building and automating ML pipelines. They help turn training, validation, deployment, and monitoring into a coherent, reproducible chain.

**Labeling tools (Label Studio, CVAT)** — tools for annotating data. Especially relevant when you need datasets for computer vision, NLP, and other training tasks.

## Core libraries

These are the fundamental libraries and frameworks for numerical computing and deep learning. They let you create, train, fine-tune, and deploy models — from lightweight prototypes to production-grade systems.

**TensorFlow** — a Google framework for building, training, and running ML and deep-learning models. Written in Python and C++ for performance. Has extensions for mobile (**LiteRT**, formerly TensorFlow Lite) and the web (TensorFlow.js), which makes it a cross-platform option.

**PyTorch** — a popular Python framework from Facebook (now Meta). Known for an intuitive API, flexibility, and easy prototyping. It started among researchers and is now widely used in industry. A good fit for fast experiments and then shipping to production.

**NumPy** — the fundamental Python library for multidimensional arrays and matrices. Provides a wide range of math functions and is the base for many deep-learning libraries, with efficient low-level data operations.

**Keras** — a high-level Python library for quickly building neural nets by combining ready-made modules (layers). It was originally backend-agnostic and could run on TensorFlow, Theano, and CNTK. It is now most tightly integrated with TensorFlow, but there are efforts to support PyTorch and JAX as well.

**JAX** — a Google framework for numerical computing and ML. Its distinctive features are automatic differentiation (Autograd) and the **XLA** compiler for speeding up compute on GPU and TPU. Often used in research and generative-model work because of performance and convenient abstractions.

**Flax** — a high-level library for JAX that simplifies defining neural-net architectures, optimization, and training. Provides convenient abstractions that speed up building modern ML models.

**Open Neural Network Exchange Runtime (ONNX Runtime)** — a cross-platform engine for inference and for accelerating training of models built in different frameworks (PyTorch, TensorFlow, Keras, and others). Developed by Microsoft; it runs on various hardware and OSes, which simplifies portability and scale.

**Transformers** — a popular Python library from Hugging Face with a unified interface for a wide range of models. Supports PyTorch, TensorFlow, and JAX, and is integrated with Hugging Face. Lets you quickly fine-tune models for specific tasks and use various optimizations, tokenizers, and helpers.

**Transformers.js** — a JavaScript implementation of key Transformers features. Lets you run inference in the browser using WebAssembly (WASM) and ONNX Runtime, or WebGPU (in the future). That opens the door to running models without a server — fully client-side ML such as summarization or answer generation in the user’s browser.

**MLX (Machine Learning eXplore)** — a high-performance ML framework from Apple, optimized for Apple Silicon. Offers a NumPy-like API with lazy evaluation, automatic differentiation, and execution on GPU/NPU/CPU. MLX supports converting models from Hugging Face (for example LLaMA, Mistral) and is a good fit for running LLMs locally on Apple devices.

**MXNet** — a multi-language framework under the Apache umbrella. Widely used by Amazon; supports a hybrid frontend (imperative and declarative), scales well, and can run efficiently in distributed settings.

**PaddlePaddle** (PArallel Distributed Deep LEarning) — Baidu’s deep-learning framework, heavily used in China. Offers a rich industrial toolkit and integration with Baidu’s ecosystem. Supports distributed training and fast model build-and-deploy.

**MindSpore** — Huawei’s framework, aimed at cloud and mobile, plus data protection (“AI for All”). Offers tools for distributed training and optimization across a wide range of hardware.

**Theano** — one of the first deep-learning frameworks, from the University of Montreal. It is no longer officially developed and has given way to more modern stacks (the course jokes “PyThensor” — PyTorch / TensorFlow), but it still matters historically for how the ecosystem formed.
