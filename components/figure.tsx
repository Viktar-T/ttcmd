import type { ReactNode } from "react";
import { WORDS } from "@/lib/blocks";
import { ProseLink } from "./prose-link";
import styles from "./figure.module.css";

/**
 * A diagram, and a caption that is not inside it — the element an author writes
 * as `<Rysunek>`.
 *
 * Two of the corpus's five diagrams end with a line of `<text>` drawn inside
 * the SVG: one a caption, one the sentence saying which analysis the numbers
 * came from. Text inside a drawing is set against the drawing's coordinate
 * system rather than the reading scale, does not reflow, and cannot be selected
 * the way the paragraph above it can — and for a data source it hides the one
 * line that says where the numbers came from inside the picture of the numbers.
 *
 * So the caption is HTML, outside the drawing, at the reading measure, while
 * the drawing keeps the full column it has today. That split is the whole
 * element.
 *
 * WHAT IT DOES NOT DO: change an unwrapped diagram. `.prose > svg` is untouched
 * (spec, criterion 8), so the five drawings in the corpus render exactly as
 * they did before this slice. Wrapping them is content-lane work.
 */

interface FigureProps {
  caption?: string;
  source?: string;
  sourceUrl?: string;
  children?: ReactNode;
}

export function Figure({ caption, source, sourceUrl, children }: FigureProps) {
  /* Unreachable through the pipeline; the same backstop the other elements
     carry. A figure wrapper whose caption may be missing is a `div`. */
  if (!caption) {
    throw new Error(
      "Figure: rendered with no caption. A caption is required and is " +
        "refused when the site is built (lib/blocks.ts); this body was " +
        "compiled without that pass."
    );
  }

  return (
    <figure className={styles.figure} data-figure="">
      {children}
      <figcaption className={styles.caption}>
        {caption}
        {source ? (
          <span className={styles.source}>
            {`${WORDS.figureSource} `}
            {sourceUrl ? (
              <ProseLink href={sourceUrl}>{source}</ProseLink>
            ) : (
              source
            )}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
