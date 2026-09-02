/**
 * build-ankieta-form.gs — builds the start-of-year questionnaire as a Google Form.
 *
 * Source of truth: docs/ques-for-content-reader.md in the `ttcmd` repo.
 * Change that file first, then this script.
 *
 * How to run:
 *   1. script.google.com → New project → paste this file over Code.gs → Save.
 *   2. Run `buildForm`. Approve the permission prompt (it needs Forms + Drive).
 *   3. The execution log prints the EDIT url and the LIVE url.
 *
 * Re-running creates a NEW form; it never edits the previous one.
 */

// ── Configuration ────────────────────────────────────────────────────────────
// Set to true only if the students have Google Workspace accounts in the school
// domain. Then the form collects the verified school address and Z2 is dropped.
var WORKSPACE_ACCOUNTS = false;

var TITLE = 'Ankieta na start — Aplikacje desktopowe i mobilne';

var INTRO = [
  'Ta ankieta NIE jest anonimowa — podpisujesz ją imieniem i nazwiskiem — i NIE jest oceniana.',
  'Czytam ją tylko ja. Nikomu jej nie pokazuję, nie cytuję na lekcji i nie wpisuję nigdzie,',
  'gdzie zobaczy ją klasa; klasa zobaczy wyłącznie zbiorcze wyniki, bez nazwisk.',
  '',
  'Pytania zamknięte zajmą ok. 15 minut; pytania otwarte są dobrowolne.',
  '',
  'Chcę wiedzieć, od czego zaczynamy — co już umiesz, czego nie, co myślisz o AI i czego',
  'oczekujesz od tego kursu — żeby lekcje nie tłumaczyły ci rzeczy, które znasz, i nie zakładały',
  'rzeczy, których nikt cię nie uczył. „Nigdy tego nie robiłem” jest odpowiedzią dokładnie tak',
  'samo dobrą, jak każda inna. Zobaczysz zbiorcze wyniki na następnych zajęciach.'
].join('\n');

// ── Helpers ──────────────────────────────────────────────────────────────────
function header(form, title) {
  form.addSectionHeaderItem().setTitle(title);
}

function shortText(form, title, help, required) {
  var i = form.addTextItem().setTitle(title).setRequired(!!required);
  if (help) i.setHelpText(help);
  return i;
}

function longText(form, title, help, required) {
  var i = form.addParagraphTextItem().setTitle(title).setRequired(!!required);
  if (help) i.setHelpText(help);
  return i;
}

function single(form, title, choices, required, other) {
  var i = form.addMultipleChoiceItem().setTitle(title).setChoiceValues(choices)
    .setRequired(!!required);
  if (other) i.showOtherOption(true);
  return i;
}

function multi(form, title, choices, other, atMost) {
  var i = form.addCheckboxItem().setTitle(title).setChoiceValues(choices);
  if (other) i.showOtherOption(true);
  if (atMost) {
    i.setValidation(FormApp.createCheckboxValidation()
      .requireSelectAtMost(atMost).build());
  }
  return i;
}

function grid(form, title, rows, cols, required) {
  return form.addGridItem().setTitle(title).setRows(rows).setColumns(cols)
    .setRequired(!!required);
}

function page(form, title) {
  return form.addPageBreakItem().setTitle(title);
}

// ── The form ─────────────────────────────────────────────────────────────────
function buildForm() {
  var form = FormApp.create(TITLE);
  form.setDescription(INTRO)
      .setProgressBar(true)
      .setShuffleQuestions(false)
      .setAllowResponseEdits(false)
      .setConfirmationMessage('Dzięki. Zbiorcze wyniki pokażę na następnych zajęciach.');

  if (WORKSPACE_ACCOUNTS) {
    form.setCollectEmail(true);
    form.setLimitOneResponsePerUser(true);
  } else {
    form.setLimitOneResponsePerUser(false);
  }

  // ── Z. Kto wypełnia ────────────────────────────────────────────────────────
  header(form, 'Kto wypełnia');
  shortText(form, 'Imię i nazwisko', null, true);
  if (!WORKSPACE_ACCOUNTS) {
    shortText(form, 'E-mail, na który mogę odpisać', null, true);
  }
  shortText(form, 'Login na GitHubie, jeśli masz', 'Zostaw puste, jeśli nie masz konta.', false);

  // ── A. Szkoła i program ────────────────────────────────────────────────────
  header(form, 'A. Szkoła i program');
  multi(form, 'A1. Z jakich języków programowania miałeś lekcje w tej szkole?',
    ['C++', 'Python', 'C#', 'Java', 'JavaScript / TypeScript', 'PHP', 'SQL', 'HTML i CSS'],
    true);
  single(form, 'A2. Czy zdawałeś już egzamin z kwalifikacji INF.03 (strony, aplikacje internetowe, bazy danych)?',
    ['tak, zdałem', 'tak, nie zdałem', 'jeszcze nie', 'nie wiem, co to']);
  single(form, 'A3. Czy byłeś na praktykach zawodowych?', ['tak', 'nie', 'będę w tym roku']);
  longText(form, 'A4. Jeśli tak: gdzie i co tam robiłeś? Czy w pracy na praktykach pojawił się kod (jakikolwiek)?',
    'Nieobowiązkowe.');

  // ── B. Co zbudowałeś własnymi rękami ───────────────────────────────────────
  header(form, 'B. Co zbudowałeś własnymi rękami');
  grid(form, 'B1. Dla każdej pozycji zaznacz, co najbardziej pasuje.', [
    'program konsolowy (tekst w terminalu)',
    'program z oknem, przyciskami i polami (np. Windows Forms, WPF, Tkinter, JavaFX, Qt)',
    'strona internetowa statyczna (HTML, CSS)',
    'strona z logowaniem albo bazą danych (PHP, Node, Django itp.)',
    'aplikacja mobilna na telefon',
    'gra (Unity, Godot, Pygame, cokolwiek)',
    'skrypt, który coś automatyzuje (pliki, pobieranie danych, boty)',
    'program, którego używał ktoś inny niż ja',
    'program, który działa w internecie albo w sklepie z aplikacjami',
    'testy do własnego kodu (jednostkowe albo jakiekolwiek automatyczne)',
    'projekt w Gicie z historią commitów',
    'pull request na GitHubie (własny albo do cudzego projektu)',
    'program na mikrokontroler (Arduino, ESP, Raspberry Pi)'
  ], ['nigdy', 'raz, na lekcji', 'kilka razy, na lekcjach', 'sam z siebie, poza szkołą'], true);

  shortText(form, 'B2. Największy program, jaki napisałeś do tej pory — o czym był i mniej więcej jak duży?',
    'Ile plików albo ile linii, na oko.', true);
  single(form, 'B3. Kto go używał?',
    ['tylko ja', 'nauczyciel przy ocenie', 'znajomi lub rodzina', 'obcy ludzie', 'nikt, nie został skończony'],
    true);
  single(form, 'B4. Pracowałeś kiedyś nad jednym kodem z kimś jeszcze — tak, że dwie osoby zmieniały te same pliki?',
    ['nie', 'raz, na lekcji', 'tak, kilka razy', 'tak, regularnie'], true);
  shortText(form, 'B5. Wracałeś kiedyś do własnego kodu po miesiącu albo dłużej, żeby coś w nim zmienić? Jak to poszło?',
    'Nieobowiązkowe.');

  // ── C. Języki i narzędzia ──────────────────────────────────────────────────
  header(form, 'C. Języki i narzędzia');
  grid(form, 'C1. Jak oceniasz siebie w każdym języku.',
    ['C++', 'C#', 'Python', 'Java', 'JavaScript / TypeScript', 'PHP', 'SQL', 'Kotlin lub Swift'],
    ['nie znam', 'rozumiem cudzy kod', 'piszę proste programy', 'piszę swobodnie']);
  multi(form, 'C2. Których narzędzi używałeś więcej niż raz?', [
    'Visual Studio', 'Visual Studio Code', 'Rider, IntelliJ lub PyCharm',
    'terminal (wiersz poleceń)', 'Linux (nie tylko na lekcji)', 'Git', 'GitHub', 'Docker',
    'debugger (punkty przerwania, podgląd zmiennych)', 'żadnego z tych'
  ]);
  shortText(form, 'C3. Który język wybrałbyś dziś, gdybyś miał w tydzień napisać coś, co działa, i dlaczego?');

  // ── D. Pojęcia ─────────────────────────────────────────────────────────────
  header(form, 'D. Pojęcia');
  multi(form, 'D1. Zaznacz to, co potrafisz wyjaśnić koledze bez zaglądania do notatek.', [
    'klasa i obiekt', 'dziedziczenie', 'interfejs', 'wyjątek (try/catch)',
    'lista i słownik (tablica asocjacyjna)', 'rekurencja', 'zapytanie SQL z JOIN',
    'żądanie HTTP (GET/POST)', 'JSON', 'wątek', 'zdarzenie (event) i obsługa kliknięcia',
    'żadnego z tych'
  ]);
  shortText(form, 'D2. Co w programowaniu było dla ciebie do tej pory najtrudniejsze?', 'Nieobowiązkowe.');

  // ── E. AI (część 1) ────────────────────────────────────────────────────────
  header(form, 'E. AI');
  multi(form, 'E1. Z których narzędzi AI korzystałeś przy kodzie?',
    ['ChatGPT', 'GitHub Copilot', 'Claude', 'Gemini', 'Cursor, Windsurf lub podobny edytor', 'z żadnego'],
    true);
  single(form, 'E2. Jak często w ostatnim miesiącu?',
    ['codziennie', 'kilka razy w tygodniu', 'kilka razy w miesiącu', 'raz albo dwa', 'wcale']);
  multi(form, 'E3. Do czego najczęściej?', [
    'wyjaśnienie błędu', 'wyjaśnienie, jak coś działa', 'wygenerowanie kodu od zera',
    'poprawienie mojego kodu', 'zadanie domowe w całości', 'napisanie tekstu, nie kodu', 'nie używam'
  ]);
  single(form, 'E4. Kiedy AI napisze ci kod, co zwykle robisz?', [
    'czytam całość, zanim użyję', 'przeglądam pobieżnie',
    'uruchamiam i patrzę, czy działa', 'wklejam i idę dalej'
  ]);
  grid(form, 'E5. Na ile zgadzasz się z każdym zdaniem.', [
    'AI zastąpi większość programistów w ciągu pięciu lat.',
    'Kod od AI jest zwykle poprawny.',
    'Z AI uczę się programować szybciej.',
    'Rozumiem kod, który AI mi pisze.',
    'Wolno oddać jako swoją pracę kod, którego się nie rozumie, jeśli działa.',
    'Programowania ręcznie nadal warto się uczyć.'
  ], ['1 — wcale', '2', '3', '4', '5 — całkowicie']);

  // E6 routes: it must be the LAST item on this page.
  var e6 = form.addMultipleChoiceItem()
    .setTitle('E6. Czy płacisz za dostęp do AI — sam albo ktoś za ciebie?')
    .setRequired(true);

  // ── Pages ──────────────────────────────────────────────────────────────────
  var pPaid  = page(form, 'Płatny dostęp do AI');
  multi(form, 'E7. Jeśli masz płatny dostęp — za co i w jakim planie?', [
    'ChatGPT (Plus / Pro)', 'Claude (Pro / Max)', 'GitHub Copilot (Pro / Pro+)',
    'Gemini (AI Pro / Ultra)', 'Cursor, Windsurf lub podobny edytor', 'Perplexity',
    'dostęp przez API, płatne za zużycie', 'nie wiem, jaki to plan'
  ], true);
  single(form, 'E8. Ile miesięcznie na to wychodzi — łącznie, na oko?', [
    '0 zł', 'do 50 zł', '50–100 zł', '100–200 zł', 'więcej niż 200 zł', 'nie wiem, płaci ktoś inny'
  ]);

  var pAiRest = page(form, 'AI — jeszcze dwa pytania');
  longText(form, 'E9. Opisz jedną sytuację, w której AI cię zawiodło przy kodzie — co się stało i po czym poznałeś, że coś jest nie tak?',
    'Nieobowiązkowe.');
  shortText(form, 'E10. Co myślisz o AI w programowaniu?', 'Nieobowiązkowe.');

  // ── F. Zainteresowania ─────────────────────────────────────────────────────
  header(form, 'F. Zainteresowania');
  multi(form, 'F1. Co w IT ciekawi cię najbardziej? Zaznacz najwyżej trzy.', [
    'gry', 'aplikacje na telefon', 'aplikacje na komputer', 'strony i aplikacje webowe',
    'AI i uczenie maszynowe', 'cyberbezpieczeństwo', 'sprzęt, elektronika, roboty',
    'sieci, serwery, chmura', 'dane i analiza', 'grafika, UI, projektowanie', 'nie wiem jeszcze'
  ], false, 3);
  multi(form, 'F2. Co robisz w IT poza szkołą?', [
    'nic, szkoła wystarczy', 'własne programy dla siebie', 'kanały na YouTube o programowaniu',
    'kursy online', 'serwer Discord albo forum programistyczne', 'konkursy, olimpiady, hackathony',
    'modowanie gier', 'własny serwer, homelab, Linux', 'pomagam komuś z komputerami'
  ]);
  shortText(form, 'F3. Rzecz, której nauczyłeś się sam, z której jesteś najbardziej zadowolony.', 'Nieobowiązkowe.');
  shortText(form, 'F4. Skąd bierzesz informacje o nowych rzeczach w IT? Podaj dwa–trzy konkretne źródła (kanał, strona, osoba).',
    'Nieobowiązkowe.');

  // ── G. Praca (G1 routes; last item on this page) ───────────────────────────
  header(form, 'G. Praca');
  var g1 = form.addMultipleChoiceItem()
    .setTitle('G1. Czy obecnie pracujesz — zarobkowo albo regularnie bez wynagrodzenia?')
    .setRequired(true);

  var pWorkNow = page(form, 'Praca teraz');
  longText(form, 'G2. Co robisz, ile godzin w tygodniu i czy ma to jakikolwiek związek z komputerami?');

  var pWorkPast = page(form, 'Praca wcześniej');
  single(form, 'G3. Czy kiedykolwiek wcześniej pracowałeś (poza praktykami zawodowymi)?',
    ['nie', 'tak, poza IT', 'tak, w IT', 'tak, na zlecenia']);
  longText(form, 'G4. Jeśli tak: co to była za praca i czego się z niej nauczyłeś?', 'Nieobowiązkowe.');
  single(form, 'G5. Czy ktoś kiedyś zapłacił ci za kod albo za stronę?',
    ['nie', 'raz', 'kilka razy', 'regularnie']);

  // H1 routes; last item on this page.
  header(form, 'H. Projekt własny');
  var h1 = form.addMultipleChoiceItem()
    .setTitle('H1. Czy masz teraz własny projekt programistyczny — coś, co robisz, bo chcesz, nie dlatego, że zadano?')
    .setRequired(true);

  var pProject = page(form, 'Twój projekt');
  longText(form, 'H2. Co to jest i dla kogo?');
  shortText(form, 'H3. W czym jest napisany i w jakim jest stanie?',
    'Podpowiedź: język, narzędzia; pomysł / zaczęty / działa / ktoś go używa.');
  shortText(form, 'H4. Jaki jest teraz jego największy problem?', 'Nieobowiązkowe.');
  shortText(form, 'H5. Link do repozytorium albo do czegokolwiek, co można zobaczyć.', 'Nieobowiązkowe.');
  single(form, 'H6. Chciałbyś prowadzić ten projekt dalej na tym kursie?',
    ['tak', 'może, zależy jak', 'nie, wolę zrobić coś nowego']);

  // ── I / J / K / L ──────────────────────────────────────────────────────────
  var pRest = page(form, 'Cele, oczekiwania, sprzęt');

  header(form, 'I. Cele');
  single(form, 'I1. Co planujesz po technikum?', [
    'studia informatyczne', 'inne studia', 'praca w IT od razu', 'praca poza IT',
    'własna firma', 'nie wiem'
  ]);
  shortText(form, 'I2. Gdzie chcesz być za trzy lata — jedno zdanie.', 'Nieobowiązkowe.');
  form.addScaleItem().setTitle('I3. Jak ważny jest dla ciebie egzamin INF.04?')
    .setBounds(1, 5).setLabels('nieważny', 'bardzo ważny');
  shortText(form, 'I4. Jaki tytuł stanowiska przychodzi ci do głowy, kiedy myślisz „chciałbym to robić”?',
    'Nieobowiązkowe.');

  header(form, 'J. Oczekiwania od kursu „Aplikacje desktopowe i mobilne”');
  shortText(form, 'J1. Gdybyś mógł wybrać, co zbudujesz na tym kursie — co by to było?');
  single(form, 'J2. Co bardziej cię ciekawi?',
    ['aplikacja na komputer', 'aplikacja na telefon', 'obie tak samo', 'żadna szczególnie']);
  multi(form, 'J3. Na jaką platformę chciałbyś pisać?',
    ['Windows', 'Android', 'iOS', 'macOS', 'Linux', 'przeglądarka']);
  shortText(form, 'J4. Po czym poznasz w czerwcu, że ten kurs był udany?');
  longText(form, 'J5. Co w dotychczasowych lekcjach programowania działało najgorzej — co byś zmienił?',
    'Nieobowiązkowe.');
  multi(form, 'J6. Jak najlepiej się uczysz? Zaznacz najwyżej dwa.', [
    'ktoś pokazuje na żywo, a ja powtarzam', 'czytam i próbuję sam', 'oglądam wideo',
    'dostaję zadanie i szukam rozwiązania', 'robię projekt od początku do końca', 'rozmawiam i pytam'
  ], false, 2);
  single(form, 'J7. Wolisz pracować:', ['sam', 'w parze', 'w grupie 3–4 osób', 'zależy od zadania']);
  single(form, 'J8. Ile godzin w tygodniu, realnie, możesz poświęcić na ten kurs poza lekcjami?',
    ['0', 'do 1', '1–3', '3–5', 'więcej niż 5']);
  shortText(form, 'J9. Czy jest coś, czego się na tym kursie obawiasz?', 'Nieobowiązkowe.');

  header(form, 'K. Sprzęt i warunki');
  single(form, 'K1. Czy masz własny laptop albo komputer, na którym możesz instalować programy?',
    ['tak, laptop', 'tak, komputer stacjonarny', 'tak, oba', 'nie']);
  multi(form, 'K2. Jaki system jest na twoim komputerze w domu?',
    ['Windows', 'macOS', 'Linux', 'nie mam komputera']);
  single(form, 'K3. Jaki masz telefon?', ['Android', 'iPhone', 'inny', 'nie mam']);

  header(form, 'L. Na koniec');
  shortText(form, 'L1. Jedno pytanie, które chciałbyś zadać nauczycielowi tego kursu.', 'Nieobowiązkowe.');
  longText(form, 'L2. Cokolwiek jeszcze chcesz dodać.', 'Nieobowiązkowe.');

  // ── Branching (set after every page exists) ────────────────────────────────
  e6.setChoices([
    e6.createChoice('nie, używam tylko darmowych wersji', pAiRest),
    e6.createChoice('nie płacę, ale mam płatny dostęp ze szkoły albo z programu dla uczniów (np. GitHub Student)', pPaid),
    e6.createChoice('tak, płacę sam', pPaid),
    e6.createChoice('tak, płaci ktoś w rodzinie', pPaid),
    e6.createChoice('nie korzystam z AI', pAiRest)
  ]);
  pPaid.setGoToPage(pAiRest);

  g1.setChoices([
    g1.createChoice('nie', pWorkPast),
    g1.createChoice('tak, poza IT', pWorkNow),
    g1.createChoice('tak, w IT', pWorkNow),
    g1.createChoice('tak, na własny rachunek (zlecenia, freelancing)', pWorkNow),
    g1.createChoice('w firmie rodzinnej', pWorkNow)
  ]);
  pWorkNow.setGoToPage(pWorkPast);

  h1.setChoices([
    h1.createChoice('tak, pracuję nad nim', pProject),
    h1.createChoice('tak, ale leży od dawna', pProject),
    h1.createChoice('mam pomysł, nie zacząłem', pProject),
    h1.createChoice('nie', pRest)
  ]);
  pProject.setGoToPage(pRest);

  // ── Report ─────────────────────────────────────────────────────────────────
  var items = form.getItems();
  var questions = 0;
  for (var i = 0; i < items.length; i++) {
    var t = items[i].getType();
    if (t !== FormApp.ItemType.PAGE_BREAK && t !== FormApp.ItemType.SECTION_HEADER) questions++;
  }
  Logger.log('EDIT: ' + form.getEditUrl());
  Logger.log('LIVE: ' + form.getPublishedUrl());
  Logger.log('Pytań: ' + questions + ' (plus ' + (items.length - questions) + ' nagłówków i sekcji)');
  return form.getEditUrl();
}
