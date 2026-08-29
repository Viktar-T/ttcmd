import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/content";
import { Band } from "@/components/band";

export async function generateStaticParams() {
  const course = await getCourse();
  return course.map((moduleItem) => ({ module: moduleItem.slug }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module: moduleSlug } = await params;
  const course = await getCourse();
  const moduleItem = course.find((entry) => entry.slug === moduleSlug);
  if (!moduleItem) notFound();

  return (
    <>
      {/* The breadcrumb arrives in the next task; the stripe is measured here. */}
      <Band>{null}</Band>
      <div className="prose">
        <h1>{moduleItem.title}</h1>
        <ul>
          {moduleItem.lessons.map((lesson) => (
            <li key={lesson.slug}>
              <Link href={lesson.href}>
                {lesson.id} {lesson.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
