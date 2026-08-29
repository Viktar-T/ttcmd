import Link from "next/link";

export interface PagerItem {
  href: string;
  /** The identity string, for a lesson. Modules carry their label instead. */
  id?: string;
  title: string;
  /**
   * The module this step crosses into, named only when it is not the module
   * the reader is already in. That is what makes a boundary visible rather than
   * surprising — the lesson before `1a` is `0c`, and a reader who is not told
   * so has silently left the module they were reading.
   */
  crossesInto?: string;
}

/**
 * Previous and next — between lessons, and between modules.
 *
 * **A step that does not exist renders nothing.** Not a disabled control: a
 * greyed-out box is a thing to read, to tab to and to wonder about, at exactly
 * the two places in the site where there is nothing to say.
 */
export function Pager({
  ariaLabel,
  previousLabel,
  nextLabel,
  previous,
  next,
}: {
  ariaLabel: string;
  previousLabel: string;
  nextLabel: string;
  previous: PagerItem | null;
  next: PagerItem | null;
}) {
  if (!previous && !next) return null;

  return (
    <nav aria-label={ariaLabel} className="pager lane">
      {previous && (
        <Link href={previous.href} className="pagerLink pagerPrevious">
          <span className="pagerKicker">
            <span aria-hidden="true">←</span> {previousLabel}
            {previous.crossesInto ? ` · ${previous.crossesInto}` : ""}
          </span>
          <span className="pagerTitle">
            {previous.id && <span className="pagerId">{previous.id}</span>}
            {previous.title}
          </span>
        </Link>
      )}
      {next && (
        <Link href={next.href} className="pagerLink pagerNext">
          <span className="pagerKicker">
            {nextLabel}
            {next.crossesInto ? ` · ${next.crossesInto}` : ""}{" "}
            <span aria-hidden="true">→</span>
          </span>
          <span className="pagerTitle">
            {next.id && <span className="pagerId">{next.id}</span>}
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
