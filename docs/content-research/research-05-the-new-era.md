# Research 05 — The new era: what changed in 2025–26, and how a working programmer's day looks now

| | |
| --- | --- |
| Written | 2026-08-29 |
| For | Course structure v1.1 — Moduł 1, lessons 1a, 1b, 1c, 1e, 1f, 1g |
| Status | **Research notes.** Repo-facing English (Article III). Not lesson text. |
| Question asked | Viktar's brief of 2026-08-29: *prove to students that a lot has changed in programming, especially in the last few years, and that we are now in another era; the attitude and the tools programmers use have to evolve.* Anchor source: the DHH / Lex Fridman conversation of August 2026. |
| Feeds | `course-structure-v1.md` v1.1 (Moduł 1); the lessons `czterdziesci-lat-zmian`, `od-podpowiedzi-do-agenta`, `co-model-naprawde-potrafi`, `nowy-warsztat-programisty`, `vibe-coding-kontra-inzynieria`, `jak-nie-wypasc-z-obiegu` |
| Relation to 01 | `research-01` (2026-08-28) holds the evidence base and the education research. This file adds what was **not** in it: a first-person account of the agentic workflow, dated; three 2026 evidence updates that change what 1c may claim; and the dated timeline the lessons now cite. It does not restate `research-01`. |

> **ADR-0008 applies.** Every checkable claim below carries a link and the date it
> was checked (**2026-08-29** unless stated). Where a claim is one person's report
> of a third party — DHH quoting a Shopify study, DHH quoting the Claude Code
> author — it is marked **[reported]** and the lesson text attributes it to DHH
> rather than asserting it. Quotations from the transcript are kept to fragments;
> the lesson text paraphrases and translates.

---

## 1. Why this source, and how it was read

The DHH conversation was chosen as the anchor for three reasons that the lessons
state openly: he sells no AI tool; thirteen months earlier, in the previous Lex
Fridman conversation, he was a sceptic; and he is unusually precise about dates,
numbers and failures. The counterweight — that he is one experienced person at
the frontier with his own project and several subscriptions — is stated in every
lesson that uses him, next to the survey median from Stack Overflow 2025.

The transcript ([lexfridman.com/dhh-2-transcript](https://lexfridman.com/dhh-2-transcript/),
~310 k characters, 5 h 30 min) was read in full in the session that wrote this
file; the sections mined are listed with timestamps in §2. Timestamps are those
of the transcript and of the YouTube chapter list
([youtube.com/watch?v=NYFGCESmikA](https://www.youtube.com/watch?v=NYFGCESmikA)).

## 2. What DHH actually says — condensed, with timestamps

### 2.1 The dividing line, and three "moments" (2:56–18:14)

- **24 November 2025**, Claude Opus 4.5, is "the dividing line" (7:08; the
  announcement is [Anthropic, 2025-11-24](https://www.anthropic.com/news/claude-opus-4-5)).
  The output was "uncannily close" to what he would have written (7:55).
- **The leap was the harness, not the model**: not that Opus 4.5 was much smarter
  than Opus 4, but its "ability to instrument your computer, to use tools, to check
  its own work" (7:55). *This is the sentence 1b is built on.*
- **Early spring 2026**: sub-agents; harnesses "subdivide the task"; work takes a
  fifth or a tenth of the time; but "I had to drive" (10:37).
- **Summer 2026** (Opus 5, Fable, GPT "Sol", some open-weight models): he states
  the problem, the agent chooses the route; "I've become optional in the part that
  produces the code" (11:11).
- **Omarchy Quattro** (his Linux distribution): three months of work, agent share
  "neared 100%", the last two months "100%" (15:14–15:43). He reviewed the shape
  of all of it, read critical model-layer code line by line, did not look at much
  UI or auxiliary code (15:43).
- **The counter-case, from his own company**: Basecamp 5 was the first 37signals
  product that was agent-accelerated, and large existing codebases "proven
  surprisingly tricky to fully accelerate" (15:43). In February 2026 designers were
  allowed to vibe-code PRs and together "destroyed the architecture of the system";
  humans cleaned up by hand (16:44). Conclusion: on substantial existing codebases
  you must be a programmer to vibe code safely (17:33).
- "Decades of progress" in "the last nine months" (4:21); AI went from 5–20% of
  code to 80% — DHH: "Or 100" (5:26–5:49).

### 2.2 The forty-year promise (44:03–46:49)

- Claude Code was released end of February 2025 ([Anthropic, 2025-02-24](https://www.anthropic.com/news/claude-3-7-sonnet));
  DHH did not install it until September 2025 (44:03). Nine months earlier he
  would have called his current views "AI psychosis".
- For 40–50 years people promised programming by talking — 4GLs, Lisp and Smalltalk
  environments — and beyond Access databases and Excel spreadsheets "none of it
  came true" (46:12). The difference now: he is not talking about end users but
  about himself, 25 years in, "seeing the output … and then shipping it" (46:12).
  *This is the closing frame of 1a and the opening of 1b.*

### 2.3 Vibe coding, evaluation, product thinking (47:05–1:00:06)

- Definition: vibe coding is telling an agent to build software and not looking at
  the implementation (51:05) — already in 1f from the earlier session.
- Knowing a lot about programming was for a while "to my deficit": he
  over-prescribed the path; the next moment let anyone "describe outcomes" and get
  better solutions (52:07).
- "Software is product management": what, for whom, priorities, what is in v1;
  many programmers are weak at it, some non-programmers better; for some problems a
  non-programmer with an agent beats a programmer (53:16).
- Omawrite, his Markdown editor in C++/Qt: first version in about 20 minutes
  (26:45); he deliberately "not looked at a single line of that C++" — a black-box
  experiment (53:58). *1f's "light side" example.*
- **[reported]** The Claude Code author told him the Opus 5 system prompt "shrunk by
  80%" because the agent "was actually being damaged by overly prescriptive humans"
  (56:02). Unverifiable from outside; the lesson attributes it to DHH.
- Be as vague as you can to get something on screen, then react — nobody knows what
  they want until they use it (57:25–58:13).
- What humans are good at: "Differential evaluation. You give me three options, I
  pick one" — and fall off a cliff at 22 options (59:18–59:21).

### 2.4 The end of manual programming, and advice (1:00:06–1:22:30)

- Beautiful code was worth sweating over because humans maintained it; "the
  economic payoff of that sweat is diminishing rapidly" (1:00:35–1:01:16). It still
  pays while tokens are scarce: agent-friendly architecture lets agents change code
  without re-learning the whole context (1:02:03). *Already in 1f.*
- If what you loved was "the mechanical bits" of assembling logic others specified,
  that is under threat; if you love building things, "I don't think you're under
  threat at all" (1:10:51).
- Employment: some statistics show more openings (Jevons paradox; the ATM /
  bank-teller example) (1:11:53) — and, in the same breath, some teams will do the
  same work with a tenth of the people, tragic for the individual (1:13:13–1:14:04).
- "Don't try to anticipate anything. You will literally go crazy" (1:17:11) —
  already in 1g. "You can catch up to the frontier in two weeks" (1:24:08, in the
  following chapter) — *new in 1e and 1g.*

### 2.5 Programming setup (1:31:46–1:44:11)

- TextMate for almost twenty years from 2005, then Neovim after the Linux switch;
  agents "require a different tool set": from single-threaded thinking to "parallel
  processing" (1:31:57–1:32:36).
- One agent is "at once both too fast and too slow"; waiting on it feels useless;
  a handful of agents recreates flow because you are always deciding (1:33:15–1:33:50).
- Terminal, not the desktop apps: "Absolutely" / "No" (1:34:50–1:34:57). tmux
  panes first, then Herdr — "essentially tmux plus agent notifications" (1:35:40).
- Four to five machines × about three agents ≈ 16 threads; "maxed out my own
  processing power" (1:38:09). Human bandwidth was "maybe 30 lines an hour … maybe
  it's 20"; now hundreds per hour across the threads — and "lines of code is a
  stupid metric" (1:38:55–1:39:28).
- Neovim as a project browser plus lazygit; he wants context around a diff, not
  only the diff (1:39:57–1:40:37).
- Linux works best with agents because "everything in Linux is either a config
  file or a CLI tool" (1:41:25–1:41:39).

### 2.6 Voice, editing, style (2:07:06–2:21:05)

- He types everything; Omarchy ships optional dictation (VoxType, hold F9), which
  he does not use (2:16:23, 2:22:02).
- He keeps one recurring Bash style rule in the agent's instruction file and has
  stopped writing Bash himself (2:13:23–2:13:53).
- The harnesses "run automated testing"; you no longer say "don't make mistakes",
  you say "make it simpler" (2:15:50). He judges "the shape" and "the proportions"
  and gives feedback "like an editor" (2:15:17–2:15:24).

### 2.7 Models and cost — the Rust benchmark (2:21:05–2:37:55)

- Harnesses are updated "about seven times a day", hence `mise` as an out-of-band
  package manager (2:25:14–2:26:04). *Used in 1g.*
- **[reported]** A Shopify study traced production incidents to PRs and found
  agent-reviewed PRs caused fewer than human-reviewed ones (2:28:10–2:28:50). Not
  published as far as this session could find; attributed to DHH in the lesson.
- His benchmark: port a Python terminal-effects library to a dependency-free Rust
  binary, pixel-perfect, "don't stop until you're finished" (2:30:28–2:31:26).
  Fable: under 45 minutes, startup 86 ms → 2 ms, ~9.6× faster, 3 MB binary
  (2:31:29–2:31:36); done "without knowing any Rust, without looking at the Rust
  code" (2:32:02). Per-token equivalent "would've been 550 bucks" versus "a
  nine-month job" to learn Rust himself; he was on a subscription (2:34:05).
  Cheaper models finished the same plan at a tenth to a twentieth of the cost, more
  slowly (2:34:48–2:37:12).

### 2.8 Harnesses and pace (2:37:55–2:50:57)

- Standard operating procedure: one frontier model writes, a model from a
  different lab reviews ("review with Codex xHigh"), then GitHub's review runs, then
  the human decides (2:38:14–2:38:47). Peer review logic: even good programmers
  produce better code under review, "so build that into your process" (2:39:24).
- He bought a second subscription that morning after hitting limits (2:41:06).
- Is the pace sustainable? "No, no, no … not sustainable at all"; the last three
  months more exhausting than any project in five years (2:47:34–2:47:57).
  Everyone is building their own coordination harness; it will settle, like the
  JavaScript-framework churn (2:48:02).

### 2.9 Open source and the future (27:30–37:21; 3:59:24–4:22:17)

- Over 1,000 PRs merged on Omarchy in three months, many from non-programmers
  (33:46); ~400 open, doubled in a week; agents triage and validate fixes in a VM,
  the human decides merge / no merge (34:32–35:25).
- "The language now is English"; "I've been programming in English for the last
  three months"; he reads a lot of code and writes little; Ruby continues for
  pleasure "like I would go ride a horse" (4:01:45).
- Not addressed anywhere in the conversation: junior developers as a group,
  schools, curricula. The nearest material is §2.4. The lessons do not put words in
  his mouth on these.

## 3. Three evidence updates that change what 1c may claim

### 3.1 METR corrected its own 19% result — 2026-02-24

[We are Changing our Developer Productivity Experiment Design](https://metr.org/blog/2026-02-24-uplift-update/)
(METR, 2026-02-24). The original early-2025 RCT found a 19% slowdown (CI +2% to
+39%). The late-2025 follow-up hit three problems METR names: developers refusing to
participate without AI (so the most AI-optimistic left the sample; pay also fell
from $150/h to $50/h); **30–50% of developers deliberately withheld tasks they
thought AI would accelerate**; and multi-agent use made time-tracking unreliable.
Late-2025 point estimates: original cohort −18% time (CI −38% to +9%), new
developers −4% (CI −15% to +9%) — both toward speedup, and METR calls this "only
very weak evidence". They are moving to shorter fixed-task experiments,
observational GitHub data and surveys.

**What the lesson does with it.** Keeps the 2025 story as the opener, adds a
section *Co stało się z tą liczbą*, and states that citing "19% slower" as current in
2026 is citing a number its authors withdrew. `research-03-building-desktop-apps`
§8.4 reached the same conclusion independently.

### 3.2 The self-assessment gap survived the correction — 2026-05-11

[Measuring the Self-Reported Impact of Early-2026 AI on Technical Worker Productivity](https://metr.org/blog/2026-05-11-ai-usage-survey/)
(METR, 2026-05-11). 349 technical workers surveyed February–April 2026. Median
self-reported speed multiplier 3×; median self-reported *value* increase 1.4–2×.
METR's own caveat: survey results "are not necessarily grounded in reality", and
its 2025 participants "overestimated AI's effect on their time spent on tasks by 40
percentage points on average".

**What the lesson does with it.** This is why the METR story stays: the 39-point
gap of 2025 and the 40-point overestimate of 2026 are the same finding, and it is
the finding that matters for students (compare `research-01` §5.1 on self-reports).

### 3.3 The number that matters most for a school — Anthropic RCT, 2026-01-29

[How AI assistance impacts the formation of coding skills](https://www.anthropic.com/research/AI-assistance-coding-skills)
(Anthropic, 2026-01-29). 52 mostly junior engineers (1+ year of Python), learning
the unfamiliar `Trio` library; AI-assisted group vs hand-coding control; quiz
afterwards. **AI group 50%, control 67%** — a 17-point gap, "the equivalent of
nearly two letter grades" (Cohen's d = 0.738, p = 0.01); largest gap on debugging;
the AI group finished about two minutes faster, not significant. Low scorers
(< 40%) delegated code generation and debugging; high scorers (65%+) asked
conceptual questions, requested explanations, resolved errors themselves.

**What the lesson does with it.** New section *Liczba, która dotyczy ciebie
najbardziej*, and the sentence the course now rests on alongside Osmani's 70%:
*AI lowers the cost of shipping; it does not lower — and may raise — the cost of
understanding.* It is also the direct justification for `Bez AI`, `Rozbierz to` and
the verification journal (`research-01` §5.2), now stated to students rather than
only to Viktar. Note the study is by a model vendor and finds against its own
product's naive use — worth saying in class.

### 3.4 The survey median — Stack Overflow 2025

[2025 Stack Overflow Developer Survey: AI](https://survey.stackoverflow.co/2025/ai)
(fielded 29 May – 23 June 2025, 49,009 respondents; 33,662 answered the AI
section). 84% use or plan to use AI tools (76% in 2024); 50.6% of professional
developers use them daily; 33% trust their accuracy, 46% distrust, 3% "highly
trust"; 66% name "AI solutions that are almost right, but not quite" as the top
frustration; 45.2% say debugging AI-generated code is time-consuming; 14.1% use
agents daily, 37.9% have no plans to.

**Caution recorded.** A page titled "Stack Overflow Dev Survey 2026: AI at 84%,
Trust at 3%" ([byteiota.com](https://byteiota.com/stack-overflow-dev-survey-2026-ai-at-84-trust-at-3/),
dated 2026-06-11) repeats the **2025** figures under a 2026 headline and links to
the 2025 survey. It was **not** used. Whether a 2026 survey has been published was
not established in this session; re-check before the lesson is taught.

**What the lesson does with it.** New section *Co mówią sami programiści* in 1c,
and the frame used in 1e: DHH describes the frontier, the survey describes the
median; students start in the median.

## 4. The dated timeline now cited in 1b

All checked 2026-08-29.

| Date | Event | Source |
| --- | --- | --- |
| 2022-06-21 | GitHub Copilot generally available; $10/month, free for students | [GitHub Blog](https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/) |
| 2022-11-30 | ChatGPT released | [OpenAI](https://openai.com/index/chatgpt/) |
| 2024-11-25 | Model Context Protocol announced — "an open standard for connecting AI assistants to the systems where data lives" | [Anthropic](https://www.anthropic.com/news/model-context-protocol) |
| 2025-02-02 | Karpathy's "vibe coding" post | [x.com/karpathy](https://x.com/karpathy/status/1886192184808149383) (already in 1f) |
| 2025-02-24 | Claude Code — "our first agentic coding tool", limited research preview, command line | [Anthropic](https://www.anthropic.com/news/claude-3-7-sonnet) |
| 2025-11-24 | Claude Opus 4.5 — DHH's "dividing line" | [Anthropic](https://www.anthropic.com/news/claude-opus-4-5) |
| spring 2026 | Sub-agents in the harnesses (DHH, 10:37) | transcript only — no single vendor date is claimed in the lesson |
| 2026-06-09 | Claude Fable 5 and Mythos 5 | [Anthropic](https://www.anthropic.com/news/claude-fable-5-mythos-5) (already in 1d) |

## 5. The forty-year baseline — what 1a takes from the history research

1a is built almost entirely from `research-03-desktop-app-history` (§Orientation,
§A1, §A4, the cross-cutting questions) and `research-04-mobile-app-history`
(§Shape of the period, §A1, §A2.1, §A2.8, Part C, cross-cutting questions), and
inherits their links. Two additions were needed for the closing frame:

- The 4GL promise: [Wikipedia, *Fourth-generation programming language*](https://en.wikipedia.org/wiki/Fourth-generation_programming_language)
  for the "application development without programmers" slogan — **secondary**;
  the primary is James Martin's 1982 book of that title, not retrievable here.
- Zuckerberg on HTML5, 2012-09-11: [VentureBeat](https://venturebeat.com/mobile/facebooks-zuckerberg-the-biggest-mistake-weve-made-as-a-company-is-betting-on-html5-over-native)
  — already in `research-04` cross-cutting Q4.

Deliberately left out of 1a, per both history files' "leave out" lists: COM, the
GAC, Symbian corporate history, Palm heap sizes beyond one sentence, the full
Silverlight → UWP archaeology, anything about Delphi that is not the price.

## 6. What this means for the course — done and proposed

**Done in v1.1** (recorded in `course-structure-v1.md` changelog): Moduł 1 is seven
lessons; 1d untouched at `order: 4`; the vibe-coding lesson moved behind the demo;
1c updated per §3; 1g gains the four-indices section from `research-03` §A5.

**Proposed, not done:**

1. **Verify the two [reported] claims** before the lesson is taught, or leave them
   attributed: the Shopify incident study, and the 80% system-prompt reduction.
   Both are in 1e only as "DHH says".
2. **Re-check whether a Stack Overflow 2026 survey exists** (§3.4). If it does, 1c
   and 1e should cite it and the 2025 figures move to "a year earlier".
3. **Rename the four colliding research files** (`03`/`04` × `-building-` /
   `-history`) — both history files and the README already propose it. This file
   took the next free number rather than adding to the collision.
4. **Moduł 3 must answer 1e's "be vague" warning.** 1e tells students that DHH can
   be vague because he has taste and they cannot; 3c should pick that sentence up
   explicitly when it introduces acceptance criteria, so the two lessons read as
   one argument.

## 7. What rots

| Claim | Shelf life | Re-check |
| --- | --- | --- |
| Every model and tool name in 1e (Opus 4.5/5, Fable, Codex, Claude Code, Herdr, tmux, mise, Omarchy) | **Weeks to months** | The lesson says so in its sources block; the *shape* (terminal, parallel, cross-model review, English) is what is taught |
| "16 threads", "seven times a day", "$550" | Months — one person's snapshot | Transcript only; if DHH publishes a later setup, quote the later one |
| METR's late-2025 estimates (§3.1) | METR promised a new design; expect a 2026 result | [metr.org/research](https://metr.org/research/) |
| Stack Overflow 2025 figures | **A 2026 survey may already exist** (§3.4) | [survey.stackoverflow.co](https://survey.stackoverflow.co/) |
| Anthropic RCT figures | Stable as a published study; may be superseded by replication | [anthropic.com/research](https://www.anthropic.com/research) |
| The dated timeline (§4) | Stable — dates do not move; the *last* row will be superseded by every model release | Add rows; do not rewrite |
| The forty-year baseline (1a) | **Does not rot**, except the RAD Studio price and the link URLs | `research-03-desktop-app-history` §What rots |

## Sources

Grouped; all opened 2026-08-29. **[P]** primary · **[V]** vendor claim about its own product · **[S]** secondary.

### The anchor
- ★ **[P]** [DHH: Future of Programming, AI, Agentic Engineering, Vibe Coding & Linux — Lex Fridman Podcast #501](https://www.youtube.com/watch?v=NYFGCESmikA), August 2026; transcript at [lexfridman.com/dhh-2-transcript](https://lexfridman.com/dhh-2-transcript/). Sections used: 2:56, 18:14, 27:30, 37:21, 47:05, 1:00:06, 1:10:24, 1:22:30, 1:31:46, 2:07:06, 2:21:05, 2:37:55, 3:59:24.

### Evidence updates
- ★ **[P]** [We are Changing our Developer Productivity Experiment Design — METR, 2026-02-24](https://metr.org/blog/2026-02-24-uplift-update/)
- **[P]** [Measuring the Self-Reported Impact of Early-2026 AI on Technical Worker Productivity — METR, 2026-05-11](https://metr.org/blog/2026-05-11-ai-usage-survey/)
- ★ **[P][V]** [How AI assistance impacts the formation of coding skills — Anthropic, 2026-01-29](https://www.anthropic.com/research/AI-assistance-coding-skills)
- **[P]** [2025 Stack Overflow Developer Survey — AI](https://survey.stackoverflow.co/2025/ai) · [Methodology](https://survey.stackoverflow.co/2025/methodology)
- **[S — not used, recorded as a trap]** [byteiota, "Stack Overflow Dev Survey 2026"](https://byteiota.com/stack-overflow-dev-survey-2026-ai-at-84-trust-at-3/) — 2025 figures under a 2026 headline

### Timeline
- **[P][V]** [GitHub Copilot is generally available to all developers — 2022-06-21](https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/)
- **[P][V]** [Introducing ChatGPT — OpenAI, 2022-11-30](https://openai.com/index/chatgpt/)
- **[P][V]** [Introducing the Model Context Protocol — Anthropic, 2024-11-25](https://www.anthropic.com/news/model-context-protocol)
- **[P][V]** [Claude 3.7 Sonnet and Claude Code — Anthropic, 2025-02-24](https://www.anthropic.com/news/claude-3-7-sonnet)
- **[P][V]** [Introducing Claude Opus 4.5 — Anthropic, 2025-11-24](https://www.anthropic.com/news/claude-opus-4-5)
- **[P][V]** [Claude Fable 5 and Claude Mythos 5 — Anthropic, 2026-06-09](https://www.anthropic.com/news/claude-fable-5-mythos-5)

### Popularity indices (for 1g)
- **[P]** [TIOBE Index](https://www.tiobe.com/tiobe-index/) · [definition](https://www.tiobe.com/tiobe-index/programming-languages-definition/) · **[S]** [Please Stop Citing TIOBE — Krishna Sundarram, 2022-07-28](https://nindalf.com/posts/stop-citing-tiobe/)
- **[P]** [Stack Overflow 2025 — Technology](https://survey.stackoverflow.co/2025/technology)
- **[P][V]** [Octoverse 2025 — GitHub, 2025-10-28](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)
- **[P]** [Top Programming Languages 2025 — IEEE Spectrum, 2025-09-23](https://spectrum.ieee.org/top-programming-languages-2025) · [methodology](https://spectrum.ieee.org/top-programming-languages-methodology-2025)

### Named in 1e without a claim attached
- [Omarchy](https://omarchy.org/) · [Claude Code: subagents](https://code.claude.com/docs/en/sub-agents) · [tmux](https://github.com/tmux/tmux/wiki) · [mise](https://mise.jdx.dev/)

### In this repository
- [`research-01-ai-assisted-development.md`](research-01-ai-assisted-development.md) — the evidence base this file updates
- [`research-03-desktop-app-history.md`](research-03-desktop-app-history.md) · [`research-04-mobile-app-history.md`](research-04-mobile-app-history.md) — 1a's sources
- [`research-03-building-desktop-apps.md`](research-03-building-desktop-apps.md) §8.4 — reached the METR/Anthropic conclusion independently; note its own "not yet double-checked" warning, which §3 of this file now resolves for those two claims
- [`course-structure-v1.md`](course-structure-v1.md) v1.1 — where the decisions landed
