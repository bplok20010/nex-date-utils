var options = require("./options");

module.exports = function getMonthNumber(name) {
    return options.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
};