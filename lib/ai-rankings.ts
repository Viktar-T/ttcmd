import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { z } from "zod";
import { rankingsFileSchema } from "./ai-rankings-schema";

/**
 * The AI-model rankings: which public rankings the course points at, and what
 * each one measures (slice 026).
 *
 * Validation runs in the render path of `/rankingi-ai`, as the schedule's does
 * on `/postep`: thrown while the page is prerendered, `next build` stops, and
 * the message is in front of the person who edited the file. **The page must
 * stay statically prerendered** — no `dynamic`, no `revalidate`, no
 * `cookies()` — or validation moves to request time without saying so.
 * `npm run build` listing `/rankingi-ai` as a static route is the check.
 *
 * Every message names the entry it is about and says what to write instead,
 * in the schedule's shape: `content/ai-rankings.json — <entry>: <message>`.
 */

const rankingsFile = path.join(process.cwd(), "content", "ai-rankings.json");
const where = "content/ai-rankings.json";

function fail(entry: string, message: string): never {
  throw new Error(`${where} — ${entry}: ${message}`);
}

export interface Ranking {
  name: string;
  /** Exactly as written in the file — the link's target. */
  url: string;
  description: string;
}

export interface AiRankings {
  /** The sentence under the page title. */
  lede: string;
  rankings: Ranking[];
}

/**
 * One sentence per way an edit can go wrong, chosen from the first issue's
 * path and kind; anything unforeseen falls through to Zod's text with the path
 * spelled out, as `lib/schedule.ts` does.
 */
function describeSchemaFailure(error: z.ZodError, raw: unknown): never {
  const issue = error.issues[0];
  const trail = issue.path;
  const index = Number(trail[1]);

  /* Inside an entry: named by its own `name`, read off the RAW value, because
     the parse that would have given it a type is the one that just failed.
     When the name itself is missing or blank, by position, counted from 1. */
  if (trail[0] === "rankings" && Number.isInteger(index)) {
    const declared = (
      raw as { rankings?: Array<{ name?: unknown }> } | null
    )?.rankings?.[index]?.name;
    const entry =
      typeof declared === "string" && /\S/.test(declared)
        ? `ranking "${declared}"`
        : `ranking at position ${index + 1}`;
    const field = trail[2];
    const value = (
      raw as { rankings?: Array<Record<string, unknown>> } | null
    )?.rankings?.[index]?.[String(field)];

    if (issue.code === "unrecognized_keys") {
      fail(
        entry,
        `"${issue.keys.join('", "')}" is not a field of a ranking. A ranking ` +
          `has exactly three: "name", "url" and "description".`
      );
    }
    if (field === "name") {
      fail(
        entry,
        `"name" must be text with something in it — the ranking's name as the ` +
          `table should show it, as the link to its page.`
      );
    }
    if (field === "url" && value === undefined) {
      fail(
        entry,
        `"url" is missing. Write the ranking's address as the browser shows ` +
          `it, starting with https://.`
      );
    }
    if (field === "url" && issue.code === "invalid_format") {
      if (issue.format === "starts_with") {
        fail(
          entry,
          `"url" is ${JSON.stringify(value)}, which is not an https address. ` +
            `Every ranking is linked over https — write the address starting ` +
            `with https://.`
        );
      }
      fail(
        entry,
        `"url" is ${JSON.stringify(value)}, which is not a web address. Write ` +
          `the whole address as the browser shows it, starting with https://.`
      );
    }
    if (field === "url") {
      fail(
        entry,
        `"url" must be text — the ranking's address, starting with https://.`
      );
    }
    if (field === "description") {
      fail(
        entry,
        `"description" must be text with something in it — one or two ` +
          `sentences saying what this ranking measures.`
      );
    }
    fail(entry, `${trail.join(".")} — ${issue.message}`);
  }

  if (trail[0] === "lede") {
    fail(
      `"lede"`,
      `must be text with something in it — the one sentence the page shows ` +
        `under its title.`
    );
  }

  if (trail[0] === "rankings") {
    fail(
      `"rankings"`,
      `must be a list of at least one ranking, each ` +
        `{ "name": "...", "url": "https://...", "description": "..." }.`
    );
  }

  if (issue.code === "unrecognized_keys" && trail.length === 0) {
    fail(
      "the file",
      `"${issue.keys.join('", "')}" is not a key this file has. It has two: ` +
        `"lede" and "rankings".`
    );
  }

  fail("the file", `${trail.join(".") || "the whole file"} — ${issue.message}`);
}

/**
 * Read and validate.
 *
 * Wrapped in React's `cache()` rather than held in a module-level constant,
 * for the reason `readSchedule` gives: a module constant survives an edit to
 * the file under `next dev` and keeps serving the old list (slice 015).
 */
const readRankings = cache(async (): Promise<AiRankings> => {
  const source = await readFile(rankingsFile, "utf8");

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

  const parsed = rankingsFileSchema.safeParse(raw);
  if (!parsed.success) describeSchemaFailure(parsed.error, raw);
  return parsed.data;
});

export async function getRankings(): Promise<AiRankings> {
  return readRankings();
}
