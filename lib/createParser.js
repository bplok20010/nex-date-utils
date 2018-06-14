function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defines = require("./defines");
var escapeRegex = require("./escapeRegex");
var isFunction = require("./isFunction");
var defaultTo = require("./defaultTo");
var clearTime = require("./clearTime");
var getParseCode = require("./getParseCode");
var add = require("./add");
var isLeapYear = require("./isLeapYear");
var isValid = require("./isValid");

var parseFunctions = {};

module.exports = function createParser(format) {
    if (parseFunctions[format]) {
        return parseFunctions[format];
    }
    //eg: step1: foramt = Y-m-d\s
    var obj = void 0,
        calc = [],
        reg = ['['],
        _reg = [],

    //reg2 = [],
    parseCodes = getParseCode.parseCodes,
        _format = format;
    format = escapeRegex(format);

    //eg: after escapeRegex => step2: foramt = Y\-m\-d\\s //此处的\s不应该转成\\s 所以后续需要转回\s	

    for (var k in parseCodes) {
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

    var regExp = format.replace(parseRegex, function (ch) {
        // if (ch.charAt(0) == "\\") return ch.slice(1);

        obj = getParseCode(ch);

        if (obj.f) {
            calc.push(obj);
        }

        return obj.r;
    });

    function parser(input, strict) {
        var ret = input.match(regExp);
        if (!ret) return;

        var dt = void 0,
            y = void 0,
            m = void 0,
            d = void 0,
            h = void 0,
            i = void 0,
            s = void 0,
            ms = void 0,
            o = void 0,
            z = void 0,
            zz = void 0,
            v = void 0,
            sn = void 0,
            hr = void 0,
            mn = void 0,
            date = {},
            fnCall = [],
            fnCallEnd = [];

        for (var _i = 0; _i < calc.length; _i++) {
            var _obj = calc[_i];
            var match = ret[_i + 1];
            if (_obj.calcAtEnd) {
                fnCallEnd.push({ fn: _obj.f, params: [match, date, strict, _i + 1, ret] });
            } else {
                fnCall.push({ fn: _obj.f, params: [match, date, strict, _i + 1, ret] });
            }
        }

        for (var _i2 = 0, calls = fnCall.concat(fnCallEnd); _i2 < calls.length; _i2++) {
            var _obj2 = calls[_i2];
            if (_obj2.fn && isFunction(_obj2.fn)) {
                _obj2.fn.apply(_obj2, _toConsumableArray(_obj2.params));
            }
        }

        if (date.u != null) {
            v = new Date(date.u * 1000);
        } else {
            dt = clearTime(new Date());

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
                v = !strict ? v : strict === true && (z <= 364 || isLeapYear(v) && z <= 365) ? add(v, defines.DAY, z) : null;
            } else if (strict === true && !isValid(y, m + 1, d, h, i, s, ms)) {
                // check for Date "rollover"
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
};