var defs = require("./defines");

module.exports = function formatContainsHourInfo(format) {
    return defs.hourInfoRe.test(format.replace(defs.stripEscapeRe, ''));
};