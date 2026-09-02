# Questionnaire for `docs/content-reader.md`

| | |
| --- | --- |
| Written | 2026-08-30 |
| Purpose | Collect, on the first lesson, the facts about the class that `docs/content-reader.md` needs — what the students have done with their own hands, what they have not, what they believe about AI, what they want from the course, and the constraints they work under |
| Feeds | `docs/content-reader.md` (aggregate only), the open decisions in `docs/content-research/course-structure-v1.md` (#1 lab OS, #3 class AI tool, #4 accounts and age), lesson 0b |
| Language | Framing in English (Article III); the questionnaire itself is student-facing, so it is Polish and goes into the form verbatim |
| Status | **Proposal.** Cut, reorder, reword. Institutional facts marked TO CONFIRM are not the repo's to assert (Article V) |
| Build | **Google Forms**, generated from this file by `scripts/build-ankieta-form.gs` (Apps Script). The script is the executable copy of the questionnaire below; change this file first, then the script |
| Privacy | The form is **not anonymous** — name, e-mail, GitHub handle — so the answers are personal data and stay with the teacher. **Responses never enter this repo or the site** (Article IV). The reader file is written from counts and paraphrase, never from quotes that could identify a student |

---

## What the reader file needs, and which questions supply it

`content-reader.md` will have five parts. Each maps to a block of the questionnaire below.

| Reader-file part              | What it must say                                                                                                                                                                                        | Questions  |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| **Done with their own hands** | Which languages they actually write in; whether anyone has built a program with a window, a site with a backend, a mobile app; the size of the biggest thing they wrote; whether Git has ever been used | A, B, C, D |
| **Not done**                  | Team work, code older than a week, a user who is not themselves, shipping, paying for a tool — stated as *absent*, so a lesson never assumes them                                                       | B, D, E, G, H |
| **Believe on day one**        | What they think AI does to a programmer's job, whether they read generated code, how much they trust it                                                                                                 | E          |
| **Want**                      | Why they are in this class, what they would like to build, what they expect the course to be, what went wrong in earlier programming lessons                                                            | F, I, J    |
| **Constraints**               | Whether they work, hours available at home, own laptop, OS at home, phone OS, admin rights                                                                                                              | G, K       |

The two sentences that started this — *„Całe twoje doświadczenie z oprogramowaniem to telefon i przeglądarka”* and the *warsztat* of 1990 — both assumed the answer to block B. After this questionnaire the guide can say instead: „22 of 28 have built a program with a window in class; 3 have done it on their own; nobody has shipped one to another person.” That sentence is what 1a's opening should be written from.

---

## Ground rules

- **Not anonymous.** Name, e-mail, GitHub handle — asked as the first three questions (block Z), name and e-mail required. I need to learn about each student, not only about the class — who to sit next to, whose project to pick up in Moduł 8, who has never touched Git.
- **Not graded, not judged.** Said out loud before the form opens, and written in the form's introduction. An honest „nigdy” is more useful than a flattering „kilka razy”.
- **Named answers stay with the teacher.** Only the teacher reads them. Nothing from an individual answer is shown to the class, said in a lesson, or written anywhere the class can see it; what goes back to the class is the aggregate, and only the aggregate. Say this out loud before the form opens — a named form only produces honest answers if the students know where the answers stop.
- **Free text is read, then paraphrased.** A free-text answer may describe a workplace, a family business or a project by name. The reader file carries the pattern („four students have done paid IT work, all of it web”), never the answer.
- **The export file lives in the vault, not in the repo.** The Google Sheet of responses stays in the teacher's Drive; the `.xlsx` download goes to `30_work/TTC/`, per that folder's contract. `.gitignore` already excludes nothing of this kind because nothing of this kind should ever be near the working tree. Named responses raise the stakes: one copy, in the vault, deleted when the year ends.
- **Consent for a survey of minors** — some of the class may still be 17 on 1 September, and the form is named, so this *is* data about identified people, not an anonymous class activity. What the school requires here (a note to guardians, an information clause, a retention period, a school-tenant-only rule) is **TO CONFIRM** with the school before the first lesson — and confirmed, not assumed, because the anonymity that would have made the question moot is gone.

---

## How to run it

### Option A — Google Forms, on the first lesson

Google Forms, not Microsoft Forms: it can be **built from this file by a script** (Apps Script drives `FormApp`; Microsoft has no supported API for creating a form), so the questionnaire in the repo and the form the class fills in cannot drift apart. Whether the school is fine with a Google form when the tenant is Microsoft is **TO CONFIRM**.

1. Build it by running `scripts/build-ankieta-form.gs` in [script.google.com](https://script.google.com) under the account that will still exist in June — the teacher's, not a shared class login. The script creates the form, all sixty items, the sections and the branching, and prints the edit URL and the live URL. The **edit URL stays out of this repo** — it is the key to the form itself — and lives in the vault next to the export. The **live URL is public by construction**: it is printed, with a QR code, in lesson 0a (`content/moduly/00-start/jak-dziala-ten-kurs.mdx`), because that is how the class opens it. That means anyone who finds the site can submit an answer; with no Workspace restriction the defence is that responses are named and a stranger's row is obvious in the sheet. If that stops being enough, close the form outside lesson time (*Responses → Accepting responses* off) and reopen it for the pulse.
2. Settings after the run (the script sets what it can; these are the switches a human confirms in the UI):
   - **If the class has Google Workspace accounts:** *Responses → Restrict to users in <organisation>*, *Collect email addresses → verified*, *Limit to 1 response*. Then Z2 (e-mail) can be deleted — the verified address is better than a typed one.
   - **If they do not:** the form is open to anyone with the link, one response per person cannot be enforced, and blocks Z1–Z3 are the only identity. Say in class that one answer per person is the rule; a duplicate is visible in the sheet anyway.
   - *Presentation → Show progress bar* on; *Shuffle question order* off (the blocks are ordered on purpose); *Confirmation message*: „Dzięki. Zbiorcze wyniki pokażę na następnych zajęciach.”
3. **Branching is sections.** Google Forms only jumps from a single-choice question at the *end of a section*, so E6, G1 and H1 each close their own section and route with *Go to section based on answer*. The script builds this; if a question is moved in this file, the section it closes moves with it.
4. Put the estimated time in the description: „Ankieta na start — 15 minut”. That is the time for the closed questions; the optional free text adds up to ten more for a student who writes a lot, and nobody is asked to. *Send → link → shorten* gives a `forms.gle` link, and the QR code is generated from it; put both on the projector at the end of lesson 0a.
5. Do it **in class**, not as homework. A questionnaire sent home has a 40% return rate and the students who do not answer are the ones the reader file most needs to know about.
6. Next lesson, show the class the **aggregate charts** from the Responses tab — „this is who we are” — and nothing else, with the individual-response view closed. It is the first time the course keeps a promise about data, in front of them.
7. **Responses → link to Sheets**, then download that sheet as `.xlsx` into the vault. Aggregate (below). Write `content-reader.md`.

*(If the school refuses Google: Microsoft Forms takes the same questionnaire, but by hand — settings **Who can fill out — only people in my organisation**, **Record name — on**, **One response per person — on**, and branching set question by question. Budget an hour of clicking and proofread every item.)*

### Option B — a GitHub issue form, in lesson 0c (for the project card only)

Not for the baseline: it requires accounts (open decision #4), and an issue in a public repo is public — the baseline questions include things a student should not have to publish. It is right as the **project card** in 0c, where every student creates their own repository and the first issue in it is a natural first exercise; H1–H6 in the form say who has a project, the card is where that project gets described in the student's own repo.

- A template `.github/ISSUE_TEMPLATE/projekt.yml` in a **starter repository the student clones** (or in a private class repo, if the school allows one). Fields: what the project is, for whom, what it is written in, its state (pomysł / zaczęty / działa / ktoś go używa), the biggest current problem.
- The student opens the issue in their own repo. You read it there. A one-line `gh issue list --repo … --json title,body` per student gives you a table if you want one; it is never aggregated into `ttcmd`.
- Because the repo is the student's, the answer stays the student's. Nothing in Article IV is touched.

### Aggregating into `content-reader.md`

1. Open the response sheet. Delete nothing; copy the free-text columns into a separate sheet and read them once, end to end, before counting anything.
2. For every closed question write one line with the count: „program z oknem: 22 na lekcji, 3 samodzielnie, 3 nigdy”.
3. For every free-text question write one line with the pattern and the range: „praca: 5 pracuje, 2 w IT (obie strony WWW), 3 poza IT; praktyki zawodowe — 24, w tym 11 przy czymkolwiek związanym z kodem”.
4. Write the „not done” part from the zeros: every item that nobody, or almost nobody, has done is a sentence in the reader file saying so.
5. Write the belief part from block E, in the students' own framing but not their words.
6. Date-stamp the file („Stan na 2026-09-…, 2 grupy, N odpowiedzi”). Commit it with the `chore:` prefix (the lane table in Article IX has no docs lane; the journal commits use `chore:`). The export stays in the vault.
7. Repeat the questions marked **↻** below in a two-minute pulse form in November and January, and update the file. The reader changes during the year, and the lessons written in March should know it.

---

## The questionnaire

Student-facing; Polish; goes into the form as written. Question types are Google Forms types: *jeden* (jednokrotny wybór), *wiele* (pola wyboru), *skala* (skala liniowa), *macierz* (siatka jednokrotnego wyboru), *krótki tekst* (krótka odpowiedź), *długi tekst* (akapit). Questions marked **↻** are repeated in the mid-year pulse. A required free-text question produces „nie wiem” and nothing else, so none of them is required.

Sixty items, of which seventeen are optional free text and three are matrices that answer many things at once. **If it has to fit in ten minutes**, drop in this order: L2, I4, I2, J9, F4, F3, D2, G4, A4, E8 — the reader file loses colour, not facts. Do not drop B1, E4 or E5: those are the three questions the lessons are actually waiting on.

Nothing here is required except Z1, Z2, block B (minus the optional B5) and the three questions that route the form — E6, G1, H1 — which have to be answered for the branching to know where to send the student.

### Wstęp (tekst na początku formularza)

> Ta ankieta **nie jest anonimowa** — podpisujesz ją imieniem i nazwiskiem — i **nie jest oceniana**. Czytam ją tylko ja. Nikomu jej nie pokazuję, nie cytuję na lekcji i nie wpisuję nigdzie, gdzie zobaczy ją klasa; klasa zobaczy wyłącznie zbiorcze wyniki, bez nazwisk. Pytania zamknięte zajmą ok. 15 minut; pytania otwarte są dobrowolne.
>
> Chcę wiedzieć, od czego zaczynamy — co już umiesz, czego nie, co myślisz o AI i czego oczekujesz od tego kursu — żeby lekcje nie tłumaczyły ci rzeczy, które znasz, i nie zakładały rzeczy, których nikt cię nie uczył. „Nigdy tego nie robiłem” jest odpowiedzią dokładnie tak samo dobrą, jak każda inna. Zobaczysz zbiorcze wyniki na następnych zajęciach.

### Z. Kto wypełnia

**Z1.** Imię i nazwisko. *(krótki tekst; wymagane)*

**Z2.** E-mail, na który mogę odpisać. *(krótki tekst; wymagane)*
*(jeśli formularz zbiera adres szkolny automatycznie, to pytanie znika)*

**Z3.** Login na GitHubie, jeśli masz. *(krótki tekst, opcjonalnie)*

### A. Szkoła i program

**A1.** Z jakich języków programowania miałeś lekcje w tej szkole? *(wiele)*
C++ · Python · C# · Java · JavaScript / TypeScript · PHP · SQL · HTML i CSS · inny: ___

**A2.** Czy zdawałeś już egzamin z kwalifikacji INF.03 (strony, aplikacje internetowe, bazy danych)? *(jeden)*
tak, zdałem · tak, nie zdałem · jeszcze nie · nie wiem, co to

**A3.** Czy byłeś na praktykach zawodowych? *(jeden)*
tak · nie · będę w tym roku

**A4.** Jeśli tak: gdzie i co tam robiłeś? Czy w pracy na praktykach pojawił się kod (jakikolwiek)? *(długi tekst, opcjonalnie)*

### B. Co zbudowałeś własnymi rękami

**B1.** Dla każdej pozycji zaznacz, co najbardziej pasuje. *(macierz; skala: nigdy · raz, na lekcji · kilka razy, na lekcjach · sam z siebie, poza szkołą)*

- program konsolowy (tekst w terminalu)
- program z oknem, przyciskami i polami (np. Windows Forms, WPF, Tkinter, JavaFX, Qt)
- strona internetowa statyczna (HTML, CSS)
- strona z logowaniem albo bazą danych (PHP, Node, Django itp.)
- aplikacja mobilna na telefon
- gra (Unity, Godot, Pygame, cokolwiek)
- skrypt, który coś automatyzuje (pliki, pobieranie danych, boty)
- program, którego używał ktoś inny niż ja
- program, który działa w internecie albo w sklepie z aplikacjami
- testy do własnego kodu (jednostkowe albo jakiekolwiek automatyczne)
- projekt w Gicie z historią commitów
- pull request na GitHubie (własny albo do cudzego projektu)
- program na mikrokontroler (Arduino, ESP, Raspberry Pi)

**B2.** ↻ Największy program, jaki napisałeś do tej pory — o czym był i mniej więcej jak duży (ile plików albo ile linii, na oko)? *(krótki tekst)*

**B3.** Kto go używał? *(jeden)*
tylko ja · nauczyciel przy ocenie · znajomi lub rodzina · obcy ludzie · nikt, nie został skończony

**B4.** Pracowałeś kiedyś nad jednym kodem z kimś jeszcze — tak, że dwie osoby zmieniały te same pliki? *(jeden)*
nie · raz, na lekcji · tak, kilka razy · tak, regularnie

**B5.** Wracałeś kiedyś do własnego kodu po miesiącu albo dłużej, żeby coś w nim zmienić? Jak to poszło? *(krótki tekst, opcjonalnie)*

### C. Języki i narzędzia

**C1.** Jak oceniasz siebie w każdym języku. *(macierz; skala: nie znam · rozumiem cudzy kod · piszę proste programy · piszę swobodnie)*
C++ · C# · Python · Java · JavaScript / TypeScript · PHP · SQL · Kotlin lub Swift

**C2.** Których narzędzi używałeś więcej niż raz? *(wiele)*
Visual Studio · Visual Studio Code · Rider, IntelliJ lub PyCharm · terminal (wiersz poleceń) · Linux (nie tylko na lekcji) · Git · GitHub · Docker · debugger (punkty przerwania, podgląd zmiennych) · żadnego z tych

**C3.** Który język wybrałbyś dziś, gdybyś miał w tydzień napisać coś, co działa, i dlaczego? *(krótki tekst)*

### D. Pojęcia

**D1.** Zaznacz to, co potrafisz wyjaśnić koledze bez zaglądania do notatek. *(wiele)*
klasa i obiekt · dziedziczenie · interfejs · wyjątek (try/catch) · lista i słownik (tablica asocjacyjna) · rekurencja · zapytanie SQL z JOIN · żądanie HTTP (GET/POST) · JSON · wątek · zdarzenie (event) i obsługa kliknięcia · żadnego z tych

**D2.** Co w programowaniu było dla ciebie do tej pory najtrudniejsze? *(krótki tekst, opcjonalnie)*

### E. AI

**E1.** ↻ Z których narzędzi AI korzystałeś przy kodzie? *(wiele)*
ChatGPT · GitHub Copilot · Claude · Gemini · Cursor, Windsurf lub podobny edytor · inne: ___ · z żadnego

**E2.** ↻ Jak często w ostatnim miesiącu? *(jeden)*
codziennie · kilka razy w tygodniu · kilka razy w miesiącu · raz albo dwa · wcale

**E3.** Do czego najczęściej? *(wiele)*
wyjaśnienie błędu · wyjaśnienie, jak coś działa · wygenerowanie kodu od zera · poprawienie mojego kodu · zadanie domowe w całości · napisanie tekstu, nie kodu · nie używam

**E4.** ↻ Kiedy AI napisze ci kod, co zwykle robisz? *(jeden)*
czytam całość, zanim użyję · przeglądam pobieżnie · uruchamiam i patrzę, czy działa · wklejam i idę dalej

**E5.** ↻ Na ile zgadzasz się z każdym zdaniem. *(macierz; skala 1 — wcale, 5 — całkowicie)*

- AI zastąpi większość programistów w ciągu pięciu lat.
- Kod od AI jest zwykle poprawny.
- Z AI uczę się programować szybciej.
- Rozumiem kod, który AI mi pisze.
- Wolno oddać jako swoją pracę kod, którego się nie rozumie, jeśli działa.
- Programowania ręcznie nadal warto się uczyć.

**E6.** ↻ Czy płacisz za dostęp do AI — sam albo ktoś za ciebie? *(jeden)*
nie, używam tylko darmowych wersji · nie płacę, ale mam płatny dostęp ze szkoły albo z programu dla uczniów (np. GitHub Student) · tak, płacę sam · tak, płaci ktoś w rodzinie · nie korzystam z AI

**E7.** Jeśli masz płatny dostęp — za co i w jakim planie? *(wiele; wyświetlane po każdej odpowiedzi oprócz dwóch ostatnich)*
ChatGPT (Plus / Pro) · Claude (Pro / Max) · GitHub Copilot (Pro / Pro+) · Gemini (AI Pro / Ultra) · Cursor, Windsurf lub podobny edytor · Perplexity · dostęp przez API, płatne za zużycie · inne: ___ · nie wiem, jaki to plan

**E8.** Ile miesięcznie na to wychodzi — łącznie, na oko? *(jeden)*
0 zł · do 50 zł · 50–100 zł · 100–200 zł · więcej niż 200 zł · nie wiem, płaci ktoś inny

**E9.** Opisz jedną sytuację, w której AI cię zawiodło przy kodzie — co się stało i po czym poznałeś, że coś jest nie tak. *(długi tekst, opcjonalnie)*

**E10.** Co myślisz o AI w programowaniu? *(krótki tekst, opcjonalnie)*

### F. Zainteresowania

**F1.** Co w IT ciekawi cię najbardziej? Zaznacz najwyżej trzy. *(wiele)*
gry · aplikacje na telefon · aplikacje na komputer · strony i aplikacje webowe · AI i uczenie maszynowe · cyberbezpieczeństwo · sprzęt, elektronika, roboty · sieci, serwery, chmura · dane i analiza · grafika, UI, projektowanie · nie wiem jeszcze

**F2.** Co robisz w IT poza szkołą? *(wiele)*
nic, szkoła wystarczy · własne programy dla siebie · kanały na YouTube o programowaniu · kursy online · serwer Discord albo forum programistyczne · konkursy, olimpiady, hackathony · modowanie gier · własny serwer, homelab, Linux · pomagam komuś z komputerami

**F3.** Rzecz, której nauczyłeś się sam, z której jesteś najbardziej zadowolony. *(krótki tekst, opcjonalnie)*

**F4.** Skąd bierzesz informacje o nowych rzeczach w IT? Podaj dwa–trzy konkretne źródła (kanał, strona, osoba). *(krótki tekst, opcjonalnie)*

### G. Praca

**G1.** Czy obecnie pracujesz — zarobkowo albo regularnie bez wynagrodzenia? *(jeden)*
nie · tak, poza IT · tak, w IT · tak, na własny rachunek (zlecenia, freelancing) · w firmie rodzinnej

**G2.** Jeśli tak: co robisz, ile godzin w tygodniu i czy ma to jakikolwiek związek z komputerami? *(długi tekst; wyświetlane po „tak”)*

**G3.** Czy kiedykolwiek wcześniej pracowałeś (poza praktykami zawodowymi)? *(jeden)*
nie · tak, poza IT · tak, w IT · tak, na zlecenia

**G4.** Jeśli tak: co to była za praca i czego się z niej nauczyłeś? *(długi tekst, opcjonalnie)*

**G5.** Czy ktoś kiedyś zapłacił ci za kod albo za stronę? *(jeden)*
nie · raz · kilka razy · regularnie

### H. Projekt własny

**H1.** ↻ Czy masz teraz własny projekt programistyczny — coś, co robisz, bo chcesz, nie dlatego, że zadano? *(jeden)*
tak, pracuję nad nim · tak, ale leży od dawna · mam pomysł, nie zacząłem · nie

**H2.** Jeśli tak: co to jest i dla kogo? *(długi tekst; wyświetlane po „tak”)*

**H3.** W czym jest napisany i w jakim jest stanie? *(krótki tekst)*
*(podpowiedź: język, narzędzia; pomysł / zaczęty / działa / ktoś go używa)*

**H4.** Jaki jest teraz jego największy problem? *(krótki tekst, opcjonalnie)*

**H5.** Link do repozytorium albo do czegokolwiek, co można zobaczyć. *(krótki tekst, opcjonalnie; wyświetlane po „tak”)*

**H6.** ↻ Chciałbyś prowadzić ten projekt dalej na tym kursie? *(jeden)*
tak · może, zależy jak · nie, wolę zrobić coś nowego

### I. Cele

**I1.** ↻ Co planujesz po technikum? *(jeden)*
studia informatyczne · inne studia · praca w IT od razu · praca poza IT · własna firma · nie wiem

**I2.** Gdzie chcesz być za trzy lata — jedno zdanie. *(krótki tekst, opcjonalnie)*

**I3.** Jak ważny jest dla ciebie egzamin INF.04? *(skala 1 — nieważny, 5 — bardzo ważny)*

**I4.** Jaki tytuł stanowiska przychodzi ci do głowy, kiedy myślisz „chciałbym to robić”? *(krótki tekst, opcjonalnie)*

### J. Oczekiwania od kursu „Aplikacje desktopowe i mobilne”

**J1.** ↻ Gdybyś mógł wybrać, co zbudujesz na tym kursie — co by to było? *(krótki tekst)*

**J2.** Co bardziej cię ciekawi? *(jeden)*
aplikacja na komputer · aplikacja na telefon · obie tak samo · żadna szczególnie

**J3.** Na jaką platformę chciałbyś pisać? *(wiele)*
Windows · Android · iOS · macOS · Linux · przeglądarka

**J4.** Po czym poznasz w czerwcu, że ten kurs był udany? *(krótki tekst)*

**J5.** Co w dotychczasowych lekcjach programowania działało najgorzej — co byś zmienił? *(długi tekst, opcjonalnie)*

**J6.** Jak najlepiej się uczysz? Zaznacz najwyżej dwa. *(wiele)*
ktoś pokazuje na żywo, a ja powtarzam · czytam i próbuję sam · oglądam wideo · dostaję zadanie i szukam rozwiązania · robię projekt od początku do końca · rozmawiam i pytam

**J7.** Wolisz pracować: *(jeden)*
sam · w parze · w grupie 3–4 osób · zależy od zadania

**J8.** ↻ Ile godzin w tygodniu, realnie, możesz poświęcić na ten kurs poza lekcjami? *(jeden)*
0 · do 1 · 1–3 · 3–5 · więcej niż 5

**J9.** Czy jest coś, czego się na tym kursie obawiasz? *(krótki tekst, opcjonalnie)*

### K. Sprzęt i warunki

**K1.** Czy masz własny laptop albo komputer, na którym możesz instalować programy? *(jeden)*
tak, laptop · tak, komputer stacjonarny · tak, oba · nie

**K2.** Jaki system jest na twoim komputerze w domu? *(wiele)*
Windows · macOS · Linux · nie mam komputera

**K3.** Jaki masz telefon? *(jeden)*
Android · iPhone · inny · nie mam


### L. Na koniec

**L1.** Jedno pytanie, które chciałbyś zadać nauczycielowi tego kursu. *(krótki tekst, opcjonalnie)*

**L2.** Cokolwiek jeszcze chcesz dodać. *(długi tekst, opcjonalnie)*

---

## What the answers change, concretely

| Answer | What it decides |
| --- | --- |
| B1 „program z oknem” mostly *raz, na lekcji* | 1a's anchor — the window with one button — is something they have touched; the opening can start from that lesson, not from „telefon i przeglądarka” |
| B1 „program, którego używał ktoś inny” mostly *nigdy* | Every mention of users, maintenance, „kto poniesie koszt” in 1f must be built, not assumed |
| B4 „jeden kod z kimś jeszcze” mostly *nie* | Team work, code review, pull requests are *new* — 0c and Moduł 6 explain them from zero |
| C1 C# level | Whether Moduł 4/5 can assume C# syntax or must teach it — Article VII's „confirmed with the students in the opening weeks” is this question |
| E1–E4 | Which tool 0b installs (open decision #3); how much of 1b is recall vs new; whether 1f's „nie czytam diffów” is a description of the class |
| E6–E8 | Whether the class tool can be a paid one at all (open decision #3) — and the „never paid for a tool” line in the reader file: how many already do, and what they think a month of it is worth |
| E5 belief scores | What 1c has to *move*: if most answer 4–5 on „kod od AI jest zwykle poprawny”, the METR and Anthropic numbers are the argument; if 1–2, the lesson argues the other way |
| G1–G5 | Whether „praca w zespole” and „klient” can be examples or must be explained; how many hours J8 really means |
| H1–H6 | Whether Moduł 8's „someone real uses it” has candidates on day one, and which named students to ask first |
| J1, J2, J3 | The 4e brainstorm's starting list; whether mobile (Moduł 7) should move earlier |
| K1–K3 | Lesson 0b and open decision #1: what can be installed where |

---

## Open — for Viktar

1. **Does the school accept a Google form** when the tenant is Microsoft — and do the students have Workspace accounts? That answer decides restriction, verified e-mail and one-response-per-person (Option A step 2), and it is the difference between an identified form and a form anyone with the link can fill in twice. TO CONFIRM.
2. **Consent note to guardians and an information clause** for a named in-class survey — the school's call, TO CONFIRM. Named answers make this a question that has to be answered before 1 September, not after.
3. **Does A2 (INF.03) belong in the form?** It is a fact about the student the school already has; it is here only because it says what the whole class has been taught. Drop it if it feels like an assessment question.
4. **Should E5 be shown back to the class** in lesson 1c, as „what we believed in September”? It is the strongest possible opening for that lesson — shown as the aggregate only, which is what Article IV allows and what the form's introduction promises.
