import Link from "next/link";
import { listModules } from "@/lib/content";

export default async function ModulesPage() {
  const modules = await listModules();

  return (
    <div className="prose">
      <h1>Moduły</h1>
      <ul>
        {modules.map((moduleItem) => (
          <li key={moduleItem.slug}>
            <Link href={`/moduly/${moduleItem.slug}`}>
              {moduleItem.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
