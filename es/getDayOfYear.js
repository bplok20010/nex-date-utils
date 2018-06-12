import clone from './clone';
import getDaysInMonth from './getDaysInMonth';

/**
 * 获取当前日期在本年的天数 从0开始
 * @param {Date} date The date
 * @return {Number} 0 to 364 (365 in leap years).
 */
export default function getDayOfYear(date) {
    let num = 0,
        d = clone(date),
        m = date.getMonth(),
        i;

    for (i = 0, d.setDate(1), d.setMonth(0); i < m; d.setMonth(++i)) {
        num += getDaysInMonth(d);
    }

    return num + date.getDate() - 1;
}