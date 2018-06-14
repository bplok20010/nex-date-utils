import defs from './defines';
import add from './add';
import clone from './clone';

/**
 * Attempts to clear all time information from this Date by setting the time to midnight of the same day,
 * automatically adjusting for Daylight Saving Time (DST) where applicable.
 * (note: DST timezone information for the browser's host operating system is assumed to be up-to-date)
 * @param {Date} date The date
 * @param {Boolean} clone true to create a clone of this date, clear the time and return it (defaults to false).
 * @return {Date} this or the clone.
 */
export default function clearTime(date, isClone) {
    if (isClone) {
        return clearTime(clone(date));
    }

    // get current date before clearing time
    const d = date.getDate();

    // clear time
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    if (date.getDate() != d) { // account for DST (i.e. day of month changed when setting hour = 0)
        // note: DST adjustments are assumed to occur in multiples of 1 hour (this is almost always the case)
        // refer to http://www.timeanddate.com/time/aboutdst.html for the (rare) exceptions to this rule

        let hr, c;
        // increment hour until cloned date == current date
        for (hr = 1, c = add(date, defs.HOUR, hr); c.getDate() != d; hr++, c = add(date, defs.HOUR, hr));

        date.setDate(d);
        date.setHours(c.getHours());
    }

    return date;
}