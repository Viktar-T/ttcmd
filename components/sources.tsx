import type { ReactNode } from "react";
import { WORDS } from "@/lib/blocks";
import { formatDateIso, formatDateList, parseContentDate } from "@/lib/dates";
import { ProseLink } from "./prose-link";
import { ReferenceList } from "./reference-list";
import styles from "./reference-list.module.css";

/**
 * The lesson's evidence — the elements an author writes as `<Zrodla>` and
 * `<Zrodlo>`.
 *
 * Six lessons end in `## Źródła` and a bulleted list whose grammar is whatever
 * its author typed that day: entries with a date and entries without, one link
 * and three links, the publisher before the date and after it, a
 * secondary-source warning in running prose, and — in the same list —
 * suggestions to go and read something, which are not evidence for anything.
 * A student cannot tell from the page which entries the lesson is standing on.
 *
 * Here each entry has the same four parts and a note, and `lib/blocks.ts`
 * refuses one that is missing a date or a link. Everything the old lists
 * carried in prose goes in the note, which is one line of inline content and
 * can therefore hold a second link, a moment in a recording, "źródło wtórne"
 * or "sprawdzone później" — the four irregularities the corpus actually has.
 *
 * NO HEADING. The lesson keeps writing `## Źródła`, because that heading is
 * what the contents panel reads (`lib/section-anchors.ts`), and this slice does
 * not touch the panel. Prose introducing the list stays prose, above the block.
 */

interface SourcesProps {
  checked?: string;
  children?: ReactNode;
}

export function Sources({ checked, children }: SourcesProps) {
  if (!checked) {
    throw new Error(
      "Sources: rendered with no checked date. It is required and is refused " +
        "when the site is built (lib/blocks.ts); this body was compiled " +
        "without that pass."
    );
  }

  /* ISO, and bold, because `docs/content-style.md` §Mechanics fixes this one
     line verbatim: `Stan na **yyyy-mm-dd**.` It is the only place on the site
     a date is shown in the machine form, and it is shown that way on purpose —
     it is a date the reader is being asked to compare against today's. */
  const date = parseContentDate(checked);
  const iso = formatDateIso(date);

  return (
    <ReferenceList kind="sources">
      <p className={styles.checked}>
        {`${WORDS.checkedOn} `}
        <strong>
          <time dateTime={iso}>{iso}</time>
        </strong>
        .
      </p>
      <ul className={styles.list}>{children}</ul>
    </ReferenceList>
  );
}

interface SourceEntryProps {
  title?: string;
  publisher?: string;
  date?: string;
  url?: string;
  children?: ReactNode;
}

export function SourceEntry({
  title,
  publisher,
  date,
  url,
  children,
}: SourceEntryProps) {
  if (!title || !publisher || !date || !url) {
    throw new Error(
      "SourceEntry: rendered without a title, a publisher, a date or a link. " +
        "All four are required and are refused when the site is built " +
        "(lib/blocks.ts); this body was compiled without that pass."
    );
  }

  const parsed = parseContentDate(date);

  return (
    <li className={styles.entry}>
      {/* The title is the link text, which is what `docs/content-style.md`
          §Mechanics asks for: a link names the thing, never "tutaj". */}
      <ProseLink href={url}>{title}</ProseLink>
      <span className={styles.meta}>
        {publisher}
        {" · "}
        <time dateTime={formatDateIso(parsed)}>{formatDateList(parsed)}</time>
      </span>
      {children ? <span className={styles.note}>{children}</span> : null}
    </li>
  );
}
