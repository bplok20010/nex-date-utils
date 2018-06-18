import format from './format';
/**
 * 判断是否同月
 * @param {Date} date1
 * @param {Date} date2
 * @return {Boolean} 
 */
export default function isEqualMonth(date1, date2) {
  return format(date1, 'Ym') === format(date2, 'Ym');
}