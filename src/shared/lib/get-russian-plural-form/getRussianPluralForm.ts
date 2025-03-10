/**
 * Returns the correct plural form of a Russian word based on the given number.
 * Russian language has specific rules for pluralization depending on the last digit(s) of the number.
 *
 * @param {number} number - The number to determine the plural form for.
 * @param {[string, string, string]} wordForms - An array of three word forms:
 *   - wordForms[0]: Singular form (for 1).
 *   - wordForms[1]: Plural form for numbers ending in 2–4 (except 12–14).
 *   - wordForms[2]: Plural form for numbers ending in 0, 5–9, or 11–14.
 * @returns {string} The correct plural form of the word based on the number.
 *
 * @example
 * // Returns "1 звезда" (singular form for 1)
 * getRussianPluralForm(1, ["звезда", "звезды", "звезд"]);
 *
 * @example
 * // Returns "3 звезды" (plural form for 2–4)
 * getRussianPluralForm(3, ["звезда", "звезды", "звезд"]);
 *
 * @example
 * // Returns "5 звезд" (plural form for 5–20, 25–30, etc.)
 * getRussianPluralForm(5, ["звезда", "звезды", "звезд"]);
 *
 * @example
 * // Returns "1 яблоко" (singular form for 1)
 * getRussianPluralForm(1, ["яблоко", "яблока", "яблок"]);
 *
 * @example
 * // Returns "3 яблока" (plural form for 2–4)
 * getRussianPluralForm(3, ["яблоко", "яблока", "яблок"]);
 *
 * @example
 * // Returns "10 яблок" (plural form for 5–20, 25–30, etc.)
 * getRussianPluralForm(10, ["яблоко", "яблока", "яблок"]);
 */
export const getRussianPluralForm = (
  number: number,
  wordForms: [string, string, string]
) => {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${number} ${wordForms[2]}`;
  }

  if (lastDigit === 1) {
    return `${number} ${wordForms[0]}`;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${number} ${wordForms[1]}`;
  }
  return `${number} ${wordForms[2]}`;
};
