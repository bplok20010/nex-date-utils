/**
 * 判断两个日期是否相等
 * @param {Date} date1
 * @param {Date} date2
 * @return {Boolean} 
 */
module.exports = function isEqual(date1, date2) {
    // check we have 2 date objects
    if (date1 && date2) {
        return date1.getTime() === date2.getTime();
    }
    // one or both isn't a date, only equal if both are falsey
    return !(date1 || date2);
};