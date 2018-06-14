var defs = require("./defines");
var add = require("./add");

/**
 * Checks if the passed Date parameters will cause a javascript Date "rollover".
 * @param {Number} year 4-digit year
 * @param {Number} month 1-based month-of-year
 * @param {Number} day Day of month
 * @param {Number} hour (optional) Hour
 * @param {Number} minute (optional) Minute
 * @param {Number} second (optional) Second
 * @param {Number} millisecond (optional) Millisecond
 * @return {Boolean} true if the passed parameters do not cause a Date "rollover", false otherwise.
 */
module.exports = function isValid(y, m, d, h, i, s, ms) {
    // setup defaults
    h = h || 0;
    i = i || 0;
    s = s || 0;
    ms = ms || 0;

    // Special handling for year < 100
    var dt = add(new Date(y < 100 ? 100 : y, m - 1, d, h, i, s, ms), defs.YEAR, y < 100 ? y - 100 : 0);

    return y == dt.getFullYear() && m == dt.getMonth() + 1 && d == dt.getDate() && h == dt.getHours() && i == dt.getMinutes() && s == dt.getSeconds() && ms == dt.getMilliseconds();
};