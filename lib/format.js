var getFormatCode = require("./getFormatCode");

var now = require("./now");

/** 
 * 日期格式化
 * @param {Date}
 * @param {String}
 * @return {String}
 */
module.exports = function format() {
    var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : now();
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Y-m-d';

    var code = [],
        special = false,
        ch = '',
        i = void 0;

    for (i = 0; i < format.length; ++i) {
        ch = format.charAt(i);
        if (!special && ch === "\\") {
            special = true;
        } else if (special) {
            special = false;
            code.push(ch);
        } else {
            code.push(getFormatCode(ch)(date));
        }
    }

    return code.join('');
};