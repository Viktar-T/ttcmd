# Vibe coding

**Source (RU):** Вайбкодинг  
**Path:** Home → Basic Theory → Level “User” → Vibe coding  
**Published:** ~4 weeks ago

## Contents

- What vibe coding is
- Where it applies
- Programming vs vibe coding
- Related club content

## What vibe coding is

**Vibe coding** is a development style that does not require deep analysis of the code, and that proceeds without manual edits to the source.

Andrej Karpathy coined the term in February 2025, after which industry blogs and podcasts started picking it apart.

*Twitter screenshot on the platform (`twitter image`) — paste it here if you want it in the local notes.*

Karpathy’s original post (the course showed a screenshot; wording below is the English original, not a reverse translation of the Russian):

> There’s a new kind of coding I call “vibe coding”, where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. It’s possible because the LLMs (e.g. Cursor Composer w Sonnet) are getting too good. Also I just talk to Composer with SuperWhisper so I barely even touch the keyboard. I ask for the dumbest things like “decrease the padding on the sidebar by half” because I’m too lazy to find it. I “Accept All” always, I don’t read the diffs anymore. When I get error messages I just copy paste them in with no comment, usually that fixes it. The code grows beyond my usual comprehension, I’d have to really read through it for a while. Sometimes the LLMs can’t fix the bug so I just work around it or ask for random changes until it goes away. It’s not too bad for throwaway weekend projects, but still quite amusing. I’m building a project or webapp, but it’s not really coding — I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works.

In short: you state the task in natural language (text or voice), send it to an AI assistant, it writes code, you run it, watch the behavior, and refine it through further conversation. Instead of reading and hand-editing source, you work in a **say → do → run → fix** loop.

## Where it applies

Karpathy was honest about the limits: prototypes come together fast, but once you get to a local run and real integration, the speed-up melts — bugs show up, dependencies need syncing, refactoring gets “sticky.”

So vibe coding is good for:

- fast prototyping
- simple automation scripts
- pet projects
- small projects without knowing how to program (useful for engineers outside software)

It is **not** a fit for large systems, or systems with strict requirements for quality, maintainability, and security.

## Programming vs vibe coding

Do not mix up classical programming and vibe coding. If you use a model or AI assistant, but you still read the code it generates, test it, and understand it — that is classical **AI-assisted development** (classical, ha-ha 😅).

With vibe coding it is normal not to understand the whole codebase, and to rely on fast iterations and behavioral checks. That approach inspires a lot of people, and it also draws criticism: too much dependence on chat, weak maintainability, and the risk of a “pile of fragile hacks.” The balance is to keep the AI **on a leash**: use vibe iterations where you need speed and exploration, and return to engineering discipline in the important parts.

How to dictate tasks instead of typing them: [Programming with voice](../../02-programming-with-ai/22-programming-with-voice.md).

## Related club content

- 2025.07.23 / How to vibe-code a finished app on Bolt.new & Supabase / Valentin Zavadsky
