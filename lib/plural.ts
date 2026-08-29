/**
 * Polish plural selection.
 *
 * Polish has three plural forms and a count that picks between them by the last
 * two digits, not by "one or more than one". `1 lekcja`, `2 lekcje`,
 * `5 lekcji`, `22 lekcje`, `12 lekcji`. Getting it wrong is not a rounding
 * error to a Polish reader — `5 lekcje` reads the way `5 lesson` reads in
 * English, and this text sits on the landing page.
 *
 * Article III puts student-facing text in Polish; this is the rule that lets a
 * derived number be written in it.
 */
export function polishPlural(
  count: number,
  one: string,
  few: string,
  many: string
): string {
  const lastDigit = count % 10;
  const lastTwo = count % 100;

  if (count === 1) return one;
  if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) {
    return few;
  }
  return many;
}
