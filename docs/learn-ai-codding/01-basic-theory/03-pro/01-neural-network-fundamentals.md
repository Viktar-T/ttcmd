# Fundamental principles of neural networks

**Source (RU):** Фундаментальные принципы работы нейронных сетей  
**Path:** Home → Basic Theory → Level “Pro” → Fundamental principles of neural networks  
**Published:** ~4 weeks ago

## Contents

- Perceptron
- Linear regression
- Backpropagation
- Autoencoder
- BERT
- Fill-in-the-Middle (FIM)

Before modern transformer-based models such as GPT-5.6 or Claude Opus 5, neural nets grew out of simpler but powerful ideas. These classical concepts help explain how today’s LLMs are built.

## Perceptron

A **perceptron** is one of the earliest and simplest types of neural network. It consists of a set of inputs, each tied to a weight. The weighted inputs are summed and passed through an activation function to produce an output. It can only solve linearly separable problems, but it laid the foundation for more complex architectures.

## Linear regression

**Linear regression** is a statistical method that models the relationship between a dependent variable and one or more independent variables by fitting a linear equation to the observed data. Simple as it is, it remains a key idea in machine learning and influences how weights are handled in neural nets.

## Backpropagation

**Backpropagation** is an algorithm for computing the gradient of the loss function with respect to each weight, applying the chain rule and moving backward from the output layer to the input. This method lets deep networks learn from errors and improve prediction accuracy.

## Autoencoder

An **autoencoder** is a type of neural net that learns to compress input data into a low-dimensional hidden representation (**encoding**) and then reconstruct it (**decoding**) back to the original form. Autoencoders are used for denoising, dimensionality reduction, and unsupervised pretraining.

## BERT

**BERT** (Bidirectional Encoder Representations from Transformers) is a model developed by Google in 2018. Unlike GPT, which is **autoregressive** and reads text left to right, BERT reads in both directions at once, which makes it ideal for tasks that need a deep grasp of context. BERT is especially strong at classification, question answering, and predicting missing words.

## Fill-in-the-Middle (FIM)

**Fill-in-the-Middle** is a technique where the model fills in a fragment of text using context from both sides (**prefix** and **suffix**). The model generates the content between the start and the end. That is useful in programming tools — for example, inserting code in the middle of a function or completing a half-written line (autocomplete). Many modern LLMs support FIM, which requires more advanced attention processing.
