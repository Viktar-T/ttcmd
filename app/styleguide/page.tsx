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
    </div>
  );
}
