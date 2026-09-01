import { notFound } from "next/navigation";
import { getCourse, getLesson, getLessonNeighbours } from "@/lib/content";
import type { LessonPosition } from "@/lib/content";
import { Band } from "@/components/band";
import { Breadcrumb } from "@/components/breadcrumb";
import { BackToTop } from "@/components/back-to-top";
import { ContentsDisclosure, ContentsPanel } from "@/components/contents";
import { ScrollSpy } from "@/components/scroll-spy";
import { Pager, type PagerItem } from "@/components/pager";
import { SKIP_TARGET_ID } from "@/lib/section-anchors";
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
      {/* Two columns — slice 011. The panel is a track of this grid rather
          than a passenger in the frame's left gutter, and everything that is
          the lesson itself — header, article, pager — is the other track, so
          the panel starts level with the title instead of below it.
          contents.css carries the geometry and the argument.

          The panel leads in the DOM: above the fold that puts the reading
          order in the visual order, leftmost column first, and below it the
          panel is display:none while the disclosure keeps its place inside
          the lesson column, between the header and the first paragraph.

          The article is the skip target: tabIndex -1 so the panel's skip
          control can move real focus to it. */}
      <div className="pageColumns" data-full-bleed>
        <ContentsPanel moduleItem={moduleItem} current={entry} />
        <div className="pageColumn">
          <LessonHeader
            title={lesson.title}
            order={lesson.order}
            summary={lesson.summary}
          />
          <ContentsDisclosure moduleItem={moduleItem} current={entry} />
          <div className="prose" id={SKIP_TARGET_ID} tabIndex={-1}>
            {lesson.body}
          </div>
          <Pager
            ariaLabel="Lekcje"
            previousLabel="Poprzednia lekcja"
            nextLabel="Następna lekcja"
            previous={toPagerItem(previous, moduleSlug)}
            next={toPagerItem(next, moduleSlug)}
          />
        </div>
      </div>
      <ScrollSpy />
      <BackToTop />
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
