var getDaysInMonth = require("./getDaysInMonth");
/**
 * 获取本月最后一天
 * @param {Date} date The date
 * @return {Date}
 */
module.exports = function getLastDateOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), getDaysInMonth(date));
};