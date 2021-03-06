/**
 * Checks if a date falls on or between the given start and end dates.
 * @param {Date} date The date to check
 * @param {Date} start Start date
 * @param {Date} end End date
 * @return {Boolean} true if this date falls on or between the given start and end dates.
 */
module.exports = function between(date, start, end) {
  var t = date.getTime();
  return start.getTime() <= t && t <= end.getTime();
};