import Link from "next/link";
import type { CourseModule } from "@/lib/content";
import { polishPlural } from "@/lib/plural";

/**
 * The module grid, **without illustrations**.
 *
 * The reference site puts a commissioned line drawing on every card, and
 * `docs/design-reference.md` is explicit that ttcmd has none, will commission
 * none, and must not have an agent generate filler. The honest substitute it
 * names is typography doing the work: the module's number, large, in the accent
 * colour, in the space where the drawing would be.
 *
 * No `lane`: slice 023 made this the one block on the front door and the
 * module listing that takes the **whole band** rather than the reading measure.
 * A grid of cards is not prose, and a 760px grid inside a 1296px band was three
 * cards of 197px in a page 1570px across — the complaint that slice exists for.
 *
 * The one line of fact beneath the title is the lesson count, written in
 * correct Polish. `5 lekcje` reads to a Polish reader the way `5 lesson` reads
 * in English, which is why the three forms are a function and not a template.
 */
export function ModuleGrid({ modules }: { modules: CourseModule[] }) {
  return (
    <ul className="moduleGrid" role="list">
      {modules.map((moduleItem) => (
        <li key={moduleItem.slug}>
          <Link href={moduleItem.href} className="moduleCard">
            <span className="moduleCardKicker">Moduł</span>
            <span className="moduleCardNumber">{moduleItem.number}</span>
            <span className="moduleCardTitle">{moduleItem.title}</span>
            <span className="moduleCardCount">
              {lessonCount(moduleItem.lessons.length)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function lessonCount(count: number): string {
  return `${count} ${polishPlural(count, "lekcja", "lekcje", "lekcji")}`;
}
