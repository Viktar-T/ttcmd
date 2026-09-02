# From data to model

**Source (RU):** От данных к модели  
**Path:** Home → Basic Theory → Level “Pro” → From data to model  
**Published:** ~10 months ago

## Contents

- Dataset
- Model parameters and weights
- Temperature
- Embeddings
- Attention mechanism
- Autoregression

## Dataset

A **dataset** is a structured collection of data used to train models. For generative AI that can be text, images, audio, and other media. During training these data are tokenized and fed into the model. Datasets — their quality and size — play a key role in training.

For the largest models, datasets can reach tens of terabytes. OpenAI has spent years literally “vacuuming” the open internet to train its models.

## Model parameters and weights

**Model parameters** are the numerical values obtained during training. **Weights** are a subset of parameters that determine the strength of connections between nodes in the neural net.

Weights are central in training because they are adjusted to minimize answer error. Recalling a bit of math: weights are the values in the matrices that neural nets are made of. Multiplying those matrices during training is, in effect, multiplying the weights.

Parameters can include **weights**, **biases**, and **hyperparameters** (values set before training that do not change during it).

Online, “weights” and “parameters” are often used interchangeably, which is a bit incorrect. When you see a name like **Llama 3 70B**, the suffix **70B** is the number of parameters in the model, where B is the billion multiplier. So 70B = 70,000,000,000 parameters — which, as you can tell, is a lot.

It is often assumed that more parameters means a “smarter” model, but that rule does not always hold: “smartness” depends on several factors, for example the training method, dataset quality, or model architecture.

## Temperature

**Temperature** is a hyperparameter that lets you control the diversity and creativity of the generated output. It affects the probability distribution from which the next items (for example words or letters) in the sequence are chosen. Simply put: the higher the temperature, the more hallucinations and creativity. Just like with people.

Client apps such as ChatGPT rarely let you change temperature; through the API it is almost always available.

## Embeddings

An **embedding** is a method of turning discrete data — words, characters, tokens, and other discrete items — into continuous vector representations in the model’s multidimensional space. It is an array of numbers produced by that transformation. The combination of those numbers (the vector) helps find similarities between the transformed objects.

Embeddings are a fairly specialized topic and will matter when you analyze the internal structure of models, RAGs, and vector databases. For now, think of an embedding as a “vectorized” weight that can be used as a model input. In some tasks that improves answer quality.

## Attention mechanism

The **attention mechanism** lets models focus on relevant parts of the input sequence when generating output. It became widely known through the famous 2017 paper [“Attention Is All You Need”](https://arxiv.org/abs/1706.03762), which started all the Transformers (Autobots, roll out!).

The course author also notes that transformers and attention exist thanks to their fellow countryman and almost-classmate **Dzmitry Bahdanau**, who in 2014, together with Kyunghyun Cho and Yoshua Bengio, proposed the mechanism in [“Neural Machine Translation by Jointly Learning to Align and Translate”](https://arxiv.org/abs/1409.0473). (The Russian text says “Дмитрий Богданов”; that is Bahdanau.)

## Autoregression

**Autoregression** is predicting the next item in a sequence from previous items. In language models that means generating the next token from all tokens that came before. GPT models are autoregressive: they generate text one token at a time, feeding each output back as input.

The term comes from mathematical statistics — a time-series model in which the current value of the series depends on its previous values. The core idea is that a future value of the series can be predicted from its past values.
