# Programming with voice

**Source (RU):** Программируем голосом  
**Path:** Home → Basics of Programming with AI → Programming with voice  
**Published:** ~4 weeks ago

## Contents

- Why you would want this
- Tools
- Local vs cloud
- Voice-dictation patterns for code
- How to start in 5 minutes
- Languages
- Privacy and security
- A quality voice workflow
- Related club content

This chapter continues the idea of [vibe coding](../01-basic-theory/02-user/05-vibe-coding.md): you describe the desired result out loud, and AI and tools do the routine — write code, edit files, run checks. In short, we will talk about how to set up a process of coding by voice.

## Why you would want this

Over the last couple of years three things “grew up” at once: quality speech-recognition models (Automatic Speech Recognition, **ASR**), quality LLM agents, and good local model engines that let you run them offline. Together those three things made it possible to build quality tools for voice development that make it:

- **More convenient:** you just dictate the task — the assistant applies edits in the right files.
- **Faster:** 10–20 seconds of speech replace a long prompt.
- **And even more private:** with local recognition, audio does not go to the cloud.

## Tools

### Standalone

- [**Superwhisper**](https://superwhisper.com) (macOS / iOS / Windows in beta) — lets you dictate into any system input, supports an offline mode via local models and term dictionaries.
- [**MacWhisper**](https://goodsnooze.gumroad.com/l/macwhisper) (macOS) — a simple tool for dictation into any input, with offline work.
- [**Wispr Flow**](https://wisprflow.ai) (macOS / iOS / Windows) — Superwhisper’s main competitor. Has no offline mode.
- [**EVY**](https://evy.so) (in early beta) — an excellent voice assistant being developed by the team of our clubmate Valentin Zavadsky.

### Built-in tools

- [**VS Code Speech**](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-speech) (VS Code) — voice input and voice chat right in VS Code; works offline. Docs: [Voice support](https://code.visualstudio.com/docs/configure/accessibility/voice).
- [**Supercode.sh**](https://supercode.sh) (Cursor) — a wide set of “enhancers” for Cursor IDE, including voice input.

And many tools themselves support voice input in chat.

### Open source

- [**Cursorless**](https://www.cursorless.org) — a tool with a pile of interesting bits specifically for development: voice macros and structural commands (“delete the token,” “select the function,” “replace in the range”). The entry threshold is higher, but the speed and accuracy of edits are top.
- [**Handy**](https://handy.computer) — an open-source and actively developing project that lets you use voice input in any application. Repo: [cjpais/Handy](https://github.com/cjpais/Handy).
- [**OpenSuperWhisper**](https://github.com/Starmel/OpenSuperWhisper) — a simple local implementation of Superwhisper, supporting offline work.

### OS capabilities

- [**macOS Voice Control / Dictation**](https://support.apple.com/guide/mac-help/use-voice-control-mh40719/mac) — system control and dictation, including a “spelling mode.”
- [**Windows 11 Voice Access**](https://support.microsoft.com/windows/use-voice-access-to-control-your-pc-and-author-text-with-your-voice-8d281134-b03d-c497-4602-0e7542edf5e7) — offline recognition and control of the system / typing.
- **Android (Gboard) / iOS dictation** — fast voice input in mobile workflows (edits “on the go,” answers in assistant chats, notes on a task).

💡 If you are building your own stack, keep in mind popular recognition engines: [OpenAI Whisper](https://github.com/openai/whisper) (and its local implementations [whisper.cpp](https://github.com/ggml-org/whisper.cpp), [faster-whisper](https://github.com/SYSTRAN/faster-whisper)), and also [Vosk](https://alphacephei.com/vosk/) (offline, 20+ languages).

## Local vs cloud

| Criterion | Local (Superwhisper, Handy, and others) | Cloud (Wispr Flow and others) |
|---|---|---|
| **Privacy** | Excellent: audio stays on the device | You need to read the policy and options — audio / text may go to the cloud |
| **Latency** | Low on Apple Silicon / decent on CPU | Often very low, but depends on the network |
| **Accuracy (tech vocabulary)** | High (Whisper models, dictionaries) | High, often with auto-editing |
| **Multi-language** | 50–100+ languages (depends on the model) | Usually 100+ languages |
| **Convenience** | Requires install / a model | “Out of the box,” minimum settings |
| **Cost** | Free / subscription / one-time payment | Subscription or a per-minute plan |

## Voice-dictation patterns for code

### Imperative + context

Phrase the task as a command with an explicit scope:

> “In `src/auth/service.ts` add a helper `hashPassword()`, use bcrypt, cover with a test for salt and speed > 100k H/s.”

Template: **Action → Where → What → Constraints / acceptance criteria.**

### Short cycles

Speak in short blocks → pause → “Tab / Enter” → look at the diff → next command. That cuts [hallucinations](../01-basic-theory/02-user/04-hallucinations.md) and makes rollback simpler.

### Anchors and selectors

Refer to files, functions, lines, tokens:

> “Open `UserRepo`, find the method `findByEmail`, after `return null` add logging via `debug()`.”

With Cursorless you can speak structurally: “take the second part of the token,” “delete the whole function,” “replace every occurrence between A and B.”

### Verbal punctuation and “spelling” mode

When you dictate code / paths / regexes — say the signs out loud: “backtick… close backtick,” “slash,” “colon,” “square bracket.” On macOS there is Spelling / Dictation mode; in Gboard — “insert before,” “delete the word….”

### Clear bounds and escalation

Add rules: “If you are not sure — ask,” “Do not touch SQL migrations,” “If tests fail — show the log and propose 2 fixes.”

### “Say what you want to see”

Instead of a step-by-step “write me a function…” — describe the desired state and the criteria:

> “The authentication service supports email+password and OAuth2; pick a flow with PKCE, write Playwright e2e tests, config via `.env` — no secrets in the repo.”

### Full vibe

Just dictate everything you are thinking, as if you were recording a voice message for a friend. This approach is the simplest, and sometimes it surprises you with how well it works.

## How to start in 5 minutes

**Option A: the simplest, and for money**

1. Install Superwhisper or Wispr Flow.
2. In Cursor press the dictation hotkey → say the task → Enter applies the edits.

**Option B: fully local and free**

1. Install VS Code Speech or Handy.
2. Configure it: the tool will download a model and run it locally. Turn on a push-to-talk hotkey (the one that starts dictation).
3. I like to put it on **right Option** on the Mac.
4. Start your AI agent (Copilot / Cursor / Claude Code and so on).
5. Start a dictionary of project terms (domain names, entities, and so on).

**Option C: “pro mode”**

1. Install Cursorless.
2. Learn the basic “markup” of speech: selecting tokens / ranges, moves, replacements.
3. Add your own macros (refactors, commit templates, CI commands).

## Languages

The Whisper family and modern engines confidently recognize 100+ languages.

If you use several languages at once while dictating, a pre-configured dictionary of project terms can help a lot, or a setting for frequently used languages in the tool itself (EVY, for example, supports that).

## Privacy and security

The main thing to understand here:

- Cloud tools can send your dictations where you would not want them to go.
- Cloud tools can send your dictations where your company does not allow.
- Open-source tools can collect telemetry and send it somewhere.
- Open-source tools can contain malicious code.

Remember these risks, and everything will be fine. More on working with agents, MCP, and untrusted tools: [Security](17-security.md).

## A quality voice workflow

To use voice input as effectively as possible, you need to:

- Assign a convenient (and otherwise unused) hotkey for starting dictation. I use **right Option** on a MacBook.
- Decide how the key works:
  - First option: hold, speak, release (push-to-talk)
  - Second option: press to start listening, talk, press again to stop
  - Personally I prefer the second option.
- Buy a decent microphone — recognition accuracy depends on its quality.
- Try to phrase your thoughts clearly.
- Try keeping a dictionary of project terms.
- Some tools (EVY, for example) support an assistant mode, where you can talk to it directly. Sometimes that is useful.

And the main thing: voice is just a new interface to your development tools. With the right tools and skills it speeds you up no less than [Next Edit Suggestions](04-next-edit-suggestions.md) or [chat inside the IDE](05-ai-chat-in-the-ide.md).

## Related club content

- 2025.09.30 / Call #19: Claude Sonnet 4.5, Claude Agent SDK, AGI and problems of vibe coding
- 2025.07.23 / How to vibe-code a finished app on Bolt.new & Supabase / Valentin Zavadsky
- 2025.04.30 / Workshop on voice agents and LiveKit / Valentin Zavadsky
