/**
 * Dates written once, rendered in whichever form the place asks for.
 *
 * `docs/content-style.md` §Mechanics fixes three visible forms and assigns them
 * to three places: a date in prose is `24 listopada 2025`, a date in a table or
 * in the sources list is `dd.mm.yyyy`, and the sources section opens with
 * `Stan na **yyyy-mm-dd**`. Until this slice an author typed whichever of the
 * three the moment called for, and one list in the corpus contains all three —
 * `content/interesting-to-read/czterdziesci-lat-zmian.mdx:401` writes
 * `sprawdzony 2026-08-29` inside a list that is otherwise `dd.mm.yyyy`.
 *
 * So the author writes ONE machine-readable form and the element chooses the
 * visible one (spec §7, decision 4). This module is where that choice is
 * spelled, once, rather than three times beside three components — which is how
 * the mixing happened in the first place.
 *
 * THREE PRECISIONS, AND THE RENDERING NEVER INVENTS ONE. A source may show a
 * day, a month or only a year, and the corpus has all three: `18.04.2023`,
 * `sierpień 2026`, `1998`. A date model that stored a `Date` would have to
 * choose a day for a month-precision source and would then print it.
 */

export interface ContentDate {
  year: number;
  /** 1–12, absent when the source shows only a year. */
  month?: number;
  /** 1–31, absent unless `month` is present too. */
  day?: number;
}

/*
 * POLISH INFLECTS, AND THAT IS WHY THERE ARE TWO TABLES.
 *
 * A day-month-year date puts the month in the genitive — `24 listopada 2025` —
 * and a month standing alone stays in the nominative — `sierpień 2026`. The
 * corpus already writes both. One table produces `24 listopad 2025` or
 * `sierpnia 2026`; both are wrong, both look plausible, and neither is a build
 * failure.
 *
 * WRITTEN OUT RATHER THAN ASKED OF `Intl.DateTimeFormat("pl-PL")`, which needs
 * no table and is correct on a full-ICU Node — and on a small-ICU build falls
 * back to English silently, on a public page, with no error. That is the same
 * class of failure as ADR-0005's missing font subset and Check C's undefined
 * variable, and `lib/section-anchors.ts` already answers the identical question
 * about a different Polish mapping the same way.
 */
const MONTHS_GENITIVE = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
];

const MONTHS_NOMINATIVE = [
  "styczeń",
  "luty",
  "marzec",
  "kwiecień",
  "maj",
  "czerwiec",
  "lipiec",
  "sierpień",
  "wrzesień",
  "październik",
  "listopad",
  "grudzień",
];

const SHAPE = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/;

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function daysIn(year: number, month: number): number {
  return month === 2 && isLeapYear(year) ? 29 : DAYS_IN_MONTH[month - 1];
}

/**
 * `2025-02-02`, `2026-08` or `2019` — and nothing else.
 *
 * Throws rather than returning a partial value. The caller is a rehype plugin
 * collecting build failures, so a date that is not a date stops the build in
 * front of its author rather than rendering as `NaN.NaN.2026` on a public page
 * (spec §8).
 *
 * `31.04` is refused as well as `2026-13`: an impossible day is a typo that a
 * lenient parser rolls forward into 1 May, silently changing a date the reader
 * is being asked to trust.
 */
export function parseContentDate(value: string): ContentDate {
  const match = SHAPE.exec(value.trim());
  if (!match) {
    throw new Error(
      `"${value}" is not a date. Write it as yyyy-mm-dd, or as yyyy-mm or ` +
        `yyyy when the source itself shows no more than that — the rendering ` +
        `never invents a precision you did not write.`
    );
  }

  const year = Number(match[1]);
  if (match[2] === undefined) return { year };

  const month = Number(match[2]);
  if (month < 1 || month > 12) {
    throw new Error(`"${value}" has no month ${month}.`);
  }
  if (match[3] === undefined) return { year, month };

  const day = Number(match[3]);
  if (day < 1 || day > daysIn(year, month)) {
    throw new Error(
      `"${value}" has no day ${day} — ${MONTHS_NOMINATIVE[month - 1]} ` +
        `${year} has ${daysIn(year, month)}.`
    );
  }
  return { year, month, day };
}

/** `2 lutego 2025` · `sierpień 2026` · `2019` — a date inside a sentence. */
export function formatDateProse(date: ContentDate): string {
  if (date.month === undefined) return String(date.year);
  if (date.day === undefined) {
    return `${MONTHS_NOMINATIVE[date.month - 1]} ${date.year}`;
  }
  return `${date.day} ${MONTHS_GENITIVE[date.month - 1]} ${date.year}`;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** `02.02.2025` · `08.2026` · `2019` — a date in a reference list. */
export function formatDateList(date: ContentDate): string {
  if (date.month === undefined) return String(date.year);
  if (date.day === undefined) return `${pad(date.month)}.${date.year}`;
  return `${pad(date.day)}.${pad(date.month)}.${date.year}`;
}

/**
 * `2025-02-02` · `2026-08` · `2019` — what the author wrote, normalised.
 *
 * Two uses, and they are the same string by construction: the visible form
 * after *Stan na*, which `docs/content-style.md` fixes as ISO, and the machine
 * -readable value on every `<time>` element the elements render. All three
 * outputs are valid HTML datetime values at their own precision.
 */
export function formatDateIso(date: ContentDate): string {
  if (date.month === undefined) return String(date.year);
  if (date.day === undefined) return `${date.year}-${pad(date.month)}`;
  return `${date.year}-${pad(date.month)}-${pad(date.day)}`;
}
