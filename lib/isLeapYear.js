var isDate = require("./isDate");
/**
 * 判断当前年份是否闰年
 * @param {int|Date} year 年份或者日期对象
 * @return {boolean}
 */
module.exports = function isLeapYear(year) {
  year = isDate(year) ? year.getFullYear() : parseInt(year, 10);
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
};