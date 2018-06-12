/**
 * @param {Date} date The date
 * @return {Number} The day number (0-6).
 */
export default function getFirstDayOfMonth(date) {
  const day = (date.getDay() - (date.getDate() - 1)) % 7;
  return day < 0 ? day + 7 : day;
}