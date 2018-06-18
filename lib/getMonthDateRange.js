var getFirstDateOfMonth = require("./getFirstDateOfMonth");
var getLastDateOfMonth = require("./getLastDateOfMonth");
var add = require("./add");
var defs = require("./defines");
var defaultTo = require("./defaultTo");
/**
 * 获取指定日期所在月份的显示范围
 * 日历显示最少会有28~42天，7天一行，二月有可能只有28天
 * @param {date} date 日期
 * @param {object?} options 相关配置参数
 * @param {boolean} [options.showOtherMonths=true] 默认会显示42(7x6)天的日期格式，否则就有可能是28(7x4)天 35(7x5)天
 * @param {number} [options.firstDay=0] 默认一周中的第一天 0-6 星期天-星期六
 * @return {array<start, end>}
 */
module.exports = function getMonthDateRange(date) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var defaults = {
        showOtherMonths: true,
        firstDay: 0
    };

    var showOtherMonths = defaultTo(options.showOtherMonths, defaults.showOtherMonths);
    var firstDay = defaultTo(options.firstDay, defaults.firstDay);

    var start = getFirstDateOfMonth(date),
        end = getLastDateOfMonth(date);

    var startDay = start.getDay();
    var startOffset = startDay >= firstDay ? startDay - firstDay : 7 - (firstDay - startDay);
    start = add(start, defs.DAY, -startOffset);

    //方法一
    //end日期可通过 (start + 当月天数 + startOffset) 最后取 end + (end - start)的天数 % 7
    //方法二 找规律
    var endDay = end.getDay();
    var endOffset = firstDay <= endDay ? 7 - (endDay - firstDay + 1) : firstDay - endDay - 1;
    end = add(end, defs.DAY, endOffset);

    //日期开始和结尾必定有上个月和下个月的日期信息
    if (showOtherMonths) {
        //开始日期为月初则+7天
        if (start.getDate() === 1) {
            start = add(start, defs.DAY, -7);
        }
        //
        end = add(start, defs.DAY, 41);
    }

    return [start, end];
};