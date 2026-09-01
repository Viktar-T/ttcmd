import { notFound } from "next/navigation";
import { getCourse, getModuleNeighbours } from "@/lib/content";
import { Band } from "@/components/band";
import { Breadcrumb } from "@/components/breadcrumb";
import { ContentsDisclosure, ContentsPanel } from "@/components/contents";
import { LessonList } from "@/components/lesson-list";
import { Pager } from "@/components/pager";
import { ScrollSpy } from "@/components/scroll-spy";
import { SKIP_TARGET_ID } from "@/lib/section-anchors";

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

      {/* Two columns — the same wrapper a lesson page uses, slice 014.
          Since slice 012 this page has begun its content one contents column
          plus one gap in, because that is where a lesson's article begins and
          the site has one left edge; the column it was holding open was
          empty. Filling it means taking the columns themselves: the wrapper
          is full-bleed, so the frame's content track — whose leading edge is
          that very inset — never reaches this page, and the grid puts the
          module's own text back on exactly the same x.

          The panel leads in the DOM, as on a lesson page: above the fold that
          puts the reading order in the visual order, leftmost column first,
          and below it the panel is display:none while the disclosure keeps
          its place at the top of the column, above the module's title.

          The title and the introduction are the skip target. There is no
          article on this page, and the text the reader came for is what the
          control that skips the contents must land on — not the lesson list
          below it, which would jump over the introduction entirely. */}
      <div className="pageColumns" data-full-bleed>
        <ContentsPanel moduleItem={moduleItem} current="intro" />
        <div className="pageColumn">
          <ContentsDisclosure moduleItem={moduleItem} current="intro" />

          {/* The introduction is written in the module's own index file and had
              never been rendered — the content layer compiled it and threw it
              away. The heading joins it inside the prose column so it takes
              slice 004's scale and the rhythm below it. */}
          <div className="prose" id={SKIP_TARGET_ID} tabIndex={-1}>
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
              next
                ? { href: next.href, id: next.label, title: next.title }
                : null
            }
          />
        </div>
      </div>

      {/* The same island the lesson page mounts. No introduction carries a
          top-level heading today, so it finds none and does nothing; the day
          one does, „Wstęp" expands and its active section follows the reader
          here exactly as a lesson's does. One list, one behaviour, whichever
          page it is on. */}
      <ScrollSpy />
    </>
  );
}
