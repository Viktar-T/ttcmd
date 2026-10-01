import { z } from "zod";

/**
 * The shape of `content/ai-rankings.json` — the file, not the page.
 *
 * The split mirrors `lib/schedule-schema.ts` / `lib/schedule.ts` (slice 016):
 * this module says what a well-formed file looks like, and
 * `lib/ai-rankings.ts` reads it and owns every message. There is no cross-check
 * against the course here, so the loader is short, but the seam is the same.
 *
 * The list is content (slice 026, spec §4): adding, removing or rewording a
 * ranking is a `content:` commit that touches neither `app/` nor `lib/`. What
 * this file decides is only what such a commit may not get wrong.
 */

/** `min(1)` would accept "   ", which renders as an empty cell. */
const visible = z.string().regex(/\S/);

/*
 * `httpUrl()` requires a literal `http://` or `https://`, parses with `new URL`
 * and wants a dotted host; `startsWith` then narrows it to https. Rejected:
 * `z.url({ protocol: /^https$/ })`, which skips the `://` check and accepts
 * `https:arena.ai`. The address is returned exactly as written — the page
 * links to what the file says, with no slash added or removed.
 *
 * A query string is not refused. A ranking's own address may need one, and
 * spec criterion 5 is about what the page adds, not what the ranking is.
 */
const rankingSchema = z.strictObject({
  name: visible,
  url: z.httpUrl().startsWith("https://"),
  description: visible,
});

/*
 * Strict at both levels, so a misspelt key (`descripton`) is refused as a key
 * instead of reading as a missing description with no hint why. At least one
 * ranking, because a table with headers and no rows reads as a broken page.
 */
export const rankingsFileSchema = z.strictObject({
  /** The one sentence under the page title (spec §2). Here, not in the page,
      so rewording it is a content commit like the rows. */
  lede: visible,
  /** Table order is file order (spec §3, "in this order"). */
  rankings: z.array(rankingSchema).min(1),
});

export type RankingsFile = z.infer<typeof rankingsFileSchema>;
