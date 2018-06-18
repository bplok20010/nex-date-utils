var format = require("./format");
/**
 * 判断是否同日
 * @param {Date} date1
 * @param {Date} date2
 * @return {Boolean} 
 */
module.exports = function isEqualDate(date1, date2) {
  return format(date1, 'Ymd') === format(date2, 'Ymd');
};