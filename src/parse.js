import escapeRegex from './escapeRegex';

const parseFunctions = {};

function createParser(format) {
    if (parseFunctions[format]) {
        return parseFunctions[format];
    }
    //eg: step1: foramt = Y-m-d\s
    var obj, parser,
        self = this,
        calc = [],
        reg = ['\\\\?['],
        _reg = [],
        reg2 = [],
        parseCodes = this.parseCodes,
        _format = format,
        format = escapeRegex(format || this.defaultFormat);

    //eg: after escapeRegex => step2: foramt = Y\-m\-d\\s //此处的\s不应该转成\\s 所以后续需要转回\s	

    for (var k in parseCodes) {
        _reg.push(k);
        reg2.push('\\\\' + k);
    }

    reg.push(_reg.join('|'));

    reg.push(']');

    reg = reg.join('');

    format = format.replace(new RegExp(reg2.join('|', 'g')), function(ch) {
        return ch.replace('\\', '');
    });
    //eg: step3: foramt = Y\-m\-d\s

    var parseRegex = new RegExp(reg, 'g');

    var regExp = format.replace(parseRegex, function(ch, idx) {
        if (ch.charAt(0) == "\\") return ch.slice(1);

        obj = self.getParseCode(ch);

        if (obj.f) {
            calc.push(obj);
        }

        return obj.r;
    });

    parser = function(input, strict) {
        var ret = input.match(regExp);
        if (!ret) return;

        var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,
            sn, hr, mn,
            date = {},
            fnCall = [],
            fnCallEnd = [],
            def = self.defaults;

        for (var i = 0; i < calc.length; i++) {
            var obj = calc[i];
            var match = ret[i + 1];
            if (obj.calcAtEnd) {
                fnCallEnd.push({ fn: obj.f, params: [match, date, strict, i + 1, ret] });
            } else {
                fnCall.push({ fn: obj.f, params: [match, date, strict, i + 1, ret] });
            }
        }

        for (var i = 0, calls = fnCall.concat(fnCallEnd); i < calls.length; i++) {
            var obj = calls[i];
            if (obj.fn && isFunction(obj.fn)) {
                obj.fn.apply(self, obj.params);
            }
        }

        if (date.u != null) {
            v = new Date(date.u * 1000);
        } else {
            dt = self.clearTime(new Date);

            y = defalut(date.y, defalut(def.y, dt.getFullYear()));
            m = defalut(date.m, defalut(def.m, dt.getMonth()));
            d = defalut(date.d, defalut(def.d, dt.getDate()));

            h = defalut(date.h, defalut(def.h, dt.getHours()));
            i = defalut(date.i, defalut(def.i, dt.getMinutes()));
            s = defalut(date.s, defalut(def.s, dt.getSeconds()));
            ms = defalut(date.ms, defalut(def.ms, dt.getMilliseconds()));

            z = date.z;

            if (z >= 0 && y >= 0) {
                // both the year and zero-based day of year are defined and >= 0.
                // these 2 values alone provide sufficient info to create a full date object

                // create Date object representing January 1st for the given year
                // handle years < 100 appropriately
                v = self.add(new Date(y < 100 ? 100 : y, 0, 1, h, i, s, ms), self.YEAR, y < 100 ? y - 100 : 0);

                // then add day of year, checking for Date "rollover" if necessary
                v = !strict ? v : (strict === true && (z <= 364 || (self.isLeapYear(v) && z <= 365)) ? self.add(v, self.DAY, z) : null);
            } else if (strict === true && !self.isValid(y, m + 1, d, h, i, s, ms)) { // check for Date "rollover"
                v = null; // invalid date, so return null
            } else {
                // plain old Date object
                // handle years < 100 properly
                v = self.add(new Date(y < 100 ? 100 : y, m, d, h, i, s, ms), self.YEAR, y < 100 ? y - 100 : 0);
            }

        }

        if (v) {
            zz = date.zz;
            o = date.o;
            // favour UTC offset over GMT offset
            if (zz != null) {
                // reset to UTC, then add offset
                v = self.add(v, self.SECOND, -v.getTimezoneOffset() * 60 - zz);
            } else if (o) {
                sn = date.sn;
                hr = date.hr;
                mn = date.mn;
                // reset to GMT, then add offset
                v = self.add(v, self.MINUTE, -v.getTimezoneOffset() + (sn == '+' ? -1 : 1) * (hr * 60 + mn));
            }
        }

        return v;
    };

    parseFunctions[_format] = parser;

    return parser;
}

export default function parse(input, format, strict) {

    if (Date.parse && arguments.length == 1) {
        let r = Date.parse(input);
        if (r) return new Date(r);
    }

    return this.createParser(format)(input, strict);
}