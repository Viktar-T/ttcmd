# Trends and techniques

**Source:** Lex Kartynnik (Алексей Картынник), [AI base for programming in 2025](https://www.youtube.com/watch?v=wsMlA0ckdSk)  
**Channel:** IT Beard (АйТиБорода)  
**When:** early 2025 (~1 hour talking-head lecture)  
**Path:** Basics of Programming with AI → Trends and techniques  

This chapter is an English reconstruction of **that video**. Names and “who is best” are a snapshot of early 2025. The **ideas** are the course’s starting map.

Watch first, then use this as notes. Scene-by-scene companion: [video-ai-base-2025.md](video-ai-base-2025.md).

---

## What this lecture is

A conversational course on **what you can already use in programming with AI at the start of 2025** — how to raise productivity, stay current, and not ossify.

Lex’s method: the talk **systematizes** what exists. After the video you go and google how each tool or approach lands in *your* stack, language, and team. Practice is easy to find. The hard part is seeing the map.

He is not claiming a final truth or a mentor title. He reports what he uses. You decide what to do with it.

**Who he is (as he tells it):** in IT since 2011; ~10 years of .NET backend until 2021; then pet projects; AI for his own productivity since ~2022. Biweekly AI news podcast with Vit Lenchenko. Club **Evolution of Code** (~500 developers). Works mainly as a consultant.

There was a similar first-person talk in **2023**. He still recommends the first half of that one (how AI-in-dev started and where it was by 2023). This 2025 talk is the “what you can use *now*” sequel.

---

## Stance: will AI replace programmers?

He will **not** tell you that AI replaces everyone and that everything should run on AI.

A previous video on “AI replaces developers” was him **retelling Matt Welsh**, who still argues that. Lex does **not** hold that view.

His view:

- The profession **will transform**. It will not look like today.
- It will **not** go to zero in the next few years. People stay; systems **assist**.
- Programmers will **not** be replaced by AI soon.
- Programmers **without** AI **will** be replaced by programmers **with** AI.

This video exists so you can become the second group. Overhype is real; nausea at the word “AI” is understandable. You came to the right place.

---

## Two camps

Nothing new — the same split as two years ago, only sharper.

**Luddites** (his word, not as an insult): people who bury themselves in delivery and never look at the market. He was surprised how many **young** architects are in this camp — no “mental fuel” left after work. The camp is shrinking; YouTubers who denied tools in 2023 are quietly converting.

Their main argument: **the tools don’t work**. We try them and then spend “25 billion hours” fixing the code.

That argument is easy to answer. The adopter camp does not have this problem.

Typical failure:

1. Install Cursor / Cline / Copilot.
2. Try for **30 minutes** (sometimes three).
3. Send a **bad prompt** (a prompt = the text you send the LLM).
4. Get bad code. Repeat five times.
5. Conclude “I have seen the DNA of this thing; it’s a cult.”

They do not know RAG, indexing, prompt techniques, or that **models differ**. Then: “I tried Cursor for half an hour.”

Lex’s question: did you learn your **language** in 30 minutes? Your **IDE** in 15? You spent 3–6 years becoming a senior, six months becoming a junior — and you want the AI tool to pay off in an hour?

**Technique:** give a serious tool at least a **week**, on production tasks if you can, otherwise on a pet project. Not 15 minutes. Not two hours.

The *second* Luddite point is **valid**: the market is flooded. Evolution of Code’s tools channel had ~**400** usable links in 8 months. Google “which AI assistant” and you get **JetBrains AI Assistant** because you live in Rider — and (in his 2025 view) that assistant was the **worst of the popular ones at project context**. People then spit on the whole field.

He still likes JetBrains **IDEs**. He hoped they would catch up on assistants by end of 2025. You can get value from JetBrains AI if you know how. Don’t judge the whole field by the plugin of the vendor you already trust.

In daily practice he and production teams use **two to four** tools, not 400. There is no holy grail that writes all the work for you. He is not at that level.

---

## What models could already do (early 2025)

In 2023 he showed ChatGPT generating Snake and got roasted (“kindergarten; it copied a repo”). His counter: 90% of viewers could not sit down and write Snake cold. Snake is not production — but **that was 2023**.

**Now (his “now”):**

- Models close **junior** tasks, often **async**: write the assignment, go drink tea, come back to commits.
- Junior = no deep project knowledge = the net does not need a huge data load.
- **Think with the model** is still one of the best uses: blank-page fear → “how would you start?” Sometimes the plan is better than you would have invented.
- They write **coherent** code, not only snippets. Example: Vit (no longer a programmer) + ChatGPT **Canvas** built a Win98-style app (~1000 lines): file manager, Minesweeper, text editor — it ran and hung together.
- Excellent at **boilerplate**.
- Excellent at **unit tests**. If the architecture is testable, forget writing unit tests by hand.

**The real limit is architecture of the nets: context.**

---

## Three model traits you must know

Talk like a practitioner, not a paper (his disclaimer).

### 1. Thinking power (“IQ”)

Can the model compose logical blocks? Closed leaders **then:** Anthropic **Claude Sonnet 3.5**, OpenAI **GPT-4o / o3 / o1**, Google **Gemini 2.0 Pro / Flash**.

If you code with free ChatGPT, random “GPT” chats, or **GPT-3.5** because you heard it was good three years ago — you are a mammoth. Models leapfrog **every few months**. Sonnet 3.5 led coding for a long stretch; on some tasks it was already not the best because **reasoning** models arrived.

### 2. Context window

How much the model can hold **without forgetting** — the only “RAM” it has for a consistent session. Measured in **tokens** (~one English word per token as a rough picture). **~100k** OpenAI, **~200k** Anthropic, **up to ~2M** Gemini.

100k tokens of code ≈ a **small / pet** project. Models are great there, with a decent prompt.

Even a tiny pet project with five libraries: you should feed **library docs**. Models’ training data on libraries is often stale. Docs **eat the window**. You must know how much you injected, or you go **out of context** and the model starts to ramble.

**Do not** paste millions of files into the chat. That is how amateurs get garbage.

**RAG (retrieval-augmented generation)** and full-text search: do not dump all docs. One-click **index** into a vector store; before each answer the model pulls **only** the useful chunks into context. That is the technique. You will not learn it in ten minutes of clicking an IDE.

### 3. Reasoning / test-time compute

Give the model **more time to think** = more compute = **slower and more expensive** request. First famous model: **o1**; then **o3 mini**. He called **Grok** a strong reasoning model at that moment.

**Why it matters:** o1 sat around **~170th** on **Codeforces** (world olympiad-programmer board; #1 Gennady Korotkevich). OpenAI broke Codeforces’ “models don’t enter the rating” rule for hype. Olympiad ≠ production (context limits remain; you still have to learn to use the model). Still: that is not Snake. **LeetCode-style interviews** the model already solves.

Those Codeforces runs used **hours** of compute and a lot of money, iteratively. **Trend:** model cost drops ~**10× per year**. Today’s 170th-place olympiad solve → tomorrow ~$2 → in two years, cents.

**Use reasoning models** for work you **don’t know how to do**, and for **architecture** (new service, module, migration). They think a few minutes and return a *decent* plan — maybe not better than you on your best day, but better than a fast GPT-4 / Sonnet 3.5, and better than you when you are lazy.

**Do not** use reasoning models for unit tests — overhead. Fast models: tests, boilerplate, features.

Start watching **benchmarks / leaderboards** (Chatbot Arena / LMSYS, LiveCodeBench, coding benches). Evolution of Code had a post with ~30 selected benches. You do not have to digest everything yourself — sit with people who live in this.

**Where models were already good without reasoning:** most junior backend/frontend, games, mobile; even 1Cs were starting to bolt assistants onto pipelines. Niche languages: small training data, he would not claim much.

---

## The harness around the model (this is the new standard)

Coding quality is **not** only “is Sonnet 3.5 the best model.” You wrap the LLM.

### Web search (a tool, not a superpower)

Models **cannot** browse the internet by themselves; they are fenced off. The **host** must expose a **web search tool**. Almost every serious AI IDE already does. **Tools** in this sense ≠ Cursor/Copilot (those are *programs*). Tools = functions the model can **call** (search, APIs, your DB).

You can have the IDE **write new tools for you**. Flagship example: **MCP (Model Context Protocol)** — Anthropic’s then-~4-month-old standard for extra tools. Example: Cursor’s search is weak, or you want chat over an **internal database** → ask **Composer** to implement an MCP server that logs in and queries that DB → attach it in Cursor.

### RAG and embeddings

**RAG is de facto external memory.** Not everything fits in context. Index, store in a vector DB, retrieve. You do not need to know how to *build* a RAG stack. You need the **concept** and **where it lives in your tool** (e.g. Cursor’s docs index).

### The chat is stateless

This is base and most people miss it. You do **not** send only the new message, like talking to a person. You send the **entire dialogue every time**. The model knows nothing from a second ago. That is why context fills up and quality falls.

### Provider APIs (you *will* use keys)

Even if you are not shipping an “AI app,” coding tools run on **API keys**. Read OpenAI / Anthropic / Google / xAI / Mistral docs.

Worth knowing then:

- **Prompt cache** (he says “ш” / cache) — cheaper repeated prefixes.
- **Batch API** — cheaper bulk.
- **Structured output** — force JSON (he mentions XML as maybe). If you say “OpenAI can’t do JSON,” you don’t know the base.

### Multimodality

In 2023 this was “the future.” In 2025: one model in, mixed types out.

Coding uses:

- **Voice** — still a **narrow** coding use case.
- **Screenshots** — bug in GitHub/Jira → paste into Cursor or Copilot chat → “do what’s on the screenshot” (so you don’t type).
- **UI photo** → Claude → layout / HTML-CSS.

Evolution of Code’s **glossary** of terms for programmers using LLMs was ~**20 pages**; he had already shot **~3 hours** of videos on it. Not a 15-minute read. First a **week of theory**, then a **week of practice** on the tool. Knowing the base makes Copilot (or anything) work better.

---

## Prompt engineering did not go away

Not the **job title** (that barely exists; ordinary developers write the prompts inside apps). The **skill** of writing the message.

Most models still want: **task**, **shape of the result**. **Role/actor** used to matter more; less so now, but still.

**Different models need different prompts.** What works on a chat model often **fails** on a reasoning model — even **markup** differs (HTML vs something else). This is not “I’ll give you $1000, give me the best answer.” It is applied craft.

Read **[PromptingGuide.ai](https://www.promptingguide.ai/)** (he says “PROMT Guide” in the talk): techniques and per-model notes. Know **zero-shot / one-shot / few-shot** and **Chain of Thought**.

“Write me unit tests” is like throwing two sentences at a junior and leaving. Sit down and **brief** it.

When the model picker in the IDE is not an empty checkbox, and you can write a prompt, *then* go ask whether Copilot is still the right tool.

---

## How to choose tools (harder than choosing models)

**Models:** open a leaderboard, pick the top, use it.

**Tools:** almost no tool leaderboard. **SWE-bench** (Software Engineering Bench) scores **tool + model** pairs, but (then) it **omitted Cursor** and most popular IDEs; **aider** showed up. So you need a **community** of people who actually use the tools: English AI-coding YouTubers, the AI podcast, Evolution of Code. He had not found a Russian-language equivalent besides his own circle.

Tools named in a January video will be stale by March–April, let alone 2026. He **cannot** guarantee the list for two months. The durable technique is a **community that watches the market together**. He spends ~2 hours/day on this for clients and a 500-person club; easier to join something that already exists.

---

## What to install (his list at the time)

**Three must-haves:** **Cursor**, **GitHub Copilot** extension, **Cline** extension.

Setup he recommends: install Cursor → Copilot (free tier) → Cline → drop in OpenAI + Anthropic API keys. If Cursor is not your main IDE, still use it to *edit with AI*. Many of his people work in **two IDEs**. That is how you get used to AI. There is no other growth path he offers.

### Cursor (then the leader)

VS Code fork. Almost the full AI spectrum in one place.

JetBrains AI plugins (then) integrated **worse** because VS Code has the most open extension API. Copilot in WebStorm ≠ Copilot in VS Code. He does **not** demand you abandon WebStorm. He **does** demand you **install Cursor** and work in two windows: JetBrains for **hand** coding (better UX), Cursor/VS Code + plugins for **AI**. Two IDEs is becoming **normal**. All the new AI plugins land on VS Code first.

**Cursor’s three base functions:**

1. **Code completions (Tab)** — GitHub’s original idea: ghost text from nearby code, Tab to accept.
2. **Next Edit / upgraded Tab** — rename a class → Tab walks every field/method that still has that name; delete a chunk → Tab offers the same deletion elsewhere.
3. **Chat** — like Copilot Chat, plus more: pick models, **smart index of the whole codebase**, richer file context.
4. **Agent edit** — 2023 this was a newborn idea; in 2025 it is everywhere. Normal chat: you **paste** code. Agent chat (**Cursor Composer**; Copilot **Edit**): the model **writes into files**. Under the hood a subroutine drives the files; that subroutine is the **agent**.
5. **Heavier agent** — rewrite code, **run terminal**, read errors, fix, loop until it runs. Composer does this out of the box. Cursor **asks confirm** before each terminal command (no surprise `format C:`).

**Also in the combine:** MCP (and it will write MCP servers for you), **docs indexing** (hundreds/thousands of docs; paste a new library, indexed in ~2 minutes = built-in RAG), terminal integrations, **auto commit messages**.

Paid: a few free days, then ~**$20/month**. Only the **subscription** unlocks full agents + indexing. API keys (OpenAI/Anthropic) can power **chat** without a Cursor sub, but you pay the API, and you still need the sub for agent/index. He had paid for Cursor >6 months and never wanted to cancel. Pay yourself or get the employer to pay — already a common practice.

### Windsurf

Then Cursor’s biggest competitor. Also a VS Code fork. Nicer UI, slightly smaller toolbox, **different project-context system**. Users said it **understands large codebases better**. He roughly agrees; Cursor is still decent on big repos. Same ~$20 sub model.

### Cline

Writes code **turnkey**, like Composer but (in his view) **better and more flexible**. You can set it to almost stop asking permission. Good at **unit tests** without popup hell. **Open source**; you only need API keys.

### API limits

OpenAI/Anthropic: **tokens per minute / per hour**. A new account with the first **$5** has limits that are too small for real work.

Fixes: company keys (his client issues them from a fat account), or **tier up** by spending. He used **tier 3** on both OpenAI and Anthropic: **~$200 lifetime spend** on the account (+ some age). He codes ~1 hour/day average (sometimes 6, sometimes 0), often **vibe coding** (Karpathy’s term): give the task, watch, accept; language does not matter. Tier 3 was enough for that.

### GitHub Copilot

Started the AI-dev era (~**2022**, smart completions). Then it lagged: Cursor completions felt better; Windsurf completions used **neighbor files**, not only the open file. Long time **no Composer / no agent**. ~$10 sub; later a free tier (~**30 minutes** intensive / day). Then they added more models (including Sonnet) and, **about a week before the talk**, a beta that made them a **real Cursor competitor**: real agent, better Tab, whole-file completions.

**Must-have gentleman’s set** for the price: completions + chat + agents + GitHub.com extras + betas + a **marketplace** (Copilot itself extends: Dockerfiles, Mermaid diagrams, even your own extensions).

### Also

- **Warp** — closed AI terminal. Free tier probably trains on your data; he does not care for simple tasks (run a container, recall a flag). Used to google commands; now the assistant lives **in the terminal**.
- **ChatGPT / Claude web** — he pays for **text work**, **not coding**. Coding has specialized IDEs. You do **not** need the websites to program.
- Best extensions = **agents that finish the job**: Composer, Cline.
- **aider** — Cline but **CLI**, very extensible; actually **on SWE-bench**.
- **ZenCoder** — from the (ex) CEO of WakaTime; strong on **medium-large repo context**.
- **Zed** — not his taste.
- **Trae** — Chinese, free, their own models, weaker than Cursor/Windsurf; OK if you will not pay.

---

## Money and the profession (end of the talk)

If you still think this is unserious: look at **state money**. 2023 felt like enthusiasts. Now billions.

- **US Stargate:** **$500B** over ~5 years (infra, even power plants). More than Manhattan + the Moon program combined (his comparison).
- **China:** ~**$120B** to compete.
- **EU:** discussing **€109B** for startups — with almost no big AI lab except **Mistral**, which he barely uses for coding.

This is the future you will live in. He ran out of energy to talk “future of the profession” at 1 a.m. Short version:

If you learn this **base** and keep finding uses at work, you stay in demand **several years, maybe five or ten**. HR already screens for **LLM knowledge**. Business sees faster/cheaper output and either pushes current staff or hires people who already work this way — **same output, less pay** because they are faster. He is **not** endorsing that; he is reporting it.

If you plan to open a beekeeping or carpentry shop in 2–3 years, skip AI. If you plan to **stay a programmer**, you need this — even if it makes you sick.

**Other big topics he did not cover** (separate videos): private/local LLMs; **open source** catching closed models (he names a local stack — transcript garbles it as “PSK”; likely a then-current local/open model family). On his **laptop offline** he runs models that write code **far better** than the GPT-3.5 that wrote Snake in 2023. Snake on a **phone** local model is easy. Privacy, certs, how to pick local coding models: another episode.

Courses in this field **go stale in a week or two**. You need a **live** information source (his club, or any similar community). On IT Beard he will keep **talking-head** map videos; **workshops and tool reviews** live in Evolution of Code.

---

## The map in one page

| Layer | Technique from the lecture |
|---|---|
| Mindset | Assist, don’t wait to be replaced; without-AI loses to with-AI |
| Learning | Week of theory + week of practice; not 30 minutes |
| Models | Thinking power, context size, reasoning; match model to task |
| Memory | Don’t overflow the window; RAG / index, not dump |
| Session | Whole chat is resent every turn |
| Prompts | Task + format; shots; CoT; different prompts per model family |
| Tools on the model | Web search, MCP, structured output, cache, batch |
| Input | Screenshots and UI photos, not only text |
| IDE | Completions → Next Edit → chat → agent (files + terminal) |
| Install (then) | Cursor + Copilot + Cline; keys; optional Warp / aider |
| Stay current | Community + benches; tool names rot fast |
