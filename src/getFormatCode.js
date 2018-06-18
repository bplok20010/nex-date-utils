import options from './options';
import pad from './pad';
import getShortDayName from './getShortDayName';
import getSuffix from './getSuffix';
import getDayOfYear from './getDayOfYear';
import getWeekOfYear from './getWeekOfYear';
import getDaysInMonth from './getDaysInMonth';
import isLeapYear from './isLeapYear';
import getGMTOffset from './getGMTOffset';
import getTimezone from './getTimezone';
import isDST from './isDST';
import getShortMonthName from './getShortMonthName';
import getTimezoneName from './getTimezoneName';

//see http://php.net/manual/zh/function.date.php
const formatCodes = {
    //月份中的第几天，有前导零的 2 位数字   01 到 31
    d: function(date) {
        return pad(date.getDate(), 2, '0');
    },
    //星期中的第几天，文本表示，3 个字母    	Mon 到 Sun
    D: function(date) {
        return getShortDayName(date.getDay());
    },
    //月份中的第几天，没有前导零    1 到 31
    j: function(date) {
        return date.getDate();
    },
    //星期几，完整的文本格式    Sunday 到 Saturday
    l: function(date) {
        return options.dayNames[date.getDay()];
    },
    //ISO-8601 格式数字表示的星期中的第几天 1（表示星期一）到 7（表示星期天）
    N: function(date) {
        return date.getDay() ? date.getDay() : 7;
    },
    //每月天数后面的英文后缀，2 个字符  st，nd，rd 或者 th。可以和 j 一起用
    S: function(date) {
        return getSuffix(date);
    },
    //星期中的第几天，数字表示  0（表示星期天）到 6（表示星期六）
    w: function(date) {
        return date.getDay();
    },
    //年份中的第几天   0 到 365 
    z: function(date) {
        return getDayOfYear(date);
    },
    //ISO-8601 格式年份中的第几周，每周从星期一开始 例如：42（当年的第 42 周）
    W: function(date) {
        return pad(getWeekOfYear(date), 2, '0');
    },
    //月份，完整的文本格式，例如 January 或者 March。 January 到 December
    F: function(date) {
        return options.monthNames[date.getMonth()];
    },
    //数字表示的月份，有前导零  01 到 12
    m: function(date) {
        return pad(date.getMonth() + 1, 2, '0');
    },
    //三个字母缩写表示的月份    Jan 到 Dec
    M: function(date) {
        return getShortMonthName(date.getMonth());
    }, // get localised short month name
    //数字表示的月份，没有前导零    1 到 12
    n: function(date) {
        return date.getMonth() + 1;
    },
    //指定的月份有几天  28 到 31
    t: function(date) {
        return getDaysInMonth(date);
    },
    //是否为闰年    如果是闰年为 1，否则为 0
    L: function(date) {
        return isLeapYear(date) ? 1 : 0;
    },
    //ISO-8601 格式年份数字。这和 Y 的值相同，只除了如果 ISO 的星期数（W）属于前一年或下一年，则用那一年。
    //Examples: 1999 or 2003
    o: function(date) {
        return date.getFullYear() + (getWeekOfYear(date) == 1 && date.getMonth() > 0 ? +1 : (getWeekOfYear(date) >= 52 && date.getMonth() < 11 ? -1 : 0));
    },
    //4 位数字完整表示的年份    例如：1999 或 2003
    Y: function(date) {
        return pad(date.getFullYear(), 4, '0');
    },
    //2 位数字表示的年份    例如：99 或 03
    y: function(date) {
        return ('' + date.getFullYear()).substring(2, 4);
    },
    //小写的上午和下午值    am 或 pm
    a: function(date) {
        return date.getHours() < 12 ? 'am' : 'pm';
    },
    //大写的上午和下午值    AM 或 PM
    A: function(date) {
        return date.getHours() < 12 ? 'AM' : 'PM';
    },
    //Swatch Internet 标准时    	000 到 999
    B: function(date) {
        // summary:
        //		Swatch Internet time
        //		A day is 1,000 beats. All time is measured from GMT + 1
        let off = date.getTimezoneOffset() + 60;
        let secs = (date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds() + (off * 60);
        let beat = Math.abs(Math.floor(secs / 86.4) % 1000) + "";
        while (beat.length < 2) beat = "0" + beat;
        return beat;
    },
    //小时，12 小时格式，没有前导零 1 到 12
    g: function(date) {
        return (date.getHours() % 12) ? date.getHours() % 12 : 12;
    },
    //小时，24 小时格式，没有前导零 0 到 23
    G: function(date) {
        return date.getHours();
    },
    //小时，12 小时格式，有前导零   	01 到 12
    h: function(date) {
        return pad((date.getHours() % 12) ? date.getHours() % 12 : 12, 2, '0');
    },
    //小时，24 小时格式，有前导零   00 到 23
    H: function(date) {
        return pad(date.getHours(), 2, '0')
    },
    //有前导零的分钟数  00 到 59>
    i: function(date) {
        return pad(date.getMinutes(), 2, '0');
    },
    //秒数，有前导零    00 到 59>
    s: function(date) {
        return pad(date.getSeconds(), 2, '0');
    },
    //毫秒  示例: 321
    u: function(date) {
        return pad(date.getMilliseconds(), 3, '0')
    },
    //时区标识  例如：UTC，GMT，Atlantic/Azores
    e: function(date) {
        return getTimezoneName(date);
    },
    //是否为夏令时  如果是夏令时为 1，否则为 0
    I: function(date) {
        return isDST(date) ? 1 : 0;
    },
    //与格林威治时间相差的小时数    例如：+0200
    O: function(date) {
        return getGMTOffset(date);
    },
    //与格林威治时间（GMT）的差别，小时和分钟之间有冒号分隔 例如：+02:00
    P: function(date) {
        return getGMTOffset(date, true);
    },
    //本机所在的时区    例如：EST，MDT
    T: function(date) {
        return getTimezone(date);
    },
    //时差偏移量的秒数。UTC 西边的时区偏移量总是负的，UTC 东边的时区偏移量总是正的。
    //-43200 到 43200
    Z: function(date) {
        return date.getTimezoneOffset() * -60;
    },
    //ISO 8601 格式的日期   2004-02-12T15:19:21+00:00
    c: function(date) { //ISO-8601 -- GMT format
        return [
            getFormatCode('Y')(date),
            '-',
            getFormatCode('m')(date),
            '-',
            getFormatCode('d')(date),
            'T',
            getFormatCode('H')(date),
            ':',
            getFormatCode('i')(date),
            ':',
            getFormatCode('s')(date),
            getFormatCode('P')(date)
        ].join('');
    },
    //RFC 822 格式的日期    例如：Thu, 21 Dec 2000 16:01:07 +0200
    r: function(date) {
        return [
            getFormatCode('D')(date),
            ', ',
            getFormatCode('d')(date),
            ' ',
            getFormatCode('M')(date),
            ' ',
            getFormatCode('Y')(date),
            ' ',
            getFormatCode('H')(date),
            ':',
            getFormatCode('i')(date),
            ':',
            getFormatCode('s')(date),
            ' ',
            getFormatCode('O')(date)
        ].join('');
    },
    //从 Unix 纪元（January 1 1970 00:00:00 GMT）开始至今的秒数
    U: function(date) {
        return Math.round(date.getTime() / 1000);
    },
    //季度，有前导零   	01 到 04
    Q: function(date) {
        return pad(Math.ceil((date.getMonth() + 1) / 3), 2, '0');
    },
    //季度，没前导零   	1 到 4
    q: function(date) {
        return Math.ceil((date.getMonth() + 1) / 3);
    }
};

function getFormatCode(code) {
    const f = formatCodes[code];
    return function(date) {
        if (f) return f(date);
        return code;
    };
}

export default getFormatCode;