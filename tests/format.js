const format = require('../lib/format')
const getParseCode = require('../lib/getParseCode');
const parser = require('../lib/parse');
const getMonthDateRange = require('../lib/getMonthDateRange');

const c_date = new Date(1529319203799);

console.log(format(c_date, 'w D j l N S W F M n t L o y a A G g Y-m-d H:i:s z'));

console.log(format(c_date, 'c U Q q Z (T) P O I u'));

console.log(format(c_date, 'r'));

console.log(format(c_date, 'e'));

console.log(format(c_date, 'B'));

console.log("================================")

console.log(format(c_date, 'c'));

console.log(format(c_date, 'U'));

const pattern = Object.keys(getParseCode.parseCodes).filter(u => ['U'].indexOf(u) == -1).join('###');

let ret = format(c_date, pattern);

const ret2 = parser(ret, pattern);

console.log(c_date.getTime(), ret, ret2.getTime(), ret2.getTime() - c_date.getTime());

console.log('==============parser===============')

console.log(format(c_date, 'D, m M Y'));
console.log(format(c_date, 'l, m-M-y'));
console.log(format(c_date, 'D, j M y'));

const tests = [
    '2017-08-09',
    '2017/08/09',
    '2017/08/09T23:12:00',
    '2017-08-09T13:10:00+08:00',
    '2017-08-09T13:12:00Z',
    '20170809T131300Z',
    '1529319203',
    'Mon, 06 Jun 2018'
];

tests.forEach(v => {
    let ret = parser(v);
    console.log(format(ret, 'c'));
})

console.log('=============getMonthDateRange========')

ret = getMonthDateRange(c_date);
console.log(format(ret[0]), format(ret[1]))