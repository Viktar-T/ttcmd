import Link from "next/link";
import type { CourseLesson } from "@/lib/content";

/**
 * The module's lessons, as chevron rows.
 *
 * Each row carries the lesson's **identity string** — `1a`, not `a`. The letter
 * alone is what the reference site shows and it is what a student writes down
 * away from the page they read it on; `1c` is the string a teacher says out
 * loud and the one that survives being copied into a notebook.
 *
 * The rows are **not staggered in width**. That is the expensive half of the
 * chevron geometry and the half that buys the least: staggering makes a row's
 * clickable area depend on its position in the list, there is nothing to read
 * off it, and at a phone width the shortest row would be uncomfortably small.
 */
export function LessonList({ lessons }: { lessons: CourseLesson[] }) {
  return (
    <nav aria-label="Lekcje w tym module" className="lessonList lane">
      <ol className="lessonRows" role="list">
        {lessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link href={lesson.href} className="chev lessonRow">
              <span className="lessonRowId">{lesson.id}</span>
              <span className="lessonRowTitle">{lesson.title}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
