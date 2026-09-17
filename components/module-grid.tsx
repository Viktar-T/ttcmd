import Link from "next/link";
import type { CourseModule } from "@/lib/content";
import { ModuleMark } from "@/components/marks";
import { polishPlural } from "@/lib/plural";

/**
 * The module grid, **with one drawing per module**.
 *
 * This is where the large accent-coloured module number stood, and the number
 * stood there because `docs/design-reference.md` said ttcmd would have no
 * illustrations at all. ADR-0015 reversed that. Slice 023 had already widened
 * these cards from 197px to 421px, which made the sameness larger rather than
 * smaller: eight rectangles carrying four lines of type, three of which say the
 * same thing on every one of them. The number is still on the card — it moved
 * up into the kicker, where it reads `Moduł 3`.
 *
 * A module whose drawing has not been made renders without one. See
 * `components/marks.tsx` for why that is a fallback and not a defect.
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
            {/* One link, and the drawing is inside it: the picture and the
                name open the same page because they are the same control. */}
            <span className="moduleCardKicker">Moduł {moduleItem.number}</span>
            <ModuleMark slug={moduleItem.slug} />
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
