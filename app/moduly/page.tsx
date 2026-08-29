import { getCourse } from "@/lib/content";
import { ModuleGrid } from "@/components/module-grid";

/**
 * The course contents page, and the first step of every breadcrumb.
 *
 * It shows the same grid as the landing page on purpose: it is the same
 * question asked twice, and two different answers to it would be a defect.
 */
export default async function ModulesPage() {
  const course = await getCourse();

  return (
    <>
      <header className="lane">
        <h1 className="pageTitle">Moduły</h1>
      </header>
      <ModuleGrid modules={course} />
    </>
  );
}
