import Link from "next/link";
import { getCourse } from "@/lib/content";
import { ModuleGrid } from "@/components/module-grid";

export default async function HomePage() {
  const course = await getCourse();

  return (
    <>
      <section className="hero lane">
        <h1 className="heroTitle">Aplikacje desktopowe i mobilne</h1>
        {/* The course name, confirmed by Viktar and no longer a TO CONFIRM.
            The lede below is the description that was already on this page. */}
        <p className="heroLede">
          Materiały i zadania kursu aplikacji desktopowych i mobilnych.
        </p>
        {/* The front door's one action is the progress page (slice 021): a
            student opens the site to see where their group is. The course
            stays in the module grid directly below — a module one click away,
            a lesson two. No guard: /postep is a static route that exists on
            every build.

            Here rather than in the site header, which has carried no
            navigation since slice 006; adding the first item there is a
            change to the look of the site that nobody has asked for. */}
        <Link href="/postep" className="button">
          Postęp grup
        </Link>
      </section>

      <ModuleGrid modules={course} />
    </>
  );
}
