var clone = require("./clone");
var getDaysInMonth = require("./getDaysInMonth");

/**
 * 获取当前日期在本年的天数 从0开始
 * @param {Date} date The date
 * @return {Number} 0 to 364 (365 in leap years).
 */
module.exports = function getDayOfYear(date) {
    var num = 0,
        d = clone(date),
        m = date.getMonth(),
        i = void 0;

    for (i = 0, d.setDate(1), d.setMonth(0); i < m; d.setMonth(++i)) {
        num += getDaysInMonth(d);
    }

    return num + date.getDate() - 1;
};