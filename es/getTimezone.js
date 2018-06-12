/**
 * Get the timezone abbreviation of the current date (equivalent to the format specifier 'T').
 *
 * Note: The date string returned by the javascript Date object's toString() method varies
 * between browsers (e.g. FF vs IE) and system region settings (e.g. IE in Asia vs IE in America).
 * For a given date string e.g. "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)",
 * getTimezone() first tries to get the timezone abbreviation from between a pair of parentheses
 * (which may or may not be present), failing which it proceeds to get the timezone abbreviation
 * from the GMT offset portion of the date string.
 * @param {Date} date The date
 * @return {String} The abbreviated timezone name (e.g. 'CST', 'PDT', 'EDT', 'MPST' ...).
 */
export default function getTimezone(date) {
    // the following list shows the differences between date strings from different browsers on a WinXP SP2 machine from an Asian locale:
    //
    // Opera  : "Thu, 25 Oct 2007 22:53:45 GMT+0800" -- shortest (weirdest) date string of the lot
    // Safari : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always gives the correct timezone (same as FF)
    // FF     : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always gives the correct timezone
    // IE     : "Thu Oct 25 22:54:35 UTC+0800 2007" -- (Asian system setting) look for 3-4 letter timezone abbrev
    // IE     : "Thu Oct 25 17:06:37 PDT 2007" -- (American system setting) look for 3-4 letter timezone abbrev
    //
    // this crazy regex attempts to guess the correct timezone abbreviation despite these differences.
    // step 1: (?:\((.*)\) -- find timezone in parentheses
    // step 2: ([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?) -- if nothing was found in step 1, find timezone from timezone offset portion of date string
    // step 3: remove all non uppercase characters found in step 1 and 2
    return date.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "");
}