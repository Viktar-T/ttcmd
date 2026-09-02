# API providers

**Source (RU):** API-провайдеры  
**Path:** Home → Basic Theory → Level “Master” → API providers  
**Published:** ~4 weeks ago

## Contents

- Core providers
- Other popular providers
- BYOK

A wide range of commercial and open-source providers now offer access to powerful LLMs through APIs. These providers differ in pricing, capabilities, regional availability, performance, and license terms.

## Core providers

- **OpenAI API** — access to OpenAI’s GPT family, plus image generation (DALL·E) and other OpenAI tools.
- **Gemini API** — access to Google’s Gemini family.
- **Claude API** — access to Anthropic’s Claude family.
- **Llama API** — access to models from Meta.
- **xAI API** — access to xAI’s Grok family.
- **DeepSeek API** — access to DeepSeek’s DeepSeek family.
- **La Plateforme** — access to Mistral’s Mistral family.
- **Cohere API** — access to the Command family, focused on text generation, embeddings, and classification.

## Other popular providers

- **Azure AI Foundry** — a Microsoft service that provides API access to a wide range of models. Integrated into Azure cloud infrastructure.
- **Amazon Bedrock** — an AWS service that provides API access to a wide range of models (including Titan and Claude). Focused on integration into the AWS ecosystem and convenient deployment inside that cloud.
- **Vertex AI Platform** — an end-to-end AI platform from Google Cloud. Hosts Gemini and open models; supports custom fine-tuning, evaluation, pipelines, and RAG-based workflows. Deep integration with Google Workspace and BigQuery.
- **OpenRouter** — the largest aggregator of models from different providers through a single interface.
- **Replicate** — an aggregator of models from different providers through a single interface.
- **Groq** and **Cerebras** — providers of ultra-fast inference of open models on their own specialized chips (LPU at Groq, wafer-scale processors at Cerebras). They deliver hundreds and thousands of tokens per second — an order of magnitude faster than classic GPU providers.

## BYOK

**BYOK** (Bring Your Own Key) is a mode of a third-party tool (IDE, agent, chat client) where, instead of the tool’s built-in subscription, you connect your own API key from a provider. The tool calls the model on your behalf, and you pay the provider directly — for tokens actually used.

Why you would want this:

- **Cost control** — you see real token use in the provider’s dashboard, not the tool’s abstract “credits.”
- **Freedom of model choice** — you can connect any model the provider offers, including fresh releases the tool has not added to its subscription yet.
- **Your own limits and privacy** — requests go through your account with your quotas, region, and data-processing agreement.

The flip side: some tools in BYOK mode cut features (for example they disable some agent capabilities), and with heavy agent work, paying per token can cost more than a fixed subscription. So before switching to BYOK, estimate your usage profile.
