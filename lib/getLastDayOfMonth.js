var getLastDateOfMonth = require("./getLastDateOfMonth");
/**
 * @param {Date} date The date
 * @return {Number} The day number (0-6).
 */
module.exports = function getLastDayOfMonth(date) {
  return getLastDateOfMonth(date).getDay();
};