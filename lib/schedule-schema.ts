import { z } from "zod";

/**
 * The shape of `content/schedule.json` — the file, not the model.
 *
 * The split mirrors `lib/content-schema.ts` / `lib/content.ts` deliberately:
 * this module says what a well-formed *file* looks like, and `lib/schedule.ts`
 * says what a well-formed *schedule* is. The difference is that the second
 * needs the course — a topic naming a lesson can only be checked against the
 * lessons that exist — and the first must not, or the schema becomes a second
 * walk of `content/moduly/`.
 *
 * Dates are `z.string()` here and become dates one layer up, through
 * `lib/dates.ts`. Zod could refuse `2026-02-30` with a regex and a refinement,
 * and would then own a second opinion about how many days February has. The
 * site has one date vocabulary and this is not it.
 */

/**
 * The four groups of ADR-0014, in the order they are columns.
 *
 * One array, and it is both the validation and the column order — so a column
 * and a refusal cannot disagree about which four groups there are. Article V
 * settled these names on 2026-09-10; before that they were not this repo's to
 * write down.
 */
export const GROUPS = ["4Ta-1", "4Ta-2", "4Tc-1", "4Tc-2"] as const;

export type Group = (typeof GROUPS)[number];

/** What a group cell may hold: a date, or nothing at all (spec §5). */
export type GroupDates = Partial<Record<Group, string>>;

/*
 * Built from GROUPS rather than spelled out four times, for the reason above.
 * The annotation is what the four optional keys amount to; `strictObject`
 * still refuses an unknown key at run time, which is refusal 2 of spec §6 —
 * `4Tb-1` fails as a KEY, before anything looks at its value.
 */
const groupDatesSchema: z.ZodType<GroupDates> = z.strictObject(
  Object.fromEntries(GROUPS.map((group) => [group, z.string().optional()]))
);

/**
 * A topic is tagged by its key, not by a `kind` field.
 *
 * `{ "lesson": "02-warsztat/na-zywo-agent-buduje-aplikacje" }` — a lesson, by
 * the two slugs that are its file identity. Never by `2a`: the letter comes
 * from `order` (ADR-0003) and moves when a lesson is reordered, which would
 * silently repoint the schedule at a different lesson.
 *
 * `{ "module": "01-jak-powstaje-oprogramowanie" }` — a whole module.
 *
 * `{ "text": "Sprawdzian" }` — Polish, for a class that is not in the tree.
 *
 * A discriminated union would give Zod a better error for free and cost a
 * `"kind"` noun every week for something the key already says. The error is
 * paid for once, in `lib/schedule.ts`, by replacing Zod's union message with a
 * written sentence.
 */
const topicSchema = z.union([
  z.strictObject({ lesson: z.string().min(1) }),
  z.strictObject({ module: z.string().min(1) }),
  z.strictObject({ text: z.string().min(1) }),
]);

const weekSchema = z.strictObject({
  number: z.number().int().min(1),
  start: z.string().min(1),
  end: z.string().min(1),
});

const sessionSchema = z.strictObject({
  number: z.number().int().min(1),
  week: z.number().int().min(1),
  /** Absent is the point: a session whose date is not yet fixed says nothing
      rather than guessing (spec §3, Article V). */
  date: z.string().min(1).optional(),
  /** The name of the class as it is entered in the school's plan, written
      without its number — the page adds the session's own (slice 022).
      `/\S/` rather than `.min(1)`, because a title of spaces passes `min(1)`
      and would render as a bare "2.". It normalises nothing: an accepted title
      is stored exactly as written. A title that begins with a number and a full
      stop — any number, not only the session's own — is refused one layer up,
      in lib/schedule.ts, where the session's number is known and the message
      can show the collision. */
  title: z.string().regex(/\S/).optional(),
  /** At least one. A session with no topic occupies a line and tells the
      reader nothing, and is indistinguishable from a half-finished edit; a
      subject that is genuinely undecided says so in `text`. */
  topics: z.array(topicSchema).min(1),
  groups: groupDatesSchema.optional(),
});

export const scheduleFileSchema = z.strictObject({
  weeks: z.array(weekSchema).min(1),
  sessions: z.array(sessionSchema),
});

export type ScheduleFile = z.infer<typeof scheduleFileSchema>;
export type ScheduleFileWeek = ScheduleFile["weeks"][number];
export type ScheduleFileSession = ScheduleFile["sessions"][number];
export type ScheduleFileTopic = ScheduleFileSession["topics"][number];
