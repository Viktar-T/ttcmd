import Link from "next/link";
import { formatDateDayMonth, formatDateIso } from "@/lib/dates";
import { GROUPS } from "@/lib/schedule-schema";
import type {
  ScheduleGroupClass,
  ScheduleSession,
  ScheduleTopic,
} from "@/lib/schedule";
import styles from "./page.module.css";

/**
 * The table of sessions — the substance of `/postep`.
 *
 * ONE `<tbody>` PER SESSION, TWO ROWS INSIDE IT, and that is the one
 * structural decision here. Slice 020 dropped the planned week and the planned
 * date, so five columns cost about 399px at --text-sm in the mono face against
 * a 624px lane — 225px of slack. That is still not a topics column: the
 * shortest seeded topic wants some 340px, and every arrangement that makes it
 * try costs either the site's single left edge, or the date format, or the
 * readability of the thing a student came for.
 *
 * A row group is what HTML has for *these rows are one thing*. It is also the
 * natural boundary for the separator between sessions and for the block the
 * narrow layout makes out of each one.
 *
 * The rejected alternative is the scrolling table `app/prose.css` uses for the
 * one table in the corpus. It keeps the letter of the rule that no document
 * scrolls sideways and loses its meaning: the table is the whole content of
 * this page, so the only thing on the page would scroll, slice 012's left edge
 * would be visibly abandoned the moment a reader did, and a student looking
 * for their own column would scroll right rather than read down.
 */

function Cell({ held }: { held: ScheduleGroupClass | undefined }) {
  /* Empty means the group has not got there yet, and that is its only meaning
     (016 §5). No dash, no em dash, no question mark: a placeholder in a cell
     that means "not yet" reads as a value. */
  if (!held) return null;
  /* `03.09-T1` — the day, the month, and the week THAT DATE fell in, resolved
     in lib/schedule.ts against the calendar. Never the session's planned week:
     that number is the same for every cell in a row and would say nothing about
     the group (slice 020, decision 4).

     The year is dropped from the visible text and kept on the element. The
     table covers one school year and the calendar above it prints the year on
     all seventeen rows, so ten characters of a narrow column would be spent
     saying 2026 over and over — but `datetime` stays the full ISO date, so
     nothing machine-readable is lost. */
  return (
    <time dateTime={formatDateIso(held.date)}>
      {formatDateDayMonth(held.date)}-T{held.week}
    </time>
  );
}

function Topic({ topic }: { topic: ScheduleTopic }) {
  if (topic.kind === "text") return <>{topic.text}</>;

  if (topic.kind === "module") {
    return (
      <Link href={topic.href}>
        <span className={styles.topicId}>{topic.label}</span> {topic.title}
      </Link>
    );
  }

  const body = (
    <>
      <span className={styles.topicId}>{topic.id}</span> {topic.title}
    </>
  );
  /* A lesson that is not published keeps its title and loses its link: the
     title is a fact about the course, the link would be a door onto a page
     that is not there (spec §4). */
  return topic.href ? <Link href={topic.href}>{body}</Link> : body;
}

/**
 * A session's topics, built in one place for both branches of the topics cell.
 *
 * Called as a function, not rendered as a component, so the list lands in the
 * cell exactly as it did before slice 022. That is load-bearing: the prerendered
 * page embeds the cell's children literally, and an untitled session must leave
 * them byte-identical — see the branch in ScheduleTable.
 */
function topicList(topics: ScheduleTopic[]) {
  return (
    <ul className={styles.topics}>
      {topics.map((topic, index) => (
        <li key={index}>
          <Topic topic={topic} />
        </li>
      ))}
    </ul>
  );
}

export function ScheduleTable({ sessions }: { sessions: ScheduleSession[] }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">Nr</th>
          {GROUPS.map((group) => (
            <th scope="col" key={group}>
              {group}
            </th>
          ))}
        </tr>
      </thead>

      {sessions.map((session) => (
        <tbody key={session.number}>
          <tr className={styles.figures}>
            <th scope="row">
              <span className={styles.label}>Zajęcia</span>{" "}
              {session.number}
            </th>
            {/* Driven by GROUPS, which is also what the schema validates
                against — so a column and a refusal cannot disagree about which
                four groups this course has. */}
            {GROUPS.map((group) => (
              <td key={group}>
                <span className={styles.label}>{group}</span>
                <Cell held={session.groups[group]} />
              </td>
            ))}
          </tr>
          <tr className={styles.topicsRow}>
            {/* Derived, never restated: the session's number plus one cell per
                group. A literal here and the header row would disagree the
                first time a column moved. */}
            <td colSpan={1 + GROUPS.length}>
              {/* A BRANCH, NOT `title && <h3/>`. With no title the cell's only
                  child must stay the same list it was before slice 022; a `&&`
                  puts a null beside it, which renders the same HTML and changes
                  the page's embedded data. The number is the session's own and
                  goes in as one string, so the prerendered text has no React
                  separator inside it (slice 022, decision 2). */}
              {session.title === null ? (
                topicList(session.topics)
              ) : (
                <>
                  <h3 className={styles.title}>
                    {`${session.number}. ${session.title}`}
                  </h3>
                  {topicList(session.topics)}
                </>
              )}
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
