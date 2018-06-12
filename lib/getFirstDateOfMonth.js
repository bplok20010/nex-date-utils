/**
 * 获取本月第一天
 * @param {Date} date The date
 * @return {Date}
 */
module.exports = function getFirstDateOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};