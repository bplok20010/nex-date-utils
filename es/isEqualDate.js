import format from './format';
/**
 * 判断是否同日
 * @param {Date} date1
 * @param {Date} date2
 * @return {Boolean} 
 */
export default function isEqualDate(date1, date2) {
  return format(date1, 'Ymd') === format(date2, 'Ymd');
}