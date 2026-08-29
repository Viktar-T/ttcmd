import { notFound } from "next/navigation";
import { getCourse, getLesson, getLessonNeighbours } from "@/lib/content";
import type { LessonPosition } from "@/lib/content";
import { Band } from "@/components/band";
import { Breadcrumb } from "@/components/breadcrumb";
import { Pager, type PagerItem } from "@/components/pager";
import { LessonHeader } from "./lesson-header";

export async function generateStaticParams() {
  const course = await getCourse();
  return course.flatMap((moduleItem) =>
    moduleItem.lessons.map((lesson) => ({
      module: moduleItem.slug,
      lesson: lesson.slug,
    }))
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ module: string; lesson: string }>;
}) {
  const { module: moduleSlug, lesson: lessonSlug } = await params;
  const lesson = await getLesson(moduleSlug, lessonSlug);
  if (!lesson) notFound();

  /* The identity string is derived from the course rather than from this
     lesson's own frontmatter: the module's number lives in its folder name, and
     a lesson does not know it. ADR-0003. */
  const course = await getCourse();
  const moduleItem = course.find((item) => item.slug === moduleSlug);
  const entry = moduleItem?.lessons.find((item) => item.slug === lessonSlug);
  if (!moduleItem || !entry) notFound();

  const { previous, next } = await getLessonNeighbours(moduleSlug, lessonSlug);

  return (
    <>
      <Band>
        <Breadcrumb
          trail={[
            { label: "Moduły", href: "/moduly" },
            { label: moduleItem.label, href: moduleItem.href },
            { label: entry.id },
          ]}
        />
      </Band>
      <LessonHeader
        title={lesson.title}
        order={lesson.order}
        summary={lesson.summary}
      />
      <div className="prose">{lesson.body}</div>
      <Pager
        ariaLabel="Lekcje"
        previousLabel="Poprzednia lekcja"
        nextLabel="Następna lekcja"
        previous={toPagerItem(previous, moduleSlug)}
        next={toPagerItem(next, moduleSlug)}
      />
    </>
  );
}

/**
 * The module is named only when the step leaves the one the reader is in. The
 * sequence itself does not stop at a module edge — the lesson before `1a` is
 * `0c` — and a reader who is not told they have crossed has silently left the
 * module they were reading.
 */
function toPagerItem(
  position: LessonPosition | null,
  currentModuleSlug: string
): PagerItem | null {
  if (!position) return null;
  return {
    href: position.lesson.href,
    id: position.lesson.id,
    title: position.lesson.title,
    crossesInto:
      position.module.slug === currentModuleSlug
        ? undefined
        : position.module.label,
  };
}
