import defines from './defines';
import isFunction from './isFunction';
import defaultTo from './defaultTo';
import clearTime from './clearTime';
import getParseCode from './getParseCode';
import add from './add';
import isValid from './isValid';

const parseFunctions = {};

function escape(str) {
    return str.replace(/('|\\)/g, '\\$1');
}

export default function createParser(format) {
    if (parseFunctions[format]) {
        return parseFunctions[format];
    }
    let obj,
        calc = [],
        regex = [],
        ch = "",
        special = false,
        i = 0,
        len = format.length,
        _format = format;

    for (; i < len; ++i) {
        ch = format.charAt(i);
        if (!special && ch == "\\") {
            special = true;
        } else if (special) {
            special = false;
            regex.push(escape(ch));
        } else {
            obj = getParseCode(ch);

            if (!obj) {
                regex.push(ch);
                continue;
            }

            regex.push(obj.r);

            if (obj.f) {
                calc.push(obj);
            }
        }
    }

    var regExp = new RegExp(regex.join(''));

    function parser(input, strict) {
        let ret = input.match(regExp);
        if (!ret) return;

        let dt, y, m, d, h, i, s, ms, o, zz, v,
            sn, hr, mn,
            date = {},
            fnCall = [],
            fnCallEnd = [];

        for (let i = 0; i < calc.length; i++) {
            let obj = calc[i];
            let match = ret[i + 1];

            if (obj.calcAtEnd) {
                fnCallEnd.push({ fn: obj.f, params: [match, date, strict, i + 1] });
            } else {
                fnCall.push({ fn: obj.f, params: [match, date, strict, i + 1] });
            }
        }

        fnCall = fnCall.concat(fnCallEnd);

        for (let i = 0; i < fnCall.length; i++) {
            let obj = fnCall[i];
            if (obj.fn && isFunction(obj.fn)) {
                obj.fn(...obj.params);
            }
        }

        if (date.u != null) {
            v = new Date(date.u * 1000);
        } else {
            dt = clearTime(new Date);

            y = defaultTo(date.y, dt.getFullYear());
            m = defaultTo(date.m, dt.getMonth());
            d = defaultTo(date.d, dt.getDate());

            h = defaultTo(date.h, dt.getHours());
            i = defaultTo(date.i, dt.getMinutes());
            s = defaultTo(date.s, dt.getSeconds());
            ms = defaultTo(date.ms, dt.getMilliseconds());

            if (strict === true && !isValid(y, m + 1, d, h, i, s, ms)) { // check for Date "rollover"
                v = null; // invalid date, so return null
            } else {
                // plain old Date object
                // handle years < 100 properly
                v = add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), defines.YEAR, y < 100 ? y - 100 : 0);
            }

        }

        if (v) {
            zz = date.zz;
            o = date.o;
            // favour UTC offset over GMT offset
            if (zz != null) {
                // reset to UTC, then add offset
                v = add(v, defines.SECOND, -v.getTimezoneOffset() * 60 - zz);
            } else if (o) {
                sn = date.sn;
                hr = date.hr;
                mn = date.mn;
                // reset to GMT, then add offset
                v = add(v, defines.MINUTE, -v.getTimezoneOffset() + (sn == '+' ? -1 : 1) * (hr * 60 + mn));
            }
        }

        return v;
    }

    parseFunctions[_format] = parser;

    return parser;
}