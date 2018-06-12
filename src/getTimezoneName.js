//dojo/date.js
export default function getTimezoneName(dateObject) {
    // summary:
    //		Get the user's time zone as provided by the browser
    // dateObject:
    //		Needed because the timezone may vary with time (daylight savings)
    // description:
    //		Try to get time zone info from toString or toLocaleString method of
    //		the Date object -- UTC offset is not a time zone.  See
    //		http://www.twinsun.com/tz/tz-link.htm Note: results may be
    //		inconsistent across browsers.

    let str = dateObject.toString(); // Start looking in toString
    let tz = ''; // The result -- return empty string if nothing found
    let match;

    // First look for something in parentheses -- fast lookup, no regex
    let pos = str.indexOf('(');
    if (pos > -1) {
        tz = str.substring(++pos, str.indexOf(')'));
    } else {
        // If at first you don't succeed ...
        // If IE knows about the TZ, it appears before the year
        // Capital letters or slash before a 4-digit year
        // at the end of string
        let pat = /([A-Z/]+) \d{4}$/;
        if ((match = str.match(pat))) {
            tz = match[1];
        } else {
            // Some browsers (e.g. Safari) glue the TZ on the end
            // of toLocaleString instead of putting it in toString
            str = dateObject.toLocaleString();
            // Capital letters or slash -- end of string,
            // after space
            pat = / ([A-Z/]+)$/;
            if ((match = str.match(pat))) {
                tz = match[1];
            }
        }
    }

    // Make sure it doesn't somehow end up return AM or PM
    return (tz == 'AM' || tz == 'PM') ? '' : tz; // String
}