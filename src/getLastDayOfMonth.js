import getLastDateOfMonth from './getLastDateOfMonth';
/**
 * @param {Date} date The date
 * @return {Number} The day number (0-6).
 */
export default function getLastDayOfMonth(date) {
    return getLastDateOfMonth(date).getDay();
}