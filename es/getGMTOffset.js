import pad from './pad';
/**
 * Get the offset from GMT of the current date (equivalent to the format specifier 'O').
 * @param {Date} date The date
 * @param {Boolean} colon (optional) true to separate the hours and minutes with a colon (defaults to false).
 * @return {String} The 4-character offset string prefixed with + or - (e.g. '-0600').
 */
export default function getGMTOffset(date, colon) {
  const offset = date.getTimezoneOffset();
  return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60), 2, "0") + (colon ? ":" : "") + pad(Math.abs(offset % 60), 2, "0");
}