var defs = require("./defines");
var clone = require("./clone");
var getLastDateOfMonth = require("./getLastDateOfMonth");
var getFirstDateOfMonth = require("./getFirstDateOfMonth");
/**
 * 日期推移
 * @param {Date}
 * @param {String} interval 添加间隔类型 年y 月m 日d 小时h 分i 秒s 毫秒ms
 * @param {Int}	number 添加时间间隔值,可以是正负值
 */
module.exports = function add(date, interval, value) {
    var d = clone(date);
    if (!interval || value === 0) return d;

    switch (interval.toLowerCase()) {
        case defs.MILLI:
            d.setMilliseconds(d.getMilliseconds() + value);
            break;
        case defs.SECOND:
            d.setSeconds(d.getSeconds() + value);
            break;
        case defs.MINUTE:
            d.setMinutes(d.getMinutes() + value);
            break;
        case defs.HOUR:
            d.setHours(d.getHours() + value);
            break;
        case defs.DAY:
            d.setDate(d.getDate() + value);
            break;
        case defs.WEEKDAY:
            {
                //i18n FIXME: assumes Saturday/Sunday weekend, but this is not always true.  see dojo/cldr/supplemental

                // Divide the increment time span into weekspans plus leftover days
                // e.g., 8 days is one 5-day weekspan / and two leftover days
                // Can't have zero leftover days, so numbers divisible by 5 get
                // a days value of 5, and the remaining days make up the number of weeks
                var days = void 0,
                    weeks = void 0,
                    amount = parseInt(value, 10);
                var mod = amount % 5;
                if (!mod) {
                    days = amount > 0 ? 5 : -5;
                    weeks = amount > 0 ? (amount - 5) / 5 : (amount + 5) / 5;
                } else {
                    days = mod;
                    weeks = parseInt(amount / 5);
                }
                // Get weekday value for orig date param
                var strt = date.getDay();
                // Orig date is Sat / positive incrementer
                // Jump over Sun
                var adj = 0;
                if (strt == 6 && amount > 0) {
                    adj = 1;
                } else if (strt == 0 && amount < 0) {
                    // Orig date is Sun / negative incrementer
                    // Jump back over Sat
                    adj = -1;
                }
                // Get weekday val for the new date
                var trgt = strt + days;
                // New date is on Sat or Sun
                if (trgt == 0 || trgt == 6) {
                    adj = amount > 0 ? 2 : -2;
                }
                // Increment by number of weeks plus leftover days plus
                // weekend adjustments
                amount = 7 * weeks + days + adj;

                d = add(d, defs.DAY, amount);
            }
            break;
        case defs.WEEK:
            d = add(d, defs.DAY, value * 7);
            break;
        case defs.MONTH:
            {
                var day = date.getDate();
                if (day > 28) {
                    day = Math.min(day, getLastDateOfMonth(add(getFirstDateOfMonth(date), defs.MONTH, value)).getDate());
                }
                d.setDate(day);
                d.setMonth(date.getMonth() + value);
            }
            break;
        case defs.QUARTER:
            d = add(d, defs.MONTH, value * 3);
            break;
        case defs.YEAR:
            d.setFullYear(date.getFullYear() + value);
            break;
    }
    return d;
};