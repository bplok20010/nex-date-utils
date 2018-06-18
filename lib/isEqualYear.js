var format = require("./format");
/**
 * 判断是否同年
 * @param {Date} date1
 * @param {Date} date2
 * @return {Boolean} 
 */
module.exports = function isEqualYear(date1, date2) {
  return format(date1, 'Y') === format(date2, 'Y');
};