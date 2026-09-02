# Spiking neural networks

**Source (RU):** Импульсные нейросети  
**Path:** Home → Basic Theory → Level “Horizons” → Spiking neural networks  
**Published:** ~6 months ago

## Contents

- Spiking neural networks
- Neuromorphic processors
- Memristors
- How it all connects
- Differences from classical approaches
- Use today
- Link to training and running models
- The future

Most modern neural nets — from GPT to Stable Diffusion — are based on **artificial neural networks (ANN)**, where neurons pass continuous numeric values to each other. That is powerful, but far from biology: real neurons in the brain work very differently.

## Spiking neural networks

**Spiking neural networks (SNN)** are the class of nets closest to a biological brain. Instead of passing numbers, a neuron in an SNN accumulates input and at a certain moment generates a **spike** — a short electrical pulse. Information is encoded not by activation magnitude, but by the **timing and frequency** of those pulses.

Key differences from classical nets:

- **Event-driven** — a neuron “stays silent” until it gets enough input, and fires only when needed. That radically cuts the amount of computation.
- **Time as a variable** — in an ANN all layers are processed synchronously; in an SNN *when* a spike arrived matters. That makes streaming data — sound, video, sensors — a natural fit.
- **Biological plausibility** — SNNs model real neuron behavior, which opens a path to more energy-efficient and adaptive systems.

If a classical net is a calculator that computes everything in a row, a spiking net is a brain that reacts only to what matters.

## Neuromorphic processors

Ordinary processors (CPU, GPU) are built on the **von Neumann** architecture: memory and compute are separate, and data constantly move between them. For classical nets with dense matrix multiplies that works; for spiking nets it is extremely inefficient.

**Neuromorphic processors** are chips designed in the image of the brain:

- **Memory and compute combined** — each neuron stores its state right where it processes data, without constant trips to shared memory
- **Asynchronous operation** — instead of a single clock (as in CPU/GPU), neuromorphic cores fire only when a spike arrives. No input → no compute → no energy use
- **Massive parallelism** — thousands of neural cores work at once, each independently, like neurons in the cortex

That gives a fundamental energy-efficiency advantage: where a GPU draws hundreds of watts, a neuromorphic chip can solve the same task in milliwatts.

You will learn more about neuromorphic processors and their uses in the **Neuromorphic processors** chapter of [Models for Development](../../03-models-for-development/README.md).

## Memristors

A **memristor** (memory + resistor) is an electronic component that “remembers” its resistance even after power is cut. The more current that has passed through it, the more its conductance changes — and that change persists.

Why this matters for neural nets:

- **A memristor behaves like a synapse** — in a biological brain, synapses between neurons strengthen or weaken with experience. A memristor does the same at the physical level: its conductance is the “weight” of the connection
- **Compute in memory** — instead of storing weights in separate memory and shipping them to a processor, a memristor array does the multiply analog-style in one cycle. That removes the main bottleneck of von Neumann architecture
- **Analog values** — unlike digital transistors (0 or 1), a memristor stores a continuous range of values, which is natural for neural-net weights

Memristors are still in active research. In 2025, fully integrated memristor SNN chips were demonstrated with **128×24** arrays, reaching ~**93%** accuracy on gesture recognition at record energy efficiency.

## How it all connects

Three concepts — SNN, neuromorphic processors, and memristors — form one stack:

- **SNN** — the algorithm, a brain-inspired model of computation. It describes how neurons talk in spikes
- **Neuromorphic processor** — the architecture, a chip designed to run SNNs efficiently. It provides asynchrony, event-driven behavior, and memory-compute fusion
- **Memristor** — the component, a physical element that can act as a programmable synapse inside a neuromorphic chip

Analogy with the classical world:

| Neuromorphic stack | Classical analog |
|---|---|
| SNN (algorithm) | Neural net (Transformer, CNN) |
| Neuromorphic processor | GPU / TPU |
| Memristor | Transistor in SRAM/HBM |

Today neuromorphic processors more often use ordinary **CMOS** transistors to emulate neurons, and memristors are a promising way to do that even more efficiently. Hybrid architectures that combine CMOS and memristor elements are developing actively.

## Differences from classical approaches

| | Classical (GPU + DNN) | Neuromorphic (SNN) |
|---|---|---|
| Compute | Synchronous, clocked | Asynchronous, event-driven |
| Activations | Dense (all neurons work) | Sparse (spikes as needed) |
| Memory | Separate from compute | Combined with compute |
| Energy | Hundreds of watts (GPU) | Milliwatts to a few watts |
| Latency | Depends on batching | Reaction to each spike |
| Strength | Dense tasks: LLM, generation | Streaming tasks: sensors, edge AI |

Neuromorphic systems show up to **200×** lower energy use and up to **10×** lower latency on tasks such as keyword spotting versus embedded GPUs. On optimization tasks the advantage reaches **1000×** on an energy × latency metric.

## Use today

Spiking nets and neuromorphic chips do not yet replace GPUs for training large models, but they have found a niche. Main directions: **edge AI**, event-based vision, keyword spotting, real-time anomaly detection, autonomous robotics, and sensor fusion.

What these tasks share is a need for low latency, minimal energy, and streaming data — exactly where the neuromorphic approach beats the classical one.

## Link to training and running models

Training and inference for SNNs differ in principle from classical deep learning.

**Training:**

- Classical **backpropagation** fits SNNs poorly, because a spike is a binary event and its gradient is not defined in the classical sense
- Instead, **surrogate gradients** are used — approximate functions that let you train SNNs with methods similar to backprop
- The biologically inspired method **STDP** (Spike-Timing-Dependent Plasticity) — learning from the time difference between pre- and postsynaptic spikes. Allows on-chip learning without external compute
- **ANN → SNN conversion** — a trained classical net can be converted to a spiking one by transferring weights. That is the simplest way to get an SNN without hard training from scratch

**Inference:**

- On neuromorphic chips, inference is event-driven: data are processed as they arrive, without accumulating batches
- Energy use is proportional to the **number of spikes**, not model size — which makes SNNs ideal for tasks where most of the input is “quiet” (sensors, audio, edge cameras)

## The future

Neuromorphic compute will not replace GPUs for training LLMs or generating images. But it occupies a growing niche — ultra-efficient inference at the **edge**, where energy, latency, and streaming data matter. In the long run, a **hybrid** of classical and neuromorphic approaches may become the standard for next-generation AI systems.
