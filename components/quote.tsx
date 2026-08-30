import type { ReactNode } from "react";
import { WORDS } from "@/lib/blocks";
import { formatDateIso, formatDateProse, parseContentDate } from "@/lib/dates";
import { deepLink, readableUrl } from "@/lib/links";
import { ProseLink } from "./prose-link";
import styles from "./quote.module.css";

/**
 * A quotation and its source, as one block — the element an author writes as
 * `<Cytat>`.
 *
 * The lessons argue from other people's words, and today six of the fourteen
 * block quotations in the corpus end in an attribution line somebody typed by
 * hand while the other eight end in nothing. This element is what makes the
 * attribution part of the quotation rather than a paragraph that follows it and
 * may be forgotten: `lib/blocks.ts` refuses a quotation with no date and no way
 * of reaching the source, so the shape below cannot render half-built.
 *
 * IT SUPPLIES NO „…” MARKS. The author writes the words as they were said, and
 * several of the corpus's quotations contain quotation marks of their own; a
 * wrapper that added a pair would nest them, and across three paragraphs it
 * would be wrong outright (spec, decision 3). What says "somebody else said
 * this" is the block, the rules that bound it, and the attribution beneath.
 *
 * THE DATE IS RENDERED IN THE PROSE FORM. The attribution reads as a sentence —
 * `— Andrej Karpathy, X, 2 lutego 2025` — and `docs/content-style.md`
 * §Mechanics puts a date in a sentence as day, month in words, year. The list
 * form belongs to the two reference lists. The author chose neither: they wrote
 * one machine-readable date (spec, decision 4), and it is still in the page, on
 * the `<time>` element, for anything that reads the page rather than looks at
 * it.
 */

interface QuoteProps {
  author?: string;
  source?: string;
  date?: string;
  url?: string;
  print?: string;
  at?: string;
  transcript?: string;
  children?: ReactNode;
}

export function Quote({
  author,
  source,
  date,
  url,
  print,
  at,
  transcript,
  children,
}: QuoteProps) {
  /* Unreachable through the pipeline — `lib/blocks.ts` refuses every one of
     these before the compile finishes. Here for the day somebody compiles
     without the plugin: a quotation published with no source is the failure
     this element exists to make impossible, and a build that stops is the
     cheap version of it. The same backstop components/exercise.tsx carries. */
  if (!author || !source || !date || (!url && !print)) {
    throw new Error(
      "Quote: rendered without an author, a source, a date, or any way of " +
        "reaching it. Those are refused when the site is built " +
        "(lib/blocks.ts); this body was compiled without that pass."
    );
  }

  const parsed = parseContentDate(date);

  /* The link opens at the moment, and the moment is also written where the
     reader can see it. `deepLink` is the same function the build calls to
     refuse a host it cannot address, so the two cannot disagree about where
     this link goes. */
  const href = url && at ? deepLink(url, at) : url;
  const sourceLabel = at ? `${source}, ${WORDS.fromMoment} ${at}` : source;

  return (
    <figure className={styles.quote} data-quote="">
      {/* A real <blockquote>, so that what is announced is a quotation and not
          a group of paragraphs. app/prose.css strips the left rule it would
          otherwise inherit — that rule is how this site marks a plain Markdown
          blockquote, and these two have to be told apart. */}
      <blockquote className={styles.words}>{children}</blockquote>

      <figcaption className={styles.attribution}>
        <span className={styles.who}>{`— ${author}, `}</span>
        {href ? (
          <ProseLink href={href}>{sourceLabel}</ProseLink>
        ) : (
          <span>{sourceLabel}</span>
        )}
        {", "}
        <time dateTime={formatDateIso(parsed)}>{formatDateProse(parsed)}</time>
        {print ? (
          <span className={styles.aside}>{` · ${WORDS.print} ${print}`}</span>
        ) : null}
        {transcript ? (
          <span className={styles.aside}>
            {` · ${WORDS.transcript} `}
            <ProseLink href={transcript}>{readableUrl(transcript)}</ProseLink>
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
