import format from './format';
/**
 * 判断是否同年
 * @param {Date} date1
 * @param {Date} date2
 * @return {Boolean} 
 */
export default function isEqualYear(date1, date2) {
  return format(date1, 'Y') === format(date2, 'Y');
}