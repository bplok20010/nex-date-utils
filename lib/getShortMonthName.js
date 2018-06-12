var options = require("./options");

module.exports = function getShortMonthName(month) {
    return options.monthNames[month].substring(0, 3);
};