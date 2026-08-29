import Link from "next/link";
import { notFound } from "next/navigation";
import { getModule, listLessons, listModules } from "@/lib/content";

export async function generateStaticParams() {
  const modules = await listModules();
  return modules.map((moduleItem) => ({ module: moduleItem.slug }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: moduleSlug } = await params;
  const moduleItem = await getModule(moduleSlug);
  if (!moduleItem) notFound();

  const lessons = await listLessons(moduleSlug);

  return (
    <div className="prose">
      <h1>{moduleItem.title}</h1>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.slug}>
            <Link href={`/moduly/${moduleSlug}/${lesson.slug}`}>
              {lesson.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
