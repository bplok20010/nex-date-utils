/**
 * Get the English ordinal suffix of the current day (equivalent to the format specifier 'S').
 * @param {Date} date The date
 * @return {String} 'st, 'nd', 'rd' or 'th'.
 */
export default function getSuffix(date) {
    switch (date.getDate()) {
        case 1:
        case 21:
        case 31:
            return "st";
        case 2:
        case 22:
            return "nd";
        case 3:
        case 23:
            return "rd";
        default:
            return "th";
    }
}