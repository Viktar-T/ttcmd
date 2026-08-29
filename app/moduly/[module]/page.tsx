import { notFound } from "next/navigation";
import { getCourse, getModuleNeighbours } from "@/lib/content";
import { Band } from "@/components/band";
import { Breadcrumb } from "@/components/breadcrumb";
import { LessonList } from "@/components/lesson-list";
import { Pager } from "@/components/pager";

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

  const { previous, next } = await getModuleNeighbours(moduleSlug);

  return (
    <>
      <Band>
        <Breadcrumb
          trail={[
            { label: "Moduły", href: "/moduly" },
            { label: moduleItem.label },
          ]}
        />
      </Band>

      {/* The introduction is written in the module's own index file and had
          never been rendered — the content layer compiled it and threw it away.
          The heading joins it inside the prose column so it takes slice 004's
          scale and the rhythm below it. */}
      <div className="prose">
        <h1>{moduleItem.title}</h1>
        {moduleItem.body}
      </div>

      {moduleItem.lessons.length > 0 && (
        <LessonList lessons={moduleItem.lessons} />
      )}

      <Pager
        ariaLabel="Moduły"
        previousLabel="Poprzedni moduł"
        nextLabel="Następny moduł"
        previous={
          previous
            ? {
                href: previous.href,
                id: previous.label,
                title: previous.title,
              }
            : null
        }
        next={
          next ? { href: next.href, id: next.label, title: next.title } : null
        }
      />
    </>
  );
}
