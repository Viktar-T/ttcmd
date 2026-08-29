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
