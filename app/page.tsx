import Link from "next/link";
import { getCourse } from "@/lib/content";
import { ModuleGrid } from "@/components/module-grid";

export default async function HomePage() {
  const course = await getCourse();

  /* Derived, never written down: a hand-written URL here goes stale the day a
     module is inserted before this one. The first published lesson of the
     whole course, not of the first module — the day the first module is all
     drafts, the course's front door must open on the first lesson a student
     can actually read, not on an empty module page (slice 008). With no
     published lesson anywhere the button falls back to the first module's
     own page: a real route, never a hidden lesson. */
  const start =
    course.flatMap((moduleItem) => moduleItem.lessons)[0]?.href ??
    course[0]?.href;

  return (
    <>
      <section className="hero lane">
        <h1 className="heroTitle">Aplikacje desktopowe i mobilne</h1>
        {/* The course name, confirmed by Viktar and no longer a TO CONFIRM.
            The lede below is the description that was already on this page. */}
        <p className="heroLede">
          Materiały i zadania kursu aplikacji desktopowych i mobilnych.
        </p>
        {start && (
          <Link href={start} className="button">
            Zacznij kurs
          </Link>
        )}
        {/* The way to the progress page — here rather than in the site header,
            which has carried no navigation since slice 006. Adding the first
            item to it is a change to the look of the site and Viktar's to
            make, not this slice's; this is one link and one commit either way.

            .heroLede rather than a bare <p>: .hero is a grid with its own gap
            and .heroLede is the paragraph style in it that carries margin: 0,
            so a default margin here would put a second gap in a grid that
            already has one. */}
        <p className="heroLede">
          <Link href="/postep">Postęp grup — gdzie jest twoja grupa</Link>
        </p>
      </section>

      <ModuleGrid modules={course} />
    </>
  );
}
