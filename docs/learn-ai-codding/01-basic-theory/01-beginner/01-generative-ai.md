# Generative AI

**Source (RU):** Генеративный ИИ  
**Path:** Home → Basic Theory → Level “Beginner” → Generative AI  
**Published:** ~10 months ago

## Contents

- What is generative artificial intelligence?
- Generative model
- Generative neural network

*Diagram on the platform: “Generative AI scheme” — paste the image here if you want it in the local notes.*

## What is generative artificial intelligence?

Generative AI (GenAI, GAI) is the umbrella name for systems that can create content: text, images, code, music, video, 3D, and more. These systems do not just return ready-made answers — they generate something new from patterns they have learned. Think of it as a creative machine trained to imitate data and produce new, similar examples.

## Generative model

At the core of every GenAI tool is a generative model.

A **generative model** is a general term covering various methods and algorithms for creating new data based on a training dataset. The model’s main job is to figure out how the data is structured and learn to produce similar data. For example, a model can generate images, text, program code, or sounds that are hard to tell apart from the real thing.

Whether it is poems or portraits, the principle is the same: watch how others do it, then do it in a similar style.

## Generative neural network

Many generative models today are built on neural networks — computing systems inspired by (and *only* inspired by!) the human brain.

You can find millions of articles and YouTube videos on how classical neural networks work; I’ll leave that as homework. I’ll only suggest paying attention to Andrej Karpathy’s videos — they explain how neural networks work very well.

A **generative neural network (GNN)** is a neural network specifically trained to create new data. A vivid example is a **GAN** (Generative Adversarial Network). It works as a duo of two networks:

- the **generator** — creates content
- the **discriminator** — checks how close it is to the truth

The generator tries to fool the discriminator by producing more and more realistic data, while the discriminator learns to spot fakes better. They compete with each other, and both get better because of it.
