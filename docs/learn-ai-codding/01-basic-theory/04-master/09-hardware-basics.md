# Hardware basics

**Source (RU):** База по железу  
**Path:** Home → Basic Theory → Level “Master” → Hardware basics  
**Published:** ~4 weeks ago

## Contents

- Main hardware types
- Main compute providers
- Why it matters

## Main hardware types

Running LLMs — especially training them — needs serious compute. Let’s sort out which hardware types are used for that.

**GPU** (Graphics Processing Unit) — originally built for games, now the AI standard because of parallel processing. In AI, NVIDIA chips dominate: the **Hopper** generation (H100/H200), **Blackwell** (B200/GB200), and **Rubin** coming next. Competition comes from the **AMD Instinct** line (MI300X/MI355X).

**TPU** (Tensor Processing Unit) — designed by Google specifically for AI tasks. Available through Google Cloud.

**NPU** (Neural Processing Unit) — found in phones and edge devices, optimized for running AI models on-device.

**MPU** (Matrix Processing Unit) — an emerging term for chips that process matrix math more efficiently, used in certain specialized hardware.

**CPU** (Central Processing Unit) — the standard processor in every computer. Used for general-purpose tasks and not specialized for vector or matrix operations, so it will be the slowest unit when working with large language models.

## Main compute providers

- **NVIDIA** — dominates the AI-chip market and supplies most cloud providers.
- **Google** — offers TPUs, the Google Colab cloud service, and Google Cloud.
- **AWS** (Amazon Web Services) — runs clusters with NVIDIA and custom chips.
- **Microsoft Azure** — partner of OpenAI and NVIDIA.
- **AMD** — Instinct accelerator line, NVIDIA’s main competitor in data centers.
- **Apple / Intel** — compete in edge and hybrid AI solutions.

## Why it matters

- Faster hardware = faster training and inference
- Specialized chips = lower cost, higher efficiency
