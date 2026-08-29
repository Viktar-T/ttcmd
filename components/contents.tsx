import Link from "next/link";
import type { CourseLesson, CourseModule } from "@/lib/content";
import { SKIP_TARGET_ID } from "@/lib/section-anchors";

/**
 * The in-lesson contents — one server-rendered list, shown in two housings.
 *
 * The list answers the three questions the design reference names: where am I
 * in this lesson (the expanded current lesson, whose active section the
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

/** The spec's dead-panel rule: a housing renders only when the list holds at
    least one link — another lesson to go to, or a section to jump to. */
function hasAnyLink({ moduleItem, current }: ContentsProps): boolean {
  return moduleItem.lessons.length > 1 || current.sections.length > 0;
}

function ContentsList({ moduleItem, current }: ContentsProps) {
  return (
    <ol className="contentsLessons">
      {moduleItem.lessons.map((lesson) => {
        const isCurrent = lesson.slug === current.slug;
        return (
          <li key={lesson.slug}>
            {isCurrent ? (
              /* Not a link — the breadcrumb's own convention for the page
                 you are on. The expansion beneath it is what it offers. */
              <span className="contentsLesson contentsCurrent" aria-current="page">
                <span className="contentsId">{lesson.id}</span> {lesson.title}
              </span>
            ) : (
              <Link className="contentsLesson" href={lesson.href}>
                <span className="contentsId">{lesson.id}</span> {lesson.title}
              </Link>
            )}
            {isCurrent && lesson.sections.length > 0 && (
              <ol className="contentsSections">
                {lesson.sections.map((section) => (
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
        );
      })}
    </ol>
  );
}

/**
 * The wide-viewport housing: a sticky, self-scrolling panel in the frame's
 * left gutter. Its first focusable is the skip control — the panel sits
 * between the breadcrumb and the article in focus order and can hold
 * twenty-plus links, and this is where that burden is answered.
 */
export function ContentsPanel(props: ContentsProps) {
  if (!hasAnyLink(props)) return null;
  return (
    <nav className="contentsPanel" aria-label="Spis treści">
      <a className="contentsSkip" href={`#${SKIP_TARGET_ID}`}>
        Pomiń spis treści
      </a>
      <p className="contentsLabel" aria-hidden="true">
        Spis treści
      </p>
      <ContentsList {...props} />
    </nav>
  );
}
