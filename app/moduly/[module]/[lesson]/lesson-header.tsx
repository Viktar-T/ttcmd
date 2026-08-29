import { lessonLetter } from "@/lib/numbering";
import styles from "./lesson-header.module.css";

/**
 * The circled letter, the title, and the summary as a standfirst.
 *
 * The letter comes from `order` through lib/numbering.ts and from nowhere
 * else — ADR-0003 makes it identity rather than presentation. It is not
 * aria-hidden for the same reason: "c" before the title is what the lesson is
 * called, not decoration.
 *
 * This is not the accent band. The band carries the breadcrumb and arrives
 * with the navigation slice; spec 004 §8 says so in as many words.
 */
export function LessonHeader({
  title,
  order,
  summary,
}: {
  title: string;
  order: number;
  summary: string;
}) {
  return (
    <header className={styles.header}>
      <span className={styles.letter}>{lessonLetter(order)}</span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.standfirst}>{summary}</p>
    </header>
  );
}
