const format = require('../lib/format')

const c_date = new Date();

console.log(format(c_date, 'w D j l N S W F M n t L o y a A G g Y-m-d H:i:s z'));

console.log(format(c_date, 'c U Q q Z (T) P O I u'));

console.log(format(c_date, 'r'));

console.log(format(c_date, 'e'));

console.log(format(c_date, 'B'));