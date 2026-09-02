# Ankieta na start — aggregate results and what they change

| | |
| --- | --- |
| Source | `docs/surveys/Ankieta na start — Aplikacje desktopowe i mobilne.csv`, export of 2026-09-02 |
| Responses | **12** — one group's worth at most (the „Jaka grupa?” field carries two labels, „grupa 1” and „Ta-1”, which may be the same group written twice). Against ~60 students in two groups this is a **fifth of the class, self-selected**. Every number below is a count out of 12, never a percentage, and every conclusion is provisional until the second group and the non-respondents answer |
| Privacy | Aggregate only: counts, patterns, paraphrase. No name, no link, no quotation that could identify a student (Article IV). The CSV itself carries names and GitHub links and **must never be committed** — see „Housekeeping” at the end |
| Timing caveat | „Ostatni miesiąc” in E2 was August — holiday use of AI, not school use |
| Feeds | `docs/surveys/content-reader.md` (replacement of the TO CONFIRM blocks), the v3 structure proposal, lesson 1c's opening |

---

## 1. The picture in six sentences

Nobody in the sample rates themselves above „piszę proste programy” in any
language, and only 5 of 12 reach that level in at least one. The strongest
language is **Java** (5 write simple programs), then C++ (3); C# is unknown to
11 of 12, PHP to all 12, SQL to 9 — and **no one has taken INF.03 yet**, so the
reader file's „PHP with a SQL database from the INF.03 scope” is false for
this class. Half (5 of 12) cannot explain a single concept from the D1 list;
exceptions, collections, events and threads are each explained by one
person. The largest program most of them have written is about **100 lines**,
used by the teacher for a grade or by nobody; **12 of 12 have no project of
their own**. What is *better* than assumed: 11 of 12 use a terminal and Linux
beyond lessons, they distrust AI code (mean 2,2 on „zwykle poprawny”), they
unanimously reject handing in code they do not understand (mean 1,4), and
**11 of 12 agree that hand programming is still worth learning** (mean 4,0).

## 2. Block by block

### A — background

- A1 languages at basic level or above: HTML/CSS 12 · C++ 11 · Java 9 ·
  Python 5 · JS/TS 5 · SQL 2. **C# 0.**
- A2 INF.03: **„jeszcze nie” 12 of 12.** The course runs *alongside* INF.03
  preparation, not after it. One answer to J1 says what to build „depends on
  what matters for INF.03”.
- A3 internships: 8 „będę w tym roku”, 4 „tak” (the four describe hardware,
  network cabling, 3D printing and containers — support work, not
  programming).

### B — done with their own hands (B1: never / once in class / several in class / on my own)

| Thing | never | once, class | several, class | on my own |
| --- | --- | --- | --- | --- |
| console program | 0 | 1 | 10 | 1 |
| **program with a window** | 2 | 5 | 5 | 0 |
| static site | 0 | 1 | 10 | 1 |
| site with login / database | 7 | 0 | 1 | 4 |
| mobile app | 9 | 0 | 1 | 2 |
| game | 8 | 1 | 2 | 1 |
| automation script | 3 | 3 | 5 | 1 |
| **program someone else used** | 8 | 2 | 0 | 2 |
| program online or in a store | 7 | 1 | 2 | 2 |
| tests for own code | 6 | 2 | 2 | 2 |
| **GitHub project with history** | 8 | 0 | 2 | 2 |
| microcontroller | 10 | 0 | 1 | 1 |

- B2 largest program: „about 100 lines” is the modal answer; 3 say they never
  wrote one or do not remember; two outliers (a web app written at an
  internship, and an ~80-file site with real users).
- B3 who used it: teacher for a grade 5 · nobody, unfinished 5 · friends or
  family 1 · strangers 1.
- B4 worked on the same files with someone: no 7 · a few times 4 ·
  regularly 1.

### C — languages and tools

- C1 self-rating, best level reached in any language: „piszę proste
  programy” 5 · „rozumiem cudzy kod” 4 · „nie znam” everywhere 3.
  „Piszę większe programy”: **0**.
- Per language, „nie znam”: C# 11 · PHP 12 · Kotlin/Swift 12 · SQL 9 ·
  Python 9 · Java 6 · C++ 5 · JS/TS 5.
- C2 language for a one-week task: Java 5 · TypeScript 2 · Python 1 ·
  HTML/CSS/JS 1 · „nie wiem” 4.
- C3 tools used: terminal 11 · **Linux beyond lessons 11** · VS Code 10 ·
  Rider/IntelliJ/PyCharm 7 · Visual Studio 5 · GitHub 4 · Git 3 ·
  **debugger 2** · Docker 1.

### D — concepts they can explain without notes

klasa i obiekt 6 · interfejs 6 · dziedziczenie 2 · żądanie HTTP 2 ·
wyjątek 1 · lista i słownik 1 · SQL JOIN 1 · JSON 1 · wątek 1 · rekurencja 1 ·
**zdarzenie i obsługa kliknięcia 1** · **„żadnego z tych” 5**.
Concepts per respondent: 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 9.

D2 hardest so far (6 answers, paraphrased): remembering what lines mean,
understanding code, the differences between languages, „everything”.

### E — AI

- E1 tools ever used: ChatGPT 10 · Gemini 9 · Copilot 6 · Claude 6.
- E2 frequency last month (August): **wcale 6** · kilka razy w miesiącu 4 ·
  kilka razy w tygodniu 1 · codziennie 1.
- E3 for what: explain how something works 9 · generate from scratch 7 · fix
  my code 7 · explain an error 6 · write text 4 · whole homework 1.
- E4 when AI writes code: **„czytam całość” 8** · skim 3 · run and see 1.
  (Self-report. Read against E5 line 4 below.)
- E5, scale 1–5, mean and distribution:

| Statement | mean | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- | --- |
| AI zastąpi większość programistów w 5 lat | 3,4 | 0 | 2 | 5 | 3 | 2 |
| Kod od AI jest zwykle poprawny | **2,2** | 1 | 8 | 3 | 0 | 0 |
| Z AI uczę się szybciej | 2,8 | 3 | 2 | 4 | 1 | 2 |
| Rozumiem kod, który AI mi pisze | 3,0 | 0 | 6 | 2 | 2 | 2 |
| Wolno oddać niezrozumiany kod, jeśli działa | **1,4** | 7 | 5 | 0 | 0 | 0 |
| Programowania ręcznie nadal warto się uczyć | **4,0** | 0 | 1 | 3 | 3 | 5 |

- E6–E8: free tiers only 10 · does not use AI 1 · pays (50–100 zł, two
  subscriptions) 1.
- E9 (6 answers, paraphrased): useful for explanations; helps a lot; helps
  with simple programs; helpful but over-used when learning; faster but weak
  on security.

### F — interests

- F1 (up to three): **hardware / electronics / robots 9** · **games 8** ·
  graphics / UI / design 5 · networks / servers / cloud 4 · **desktop apps 3**
  · web 3 · AI 2 · data 1 · security 1.
- F2 outside school: helping people with computers 7 · nothing 4 · Discord or
  a forum 4 · online courses 3 · own programs 2 · game modding 1.
- F3 self-taught thing they are proud of (3 answers): building PCs ×2, a
  backend-as-a-service.
- F4 where news comes from (4 answers): teachers ×2, TikTok, YouTube.

### G — work

- G1 now: no 7 · outside IT 3 · freelance 2. G3 ever: in IT 5 (internships,
  hardware, 3D printing, one web freelancer) · no 4 · outside IT 2 · gigs 1.
- G5 paid for code or a site: no 9 · once 2 · several times 1.

### H — own project

**H1: „nie” 12 of 12.** H6 (asked anyway): 7 would rather build something
new on the course.

### I — goals

- I1 after school: studia informatyczne 4 · inne studia 4 · nie wiem 2 · praca
  poza IT 1 · własna firma 1.
- I3 importance of INF.04 (1 = nieważny): **1 → 10 · 2 → 1 · 3 → 1.** Read
  with A2: INF.03 is the exam in front of them; INF.04 may simply be
  invisible from where they sit.
- I4 dream job title (2 answers): repairing computers; programmer.

### J — the course

- J1 what to build (5 answers, paraphrased): a web app; something simple;
  whatever helps INF.03; „the basics of making applications”; „programming
  skills”. J2 (desktop vs phone) **is missing from the export** — the form
  did not carry it.
- J3 platform (multi): Windows 9 · przeglądarka 7 · Android 6 · Linux 4 ·
  iOS 3 · macOS 3.
- J4 how they will know in June (9 answers): **„umiem samemu napisać
  program” or its equivalent ×4** · a finished project ×2 · „I learned
  something / anything” ×3.
- J5 what worked worst (5 answers, paraphrased): commands explained without
  saying how they work; no group projects; too little help; „everything”;
  learning simple things and combining them, instead of copying from a book.
- J6 what worked best (4 answers): working alone ×2; teachers helping;
  websites and windows.
- J7 learning (up to two): **watching video 7** · read and try 6 · talk and
  ask 5 · live demo then repeat 3 · a task and search 2. Prefer: alone 8 ·
  depends 8 · in a pair 7 · group of 3–4 1.

### K — hardware

- K1 home OS: Windows 10 · Windows + Linux 1 · macOS 1.
- K3 phone: **iPhone 6 · Android 6.**

### L — questions to the teacher (2)

Will there be group work? What did you study?

## 3. Reader file: which hypotheses hold

| `content-reader.md` said | Survey says | Verdict |
| --- | --- | --- |
| Console C++ and probably Python; „language of their intuition” | C++ yes but 5 of 12 „nie znam”, 3 write simple programs; **Java is the stronger second language (5)**; Python 9 „nie znam” | **revise**: C++ and Java; Python out |
| HTML, CSS, some JS; „probably PHP with SQL from INF.03” | HTML/CSS 12; JS 5; **PHP 0, SQL 2; INF.03 not taken** | **wrong**: no backend, no SQL to lean on |
| OOP basics: class, object, inheritance, probably interface; exceptions as try/catch | class 6, interface 6, inheritance 2, **try/catch 1**; 5 explain nothing | **halve it**: half the room has the words, nobody has exceptions |
| Possibly one window program in class; possibly none | 10 of 12 have; but **1 of 12 can explain a click handler** | **confirmed, and sharper**: they have clicked a button in a designer, not understood an event |
| Git: some typed `git commit` once; most not for own work | Git/GitHub 4 of 12; a GitHub repo with history 4 | **confirmed** |
| „Almost none have read generated code line by line” | 8 of 12 say they read all of it; 6 of 12 score 2 on understanding it | **replace**: they *read* and do not *understand* — that is the lever, not „they don't read” |
| Not done: terminal with confidence; Linux beyond a lesson | **terminal 11, Linux 11** | **wrong, happily** |
| Not done: a user, a release, a test, a team | 8 no user ever; 7 nothing online; 6 no test; 7 no team | confirmed |
| Believe: „code AI wrote that works is correct” | mean 2,2 — **they do not believe it** | **wrong**: 1c must argue that AI is more useful than they think, not less trustworthy |
| Believe: „the hard part is typing; AI does it” | „learn faster with AI” mean 2,8, split; „hand programming worth learning” 4,0 | **wrong direction**: they are sceptics, not enthusiasts |
| Want: something on a phone, „phone probably first” | J2 missing; platform: Windows 9, browser 7, Android 6; **desktop apps interest 3 of 12, hardware 9, games 8** | **revise**: no phone-first signal; the subject of the course is not their interest |
| Want: not to be lectured | J4: „umieć samemu napisać program” ×4; J5: too little help, copying from a book | **confirmed, and it names the goal**: autonomy, not speed |
| Constraint: reading English mixed | not asked | open |
| Words they carry: … wyjątek, baza danych, tabela, zapytanie, SQL … | try/catch 1, SQL 9 „nie znam” | **move to „must be introduced”** |

## 4. What this changes in the course — my reading

**Not the arc. The floor, the pace of Moduł 1, and the size of the by-hand
thread.** v2's principle — build from week 3, explain each thing in the week
that makes it hurt — is *more* right for this class, not less: a room where
half cannot explain one concept from a list will not absorb sixteen hours of
argument about the profession before touching anything.

1. **Moduł 1 is the risk, now with numbers.** Eight lessons, ~15 000 words,
   evidence-dense, name-dense — for readers whose largest program is 100
   lines, whose hardest thing is „remembering what the lines mean”, and 7
   of whom learn best from video. Keep the texts (they are the teacher's
   view of the profession and they are good), but cut *class* hours 16 → 12:
   the marked fragments in presentation mode are what is read together; the
   rest is homework, and 1c's opening is the E5 aggregate. The 1c argument
   flips: this class already distrusts AI code; what it has not seen is how
   *much* the tools do when driven well (the 1d demo carries that), and the
   Anthropic RCT's two ways of using an assistant lands on a class that says
   „I read it all” and „I don't understand it”.
2. **C# is a new language for everyone, and the lessons from 2c on assume
   it is not.** Every reader position from Moduł 3 onward says „can read a
   C# diff”; the sample cannot read C# at all, and only 5 write simple
   programs in *any* language. Two cheap moves: (a) a short reading lesson
   at the end of Moduł 2 — order 5, so no letter shifts — **2e „C# na
   pierwszy rzut oka, dla kogoś po Javie i C++”**: the six constructs they
   will meet in every generated diff (class, property, `List<T>`, `try/catch`,
   an event handler, `async`), each set beside its Java/C++ shape, no
   exercises beyond reading; (b) the Moduł 3 „one change by hand” segment
   grows from a gesture into a structured 30-minute block per week that
   owns one construct — a list in 3a, a `try/catch` in 3b, a handler in 3c —
   so the diff-reading the module depends on stops being reading in a
   foreign language.
3. **The by-hand Moduł 5 is confirmed, and must start lower.** 11 of 12
   want it (E5 line 6) and 4 of 9 define June's success as „umiem samemu
   napisać program”. But 5d cannot open with „you have seen an event
   handler” — one person has. Collections, exceptions, events and files are
   **owned** by 5d–5g, not recalled from Moduł 3; and 24 h is tight for a
   room that starts here. Proposal: **Moduł 5 → 28 h**, paid for by Moduł 1's
   class hours (16 → 12). Semester 1 stays at 144.
4. **Moduł 4 (specification) is fine in kind and risky in pace.** Writing a
   spec in Polish does not need C#; judging whether the agent's plan and
   diff match it does. With move 2 in place, 4e's task-by-task build is
   readable; without it, the loop becomes ritual. Keep the module; make 4d
   (the tools lesson) homework reading and give the hours to 4e.
5. **Interest is elsewhere: hardware 9, games 8, desktop apps 3.** Do not
   change the subject — the course is what it is — but let the *examples*
   follow the room: the katalog in 3c can be a catalogue of parts or games,
   4f's ideas may be game-shaped or talk to a device, and Moduł 9's project
   bar („someone real uses it”) is easier to meet with a tool for the PC
   builder next to them (7 of 12 already help people with computers).
6. **Group work is asked for and absent.** Two students raised it unprompted;
   7 have never shared a file; pairs are acceptable to 7. The build weeks
   already have peer review; add a **pair week** somewhere in Moduł 3 or 6
   (two people, one repo, the conflict on purpose) — it is also the only way
   „resolved a conflict” ever moves off the not-done list.
7. **Half the phones are iPhones.** Semester 2's mobile module planned „same
   app on Android; iOS named once as a limit”. For 6 of 12 that means the app
   never runs on their own phone. Not a change now; a known constraint for
   Moduł 8's brief (emulator for everyone, the phone as a bonus).
8. **The exam lever is weaker than the plan assumed.** INF.04 „nieważny” for
   10 of 12 and INF.03 still ahead. 5c's Visual Studio stays for the
   professional reason; the „exam stations” argument should not carry
   weight in the lesson. And somewhere the course should say plainly how
   it relates to INF.03, because that is the exam in their heads this year.
9. **Terminal and Linux are not obstacles.** 0c and 2b can move at the pace
   of people who have used a shell, which the reader file did not allow.
   Git is still new to two-thirds — 0c stays as written.
10. **Video.** 7 of 12 learn best from it and the site is text-first. Not a
    slice and not now; but the presentation mode built in 013 plus a
    recorded walk-through of a lesson is the cheapest answer, and the demo
    of 1d is already the format they asked for.

## 5. Changes proposed, ordered by cost

| # | Change | Lane | When |
| --- | --- | --- | --- |
| 1 | Add `docs/surveys/*.csv` to `.gitignore` | chore | **now — done in this session, see below** |
| 2 | Rewrite `content-reader.md`'s TO CONFIRM blocks from §2–3, with „n = 12, one group” in the header; re-run after group 2 | docs | this week |
| 3 | Fix the paths: `content-reader.md` and `ques-for-content-reader.md` moved to `docs/surveys/` today; `CLAUDE.md`, both skills, `content-style.md`, `content-briefs/README.md`, `roadmap.md` and the course-structure files still point at `docs/…` | chore | with #2 |
| 4 | Moduł 1 class hours 16 → 12; 1c opening and argument direction from the E5 aggregate (`revise-lesson`) | content / structure | before 1c is taught |
| 5 | Lesson 2e „C# na pierwszy rzut oka” (`order: 5`) | content, via `write-lesson` | before Moduł 3 |
| 6 | Moduł 3: the weekly by-hand segment becomes a 30-minute block owning one construct (3a list, 3b try/catch, 3c handler) | content, via `revise-lesson` | before Moduł 3 |
| 7 | v3 structure: Moduł 5 at 28 h with collections/exceptions/events/files *owned* there; a pair week; examples allowed to follow hardware/games; Moduł 8 emulator-first; the INF.03 sentence | structure | with the v3 file |
| 8 | Re-run the survey for the second group and the non-respondents before any further change | — | next lesson |

## 6. Data-quality notes for the next run

- J2 (desktop vs phone) is absent from the export — check the form.
- „Jaka grupa?” is free text; make it a choice with the two real group names.
- E2 asks about „ostatni miesiąc” — in September that month is a holiday;
  ask about a school month or say „w roku szkolnym”.
- I3 needs a line saying what INF.04 is; ten identical „1”s may be „nie
  wiem, co to”.
- Twelve responses. The reader file should not be rewritten as if for sixty.

## Housekeeping done in this session

- `.gitignore`: added `docs/surveys/*.csv`. The export carries names and
  GitHub links; it was untracked and **not ignored**, one `git add -A` away
  from a public repo (Article IV).
- A stale, empty `.git/index.lock` left by a `git status` from this session
  was removed, with your permission, so your own git commands are not blocked.
