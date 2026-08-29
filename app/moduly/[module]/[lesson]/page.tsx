import { notFound } from "next/navigation";
import { getCourse, getLesson } from "@/lib/content";
import { Band } from "@/components/band";
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

  return (
    <>
      {/* The breadcrumb arrives in the next task; the stripe is measured here. */}
      <Band>{null}</Band>
      <LessonHeader
        title={lesson.title}
        order={lesson.order}
        summary={lesson.summary}
      />
      <div className="prose">{lesson.body}</div>
    </>
  );
}
