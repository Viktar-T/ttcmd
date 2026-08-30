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
    lessons: SPECIMEN_LESSONS,
  },
  {
    slug: "08-drugi",
    title: "Drugi przykładowy moduł z dłuższym tytułem",
    number: 8,
    label: "Moduł 8",
    href: "#",
    body: <></>,
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
              kodu". Oznacza „generowanie kodu przy pomocy AI bez dbania o to,
              jaki kod powstaje".
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
          Slice 007. On a lesson page the panel is sticky in the frame&apos;s
          left gutter at 80rem and up, and folds into the disclosure below;
          here both housings are shown statically, at every width. The divider
          and the disclosure&apos;s box are <code>--rule-strong</code>; the
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
