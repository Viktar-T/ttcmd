import type { ReactNode } from "react";
import { READING_KINDS } from "@/lib/blocks";
import { ProseLink } from "./prose-link";
import { ReferenceList } from "./reference-list";
import styles from "./reference-list.module.css";

/**
 * Further reading — the elements an author writes as `<CzytajDalej>` and
 * `<Lektura>`.
 *
 * A separate element from the evidence list, and the reason is the obligation
 * rather than the layout: **evidence must be dated because a claim rests on it;
 * a recommendation need not be, because nothing rests on it.** One element
 * carrying both would have to force a date onto a recommendation or excuse an
 * evidence entry from carrying one, and the second of those is the rule this
 * slice exists to make visible. `lib/blocks.ts` refuses a `date` here with a
 * message saying which list the entry belongs in.
 *
 * Today the two are mixed: four of the ten entries under `## Źródła` in
 * `od-podpowiedzi-do-agenta.mdx` are invitations to read rather than support
 * for anything the lesson claims, and nothing on the page says so.
 *
 * A row leads with its kind, and there are four kinds and no more — a free
 * string becomes six spellings of *artykuł* inside one term.
 */

export function FurtherReading({ children }: { children?: ReactNode }) {
  return (
    <ReferenceList kind="further-reading">
      <ul className={styles.list}>{children}</ul>
    </ReferenceList>
  );
}

interface ReadingItemProps {
  title?: string;
  url?: string;
  kind?: string;
  children?: ReactNode;
}

export function ReadingItem({ title, url, kind, children }: ReadingItemProps) {
  /* `Object.hasOwn`, not a bare lookup: `READING_KINDS["toString"]` is a
     function, which is truthy, so the backstop below would pass and the chip
     would render empty. lib/blocks.ts refuses the same thing at build; this is
     the second half of the same guard, for the day somebody compiles without
     the plugin. */
  const label =
    kind && Object.hasOwn(READING_KINDS, kind) ? READING_KINDS[kind] : undefined;

  /* Unreachable through the pipeline; the same backstop the other elements
     carry. `label` is checked rather than `kind` so that a kind outside the
     four cannot reach the page as an empty chip. */
  if (!title || !url || !label) {
    throw new Error(
      "ReadingItem: rendered without a title, a link, or one of the four " +
        "kinds. All three are required and are refused when the site is " +
        "built (lib/blocks.ts); this body was compiled without that pass."
    );
  }

  return (
    <li className={styles.entry}>
      <span className={styles.kind}>{label}</span>
      <ProseLink href={url}>{title}</ProseLink>
      <span className={styles.note}>{children}</span>
    </li>
  );
}
