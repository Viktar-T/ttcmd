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
 * Zod's own message, replaced by a written one.
 *
 * Two shapes are worth naming, because they are the two a person actually
 * types wrong: an unknown group code, and a topic that is none of the three
 * things a topic may be. Everything else falls through to Zod's text with the
 * path spelled out, which is worse than a sentence and better than nothing.
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

  if (issue.code === "unrecognized_keys" && trail.includes("groups")) {
    fail(
      row,
      `"${issue.keys.join('", "')}" is not one of this course's groups. The ` +
        `four are ${GROUPS.join(", ")} (ADR-0014), and a group cell holds ` +
        `that group's own date as yyyy-mm-dd, or nothing at all.`
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
 * Nothing in `content/schedule.json` carries a title or a letter — those come
 * from the lesson's own frontmatter and from ADR-0003's derivation, every time
 * the page is built. `href` is null for a lesson that is not published: the
 * title is a fact about the course, and the link would be a door onto a page
 * that is not there.
 */
export type ScheduleTopic =
  | { kind: "lesson"; id: string; title: string; href: string | null }
  | { kind: "module"; label: string; title: string; href: string }
  | { kind: "text"; text: string };

export interface ScheduleSession {
  number: number;
  week: number;
  date: ContentDate | null;
  topics: ScheduleTopic[];
  groups: Partial<Record<Group, ContentDate>>;
}

export interface Schedule {
  weeks: ScheduleWeek[];
  sessions: ScheduleSession[];
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
       show (spec §5). */
    const groups: Partial<Record<Group, ContentDate>> = {};
    for (const group of GROUPS) {
      const value = session.groups?.[group];
      if (value !== undefined) groups[group] = scheduleDate(value, row, group);
    }

    sessions.push({
      number: session.number,
      week: session.week,
      date: session.date ? scheduleDate(session.date, row, "date") : null,
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
