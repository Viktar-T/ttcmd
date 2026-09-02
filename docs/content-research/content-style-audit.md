# Content style audit — 1

| | |
| --- | --- |
| Date | 2026-08-29 |
| Corpus | `content/moduly/00-start/` (index, 0c) and `content/moduly/01-jak-powstaje-oprogramowanie/` (index, 1a–1g), 16 136 words |
| Produced by | The session that revised `docs/content-style.md` and rewrote the corpus for flow. Not a run of the paste-whole prompt in `docs/_prompts/analyze-course-writing-style.md`; the next calibration pass should use that prompt and compare against this file |
| Feeds | `docs/content-style.md` (revised the same day), the per-lesson rewrite (below, §5), `scripts/check-content-style.mjs` |
| Language | English; quoted source text in Polish (Article III) |

## 1. Executive judgment

**The concern is supported, and it is uneven.** One lesson (1a, *Czterdzieści
lat zmian*) already reads as a continuous story; two (1c, 1g) read as
catalogues of sources and tips; the rest sit in between. Individual sentences
are strong almost everywhere. What makes the reading feel disconnected is not
grammar and not density of facts as such; it is five habits, all fixable
without losing a fact.

The main causes, in order of weight:

1. **Sections as mini-essays.** 1c has twelve H2 sections in 2 084 words, each
   reporting one source and ending in a bolded conclusion. 1g has the same
   shape with tips instead of sources. The reader gets twelve conclusions and
   no single line of argument.
2. **Emphasis as the default rhythm.** 1c carries 54 bold spans (one every 39
   words), 1e 44, 1g 38, and 1c has eight one-sentence paragraphs. When every
   paragraph ends in a bold sentence, none is the thesis, and the prose reads
   as a sequence of slogans whose connections the student must supply.
3. **The same stories told twice.** Basecamp (1e, 1f, nearly verbatim);
   “dogoni front w dwa tygodnie” (1e, 1g); “siedem razy dziennie” (1e, 1g);
   the 550 dollars (twice in 1e); the Stack Overflow figures (1c, 1e); “front
   versus środek stawki” (1c, 1e); “nobody has a ten-year head start” (1e,
   1f, 1g). A student reading in order feels every second telling.
4. **One narrator for four lessons.** DHH closes 1a, appears in 1b, carries
   1e, gets two sections in 1f and two more in 1g.
5. **Reference material before the concept it annotates.** 1b's dates table
   labels rows with layer numbers the student has not met yet; 1d's model list
   interrupts the experiment's logic; the word *harness* is used in 1b and
   explained in 1e.

What already works and must not be lost: the direct `ty`; the anti-hype
candour; the exact dates, numbers and timestamped quotations; the bridges and
refrain of 1a (*co stało się tanie, co drogie*); the “instrukcja oglądania”
frame of 1d; the closing rule of 1f; the operational reading of DHH's advice
in 1g; the teacher's occasional *ja* (“najlepszą odpowiedź, jaką znalazłem”).

## 2. Reader journey

**00 index.** Two paragraphs, does its job. Lessons 0a and 0b do not exist
yet, so 0c currently opens the module in practice.

**0c Git i GitHub.** A procedure lesson that scans well. It opens with a
definition (“Git jest systemem kontroli wersji”) before any visible problem;
the problem arrives one section later (“Bo pracujemy inaczej niż w zeszycie”).
Masculine past-tense forms throughout (*włączyłeś*, *ruszyłeś*, *nie
chciałeś*). Otherwise the strongest procedure text in the corpus: each command
gets what it does and the common mistake.

**01 index.** States the thesis (*nie jak, tylko czy*) well. The last
paragraph compresses all seven lessons into one 60-word sentence; the reader
cannot see why the lessons come in this order.

**1a Czterdzieści lat zmian.** The model lesson. Opens from the student's
experience, poses one question, promises a pattern, keeps a refrain through
nine eras, closes on an ending that both answers the opening and sets up 1b.
Only mechanics need attention (mixed quotation marks, two masculine forms).

**1b Od podpowiedzi do agenta.** Good bridge from 1a. Then a dates table whose
third column names layers 1–5 before the layers section exists; “harness”
appears in the table and in layer 5 without explanation. Layer 4 tells a
DHH story that belongs to 1e. Layer 5 teases 1e with numbers (“szesnaście
wątków na pięciu maszynach”). The closing section (“Czego ta mapa nie mówi”)
is one paragraph and does not return to the opening idea that layers absorb
each other.

**1c Co model naprawdę potrafi.** The most researched lesson and the hardest
to read. Twelve sections; the spine (*zależy, i wiadomo od czego*) is
announced in the opening and then never used to organise the sections, which
follow the order in which sources were found. Three sections have no visible
connection to their neighbours (“Ile trzeba, żeby to zaczęło działać”, “Głos
z drugiej strony”, “Problem 70%”). The Stack Overflow section stacks seven
bolded numbers in four bullets. The ending is a five-item list under a
heading reused in 1e.

**1d Na żywo.** A procedure lesson with the right frame: the diagram, the
“człowiek” box, the experiment's logic, the prompt, the setup, “Na co
patrzeć”, the honest limits. The “Modele — krótko” list is the one block that
interrupts an argument. *diff*, *build* and *tokeny* are used without a gloss.
Several conditional masculine forms (*kliknąłbyś*, *zdążyłeś*).

**1e Nowy warsztat programisty.** Well framed (why DHH, and the caveat that he
is one man at the front). The centre is a six-row table whose third column
carries the argument; the prose after it is good. The habits section is the
best teaching in the module (“Tu muszę cię zatrzymać”). The cost of the Rust
port appears twice; Basecamp is told in full though it is 1f's; the closing
section carries three ideas of which one (“dogoni front”) is 1g's.

**1f Vibe coding kontra inżynieria.** Opens with Karpathy's credentials, not
with the student's question. Seven block quotes. Two DHH sections after the
axis re-tell what 1e has just told, then add the criterion that is genuinely
this lesson's (“kto poniesie koszt”). Ronacher is a one-paragraph section that
is really the setup for the closing rule. The rule itself is the best ending in
the module.

**1g Jak nie wypaść z obiegu.** Clear spine in the opening (“co się nie
psuje”), then six tip-sections that do not build on each other. The rankings
section is the one piece of real argument. The attitude section is strong and
belongs at the end. “Siedem razy dziennie” and “dogoni front” are re-told
from 1e at nearly the same length.

## 3. Systemic patterns

### Catalogue structure (Observed: 1c, 1g)

> ## Problem 70% … ## Ile z pracy da się oddać … ## Co mówią sami programiści
> … ## Ile trzeba, żeby to zaczęło działać … ## Głos z drugiej strony
> *(1c, headings in order)*

Each heading names a source or a topic; none names a stage. The cut-or-move
test fails for at least three of them. Effect: the student cannot say what
question is open. Response: sections become stages of the opening's spine
(three dependencies and one rule); short sections merge into their
neighbours; headings name moves.

### Emphasis as rhythm (Observed: 1c, 1e, 1g; Emerging in 1d)

> **Dlatego ten kurs nie uczy szybszego pisania. Uczy oceniania.** *(1c 141)*
> **AI obniża koszt dostarczenia. Nie obniża — a może podnosić — koszt
> zrozumienia.** *(1c 169)*

Both are good sentences; they are also the fourth and fifth bolded theses in
four hundred words. Effect: emphasis stops guiding attention. Response:
roughly one bold span per hundred words, one spotlight paragraph per section;
the guide now carries a budget and the detector counts it.

### Second tellings (Observed: 1e/1f, 1e/1g, 1c/1e)

> Ktoś, kto przespał ostatni rok, **dogoni front w dwa tygodnie** *(1e 220)*
> Ktoś, kto przespał ostatni rok, **dogoni front w dwa tygodnie** *(1g 143)*

Effect: déjà vu, and the second telling carries no new consequence. Response:
one home per story, the map in the guide's appendix, recalls of one clause.

### Terms before their home (Observed: 1b *harness*; 1c *boilerplate*; 1d
*diff*, *tokeny*; 1f *CI*, *lintowanie*)

Effect: the student meets a word as if already known. Response: the term
table in the appendix; a lesson uses plain words until the term's home.

### Reference block before concept (Observed: 1b dates table; 1d model list)

Effect: the table asks the student to hold labels that the next section will
define. Response: concept first, then the table that dates it.

### What works and is now written down (Observed: 1a throughout; 1d “Na co
patrzeć”; 1f “Zasada na ten kurs”)

> RAD uczynił budowę okna tanią, ale utrzymanie dużej aplikacji drogim.
> Kolejne narzędzia wizualne powtórzą ten sam układ korzyści i kosztów.
> *(1a 133)*

A section that lands its point and creates the need for the next in two
sentences. The guide quotes it as the model bridge.

## 4. Assessment of the guide before revision

Supported by the corpus: voice; module arc; carrying question; section moves;
one-idea paragraphs; storytelling without invention; forward references;
rhetoric used deliberately; the five-step explanation of abstractions; prose
versus reference material; openings and endings; revision order.

Useful but not evidenced in practice (the rule existed, the corpus did not
follow it): bold reserved for turning points; one source not narrating
consecutive lessons; first-use explanation of terms; statistics interpreted
one at a time.

Missing from the guide: the two lesson shapes; story ownership across lessons
(with a map); term ownership (with a map); numeric budgets a writer can check;
mechanics (quotation marks, dashes, dates, numbers); the address to the
student (neutral `ty` forms); the teacher's first person; the summary
frontmatter; a rule for block quotes; exemplars. All added on 2026-08-29.

## 5. Revision plan, per lesson

The brief used for the rewrite. “Keep” means verbatim unless mechanics
(quotation marks, neutral forms) require a touch.

### 00 index — keep

Two paragraphs; nothing to change beyond mechanics.

### 0c Git i GitHub — procedure lesson, light revision

- Opening: start from the situation (code grows in small steps, some are dead
  ends, going back must be cheap and boring), then name Git and the three
  things it gives; fold the first paragraph of “Po co nam Git na tym kursie”
  into the opening; keep the second paragraph (history as a control tool when
  an agent writes) as the section's remaining content or as the opening's
  third paragraph, and drop the heading if the section becomes empty.
- Keep every command block, the `TO CONFIRM` comment, the exercise-numbering
  comment, the “Czego nigdy nie wrzucamy” list, the exercises and the sources.
- Neutral forms: *jeśli włączyłeś* → *jeśli masz włączoną*; *czego nie
  chciałeś* → *czego nie chcesz*; *jakim plikiem ruszyłeś* → *w jakim pliku
  była zmiana*; *żebyś … nie zrobił czegoś nieodwracalnego* → *żeby do tego
  czasu nie zdarzyło ci się nic nieodwracalnego*.
- Ending: after the “never commit” list, one short paragraph that says what
  the student can now do and where Git returns (the pull request as a gate).

### 01 index — rewrite the last paragraph

Where the student starts (phone and browser, no baseline) → the question the
module answers → why this order, one sentence per lesson (1a baseline; 1b the
new kind of change; 1c the evidence, including learning; 1d the demo; 1e the
professional's day; 1f the boundary; 1g staying current). Keep the thesis
sentence (*nie jak, tylko czy*) and “Moduł nie uczy żadnego narzędzia. Uczy
patrzeć na narzędzia.”

### 1a Czterdzieści lat zmian — mechanics only

- „…" → „…” throughout.
- *Nie mogłeś więc zobaczyć* → *Nie było więc jak zobaczyć*; check the rest
  for masculine forms.
- Nothing else. This lesson is the exemplar.

### 1b Od podpowiedzi do agenta — reorder, own less

Carrying question: *how did “AI writes some code” become “AI does the task”,
and what actually changed on the way?*

1. Opening — keep (bridge from 1a's promise; layers absorb each other; “ta
   lekcja jest mapą”).
2. **Pięć warstw** with the diagram and the five layer sections — moved before
   the dates. Layer 4: keep the loop; replace the DHH paragraph with one
   sentence — for many practitioners the leap came in November 2025, and not
   because the model was much smarter but because what was built *around* it
   let it run commands and check its own work; link forward to 1e. Do not use
   the word *harness*. Layer 5: keep sub-agents and the Anthropic report
   sentence; cut “szesnaście wątków na pięciu maszynach”, keep the link.
3. **Kiedy to się działo** — the dates table (unchanged rows), now readable
   because the layer column refers to known layers; keep the pace observation
   (three years to the agent, one year to orchestration) and make it the
   bridge to the next section: this change accelerates, unlike 1a's eras.
4. **Co się naprawdę zmieniło** — keep: unit of work, the small table, the
   uncomfortable consequence, the contrast with 1a.
5. **Czego ta mapa nie mówi** → becomes the ending: fit the layer to the task
   (keep the *Tab* example), and return to the opening — the layers did not
   replace each other, which is why the map is a map and not a ranking. Two or
   three short paragraphs; no list needed.
6. Exercises and sources: keep.

### 1c Co model naprawdę potrafi — restructure around the spine

Carrying question: *does AI make programming faster? It depends, and we know
on what: the project, the person, the goal — and to know any of it you have to
measure, because the feeling lies.*

1. Opening — keep the honest answer; announce the three dependencies and the
   one rule in one sentence; keep “Zaczniemy od liczby, która powinna
   zaboleć.” as the only one-sentence paragraph of the opening.
2. **Badanie, które wyszło odwrotnie, niż wszyscy zakładali** — METR 2025 as
   in exemplar 1 of the guide; then, in the same section, why the number does
   not transfer to the student (experienced developers, large old projects,
   early-2025 tools) — folded in from “Dlaczego to badanie nie dotyczy ciebie
   (jeszcze)”, ending on “to jest dokładnie przeciwny róg tabeli niż ten, w
   którym siedzisz ty” as the bridge.
3. **Co zostało po korekcie** — the February 2026 update and the May 2026
   survey, as one story with two conclusions (the number was withdrawn; the
   gap survived). Keep every number. One bold: *wrażenie nie jest dowodem*.
4. **Pierwsza zależność: jaki projekt** — the Stanford matrix (diagram
   unchanged), “tu jesteś / tu będziesz”, the quotation.
5. **Druga zależność: kto pracuje** — Microsoft junior/senior, mapped to
   layers 1–3 and 4–5 from 1b; “ten kurs nie uczy szybszego pisania, uczy
   oceniania” stays, unbolded or as the section's single bold.
6. **Trzecia zależność: co jest celem** — the Anthropic RCT (all numbers), the
   two ways of using the assistant, the course's answer (“bez AI” segments,
   “rozbierz to”, dziennik weryfikacji). The thesis sentence about the cost
   of delivery versus understanding stays as the section's bold.
7. **Ile pracy naprawdę da się oddać** — Osmani's 70% (both quotations) and
   the Anthropic report's 60% / 0–20% / 27%, joined as one answer to one
   question; “Trudną częścią … nigdy nie było wpisywanie kodu” closes it.
8. **Dlaczego ta lekcja jest zbudowana z liczb** — the Stack Overflow survey
   as in exemplar 2 of the guide (mood, not measurement; front versus środek
   stawki, with the link to 1e), then Torvalds as the reason the lesson trusts
   numbers over promises.
9. **Trzy zależności i jedna zasada** — the ending: the “30–100 godzin”
   paragraph (unchanged wording, it is the practical consequence), then the
   five consequences, tightened to actions.
10. Exercises and sources: keep.

Bold budget: about fourteen spans in the whole lesson.

### 1d Na żywo — procedure lesson, light revision

- Keep the structure and every block.
- “Modele — krótko”: keep the three entries but shorten each to what the demo
  needs (date, what is new, where it runs); the “Stan na” sentence stays.
- Glosses on first use: *prompt* (in “Prompt”), *diff* (in the diagram's
  caption sentence or “Na co patrzeć” item 4), *build* (`dotnet build` — “czy
  projekt się kompiluje”), *tokeny* (in “Czego pokaz nie udowadnia”).
- Neutral forms: *ile razy kliknąłbyś „tak” bez czytania* → *ile razy „tak”
  poszłoby bez czytania*; *ile z tego zdążyłeś przeczytać* → *ile z tego dało
  się przeczytać*; *ile razy powiedziałeś „tak”* → *ile razy „tak” padło*.
- Bold: trim to the five “Na co patrzeć” leads, “Agent nie jest autonomiczny —
  jest szybki”, and the safety sentence about the flag.

### 1e Nowy warsztat programisty — own the harness, hand off two stories

Carrying question: *how does one work with agents day to day — what changed
in the tools, what in the habits, what it costs, and what is left to the
human?*

1. Opening — keep (bridge from the demo; the three reasons for DHH; the
   caveat). Neutral forms where needed.
2. **Trzy momenty** — keep; this is the home of the dividing line.
3. **Co to jest harness** — keep the diagram and the explanation; this is the
   home of the term and of “siedem razy dziennie”.
4. **Co się zmieniło w narzędziach** — keep the table; the prose after it
   stays.
5. **Co się zmieniło w nawykach** — keep the four habits and the “Tu muszę
   cię zatrzymać” warning. Tell the Rust port once, without the 550 dollars;
   end that paragraph with “koszt istnieje — wrócimy do niego w granicach”.
6. **Uczciwe granice** — Basecamp as in exemplar 4 of the guide (one sentence,
   pointer to 1f); pace; tokens (the 550 dollars here, once, referring back to
   the Rust port); one person versus the survey — one clause, at most one
   figure, link to 1c.
7. **Co zostaje człowiekowi** — the ending: mechanical versus building; the
   honesty about jobs; the shape to remember (terminal, several at once, one
   writes and another checks, the human decides, English). Cut the “dogoni
   front w dwa tygodnie” paragraph — 1g owns it.
8. Exercises and sources: keep.

### 1f Vibe coding kontra inżynieria — question first, one DHH section

Carrying question: *when is it acceptable not to read the code — and who
decides?*

1. Opening — as in exemplar 3 of the guide (the demo → the question →
   Karpathy introduced when his words arrive); keep both quotations and the
   line “Karpathy od początku mówił, do czego to służy.”
2. **Co się stało z tym pojęciem** — keep (Willison).
3. **Oś, na której się poruszasz** — keep the diagram and the paragraph.
4. **Drugi koniec osi** — keep the list; add one-clause glosses for *CI*
   (automatyczne budowanie i testowanie po każdej zmianie) and *lintowanie*
   (automatyczne sprawdzanie stylu i typowych błędów).
5. **Ta sama granica, rok później** — merge “Trzeci głos” and “Dwa
   eksperymenty” into one section: DHH's definition as the one block quote;
   the “piękny kod” quotation paraphrased with its timestamp link; the two
   experiments (this is their home — full telling); the criterion *kto
   poniesie koszt*. Introduce DHH in one clause as “którego dzień pracy
   znasz z poprzedniej lekcji”.
6. **Co się przesunęło w wartości** — keep Beck, including the one sentence
   about no ten-year head start.
7. **Zasada na ten kurs** — open with Ronacher's two points (they are the
   setup), then the rule, unchanged.
8. Exercises and sources: keep.

### 1g Jak nie wypaść z obiegu — build the sections on each other

Carrying question: *everything about specific tools will expire before you
finish school; what does not expire?*

1. Opening — keep both paragraphs.
2. **Dlaczego nazwy się psują** — keep the three examples and “ucz się
   kategorii, sprawdzaj nazwy”; “siedem razy dziennie” becomes one clause
   with a link to 1e; drop the package-manager detail.
3. **Jak ocenić narzędzie, którego jeszcze nie ma** — the six questions, then
   “Ile czasu dać narzędziu” folded in as the paragraph that says how long to
   run the evaluation (keep the 30–100 hours recall, one clause, link to 1c).
4. **Skąd brać informacje** — keep the three kinds.
5. **Jak czytać to, co znajdziesz** — the four rankings (table unchanged; the
   IEEE note; “według czego i z kiedy”), then the three questions that separate
   an announcement from a product, with Torvalds as a one-clause recall.
6. **Postawa, nie tylko metoda** — keep; this is the home of “dogoni front w
   dwa tygodnie” and of the DHH advice.
7. Exercises and sources: keep.

## 6. Flagged for Viktar, not changed

- **“Około 30–100 godzin praktyki”** (1c, now in the ending) has no entry in
  the lesson's sources. Kept verbatim; needs a source or a softer phrasing.
- **Module references** mix forms: “Module 3”, “module o specyfikacjach”,
  “module 4”, “module 5”. The guide now says: by topic until the target
  exists, then a link. “Module 3” in 1e became “module o specyfikacjach”;
  1a keeps “w module 4” and “w module 5” because 1a was touched for mechanics
  only. Decide whether numbered references are acceptable once those modules
  have slugs to link to.
- **0a and 0b do not exist**, so 0c is in practice the first lesson a student
  reads. Its opening was written to survive that.
- **Length.** The rewrite made the module longer, not shorter: 1c +24%,
  1f +31%, 1g +25%, 1b +19%, 1e +13%, 1d +7% (words in the file). The growth is
  bridges at section boundaries, one-clause glosses for the terms each lesson
  now owns, a sentence before and after each diagram, and endings that return
  to the opening — all required by the guide — minus the repetitions removed.
  No facts were added. If the reading load matters more than the glosses, the
  term glosses are the first thing to cut (about 60–90 words per lesson).
