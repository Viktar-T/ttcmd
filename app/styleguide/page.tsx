import type { Metadata } from "next";
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

/** ADR-0005's verification string: every Polish diacritic, upper and lower. */
const PANGRAM = "Zażółć gęślą jaźń — ĄĆĘŁŃÓŚŹŻ ążćęłńóśź";

const TOKENS: { name: string; chip: string }[] = [
  { name: "--bg", chip: styles.chipBg },
  { name: "--bg-code", chip: styles.chipBgCode },
  { name: "--text", chip: styles.chipText },
  { name: "--text-muted", chip: styles.chipTextMuted },
  { name: "--rule", chip: styles.chipRule },
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

export default function StyleguidePage() {
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
    </div>
  );
}
