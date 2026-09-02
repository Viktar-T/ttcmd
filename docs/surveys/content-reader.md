# Content reader — who is reading the lessons

| | |
| --- | --- |
| Status | **First data, 2026-09-02.** Written 2026-08-30 from the programme and Viktar's description of the class; the blocks below were replaced on 2026-09-02 with the counts from the first **12** answers to `ques-for-content-reader.md` (`ankieta-start-2026-09-aggregate.md`). Twelve is one group's worth at most and self-selected: every count is „of 12”, and the file is rewritten again when the second group and the non-respondents answer. Lines still marked TO CONFIRM had no question or no usable answer |
| Owner | Viktar owns the facts. An agent may reformat this file; it may not change a fact in it without the questionnaire or Viktar behind the change |
| Loaded by | `.claude/skills/write-lesson` and `.claude/skills/revise-lesson`, in full, before `docs/content-style.md` |
| Feeds | The reader test and the opening recipe in `docs/content-style.md`; the "reader position" line of every brief in `docs/content-briefs/` |
| Privacy | Aggregate only. Counts, patterns and paraphrase. No name, no quote that could identify a student (Article IV). The export itself is gitignored and never enters the repo |

## The rule the skills apply

> At the opening of any lesson, the student knows **exactly** what this file
> says plus what the published lessons before it have taught. Nothing else.

A sentence that needs more than that to be understood is a sentence written
for a different reader. It is moved after the lesson that supplies the missing
piece, or rewritten so it does not need it. A sentence that asserts something
about the reader („całe twoje doświadczenie…”) is checked against this file;
if the file does not say it, the sentence goes.

## Who they are

Fourth-year students of a five-year *technikum*, profile *technik programista*,
seventeen to nineteen years old, two groups of roughly thirty, meeting eight
hours a week from 1 September 2026. Two to three years of programming lessons
at school. **Nobody has taken INF.03 yet** (12 of 12) — the course runs
alongside INF.03 preparation, not after it, and INF.03 is the exam in their
heads this year. No industry experience in the sense of a software team: 4 of
12 have been on an internship, all of them support work (hardware, cabling,
3D printing, containers), and 8 will go this year. Two freelance (one builds
websites to order); 3 of 12 have been paid for code or a site at least once.

They are intelligent and will notice condescension. They are also not the
reader of a technology essay: a name they have never met costs them a sentence
of attention, and three such names in a paragraph cost them the paragraph.
Their own words for the hardest thing in programming so far: remembering what
the lines mean, understanding code, the differences between languages.

## Done with their own hands — counts of 12

- **Languages at basic level or above (A1):** HTML/CSS 12 · C++ 11 · Java 9 ·
  Python 5 · JS/TS 5 · SQL 2 · **C# 0**. Self-rating (C1): nobody above
  „piszę proste programy” in any language; **5 of 12 reach that level in at
  least one** — Java 5, C++ 3, Python 2, JS/TS 2, SQL 1. „Nie znam”: C# 11,
  PHP 12, Kotlin/Swift 12, SQL 9, Python 9, Java 6, C++ 5. For a one-week
  task they would pick Java (5), TypeScript (2), or do not know (4). **Java
  and C++ are the languages of their intuition; C# is new to everyone.**
- **Console programs:** 10 several times in class. **Static sites:** 10
  several times. **A site with login or a database:** 7 never, 4 on their
  own, 1 in class — so no PHP/SQL floor to lean on.
- **A program with a window:** 5 several times in class, 5 once, 2 never —
  but **1 of 12 can explain an event and a click handler** (D1). They have
  clicked a button in a designer, not understood an event.
- **Concepts they can explain without notes (D1):** klasa i obiekt 6 ·
  interfejs 6 · dziedziczenie 2 · żądanie HTTP 2 · wyjątek 1 · lista i słownik
  1 · SQL JOIN 1 · JSON 1 · wątek 1 · rekurencja 1 · zdarzenie 1 · **„żadnego
  z tych” 5**. Per respondent: 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 9.
- **Largest program:** about 100 lines is the modal answer; 3 never wrote
  one or do not remember; two outliers (a web app at an internship; an
  ~80-file site with real users). Used by: teacher for a grade 5 · nobody,
  unfinished 5 · friends or family 1 · strangers 1.
- **Tools:** terminal 11 · **Linux beyond lessons 11** · VS Code 10 ·
  Rider/IntelliJ/PyCharm 7 · Visual Studio 5 · GitHub 4 · Git 3 · debugger 2
  · Docker 1. A GitHub project with history: 8 never. **Lesson 0c is still
  written as if for nobody; the terminal is not an obstacle.**
- **AI:** ChatGPT 10 · Gemini 9 · Copilot 6 · Claude 6 ever used. Last month
  (August): none 6 · a few times a month 4 · weekly 1 · daily 1. For:
  explaining how something works 9 · generating from scratch 7 · fixing my
  code 7 · explaining an error 6. When AI writes code: **8 say they read all
  of it**, 3 skim, 1 runs and sees — and 6 of 12 score 2 of 5 on „rozumiem
  kod, który AI mi pisze”. **They read and do not understand; that gap, not
  „they don't read”, is the lever.** Paid access: 1 of 12.

## Not done — kept as the list of things a lesson may not assume

- Worked on the same files with someone else: 7 never (4 a few times, 1
  regularly). Resolved a conflict; reviewed someone's change: nobody asked,
  assume no.
- Returned to their own code after a month and changed it: not asked; assume
  no — **12 of 12 have no project of their own.**
- Had a **user** who was not themselves: 8 never (program used by someone
  else); a program online or in a store: 7 never; a release, a bug report,
  installing on someone else's machine: assume no.
- Written an automated test: 6 never, 4 once or a few times in class, 2 on
  their own.
- Read a diff, a stack trace to the end, documentation in English for a whole
  feature: not asked; assume no.
- Used a terminal with confidence; used Linux beyond a lesson: **done — 11
  of 12.** Removed from this list.
- Paid for a developer tool: 1 of 12 pays for AI (two subscriptions).
- Seen a technology they know be replaced by another. Nothing in their
  programming life has been *retired* yet.

The last line is why forty years of history do not land as a story for this
reader: there is no experience of loss to attach it to. The line about a user
is why „koszt utrzymania” is an abstraction here and not a memory.

## Believe on day one — E5, scale 1–5, n = 12

| Statement | mean | what it means for the lessons |
| --- | --- | --- |
| AI zastąpi większość programistów w 5 lat | 3,4 | mildly yes; 1f's „obie rzeczy naraz” lands on an open question, not a belief to break |
| Kod od AI jest zwykle poprawny | **2,2** | **they do not believe it.** 1c argues that AI is more useful than they think, not less trustworthy |
| Z AI uczę się szybciej | 2,8 | split (3 „wcale”, 2 „całkowicie”); the Anthropic RCT's two ways of using an assistant is the lesson, not a correction |
| Rozumiem kod, który AI mi pisze | 3,0 | half at 2; read against „czytam całość” 8 of 12 |
| Wolno oddać niezrozumiany kod, jeśli działa | **1,4** | unanimous no; the course does not need to argue this, only to make it hard to keep |
| Programowania ręcznie nadal warto się uczyć | **4,0** | 11 of 12 at 3 or above; the by-hand blocks and Moduł 5 are wanted, not imposed |

The reader file's earlier guesses — „a program is finished when it runs”,
„the hard part is typing; AI does it”, „code that AI wrote and works is
correct” — are **not** what this sample believes. They are sceptics who want
to be able to write a program themselves.

## Want — F, I, J

- **Interest is elsewhere:** hardware / electronics / robots 9 · games 8 ·
  graphics / UI / design 5 · networks / servers / cloud 4 · **desktop apps 3**
  · web 3 · AI 2. Outside school: helping people with computers 7 · nothing
  4 · Discord or a forum 4 · courses 3 · own programs 2. Examples and project
  ideas may follow the room (a tool for the PC builder next to them) without
  changing the subject.
- **What „udany kurs” means in June (J4):** „umiem samemu napisać program” or
  its equivalent 4 of 9 · a finished project 2 · „I learned something” 3.
  **Autonomy, not speed.**
- **What worked worst before (J5):** commands explained without saying how
  they work; no group projects (asked twice, unprompted); too little help;
  copying from a book instead of building small things up. **Best (J6):**
  working alone 2; teachers helping; websites and windows.
- **How they learn (J7):** video 7 · read and try 6 · talk and ask 5 · live
  demo then repeat 3 · a task and search 2. Prefer: alone 8 · depends 8 · in
  a pair 7 · a group 1. The site is text-first; presentation mode and the
  live demo are the answer the survey asks for.
- **After school (I1):** studia informatyczne 4 · inne studia 4 · nie wiem 2
  · praca poza IT 1 · własna firma 1. **INF.04 „nieważny” 10 of 12** — read
  with A2: INF.03 is the exam ahead of them and INF.04 may be invisible from
  where they sit. The exam is not a lever this year.
- Platform (J3, multi): Windows 9 · przeglądarka 7 · Android 6 · Linux 4 ·
  iOS 3 · macOS 3. No phone-first signal (J2 was missing from the form).

## Constraints — G, K; open decisions #1–#4, #12 in `course-structure-v2.md`

- Eight hours a week in class; hours at home: 7 do not work, 3 work outside
  IT, 2 freelance; one reports up to 50 hours a week at a computer, another
  42 when a website order comes in. Assume few free hours and uneven ones.
- Home OS: Windows 10 · Windows + Linux 1 · macOS 1. **Phones: iPhone 6,
  Android 6** — half the class cannot run an Android build on their own
  phone; the mobile module plans emulator-first.
- Lab OS and admin rights: unsettled (decision #1). Whether they may open
  third-party accounts: unsettled (decision #2); both class tools state an
  age condition (2b). The class tools were **not** on their machines on
  2026-09-02 — 2a installs them.
- Reading English: not asked. TO CONFIRM; assume a sentence is fine and a
  page is not.
- Language of the course: Polish. English terms arrive one at a time, with a
  Polish gloss, in their home lesson (`docs/content-style.md`, appendix).

## Words they carry, and words they do not

Can be used without explanation: zmienna, pętla, funkcja, tablica, klasa,
obiekt, metoda, plik, folder, kompilator, błąd, konsola, terminal, IDE (as
„program, w którym piszę kod”), HTML, CSS, JavaScript, strona, Linux.

Moved to „must be introduced in a home lesson” by the survey: **wyjątek**
(1 of 12 can explain it), **lista i słownik** (1), **baza danych, tabela,
zapytanie, SQL** (9 „nie znam”), **zdarzenie / obsługa kliknięcia** (1),
**wątek** (1), interfejs and dziedziczenie as words they half-carry (6 and 2).

Must be introduced in a home lesson before use: repozytorium, commit, gałąź,
pull request, diff, build, framework, SDK, API, JSON, biblioteka versus
framework, pętla zdarzeń, stan, wiązanie danych, deklaratywnie, token, okno
kontekstu, prompt, agent, specyfikacja, test jednostkowy, CI, wdrożenie
(deploy), pakiet, podpis cyfrowy — and, from 2026-09-02, everything in the
paragraph above. The appendix of `docs/content-style.md` records which
lesson owns each; the Moduł 3 by-hand blocks give a first contact with
lista, `try`/`catch` and zdarzenie, and Moduł 5 is their home.

## How a lesson uses this file

1. The brief's first line names the reader position: this file plus the
   lessons already read, by letter — „reader has read 0a, 0c, 1b–1g, 2a;
   writes simple programs in Java or C++ at best; cannot read C#; has never
   opened a pull request”.
2. Every paragraph passes the reader test in `docs/content-style.md`: what it
   assumes, whether the assumption is in the position, and whether it makes a
   claim about the reader.
3. Every „not done” item that a lesson needs — a user, a team, a release — is
   built inside the lesson before it is relied on.

## How this file is updated

Rewritten from counts after each run of the questionnaire; the export stays
out of the repo. Next runs: the second group and the non-respondents (before
Moduł 3), then the ↻ pulse questions in November and January. A lesson
written in March should know the reader it has by then, not the one from
September. Three form fixes before the next run, from the aggregate's §6:
J2 is missing, the group field is free text, I3 needs a line saying what
INF.04 is.
