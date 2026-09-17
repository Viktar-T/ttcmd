import type { Metadata } from "next";
import { formatDateIso, formatDateList } from "@/lib/dates";
import { getSchedule } from "@/lib/schedule";
import { ScheduleTable } from "./schedule-table";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Postęp grup — ttcmd",
};

/**
 * Where each group has got to — ADR-0014, slice 016.
 *
 * A page of its own rather than a feature of the module pages: *where is my
 * group* is a question about the course as a whole, and cannot be answered
 * from inside one module.
 *
 * A Server Component with no params, no hook and no fetch, which is Article
 * VIII's default and is also what makes the validation in `lib/schedule.ts`
 * run at build time. If this page ever became dynamic, a malformed schedule
 * would stop failing `npm run build` and start failing in front of a student.
 */
export default async function ProgressPage() {
  const schedule = await getSchedule();

  return (
    <>
      {/* The title is text and keeps the reading lane. The two sections below
          it are a list of weeks and a table of sessions — neither is prose, so
          slice 023 gives them the whole band the frame now draws. */}
      <header className="lane">
        <h1 className="pageTitle">Postęp grup</h1>
      </header>

      <section className={styles.section}>
        <h2 className={styles.heading}>Tygodnie</h2>
        {/* Only the weeks that have been written. The page never generates a
            school year: the breaks, the holidays and the last week are
            institutional facts this repo does not hold (Article V). */}
        <ul className={styles.weeks}>
          {schedule.weeks.map((week) => (
            <li key={week.number}>
              <span className={styles.weekNumber}>Tydzień {week.number}</span>
              <span className={styles.weekDates}>
                <time dateTime={formatDateIso(week.start)}>
                  {formatDateList(week.start)}
                </time>
                {" – "}
                <time dateTime={formatDateIso(week.end)}>
                  {formatDateList(week.end)}
                </time>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Zajęcia</h2>
        <ScheduleTable sessions={schedule.sessions} />
      </section>
    </>
  );
}
