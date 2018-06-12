var stripEscapeRe = /(\\.)/g;
var hourInfoRe = /([gGhHisucUOPZ]|MS)/;
var dateInfoRe = /([djzmnYycU]|MS)/;
var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var ms1d = 864e5; // milliseconds in a day
var ms7d = 7 * ms1d; // milliseconds in a week

var YEAR = 'y';
var MONTH = 'm';
var DAY = 'd';
var HOUR = 'h';
var MINUTE = 'i';
var SECOND = 's';
var MILLI = 'ms';
var WEEKDAY = 'wd';
var WEEK = 'w';
var QUARTER = 'q';

module.exports = {
    stripEscapeRe: stripEscapeRe,
    hourInfoRe: hourInfoRe,
    dateInfoRe: dateInfoRe,
    daysInMonth: daysInMonth,
    ms1d: ms1d,
    ms7d: ms7d,
    YEAR: YEAR,
    MONTH: MONTH,
    DAY: DAY,
    HOUR: HOUR,
    MINUTE: MINUTE,
    SECOND: SECOND,
    MILLI: MILLI,
    WEEKDAY: WEEKDAY,
    WEEK: WEEK,
    QUARTER: QUARTER
};