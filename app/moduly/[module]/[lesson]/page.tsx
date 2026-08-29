import { notFound } from "next/navigation";
import { getLesson, listLessons, listModules } from "@/lib/content";

export async function generateStaticParams() {
  const modules = await listModules();
  const paramsPerModule = await Promise.all(
    modules.map(async (moduleItem) => {
      const lessons = await listLessons(moduleItem.slug);
      return lessons.map((lesson) => ({
        module: moduleItem.slug,
        lesson: lesson.slug,
      }));
    })
  );
  return paramsPerModule.flat();
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
      <h1>{lesson.title}</h1>
      <p>{lesson.summary}</p>
      <div className="prose">{lesson.body}</div>
    </>
  );
}
