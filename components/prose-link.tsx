import type { ReactNode } from "react";
import { classifyLink } from "@/lib/links";
import { WORDS } from "@/lib/blocks";
import styles from "./prose-link.module.css";

/**
 * Every anchor on a compiled page.
 *
 * Bound to `a` in the components map (`lib/content.ts`) the way `pre` is bound
 * to the code block, and rendered directly by the four elements of slice 010.
 * That is the point: a link written as Markdown in a paragraph and a link built
 * out of an evidence entry's `url` attribute reach the reader through the same
 * function, so one cannot be marked as leaving the site while the other is not
 * (spec, criterion 15). The alternative — a rehype plugin writing `target` and
 * `rel` onto one kind of anchor and a component writing the same thing onto the
 * other — is two spellings of one decision, in two languages, and the spec's
 * reviewer notes name it as the likeliest mistake in this slice.
 *
 * WHAT IS EXTERNAL IS NOT DECIDED HERE. `classifyLink` answers that, once, for
 * this component and for the build-time check both. If the word `http` ever
 * appears in this file, the drift the classifier exists to prevent has begun.
 *
 * The mark is markup rather than CSS generated content. `content: "↗" /
 * "(link zewnętrzny)"` says both halves in one line and is the obvious way to
 * write this — and where a browser does not support the alternative-text form
 * the **whole declaration is invalid** and the mark silently disappears. That
 * is the failure shape Checks A and C exist to catch elsewhere in this repo;
 * it is not worth reintroducing for one line of stylesheet.
 *
 * An internal link is a plain anchor, not `next/link`: nothing here needs
 * prefetching, and the two paths stay one shape (Article VIII).
 */

interface ProseLinkProps {
  href?: string;
  title?: string;
  children?: ReactNode;
}

export function ProseLink({ href, title, children }: ProseLinkProps) {
  /* Unreachable through the pipeline: `rehypeLinks` refuses an anchor with no
     href and `rehypeBlocks` refuses an element whose URL attribute is missing,
     both before this renders. It is here for the day somebody compiles without
     the plugins — an unchecked link on a public page is what this slice
     removes, and a build that stops is the cheap version of it. */
  if (typeof href !== "string" || href.trim() === "") {
    throw new Error(
      "ProseLink: rendered with no href. Every link on this site is " +
        "classified when it is built (lib/links.ts); this one was compiled " +
        "without that pass."
    );
  }

  const link = classifyLink(href);

  if (link.kind === "refused") {
    throw new Error(`ProseLink: ${link.href} is refused: ${link.why}.`);
  }

  if (link.kind === "internal") {
    return (
      <a href={link.href} title={title}>
        {children}
      </a>
    );
  }

  return (
    <a
      href={link.href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      data-external=""
    >
      {children}
      {/* The no-break space is load-bearing: without it the arrow is a word of
          its own and wraps onto a line by itself at the end of a long entry. */}
      <span className={styles.mark} aria-hidden="true">
        {" ↗"}
      </span>
      <span className={styles.announcement}>{` (${WORDS.externalLink})`}</span>
    </a>
  );
}
