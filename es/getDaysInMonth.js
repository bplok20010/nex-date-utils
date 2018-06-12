import isLeapYear from './isLeapYear';
import defs from './defines';

/**
 * 获取本月有多少天数
 * 还有个方法：日期设置上个月的日期为0，那么就可以得到这个月的最后一天日期
 * examples : date1.setDate(1);date1.setMonth( date1.getMonth()+1 );date1.setDate(0);return date1.getDate(); 	
 * @param {Date} date The date
 * @return {Number} 本月天数
 */
export default function getDaysInMonth(date) {
  // return a closure for efficiency
  const m = date.getMonth();
  return m == 1 && isLeapYear(date) ? 29 : defs.daysInMonth[m];
}