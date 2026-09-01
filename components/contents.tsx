import Link from "next/link";
import type { CourseLesson, CourseModule } from "@/lib/content";
import type { SectionEntry } from "@/lib/section-anchors";
import { SKIP_TARGET_ID } from "@/lib/section-anchors";

/**
 * The contents — one server-rendered list, shown in two housings.
 *
 * The list answers the three questions the design reference names: where am I
 * in this lesson (the expanded current entry, whose active section the
 * scroll-spy marks), what else is in this lesson (its section anchors), and
 * what else is in this module (every other lesson, a link). It is rendered
 * from the same course model every other navigation reads, and its section
 * ids are the ones lib/section-anchors.ts wrote into the article — one
 * derivation, two consumers.
 *
 * Everything here is a Server Component. The scroll-spy is a separate client
 * island that only moves aria-current between the links rendered here; with
 * scripting absent this markup is complete and every link works.
 */

interface ContentsProps {
  moduleItem: CourseModule;
  current: CourseLesson;
}

/**
 * One row of the list, and the two absences that carry its state.
 *
 * **`href` absent is what "this is the page you are on" means.** One field,
 * one job: the state "current *and* a link" cannot be represented, so the
 * highlight and the link can never disagree.
 *
 * **`ident` absent is what "not a lesson" means.** The identity string is
 * omitted rather than rendered empty — a box holding the identity column's
 * width would be a symbol, and this list has no symbol for a thing that is
 * not a lesson.
 */
interface ContentsEntry {
  key: string;
  label: string;
  ident?: string;
  href?: string;
  /** Rendered only when this entry is the current one; every other entry
      carries an empty list, because a non-current entry's sections are never
      shown. */
  sections: SectionEntry[];
}

function buildEntries({ moduleItem, current }: ContentsProps): ContentsEntry[] {
  return moduleItem.lessons.map((lesson) => {
    const isCurrent = lesson.slug === current.slug;
    return {
      key: lesson.slug,
      label: lesson.title,
      ident: lesson.id,
      href: isCurrent ? undefined : lesson.href,
      sections: isCurrent ? lesson.sections : [],
    };
  });
}

/** The spec's dead-panel rule: a housing renders only when the list holds at
    least one link — another entry to go to, or a section to jump to. */
function hasAnyLink(entries: ContentsEntry[]): boolean {
  return entries.some(
    (entry) => entry.href !== undefined || entry.sections.length > 0
  );
}

/** The identity string, then the title — or the title alone where there is no
    identity string to say. */
function EntryLabel({ entry }: { entry: ContentsEntry }) {
  if (entry.ident === undefined) return <>{entry.label}</>;
  return (
    <>
      <span className="contentsId">{entry.ident}</span> {entry.label}
    </>
  );
}

function ContentsList({ entries }: { entries: ContentsEntry[] }) {
  return (
    <ol className="contentsLessons">
      {entries.map((entry) => (
        <li key={entry.key}>
          {entry.href === undefined ? (
            /* Not a link — the breadcrumb's own convention for the page
               you are on. The expansion beneath it is what it offers. */
            <span
              className="contentsLesson contentsCurrent"
              aria-current="page"
            >
              <EntryLabel entry={entry} />
            </span>
          ) : (
            <Link className="contentsLesson" href={entry.href}>
              <EntryLabel entry={entry} />
            </Link>
          )}
          {entry.sections.length > 0 && (
            <ol className="contentsSections">
              {entry.sections.map((section) => (
                <li key={section.id}>
                  <a
                    className="contentsSection"
                    href={`#${section.id}`}
                    data-section={section.id}
                  >
                    {/* The reference's hyphen prefix — visual signature,
                        nothing to read aloud. */}
                    <span aria-hidden="true">- </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          )}
        </li>
      ))}
    </ol>
  );
}

/**
 * The wide-viewport housing: a sticky, self-scrolling panel that is a COLUMN
 * of the page's grid. It sat in the frame's left gutter until slice 011,
 * which is why it was 13rem wide; app/contents.css carries that history.
 *
 * Its first focusable is the skip control — the panel stands between the
 * breadcrumb and the page's own text in focus order and can hold twenty-plus
 * links, and this is where that burden is answered.
 */
export function ContentsPanel(props: ContentsProps) {
  const entries = buildEntries(props);
  if (!hasAnyLink(entries)) return null;
  return (
    <nav className="contentsPanel" aria-label="Spis treści">
      <a className="contentsSkip" href={`#${SKIP_TARGET_ID}`}>
        Pomiń spis treści
      </a>
      <p className="contentsLabel" aria-hidden="true">
        Spis treści
      </p>
      <ContentsList entries={entries} />
    </nav>
  );
}

/**
 * The small-screen housing: the same list folded into a native disclosure
 * above the page's own text. Collapsed by default — open, it would push a
 * two-hundred-line lesson a screenful down — and opening it is the browser's
 * own behaviour, which is what keeps criterion 13's no-JavaScript classroom
 * case free. Exactly one housing is displayed at any width; contents.css
 * holds the one boundary.
 */
export function ContentsDisclosure(props: ContentsProps) {
  const entries = buildEntries(props);
  if (!hasAnyLink(entries)) return null;
  return (
    <nav className="contentsDisclosure lane" aria-label="Spis treści">
      <details className="contentsDetails">
        <summary className="contentsSummary">Spis treści</summary>
        <ContentsList entries={entries} />
      </details>
    </nav>
  );
}
