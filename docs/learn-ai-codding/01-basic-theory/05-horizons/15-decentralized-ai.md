# Decentralized AI

**Source (RU):** Децентрализованный ИИ  
**Path:** Home → Basic Theory → Level “Horizons” → Decentralized AI  
**Published:** ~4 weeks ago

## Contents

- Decentralized training
- Main projects
- Why it matters

Let’s talk about a more open, safer, community-governed AI ecosystem.

Exploring ideas such as [AGI](01-agi.md), [superalignment](13-ai-alignment.md), and controllable AI leaves a last question: **Who builds AI and who governs it?**

Most high-performance AI models today belong to centralized organizations. That delivers scale and efficiency, but it also raises concerns about monopoly, limited access, and opaque governance.

**Decentralized AI (DAI)** offers a vision of distributed, democratic intelligence — built and owned by communities, not corporations.

## Decentralized training

A key method in DAI is **peer-to-peer training** — nodes around the world cooperate directly to train models with no central authority. Each peer contributes compute; consensus mechanisms or token incentives keep cooperation and integrity.

## Main projects

### Prime Intellect

Using its own **Prime Protocol**, Prime Intellect has trained two models via peer-to-peer training:

- **INTELLECT-1** (~10B parameters) trained with 30 contributors worldwide, using ElasticDeviceMesh and gradient compression
- **INTELLECT-2** (~32B) built with decentralized RL approaches such as PRIME-RL and TopLoc sharding

That shows foundation models can be trained together without large centralized clusters.

### Nous Research

The company is building **Psyche Network** — a decentralized AI-training network that pools thousands of unused GPUs worldwide. It uses the **DisTrO** algorithm — an improved version of DeMo, where data are compressed in the frequency domain (like JPEG) and sent in **1-bit** form, which sharply cuts traffic.

Node coordination runs through the **Solana** blockchain; exchange goes over the **Iroh** P2P network with encryption and UDP hole-punching. Nodes train, verify, and sync via Bloom filters and a witness system. The first project is **Consilience**, a 40-billion-parameter model on an **MLA** architecture, trained on 20 trillion tokens. Psyche’s goal is to democratize AI development, making training available to everyone, not only corporations.

### Macrocosmos.ai

Macrocosmos works on several **subnets** inside the **Bittensor** blockchain:

- **Apex (SN1)** — model inference and agentic workflows
- **IOTA (SN9)** — coordinated pretraining of foundation models
- **Data Universe (SN13)** — collecting social data and curating datasets
- **Fine-Tuning (SN37)** — specialized models
- **Mainframe (SN25)** — scientific simulations such as protein folding

Each subnet allows peer participation, incentivized contribution, and open governance — gradually forming a full-stack decentralized AI ecosystem.

**Macrocosmos Swarm Training** launched a system that lets GPU contributors take part in large-scale model training through competitive, decentralized coordination.

### Bagel Labs

A US company working toward open-source SuperAI. They built the world’s first open-weights diffusion model trained fully decentrally — **Paris**.

- Paris consists of **8 expert models**, trained in complete isolation with no gradient sync or parameter sharing
- Training ran across heterogeneous compute clusters without specialized interconnects, needing **14×** less data and **16×** less compute than traditional approaches
- Open weights under the **MIT** license show that image-generation diffusion models can be trained on fragmented resources without centralized infrastructure

### MLX MPI

Apple’s **MLX Message Passing Interface (MPI)** provides a decentralized inference protocol that lets several Apple Silicon devices (iPhone, Mac, and so on) cooperate to run an LLM. Devices share compute through direct message passing and coordinate partial execution — enabling private, low-latency inference across a device mesh with no central servers.

### Cocoon

**Cocoon** (Confidential Compute Open Network) is a project by **Pavel Durov**, introduced in late 2025. Unlike the projects above, which mainly do decentralized **training**, Cocoon bets on decentralized **inference** with an emphasis on privacy.

How it is built:

- Developers send AI tasks into the network; GPU owners process them locally and get paid in **TON** cryptocurrency.
- Data inside the network are encrypted — by design, the GPU owner does not see which requests they are processing.
- Anyone with serious enough hardware can join (the stated bar is **NVIDIA H100** and up), so this is not a “mine on a home GPU” story.
- The first large client of the network is **Telegram** itself — some of its features, for example automatic message translation, run through Cocoon.

The idea is clear: give developers cheap compute without their own infrastructure and without depending on hyperscalers such as AWS or Azure. Whether the economics of such a network hold over a long distance is an open question, but as an experiment the project is interesting: it is one of the first attempts to build confidential inference for a truly mass audience.

## Why it matters

Decentralized AI is emerging not only as a technical innovation, but as a **political and ethical** shift — toward transparent, inclusive, community-governed intelligence. On the horizon of AGI and superalignment, decentralization may be not only valuable, but **necessary**.
