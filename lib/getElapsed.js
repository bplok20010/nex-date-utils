/**
 * 返回2日期之间的毫秒数
 * @param {Date} dateA The first date
 * @param {Date} dateB (optional) The second date, defaults to now
 * @return {Number} The difference in milliseconds
 */
module.exports = function getElapsed(dateA, dateB) {
  return Math.abs(dateA - (dateB || new Date()));
};