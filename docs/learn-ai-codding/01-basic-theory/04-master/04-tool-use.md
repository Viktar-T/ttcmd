# Tool use

**Source (RU):** Tool Use  
**Path:** Home → Basic Theory → Level “Master” → Tool Use  
**Published:** ~1 month ago

## Contents

- What tool use is
- How it works at the model level
- How it works at the API level
- Related club content

Modern LLMs are no longer limited to simple language prediction. Through **tool use**, they can extend their reasoning and capabilities by interacting with the outside world and other systems. That makes them more accurate, more dynamic, and able to handle complex real-world tasks.

## What tool use is

**Tool use** means the model can call external functions or APIs based on prompt context. The model does not run the code itself. Instead it generates a structured request (for example a JSON object) that the host application interprets and executes. That can include:

- searching the web
- querying databases or vector stores
- running math through a calculator API
- reading files or documents
- talking to backend systems (for example booking tickets, launching scripts)

## How it works at the model level

At the model level, tool use relies on **function-calling schemas**. These schemas define the tool’s name, parameters, and expected structure. The model learns — through further training or examples in prompts — when and how to use them.

Example (tool schema):

```json
{
  "name": "get_weather",
  "description": "Get the current weather for a city.",
  "parameters": {
    "type": "object",
    "properties": {
      "location": {"type": "string", "description": "City name"}
    },
    "required": ["location"]
  }
}
```

The model might generate:

```json
{
  "tool_call": {
    "name": "get_weather",
    "arguments": {"location": "Warsaw"}
  }
}
```

An external system intercepts this JSON and runs the matching function.

## How it works at the API level

APIs such as OpenAI function calling, Anthropic **MCP**, or tools in LangChain follow this pattern:

1. Register tools with the model or the agent runtime.
2. The model receives the user prompt and, optionally, a list of tools.
3. The model picks a tool and generates a structured call.
4. The runtime executes the tool and optionally returns the result to the model.
5. The model continues the conversation with updated context.

This architecture lets the model:

- get live data (for example, “What’s the weather in Berlin?”)
- request structured documents (for example, “Summarize section 3.1 of the contract”)
- drive UI elements or automation workflows

Tool use is the path to LLM agents, multimodal reasoning, and scaling the orchestration of AI systems. It lets LLMs become programmable interfaces that reason, act, and iterate — like a software component controlled in natural language.

## Related club content

- 2025.06.05 / Workshop on building Remote MCP via Dify and n8n / Mikhail Savchenko
- 2025.03.12 / The full Cursor knowledge base (+ MCP) / Valera Selitsky and Lex Kartynnik
- 2024.12.23 / How MCP is built and how it works / Sergey Parfenyuk
