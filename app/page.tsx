import Link from "next/link";
import { getCourse } from "@/lib/content";
import { ModuleGrid } from "@/components/module-grid";

export default async function HomePage() {
  const course = await getCourse();

  /* Derived, never written down: a hand-written URL here goes stale the day a
     module is inserted before this one. A module with no lessons yet is not a
     dead end — the button falls back to the module's own page. */
  const first = course[0];
  const start = first?.lessons[0]?.href ?? first?.href;

  return (
    <>
      <section className="hero lane">
        <h1 className="heroTitle">ttcmd</h1>
        {/* The description that was already on this page, unchanged. Article V
            is not relaxed by a redesign: what the course is officially called
            is still a TO CONFIRM, and not this slice's to resolve. */}
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
