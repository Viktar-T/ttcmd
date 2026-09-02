# Brief — 3a · Budowa 1: co model naprawdę dostaje

| | |
| --- | --- |
| Lesson | `content/moduly/03-budujemy/budowa-1-prompt-token-okno.mdx` · `order: 1` |
| Written | 2026-09-01, by write-lesson · approved: **not approved — autonomous run** |
| Mode | **autonomous** — drafted in the same run, unapproved (AGENTS.md §2) |
| Research | `course-structure-v2.md` Moduł 3; `research-01` §2.5, §6; primary sources found at drafting time (table below). `docs/learn-ai-codding/02-user/{01-prompt,02-token,03-context}.md` read as a map only — not citable (03-index, „Research gate") |
| Drafted | 2026-09-01, revised the same day after a fresh-context review — deviations at the end |

## Reader position

Has read 0a, 0c, 1b–1h, 2a–2d. Knows **token** as one clause from 1d
(„jednostka, w której model liczy tekst — kawałek słowa") and has seen the
phrase *okno kontekstu 1M tokenów* in the same list; neither was explained.
Can: create and run an Avalonia project, ask an agent for one small change,
read a short diff, commit, revert, branch, push. Has never: kept one session
with an agent going for an hour; seen a session degrade; counted a token;
looked up a model's context window; written a request with more than one
requirement in it.

## Carrying question

Dlaczego agent, który na początku rozumiał wszystko, po godzinie zaczyna
gubić rzeczy, o które prosiłeś na starcie — i co on właściwie dostaje, kiedy
piszesz do niego piątą wiadomość?

## Anchor

**The minutnik thread**: one Avalonia project, `minutnik`, built in one
session against **siedem zapisanych zasad** — and the conversation that builds
it, which the student can see growing in the editor's panel. The application
is the visible half of the anchor; the thread is the half the lesson is about.
Every abstraction lands on it: the prompt is that whole thread, the tokens are
what it is counted in, the window is what it has to fit into, and the moment
the agent breaks rule 4 while answering request 5 is the degradation the
lesson explains.

The seven rules (short enough to state in one message, many enough to be
dropped): praca 25 minut i przerwa 5 minut, obie do zmiany w oknie · start /
pauza na jednym przycisku, reset na drugim · widoczny licznik ukończonych
cykli · po pracy przerwa startuje sama · czas jako `mm:ss` · interfejs po
polsku, nazwy w kodzie po angielsku · żadnych dodatkowych bibliotek.

## Shape

**Hands-on.** The build runs through the lesson; the concept sections are the
answer to something that has just happened in it.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | Two lines read in ten seconds in 2c → today one request in five and something you asked for at the start is gone → what does the model actually get on the fifth message | names the minutnik and the seven rules |
| 1 | Minutnik: siedem zasad w jednej wiadomości | build starts; the first message written as 1e taught (what, what is visible, how you will know it works); run it; read the diff | the project exists, the rules are on the card |
| 2 | Co dostaje model, kiedy piszesz piątą wiadomość | the mechanism: the API is stateless, the whole thread is re-sent every turn; „prompt" is not the last message | the student's own thread, counted turn by turn |
| 3 | Token: jednostka, w której to się liczy | recall 1d's clause and develop it; the student pastes their own first message into a tokenizer and sees the split | the first message of the minutnik thread is what gets measured |
| 4 | Okno kontekstu — i drugi limit | window vs max output, two different numbers; a window is a limit, not a memory | how many minutnik turns fit; what the tool does when it stops fitting |
| 5 | Dwa różne psucia się sesji | hard limit (the tool compacts or truncates — a tool behaviour, not the model's) vs dilution (rule 4 lost among forty turns of noise); what to do about each | the broken rule from section 1, explained |
| 6 | Minutnik, który działa, i wątek, który rozumiesz | ending: answers the opening as four actions | the finished app + the thread you can now describe |

## Owns · recalls · avoids

- **Owns** (proposed appendix rows): okno kontekstu · tokenizacja / tokenizer ·
  bezstanowość („model nie pamięta poprzedniej wiadomości") · wątek (sesja) ·
  limit odpowiedzi · kompaktowanie / skracanie wątku *(named as tool behaviour,
  one clause)*.
- **Recalls**: token (1d, one clause + link) · prompt (1d) · diff (2c) ·
  karta obserwacji (1e) · niedeterministyczny (1d, one clause — the same
  request twice gives different code) · „jednostka pracy" (1b) is *not* needed
  here and is left alone.
- **Avoids**: reguły projektu / `AGENTS.md` (home 3c — this lesson says „na
  razie przepisujesz je ręcznie") · few-shot and prompt techniques (home 3b —
  the lesson does not teach how to write the request, only what happens to it)
  · halucynacja (home 3d) · indeksowanie i RAG (home 3c).

## Exercises

1. **Recall** — what is sent to the model when you write the fifth message;
   what a token is; the two limits and the difference between them.
2. **Action on the anchor** — paste your own first message into the tokenizer,
   record the token count; paste an English translation of the same message and
   record it too. Write both numbers and the date on the card.
3. **Build step** — finish the minutnik so that all seven rules hold at once;
   make one visible change by hand, without the agent; commit each request
   separately; push.
4. **Research** — find in your editor's or the model vendor's documentation how
   large the context window of the model you are using is, and what the answer
   limit is. Write both numbers, the link and the date. They will be wrong
   within a year, and that is the point of the date.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| The API is stateless — the full conversation history is sent with every request | https://platform.claude.com/docs/en/build-with-claude/working-with-messages | no date on page; checked 01.09.2026 | have |
| Same, second vendor | https://developers.openai.com/api/docs/guides/conversation-state | no date on page; checked 01.09.2026 | have |
| A token is roughly four characters / three quarters of a word, and the relationship differs between languages | https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them | updated ≈29.08.2026 (relative date only) | have |
| ~3,5 characters per token, „varies depending on the language used" | https://platform.claude.com/docs/en/docs/resources/glossary | no date on page; checked 01.09.2026 | have |
| Context window and output limit are two separate numbers (1M in / 64k out) | https://ai.google.dev/gemini-api/docs/gemini-3 | 26.08.2026 | have |
| Same, second vendor (1M context / 128K max output) | https://platform.claude.com/docs/en/about-claude/models/overview | no date on page; checked 01.09.2026 | have |
| A public tokenizer usable without an account | https://huggingface.co/spaces/Xenova/the-tokenizer-playground | no date on page; checked 01.09.2026 | have |
| `DispatcherTimer` runs its tick on the UI thread; all control access must be on the UI thread, otherwise „Call from invalid thread" | https://docs.avaloniaui.net/docs/app-development/threading | 03.06.2026 | have |
| Parsing a number without an `IFormatProvider` uses the current culture | https://learn.microsoft.com/dotnet/standard/base-types/parsing-numeric | 28.06.2025 | have |
| **Dropped:** „Polish costs more tokens than English" | no vendor documents this directionally | — | dropped — the student measures it instead and records their own number |

## Reader assumptions to verify

- That an hour-long session with the class tool actually degrades on a project
  this small. It is the lesson's central experience; if the class tool
  compacts silently and holds all seven rules, section 5 becomes a
  demonstration by the teacher rather than by the student. **Viktar should run
  the build once on the lab machine before the lesson.**
- That the tokenizer page is reachable from the school network (open question 1
  in `03-index.md`).
- That students can read `mm:ss` formatting code without it becoming the
  lesson. Assumed yes: they have C++/Python behind them (`content-reader.md`).

## Decisions

- **Minutnik pomodoro instead of the v2.3 stoper** — a stopwatch is one
  request and needs no rules, so the thread never grows; seven simultaneous
  rules are what make the fifth request break one. Rejected: keeping the
  stopwatch and manufacturing a long session artificially, which would teach
  the lesson's mechanism as a stunt.
- **No sound at the end of a phase** — rejected: an audible signal, which
  Avalonia does not ship and which would spend the week on an audio stack.
- **The lesson does not teach how to write a better request** — that is 3b.
  Here the request stays as written and the lesson is about its fate.
- **The tokenizer exercise measures the student's own message**, not a canned
  sentence — rejected: a prepared example, which turns a measurement into a
  reading exercise.
- **„Kompaktowanie" is named as something the tool does, not the model**, and
  gets one clause — the corpus that motivated this module gets this wrong
  (`03-index.md`, research gate), and the distinction is the whole of section 5.

## Open questions for Viktar (≤ 3)

1. Nothing beyond the module-level questions in `03-index.md` (the tokenizer
   allowlist blocks exercise 2 of this lesson).

## Deviations from the approved arc

- **The opening starts from the end of 2d, not from 2c.** The first draft
  opened on „a two-line change read in ten seconds", which is the change 2d had
  already retired on its way to forty-line diffs, `restore` and a branch.
- **The UI-thread trap no longer explains threads.** `wątek` is this lesson's
  own term for the conversation, so the collision was unacceptable and the
  reader has no way into threads anyway. The trap now names the error message,
  prescribes `DispatcherTimer` and defers the mechanism to Moduł 5 — costing one
  extra forward reference.
- **The culture-parsing source is not cited.** It survives as an observation in
  the build exercise („wpisz 25,5, potem 25.5, zapisz, co się stało"), which
  needs no source. The `Źródła` list is shorter by one entry.
- **Nothing is asserted about what survives compaction.** *Kompaktowanie* is
  named as tool behaviour and the student is sent to their tool's documentation;
  the first draft claimed the oldest message is what falls out.
- **„Rozwodnienie" is marked as the teacher's word**, not a producer's term.
- **No invented magnitudes.** „Kilkanaście razy większe", „pięćdziesiąt słów",
  „kilka tysięcy" were replaced by what the student measures.
- **`Zapytanie` is glossed on first use** — the reader file assigns that word to
  SQL.
- **No exercise number is written by hand** (ADR-0003).
