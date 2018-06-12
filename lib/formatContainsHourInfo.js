var defs = require("./_defines");

module.exports = function formatContainsHourInfo(format) {
    return defs.hourInfoRe.test(format.replace(defs.stripEscapeRe, ''));
};