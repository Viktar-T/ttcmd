# Change proposal — a by-hand fundamentals module (Moduł 5 „Pod maską”)

| | |
| --- | --- |
| Written | 2026-09-02, from the discussion of the same day |
| Status | **Proposal for Viktar to cut, reorder and reject.** Nothing here is implemented; stage 1 of two (discuss → approve → implement) |
| Scope | The curriculum plan and the repo files that hang off it. No app change (Article IX), no constitution change |
| Language | English (Article III). Polish only for proposed student-facing titles |

---

## 1. What the repo already says — the findings the proposal rests on

Reading the tree changed the proposal. The idea is not new to the course; it is
already promised in four places and half-built in a fifth, and the job is to
give it one home instead of a scattered one.

1. **The course promises it.** 1c: „w tym kursie będą odcinki «bez AI»…
   nie są karą, tylko odpowiedzią na te siedemnaście punktów”. 2c ends with a
   change made by hand and says: „Każdy fragment tego kursu, który później
   będzie się nazywał *bez AI*, jest przedłużeniem tych pięciu sekund.”
   Every Moduł 3 week has „jedna zmiana zrobiona własną ręką, bez agenta”;
   4e repeats it per task. `course-structure-v1` lists **Bez AI (planned
   fading)** as a course-wide mechanic. The thread exists; it has no module.
2. **Moduł 5 is already spoken aloud as the place.** Four published sentences
   in Moduł 2 and 3 point at „Moduł 5”: the stack decision („świadomy wybór
   zapada w Module 5”, 2-index, 2c) and — this is the important one —
   *building a window from the ground up* (3a: „tematem na Moduł 5, przy
   okazji budowy okna od podstaw”; 3c: „budowa okien jest tematem Modułu 5”).
   So the number 5 is already bound to „how a window really works”. Inserting
   the module elsewhere would break spoken references; making it Moduł 5
   breaks none.
3. **The content is researched.** `research-03-desktop-app-history.md` §3
   „What has not changed since 1984” is the module's spine, sourced: the event
   loop, one UI thread, the frozen window and its five seconds, state outside
   the widget tree (MVC 1979 → MVVM 2005 → MVU), install/update as the user's
   burden. The same file's „What this means for the course” already drafts
   *Okno, układ, zdarzenia* and *Dane i stan* as lessons. No research pass is
   needed before briefs.
4. **v2's Moduł 5 already half-contains it and hides it.** 5f „Architektura
   okna: układ, zdarzenia, stan” and 5g „Zapis do pliku… pierwszy Bez AI
   segment of real weight” sit inside a 40-hour, eight-lesson module whose
   headline is the shared app. The fundamentals are a means there; the
   proposal makes them the subject.
5. **The terms have no home inside the pipeline.** `content-style.md`
   appendix homes *pętla zdarzeń, framework, XAML, wiązanie danych, MVVM,
   deklaratywnie, SDK* in **1a** — which lives in `content/interesting-to-read/`
   and is not in the pipeline; its own text says „wrócimy do nich praktycznie
   w module 4” (a stale v1 number). The reader file lists *stan, pętla
   zdarzeń, wiązanie danych, deklaratywnie* as „must be introduced in a home
   lesson”. Today none has one.
6. **One recorded principle has to be reversed on purpose.** `course-structure-v1`,
   „The shape in one line”: *„There is no point where the course «switches
   back» to programming without AI.”* v2 inherited it silently. This proposal
   contradicts it and must say so — with the reason from the discussion:
   hand-coding's purpose changed from production to judgment, and the course's
   own 1f („ty tego wyczucia jeszcze nie masz”) is the argument.

## 2. The decision in one paragraph

Make **Moduł 5 a by-hand fundamentals module**, placed directly after the
specification module: the stack decision it already owns (old 5a–5c), then
the constants since 1984 built with the student's own hands in Visual Studio,
without the agent, and a closing lesson that rebuilds one feature of the
student's own agent-built `notatnik-v2` three ways — no AI, completion only,
agent — so the contrast is measured, not narrated. The shared application
becomes **Moduł 6**, shorter, because its students now know what a window is.
Tests become **Moduł 7**; Semester 2 shifts to 8–11. Semester 1 stays at
**144 h**.

Framing rule for every lesson in it, taken from the discussion: the module is
**not** „how we used to do it”. It is „what you must know to be the editor
1f describes — to say *za skomplikowane* and be right”. Any draft that reads as
nostalgia gets cut.

## 3. Proposed Moduł 5 — `content/moduly/05-pod-maska/` · est. 24 h

Working title **„Pod maską: aplikacja własną ręką”**. Lesson list is a
proposal for the briefs, not a commitment; hours indicative.

| | Polish title (proposed) | slug | What it does | h |
| --- | --- | --- | --- | --- |
| **5a** | Co system naprawdę daje aplikacji | `co-system-daje-aplikacji` | old v2 5a: native / cross-platform / web-wrapped, with three own builds as evidence — and the five constants since 1984 named as the module's map | 2 |
| **5b** | Ekosystem .NET i nasza decyzja | `ekosystem-dotnet-i-decyzja` | old v2 5b unchanged: the honest table, the decision ratified or overturned *with* students, their first real ADR (4b's format) | 2 |
| **5c** | Visual Studio: pełne IDE | `visual-studio-pelne-ide` | old v2 5c unchanged: solution, designer, debugger. From here the hand work happens here; the agent editors keep their door | 2 |
| **5d** | Pętla zdarzeń: program, który jest wywoływany | `petla-zdarzen` | **new.** A window, a button, a handler typed by hand; `Thread.Sleep` in the handler, the frozen window, the five seconds; one UI thread; the async fix. `object sender, EventArgs e` explained as the 1984 message loop | 4 |
| **5e** | Układ i kontrolki własną ręką | `uklad-i-kontrolki` | **new.** The markup the agent generated in Moduł 3, now typed line by line; layout containers; what the designer writes and what it hides | 4 |
| **5f** | Stan poza kontrolkami | `stan-poza-kontrolkami` | **new; the load-bearing lesson** (per `research-03-history`): model + binding by hand; MVC → MVVM as one rule re-derived for 47 years; the debugger from 5c used to *watch* state live. Sets up Moduł 8 (mobile = change the shell) | 4 |
| **5g** | Zapis do pliku i błędy, których nie widać | `zapis-i-bledy` | old v2 5g: persistence, exceptions, the failures the happy path hides. The first **Bez AI** segment of real weight, in Visual Studio | 4 |
| **5h** | Trzy tryby: ta sama funkcja bez AI, z podpowiadaniem, z agentem | `trzy-tryby` | **new; the contrast lesson and the module's ending.** One feature of the student's own `notatnik-v2` rebuilt three ways, timed and journaled; then the agent-built version re-read with 5d–5g's eyes (*Rozbierz to* at feature scale). Maps onto 1b's layers and the 2021 → 2023 → 2025 timeline the class did not live through | 2 |

Fixed segments carried in from Moduł 3 stay (diff reading, journal entry);
„one change by hand” inverts — in this module the default is by hand and the
agent is the named exception. Each lesson states its **tryb pracy** (bez AI /
tylko podpowiadanie / agent) in one plain sentence near the top — no
component until content asks (ADR-0004).

**Consequences downstream**

| Module | Was (v2.4) | Becomes | h |
| --- | --- | --- | --- |
| 5 | Stack na serio i wspólna aplikacja (5a–5h, 40 h) | **Pod maską** (above) | 24 |
| 6 | Testy, jakość i przegląd kodu (24 h) | **Wspólna aplikacja** — old 5d spec, 5e plan, build weeks, old 5h review; shorter because okno/układ/stan are no longer taught inside it | 20 |
| 7 | — | **Testy, jakość i przegląd kodu** — old 6a–6e; 24 → 20 h, defensible because v2 already says this module „names and systematises rather than introduces” | 20 |
| 8–11 | 7 mobile · 8 project · 9 release · 10 dalej | same content, +1 | S2 |

Volume: 8 + 16 + 10 + 26 + 20 + 24 + 20 + 20 = **144 h**, unchanged.

## 4. File changes — what stage 2 would actually do

Grouped by lane. Everything below is docs/chore or content; nothing touches
`app/` or `lib/`.

### A. Curriculum (the one file that decides the rest)

- **New `docs/content-research/course-structure-v3.md`**, v2.4 left in place
  (folder rule: superseded proposals stay). Contents: „What v3 changes, and
  why” — the reversal of v1's „no switch back” sentence, with the reason and
  the rejected alternatives (fold into Moduł 6 as segments only; put the
  module *after* the shared app; make it optional reading); the Moduł 5 table
  above; Moduł 6 and 7 tables; Semester 2 renumbered; the volume check;
  „Where every v2 lesson went”; open decisions carried forward; changelog.
  A closing line in v2.4's changelog points to v3.
- `docs/content-research/README.md`: v3 row; mark v2 superseded; note that
  `research-03-desktop-app-history` „What this means” sections now feed
  Moduł 5 (their headings still say 5c/5d from v1).

### B. Authoring rules and tooling (chore lane)

- `.claude/skills/write-lesson/SKILL.md`: points at `course-structure-v1.md`
  in two places (§1, §2.4) — already stale; change to „the current
  `course-structure-v*.md`”. Add one rule for by-hand lessons: **every code
  block a student is asked to type was built and run while drafting; the
  command and output go in the brief's deviations.** A by-hand lesson whose
  code does not compile is the most expensive lesson the course can ship.
- `docs/content-style.md`: a short paragraph under „Three lesson shapes” for
  the by-hand shape (code is the anchor; short, complete, typed, run;
  nothing generated appears without the student having typed it first).
  Appendix: rehome *pętla zdarzeń, jeden wątek UI, zamrożone okno, XAML /
  markup, wiązanie danych, MVVM, deklaratywnie, stan* from 1a to 5d–5f; add
  the story row „the constants since 1984 → 5a, recalled 5d–5g, 8x”;
  fix „Moduł 4, when it exists” → 5; „Moduł 8, when the project is chosen”
  → 9; „5b, when the students write their first real ADR” stays 5b.
- `scripts/check-content-style.mjs`: nothing now (patterns are added when
  the lessons exist and a story is retold outside its home).
- `docs/content-briefs/README.md`: no change needed — its step 1 („settle
  the plan in course-structure first”) is exactly what this proposal is.

### C. Content already published (content lane, small)

- `content/interesting-to-read/czterdziesci-lat-zmian.mdx` line 293:
  „wrócimy do nich praktycznie w module 4” → „w Module 5”. Line 182 already
  says „W module 5 zobaczysz `object sender, EventArgs e`” — a fifth
  spoken reference, and it lands exactly on 5d.
- `content/moduly/01-…/nowy-warsztat-programisty.mdx`, the „ty tego wyczucia
  jeszcze nie masz” paragraph: one added clause pointing forward — the
  specification module teaches the criteria, and the by-hand module is where
  the *wyczucie* starts to be built. Via `revise-lesson`; optional but it is
  the sentence the whole module hangs on.
- 2-index, 2c, 3a, 3c: **no change** — their „Moduł 5” references become
  more true, not less.
- Moduł 4 drafts (`publish: false`): no change; they say „moduł o projekcie”
  without a number, which now pays off.

### D. Roadmap and repo state (docs lane)

- `docs/roadmap.md` „Where we are → Content”: stale (lists Moduł 0 and 1);
  list 0–4 and the planned 5. Nothing else — the roadmap is app-scope.
- `CLAUDE.md` „State of the repo”: same staleness; one line. (Both files are
  already modified in the working tree — coordinate with what you are
  editing.)
- **Housekeeping found on the way, not part of this change:** `docs/content-research/`,
  `docs/content-briefs/`, `docs/content-style.md`, `docs/content-reader.md`,
  `.claude/skills/`, `scripts/check-content-style.mjs` and Moduł 4 are all
  **untracked**. Stage 2 edits files that git does not know about; decide
  whether they enter the public repo (roadmap „Housekeeping” says decide
  deliberately) before or with this change. `write-lesson` §4 also cites a
  brief that no longer exists (`02a-prompt-token-kontekst.md`).

### E. Not done in stage 2 — and why

- **No briefs and no lessons for Moduł 5.** Per the briefs README, those are
  one session each, brief first, after the plan is settled and after the
  questionnaire says whether anyone in the room has ever typed a click
  handler (reader file, block A–D — the single fact 5d's opening depends on).
- **No ADR.** Every ADR so far is an app/repo decision; the curriculum's
  decision record is the course-structure file's „What changes, and why”.
  The constitution is untouched (Article VII, presumed C#/.NET, stands).
- **No `Zadanie` attribute for tryb pracy, no `BezAI` component.** Plain
  prose until a lesson cannot be written without it (ADR-0004's detector).
- **No change to `docs/assignment-checking.md`**, but a note for it: a by-hand
  assignment cannot be verified as by-hand from the repo. The module's
  answer is the one from the discussion — key by-hand work happens in class,
  and every assignment states its allowed mode instead of pretending zero.

## 5. Open questions for Viktar (≤ 3)

1. **Position and numbering.** Moduł 5 = fundamentals, shared app → 6,
   tests → 7, Semester 2 → 8–11 (recommended; zero spoken references break).
   The alternative is keeping v2's Moduł 5 and only sharpening 5f–5g into
   three by-hand lessons inside it — cheaper, no renumbering at all, but the
   contrast stays a segment rather than a subject, which is the thing you
   said you wanted students to *see*.
2. **Hours.** 24 / 20 / 20 for modules 5 / 6 / 7 keeps 144. If you would
   rather not shrink tests, the 4 h come out of Moduł 3 (26 → 22: 3d has no
   build week) or Moduł 1 (16 → 12: more reading at home).
3. **Stack inside the module.** The contrast should be about process, not
   technology, so the by-hand lessons use the training stack (C# + Avalonia)
   and no third framework — but 5c's „visual designer” is a WinForms/WPF
   thing, and Avalonia's Visual Studio extension is, as far as I know, a
   previewer rather than a drag-and-drop designer (TO CONFIRM at 5c's
   brief). Either 5c drops the designer, or open decision #4 (WinForms on
   Windows-only labs) is decided first. This is v2's tension, not a new one;
   the module just makes it due.

## 6. Decisions taken (veto here)

- Module named for what is underneath („Pod maską”), not for the past
  („Po staremu”) — rejected: any title that frames hand-coding as legacy.
- The contrast lesson rebuilds a feature of the student's **own** agent-built
  app — rejected: a fresh, different feature (proves only that typing is slow).
- Three modes, not two — rejected: „with AI / without AI”, which skips the
  2021–2023 completion era the students never saw.
- The module comes **before** the shared app — rejected: after it (the shared
  app would then be built by students who cannot yet read what they accept).
- New file `course-structure-v3.md` rather than v2.5 in place — rejected:
  in-place, because a reversed principle should be visible as a version step.
- `czterdziesci-lat-zmian` stays outside the pipeline, linked as further
  reading from 5a — rejected: pulling it back in as 5a (it was moved out on
  2026-08-30 for reader reasons that still hold).
