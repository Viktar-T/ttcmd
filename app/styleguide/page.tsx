import type { Metadata } from "next";
import { compileProse } from "@/lib/content";
import type { CourseLesson, CourseModule } from "@/lib/content";
import { Band } from "@/components/band";
import { Breadcrumb } from "@/components/breadcrumb";
import { ContentsDisclosure, ContentsPanel } from "@/components/contents";
import { LessonList } from "@/components/lesson-list";
import { ModuleGrid } from "@/components/module-grid";
import { Pager } from "@/components/pager";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Type and colour reference — ttcmd",
};

/**
 * The reference surface for slice 003. Permanent, and nothing links to it:
 * it is where the type and colour system gets checked after any later slice
 * touches it, and deleting it would make this slice's evidence unreproducible.
 *
 * Labels are English. Article III puts student-facing text in Polish and
 * repo-facing text in English, and this page is a maintainer's instrument that
 * happens to be publicly reachable.
 *
 * Swatches carry token NAMES ONLY. Printing each value beside its swatch would
 * put colour literals in this file and trip the guard in
 * scripts/check-design-invariants.mjs — the reference page failing its own
 * rule. The values live in app/tokens.css and in ADR-0007.
 */

/**
 * The code-block specimens — slice 005 §8.
 *
 * Written as Markdown and compiled through the real pipeline, so the meta
 * parser, the highlighter and the components map all run: what is on this page
 * is what a lesson would get. The nine fenced blocks in the Git lesson are all
 * `bash`, none declares a filename, none marks a line and none is long enough
 * to scroll — and no lesson contains C#, which Article VII makes the language
 * that must work. This is where all of that is checked.
 *
 * TILDE FENCES, deliberately. They are CommonMark and behave identically to
 * backticks, info string included, and they can sit inside a TypeScript
 * template literal without escaping every fence character into unreadability.
 *
 * Labels are English like the rest of this page; the code and its comments are
 * Polish, because Polish inside a code block is one of the things under test.
 */
const CODE_SPECIMENS = `
#### bash, as the Git lesson writes it

~~~bash
# Zażółć gęślą jaźń — ĄĆĘŁŃÓŚŹŻ ążćęłńóśź
git config --global user.name "Imię Nazwisko"
git switch -c nazwa-galezi && git push -u origin HEAD
~~~

#### C#, with a filename header and three marked lines

~~~csharp title="Koszyk.cs" {7,17-18}
using System;
using System.Collections.Generic;
using System.Linq;

namespace Sklep;

// Zażółć gęślą jaźń — ĄĆĘŁŃÓŚŹŻ ążćęłńóśź
public record Pozycja(string Nazwa, decimal Cena, int Ilosc);

public class Koszyk
{
    private readonly List<Pozycja> pozycje = new();
    public const decimal Vat = 0.23m;

    public void Dodaj(Pozycja pozycja)
    {
        if (pozycja.Ilosc <= 0)
            throw new ArgumentException("Ilość musi być dodatnia", nameof(pozycja));

        pozycje.Add(pozycja);
    }

    public decimal Razem() => pozycje.Sum(p => p.Cena * p.Ilosc) * (1 + Vat);
}
~~~

#### A fence with no language — output, not code

~~~
  Przywracanie pakietów...
  Sklep -> bin/Release/Sklep.dll
  Kompilacja zakończona powodzeniem.
~~~

#### One line, which is what most blocks in a lesson are

~~~bash
git status
~~~

#### A line long enough to scroll inside the block at any width

~~~bash
dotnet publish -c Release -r win-x64 --self-contained false -p:PublishSingleFile=true -o ./wydanie
~~~
`;

/**
 * The exercise specimens — slice 009 §7.
 *
 * Permanent, and for the same reason the code specimens above are: no lesson
 * writes `<Zadanie>` yet, so without these the treatment could not be looked at
 * on the site at all, and the next slice to touch typography or colour would
 * have nothing to re-check it against.
 *
 * The blank lines inside the element are required by MDX, not by this slice:
 * without them the children stay inline content and never become paragraphs.
 * Every exercise in every lesson has to be written the same way, which is why
 * the second specimen has two paragraphs and a list — the spacing between an
 * exercise's own blocks comes from its component, since app/prose.css zeroes
 * those margins and applies its rhythm only to the prose's own children.
 *
 * NEITHER SPECIMEN CARRIES A NUMBER, and neither may: the numbers come from the
 * numbering context the page passes to `compileProse`, and the plugin refuses
 * an author-written one. That refusal is the thing being demonstrated as much
 * as the treatment is.
 */
const EXERCISE_SPECIMENS = `
<Zadanie title="Cztery rankingi.">

Otwórz dziś TIOBE, ostatnią ankietę Stack Overflow, ostatni raport Octoverse i
ostatni ranking IEEE Spectrum. Do każdego zapisz: datę, język na pierwszym
miejscu i miejsce C#.

</Zadanie>

<Zadanie>

Ćwiczenie bez tytułu — tak jest napisana zdecydowana większość zadań w kursie,
więc nagłówka nie ma tu wcale, a nie jako pusty pasek. Ten akapit jest na tyle
długi, żeby zawijał się na telefonie i pokazywał, gdzie kończy się kolumna
tekstu wewnątrz ramki: Zażółć gęślą jaźń — ĄĆĘŁŃÓŚŹŻ ążćęłńóśź.

Drugi akapit istnieje po to, żeby było widać odstęp między blokami wewnątrz
zadania. Lista poniżej sprawdza to samo dla wypunktowania:

- pierwsza pozycja,
- druga pozycja, dłuższa, żeby też się zawinęła przy wąskim ekranie,
- trzecia.

</Zadanie>
`;

/**
 * The sourcing specimens — slice 010 §9.
 *
 * Permanent, and for the reason the code and exercise specimens above are
 * permanent: no lesson writes any of these elements yet — adopting them is
 * content-lane work — so without this block the treatment could not be looked
 * at on the site at all, and the next slice to touch typography or colour
 * would have nothing to re-check it against.
 *
 * EVERY FACT IN HERE IS ONE THE SITE ALREADY PUBLISHES. The quotations, the
 * source entries and the further-reading items are taken from the lessons'
 * existing `Źródła` lists with their own links and dates, so this page asserts
 * nothing new about the world (constitution Article V, and the rule these
 * elements exist to make visible). Where a variant has no counterpart in the
 * corpus — a source that exists only on paper — the specimen says in its own
 * text that it is a specimen, rather than inventing a citation.
 *
 * The internal link at the end points at a real published lesson, and has to:
 * `compileProse` resolves its links against the same course model a lesson's
 * do, so an invented target would have to be exempted from the check — which
 * is the "synthetic fixture" this slice's spec rejects arriving by the back
 * door. Renaming or unpublishing that lesson fails the build on this file, and
 * the fix is one path.
 */
const SOURCE_SPECIMENS = `
#### A quotation: one paragraph, a person, a full date

<Cytat
  author="Andrej Karpathy"
  source="X"
  date="2025-02-02"
  url="https://x.com/karpathy/status/1886192184808149383">

Jest nowy rodzaj kodowania, który nazywam „vibe codingiem”: całkowicie
poddajesz się wibracjom, wchodzisz w wykładniczość i zapominasz, że kod w
ogóle istnieje.

</Cytat>

#### The same element with a moment inside a recording, a transcript, and a date given only to the month

<Cytat
  author="DHH"
  source="Lex Fridman Podcast, odcinek 501"
  date="2026-08"
  url="https://www.youtube.com/watch?v=NYFGCESmikA"
  at="51:05"
  transcript="https://lexfridman.com/dhh-2-transcript/">

vibe coding, jeśli mamy go tu zdefiniować, polega na tym, że każesz agentowi
zbudować dla ciebie oprogramowanie. Nie patrzysz na implementację.

</Cytat>

#### Several paragraphs, an organisation rather than a person, a source on paper, and a date given only to the year

<Cytat
  author="Kurs ttcmd"
  source="Okaz do sprawdzania składu"
  date="2019"
  print="okaz — wydanie papierowe, które nie ma adresu w sieci">

To nie są niczyje słowa. Ten blok jest okazem: sprawdza, jak wygląda cytat
złożony z kilku akapitów i jak duży jest odstęp między nimi. Zażółć gęślą
jaźń — ĄĆĘŁŃÓŚŹŻ ążćęłńóśź.

Drugi akapit istnieje po to, żeby ten odstęp było widać. Autorem jest tu nazwa,
a nie osoba — organizacja zapisuje się dokładnie tak samo. Źródła nie ma w
sieci, więc zamiast odnośnika stoi opis wydania.

</Cytat>

#### A figure with a caption and a data source

<Rysunek
  caption="Ten sam zestaw narzędzi daje różny zysk w zależności od tego, ile lat ma projekt."
  source="analiza Stanford (Denisov-Blanch, 2025)"
  sourceUrl="https://ingoeichhorst.medium.com/state-of-ai-coding-efficiency-2026-1abfa0ab7434">

<svg viewBox="0 0 660 150" role="img" aria-label="Dwa słupki: nowy projekt +30–40%, stary projekt 0–10%" style={{ width: "100%", height: "auto" }}>
  <g stroke="currentColor" fill="none" stroke-width="1.5">
    <rect x="20" y="30" width="260" height="80" rx="3" stroke="var(--accent-line, currentColor)" stroke-width="2.5" />
    <rect x="300" y="30" width="260" height="80" rx="3" />
  </g>
  <g fill="currentColor" font-size="24" font-weight="700">
    <text x="40" y="72" fill="var(--accent-line, currentColor)">+30–40%</text>
    <text x="320" y="72">0–10%</text>
  </g>
  <g fill="currentColor" font-size="12" opacity="0.8">
    <text x="40" y="94">nowy, mały projekt</text>
    <text x="320" y="94">duży i stary projekt</text>
  </g>
</svg>

</Rysunek>

#### A figure with a caption and nothing else — a drawing of an idea measures nothing

<Rysunek caption="Pętla agenta: to samo pytanie wraca, dopóki wynik nie jest dobry.">

<svg viewBox="0 0 660 120" role="img" aria-label="Trzy pudełka połączone strzałkami w pętlę: polecenie, zmiana, sprawdzenie" style={{ width: "100%", height: "auto" }}>
  <g stroke="currentColor" fill="none" stroke-width="1.5">
    <rect x="20" y="30" width="170" height="50" rx="3" />
    <rect x="245" y="30" width="170" height="50" rx="3" />
    <rect x="470" y="30" width="170" height="50" rx="3" />
    <path d="M190 55 L245 55" />
    <path d="M415 55 L470 55" />
    <path d="M555 80 L555 100 L105 100 L105 80" stroke-dasharray="5 3" />
  </g>
  <g fill="currentColor" font-size="13">
    <text x="40" y="60">polecenie</text>
    <text x="265" y="60">zmiana w kodzie</text>
    <text x="490" y="60">sprawdzenie</text>
  </g>
</svg>

</Rysunek>

#### The evidence list: a checked date, and four entries

<Zrodla checked="2026-08-29">

<Zrodlo title="Introducing the Model Context Protocol" publisher="Anthropic" date="2024-11-25" url="https://www.anthropic.com/news/model-context-protocol" />

<Zrodlo title="DHH: Future of Programming, AI, Agentic Engineering, Vibe Coding & Linux" publisher="Lex Fridman Podcast, odcinek 501" date="2026-08" url="https://www.youtube.com/watch?v=NYFGCESmikA">o „linii podziału” i harnessie od 7:55; pełny zapis: [lexfridman.com/dhh-2-transcript](https://lexfridman.com/dhh-2-transcript/)</Zrodlo>

<Zrodlo title="Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity" publisher="METR" date="2025-07-10" url="https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/">badanie o 19% i 20%</Zrodlo>

<Zrodlo title="Linus Torvalds reckons AI is '90% marketing and 10% reality'" publisher="Tom's Hardware" date="2024-10" url="https://www.tomshardware.com/tech-industry/artificial-intelligence/linus-torvalds-reckons-ai-is-90-percent-marketing-and-10-percent-reality">relacja z Open Source Summit w Wiedniu — źródło wtórne</Zrodlo>

</Zrodla>

#### Further reading: the four kinds, and no dates

<CzytajDalej>

<Lektura kind="artykul" title="AI Blindspots" url="https://ezyang.github.io/ai-blindspots/">krótkie, praktyczne obserwacje o pracy z modelami</Lektura>

<Lektura kind="wideo" title="DHH: Future of Programming, AI, Agentic Engineering, Vibe Coding & Linux" url="https://www.youtube.com/watch?v=NYFGCESmikA">trzy godziny o tym, jak zmienił się warsztat programisty</Lektura>

<Lektura kind="dokumentacja" title="Best practices for Claude Code" url="https://code.claude.com/docs/en/best-practices">jak wygląda praca z agentem w praktyce</Lektura>

<Lektura kind="kurs" title="Основы программирования с ИИ" url="https://learn.evocoders.ai/">rozdziały o podpowiedziach, next edit, czacie w IDE i agentach</Lektura>

</CzytajDalej>

#### Two links in a paragraph

Odnośnik do innej strony jest oznaczony i otwiera się w nowej karcie —
[Full Stack Open](https://fullstackopen.com/en/) — a odnośnik do lekcji na tym
samym serwisie nie jest oznaczony i otwiera się w tej samej karcie:
[Git i GitHub](/moduly/00-start/git-i-github). Adres tej drugiej jest
sprawdzany przy budowaniu strony, więc literówka w nim zatrzymuje build.
`;

/**
 * The presentation-mode specimens — slice 013 §9.
 *
 * Marking real lessons up is content-lane work that comes after this slice, so
 * on the day the mode ships there is no marked page on the site. Without this
 * block the whole mode would be unrenderable anywhere and its criteria would be
 * checked against a screenshot. Compiled through `compileProse` for the reason
 * the code, exercise and sourcing specimens above are: remark-gfm, the section
 * anchors, the link classifier and the components map all run on it, so what is
 * here is what a lesson would get.
 *
 * One specimen of every case spec §8 allows, and no specimen of the two it
 * forbids — a mark inside a fenced code block is characters rather than markup,
 * and a mark inside an SVG renders nothing at all. Neither belongs on a page
 * whose job is to show what the site does.
 *
 * The prose is Polish because Polish is what is under test, ogonki included: ą
 * and ę sit inside a mark on purpose, so slice 004's underline clearance is
 * visible with a fill behind it.
 */
const PRESENTATION_SPECIMENS = `
Ten akapit nie zawiera zaznaczenia i to on jest miarą przyciemnienia: w trybie
prezentacji ma być wyraźnie cichszy od fragmentów obok, a mimo to czytelny z
tyłu sali. W trybie czytania niczym się nie różni od reszty strony.

<mark>Ten fragment jest zaznaczony do przeczytania na głos i celowo ciągnie się
przez kilkanaście słów, żeby złamał się na dwie linie</mark> — na każdej z nich
ma być zamkniętym prostokątem, a nie połową ramki. Wewnątrz zaznaczenia
zostawiam ogonki: gęślą jaźń, węzeł, zażółć.

#### Nagłówek z <mark>zaznaczonym fragmentem</mark>

Odnośnik zaznaczony w obu zapisach, na które pozwala Markdown:
[<mark>zaznaczenie wewnątrz odnośnika</mark>](https://fullstackopen.com/en/)
oraz <mark>[odnośnik wewnątrz zaznaczenia](https://fullstackopen.com/en/)</mark>.
W obu podkreślenie zostaje, bo bez niego odnośnik przestaje być odnośnikiem dla
kogoś, kto nie widzi koloru.

> Cytat też bywa czytany na głos, więc <mark>zaznaczenie działa i tutaj</mark>,
> a kreska po lewej stronie zostaje kreską cytatu.

- Pozycja listy bez zaznaczenia — punkt odniesienia.
- Pozycja, w której <mark>zaznaczony jest tylko środek zdania</mark>, a początek
  i koniec nie.
- Jeszcze jedna pozycja bez zaznaczenia.

| Komórka | Treść |
| --- | --- |
| bez zaznaczenia | zwykła komórka tabeli |
| z zaznaczeniem | <mark>komórka z zaznaczonym fragmentem</mark> |

Ostatni akapit, znowu bez zaznaczenia, żeby przyciemnienie miało się do czego
porównać także na dole bloku.
`;

/** ADR-0005's verification string: every Polish diacritic, upper and lower. */
const PANGRAM = "Zażółć gęślą jaźń — ĄĆĘŁŃÓŚŹŻ ążćęłńóśź";

const TOKENS: { name: string; chip: string }[] = [
  { name: "--bg", chip: styles.chipBg },
  { name: "--bg-code", chip: styles.chipBgCode },
  { name: "--text", chip: styles.chipText },
  { name: "--text-muted", chip: styles.chipTextMuted },
  { name: "--rule", chip: styles.chipRule },
  { name: "--rule-strong", chip: styles.chipRuleStrong },
  { name: "--accent-surface", chip: styles.chipAccentSurface },
  { name: "--accent-line", chip: styles.chipAccentLine },
  { name: "--accent-ink", chip: styles.chipAccentInk },
  { name: "--link", chip: styles.chipLink },
  { name: "--rule-quote", chip: styles.chipRuleQuote },
  { name: "--rule-table", chip: styles.chipRuleTable },
  /* Slice 013. The same value in both themes, unlike everything above them —
     which is visible here for free: flip the theme and these three do not
     move. --present-dim is not a swatch because it is an alias of
     --text-muted, which already has one two rows up. */
  { name: "--present-fill", chip: styles.chipPresentFill },
  { name: "--present-line", chip: styles.chipPresentLine },
  { name: "--present-ink", chip: styles.chipPresentInk },
];

const SIZES: { token: string; className: string }[] = [
  { token: "--text-3xl", className: styles.size3xl },
  { token: "--text-2xl", className: styles.size2xl },
  { token: "--text-xl", className: styles.sizeXl },
  { token: "--text-lg", className: styles.sizeLg },
  { token: "--text-base", className: styles.sizeBase },
  { token: "--text-sm", className: styles.sizeSm },
];

/*
 * The navigation furniture — slice 006 §8.
 *
 * Built from LITERAL props rather than from the course, so the specimens keep
 * showing what they were written to show when a module is added or a lesson is
 * reordered. The identity strings below are invented on purpose: 7a and 7b
 * belong to no real module, so nothing here can be mistaken for content.
 *
 * The labels around them are English like the rest of this page; the specimens'
 * own text is Polish, because that is what they render on the site.
 */
const SPECIMEN_LESSONS: CourseLesson[] = [
  {
    moduleSlug: "07-przyklad",
    slug: "krotki",
    order: 1,
    letter: "a",
    id: "7a",
    href: "#",
    title: "Krótki tytuł",
    summary: "Specimen.",
    sections: [],
    /* Slice 009: this specimen holds no exercises, which is what makes the
       one below start at 7.1 — the offset is the running total of the
       module's earlier published lessons, never the lesson's position. */
    exerciseCount: 0,
    exerciseOffset: 0,
  },
  {
    moduleSlug: "07-przyklad",
    slug: "dlugi",
    order: 2,
    letter: "b",
    id: "7b",
    href: "#",
    title: "Tytuł na tyle długi, że zawija się w wierszu i sprawdza kształt",
    summary: "Specimen.",
    /* Slice 007: the second lesson plays "current" in the contents-panel
       specimens, so it is the one carrying sections. */
    sections: [
      { id: "wprowadzenie", title: "Wprowadzenie" },
      { id: "dluzszy-tytul-sekcji-ktory-zawija-sie-w-panelu", title: "Dłuższy tytuł sekcji, który zawija się w panelu" },
      { id: "cwiczenia", title: "Ćwiczenia 7.1–7.3" },
      { id: "zrodla", title: "Źródła" },
    ],
    /* Three, which is what the contents specimen above already claims. */
    exerciseCount: 3,
    exerciseOffset: 0,
  },
];

const SPECIMEN_MODULES: CourseModule[] = [
  {
    slug: "07-przyklad",
    title: "Przykładowy moduł",
    number: 7,
    label: "Moduł 7",
    href: "#",
    body: <></>,
    /* Slice 014: the introduction's own sections. Empty, like every real
       module's — no index file carries a `##` — so the „Wstęp" row in the
       specimens below stands alone, which is what the site renders. */
    sections: [],
    lessons: SPECIMEN_LESSONS,
  },
  {
    slug: "08-drugi",
    title: "Drugi przykładowy moduł z dłuższym tytułem",
    number: 8,
    label: "Moduł 8",
    href: "#",
    body: <></>,
    sections: [],
    lessons: SPECIMEN_LESSONS.slice(0, 1),
  },
];

export default async function StyleguidePage() {
  const codeSpecimens = await compileProse(
    CODE_SPECIMENS,
    "app/styleguide/page.tsx (code specimens)"
  );

  /* The numbering context is passed explicitly. `compileProse` defaults to
     refusing exercises outright, so a future specimen that forgets to say
     which module it belongs to fails the build rather than rendering a block
     with no number in it. */
  const exerciseSpecimens = await compileProse(
    EXERCISE_SPECIMENS,
    "app/styleguide/page.tsx (exercise specimens)",
    { mode: "number", moduleNumber: 7, offset: 0 }
  );

  const sourceSpecimens = await compileProse(
    SOURCE_SPECIMENS,
    "app/styleguide/page.tsx (sourcing specimens)"
  );

  const presentationSpecimens = await compileProse(
    PRESENTATION_SPECIMENS,
    "app/styleguide/page.tsx (presentation specimens)"
  );

  return (
    <div className={styles.page}>
      <h1>Type and colour reference</h1>
      <p className={styles.lede}>
        Not a student-facing page. Nothing links here. Use the theme toggle in
        the corner to check both themes; every colour below comes from a token
        in <code>app/tokens.css</code>, which is the only file allowed to hold a
        colour literal.
      </p>

      <section className={styles.section}>
        <h2>The Polish alphabet, both faces</h2>
        <p className={styles.muted}>
          ADR-0005. A missing <code>latin-ext</code> subset renders ó and
          silently drops ł, with no build error. Read these, do not reason about
          them.
        </p>

        {SIZES.map(({ token, className }) => (
          <div key={`mono-${token}`} className={styles.specimen}>
            <span className={styles.specimenLabel}>
              JetBrains Mono · {token}
            </span>
            <div className={`${styles.mono} ${className}`}>{PANGRAM}</div>
          </div>
        ))}

        {SIZES.map(({ token, className }) => (
          <div key={`sans-${token}`} className={styles.specimen}>
            <span className={styles.specimenLabel}>Inter · {token}</span>
            <div className={`${styles.sans} ${className}`}>{PANGRAM}</div>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2>The split</h2>
        <p className={styles.muted}>
          Headings, navigation and code take the monospace face; prose takes the
          sans. The rule is set on plain elements, so Markdown inherits it.
        </p>

        <h3>Nagłówek trzeciego stopnia</h3>
        <p>
          Ten akapit jest złożony krojem bezszeryfowym Inter, a
          nagłówek nad nim — krojem JetBrains Mono. Różnica ma być widoczna od
          razu: wszystko, co jest strukturą, wygląda jak kod, a wszystko, co się
          czyta, jest wygodne w czytaniu. Wewnątrz zdania identyfikator taki jak{" "}
          <code>useState</code> dostaje sam krój, bez szarego pudełka, żeby
          akapit pełen nazw nie wyglądał jak list z wycinanek. Odnośnik —{" "}
          <a href="https://fullstackopen.com/en/">Full Stack Open</a> — sprawdza
          kolor linku na tle strony w obu motywach.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Tokens</h2>
        <p className={styles.muted}>
          Names only. Values are in ADR-0007. The set below changes with the
          theme.
        </p>

        <ul className={styles.swatches}>
          {TOKENS.map(({ name, chip }) => (
            <li key={name} className={styles.swatch}>
              <div className={`${styles.chip} ${chip}`}>
                {name === "--accent-surface" ? "ink" : ""}
              </div>
              <span className={styles.swatchName}>{name}</span>
            </li>
          ))}
        </ul>

        <div className={styles.stripe}>
          --accent-surface carrying --accent-ink · Moduł 1
        </div>

        <p className={styles.ruleDemo}>
          --rule-quote as a left border, with --text-muted as the text. Both
          bound to values that already exist; no new hue enters here.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Lesson typography</h2>
        <p className={styles.muted}>
          Slice 004. One specimen of every construct a lesson written in plain
          Markdown can produce. Six lessons do not cover this — there is
          exactly one table on the whole site, and no single lesson contains
          every construct — so this block is the surface those criteria are
          checked against. The prose below is Polish because Polish typography
          is the thing under test; the labels stay English like the rest of
          this page.
        </p>

        <div className="prose">
          <h2>Nagłówek drugiego stopnia</h2>
          <p>
            Ten akapit stoi tuż pod nagłówkiem, żeby pokazać rytm: odstęp nad
            nagłówkiem jest wyraźnie większy niż pod nim, a żaden inny odstęp na
            stronie go nie przekracza. Wewnątrz zdania identyfikator{" "}
            <code>useState</code> zachowuje krój, ale nie dostaje pudełka, więc
            akapit pełen nazw nadal czyta się jak akapit.
          </p>

          <h3>
            <code>git status</code> — nagłówek nazwany od komendy
          </h3>
          <p>
            Kod w nagłówku ma rozmiar nagłówka i jego kolor. Gdyby dziedziczył
            stałą wielkość kodu w tekście, tytuł sekcji skurczyłby się tylko
            dlatego, że nazywa się tak jak polecenie, którego uczy.
          </p>

          <h4>Nagłówek czwartego stopnia</h4>
          <p>
            Żadna lekcja nie używa dziś tego poziomu. Jest opisany, żeby
            pierwsza, która go potrzebuje, nie dostała ustawień przeglądarki.
          </p>

          <h5>Nagłówek piątego stopnia</h5>
          <h6>Nagłówek szóstego stopnia</h6>

          <p>
            <strong>Wyróżnienia</strong> są w tych lekcjach gęste, więc warto na
            nie patrzeć na prawdziwym akapicie:{" "}
            <strong>nie tracisz pracy</strong>, <strong>widzisz, co się
            zmieniło i kiedy</strong>, a jeśli coś zepsujesz —{" "}
            <strong>wracasz do wersji, która działała</strong>. Na ciemnym
            motywie ta sama waga rozlewa się bardziej niż na jasnym, dlatego
            waga jest tokenem, a nie jedną liczbą.
          </p>

          <p>
            Ten odnośnik istnieje po to, żeby sprawdzić podkreślenie pod
            ogonkiem:{" "}
            <a href="https://pl.wikipedia.org/wiki/Ogonek_(znak_diakrytyczny)">
              żądanie, pętla i gałąź — Ą Ę ą ę
            </a>{" "}
            — linia musi przechodzić pod ogonkiem, a nie przez niego, i musi
            być widoczna także wtedy, gdy z ekranu zniknie kolor.
          </p>

          <h3>Listy</h3>
          <ul>
            <li>
              <strong>Krótki punkt z wytłuszczonym początkiem</strong> — tak
              wygląda większość list w lekcjach.
            </li>
            <li>
              <strong>Punkt, który się zawija</strong> — jego dalsze wiersze
              muszą trafiać pod tekst punktu, a nie pod jego znacznik, bo
              inaczej lista przestaje być jednym obiektem i zaczyna być zbiorem
              luźnych zdań na stronie.
            </li>
          </ul>

          <ol>
            <li>
              Krótkie zadanie mieszczące się w jednym wierszu.
            </li>
            <li>
              Zadanie długie: wykonaj polecenie <code>git log --oneline</code>,
              przeczytaj wynik, a potem opisz własnymi słowami, co się zmieniło
              między dwoma ostatnimi commitami i dlaczego akurat ta różnica jest
              tu istotna. Ten punkt zawija się na co najmniej trzy wiersze
              celowo.
            </li>
            <li>Trzecie zadanie, żeby numeracja miała kontekst.</li>
          </ol>

          <h3>Cytaty</h3>
          <p>
            Cytat jednoakapitowy, bez podpisu — najczęstszy kształt w tych
            lekcjach:
          </p>

          <blockquote>
            <p>
              Vibe coding nie oznacza „używania narzędzi AI do pomocy w pisaniu
              kodu”. Oznacza „generowanie kodu przy pomocy AI bez dbania o to,
              jaki kod powstaje”.
            </p>
          </blockquote>

          <p>
            Cytat wieloakapitowy zakończony wierszem atrybucji. Wiersz atrybucji
            jest zwykłym akapitem cytatu — myślnik i data robią całą robotę:
          </p>

          <blockquote>
            <p>
              Wartość 90% moich umiejętności właśnie spadła do 0 dolarów.
              Dźwignia pozostałych 10% wzrosła 1000-krotnie. Muszę się
              przekalibrować.
            </p>
            <p>
              — Kent Beck,{" "}
              <a href="https://x.com/KentBeck/status/1648413998025707520">
                18 kwietnia 2023
              </a>
            </p>
          </blockquote>

          <h3>Tabela</h3>
          <p>
            Pierwsza komórka nagłówka jest pusta — to jest kształt, który psuje
            każde rozwiązanie zakładające, że nagłówek jest wypełnionym pasem.
          </p>

          <table>
            <thead>
              <tr>
                <th></th>
                <th>Jednostka pracy</th>
                <th>Twoja rola</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Warstwy 1–3</td>
                <td>linijka, fragment</td>
                <td>piszesz</td>
              </tr>
              <tr>
                <td>Warstwy 4–5</td>
                <td>zadanie</td>
                <td>zlecasz i sprawdzasz</td>
              </tr>
            </tbody>
          </table>

          <hr />

          <p>
            Poziomej linii nie ma dziś w żadnej lekcji. Jest opisana z tego
            samego powodu co nagłówki czwartego stopnia.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Code blocks</h2>
        <p className={styles.muted}>
          Slice 005. Compiled through the same pipeline a lesson goes through,
          so the info-line parser, the highlighter and the block component all
          run here exactly as they do there. The nine fenced blocks in the Git
          lesson are all bash, none declares a filename, none marks a line and
          none is long enough to scroll — and no lesson contains C#, which
          Article VII makes the language that has to work. The code surface does
          not change with the theme, so every colour below is the same in both.
        </p>

        <div className="prose">{codeSpecimens}</div>
      </section>

      <section className={styles.section}>
        <h2>Exercises</h2>
        <p className={styles.muted}>
          Slice 009, and the same argument as the code specimens above: compiled
          through the pipeline a lesson goes through, so the plugin that refuses
          an author-written number and the walk that supplies the real one both
          run here. No lesson writes an exercise yet — adopting the element is a
          content change — so without these two the treatment would be
          unrenderable anywhere on the site. The numbers below belong to the
          invented module 7 and count from a lesson with three exercises, which
          is what the contents specimen further down already claims.
        </p>

        <div className="prose">{exerciseSpecimens}</div>
      </section>

      <section className={styles.section}>
        <h2>Sources, figures and links</h2>
        <p className={styles.muted}>
          Slice 010, and the same argument as the two blocks above: compiled
          through the pipeline a lesson goes through, so the plugin that refuses
          a quotation with no date and the component that renders every anchor
          both run here. No lesson writes these elements yet — adopting them is
          a content change — so without these specimens the treatment would be
          unrenderable anywhere on the site.
        </p>
        <p className={styles.muted}>
          Every date, link and quotation below is one the lessons already
          publish, so this page asserts nothing new about the world; the one
          variant the corpus has no counterpart for — a source that exists only
          on paper — says in its own text that it is a specimen. Note that the
          anchors in the hand-written blocks further up this page are ordinary
          JSX and are <em>not</em> compiled, so they carry no external mark:
          the marked ones here are the ones that went through the pipeline.
        </p>

        <div className="prose">{sourceSpecimens}</div>
      </section>

      <section className={styles.section}>
        <h2>Presentation mode</h2>
        <p className={styles.muted}>
          Slice 013. The block below is the only marked page on the site: an
          author marks the fragments to be read aloud with a plain{" "}
          <code>&lt;mark&gt;</code>, and no lesson has been marked up yet, so
          without these specimens the mode would be unrenderable anywhere.
          Compiled through the pipeline a lesson goes through, like the three
          blocks above it.
        </p>
        <p className={styles.muted}>
          In reading mode — the default — nothing here may distinguish a marked
          fragment from an unmarked one, in either theme. Flip the control in
          the header to see the other mode: every marked fragment lights and the
          prose around it steps back. The unmarked prose blocks further up this
          page stay bright in both modes, which is what makes them the control:
          only a block that actually contains a mark dims.
        </p>

        <div className="prose">{presentationSpecimens}</div>
      </section>

      <section className={styles.section}>
        <h2>Navigation</h2>
        <p className={styles.muted}>
          Slice 006. The chevron is one clipped polygon drawn twice by two
          pseudo-elements, so it keeps a visible outline on both diagonals and
          does not clip its own focus ring — tab through the shapes below to see
          it, including on the band, where the site&apos;s usual focus colour is
          the band&apos;s own colour. Every outline here is{" "}
          <code>--rule-strong</code>, which clears 3:1 in both themes; the
          hairlines that only separate are still <code>--rule</code>.
        </p>

        <div className={styles.specimen}>
          <span className={styles.specimenLabel}>
            breadcrumb, on the band — earlier steps outlined, the current one
            filled
          </span>
          <Band>
            <Breadcrumb
              trail={[
                { label: "Moduły", href: "#" },
                { label: "Moduł 7", href: "#" },
                { label: "7b" },
              ]}
            />
          </Band>
        </div>

        <div className={styles.specimen}>
          <span className={styles.specimenLabel}>
            chevron rows — hover or focus one to see the inverted active item
          </span>
          <LessonList lessons={SPECIMEN_LESSONS} />
        </div>

        <div className={styles.specimen}>
          <span className={styles.specimenLabel}>
            module cards — the number where an illustration would be, and the
            doubled frame
          </span>
          <ModuleGrid modules={SPECIMEN_MODULES} />
        </div>

        <div className={styles.specimen}>
          <span className={styles.specimenLabel}>
            previous / next, with the second step crossing into another module
          </span>
          <Pager
            ariaLabel="Specimen"
            previousLabel="Poprzednia lekcja"
            nextLabel="Następna lekcja"
            previous={{ href: "#", id: "7a", title: "Krótki tytuł" }}
            next={{
              href: "#",
              id: "8a",
              title: "Pierwsza lekcja następnego modułu",
              crossesInto: "Moduł 8",
            }}
          />
        </div>

        <div className={styles.specimen}>
          <span className={styles.specimenLabel}>bordered button</span>
          <p>
            <a className="button" href="#">
              Zacznij kurs
            </a>
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>The contents panel</h2>
        <p className={styles.muted}>
          Slice 007, re-placed by 011. On a lesson page at 80rem and up the
          panel is a sticky column of the page&apos;s own grid, level at the
          top with the lesson header; below that width it folds into the
          disclosure. Here both housings are shown statically, at every
          width. The divider and the disclosure&apos;s box are
          <code>--rule-strong</code>; the
          active entry is the inverted body-text/page pair, applied by the
          scroll-spy as <code>aria-current=&quot;location&quot;</code> — frozen
          by hand in the states specimen, since nothing scrolls here.
        </p>

        <div className={styles.specimen} data-specimen-contents>
          <span className={styles.specimenLabel}>
            the panel — current lesson expanded, others links; Tab into it to
            reveal the skip control
          </span>
          <ContentsPanel
            moduleItem={SPECIMEN_MODULES[0]}
            current={SPECIMEN_LESSONS[1]}
          />
        </div>

        <div className={styles.specimen} data-specimen-contents>
          <span className={styles.specimenLabel}>
            row states — a section at rest, the inverted active entry, and the
            non-link current-lesson row; hover or focus for the accent fill
          </span>
          <nav aria-label="Stany spisu treści (specimen)">
            <ol className="contentsLessons">
              <li>
                <span className="contentsLesson contentsCurrent">
                  <span className="contentsId">7b</span> Bieżąca lekcja — nie
                  jest linkiem
                </span>
                <ol className="contentsSections">
                  <li>
                    <a className="contentsSection" href="#">
                      <span aria-hidden="true">- </span>Sekcja w spoczynku
                    </a>
                  </li>
                  <li>
                    <a
                      className="contentsSection"
                      href="#"
                      aria-current="location"
                    >
                      <span aria-hidden="true">- </span>Sekcja aktywna —
                      odwrócone pole
                    </a>
                  </li>
                </ol>
              </li>
              <li>
                <a className="contentsLesson" href="#">
                  <span className="contentsId">7a</span> Inna lekcja — link
                </a>
              </li>
            </ol>
          </nav>
        </div>

        <div className={styles.specimen} data-specimen-contents>
          <span className={styles.specimenLabel}>
            the disclosure — the same list folded for one column, collapsed by
            default
          </span>
          <ContentsDisclosure
            moduleItem={SPECIMEN_MODULES[0]}
            current={SPECIMEN_LESSONS[1]}
          />
        </div>

        <div className={styles.specimen} data-specimen-contents>
          <span className={styles.specimenLabel}>
            back to top — in flow here; fixed to the bottom-right on a lesson,
            absent until a viewport of scroll
          </span>
          <p>
            <button
              type="button"
              className="backToTop"
              aria-label="Wróć na początek (specimen)"
            >
              <span aria-hidden="true">↑</span>
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}
