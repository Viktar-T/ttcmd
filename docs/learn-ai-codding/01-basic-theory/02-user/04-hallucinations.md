# Hallucinations

**Source (RU):** Галлюцинации  
**Path:** Home → Basic Theory → Level “User” → Hallucinations  
**Published:** ~4 weeks ago

A **hallucination** is a model answer that *looks* correct but is not.

A model can hallucinate for several reasons:

- not enough information to answer (the model does not know, so it tries to “guess”)
- the prompt was vague or incomplete
- information in the dialogue was lost (because of failures, going out of context, and so on)

Any LLM’s job is to continue the dialogue, which equals “give an answer.” Even if it is unsure or does not know the right answer, it will most likely still tell you *something*. So always double-check answers for factual accuracy — especially when you use AI for research or information lookup.

Model providers try to address this with layers on top of the model: tools that re-check answers for factual accuracy, or training models to say “I don’t know.” Researchers try to invent new architectural solutions to improve models. Hallucinations are still one of the biggest problems in modern LLMs.
