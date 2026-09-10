import Link from "next/link";
import { formatDateIso, formatDateList, type ContentDate } from "@/lib/dates";
import { GROUPS } from "@/lib/schedule-schema";
import type { ScheduleSession, ScheduleTopic } from "@/lib/schedule";
import styles from "./page.module.css";

/**
 * The table of sessions — the substance of `/postep`.
 *
 * ONE `<tbody>` PER SESSION, TWO ROWS INSIDE IT, and that is the one
 * structural decision of this slice. The seven numeric columns cost about
 * 591px at --text-sm in the mono face, and the lane is 624px: they fit with
 * 33px to spare. A topics column does not fit at any width this site has —
 * the shortest seeded topic wants some 340px — and every arrangement that
 * makes it try costs either the site's single left edge, or the date format,
 * or the readability of the thing a student came for.
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

function Cell({ date }: { date: ContentDate | null | undefined }) {
  /* Empty means the group has not got there yet, and that is its only meaning
     (spec §5). No dash, no em dash, no question mark: a placeholder in a cell
     that means "not yet" reads as a value. */
  if (!date) return null;
  return <time dateTime={formatDateIso(date)}>{formatDateList(date)}</time>;
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

export function ScheduleTable({ sessions }: { sessions: ScheduleSession[] }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">Nr</th>
          {/* The only abbreviation on the page. "Tydzień" in full costs 30 of
              the 33px of slack the seven columns leave. */}
          <th scope="col">Tydz.</th>
          <th scope="col">Data</th>
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
            <td>
              <span className={styles.label}>Tydzień</span>
              {session.week}
            </td>
            <td>
              <span className={styles.label}>Data</span>
              <Cell date={session.date} />
            </td>
            {/* Driven by GROUPS, which is also what the schema validates
                against — so a column and a refusal cannot disagree about which
                four groups this course has. */}
            {GROUPS.map((group) => (
              <td key={group}>
                <span className={styles.label}>{group}</span>
                <Cell date={session.groups[group]} />
              </td>
            ))}
          </tr>
          <tr className={styles.topicsRow}>
            <td colSpan={3 + GROUPS.length}>
              <ul className={styles.topics}>
                {session.topics.map((topic, index) => (
                  <li key={index}>
                    <Topic topic={topic} />
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      ))}
    </table>
  );
}
