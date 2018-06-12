var add = require("./add");

module.exports = function subtract(date, interval, value) {
    return add(date, interval, -value);
};