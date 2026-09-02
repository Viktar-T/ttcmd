# Brief — 3b · Budowa 2: jak prosić, żeby dostać

| | |
| --- | --- |
| Lesson | `content/moduly/03-budujemy/budowa-2-techniki-promptowania.mdx` · `order: 2` |
| Written | 2026-09-01, by write-lesson · approved: **not approved — autonomous run** |
| Mode | **autonomous** — drafted in the same run, unapproved (AGENTS.md §2) |
| Research | `course-structure-v2.md` Moduł 3; `research-01` §2.5 (the skill that transfers is judging the result, not prompting); primary sources in the table below |
| Drafted | 2026-09-01, revised the same day after a fresh-context review — deviations at the end |

## Reader position

Has read 0a, 0c, 1b–1h, 2a–2d, 3a. Has built the minutnik with an agent
against seven stated rules, watched a rule get dropped, measured their own
message in a tokenizer and looked up their model's context window. Knows: the
whole thread is re-sent every turn; a token; the window and the answer limit.
Has never: written the same request twice on purpose to compare the results;
given a model an example of what it should produce; asked a model to improve
a prompt; had a file on disk as the thing being judged rather than a window.

## Carrying question

Ta sama prośba, wysłana cztery razy, daje cztery różne pliki na dysku — co
dokładnie w prośbie o tym decyduje?

## Anchor

**One request, `notatnik`, four rounds, four files on disk.** The application
is a notepad that saves notes to `notatki.md`; the anchor is the request
„zapisz notatki do pliku" run four ways and the four files it produces, kept
side by side in the repository so they can be opened next to each other:

- round 1 — the task alone (the model picks a format);
- round 2 — the task plus the format written out;
- round 3 — the task plus **one example file**;
- round 4 — the task plus three examples, differing on purpose.

The required format, once it is stated: one file `notatki.md`, each note as
`## yyyy-mm-dd HH:mm — tytuł`, body under it, blank line between notes, newest
at the top, Polish characters intact (UTF-8).

## Shape

**Hands-on**, with an unusual middle: the same section structure repeats four
times by design, because the comparison *is* the lesson. Each round is a
section that ends with the file it produced.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | last week you learned what the model receives; in the minutnik you re-typed the same request three times before the result was right → which part of the request did the work? | announces the four rounds |
| 1 | Runda 1: sama prośba | build the notepad zero-shot; it works; open the file it wrote — a format nobody chose | file 1 exists |
| 2 | Zadanie, format i ograniczenia | the concept: three different things live in one message, and only the first is usually written; round 2 with the format spelled out | file 2, compared with file 1 |
| 3 | Przykład działa lepiej niż opis | zero-/one-/few-shot; round 3 with one example file, round 4 with three; why examples fix shape better than adjectives | files 3 and 4 |
| 4 | Kiedy prosić o rozumowanie, a kiedy nie | chain-of-thought, its 2022 origin, and the current caveat: models that reason internally do not need to be told to think step by step, and telling them can make things worse | applied to the one hard part of the notepad (sorting newest-first while appending) |
| 5 | Niech model poprawi twoją prośbę | meta-prompting: paste round 1's message, ask what is missing, run the improved version; compare with round 2 | file 5, the cheapest win in the lesson |
| 6 | Cztery pliki obok siebie | ending: what actually did the work (format and example, not politeness), and the honest limit — the skill that transfers is telling whether the result is right | all files open at once |

## Owns · recalls · avoids

- **Owns** (proposed appendix rows): format odpowiedzi · zero-shot / one-shot /
  few-shot (przykłady w prompcie) · łańcuch myśli (chain-of-thought) ·
  meta-prompt · rola i ograniczenia w prośbie.
- **Recalls**: the whole thread is re-sent (3a, one clause + link — it is why
  three examples are not free) · token (3a) · niedeterministyczny (1d, one
  clause: two identical requests give different code, so a comparison of one
  run each is a hint and not a measurement) · METR's gap between feeling and
  result (1c, one clause, no numbers — the reason rounds are compared on disk
  rather than on impression).
- **Avoids**: reguły projektu (home 3c — this lesson keeps re-typing the
  format on purpose; that ache is 3c's opening) · halucynacja (home 3d — when
  the agent writes an API that does not exist here, the lesson says only „zapisz
  to na karcie", one forward reference) · RAG, indeksowanie (home 3c).

## Exercises

1. **Recall** — three things that live in one request; what few-shot means;
   one situation in which asking for step-by-step reasoning is a bad idea.
2. **Action on the anchor** — take any one round and run it a second time
   unchanged. Compare the two files. Write on the card how much of the
   difference between rounds could just be the model being non-deterministic.
3. **Build step** — finish the notepad against the stated format, with the
   format written once and for all in the request that survives; one change by
   hand without the agent; commit each round separately so the history holds
   all four; push.
4. **Research** — find the prompting guide published by the vendor of the model
   you use. Note the link, the date you read it, and one recommendation you had
   not met in this lesson.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| Examples are one of the most reliable ways to steer output format; 3–5 examples recommended | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices | no date on page; checked 01.09.2026 | have |
| Few-shot as the original result — tasks specified purely by demonstrations in the prompt | https://arxiv.org/abs/2005.14165 | 28.05.2020 (v1) | have |
| Chain-of-thought: intermediate steps improve reasoning tasks | https://arxiv.org/abs/2201.11903 | 28.01.2022 (v1) | have |
| Thinking models reason internally before answering | https://ai.google.dev/gemini-api/docs/thinking | 26.08.2026 | have |
| Prefer general instructions over a prescriptive step-by-step plan; manual CoT is a fallback | https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices | no date on page; checked 01.09.2026 | have |
| `SaveFileDialog` / `OpenFileDialog` were removed in Avalonia 12; the replacement is `IStorageProvider` | https://v11.docs.avaloniaui.net/docs/avalonia12-breaking-changes/ | 05.03.2026 | have — **used only as a footnote here; the story's home is 3d** |
| Saving a file goes through `StorageProvider.SaveFilePickerAsync` and `OpenWriteAsync` | https://docs.avaloniaui.net/docs/services/file-dialogs | no date on page; checked 01.09.2026 | have |
| **Dropped:** „role prompting improves accuracy" | contested in the literature, no source found that survives reading | — | dropped |

## Reader assumptions to verify

- That four rounds fit in one week beside the build itself. The build is
  deliberately small (a text box, a list, one save), and rounds 3–4 differ only
  in the message, not in the code.
- That the class tool will let a student re-run a request in a fresh thread
  easily. If it does not, rounds must be run as separate sessions — the lesson
  says so in one sentence.
- That students will hit the removed `SaveFileDialog`. Assumed likely, not
  asserted: the lesson tells them to record the failure, and 3d explains it.

## Decisions

- **The notepad keeps its v2.3 slot but gains a required save format** —
  rejected: a plain notepad, whose output is whatever the user typed, so no
  round differs visibly from another.
- **Comparison happens on disk, not in the chat.** Four files, four commits,
  opened side by side. Rejected: comparing the agent's answers in the panel,
  which is exactly the „impression instead of evidence" the course argues
  against.
- **Chain-of-thought is taught with its 2026 caveat**, not as a technique to
  apply by default — rejected: the version in the third-party corpus, which
  presents it as a straight win; the vendors' current guidance says the
  opposite for reasoning models.
- **Meta-prompting comes last, not first** — it is the best trick in the lesson
  and would flatten the four rounds if it opened them.
- **The lesson ends by demoting itself**: prompting is a skill with a ceiling,
  and the transferable one is judging the output (`research-01` §2.5).
  Rejected: closing on „and now you can prompt", which the course's own
  research contradicts.

## Open questions for Viktar (≤ 3)

1. None beyond `03-index.md`.

## Deviations from the approved arc

- **The anchor needed a mechanism the brief did not specify.** Every round
  writes the same `notatki.md`, so „four files side by side" was impossible as
  written. Each round is now copied to `rundy/runda-N.md` before the next one
  starts, and the ending opens that folder.
- **`git diff` is used, not dismissed.** The first draft said it would not help;
  in fact each round is its own commit and the diff between them is exactly how
  the *code* change is read. Only the produced files need the copies.
- **The removed Avalonia dialog class gets its link and a `Zrodlo`** — the brief
  called it a footnote and the first draft made the claim without one. The
  explanation still belongs to 3d.
- **`Kodowanie` is glossed** where UTF-8 first matters.
- **A fifth file.** The meta-prompt round is saved as `runda-5.md`, so the
  comparison with round 2 has something to compare.
- **The opening no longer asserts the reader needed three attempts** in the
  minutnik; it describes the option, not their history.
- **Dropped from the owns list:** *rola w prośbie* — no source survived reading.
