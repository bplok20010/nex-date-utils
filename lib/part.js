var format = require("./format");

module.exports = function (date) {
    var interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'd';

    return format(date, interval);
};