/**
 * 获取本月第一天
 * @param {Date} date The date
 * @return {Date}
 */
export default function getFirstDateOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}