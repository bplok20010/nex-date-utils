var defs = require("./defines");
/** 
 * Get the difference in a specific unit of time (e.g., number of
 *	months, weeks, days, etc.) between two dates, rounded to the
 *	nearest integer.
 * @param {Date}
 * @param {Date?} Defaults now()
 * @param {String?} Defaults d
 * @return {Number}
 */
module.exports = function difference(date1, date2, interval) {
    date2 = date2 || new Date();
    interval = interval || defs.DAY;
    var yearDiff = date2.getFullYear() - date1.getFullYear();
    var delta = 1; // Integer return value
    //see dojo date
    switch (interval) {
        case defs.QUARTER:
            {
                var m1 = date1.getMonth();
                var m2 = date2.getMonth();
                // Figure out which quarter the months are in
                var q1 = Math.floor(m1 / 3) + 1;
                var q2 = Math.floor(m2 / 3) + 1;
                // Add quarters for any year difference between the dates
                q2 += yearDiff * 4;
                delta = q2 - q1;
            }
            break;
        case defs.WEEKDAY:
            {
                var days = Math.round(difference(date1, date2, defs.DAY));
                var weeks = parseInt(difference(date1, date2, defs.WEEK));
                var mod = days % 7;

                // Even number of weeks
                if (mod == 0) {
                    days = weeks * 5;
                } else {
                    // Weeks plus spare change (< 7 days)
                    var adj = 0;
                    var aDay = date1.getDay();
                    var bDay = date2.getDay();

                    weeks = parseInt(days / 7);
                    mod = days % 7;
                    // Mark the date advanced by the number of
                    // round weeks (may be zero)
                    var dtMark = new Date(date1);
                    dtMark.setDate(dtMark.getDate() + weeks * 7);
                    var dayMark = dtMark.getDay();

                    // Spare change days -- 6 or less
                    if (days > 0) {
                        switch (true) {
                            // Range starts on Sat
                            case aDay == 6:
                                adj = -1;
                                break;
                            // Range starts on Sun
                            case aDay == 0:
                                adj = 0;
                                break;
                            // Range ends on Sat
                            case bDay == 6:
                                adj = -1;
                                break;
                            // Range ends on Sun
                            case bDay == 0:
                                adj = -2;
                                break;
                            // Range contains weekend
                            case dayMark + mod > 5:
                                adj = -2;
                        }
                    } else if (days < 0) {
                        switch (true) {
                            // Range starts on Sat
                            case aDay == 6:
                                adj = 0;
                                break;
                            // Range starts on Sun
                            case aDay == 0:
                                adj = 1;
                                break;
                            // Range ends on Sat
                            case bDay == 6:
                                adj = 2;
                                break;
                            // Range ends on Sun
                            case bDay == 0:
                                adj = 1;
                                break;
                            // Range contains weekend
                            case dayMark + mod < 0:
                                adj = 2;
                        }
                    }
                    days += adj;
                    days -= weeks * 2;
                }
                delta = days;
            }
            break;
        case defs.YEAR:
            delta = yearDiff;
            break;
        case defs.MONTH:
            delta = date2.getMonth() - date1.getMonth() + yearDiff * 12;
            break;
        case defs.WEEK:
            // Truncate instead of rounding
            // Don't use Math.floor -- value may be negative
            delta = parseInt(difference(date1, date2, defs.DAY) / 7);
            break;
        case defs.DAY:
            delta /= 24;
        // fallthrough
        case defs.HOUR:
            delta /= 60;
        // fallthrough
        case defs.MINUTE:
            delta /= 60;
        // fallthrough
        case defs.SECOND:
            delta /= 1000;
        // fallthrough
        case defs.MILLI:
            delta *= date2.getTime() - date1.getTime();
    }

    // Round for fractional values and DST leaps
    return Math.round(delta); // Number (integer)	
};