const stripEscapeRe = /(\\.)/g;
const hourInfoRe = /([gGhHisucUOPZ]|MS)/;
const dateInfoRe = /([djzmnYycU]|MS)/;
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const ms1d = 864e5; // milliseconds in a day
const ms7d = 7 * ms1d; // milliseconds in a week

const YEAR = 'y';
const MONTH = 'm';
const DAY = 'd';
const HOUR = 'h';
const MINUTE = 'i';
const SECOND = 's';
const MILLI = 'ms';
const WEEKDAY = 'wd';
const WEEK = 'w';
const QUARTER = 'q';

export default {
    stripEscapeRe,
    hourInfoRe,
    dateInfoRe,
    daysInMonth,
    ms1d,
    ms7d,
    YEAR,
    MONTH,
    DAY,
    HOUR,
    MINUTE,
    SECOND,
    MILLI,
    WEEKDAY,
    WEEK,
    QUARTER
}