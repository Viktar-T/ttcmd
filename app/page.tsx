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
      </section>

      <ModuleGrid modules={course} />
    </>
  );
}
