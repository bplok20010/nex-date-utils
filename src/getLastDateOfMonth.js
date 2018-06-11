import getDaysInMonth from './getDaysInMonth';
/**
 * 获取本月最后一天
 * @param {Date} date The date
 * @return {Date}
 */
export default function getLastDateOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), getDaysInMonth(date));
}