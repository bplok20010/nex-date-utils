function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defines = require("./defines");
var isFunction = require("./isFunction");
var defaultTo = require("./defaultTo");
var clearTime = require("./clearTime");
var getParseCode = require("./getParseCode");
var add = require("./add");
var isValid = require("./isValid");

var parseFunctions = {};

function escape(str) {
    return str.replace(/('|\\)/g, '\\$1');
}

module.exports = function createParser(format) {
    if (parseFunctions[format]) {
        return parseFunctions[format];
    }
    var obj = void 0,
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
                fnCallEnd.push({ fn: _obj.f, params: [match, date, strict, _i + 1] });
            } else {
                fnCall.push({ fn: _obj.f, params: [match, date, strict, _i + 1] });
            }
        }

        fnCall = fnCall.concat(fnCallEnd);

        for (var _i2 = 0; _i2 < fnCall.length; _i2++) {
            var _obj2 = fnCall[_i2];
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

            if (strict === true && !isValid(y, m + 1, d, h, i, s, ms)) {
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