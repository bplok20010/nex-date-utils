import defines from './defines';
import escapeRegex from './escapeRegex';
import isFunction from './isFunction';
import defaultTo from './defaultTo';
import clearTime from './clearTime';
import getParseCode from './getParseCode';
import add from './add';
import isLeapYear from './isLeapYear';
import isValid from './isValid';

const parseFunctions = {};

export default function createParser(format) {
    if (parseFunctions[format]) {
        return parseFunctions[format];
    }
    //eg: step1: foramt = Y-m-d\s
    let obj,
        calc = [],
        reg = ['['],
        _reg = [],
        //reg2 = [],
        parseCodes = getParseCode.parseCodes,
        _format = format;
    format = escapeRegex(format);

    //eg: after escapeRegex => step2: foramt = Y\-m\-d\\s //此处的\s不应该转成\\s 所以后续需要转回\s	

    for (let k in parseCodes) {
        _reg.push(k);
        //reg2.push('\\\\' + k);
    }

    reg.push(_reg.join('|'));

    reg.push(']');

    reg = reg.join('');

    // format = format.replace(new RegExp(reg2.join('|', 'g')), function(ch) {
    //     return ch.replace('\\', '');
    // });
    //eg: step3: foramt = Y\-m\-d\s

    var parseRegex = new RegExp(reg, 'g');

    var regExp = format.replace(parseRegex, function(ch) {
        // if (ch.charAt(0) == "\\") return ch.slice(1);

        obj = getParseCode(ch);

        if (obj.f) {
            calc.push(obj);
        }

        return obj.r;
    });

    function parser(input, strict) {
        let ret = input.match(regExp);
        if (!ret) return;

        let dt, y, m, d, h, i, s, ms, o, z, zz, v,
            sn, hr, mn,
            date = {},
            fnCall = [],
            fnCallEnd = [];

        for (let i = 0; i < calc.length; i++) {
            let obj = calc[i];
            let match = ret[i + 1];
            if (obj.calcAtEnd) {
                fnCallEnd.push({ fn: obj.f, params: [match, date, strict, i + 1, ret] });
            } else {
                fnCall.push({ fn: obj.f, params: [match, date, strict, i + 1, ret] });
            }
        }

        for (let i = 0, calls = fnCall.concat(fnCallEnd); i < calls.length; i++) {
            let obj = calls[i];
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

            z = date.z;

            if (z >= 0 && y >= 0) {
                // both the year and zero-based day of year are defined and >= 0.
                // these 2 values alone provide sufficient info to create a full date object

                // create Date object representing January 1st for the given year
                // handle years < 100 appropriately
                v = add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), defines.YEAR, y < 100 ? y - 100 : 0);

                // then add day of year, checking for Date "rollover" if necessary
                v = !strict ? v : (strict === true && (z <= 364 || (isLeapYear(v) && z <= 365)) ? add(v, defines.DAY, z) : null);
            } else if (strict === true && !isValid(y, m + 1, d, h, i, s, ms)) { // check for Date "rollover"
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