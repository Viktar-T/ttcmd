/**
 * Numbering that is identity rather than presentation.
 *
 * Constitution Article VI and ADR-0003: a lesson's letter is derived from its
 * `order` within the module and is never stored by hand — and never taken from
 * the lesson's position in a list. Those two are not the same thing and the
 * difference is visible today: the only lesson written in module 0 has
 * `order: 3`, so it is lesson **c** on a page where a and b do not exist yet.
 * Anything that numbers by array index produces **a**, looks entirely correct,
 * and is wrong.
 *
 * This lives in its own module because the navigation and contents-panel
 * slices need the same derivation, and a second copy is how one page comes to
 * disagree with another about what a lesson is called.
 */

const FIRST_LETTER = "a".charCodeAt(0);

/**
 * The letter for a lesson's `order`: 1 → "a", 3 → "c", 26 → "z".
 *
 * Total over its domain rather than defensive: `lessonFrontmatterSchema`
 * bounds `order` to an integer in 1..26, so an out-of-range value fails the
 * build at the schema (Article VIII) instead of arriving here and rendering a
 * bracket on a public page.
 */
export function lessonLetter(order: number): string {
  return String.fromCharCode(FIRST_LETTER + order - 1);
}

/**
 * The number a module's folder prefix carries: `01-jak-…` → 1, `00-start` → 0.
 *
 * Throws when the folder does not carry one. Article VI derives the number
 * from the prefix and from nothing else; deriving it from the folder's position
 * in the directory would be the same mistake ADR-0003 forbids for lesson
 * letters, with a different index — and *Moduł NaN* on a public page is worse
 * than a build that stops.
 */
export function moduleNumber(moduleSlug: string): number {
  const match = /^(\d+)-/.exec(moduleSlug);
  if (!match) {
    throw new Error(
      `content/moduly/${moduleSlug}: a module folder must begin with its ` +
        `number and a hyphen, as "01-slug". The module's number comes from ` +
        `that prefix and from nowhere else (constitution Article VI, ADR-0003).`
    );
  }
  return Number(match[1]);
}

/** What the module is called out loud, and in the breadcrumb: 1 → "Moduł 1". */
export function moduleLabel(number: number): string {
  return `Moduł ${number}`;
}

/**
 * A lesson's public name — the string a teacher says and a student types:
 * module 1, `order: 2` → "1b".
 *
 * One function, because the breadcrumb, the module list and the previous/next
 * controls all render it, and three spellings of it is how two pages come to
 * disagree about what a lesson is called.
 */
export function lessonId(moduleNumber: number, order: number): string {
  return `${moduleNumber}${lessonLetter(order)}`;
}
