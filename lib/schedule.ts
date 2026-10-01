import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { z } from "zod";
import { getCourse, getLessonIndex } from "./content";
import { formatDateIso, parseContentDate, type ContentDate } from "./dates";
import { moduleLabel } from "./numbering";
import {
  GROUPS,
  scheduleFileSchema,
  type Group,
  type ScheduleFileTopic,
} from "./schedule-schema";

/**
 * The schedule: which group has reached which session, and when.
 *
 * `lib/schedule-schema.ts` says what a well-formed FILE looks like. This module
 * says what a well-formed SCHEDULE is, which is a different question because it
 * needs the course — a topic naming a lesson is valid exactly when that lesson
 * exists, and only the walk in `lib/content.ts` knows which do.
 *
 * EVERY REFUSAL IS RAISED HERE OR IN THE SCHEMA, AND NOWHERE ELSE. Splitting
 * them across a pre-build script and the render path would mean two message
 * formats and two places to look when the build stops. And two of them cannot
 * live in a script at all: the course model is produced by the MDX compile that
 * exists only inside the Next build, so a script would have to walk
 * `content/moduly/` a second time and re-implement the module-prefix rule, the
 * order-to-letter rule and the publish rule.
 *
 * That places validation in the render path of `/postep`, which is the same
 * gate a malformed lesson already fails (Article VIII): thrown while the page
 * is prerendered, `next build` stops, and the message is in front of the person
 * who wrote the file. **The page must stay statically prerendered** — no
 * `dynamic`, no `revalidate`, no `cookies()` — or validation quietly moves from
 * build time to request time, which is the one way this design fails without
 * saying so. `npm run build` listing `/postep` as a static route is the check.
 *
 * The reader of every message below is Viktar on a Monday evening. A message
 * that says only that a value failed validation costs him the evening, so each
 * one names the row it is about and says what to write instead.
 */

const scheduleFile = path.join(process.cwd(), "content", "schedule.json");
const where = "content/schedule.json";

function fail(row: string, message: string): never {
  throw new Error(`${where} — ${row}: ${message}`);
}

/**
 * A date in the schedule, at day precision.
 *
 * `parseContentDate` is reused rather than reimplemented, for the same reason a
 * lesson's letter is derived rather than typed: the site has one date
 * vocabulary (`lib/dates.ts`), and a second parser would disagree with the
 * first about a leap year in some February nobody tests. It already refuses an
 * impossible day with a message naming the month and its length.
 *
 * The day requirement is added on top, because `2026-09` is a perfectly valid
 * `ContentDate` and is not a day on which a class met.
 */
function scheduleDate(value: string, row: string, field: string): ContentDate {
  let parsed: ContentDate;
  try {
    parsed = parseContentDate(value);
  } catch (error) {
    fail(row, `${field} — ${(error as Error).message}`);
  }
  if (parsed.day === undefined) {
    fail(
      row,
      `${field} is "${value}", which is a month rather than a day. Write the ` +
        `whole date, as yyyy-mm-dd.`
    );
  }
  return parsed;
}

/**
 * A session's title, verbatim, or null when it has none (slice 022).
 *
 * The schema has already refused a title with no visible character. What is
 * refused here is a title that begins with a number and a full stop — any
 * number, not only the session's own: the page puts the session's number in
 * front of every title, so "1. Jak dziś…" would render as "1. 1. Jak dziś…". It lives here and not in a Zod refinement because the
 * sentence has to show that collision, and only this layer knows the session's
 * number. Leading spaces are allowed for — " 1. Jak…" collides just the same.
 *
 * The suggested fix strips the number in the MESSAGE only. Nothing is ever
 * stripped from stored data: if the typed number disagrees with the session,
 * the reader should see the disagreement rather than have it quietly removed.
 */
function sessionTitle(
  value: string | undefined,
  number: number,
  row: string
): string | null {
  if (value === undefined) return null;
  if (/^\s*\d+\./.test(value)) {
    fail(
      row,
      `title — "${value}" begins with a number and a full stop. The page ` +
        `puts the session's number in front of every title automatically, ` +
        `and would show "${number}. ${value}" on this row. Write the title ` +
        `without the number, as "title": "${value.replace(/^\s*\d+\.\s*/, "")}"`
    );
  }
  return value;
}

/**
 * Zod's own message, replaced by a written one.
 *
 * Four shapes are worth naming, because they are the four a person actually
 * types wrong: a session title with nothing in it, an unknown group code, a
 * group's entry that is neither a date nor a list of dates, and a topic that is
 * none of the three things a topic may be. Everything else falls through to
 * Zod's text with the path spelled out, which is worse than a sentence and
 * better than nothing.
 */
function describeSchemaFailure(error: z.ZodError, raw: unknown): never {
  const issue = error.issues[0];
  const trail = issue.path;

  /* Named by the number the row itself declares, not by its position in the
     array — that is the number the author counts in, and the two differ the
     moment a week is appended out of order. Read off the RAW value, because
     the parse that would have given it a type is the one that just failed;
     when it is missing or is not a number, the position is what is left. */
  const kind = trail[0];
  const index = Number(trail[1]);
  /* `trail[1]` is an index only when the failure is INSIDE a row. A failure
     about the array itself — an empty `weeks`, a missing `sessions` key — has
     a path of length one, and reading an index off it gives NaN and a message
     naming "week at position NaN". That is not one of spec §6's eight
     refusals and is reachable from an ordinary edit, which is exactly the
     evening this module exists to save. */
  const inRow = Number.isInteger(index);
  const declared = inRow
    ? (raw as Record<string, Array<{ number?: unknown }>> | null)?.[
        String(kind)
      ]?.[index]?.number
    : undefined;
  const row =
    (kind === "weeks" || kind === "sessions") && inRow
      ? `${kind === "weeks" ? "week" : "session"} ${
          typeof declared === "number" ? declared : `at position ${index + 1}`
        }`
      : kind === "weeks"
        ? `"weeks"`
        : kind === "sessions"
          ? `"sessions"`
          : "the file";

  /* Every failure on a session's title lands here — empty, blank, null or not
     text at all — so the sentence is written to cover all of them. */
  if (kind === "sessions" && inRow && trail[2] === "title") {
    fail(
      row,
      `title must be text with something in it — the name of the class as ` +
        `it is entered in the school's plan, written without its number, as ` +
        `"title": "Budowa pierwszej aplikacji desktopowej za pomocą agenta ` +
        `AI." A class with no registered name yet leaves the "title" key out ` +
        `altogether.`
    );
  }

  if (issue.code === "unrecognized_keys" && trail.includes("groups")) {
    fail(
      row,
      `"${issue.keys.join('", "')}" is not one of this course's groups. The ` +
        `four are ${GROUPS.join(", ")} (ADR-0014), and a group's entry holds ` +
        `that group's own date as yyyy-mm-dd, a list of dates when the ` +
        `session took more than one class, or nothing at all.`
    );
  }

  /* A group's entry that is neither a date nor a list of dates — a number, a
     null, an object, a list with a number in it (slice 025). Zod reports a
     union whose branches all fail as one "Invalid input" at the entry's own
     path, which says nothing about what an entry may be, so the sentence is
     written here the way the title's is. Only the entry's own type can fail at
     this depth: an unknown group is the branch above, and an empty list is
     valid to Zod and refused below, where the session is known. */
  if (kind === "sessions" && inRow && trail[2] === "groups" && trail.length > 3) {
    const group = String(trail[3]);
    fail(
      row,
      `${group} must be a date, as "${group}": "yyyy-mm-dd", or a list of ` +
        `dates, as "${group}": ["yyyy-mm-dd", "yyyy-mm-dd"], one for each ` +
        `class the group spent on this session. A group that has not got ` +
        `there yet leaves the "${group}" key out altogether.`
    );
  }

  if (trail.includes("topics")) {
    fail(
      row,
      `a topic must be exactly one of three things: ` +
        `{ "lesson": "module-slug/lesson-slug" }, ` +
        `{ "module": "module-slug" }, or ` +
        `{ "text": "..." } for a class that is not in the course. ` +
        `Zod: ${issue.message}`
    );
  }

  fail(row, `${trail.join(".") || "the whole file"} — ${issue.message}`);
}

export interface ScheduleWeek {
  number: number;
  start: ContentDate;
  end: ContentDate;
}

/**
 * A topic, resolved against the course.
 *
 * No topic in `content/schedule.json` carries a title or a letter — those come
 * from the lesson's own frontmatter and from ADR-0003's derivation, every time
 * the page is built. `href` is null for a lesson that is not published: the
 * title is a fact about the course, and the link would be a door onto a page
 * that is not there.
 */
export type ScheduleTopic =
  | { kind: "lesson"; id: string; title: string; href: string | null }
  | { kind: "module"; label: string; title: string; href: string }
  | { kind: "text"; text: string };

/**
 * What ONE of a group's dates holds. A cell holds one of these or several,
 * earliest first (slice 025).
 *
 * The week is the one **this date** falls in, looked up in the calendar. It is
 * never `ScheduleSession.week`, which is what the session was *planned* for.
 * The two differ exactly when a group is behind, and that is the fact the page
 * exists to show: the seeded file has the two 4Tc groups doing session 1 —
 * planned for week 1 — on 2026-09-08, so their cells read `T2` beside the 4Ta
 * groups' `T1` (slice 020, decision 4).
 *
 * One object rather than two parallel maps, because a date is one fact: with
 * the pair together the renderer cannot print a date without its week, which is
 * the invariant stated in the type instead of in a comment.
 */
export interface ScheduleGroupClass {
  date: ContentDate;
  week: number;
}

export interface ScheduleSession {
  number: number;
  /**
   * The week this session was PLANNED for, and nothing renders it since slice
   * 020 dropped the column. It stays because it is what ties the calendar to
   * the sessions, and because the build still refuses a session naming a week
   * the calendar does not have.
   *
   * **Do not render it in a group cell.** Repointing a cell at this field
   * builds, lints, and produces a row on which every group agrees — which is
   * precisely the drift slice 020 exists to make visible, silently undone.
   */
  week: number;
  /** The date this session was PLANNED for. Unrendered since slice 020; its
      parse is what keeps an impossible planned date failing the build. */
  date: ContentDate | null;
  topics: ScheduleTopic[];
  /**
   * A group with an entry holds a NON-EMPTY list, earliest date first, no two
   * the same — all three true by construction in `readSchedule`, which is what
   * lets the renderer trust them without checking. A group with no entry is
   * absent from the record, and its cell is empty.
   */
  groups: Partial<Record<Group, ScheduleGroupClass[]>>;

  /** The name of the class as it is entered in the school's plan, verbatim, or
      null when it has none. Never stored with its number: the renderer puts
      the session's own number in front of it (slice 022, decision 2). */
  title: string | null;
}

export interface Schedule {
  weeks: ScheduleWeek[];
  sessions: ScheduleSession[];
}

/**
 * The calendar week a class date falls in, or null when the calendar has none.
 *
 * **Both bounds inclusive**, and that is load-bearing rather than a corner
 * case: 4Ta-2 did session 2 on 2026-09-11, which is week 2's `end` exactly, so
 * an exclusive upper bound would leave a seeded cell with no week.
 *
 * Compared as normalised ISO strings, the idiom this file already uses for the
 * week-ordering check and for the same reason: `new Date("2026-09-07")` is UTC
 * midnight, and a local-time comparison across a DST boundary is a bug that
 * appears twice a year. Every value here is day-precision and zero-padded, so
 * lexicographic order *is* chronological order.
 *
 * NO WIDENING AND NO NEAREST-WEEK. The weeks run Monday to Friday, so a
 * Saturday falls in nothing, and so does a date in a school break or past the
 * end of the calendar — the page lists only the weeks that were written,
 * because the breaks are institutional facts this repo does not hold (Article
 * V). Attributing a Saturday to the week before would print a confident `T1`
 * over what is almost certainly a typo. All of those are refused below.
 *
 * A linear scan: seventeen weeks against the few dates a session's four cells
 * hold. The ranges are intervals, not keys, and an index would be more code
 * defending a cost nobody is paying.
 */
function weekOf(date: ContentDate, weeks: ScheduleWeek[]): number | null {
  const iso = formatDateIso(date);
  const found = weeks.find(
    (week) => formatDateIso(week.start) <= iso && iso <= formatDateIso(week.end)
  );
  return found?.number ?? null;
}

async function resolveTopic(
  topic: ScheduleFileTopic,
  row: string
): Promise<ScheduleTopic> {
  if ("text" in topic) return { kind: "text", text: topic.text };

  if ("module" in topic) {
    const course = await getCourse();
    const found = course.find((item) => item.slug === topic.module);
    if (!found) {
      fail(
        row,
        `no module "${topic.module}". A module topic names the folder under ` +
          `content/moduly/, as { "module": "01-jak-powstaje-oprogramowanie" }. ` +
          `The modules are: ${course.map((item) => item.slug).join(", ")}.`
      );
    }
    return {
      kind: "module",
      label: moduleLabel(found.number),
      title: found.title,
      href: found.href,
    };
  }

  /* Against the INDEX, not against the course: an unpublished lesson exists,
     and the schedule may say it is planned. `getCourse` drops drafts by
     design, so resolving against it would refuse every draft outright —
     `00-start/git-i-github` is the one in the tree today. */
  const index = await getLessonIndex();
  const found = index.find(
    (entry) => `${entry.moduleSlug}/${entry.slug}` === topic.lesson
  );
  if (!found) {
    fail(
      row,
      `no lesson "${topic.lesson}". A lesson topic names its module folder ` +
        `and its file, without the extension, as ` +
        `{ "lesson": "02-warsztat/teraz-ty-pierwszy-agent" }. It is written ` +
        `that way and never as "2b", because the letter comes from the ` +
        `lesson's order (ADR-0003) and moves when a lesson is reordered.`
    );
  }
  return {
    kind: "lesson",
    id: found.id,
    title: found.title,
    href: found.published ? found.href : null,
  };
}

/**
 * Read, validate, resolve.
 *
 * Wrapped in React's `cache()` for the reason `readCourse` is: built once per
 * render pass rather than once per component that asks. Deliberately NOT a
 * module-level constant, which would survive an edit to the schedule under
 * `next dev` and keep serving last week's table until the process restarted —
 * the failure slice 015 removed.
 */
const readSchedule = cache(async (): Promise<Schedule> => {
  const source = await readFile(scheduleFile, "utf8");

  let raw: unknown;
  try {
    raw = JSON.parse(source);
  } catch (error) {
    throw new Error(
      `${where} is not valid JSON: ${(error as Error).message}. Every key and ` +
        `every string is double-quoted, and the last entry of a list carries ` +
        `no trailing comma.`
    );
  }

  const parsed = scheduleFileSchema.safeParse(raw);
  if (!parsed.success) describeSchemaFailure(parsed.error, raw);
  const file = parsed.data;

  /* THE WEEKS. Sorted by number rather than taken in file order, the same
     derivation `readCourse` performs on modules and lessons — so the calendar
     reads in order even when a hurried edit appends a week in the middle. */
  const seenWeeks = new Set<number>();
  const weeks: ScheduleWeek[] = file.weeks
    .map((week) => {
      const row = `week ${week.number}`;
      if (seenWeeks.has(week.number)) {
        fail(
          row,
          `two weeks carry the number ${week.number}. A week's number is its ` +
            `identity in this file — every session points at one — so it ` +
            `appears exactly once.`
        );
      }
      seenWeeks.add(week.number);

      const start = scheduleDate(week.start, row, "start");
      const end = scheduleDate(week.end, row, "end");
      /* Compared as normalised ISO strings, which order lexicographically
         exactly as they order chronologically. Deliberately not `new Date()`:
         "2026-09-07" is UTC midnight there, and a local-time comparison across
         a DST boundary is a bug that appears twice a year. */
      if (formatDateIso(end) < formatDateIso(start)) {
        fail(
          row,
          `it ends on ${week.end} and starts on ${week.start}, so it ends ` +
            `before it begins. Swap them.`
        );
      }
      return { number: week.number, start, end };
    })
    .sort((a, b) => a.number - b.number);

  /* THE SESSIONS. Same treatment, plus the two checks that need the weeks. */
  const seenSessions = new Set<number>();
  const sessions: ScheduleSession[] = [];
  for (const session of file.sessions) {
    const row = `session ${session.number}`;
    if (seenSessions.has(session.number)) {
      fail(
        row,
        `two sessions carry the number ${session.number}. A session's number ` +
          `counts from one across the whole course and appears exactly once.`
      );
    }
    seenSessions.add(session.number);

    if (!seenWeeks.has(session.week)) {
      fail(
        row,
        `it points at week ${session.week}, which the calendar does not have. ` +
          `Add that week to "weeks", or point the session at one of: ` +
          `${[...seenWeeks].sort((a, b) => a - b).join(", ")}.`
      );
    }

    /* Deliberately NOT checked against the row's week: a group two weeks
       behind the plan is not an error, it is the fact this page exists to
       show (016 §5). Since slice 020 the cell PRINTS the week its own date
       falls in, so that drift is now visible in the cell rather than inferable
       by comparing dates across a row — and the date is still never compared
       with `session.week`. Since slice 025 no date is refused for coming
       before or after another either: an entry is sorted for display, and
       refused only for a date written twice.

       The lookup runs after `scheduleDate`, and the order matters: an
       impossible date must keep giving the day-length message from
       `lib/dates.ts` rather than "falls in no week". `weeks` is fully built and
       the end-before-start refusal has already fired, so `weekOf` never sees an
       inverted range. Every date of an entry goes through that same pair, so a
       date inside a list is refused with the message it would get alone. */
    const groups: Partial<Record<Group, ScheduleGroupClass[]>> = {};
    for (const group of GROUPS) {
      const entry = session.groups?.[group];
      if (entry === undefined) continue;
      /* One date is written as one date and is held here as a list of one, so
         the single case and the several case run the same code below. */
      const written = typeof entry === "string" ? [entry] : entry;
      if (written.length === 0) {
        fail(
          row,
          `${group} — the list is empty. A group that has not got to this ` +
            `session yet is left out of the row, and a second way of saying so ` +
            `would hide a half-finished edit. Delete the "${group}" line, or ` +
            `write its dates: "${group}": ["yyyy-mm-dd", "yyyy-mm-dd"].`
        );
      }
      const classes: ScheduleGroupClass[] = [];
      /* Found on the NORMALISED date, not on the text: `parseContentDate` trims,
         so " 2026-09-22" and "2026-09-22" are the same day and would print as
         two identical lines. */
      const seen = new Set<string>();
      for (const value of written) {
        const date = scheduleDate(value, row, group);
        const week = weekOf(date, weeks);
        if (week === null) {
          fail(
            row,
            `${group} — "${value}" falls in no week the calendar has, so the ` +
              `cell cannot say which week that class was in. Add the week ` +
              `containing it to "weeks", or correct the date: the calendar runs ` +
              `${formatDateIso(weeks[0].start)} to ` +
              `${formatDateIso(weeks[weeks.length - 1].end)}, Monday to Friday, ` +
              `and a weekend or a school break falls in none of it.`
          );
        }
        const iso = formatDateIso(date);
        if (seen.has(iso)) {
          fail(
            row,
            `${group} — "${iso}" is written twice. A group's entry holds each ` +
              `class once, and two identical lines in a cell would read as a ` +
              `bug. Delete one of them, or correct the one that was meant to be ` +
              `another day.`
          );
        }
        seen.add(iso);
        classes.push({ date, week });
      }
      /* Earliest first, whatever order they were written in — the calendar is
         sorted the same way, so a hurried edit never prints backwards. The
         order lives here and not in the renderer, so a second consumer cannot
         show them another way. Every value is a whole day, zero-padded, so the
         ISO strings order as the days do, and no two are equal. */
      classes.sort((a, b) => {
        const x = formatDateIso(a.date);
        const y = formatDateIso(b.date);
        return x < y ? -1 : x > y ? 1 : 0;
      });
      groups[group] = classes;
    }

    sessions.push({
      number: session.number,
      week: session.week,
      date: session.date ? scheduleDate(session.date, row, "date") : null,

      title: sessionTitle(session.title, session.number, row),
      /* Topics keep file order. They have no number, and the sequence the
         author wrote is the information. */
      topics: await Promise.all(
        session.topics.map((topic) => resolveTopic(topic, row))
      ),
      groups,
    });
  }
  sessions.sort((a, b) => a.number - b.number);

  return { weeks, sessions };
});

export async function getSchedule(): Promise<Schedule> {
  return readSchedule();
}
