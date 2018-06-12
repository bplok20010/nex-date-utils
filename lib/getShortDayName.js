var options = require("./options");

module.exports = function getShortDayName(day) {
    return options.dayNames[day].substring(0, 3);
};