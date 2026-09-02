# Token

**Source (RU):** Токен  
**Path:** Home → Basic Theory → Level “User” → Token  
**Published:** ~4 weeks ago

## Contents

- What a token is
- Tokenization
- Why it matters
- Token-efficient data formats
- Further reading

LLMs do not process words the way people do. They work with **tokens** — the smallest chunks of data the model understands.

A token can be:

- a word (`hello`)
- part of a word (`un-`, `-ing`)
- even a single letter or symbol (`$`, `!`)

How text is split into tokens is called **tokenization**. It matters a lot.

## Tokenization

**Tokenization** is the process of splitting input (text, images, audio, and so on) into tokens the model can understand and process. That is done with a special tool called a **tokenizer**.

Different models use different tokenizers. For example:

- OpenAI GPT models use **Byte Pair Encoding (BPE)** (the `tiktoken` library; the current vocabulary is **o200k**)
- Early Meta LLaMA (1 and 2) used **SentencePiece**; from Llama 3 onward Meta switched to a BPE tokenizer with a 128k-token vocabulary
- Mistral models use custom variants of BPE

These tokenizers are optimized for English, which means:

- short, common English words often become a single token
- but Cyrillic, Chinese, or long compound words can be split into many tokens

That is why working in English usually leads to faster, cheaper, and more efficient processing — the same prompt needs fewer tokens.

For example:

- `"Hello"` = 1 token
- `"Привет"` = 2–4 tokens in most tokenizers
- `"你好"` = 1 token in some multilingual models

So if you work with Slavic or Asian languages, expect a somewhat higher token spend and, as a result, a faster drain of the **context window** (we will talk about the context window in the next chapter).

## Why it matters

Tokens control:

- **Price** — most APIs charge per token
- **Context** — you can fit only a limited number of tokens in a dialogue before the model starts to get confused and hallucinate
- **Speed** — more tokens = more compute, longer generation

Knowing how many tokens your prompts and model replies take in total is critical when working with LLMs — unless you want to pay more than you need to, or get low-quality answers.

## Token-efficient data formats

When you pass structured data (JSON, configs, lists) into an LLM, every character consumes tokens. Standard JSON can be “hungry” because of repeated keys, quotes, and brackets. There are special formats built to minimize tokens when working with LLMs:

- **TOON** (Token-Oriented Object Notation) — a compact format that declares fields once in a header and writes data row by row in a table. It can save **32–50%** of tokens compared with ordinary JSON.
- **TONL** (Token-Optimized Notation Language) — a more aggressive optimization with 10 compression strategies (dictionaries, delta encoding, bit packing). It can save up to **60%** of tokens compared with ordinary JSON.

Format comparison:

| Format | Tokens* | Savings | Nesting | Readability | LLM accuracy** |
|---|---:|---:|---|---|---:|
| JSON (pretty) | 4,545 | — | yes | yes | 69.7% |
| JSON (compact) | 3,081 | −32% | yes | so-so | 70.7% |
| XML | 5,167 | +14% | yes | so-so | 67.1% |
| YAML | 3,719 | −18% | yes | yes | 69.0% |
| TOON | 2,744 | −40% | yes | yes | 73.9% |
| TONL | ~2,500 | −45% | yes | yes | ~74% |
| CSV | 2,352 | −48% | no | yes | 72.0% |

\* Average token count on test datasets (GPT-5 tokenizer)  
\*\* LLM answer accuracy on questions about the data (TOON benchmark)

Same data in different formats:

**JSON** (~66 tokens\*)

```json
{
  "users": [
    {"id": 1, "name": "Alice", "role": "admin"},
    {"id": 2, "name": "Bob", "role": "user"},
    {"id": 3, "name": "Carol", "role": "user"}
  ]
}
```

**TOON** (~31 tokens\*, −53%)

```toon
users[3]{id,name,role}:
  1,Alice,admin
  2,Bob,user
  3,Carol,user
```

**TONL** (~33 tokens\*, −50%)

```tonl
users[3]{id:u32,name:str,role:str}:
  1, Alice, admin
  2, Bob, user
  3, Carol, user
```

\* Count for `tiktoken` `cl100k_base` / `o200k_base` (text inside the block, without the message “wrapper”). The TOON/TONL snippets above reconstruct the same payload as the JSON the platform showed; the original page used side-by-side tabs.

**When to use:**

- **TOON / TONL** — arrays of uniform objects (lists of users, products, logs)
- **JSON compact** — deeply nested or non-uniform structures
- **CSV** — flat tables with no nesting

Both formats have libraries for TypeScript/JavaScript, Python, Go, Rust, and other languages. Quick start:

```bash
# TOON
npx @toon-format/cli input.json -o output.toon

# TONL
npm install -g tonl && tonl encode data.json --stats
```

LLMs understand these formats well out of the box. For TONL you can add a short instruction to the system prompt, for example:

> The following data is in TONL format. Headers look like `users[N]{field:type,...}:`, then one value row per object.

See [TOON](https://github.com/toon-format/toon) and [TONL](https://tonl.dev/).

## Further reading

To understand tokenization better, try it yourself on different models.

- OpenAI model tokenizer demo: [platform.openai.com/tokenizer](https://platform.openai.com/tokenizer)
- Claude tokenizer demo (community; Anthropic does not publish the vocab): [claude-tokenizer.vercel.app](https://claude-tokenizer.vercel.app/)
